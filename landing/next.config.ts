import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
  // design-system is consumed straight from TypeScript source (no dist) —
  // Next must compile it as part of the landing build.
  transpilePackages: ["@openzync/design-system"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
