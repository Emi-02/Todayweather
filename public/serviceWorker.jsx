const CACHE_NAME = "version-1"
const urlsToCache = ["index.html", "offline.html"];

const self = this;
// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache)
    })
  )
})
// Listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(() => {
      return fetch(event.request)
      .catch(() => cache.match("offline.html"))
    })
  )
})
//Activete the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    cache.keys().then((cachenames) => {
      cachenames.map((cachenames) => {if(!cacheWhitelist.includes(cachename))
        return caches.delete(cachename)})
    })
  )
})