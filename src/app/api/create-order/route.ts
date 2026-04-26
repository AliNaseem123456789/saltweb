// app/api/create-order/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createOrder } from "@/app/actions/orders";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    const result = await createOrder(orderData);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
