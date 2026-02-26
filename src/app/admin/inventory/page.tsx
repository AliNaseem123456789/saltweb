import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import InventoryManager from "@/components/InventoryManager";

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

async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export default async function InventoryPage() {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <InventoryManager products={products} />
    </div>
  );
}
