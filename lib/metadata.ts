import { Metadata } from "next";

export function constructMetadata({
  title = "Jay Singh Chauhan | Product Engineer & Designer",
  description = "A full stack product engineer and designer focused on delivering well-designed digital products.",
  image = "/me.webp",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
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
      creator: "@jaychauhan_exe", // Assuming this is his handle, can be updated
    },
    icons,
    metadataBase: new URL("https://jaysinghchauhan.com"), // Replace with actual domain if known
    manifest: "/manifest.json",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
