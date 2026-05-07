# Portfolio26 - Agent Instructions

## Project context

Portfolio26 is a static portfolio website for Carlotta Tonini, a design student.

The project uses HTML, CSS and JavaScript.
The user works on Windows with PyCharm.

Main sections:
- ABOUT / homepage
- AUDIOVISUAL
- GRAPHIC DESIGN
- CV
- project subpages inside AUDIOVISUAL or GRAPHIC DESIGN

## General rule

Do not rebuild the website from scratch.

Preserve the existing HTML, CSS and JS structure as much as possible.
Modify only what is necessary to fix:
- layout alignment;
- spacing;
- responsive behavior;
- image proportions;
- gutters;
- font loading;
- menu behavior;
- internal links;
- visual consistency with the existing pages.

Do not change:
- existing text content unless explicitly requested;
- image filenames;
- class names;
- folder structure;
- existing links unless they are wrong;
- JavaScript unless it is necessary.

If a path must be changed, explain why.

## Visual consistency

Use the existing ABOUT and AUDIOVISUAL pages as visual references for:
- header position;
- “CARLOTTA TONINI” logo;
- centered page/navigation label;
- hamburger size and position;
- hamburger behavior;
- font sizes;
- bottom/side alignment logic.

All project subpages must follow the same macro-layout:
1. full-screen hero;
2. header overlaid on the hero;
3. project title overlaid at bottom-left of the hero;
4. concept section below the hero;
5. main text block shifted to the right;
6. serif question below the text;
7. image grid with consistent gutters.

## Layout guides

Reference desktop viewport: 1920x1080.

Use responsive CSS variables based on these approximate guides:

- top navbar guide: 110px from top;
- left/right page guide: 110px from sides;
- project title bottom guide: 110px from bottom of hero;
- blue guide: 444px from left;
- green guide: 846px from left;
- desktop image gutter: 20px.

Use responsive units:
- clamp();
- vw;
- vh;
- svh;
- max-width;
- aspect-ratio;
- object-fit.

Avoid rigid absolute pixel layouts that break across screen sizes.

Suggested variables:

```css
:root {
  --page-margin-x: clamp(24px, 5.73vw, 110px);
  --nav-top: clamp(28px, 5.5vw, 110px);
  --project-title-bottom: clamp(42px, 10.18vh, 110px);

  --guide-yellow: var(--page-margin-x);
  --guide-blue: clamp(120px, 23.125vw, 444px);
  --guide-green: clamp(220px, 44.06vw, 846px);

  --grid-gutter: clamp(12px, 1.04vw, 20px);

  --logo-x: var(--guide-yellow);
  --hamburger-right: var(--guide-yellow);

  --hero-height: 100svh;

  --concept-x: var(--guide-yellow);
  --text-x: var(--guide-green);
  --question-x: var(--guide-blue);

  --section-padding-top: clamp(52px, 7vh, 90px);
  --section-padding-bottom: clamp(56px, 8vh, 110px);
}
Hero rules

The first image of each project subpage must be a full-screen hero.

The hero must:

occupy the first viewport;
use 100svh;
start at the very top of the page;
sit behind the header;
not leave a white band above;
not deform the image.

Use this structure when compatible with the existing HTML:

<section class="hero">
  <img class="hero-image" src="..." alt="">

  <header class="header">
    <a class="logo" href="...">CARLOTTA TONINI</a>
    <a class="navigate-through" href="...">NAVIGATE THROUGH</a>

    <button class="hamburger" type="button" aria-label="Open navigation menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <h1 class="project-title">Project Title</h1>
</section>

The hero image should use:

.hero {
  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100svh;
  object-fit: cover;
  display: block;
}
Header rules

Header elements:

left: CARLOTTA TONINI;
center: NAVIGATE THROUGH;
right: hamburger.

The header must be overlaid on the hero.
It must not create a white band above the hero.

The NAVIGATE THROUGH link must point to the correct parent section:

audiovisual project subpage → ../audiovisual.html;
graphic design project subpage → ../graphic_design.html.

Always check the actual folder depth before changing href paths.

Project title

The project title must:

be overlaid on the hero;
sit bottom-left;
align with the left page guide;
not appear below the hero;
not appear inside the concept text section.
Concept section

Below the hero, create or preserve a section like:

<section class="project-info">
  <div class="concept-label">CONCEPT</div>

  <div class="project-copy">
    <p>...</p>
  </div>

  <blockquote class="project-question">
    ...
  </blockquote>
</section>

Rules:

CONCEPT aligned left on the yellow guide;
main body text shifted right on the green guide;
serif question below, aligned around the blue guide;
body text uses Proxima Nova Light;
question uses Instrument Serif.
Image grid

Do not redesign the project image grid unless necessary.

Only fix:

vertical spacing;
horizontal spacing;
gutters;
overlaps;
inconsistent white space;
image proportions;
responsive breakpoints.

Desktop gutter should be 20px, implemented through:

--grid-gutter: clamp(12px, 1.04vw, 20px);

Images must not be stretched or deformed.

Fonts

Fonts are local and stored in:

Portfolio26/fonts

Use:

Proxima Nova Regular;
Proxima Nova Light;
InstrumentSerif-Regular.

Do not use Google Fonts or external CDNs.

Always check the CSS file depth before setting @font-face paths.

Example if CSS is two levels below root:

@font-face {
  font-family: "Proxima Nova";
  src: url("../../fonts/ProximaNova-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Proxima Nova";
  src: url("../../fonts/ProximaNova-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Instrument Serif";
  src: url("../../fonts/InstrumentSerif-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
Hamburger menu

The hamburger must:

match ABOUT and AUDIOVISUAL visually;
stay top-right;
have three visible lines;
toggle .open on .hamburger;
toggle .open on .nav-menu;
close when clicking a nav link;
turn black when the menu is open;
otherwise remain coherent with the hero background.

If the current JS already works, do not modify it.

Required final response

After editing files, provide:

list of changed files;
short explanation of what changed;
variables that can be adjusted for final visual tuning;
paths that the user should manually verify;
any limitations or assumptions.

---

# 2. Prompt breve da dare a Codex per una singola sottopagina

Questo è quello che userei ogni volta dentro Codex.

```md
Adatta questa sottopagina di Portfolio26 seguendo le istruzioni di AGENTS.md.

## Task

Devi sistemare la sottopagina:

[INSERISCI PERCORSO HTML]
esempio:
audiovisual/magdeburg-weichnasmarkt/index.html

File CSS collegato:
[INSERISCI PERCORSO CSS]

File JS collegato, se presente:
[INSERISCI PERCORSO JS]

## Reference

Usa come riferimento visivo:
- ABOUT page;
- AUDIOVISUAL page;
- il PDF/render allegato;
- eventuale screenshot attuale allegato.

La pagina finale deve seguire il render/PDF.

## Obiettivo specifico

Correggi la sottopagina senza rifarla da zero.

La pagina deve avere:

1. hero iniziale full-screen;
2. header sovrapposto alla hero;
3. “CARLOTTA TONINI” in alto a sinistra;
4. “NAVIGATE THROUGH” al centro, cliccabile;
5. hamburger in alto a destra coerente con ABOUT/AUDIOVISUAL;
6. titolo progetto sovrapposto alla hero in basso a sinistra;
7. sezione CONCEPT sotto la hero;
8. testo principale più spostato verso destra;
9. domanda serif sotto il testo;
10. griglia immagini con gutter coerente e senza sovrapposizioni.

## Vincoli

Non cambiare testi, nomi immagini, classi o percorsi se non necessario.

Non usare font esterni.
Usa solo i font locali in `/fonts`.

Non deformare immagini.
Usa `object-fit: cover` dove serve.

Non modificare JS se l’hamburger funziona già.

Il link “NAVIGATE THROUGH” deve tornare alla pagina principale corretta:
- se è una sottopagina AUDIOVISUAL: `../audiovisual.html`;
- se è una sottopagina GRAPHIC DESIGN: `../graphic_design.html`;
ma controlla sempre la profondità reale della cartella.

## Controlli richiesti prima di concludere

Prima di terminare, verifica:

- la hero occupa il primo viewport;
- non c’è fascia bianca sopra la hero;
- il titolo progetto è sopra la hero in basso a sinistra;
- il titolo non è più sotto l’immagine;
- header, logo, centro e hamburger sono coerenti con ABOUT/AUDIOVISUAL;
- i font locali vengono caricati con percorsi corretti;
- il testo concept è spostato a destra;
- la griglia immagini non ha sovrapposizioni;
- il gutter desktop è circa 20px;
- il layout resta responsive;
- i link interni funzionano.

## Output

Modifica direttamente i file necessari.

Alla fine dammi:
1. elenco file modificati;
2. breve spiegazione delle modifiche;
3. variabili CSS principali da regolare manualmente;
4. percorsi font/immagini/link da ricontrollare;
5. eventuali problemi che non hai potuto verificare.