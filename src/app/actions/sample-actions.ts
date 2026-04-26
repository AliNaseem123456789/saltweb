"use server";

import { createClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";

export async function submitSampleRequest(userEmail: string) {
  const supabase = await createClient();

  // 1. Save to Database
  const { error: dbError } = await supabase
    .from("sample_requests")
    .insert([{ email: userEmail, status: "pending", created_at: new Date() }]);

  if (dbError) {
    console.error("Database Error:", dbError);
    return { success: false, error: "Failed to process request." };
  }

  // 2. Setup Nodemailer Transporter (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, // Your 16-character App Password
    },
  });

  try {
    // 3. Send the Confirmation Email to the Customer
    await transporter.sendMail({
      from: `"Salt Web" <${process.env.EMAIL_USER}>`,
      to: userEmail, // Sends to the person who requested the sample
      subject: `Your Salt Web Sample Kit is on the way!`,
      html: `
        <div style="font-family: 'serif', 'Times New Roman', serif; padding: 30px; line-height: 1.6; color: #333; border: 1px solid #CE978C; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #CE978C; border-bottom: 1px solid #FAF8F5; padding-bottom: 10px;">Hello from Salt Web</h2>
          <p>Thank you for requesting a free sample of our premium Himalayan Salt.</p>
          <p>At <strong>Salt Web</strong>, we take pride in sourcing the purest, unrefined salt directly from the heart of the Himalayas. Our mission is to bring the natural minerals and therapeutic benefits of salt crystals to your doorstep.</p>
          <p>Our team is currently preparing your sample kit. You will receive another notification once your package has been dispatched.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>The Salt Web</strong></p>
          <hr style="border: none; border-top: 1px solid #FAF8F5; margin-top: 20px;" />
          <p style="font-size: 11px; color: #999; text-align: center;">Salt Web - Himalayan Salt Excellence</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return {
      success: true,
      warning: "Request saved, but confirmation email couldn't be sent.",
    };
  }
}
