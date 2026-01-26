import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CartItems from "@/components/CartItems";

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return user;
}

async function getCart(userId: string) {
  const supabase = await createClient();

  // 1. Fetch cart and related products
  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      *,
      products(*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cart:", error);
    return [];
  }

  if (!data) return [];

  // 2. Enrich products within the cart items with their public image URLs
  const enrichedCart = data.map((item) => {
    const product = item.products;

    // If there's no product or no folder, set image_url to null
    if (!product || !product.image_folder) {
      return {
        ...item,
        products: { ...product, image_url: null },
      };
    }

    // Generate public URL for the primary image (image_1.avif)
    const { data: imageData } = supabase.storage
      .from("products")
      .getPublicUrl(`${product.image_folder}/image_1.avif`);

    return {
      ...item,
      products: {
        ...product,
        image_url: imageData.publicUrl,
      },
    };
  });

  return enrichedCart;
}

export default async function CartPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const cart = await getCart(user.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Note: Ensure your CartItems component is updated 
         to use item.products.image_url for the <img> src 
      */}
      <CartItems cart={cart} />
    </div>
  );
}
