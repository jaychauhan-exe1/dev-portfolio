import { Metadata } from "next";

export function constructMetadata({
  title = "Jay Singh Chauhan | Full Stack Engineer & Designer | Work & Experience",
  description = "Explore how I help businesses turn ideas into scalable digital products. View Jay Singh Chauhan's work experience as a designer and full stack engineer at Aciony Studios.",
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
    keywords: [
      "Jay Singh Chauhan",
      "Jay Chauhan",
      "Jay Chauhan Portfolio",
      "Jay Singh Chauhan Developer",
      "Jay Singh Chauhan Designer",
      "Full Stack Engineer",
      "Product Engineer",
      "Aciony Studios",
      "Jay Singh Chauhan Aciony",
    ],
    authors: [
      { name: "Jay Singh Chauhan", url: "https://jaysinghchauhan.com" },
    ],
    creator: "Jay Singh Chauhan",
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
