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
