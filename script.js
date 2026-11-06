/* ─── Scroll-triggered reveal for series ─── */
const seriesEls = document.querySelectorAll('.series');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
seriesEls.forEach((el) => observer.observe(el));

/* ─── Sticky nav glass effect ─── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── Subtle parallax on hero portrait ─── */
const portrait = document.querySelector('.hero-portrait-wrapper');
window.addEventListener('scroll', () => {
  if (!portrait) return;
  const scrolled = window.scrollY;
  const rate = scrolled * 0.08;
  portrait.style.transform = `translateY(${rate}px)`;
}, { passive: true });

/* ─── Image hover tilt effect ─── */
document.querySelectorAll('.series-img-wrap').forEach((wrap) => {
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    wrap.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) scale(1.01)`;
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
    wrap.style.transition = 'transform 0.5s ease';
  });

  wrap.addEventListener('mouseenter', () => {
    wrap.style.transition = 'transform 0.1s ease';
  });
});

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
