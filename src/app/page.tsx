"use client";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/Testimonials";
import OfferingsGrid from "@/components/home/OfferingsGrid";
import TipsGrid from "@/components/home/TipsGrid";
import ProductHighlight from "@/components/home/ProductHighlight";
import EssenceGallery from "@/components/home/EssenceGallery";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <HeroSection />
      <OfferingsGrid />

      <ProductHighlight />
      <EssenceGallery />

      <TipsGrid />
      <Testimonials />
    </div>
  );
}
