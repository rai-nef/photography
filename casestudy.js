/* ═══════════════════════════════════════════
   CASE STUDY JS — Lightbox + Scroll Reveal
═══════════════════════════════════════════ */

/* ── Simple lightbox on image click ── */
document.querySelectorAll('.cs-img-wrap:not(.placeholder-wrap)').forEach((wrap) => {
  wrap.style.cursor = 'zoom-in';

  wrap.addEventListener('click', () => {
    const img = wrap.querySelector('img');
    if (!img) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.94);
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-out;
      animation: fadeIn 0.25s ease;
    `;

    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = `
      max-width: 92vw; max-height: 92vh;
      width: auto; height: auto;
      border-radius: 3px;
      box-shadow: 0 40px 80px rgba(0,0,0,0.6);
      animation: scaleIn 0.3s cubic-bezier(0.4,0,0.2,1);
    `;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position: absolute; top: 1.5rem; right: 2rem;
      background: none; border: none;
      color: rgba(255,255,255,0.5); font-size: 2.5rem;
      cursor: pointer; line-height: 1;
      transition: color 0.2s;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#fff');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'rgba(255,255,255,0.5)');

    overlay.appendChild(bigImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === closeBtn) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    }, { once: true });
  });
});

/* ── Scroll reveal for gallery items ── */
const galleryItems = document.querySelectorAll('.cs-img-wrap');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

galleryItems.forEach((item) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(24px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(item);
});

/* ── Inject animation keyframes ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
`;
document.head.appendChild(style);
