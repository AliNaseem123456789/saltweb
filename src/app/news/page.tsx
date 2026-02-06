// app/news/page.tsx
"use client";

import { ExternalLink, Calendar, Newspaper } from "lucide-react";

const NEWS_DATA = [
  {
    source: "Borneo Bulletin",
    title: "Is Himalayan sea salt a healthy alternative?",
    date: "23-Jun-2023",
    link: "#",
  },
  {
    source: "Future Market Insights",
    title: "Shaping Salty Horizons: Himalayan Salt Market Expected to Reach...",
    date: "22-Jun-2023",
    link: "#",
  },
  {
    source: "Newstalk",
    title:
      "Shopping Trolley Hotline - 'The country has gone mad for pink salt'",
    date: "21-Jun-2023",
    link: "#",
  },
  {
    source: "Market Research Blog",
    title: "Himalayan Salt Market Set to Reach USD 18.5 Billion by 2032...",
    date: "19-Jun-2023",
    link: "#",
  },
  {
    source: "Health.com",
    title: "Does Adding Salt to Drinking Water Boost Hydration?",
    date: "22-Jun-2023",
    link: "#",
  },
  {
    source: "The Business Journals",
    title: "Pink Salt Restaurant relocates to Lakewood Plaza - Jacksonville...",
    date: "12-Jun-2023",
    link: "#",
  },
  {
    source: "Slurrp",
    title: "Himalayan Pink Salt, Health, Nutrition, And Debunking Myths",
    date: "06-Jun-2023",
    link: "#",
  },
];

export default function NewsFeedPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {" "}
      {/* Updated global bg to match products page */}
      {/* Hero Header */}
      <div className="bg-[#CE978C] py-20 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">News Feeds</h1>
          {/* Changed text-blue-100 to text-white/90 for warmer feel */}
          <p className="text-white/90 text-lg">
            Latest updates and insights from the global Himalayan Salt industry.
          </p>
        </div>
      </div>
      {/* News List */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-0 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {NEWS_DATA.map((item, index) => (
            <article
              key={index}
              className="group border-b border-slate-100 py-8 transition-all hover:bg-[#FAF8F5] px-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                  {/* Changed #0D54A0 to #CE978C */}
                  <div className="flex items-center gap-2 text-[#CE978C] font-bold text-xs uppercase tracking-[0.15em]">
                    <Newspaper className="w-4 h-4" />
                    {item.source}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-[#CE978C] transition-colors leading-tight">
                    {item.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>

                <a
                  href={item.link}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[#CE978C] rounded-lg text-[#CE978C] font-bold text-sm hover:bg-[#CE978C] hover:text-white transition-all shadow-sm active:scale-95"
                >
                  Read Story <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Updated Pagination to match your Pagination component color logic */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed text-sm">
            Previous
          </button>
          {/* Active State uses #CE978C */}
          <button className="h-10 w-10 bg-[#CE978C] text-white rounded-lg font-bold shadow-md">
            1
          </button>
          <button className="h-10 w-10 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-[#FAF8F5] transition-colors">
            2
          </button>
          <button className="h-10 w-10 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-[#FAF8F5] transition-colors">
            3
          </button>
          <span className="px-2 text-slate-400">...</span>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-[#FAF8F5] transition-colors text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
