"use client";
import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
// Import all icons here
import { ShieldCheck, Leaf, Globe, Award, CheckCircle2 } from "lucide-react";

// Create a lookup map
const IconMap = {
  ShieldCheck: ShieldCheck,
  CheckCircle2: CheckCircle2,
  Leaf: Leaf,
  Award: Award,
  Globe: Globe,
};

export default function Certifications() {
  return (
    <section className="bg-[#FAF8F5] py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-10">
          {certifications.map((cert, index) => {
            // Get the component from the map using the string name
            const Icon = IconMap[cert.iconName as keyof typeof IconMap];

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 group-hover:border-[#CE978C]/30 transition-all">
                  {/* Render the Icon */}
                  {Icon && (
                    <Icon
                      className={`h-10 w-10 ${cert.color}`}
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {cert.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
