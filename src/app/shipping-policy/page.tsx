"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Mail,
  Globe,
} from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
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
            Shipping Policy
          </motion.h1>
          <p className="text-white/90 text-lg max-w-xl mx-auto drop-shadow-md font-light italic">
            "Delivering wellness from our home to yours, across the globe."
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto py-16 px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 text-slate-700 leading-relaxed">
          <div className="mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-4 text-[#CE978C]">
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
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6 text-[#CE978C]">
                <Truck className="w-8 h-8" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Carrier Information
                </h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                We use third party shipping companies to ship your orders. This
                may include national and international carriers and as such the
                time of delivery is guaranteed by them.
              </p>
            </section>
            <section className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
              <div className="flex items-center gap-3 mb-4 text-amber-700">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-bold text-lg">Unforeseen Circumstances</h3>
              </div>
              <p className="text-amber-900/80 mb-4">
                There might be unforeseen circumstances where the delivery is
                delayed (like, but not limited to, natural disasters, weather
                conditions, road/train/air accidents among others).
              </p>
              <div className="pt-4 border-t border-amber-200">
                <p className="font-bold text-amber-900">
                  In no circumstances will ApexGlobal be held responsible for
                  such delays.
                </p>
              </div>
            </section>
            <section>
              <div className="flex items-center gap-3 mb-6 text-[#CE978C]">
                <ShieldCheck className="w-8 h-8" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Our Guarantee
                </h2>
              </div>
              <p className="text-slate-600">
                We will provide compensation for any undelivered items or items
                not delivered within a reasonable timeframe from order date.
              </p>
            </section>
            <section className="bg-[#FAF8F5] p-6 rounded-2xl flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#CE978C] shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800 mb-1">
                  Tracking Your Order
                </h4>
                <p className="text-sm text-slate-500">
                  Once your order is processed, you will receive a tracking
                  number from our third-party carrier to monitor your delivery
                  progress in real-time.
                </p>
              </div>
            </section>
          </div>
          <div className="mt-16 p-8 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold mb-1 text-[#CE978C]">
                Shipping Inquiry?
              </h4>
              <p className="text-slate-400 text-sm">
                Contact us for updates on your global delivery.
              </p>
            </div>
            <a
              href="mailto:care@apexglobal.io"
              className="px-8 py-3 bg-[#CE978C] rounded-xl font-bold hover:bg-[#b87d71] transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <Mail className="w-4 h-4" /> care@apexglobal.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
