"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { offerings } from "@/data/offerings";

export default function OfferingsGrid() {
  return (
    // Removed extra flex-col and padding to keep it tight
    <div className="mx-auto max-w-6xl bg-[#FAF8F5]">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-center font-serif text-3xl font-light text-slate-800 md:text-4xl"
      >
        Pure Offerings
      </motion.h2>

      {/* 1. Removed h-screen and custom-scrollbar
          2. Added h-[70vh] (adjust this value to control where the cut-off happens)
          3. overflow-hidden ensures no scrollbars appear
          4. mask-image creates a fade-to-transparent at the bottom 10%
      */}
      <div
        className="relative h-[75vh] overflow-hidden px-4"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative flex flex-col"
            >
              {/* IMAGE CONTAINER: Reduced gap and margin */}
              <div className="relative h-52 w-full overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm">
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                  variants={{
                    rest: { x: "-100%", skewX: -20 },
                    hover: { x: "200%", skewX: -20 },
                  }}
                  transition={{ duration: 0.7 }}
                />
              </div>

              {/* TEXT CONTENT: Tighter spacing */}
              <div className="mt-2 px-1">
                <h3 className="font-serif text-lg font-light text-slate-800 transition-colors group-hover:text-[#CE978C]">
                  {offering.title}
                </h3>
                <p className="text-xs text-slate-600 leading-tight line-clamp-1 italic">
                  {offering.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
