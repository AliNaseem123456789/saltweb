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
    <div className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden">
      {/* --- VIDEO BACKGROUND --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster="/blogs/HeroSectionVideo.jpg"
        >
          <source src="/blogs/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* --- CONTENT CONTAINER --- */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TEXT AND BUTTONS COMMENTED OUT BELOW 
          Note: We comment out the logic AND the tags to avoid syntax errors.
        */}

        {/* <motion.h1
          variants={itemVariants}
          className="mb-6 font-serif text-6xl font-light tracking-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl"
        >
          Himalayan Salt
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-10 font-light uppercase tracking-[0.3em] text-white/90 md:text-2xl"
        >
          Pure • Natural • Ancient
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/products"
              className="group relative inline-block overflow-hidden rounded-full border border-white/40 px-12 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white hover:text-black"
            >
              <span className="relative z-10">Shop Now</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>
        </motion.div> 
        */}
      </motion.div>
    </div>
  );
}
