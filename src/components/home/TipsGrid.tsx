"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import { tips } from "@/data/tips";

export default function TipsGrid() {
  return (
    // <AnimatedSection className="bg-[#FAF8F5] px-4 py-20 pt-32">
    <div className="mx-auto max-w-7xl">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
      >
        Discover Insight Tips
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {tips.map((tip, index) => (
          <AnimatedCard key={index} index={index}>
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                  {tip.title}
                </h3>
                <p className="mb-4 text-slate-600">{tip.description}</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/blog"
                    className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#B8857A]"
                  >
                    Read More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>
    </div>
    // </AnimatedSection>
  );
}
