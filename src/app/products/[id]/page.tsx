import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/Products/AddToCartButton";
import ProductGallery from "@/components/Products/ProductGallery";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  // Fetch ALL images in the product folder
  let imageUrls: string[] = [];
  if (product.image_folder) {
    const { data: files } = await supabase.storage
      .from("products")
      .list(product.image_folder);

    if (files && files.length > 0) {
      // Map through all files to get their public URLs
      imageUrls = files.map((file) => {
        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(`${product.image_folder}/${file.name}`);
        return data.publicUrl;
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Interactive Image Gallery */}
          <ProductGallery images={imageUrls} productName={product.name} />

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            <nav className="mb-4 text-sm text-slate-500">
              <span className="hover:text-[#CE978C] cursor-pointer">
                Products
              </span>{" "}
              / {product.category || "General"}
            </nav>

            <h1 className="mb-4 font-serif text-4xl font-light text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            <p className="mb-6 text-2xl font-medium text-[#CE978C]">
              ${Number(product.price ?? 0).toFixed(2)}
            </p>

            <div className="mb-8 border-t border-slate-200 pt-8">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
                Description
              </h3>
              <p className="leading-relaxed text-slate-600">
                {product.description ||
                  "No description available for this premium Himalayan salt product."}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Availability:{" "}
                <span
                  className={
                    product.stock_quantity > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {product.stock_quantity > 0
                    ? `In Stock (${product.stock_quantity})`
                    : "Out of Stock"}
                </span>
              </p>
              <AddToCartButton product={product} />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500">
              <div className="flex items-center gap-2">✨ 100% Natural</div>
              <div className="flex items-center gap-2">🚚 Fast Shipping</div>
              <div className="flex items-center gap-2">🔒 Secure Payments</div>
              <div className="flex items-center gap-2">🌱 Sustainable</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
