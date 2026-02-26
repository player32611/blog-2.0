import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
    modules: true,
  },
};

export default nextConfig;
