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
      ['game', 'Garage Arcade'],
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
  const gameApi = { pauseDash: null, resizeDash: null, pauseRed: null, resizeRed: null };

  function buildGame() {
    const canvas = document.getElementById('runCanvas');
    const frame = document.querySelector('[data-game-frame]');
    const startOverlay = document.querySelector('[data-dash-start]');
    const overOverlay = document.querySelector('[data-dash-over]');
    const scoreEl = document.querySelector('[data-dash-score]');
    const speedEl = document.querySelector('[data-dash-speed]');
    const bestEl = document.querySelector('[data-dash-best]');
    const finalEl = document.querySelector('[data-dash-final]');
    const powerEl = document.querySelector('[data-dash-power]');
    if (!canvas || !frame) return;
    const c = canvas.getContext ? canvas.getContext('2d') : null;
    if (!c) return;

    let W = 0, H = 0, dpr = 1;
    let best = 0;
    try { best = parseInt(localStorage.getItem('mgRunBest') || '0', 10) || 0; } catch (e) {}
    if (bestEl) bestEl.textContent = best + ' m';

    let state = 'idle';
    let rafId = null, visible = true;
    let px = 0, targetX = 0, vel = 0;
    let frames = 0, speed = 4.6, distance = 0, dashOffset = 0;
    let gates = [], pickups = [], particles = [], floaters = [];
    let gateIn = 55, lastGateC = 0;
    let nitroUntil = 0, mult = 1, multUntil = 0;
    let leftHeld = false, rightHeld = false, steering = false;

    const carWf = () => Math.max(30 * dpr, W * 0.085);
    const carHf = () => carWf() * 1.7;
    const playerY = () => H - carHf() - 18 * dpr;
    const barH = () => 13 * dpr;
    const diff = () => Math.min(1, frames / 6500);

    const clampX = (x) => Math.max(carWf() * 0.55, Math.min(W - carWf() * 0.55, x));

    function roundRect(x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function drawCar(x, y, tilt) {
      const w = carWf(), h = carHf();
      c.save();
      c.translate(x, y + h / 2);
      c.rotate(tilt);
      c.translate(-x, -y - h / 2);
      c.fillStyle = 'rgba(0,0,0,0.5)';
      c.fillRect(x - w / 2 + 4 * dpr, y + h * 0.12, w, h * 0.85);
      c.fillStyle = '#e10600';
      roundRect(x - w / 2, y, w, h, 8 * dpr);
      c.fill();
      c.fillStyle = 'rgba(0,0,0,0.55)';
      roundRect(x - w * 0.3, y + h * 0.22, w * 0.6, h * 0.3, 4 * dpr);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.85)';
      c.fillRect(x - w * 0.36, y + 2 * dpr, w * 0.2, 2.5 * dpr);
      c.fillRect(x + w * 0.16, y + 2 * dpr, w * 0.2, 2.5 * dpr);
      c.fillStyle = 'rgba(225,6,0,0.9)';
      c.fillRect(x - w * 0.36, y + h - 6 * dpr, w * 0.2, 2.5 * dpr);
      c.fillRect(x + w * 0.16, y + h - 6 * dpr, w * 0.2, 2.5 * dpr);
      c.restore();
      if (frames < nitroUntil) {
        c.fillStyle = 'rgba(255,255,255,0.35)';
        const fy = y + h + 2 * dpr;
        for (let i = 0; i < 10; i++) {
          const h2 = (8 + ((i * 37 + frames * 9) % 22)) * dpr;
          c.fillRect(x - w * 0.3 + (i % 2) * w * 0.45 + ((i * 13) % 5) * dpr, fy + i * 4.2 * dpr, 2.4 * dpr, h2);
        }
      }
    }

    function spawnGate() {
      const gw = carWf() * (2.15 - 0.55 * diff());
      const spacingFrames = 88 - 26 * diff();
      const maxShift = 8 * dpr * (spacingFrames + 20) * 0.55;
      const m = carWf() * 0.9 + gw / 2;
      let gc = lastGateC + (Math.random() * 2 - 1) * maxShift;
      gc = Math.max(m, Math.min(W - m, gc));
      const y = -barH() - 24 * dpr;
      gates.push({ y: y, l: gc - gw / 2, r: gc + gw / 2, passed: false });
      lastGateC = gc;
      gateIn = Math.round(spacingFrames + Math.random() * 26);
      if (Math.random() < 0.3) {
        pickups.push({ x: gc, y: y - 46 * dpr, kind: Math.random() < 0.55 ? 'nitro' : 'x2' });
      }
    }

    function burst(x, y, n, color) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (1 + Math.random() * 3.5) * dpr;
        particles.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.2 * dpr, life: 34 + Math.random() * 22, size: (1.4 + Math.random() * 2.2) * dpr, color: color || '#e10600' });
      }
    }

    function draw() {
      c.clearRect(0, 0, W, H);
      c.fillStyle = '#0b0b0e';
      c.fillRect(0, 0, W, H);

      c.strokeStyle = 'rgba(255,255,255,0.14)';
      c.lineWidth = 2 * dpr;
      c.setLineDash([26 * dpr, 34 * dpr]);
      c.lineDashOffset = -dashOffset;
      [0.33, 0.66].forEach((f) => {
        c.beginPath();
        c.moveTo(f * W, 0);
        c.lineTo(f * W, H);
        c.stroke();
      });
      c.setLineDash([]);
      c.strokeStyle = 'rgba(225,6,0,0.6)';
      c.lineWidth = 3 * dpr;
      c.beginPath(); c.moveTo(3 * dpr, 0); c.lineTo(3 * dpr, H); c.stroke();
      c.beginPath(); c.moveTo(W - 3 * dpr, 0); c.lineTo(W - 3 * dpr, H); c.stroke();

      gates.forEach((g) => {
        c.fillStyle = '#1a1a1f';
        c.fillRect(0, g.y, g.l, barH());
        c.fillRect(g.r, g.y, W - g.r, barH());
        c.fillStyle = '#e10600';
        c.shadowColor = 'rgba(225,6,0,0.6)';
        c.shadowBlur = 8 * dpr;
        c.fillRect(Math.max(0, g.l - 3 * dpr), g.y, 3 * dpr, barH());
        c.fillRect(g.r, g.y, 3 * dpr, barH());
        c.shadowBlur = 0;
      });

      pickups.forEach((p) => {
        const s = 11 * dpr;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(Math.PI / 4 + frames * 0.05);
        c.fillStyle = '#e10600';
        c.shadowColor = 'rgba(225,6,0,0.7)';
        c.shadowBlur = 12 * dpr;
        c.fillRect(-s / 2, -s / 2, s, s);
        c.shadowBlur = 0;
        c.restore();
        c.fillStyle = '#ffffff';
        c.font = '700 ' + Math.round(9 * dpr) + 'px "Space Grotesk", sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(p.kind === 'nitro' ? 'N' : '2', p.x, p.y);
      });

      drawCar(px, playerY(), Math.max(-0.14, Math.min(0.14, vel * 0.012 / dpr)));

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        c.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
        c.fillStyle = p.color;
        c.fillRect(p.x, p.y, p.size, p.size);
      }
      c.globalAlpha = 1;

      c.textAlign = 'center';
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        c.globalAlpha = Math.max(0, Math.min(1, f.life / 30));
        c.fillStyle = '#ffffff';
        c.font = '700 ' + Math.round(13 * dpr) + 'px "Space Grotesk", sans-serif';
        c.fillText(f.text, f.x, f.y);
      }
      c.globalAlpha = 1;
    }

    function resize() {
      const r = frame.getBoundingClientRect();
      const cw = r.width || 340;
      const cssH = Math.min(560, Math.max(300, cw * 0.72));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.floor(cw * dpr);
      H = Math.floor(cssH * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.height = cssH.toFixed(0) + 'px';
      px = targetX = W / 2;
      draw();
    }
    resize();
    window.addEventListener('resize', resize);
    gameApi.resizeDash = resize;

    function dashSound(kind) {
      if (!soundOn) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const t0 = ctx.currentTime;
        if (kind === 'move' || kind === 'pup') {
          const o = ctx.createOscillator();
          o.type = kind === 'pup' ? 'square' : 'triangle';
          o.frequency.setValueAtTime(kind === 'pup' ? 520 : 340, t0);
          o.frequency.exponentialRampToValueAtTime(kind === 'pup' ? 880 : 180, t0 + 0.09);
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
      burst(px, playerY() + carHf() / 2, 26);
      const score = Math.floor(distance);
      if (score > best) {
        best = score;
        try { localStorage.setItem('mgRunBest', String(best)); } catch (e) {}
        if (bestEl) bestEl.textContent = best + ' m';
      }
      if (finalEl) finalEl.textContent = score + ' m';
      if (powerEl) powerEl.textContent = '\u2014';
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
      gates = [];
      pickups = [];
      particles = [];
      floaters = [];
      frames = 0;
      gateIn = 55;
      lastGateC = canvas.width / 2;
      speed = 4.6;
      distance = 0;
      nitroUntil = 0;
      mult = 1;
      multUntil = 0;
      leftHeld = false;
      rightHeld = false;
      px = targetX = canvas.width / 2;
      if (scoreEl) scoreEl.textContent = '0 m';
      if (speedEl) speedEl.textContent = '0 km/h';
      if (powerEl) powerEl.textContent = '\u2014';
      if (startOverlay) startOverlay.hidden = true;
      if (overOverlay) overOverlay.hidden = true;
      state = 'run';
      if (rafId === null && visible) rafId = requestAnimationFrame(step);
    }

    function step() {
      if (state === 'run') {
        frames++;
        speed = Math.min(12.5, 4.6 + frames * 0.0018) + (frames < nitroUntil ? 3.6 : 0);
        distance += (speed * 1.7) / dpr * mult;
        dashOffset = (dashOffset + speed) % (70 * dpr);

        if (leftHeld) targetX = clampX(targetX - 8.5 * dpr);
        if (rightHeld) targetX = clampX(targetX + 8.5 * dpr);
        targetX = clampX(targetX);

        gateIn--;
        if (gateIn <= 0) spawnGate();

        const py = playerY() + carHf() * 0.05;
        for (let i = gates.length - 1; i >= 0; i--) {
          const g = gates[i];
          g.y += speed * 1.15;
          if (!g.passed && g.y > py + carHf() * 0.5) {
            g.passed = true;
            const halfGap = (g.r - g.l) / 2;
            const edgeDist = Math.abs(px - (g.l + g.r) / 2) - halfGap;
            if (edgeDist > -carWf() * 0.75) {
              const bonus = Math.round(30 * mult);
              distance += bonus;
              floaters.push({ x: px, y: py, text: '+' + bonus + ' strak', life: 46 });
            }
          }
          if (g.y > H + 40 * dpr) gates.splice(i, 1);
        }

        for (let i = pickups.length - 1; i >= 0; i--) {
          pickups[i].y += speed * 1.15;
          const p = pickups[i];
          if (p.y > py - 6 * dpr && p.y < playerY() + carHf() && Math.abs(p.x - px) < carWf() * 0.85) {
            if (p.kind === 'nitro') {
              nitroUntil = frames + 140;
              floaters.push({ x: px, y: py - 10 * dpr, text: 'NITRO', life: 46 });
            } else {
              mult = 2;
              multUntil = frames + 480;
              floaters.push({ x: px, y: py - 10 * dpr, text: 'SCORE x2', life: 46 });
            }
            burst(px, py, 10, '#ffffff');
            dashSound('pup');
            pickups.splice(i, 1);
          } else if (p.y > H + 20 * dpr) {
            pickups.splice(i, 1);
          }
        }

        if (frames > multUntil && mult > 1) mult = 1;

        const prevPx = px;
        px += (targetX - px) * 0.16;
        vel = px - prevPx;

        const pw = carWf() * 0.8, ph = carHf() * 0.88;
        for (let i = 0; i < gates.length; i++) {
          const g = gates[i];
          const hitL = px - pw / 2 < g.l && px + pw / 2 > 0 && py < g.y + barH() && py + ph > g.y;
          const hitR = px + pw / 2 > g.r && px - pw / 2 < W && py < g.y + barH() && py + ph > g.y;
          if (hitL || hitR) {
            crash();
            break;
          }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy; p.vy += 0.12 * dpr; p.life--;
          if (p.life <= 0) particles.splice(i, 1);
        }
        for (let i = floaters.length - 1; i >= 0; i--) {
          floaters[i].y -= 1.1 * dpr;
          floaters[i].life--;
          if (floaters[i].life <= 0) floaters.splice(i, 1);
        }

        if (frames % 6 === 0) {
          if (scoreEl) scoreEl.textContent = Math.floor(distance) + ' m';
          if (speedEl) speedEl.textContent = Math.floor(speed * 21) + ' km/h';
          if (powerEl) powerEl.textContent = frames < nitroUntil ? 'NITRO' : mult > 1 ? 'x2' : '\u2014';
        }
      }
      draw();
      rafId = state === 'run' ? requestAnimationFrame(step) : null;
    }

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

    window.addEventListener('keydown', (e) => {
      if (state !== 'run') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); leftHeld = true; }
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); rightHeld = true; }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftHeld = false;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightHeld = false;
    });
    canvas.addEventListener('pointerdown', (e) => {
      if (state !== 'run' || typeof e.clientX !== 'number') return;
      steering = true;
      const r = canvas.getBoundingClientRect();
      if (r.width) targetX = clampX((e.clientX - r.left) / r.width * canvas.width);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!steering || typeof e.clientX !== 'number') return;
      const r = canvas.getBoundingClientRect();
      if (r.width) targetX = clampX((e.clientX - r.left) / r.width * canvas.width);
    });
    window.addEventListener('pointerup', () => { steering = false; });

    const goBtn = document.querySelector('[data-dash-go]');
    const againBtn = document.querySelector('[data-dash-again]');
    if (goBtn) goBtn.addEventListener('click', start);
    if (againBtn) againBtn.addEventListener('click', start);

    gameApi.pauseDash = () => {
      if (state !== 'run') return;
      state = 'idle';
      leftHeld = false;
      rightHeld = false;
      steering = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      if (startOverlay) startOverlay.hidden = false;
      if (overOverlay) overOverlay.hidden = true;
      if (powerEl) powerEl.textContent = '\u2014';
    };
  }

  /* ---------- Redline \u2014 reactiegame met toerenteller ---------- */
  function buildRedline() {
    const cv = document.getElementById('rlCanvas');
    const frame = document.querySelector('[data-rl-frame]');
    if (!cv || !frame) return;
    const c = cv.getContext ? cv.getContext('2d') : null;
    if (!c) return;
    const startOv = document.querySelector('[data-rl-start]');
    const overOv = document.querySelector('[data-rl-over]');
    const goBtn = document.querySelector('[data-rl-go]');
    const againBtn = document.querySelector('[data-rl-again]');
    const roundEl = document.querySelector('[data-rl-round]');
    const totalEl = document.querySelector('[data-rl-total]');
    const bestEl = document.querySelector('[data-rl-best]');
    const finalEl = document.querySelector('[data-rl-final]');
    const noteEl = document.querySelector('[data-rl-note]');

    const A0 = Math.PI * 0.75;
    const A1 = Math.PI * 2.25;
    const deg = (d) => (d * Math.PI) / 180;

    let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, R = 0;
    let state = 'idle', rafId = null, visible = true;
    let round = 1, total = 0, needle = A0, dir = 1, needleSpeed = 0, zoneC = 0, zoneW = 0, lastMsg = '';

    let best = 0;
    try { best = parseInt(localStorage.getItem('mgRedBest') || '0', 10) || 0; } catch (e) {}
    if (bestEl) bestEl.textContent = String(best);

    function resize() {
      const r = frame.getBoundingClientRect();
      const cw = r.width || 340;
      const cssH = Math.min(460, Math.max(300, cw * 0.66));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.floor(cw * dpr);
      H = Math.floor(cssH * dpr);
      cv.width = W;
      cv.height = H;
      cv.style.height = cssH.toFixed(0) + 'px';
      cx = W / 2;
      cy = H * 0.62;
      R = Math.min(W, H) * 0.36;
      draw();
    }
    resize();
    window.addEventListener('resize', resize);
    gameApi.resizeRed = resize;

    function rlSound(kind) {
      if (!soundOn) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const t0 = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = kind === 'perfect' ? 'triangle' : kind === 'mis' ? 'sawtooth' : 'square';
        const f0 = kind === 'perfect' ? 720 : kind === 'mis' ? 160 : 420;
        const f1 = kind === 'perfect' ? 1080 : kind === 'mis' ? 80 : 300;
        o.frequency.setValueAtTime(f0, t0);
        o.frequency.exponentialRampToValueAtTime(f1, t0 + 0.12);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.08, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t0);
        o.stop(t0 + 0.15);
        setTimeout(() => ctx.close().catch(() => {}), 260);
      } catch (e) {}
    }

    function newRound() {
      needle = A0;
      dir = 1;
      needleSpeed = deg(2.4 + round * 0.65);
      zoneW = Math.max(deg(8), deg(26 - (round - 1) * 4));
      zoneC = A0 + zoneW / 2 + (A1 - A0 - zoneW) * (0.12 + Math.random() * 0.76);
      if (roundEl) roundEl.textContent = round + ' / 5';
      lastMsg = '';
      if (totalEl) totalEl.textContent = String(total);
    }

    function draw() {
      c.clearRect(0, 0, W, H);
      c.fillStyle = '#0b0b0e';
      c.fillRect(0, 0, W, H);

      c.strokeStyle = 'rgba(255,255,255,0.14)';
      c.lineWidth = 3 * dpr;
      c.beginPath();
      c.arc(cx, cy, R, A0, A1);
      c.stroke();

      c.fillStyle = 'rgba(225,6,0,0.9)';
      c.shadowColor = 'rgba(225,6,0,0.55)';
      c.shadowBlur = 14 * dpr;
      c.beginPath();
      c.arc(cx, cy, R, zoneC - zoneW / 2, zoneC + zoneW / 2);
      c.strokeStyle = '#e10600';
      c.lineWidth = 10 * dpr;
      c.stroke();
      c.shadowBlur = 0;

      c.strokeStyle = 'rgba(255,255,255,0.35)';
      c.lineWidth = 1.4 * dpr;
      for (let a = 0; a <= 9; a++) {
        const ang = A0 + (A1 - A0) * (a / 9);
        const inner = R - 9 * dpr;
        const outer = R - (a % 3 === 0 ? 20 : 14) * dpr;
        c.beginPath();
        c.moveTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner);
        c.lineTo(cx + Math.cos(ang) * outer, cy + Math.sin(ang) * outer);
        c.stroke();
      }

      c.save();
      c.translate(cx, cy);
      c.rotate(needle);
      c.strokeStyle = '#e10600';
      c.lineWidth = 3 * dpr;
      c.shadowColor = 'rgba(225,6,0,0.8)';
      c.shadowBlur = 10 * dpr;
      c.beginPath();
      c.moveTo(-R * 0.14, 0);
      c.lineTo(R - 6 * dpr, 0);
      c.stroke();
      c.shadowBlur = 0;
      c.restore();

      c.fillStyle = '#e10600';
      c.beginPath();
      c.arc(cx, cy, 7 * dpr, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#0a0a0a';
      c.beginPath();
      c.arc(cx, cy, 2.6 * dpr, 0, Math.PI * 2);
      c.fill();

      if (lastMsg) {
        const perfect = lastMsg === 'PERFECT';
        c.fillStyle = perfect ? '#e10600' : '#f5f5f5';
        c.font = '700 ' + Math.round((perfect ? 30 : 22) * dpr) + 'px "Anton", sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(lastMsg, cx, cy - R * 0.52);
      }
    }

    function step() {
      if (state === 'aim') {
        needle += dir * needleSpeed;
        if (needle >= A1) { needle = A1; dir = -1; }
        else if (needle <= A0) { needle = A0; dir = 1; }
      }
      draw();
      rafId = state === 'aim' ? requestAnimationFrame(step) : null;
    }

    function stopNeedle() {
      if (state !== 'aim') return;
      state = 'idle';
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      const half = zoneW / 2;
      const off = Math.abs(needle - zoneC);
      let pts = 0;
      if (off <= half) {
        const acc = 1 - off / half;
        pts = Math.round(60 + 40 * acc);
        lastMsg = off < deg(2.2) ? 'PERFECT' : '+' + pts;
        rlSound('hit');
      } else {
        lastMsg = 'MIS';
        rlSound('mis');
      }
      if (off < deg(2.2)) rlSound('perfect');
      total += pts;
      if (totalEl) totalEl.textContent = String(total);
      setTimeout(() => {
        round++;
        if (round > 5) {
          finish();
        } else {
          newRound();
          state = 'aim';
          if (visible && rafId === null) rafId = requestAnimationFrame(step);
        }
      }, 1050);
    }

    function finish() {
      state = 'over';
      if (total > best) {
        best = total;
        try { localStorage.setItem('mgRedBest', String(best)); } catch (e) {}
        if (bestEl) bestEl.textContent = String(best);
      }
      if (finalEl) finalEl.textContent = total + ' punten';
      if (noteEl) {
        noteEl.textContent =
          total >= 460 ? 'Motor van het jaar. De naald is bevangen.' :
          total >= 400 ? 'Afstelling perfect. De teller respecteert je.' :
          total >= 300 ? 'Degelijk shiftwerk \u2014 er zit meer in.' :
          total >= 150 ? 'De naald won het gros van de discussies.' :
          'De motor loopt warm. Nog een keer?';
      }
      if (overOv) {
        overOv.hidden = false;
        if (!reduceMotion && window.anime) {
          anime({ targets: overOv, opacity: [0, 1], duration: 350, easing: 'easeOutQuad' });
        }
      }
    }

    function start() {
      round = 1;
      total = 0;
      if (totalEl) totalEl.textContent = '0';
      if (startOv) startOv.hidden = true;
      if (overOv) overOv.hidden = true;
      newRound();
      state = 'aim';
      if (visible && rafId === null) rafId = requestAnimationFrame(step);
    }

    cv.addEventListener('pointerdown', stopNeedle);
    window.addEventListener('keydown', (e) => {
      if (state !== 'aim') return;
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        stopNeedle();
      }
    });
    if (goBtn) goBtn.addEventListener('click', start);
    if (againBtn) againBtn.addEventListener('click', start);

    const rio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        visible = en.isIntersecting;
        if (!visible && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
        else if (visible && state === 'aim' && rafId === null) rafId = requestAnimationFrame(step);
      });
    }, { threshold: 0.12 });
    rio.observe(frame);

    gameApi.pauseRed = () => {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    };
  }

  /* ---------- Spec Match \u2014 3D geheugenspel ---------- */
  function buildMatch() {
    const gridEl = document.getElementById('matchGrid');
    if (!gridEl) return;
    const frame = document.querySelector('[data-match-frame]');
    const movesEl = document.querySelector('[data-match-moves]');
    const foundEl = document.querySelector('[data-match-found]');
    const bestEl = document.querySelector('[data-match-best]');
    const winOv = document.querySelector('[data-match-win]');
    const finalEl = document.querySelector('[data-match-final]');
    const resetBtn = document.querySelector('[data-match-reset]');

    let best = 0;
    try { best = parseInt(localStorage.getItem('mgMatchBest') || '0', 10) || 0; } catch (e) {}
    if (bestEl) bestEl.textContent = best ? best + ' beurten' : '\u2014';

    const FACES = [
      ['ROSSO APEX', 'V10 \u00b7 640 HP'],
      ['PHANTOM', 'V8 BITURBO \u00b7 650'],
      ['NIGHTHAWK', '0-100 \u00b7 2.9 S'],
      ['SILVER LINE', 'V8 \u00b7 480 HP'],
      ['ARCTIC GHOST', '0-100 \u00b7 3.4 S'],
      ['ROSSO NOTTE', 'V8 BITURBO \u00b7 660']
    ];

    let first = null, second = null, lock = false, moves = 0, found = 0;

    function matchSound(kind) {
      if (!soundOn) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const t0 = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = kind === 'ok' ? 'triangle' : 'sine';
        o.frequency.setValueAtTime(kind === 'ok' ? 660 : 220, t0);
        o.frequency.exponentialRampToValueAtTime(kind === 'ok' ? 990 : 160, t0 + 0.12);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.06, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t0);
        o.stop(t0 + 0.15);
        setTimeout(() => ctx.close().catch(() => {}), 260);
      } catch (e) {}
    }

    function renderHud() {
      if (movesEl) movesEl.textContent = String(moves);
      if (foundEl) foundEl.textContent = found + ' / 6';
    }

    function newGame() {
      gridEl.innerHTML = '';
      first = null;
      second = null;
      lock = false;
      moves = 0;
      found = 0;
      renderHud();
      if (winOv) winOv.hidden = true;
      const deck = [];
      FACES.forEach((f, i) => {
        deck.push({ i: i, name: f[0], sub: f[1] });
        deck.push({ i: i, name: f[0], sub: f[1] });
      });
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
      }
      deck.forEach((card, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'match-card';
        btn.setAttribute('aria-label', 'Geheugenkaart ' + (idx + 1));
        const inner = document.createElement('span');
        inner.className = 'match-inner';
        const front = document.createElement('span');
        front.className = 'match-face match-front';
        front.textContent = 'MG';
        const back = document.createElement('span');
        back.className = 'match-face match-back';
        back.innerHTML = '<strong></strong><i></i>';
        back.querySelector('strong').textContent = card.name;
        back.querySelector('i').textContent = card.sub;
        inner.appendChild(front);
        inner.appendChild(back);
        btn.appendChild(inner);
        btn.setAttribute('data-key', String(card.i));
        btn.addEventListener('click', () => pickCard(btn));
        gridEl.appendChild(btn);
      });
    }

    function pickCard(btn) {
      if (lock) return;
      if (btn.classList.contains('flipped') || btn.classList.contains('done')) return;
      btn.classList.add('flipped');
      matchSound('flip');
      if (!first) {
        first = btn;
        return;
      }
      second = btn;
      moves++;
      renderHud();
      const a = first.getAttribute('data-key');
      const b = second.getAttribute('data-key');
      if (a === b) {
        first.classList.add('done');
        second.classList.add('done');
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        matchSound('ok');
        if (!reduceMotion && window.anime && window.anime.set) {
          try {
            anime({ targets: [first, second], scale: [1, 1.08, 1], duration: 420, easing: 'easeOutQuad' });
          } catch (e) {}
        }
        found++;
        renderHud();
        first = null;
        second = null;
        if (found === 6) setTimeout(win, 500);
      } else {
        lock = true;
        const f = first, s = second;
        first = null;
        second = null;
        setTimeout(() => {
          f.classList.remove('flipped');
          s.classList.remove('flipped');
          lock = false;
        }, 760);
      }
    }

    function win() {
      matchSound('ok');
      const record = !best || moves < best;
      if (record) {
        best = moves;
        try { localStorage.setItem('mgMatchBest', String(best)); } catch (e) {}
        if (bestEl) bestEl.textContent = best + ' beurten';
      }
      if (finalEl) finalEl.textContent = moves + ' beurten' + (record ? ' \u2014 nieuw record' : '');
      if (winOv) {
        winOv.hidden = false;
        if (!reduceMotion && window.anime) {
          try {
            anime({ targets: winOv, opacity: [0, 1], duration: 350, easing: 'easeOutQuad' });
          } catch (e) {}
        }
      }
    }

    if (resetBtn) resetBtn.addEventListener('click', newGame);
    newGame();
  }

  /* ---------- Game tabs ---------- */
  function wireGameTabs() {
    const tabs = Array.prototype.slice.call(document.querySelectorAll('[data-game-tab]'));
    const panels = Array.prototype.slice.call(document.querySelectorAll('[data-game-panel]'));
    if (!tabs.length || !panels.length) return;
    function activate(name) {
      tabs.forEach((t) => {
        const on = t.getAttribute('data-game-tab') === name;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach((p) => {
        const on = p.getAttribute('data-game-panel') === name;
        p.hidden = !on;
        p.classList.toggle('active', on);
      });
      if (name !== 'dash' && gameApi.pauseDash) gameApi.pauseDash();
      if (name !== 'redline' && gameApi.pauseRed) gameApi.pauseRed();
      if (name === 'dash' && gameApi.resizeDash) gameApi.resizeDash();
      if (name === 'redline' && gameApi.resizeRed) gameApi.resizeRed();
    }
    tabs.forEach((t) => t.addEventListener('click', () => activate(t.getAttribute('data-game-tab'))));
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
      ['buildRedline', buildRedline],
      ['buildMatch', buildMatch],
      ['wireGameTabs', wireGameTabs],
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
