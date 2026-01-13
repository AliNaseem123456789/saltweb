"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { motion } from "framer-motion";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "@/app/actions/cart-wishlist";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  stock_quantity?: number | null;
  is_active?: boolean | null;
  image_url?: string | null;
}

interface ProductCardProps {
  product: Product;
  index?: number;
  isInWishlist?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  isInWishlist: initialIsInWishlist = false,
}: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const stockQty = product.stock_quantity ?? 0;
  const isOutOfStock = stockQty <= 0 || product.is_active === false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling

    setIsAdding(true);
    setMessage(null);

    const result = await addToCart(product.id, 1);

    if (result.success) {
      setMessage("Added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      setMessage(result.error || "Failed to add to cart");
    }

    setTimeout(() => setMessage(null), 2000);
    setIsAdding(false);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling

    setIsWishlisting(true);
    setMessage(null);

    const result = isInWishlist
      ? await removeFromWishlist(product.id)
      : await addToWishlist(product.id);

    if (result.success) {
      setIsInWishlist(!isInWishlist);
      setMessage(isInWishlist ? "Removed from wishlist" : "Added to wishlist!");
      window.dispatchEvent(new Event("wishlist-updated"));
    } else {
      setMessage(result.error || "Wishlist action failed");
    }

    setTimeout(() => setMessage(null), 2000);
    setIsWishlisting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all"
    >
      {/* Wrap everything in a Link to the dynamic product page */}
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* IMAGE SECTION */}
        <div className="relative h-64 w-full bg-slate-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              🧂
            </div>
          )}

          {/* Wishlist Button - Stays absolute inside the relative container */}
          <button
            onClick={handleWishlist}
            disabled={isWishlisting}
            className={`absolute right-3 top-3 z-10 rounded-full p-2 transition-all hover:scale-110 active:scale-90 ${
              isInWishlist
                ? "bg-red-500 text-white shadow-md"
                : "bg-white/90 text-slate-600 hover:bg-white"
            }`}
          >
            ❤️
          </button>

          {isOutOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <span className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900 group-hover:text-[#CE978C] transition-colors">
            {product.name}
          </h2>

          {product.description && (
            <p className="mb-3 line-clamp-2 text-sm text-slate-600">
              {product.description}
            </p>
          )}

          <div className="mb-4">
            <span className="text-2xl font-bold text-slate-900">
              ${Number(product.price ?? 0).toFixed(2)}
            </span>

            <p
              className={`text-xs mt-1 ${
                stockQty > 0 ? "text-slate-500" : "text-red-500 font-medium"
              }`}
            >
              {stockQty > 0 ? `${stockQty} in stock` : "Sold Out"}
            </p>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 rounded bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-100"
            >
              {message}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className="w-full relative z-10 rounded-lg bg-[#CE978C] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#B8857A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding
              ? "Adding..."
              : isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}
