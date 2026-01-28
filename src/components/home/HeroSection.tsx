"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* VIDEO CONTAINER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-0 w-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
          poster="/blogs/HeroSectionVideo.jpg"
        >
          <source src="/blogs/HeroSectionVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* CONTENT OVERLAY */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="mb-6 font-serif text-5xl font-light tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl"
        >
          Himalayan Salt
        </motion.h1>

        {/* Subtitle / Tagline */}
        <motion.p
          variants={itemVariants}
          className="mb-10 font-light uppercase tracking-[0.3em] text-white/90 md:text-2xl"
        >
          Pure • Natural • Ancient
        </motion.p>

        {/* Animated Button Container */}
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/products"
              className="group relative inline-block overflow-hidden rounded-full border border-white/40 px-12 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:text-black"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                Shop Now
              </span>

              {/* This is the sliding background animation from your previous commit */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
