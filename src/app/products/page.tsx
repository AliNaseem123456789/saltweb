import { createClient } from "@/lib/supabase/server";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsCTA from "@/components/Products/ProductsCTA";
import ProductsHero from "@/components/Products/ProductsHero";
import ProductFeatures from "@/components/Products/ProductFeatures";
import Pagination from "@/components/Pagination";
import CategoriesTabs from "@/components/CatgeoriesTabs";
import ProductSidebar from "@/components/Products/SideCategories";
export const revalidate = 3600;

async function getProducts(page: number = 1, category?: string) {
  const supabase = await createClient();
  const ITEMS_PER_PAGE = 12;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });
  if (category && category !== "All") {
    query = query.eq("category", category);
  }
  const { data: products, count } = await query.range(from, to);
  if (!products) return { items: [], totalPages: 0 };
  const enriched = products.map((product) => {
    if (!product.image_folder) {
      return { ...product, image_url: null, hover_image_url: null };
    }
    const { data: mainImg } = supabase.storage
      .from("products")
      .getPublicUrl(`${product.image_folder}/image_1.avif`);
    const { data: hoverImg } = supabase.storage
      .from("products")
      .getPublicUrl(`${product.image_folder}/image_2.avif`);
    return {
      ...product,
      image_url: mainImg.publicUrl,
      hover_image_url: hoverImg.publicUrl,
    };
  });
  return {
    items: enriched,
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
}
async function getWishlistItems(userId: string | undefined) {
  if (!userId) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("wishlist")
    .select("product_id")
    .eq("user_id", userId);
  return data?.map((item) => item.product_id) || [];
}
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const currentCategory = params.category || "All";
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ items: products, totalPages }, wishlistItems] = await Promise.all([
    getProducts(currentPage, currentCategory),
    getWishlistItems(user?.id),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <ProductsHero />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-72 shrink-0">
          <ProductSidebar currentCategory={currentCategory} />
        </aside>
        <main className="flex-1">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold text-slate-800 capitalize ">
              {currentCategory}
            </h1>
            <CategoriesTabs currentCategory={currentCategory} />
          </div>
          <ProductsGrid products={products} wishlistItems={wishlistItems} />
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </main>
      </div>
      <ProductFeatures />
      <ProductsCTA />
    </div>
  );
}
