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
