"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { offerings } from "@/data/offerings";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";

export default function OfferingsGrid() {
  return (
    <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
        >
          Discover Our Pure Offerings
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering, index) => (
            <AnimatedCard key={index} index={index}>
              <Link
                href={`/products?category=${encodeURIComponent(offering.category)}`}
                className="group block"
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-82 w-full overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <motion.div
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.05 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={offering.image}
                        alt={offering.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 33vw"
                      />
                    </motion.div>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"
                      variants={{
                        rest: { x: "-100%", skewX: -20 },
                        hover: { x: "200%", skewX: -20 },
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="mt-5 px-2 flex flex-col items-start">
                    <h3 className="font-serif text-2xl font-light text-slate-800 transition-colors group-hover:text-[#CE978C]">
                      {offering.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed italic mt-1 mb-4">
                      {offering.description}
                    </p>

                    {/* The "View" Button */}
                    <div className="bg-[#CE978C] group-hover:bg-[#b8857a] text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-sm">
                      View Collection
                    </div>
                  </div>
                </motion.div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
