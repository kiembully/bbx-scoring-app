import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  // Add more config if needed
};

export default withPWA({
  ...nextConfig,
  dest: "public",
  register: true,
  skipWaiting: true,
});
