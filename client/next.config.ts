import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "eduindex.org",
      "images.unsplash.com",
      "static.vecteezy.com",
      "i.pinimg.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
