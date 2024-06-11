import { ResolveAttributesForNodeListAsync, SetupNavbarShowAfterScroll } from "/js/setup.js";
import { RouteAsync } from "/js/route.js";

document.addEventListener("DOMContentLoaded", async function() {
    await RouteAsync(window.location.pathname, new URLSearchParams(window.location.search));
    // perform below setup for all pages
    ResolveAttributesForNodeListAsync(document.childNodes);
    SetupNavbarShowAfterScroll();
});