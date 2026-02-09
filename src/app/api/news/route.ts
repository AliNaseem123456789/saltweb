import { NextResponse } from "next/server";

const API_KEY = process.env.GNEWS_API_KEY;

export async function GET() {
  try {
    const query = "Himalayan salt pink rock";
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      "Himalayan salt pink rock",
    )}&lang=en&max=10&sortby=publishedAt&apikey=${API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    if (!data.articles) {
      throw new Error("Invalid GNews response");
    }

    const formatted = data.articles.map((article: any) => ({
      source: article.source.name,
      title: article.title,
      date: new Date(article.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      link: article.url,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GNews" },
      { status: 500 },
    );
  }
}
