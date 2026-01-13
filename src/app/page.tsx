"use client";

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
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <PromotionModal />
      <HeroSection />
      <OfferingsGrid />
      <ProductHighlight />
      <Testimonials />
      <EssenceGallery />
      <FeatureCards />
      <TipsGrid />
      <Certifications />
    </div>
  );
}
