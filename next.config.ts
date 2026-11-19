import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static files (./out) so the site can be hosted on GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
