/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '/tmp/poc-digitalbrain-next',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
