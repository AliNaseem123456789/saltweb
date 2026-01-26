"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Truck } from "lucide-react";

export default function ProductFeatures() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Optional Header for the section */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#CE978C] font-bold uppercase tracking-[0.3em] text-xs"
          >
            The Pure Difference
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-serif text-4xl text-slate-900 md:text-5xl"
          >
            Crafted by Nature
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          <Feature
            index={0}
            icon={<Sparkles strokeWidth={1.2} size={32} />}
            title="Premium Quality"
          >
            Every product is carefully selected and tested to meet our
            uncompromising standards for geological purity.
          </Feature>

          <Feature
            index={1}
            icon={<Leaf strokeWidth={1.2} size={32} />}
            title="Natural & Pure"
          >
            Sourced directly from protected Himalayan mines, containing 84
            essential trace minerals for your well-being.
          </Feature>

          <Feature
            index={2}
            icon={<Truck strokeWidth={1.2} size={32} />}
            title="Ethical Delivery"
          >
            We deliver your products using sustainable packaging, ensuring the
            journey to your home is as pure as the salt itself.
          </Feature>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  children,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative flex flex-col items-center text-center px-4"
    >
      {/* Icon Container with Animated Background Shape */}
      <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
        <motion.div
          animate={{
            borderRadius: [
              "42% 58% 70% 30% / 45% 45% 55% 55%",
              "58% 42% 35% 65% / 55% 55% 45% 45%",
              "42% 58% 70% 30% / 45% 45% 55% 55%",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#FAF8F5] group-hover:bg-[#CE978C]/10 transition-colors duration-500"
        />
        <div className="relative text-[#CE978C] group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
      </div>

      <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">
        {title}
      </h3>

      <p className="max-w-[280px] text-sm leading-relaxed text-slate-500 font-light">
        {children}
      </p>

      {/* Decorative vertical line for desktop separation */}
      {index < 2 && (
        <div className="absolute -right-4 top-1/4 hidden h-1/2 w-[1px] bg-slate-100 md:block" />
      )}
    </motion.div>
  );
}
