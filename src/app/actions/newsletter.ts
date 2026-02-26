"use server";

import { createClient } from "@/lib/supabase/server";

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

  // Step 2: Send the Welcome Email via Resend API (Fetch)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Apex Global <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to Apex Global",
        html: `
          <div style="font-family: 'serif', 'Times New Roman', serif; padding: 30px; line-height: 1.6; color: #333; border: 1px solid #CE978C; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #CE978C; border-bottom: 1px solid #FAF8F5; padding-bottom: 10px;">Welcome to the Collection</h2>
            <p>Thank you for subscribing to the <strong>Apex Global</strong> newsletter.</p>
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
            <p><strong>The Apex Global Team</strong></p>
            <hr style="border: none; border-top: 1px solid #FAF8F5; margin-top: 20px;" />
            <p style="font-size: 11px; color: #999; text-align: center;">You are receiving this because you signed up at apex-global.com</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    return { success: true, message: "Thank you for subscribing!" };
  } catch (error) {
    console.error("Email Error:", error);
    // We return success: true because the email is already in the database
    return {
      success: true,
      warning:
        "You're subscribed! (Confirmation email delivery pending domain verification).",
    };
  }
}
