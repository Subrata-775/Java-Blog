// script.js
window.addEventListener("DOMContentLoaded", () => {
  const msg = document.querySelector(".message");
  if (msg) {
    setTimeout(() => {
      msg.remove();
    }, 3000);
  }
});
// script.js -- mod of dark and light
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  const isDark = localStorage.getItem("mode") === "dark";

  if (isDark) {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });
});

