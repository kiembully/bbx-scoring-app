module.exports = {
  runtimeCaching: [
    {
      urlPattern: /^https?.*\/$/, // Home page
      handler: 'NetworkFirst',
      options: {
        cacheName: 'home-page',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      urlPattern: /^https?.*\.(?:js|css|png|jpg|jpeg|svg|gif|woff2|ttf?)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
};
