export {
    ResolveAttributesForNodeListAsync
}

import { SELECTOR_HTMLLOAD } from "/js/constant.js";
import { ComposeHtmlLoadAsync } from "/js/compose.js";

async function ResolveAttributesForNodeAsync(node) {
    if(!(node instanceof Element))
        return;

    await ResolveAttributeHtmlLoad(node);
}

async function ResolveAttributesForNodeListAsync(nodeList) {
    for(let node of nodeList) {
        ResolveAttributesForNodeAsync(node);
    }
}

async function ResolveAttributeHtmlLoad(node) {
    const nodesHtmlLoad = Array.from(node.querySelectorAll(SELECTOR_HTMLLOAD));
    await Promise.all(nodesHtmlLoad.map(async (element) => {
        await ComposeHtmlLoadAsync(element);
        await ResolveAttributesForNodeListAsync(element.childNodes);
    }));
}