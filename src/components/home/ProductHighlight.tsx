"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
export default function ProductHighlight() {
  return (
    <section className="w-full ">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative group cursor-none md:cursor-default"
          >
            <div className="relative h-96 overflow-hidden rounded-4xl shadow-2xl lg:h-[600px] border border-slate-100">
              <motion.div
                variants={{
                  rest: { scale: 1, filter: "brightness(1)" },
                  hover: { scale: 1.1, filter: "brightness(1.05)" },
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="relative h-full w-full"
              >
                <Image
                  src="/blogs/himaliyansalt.webp"
                  alt="Himalayan Pink Salt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 z-10 backdrop-blur-[3px] pointer-events-none"
                variants={{
                  rest: {
                    opacity: 0,
                    ["WebkitMaskImage" as any]:
                      "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
                    ["maskImage" as any]:
                      "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
                  },
                  hover: {
                    opacity: [0, 1, 1, 0],
                    ["WebkitMaskImage" as any]: [
                      "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
                      "radial-gradient(circle, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 65%)",
                      "radial-gradient(circle, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%)",
                    ],
                    ["maskImage" as any]: [
                      "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%)",
                      "radial-gradient(circle, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 65%)",
                      "radial-gradient(circle, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%)",
                    ],
                  },
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 z-20 bg-linear-to-tr from-transparent via-white/30 to-transparent pointer-events-none"
                variants={{
                  rest: { x: "-100%", skewX: -20 },
                  hover: { x: "200%", skewX: -20 },
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              variants={{
                rest: { opacity: 0, scale: 0.5 },
                hover: { opacity: 1, scale: 1 },
              }}
              className="absolute -top-4 -right-4 z-30 bg-white p-4 rounded-full shadow-xl hidden md:block"
            >
              <span className="text-[#CE978C] font-bold text-xs uppercase tracking-tighter">
                100% Pure
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[#CE978C] uppercase tracking-[0.3em] text-sm font-semibold">
                Premium Quality
              </span>
              <h2 className="mt-4 font-serif text-5xl font-light text-slate-800 md:text-6xl leading-tight">
                Ancient Earth <br /> Himalayan Salt
              </h2>
            </div>
            <p className="text-xl leading-relaxed text-slate-600 font-light">
              Mined from ancient sea beds deep within the Himalayan mountains,
              our pink salt contains
              <span className="text-slate-900 font-medium">
                84 essential trace minerals
              </span>
              preserved for over 250 million years.
            </p>

            <p className="text-lg leading-relaxed text-slate-500 italic">
              "Experience the difference of unrefined purity, where every
              crystal tells a story of geological history."
            </p>

            <motion.div
              whileHover="btnHover"
              initial="btnRest"
              className="pt-4"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#CE978C] px-10 py-4 text-white shadow-xl transition-all"
              >
                <span className="relative z-10 font-medium tracking-wide">
                  Explore Our Range
                </span>
                <motion.div
                  variants={{
                    btnRest: { x: 0, rotate: 0 },
                    btnHover: { x: 5, rotate: 45 },
                  }}
                  className="relative z-10"
                >
                  <ArrowUpRight size={22} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-[#B8857A]"
                  variants={{
                    btnRest: { y: "100%" },
                    btnHover: { y: 0 },
                  }}
                  transition={{ ease: "circOut" }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
