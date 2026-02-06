"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { ShieldCheck, Globe, Award, Factory } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Original High-End Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/blogs/interior.avif"
            alt="Apex Global Legacy"
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
                  Established 2006
                </span>
                <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-slate-800 md:text-7xl">
                  A Legacy of <br /> <span className="italic">Excellence</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 md:text-xl font-light">
                  For over two decades, Apex Global has been the definitive
                  bridge between the ancient salt ranges of Pakistan and the
                  global wellness market.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Achievements Row */}
      <div className="relative z-10 -mt-12 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Years in Industry", value: "20+" },
            { label: "Global Markets", value: "50+" },
            { label: "Annual Export", value: "10k+ Tons" },
            { label: "Compliance", value: "ISO/FDA" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow-xl rounded-xl border border-slate-100 text-center"
            >
              <div className="text-2xl font-bold text-slate-800">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#CE978C] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Content: Identity Section */}
      <AnimatedSection className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl text-slate-900 leading-tight">
                Quality Mined from the <br />
                Heart of the Himalayas
              </h2>
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  Apex Global is a premier wholesale supplier and exporter
                  specializing in the extraction, manufacturing, and
                  distribution of 100% natural Himalayan Pink Salt.
                </p>
                <p>
                  Our 20-year history is built on the trust of domestic and
                  international partners who rely on us for consistent,
                  premium-grade products processed with state-of-the-art
                  technology.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/blogs/himaliyansalt copy.webp"
                alt="Manufacturing Operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision Row */}
      <AnimatedSection className="bg-[#FAF8F5] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200/60">
              <Globe className="text-[#CE978C] mb-6" size={32} />
              <h3 className="text-2xl font-serif mb-4 text-slate-900">
                Our Vision
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                To be the global leader in salt-based wellness, fostering a
                healthier world through the purity of nature’s most essential
                mineral while setting the benchmark for transparency.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200/60">
              <ShieldCheck className="text-[#CE978C] mb-6" size={32} />
              <h3 className="text-2xl font-serif mb-4 text-slate-900">
                Our Mission
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                To provide high-quality, sustainably sourced Himalayan salt
                products while empowering our partners through a transparent and
                secure supply chain and ethical mining practices.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Corporate Capabilities */}
      <AnimatedSection className="px-6 py-24 bg-white">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-4xl text-slate-900 mb-16">
            The Apex Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Factory size={36} />,
                title: "Advanced Facilities",
                desc: "Our facility processes everything from gourmet edible salt to handcrafted spa products with precision.",
              },
              {
                icon: <Award size={36} />,
                title: "Global Standards",
                desc: "We adhere to international food safety and environmental standards, including FDA and ISO certifications.",
              },
              {
                icon: <ShieldCheck size={36} />,
                title: "Private Labeling",
                desc: "Custom packaging and tailored product lines to help our partners build their unique brand identity.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <div className="text-[#CE978C] bg-[#FAF8F5] p-5 rounded-full">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  {item.title}
                </h4>
                <p className="text-slate-500 font-light max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
