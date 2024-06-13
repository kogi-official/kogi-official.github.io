export {
    ComposeHtmlLoadAsync,
    ComposeThanks
}

import { GetTextAsync } from "/js/adapter.js";
import { ATTRIBUTE_HTMLLOAD } from "/js/constant.js";

async function ComposeHtmlLoadAsync(element) {
    let path = element.getAttribute(ATTRIBUTE_HTMLLOAD);
    let html = await GetTextAsync(path);
    element.innerHTML += html;
}

function ComposeThanks() {
}