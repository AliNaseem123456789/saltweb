"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <AnimatedSection className="bg-[#FAF8F5] px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[#CE978C] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Voices of Purity
          </span>
          <h2 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={index} index={index}>
              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-full rounded-[2rem] bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 transition-shadow hover:shadow-2xl"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute top-6 right-10 font-serif text-8xl text-slate-50 opacity-10">
                  &quot;
                </span>

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#CE978C]/20 p-1">
                      <div className="relative h-full w-full overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-slate-800 leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex gap-1 text-[#CE978C]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="italic leading-relaxed text-slate-600">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>
              </motion.div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
