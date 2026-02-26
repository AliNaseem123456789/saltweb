"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "_");
}

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
export async function updateProduct(
  productId: string,
  data: {
    name: string;
    description: string;
    price: string;
    image_folder: string;
    stock_quantity: string;
    category: string;
    is_active: boolean;
  },
) {
  if (!(await checkAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description || null,
      price: parseFloat(data.price),
      image_folder: data.image_folder || null,
      stock_quantity: parseInt(data.stock_quantity),
      category: data.category || null,
      is_active: data.is_active,
    })
    .eq("id", productId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/inventory");
  return { success: true };
}
export async function createProduct(formData: FormData) {
  if (!(await checkAdmin())) return { success: false, error: "Unauthorized" };
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const folderName = slugify(name);

  // 1. Get all images from the "images" field
  const images = formData.getAll("images") as File[];

  // 2. Upload images in a loop
  // We use Promise.all to upload them simultaneously for speed
  const uploadPromises = images.map(async (file, index) => {
    if (file.size === 0) return;

    // Naming convention: image_1.avif, image_2.avif, etc.
    const fileName = `image_${index + 1}.avif`;

    const { error } = await supabase.storage
      .from("products")
      .upload(`${folderName}/${fileName}`, file, {
        contentType: "image/avif",
        upsert: true,
      });

    if (error)
      throw new Error(`Upload failed for ${fileName}: ${error.message}`);
  });

  try {
    await Promise.all(uploadPromises);
  } catch (err: any) {
    return { success: false, error: err.message };
  }

  // 3. Insert into Database
  const { data: product, error: dbError } = await supabase
    .from("products")
    .insert({
      name,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stock_quantity: parseInt(formData.get("stock_quantity") as string),
      category: formData.get("category") as string,
      is_active: formData.get("is_active") === "true",
      image_folder: folderName,
    })
    .select()
    .single();

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath("/admin/inventory");
  return { success: true, product };
}
export async function updateOrderStatus(orderId: string, status: string) {
  if (!(await checkAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/orders");
  return { success: true };
}

export async function deleteProduct(productId: string, imageFolder: string | null) {
  if (!(await checkAdmin())) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = await createClient();

  // 1. Delete images from Storage if folder exists
  if (imageFolder && !imageFolder.startsWith("http")) {
    // List all files in the folder
    const { data: files } = await supabase.storage
      .from("products")
      .list(imageFolder);

    if (files && files.length > 0) {
      const filesToDelete = files.map((file) => `${imageFolder}/${file.name}`);
      await supabase.storage.from("products").remove(filesToDelete);
    }
  }

  // 2. Delete product from Database
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/inventory");
  return { success: true };
}