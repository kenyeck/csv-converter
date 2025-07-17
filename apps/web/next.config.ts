import { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactStrictMode: true,
   env: {
      NEXTAUTH_URL:
         `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}/api/auth`
   },
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
