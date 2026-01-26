"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative flex min-h-[80vh] w-full items-center justify-center bg-transparent">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 font-serif text-6xl font-light tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl"
        >
          Himalayan Salt
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 font-light uppercase tracking-[0.3em] text-white/90 md:text-2xl"
        >
          Pure • Natural • Ancient
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href="/products"
            className="group relative inline-block overflow-hidden rounded-full border border-white/40 px-12 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
