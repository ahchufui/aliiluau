/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure output is static for Vercel deployment
  output: 'standalone',
};

module.exports = nextConfig;
