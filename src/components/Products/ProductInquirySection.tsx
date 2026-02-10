"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import InquiryModal from "./InquiryModal";

interface ProductInquirySectionProps {
  sku: string;
}

export default function ProductInquirySection({
  sku,
}: ProductInquirySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moq, setMoq] = useState(100);
  const productMoq = 500;
  return (
    <>
      {/* Specification: Weight/Variant */}
      {/* <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-slate-900">Weight</h3>
        <button className="bg-[#0D54A0] text-white px-6 py-3 rounded-md font-medium text-sm transition-hover hover:bg-blue-800">
          10 KG – {sku || "N/A"}
        </button>
      </div> */}

      {/* Specification: MOQ Selection */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
        <h3 className="text-xl font-bold leading-tight text-slate-900">
          Minimum of Quantity <br /> (MOQ)
        </h3>
        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden w-fit">
          <button
            onClick={() => setMoq(Math.max(1, moq - 10))}
            className="p-3 bg-[#CE978C] hover:bg-[#b8857a] text-white transition-colors"
          >
            <Minus size={20} />
          </button>
          <div className="w-24 text-center font-semibold bg-[#F3F4F6] py-3 text-slate-800">
            {moq}
          </div>
          <button
            onClick={() => setMoq(moq + 10)}
            className="p-3  bg-[#CE978C] hover:bg-[#b8857a] text-white transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Get a Quote
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Free Sample
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Customize Offer
        </button>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        moq={productMoq}
        title="Inquiry Form"
      />
    </>
  );
}
