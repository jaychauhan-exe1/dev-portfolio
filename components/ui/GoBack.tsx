"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBackProps {
  text?: string;
  href?: string;
}

export function GoBack({ text = "Go back", href }: GoBackProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    if (href) return; // Allow standard Link behavior if href is provided

    e.preventDefault();
    // Check if we can go back in history
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const Content = (
    <div className="flex gap-1 items-center text-foreground group w-fit">
      <ArrowLeftIcon size={12} className="" />
      <span className="text-sm underline underline-offset-4 decoration-foreground/40group-hover:decoration-foreground transition-all duration-300">
        {text}
      </span>
    </div>
  );

  return (
    <button
      onClick={handleBack}
      className="appearance-none bg-transparent border-none p-0 cursor-pointer block w-fit"
    >
      {href ? (
        <a href={href} onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }}>
          {Content}
        </a>
      ) : (
        Content
      )}
    </button>
  );
}
