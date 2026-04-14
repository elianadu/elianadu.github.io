function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  if (themeToggle) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      iconMoon.style.display = "none";
      iconSun.style.display = "block";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      iconMoon.style.display = isDark ? "none" : "block";
      iconSun.style.display = isDark ? "block" : "none";
    });
  }

  // On touch devices, disable CSS :hover so tap-toggle works correctly
  window.addEventListener("touchstart", () => {
    document.body.classList.add("touch-device");
  }, { once: true });

  // Mobile tap toggle for photo swap
  const photoWrapper = document.querySelector(".photo-wrapper");
  if (photoWrapper) {
    photoWrapper.addEventListener("click", () => {
      photoWrapper.classList.toggle("toggled");
    });
  }
});
