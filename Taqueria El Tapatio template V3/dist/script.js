/* ==========================================
   TAQUERIA EL TAPATIO - SCRIPT.JS
   ========================================== */

// Wait until the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Stop if required elements are missing
  if (!hamburgerBtn || !navMenu) return;

  /**
   * Open the mobile navigation menu
   */
  function openMenu() {
    navMenu.classList.add("active");
    hamburgerBtn.classList.add("active");

    // Accessibility attributes
    hamburgerBtn.setAttribute("aria-expanded", "true");
    navMenu.setAttribute("aria-hidden", "false");

    // Prevent page scrolling while menu is open
    document.body.classList.add("menu-open");
  }

  /**
   * Close the mobile navigation menu
   */
  function closeMenu() {
    navMenu.classList.remove("active");
    hamburgerBtn.classList.remove("active");

    // Accessibility attributes
    hamburgerBtn.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");

    // Restore page scrolling
    document.body.classList.remove("menu-open");
  }

  /**
   * Toggle the mobile navigation menu
   */
  function toggleMenu() {
    const isOpen = navMenu.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Set initial accessibility state
  hamburgerBtn.setAttribute("aria-expanded", "false");
  navMenu.setAttribute("aria-hidden", "true");

  // Toggle menu when hamburger button is clicked
  hamburgerBtn.addEventListener("click", toggleMenu);

  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when the Escape key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
      hamburgerBtn.focus(); // Return focus to button
    }
  });

  // Close menu if user clicks outside the navigation and button
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedHamburger = hamburgerBtn.contains(event.target);

    if (
      navMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedHamburger
    ) {
      closeMenu();
    }
  });

  // Close menu when switching to desktop view
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});