// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function isDark() { return root.getAttribute('data-theme') !== 'light'; }

function updateLabel() {
  themeToggle.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
}
updateLabel();

themeToggle.addEventListener('click', () => {
  root.classList.add('theme-transitioning');
  if (isDark()) {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  }
  updateLabel();
  setTimeout(() => root.classList.remove('theme-transitioning'), 400);
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.nav-mobile');
toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.skill-category, .timeline-item, .project-card, .cert-card, .stat-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
