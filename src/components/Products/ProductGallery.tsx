"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center text-8xl bg-slate-100 rounded-2xl border border-dashed border-slate-300">
        🧂
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-md border border-slate-100"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* PREMIUM CIRCLE REVEAL MASK */}
        <motion.div
          className="absolute inset-0 z-10 backdrop-blur-[4px] pointer-events-none"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            ["WebkitMaskRepeat" as any]: "no-repeat",
            ["maskRepeat" as any]: "no-repeat",
            ["WebkitMaskSize" as any]: "100% 100%",
            ["maskSize" as any]: "100% 100%",
          }}
          variants={{
            rest: {
              opacity: 0,
              ["WebkitMaskImage" as any]:
                "radial-gradient(circle at center, transparent 0%, black 0%)",
            },
            hover: {
              opacity: [0, 1, 1, 0],
              ["WebkitMaskImage" as any]: [
                "radial-gradient(circle at center, transparent 0%, black 0%)",
                "radial-gradient(circle at center, transparent 30%, black 60%)",
                "radial-gradient(circle at center, transparent 100%, black 100%)",
              ],
            },
          }}
          transition={{ duration: 1.2, times: [0, 0.4, 1] }}
        />

        {/* SHINE EFFECT */}
        <motion.div
          className="absolute inset-0 z-20 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
          variants={{
            rest: { x: "-100%", skewX: -20 },
            hover: { x: "200%", skewX: -20 },
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* THUMBNAIL TRACK */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {images.map((url, idx) => (
            <button
              key={url}
              onClick={() => setActiveIndex(idx)}
              className={`group relative h-24 w-24 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                activeIndex === idx
                  ? "border-[#CE978C] shadow-lg ring-2 ring-[#CE978C]/20"
                  : "border-transparent grayscale hover:grayscale-0"
              }`}
            >
              <Image
                src={url}
                alt={`${productName} view ${idx + 1}`}
                fill
                className="object-cover"
              />
              {/* Active indicator dot */}
              {activeIndex === idx && (
                <motion.div
                  layoutId="activeThumb"
                  className="absolute bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-[#CE978C]"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
