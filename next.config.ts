import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable compression for better performance
  compress: true,
  
  // Generate ETags for better caching
  generateEtags: true,
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
