import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
