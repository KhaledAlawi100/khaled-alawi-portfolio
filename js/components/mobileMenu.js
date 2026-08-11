/**
 * Initializes the mobile navigation menu.
 */
export function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNavigation = document.querySelector(".mobile-navigation");

  if (!menuToggle || !mobileNavigation) {
    console.warn(
      "Mobile navigation elements were not found. Expected .menu-toggle and .mobile-navigation.",
    );

    return;
  }

  const navigationLinks = mobileNavigation.querySelectorAll("a");

  /**
   * Opens or closes the mobile navigation.
   */
  function setMenuState(isOpen) {
    menuToggle.classList.toggle("is-open", isOpen);

    mobileNavigation.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    mobileNavigation.setAttribute("aria-hidden", String(!isOpen));

    /*
     * The `hidden` attribute controls whether the element
     * is actually hidden from the page.
     */
    mobileNavigation.hidden = !isOpen;
  }

  /**
   * Toggle menu when hamburger button is clicked.
   */
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  /**
   * Close the mobile menu after clicking a navigation link.
   */
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  /*
   * Make sure the menu starts in a closed state.
   */
  setMenuState(false);
}
