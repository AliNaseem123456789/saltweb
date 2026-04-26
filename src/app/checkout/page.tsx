// app/checkout/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "../../components/CheckoutForms";

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user || null;
}

async function getCart(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      *,
      products(*)
    `,
    )
    .eq("user_id", userId);

  if (error || !data) return [];

  const enrichedCart = data.map((item) => {
    const product = item.products;
    if (!product || !product.image_folder) {
      return {
        ...item,
        products: { ...product, image_url: null },
      };
    }

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

async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, email, phone, address")
    .eq("id", userId)
    .single();
  return data;
}

export default async function CheckoutPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  const [cart, profile] = await Promise.all([
    getCart(user.id),
    getUserProfile(user.id),
  ]);

  if (cart.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.products?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12">
      <CheckoutForm
        cart={cart}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        userProfile={profile}
      />
    </div>
  );
}
