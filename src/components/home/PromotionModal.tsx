"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors z-50 p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>

            {/* Left Content */}
            <div className="flex-[1.2] p-8 md:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-[#CE978C] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                  Exclusive Invitation
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.1] mb-6">
                  Get Free Samples <br />
                  <span className="text-[#CE978C] italic">from Pure Salt</span>
                </h2>
                <p className="text-slate-500 mb-8 text-base leading-relaxed max-w-sm">
                  Experience the unrefined purity of the Himalayas. Join our
                  inner circle for a free sample kit and early access to new
                  harvests.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                  className="space-y-4 relative"
                >
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#CE978C]/20 transition-all text-slate-900 placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#CE978C] py-4 rounded-xl text-white font-bold text-sm hover:bg-[#B8857A] shadow-lg shadow-[#CE978C]/30 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    Send Me Samples
                    <Send size={16} />
                  </motion.button>
                </form>

                <p className="mt-6 text-[10px] text-slate-400 text-center md:text-left">
                  By subscribing, you agree to our Privacy Policy. No spam,
                  ever.
                </p>
              </motion.div>
            </div>

            {/* Right Image Section */}
            <div className="hidden md:block flex-1 relative bg-[#FDF8F6]">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                {/* Decorative Blob */}
                <motion.div
                  animate={{
                    borderRadius: [
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                      "60% 40% 30% 70% / 50% 30% 70% 50%",
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full overflow-hidden shadow-2xl shadow-[#CE978C]/20"
                >
                  <Image
                    src="/blogs/himaliyansalt copy.webp"
                    alt="Himalayan Salt"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Floating Tag */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-20 -left-4 bg-white px-4 py-2 rounded-lg shadow-xl"
                >
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Limited Samples Available
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
