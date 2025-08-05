export {
    ResolveAttributesForNodeListAsync,
    SetupNavbarShowAfterScroll,
    SetupGallery,
    SetupBackgroundProgressiveImage
}

import { SELECTOR_HTMLLOAD, SELECTOR_PROGRESSIVEIMAGE, BREAKPOINT_LARGE_VALUE } from "/js/constant.js";
import { ComposeHtmlLoadAsync } from "/js/compose.js";
import { ActionViewMoreGallery } from "/js/action.js";

async function ResolveAttributesForNodeAsync(node) {
  if (!(node instanceof Element)) return;

  await ResolveAttributeHtmlLoad(node);
  await ResolveAttributeProgressiveImage(node);
}

async function ResolveAttributesForNodeListAsync(nodeList) {
  await Promise.all(Array.from(nodeList).map(ResolveAttributesForNodeAsync));
}

async function ResolveAttributeHtmlLoad(node) {
    const nodesHtmlLoad = Array.from(node.querySelectorAll(SELECTOR_HTMLLOAD));
    await Promise.all(nodesHtmlLoad.map(async (element) => {
        await ComposeHtmlLoadAsync(element);
        await ResolveAttributesForNodeListAsync(element.childNodes);
    }));
}

async function ResolveAttributeProgressiveImage(node) {
  const nodes = Array.from(node.querySelectorAll(SELECTOR_PROGRESSIVEIMAGE));

  nodes.forEach(img => {
    const originalSrc = img.getAttribute("src");
    if (!originalSrc || !originalSrc.includes("/assets/")) return;

    const thumbSrc = originalSrc.replace(/(\.[^/.]+)$/, "-thumb$1");

    // Preload thumbnail first
    const thumbImg = new Image();
    thumbImg.src = thumbSrc;

    thumbImg.onload = () => {
      img.setAttribute("src", thumbSrc);

      // Preload high-res image
      const highResImg = new Image();
      highResImg.src = originalSrc;

      highResImg.onload = () => {
        img.setAttribute("src", originalSrc);
      };
    };

    thumbImg.onerror = () => {
      console.warn(`Thumbnail not found: ${thumbSrc}`);
      // Optionally keep originalSrc or show fallback
    };
  });
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

function SetupBackgroundProgressiveImage() {
  const highResPath = "/assets/fabric-black-landscape.webp";
  const element = document.querySelector(".bg-fabric");
  if (!element) return;

  const img = new Image();
  img.src = highResPath

  img.onload = () => {
    element.style.backgroundImage = `linear-gradient(#00000000, 80%, #000000), url("${highResPath}")`;
  };
}