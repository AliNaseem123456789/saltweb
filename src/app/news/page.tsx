"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";

type NewsItem = {
  source: string;
  title: string;
  date: string;
  link: string;
};

export default function NewsFeedPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();

        // ✅ GUARANTEE ARRAY
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          console.error("Invalid news response:", data);
          setNews([]);
          setError("No news available right now.");
        }
      } catch (err) {
        console.error(err);
        setNews([]);
        setError("Unable to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Loading */}
          {loading && (
            <p className="p-8 text-center text-slate-400">
              Loading latest news…
            </p>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="p-8 text-center text-red-500">{error}</p>
          )}

          {/* Empty State */}
          {!loading && !error && news.length === 0 && (
            <p className="p-8 text-center text-slate-400">No news found.</p>
          )}

          {/* News List */}
          {!loading &&
            !error &&
            news.map((item, index) => (
              <article
                key={index}
                className="group border-b border-slate-100 py-8 px-8 hover:bg-[#FAF8F5]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#CE978C] font-bold text-xs uppercase tracking-wider">
                      <Newspaper className="w-4 h-4" />
                      {item.source}
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#CE978C] transition">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#CE978C] rounded-lg text-[#CE978C] font-bold text-sm hover:bg-[#CE978C] hover:text-white transition"
                  >
                    Read Story <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}
