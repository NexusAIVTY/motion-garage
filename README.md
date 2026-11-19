# Motion Garage

Een cinematische automotive conceptwebsite, aangedreven door [anime.js v3](https://animejs.com/).

## Live

Geserveerd via GitHub Pages: **https://nexusaivty.github.io/motion-garage/**

## Wat er in zit

- **Grote beeldvullende autosecties** — fullscreen fotografie met scroll-parallax en vloeiend in-/uit-zoomen (scale gekoppeld aan scrollpositie).
- **Gesynchroniseerde tekst** — titels openen per letter, quotes per woord met blur, synchroon met de beelden via IntersectionObserver.
- **Interactieve prestaties** — geanimeerde tellers (vermogen, topsnelheid, acceleratie, koppel) en performance-balken.
- **Interactieve collectie** — 6 projectkaarten met hover-zoom, rode accentlijnen en click-to-open detailmodal met vloeiende overgangen.
- **Anime.js signature wall** — continu levend raster (rAF-engine) met ronddwarrelende rode energie-golven, muis-halo, klik-burst én cellen die de letters van "MOTION GARAGE" natekenen.
- **Cinematische hero-slices** — de hero-foto is in verticale stroken gesneden die zich montage-stijl van het midden uit samenstellen; replaybaar via de nav-knop.
- **F1-startlights ignition** — vijf startlichten die een-voor-een rood worden en bij "lights out" dwingen + performance-balken opnieuw doen exploderen.
- **Scroll-scrub woorden** — enorme outline-woorden ("GARAGE", "MOTION") die horizontaal meebewegen met scrollpositie.
- **Travelling shot "Camera langs de auto"** — Clio-stijl dolly: het scherm blijft staan en de camera glijdt over een 3.2K side-profile, met meereizende callouts, velocity-skew, zonsopgang-veil en slotkopregel.
- **3D-dieptecamera in de hero** — muisrotatie (rotateX/rotateY) met perspective, plus hero-titel met gemixted fill/outline (GARAGE in rode outline).
- **3D-rode grid-vloer** — oneindig lopende synthwave-vloer in perspectief onder de performance-statistieken.
- **Sleepbare 3D-rotonde** — cilinder-carrousel met zes auto's, autorotatie, drag met inertia en facing-based belichting (achterste kaarten dimmen).
- **3D modal-flip** — kaartmodal opent met een lichte rotateY-flip in perspective.
- **Concept & Design-secties** — "Gebouwd rond beleving" met feature-kaarten, en "Elk detail een reden" met langzaam draaiende rode design-ringen.
- **Replay intro** — nav-knop die de hero-intro opnieuw afspeelt.
- **Rustige composities** — mat zwart/donkergrijs, rood als enige accent, witte typografie, weinig maar krachtige beweging (plus `prefers-reduced-motion`-support).

## Structuur

```
index.html          — markup
css/style.css       — donker thema, rode accenten, reveals
js/main.js          — anime.js choreografie + scroll-engine + modal + signature grid
assets/cars/        — compressed automotive photography (Unsplash, free license)
```

## Runnen

Statische site, geen build stap:

```bash
python3 -m http.server 8080
```
