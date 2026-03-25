import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { constructMetadata } from "@/lib/metadata";
import { MDXContent } from "@/components/blog/MDXContent";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return constructMetadata({
    title: `${post.title} | Jay Singh Chauhan Blog`,
    description: post.description,
    canonical: `/blog/${slug}`,
    image: post.image,
  });
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);

  // Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://jaysinghchauhan.com${post.image}`,
    "datePublished": post.publishedDate,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
  };

  return (
    <article className="w-full max-w-7xl mx-auto pb-40 min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <div className="mt-10 lg:mt-20 flex flex-col gap-10">
        {/* Navigation */}
        <Link className="flex gap-1 items-center text-foreground text-sm group w-fit" href="/blog">
          <ArrowLeftIcon size={14} />
          <span className="underline-offset-4 decoration-foreground/10 decoration-1 underline group-hover:decoration-foreground transition-all duration-300">Go Back to Blog</span>
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-8 max-w-4xl w-full">
          <div className="flex flex-wrap gap-4 text-xs text-foreground/60 items-center">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <CalendarIcon size={12} className="text-primary" />
              {new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="w-1 h-1 bg-foreground/60 rounded-full" />
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <ClockIcon size={12} className="text-primary" />
              {post.readTime}
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl tracking-[ -0.02em] text-foreground font-bold leading-[1.05]">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="border border-border text-foreground/50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ">
                #{tag}
              </span>
            ))}
          </div>

          <div className="my-8 overflow-hidden rounded-2xl relative aspect-video group cursor-zoom-in">
            <ImageLightbox src={post.image} alt={post.title}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                priority
              />
            </ImageLightbox>
          </div>
        </header>

        {/* Content Layout */}
        <div className="flex flex-col gap-16 mt-10 w-full max-w-4xl">
          {/* Main Content */}
          <main className="transition-all max-w-[720px]">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="p-8 rounded-2xl mb-10 border border-border">
                <h2 className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Table of Contents
                </h2>
                <nav>
                  <ul className="flex flex-col gap-3 ">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        style={{ paddingLeft: ` 1.5rem` }}
                        className="group flex items-start gap-3"
                      >

                        <a
                          href={`#${heading.id}`}
                          className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 underline-offset-4 decoration-transparent hover:decoration-border decoration-1"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <MDXContent source={post.content} />

            {/* Footer Info */}
            <div className="mt-20 pt-10 border-t border-border flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{post.author}</p>
                  <p className="text-xs text-foreground/50">Full Stack Engineer & Designer</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
