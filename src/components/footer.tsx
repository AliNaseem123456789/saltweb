"use client";

import { useState } from "react";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";
import { Facebook, Instagram, Twitter, Linkedin, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setStatus({ type: null, message: "" });

    const formData = new FormData();
    formData.append("email", email);

    try {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        setStatus({
          type: "success",
          message: result.message || "Thank you for subscribing!",
        });
        setEmail(""); // Clear input on success
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <footer className="bg-[#EAE9E3] px-4 py-16 text-slate-800 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Newsletter */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-light tracking-wide">
              Stay Connected
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Subscribe to receive updates on new products, mineral research,
              and wellness tips.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="rounded-lg border border-slate-300 bg-white/50 px-4 py-2.5 text-sm text-slate-800 focus:border-[#CE978C] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center justify-center rounded-lg bg-[#CE978C] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#B8857A] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>

              {/* Status Messages */}
              {status.type && (
                <p
                  className={`text-xs mt-1 animate-in fade-in slide-in-from-top-1 ${
                    status.type === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Shop & Products */}
          <div>
            <h3 className="mb-6 font-serif text-xl font-light italic">
              Shop Collection
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products?category=Salt%20Lamp"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Salt%20Lamp"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="mb-6 font-serif text-xl font-light italic">
              Customer Care
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 hover:text-[#CE978C] transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Social */}
          <div>
            <h3 className="mb-6 font-serif text-xl font-light italic">
              Our Story
            </h3>
            <p className="mb-4 text-sm text-slate-600 leading-relaxed">
              Salt Web is a diverse North American company dedicated to bringing
              you the finest Himalayan salt products directly from the source.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com"
                target="_blank"
                className="text-slate-400 hover:text-[#CE978C] transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-slate-400 hover:text-[#CE978C] transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://wa.me"
                target="_blank"
                className="text-green-500 hover:text-green-600 transition-colors"
              >
                <SiWhatsapp size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                className="text-slate-400 hover:text-[#CE978C] transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} ASalt Web. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-800">
              Privacy
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-800">
              Returns
            </Link>
            <Link href="/shipping-policy" className="hover:text-slate-800">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
