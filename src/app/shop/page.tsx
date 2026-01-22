"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Share2, Code2, ArrowUpRight } from "lucide-react";

const ServiceCard = ({ title, description, Icon, image }) => {
  return (
    <div className="w-full overflow-hidden rounded-[2.5rem] bg-[#121212] p-4 text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
      {/* 1. IMAGE CONTAINER */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative h-64 overflow-hidden rounded-[2rem] bg-black cursor-pointer group/img"
      >
        {/* THE IMAGE: Uses a spring transition for a more "elastic" feel */}
        <motion.img
          src={image}
          variants={{
            rest: { scale: 1, filter: "brightness(1) contrast(1)" },
            hover: { scale: 1.12, filter: "brightness(1.05) contrast(1.05)" },
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
          className="h-full w-full object-cover"
          alt={title}
        />

        {/* THE REVEAL OVERLAY: Shadow layer + Glass Blur */}
        <motion.div
          className="absolute inset-0 h-full w-full backdrop-blur-[2px]"
          variants={{
            rest: {
              opacity: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              WebkitMaskImage:
                "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
            },
            hover: {
              opacity: [0, 1, 1, 0],
              WebkitMaskImage: [
                "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
                "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 60%)",
                "radial-gradient(circle, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)",
                "radial-gradient(circle, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%)",
              ],
            },
          }}
          transition={{
            duration: 1.4,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut",
          }}
        />

        {/* THE "GLINT": A fast white shine that sweeps across on hover */}
        <motion.div
          className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
          variants={{
            rest: { x: "-100%", skewX: -20 },
            hover: { x: "200%", skewX: -20 },
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="mt-6 px-3 pb-4">
        {/* 2. ICON ANIMATION */}
        <motion.div
          whileHover={{
            rotate: [0, -10, 360],
            color: "#a3e635",
            scale: 1.1,
          }}
          initial={{ color: "#9ca3af" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-4 inline-block"
        >
          <Icon size={34} strokeWidth={1.5} />
        </motion.div>

        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white/90">
          {title}
        </h3>
        <p className="mb-8 text-[#888888] text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* 3. FOOTER BUTTON: Premium Independent Hover */}
        <motion.div
          whileHover="buttonHover"
          initial="buttonRest"
          className="relative cursor-pointer group/btn"
        >
          <motion.div
            variants={{
              buttonRest: {
                backgroundColor: "rgba(31,31,31,1)",
                color: "#ffffff",
              },
              buttonHover: { backgroundColor: "#a3e635", color: "#000000" },
            }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="flex items-center justify-between rounded-2xl p-4 shadow-lg overflow-hidden"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Read More
            </span>
            <motion.div
              variants={{
                buttonRest: { x: 0, rotate: 0 },
                buttonHover: { x: 0, rotate: 45 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default function shop() {
  const services = [
    {
      title: "E-Commerce Management",
      description:
        "Streamlining your online store, optimizing and product listings for maximum conversion and scalability.",
      Icon: ShoppingBag,
      image:
        "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800",
    },
    {
      title: "Social Media Marketing",
      description:
        "Optimizing your online presence and managing community engagement across all global social platforms.",
      Icon: Share2,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    },
    {
      title: "Web Development",
      description:
        "Building high-performance, scalable web applications tailored to your business needs and future growth.",
      Icon: Code2,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] py-20 px-6 font-sans flex items-center justify-center selection:bg-lime-400 selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
}
