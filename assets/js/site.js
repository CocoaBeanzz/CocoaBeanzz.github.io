// Behavior for the content components used in project pages and posts:
//   - image galleries (_includes/elements/carousel.html) and their lightbox
//   - click-to-load YouTube videos (_includes/elements/video.html)
//   - slideshows: the About portrait (_includes/about/portrait.html) and the
//     department landing hero (_includes/landing/hero.html)
// Loaded at the end of <body> by _includes/scripts.html. No dependencies.

(function () {
  "use strict";

  // -------------------------------------------------------------------------
  // Lightbox: one shared <dialog> that shows a gallery image at full size.
  // Built on first use. Esc and the backdrop close it (native <dialog>
  // behavior plus the click handler below); arrow keys step through.
  // -------------------------------------------------------------------------

  var lightbox = null;        // the <dialog>, created lazily
  var lightboxImage = null;   // the <img> inside it
  var lightboxCount = null;   // "3 / 10"
  var lightboxSources = [];   // image URLs of the gallery being viewed
  var lightboxIndex = 0;

  function buildLightbox() {
    lightbox = document.createElement("dialog");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<img class="lightbox-image" alt="">' +
      '<button class="lightbox-button lightbox-close" type="button" aria-label="Close"></button>' +
      '<button class="lightbox-button gallery-prev" type="button" aria-label="Previous image"></button>' +
      '<button class="lightbox-button gallery-next" type="button" aria-label="Next image"></button>' +
      '<span class="lightbox-count"></span>';
    document.body.appendChild(lightbox);

    lightboxImage = lightbox.querySelector(".lightbox-image");
    lightboxCount = lightbox.querySelector(".lightbox-count");

    lightbox.querySelector(".lightbox-close").addEventListener("click", function () { lightbox.close(); });
    lightbox.querySelector(".gallery-prev").addEventListener("click", function () { stepLightbox(-1); });
    lightbox.querySelector(".gallery-next").addEventListener("click", function () { stepLightbox(1); });

    // A click that lands on the dialog itself is a click on the backdrop.
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    });
  }

  function showLightboxImage() {
    lightboxImage.src = lightboxSources[lightboxIndex];
    lightboxCount.textContent = (lightboxIndex + 1) + " / " + lightboxSources.length;
  }

  // Wraps around at both ends.
  function stepLightbox(direction) {
    var count = lightboxSources.length;
    lightboxIndex = (lightboxIndex + direction + count) % count;
    showLightboxImage();
  }

  function openLightbox(sources, index) {
    if (!lightbox) buildLightbox();
    lightboxSources = sources;
    lightboxIndex = index;
    showLightboxImage();
    lightbox.showModal();
  }

  // -------------------------------------------------------------------------
  // Galleries: a horizontally scrolling strip of images. The arrow buttons
  // scroll it most of one screen at a time and disable at either end.
  // Clicking an image opens it in the lightbox. Without this script the strip
  // still scrolls and each image is a plain link to its full-size file.
  // -------------------------------------------------------------------------

  function initGallery(gallery) {
    var track = gallery.querySelector(".gallery-track");
    var previous = gallery.querySelector(".gallery-prev");
    var next = gallery.querySelector(".gallery-next");
    var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-item"));
    var sources = items.map(function (item) { return item.getAttribute("href"); });

    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= maxScroll - 1;
    }

    function scrollByPage(direction) {
      track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
    }

    previous.addEventListener("click", function () { scrollByPage(-1); });
    next.addEventListener("click", function () { scrollByPage(1); });
    track.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    // Image widths are unknown until they load, which changes scrollWidth.
    track.addEventListener("load", updateButtons, true);

    items.forEach(function (item, index) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        openLightbox(sources, index);
      });
    });

    updateButtons();
  }

  // -------------------------------------------------------------------------
  // Videos: the page shows YouTube's thumbnail with a play button. The player
  // itself (and everything YouTube loads with it) only arrives on click.
  // -------------------------------------------------------------------------

  function initVideo(video) {
    var videoId = video.getAttribute("data-video-id");
    // Extra player settings from the page, e.g. "list=<playlist id>".
    var extraParams = video.getAttribute("data-video-params");
    var poster = video.querySelector(".video-poster");
    var thumbnail = video.querySelector("img");

    // The markup uses the thumbnail size every video has. Swap in the HD one
    // when it exists. For videos without it YouTube answers with a tiny grey
    // placeholder instead of an error, hence the width check.
    var hdThumbnail = new Image();
    hdThumbnail.onload = function () {
      if (hdThumbnail.naturalWidth > 320) thumbnail.src = hdThumbnail.src;
    };
    hdThumbnail.src = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";

    poster.addEventListener("click", function () {
      var player = document.createElement("iframe");
      player.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&rel=0" +
        (extraParams ? "&" + extraParams : "");
      player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      player.allowFullscreen = true;
      player.referrerPolicy = "strict-origin-when-cross-origin";
      video.replaceChild(player, poster);
    });
  }

  // -------------------------------------------------------------------------
  // Slideshows: several images stacked in one frame, shown one at a time.
  // Used by the About portrait (a fade) and the department landing hero (a
  // slide). This script only moves two marks along on a timer:
  //   is-showing   the image on screen
  //   is-leaving   the one that was on screen just before
  // What the change looks like is up to each frame's CSS. With one image, or
  // for visitors who ask their system for reduced motion, the first image
  // simply stays.
  //
  // The time each image stays up is data-slideshow-interval on the frame, in
  // milliseconds, or the default below.
  // -------------------------------------------------------------------------

  var SLIDESHOW_INTERVAL_MS = 4500;

  function initSlideshow(frame) {
    var photos = frame.querySelectorAll("img");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (photos.length < 2 || prefersReducedMotion) return;

    var interval = parseInt(frame.getAttribute("data-slideshow-interval"), 10) || SLIDESHOW_INTERVAL_MS;
    var current = 0;
    var leaving = null; // index of the image still carrying is-leaving

    window.setInterval(function () {
      var next = (current + 1) % photos.length;
      // Later images are lazy-loaded. Asking for the next one now means it is
      // ready by the time it comes on screen.
      photos[next].loading = "eager";

      if (leaving !== null) photos[leaving].classList.remove("is-leaving");
      photos[current].classList.remove("is-showing");
      photos[current].classList.add("is-leaving");
      photos[next].classList.remove("is-leaving");
      photos[next].classList.add("is-showing");

      leaving = current;
      current = next;
    }, interval);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-slideshow]"), initSlideshow);
  Array.prototype.forEach.call(document.querySelectorAll("[data-gallery]"), initGallery);
  Array.prototype.forEach.call(document.querySelectorAll(".video[data-video-id]"), initVideo);
})();
