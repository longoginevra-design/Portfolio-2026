# Case 01 — Designing to ship — asset handoff

Naming/sizing convention for all case pages: see `assets/README.md`. This file only
tracks what's specific to case 01.

## Status: hero wired, one of two possible decision-block crops wired

| Filename | Slot | Native size |
|---|---|---|
| `case01-hero-dark.jpg` | Hero, light/dark split — dark half | 1920×715 |
| `case01-hero-light.jpg` | Hero, light/dark split — light half | 1920×715 |
| `case01-designedforglovesandbadlight.png` | "Designed for gloves and bad light" block, section 04 | 1920×714 |

Both hero images are the same Cutting List → Single Cut execution screen, confirmed
identical at 1920×715 before wiring (checked by opening both, not by filename) — a
requirement of the light/dark split component, since a mismatched pair would read as
a rendering bug rather than a design decision.

## Present but not wired

| Filename | Native size | Why not used |
|---|---|---|
| `LightMode-Maintenance.png` | 1920×715 | Maintenance activity list + detail panel. Doesn't match either open decision-block slot (physical controls + screen; gloves/bad-light task screen). No caption in the current copy claims this screen. |
| `LightMode-Singlecut.png` | 1920×714 | Profile/cut-geometry diagram with dimension callouts. Same issue — no block argument it illustrates. |

Neither shows physical controls in frame, so the "01 · The interface isn't the
screen" block has no image and renders text-only, per spec (a decision block with no
matching asset stays text-only — no placeholder frame, unlike the hero).

Renaming these to the `case01-*` convention was deliberately skipped since they
aren't currently destined for any slot — renaming would imply a wiring commitment
that doesn't exist yet.

## The hero

Light/dark split via a transparent `<input type="range">` layered over two stacked
`<img>`s, clipped with `clip-path`. Degrades to a static 50/50 split with JS
disabled — no JS-set class hides either image. See `case-01.html`'s `.hero-split`
and the exception noted in `assets/README.md` §A2 is not needed here: both images
render at native `width:100%; height:auto`, no cropping, no forced ratio.
