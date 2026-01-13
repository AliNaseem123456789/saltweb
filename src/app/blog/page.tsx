"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts, categories } from "@/data/blogpost";
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#CE978C] to-[#B8857A]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Our Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 md:text-2xl"
            >
              Discover insights, tips, and stories about Himalayan salt
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <AnimatedSection className="bg-white px-4 py-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-[#EAE9E3] px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#CE978C] hover:text-white"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <AnimatedCard key={post.id} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-[#CE978C] px-3 py-1 text-xs font-medium text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm text-slate-500">{post.date}</p>
                    <h2 className="mb-3 font-serif text-2xl font-light text-slate-800">
                      {post.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-slate-600">
                      {post.excerpt}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8857A]"
                      >
                        Read More
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
