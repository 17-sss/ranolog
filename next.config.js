const isAnalyze = process.env.ANALYZE === 'true';
const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: isAnalyze});
const analyzerConfig = isAnalyze
  ? withBundleAnalyzer({
      compress: true,
      webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        return {
          ...config,
          mode: prod ? 'production' : 'development',
          devtool: prod ? 'hidden-source-map' : 'eval',
        };
      },
    })
  : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...analyzerConfig,
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
