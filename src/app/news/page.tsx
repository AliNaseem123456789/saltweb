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
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-[#0D54A0] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">News Feeds</h1>
          <p className="text-blue-100">
            Latest updates and insights from the global Himalayan Salt industry.
          </p>
        </div>
      </div>

      {/* News List */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-0 border-t border-slate-100">
          {NEWS_DATA.map((item, index) => (
            <article
              key={index}
              className="group border-b border-slate-100 py-8 transition-all hover:bg-slate-50 px-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#0D54A0] font-bold text-sm uppercase tracking-wider">
                    <Newspaper className="w-4 h-4" />
                    {item.source}
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 group-hover:text-[#0D54A0] transition-colors">
                    {item.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>

                <a
                  href={item.link}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 border border-slate-200 rounded text-slate-600 font-medium hover:bg-[#0D54A0] hover:text-white hover:border-[#0D54A0] transition-all"
                >
                  Read Story <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Simple Pagination Demo */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 border border-slate-200 rounded text-slate-400 cursor-not-allowed">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#0D54A0] text-white rounded">
            1
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50">
            2
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50">
            3
          </button>
          <span className="px-2 text-slate-400">...</span>
          <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50">
            10
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded hover:bg-slate-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
