// app/certifications/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Award, FileText } from "lucide-react";

const CERTS = [
  {
    title: "FDA Registered",
    issuer: "U.S. Food and Drug Administration",
    description:
      "Our facilities and products are registered with the FDA, meeting all requirements for export to the United States market.",
    icon: <ShieldCheck className="w-12 h-12 text-[#E07A5F]" />,
  },
  {
    title: "ISO 22000:2018",
    issuer: "International Organization for Standardization",
    description:
      "Certified Food Safety Management System ensuring that our processing meets the highest international safety standards.",
    icon: <CheckCircle className="w-12 h-12 text-[#E07A5F]" />,
  },
  {
    title: "HALAL Certified",
    issuer: "Global Halal Services",
    description:
      "Our products are prepared and processed in strict accordance with Islamic dietary laws, catering to global Muslim consumers.",
    icon: <Award className="w-12 h-12 text-[#E07A5F]" />,
  },
  {
    title: "HACCP Certified",
    issuer: "Food Safety Standards",
    description:
      "Hazard Analysis and Critical Control Points system is implemented to prevent biological, chemical, and physical hazards.",
    icon: <ShieldCheck className="w-12 h-12 text-[#E07A5F]" />,
  },
];

// Ensure this is a DEFAULT export
export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#0A0E1A] py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Quality & Certifications
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          At the heart of our operations is a commitment to purity. We maintain
          the most stringent global standards to deliver the world's finest
          Himalayan Salt.
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {CERTS.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="shrink-0">{cert.icon}</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-800">
                  {cert.title}
                </h3>
                <p className="text-[#E07A5F] font-semibold text-sm uppercase tracking-wide">
                  {cert.issuer}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {cert.description}
                </p>
                <button className="inline-flex items-center gap-2 text-slate-800 font-bold hover:text-[#E07A5F] transition-colors mt-4">
                  <FileText className="w-4 h-4" />
                  View Original Document
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Our Lab Testing Process
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Every batch of our pink salt undergoes rigorous laboratory testing
            for mineral content, purity, and the absence of heavy metals. We
            provide a Certificate of Analysis (COA) with every bulk shipment.
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
            {/* Logos would go here */}
            <div className="h-12 w-24 bg-slate-300 rounded animate-pulse" />
            <div className="h-12 w-24 bg-slate-300 rounded animate-pulse" />
            <div className="h-12 w-24 bg-slate-300 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
