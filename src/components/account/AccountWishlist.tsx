// components/AccountWishlist.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import { removeFromWishlist } from "@/app/actions/cart-wishlist";

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category?: string;
}

interface AccountWishlistProps {
  wishlist: WishlistProduct[];
}

export default function AccountWishlist({ wishlist }: AccountWishlistProps) {
  const [items, setItems] = useState(wishlist);
  const [removing, setRemoving] = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    setRemoving(productId);
    try {
      const result = await removeFromWishlist(productId);
      if (result.success) {
        setItems(items.filter((item) => item.id !== productId));
        window.dispatchEvent(new Event("wishlist-updated"));
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow-sm">
        <Heart className="mx-auto mb-4 h-12 w-12 text-slate-300" />
        <h3 className="mb-2 text-lg font-medium text-slate-800">
          Your wishlist is empty
        </h3>
        <p className="mb-4 text-slate-600">Save your favorite items here</p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-white hover:bg-[#b8857a]"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">My Wishlist</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md"
          >
            <button
              onClick={() => handleRemove(product.id)}
              disabled={removing === product.id}
              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              <X className="h-4 w-4 text-slate-500 hover:text-red-500" />
            </button>

            <Link href={`/products/${product.id}`}>
              <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-slate-100">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">
                    🛍️
                  </div>
                )}
              </div>
              <h3 className="font-medium text-slate-800 line-clamp-1">
                {product.name}
              </h3>
              {product.category && (
                <p className="text-xs text-slate-500">{product.category}</p>
              )}
              <p className="mt-1 font-semibold text-[#CE978C]">
                ${product.price?.toFixed(2) || "0.00"}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
