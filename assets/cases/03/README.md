# Case 03 — Designing to sell — asset handoff

Naming/sizing convention for all case pages: see `assets/README.md`. This file only
tracks what's specific to case 03.

## Status: fully wired

| Filename | Slot | Native size |
|---|---|---|
| `case03-hero.mp4` | Section 01, hero media | 2140×1314 |
| `case03-hero-poster.jpg` | Hero video poster | 2140×1314 |
| `case03-scenario01.png` | Walker step 1 | 1477×831 |
| `case03-scenario02.png` | Walker step 2 | 1238×699 |
| `case03-scenario03.png` | Walker step 3 | 1410×801 |
| `case03-builttolisten.png` | "Product judgement" block, section 05 | 1760×1085 |
| `case03-feelslikeaproduct.png` | "Craft" block, section 05 | 1760×1085 |

All display at native aspect ratio — no cropping, no `object-fit: cover` anywhere on
this page. See `assets/README.md` for the sizing rules these follow.

Total weight of the seven files: ~5.5MB. The hero video is 2.0MB; `case03-builttolisten.png`
is the next-largest at 2.4MB and would be the first candidate to compress further if
the page needs to come down.

## The hero video

The original screen recording (`source/hero-prototype-source.mov`, 36.5MB, 2140×1314,
60fps, no audio) doesn't loop cleanly as a straight cut — it opens on a three-app
overview and ends on an unrelated lead-capture form. `case03-hero.mp4` bakes in a
0.4s fade-to-black at both the start and the loop point so the cut reads as
deliberate. Re-encoded H.264, `crf 26`, no audio, 2.0MB. Poster exported from the
encoded video at t=1.0s (a fully-populated frame, not mid-transition).

## The walker

Three landscape screenshots (~16:9, within 1% of each other in ratio), shown one at a
time at native proportions inside a frame sized from the narrowest of the three (see
`.walker-frame` in `case-03.html` and the exception noted in `assets/README.md` §A2).
Advancing steps changes only the visible image and the caption text — the rail, frame
box, and controls never move.

## Content note

`case02-2.png` (its original filename before this convention existed) is genuinely
case-03 content — the production-planning calendar with the shift-detail panel and
the part pre-order warning — despite the misleading name. Identified by opening the
file and matching what it showed, not by trusting the filename. Once renamed to
`case03-scenario02.png`, the naming convention took over normally.
