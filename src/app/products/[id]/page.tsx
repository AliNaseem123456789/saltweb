import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/Products/ProductGallery";
import { MessageSquare, Weight } from "lucide-react";
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
          <div className="bg-[#F3F4F6] rounded-sm flex items-center justify-center p-8 sticky top-24 h-fit">
            <ProductGallery images={imageUrls} productName={product.name} />
          </div>

          {/* RIGHT: Wholesale Specifications */}
          <div className="flex flex-col pt-4">
            <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {product.name}
            </h1>

            {/* <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-700 font-semibold shadow-sm">
                <Weight size={20} className="text-[#0D54A0]" />
                {product.weight || "NA"}
              </span>
            </div> */}

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg border-l-4 border-slate-100 pl-6">
              {product.description ||
                "Our Himalayan salt products are all natural and authentic, mined directly from the Khewra salt mine in Pakistan."}
            </p>

            {/* Wholesale Info Grid */}
            <div className="grid grid-cols-2 gap-y-6 border-t border-slate-100 pt-8 mb-10">
              <div>
                <span className="block text-xs uppercase text-slate-400 font-bold tracking-widest mb-1">
                  Category
                </span>
                <span className="text-slate-900 font-semibold">
                  {product.category || "Himalayan Salt"}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase text-slate-400 font-bold tracking-widest mb-1">
                  Standard Packaging
                </span>
                <span className="text-slate-900 font-semibold">
                  {product.weight || "NA"}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase text-slate-400 font-bold tracking-widest mb-1">
                  Origin
                </span>
                <span className="text-slate-900 font-semibold">Pakistan</span>
              </div>
              <div>
                <span className="block text-xs uppercase text-slate-400 font-bold tracking-widest mb-1">
                  SKU
                </span>
                <span className="text-slate-900 font-semibold">
                  {product.sku || product.id.slice(0, 8).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-slate-900">Weight</h3>
              <button className="bg-[#0D54A0] text-white px-6 py-3 rounded-md font-medium text-sm transition-hover hover:bg-blue-800">
                {product.weight || "NA"}
              </button>
            </div>
            {/* Client-side Interactive Section */}
            <ProductInquirySection sku={product.sku || product.id} />
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
