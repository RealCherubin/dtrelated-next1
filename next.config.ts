import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Add base path for GitHub Pages (replace 'your-repo-name' with your actual repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/dtrelated-next1' : '',
  // Optimize for large media files
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  // Increase build timeout for large files
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
