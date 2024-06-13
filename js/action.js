export {
    ActionViewMoreGallery
}

import { BREAKPOINT_LARGE_VALUE } from "/js/constant.js";

function ActionViewMoreGallery() {
    let galleryItemsHidden = document.querySelectorAll("#galleryItemsContainer div[hidden]");

    let galleryItemsToBeVisible = 2;
    if(window.innerWidth >= BREAKPOINT_LARGE_VALUE)
        galleryItemsToBeVisible = 3;

    Array.from(galleryItemsHidden).slice(0,Math.min(galleryItemsHidden.length, galleryItemsToBeVisible)).forEach((element) => {
        element.removeAttribute("hidden");
    });

    if(document.querySelectorAll("#galleryItemsContainer div[hidden]").length == 0)
    document.getElementById("galleryViewMore").setAttribute("hidden", "");
}