import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdvertisementsManager from "@/components/AdvertisementsManager";
async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  return !!(profile && profile.is_admin);
}
async function getAdvertisements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching advertisements:", error);
    return [];
  }

  return data || [];
}

export default async function AdvertisementsPage() {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const advertisements = await getAdvertisements();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <AdvertisementsManager advertisements={advertisements} />
    </div>
  );
}
