const CACHE='urban95soul-v2';
const APP=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./assets/icon.svg','./assets/shows/battle-zone.jpg','./assets/shows/night-flight.jpg','./assets/shows/chill-zone.jpg','./assets/shows/smiley-j.jpg','./assets/shows/basement-party.jpg','./assets/shows/coffey-break.jpg','./assets/shows/jazz-soul.jpg','./assets/shows/smooth-jazz-weekend.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.destination==='audio')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))) });
