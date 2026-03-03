"use client";
import { updatePassword } from "@/app/actions/auth";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await updatePassword(formData);
    if (result?.error) setError(result.error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-800">Set New Password</h1>
        <form action={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              New Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 outline-none focus:border-[#CE978C]"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="w-full rounded-lg bg-[#CE978C] py-3 font-semibold text-white transition-all hover:bg-[#b8857a]">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
