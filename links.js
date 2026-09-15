(function () {
  "use strict";

  const HOME_URL = "/";

  /* ---------- Light / dark theme (shared key with index.html) ---------- */
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

  // Escape closes the window, like the X button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.location.href = HOME_URL;
    }
  });
})();
