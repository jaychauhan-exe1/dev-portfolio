import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  title: string;
  publishedDate: string;
  description: string;
  image: string;
  tags: string[];
  author: string;
  slug: string;
  content: string;
  readTime: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_PATH).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_PATH, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);
    const slug = file.replace(/\.mdx?$/, "");

    return {
      ...(data as any),
      slug,
      content,
      readTime: readingTime(content).text,
    };
  });

  return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
  const alternateFilePath = path.join(BLOG_PATH, `${slug}.md`);

  let finalPath = "";
  if (fs.existsSync(filePath)) {
    finalPath = filePath;
  } else if (fs.existsSync(alternateFilePath)) {
    finalPath = alternateFilePath;
  } else {
    return null;
  }

  const source = fs.readFileSync(finalPath, "utf-8");
  const { data, content } = matter(source);

  return {
    ...(data as any),
    slug,
    content,
    readTime: readingTime(content).text,
  };
}
