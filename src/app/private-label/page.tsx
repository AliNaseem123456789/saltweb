"use client";

import { Download, ExternalLink } from "lucide-react";

export default function PrivateLabelPage() {
  const pdfUrl = "/PrivateLabel/PrivateLabel.pdf";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800">
              Private Label Solutions
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Custom branding and packaging for your salt business.
            </p>
          </div>

          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 bg-[#CE978C] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#B8857A] transition-all shadow-md active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download Catalog
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-12">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden h-[850px] border border-slate-200">
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="w-full h-full"
            title="Private Label Catalog"
          />
        </div>

        {/* Troubleshooting link */}
        <p className="text-center text-slate-500 mt-8 text-sm flex items-center justify-center gap-2">
          Having trouble viewing the catalog?{" "}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#CE978C] font-bold underline flex items-center gap-1 hover:text-[#B8857A]"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </main>
    </div>
  );
}
