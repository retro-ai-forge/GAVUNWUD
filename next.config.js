/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  serverExternalPackages: ['twitter-api-v2', 'agent-twitter-client', 'wrtc', '@roamhq/wrtc-darwin-arm64'],
  images: {
    remotePatterns: [new URL('https://pbs.twimg.com/**')],
  },
};

module.exports = nextConfig; 