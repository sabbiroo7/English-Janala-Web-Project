const navLinks = document.querySelectorAll('.nav_selected');
navLinks.forEach(nav_bar => {
  nav_bar.addEventListener('click', () => {
    navLinks.forEach(nav_bar => nav_bar.classList.remove('active'));
    nav_bar.classList.add('active');
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader_page").classList.add("hidden");
    document.getElementById("web_page").classList.remove("hidden");
  }, 500); // 0.5 second delay
});