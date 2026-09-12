# 🌌 Sailor Solar System

A toddler-friendly, tap-to-explore 3D solar system built with three.js —
originally built as a birthday gift for a specific 3-year-old, generalized
here into a simple toy any kid can play with.

## What it is

- An interactive three.js solar system: Sun, all 8 planets, and the Moon,
  each orbiting and spinning, with a tap-to-select info card per body
- Every planet has its own original guardian character (name + emoji icon)
  and a couple of simple, toddler-friendly facts
- A little emoji cat mascot on the start screen
- A discovery/collection system (✨ x/10) that unlocks a celebration screen
  once every body has been found
- Fully bilingual (French/English), an original generative ambient
  soundtrack (Web Audio API, not sampled from anywhere), optional voice
  narration (off by default), and a "magic wand" button for cause-and-effect
  fun
- Designed for very young kids: big tap targets, no fail states, no reading
  required, simple one-button play

## Playing it

It's a static site, no build step. Open `index.html` directly, or serve the
folder with any static file server. three.js is bundled locally in `lib/`,
so the whole thing works offline.

**Live version:** hosted via GitHub Pages at the repo's Pages URL (see the
repo's "About" section on GitHub, or Settings → Pages).

> To enable Pages on this repo: Settings → Pages → Source → Deploy from a
> branch → `main` / `/(root)` → Save. GitHub will publish `index.html` at
> `https://<username>.github.io/<repo-name>/` within a minute or two.

## Tech

Plain HTML/CSS/JS, three.js (r128, bundled locally, no CDN dependency),
Web Audio API for music, Web Speech API for optional narration, procedurally
generated planet textures (canvas-based, no image assets at all).

## Credits / license

All art here is either procedurally generated in-code or emoji — no external
image assets, no third-party character IP. The code itself is free to reuse,
adapt, or build on for your own kid.
