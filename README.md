# Motion Garage

Een cinematische automotive conceptwebsite, aangedreven door [anime.js v3](https://animejs.com/).

**Make-over (v9)**: Anton display-letters + Space Grotesk, filmkorrel-overlay, editorial gidslijnen, verticale side-text, duotone-kaarten met rode hoek-tick, rotated rode marquee-band en bijgescherpte knoppen/labels. **v10**: Garage Dash game. **v11**: cache-busting (`?v=11` op CSS/JS), anime.js-stub-fallback bij CDN-falen, "Game"-link in de navigatie. **v12**: Garage Arcade — drie spelvarianten met tabbladen + anime.js-stub-policy. **v13**: Garage Dash vervangen door **Midnight Run**; Spec Match flips gerepareerd. **v14**: Midnight Run op zijn beurt vervangen door **APEX** — kronkelweg-racer (vrij sturen of touch-drag, de weg kronkelt sneller op tempo, "APEX +"-bonus bij het perfect snijden van bochten, NITRO/x2 power-ups, record `mgApexBest`); **Spec Match kaarten tonen nu echte autofoto's** (duotone-behandeld, kleurrijk bij match). **v15**: collectie en games gebruiken nu de **echte modelnamen** van de foto's (Ferrari LaFerrari, Audi RS6, BMW M4, Ford Mustang GT, Bugatti Chiron, Audi R8) met **aangegeven bijnamen** (rood, cursief, “Bijnaam: ‘…’”) op kaarten, in de rotonde, in de modal en in Spec Match; de dubbele LaFerrari-foto is vervangen door een unieke zwarte **Audi R8** (“Nachtvogel”); **APEX is pittiger**: bijna geen auto-centering meer, kleinere/nauwere kronkels (altijd eerlijk — maximale baandrift blijft onder de bestuurderssnelheid, ook met NITRO), smallere weg op hogere moeilijkheid, sneller tempo, **kegels** op de weg (1–2 van 3 stroken bezet, nooit alles dicht) en een strakkere, waardevollere APEX-bonus. **v16**: APEX vervangen door **LAUNCH** — kwart-mijl-dragrace tegen de klok (drie startlichten + groen, gas geven door SPATIE/het beeld ingedrukt te houden, toeren in het groene venster houden bij de start, loslaten + opnieuw indrukken om te verschalen; perfecte shifts/lichter, LIMITER- en WHEELSPIN-penalties, record in `mgDragBest`, 402 m). Drie nieuwe auto's met unieke najtfoto's: **Porsche 911 GT3** (“Flat Six”), **Lamborghini Huracán** (“Orkaan”) en **Dodge Challenger** (“Thunder”) — de collectie telt er nu negen, de 3D-rotonde draait met alle negen, en Spec Match groeide naar 8 paren (4×4). Elke auto heeft nu een “Wist je”-weetje in de detailmodal. **v17 (LAUNCH-upgrade)**: spookauto-rival op de linkerstrook (racet op je record-tempo, live m-voorsprong en uitslag), doorlopend motorgeluid waarvan de toonhoogte de toeren volgt (+ schakel/startlicht-blips), volledige tijdopname op de finish (starttype, 0–100, 201 m-split, trapsnelheid, verschil met de spookauto), LED-barrières langs de stroken, finishvlag, bandenrook bij burnout/wheelspin en trillingen op de limiter. **v18**: spatie scrolt niet meer de pagina af tijdens het spel — op het eindscherm start spatie (na 0,7 s) een nieuwe run, knipperende “houd gas in”-hint bij de startprocedure en **v19 (LAUNCH: car picker + realisme)**: de startoverlay heeft nu een **auto-garage** — kies een van de negen echte modellen (chip met foto, keuze bewaard in `mgDragCar`). Elke auto rijdt op **eigen fysica** afgeleid van de echte specs: topsnelheid per versnelling, acceleratie geschaald op de officiële 0–100, eigen toerenlimiet (van de 5800-telling van de Challenger tot 9000 van de GT3/LaFerrari), eigen lak op het raceveld en eigen motortoongebied. De alle start-/shift-drempels zijn nu **fracties van de eigen redline**. Het schakelsysteem is duidelijker: pulserende **SCHAKEL!**-prompt boven de auto, pulserend rood shift-venster in de toerenbalk, wit markervラ_TX-marker op het ideale schakelpunt en een tick-geluid zodra de meter het venster binnenloopt; perfecte shifts geven een uitlaatvlam, draaiende wielspaken en wheelspin-camera-shake; de tijdopname begint met het gekozen model.

## Live

Geserveerd via GitHub Pages: **https://nexusaivty.github.io/motion-garage/**

## Wat er in zit

- **Grote beeldvullende autosecties** — fullscreen fotografie met scroll-parallax, vloeiend in-/uit-zoomen én scroll-gedreven 3D-kanteling (rotateX-perspectief).
- **3D-detailkaarten** — feature-kaarten tilten in perspectief met de muis; performance-waarden openen met een rotateX-pop.
- **3D-dolly yaw** — tijdens de travelling shot kantelt de camera subtiel mee met de reis.
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
- **Preloader-intro** — "MOTION GARAGE" bouwt letter voor letter met rode laadbalk, en schakelt dan vloeiend door naar de hero-intro (met failsafe als het CDN niet reageert).
- **Sectie-HUD** — vaste rechterrail met indicatoren per sectie; actieve sectie gloeit rood, klik scrolt er naartoe; labels verschijnen bij hover.
- **Interactieve titelletters** — elke letter van sectie- en showcase-titels stuitert rood omhoog onder de cursor (animejs-stijl).
- **Cockpit-gauge** — halfronde rode krachtindex-buis met count-up, opnieuw opgeladen bij Ignition (grid-vloer versnelt dan tijdelijk mee).
- **Dolly speed-streaks** — rode lichtslierten die opduiken naarmate je sneller door de travelling shot scrolt.
- **Wand in 3D** — signature-wall cellen kantelen nu ook 3D (rotateX) op de energiegolf.
- **Collectie-flip** — kaarten flippen in 3D (rotateY) zodra ze in beeld schuiven.
- **Meer 3D-laagjes** — scrub-woorden draaien in een rotateY-perspectief mee, de cinema-quote tilt met de muis, de dolly rolt subtiel mee (rotateZ), de rotonde kantelt extra mee tijdens het slepen, spec-tiles en performance-chips hoppen in 3D bij hover, en de gauge stuurt in met een rotateX-entree.
- **Enginesound** — gesynthetiseerde WebAudio-rev (geen audiobestanden) bij lights-out, met een Geluid aan/uit-knop in de nav (keuze onthouden via localStorage).
- **Afwerking-configurator** — kies Rosso / Nero / Argento / Notte en de rotonde herschildert direct.
- **Slimme nav** — blur + dichtklap bij scrollen, actieve sectielink met rode streep.
- **Garage Dash game** — echte arcade-runner in canvas: 3 stroken, rode speler-auto, ontwijk obstakels, oplopende snelheid, afstand/snelheid/record-HUD (localStorage), pause buiten beeld, crash-shake + synth-geluid, pijltjes/A-D of tikken.
- **Meta & SEO** — Open Graph/Twitter-tags, favicon, theme-color.
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
