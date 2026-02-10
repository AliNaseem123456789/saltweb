"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInquiry } from "@/app/actions/inquiry";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  moq: number;
}

export default function InquiryModal({
  isOpen,
  onClose,
  title,
  moq,
}: InquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    countryCode: "+1",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country} (${formData.postalCode})`,
      product_name: title,
      moq: moq,
    };

    const result = await submitInquiry(submissionData);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } else {
      alert("Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {/* FIX 1: added 'overflow-y-auto' and 'py-10' to the backdrop 
          This allows the user to scroll the modal like a page on small screens 
      */}
      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 py-8 md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 md:mb-0"
        >
          {/* Header - Sticky on mobile so you don't lose the X button */}
          <div className="sticky top-0 z-20 bg-white flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-slate-100">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                {isSuccess ? "Success!" : "Personal Information"}
              </h2>
              <p className="text-[10px] md:text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
                Inquiry: {title.slice(0, 20)}... ({moq} Units)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">
                  Request Sent
                </h3>
                <p className="text-slate-600 mt-2 text-sm md:text-base">
                  Our team has received your inquiry. <br />
                  We will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="bg-[#FAF8F5] px-2 py-2.5 border-r border-slate-200 outline-none text-sm"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+92">🇵🇰 +92</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] outline-none text-sm"
                      />
                    </div>
                  </div>

                  <FormField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full md:w-auto px-12 py-3 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-12 py-3 bg-[#CE978C] hover:bg-[#b8857a] text-white font-bold rounded-xl shadow-lg shadow-[#CE978C]/20 transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-200 rounded-lg outline-none focus:border-[#CE978C] transition-colors text-sm"
      />
    </div>
  );
}
