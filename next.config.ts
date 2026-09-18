import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Traces the runtime dependency graph into .next/standalone so the Docker
  // image only ships what the server actually needs, not the full node_modules.
  output: "standalone",

  reactStrictMode: true,

  // agent-twitter-client pulls in @roamhq/wrtc, a native module. Bundling it
  // makes Next try to resolve its binary at build time instead of at
  // require()-time on the actual runtime platform, which breaks the build.
  serverExternalPackages: ["twitter-api-v2", "agent-twitter-client", "wrtc", "@roamhq/wrtc-darwin-arm64"],

  images: {
    remotePatterns: [new URL("https://pbs.twimg.com/**")],
  },

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
