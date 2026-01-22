"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Sparkles } from "lucide-react";

const features = [
  {
    title: "Culinary Excellence",
    desc: "Elevate your dishes with the pure, mineral-rich flavor of Himalayan salt.",
    img: "/blogs/FeaturedVideo3.mp4",
    Icon: Sparkles,
  },
  {
    title: "Natural Wellness",
    desc: "From the heart of the Himalayas to your home. We prioritize sustainable mining practices to ensure the earth is respected as much as the product.",
    img: "/blogs/FeaturedVideo4.mp4",
    Icon: Leaf,
  },
];

export default function FeatureCards() {
  return (
    <div className="mx-auto max-w-7xl bg-[#FAF8F5]">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="group relative flex flex-col"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-4xl bg-slate-200 shadow-xl">
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.1 },
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative h-full w-full"
              >
                <video
                  src={feature.img}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 z-10 backdrop-blur-[2px] pointer-events-none"
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
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 z-20 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                variants={{
                  rest: { x: "-100%", skewX: -20 },
                  hover: { x: "200%", skewX: -20 },
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              variants={{
                rest: { y: 0 },
                hover: { y: -10 },
              }}
              className="relative z-30 -mt-25 mx-6 rounded-4xl bg-white/90 p-8 shadow-2xl backdrop-blur-xl border border-white/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <motion.div
                    variants={{
                      rest: { rotate: 0, color: "#64748b" },
                      hover: { rotate: 360, color: "#CE978C" },
                    }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 inline-block"
                  >
                    <feature.Icon size={32} strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="mb-2 font-serif text-3xl font-light text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="mb-6 text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
              <motion.div
                whileHover="buttonHover"
                initial="buttonRest"
                className="relative cursor-pointer"
              >
                <motion.div
                  variants={{
                    buttonRest: {
                      backgroundColor: "#f8fafc",
                      color: "#1e293b",
                    },
                    buttonHover: {
                      backgroundColor: "#CE978C",
                      color: "#ffffff",
                    },
                  }}
                  className="flex items-center justify-between rounded-xl p-4 transition-shadow"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Explore More
                  </span>
                  <motion.div
                    variants={{
                      buttonRest: { rotate: 0 },
                      buttonHover: { rotate: 45 },
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
