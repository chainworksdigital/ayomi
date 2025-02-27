/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static export mode
    images: {
      unoptimized: true, // Prevents Next.js image optimization issues in static mode
    },
  };
  
  export default nextConfig;
  