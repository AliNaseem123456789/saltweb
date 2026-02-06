"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Added this import

export default function ProductsHero() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden">
      <Image
        src="/banners/products_banner.jpeg" // Remember to check your actual file extension!
        alt="Premium Himalayan Salt Products Banner"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              Our Products
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Discover our complete collection of premium Himalayan salt
              products
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
