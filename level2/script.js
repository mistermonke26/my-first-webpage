const THEMES = ["light", "dark", "high-contrast"];
const THEME_KEY = "portfolio-theme";

function getPreferredTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme && THEMES.includes(savedTheme)) {
    return savedTheme;
  }
  return getPreferredTheme();
}

function themeLabel(theme) {
  if (theme === "high-contrast") {
    return "Theme: High Contrast";
  }
  return `Theme: ${theme.charAt(0).toUpperCase()}${theme.slice(1)}`;
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const label = document.getElementById("theme-label");
  if (label) {
    label.textContent = themeLabel(theme);
  }
}

function nextTheme(currentTheme) {
  const currentIndex = THEMES.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % THEMES.length;
  return THEMES[nextIndex];
}

function initThemeToggle() {
  const toggleButton = document.getElementById("theme-toggle");
  const icon = document.querySelector(".toggle-icon");

  if (!toggleButton) {
    return;
  }

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  toggleButton.addEventListener("click", () => {
    currentTheme = nextTheme(currentTheme);
    applyTheme(currentTheme);
    localStorage.setItem(THEME_KEY, currentTheme);

    if (icon) {
      icon.classList.remove("spin");
      void icon.offsetWidth;
      icon.classList.add("spin");
    }
  });
}

initThemeToggle();
