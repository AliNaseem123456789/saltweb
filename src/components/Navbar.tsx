"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getWishlistCount, getCartCount } from "@/app/actions/cart-wishlist";
import PromotionModal from "./home/PromotionModal"; // Import your modal

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const productCategories = [
    { name: "Home Decor", slug: "Salt Lamp" },
    { name: "Health & Wellness", slug: "Health Wellness" },
    { name: "Edible Salt", slug: "Edible Salt" },
    { name: "Animal Salt", slug: "animal-salt" },
    { name: "Construction Products", slug: "construction-products" },
    { name: "Culinary", slug: "culinary" },
  ];

  useEffect(() => {
    async function fetchCounts() {
      const [wishlist, cart] = await Promise.all([
        getWishlistCount(),
        getCartCount(),
      ]);
      setWishlistCount(wishlist);
      setCartCount(cart);
    }
    fetchCounts();
    window.addEventListener("wishlist-updated", fetchCounts);
    window.addEventListener("cart-updated", fetchCounts);
    return () => {
      window.removeEventListener("wishlist-updated", fetchCounts);
      window.removeEventListener("cart-updated", fetchCounts);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CE978C] overflow-hidden">
                <Image
                  src="/logo/logo.jpg"
                  alt="Apex Global Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                  priority
                />
              </div>
              <span className="font-serif text-2xl font-light text-slate-800">
                Apex Global
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex text-sm lg:text-base">
              <Link
                href="/"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors py-2">
                  Products
                  <svg
                    className={`h-4 w-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isProductsOpen && (
                  <div className="absolute left-0 w-56 rounded-xl border border-slate-100 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {productCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products?category=${category.slug}`}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#CE978C] transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="my-1 border-t border-slate-100" />
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#CE978C] hover:underline"
                    >
                      View All Products
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/private-label"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                Private Label
              </Link>
              <Link
                href="/about"
                className="text-slate-700 hover:text-slate-900 transition-colors"
              >
                About Us
              </Link>

              {/* Connect Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsConnectOpen(true)}
                onMouseLeave={() => setIsConnectOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors py-2">
                  Connect
                  <svg
                    className={`h-4 w-4 transition-transform ${isConnectOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isConnectOpen && (
                  <div className="absolute left-0 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/contact"
                      className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#CE978C]"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/blog"
                      className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#CE978C]"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/faq"
                      className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#CE978C]"
                    >
                      FAQs
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)} // OPEN MODAL ON CLICK
                className="hidden md:block bg-[#CE978C] hover:bg-[#b8857a] text-white px-8 py-2.5 rounded-full text-sm font-semibold transition-all mr-2 shadow-sm"
              >
                Free samples
              </button>

              <button
                className="md:hidden p-2 text-slate-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {isMenuOpen && (
            <div className="border-t border-slate-200 py-6 md:hidden">
              <div className="flex flex-col gap-4 text-slate-700">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <button
                  onClick={() => {
                    setIsModalOpen(true); // OPEN MODAL ON MOBILE
                    setIsMenuOpen(false);
                  }}
                  className="mt-6 w-full bg-[#CE978C] text-white py-5 px-8 rounded-xl font-bold text-lg uppercase tracking-wide shadow-lg"
                >
                  Free samples
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* MODAL COMPONENT */}
      <PromotionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
