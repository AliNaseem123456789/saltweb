"use client";

import { useState } from "react";
import InquiryModal from "./InquiryModal";

interface ProductInquirySectionProps {
  sku: string;
}

export default function ProductInquirySection({
  sku,
}: ProductInquirySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("General Inquiry");

  const handleOpenModal = (type: string) => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* MOQ Counter removed. 
        Quantity and Message are now handled inside the InquiryModal.
      */}
      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={() => handleOpenModal("Get a Quote")}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Get a Quote
        </button>
        <button
          onClick={() => handleOpenModal("Free Sample Request")}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Free Sample
        </button>
        <button
          onClick={() => handleOpenModal("Customize Offer")}
          className="flex-1 min-w-[150px] bg-[#F3F4F6] hover:bg-slate-200 py-4 px-6 rounded-md font-semibold text-slate-800 transition-all border border-slate-200"
        >
          Customize Offer
        </button>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        moq={0}
        title={`${inquiryType} - SKU: ${sku || "N/A"}`}
      />
    </>
  );
}
