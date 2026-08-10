import { initProjectDialogs } from "./components/projectDialog.js";
import { initTheme } from "./components/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initProjectDialogs();
});
