if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let n = {};
    const f = (e) => a(e, t),
      r = { module: { uri: t }, exports: n, require: f };
    s[t] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (i(...e), n));
  };
}
define(['./workbox-f52fd911'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '00d168855f34d0248d5ddf1c377dd716' },
        {
          url: '/_next/static/2cEIA175QqhlX7LVfDE6M/_buildManifest.js',
          revision: '708ab632096db0fbee1d0794df587ed7',
        },
        {
          url: '/_next/static/2cEIA175QqhlX7LVfDE6M/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/341.df3329d77a5faa19.js', revision: 'df3329d77a5faa19' },
        {
          url: '/_next/static/chunks/41ade5dc-2a5efe4aacf1abe8.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        { url: '/_next/static/chunks/472.a3826d29d6854395.js', revision: 'a3826d29d6854395' },
        {
          url: '/_next/static/chunks/4bd1b696-1897831b3bbea01c.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        { url: '/_next/static/chunks/684-1281e00e4f45a481.js', revision: '2cEIA175QqhlX7LVfDE6M' },
        {
          url: '/_next/static/chunks/app/_not-found/page-f76c6b05adeed9bd.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/app/layout-1c420b18054996fd.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/app/page-479c74aab6dda6c8.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/framework-f593a28cde54158e.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        { url: '/_next/static/chunks/main-9de120170d7436e1.js', revision: '2cEIA175QqhlX7LVfDE6M' },
        {
          url: '/_next/static/chunks/main-app-3f8e1198ef54047f.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/pages/_app-92f2aae776f86b9c.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/pages/_error-71d2b6a7b832d02a.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-5236545465958c81.js',
          revision: '2cEIA175QqhlX7LVfDE6M',
        },
        { url: '/_next/static/css/874da5b7b85a5cc9.css', revision: '874da5b7b85a5cc9' },
        {
          url: '/_next/static/media/569ce4b8f30dc480-s.p.woff2',
          revision: 'ef6cefb32024deac234e82f932a95cbd',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/fonts/BlackOpsOne-Regular.ttf', revision: '0a0055cabc89752001e4195c355e7d54' },
        { url: '/fonts/OFL.txt', revision: '198a94149efa5c77371f91bbfe77f50b' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icons/icon-192x192.png', revision: 'b7edb87f8d8112efda1849a99f38f4ba' },
        { url: '/icons/icon-512x512.png', revision: '01a8fa5c38fd2ac826bd556a07790949' },
        { url: '/manifest.json', revision: '91a07cd9cbe70efa7d63f46482591675' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: c }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^\/$/,
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^\/_next\/static\/.*/i,
      new e.CacheFirst({
        cacheName: 'static-resources',
        plugins: [new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:png|jpg|jpeg|svg|gif|webp|woff2|ttf?)$/i,
      new e.CacheFirst({
        cacheName: 'static-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 5184e3 })],
      }),
      'GET'
    );
});
