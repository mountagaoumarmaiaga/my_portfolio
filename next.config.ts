import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["cdn.jsdelivr.net", "images.unsplash.com"],
  },
};

export default nextConfig;
