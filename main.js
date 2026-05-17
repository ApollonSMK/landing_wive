// Scroll reveal animation
const revealElements = () => {
  const targets = document.querySelectorAll(
    '.step-card, .feature-card, .asset-card, .roadmap-item, .cta-inner'
  );

  targets.forEach((el) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
};

// Smooth nav background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 10, 15, 0.95)';
  } else {
    nav.style.background = 'rgba(10, 10, 15, 0.8)';
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', revealElements);

// Counter animation for stats
const animateValue = (el, end, duration = 1500) => {
  let start = 0;
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};
