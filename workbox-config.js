// workbox-config.ts
// import type { RuntimeCaching } from 'next-pwa';
const runtimeCaching = [
  {
    urlPattern: /^\/$/,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'start-url',
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /^\/_next\/static\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-resources',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff2|ttf?)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 24 * 60 * 60,
      },
    },
  },
];

module.exports = runtimeCaching;
