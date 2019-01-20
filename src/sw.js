/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-undef
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js',
);

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');
  // eslint-disable-next-line no-underscore-dangle
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerRoute(
    new RegExp('.*.js'),
    workbox.strategies.networkFirst(),
  );
  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css-cache',
    }),
  );

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );
} else {
  console.log("Boo! Workbox didn't load 😬");
}
