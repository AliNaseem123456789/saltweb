"use server";

import { createClient } from "@/lib/supabase/server";
import nodemailer from "nodemailer";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  const supabase = await createClient();

  // Step 1: Save to Database
  const { error: dbError } = await supabase
    .from("subscribers")
    .insert([{ email }]);

  if (dbError) {
    // Handle duplicate emails (Postgres Unique Constraint error code)
    if (dbError.code === "23505") {
      return { success: true, message: "You're already subscribed!" };
    }
    return { success: false, error: "Database error. Please try again." };
  }

  // Step 2: Setup Nodemailer Transporter (Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your personal Gmail
      pass: process.env.EMAIL_PASS, // Your 16-character App Password
    },
  });

  // Step 3: Send the Welcome Email
  try {
    await transporter.sendMail({
      from: `"Salt Web" <${process.env.EMAIL_USER}>`,
      to: email, // This sends to the CUSTOMER'S email
      subject: "Welcome to Salt Web",
      html: `
        <div style="font-family: 'serif', 'Times New Roman', serif; padding: 30px; line-height: 1.6; color: #333; border: 1px solid #CE978C; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #CE978C; border-bottom: 1px solid #f4f4f4; padding-bottom: 10px;">Welcome to the Collection</h2>
          <p>Thank you for subscribing to the <strong>Salt Web</strong> newsletter.</p>
          <p>You are now part of a community dedicated to wellness, mineral research, and the timeless beauty of Himalayan salt crystals.</p>
          <p><strong>What to expect:</strong></p>
          <ul style="color: #555;">
            <li>Early access to new product launches.</li>
            <li>In-depth articles on mineral benefits.</li>
            <li>Exclusive wellness tips and home decor inspiration.</li>
          </ul>
          <br />
          <p>We are thrilled to have you with us on this journey.</p>
          <p>Best Regards,</p>
          <p><strong>Salt Web</strong></p>
          <hr style="border: none; border-top: 1px solid #f4f4f4; margin-top: 20px;" />
          <p style="font-size: 11px; color: #999; text-align: center;">You are receiving this because you signed up at alinaseem21102002@gmail.com</p>
        </div>
      `,
    });

    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    console.error("Newsletter Email Error:", error);
    // We still return success: true because the user IS in the database now
    return {
      success: true,
      message: "Subscription successful! (Welcome email may follow shortly).",
    };
  }
}
