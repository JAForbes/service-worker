importScripts('serviceworker-cache-polyfill.js')

self.oninstall = function(event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open("v1").then(function(cache) {
      return cache.addAll([
        'fallback.jpg'
      ]);
    })
  );
};

self.onfetch = function(event) {


  if(event.request.url == "http://localhost/service-worker/awesome.jpg") {

  	event.respondWith( caches.match("fallback.jpg") )

  } else {
  	  //event.respondWith(  new Response('This came from the service worker!') )
	  event.respondWith(
	    caches.match(event.request).then(function(response) {
	      if (response) {
	        return response;
	      }
	      return fetch(event.request).then(function(response) {
	        return response;
	      }).catch(function(error) {

	        throw error;
	      });
	    })
	  );
  }

}