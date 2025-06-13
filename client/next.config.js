/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   webpack: (config) => {
      config.cache = { type: 'memory' };
      return config;
   }
};

module.exports = nextConfig;
