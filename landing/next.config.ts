import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
