"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function EssenceGallery() {
  return (
    <AnimatedSection className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
        >
          Experience the Essence
        </motion.h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              src: "/blogs/salt-lamp.webp",
              alt: "Crystals",
            },
            {
              src: "/blogs/heart-salt-lamp.webp",
              alt: "Salt Lamp",
              delay: 0.2,
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: img.delay || 0 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-96 overflow-hidden rounded-lg md:h-[500px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
