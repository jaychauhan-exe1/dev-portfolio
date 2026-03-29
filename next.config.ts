import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*(svg|jpg|png|webp|ico|json|txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jaysinghchauhan.com',
          },
        ],
        destination: 'https://jaysinghchauhan.com/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
