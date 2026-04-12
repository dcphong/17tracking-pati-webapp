import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.shopify.com" },
      { hostname: "s.trackingmore.com" },
      { hostname: "tms.trackingmore.net" },
    ],
  },
};

export default nextConfig;
