interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}

interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

const CacheKey = 'cache-v1';

const initCache = (): Promise<void> => {
  return caches.open(CacheKey).then(
    (cache) => {
      return cache.addAll(['./index.html']);
    },
    (error) => {
      console.log(error);
    },
  );
};

const tryNetwork = (
  req: RequestInfo | URL,
  timeout: number | undefined,
): Promise<unknown> => {
  console.log(req);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(req).then((res) => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();
      caches.open(CacheKey).then((cache) => {
        cache.put(req, responseClone);
      });
      resolve(res);
    }, reject);
  });
};

const getFromCache = (req: RequestInfo | URL): Promise<Response> => {
  console.log('network is off so getting from cache...');
  return caches.open(CacheKey).then((cache) => {
    return cache.match(req).then((result) => {
      return result || Promise.reject('no-match');
    });
  });
};

self.addEventListener('install', (e) => {
  const event = e as ExtendableEvent;
  console.log('Installed');
  event.waitUntil(initCache());
});

self.addEventListener('activate', (e) => {
  const event = e as ExtendableEvent;
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CacheKey) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (e) => {
  const event = e as FetchEvent;
  console.log('Try network and store result or get data from cache');
  event.respondWith(
    tryNetwork(event.request, 400).catch(() =>
      getFromCache(event.request),
    ) as Promise<any>,
  );
});
