import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 is used for the hero portrait so it stays crisp.
    qualities: [75, 80, 90],
    // Blog cover photos (Unsplash License).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // `/writings` was a duplicate of `/blog`; keep old links working.
  async redirects() {
    return [
      { source: "/writings", destination: "/blog", permanent: true },
      { source: "/writings/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
