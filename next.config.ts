// next.config.ts
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';
import runtimeCaching from './workbox-config.js';

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
};

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/], // Optional but can fix some issues
};

// @ts-expect-error: next-pwa v4 doesn't have proper TS support
const withPWANextConfig = withPWA(pwaConfig)(nextConfig);
export default withPWANextConfig;
