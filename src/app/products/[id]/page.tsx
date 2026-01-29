import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/Products/ProductGallery";
import { MessageSquare } from "lucide-react";
import ProductInquirySection from "@/components/Products/ProductInquirySection";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, reviews(*)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  let imageUrls: string[] = [];
  if (product.image_folder) {
    const { data: files } = await supabase.storage
      .from("products")
      .list(product.image_folder);

    if (files && files.length > 0) {
      imageUrls = files.map((file) => {
        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(`${product.image_folder}/${file.name}`);
        return data.publicUrl;
      });
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* LEFT: Product Visuals */}
          <div className="bg-[#F3F4F6] rounded-sm flex items-center justify-center p-8">
            <ProductGallery images={imageUrls} productName={product.name} />
          </div>

          {/* RIGHT: Wholesale Specifications */}
          <div className="flex flex-col pt-4">
            <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {product.name}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              {product.description ||
                "Our Himalayan salt products are all natural and authentic, mined directly from the Khewra salt mine in Pakistan."}
            </p>

            {/* Client-side Interactive Section */}
            <ProductInquirySection sku={product.sku} />
          </div>
        </div>
      </main>

      {/* Floating Inquiry Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-[#0D54A0] p-4 rounded-full text-white shadow-2xl hover:scale-110 transition-transform active:scale-95">
          <MessageSquare size={32} />
        </button>
      </div>
    </div>
  );
}
