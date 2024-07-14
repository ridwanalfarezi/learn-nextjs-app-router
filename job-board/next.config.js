const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "qbp9jede0gjlydww.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
