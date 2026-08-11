import { initProjectDialogs } from "./components/projectDialog.js";
import { initTheme } from "./components/theme.js";
import { initContactForm } from "./components/contactForm.js";
import { initMobileMenu } from "./components/mobileMenu.js";
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initProjectDialogs();
  initContactForm();
  initMobileMenu();
});
