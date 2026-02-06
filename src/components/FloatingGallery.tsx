"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  // Each object defines the image source and its specific movement path
  {
    src: "/banners/products_banner.jpeg",
    initial: { x: -300, y: -200, rotate: -15 },
    delay: 0.2,
  }, // Top-Left
  {
    src: "/banners/products_banner.jpeg",
    initial: { x: 300, y: -250, rotate: 10 },
    delay: 0.4,
  }, // Top-Right
  {
    src: "/banners/products_banner.jpeg",
    initial: { x: 0, y: 400, rotate: 0 },
    delay: 0.1,
  }, // Center-Bottom
  {
    src: "/banners/products_banner.jpeg",
    initial: { x: -400, y: 300, rotate: -20 },
    delay: 0.6,
  }, // Bottom-Left
  {
    src: "/banners/products_banner.jpeg",
    initial: { x: 500, y: 100, rotate: 15 },
    delay: 0.8,
  }, // Mid-Right
];

export default function FloatingGalleryHero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      {/* 1. BACKGROUND PARTICLES/DARKNESS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-600 via-transparent to-transparent" />
      </div>

      {/* 2. THE MOVING IMAGES GRID */}
      <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: img.initial.x,
              y: img.initial.y,
              rotate: img.initial.rotate,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
              delay: img.delay,
              ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "premium" smooth motion
            }}
            whileHover={{
              scale: 1.05,
              zIndex: 50,
              transition: { duration: 0.3 },
            }}
            className="absolute w-48 h-64 md:w-64 md:h-80 border-[6px] border-white shadow-2xl overflow-hidden rounded-sm"
            style={{
              // Manual offsets to prevent total overlap in center
              left: `${15 + i * 15}%`,
              top: i % 2 === 0 ? "20%" : "40%",
            }}
          >
            <Image
              src={img.src}
              alt={`Gallery Image ${i}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* 3. CENTER OVERLAY TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="relative z-40 text-center pointer-events-none"
        >
          <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-2xl">
            GHANI <br /> <span className="text-outline">GROUP</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
