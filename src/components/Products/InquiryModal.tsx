"use client";

import { useState } from "react";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitInquiry } from "@/app/actions/inquiry"; // Ensure this path is correct

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // The Product Name
  moq: number; // The Quantity from the details page
}

export default function InquiryModal({
  isOpen,
  onClose,
  title,
  moq,
}: InquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
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
      // Reset form or close after delay
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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">
                {isSuccess ? "Success!" : "Personal Information"}
              </h2>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
                Inquiry for: {title} ({moq} Units)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">
                  Request Sent Successfully
                </h3>
                <p className="text-slate-600 mt-2">
                  Our team has received your inquiry for{" "}
                  <strong>{title}</strong>. <br />
                  We will contact you via email or phone shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  {/* Phone with Country Code */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <div className="flex border border-slate-200 rounded overflow-hidden">
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
                        className="w-full px-4 py-2.5 bg-[#FAF8F5] outline-none"
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

                {/* Footer Buttons */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-12 py-2.5 bg-slate-100 text-slate-600 font-medium rounded hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-12 py-2.5 bg-[#CE978C] hover:bg-[#b8857a] text-white font-medium rounded hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
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

// Helper component for cleaner code
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
        className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-200 rounded outline-none focus:border-[#0D54A0] transition-colors"
      />
    </div>
  );
}
