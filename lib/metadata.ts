import { Metadata } from "next";

export function constructMetadata({
  title = "Jay Singh Chauhan | Full Stack Engineer & Designer",
  description = "Jay Singh Chauhan is a full stack product engineer and designer building scalable, user-friendly digital solutions from research to engineering.",
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
