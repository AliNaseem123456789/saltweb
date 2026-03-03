"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { contactInfo } from "@/data/contactinfo";
import { sendContactEmail } from "@/app/actions/contact";

export default function ContactPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setIsVideoReady(true);
    const playVideo = () => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Autoplay blocked. Waiting for interaction.");
          });
        }
      }
    };
    const timeoutId = setTimeout(playVideo, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setStatus({ type: null, msg: "" });

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    const result = await sendContactEmail(data);

    setIsPending(false);
    if (result.success) {
      setStatus({
        type: "success",
        msg: "Message sent successfully! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } else {
      setStatus({
        type: "error",
        msg: result.error || "Something went wrong.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-[#B8857A]">
        <div className="absolute inset-0 z-0">
          {isVideoReady && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover opacity-60 transition-opacity duration-1000"
              style={{ opacity: isVideoReady ? 0.6 : 0 }}
            >
              <source src="/blogs/FeaturedVideo4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="mx-auto max-w-4xl text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-serif text-5xl font-light text-white md:text-6xl lg:text-7xl drop-shadow-lg"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 md:text-2xl drop-shadow-md"
            >
              We&apos;d love to hear from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg bg-white p-8 shadow-sm border border-slate-100"
            >
              <h2 className="mb-6 font-serif text-3xl font-light text-slate-800">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[#CE978C] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[#CE978C] focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[#CE978C] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                {status.type && (
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {status.msg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-lg bg-[#CE978C] px-6 py-3 text-white hover:bg-[#B8857A] transition-colors disabled:opacity-50 font-medium"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-3xl font-light text-slate-800">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg bg-white p-6 border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h3 className="font-serif text-xl text-slate-800">
                        {info.title}
                      </h3>
                      <p className="text-slate-600">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
