"use client";
import { motion } from "framer-motion";
import PromotionModal from "@/components/home/PromotionModal";
import HeroSection from "@/components/home/HeroSection";
import OfferingsGrid from "@/components/home/OfferingsGrid";
import ProductHighlight from "@/components/home/ProductHighlight";
import Testimonials from "@/components/home/Testimonials";
import EssenceGallery from "@/components/home/EssenceGallery";
import FeatureCards from "@/components/home/FeatureCards";
import TipsGrid from "@/components/home/TipsGrid";
import Certifications from "@/components/home/Certifications";
export default function Home() {
  const sections = [
    { id: "hero", comp: <HeroSection />, isTransparent: true },
    { id: "offerings", comp: <OfferingsGrid /> },
    { id: "highlight", comp: <ProductHighlight /> },
    { id: "testimonials", comp: <Testimonials /> },
    { id: "essence", comp: <EssenceGallery /> },
    { id: "features", comp: <FeatureCards /> },
    { id: "tips", comp: <TipsGrid /> },
    { id: "certs", comp: <Certifications /> },
  ];

  return (
    <div className="relative w-full  ">
      {}
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <video
          src="/blogs/Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <PromotionModal />

      <main className="relative z-10 ">
        {sections.map((section, index) => (
          <section
            key={section.id}
            className="sticky top-0 h-screen w-full"
            style={{
              zIndex: index + 1,
            }}
          >
            {section.isTransparent ? (
              <div className="w-full h-full flex items-center justify-center ">
                {section.comp}
              </div>
            ) : (
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full h-full bg-[#FAF8F5] backdrop-blur-md shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[3rem] "
              >
                <div className="mx-auto max-w-7xl px-6 py-24">
                  {section.comp}
                </div>
              </motion.div>
            )}

            {}
            <div className="absolute top-0 h-[100vh] w-full -z-10 pointer-events-none" />
          </section>
        ))}
        {}
        <div className="h-screen" />
      </main>
    </div>
  );
}
