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
      tag: 'Hybrid',
      name: 'FERRARI LAFERRARI',
      alias: 'Rosso Apex',
      copy: 'Rood op matzwart. In een garage waar het licht alleen voor haar werkt, staat de belichaming van Motion Garage: stil, maar tijdens het nadenken gevaarlijk.',
      fact: 'De HY-KERS komt rechtstreeks uit de F1: 163 elektrische pk die alleen loskomen als haar gas vol open staat.',
      specs: [
        ['Vermogen', '963 PK'],
        ['Motor', 'V12 + HY-KERS'],
        ['0 \u2013 100', '2.6 s'],
        ['Top', '350 km/h']
      ]
    },
    {
      img: 'assets/cars/card-phantom.jpg',
      tag: 'Nacht',
      name: 'AUDI RS6',
      alias: 'Phantom',
      copy: 'Zwart op een lege landweg. Waar de laatste lantaarn uitgaat, gaat zij aan \u2014 iedereen hoort haar, niemand ziet haar wegrijden.',
      fact: 'Met alleen software loopt ze op het stoplicht voorbij aan supercars die het dubbele kosten.',
      specs: [
        ['Vermogen', '600 PK'],
        ['Motor', 'V8 biturbo'],
        ['0 \u2013 100', '3.6 s'],
        ['Top', '305 km/h']
      ]
    },
    {
      img: 'assets/cars/card-nighthawk.jpg',
      tag: 'Detail',
      name: 'BMW M4',
      alias: 'Nighthawk',
      copy: 'Grille als gepantserd front, koplampen als bliksemafleiders. De nacht legt haar ontwerp bloot \u2014 symmetrie is voor doe-het-zelvers.',
      fact: 'Elke S58-motor wordt met de hand gebouwd; in elke M4 hangt een plaquette met de naam van de monteur.',
      specs: [
        ['Vermogen', '510 PK'],
        ['Motor', 'R6 biturbo'],
        ['0 \u2013 100', '3.5 s'],
        ['Top', '290 km/h']
      ]
    },
    {
      img: 'assets/cars/card-heritage.jpg',
      tag: 'Heritage',
      name: 'FORD MUSTANG GT',
      alias: 'Heritage',
      copy: 'Amerikaans staal uit een rauwer tijdperk, gewassen in nachtelijk licht. De V8 zingt nog precies zoals het embleem belooft.',
      fact: 'De naam is geen toeval: ontwerper John Najjar was fan van de P-51 Mustang-jager.',
      specs: [
        ['Vermogen', '460 PK'],
        ['Motor', 'V8 5.0'],
        ['0 \u2013 100', '4.3 s'],
        ['Top', '250 km/h']
      ]
    },
    {
      img: 'assets/cars/card-arctic.jpg',
      tag: 'Grand Tour',
      name: 'BUGATTI CHIRON',
      alias: 'Arctic Ghost',
      copy: 'Wit op de nachtstad: koplampen als flitsen, stilte als jachtveld, comfort en brutaliteit in \u00e9\u00e9n spiegelglans.',
      fact: 'De teller loopt tot 500 \u2014 de software houdt haar bij 420 vast, puur om de banden te sparen.',
      specs: [
        ['Vermogen', '1500 PK'],
        ['Motor', 'W16 quad-turbo'],
        ['0 \u2013 100', '2.4 s'],
        ['Top', '420 km/h']
      ]
    },
    {
      img: 'assets/cars/card-r8.jpg',
      tag: 'Studio',
      name: 'AUDI R8',
      alias: 'Nachtvogel',
      copy: 'Middenmotor tussen de stadslichten. Terwijl de zonsondergang onscherp verdwijnt, blijft alleen haar silhouet scherp.',
      fact: 'Halve Lamborghini: de R8 deelt haar platform \u2014 en haar V10 \u2014 met de Hurac\u00e1n.',
      specs: [
        ['Vermogen', '620 PK'],
        ['Motor', 'V10'],
        ['0 \u2013 100', '3.1 s'],
        ['Top', '331 km/h']
      ]
    },
    {
      img: 'assets/cars/card-gt3.jpg',
      tag: 'Circuit',
      name: 'PORSCHE 911 GT3',
      alias: 'Flat Six',
      copy: 'Matzwart in het laatste schemerlicht. Geen turbo, geen compromis: vier liter boxersix met een racevleugel die van het circuit rechtstreeks naar de openbare weg ontsnapt.',
      fact: 'Bij topsnelheid duwt de vleugel haar met bijna 200 kilogram de asfalt in \u2014 grip die je voelt in je maag.',
      specs: [
        ['Vermogen', '510 PK'],
        ['Motor', '4.0 flat-6'],
        ['0 \u2013 100', '3.4 s'],
        ['Top', '318 km/h']
      ]
    },
    {
      img: 'assets/cars/card-huracan.jpg',
      tag: 'Nachtjacht',
      name: 'LAMBORGHINI HURAC\u00c1N',
      alias: 'Orkaan',
      copy: 'Oranje scherpte tussen de stadslantaarns: tien cilinders, zes hoekige uitlaten, nul geduld.',
      fact: 'De naam komt van een Spaanse vechtstier uit 1879 \u2014 en betekent letterlijk orkaan.',
      specs: [
        ['Vermogen', '640 PK'],
        ['Motor', 'V10'],
        ['0 \u2013 100', '2.9 s'],
        ['Top', '325 km/h']
      ]
    },
    {
      img: 'assets/cars/card-challenger.jpg',
      tag: 'Muscle',
      name: 'DODGE CHALLENGER',
      alias: 'Thunder',
      copy: 'Zwart op de nacht, met een lichtband van rand tot rand. Ze bijt zich vast in de nacht als donder boven een eindeloos rechte weg.',
      fact: 'De doorlopende achterlichtband heet officieel de \u201cracetrack\u201d \u2014 een buiging aan het circuit van Daytona.',
      specs: [
        ['Vermogen', '375 PK'],
        ['Motor', 'V8 HEMI 5.7'],
        ['0 \u2013 100', '5.9 s'],
        ['Top', '250 km/h']
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
          <div class="car-card-alias">Bijnaam: &ldquo;${car.alias}&rdquo;</div>
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
    document.getElementById('carModalAlias').textContent = 'Bijnaam: \u201c' + car.alias + '\u201d';
    document.getElementById('carModalFact').textContent = 'Wist je: ' + car.fact;
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

    CARS.forEach((car) => {
      const card = document.createElement('div');
      card.className = 'rotunda-card';
      card.innerHTML = `<img src="${car.img}" alt="${car.name}" /><div class="rotunda-alias">&ldquo;${car.alias}&rdquo;</div>`;
      ring.appendChild(card);
    });

    let radius = 320;
    const place = () => {
      const card = ring.querySelector('.rotunda-card');
      const cw = card ? card.offsetWidth || 0 : 0;
      radius = Math.max(240, (cw * ring.children.length) / (Math.PI * 2) * 1.14);
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

  /* ---------- LAUNCH \u2014 kwart-mijl dragrace ---------- */
  const gameApi = { pauseDash: null, resizeDash: null, pauseRed: null, resizeRed: null };

  function buildLaunch() {
    const canvas = document.getElementById('launchCanvas');
    const frame = document.querySelector('[data-game-frame]');
    const startOverlay = document.querySelector('[data-drag-start]');
    const overOverlay = document.querySelector('[data-drag-over]');
    const timeEl = document.querySelector('[data-drag-time]');
    const speedEl = document.querySelector('[data-drag-speed]');
    const gearEl = document.querySelector('[data-drag-gear]');
    const bestEl = document.querySelector('[data-drag-best]');
    const finalEl = document.querySelector('[data-drag-final]');
    const noteEl = document.querySelector('[data-drag-note]');
    if (!canvas || !frame) return;
    const c = canvas.getContext ? canvas.getContext('2d') : null;
    if (!c) return;

    let W = 0, H = 0, dpr = 1;
    let best = 0;
    try {
      const b = parseFloat(localStorage.getItem('mgDragBest') || '0');
      if (b > 0) best = b;
    } catch (e) {}
    if (bestEl) bestEl.textContent = best ? best.toFixed(2) + ' s' : '\u2014';

    let state = 'idle'; /* idle | tree | run | over */
    let rafId = null, visible = true;
    let holding = false;
    let frames = 0, treeT = 0, greenAt = 0, raceT = 0;
    let rpm = 1200, gear = 1, speed = 0, distance = 0;
    let launchMod = 1, launchModUntil = 0, weakUntil = 0, limiterUntil = 0, limiterWarned = false;
    let shiftFlash = 0, floaters = [], particles = [], launchQ = '';
    let ambers = [false, false, false], green = false;
    let ghostDist = 0, ghostT = 12.8, t100 = 0, t201 = 0, trap = 0;

    const REDLINE = 9000, IDLE = 1200;
    const GEARS = [0, 92, 152, 208, 258, 302, 344];
    const BASE = [0, 56, 43, 34, 27, 21, 16];
    const dt = 1 / 60;

    const py = () => H - H * 0.17;
    const carW = () => Math.max(46 * dpr, W * 0.13);
    const carH = () => carW() * 0.42;

    /* doorlopend motorgeluid: toonhoogte volgt de toeren */
    let engine = null;
    function engineStart() {
      if (!soundOn || engine) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        const o2 = ctx.createOscillator();
        o2.type = 'square';
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass';
        f.frequency.value = 700;
        const g = ctx.createGain();
        g.gain.value = 0.032;
        o.connect(f); o2.connect(f); f.connect(g); g.connect(ctx.destination);
        o.start(); o2.start();
        engine = { ctx: ctx, o: o, o2: o2, f: f, g: g };
      } catch (e) { engine = null; }
    }
    function engineRpm(r) {
      if (!engine) return;
      try {
        const w = 55 + (r / REDLINE) * 330;
        engine.o.frequency.value = w;
        engine.o2.frequency.value = w * 0.5;
        engine.f.frequency.value = 350 + (r / REDLINE) * 1600;
      } catch (e) {}
    }
    function engineStop() {
      if (!engine) return;
      try {
        engine.o.stop(engine.ctx.currentTime + 0.12);
        engine.o2.stop(engine.ctx.currentTime + 0.12);
        setTimeout(() => { try { engine.ctx.close().catch(() => {}); } catch (e) {} }, 260);
      } catch (e) {}
      engine = null;
    }

    function roundRect(x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function burst(x, y, n, color) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (1 + Math.random() * 4) * dpr;
        particles.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 26 + Math.random() * 18, size: (1.2 + Math.random() * 2.2) * dpr, color: color || '#e10600' });
      }
    }
    function smoke(x, y, n) {
      for (let i = 0; i < n; i++) {
        particles.push({ x: x + (Math.random() - 0.5) * carW() * 0.7, y: y, vx: (Math.random() - 0.5) * 1.4 * dpr, vy: -Math.random() * 1.1 * dpr, life: 30 + Math.random() * 26, size: (2.5 + Math.random() * 3.5) * dpr, color: 'rgba(200,200,205,0.5)' });
      }
    }

    function launchSound(kind) {
      if (!soundOn) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const t0 = ctx.currentTime;
        const o = ctx.createOscillator();
        o.type = 'square';
        o.frequency.setValueAtTime(kind === 'shift' ? 740 : kind === 'green' ? 880 : 300, t0);
        o.frequency.exponentialRampToValueAtTime(kind === 'shift' ? 980 : kind === 'green' ? 1320 : 180, t0 + 0.09);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.06, t0);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.12);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(t0);
        o.stop(t0 + 0.13);
        setTimeout(() => ctx.close().catch(() => {}), 220);
      } catch (e) {}
    }

    function hold() {
      if (state === 'run') {
        shiftAttempt();
      }
      holding = true;
    }

    function shiftAttempt() {
      if (gear >= GEARS.length - 1) return;
      if (rpm >= 7400) {
        gear++;
        if (rpm >= 8100 && rpm <= 8850) {
          shiftFlash = 26;
          speed = Math.min(GEARS[gear], speed + 3);
          floaters.push({ x: W / 2, y: py() - carH() - 26 * dpr, text: 'PERFECT', life: 40 });
        }
        launchSound('shift');
      } else {
        weakUntil = frames + 26;
        floaters.push({ x: W / 2, y: py() - carH() - 26 * dpr, text: 'TE VROEG', life: 36 });
      }
    }

    function rel() {
      holding = false;
    }

    const roadT = (m) => Math.min(1, m / 440);
    const roadY = (m) => H + (H * 0.34 - H) * roadT(m);
    const roadHalf = (m) => W * 0.455 * (1 - roadT(m) * 0.86);

    function step() {
      if (state === 'tree') {
        frames++;
        treeT++;
        ambers[0] = treeT >= 30;
        ambers[1] = treeT >= 90;
        ambers[2] = treeT >= 150;
        if (ambers[0] && treeT === 30) launchSound('amber');
        if (ambers[1] && treeT === 90) launchSound('amber');
        if (ambers[2] && treeT === 150) launchSound('amber');
        if (holding) rpm = Math.min(REDLINE, rpm + 95);
        else rpm = Math.max(IDLE, rpm - 130);
        engineRpm(rpm);
        if (holding && rpm > 8200 && frames % 4 === 0) smoke(W * 0.63, py() + 4 * dpr, 2);
        if (treeT >= greenAt) {
          green = true;
          launchSound('green');
          if (rpm > 7400) { launchQ = 'WHEELSPIN'; launchMod = 0.55; launchModUntil = frames + 60; floaters.push({ x: W / 2, y: py() - 60 * dpr, text: 'WHEELSPIN', life: 44 }); }
          else if (rpm >= 5200) { launchQ = 'PERFECT'; launchMod = 1.18; launchModUntil = frames + 180; floaters.push({ x: W / 2, y: py() - 60 * dpr, text: 'PERFECT LAUNCH', life: 50 }); }
          else { launchQ = 'TE TRAAG'; launchMod = 0.35; launchModUntil = frames + 45; floaters.push({ x: W / 2, y: py() - 60 * dpr, text: 'TE TRAAG', life: 40 }); }
          state = 'run';
        }
      } else if (state === 'run') {
        frames++;
        raceT++;
        const mod = launchMod && frames < launchModUntil ? launchMod : 1;
        const weak = frames < weakUntil ? 0.6 : 1;
        const limited = frames < limiterUntil ? 0.15 : 1;
        const atLimit = speed >= GEARS[gear] - 0.1;
        if (!atLimit) {
          if (holding) speed += BASE[gear] * mod * weak * limited * dt;
          else speed = Math.max(0, speed - (7 + speed * 0.03) * dt);
        } else {
          speed = GEARS[gear] - 0.1;
          if (holding && !limiterWarned) {
            limiterUntil = frames + 16;
            limiterWarned = true;
            floaters.push({ x: W / 2, y: py() - carH() - 24 * dpr, text: 'LIMITER', life: 30 });
          }
        }
        if (gear < GEARS.length - 1 || speed < GEARS[gear] - 0.2) limiterWarned = holding && speed >= GEARS[gear] - 0.2;
        const gmin = GEARS[gear - 1], gmax = GEARS[gear];
        rpm = Math.max(IDLE, Math.min(REDLINE, IDLE + ((speed - gmin) / (gmax - gmin)) * (REDLINE - 1300)));
        engineRpm(rpm);
        distance += (speed / 3.6) * dt;
        if (!t100 && speed >= 100) t100 = raceT / 60;
        if (!t201 && distance >= 201) t201 = raceT / 60;

        if (launchQ === 'WHEELSPIN' && speed < 70) smoke(W * 0.63, py() + 4 * dpr, 2);
        if (holding && speed > 30 && frames % 3 === 0) burst(W * 0.63 - carW() * 0.5, py() + 6 * dpr, 2, speed > 220 ? 'rgba(255,255,255,0.75)' : '#e10600');

        ghostDist = 402 * Math.pow(Math.min(1, (raceT / 60) / ghostT), 0.92);
        if (shiftFlash > 0) shiftFlash--;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy; p.life--;
          if (p.life <= 0) particles.splice(i, 1);
        }
        for (let i = floaters.length - 1; i >= 0; i--) {
          floaters[i].y -= 0.9 * dpr;
          floaters[i].life--;
          if (floaters[i].life <= 0) floaters.splice(i, 1);
        }

        if (frames % 5 === 0) {
          if (timeEl) timeEl.textContent = (raceT / 60).toFixed(2) + ' s';
          if (speedEl) speedEl.textContent = Math.floor(speed) + ' km/h';
          if (gearEl) gearEl.textContent = String(gear);
        }

        if (distance >= 402) {
          trap = speed;
          ghostDist = 402;
          const t = raceT / 60;
          state = 'over';
          holding = false;
          engineStop();
          const ghostDelta = t - ghostT;
          let txt = t.toFixed(2) + ' s';
          if (!best || t < best) {
            best = t;
            txt += ' \u2014 nieuw record';
            try { localStorage.setItem('mgDragBest', String(best)); } catch (e) {}
            if (bestEl) bestEl.textContent = best.toFixed(2) + ' s';
          }
          if (finalEl) finalEl.textContent = txt;
          if (noteEl) {
            noteEl.textContent = 'Start: ' + launchQ + ' \u00b7 0\u2013100: ' + (t100 ? t100.toFixed(2) + ' s' : '\u2014') +
              ' \u00b7 201 m: ' + (t201 ? t201.toFixed(2) + ' s' : '\u2014') +
              ' \u00b7 trap: ' + Math.floor(trap) + ' km/h \u00b7 spookauto: ' +
              (ghostDelta <= 0 ? '-' : '+') + Math.abs(ghostDelta).toFixed(2) + ' s';
          }
          floaters.push({ x: W / 2, y: py() - 80 * dpr, text: ghostDelta <= 0 ? 'JE WINT!' : 'SPOOKAUTO WINT', life: 90 });
          if (overOverlay) {
            overOverlay.hidden = false;
            if (!reduceMotion) {
              anime({ targets: overOverlay, opacity: [0, 1], duration: 350, easing: 'easeOutQuad' });
            }
          }
        }
      }
      draw();
      rafId = state === 'run' || state === 'tree' ? requestAnimationFrame(step) : null;
    }

    function drawCar(x, gw, color, wheelSpin) {
      const gh = gw * 0.42;
      const y = py();
      const bob = shiftFlash > 0 ? Math.sin(shiftFlash) * 2 * dpr : (limitedActive() ? Math.sin(frames * 1.8) * 1.6 * dpr : 0);
      c.save();
      c.translate(x, y + bob);
      c.fillStyle = 'rgba(0,0,0,0.55)';
      roundRect(-gw / 2 + 3 * dpr, -gh * 0.35, gw, gh, gh * 0.34);
      c.fill();
      c.fillStyle = color;
      roundRect(-gw / 2, -gh, gw, gh, gh * 0.34);
      c.fill();
      c.fillStyle = 'rgba(0,0,0,0.55)';
      roundRect(-gw * 0.3, -gh * 0.82, gw * 0.6, gh * 0.34, 3 * dpr);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.9)';
      c.fillRect(-gw * 0.38, -gh * 0.16, gw * 0.18, 2.4 * dpr);
      c.fillRect(gw * 0.2, -gh * 0.16, gw * 0.18, 2.4 * dpr);
      c.fillStyle = '#141418';
      c.beginPath(); c.arc(-gw * 0.3, 0, gh * 0.26, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.arc(gw * 0.3, 0, gh * 0.26, 0, Math.PI * 2); c.fill();
      if (wheelSpin) {
        c.strokeStyle = 'rgba(255,255,255,0.8)';
        c.lineWidth = 2 * dpr;
        c.strokeRect(-gw / 2 - 4 * dpr, -gh - 4 * dpr, gw + 8 * dpr, gh + 8 * dpr);
      }
      c.restore();
    }
    function limitedActive() { return state === 'run' && frames < limiterUntil; }

    function draw() {
      c.clearRect(0, 0, W, H);
      c.fillStyle = '#0b0b0e';
      c.fillRect(0, 0, W, H);

      const vx = W / 2, vTop = H * 0.34;
      c.fillStyle = '#121215';
      c.beginPath();
      c.moveTo(W * 0.09, H);
      c.lineTo(W * 0.36, vTop);
      c.lineTo(W * 0.64, vTop);
      c.lineTo(W * 0.91, H);
      c.closePath();
      c.fill();

      c.strokeStyle = 'rgba(225,6,0,0.65)';
      c.lineWidth = 2.5 * dpr;
      c.shadowColor = 'rgba(225,6,0,0.4)';
      c.shadowBlur = 7 * dpr;
      c.beginPath(); c.moveTo(W * 0.09, H); c.lineTo(W * 0.36, vTop); c.stroke();
      c.beginPath(); c.moveTo(W * 0.91, H); c.lineTo(W * 0.64, vTop); c.stroke();
      c.shadowBlur = 0;

      c.strokeStyle = 'rgba(255,255,255,0.16)';
      c.lineWidth = 1.6 * dpr;
      c.setLineDash([18 * dpr, 30 * dpr]);
      c.beginPath();
      c.moveTo(vx, H);
      for (let i = 1; i <= 10; i++) {
        const t = i / 10;
        c.lineTo(vx, H + (vTop - H) * t);
      }
      c.stroke();
      c.setLineDash([]);

      const markRows = [402, 301, 201, 100];
      markRows.forEach((m) => {
        const y = roadY(m);
        const half = roadHalf(m);
        c.strokeStyle = 'rgba(255,255,255,0.14)';
        c.lineWidth = 1.4 * dpr;
        c.beginPath(); c.moveTo(vx - half, y); c.lineTo(vx + half, y); c.stroke();
        c.fillStyle = 'rgba(255,255,255,0.4)';
        c.font = '600 ' + Math.round(9 * dpr) + 'px "Space Grotesk", sans-serif';
        c.textAlign = 'left';
        c.fillText(m + ' m', vx + half + 4 * dpr, y + 3 * dpr);
      });

      for (let m = Math.max(0, Math.floor(distance / 50) * 50 - 50); m < distance + 420; m += 50) {
        const t = roadT(m);
        if (t <= 0.001 || t >= 1) continue;
        const y = roadY(m);
        const half = roadHalf(m);
        c.fillStyle = 'rgba(225,6,0,0.8)';
        c.beginPath(); c.arc(vx - half - 5 * dpr, y, 2.2 * dpr, 0, Math.PI * 2); c.fill();
        c.beginPath(); c.arc(vx + half + 5 * dpr, y, 2.2 * dpr, 0, Math.PI * 2); c.fill();
      }

      {
        const y = roadY(402);
        const half = roadHalf(402);
        const sq = Math.max(5, half / 6);
        for (let i = 0; i < 8; i++) {
          c.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.75)' : 'rgba(20,20,22,0.9)';
          c.fillRect(vx - half + i * sq, y - sq / 2, sq, sq);
        }
      }

      if (distance > 30) {
        const y = roadY(Math.min(439, distance));
        const half = roadHalf(Math.min(439, distance));
        c.strokeStyle = 'rgba(225,6,0,0.85)';
        c.lineWidth = 2 * dpr;
        c.beginPath(); c.moveTo(vx - half, y); c.lineTo(vx + half, y); c.stroke();
      }

      ambers.forEach((on, i) => {
        const lx = W / 2 + (i - 1) * 26 * dpr;
        c.beginPath();
        c.arc(lx, vTop - 66 * dpr, 9 * dpr, 0, Math.PI * 2);
        c.fillStyle = on ? 'rgba(230,150,10,0.95)' : 'rgba(60,60,64,1)';
        if (on) { c.shadowColor = 'rgba(230,150,10,0.6)'; c.shadowBlur = 10 * dpr; }
        c.fill();
        c.shadowBlur = 0;
      });
      if (green) {
        c.beginPath();
        c.arc(W / 2, vTop - 40 * dpr, 11 * dpr, 0, Math.PI * 2);
        c.fillStyle = 'rgba(20,220,90,0.95)';
        c.shadowColor = 'rgba(20,220,90,0.7)';
        c.shadowBlur = 14 * dpr;
        c.fill();
        c.shadowBlur = 0;
      }

      if (ghostDist > 2 && ghostDist < 440) {
        const y = H + (vTop - H) * Math.min(1, ghostDist / 440);
        const gw = carW() * (1 - Math.min(1, ghostDist / 440) * 0.55);
        c.save();
        c.translate(W * 0.33, y);
        const gh = gw * 0.42;
        c.fillStyle = 'rgba(0,0,0,0.4)';
        roundRect(-gw / 2 + 2 * dpr, -gh * 0.35, gw, gh, gh * 0.34);
        c.fill();
        c.fillStyle = '#2c2c33';
        roundRect(-gw / 2, -gh, gw, gh, gh * 0.34);
        c.fill();
        c.fillStyle = 'rgba(148,148,156,0.75)';
        c.fillRect(-gw * 0.38, -gh * 0.16, gw * 0.18, 2.2 * dpr);
        c.fillRect(gw * 0.2, -gh * 0.16, gw * 0.18, 2.2 * dpr);
        c.restore();
      }

      if (speed > 150 && (state === 'run')) {
        c.fillStyle = 'rgba(255,255,255,0.3)';
        for (let i = 0; i < 9; i++) {
          const h2 = (6 + ((i * 53 + frames * 11) % 26)) * dpr;
          c.fillRect(W * 0.06 + ((i * 37) % Math.max(1, W * 0.1)), H * 0.4 + i * H * 0.06, 2 * dpr, h2);
          c.fillRect(W * 0.93 - ((i * 29) % Math.max(1, W * 0.1)), H * 0.42 + i * H * 0.055, 2 * dpr, h2);
        }
      }

      drawCar(W * 0.63, carW(), '#e10600', shiftFlash > 10);

      if (state === 'run' || state === 'over') {
        const ahead = distance - ghostDist;
        c.font = '700 ' + Math.round(11 * dpr) + 'px "Space Grotesk", sans-serif';
        c.textAlign = 'center';
        c.fillStyle = ahead >= 0 ? 'rgba(20,220,90,0.85)' : 'rgba(255,255,255,0.55)';
        c.fillText((ahead >= 0 ? '+' : '\u2212') + Math.abs(ahead).toFixed(0) + ' m vs spookauto', W * 0.33, H * 0.36);
      }

      const bw = W * 0.74, bx = (W - bw) / 2, by = H - 22 * dpr, bh = 9 * dpr;
      c.fillStyle = 'rgba(255,255,255,0.08)';
      c.fillRect(bx, by, bw, bh);
      const winStart = bx + (5200 / REDLINE) * bw, winEnd = bx + (7400 / REDLINE) * bw;
      c.fillStyle = 'rgba(20,220,90,0.5)';
      c.fillRect(winStart, by, winEnd - winStart, bh);
      const shiftStart = bx + (8100 / REDLINE) * bw;
      c.fillStyle = 'rgba(225,6,0,0.55)';
      c.fillRect(shiftStart, by, bx + bw - shiftStart, bh);
      const fx = bx + (rpm / REDLINE) * bw;
      c.fillStyle = rpm >= 8100 ? '#ffffff' : '#e10600';
      c.fillRect(fx - 1.6 * dpr, by - 3 * dpr, 3.2 * dpr, bh + 6 * dpr);
      c.fillStyle = 'rgba(255,255,255,0.55)';
      c.font = '600 ' + Math.round(9.5 * dpr) + 'px "Space Grotesk", sans-serif';
      c.textAlign = 'left';
      c.fillText('TOEREN', bx, by - 6 * dpr);
      c.fillText(Math.round(rpm) + ' rpm', bx, H - 22 * dpr);
      c.textAlign = 'right';
      c.fillText('SHIFT', bx + bw, by - 6 * dpr);
      c.fillStyle = '#ffffff';
      c.font = '700 ' + Math.round(30 * dpr) + 'px "Anton", sans-serif';
      c.fillText(String(gear), W - 14 * dpr, vTop - 52 * dpr);
      c.fillStyle = 'rgba(255,255,255,0.4)';
      c.font = '600 ' + Math.round(9 * dpr) + 'px "Space Grotesk", sans-serif';
      c.fillText('VERSNELLING', W - 14 * dpr, vTop - 38 * dpr);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        c.globalAlpha = Math.max(0, Math.min(1, p.life / 34));
        c.fillStyle = p.color;
        c.fillRect(p.x, p.y, p.size, p.size);
      }
      c.globalAlpha = 1;

      c.textAlign = 'center';
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        c.globalAlpha = Math.max(0, Math.min(1, f.life / 30));
        c.fillStyle = f.text === 'PERFECT' || f.text === 'PERFECT LAUNCH' || f.text === 'JE WINT!' ? 'rgba(20,220,90,0.95)' : '#ffffff';
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
      draw();
    }
    resize();
    window.addEventListener('resize', resize);
    gameApi.resizeDash = resize;

    function start() {
      frames = 0; treeT = 0; raceT = 0;
      rpm = IDLE; gear = 1; speed = 0; distance = 0;
      launchMod = 1; launchModUntil = 0; weakUntil = 0; limiterUntil = 0; limiterWarned = false;
      shiftFlash = 0; floaters = []; particles = [];
      ambers = [false, false, false]; green = false; launchQ = '';
      ghostDist = 0; t100 = 0; t201 = 0; trap = 0;
      ghostT = best ? best * 1.02 : 12.8;
      greenAt = Math.floor(195 + Math.random() * 60);
      if (timeEl) timeEl.textContent = '0.00 s';
      if (speedEl) speedEl.textContent = '0 km/h';
      if (gearEl) gearEl.textContent = '1';
      if (startOverlay) startOverlay.hidden = true;
      if (overOverlay) overOverlay.hidden = true;
      state = 'tree';
      engineStart();
      engineRpm(rpm);
      if (rafId === null && visible) rafId = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        visible = en.isIntersecting;
        if (!visible && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        } else if (visible && (state === 'run' || state === 'tree') && rafId === null) {
          rafId = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.12 });
    io.observe(frame);

    window.addEventListener('keydown', (e) => {
      if (e.key !== ' ' && e.code !== 'Space') return;
      if (state === 'idle' || state === 'over') return;
      e.preventDefault();
      if (e.repeat) { holding = true; return; }
      hold();
    });
    window.addEventListener('keyup', (e) => {
      if (e.key !== ' ' && e.code !== 'Space') return;
      rel();
    });
    canvas.addEventListener('pointerdown', (e) => {
      if (state === 'idle' || state === 'over') return;
      e.preventDefault();
      hold();
    });
    window.addEventListener('pointerup', () => { rel(); });
    window.addEventListener('blur', () => { rel(); });

    const goBtn = document.querySelector('[data-drag-go]');
    const againBtn = document.querySelector('[data-drag-again]');
    if (goBtn) goBtn.addEventListener('click', start);
    if (againBtn) againBtn.addEventListener('click', start);

    gameApi.pauseDash = () => {
      if (state !== 'run' && state !== 'tree') return;
      state = 'idle';
      holding = false;
      engineStop();
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      if (startOverlay) startOverlay.hidden = false;
      if (overOverlay) overOverlay.hidden = true;
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
      ['FERRARI LAFERRARI', '\u201cRosso Apex\u201d \u00b7 V12 \u00b7 963 PK', 'assets/cars/card-rosso.jpg'],
      ['AUDI RS6', '\u201cPhantom\u201d \u00b7 V8 biturbo \u00b7 600 PK', 'assets/cars/card-phantom.jpg'],
      ['BMW M4', '\u201cNighthawk\u201d \u00b7 R6 biturbo \u00b7 510 PK', 'assets/cars/card-nighthawk.jpg'],
      ['FORD MUSTANG GT', '\u201cHeritage\u201d \u00b7 V8 5.0 \u00b7 460 PK', 'assets/cars/card-heritage.jpg'],
      ['BUGATTI CHIRON', '\u201cArctic Ghost\u201d \u00b7 W16 \u00b7 1500 PK', 'assets/cars/card-arctic.jpg'],
      ['AUDI R8', '\u201cNachtvogel\u201d \u00b7 V10 \u00b7 620 PK', 'assets/cars/card-r8.jpg'],
      ['PORSCHE 911 GT3', '\u201cFlat Six\u201d \u00b7 flat-6 \u00b7 510 PK', 'assets/cars/card-gt3.jpg'],
      ['LAMBORGHINI HURAC\u00c1N', '\u201cOrkaan\u201d \u00b7 V10 \u00b7 640 PK', 'assets/cars/card-huracan.jpg']
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
      if (foundEl) foundEl.textContent = found + ' / 8';
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
        deck.push({ i: i, name: f[0], sub: f[1], img: f[2] });
        deck.push({ i: i, name: f[0], sub: f[1], img: f[2] });
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
        back.innerHTML = '<img src="' + card.img + '" alt="" loading="lazy"><strong></strong><i></i>';
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
        if (found === 8) setTimeout(win, 500);
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
      ['buildLaunch', buildLaunch],
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
