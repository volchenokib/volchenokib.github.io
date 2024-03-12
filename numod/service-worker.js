const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start;
const oneDay = 1000 * 60 * 60 * 24;
const day = Math.floor(diff / oneDay);

const self = this;

const CACHE_NAME = 'v1-cache';
const urlsToCache = [
  // '/',
  // '/main.js',
  // '/utils/currentDay.js',
  // '/styles.css',
  // '/worker.js',
  // '/index.html',
  // '/manifest.json',
  // '/icons/icon-192x192.png',
  // '/icons/icon-512x512.png',
];

// Installing Service Worker and caching resources
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// Request hijacking to implement a 'Cache First' strategy with dynamic caching of API data
self.addEventListener('fetch', event => {
  // Check if the request matches the URL of our API
  if (event.request.url.endsWith(`${day}.json`)) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // If there is a copy of the data from the API in the cache, return it
            return cachedResponse;
          }

          // If it is not in the cache, make a request to the API
          return fetch(event.request).then(response => {
            // Check if a valid response has been received
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloning a response, since a response can only be read once
            const responseToCache = response.clone();

            // Open the cache and cache new data from the API
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          });
        })
    );
  }
});
