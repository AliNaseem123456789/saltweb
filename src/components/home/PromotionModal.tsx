"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't feel jarring immediately on load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          ✕
        </button>

        {/* Left Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            Get Free Samples <br /> from Pure Salt!
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Order your FREE Pure Salt Products Sample now! Be the first to
            access our latest arrivals and exclusive offers. So what are you
            waiting for?
            <br />
            <br />
            Enter your email below to get started!
          </p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-blue-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full border border-slate-800 py-3 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:block w-1/3 relative bg-slate-100">
          {/* Replace with your actual image path */}
          <div className="h-full w-full relative">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Custom blob shape approximation */}
              <div className="w-[120%] h-[80%] bg-cover bg-center rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-[url('https://images.unsplash.com/photo-1615485290382-441e4d019cb0?auto=format&fit=crop&q=80&w=800')]"></div>
            </div>
            <span className="absolute top-4 right-4 text-xs font-medium text-white mix-blend-difference">
              Himalayan Alps
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
