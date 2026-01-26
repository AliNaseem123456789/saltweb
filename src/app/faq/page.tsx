"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";

const faqs = [
  {
    question: "Is your Himalayan salt truly authentic?",
    answer:
      "Yes. Our salt is hand-mined directly from the Khewra Salt Mine at the base of the Himalayan Mountains. We ensure every batch is 100% natural, unrefined, and free from modern-day pollutants or additives.",
  },
  {
    question: "What makes Himalayan salt different from regular table salt?",
    answer:
      "Unlike processed table salt, Himalayan salt is unrefined and contains 84 different trace minerals, including calcium, magnesium, and iron. These minerals give the salt its characteristic pink hue and a more complex flavor profile.",
  },
  {
    question: "How should I store my salt lamps?",
    answer:
      "Salt lamps are hygroscopic (they attract moisture). To prevent 'sweating,' keep your lamp in a dry room and leave it turned on as much as possible; the warmth from the bulb keeps the salt dry and active.",
  },
  {
    question: "Are your mining practices ethical?",
    answer:
      "Absolutely. We work directly with family-owned mines that prioritize fair wages, safe working conditions, and traditional hand-carving methods that minimize environmental impact.",
  },
  {
    question: "Do you offer wholesale or bulk pricing?",
    answer:
      "Yes, we partner with wellness centers, spas, and retailers worldwide. Please reach out via our Contact page for our current wholesale catalog and volume pricing.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#CE978C] font-bold uppercase tracking-[0.3em] text-xs"
          >
            Support Center
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-serif text-5xl text-slate-900"
          >
            Frequently Asked <br />{" "}
            <span className="italic font-light">Questions</span>
          </motion.h1>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <span className="font-serif text-xl text-slate-800">
                  {faq.question}
                </span>
                <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F5] text-[#CE978C]">
                  {openIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="border-t border-slate-50 p-6 pt-0 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[2rem] bg-[#EAE9E3] p-10 text-center"
        >
          <h3 className="font-serif text-2xl text-slate-800">
            Still have questions?
          </h3>
          <p className="mt-2 text-slate-600">
            We’re here to help you choose the right product.
          </p>
          <button className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 shadow-sm transition-all hover:bg-[#CE978C] hover:text-white">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
