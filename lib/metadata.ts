import { Metadata } from "next";

export function constructMetadata({
  title = "Jay Singh Chauhan | Full Stack Product Engineer & UI/UX Designer",
  description = "Jay Singh Chauhan is a full stack product engineer and designer specializing in building scalable, user-friendly digital solutions, from research and strategy to design and engineering.",
  image = "/me.webp",
  icons = "/favicon.ico",
  noIndex = false,
  canonical = "/",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: "website",
      siteName: "Jay Singh Chauhan Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@jaychauhan_exe",
    },
    icons,
    metadataBase: new URL("https://jaysinghchauhan.com"),
    manifest: "/manifest.json",
    alternates: {
      canonical: canonical,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
