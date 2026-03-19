import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";
import { constructMetadata } from "@/lib/metadata";
import { BlogList } from "@/components/blog/BlogList";

export const metadata = constructMetadata({
  title: "Blog & Insights | Jay Singh Chauhan",
  description: "Diving deep into code, design, and digital experiences. Explore my latest articles and thoughts on web development and master aesthetics.",
  canonical: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="w-full max-w-4xl mx-auto pb-40 px-4 md:px-0">
      <div className="mt-10 lg:mt-20 flex flex-col gap-10">
        <div className='flex flex-col gap-6'>
          <Link className='flex gap-1 items-center mb-2 text-foreground group w-fit' href="/">
            <ArrowLeftIcon size={12} className="" />
            <span className='text-sm underline underline-offset-4 decoration-foreground/10 group-hover:decoration-foreground'>Go back</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl tracking-tighter text-foreground">
            Blogs & Writings
          </h1>
          <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
            Documenting the journey of turning complex logic into simple, aesthetic digital experiences.
          </p>
        </div>

        {/* Blog Post List Component - Handle Search/Tags/Listing */}
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
