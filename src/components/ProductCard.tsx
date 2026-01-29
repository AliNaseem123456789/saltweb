"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { addToWishlist, removeFromWishlist } from "@/app/actions/cart-wishlist";
import { Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description?: string | null;
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
  const [isWishlisting, setIsWishlisting] = useState(false);

  const stockQty = product.stock_quantity ?? 0;
  const isOutOfStock = stockQty <= 0 || product.is_active === false;

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
      whileHover="hover"
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
          <h2 className="text-lg font-bold text-slate-800 group-hover:text-[#CE978C] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h2>

          {product.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 mb-4">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CE978C]">
              View Details →
            </span>
            <p
              className={`text-[11px] font-bold uppercase tracking-tighter px-2 py-1 rounded-md ${
                stockQty > 0
                  ? "bg-slate-100 text-slate-500"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {stockQty > 0 ? `${stockQty} In Stock` : "Sold Out"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
