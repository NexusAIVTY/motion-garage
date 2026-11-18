# Motion Garage

Een cinematische automotive conceptwebsite, aangedreven door [anime.js v3](https://animejs.com/).

## Live

Geserveerd via GitHub Pages: **https://nexusaivty.github.io/motion-garage/**

## Wat er in zit

- **Grote beeldvullende autosecties** — fullscreen fotografie met scroll-parallax en vloeiend in-/uit-zoomen (scale gekoppeld aan scrollpositie).
- **Anatomische tekstsynchronisatie** — titels openen per letter, quotes per woord met blur, synchroon met de beelden via IntersectionObserver.
- **Interactieve prestaties** — geanimeerde tellers (vermogen, topsnelheid, acceleratie, koppel) en performance-balken.
- **Interactieve collectie** — 6 projectkaarten met hover-zoom, rode accentlijnen en click-to-open detailmodal met vloeiende overgangen.
- **Rustige composities** — mat zwart/donkergrijs, rood als enige accent, witte Bebas Neue-typografie, weinig maar krachtige beweging.

## Structuur

```
index.html          — markup
css/style.css       — donker thema, rode accenten, reveals
js/main.js          — anime.js choreografie + scroll-engine + modal
assets/cars/        — compacte JPEG's van de 6 auto's
```

## Runnen

Statische site, geen build stap:

```bash
python3 -m http.server 8080
```
