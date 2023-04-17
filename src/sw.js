// Définition des fichiers à mettre en cache
const cacheName = 'my-app-cache';
const filesToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/app.js'
];

// Mise en cache des fichiers lors de l'installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

// Intercepte les requêtes réseau pour retourner les fichiers mis en cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la réponse est en cache, on la renvoie
        if (response) {
          return response;
        }
        // Sinon, on la récupère depuis le réseau
        return fetch(event.request)
          .then(response => {
            // On met la réponse en cache
            return caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, response.clone());
                return response;
              });
          });
      })
      .catch(() => {
        // Si la requête échoue, on affiche la page offline
        return caches.match('/pages/offline.html');
      })
  );
});
