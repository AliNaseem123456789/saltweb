import Link from "next/link";

const categories = ["All", "Salt Lamp", "Edible Salt"];

export default function CategoriesTabs({
  currentCategory,
}: {
  currentCategory: string;
}) {
  return <div className="flex justify-center gap-4 py-8"></div>;
}
