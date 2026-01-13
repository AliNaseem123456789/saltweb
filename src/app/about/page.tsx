"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import AnimatedSection from "@/components/AnimatedSection";
import { healthCards, values } from "@/data/aboutdata";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section with Text Box */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/blogs/science-of-salt.jpg"
          alt="About Us - Himalayan Salt"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl w-full px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-2xl"
            >
              <div className="bg-white/85 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-xl">
                <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
                  About PureSalt
                </h1>
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                  Discover the story behind our commitment to bringing you
                  nature&apos;s purest Himalayan salt, mined from ancient sea
                  beds and delivered with care to your home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome to Pink Pantry Section */}
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
                src="/blogs/science-of-salt.jpg"
                alt="Pink Pantry"
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
                Welcome to Pink Pantry
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                At Pink Pantry, we&apos;re passionate about bringing you the
                finest Himalayan salt products. Our journey began with a simple
                belief: that nature provides the best solutions for health and
                wellness.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Every product in our collection is carefully selected and tested
                to meet our uncompromising standards for purity and quality. We
                work directly with trusted suppliers in the Himalayan region to
                ensure authenticity and traceability.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                From fine grain salt for your kitchen to luxurious bath salts
                for your wellness routine, Pink Pantry offers a complete range
                of Himalayan salt products to enhance your daily life.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Building Healthier Tomorrow with Three Cards */}
      <AnimatedSection className="bg-[#EAE9E3] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            Building Healthier Tomorrow
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {healthCards.map((card, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg bg-white p-8 shadow-sm text-center"
                >
                  <div className="mb-4 text-5xl">{card.icon}</div>
                  <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">
                    {card.title}
                  </h3>
                  <p className="text-slate-600">{card.description}</p>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Image in Middle with Two Text Sections on Both Sides */}
      <AnimatedSection className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl font-light text-slate-800">
                {values[0].title}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600">
                {values[0].text}
              </p>
            </motion.div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 overflow-hidden rounded-lg lg:h-[500px]"
            >
              <Image
                src="/blogs/science-of-salt.jpg"
                alt="Himalayan Salt"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl font-light text-slate-800">
                {values[1].title}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600">
                {values[1].text}
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

//testing stash
