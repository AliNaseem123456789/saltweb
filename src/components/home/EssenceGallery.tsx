"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export default function EssenceGallery() {
  return (
    <div className="mx-auto max-w-7xl py-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
      >
        Experience the Essence
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4">
        {[
          {
            src: "/blogs/essense_imag1.jpg",
            hover: "/blogs/essense_imag1-1.jpg",
            alt: "Crystals",
          },
          {
            src: "/blogs/essense_image2.jpg",
            hover: "/blogs/essense_image2-1.jpg",
            alt: "Salt Lamp",
            delay: 0.2,
          },
        ].map((img, i) => (
          <motion.div
            key={i}
            initial="initial"
            whileHover="hovered"
            whileInView="initial"
            viewport={{ once: true }}
            className="group relative h-96 overflow-hidden rounded-2xl md:h-[500px] cursor-pointer"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i < 2}
            />
            <motion.div
              variants={{
                initial: { opacity: 0 },
                hovered: { opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={img.hover}
                alt={`${img.alt} hover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 z-20 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
