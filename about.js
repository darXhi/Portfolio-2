(function () {
  "use strict";

  const HOME_URL = "index.html";

  // Use the theme picked on the home page so the backdrop matches it
  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      document.documentElement.dataset.theme = storedTheme;
    }
  } catch (error) {
    /* storage blocked: fall back to the system setting */
  }

  // Show the placeholder until a real photo exists at images/profile.jpg
  const photo = document.getElementById("profile-photo");
  if (photo) {
    photo.addEventListener("error", function handleMissingPhoto() {
      photo.removeEventListener("error", handleMissingPhoto);
      photo.src = photo.dataset.fallback;
    });
  }

  // Clicking the dimmed backdrop (outside the popup) closes it
  const overlay = document.querySelector(".page");
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      window.location.href = HOME_URL;
    }
  });

  // Escape closes the window, like the X button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.location.href = HOME_URL;
    }
  });
})();
