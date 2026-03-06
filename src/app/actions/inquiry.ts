"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  product_name: string;
  moq: number;
  quantity: string; // Added quantity
  message: string; // Added message
}) {
  const supabase = await createClient();

  // 1. Save to Supabase
  const { error: dbError } = await supabase.from("inquiries").insert([
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      product_name: formData.product_name,
      moq: formData.moq,
      quantity: formData.quantity, // New column
      message: formData.message, // New column
    },
  ]);

  if (dbError) {
    console.error("Database Error:", dbError);
    return { success: false, error: "Failed to save inquiry." };
  }

  // 2. Send Email Notification
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Wholesale Inquiry <onboarding@resend.dev>",
        to: ["alinaseem21102002@gmail.com"],
        subject: `New Lead: ${formData.product_name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; line-height: 1.6;">
            <h2 style="color: #CE978C;">New Wholesale Inquiry</h2>
            <p><strong>Product:</strong> ${formData.product_name}</p>
            <p><strong>Requested Quantity:</strong> ${formData.quantity}</p>
            <hr style="border: none; border-top: 1px solid #eee;" />
            <p><strong>Client Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
            <hr style="border: none; border-top: 1px solid #eee;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #555;">
              ${formData.message || "No additional message provided."}
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    // We return success: true because the data WAS saved to the DB
    return {
      success: true,
      warning: "Inquiry saved, but notification email failed.",
    };
  }
}
