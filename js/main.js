/* Motion Garage — powered by anime.js v3 */
(function () {
  'use strict';

  /* Veiligheidsnet: als het anime.js CDN faalt, valt de site terug op een
     minimale stub zodat alles zichtbaar blijft en niets crasht. */
  if (!window.anime) {
    const stub = (o) => {
      const els = o && o.targets;
      const list = Array.isArray(els) ? els : els ? [els] : [];
      const last = (v) => (Array.isArray(v) ? v[v.length - 1] : v);
      list.forEach((t) => {
        if (!t || !t.style) return;
        if (o && o.opacity !== undefined) t.style.opacity = String(last(o.opacity));
        if (o && (o.translateY !== undefined || o.translateX !== undefined)) t.style.transform = 'none';
      });
      return { finished: Promise.resolve() };
    };
    stub.stagger = () => 0;
    stub.set = () => {};
    stub.remove = () => {};
    stub.timeline = () => {
      const t = (o) => ({ add: () => t(o), finished: Promise.resolve() });
      return t({});
    };
    stub.random = (a, b) => b;
    window.anime = stub;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Car data ---------- */
  const CARS = [
    {
      img: 'assets/cars/card-rosso.jpg',
      tag: 'Concept',
      name: 'ROSSO APEX',
      copy: 'Rood op matzwart. In een garage waar het licht alleen voor haar werkt, staat de belichaming van Motion Garage: stil, maar tijdens het nadenken gevaarlijk.',
      specs: [
        ['Vermogen', '640 HP'],
        ['Motor', 'V10'],
        ['0 – 100', '2.9 s'],
        ['Top', '325 km/h']
      ]
    },
    {
      img: 'assets/cars/card-phantom.jpg',
      tag: 'Nacht',
      name: 'PHANTOM',
      copy: 'Zwart op een lege stad. Waar de laatste lantaarn uitgaat, gaat zij aan — iedereen hoort haar, niemand ziet haar wegrijden.',
      specs: [
        ['Vermogen', '650 HP'],
        ['Motor', 'B6 biturbo'],
        ['0 – 100', '2.7 s'],
        ['Top', '330 km/h']
      ]
    },
    {
      img: 'assets/cars/card-nighthawk.jpg',
      tag: 'Detail',
      name: 'NIGHTHAWK',
      copy: 'Grille als gepantserd front, koplampen als bliksemafleiders. De nacht legt haar ontwerp bloot — symmetrie is voor doe-het-zelvers.',
      specs: [
        ['Vermogen', '510 HP'],
        ['Motor', 'R6 biturbo'],
        ['0 – 100', '3.5 s'],
        ['Top', '290 km/h']
      ]
    },
    {
      img: 'assets/cars/card-heritage.jpg',
      tag: 'Heritage',
      name: 'SILVER LINE',
      copy: 'Staal uit een rauwer tijdperk, gewassen in nachtelijk licht. Snelheid was hier nog een belofte in plaats van een spreadsheet.',
      specs: [
        ['Vermogen', '300 HP'],
        ['Motor', 'F12 flat-12'],
        ['0 – 100', '4.4 s'],
        ['Top', '286 km/h']
      ]
    },
    {
      img: 'assets/cars/card-arctic.jpg',
      tag: 'Grand Tour',
      name: 'ARCTIC GHOST',
      copy: 'Wit op de nachtstad: koplampen als flitsen, stilte als jachtveld, comfort en brutaliteit in één spiegelglans.',
      specs: [
        ['Vermogen', '830 HP'],
        ['Motor', 'V12 heritage'],
        ['0 – 100', '2.5 s'],
        ['Top', '340 km/h']
      ]
    },
    {
      img: 'assets/cars/card-horizon.jpg',
      tag: 'Studio',
      name: 'ROSSO NOTTE',
      copy: 'Karmozijn in een donkere zaal, één spot op het front. Vorm kiest hier bewust voor silhouet boven compromis.',
      specs: [
        ['Vermogen', '660 HP'],
        ['Motor', 'V8 biturbo'],
        ['0 – 100', '2.9 s'],
        ['Top', '330 km/h']
      ]
    },
  ];

  /* ---------- Text helpers ---------- */
  function splitChars(el) {
    if (el.dataset.splitDone) return Array.from(el.querySelectorAll('.char'));
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
    el.dataset.splitDone = 'true';
    return Array.from(el.querySelectorAll('.char'));
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
    return Array.from(el.querySelectorAll('.word'));
  }

  /* ---------- Hero slices (cinematic assembly) ---------- */
  const SLICES = 14;

  function buildHeroSlices() {
    const wrap = document.querySelector('.hero-slices');
    if (!wrap || wrap.children.length) return;
    const img = 'assets/cars/hero-nocturne.jpg';
    for (let i = 0; i < SLICES; i++) {
      const s = document.createElement('div');
      s.className = 'slice';
      s.style.backgroundImage = `url(${img})`;
      s.style.backgroundPosition = `${(i / (SLICES - 1)) * 100}% center`;
      wrap.appendChild(s);
    }
  }

  function playSlices() {
    if (reduceMotion) return;
    const strips = document.querySelectorAll('.hero-slices .slice');
    anime.remove(strips);
    strips.forEach((s) => {
      s.style.opacity = 0;
      const dir = Math.random() > 0.5 ? 1 : -1;
      s.style.transform = `translateY(${dir * 60}%) scale(1.25) rotate(${dir * 4}deg)`;
    });
    anime({
      targets: strips,
      opacity: [0, 1],
      translateY: 0,
      rotate: 0,
      scale: [
        { value: 1.1, easing: 'easeOutQuart', duration: 800 },
        { value: 1, easing: 'easeOutSine', duration: 900 }
      ],
      duration: 1500,
      delay: anime.stagger(70, { from: 'center' }),
      easing: 'easeOutExpo'
    });
  }

  /* ---------- Preloader ---------- */
  function runPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) {
      heroIntro();
      return;
    }
    if (reduceMotion || !window.anime) {
      pre.remove();
      heroIntro();
      return;
    }
    let started = false;
    const finish = () => {
      if (started) return;
      started = true;
      pre.remove();
      heroIntro();
    };
    setTimeout(finish, 2800);
    const chars = splitChars(pre.querySelector('h1'));
    if (chars.length) chars[chars.length - 1].classList.add('char-outline');
    anime.set(chars, { opacity: 0, translateY: 46 });
    anime({
      targets: chars,
      opacity: 1,
      translateY: 0,
      duration: 520,
      delay: anime.stagger(38),
      easing: 'easeOutCubic'
    });
    anime({
      targets: '.preloader-fill',
      width: ['0%', '100%'],
      duration: 1050,
      delay: 150,
      easing: 'easeInOutQuart'
    });
    anime({
      targets: '.preloader-note',
      opacity: [0, 1],
      duration: 500,
      delay: 350,
      easing: 'easeOutQuad'
    });
    anime({
      targets: pre,
      opacity: [1, 0],
      delay: 1450,
      duration: 460,
      easing: 'easeInOutQuad',
      complete: finish
    });
  }

  /* ---------- Hero intro timeline (replayable) ---------- */
  function heroIntro() {
    const chars = splitChars(document.querySelector('.hero-title'));
    if (chars.length >= 10) chars.slice(6).forEach((c) => c.classList.add('char-outline'));

    anime.remove(chars);
    anime.remove('.hero-eyebrow, .hero-sub, .hero-cta, .hero-tiny, .scroll-hint, .scroll-hint-line, .hero-slices');
    anime.set(chars, { opacity: 0, translateY: 90, rotateX: -95 });
    anime.set('.hero-eyebrow, .hero-sub, .hero-cta, .hero-tiny, .scroll-hint', { opacity: 0 });

    playSlices();

    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add(
      { targets: '.hero-eyebrow', opacity: [0, 1], translateY: [20, 0], duration: 800 },
      300
    )
      .add(
        {
          targets: chars,
          opacity: [0, 1],
          translateY: [90, 0],
          rotateX: [-95, 0],
          duration: 1000,
          delay: anime.stagger(42, { from: 'center' })
        },
        500
      )
      .add(
        { targets: '.hero-sub', opacity: [0, 1], translateY: [24, 0], duration: 800 },
        1250
      )
      .add(
        { targets: '.hero-tiny', opacity: [0, 1], duration: 650 },
        1450
      )
      .add(
        { targets: '.hero-cta', opacity: [0, 1], translateY: [24, 0], duration: 800 },
        1600
      )
      .add(
        {
          targets: '.scroll-hint',
          opacity: [0, 1],
          duration: 700,
          complete: scrollHintPulse
        },
        1950
      );
  }

  function scrollHintPulse() {
    anime.remove('.scroll-hint-line');
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

  /* ---------- Signature wall (anime.js homepage DNA) ---------- */
  const GLYPHS = {
    M: ['10001','11011','10101','10001','10001','10001','10001'],
    O: ['01110','10001','10001','10001','10001','10001','01110'],
    T: ['11111','00100','00100','00100','00100','00100','00100'],
    I: ['11111','00100','00100','00100','00100','00100','11111'],
    N: ['10001','11001','10101','10011','10001','10001','10001'],
    G: ['01110','10001','10000','10111','10001','10001','01111'],
    A: ['01110','10001','10001','11111','10001','10001','10001'],
    R: ['11110','10001','10001','11110','10100','10010','10001'],
    E: ['11111','10000','10000','11110','10000','10000','11111']
  };
  const WALL_WORD = 'MOTIONGARAGE';

  function signatureWall() {
    const wall = document.getElementById('signatureWall');
    const section = document.getElementById('signature');
    if (!wall || !section || reduceMotion) return;

    const cell = 74;
    const cols = Math.max(8, Math.round(window.innerWidth / cell));
    const rows = Math.max(6, Math.round(window.innerHeight / cell));
    const total = cols * rows;
    wall.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    wall.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const frag = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'sig-cell';
      frag.appendChild(d);
    }
    wall.appendChild(frag);

    const cells = Array.from(wall.children);
    const energy = new Float32Array(total);
    const BASE = 'rgba(255,255,255,0.045)';

    const sources = [
      { x: cols * 0.25, y: rows * 0.3, vx: 0.35, vy: 0.22, phase: 0 },
      { x: cols * 0.7, y: rows * 0.65, vx: -0.28, vy: 0.31, phase: 140 }
    ];
    let pointer = { c: -10, r: -10, strength: 0 };
    let burst = null;
    let started = false;
    let lastTime = performance.now();
    let letterIndex = 0;
    let visible = false;

    function flashGlyph() {
      const ch = WALL_WORD[letterIndex % WALL_WORD.length];
      letterIndex++;
      const glyph = GLYPHS[ch];
      if (!glyph) return;
      const gw = 5, gh = glyph.length;
      const offC = Math.floor(cols / 2) - Math.floor(gw / 2);
      const offR = Math.floor(rows / 2) - Math.floor(gh / 2);
      for (let r = 0; r < gh; r++) {
        for (let c = 0; c < gw; c++) {
          if (glyph[r][c] !== '1') continue;
          const idx = (offR + r) * cols + (offC + c);
          if (idx < 0 || idx >= total) continue;
          setTimeout(() => {
            energy[idx] = Math.max(energy[idx], 1.55);
          }, (r * gw + c) * 16);
        }
      }
    }

    function step(now) {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      if (visible) {
        sources.forEach((s) => {
          s.phase += dt * 0.00007;
          s.x += (s.vx * dt) / 1000;
          s.y += (s.vy * dt) / 1000;
          if (s.x < 1 || s.x > cols - 1) s.vx *= -1;
          if (s.y < 1 || s.y > rows - 1) s.vy *= -1;
          s.x = Math.min(cols - 1, Math.max(1, s.x));
          s.y = Math.min(rows - 1, Math.max(1, s.y));
        });

        if (burst && now - burst.t > 1600) burst = null;
        if (wordActive() && now - lastLetterAt > 2600) { lastLetterAt = now; flashGlyph(); }
        if (!wordActive()) lastLetterAt = now;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            let e = energy[idx] * 0.94;
            let boost = 0;

            for (const s of sources) {
              const dx = c - s.x;
              const dy = r - s.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ring = (now * 0.008 + s.phase) % 22;
              const g = Math.exp(-Math.pow(dist - ring, 2) / 4.5);
              boost += g * 0.9;
            }

            if (pointer.strength > 0.01) {
              const dx = c - pointer.c;
              const dy = r - pointer.r;
              const dist = dx * dx + dy * dy;
              if (dist < 30) boost += Math.exp(-dist / 7) * pointer.strength * 1.3;
            }

            if (burst) {
              const dx = c - burst.c;
              const dy = r - burst.r;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ring = (now - burst.t) * 0.02;
              boost += Math.exp(-Math.pow(dist - ring, 2) / 3.2) * Math.max(0, 1.4 - (now - burst.t) / 1100);
            }

            energy[idx] = Math.min(1.7, e + boost * 0.06);
          }
        }
        pointer.strength *= 0.93;

        for (let i = 0; i < total; i++) {
          const e = energy[i];
          const el = cells[i];
          if (e > 0.03) {
            const a = Math.min(0.92, e * 0.6);
            el.style.backgroundColor = `rgba(225,6,0,${a.toFixed(3)})`;
            el.style.transform = `scale(${(1 + Math.min(0.5, e * 0.34)).toFixed(3)}) rotateX(${(-Math.min(1, e) * 42).toFixed(1)}deg)`;
          } else if (el.style.backgroundColor !== 'rgba(255, 255, 255, 0.045)') {
            el.style.backgroundColor = BASE;
            el.style.transform = 'scale(1) rotateX(0deg)';
          }
        }
      }

      requestAnimationFrame(step);
    }

    let wordActive = () => false;
    let lastLetterAt = 0;

    function startEngine() {
      if (started) return;
      started = true;
      visible = true;
      setTimeout(() => { wordActive = () => true; }, 1400);
      requestAnimationFrame((t) => { lastTime = t; step(t); });
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible) startEngine();
      });
    }, { threshold: 0.15 });
    io.observe(section);

    section.addEventListener('mousemove', (e) => {
      const rect = wall.getBoundingClientRect();
      pointer.c = ((e.clientX - rect.left) / rect.width) * cols;
      pointer.r = ((e.clientY - rect.top) / rect.height) * rows;
      pointer.strength = 1;
    });

    section.addEventListener('click', (e) => {
      const rect = wall.getBoundingClientRect();
      burst = {
        c: ((e.clientX - rect.left) / rect.width) * cols,
        r: ((e.clientY - rect.top) / rect.height) * rows,
        t: performance.now()
      };
      for (let i = 0; i < total; i++) energy[i] = Math.max(energy[i], 0.05);
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
      card.addEventListener('mousemove', (e) => {
        if (reduceMotion) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        anime.remove(card);
        card.style.transformOrigin = 'center';
        anime({
          targets: card,
          rotateY: px * 8,
          rotateX: -py * 8,
          scale: 1.025,
          duration: 320,
          easing: 'easeOutQuad'
        });
      });
      card.addEventListener('mouseleave', () => {
        anime.remove(card);
        anime({
          targets: card,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          duration: 650,
          easing: 'easeOutElastic(1, .55)'
        });
      });
      grid.appendChild(card);
      observer.observe(card);
    });
  }

  /* ---------- Modal ---------- */
  let modalOpen = false;
  let lastFocus = null;

  function openModal(index) {
    if (modalOpen) return;
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
      Array.from(info.children).forEach((c) => (c.style.opacity = 0));
      anime.set('.car-modal-panel', { opacity: 1, translateY: 0, scale: 1, rotateY: -12 });
      anime({
        targets: '.car-modal-panel',
        rotateY: 0,
        duration: 750,
        easing: 'easeOutCubic'
      });
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
        rotateY: [0, 8],
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

  /* ---------- Performance: counters + bars + gauge ---------- */
  let perfPlayed = false;

  function sweepGauge(pct) {
    const fill = document.querySelector('[data-gauge-fill]');
    const num = document.querySelector('[data-gauge-num]');
    if (!fill) return;
    anime.remove(fill);
    if (reduceMotion) {
      fill.style.strokeDashoffset = 1 - pct;
      if (num) num.textContent = Math.round(pct * 100) + '%';
      return;
    }
    fill.style.strokeDashoffset = 1;
    anime({
      targets: fill,
      strokeDashoffset: [1, 1 - pct],
      duration: 1700,
      easing: 'easeInOutQuart'
    });
    if (num) {
      anime.remove(num);
      anime({
        targets: num,
        innerHTML: [0, Math.round(pct * 100)],
        round: 1,
        duration: 1700,
        easing: 'easeInOutQuart',
        update: (a) => {
          num.textContent = Math.round(a.animations[0].currentValue) + '%';
        }
      });
    }
  }

  function runPerformance() {
    if (perfPlayed) return;
    perfPlayed = true;
    sweepGauge(0.94);
    if (!reduceMotion) {
      anime.set('.perf-value', { rotateX: -70, opacity: 0 });
      anime({
        targets: '.perf-value',
        rotateX: [-70, 0],
        opacity: [0, 1],
        duration: 900,
        delay: anime.stagger(110, { start: 150 }),
        easing: 'easeOutExpo'
      });
    }
    document.querySelectorAll('.perf-stat').forEach((el) => {
      const counter = el.querySelector('.counter');
      const target = parseFloat(counter.dataset.target);
      const decimals = parseInt(counter.dataset.decimals || '0', 10);
      const fill = el.querySelector('.perf-bar-fill');
      anime.remove(counter);
      anime.remove(fill);
      animateCounter(counter, target, decimals);
      anime({
        targets: fill,
        width: [0, fill.dataset.value + '%'],
        duration: 1600,
        delay: 200,
        easing: 'easeInOutQuart'
      });
    });
  }

  function animateCounter(counter, target, decimals) {
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
  }

  /* ---------- Ignition: F1 start lights ---------- */
  function wireIgnite() {
    const btn = document.getElementById('igniteBtn');
    const lights = Array.from(document.querySelectorAll('#startLights .light'));
    if (!btn || lights.length === 0) return;
    let running = false;

    btn.addEventListener('click', () => {
      if (running) return;
      running = true;
      lights.forEach((l) => l.classList.remove('on'));

      lights.forEach((light, i) => {
        setTimeout(() => {
          light.classList.add('on');
          anime.remove(light);
          anime({
            targets: light,
            scale: [1.45, 1],
            duration: 380,
            easing: 'easeOutBack(1.4)'
          });
        }, 380 * i);
      });

      setTimeout(() => {
        const flash = document.createElement('div');
        flash.style.cssText =
          'position:fixed;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(225,6,0,0.32),transparent 70%);z-index:998;pointer-events:none';
        document.body.appendChild(flash);
        anime({
          targets: flash,
          opacity: [1, 0],
          duration: 620,
          easing: 'easeOutQuart',
          complete: () => flash.remove()
        });

        lights.forEach((l) => l.classList.remove('on'));
        document.getElementById('performance')?.classList.add('perf-boost');
        revEngine();
        setTimeout(() => document.getElementById('performance')?.classList.remove('perf-boost'), 2600);
        sweepGauge(0.99);
        document.querySelectorAll('.counter').forEach((c) => {
          const target = parseFloat(c.dataset.target);
          const decimals = parseInt(c.dataset.decimals || '0', 10);
          anime.remove(c);
          animateCounter(c, target, decimals);
        });
        document.querySelectorAll('.perf-bar-fill').forEach((f) => {
          anime.remove(f);
          anime({
            targets: f,
            width: [0, f.dataset.value + '%'],
            duration: 1700,
            easing: 'easeInOutQuart'
          });
        });
        anime({
          targets: '.perf-grid',
          translateY: [14, 0],
          duration: 420,
          easing: 'easeOutCubic'
        });
        running = false;
      }, 380 * lights.length + 700);
    });
  }

  /* ---------- Motion design rings ---------- */
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

  /* ---------- Scroll engine: parallax + zoom + scrub words ---------- */
  function scrollEngine() {
    const progress = document.querySelector('.scroll-progress');
    const medias = Array.from(document.querySelectorAll('[data-scroll-media]'));
    const rings = Array.from(document.querySelectorAll('[data-parallax]'));
    const scrubWords = Array.from(document.querySelectorAll('[data-scrub-word]'));

    const dollyTargets = reduceMotion ? [] : Array.from(document.querySelectorAll('[data-dolly-section]')).map((sec) => ({
      sec,
      track: sec.querySelector('[data-dolly-track]'),
      img: sec.querySelector('.dolly-img'),
      bar: sec.querySelector('[data-dolly-bar]'),
      label: sec.querySelector('.dolly-label'),
      headline: sec.querySelector('[data-dolly-headline]'),
      veil: sec.querySelector('.dolly-veil'),
      streaks: sec.querySelector('.dolly-streaks'),
      measured: false,
      dispW: 0,
      p: 0,
      skew: 0,
      roll: 0,
      lastRaw: null,
      callouts: Array.from(sec.querySelectorAll('.dolly-callout')).map((el) => ({
        el,
        at: parseFloat(el.dataset.dollyAt) || 0.5,
        d: 0
      }))
    }));

    const tiltEls = reduceMotion ? [] : Array.from(document.querySelectorAll('.showcase-media')).map((el) => ({ el }));

    const mediaTargets = medias.map((el) => ({
      el,
      img: el.querySelector('[data-media-transform]') || el.querySelector('.media-img'),
      y: 0
    }));
    const ringTargets = rings.map((el) => ({ el, y: 0 }));
    window.addEventListener('resize', () => dollyTargets.forEach((t) => { t.measured = false; }));

    const hudDots = Array.from(document.querySelectorAll('.hud-dot[data-target]')).map((btn) => ({
      btn,
      sec: document.getElementById(btn.dataset.target),
      active: false
    }));
    const navLinks = Array.from(document.querySelectorAll('.nav-link')).map((a) => ({
      a,
      sec: document.querySelector(a.getAttribute('href') || ''),
      active: false
    }));
    const nav = document.querySelector('.nav');

    function frame() {
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      if (progress) progress.style.width = (window.scrollY / docH) * 100 + '%';

      mediaTargets.forEach((t) => {
        if (!t.img) return;
        const rect = t.el.getBoundingClientRect();
        if (rect.bottom < -150 || rect.top > vh + 150) return;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        const strength = parseFloat(t.el.dataset.parallaxStrength) || 0.3;
        const offset = (p - 0.5) * strength * rect.height;
        const zoom = 1.06 + 0.14 * Math.abs(p - 0.5) * 2;
        t.y += (offset - t.y) * 0.12;
        t.img.style.transform = reduceMotion ? '' : `translateY(${t.y.toFixed(2)}px) scale(${zoom.toFixed(4)})`;
      });

      tiltEls.forEach((t) => {
        const rect = t.el.getBoundingClientRect();
        if (rect.bottom < -150 || rect.top > vh + 150) return;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        t.el.style.transform = `perspective(1200px) rotateX(${((0.5 - p) * 7).toFixed(2)}deg)`;
      });

      ringTargets.forEach((t) => {
        const speed = parseFloat(t.el.dataset.parallax) || 0.08;
        t.y += (window.scrollY * speed - t.y) * 0.09;
        if (t.el.classList.contains('cta-ring')) {
          t.el.style.transform = `translateY(${t.y.toFixed(2)}px) rotate(${window.scrollY * 0.04}deg)`;
        }
      });

      scrubWords.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const p = (vh - rect.top) / (vh + rect.height);
        const speed = parseFloat(el.dataset.scrubSpeed) || 0.2;
        el.style.transform = `perspective(1000px) rotateY(${((p - 0.5) * speed * 55).toFixed(2)}deg) translate(calc(-50% + ${((p - 0.5) * speed * 1200).toFixed(1)}px), -50%)`;
      });

      dollyTargets.forEach((t) => {
        if (!t.track || !t.img) return;
        const vw = window.innerWidth;
        if (!t.measured && t.img.complete && t.img.naturalWidth) {
          const aspect = t.img.naturalWidth / t.img.naturalHeight;
          const h = Math.max(vh, (vw * 1.6) / aspect);
          t.img.style.height = h.toFixed(0) + 'px';
          t.dispW = h * aspect;
          t.measured = true;
        }
        const rect = t.sec.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;
        const raw = Math.min(1, Math.max(0, (vh - rect.top) / Math.max(1, rect.height - vh)));
        t.p += (raw - t.p) * 0.18;
        if (Math.abs(t.p - raw) < 0.0005) t.p = raw;
        const p = t.p;

        const vel = t.lastRaw === null ? 0 : raw - t.lastRaw;
        t.lastRaw = raw;
        const skewTarget = Math.max(-5, Math.min(5, vel * 220));
        t.skew += (skewTarget - t.skew) * 0.12;
        t.roll += ((0.5 - raw) * 1.4 - t.roll) * 0.08;

        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const pan = Math.max(0, t.dispW - vw);
        t.track.style.transform = `translateX(${(-pan * ease).toFixed(2)}px) skewX(${t.skew.toFixed(3)}deg) rotateZ(${t.roll.toFixed(3)}deg)`;
        t.img.style.transform = `translateY(-50%) rotateY(${((0.5 - p) * 5).toFixed(2)}deg) scale(${(1.16 - 0.14 * p).toFixed(4)})`;

        if (t.label) t.label.style.opacity = Math.max(0, 1 - (p - 0.1) / 0.1).toFixed(3);
        if (t.headline) t.headline.style.opacity = Math.min(1, Math.max(0, (p - 0.85) / 0.1)).toFixed(3);
        if (t.veil) t.veil.style.opacity = (0.5 + 0.5 * Math.abs(p - 0.5) * 2).toFixed(3);
        if (t.streaks) t.streaks.style.opacity = (Math.min(1, Math.abs(t.skew) / 3.2) * 0.85).toFixed(3);

        t.callouts.forEach((c) => {
          const target = Math.min(1, Math.max(0, 1 - Math.abs(p - c.at) / 0.1));
          c.d += (target - c.d) * 0.16;
          c.el.style.opacity = c.d.toFixed(3);
          c.el.style.transform = `translateY(${((1 - c.d) * 30).toFixed(1)}px)`;
        });
        if (t.bar) t.bar.style.width = (p * 100).toFixed(2) + '%';
      });

      hudDots.forEach((d) => {
        if (!d.sec) return;
        const r = d.sec.getBoundingClientRect();
        const now = r.top <= vh * 0.5 && r.bottom > vh * 0.5;
        if (now !== d.active) {
          d.active = now;
          d.btn.classList.toggle('active', now);
        }
      });
      navLinks.forEach((l) => {
        if (!l.sec) return;
        const r = l.sec.getBoundingClientRect();
        const now = r.top <= vh * 0.5 && r.bottom > vh * 0.5;
        if (now !== l.active) {
          l.active = now;
          l.a.classList.toggle('active', now);
        }
      });
      if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 46);

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Observer reveals ---------- */
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
          runPerformance();
          return;
        }

        if (el.classList.contains('gauge-row')) {
          runPerformance();
          anime({
            targets: el.querySelector('.gauge'),
            rotateX: [-55, 0],
            opacity: [0, 1],
            duration: 1100,
            easing: 'easeOutExpo'
          });
          anime({
            targets: el.querySelector('.gauge-center'),
            opacity: [0, 1],
            translateY: [18, 0],
            delay: 250,
            duration: 700,
            easing: 'easeOutCubic'
          });
          return;
        }

        if (el.classList.contains('car-card')) {
          anime({
            targets: el,
            opacity: [0, 1],
            rotateY: [-32, 0],
            translateY: [44, 0],
            duration: 900,
            easing: 'easeOutExpo'
          });
          return;
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

  function setupObserver() {
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('[data-split]:not(.reveal)').forEach((el) => {
      if (el.closest('.hero')) return;
      observer.observe(el);
    });
    document.querySelectorAll('[data-split].reveal').forEach((el) => {
      observer.observe(el);
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

    document.querySelectorAll('a, .car-card, .btn, .nav-replay').forEach((el) => {
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

  /* ---------- Replay intro ---------- */
  function wireReplay() {
    const btn = document.getElementById('replayIntro');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      heroIntro();
    });
  }

  /* ---------- Hero 3D depth camera ---------- */
  function heroDepth() {
    if (reduceMotion) return;
    const hero = document.getElementById('hero');
    const content = document.querySelector('.hero-content');
    const media = document.querySelector('.hero-media');
    if (!hero || !content) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, running = true;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      if (!r.width || !r.height) return;
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    hero.addEventListener('pointerleave', () => {
      tx = 0;
      ty = 0;
    });
    (function loop() {
      if (!running) return;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (Math.abs(cx) > 0.002 || Math.abs(cy) > 0.002) {
        content.style.transform = `rotateY(${(cx * 3).toFixed(3)}deg) rotateX(${(-cy * 2.2).toFixed(3)}deg)`;
        if (media) media.style.transform = `translate(${(cx * -16).toFixed(1)}px, ${(cy * -10).toFixed(1)}px)`;
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Section HUD ---------- */
  function buildHud() {
    const hud = document.getElementById('hud');
    if (!hud || hud.children.length) return;
    const sections = [
      ['hero', 'Hero'],
      ['signature', 'Signature'],
      ['concept', 'Concept'],
      ['experience', 'Experience'],
      ['performance', 'Performance'],
      ['dolly', 'De reis'],
      ['collection', 'Collectie'],
      ['design', 'Design'],
      ['game', 'Garage Dash'],
      ['contact', 'Contact']
    ];
    sections.forEach(([id, label]) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hud-dot';
      btn.setAttribute('aria-label', label);
      btn.innerHTML = `<span class="hud-label">${label}</span>`;
      btn.addEventListener('click', () => {
        window.scrollTo({ top: sec.offsetTop, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
      btn.dataset.target = id;
      hud.appendChild(btn);
    });
  }

  /* ---------- Interactieve titelletters ---------- */
  function titlePop() {
    if (reduceMotion) return;
    document.querySelectorAll('.section-title, .showcase-title').forEach((title) => {
      title.addEventListener('mouseover', (e) => {
        const c = e.target.closest('.char');
        if (!c) return;
        anime.remove(c);
        anime({
          targets: c,
          translateY: -10,
          scale: 1.2,
          color: '#e10600',
          duration: 240,
          easing: 'easeOutCubic'
        });
      });
      title.addEventListener('mouseout', (e) => {
        const c = e.target.closest('.char');
        if (!c) return;
        anime.remove(c);
        anime({
          targets: c,
          translateY: 0,
          scale: 1,
          color: '#f5f5f5',
          duration: 320,
          easing: 'easeOutQuad'
        });
      });
    });
  }

  /* ---------- Hero lettergolf ---------- */
  function heroWave() {
    if (reduceMotion) return;
    const title = document.querySelector('.hero-title');
    if (!title) return;
    let playing = false;
    title.addEventListener('mouseenter', () => {
      if (playing) return;
      const chars = splitChars(title);
      playing = true;
      anime({
        targets: chars,
        translateY: [
          { value: -16, duration: 200 },
          { value: 0, duration: 420 }
        ],
        delay: anime.stagger(26),
        easing: 'easeInOutSine',
        complete: () => {
          playing = false;
        }
      });
    });
  }

  /* ---------- Cinema pointer-tilt ---------- */
  function cinemaTilt() {
    if (reduceMotion) return;
    const cinema = document.querySelector('.cinema');
    const quote = document.querySelector('.cinema-quote');
    if (!cinema || !quote) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let tx = 0;
    let cx = 0;
    cinema.addEventListener('pointermove', (e) => {
      const r = cinema.getBoundingClientRect();
      if (!r.width) return;
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    });
    cinema.addEventListener('pointerleave', () => {
      tx = 0;
    });
    (function loop() {
      cx += (tx - cx) * 0.07;
      if (Math.abs(cx) > 0.002) {
        quote.style.transform = `rotateY(${(cx * 4).toFixed(3)}deg)`;
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- 3D rotunda carousel ---------- */
  function buildRotunda() {
    const ring = document.querySelector('[data-rotunda-ring]');
    const host = document.querySelector('[data-rotunda]');
    if (!ring || !host) return;
    if (ring.children.length) return;

    CARS.slice(0, 6).forEach((car) => {
      const card = document.createElement('div');
      card.className = 'rotunda-card';
      card.innerHTML = `<img src="${car.img}" alt="${car.name}" />`;
      ring.appendChild(card);
    });

    let radius = 320;
    const place = () => {
      const card = ring.querySelector('.rotunda-card');
      const cw = card ? card.offsetWidth || 0 : 0;
      radius = Math.max(240, cw * 1.08);
      Array.from(ring.children).forEach((card, i) => {
        const a = (360 / ring.children.length) * i;
        card.style.transform = `rotateY(${a}deg) translateZ(${radius.toFixed(0)}px)`;
      });
    };
    place();
    window.addEventListener('resize', place);

    if (reduceMotion) {
      ring.style.transform = `translateZ(-${radius}px) rotateY(-22deg)`;
      return;
    }

    let angle = -18;
    let vel = 0.05;
    let dragging = false;
    let lastX = 0;
    const cards = Array.from(ring.children);

    let pitch = 5;
    const apply = () => {
      pitch += ((dragging ? -9 : -5) - pitch) * 0.1;
      ring.style.transform = `rotateX(${pitch.toFixed(2)}deg) translateZ(-${radius.toFixed(0)}px) rotateY(${angle.toFixed(2)}deg)`;
      for (let i = 0; i < cards.length; i++) {
        const a = (360 / cards.length) * i + angle;
        const facing = Math.cos((a * Math.PI) / 180);
          cards[i].style.filter = `brightness(${(0.42 + 0.62 * Math.max(0, facing)).toFixed(3)})` + (rotundaTint ? ' ' + rotundaTint : '');
      }
    };

    host.addEventListener('pointerdown', (e) => {
      if (typeof e.clientX !== 'number') return;
      dragging = true;
      lastX = e.clientX;
      host.classList.add('grabbing');
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging || typeof e.clientX !== 'number') return;
      const d = e.clientX - lastX;
      lastX = e.clientX;
      angle += d * 0.25;
      vel = Math.max(-8, Math.min(8, d * 0.16));
      apply();
    });
    window.addEventListener('pointerup', () => {
      dragging = false;
      host.classList.remove('grabbing');
    });

    (function loop() {
      const vh = window.innerHeight;
      const rect = host.getBoundingClientRect();
      const vis = rect.top < vh * 1.15 && rect.bottom > -vh * 0.15;
      if (vis) {
        if (!dragging) {
          angle += vel;
          vel += (0.05 - vel) * 0.02;
        }
        apply();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Feature card tilt ---------- */
  function featureTilt() {
    if (reduceMotion) return;
    document.querySelectorAll('.feature').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        if (typeof e.clientX !== 'number') return;
        const r = card.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Engine sound (WebAudio synth) ---------- */
  let soundOn = true;

  function revEngine() {
    if (!soundOn) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const t0 = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(52, t0);
      osc1.frequency.exponentialRampToValueAtTime(310, t0 + 0.55);
      osc1.frequency.exponentialRampToValueAtTime(92, t0 + 1.5);

      const osc2 = ctx.createOscillator();
      osc2.type = 'square';
      osc2.detune.value = 16;
      osc2.frequency.setValueAtTime(104, t0);
      osc2.frequency.exponentialRampToValueAtTime(620, t0 + 0.55);
      osc2.frequency.exponentialRampToValueAtTime(184, t0 + 1.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 880;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.2, t0 + 0.12);
      gain.gain.setValueAtTime(0.2, t0 + 0.72);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.55);

      const noiseLen = Math.floor(ctx.sampleRate * 1.6);
      const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
      const nd = noiseBuf.getChannelData(0);
      for (let i = 0; i < noiseLen; i++) nd[i] = (Math.random() * 2 - 1) * (1 - i / noiseLen);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 420;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.12;
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(t0);
      osc2.start(t0);
      noise.start(t0);
      osc1.stop(t0 + 1.6);
      osc2.stop(t0 + 1.6);
      setTimeout(() => ctx.close().catch(() => {}), 1900);
    } catch (e) {}
  }

  function wireSound() {
    const btn = document.getElementById('soundToggle');
    if (!btn) return;
    try {
      soundOn = localStorage.getItem('mgSound') !== 'off';
    } catch (e) {}
    const paint = () => {
      btn.textContent = 'Geluid: ' + (soundOn ? 'aan' : 'uit');
      btn.setAttribute('aria-pressed', String(soundOn));
    };
    paint();
    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      try {
        localStorage.setItem('mgSound', soundOn ? 'on' : 'off');
      } catch (e) {}
      paint();
    });
  }

  /* ---------- Afwerking configurator ---------- */
  const FINISHES = [
    { name: 'Rosso', filter: 'saturate(1.18) hue-rotate(0deg) contrast(1.05)' },
    { name: 'Nero', filter: 'saturate(0.16) brightness(0.85) contrast(1.12)' },
    { name: 'Argento', filter: 'saturate(0.55) brightness(1.14) contrast(1.02)' },
    { name: 'Notte', filter: 'hue-rotate(195deg) saturate(1.05) brightness(0.88)' }
  ];
  let rotundaTint = '';

  function wireFinish() {
    const dots = Array.from(document.querySelectorAll('.finish-dot'));
    if (!dots.length) return;
    dots.forEach((d) => {
      d.addEventListener('click', () => {
        dots.forEach((x) => x.classList.remove('active'));
        d.classList.add('active');
        rotundaTint = FINISHES[parseInt(d.dataset.finish, 10) || 0].filter;
      });
    });
  }

  /* ---------- Garage Dash game ---------- */
  function buildGame() {
    const canvas = document.getElementById('dashCanvas');
    const frame = document.querySelector('[data-game-frame]');
    const startOverlay = document.querySelector('[data-dash-start]');
    const overOverlay = document.querySelector('[data-dash-over]');
    const scoreEl = document.querySelector('[data-dash-score]');
    const speedEl = document.querySelector('[data-dash-speed]');
    const bestEl = document.querySelector('[data-dash-best]');
    const finalEl = document.querySelector('[data-dash-final]');
    if (!canvas || !frame) return;
    const c = canvas.getContext ? canvas.getContext('2d') : null;
    if (!c) return;

    let W = 0, H = 0, dpr = 1;
    let best = 0;
    try { best = parseInt(localStorage.getItem('mgDashBest') || '0', 10) || 0; } catch (e) {}
    if (bestEl) bestEl.textContent = best + ' m';

    let state = 'idle';
    let lane = 1, laneX = 0;
    let obstacles = [];
    let frames = 0, spawnIn = 46;
    let speed = 4.2, distance = 0, dashOffset = 0;
    let rafId = null;

    const laneW = () => W / 3;
    const carW = () => laneW() * 0.5;
    const carH = () => carW() * 1.65;
    const playerY = () => H - carH() - 24 * dpr;

    function roundRect(x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function drawCar(x, y, color, enemy) {
      const w = carW(), h = carH();
      const lr = 2.5 * dpr;
      c.save();
      c.translate(x, y);
      c.fillStyle = 'rgba(0,0,0,0.5)';
      c.fillRect(-w / 2 + 4 * dpr, h * 0.12, w, h * 0.85);
      c.fillStyle = color;
      roundRect(-w / 2, 0, w, h, 8 * dpr);
      c.fill();
      c.fillStyle = enemy ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.55)';
      roundRect(-w * 0.3, h * 0.22, w * 0.6, h * 0.3, 4 * dpr);
      c.fill();
      if (enemy) {
        c.fillStyle = '#ffffff';
        c.fillRect(-w * 0.36, h - 6 * dpr, w * 0.2, lr);
        c.fillRect(w * 0.16, h - 6 * dpr, w * 0.2, lr);
        c.fillStyle = '#e10600';
        c.fillRect(-w * 0.36, 4 * dpr, w * 0.2, lr);
        c.fillRect(w * 0.16, 4 * dpr, w * 0.2, lr);
      } else {
        c.fillStyle = '#ffffff';
        c.fillRect(-w * 0.36, 2 * dpr, w * 0.2, lr);
        c.fillRect(w * 0.16, 2 * dpr, w * 0.2, lr);
        c.fillStyle = 'rgba(225,6,0,0.9)';
        c.fillRect(-w * 0.36, h - 6 * dpr, w * 0.2, lr);
        c.fillRect(w * 0.16, h - 6 * dpr, w * 0.2, lr);
      }
      c.restore();
    }

    function draw() {
      c.clearRect(0, 0, W, H);
      c.fillStyle = '#0b0b0e';
      c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(255,255,255,0.16)';
      c.lineWidth = 2 * dpr;
      c.setLineDash([26 * dpr, 30 * dpr]);
      c.lineDashOffset = -dashOffset;
      [1, 2].forEach((i) => {
        c.beginPath();
        c.moveTo(i * laneW(), 0);
        c.lineTo(i * laneW(), H);
        c.stroke();
      });
      c.setLineDash([]);
      c.strokeStyle = 'rgba(225,6,0,0.55)';
      c.lineWidth = 3 * dpr;
      c.beginPath(); c.moveTo(2 * dpr, 0); c.lineTo(2 * dpr, H); c.stroke();
      c.beginPath(); c.moveTo(W - 2 * dpr, 0); c.lineTo(W - 2 * dpr, H); c.stroke();
      for (let i = 0; i < obstacles.length; i++) {
        drawCar((obstacles[i].lane + 0.5) * laneW(), obstacles[i].y, '#22222a', true);
      }
      drawCar(laneX, playerY(), '#e10600', false);
    }

    function resize() {
      const r = frame.getBoundingClientRect();
      const cw = r.width || 340;
      const cssH = Math.min(560, Math.max(280, cw * 0.72));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.floor(cw * dpr);
      H = Math.floor(cssH * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.height = cssH.toFixed(0) + 'px';
      laneX = (lane + 0.5) * laneW();
      draw();
    }
    resize();
    window.addEventListener('resize', resize);

    function dashSound(kind) {
      if (!soundOn) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const t0 = ctx.currentTime;
        if (kind === 'move') {
          const o = ctx.createOscillator();
          o.type = 'triangle';
          o.frequency.setValueAtTime(340, t0);
          o.frequency.exponentialRampToValueAtTime(180, t0 + 0.09);
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.07, t0);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.1);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(t0);
          o.stop(t0 + 0.11);
          setTimeout(() => ctx.close().catch(() => {}), 220);
        } else {
          const len = Math.floor(ctx.sampleRate * 0.35);
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.6);
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const g = ctx.createGain();
          g.gain.value = 0.3;
          src.connect(g);
          g.connect(ctx.destination);
          src.start(t0);
          setTimeout(() => ctx.close().catch(() => {}), 500);
        }
      } catch (e) {}
    }

    function crash() {
      state = 'over';
      dashSound('crash');
      const score = Math.floor(distance);
      if (score > best) {
        best = score;
        try { localStorage.setItem('mgDashBest', String(best)); } catch (e) {}
        if (bestEl) bestEl.textContent = best + ' m';
      }
      if (finalEl) finalEl.textContent = score + ' m';
      if (overOverlay) {
        overOverlay.hidden = false;
        if (!reduceMotion) {
          anime({
            targets: frame,
            translateX: [0, -12, 10, -7, 4, 0],
            duration: 420,
            easing: 'easeInOutQuad'
          });
          anime({ targets: overOverlay, opacity: [0, 1], duration: 350, easing: 'easeOutQuad' });
        }
      }
    }

    function start() {
      obstacles = [];
      frames = 0;
      spawnIn = 46;
      speed = 4.2;
      distance = 0;
      lane = 1;
      laneX = (1 + 0.5) * laneW();
      if (scoreEl) scoreEl.textContent = '0 m';
      if (speedEl) speedEl.textContent = '0 km/h';
      if (startOverlay) startOverlay.hidden = true;
      if (overOverlay) overOverlay.hidden = true;
      state = 'run';
      if (rafId === null && visible) rafId = requestAnimationFrame(step);
    }

    function step() {
      if (state === 'run') {
        frames++;
        speed = Math.min(13, 4.2 + frames * 0.002);
        distance += (speed * 1.7) / dpr;
        dashOffset = (dashOffset + speed) % (70 * dpr);
        spawnIn--;
        if (spawnIn <= 0) {
          let ol = Math.floor(Math.random() * 3);
          if (obstacles.length && obstacles[obstacles.length - 1].lane === ol && Math.random() < 0.5) {
            ol = (ol + 1 + Math.floor(Math.random() * 2)) % 3;
          }
          obstacles.push({ lane: ol, y: -carH() * 1.8 });
          spawnIn = Math.round(Math.max(26, 80 - speed * 3.4) + Math.random() * 22);
        }
        for (let i = 0; i < obstacles.length; i++) obstacles[i].y += speed * 1.15;
        obstacles = obstacles.filter((o) => o.y < H + carH() * 2);

        laneX += ((lane + 0.5) * laneW() - laneX) * 0.22;

        const pw = carW() * 0.82, ph = carH() * 0.9;
        const py = playerY() + carH() * 0.05;
        for (let i = 0; i < obstacles.length; i++) {
          const o = obstacles[i];
          const ow = carW() * 0.82, oh = carH() * 0.9;
          const ox = (o.lane + 0.5) * laneW() - ow / 2;
          if (laneX - pw / 2 < ox + ow * 0.85 && laneX + pw / 2 > ox + ow * 0.15 && py < o.y + oh * 0.9 && py + ph > o.y + oh * 0.1) {
            crash();
            break;
          }
        }

        if (scoreEl && frames % 6 === 0) scoreEl.textContent = Math.floor(distance) + ' m';
        if (speedEl && frames % 6 === 0) speedEl.textContent = Math.floor(speed * 21) + ' km/h';
      }
      draw();
      rafId = state === 'run' ? requestAnimationFrame(step) : null;
    }

    let visible = true;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        visible = en.isIntersecting;
        if (!visible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        } else if (visible && state === 'run' && rafId === null) {
          rafId = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.12 });
    io.observe(frame);

    function move(dir) {
      if (state !== 'run') return;
      const nl = Math.min(2, Math.max(0, lane + dir));
      if (nl !== lane) {
        lane = nl;
        dashSound('move');
      }
    }
    window.addEventListener('keydown', (e) => {
      if (state !== 'run') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        move(1);
      }
    });
    canvas.addEventListener('pointerdown', (e) => {
      if (state !== 'run' || typeof e.clientX !== 'number') return;
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      move((e.clientX - r.left) / r.width > 0.5 ? 1 : -1);
    });

    const goBtn = document.querySelector('[data-dash-go]');
    const againBtn = document.querySelector('[data-dash-again]');
    if (goBtn) goBtn.addEventListener('click', start);
    if (againBtn) againBtn.addEventListener('click', start);
  }

  /* ---------- Init (hardened: each step isolated) ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    const steps = [
      ['buildHeroSlices', buildHeroSlices],
      ['buildCollection', buildCollection],
      ['runPreloader', runPreloader],
      ['buildHud', buildHud],
      ['titlePop', titlePop],
      ['heroWave', heroWave],
      ['cinemaTilt', cinemaTilt],
      ['heroDust', heroDust],
      ['signatureWall', signatureWall],
      ['designRings', designRings],
      ['buildRotunda', buildRotunda],
      ['heroDepth', heroDepth],
      ['featureTilt', featureTilt],
      ['wireReplay', wireReplay],
      ['wireIgnite', wireIgnite],
      ['wireModal', wireModal],
      ['wireSound', wireSound],
      ['wireFinish', wireFinish],
      ['buildGame', buildGame],
      ['setupObserver', setupObserver],
      ['scrollEngine', scrollEngine],
      ['cursor', cursor],
      ['magnetic', magnetic]
    ];
    steps.forEach(([name, fn]) => {
      try {
        fn();
      } catch (err) {
        console.error('[Motion Garage] init step failed:', name, err);
      }
    });
  });
})();
