"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  index = 0,
  isInWishlist = false,
}: {
  product: any;
  index?: number;
  isInWishlist?: boolean;
}) {
  const hasHoverImage = Boolean(product.hover_image_url);

  // Helper to build your Supabase URL (keeping your specific logic)
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `https://ykbzvxnqnlidvmxpkonv.supabase.co/storage/v1/object/public/products/${path}/image_1.avif`;
  };

  const mainImage = getImageUrl(product.image_folder);
  const hoverImage = product.hover_image_url; // or use same folder logic if needed

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
      className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl border border-slate-50"
    >
      <Link href={`/products/${product.id}`} className="block">
        {/* FIX: Using aspect-square (1:1) or aspect-[4/5] (Portrait) 
            ensures all boxes are EXACTLY the same size.
        */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
          {isInWishlist && (
            <div className="absolute top-3 right-3 z-30 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
              <span className="text-red-500 text-xs">❤️</span>
            </div>
          )}

          {/* Hover Image Layer */}
          {hasHoverImage && (
            <div className="absolute inset-0 z-10 h-full w-full">
              <Image
                src={hoverImage}
                alt={`${product.name} alternate`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}

          {/* Main Image Layer */}
          <motion.div
            className="absolute inset-0 z-20 h-full w-full"
            initial={{ opacity: 1, scale: 1 }}
            variants={{
              hover: {
                opacity: hasHoverImage ? 0 : 1,
                scale: 1.1,
              },
            }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-50 text-6xl">
                🧂
              </div>
            )}
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="p-6">
          <h2 className="mb-2 line-clamp-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-[#CE978C]">
            {product.name}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CE978C]">
              View Details →
            </span>
            {/* {product.price && (
              <span className="text-slate-900 font-semibold">
                ${product.price}
              </span>
            )} */}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
