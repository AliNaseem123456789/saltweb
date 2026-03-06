"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const privateLabelFeatures = [
  {
    title: "Hand-Mined",
    description:
      "Combined craftsmanship and Himalayan rock salt in producing salt products",
    icon: (
      <svg
        className="w-8 h-8 text-[#CE978C]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 3a1 1 0 10-2 0M5.25 22.125l13.5-13.5a2.652 2.652 0 00-3.75-3.75L1.5 18.375V22.5h4.125z"
        />
      </svg>
    ),
  },
  {
    title: "Minimal Lead Time",
    description:
      "Our robust process allows us to deliver your shipments on time.",
    icon: (
      <svg
        className="w-8 h-8 text-[#CE978C]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    description: "Focuses on client satisfaction with premium quality.",
    icon: (
      <svg
        className="w-8 h-8 text-[#CE978C]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    description: "We can meet quality standards to deliver premium products.",
    icon: (
      <svg
        className="w-8 h-8 text-[#CE978C]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export default function PrivateLabelPage() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-slate-800 mb-6"
          >
            What we serve
          </motion.h2>
          <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
            We constantly struggle to challenge the boundaries of all the
            possibilities in Himalayan salt craftsmanship.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {privateLabelFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>
              <Link
                href="/contact"
                className="text-[#CE978C] font-semibold text-sm hover:underline inline-flex items-center gap-2"
              >
                Explore More →
              </Link>
            </div>
          ))}
        </div>

        {/* --- PRODUCT GALLERY SECTION --- */}
        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Image 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src="/PrivateLabel/image_1.webp"
                  alt="Grinder Jar Plastic"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: "350px" }}
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#CE978C] block mb-1">
                  Option 01
                </span>
                <p className="text-slate-800 font-medium text-lg">
                  Grinder Jar Plastic
                </p>
              </div>
            </motion.div>

            {/* Image 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src="/PrivateLabel/image_2.webp"
                  alt="Retail Ready"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: "350px" }}
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#CE978C] block mb-1">
                  Option 02
                </span>
                <p className="text-slate-800 font-medium text-lg">
                  Himalayan Salt - Heart Lamp
                </p>
              </div>
            </motion.div>

            {/* Image 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src="/PrivateLabel/image_3.webp"
                  alt="Bulk Supply"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: "350px" }}
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#CE978C] block mb-1">
                  Option 03
                </span>
                <p className="text-slate-800 font-medium text-lg">
                  Animal Salt
                </p>
              </div>
            </motion.div>

            {/* Image 04 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-sm border border-slate-200 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src="/PrivateLabel/image_4.webp"
                  alt="Custom Jar"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-110"
                  style={{ minHeight: "350px" }}
                />
              </div>
              <div className="mt-6 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#CE978C] block mb-1">
                  Option 04
                </span>
                <p className="text-slate-800 font-medium text-lg">
                  Himalayan Salt Night Light
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Secondary Info Section - Full Width Text */}
        <div className="bg-[#FDF8F7] rounded-[3rem] p-8 md:p-16 border border-[#CE978C]/10 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-3xl md:text-5xl text-slate-800 mb-8 leading-tight">
              Custom Branding & Packaging
            </h3>
            <p className="text-slate-600 mb-10 text-lg md:text-xl font-light leading-relaxed">
              From gourmet salts to therapeutic lamps, we provide full private
              labeling services. Our production facility is equipped to handle
              customized packaging, brand-specific labels, and unique jar shapes
              to ensure your brand stands out in the global market.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#CE978C] text-white px-12 py-4 rounded-full font-semibold hover:bg-[#b8857a] transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
