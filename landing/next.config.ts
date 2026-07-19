import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    swcTarget: "es2017",
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
