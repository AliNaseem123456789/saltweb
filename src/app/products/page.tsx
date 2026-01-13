import { createClient } from "@/lib/supabase/server";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsCTA from "@/components/Products/ProductsCTA";
import ProductsHero from "@/components/Products/ProductsHero";
import ProductFeatures from "@/components/Products/ProductFeatures";
import Pagination from "@/components/Pagination"; // You'll need this simple component

// 1. CACHING: Revalidate this page every hour
export const revalidate = 3600;

async function getProducts(page: number = 1) {
  const supabase = await createClient();
  const ITEMS_PER_PAGE = 10;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Fetch products with a range for pagination
  const { data: products, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!products) return { items: [], totalPages: 0 };

  // 2. OPTIMIZATION: Fetch all images in parallel (much faster than a loop)
  const enriched = await Promise.all(
    products.map(async (product) => {
      if (!product.image_folder) return { ...product, image_url: null };

      const { data: files } = await supabase.storage
        .from("products")
        .list(product.image_folder, { limit: 1 });

      if (!files || files.length === 0) return { ...product, image_url: null };

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(`${product.image_folder}/${files[0].name}`);

      return { ...product, image_url: data.publicUrl };
    })
  );

  return {
    items: enriched,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
}

async function getWishlistItems() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("wishlist")
    .select("product_id")
    .eq("user_id", user.id);

  return data?.map((item) => item.product_id) || [];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Parallel fetching of products and wishlist
  const [{ items: products, totalPages }, wishlistItems] = await Promise.all([
    getProducts(currentPage),
    getWishlistItems(),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* If you want to HIDE Navbar/Footer, simply delete these tags */}
      <ProductsHero />

      {/* Products Grid */}
      <ProductsGrid products={products} wishlistItems={wishlistItems} />

      {/* 3. PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}

      <ProductFeatures />
      <ProductsCTA />
    </div>
  );
}
