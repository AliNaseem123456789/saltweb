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
    <AnimatedSection className="bg-[#FAF8F5] px-4 md:px-6 lg:px-8 py-10">
      {/* Reduced max-width slightly from 1500px to 1400px. 
          With 3 columns, this ensures each card is significantly wider/larger 
          without becoming stretched on ultra-wide screens.
      */}
      <div className="mx-auto max-w-[1400px]">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-20 text-center shadow-sm border border-slate-100">
            <p className="text-xl text-slate-500 font-light">
              No products found in this category.
            </p>
          </div>
        ) : (
          /* GRID LOGIC UPDATED:
             - gap-10: Increased gap to separate the now-larger cards.
             - lg:grid-cols-3 & xl:grid-cols-3: Forces 3 items per row on all large screens.
          */
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
