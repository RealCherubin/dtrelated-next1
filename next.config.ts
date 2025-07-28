import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  // Disable problematic pages for static export
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
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
        path: false,
        os: false,
      };
    }
    
    // Handle lightningcss native dependency
    config.externals = config.externals || [];
    config.externals.push({
      'lightningcss': 'lightningcss'
    });
    
    return config;
  },
};

export default nextConfig;
