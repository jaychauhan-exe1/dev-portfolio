import { Metadata } from "next";

export function constructMetadata({
  title = "Jay Singh Chauhan | Full Stack Engineer & Designer",
  description = "Explore Jay Singh Chauhan's work as a full stack engineer & designer. I help businesses turn ideas into scalable digital products at Aciony Studios.",
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
  const finalTitle = typeof title === "string" ? title : title;

  return {
    title: {
      default: title,
      template: `%s — ${title}`,
    },
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
      title: title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: "website",
      siteName: "Jay Singh Chauhan",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [image],
      creator: "@jaychauhan_exe",
    },
    icons,
    metadataBase: new URL("https://jaysinghchauhan.com"),
    manifest: "/manifest.json",
    alternates: {
      canonical: canonical,
      languages: {
        "en-US": canonical,
        "x-default": canonical,
      },
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
