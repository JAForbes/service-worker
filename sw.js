importScripts('serviceworker-cache-polyfill.js')

self.oninstall = function(event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open("v1").then(function(cache) {
      return cache.addAll([
      	"/service-worker/",
      	"/service-worker/index.html",
      	"/service-worker/app.js",
      	"/service-worker/fallback.jpg",
        new Request('https://dhsn5tcrzbqtk.cloudfront.net/1/large/5427196-e1341q.jpg', {mode: 'no-cors'})
      ]);

    })
  );
}

self.onfetch = function(event) {
	var networkRequest = fetch.bind(null,event.request)
	var cacheFallback = caches.match.bind(caches,"https://dhsn5tcrzbqtk.cloudfront.net/1/large/5427196-e1341q.jpg")

	event.respondWith(
		caches.match(event.request)
			.then(responseOK)
			.catch(networkRequest)
			.then(responseOK)
			.catch(cacheFallback)
	)
}

function responseOK(response){
	return response && response.ok ?
		response : Promise.reject("Response is not OK")
}