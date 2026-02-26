"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  updateProduct,
  createProduct,
  deleteProduct,
} from "@/app/actions/admin";
interface Product {
  id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  image_folder?: string | null;
  stock_quantity?: number | null;
  is_active?: boolean | null;
  category?: string | null;
}

interface InventoryManagerProps {
  products: Product[];
}

export default function InventoryManager({
  products: initialProducts,
}: InventoryManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // State for text fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    is_active: true,
  });

  // State for files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      stock_quantity: product.stock_quantity?.toString() || "0",
      category: product.category || "",
      is_active: product.is_active ?? true,
    });
    setSelectedFiles([]); // Reset files on edit (optional, depending on if you allow editing images)
    setShowAddForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDelete = async () => {
    if (!editingProduct) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this product? This will also remove all images.",
    );
    if (!confirmDelete) return;

    setIsUploading(true); // Reusing the loading state
    const result = await deleteProduct(
      editingProduct.id,
      editingProduct.image_folder || null,
    );

    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== editingProduct.id));
      closeForm();
    } else {
      alert(result.error);
    }
    setIsUploading(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Create FormData to handle files and text
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock_quantity", formData.stock_quantity);
      data.append("category", formData.category);
      data.append("is_active", String(formData.is_active));

      // Append all selected files to the "images" key
      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      if (editingProduct) {
        // Note: You may need to update updateProduct to accept FormData if you want to update images
        const result = await updateProduct(editingProduct.id, formData as any);
        if (result.success) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === editingProduct.id
                ? ({
                    ...p,
                    ...formData,
                    price: parseFloat(formData.price),
                    stock_quantity: parseInt(formData.stock_quantity),
                  } as Product)
                : p,
            ),
          );
          closeForm();
        }
      } else {
        const result = await createProduct(data);
        if (result.success && result.product) {
          setProducts((prev) => [result.product as Product, ...prev]);
          closeForm();
        } else {
          alert(result.error || "Failed to create product");
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    } finally {
      setIsUploading(false);
    }
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
      category: "",
      is_active: true,
    });
    setSelectedFiles([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Inventory Management
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="rounded-lg bg-slate-600 px-6 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddForm(true);
              resetForm();
            }}
            className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A]"
          >
            Add New Product
          </button>
        </div>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-slate-100"
        >
          <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, stock_quantity: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>

              {/* Multi-Image Upload Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Images (image_1, image_2, etc.)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FAF8F5] file:text-[#CE978C] hover:file:bg-[#CE978C] hover:file:text-white"
                />
                {selectedFiles.length > 0 && (
                  <p className="mt-2 text-xs text-slate-500 font-medium">
                    {selectedFiles.length} files staged for upload.
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="rounded border-slate-300 accent-[#CE978C]"
                  />
                  <span className="text-sm text-slate-700">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isUploading}
                className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A] disabled:opacity-50"
              >
                {isUploading
                  ? "Uploading..."
                  : editingProduct
                    ? "Update Product"
                    : "Create Product"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg bg-slate-200 px-6 py-2 text-slate-700 transition-colors hover:bg-slate-300"
              >
                Cancel
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isUploading}
                  className="rounded-lg border border-red-200 bg-red-50 px-6 py-2 text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
                >
                  Delete Product
                </button>
              )}
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center">
              {product.image_folder ? (
                <Image
                  src={
                    // Check if the image_folder already contains a full URL
                    product.image_folder.startsWith("http")
                      ? product.image_folder
                      : `https://ykbzvxnqnlidvmxpkonv.supabase.co/storage/v1/object/public/products/${product.image_folder}/image_1.avif`
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  // Added unoptimized if you are having issues with Next.js Image optimization limits
                  unoptimized
                />
              ) : (
                <span className="text-4xl">📦</span>
              )}
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                {product.name}
              </h3>
              <p className="mb-2 text-sm text-slate-600 font-medium">
                ${Number(product.price || 0).toFixed(2)}
              </p>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-slate-500">
                  Stock:{" "}
                  <span className="text-slate-700 font-medium">
                    {product.stock_quantity || 0}
                  </span>
                </p>
                <p className="text-sm text-slate-500">
                  Status:{" "}
                  <span
                    className={`font-medium ${product.is_active ? "text-green-600" : "text-red-500"}`}
                  >
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleEdit(product)}
                className="w-full rounded-lg border border-[#CE978C] text-[#CE978C] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#CE978C] hover:text-white"
              >
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
