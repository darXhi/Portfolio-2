(function () {
  "use strict";

  /* ---------- Light / dark theme ---------- */
  const THEME_KEY = "theme";
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  // localStorage can throw in private mode or when storage is blocked
  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      /* the theme still applies for this visit */
    }
  }

  // Without a saved choice, the CSS follows the system setting
  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? "dark" : "light");
  }

  function updateToggle() {
    const isDark = currentTheme() === "dark";
    themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    themeToggle.setAttribute("aria-label", isDark ? "switch to light mode" : "switch to dark mode");
  }

  const storedTheme = readStoredTheme();
  if (storedTheme === "dark" || storedTheme === "light") {
    root.dataset.theme = storedTheme;
  }
  updateToggle();

  themeToggle.addEventListener("click", () => {
    const nextTheme = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    storeTheme(nextTheme);
    updateToggle();
  });

  systemDark.addEventListener("change", updateToggle);

  const DEFAULT_VIEW = "home";
  const views = document.querySelectorAll(".view");
  const windowTitle = document.getElementById("window-title");

  /**
   * Shows the view that matches the URL hash (e.g. #about).
   * Hash-based routing keeps the browser back button working
   * and lets the site run by simply opening index.html.
   */
  function showView(id) {
    const target = document.getElementById(id);
    const viewId = target && target.classList.contains("view") ? id : DEFAULT_VIEW;

    views.forEach((view) => {
      const isActive = view.id === viewId;
      view.hidden = !isActive;
      view.classList.toggle("is-active", isActive);

      if (isActive) {
        windowTitle.textContent = view.dataset.title;
      }
    });
  }

  function handleRoute() {
    showView(window.location.hash.slice(1) || DEFAULT_VIEW);
  }

  // Placeholder links ("#") should not reset the current view
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href="#"]');
    if (link) event.preventDefault();
  });

  /* ---------- Looping typing animation for the greeting ---------- */
  const TYPE_SPEED = 110;
  const DELETE_SPEED = 50;
  const HOLD_FULL = 1800;
  const HOLD_EMPTY = 500;

  function startTyping(container) {
    // Each [data-typing] span keeps its own color; text is typed across them in order
    const segments = Array.from(container.querySelectorAll("[data-typing]"));
    const texts = segments.map((segment) => segment.textContent);
    const total = texts.reduce((sum, text) => sum + text.length, 0);
    let count = 0;
    let deleting = false;

    function render() {
      let remaining = count;
      segments.forEach((segment, i) => {
        const visible = Math.min(remaining, texts[i].length);
        segment.textContent = texts[i].slice(0, visible);
        remaining -= visible;
      });
    }

    function tick() {
      count += deleting ? -1 : 1;
      render();

      let delay = deleting ? DELETE_SPEED : TYPE_SPEED;
      if (count === total) {
        deleting = true;
        delay = HOLD_FULL;
      } else if (count === 0) {
        deleting = false;
        delay = HOLD_EMPTY;
      }
      setTimeout(tick, delay);
    }

    render();
    setTimeout(tick, HOLD_EMPTY);
  }

  const typedGreeting = document.getElementById("typed-greeting");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typedGreeting && !prefersReducedMotion) {
    startTyping(typedGreeting);
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute();
})();
