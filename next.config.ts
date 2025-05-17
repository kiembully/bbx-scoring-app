import withPWA from "next-pwa";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // your other config
};

const pwaOptions = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
};

// @ts-expect-error: Unreachable code error
export default withPWA(nextConfig, pwaOptions);
