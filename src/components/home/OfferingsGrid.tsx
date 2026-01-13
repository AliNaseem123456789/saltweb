"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import { offerings } from "@/data/offerings";

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
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={offering.image}
                    alt={offering.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                    {offering.title}
                  </h3>
                  <p className="text-slate-600">{offering.description}</p>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
