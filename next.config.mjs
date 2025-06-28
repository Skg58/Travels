/** @type {import('next').NextConfig} */
const nextConfig = {devIndicators: false ,  reactStrictMode: false,eslint: {
    ignoreDuringBuilds: true,
  },images: {
    remotePatterns: [new URL('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'),{
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },]
  },};

export default nextConfig;
