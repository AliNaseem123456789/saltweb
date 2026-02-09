// app/privacy-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Share2,
  Target,
  Cookie,
  Mail,
  MapPin,
  Globe,
  Info,
  ExternalLink,
} from "lucide-react";

const COOKIE_FUNCTIONAL = [
  { name: "_ab", function: "Used in connection with access to admin." },
  {
    name: "_secure_session_id",
    function: "Used in connection with navigation through a storefront.",
  },
  { name: "cart", function: "Used in connection with shopping cart." },
  { name: "cart_sig", function: "Used in connection with checkout." },
  { name: "cart_ts", function: "Used in connection with checkout." },
  { name: "checkout_token", function: "Used in connection with checkout." },
  { name: "secret", function: "Used in connection with checkout." },
  {
    name: "secure_customer_sig",
    function: "Used in connection with customer login.",
  },
  {
    name: "storefront_digest",
    function: "Used in connection with customer login.",
  },
  {
    name: "_shopify_u",
    function: "Used to facilitate updating customer account information.",
  },
];

const COOKIE_ANALYTICS = [
  { name: "_tracking_consent", function: "Tracking preferences." },
  { name: "_landing_page", function: "Track landing pages." },
  { name: "_orig_referrer", function: "Track landing pages." },
  { name: "_s", function: "Shopify analytics." },
  { name: "_shopify_fs", function: "Shopify analytics." },
  { name: "_shopify_s", function: "Shopify analytics." },
  {
    name: "_shopify_sa_p",
    function: "Shopify analytics relating to marketing & referrals.",
  },
  {
    name: "_shopify_sa_t",
    function: "Shopify analytics relating to marketing & referrals.",
  },
  { name: "_shopify_y", function: "Shopify analytics." },
  { name: "_y", function: "Shopify analytics." },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden bg-black flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50 z-0"
        >
          <source src="/blogs/FeaturedVideo3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md font-light italic">
            "Transparency is the foundation of our global community."
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-16 px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-xl border border-slate-100 text-slate-700 leading-relaxed">
          {/* About & Intro */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-[#CE978C]">
              <Globe className="w-10 h-10" />
              <h2 className="text-3xl font-bold tracking-tight">
                About Apex Global
              </h2>
            </div>
            <p className="text-lg bg-[#FAF8F5] p-6 rounded-2xl border-l-4 border-[#CE978C] mb-8">
              Apex Global Enterprise is a diverse North American company engaged
              in e-Commerce, trade, import, distribution, and export activities.
            </p>
            <p className="text-slate-600">
              This Privacy Policy describes how{" "}
              <strong>www.apexglobal.io</strong> (the “Site” or “we”) collects,
              uses, and discloses your Personal Information when you visit or
              make a purchase from the Site.
            </p>
          </section>

          {/* Collection Details */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8 text-[#CE978C]">
              <Database className="w-10 h-10" />
              <h2 className="text-3xl font-bold tracking-tight">
                Collecting Personal Information
              </h2>
            </div>
            <p className="mb-8">
              In this Privacy Policy, we refer to any information that can
              uniquely identify an individual as “Personal Information”.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Device Information",
                  items:
                    "Web browser version, IP address, time zone, cookie info, search terms.",
                  purpose:
                    "To load the Site accurately and perform usage analytics.",
                  source:
                    "Collected automatically via cookies, log files, web beacons, tags, or pixels.",
                  disclosure: "Shared with our processor Shopify.",
                },
                {
                  title: "Order Information",
                  items:
                    "Name, billing/shipping address, payment info (credit cards), email, and phone number.",
                  purpose:
                    "To fulfill contracts, process payments, arrange shipping, and provide invoices.",
                  source: "Collected directly from you.",
                  disclosure: "Shared with our processor Shopify.",
                },
                {
                  title: "Customer Support Information",
                  items:
                    "Contact details and payment info provided during support sessions.",
                  purpose: "To provide high-quality customer support.",
                  source: "Collected from you during interaction.",
                  disclosure: "Internal use for support resolution.",
                },
              ].map((box, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-[#FAF8F5] rounded-3xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-4 text-slate-800">
                    {box.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Examples:</strong> {box.items}
                    </p>
                    <p>
                      <strong>Purpose:</strong> {box.purpose}
                    </p>
                    <p>
                      <strong>Source:</strong> {box.source}
                    </p>
                    <p>
                      <strong>Disclosure:</strong> {box.disclosure}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advertising & Rights */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-[#CE978C]">
              <Target className="w-10 h-10" />
              <h2 className="text-3xl font-bold tracking-tight">
                Behavioural Advertising
              </h2>
            </div>
            <p className="mb-6">
              We use your Personal Information to provide targeted
              advertisements or marketing communications we believe may be of
              interest to you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <a
                href="https://www.facebook.com/settings/?tab=ads"
                target="_blank"
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50"
              >
                <span className="font-bold">Facebook Ads Opt-out</span>
                <ExternalLink className="w-4 h-4 text-[#CE978C]" />
              </a>
              <a
                href="https://www.google.com/settings/ads/anonymous"
                target="_blank"
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-slate-50"
              >
                <span className="font-bold">Google Ads Opt-out</span>
                <ExternalLink className="w-4 h-4 text-[#CE978C]" />
              </a>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#CE978C]">
              <h4 className="font-bold mb-2">Do Not Track</h4>
              <p className="text-sm text-slate-600">
                Please note that because there is no consistent industry
                understanding of how to respond to “Do Not Track” signals, we do
                not alter our data collection practices when we detect such a
                signal.
              </p>
            </div>
          </section>

          {/* Detailed Cookie Tables */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-[#CE978C]">
              <Cookie className="w-10 h-10" />
              <h2 className="text-3xl font-bold tracking-tight">
                Cookie Policy
              </h2>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#CE978C] rounded-full" /> Store
                  Functionality
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF8F5] text-[#CE978C]">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIE_FUNCTIONAL.map((c, i) => (
                        <tr
                          key={i}
                          className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                        >
                          <td className="p-4 font-mono text-xs font-bold">
                            {c.name}
                          </td>
                          <td className="p-4 text-slate-500">{c.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#CE978C] rounded-full" />{" "}
                  Reporting & Analytics
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FAF8F5] text-[#CE978C]">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COOKIE_ANALYTICS.map((c, i) => (
                        <tr
                          key={i}
                          className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                        >
                          <td className="p-4 font-mono text-xs font-bold">
                            {c.name}
                          </td>
                          <td className="p-4 text-slate-500">{c.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Final Contact Info */}
          <section className="bg-[#FAF8F5] p-10 rounded-[2.5rem] border border-[#CE978C]/20 text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <Mail className="text-[#CE978C] w-6 h-6" />
                <p className="font-bold">Email Us</p>
                <a
                  href="mailto:care@apexglobal.io"
                  className="text-sm hover:text-[#CE978C] transition-colors"
                >
                  care@apexglobal.io
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="text-[#CE978C] w-6 h-6" />
                <p className="font-bold">Visit Us</p>
                <p className="text-sm leading-relaxed text-slate-500">
                  5170 Dixie Road, 203,
                  <br /> Mississauga ON L4W 1E3, Canada
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                Last Updated: 23/11/2020. Apex Global reserves the right to
                update this policy at any time.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
