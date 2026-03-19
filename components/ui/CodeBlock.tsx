import React from 'react';
import { MDXContent } from '../blog/MDXContent';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * A Server Component that renders syntax-highlighted code blocks
 * using the same engine as the blog (rehype-pretty-code + shiki).
 */
export async function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  // Wrap the raw code in MDX code fences
  const source = `\`\`\`${language}\n${code}\n\`\`\``;
  
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/50">
      <MDXContent source={source} />
    </div>
  );
}
