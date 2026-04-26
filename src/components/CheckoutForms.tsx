// components/CheckoutForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    stock_quantity?: number;
  };
}

interface CheckoutFormProps {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  userProfile: any;
}

// Payment Form Component
function PaymentForm({
  amount,
  onSuccess,
  formData,
  cart,
  total,
  setIsProcessing,
}: {
  amount: number;
  onSuccess: (orderId: string) => void;
  formData: any;
  cart: CartItem[];
  total: number;
  setIsProcessing: (loading: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setIsProcessing(true);

    try {
      // First, create the order
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;

      const orderData = {
        items: cart.map((item) => ({
          productId: item.products.id,
          quantity: item.quantity,
          price: item.products.price,
        })),
        totalAmount: total,
        shippingAddress: shippingAddress,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
      };

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      // Confirm payment with Stripe
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success?orderId=${orderResult.orderId}`,
        },
        redirect: "if_required",
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      // If payment successful and no redirect, call onSuccess
      onSuccess(orderResult.orderId);
    } catch (error: any) {
      console.error("Payment failed:", error);
      alert(error.message || "Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Payment Information
        </h2>
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full rounded-lg bg-[#CE978C] py-3 font-semibold text-white transition-colors hover:bg-[#b8857a] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

// Main Checkout Form Component
export default function CheckoutForm({
  cart,
  subtotal,
  shipping,
  tax,
  total,
  userProfile,
}: CheckoutFormProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    address: userProfile?.address || "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate shipping form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert("Please fill in all shipping information fields.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error: any) {
      console.error("Error setting up payment:", error);
      alert(error.message || "Failed to initialize payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="mb-8 font-serif text-4xl font-light text-slate-800 md:text-5xl">
        Checkout
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column - Forms */}
        <div className="flex-1">
          {!showPayment ? (
            // Shipping Information Form
            <form onSubmit={handleContinueToPayment} className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-slate-800">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Country *
                      </label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-lg bg-[#CE978C] py-3 font-semibold text-white transition-colors hover:bg-[#b8857a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Continue to Payment"}
              </button>
            </form>
          ) : (
            // Payment Form
            clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  formData={formData}
                  cart={cart}
                  total={total}
                  setIsProcessing={setIsProcessing}
                />
              </Elements>
            )
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-96">
          <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Order Summary
            </h2>

            <div className="mb-4 max-h-96 space-y-3 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-slate-100 pb-3"
                >
                  {item.products.image_url && (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.products.image_url}
                        alt={item.products.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {item.products.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-[#CE978C]">
                      ${(item.products.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-800">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax (10%)</span>
                <span className="text-slate-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold">
                <span className="text-slate-800">Total</span>
                <span className="text-[#CE978C]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
