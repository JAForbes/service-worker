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


  	  //event.respondWith(  new Response('This came from the service worker!') )
	  event.respondWith(
	    caches.match(event.request).then(function(response) {
	      if (response) {
	        return response;
	      }
	      return fetch(event.request).then(function(response) {
	      	if(!response.ok) return reject("Invalid response")
	        return response;
	      }).catch(function(error) {
	      	return caches.match("https://dhsn5tcrzbqtk.cloudfront.net/1/large/5427196-e1341q.jpg")
	      });
	    })
	  );


}