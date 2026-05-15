const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Trigger skill bar animations
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.classList.add("animated");
        });
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".skill-bars")
  .forEach((el) => barObserver.observe(el));
