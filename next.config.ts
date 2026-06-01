import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";
const repoName = "mh-shuvo";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
