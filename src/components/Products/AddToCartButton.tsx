"use client";
import { useState } from "react";
import { addToCart } from "@/app/actions/cart-wishlist";

export default function AddToCartButton({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    const result = await addToCart(product.id, 1);
    if (result.success) {
      window.dispatchEvent(new Event("cart-updated"));
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading || product.stock_quantity <= 0}
      className="w-full rounded-lg bg-[#CE978C] px-8 py-4 font-semibold text-white transition-all hover:bg-[#B8857A] disabled:opacity-50 md:w-max"
    >
      {loading ? "Adding to Cart..." : "Add to Shopping Bag"}
    </button>
  );
}
