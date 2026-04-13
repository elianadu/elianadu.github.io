function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// Mobile tap toggle for photo swap
const photoWrapper = document.querySelector(".photo-wrapper");
if (photoWrapper) {
  photoWrapper.addEventListener("click", () => {
    photoWrapper.classList.toggle("toggled");
  });
}
