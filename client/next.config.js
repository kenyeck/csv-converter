const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
   const config = {
      ...defaultConfig,
      reactStrictMode: true,
      experimental: {
         optimizePackageImports: ['@chakra-ui/next-js', '@chakra-ui/react']
      }
   };
   return config;
};
