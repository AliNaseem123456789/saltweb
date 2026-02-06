"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  index = 0,
  isInWishlist = false, // 1. Added prop here
}: {
  product: any;
  index?: number;
  isInWishlist?: boolean; // 2. Added type definition here
}) {
  // Determine if we actually have a second image to flip to
  const hasHoverImage = Boolean(product.hover_image_url);

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.05 },
        },
      }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="relative h-72 w-full overflow-hidden bg-slate-100">
          {/* Wishlist Indicator (Optional visual feedback) */}
          {isInWishlist && (
            <div className="absolute top-3 right-3 z-30 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
              <span className="text-red-500 text-xs">❤️</span>
            </div>
          )}

          {/* BACKGROUND LAYER: The Hover Image */}
          {hasHoverImage && (
            <div className="absolute inset-0 z-10 h-full w-full">
              <Image
                src={product.hover_image_url}
                alt={`${product.name} alternate`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          )}

          <motion.div
            className="absolute inset-0 z-20 h-full w-full"
            initial={{ opacity: 1, scale: 1 }}
            variants={{
              hover: {
                opacity: hasHoverImage ? 0 : 1,
                scale: 1.05,
              },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-50 text-6xl">
                🧂
              </div>
            )}
          </motion.div>
        </div>

        <div className="p-6">
          <h2 className="mb-2 line-clamp-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-[#CE978C]">
            {product.name}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400">
              {product.weight || "10 kg"}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CE978C]">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
