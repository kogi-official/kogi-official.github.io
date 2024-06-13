export {
    ResolveAttributesForNodeListAsync,
    SetupNavbarShowAfterScroll,
    SetupGallery
}

import { SELECTOR_HTMLLOAD, BREAKPOINT_LARGE_VALUE } from "/js/constant.js";
import { ComposeHtmlLoadAsync } from "/js/compose.js";
import { ActionViewMoreGallery } from "/js/action.js";

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

function SetupNavbarShowAfterScroll() {
    let nav = document.querySelector("nav");
    window.addEventListener("scroll", function() {
        if(this.window.scrollY > 0)
            nav.classList.add("opacity-100");
        else
            nav.classList.remove("opacity-100");
    });
}

function SetupGallery() {
    let galleryItems = document.querySelectorAll("#galleryItemsContainer div");

    let galleryItemsToBeVisible = 2;
    if(window.innerWidth >= BREAKPOINT_LARGE_VALUE)
        galleryItemsToBeVisible = 3;

    if(galleryItems.length <= galleryItemsToBeVisible)
        return;

    Array.from(galleryItems).slice(Math.min(galleryItemsToBeVisible, galleryItems.length)).forEach((element) => {
        element.setAttribute("hidden", "");
    });

    let galleryViewMore = document.getElementById("galleryViewMore");
    galleryViewMore.removeAttribute("hidden")
    galleryViewMore.addEventListener("click", function(event) {
        ActionViewMoreGallery();
    });
}