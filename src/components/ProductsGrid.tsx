"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ProductCard from "@/components/ProductCard";
import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
} from "@/app/actions/cart-wishlist";

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
  const [localWishlistItems, setLocalWishlistItems] =
    useState<string[]>(wishlistItems);
  const [wishlistLoadingStates, setWishlistLoadingStates] = useState<
    Record<string, boolean>
  >({});
  const [cartLoadingStates, setCartLoadingStates] = useState<
    Record<string, boolean>
  >({});

  const wishlistSet = new Set(localWishlistItems);

  const handleWishlistToggle = async (
    productId: string,
    isCurrentlyInWishlist: boolean,
  ) => {
    setWishlistLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      let result;
      if (isCurrentlyInWishlist) {
        result = await removeFromWishlist(productId);
        if (result.success) {
          setLocalWishlistItems((prev) =>
            prev.filter((id) => id !== productId),
          );
          window.dispatchEvent(new Event("wishlist-updated"));
          alert("Removed from wishlist");
        }
      } else {
        result = await addToWishlist(productId);
        if (result.success) {
          setLocalWishlistItems((prev) => [...prev, productId]);
          window.dispatchEvent(new Event("wishlist-updated"));
          alert("Added to wishlist");
        }
      }

      if (!result?.success && result?.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setWishlistLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (productId: string) => {
    setCartLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const result = await addToCart(productId, 1);

      if (result.success) {
        alert("Added to cart!");
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setCartLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <AnimatedSection className="bg-[#FAF8F5] px-4 md:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-[1400px]">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-20 text-center shadow-sm border border-slate-100">
            <p className="text-xl text-slate-500 font-light">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div key={product.id} className="flex justify-center">
                <ProductCard
                  product={product}
                  index={index}
                  isInWishlist={wishlistSet.has(product.id)}
                  onWishlistToggle={handleWishlistToggle}
                  onAddToCart={handleAddToCart}
                  isLoading={wishlistLoadingStates[product.id]}
                  isCartLoading={cartLoadingStates[product.id]}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
