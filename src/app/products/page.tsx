import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ProductsGrid from '@/components/ProductsGrid'
import Footer from '@/components/footer'
import ProductsCTA from '@/components/Products/ProductsCTA'
import ProductsHero from '@/components/Products/ProductsHero'
import ProductFeatures from '@/components/Products/ProductFeatures'
interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  image_url?: string | null
  stock_quantity?: number | null
  is_active?: boolean | null
  category?: string | null
  created_at?: string
  [key: string]: unknown
}

async function getProducts() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (!products) return []

  const enriched = []

  for (const product of products) {
    if (!product.image_folder) {
      enriched.push({ ...product, image_url: null })
      continue
    }

    const { data: files } = await supabase.storage
      .from('products')
      .list(product.image_folder, { limit: 1 })

    if (!files || files.length === 0) {
      enriched.push({ ...product, image_url: null })
      continue
    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(`${product.image_folder}/${files[0].name}`)

    enriched.push({
      ...product,
      image_url: data.publicUrl,
    })
  }

  return enriched
}


async function getWishlistItems() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', user.id)

  return data?.map(item => item.product_id) || []
}

export default async function ProductsPage() {
  const products = await getProducts()
  const wishlistItems = await getWishlistItems()

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <ProductsHero/>
      {/* Products Grid */}
      <ProductsGrid products={products} wishlistItems={wishlistItems} />

      <ProductFeatures/>

     <ProductsCTA/>

      {/* Footer */}
      <footer className="bg-[#EAE9E3] px-4 py-16 text-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">Stay Connected</h3>
              <p className="mb-4 text-slate-600">
                Subscribe to receive updates on new products and wellness tips.
              </p>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#CE978C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B8857A]"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">About Us</h3>
              <p className="text-slate-600">
                Dedicated to bringing you the finest Himalayan salt products 
                for your health, wellness, and culinary journey.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-300 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} PureSalt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
