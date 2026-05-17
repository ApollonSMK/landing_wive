// ===== Particle canvas =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,215,0,${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,215,0,${0.03 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== Scroll reveal =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = (e.target.dataset.aos || 0) * 120;
      setTimeout(() => e.target.classList.add('vis'), delay);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.step, .bento-card, .market-card, .tl-item').forEach(el => observer.observe(el));

// ===== Nav scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60 ? 'rgba(6,6,10,.95)' : 'rgba(6,6,10,.75)';
});

// ===== Live prices =====
async function fetchPrices() {
  try {
    const r = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","WLDUSDT"]');
    const data = await r.json();
    data.forEach(t => {
      const pct = parseFloat(t.priceChangePercent);
      const price = parseFloat(t.lastPrice);
      if (t.symbol === 'BTCUSDT') {
        document.getElementById('btcPrice').textContent = '$' + price.toLocaleString('en-US', {maximumFractionDigits: 0});
        updateChange(document.querySelector('.ticker-item:nth-child(1) .ticker-change'), pct);
      } else if (t.symbol === 'ETHUSDT') {
        document.getElementById('ethPrice').textContent = '$' + price.toLocaleString('en-US', {maximumFractionDigits: 0});
        updateChange(document.querySelector('.ticker-item:nth-child(3) .ticker-change'), pct);
      } else if (t.symbol === 'WLDUSDT') {
        document.getElementById('wldPrice').textContent = '$' + price.toFixed(2);
        updateChange(document.querySelector('.ticker-item:nth-child(5) .ticker-change'), pct);
      }
    });
  } catch (e) {}
}
function updateChange(el, pct) {
  if (!el) return;
  el.className = 'ticker-change ' + (pct >= 0 ? 'up' : 'down');
  el.textContent = (pct >= 0 ? '+' : '') + pct.toFixed(1) + '%';
}
fetchPrices();
setInterval(fetchPrices, 30000);
