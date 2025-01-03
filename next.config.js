/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
  },
};
