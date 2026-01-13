"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const features = [
  {
    title: "Culinary Excellence",
    desc: "Elevate your dishes with the pure, mineral-rich flavor of Himalayan salt.",
    img: "/blogs/cooking-guide.jpg",
  },
  {
    title: "Natural Wellness",
    desc: "Support your health journey with nature's most essential minerals.",
    img: "/blogs/salt-bath-recipes.jpg",
    delay: 0.2,
  },
];

export default function FeatureCards() {
  return (
    <AnimatedSection className="relative bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay || 0 }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden rounded-lg md:h-[400px]">
                <Image
                  src={feature.img}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <motion.div
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 left-6 right-6 rounded-lg bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
