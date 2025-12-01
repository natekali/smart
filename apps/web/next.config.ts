import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@smart/db"],
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;
