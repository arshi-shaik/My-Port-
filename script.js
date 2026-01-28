// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Scroll-triggered section titles
const titles = document.querySelectorAll('.section-title');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
titles.forEach((t) => observer.observe(t));

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.view-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.gallery-item').querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// Micro-interactions
document.querySelectorAll('.btn, .skill-card').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'translateY(-3px)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Dark / light mode toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀' : '☾';
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀' : '☾';
});
