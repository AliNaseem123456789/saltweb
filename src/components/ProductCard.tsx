"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({
  product,
  index = 0,
  isInWishlist = false,
  onWishlistToggle,
  onAddToCart,
  isLoading = false,
  isCartLoading = false,
}: {
  product: any;
  index?: number;
  isInWishlist?: boolean;
  onWishlistToggle?: (
    productId: string,
    isCurrentlyInWishlist: boolean,
  ) => void;
  onAddToCart?: (productId: string) => void;
  isLoading?: boolean;
  isCartLoading?: boolean;
}) {
  const hasHoverImage = Boolean(product.hover_image_url);

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `https://ykbzvxnqnlidvmxpkonv.supabase.co/storage/v1/object/public/products/${path}/image_1.avif`;
  };

  const mainImage = getImageUrl(product.image_folder);
  const hoverImage = product.hover_image_url;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Wishlist button clicked!", {
      productId: product.id,
      isInWishlist,
    });
    if (onWishlistToggle && !isLoading) {
      onWishlistToggle(product.id, isInWishlist);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to cart clicked!", product.id);
    if (onAddToCart && !isCartLoading) {
      onAddToCart(product.id);
    }
  };

  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  console.log("ProductCard rendering:", {
    productId: product.id,
    productName: product.name,
    isInWishlist,
    hasWishlistHandler: !!onWishlistToggle,
    hasCartHandler: !!onAddToCart,
  });

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
        <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
          {/* TEST BUTTON - A simple visible button to confirm rendering */}
          <div className="absolute top-1 left-1 z-50 bg-yellow-500 text-black text-xs p-1 rounded">
            Test: {product.name.substring(0, 10)}
          </div>

          {/* Stock Status Badge */}
          {isOutOfStock && (
            <div className="absolute top-3 left-3 z-40 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </div>
          )}
          {isLowStock && !isOutOfStock && (
            <div className="absolute top-3 left-3 z-40 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Only {product.stock_quantity} left
            </div>
          )}

          {/* Wishlist Button - Simplified with inline styles to ensure visibility */}
          <button
            onClick={handleWishlistClick}
            disabled={isLoading}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 9999,
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "9999px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <span style={{ fontSize: "20px" }}>
              {isInWishlist ? "❤️" : "🤍"}
            </span>
          </button>

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
                scale: 1.05,
              },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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

          {/* Add to Cart Button */}
          {onAddToCart && !isOutOfStock && (
            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                zIndex: 30,
                backgroundColor: "#CE978C",
                color: "white",
                padding: "12px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isCartLoading ? "Adding..." : "Add to Cart"}
            </button>
          )}

          {/* Disabled Add to Cart for Out of Stock */}
          {isOutOfStock && (
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-gray-400 text-white py-3 font-semibold text-center">
              Out of Stock
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="p-6">
          <h2 className="mb-2 line-clamp-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-[#CE978C]">
            {product.name}
          </h2>

          {/* Price Display */}
          {product.price && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold text-[#CE978C]">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.original_price &&
                Number(product.original_price) > Number(product.price) && (
                  <span className="text-sm text-gray-400 line-through">
                    ${Number(product.original_price).toFixed(2)}
                  </span>
                )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CE978C]">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
