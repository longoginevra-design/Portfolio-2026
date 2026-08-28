# Asset convention (standing rules)

This applies to every case page. Once a filename follows this convention, wiring the
asset in requires no brief and no instructions — just the three steps in A3.

## A1. Naming is the instruction

Every asset filename encodes its destination. No mapping table, no per-file brief.

```
case{NN}-{slug}.{ext}
```

`{slug}` is the destination's title, lowercased, with spaces and punctuation stripped.

| Filename | Destination |
|---|---|
| `case03-hero.mp4` | Section 01, hero media |
| `case03-builttolisten.png` | Section 05 block titled *Built to listen, not to list* |
| `case03-feelslikeaproduct.png` | Section 05 block titled *Feels like a product, not a presentation* |
| `case03-scenario01.png` | Section 03 walker, step 1 |
| `case01-wherephysicalmeetsdigital.png` | Case 01 block of that title |

**Matching algorithm.** Slugify every section heading and block `h3` on the page the
same way — lowercase, strip everything that isn't a letter or digit — then match the
file's slug against that list. Prefix-match counts: `builttolisten` matches *Built to
listen, not to list*.

**On no match, or more than one match: report it and leave the placeholder.** Never
guess a destination. A misplaced image is worse than a visible placeholder.

Reserved slugs that aren't block titles: `hero`, `scenario01`, `scenario02`,
`scenario03`, `poster`.

Companion files use the parent slug plus a suffix: `case03-hero-poster.jpg`.

## A2. The proportions never change. Only the size does.

**The single rule:** an asset's aspect ratio is fixed and inviolable. An 18:9 file
stays 18:9. It may be displayed smaller than its native size, never at a different
ratio, and never cropped.

A crop throws away the part of the screen that proves the point. The screenshots are
the evidence — the whole frame is the evidence.

Consequences:
- No `object-fit: cover` on content media anywhere. Use `contain`, or no `object-fit`
  at all.
- No hardcoded `aspect-ratio` on a container holding a real asset — the one sanctioned
  exception is a multi-asset frame (like the case-03 walker) sized from the real,
  measured ratio of the assets it holds, combined with `object-fit: contain` so
  nothing crops. See `case-03.html`'s `.walker-frame` for the pattern.
- No fixed `width` *and* `height` in CSS on the same media element. One dimension is
  set, the other follows.
- The container adapts to the asset. Never the reverse.

**What "sensibly proportioned" means, concretely.** Scaling down is allowed and often
correct; the asset has to sit inside the page's rhythm rather than dominate it. Two
caps, and the smaller result wins:

| Cap | Value |
|---|---|
| Width | the content column it sits in — 820px in `.text`, 1140px in `.wide` |
| Height | 62vh for hero media, 78vh for anything else |

So a 2:1 landscape in `.wide` renders 1140 × 570 — under both caps, so full width. A
3:4 portrait would hit the height cap first and render about 585 wide, centred. Either
way the ratio is untouched.

**Never upscale.** If an asset's native width is below its column, cap at native and
centre it. A stretched screenshot looks worse than a small one.

```css
.media { display: block; max-width: 100%; height: auto; max-height: 78vh; }
.media-frame { border: 1px solid var(--gray-300); background: var(--gray-100); line-height: 0; }
```

`line-height: 0` on the frame removes the inline-descender gap that otherwise shows as
a hairline of background under every image.

## A3. Read each asset's dimensions once, write them into the HTML

No manifest, no JSON, no build step. When an asset is added, read its dimensions and
put the numbers in the tag. On this machine, `ffprobe`/`identify` (ImageMagick) are not
installed by default — `sips` covers images, and a real `ffmpeg`/`ffprobe` can be had
without Homebrew via `pip3 install imageio-ffmpeg` (bundles a static binary; find its
path with `python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"`).

```bash
sips -g pixelWidth -g pixelHeight assets/cases/03/case03-builttolisten.png   # images
ffprobe -v error -select_streams v:0 -show_entries stream=width,height \
  -of csv=p=0:s=x assets/cases/03/case03-hero.mp4                            # video
```

Then `width="1476" height="831"` on the element. The browser derives the ratio from
those two numbers and reserves exactly the right space before the file downloads,
which is what prevents the page reflowing as assets arrive.

These attributes do **not** force a display size — the CSS in A2 overrides both. They
only declare the ratio.

**When an asset is added, the whole procedure is:** read dimensions → match by slug →
write the standard media block below. Three steps, no tooling to keep in sync.

## A4. Standard media block

One markup pattern for every image on every case page:

```html
<figure class="media-frame rise">
  <img class="media" src="assets/cases/03/case03-builttolisten.png"
       width="1476" height="831" loading="lazy" decoding="async"
       alt="[one sentence describing what the screen shows]">
  <figcaption class="small">[optional caption]</figcaption>
</figure>
```

Alt text is always a real sentence describing the content. Never a filename, never
"screenshot".

`.media` / `.media-frame` are shared classes in `case.css` — defined once, used on
every case page.
