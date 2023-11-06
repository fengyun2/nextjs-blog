/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/fengyun2/nextjs-blog/main/images/**',
      },
    ],
  },
}

module.exports = nextConfig
