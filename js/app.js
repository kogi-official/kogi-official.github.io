import { ResolveAttributesForNodeListAsync } from "/js/setup.js";

window.onload = async function() {
    ResolveAttributesForNodeListAsync(document.childNodes);
}