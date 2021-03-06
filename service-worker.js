// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

let cacheName = 'v1';

let cacheFiles = [
  "./android-chrome-192x192.png",
  "./android-chrome-512x512.png",
  "./apple-touch-icon.png",
  "./browserconfig.xml",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./favicon.ico",
  "./index.html",
  "./LICENSE",
  "./main.js",
  "./manifest.webmanifest",
  "./mstile-150x150.png",
  "./safari-pinned-tab.svg",
  "./service-worker.js",
  "./src/app/App.js",
  "./src/app/Controller.js",
  "./src/app/components/Button.js",
  "./src/app/components/Canvas.js",
  "./src/app/components/Container.js",
  "./src/app/components/New.js",
  "./src/app/components/controls/Brush.js",
  "./src/app/components/controls/Plus.js",
  "./src/app/components/controls/Clear.js",
  "./src/app/components/controls/Redo.js",
  "./src/app/components/controls/Save.js",
  "./src/app/components/controls/Undo.js",
  "./src/app/components/panels/BrushPanel.js",
  "./src/app/components/panels/PlusPanel.js",
  "./src/app/components/panels/SavePanel.js",
  "./src/app/icons/controls/Brush.png",
  "./src/app/icons/controls/Clear.png",
  "./src/app/icons/controls/Plus.png",
  "./src/app/icons/controls/Redo.png",
  "./src/app/icons/controls/Save.png",
  "./src/app/icons/controls/Undo.png",
  "./src/app/icons/cursors/Pencil.png",
  "./src/app/options/Brushes.js",
  "./src/style.css",
  "./node_modules/mithril/mithril.js",
  "./node_modules/pressure/dist/pressure.js",
  "./node_modules/downloadjs/download.js",
  "./node_modules/canvas2svg/canvas2svg.js"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(cacheFiles);
      })
      .catch(function(err) {
        console.log('service worker on install', err);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) return caches.delete(thisCacheName);
        }))
        .catch(function(err) { console.log('service worker on activate', err) });
      })
      .then(function() { self.clients.claim() })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
      .match(event.request)
			.then(function(response) {
				if (response) return response;

				var requestClone = event.request.clone();
				return fetch(requestClone)
					.then(function(response) {
				    if (!response) return response;
					  var responseClone = response.clone();
				    caches
              .open(cacheName)
              .then(function(cache) {
							  cache.put(event.request, responseClone);
							  return response;
				      })
              .catch(function(err) {
                console.log('service worker on request clone', err)
              });
          })
          .catch(function(err) {
            console.log('service worker on fetch', err);
          })
      })
      .catch(function(err) {
        console.log('service worker on fetch match', err);
      })
	);
});

