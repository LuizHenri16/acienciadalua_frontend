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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  /* config options here */
  allowedDevOrigins: [
    "*.us-east1.run.app",
    "**.run.app",
  ],
  reactCompiler: true,
  output: "standalone",
  images: {
    qualities: [75, 100],
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
