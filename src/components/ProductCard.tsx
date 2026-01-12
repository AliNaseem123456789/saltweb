'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from '@/app/actions/cart-wishlist'

interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  stock_quantity?: number | null
  is_active?: boolean | null
  image_url?: string | null
}

interface ProductCardProps {
  product: Product
  index?: number
  isInWishlist?: boolean
}

export default function ProductCard({
  product,
  index = 0,
  isInWishlist: initialIsInWishlist = false,
}: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisting, setIsWishlisting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const stockQty = product.stock_quantity ?? 0
  const isOutOfStock = stockQty <= 0 || product.is_active === false

  const handleAddToCart = async () => {
    setIsAdding(true)
    setMessage(null)

    const result = await addToCart(product.id, 1)

    if (result.success) {
      setMessage('Added to cart!')
      window.dispatchEvent(new Event('cart-updated'))
    } else {
      setMessage(result.error || 'Failed to add to cart')
    }

    setTimeout(() => setMessage(null), 2000)
    setIsAdding(false)
  }

  const handleWishlist = async () => {
    setIsWishlisting(true)
    setMessage(null)

    const result = isInWishlist
      ? await removeFromWishlist(product.id)
      : await addToWishlist(product.id)

    if (result.success) {
      setIsInWishlist(!isInWishlist)
      setMessage(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!')
      window.dispatchEvent(new Event('wishlist-updated'))
    } else {
      setMessage(result.error || 'Wishlist action failed')
    }

    setTimeout(() => setMessage(null), 2000)
    setIsWishlisting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg"
    >
      {/* IMAGE */}
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

        <button
          onClick={handleWishlist}
          disabled={isWishlisting}
          className={`absolute right-3 top-3 rounded-full p-2 transition ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-slate-600'
          }`}
        >
          ❤️
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-red-500 px-4 py-2 text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">
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

          <p className="text-xs text-slate-500">
            {stockQty > 0 ? `${stockQty} in stock` : 'Out of stock'}
          </p>
        </div>

        {message && (
          <div className="mb-3 rounded bg-green-100 px-3 py-1 text-xs text-green-800">
            {message}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={isAdding || isOutOfStock}
          className="w-full rounded-lg bg-[#CE978C] px-4 py-2 text-sm font-medium text-white hover:bg-[#B8857A] disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  )
}
