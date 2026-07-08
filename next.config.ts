import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: 'www.acienciadalua.com.br'
          }
        ],
        destination: "https://acienciadalua.com.br/:path*",
        permanent: true
      },
    ];
  },
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  turbopack: {
    root: "."
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.acienciadalua.com.br",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
