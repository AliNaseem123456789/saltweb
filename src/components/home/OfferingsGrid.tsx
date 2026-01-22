"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { offerings } from "@/data/offerings";

export default function OfferingsGrid() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col bg-[#FAF8F5]">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center font-serif text-3xl font-light text-slate-800 md:text-4xl"
      >
        Pure Offerings
      </motion.h2>

      <div className="custom-scrollbar h-screen overflow-y-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative flex flex-col"
            >
              {/* SMALLER IMAGE: Height reduced from h-72 to h-56 */}
              <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-white shadow-md border border-slate-100">
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

                {/* Mask Effect */}
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(2px)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                  }}
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: [0, 1, 1, 0] },
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Shine */}
                <motion.div
                  className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                  variants={{
                    rest: { x: "-100%", skewX: -20 },
                    hover: { x: "200%", skewX: -20 },
                  }}
                  transition={{ duration: 0.7 }}
                />
              </div>

              {/* TIGHTER TEXT CONTENT */}
              <div className="mt-4 px-2 pb-2">
                <h3 className="font-serif text-xl font-light text-slate-800 transition-colors group-hover:text-[#CE978C]">
                  {offering.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-snug line-clamp-2 italic">
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
