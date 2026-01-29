"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  address: string;
  product_name: string;
  moq: number;
}) {
  const supabase = await createClient();
  const { error: dbError } = await supabase
    .from("inquiries")
    .insert([formData]);

  if (dbError) {
    console.error("Database Error:", dbError);
    return { success: false, error: "Failed to save inquiry." };
  }
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
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #0D54A0;">New Wholesale Inquiry</h2>
            <p><strong>Product:</strong> ${formData.product_name}</p>
            <p><strong>Quantity (MOQ):</strong> ${formData.moq}</p>
            <hr />
            <p><strong>Client Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Address:</strong> ${formData.address}</p>
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
    return {
      success: true,
      warning: "Inquiry saved, but notification email failed.",
    };
  }
}
