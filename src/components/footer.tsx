"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EAE9E3] px-4 py-16 text-slate-800">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Stay Connected */}
          <div>
            <h3 className="mb-4 font-serif text-2xl font-light">
              Stay Connected
            </h3>
            <p className="mb-4 text-slate-600">
              Subscribe to receive updates on new products and wellness tips.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#CE978C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B8857A]"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-2xl font-light">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-slate-600 hover:text-[#CE978C]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-[#CE978C]"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-slate-600 hover:text-[#CE978C]"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-serif text-2xl font-light">About Us</h3>
            <p className="text-slate-600">
              Dedicated to bringing you the finest Himalayan salt products for
              your health, wellness, and culinary journey.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-300 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Apex Global. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
