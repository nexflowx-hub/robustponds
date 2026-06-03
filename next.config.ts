import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "robustponds.pt",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.robustponds.pt",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: [
    "robustponds.shop",
    "www.robustponds.shop",
    "localhost",
  ],
};

export default nextConfig;
