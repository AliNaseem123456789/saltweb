// app/refund-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  RefreshCcw,
  AlertCircle,
  PackageCheck,
  CreditCard,
  Mail,
  Globe,
} from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section - Consistent with News & Privacy */}
      <section className="relative h-[35vh] min-h-[300px] w-full overflow-hidden bg-black flex items-center justify-center">
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
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-xl"
          >
            Refund Policy
          </motion.h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto drop-shadow-md font-light italic">
            "Your satisfaction is our priority. Simple returns for a better
            experience."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-16 px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 text-slate-700 leading-relaxed">
          {/* About Section */}
          <div className="mb-12 pb-8 border-b border-slate-100 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-[#CE978C]">
              <Globe className="w-6 h-6" />
              <h2 className="text-xl font-bold uppercase tracking-wider">
                About Apex Global
              </h2>
            </div>
            <p className="text-slate-500 italic">
              Apex Global Enterprise is a diverse North American company engaged
              in e-Commerce, trade, import, distribution, and export activities.
            </p>
          </div>

          {/* Policy Body */}
          <div className="space-y-12">
            {/* 30-Day Window */}
            <section>
              <div className="flex items-center gap-3 mb-4 text-[#CE978C]">
                <RefreshCcw className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Refund Policy
                </h2>
              </div>
              <p className="mb-4 font-medium text-slate-900">
                We have a 30-day return policy: you have 30 days from the day
                you receive the item to initiate a return.
              </p>
              <p>
                To be eligible for a return, your item must be in the same
                condition that you received it, in its original packaging and
                with all the accessories it came with along with receipt or
                proof of purchase.
              </p>
            </section>

            {/* How to Start */}
            <section className="bg-[#FAF8F5] p-6 rounded-2xl border-l-4 border-[#CE978C]">
              <h3 className="font-bold mb-2">How to start a return</h3>
              <p className="text-sm mb-4">
                To start a return, you can contact us at{" "}
                <a
                  href="mailto:care@apexglobal.io"
                  className="text-[#CE978C] font-bold hover:underline"
                >
                  care@apexglobal.io
                </a>
                .
              </p>
              <p className="text-sm text-slate-500">
                If your return is accepted, we’ll send you a return shipping
                label, as well as instructions on how and where to send your
                package. Items sent back to us without first requesting a return
                will not be accepted.
              </p>
            </section>

            {/* Damages & Issues */}
            <section>
              <div className="flex items-center gap-3 mb-4 text-[#CE978C]">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Damages and issues
                </h2>
              </div>
              <p>
                Please inspect your order upon reception and contact us
                immediately if the item is defective, damaged or if you receive
                the wrong item, so that we can evaluate the issue and make it
                right.
              </p>
            </section>

            {/* Exceptions */}
            <section>
              <div className="flex items-center gap-3 mb-4 text-[#CE978C]">
                <PackageCheck className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Exceptions / non-returnable items
                </h2>
              </div>
              <p className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-100">
                Unfortunately, we cannot accept returns on sale items.
              </p>
            </section>

            {/* Exchanges */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Exchanges
              </h2>
              <p>
                The fastest way to ensure you get what you want is to return the
                item you have, and once the return is accepted, make a separate
                purchase for the new item.
              </p>
            </section>

            {/* Refunds */}
            <section className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-4 text-[#CE978C]">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-800">Refunds</h2>
              </div>
              <p className="mb-4">
                We will notify you once we’ve received and inspected your
                return, and let you know if the refund was approved or not.
              </p>
              <p className="text-sm text-slate-500">
                If approved, you’ll be automatically refunded on your original
                payment method. Please remember it can take some time for your
                bank or credit card company to process and post the refund.
              </p>
            </section>
          </div>

          {/* Support CTA */}
          <div className="mt-16 p-8 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-1 text-[#CE978C]">
                Need more help?
              </h4>
              <p className="text-slate-400 text-sm">
                Our support team is available for any return questions.
              </p>
            </div>
            <a
              href="mailto:care@apexglobal.io"
              className="px-6 py-3 bg-[#CE978C] rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> care@apexglobal.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
