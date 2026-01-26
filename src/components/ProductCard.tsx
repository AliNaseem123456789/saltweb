"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "@/app/actions/cart-wishlist";
import { Heart, ShoppingCart } from "lucide-react"; // Using Lucide for cleaner UI

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
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    const result = await addToCart(product.id, 1);
    if (result.success) {
      setMessage("Added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      setMessage(result.error || "Failed to add");
    }
    setTimeout(() => setMessage(null), 2000);
    setIsAdding(false);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisting(true);
    const result = isInWishlist
      ? await removeFromWishlist(product.id)
      : await addToWishlist(product.id);

    if (result.success) {
      setIsInWishlist(!isInWishlist);
      window.dispatchEvent(new Event("wishlist-updated"));
    }
    setIsWishlisting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover="hover" // Triggers "hover" variant in all children
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        {/* IMAGE SECTION */}
        <div className="relative h-72 w-full overflow-hidden bg-slate-100">
          <motion.div
            variants={{
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="h-full w-full"
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl bg-slate-50">
                🧂
              </div>
            )}
          </motion.div>

          {/* Hover Overlay Gradient */}
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
          />

          {/* Wishlist Button - Slides in from right on Hover */}
          <motion.button
            variants={{
              rest: { x: 60, opacity: 0 },
              hover: { x: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleWishlist}
            disabled={isWishlisting}
            className={`absolute right-4 top-4 z-30 rounded-full p-3 shadow-lg backdrop-blur-md transition-colors ${
              isInWishlist
                ? "bg-red-500 text-white"
                : "bg-white/90 text-slate-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
          </motion.button>

          {isOutOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
              <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-900">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-slate-800 group-hover:text-[#CE978C] transition-colors line-clamp-1">
              {product.name}
            </h2>
          </div>

          {product.description && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {product.description}
            </p>
          )}

          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Price
              </p>
              <span className="text-2xl font-black text-slate-900">
                ${Number(product.price ?? 0).toFixed(2)}
              </span>
            </div>

            <p
              className={`text-[11px] font-bold uppercase tracking-tighter px-2 py-1 rounded-md ${
                stockQty > 0
                  ? "bg-slate-100 text-slate-500"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {stockQty > 0 ? `${stockQty} Available` : "Sold Out"}
            </p>
          </div>

          {/* Feedback Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="rounded-lg bg-[#CE978C]/10 px-3 py-2 text-xs font-bold text-[#CE978C] border border-[#CE978C]/20 text-center uppercase tracking-widest">
                  {message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#CE978C] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#B8857A] hover:shadow-[#CE978C]/20 disabled:opacity-50 disabled:grayscale"
          >
            {isAdding ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <ShoppingCart size={18} />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
              </>
            )}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}
