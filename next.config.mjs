/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Prevents Next.js image optimization issues in static mode
  },
};

export default nextConfig;
