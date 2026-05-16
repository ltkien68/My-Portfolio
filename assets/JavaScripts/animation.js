/*  Hien khi scroll den  */
const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

elements.forEach((el) => observer.observe(el));

/*  hieu ung danh may  */

const text = "Lê Trung Kiên";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("title").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}

typeWriter();

/*  hieu ung hover cho card  */
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    // Vị trí chuột trong card (0 đến 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Góc xoay (tối đa 15 độ), đảo chiều Y cho tự nhiên
    const rotateY = (x - 0.5) * 30; // -15deg đến 15deg
    const rotateX = (0.5 - y) * 30; // 15deg đến -15deg (nghiêng lên/xuống)

    // Áp dụng transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

    // Cập nhật vị trí shine
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
  });

  card.addEventListener("mouseleave", () => {
    // Reset về trạng thái phẳng, có transition mượt
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    // Không cần reset --mouse-x/y vì shine đã ẩn
  });
});

/*  hieu ung doi mau header  */
const header = document.getElementById("header");
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  const heroHeight = hero.offsetHeight;

  if (window.scrollY > heroHeight) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
