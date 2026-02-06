"use client";

import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  image_url?: string | null;
  hover_image_url?: string | null;
  stock_quantity?: number | null;
  is_active?: boolean | null;
  category?: string | null;
  created_at?: string;
  [key: string]: unknown;
}

interface ProductsGridProps {
  products: Product[];
  wishlistItems?: string[];
}

export default function ProductsGrid({
  products,
  wishlistItems = [],
}: ProductsGridProps) {
  const wishlistSet = new Set(wishlistItems);

  return (
    // We keep the background consistent, but allow the section to be wider
    <AnimatedSection className="bg-[#FAF8F5] px-4 md:px-6 lg:px-8 py-10">
      {/* Increased from max-w-7xl (1280px) to max-w-[1500px]. 
          This gives the grid "room to breathe" alongside your sidebar.
      */}
      <div className="mx-auto max-w-[1500px]">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-20 text-center shadow-sm border border-slate-100">
            <p className="text-xl text-slate-500 font-light">
              No products found in this category.
            </p>
          </div>
        ) : (
          /* GRID LOGIC:
             - gap-8: More space between cards for a premium feel
             - lg:grid-cols-3: Standard with sidebar
             - xl:grid-cols-4: Takes advantage of the new 1500px width
          */
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                // Ensure your ProductCard is set up to receive these props
                // isInWishlist={wishlistSet.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
