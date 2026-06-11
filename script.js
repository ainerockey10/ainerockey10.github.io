const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const paletteButtons = document.querySelectorAll(".palette-swatch");
const savedTheme = localStorage.getItem("portfolio-theme") || "gold";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);

  paletteButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === theme;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

applyTheme(savedTheme);

paletteButtons.forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.dataset.themeValue));
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
