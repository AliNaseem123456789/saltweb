"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogpost";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export default function BlogDetailPage() {
  const { id } = useParams();

  // Find the post based on the ID in the URL
  const post = blogPosts.find((p) => p.id === id);

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
          <h1 className="mb-6 font-serif text-4xl font-light leading-tight text-slate-800 md:text-5xl lg:text-6xl">
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

      {/* Main Image */}
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

      {/* Content */}
      <section className="mx-auto mt-16 max-w-3xl px-4">
        <div className="prose prose-slate prose-lg max-w-none font-serif leading-relaxed text-slate-700">
          {/* Replace this with post.content if you add it to your data */}
          <p className="mb-6 text-xl leading-relaxed text-slate-800">
            {post.excerpt}
          </p>

          <div className="space-y-6">
            <p>
              Himalayan salt is more than just a culinary staple; it's a
              testament to millions of years of natural history. Formed from
              ancient sea beds in the Punjab region of Pakistan, this
              mineral-rich salt offers a unique composition that sets it apart
              from standard table salt.
            </p>
            <h3 className="text-2xl font-serif text-slate-800 pt-4">
              The Natural Advantage
            </h3>
            <p>
              When we look at the pure offerings from the earth, Himalayan salt
              remains one of the most untouched. Because it is hand-mined and
              minimally processed, it retains over 84 minerals and trace
              elements, including iron (which gives it that iconic pink hue),
              potassium, and magnesium.
            </p>
            <blockquote className="border-l-4 border-[#CE978C] pl-6 italic text-slate-600 my-8">
              "Nature provides us with everything we need for wellness; our job
              is simply to preserve its purity."
            </blockquote>
            <p>
              Whether you are using it to enhance the flavor of a gourmet meal
              or utilizing salt lamps to create a calming atmosphere in your
              home, the benefits are as deep as the mines they come from.
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
                #Wellness
              </span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-medium text-[#CE978C] hover:underline"
            >
              Back to Top
            </button>
          </div>
        </footer>
      </section>
    </article>
  );
}
