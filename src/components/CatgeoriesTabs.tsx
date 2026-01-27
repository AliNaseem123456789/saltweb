import Link from "next/link";

const categories = ["All", "Salt Lamp", "Edible Salt"];

export default function CategoriesTabs({
  currentCategory,
}: {
  currentCategory: string;
}) {
  return (
    <div className="flex justify-center gap-4 py-8">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={
            cat === "All"
              ? "/products"
              : `/products?category=${encodeURIComponent(cat)}`
          }
          className={`px-6 py-2 rounded-full border transition-all ${
            currentCategory === cat
              ? "bg-[#4A3728] text-white border-[#4A3728]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#4A3728]"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
