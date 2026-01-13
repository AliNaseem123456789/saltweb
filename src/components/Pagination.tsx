"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to create the new URL with the updated page number
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate range of page numbers (e.g., [1, 2, 3])
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      {/* Previous Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "pointer-events-none bg-slate-100 text-slate-400"
            : "bg-white text-slate-700 hover:bg-[#CE978C] hover:text-white border border-slate-200"
        }`}
      >
        Previous
      </Link>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-[#CE978C] text-white"
                : "bg-white text-slate-700 hover:bg-[#FAF8F5] border border-slate-200"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none bg-slate-100 text-slate-400"
            : "bg-white text-slate-700 hover:bg-[#CE978C] hover:text-white border border-slate-200"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
