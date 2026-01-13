"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProductHighlight() {
  return (
    <AnimatedSection className="bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 overflow-hidden rounded-lg lg:h-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800&h=800&fit=crop"
              alt="Himalayan Pink Salt"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
              Himalayan Pink Salt
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Mined from ancient sea beds deep within the Himalayan mountains,
              our pink salt contains 84 essential trace minerals that have been
              preserved for over 250 million years.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Unlike processed table salt, Himalayan pink salt is unrefined and
              contains no additives...
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-block rounded-lg bg-[#CE978C] px-8 py-3 font-sans text-base font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
              >
                Explore Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
