// app/account/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountOrders from "@/components/AccountOrders";
import AccountProfile from "@/components/account/AccountProfile";
import AccountWishlist from "@/components/account/AccountWishlist";
import { getOrders } from "@/app/actions/orders";
// import { getWishlistItems } from "@/app/actions/cart-wishlist";

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return user;
}

async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
}

async function getWishlistWithProducts(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wishlist")
    .select(
      `
      product_id,
      products(*)
    `,
    )
    .eq("user_id", userId);

  if (error || !data) return [];

  // Enrich with image URLs
  const enriched = await Promise.all(
    data.map(async (item) => {
      const product = item.products;
      if (!product?.image_folder) {
        return { ...product, image_url: null };
      }

      const { data: imageData } = supabase.storage
        .from("products")
        .getPublicUrl(`${product.image_folder}/image_1.avif`);

      return {
        ...product,
        image_url: imageData.publicUrl,
      };
    }),
  );

  return enriched;
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getUser();
  const params = await searchParams;
  const activeTab = params.tab || "profile";

  if (!user) {
    redirect("/login");
  }

  // Fetch all data in parallel
  const [profile, orders, wishlist] = await Promise.all([
    getUserProfile(user.id),
    getOrders(user.id),
    getWishlistWithProducts(user.id),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
            My Account
          </h1>
          <p className="mt-2 text-slate-600">
            Welcome back, {profile?.full_name || user.email}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200">
          <nav className="flex gap-8">
            <a
              href="/account?tab=profile"
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "border-b-2 border-[#CE978C] text-[#CE978C]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Profile
            </a>
            <a
              href="/account?tab=orders"
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "border-b-2 border-[#CE978C] text-[#CE978C]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Orders ({orders.length})
            </a>
            <a
              href="/account?tab=wishlist"
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "wishlist"
                  ? "border-b-2 border-[#CE978C] text-[#CE978C]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Wishlist ({wishlist.length})
            </a>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "profile" && (
            <AccountProfile profile={profile} userId={user.id} />
          )}
          {activeTab === "orders" && <AccountOrders orders={orders} />}
          {activeTab === "wishlist" && <AccountWishlist wishlist={wishlist} />}
        </div>
      </div>
    </div>
  );
}
