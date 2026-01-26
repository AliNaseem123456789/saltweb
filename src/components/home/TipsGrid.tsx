"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import { tips } from "@/data/tips";

export default function TipsGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
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
            {/* Wrap the whole card or just the button. 
              Usually, for better UX, making the whole card clickable is best.
            */}
            <Link href={`/blog/${tip.id}`}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
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
                  <h3 className="mb-2 font-serif text-2xl font-light text-slate-800 group-hover:text-[#CE978C] transition-colors">
                    {tip.title}
                  </h3>
                  <p className="mb-4 text-slate-600 line-clamp-2">
                    {tip.description}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#B8857A]"
                  >
                    Read More
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
