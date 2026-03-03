"use client";
import { forgotPassword } from "@/app/actions/auth";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await forgotPassword(formData);
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: "Check your email for the reset link!",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-800">Forgot Password?</h1>
        <p className="mt-2 text-slate-600 text-sm">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form action={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-[#CE978C]"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${message.type === "error" ? "text-red-500" : "text-green-600"}`}
            >
              {message.text}
            </p>
          )}
          <button className="w-full rounded-lg bg-[#CE978C] py-3 font-semibold text-white transition-all hover:bg-[#b8857a]">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
