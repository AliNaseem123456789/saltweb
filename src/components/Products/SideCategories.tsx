"use client";

import Link from "next/link";

interface SubCategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  subCategories: SubCategory[];
  href: string;
}

const CATEGORIES: Category[] = [
  {
    name: "Home Decor",
    slug: "home-decor",
    href: "/products?category=Salt%20Lamp",
    subCategories: [
      { name: "Natural Salt Lamps", slug: "natural-lamps" },
      { name: "Geometric Salt Lamps", slug: "geometric-lamps" },
      { name: "Salt Candle Holders", slug: "candle-holders" },
      { name: "USB & Mini Lamps", slug: "usb-lamps" },
    ],
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    href: "/products?category=Health%20Wellness",
    subCategories: [
      { name: "Detox Blocks", slug: "detox-blocks" },
      { name: "Bath Salts", slug: "bath-salts" },
      { name: "Inhalers & Neti Pots", slug: "inhalers" },
      { name: "Massage Stones", slug: "massage-stones" },
    ],
  },
  {
    name: "Edible Salt",
    slug: "edible-salt",
    href: "/products?category=Edible%20Salt",
    subCategories: [
      { name: "Fine Grain Salt", slug: "fine-grain" },
      { name: "Coarse Grain Salt", slug: "coarse-grain" },
      { name: "Pink & Black Variants", slug: "variants" },
    ],
  },
  {
    name: "Animal Salt",
    slug: "animal-salt",
    href: "/products?category=animal-salt",
    subCategories: [
      { name: "Salt Licks on Rope", slug: "salt-licks-rope" },
      { name: "Pressed Salt Blocks", slug: "salt-blocks" },
      { name: "Lump Rock Salt", slug: "lump-salt" },
    ],
  },
  {
    name: "Construction Products",
    slug: "construction-products",
    href: "/products?category=construction-products",
    subCategories: [
      { name: "Salt Bricks & Tiles", slug: "salt-bricks" },
      { name: "Adhesive Salt Glue", slug: "salt-glue" },
      { name: "Salt Panels", slug: "salt-panels" },
    ],
  },
  {
    name: "Culinary",
    slug: "culinary",
    href: "/products?category=culinary",
    subCategories: [
      { name: "Cooking Plates", slug: "cooking-plates" },
      { name: "Salt Bowls", slug: "salt-bowls" },
      { name: "Mortar & Pestle", slug: "mortar-pestle" },
    ],
  },
];

export default function ProductSidebar({
  currentCategory,
}: {
  currentCategory: string;
}) {
  return (
    <aside className="w-full lg:w-72 bg-[#FAF8F5] text-slate-800 rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-200 bg-[#F3EEE7]">
        <h2 className="text-[#E07A5F] text-xl font-bold tracking-tight">
          Product categories
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.slug} className="space-y-4">
            {/* Main Category Label - Clickable */}
            <Link
              href={cat.href}
              className="group flex items-center justify-between"
            >
              <h3
                className={`font-bold text-md transition-colors duration-200 ${
                  currentCategory === cat.name
                    ? "text-[#E07A5F]"
                    : "text-slate-700 group-hover:text-[#E07A5F]"
                }`}
              >
                {cat.name}
              </h3>
              <span
                className={`w-2 h-2 rounded-full transition-all ${
                  currentCategory === cat.name
                    ? "bg-[#E07A5F] scale-110"
                    : "bg-[#E07A5F]/20 group-hover:bg-[#E07A5F]"
                }`}
              />
            </Link>

            {/* Subcategories List */}
            <ul className="space-y-3 ml-1">
              {cat.subCategories.map((sub) => (
                <li key={sub.slug} className="flex items-center group/sub">
                  {/* Subtle Dash */}
                  <div
                    className={`w-4 h-[1.5px] mr-3 transition-all duration-300 ${
                      currentCategory === cat.name
                        ? "bg-[#E07A5F]/50"
                        : "bg-slate-300 group-hover/sub:bg-[#E07A5F]"
                    }`}
                  />

                  <span className="text-sm text-slate-500 font-medium">
                    {sub.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
