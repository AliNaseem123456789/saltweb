"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitSampleRequest(userEmail: string) {
  const supabase = await createClient();

  const { error: dbError } = await supabase
    .from("sample_requests")
    .insert([{ email: userEmail, status: "pending", created_at: new Date() }]);

  if (dbError) {
    console.error("Database Error:", dbError);
    return { success: false, error: "Failed to process request." };
  }

  try {

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Apex Global <onboarding@resend.dev>",
        to: [userEmail],
        subject: `Your Apex Global Sample Kit is on the way!`,
        html: `
          <div style="font-family: 'serif'; padding: 30px; line-height: 1.6; color: #333; border: 1px solid #CE978C;">
            <h2 style="color: #CE978C;">Hello from Apex Global</h2>
            <p>Thank you for requesting a free sample of our premium Himalayan Salt.</p>
            <p>At <strong>Apex Global</strong>, we take pride in sourcing the purest, unrefined salt directly from the heart of the Himalayas. Our mission is to bring the natural minerals and therapeutic benefits of salt crystals to your doorstep.</p>
            <p>Our team is currently preparing your sample kit. You will receive another notification once your package has been dispatched.</p>
            <br />
            <p>Best Regards,</p>
            <p><strong>The Apex Global Team</strong></p>
          </div>
        `,
      }),
    });

    if (!res.ok) throw new Error("Failed to send email");

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return {
      success: true,
      warning: "Request saved, but confirmation email couldn't be sent.",
    };
  }
}
