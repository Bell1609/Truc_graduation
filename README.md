# Happy Graduation · Trần Thanh Trúc

A responsive graduation invitation website for Trần Thanh Trúc at Ton Duc Thang University.

Built with plain HTML, CSS, and JavaScript. No framework or build step is required.

## Features

- Responsive graduation invitation page
- Countdown to October 23, 2026 at 10:00 (Vietnam time)
- Interactive poster effects and scroll animations
- Background music toggle
- Ceremony details, campus directions, and Google Maps link

## Run locally

Open `index.html` directly, or start a local server:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
├── tet.mp3
└── assets/
    ├── graduation-poster.png
    └── raw.png
```

## Customize

- Edit event content and links in [`index.html`](./index.html).
- Change the countdown date in [`script.js`](./script.js).
- Replace images in `assets/` and music in `tet.mp3`.
- Update colors and layout variables in [`style.css`](./style.css).

The countdown target uses Vietnam time (UTC+7):

```js
const target = new Date('2026-10-23T10:00:00+07:00').getTime();
```

## Deployment

This is a static website and can be deployed to GitHub Pages, Netlify, Vercel, or any static hosting service. Keep the relative file paths unchanged.
