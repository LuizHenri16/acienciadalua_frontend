import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  turbopack: {
    root: "."
  }
};

export default nextConfig;
