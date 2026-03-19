"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CalendarIcon, ClockIcon, HashIcon } from "lucide-react";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <div className="flex flex-col gap-12">
      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-xs transition-all border ${!selectedTag
            ? "bg-primary text-foreground border-primary"
            : " border-border hover:border-primary/50"
            }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-xs transition-all border ${selectedTag === tag
              ? "bg-primary text-foreground border-primary"
              : "border-border hover:border-primary/50"
              }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="grid gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              key={post.slug}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group p-4 rounded-2xl border border-border hover:shadow-lg hover:shadow-border/50 block relative overflow-hidden transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {post.image && (
                    <div className="md:w-48 w-full aspect-video md:aspect-square relative rounded-xl overflow-hidden shrink-0 border border-border/50">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex flex-wrap gap-4 text-xs text-foreground/50 items-center">
                      <span className="flex items-center gap-1">
                        <CalendarIcon size={12} />
                        {new Date(post.publishedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-xl">
                      {post.title}
                    </h2>
                    <p className="text-foreground/70 text-sm md:text-base line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider text-foreground/40 bg-foreground/5 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-foreground/40">
            No posts found for this tag.
          </div>
        )}
      </div>
    </div>
  );
}
