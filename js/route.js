export {
    RouteAsync
}

import { SetupNavbarShowAfterScroll, SetupGallery, SetupBackgroundProgressiveImage } from "/js/setup.js";

async function RouteAsync(path, params) {
    let route = FindMatchingRoute(path, params);
    if(route != undefined) {
        await route.handler(params);
        return;
    }
}

function FindMatchingRoute(path, params) {
    return routes.filter(route => 
        route.path === path && 
        (!route.params || route.params.length === params.size) &&
        (!route.params || params.size === 0 || route.params.every(param => params.has(param)))
    ).sort((a, b) => (b.params ? b.params.length : 0) - (a.params ? a.params.length : 0))[0];
}

let routes = [];

routes.push({path:"/",handler:RouteHome});
routes.push({path:"/index",handler:RouteHome});
routes.push({path:"/index.html",handler:RouteHome});
function RouteHome(params) {
    SetupNavbarShowAfterScroll();
    SetupBackgroundProgressiveImage();
    SetupGallery();
}