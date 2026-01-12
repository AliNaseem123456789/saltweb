import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ShopProducts from '@/components/ShopProducts'
import Footer from '@/components/footer'

const BUCKET_NAME = 'products' // MUST match your test page bucket

interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  stock_quantity?: number | null
  is_active?: boolean | null
  image_folder?: string | null
  category?: string | null
  created_at?: string
  image_url?: string | null
  [key: string]: unknown
}

/* ===============================
   FETCH PRODUCTS + FIRST IMAGE
=============================== */
async function getProducts() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !products) {
    console.error('Error fetching products:', error)
    return []
  }

  const productsWithImages: Product[] = await Promise.all(
    products.map(async (product) => {
      if (!product.image_folder) {
        return { ...product, image_url: null }
      }

      const { data: files, error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .list(product.image_folder, { limit: 20 })

      if (storageError || !files) {
        console.warn(
          `Storage error for folder ${product.image_folder}`,
          storageError
        )
        return { ...product, image_url: null }
      }

      const firstImage = files.find((file) =>
        file.name.match(/\.(jpg|jpeg|png|webp)$/i)
      )

      if (!firstImage) {
        return { ...product, image_url: null }
      }

      const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(
          `${product.image_folder}/${firstImage.name}`
        )

      return {
        ...product,
        image_url: data.publicUrl,
      }
    })
  )

  return productsWithImages
}

/* ===============================
   FETCH WISHLIST ITEMS
=============================== */
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

/* ===============================
   PAGE
=============================== */
export default async function ProductsPage() {
  const products = await getProducts()
  const wishlistItems = await getWishlistItems()

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#CE978C] to-[#B8857A]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center px-4">
            <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              Our Products
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Discover our complete collection of premium Himalayan salt products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ShopProducts products={products} wishlistItems={wishlistItems} />

      {/* Features Section */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl">✨</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Premium Quality
              </h3>
              <p className="text-slate-600">
                Every product is carefully selected and tested to meet our uncompromising standards for purity.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Natural & Pure
              </h3>
              <p className="text-slate-600">
                Sourced directly from Himalayan mines, containing 84 essential trace minerals.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🚚</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Fast Shipping
              </h3>
              <p className="text-slate-600">
                We deliver your products quickly and safely, ensuring freshness and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EAE9E3] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-light text-slate-800 md:text-5xl">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Contact us and we&apos;ll help you find the perfect Himalayan salt product for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-[#CE978C] px-10 py-4 font-sans text-lg font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer/>
    </div>
  )
}
