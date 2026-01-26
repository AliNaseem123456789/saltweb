"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

export default function ProductsCTA() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] px-4 py-24">
      {/* Background Decorative Element - Soft Organic Blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="h-[500px] w-[500px] rounded-full bg-[#CE978C]/5 blur-[100px]"
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-8 md:p-20 shadow-[0_20px_50px_rgba(206,151,140,0.1)] text-center"
        >
          {/* Subtle Icon Accents */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5] text-[#CE978C]">
              <Mail size={20} />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5] text-[#CE978C]">
              <MessageCircle size={20} />
            </div>
          </div>

          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#CE978C]">
            Personalized Assistance
          </span>

          <h2 className="mb-6 font-serif text-4xl font-light text-slate-900 md:text-6xl leading-[1.1]">
            Can&apos;t Find What <br />
            <span className="italic">You&apos;re Looking For?</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500 font-light">
            Whether you are looking for a specific crystal size or a bespoke
            wellness gift, our experts are here to help you find the perfect
            piece of the Himalayas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="group flex items-center gap-3 rounded-full bg-[#CE978C] px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-[#B8857A] shadow-xl shadow-[#CE978C]/20"
              >
                Contact Our Team
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <Link
              href="/faq"
              className="px-8 py-5 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              Browse FAQs
            </Link>
          </div>

          {/* Bottom Decorative Line */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#CE978C]/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
