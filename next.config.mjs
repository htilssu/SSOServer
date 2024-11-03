/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  experimental: {
    ppr: 'incremental',
    serverActions: {
      bodySizeLimit: '10mb',
    }
  },
};

export default nextConfig;
