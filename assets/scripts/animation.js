// Xử lý header đổi nền khi scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    // ngưỡng 50px, bạn có thể giảm xuống 10 nếu muốn
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

// ================= 3. SCROLL REVEAL (hiện section khi cuộn đến) =================
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      } else {
        entry.target.classList.remove("revealed");
      }
    });
  },
  { threshold: 0.2 },
);
sections.forEach((section) => observer.observe(section));
