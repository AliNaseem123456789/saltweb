"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [showUI, setShowUI] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set initial start time once video metadata is loaded
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 5;
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;

      // Logic to "Cut" the video:
      // If the video exceeds 53 seconds, loop it back to the 4.5s mark
      if (time >= 53) {
        videoRef.current.currentTime = 4.5;
      }

      // If for any reason it goes before 4.5s (like a manual seek), skip to 4.5s
      if (time < 4.5) {
        videoRef.current.currentTime = 4.5;
      }

      // Show UI during the valid playback window
      setShowUI(time >= 4.5 && time < 53);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-0 w-full"
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
        >
          <source src="/blogs/HeroSectionVideo.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
        <AnimatePresence>
          {showUI && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="flex flex-col items-center pointer-events-auto"
            >
              <motion.h1
                variants={itemVariants}
                className="font-serif text-4xl md:text-7xl text-white mb-6"
              >
                Purity in Every Grain
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 font-light"
              >
                Experience the ancient minerals of the Himalayas, delivered
                directly to your home.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
