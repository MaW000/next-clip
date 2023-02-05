/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "github.com",
      "lh3.googleusercontent.com",
      "static-cdn.jtvnw.net",
      "vod-secure.twitch.tv",
    ],
  },
};

module.exports = nextConfig;
