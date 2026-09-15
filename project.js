(function () {
  "use strict";

  const SLIDE_DURATION = 4000; // ms each image stays before sliding to the next
  const SWIPE_DISTANCE = 40;   // px a touch must travel to count as a swipe

  const modal = document.getElementById("project-modal");
  if (!modal || typeof modal.showModal !== "function") return;

  const slider = modal.querySelector(".slider");
  const stage = modal.querySelector("[data-slider-stage]");
  const dotsBox = modal.querySelector("[data-slider-dots]");
  const counter = modal.querySelector("[data-slider-counter]");
  const progress = modal.querySelector("[data-slider-progress]");
  const titleEl = modal.querySelector("[data-modal-title]");
  const descEl = modal.querySelector("[data-modal-desc]");

  slider.style.setProperty("--slide-duration", SLIDE_DURATION + "ms");

  let slides = [];
  let dots = [];
  let current = 0;
  let lastTrigger = null;

  /* ---------- Slider ---------- */

  // The progress bar's CSS animation is the timer: when it finishes, the next slide shows
  function restartTimer() {
    progress.classList.remove("is-running");
    void progress.offsetWidth; // reflow so the animation starts again from zero
    if (slides.length > 1) progress.classList.add("is-running");
  }

  function show(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
    counter.textContent = `${current + 1} / ${slides.length}`;

    restartTimer();
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  progress.addEventListener("animationend", next);
  stage.addEventListener("click", next);
  modal.querySelector("[data-slider-prev]").addEventListener("click", prev);
  modal.querySelector("[data-slider-next]").addEventListener("click", next);

  // Pause auto-slide while the pointer is over the images
  slider.addEventListener("mouseenter", () => slider.classList.add("is-paused"));
  slider.addEventListener("mouseleave", () => slider.classList.remove("is-paused"));

  // Swipe left / right on touch screens
  let touchStartX = null;
  stage.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < SWIPE_DISTANCE) return;
    event.preventDefault(); // don't also treat the swipe as a tap
    if (distance < 0) next(); else prev();
  });

  function buildSlider(images) {
    slides = images.map((image, i) => {
      const slide = image.cloneNode(true);
      slide.className = "slider__slide";
      slide.removeAttribute("loading");
      slide.draggable = false;
      if (!slide.alt) slide.alt = `screenshot ${i + 1}`;
      return slide;
    });
    stage.replaceChildren(...slides);

    dots = slides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("aria-label", `show image ${i + 1}`);
      dot.addEventListener("click", () => show(i));
      return dot;
    });
    dotsBox.replaceChildren(...dots);

    slider.classList.toggle("is-single", slides.length < 2);
  }

  /* ---------- Popup ---------- */

  function openProject(project, trigger) {
    const details = project.querySelector(".project__details");
    if (!details) return;

    lastTrigger = trigger || null;
    titleEl.textContent = project.querySelector(".project__title").textContent.trim();

    const desc = details.querySelector(".project__desc");
    descEl.replaceChildren(desc ? desc.cloneNode(true) : "");
    descEl.parentElement.scrollTop = 0;

    buildSlider(Array.from(details.querySelectorAll("img")));

    modal.showModal();
    show(0);

    // Shareable link straight to this project, e.g. /project#agriyield
    history.replaceState(null, "", "#" + project.id);
  }

  modal.addEventListener("close", () => {
    progress.classList.remove("is-running");
    slider.classList.remove("is-paused");
    stage.replaceChildren();
    slides = [];
    dots = [];
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (lastTrigger) lastTrigger.focus();
  });

  modal.querySelector("[data-modal-close]").addEventListener("click", () => modal.close());

  // Clicking the dimmed area outside the popup closes it
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  // Captured before about.js sees the key: Escape closes only the popup, not the whole page
  window.addEventListener("keydown", (event) => {
    if (!modal.open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      modal.close();
    } else if (event.key === "ArrowRight") {
      next();
    } else if (event.key === "ArrowLeft") {
      prev();
    }
  }, true);

  document.querySelectorAll(".project__card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.closest(".project"), card));
  });

  // Open a project directly when the page is loaded with its #id
  const linked = window.location.hash && document.getElementById(window.location.hash.slice(1));
  if (linked && linked.classList.contains("project")) {
    openProject(linked, linked.querySelector(".project__card"));
  }
})();
