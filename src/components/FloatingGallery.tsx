"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const gallerySequences = [
  {
    id: 1,
    images: [
      {
        src: "/banners/products_banner.jpeg",
        initial: { x: -150, y: -50 },
        pos: { left: "12%", top: "15%" },
      },
      {
        src: "/banners/products_banner.jpeg",
        initial: { x: 150, y: -80 },
        pos: { left: "68%", top: "12%" },
      },
    ],
    text: "Purity from the Source",
    theme: "from-orange-900/20",
  },
  {
    id: 2,
    images: [
      {
        src: "/banners/products_banner.jpeg",
        initial: { x: 0, y: 200 },
        pos: { left: "38%", top: "25%" },
      },
    ],
    text: "Crafting Global Excellence",
    theme: "from-blue-900/20",
  },
  {
    id: 3,
    images: [
      {
        src: "/banners/products_banner.jpeg",
        initial: { x: -200, y: 150 },
        pos: { left: "18%", top: "50%" },
      },
      {
        src: "/banners/products_banner.jpeg",
        initial: { x: 300, y: 50 },
        pos: { left: "72%", top: "45%" },
      },
    ],
    text: "Sustainable & Natural Solutions",
    theme: "from-slate-800/20",
  },
];

export default function CinematicHero() {
  const [index, setIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (index < gallerySequences.length) {
      const timer = setTimeout(() => {
        if (index === gallerySequences.length - 1) {
          setShowFinal(true);
          setIndex(index + 1);
        } else {
          setIndex((prev) => prev + 1);
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* 1. DYNAMIC LIGHT LEAK / GLOW (Mimics Video Exposure) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] ${gallerySequences[index]?.theme || "from-orange-900/10"} via-transparent to-transparent z-0`}
        />
      </AnimatePresence>

      {/* 2. FLOATING FILM GRAIN OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {index < gallerySequences.length ? (
            <motion.div
              key={gallerySequences[index].id}
              className="absolute inset-0 w-full h-full"
            >
              {gallerySequences[index].images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: img.initial.x,
                    y: img.initial.y,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1.1, // Subtle continuous zoom (Ken Burns)
                    x: 0,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.4,
                    y: -50,
                    filter: "blur(10px)",
                    transition: { duration: 1 },
                  }}
                  transition={{
                    duration: 4, // Matches sequence time for constant motion
                    ease: "linear",
                  }}
                  className="absolute w-52 h-72 md:w-72 md:h-96 border-[0.5px] border-white/30 shadow-2xl overflow-hidden"
                  style={{ left: img.pos.left, top: img.pos.top }}
                >
                  <Image
                    src={img.src}
                    alt="Apex"
                    fill
                    className="object-cover"
                  />
                  {/* Glass Shine Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </motion.div>
              ))}

              {/* CINEMATIC TEXT */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none"
              >
                <p className="text-[#E07A5F] tracking-[0.8em] text-[10px] md:text-xs font-bold mb-4 uppercase">
                  Apex Global Operations
                </p>
                <h2 className="text-white text-3xl md:text-5xl font-light italic tracking-tight">
                  {gallerySequences[index].text}
                </h2>
              </motion.div>
            </motion.div>
          ) : (
            showFinal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-center"
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#E07A5F] tracking-[1.2em] text-[10px] block mb-6"
                >
                  ESTABLISHED 1963
                </motion.span>
                <h1 className="text-white text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8]">
                  APEX <br />
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
                  >
                    GLOBAL
                  </span>
                </h1>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
