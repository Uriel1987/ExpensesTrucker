/* Expense Tracker — offline cache
   Stale-while-revalidate: serve instantly from cache when available (so the
   app opens with no connection at all), and refresh the cache from the
   network in the background whenever the network is reachable. This only
   caches the app's own static files — expense data itself lives in the
   browser's localStorage on the device, never here. */

const CACHE_NAME = "expense-tracker-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request, { ignoreVary: true });
      const network = fetch(event.request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
