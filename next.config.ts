import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  // other next.js config here
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
