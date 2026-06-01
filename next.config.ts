import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
