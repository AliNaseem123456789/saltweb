"use client";
import React, { useState, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { submitSampleRequest } from "@/app/actions/sample-actions";

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // FIXED: Added React.FormEvent type to handle Vercel/TypeScript build errors
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string; // FIXED: Explicitly cast to string

    if (!email) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitSampleRequest(email);

      if (result.success) {
        alert("Success! Check your inbox for details.");
        setIsOpen(false);
      } else {
        alert("Error: " + (result.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={20} />
            </button>

            {/* Left Content */}
            <div className="flex-[1.2] p-8 md:p-16">
              <span className="text-[#CE978C] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                Exclusive Invitation
              </span>
              <h2 className="text-4xl font-serif text-slate-900 mb-6">
                Get Free Samples
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-slate-50 border-none rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#CE978C]/20 text-slate-900"
                  required
                />
                <motion.button
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#CE978C] py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-70 transition-colors hover:bg-[#b8857a]"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send Me Samples"
                  )}
                  {!isSubmitting && <Send size={16} />}
                </motion.button>
              </form>
            </div>

            {/* Right Image Section */}
            <div className="hidden md:block flex-1 relative bg-[#FDF8F6]">
              <Image
                src="/blogs/himaliyansalt copy.webp"
                alt="Salt"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
