//SW Version
const version = 2.0;

//Static Cashe - app shell
const appAssets = [
    'index.htm',
    'app/global.js?bust=1.0.0.201902070832_1555517417665',
    'main.js',
    'axon.js',
    'fonts/fonts.css'

];

//SW install 
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open('static-$(version)')
            .then(cache => cache.addAll(appAssets))
    );
    
});

//SW Activate
self.addEventListener('activate', e=> {

    let cleaned = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key !== 'static-${version}' && key.match('static-')){
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(cleaned);
});


//static cache startegy - cache with Network Fallback
const staticCache = (req) => {

    return caches.match(req).then( cachedRes =>{

        if(cachedRes) return cachedRes;

        //fallback to Network 
        return fetch(req).then ( networkRes =>{
            
            //update cache with new response
            caches.open('static-${version}')
                .then( cache => cache.put( req, networkRes));

                //Return Clone of network Response
                return networkRes.clone();
        });

    });
};

//SW Fetch

self.addEventListener('fetch', e => {

    if(e.request.url.match(location.origin) ){
        e.respondWith( staticCache(e.request));
    }
});




