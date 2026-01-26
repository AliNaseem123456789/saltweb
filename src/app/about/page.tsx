"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import AnimatedSection from "@/components/AnimatedSection";
import { healthCards, values } from "@/data/aboutdata";
import { Leaf, ShieldCheck, Mountain } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section: Parallax Style */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/blogs/interior.avif"
            alt="About Us - Himalayan Salt"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl w-full px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-2xl"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 md:p-16 shadow-2xl border border-white/20">
                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-[#CE978C]">
                  Our Legacy
                </span>
                <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-slate-800 md:text-7xl">
                  Purity in <br /> <span className="italic">Every Grain</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 md:text-xl font-light">
                  Mined from ancient sea beds deep within the Himalayas,
                  PureSalt is more than a product—it&apos;s a connection to the
                  earth&apos;s timeless vitality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome Section: Alternating Layout */}
      <AnimatedSection className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl"
            >
              <Image
                src="/blogs/himaliyansalt copy.webp"
                alt="Pink Pantry"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block rounded-full bg-[#FAF8F5] px-4 py-1 text-xs font-bold tracking-widest text-[#CE978C] uppercase">
                Welcome to Pink Pantry
              </div>
              <h2 className="font-serif text-4xl font-light text-slate-900 md:text-6xl">
                Nature&apos;s Finest <br /> Wellness Secret
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-500 font-light">
                <p>
                  At Pink Pantry, our journey began with a simple belief: that
                  nature provides the most profound solutions for health. We
                  don&apos;t just sell salt; we source wellness.
                </p>
                <p>
                  Every crystal is hand-selected and tested to meet
                  uncompromising standards for purity, ensuring 84 essential
                  trace minerals reach your kitchen in their most potent form.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section: Clean Icon Grid */}
      <AnimatedSection className="bg-[#FAF8F5] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="font-serif text-4xl font-light text-slate-900 md:text-5xl">
              Building a Healthier Tomorrow
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#CE978C]/30 rounded-full" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {healthCards.map((card, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="h-full rounded-3xl bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 text-center transition-all"
                >
                  <div className="mb-6 flex justify-center text-[#CE978C]">
                    {card.icon}
                  </div>
                  <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light">
                    {card.description}
                  </p>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Triptych Section: Three Columns */}
      <AnimatedSection className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center">
            <motion.div className="space-y-6 text-center lg:text-right">
              <h3 className="font-serif text-3xl font-light text-slate-900">
                {values[0].title}
              </h3>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                {values[0].text}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] overflow-hidden rounded-full border-[12px] border-[#FAF8F5] shadow-xl"
            >
              <Image
                src="/blogs/ourmission.jpeg"
                alt="Himalayan Salt"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div className="space-y-6 text-center lg:text-left">
              <h3 className="font-serif text-3xl font-light text-slate-900">
                {values[1].title}
              </h3>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                {values[1].text}
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
