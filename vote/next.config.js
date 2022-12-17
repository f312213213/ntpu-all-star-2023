/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    domains: ['storage.googleapis.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
