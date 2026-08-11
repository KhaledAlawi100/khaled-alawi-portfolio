const THEME_STORAGE_KEY = "theme";

export function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");

  if (!themeToggle) {
    console.warn("Theme toggle button was not found.");
    return;
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  // Dark mode is the default theme.
  const initialTheme = savedTheme || "dark";

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;

    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const themeToggle = document.querySelector(".theme-toggle");

  if (!themeToggle) {
    return;
  }

  const isDark = theme === "dark";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );

  themeToggle.setAttribute(
    "title",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}
