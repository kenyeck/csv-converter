import { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactStrictMode: true,
   experimental: {
      optimizePackageImports: ['@chakra-ui/next-js', '@chakra-ui/react']
   },
   typescript: {
      ignoreBuildErrors: true
   },
   eslint: {
      ignoreDuringBuilds: true
   }
};

export default nextConfig;
