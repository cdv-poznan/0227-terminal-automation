const CACHE = 'dependencies-cache';
const FILES = ['/', 'main.js', 'style.css', 'favicon.ico'];

self.addEventListener('install', (installEvent) => {
  console.log('install', installEvent);

  installEvent.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting(), console.warn),
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  console.log('fetch', fetchEvent);
  if (navigator.onLine) {
    fetchEvent.waitUntil(update(fetchEvent.request));
  } else {
    fetchEvent.respondWith(fromCache(fetchEvent.request));
  }
});

self.addEventListener('activate', (activateEvent) => {
  console.log('activate', activateEvent);
  activateEvent.waitUntil(self.clients.claim());
});

async function update(request) {
  if (request.url.startsWith('https')) {
    const cache = await caches.open(CACHE);
    const respone = await fetch(request);
    await cache.put(request, respone.clone());
    return respone;
  } else {
    return Promise.reject();
  }
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const matching = await cache.match(request);
  return matching || Promise.reject('no-match');
}
