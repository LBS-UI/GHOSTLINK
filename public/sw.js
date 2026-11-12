/* =========================================================
   GHOSTLINK // SERVICE WORKER
   Caches only the local application shell. No cross-origin
   resources are cached. Requires HTTPS or localhost.
   ========================================================= */

const CACHE_NAME = 'ghostlink-shell-v1';

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest'
];

/* ---------- install: pre-cache the shell ---------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => { /* installation still resolves; app works online */ })
  );
});

/* ---------- activate: drop obsolete caches ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ---------- fetch ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  /* never touch cross-origin requests (fonts, third parties) */
  if (url.origin !== self.location.origin) return;

  /* navigations: network first, fall back to cached shell */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match('./index.html').then((hit) => hit || caches.match('./'))
      )
    );
    return;
  }

  /* same-origin assets: cache first, then network (and cache it) */
  event.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});