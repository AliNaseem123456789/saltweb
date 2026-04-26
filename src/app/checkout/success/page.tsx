// app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "/account";
    }
  }, [countdown]);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-slate-600">No order found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="mb-4 font-serif text-4xl font-light text-slate-800">
          Thank You for Your Order!
        </h1>

        <p className="mb-2 text-lg text-slate-600">
          Your order has been successfully placed.
        </p>

        <p className="mb-4 text-slate-600">
          Order ID:{" "}
          <span className="font-mono text-sm font-semibold">{orderId}</span>
        </p>

        <p className="mb-8 text-sm text-slate-500">
          Redirecting to your orders in {countdown} seconds...
        </p>

        <div className="space-y-4">
          <Link
            href={`/account?orderId=${orderId}`}
            className="inline-block rounded-lg bg-[#CE978C] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#b8857a]"
          >
            View Order Details Now
          </Link>

          <div>
            <Link
              href="/products"
              className="inline-block text-[#CE978C] hover:underline"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
