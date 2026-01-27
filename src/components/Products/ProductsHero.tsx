"use client";
import { motion } from "framer-motion";
export default function ProductsHero() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-[#B8857A]">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-contain"
        >
          <source src="/blogs/ShopPageVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg"
          ></motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 md:text-2xl drop-shadow-md"
          ></motion.p>
        </div>
      </div>
    </section>
  );
}
