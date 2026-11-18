/* Motion Garage — powered by anime.js v3 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Car data ---------- */
  const CARS = [
    {
      img: 'assets/cars/car-hero.jpg',
      tag: 'Studio',
      name: 'STAGE ONE',
      copy: 'Rook, rood licht en remklauwen die branden. De belichaming van Motion Garage: een zwarte sportauto die de camera alle nadruk geeft.',
      specs: [
        ['Vermogen', '640 HP'],
        ['Motor', 'V10'],
        ['0 – 100', '2.9 s'],
        ['Top', '325 km/h']
      ]
    },
    {
      img: 'assets/cars/hero-huracan.jpg',
      tag: 'Huracán',
      name: 'RAGING BULL',
      copy: 'Frontaal, in het rode licht: de Huracán staart je aan alsof de nacht een gezicht heeft. V10, aspiratie zonder turbo, karakter zonder volume.',
      specs: [
        ['Vermogen', '640 HP'],
        ['Motor', 'V10 5.2 L'],
        ['0 – 100', '2.9 s'],
        ['Top', '325 km/h']
      ]
    },
    {
      img: 'assets/cars/midnight-v10.jpg',
      tag: 'Huracán',
      name: 'MIDNIGHT V10',
      copy: 'Slechts zes cilinders, geen turbo\'s, geen excuses. De Huracán ademt onder blauw neonlicht en het natte asfalt reflecteert elke scherpe lijn — de nacht hoort bij haar.',
      specs: [
        ['Vermogen', '640 HP'],
        ['Motor', 'V10 5.2 L'],
        ['0 – 100', '2.9 s'],
        ['Top', '325 km/h']
      ]
    },
    {
      img: 'assets/cars/hyperleggera.jpg',
      tag: 'Vision GT',
      name: 'HYPERLEGGERA',
      copy: 'Vliegtuigprofiel, gekarteld door de wind. Gebouwd in het lab, gehard op de ring. Alles wat eraf kon, is eraf: koolstof, koeling en 1500 paardenkracht.',
      specs: [
        ['Vermogen', '1500 HP'],
        ['Motor', 'W16 quad-turbo'],
        ['0 – 100', '2.2 s'],
        ['Top', '420 km/h']
      ]
    },
    {
      img: 'assets/cars/ronin-gt.jpg',
      tag: 'Concept',
      name: 'RONIN GT',
      copy: 'Eén mes, één mist. De Ronin GT verschijnt pas als het te laat is: zwarte romp, rode schim, een richting die alleen vooruit kent.',
      specs: [
        ['Vermogen', '840 HP'],
        ['Motor', 'V8 biturbo'],
        ['0 – 100', '2.8 s'],
        ['Top', '330 km/h']
      ]
    },
    {
      img: 'assets/cars/model-x.jpg',
      tag: 'EV',
      name: 'MODEL X',
      copy: 'Drie elektromotoren, stilte als wapen. De toekomst is niet zacht — ze is direct: zwaartekracht in de rug bij elke tik op het pedaal.',
      specs: [
        ['Vermogen', '1050 HP'],
        ['Motor', 'Tri-motor EV'],
        ['0 – 100', '2.1 s'],
        ['Top', '350 km/h']
      ]
    },
    {
      img: 'assets/cars/rosso-icona.jpg',
      tag: 'Ferrari Enzo',
      name: 'ROSSO ICONA',
      copy: 'F1-technologie met kenteken. Carbon bak, asymmetrische pedalen, een V12 die schreeuwt als er geen morgen wordt. Icoon per definitie.',
      specs: [
        ['Vermogen', '660 HP'],
        ['Motor', 'V12 6.0 L'],
        ['0 – 100', '3.65 s'],
        ['Top', '350 km/h']
      ]
    }
  ];

  /* ---------- Helpers ---------- */
  function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      if (ch === ' ') {
        frag.appendChild(document.createTextNode('\u00A0\u00A0'));
      } else {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch;
        frag.appendChild(span);
      }
    }
    el.appendChild(frag);
    return el.querySelectorAll('.char');
  }

  function splitWords(el) {
    const text = el.textContent.trim();
    el.textContent = '';
    const frag = document.createDocumentFragment();
    text.split(/\s+/).forEach((word) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      frag.appendChild(span);
    });
    el.appendChild(frag);
    return el.querySelectorAll('.word');
  }

  /* ---------- Hero intro timeline (replayable) ---------- */
  function heroIntro() {
    const title = document.querySelector('.hero-title');
    title.innerHTML = '';
    const chars = splitChars(title);

    const tl = anime.timeline({ easing: 'easeOutExpo' });

    anime.remove(chars);
    anime.remove('.hero-eyebrow, .hero-sub, .hero-cta, .hero-tiny, .scroll-hint, .scroll-hint-line, .hero-media .media-img');
    document.querySelectorAll('.hero-title .char').forEach((c) => (c.style.opacity = 0));
    anime.set('.hero-eyebrow, .hero-sub, .hero-cta, .hero-tiny, .scroll-hint', { opacity: 0 });

    tl.add(
      {
        targets: '.hero-media .media-img',
        scale: [1.28, 1.06],
        duration: 3200,
        easing: 'easeOutCubic'
      },
      0
    )
      .add(
        {
          targets: '.hero-eyebrow',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800
        },
        300
      )
      .add(
        {
          targets: chars,
          opacity: [0, 1],
          translateY: [80, 0],
          rotateX: [-90, 0],
          duration: 1000,
          delay: anime.stagger(40)
        },
        500
      )
      .add(
        { targets: '.hero-sub', opacity: [0, 1], translateY: [24, 0], duration: 800 },
        1200
      )
      .add(
        { targets: '.hero-cta', opacity: [0, 1], translateY: [24, 0], duration: 800 },
        1500
      )
      .add(
        {
          targets: '.scroll-hint',
          opacity: [0, 1],
          duration: 700,
          complete: () => scrollHintPulse()
        },
        1900
      )
      .add(
        {
          targets: '.hero-tiny',
          opacity: [0, 1],
          duration: 600
        },
        1400
      );
  }

  function scrollHintPulse() {
    anime({
      targets: '.scroll-hint-line',
      scaleY: [1, 0.25],
      translateY: [0, 34],
      opacity: [1, 0.2],
      direction: 'alternate',
      loop: true,
      duration: 1100,
      easing: 'easeInOutSine'
    });
  }

  /* ---------- Hero dust ---------- */
  function heroDust() {
    if (reduceMotion) return;
    const wrap = document.querySelector('.hero-dust');
    for (let i = 0; i < 16; i++) {
      const d = document.createElement('div');
      d.className = 'dust';
      d.style.left = Math.random() * 100 + '%';
      d.style.top = Math.random() * 100 + '%';
      wrap.appendChild(d);
      anime({
        targets: d,
        translateY: anime.random(-140, 140),
        translateX: anime.random(-60, 60),
        opacity: [0, 0.5, 0],
        duration: anime.random(3200, 7000),
        delay: anime.random(0, 2500),
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }

  /* ---------- Signature grid (anime.js homepage style) ---------- */
  function signatureWall() {
    const wall = document.getElementById('signatureWall');
    if (!wall) return;
    if (reduceMotion) return;

    const cell = 76;
    const cols = Math.max(8, Math.round(window.innerWidth / cell));
    const rows = Math.max(6, Math.round((window.innerHeight * 1.0) / cell));
    const total = cols * rows;
    wall.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    wall.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';

    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'sig-cell';
      frag.appendChild(d);
    }
    wall.appendChild(frag);
    const tiles = wall.querySelectorAll('.sig-cell');

    let played = false;
    function playWall(fromIndex) {
      const from = fromIndex == null ? Math.floor(total / 2) - Math.floor(cols / 2) : fromIndex;
      anime.remove(tiles);
      anime({
        targets: tiles,
        scale: [
          { value: 0.1, easing: 'easeOutExpo', duration: 0 },
          { value: 1, easing: 'easeOutElastic', duration: 1300 },
          { value: 0.9, easing: 'easeOutQuart', duration: 400 },
          { value: 1, duration: 600 }
        ],
        opacity: [
          { value: 0.9, easing: 'easeOutExpo', duration: 50 },
          { value: 1, duration: 600 }
        ],
        backgroundColor: [
          { value: 'rgba(225,6,0,0.75)', duration: 240, delay: anime.stagger(30, { grid: [cols, rows], from }) },
          { value: 'rgba(255,255,255,0.045)', duration: 900, delay: anime.stagger(60, { grid: [cols, rows], from }) }
        ],
        delay: anime.stagger(60, { grid: [cols, rows], from })
      });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !played) {
          played = true;
          setTimeout(() => playWall(), 350);
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(document.getElementById('signature'));

    let lastWave = 0;
    document.getElementById('signature').addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastWave < 140) return;
      lastWave = now;
      const rect = wall.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const col = Math.floor((cx / rect.width) * cols);
      const row = Math.floor((cy / rect.height) * rows);
      if (col < 0 || col >= cols || row < 0 || row >= rows) return;
      const from = row * cols + col;
      anime.remove(tiles);
      anime({
        targets: tiles,
        scale: [
          { value: 0.72, duration: 50 },
          { value: 1, duration: 900, easing: 'easeOutElastic' }
        ],
        backgroundColor: [
          { value: 'rgba(225,6,0,0.7)', duration: 160, delay: anime.stagger(24, { grid: [cols, rows], from }) },
          { value: 'rgba(255,255,255,0.045)', duration: 700, delay: anime.stagger(50, { grid: [cols, rows], from }) }
        ],
        delay: anime.stagger(30, { grid: [cols, rows], from })
      });
    });

    document.getElementById('signature').addEventListener('click', () => {
      const from = anime.random(0, total - 1);
      playWall(from);
    });
  }

  /* ---------- Design rings ---------- */
  function designRings() {
    if (reduceMotion) return;
    anime({
      targets: '.design-ring',
      rotate: 360,
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 26000,
      loop: true
    });
    anime({
      targets: '.design-ring-2',
      rotate: -360,
      easing: 'linear',
      duration: 38000,
      loop: true
    });
  }

  /* ---------- Replay intro ---------- */
  function wireReplay() {
    const btn = document.getElementById('replayIntro');
    btn.addEventListener('click', () => {
      heroIntro();
      document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Collection ---------- */
  function buildCollection() {
    const grid = document.getElementById('collectionGrid');
    CARS.forEach((car, i) => {
      const card = document.createElement('article');
      card.className = 'car-card reveal';
      card.tabIndex = 0;
      card.dataset.index = i;
      card.innerHTML = `
        <div class="car-card-img"><img src="${car.img}" alt="${car.tag} — ${car.name}" loading="lazy" /></div>
        <div class="car-card-shade"></div>
        <div class="car-card-hint">Open &rarr;</div>
        <div class="car-card-line"></div>
        <div class="car-card-info">
          <div class="car-card-tag">${car.tag}</div>
          <div class="car-card-name">${car.name}</div>
        </div>`;
      card.addEventListener('click', () => openModal(i));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(i);
        }
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Modal ---------- */
  let modalOpen = false;
  let lastFocus = null;

  function openModal(index) {
    const car = CARS[index];
    const modal = document.getElementById('carModal');
    const img = document.getElementById('carModalImg');
    const info = document.querySelector('.car-modal-info');

    lastFocus = document.activeElement;
    document.getElementById('carModalTag').textContent = car.tag;
    document.getElementById('carModalName').textContent = car.name;
    document.getElementById('carModalCopy').textContent = car.copy;
    img.src = car.img;
    img.alt = car.tag + ' — ' + car.name;

    const specs = document.getElementById('carModalSpecs');
    specs.innerHTML = '';
    car.specs.forEach(([k, v]) => {
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      specs.appendChild(dt);
      specs.appendChild(dd);
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalOpen = true;

    if (!reduceMotion) {
      const children = [img, ...info.children.slice(0, info.children.length - 1)];
      children.forEach((c) => (c.style.opacity = 0));
      anime({
        targets: '.car-modal-backdrop',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuad'
      });
      anime({
        targets: img,
        opacity: [0, 1],
        scale: [1.14, 1],
        duration: 900,
        easing: 'easeOutExpo',
        delay: 100
      });
      anime({
        targets: info.children,
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 700,
        delay: anime.stagger(80, { start: 180 }),
        easing: 'easeOutCubic'
      });
    }

    modal.querySelector('.car-modal-close').focus();
  }

  function closeModal() {
    if (!modalOpen) return;
    const modal = document.getElementById('carModal');
    modalOpen = false;
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');

    if (reduceMotion) {
      modal.classList.remove('open');
    } else {
      anime({
        targets: '.car-modal-backdrop',
        opacity: [1, 0],
        duration: 320,
        easing: 'easeInQuad',
        complete: () => modal.classList.remove('open')
      });
      anime({
        targets: '.car-modal-panel',
        opacity: [1, 0],
        translateY: [0, 30],
        scale: [1, 0.985],
        duration: 320,
        easing: 'easeInQuad'
      });
    }
    if (lastFocus) lastFocus.focus();
  }

  function wireModal() {
    document.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---------- Scroll engine: parallax + zoom ---------- */
  function scrollEngine() {
    const progress = document.querySelector('.scroll-progress');
    const medias = Array.from(document.querySelectorAll('[data-scroll-media]'));
    const rings = Array.from(document.querySelectorAll('[data-parallax]'));
    const ease = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

    let targets = medias.map((el) => ({ el, img: el.querySelector('.media-img'), y: 0 }));
    let ringTargets = rings.map((el) => ({ el, y: 0 }));

    function frame() {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      progress.style.width = (window.scrollY / docH) * 100 + '%';

      targets.forEach((t) => {
        const rect = t.el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        const strength = parseFloat(t.el.dataset.parallaxStrength) || 0.3;
        const offset = (p - 0.5) * strength * rect.height;
        const zoom = 1.06 + 0.14 * Math.abs(p - 0.5) * 2;
        t.y += (offset - t.y) * 0.12;
        t.img.style.transform = `translateY(${t.y}px) scale(${reduceMotion ? 1 : zoom})`;
      });

      ringTargets.forEach((t) => {
        const speed = parseFloat(t.el.dataset.parallax) || 0.08;
        t.y += (window.scrollY * speed - t.y) * 0.09;
        if (t.el.classList.contains('cta-ring')) {
          t.el.style.transform = `translateY(${t.y}px) rotate(${window.scrollY * 0.04}deg)`;
        }
      });

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Observer reveals ---------- */
  function setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          observer.unobserve(el);

          if (el.matches('[data-split]')) {
            const chars = splitChars(el);
            anime({
              targets: chars,
              opacity: [0, 1],
              translateY: [54, 0],
              rotateX: [-80, 0],
              duration: 850,
              delay: anime.stagger(34),
              easing: 'easeOutExpo'
            });
            if (el.classList.contains('reveal')) el.classList.remove('reveal');
            return;
          }

          if (el.matches('[data-split-words]')) {
            anime({
              targets: el.querySelectorAll('.word'),
              opacity: [0, 1],
              translateY: [36, 0],
              filter: ['blur(7px)', 'blur(0px)'],
              duration: 650,
              delay: anime.stagger(55),
              easing: 'easeOutCubic'
            });
            return;
          }

          if (el.classList.contains('perf-stat')) {
            const counter = el.querySelector('.counter');
            const target = parseFloat(counter.dataset.target);
            const decimals = parseInt(counter.dataset.decimals || '0', 10);
            anime({
              targets: counter,
              innerHTML: [0, target],
              round: decimals === 0 ? 1 : Math.pow(10, decimals),
              duration: 1900,
              easing: 'easeOutExpo',
              update: (a) => {
                counter.innerHTML = Number(a.animations[0].currentValue).toFixed(decimals);
              }
            });
            anime({
              targets: el.querySelector('.perf-bar-fill'),
              width: [
                0,
                el.querySelector('.perf-bar-fill').dataset.value + '%'
              ],
              duration: 1600,
              delay: 200,
              easing: 'easeInOutQuart'
            });
          }

          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [38, 0],
            duration: 950,
            easing: 'easeOutCubic'
          });
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    /* titles that are only split, not revealed */
    document.querySelectorAll('[data-split]:not(.reveal)').forEach((el) => {
      if (!el.closest('.hero')) observer.observe(el);
    });
    document.querySelectorAll('[data-split-words]').forEach((el) => observer.observe(el));
  }

  /* ---------- Custom cursor ---------- */
  function cursor() {
    if (window.matchMedia('(hover: none)').matches || reduceMotion) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });
    const render = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(render);
    };
    render();

    document.querySelectorAll('a, .car-card, .btn').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        anime.remove(ring);
        anime({ targets: ring, scale: 1.7, borderColor: 'rgba(225,6,0,1)', duration: 240, easing: 'easeOutQuad' });
      });
      el.addEventListener('mouseleave', () => {
        anime.remove(ring);
        anime({ targets: ring, scale: 1, borderColor: 'rgba(225,6,0,0.5)', duration: 240, easing: 'easeOutQuad' });
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        anime.remove(el);
        anime({ targets: el, translateX: x * 0.24, translateY: y * 0.34, duration: 280, easing: 'easeOutQuad' });
      });
      el.addEventListener('mouseleave', () => {
        anime.remove(el);
        anime({ targets: el, translateX: 0, translateY: 0, duration: 520, easing: 'easeOutElastic(1, .55)' });
      });
    });
  }

  /* ---------- Init ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    buildCollection();
    heroIntro();
    heroDust();
    signatureWall();
    designRings();
    wireReplay();
    wireModal();
    setupObserver();
    scrollEngine();
    cursor();
    magnetic();
  });
})();
