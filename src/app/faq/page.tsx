"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is your Himalayan salt truly authentic?",
    answer:
      "Yes. Our salt is hand-mined directly from the Khewra Salt Mine at the base of the Himalayan Mountains. We ensure every batch is 100% natural, unrefined, and free from modern-day pollutants or additives.",
  },
  {
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer:
      "We offer flexible ordering options. While MOQs vary by SKU, we specialize in Less than Container Load (LCL) shipments. You can mix various products—such as edible salts, lamps, candle holders, and detox stones—within a single shipment to meet your specific inventory needs.",
  },
  {
    question: "Can I request product samples before placing a bulk order?",
    answer:
      "Certainly. We provide complimentary product samples to qualified businesses worldwide. To request a sample, please email us at sales@rmsalt.com using your official corporate email address with your specific requirements.",
  },
  {
    question: "What information is required to process a sample request?",
    answer:
      "To ensure a smooth delivery, please provide your company name, contact person, designation, and a valid business postal address including the zip code and a contact number with your country code.",
  },
  {
    question: "How can I track the status of my samples?",
    answer:
      "Once your samples are dispatched, we will provide you with a DHL tracking code so you can monitor the shipment's progress in real-time until it reaches your doorstep.",
  },
  {
    question: "What are your standard shipping and payment terms?",
    answer:
      "We typically operate on a 30% advance payment basis, with the remaining 70% balance due upon surrender of the Bill of Lading copy. We offer negotiable pricing based on FOB (Karachi Port) or CNF (to your nearest seaport) terms.",
  },
  {
    question: "What documentation is provided to confirm and clear my order?",
    answer:
      "To finalize an order, we require a formal Purchase Order (PO) and branding/labeling instructions. Upon final payment, we provide all necessary legal documentation, including the Commercial Invoice, Certificate of Origin, FDA-USA Certification, and relevant HACCP/ISO analysis reports.",
  },
  {
    question: "What is your weight and quality tolerance level?",
    answer:
      "We maintain a strict (5+/-) tolerance level regarding weight, value, and quality to ensure that the cargo you receive aligns perfectly with the specifications agreed upon in your purchase order.",
  },
  {
    question: "How should I store my salt lamps?",
    answer:
      "Salt lamps are hygroscopic (they attract moisture). To prevent 'sweating,' keep your lamp in a dry room and leave it turned on as much as possible; the warmth from the bulb keeps the salt dry and active.",
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
            className="mt-4 font-serif text-5xl text-slate-900 leading-tight"
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
                <span className="font-serif text-xl text-slate-800 pr-4">
                  {faq.question}
                </span>
                <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF8F5] text-[#CE978C]">
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
            We’re here to help you choose the right product or discuss bulk
            logistics.
          </p>
          <button className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 shadow-sm transition-all hover:bg-[#CE978C] hover:text-white">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
}
