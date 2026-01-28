"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogpost";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
export default function BlogDetailPage() {
  const { slug } = useParams();
  console.log("SLUG VALUE:", slug);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif">Post not found</h1>
          <Link href="/blog" className="mt-4 text-[#CE978C] hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }
  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-20">
      {/* Back Button & Progress Bar Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#CE978C] transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>
          <div className="hidden text-xs font-medium uppercase tracking-widest text-slate-400 md:block">
            {post.category}
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <header className="mx-auto max-w-4xl px-4 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 font-serif text-4xl font-light leading-tight text-slate-800 md:text-5xl lg:text-6xl text-balance">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 border-b border-slate-200 pb-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#CE978C]" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#CE978C]" />
              By SaltWeb Editorial
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-[#CE978C]" />
              {post.category}
            </div>
          </div>
        </motion.div>
      </header>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-12 max-w-5xl px-4"
      >
        <div className="relative h-[40vh] w-full overflow-hidden rounded-3xl shadow-xl md:h-[60vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>
      <section className="mx-auto mt-16 max-w-3xl px-4">
        <p className="mb-10 text-xl md:text-2xl leading-relaxed text-slate-600 font-light italic border-l-4 border-[#CE978C] pl-6">
          {post.excerpt}
        </p>
        <div
          className="prose prose-slate prose-lg lg:prose-xl max-w-none 
                        prose-headings:font-serif prose-headings:font-light 
                        prose-a:text-[#CE978C]"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-16 rounded-2xl bg-slate-100/50 p-6 border border-slate-200">
          <div className="flex items-start gap-3">
            {/* Optional: A small Info Icon from Lucide-react */}
            <span className="mt-1 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>

            <p className="text-[13px] leading-relaxed text-slate-500 font-medium tracking-tight">
              <span className="uppercase font-bold text-slate-700 mr-1">
                Medical Disclaimer:
              </span>
              The information on this blog is for educational purposes only and
              is not intended as medical advice, diagnosis, or treatment. Always
              seek the advice of your physician or other qualified health
              provider with any questions you may have regarding a medical
              condition. Dependence on any information provided on this website
              is solely at your own risk.
            </p>
          </div>
        </div>
        {/* Share / Tags Footer */}
        <footer className="mt-20 border-t border-slate-200 pt-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex gap-2">
              <span className="rounded-full bg-[#EAE9E3] px-4 py-1 text-xs font-medium text-slate-600">
                #HimalayanSalt
              </span>
              <span className="rounded-full bg-[#EAE9E3] px-4 py-1 text-xs font-medium text-slate-600">
                #{post.category}
              </span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-medium text-[#CE978C] hover:text-[#B8857A] transition-colors"
            >
              Back to Top
            </button>
          </div>
        </footer>
      </section>
    </article>
  );
}
