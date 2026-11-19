/* Motion Garage — powered by anime.js v3 */
(function () {
  'use strict';

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
      tag: 'Muscle',
      name: 'IRON SHADE',
      copy: 'Agressie met bepaalde majesteit: grijs-staal, één blik vooruit en een dreiging die je in de lucht van de garage hoort hangen.',
      specs: [
        ['Vermogen', '720 HP'],
        ['Motor', 'V8 supercharged'],
        ['0 – 100', '3.1 s'],
        ['Top', '310 km/h']
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
      copy: 'Zilver uit een tijdperk waarin vorm functie was. Deze klassieker herinnert de toekomst aan haar eigen smaak.',
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
      tag: 'Grand Tour',
      name: 'HORIZON',
      copy: 'Zonsondergang als finishlijn. De Horizon telt geen kilometers — ze meet alleen hoeveel avondlandschappen je langs haar zijkant bent gepasseerd.',
      specs: [
        ['Vermogen', '560 HP'],
        ['Motor', 'R6 M-Sport'],
        ['0 – 100', '3.5 s'],
        ['Top', '305 km/h']
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

  /* ---------- Hero intro timeline (replayable) ---------- */
  function heroIntro() {
    const chars = splitChars(document.querySelector('.hero-title'));

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
            el.style.transform = `scale(${(1 + Math.min(0.5, e * 0.34)).toFixed(3)})`;
          } else if (el.style.backgroundColor !== 'rgba(255, 255, 255, 0.045)') {
            el.style.backgroundColor = BASE;
            el.style.transform = 'scale(1)';
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
      anime.set('.car-modal-panel', { opacity: 1, translateY: 0, scale: 1 });
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

  /* ---------- Performance: counters + bars ---------- */
  let perfPlayed = false;

  function runPerformance() {
    if (perfPlayed) return;
    perfPlayed = true;
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
      measured: false,
      dispW: 0,
      p: 0,
      skew: 0,
      lastRaw: null,
      callouts: Array.from(sec.querySelectorAll('.dolly-callout')).map((el) => ({
        el,
        at: parseFloat(el.dataset.dollyAt) || 0.5,
        d: 0
      }))
    }));

    const mediaTargets = medias.map((el) => ({
      el,
      img: el.querySelector('[data-media-transform]') || el.querySelector('.media-img'),
      y: 0
    }));
    const ringTargets = rings.map((el) => ({ el, y: 0 }));
    window.addEventListener('resize', () => dollyTargets.forEach((t) => { t.measured = false; }));

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
        el.style.transform = `translate(calc(-50% + ${((p - 0.5) * speed * 1200).toFixed(1)}px), -50%)`;
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

        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const pan = Math.max(0, t.dispW - vw);
        t.track.style.transform = `translateX(${(-pan * ease).toFixed(2)}px) skewX(${t.skew.toFixed(3)}deg)`;
        t.img.style.transform = `translateY(-50%) scale(${(1.16 - 0.14 * p).toFixed(4)})`;

        if (t.label) t.label.style.opacity = Math.max(0, 1 - (p - 0.1) / 0.1).toFixed(3);
        if (t.headline) t.headline.style.opacity = Math.min(1, Math.max(0, (p - 0.85) / 0.1)).toFixed(3);
        if (t.veil) t.veil.style.opacity = (0.5 + 0.5 * Math.abs(p - 0.5) * 2).toFixed(3);

        t.callouts.forEach((c) => {
          const target = Math.min(1, Math.max(0, 1 - Math.abs(p - c.at) / 0.1));
          c.d += (target - c.d) * 0.16;
          c.el.style.opacity = c.d.toFixed(3);
          c.el.style.transform = `translateY(${((1 - c.d) * 30).toFixed(1)}px)`;
        });
        if (t.bar) t.bar.style.width = (p * 100).toFixed(2) + '%';
      });

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

  /* ---------- Init (hardened: each step isolated) ---------- */
  window.addEventListener('DOMContentLoaded', () => {
    const steps = [
      ['buildHeroSlices', buildHeroSlices],
      ['buildCollection', buildCollection],
      ['heroIntro', heroIntro],
      ['heroDust', heroDust],
      ['signatureWall', signatureWall],
      ['designRings', designRings],
      ['wireReplay', wireReplay],
      ['wireIgnite', wireIgnite],
      ['wireModal', wireModal],
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
