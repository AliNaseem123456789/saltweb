export default function PrivateLabelPage() {
  const pdfUrl = "/PrivateLabel/PrivateLabel.pdf";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Private Label Solutions
          </h1>
          <a
            href={pdfUrl}
            download
            className="bg-[#0D54A0] text-white px-6 py-2 rounded font-medium hover:bg-blue-800 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </header>

      {/* PDF Viewer Container */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[800px] border border-slate-200">
          <iframe
            src={`${pdfUrl}#toolbar=0`} // #toolbar=0 hides the PDF controls for a cleaner look
            className="w-full h-full"
            title="Private Label Catalog"
          />
        </div>

        <p className="text-center text-slate-500 mt-6 text-sm">
          Having trouble viewing?{" "}
          <a href={pdfUrl} className="text-[#0D54A0] underline">
            Click here to open in a new tab.
          </a>
        </p>
      </main>
    </div>
  );
}
