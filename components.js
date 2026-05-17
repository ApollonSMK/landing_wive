// Shared components for all pages

export function renderNav(activePage = '') {
  const links = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about.html', label: 'About', id: 'about' },
    { href: '/how-it-works.html', label: 'How it Works', id: 'how' },
    { href: '/markets.html', label: 'Markets', id: 'markets' },
    { href: '/roadmap.html', label: 'Roadmap', id: 'roadmap' },
  ];

  document.getElementById('nav').innerHTML = `
    <div class="container nav-inner">
      <a href="/" class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" fill="url(#gn)"/>
          <path d="M16 8l6 3.5v7L16 22l-6-3.5v-7L16 8z" fill="#fff" opacity=".9"/>
          <defs><linearGradient id="gn" x1="4" y1="2" x2="28" y2="30"><stop stop-color="#F59E0B"/><stop offset="1" stop-color="#D97706"/></linearGradient></defs>
        </svg>
        <span>WIVE</span>
      </a>
      <div class="nav-links">
        ${links.map(l => `<a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a>`).join('')}
      </div>
      <div class="nav-right">
        <a href="https://app.wive.pro" class="btn btn-primary btn-sm" target="_blank">Launch App</a>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      ${links.map(l => `<a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a>`).join('')}
      <a href="https://app.wive.pro" class="btn btn-primary" target="_blank">Launch App</a>
    </div>
  `;

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }
}

export function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <div class="container footer-inner">
      <div class="footer-brand">
        <a href="/" class="logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" fill="url(#gf)"/>
            <path d="M16 8l6 3.5v7L16 22l-6-3.5v-7L16 8z" fill="#fff" opacity=".9"/>
            <defs><linearGradient id="gf" x1="4" y1="2" x2="28" y2="30"><stop stop-color="#F59E0B"/><stop offset="1" stop-color="#D97706"/></linearGradient></defs>
          </svg>
          <span>WIVE</span>
        </a>
        <p>Decentralized Prediction Market<br/>Built on World Chain</p>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <h4>Product</h4>
          <a href="https://app.wive.pro" target="_blank">Launch App</a>
          <a href="/how-it-works.html">How it Works</a>
          <a href="/markets.html">Markets</a>
          <a href="/roadmap.html">Roadmap</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="https://worldscan.org/address/0x0bD43D8B3517Be6D2ed4E616898aec4DD769f50e" target="_blank">Smart Contract</a>
          <a href="https://github.com/ApollonSMK/WLDPrediction" target="_blank">GitHub</a>
        </div>
        <div class="footer-col">
          <h4>Community</h4>
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
          <a href="#">Telegram</a>
        </div>
      </div>
    </div>
    <div class="container footer-bar">
      <p>© 2026 WIVE. All rights reserved.</p>
    </div>
  `;
}

export function initPage(activePage) {
  renderNav(activePage);
  renderFooter();

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Scroll reveal
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = (e.target.dataset.i || 0) * 100;
        setTimeout(() => e.target.classList.add('vis'), d);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
