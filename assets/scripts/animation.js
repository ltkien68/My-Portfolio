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
// ================= 1. KHỞI TẠO VÒNG TRÒN KỸ NĂNG (xoay bằng kéo chuột) =================
// Danh sách icon (font awesome) – bạn có thể thêm/sửa tại đây
const skillIcons = [
  "fab fa-html5",
  "fab fa-css3-alt",
  "fab fa-js",
  "fab fa-react",
  "fab fa-node-js",
  "fab fa-python",
  "fab fa-git-alt",
  "fas fa-c++",
];
const sphere = document.getElementById("skillSphere");
let currentAngle = 0; // góc quay hiện tại (radian)
let isDragging = false;
let startX = 0,
  startAngle = 0;

// Tạo các icon trên vòng tròn
function createIcons() {
  sphere.innerHTML = '<div class="sphere__orbit"></div>'; // giữ quỹ đạo
  const count = skillIcons.length;
  const radius = sphere.offsetWidth / 2; // bán kính vòng tròn
  skillIcons.forEach((iconClass, idx) => {
    const angle = (idx / count) * Math.PI * 2;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    const iconDiv = document.createElement("div");
    iconDiv.className = "sphere__icon";
    iconDiv.style.left = x - 28 + "px"; // 28 = nửa chiều rộng icon (56/2)
    iconDiv.style.top = y - 28 + "px";
    iconDiv.innerHTML = `<i class="${iconClass}"></i>`;
    // Thêm tooltip tên kỹ năng (tuỳ chọn)
    iconDiv.title = iconClass.split(" ")[1] || iconClass;
    sphere.appendChild(iconDiv);
  });
}

// Xoay toàn bộ các icon (cập nhật vị trí)
function rotateSphere(rad) {
  const icons = document.querySelectorAll(".sphere__icon");
  const count = icons.length;
  const radius = sphere.offsetWidth / 2;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + rad;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    icons[i].style.left = x - 28 + "px";
    icons[i].style.top = y - 28 + "px";
  }
}

// Sự kiện chuột để kéo xoay
function initDragRotation() {
  sphere.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startAngle = currentAngle;
    sphere.style.cursor = "grabbing";
    e.preventDefault();
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Mỗi 100px kéo ngang tương ứng 0.5 rad
    const deltaAngle = deltaX * 0.005;
    let newAngle = startAngle + deltaAngle;
    // Giới hạn không cần, cho phép xoay vô hạn
    currentAngle = newAngle;
    rotateSphere(currentAngle);
  });
  window.addEventListener("mouseup", () => {
    isDragging = false;
    sphere.style.cursor = "grab";
  });
  // Touch events cho mobile
  sphere.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startAngle = currentAngle;
    e.preventDefault();
  });
  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaAngle = deltaX * 0.005;
    currentAngle = startAngle + deltaAngle;
    rotateSphere(currentAngle);
  });
  window.addEventListener("touchend", () => {
    isDragging = false;
  });
}

// Khởi tạo vòng tròn
window.addEventListener("resize", () => {
  if (sphere) {
    createIcons();
    rotateSphere(currentAngle);
  }
});
if (sphere) {
  createIcons();
  rotateSphere(currentAngle);
  initDragRotation();
}

// ================= 2. TẠO CÁC CARD PROJECT (mẫu, bạn có thể sửa nội dung) =================
const projectsData = [
  {
    title: "Quản Lý Kho Vật Tư UNETI",
    desc: "Trang Web quản lý vật tư cho trường đại học",
    tools: ["React", "Tailwind", "Node.js", "MongoDB"],
    demoLink: "https://github.com/ltkien68/DOAN_N7",
  },
  {
    title: "Trang Web bán đồ thể thao VSport",
    desc: "Trang web bán đồ thể thao với giao diện hiện đại",
    tools: ["Java", "HTML/CSS", "JavaScript", "phpMyAdmin"],
    demoLink: "https://github.com/ltkien68/VSport",
  },
];
const projectsContainer = document.getElementById("projectsList");
if (projectsContainer) {
  projectsData.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "project-card";
    const toolsHTML = (proj.tools || [])
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");
    card.innerHTML = `
          <h3 class="project-card__title">${proj.title}</h3>
          <div class="project-card__desc body-sm">${proj.desc}</div>
          <div class="project-card__bottom">
      
          <div class="project-card__tools">
              ${toolsHTML}
          </div>

          <div class="project-card__demo">
              <a href="${proj.demoLink}" class="button-secondary" target="_blank">
              Demo 
              </a>
          </div>

          </div>
        `;
    projectsContainer.appendChild(card);
  });
}

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

// ================= 4. XỬ LÝ FORM LIÊN HỆ (demo, không gửi thực tế) =================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn! Tin nhắn đã được gửi (demo).");
    contactForm.reset();
  });
}
