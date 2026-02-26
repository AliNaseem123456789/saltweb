import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import OrdersManager from "@/components/OrdersManager";
async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  // Only select the column you actually have
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  // Return true only if the profile exists and is_admin is true
  return !!(profile && profile.is_admin);
}

async function getOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles(full_name, email),
      order_items(
        *,
        products(name, price)
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data || [];
}

export default async function OrdersPage() {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const orders = await getOrders();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <OrdersManager orders={orders} />
    </div>
  );
}
