(function () {
  const bg = document.getElementById('suitsBg');
  const suits = ['♠', '♥', '♣', '♦'];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('span');
    s.textContent = suits[Math.floor(Math.random() * 4)];
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = 20 + Math.random() * 50 + 'px';
    s.style.animationDuration = 18 + Math.random() * 25 + 's';
    s.style.animationDelay = -Math.random() * 30 + 's';
    bg.appendChild(s);
  }
})();

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

function animateCount(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.round(target / 40));
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = n;
  }, 25);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    setTimeout(() => {
      el.classList.add('visible');
      el.querySelectorAll('[data-count]').forEach(animateCount);
      if (el.classList.contains('tilt')) setTimeout(() => el.classList.add('ready'), 900);
    }, i * 180);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.classList.remove('leave');
      card.style.setProperty('--ry', (x * 14) + 'deg');
      card.style.setProperty('--rx', (-y * 14) + 'deg');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.add('leave');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

(function () {
  const el = document.getElementById('typing');
  const words = ['Pelajar / Mahasiswa', 'Pecinta Game', 'Calon Web Developer'];
  let w = 0, c = 0, deleting = false;

  function tick() {
    const word = words[w];
    el.textContent = word.slice(0, c);
    if (!deleting && c < word.length) { c++; setTimeout(tick, 90); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1400); }
    else if (c > 0) { c--; setTimeout(tick, 45); }
    else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
  }
  tick();
})();

const links = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -50% 0px' });

document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}, { passive: true });
