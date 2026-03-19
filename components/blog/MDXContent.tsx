import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const components = {
  h1: (props: any) => <h1 className="text-4xl font-extrabold mt-12 mb-6 tracking-tight text-foreground leading-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-12 mb-5 tracking-tight text-foreground/90 border-b border-border pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-10 mb-4 tracking-tight text-foreground/80" {...props} />,
  p: (props: any) => <p className="text-lg leading-[1.8] mb-8 text-foreground/70 font-normal md:text-[1.125rem]" {...props} />,
  ul: (props: any) => <ul className="list-none pl-6 mb-8 space-y-4 text-lg text-foreground/70" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-8 space-y-4 text-lg text-foreground/70" {...props} />,
  li: (props: any) => <li className="relative pl-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-primary/40 pl-8 italic my-12 text-foreground/60 font-medium text-xl leading-relaxed py-2" {...props} />
  ),
  img: (props: any) => (
    <div className="my-12 overflow-hidden rounded-2xl border border-border/50 shadow-sm bg-foreground/[0.02]">
      <Image
        {...props}
        width={1000}
        height={600}
        className="w-full object-cover"
        alt={props.alt || "Blog image"}
      />
      {props.alt && <p className="text-center text-xs text-foreground/40 mt-4 p-4 uppercase tracking-widest">{props.alt}</p>}
    </div>
  ),
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    return (
      <a
        href={href}
        className="text-foreground font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all decoration-2"
        {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: (props: any) => <code className="bg-foreground/[0.05] border border-foreground/[0.05] rounded-md px-1.5 py-0.5 font-mono text-sm inline-block" {...props} />,
  pre: (props: any) => (
    <pre className="p-0 mb-10 bg-transparent border-none overflow-x-auto" {...props} />
  ),
  Callout: ({ children, type = "info" }: any) => {
    const colors: any = {
      info: "bg-primary/[0.03] border-primary/10 text-foreground/80",
      warning: "bg-yellow-500/[0.03] border-yellow-500/10 text-foreground/80",
      error: "bg-red-500/[0.03] border-red-500/10 text-foreground/80",
    };
    return (
      <div className={`p-6 rounded-2xl border my-10 flex gap-4 ${colors[type] || colors.info}`}>
        <div className="flex-1 text-[1.125rem] leading-relaxed">{children}</div>
      </div>
    );
  },
};

const options: any = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node: any) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
        },
      ],
    ],
  },
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}
