# Portfolio26

Portfolio26 is a static portfolio website for Carlotta Tonini. It uses plain HTML, CSS and JavaScript, with no external font or UI dependencies.

## Project Structure

```text
Portfolio26/
├─ index.html
├─ audiovisual.html
├─ graphic_design.html
├─ cv.html
├─ pages/
│  ├─ audiovisual/
│  │  └─ project_slug/index.html
│  └─ graphic_design/
│     └─ project_slug/index.html
├─ assets/
│  ├─ documents/
│  ├─ fonts/
│  ├─ images/
│  │  ├─ audiovisual/
│  │  ├─ graphic_design/
│  │  └─ shared/
│  └─ videos/
│     └─ audiovisual/intro/
├─ css/
│  ├─ base/
│  │  ├─ reset.css
│  │  ├─ typography.css
│  │  └─ variables.css
│  ├─ components/
│  │  ├─ navbar.css
│  │  └─ video_modal.css
│  └─ pages/
│     ├─ about.css
│     ├─ audiovisual.css
│     ├─ graphic_design.css
│     ├─ cv.css
│     ├─ audiovisual/
│     └─ graphic_design/
└─ js/
   ├─ components/
   │  ├─ navbar.js
   │  └─ video_modal.js
   ├─ pages/
   │  ├─ about.js
   │  ├─ audiovisual.js
   │  ├─ graphic_design.js
   │  └─ audiovisual/
   └─ main.js
```

## Main Pages

- `index.html`: About / homepage.
- `audiovisual.html`: audiovisual project index with hover previews.
- `graphic_design.html`: graphic design project index with hover previews.
- `cv.html`: CV shell page.
- `assets/documents/CARLOTTA_TONINI_CV.pdf`: downloadable CV file.

## Shared CSS

- `css/base/typography.css`: local `@font-face` declarations for Proxima Nova and Instrument Serif.
- `css/base/reset.css`: neutral reset shared by all pages.
- `css/base/variables.css`: shared layout and typography variables.
- `css/components/navbar.css`: shared header, hamburger menu, side menu and scroll arrow styles.
- `css/components/video_modal.css`: shared YouTube hero-click modal styles for audiovisual project pages.

Page-specific CSS stays in `css/pages/`. Keep layout-specific collage, grid and hero overrides inside the relevant project CSS file to avoid changing other pages.

## Shared JavaScript

- `js/components/navbar.js`: hamburger menu open/close, nav link close behavior, navbar tone on scroll and project scroll arrow injection.
- `js/components/video_modal.js`: YouTube modal/lightbox opened by `.hero-video-trigger`.
- `js/pages/audiovisual.js`: audiovisual listing hover preview, including intro videos.
- `js/pages/graphic_design.js`: graphic design listing hover preview.
- `js/pages/audiovisual/polonia_2025.js`: Polonia hero video controls.

Project pages without custom behavior should not add empty JavaScript files.

## Adding an Audiovisual Project

1. Create `pages/audiovisual/new_project/index.html`.
2. Create `css/pages/audiovisual/new_project.css`.
3. Add images in `assets/images/audiovisual/new_project/`.
4. If the listing needs a hover video, add it in `assets/videos/audiovisual/intro/`.
5. Add a new `<li>` in `audiovisual.html`:
   - `href="pages/audiovisual/new_project/index.html"`
   - `data-bg="assets/images/audiovisual/new_project/preview.png"`
   - optional `data-video="assets/videos/audiovisual/intro/new_project_intro.mp4"`
6. In the project page, link shared CSS first, then the project CSS, then component CSS:

```html
<link rel="stylesheet" href="../../../css/base/reset.css">
<link rel="stylesheet" href="../../../css/base/typography.css">
<link rel="stylesheet" href="../../../css/base/variables.css">
<link rel="stylesheet" href="../../../css/pages/audiovisual/new_project.css">
<link rel="stylesheet" href="../../../css/components/video_modal.css">
<link rel="stylesheet" href="../../../css/components/navbar.css">
```

## Adding a Graphic Design Project

1. Create `pages/graphic_design/new_project/index.html`.
2. Create `css/pages/graphic_design/new_project.css`.
3. Add images in `assets/images/graphic_design/new_project/`.
4. Add a new `<li>` in `graphic_design.html`:
   - `href="pages/graphic_design/new_project/index.html"`
   - `data-bg="assets/images/graphic_design/new_project/preview.jpg"`
   - optional `data-bg-size` and `data-bg-position` if the preview crop needs tuning.

## Navigation Conventions

Main pages live at the root, so root links are:

- `index.html`
- `audiovisual.html`
- `graphic_design.html`
- `assets/documents/CARLOTTA_TONINI_CV.pdf`

Project pages are three levels deep, so their shared links usually start with `../../../`.

## YouTube Hero Modal

For an audiovisual project hero that opens YouTube on click:

1. Include `css/components/video_modal.css`.
2. Include `js/components/video_modal.js`.
3. Add `.hero-video-trigger` to the clickable hero button.
4. Set `data-youtube-id` and `data-youtube-title` on that button.

The modal is created by JavaScript at runtime.

## Naming

- Use lowercase snake_case for project slugs and CSS files.
- Keep asset filenames unchanged once referenced by HTML/CSS.
- Put shared behavior in `css/components` or `js/components`.
- Put page-only behavior in `css/pages` or `js/pages`.
