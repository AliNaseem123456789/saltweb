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
      {/* VIDEO CONTAINER 
        We use 'relative' here so the video occupies actual space on the page.
        This prevents the "hidden text" issue caused by forcing a fixed height.
      */}
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
          className="w-full h-auto block" // h-auto ensures the entire frame (and text) is visible
          poster="/blogs/HeroSectionVideo.jpg"
        >
          <source src="/blogs/HeroSectionVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay to help top-layer text pop */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* CONTENT OVERLAY
        This sits on top of the video. Because the video container above 
        has a real height, this content will always be centered over the footage.
      */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>
    </section>
  );
}
