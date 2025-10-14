/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },

      // Production backend (Railway)
      {
        protocol: "https",
        hostname: "learnoria-backend-production.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "learnoria-backend-production.up.railway.app",
      },

      // Local development
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
