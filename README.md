# Mountaga Oumar Maiga — Portfolio

A single-page portfolio built around one idea: **from Bamako to the world.**

The page opens on Earth seen from space. The planet turns for two and a half
seconds, then the camera locks on, flies to Mali, descends to Bamako, and drops
a marker on the city — after which the site reveals itself.

The globe never leaves. It is mounted once, pinned behind the whole page, and
every section takes a turn pointing it somewhere: the work section pushes it far
back and out of the way, the journey brings it to the centre with the milestones
orbiting it, the reach section pulls right out and fires connection arcs from
Bamako to six cities. A caption over the planet always says what it is showing.
The globe is not decoration; it is the thread the page hangs off.

## Language

The site ships in **French**. English is a toggle in the header, remembered in
`localStorage` and picked up automatically for an English browser on a first
visit.

- `src/lib/i18n.ts` holds the language store. `useCopy()` returns `{ lang, c }`
  — the active language and every string in it.
- `src/data/copy.ts` is the dictionary. **French is written first and is the
  source of truth**; the English object is typed `satisfies typeof fr`, so a key
  added to one language and forgotten in the other fails the build.
- Data files carry `I18n` objects (`{ fr, en }`) per field rather than living in
  the dictionary, because their shape belongs to the item.

Metadata, the share card and the `lang` attribute the server sends are French:
that is what a crawler and a link preview see. Names of products, technologies
and cities are not translated.

Validation errors are **keys**, not sentences — the API route names the problem
and the client says it in the reader's language. The server has no business
deciding which language somebody reads.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS 3 |
| 3D | React Three Fiber 9, three.js, @react-three/drei |
| Motion | GSAP + ScrollTrigger, Lenis, Framer Motion |

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## How the globe works

The whole thing lives in `src/components/globe/`, and there are two parts worth
understanding: the targeting, and the hand-off.

### The hand-off

`src/lib/globe-director.ts` holds one table — `GLOBE_STOPS` — with a framing per
section: where the camera looks, how far out it sits, how far the frustum slides
so the planet clears the copy, how far back the whole thing fades, and the
caption to show. `SectionGlobeSync` decides which section owns the middle of the
viewport and claims its stop; `GlobeCamera` tweens between them.

Adding a section to the choreography is one entry in that table whose `id`
matches the section's `id`. Nothing else has to know the globe exists.

Sections can go further and draw the relationship instead of implying it. Drop a
`<GlobeAnchor sectionId="…" />` anywhere and `GlobeTether` runs a curved line
from it to Bamako on the planet behind, redrawn on scroll so it stays attached.
The journey uses one per milestone; the expertise section uses one per
discipline, on a sticky header so the line holds for the whole column. Lines are
suppressed on narrow screens, where the globe sits behind the copy rather than
beside it.

The binding measures on a throttled scroll event rather than using ScrollTrigger
or an IntersectionObserver. Both of those are delivered inside the browser's
rendering step, and this has to keep working when frames are being withheld — a
backgrounded tab being restored, a deep link landing mid-page.

### The targeting

The camera is expressed in the **globe's own frame** — `(lat, lon, distance)` —
rather than in world coordinates (`src/components/globe/GlobeCamera.tsx`).
Whatever `(lat, lon)` the camera sits above is exactly the point at the centre
of the frame, no matter how far the Earth has spun. Longitude is handled by the
globe's Y rotation, latitude by the camera's elevation, and the two never fight.

`src/lib/coordinates.ts` holds `latLonToVector3()`, which uses the exact
convention of `THREE.SphereGeometry` so a coordinate lands on the pixel of the
equirectangular texture that actually depicts it. Bamako's marker is at
12.6392° N, 8.0029° W because the maths puts it there, not because a position
was eyeballed.

**Camera states** — `INITIAL → ROTATING → ZOOMING_TO_MALI → ZOOMING_TO_BAMAKO → IDLE`.
The timeline is built once, on mount, and never replays. Only at `IDLE` does the
camera start obeying section stops, so scrolling during the intro cannot hijack
the flight — the first stop is simply applied when it lands.

**Mali is drawn, not photographed.** The NASA texture has no borders in it — at
any zoom it shows the Sahel, not a country. `MaliOutline` traces the real
national border on the globe surface from `mali-border.ts` (Natural Earth,
public domain), so the country stays legible however far a 2048px texture is
being stretched. Bamako was checked to fall inside that ring, so the outline and
the marker cannot disagree about where Mali is.

**Lighting.** The sun is parented to the Earth rather than the world, so daylight
is tied to geography and Bamako can never drift into night while somebody reads
the page. Its longitude is tweened across the intro instead: the terminator
sweeps west, which is what actually sells "the planet is turning".

Everything tunable is in `src/lib/globe-config.ts` — camera distances, timings,
spin rates, sun positions, per-device quality.

## Editing content

All copy and data are separate from the components, in `src/data/`:

| File | Holds |
|---|---|
| `site.ts` | name, role, email, social links, navigation, spoken languages, and `objectives` |
| `projects.ts` | the six projects: kicker, copy, stack, three metrics, result, links |
| `journey.ts` | timeline entries, each with its `highlights` — the actual work, not just the job title |
| `skills.ts` | every technology: discipline, area, 1–5 level, what it is used for, and which project stacks count as it |
| `services.ts` | the four stages and what each one delivers |
| `places.ts` | the six cities the connection arcs reach |
| `mali-border.ts` | Mali's national border, 76 points — generated, do not hand-edit |
| `worldDots.ts` | generated land grid for the fallback globe — do not hand-edit |

`site.whatsapp` accepts any formatting — the link strips everything but the
digits — and the WhatsApp entry disappears from every social list if you empty
it, rather than shipping a dead link.

Projects without a screenshot are expected: `image` is optional, and the card
draws its own frame with the title and stack rather than borrowing another
project's picture. Drop a file in `public/images/projects/` and set `image` when
you have one — Hombori and Sufitel are still waiting for theirs.

The NextGenStock shot was captured from the live site with headless Chrome:

```bash
chrome --headless=new --hide-scrollbars --window-size=1600,1900   --virtual-time-budget=14000 --screenshot=out.png <url>
```

then cropped to roughly the card's aspect so `object-cover` has nothing to trim.

## The profile section

Section 02 carries the presentation: the statement, what he does, and the
strengths from the CV.

`objectives` in `site.ts` is **empty on purpose** and the block does not render
until it has text. Career objectives are the one thing on this page that cannot
be derived from a CV or a repository, so they wait for his own words rather than
being invented.

## The expertise section

`skills.ts` is a flat list of technologies. Each one carries a `matches` array of
`projects.ts` stack entries, and the cards derive the work each tool was used on
from that — so a technology's credibility comes from a project that shipped
rather than from a number of years nobody can check. The four headline stats are
counted from the data too, so none of them can go stale.

Filters, the search box and the two discipline columns all work off the same
list. The discipline headers are sticky, which is also what keeps their line to
the globe on screen.

## The project carousel

`ProjectCarousel` is a depth carousel rather than a grid: the current project is
front and centre, its neighbours are turned away into the distance, and only the
front card is interactive. It takes drag, arrow keys, the pills above it, the
arrows and the dots below it, and it announces the current slide to screen
readers; non-current slides are `inert` and out of the accessibility tree.

The off-centre cards are translated well past the track, so the track clips its
own overflow — without that they stretch the document sideways.

Each project carries exactly three metrics (`projects.ts`). Keep them
defensible: they are read before the prose.

`status` drives the badge on the card and the dot colour in the pill row —
`live`, `production`, `prototype`, `completed` or `in-development`. Adding
work in progress is a data edit, nothing else.

## Navigation

A floating pill rather than a full-width bar: brand mark, name and tagline, a
divider, the section links, the social marks, the language toggle, and a curved
green panel carrying the primary action into the right-hand corner.

The curve is an SVG stretched with `preserveAspectRatio="none"`, so it holds its
shape at any width without a media query, and the pill's own `overflow-hidden`
trims it to the rounded corner. `BrandMark` is the favicon at 36px — a globe
reduced to a meridian, an equator and one green point.

**The pill has a width budget**, and things drop out of it in a deliberate
order as that budget tightens: the tagline and the surname go at `xl`, the
social marks at `xl`, and links plus burger switch together at `lg` so there is
never a width where the header offers neither the sheet nor the links. Nav
labels carry `whitespace-nowrap` — a wrapped label is the one failure here with
no graceful version. If you add a section, re-measure: at 1024 there is about
90px of slack, at 1440 about 45px with everything shown.

Every mark is decorative and hidden from assistive tech — the label lives on the
link that wraps it, in the reader's language.

`--nav-h` (96px) is the space the floating header occupies, not the height of
the pill. `scroll.ts` uses the same number so anchors land clear of it.

## Contact form

Messages go to `/api/contact` first, because that is where a real provider key
belongs:

- Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` and the route sends through
  Resend. Nothing secret reaches the browser.
- Leave them unset and the route replies `{ configured: false }`, and the client
  falls back to EmailJS, which is public-key by design.

Copy `.env.example` to `.env.local` and fill in whichever path you want. The
route also validates with the same Zod schema the form uses, rate-limits to four
messages per minute per IP, and silently swallows anything that fills the
honeypot field.

## Accessibility and motion

- `prefers-reduced-motion` skips the entire cinematic: the globe renders with
  Bamako already centred, the marker visible, and no scroll animations run.
- The opening flight has a wall-clock deadline. It runs on a frame loop, and a
  frame loop can be withheld; nothing downstream — the marker, the caption, the
  lines to each section — should be able to wait on it forever.
- Without WebGL, `GlobeFallback` draws the same planet as an orthographic dot
  map centred on Bamako — real geography, no GPU.
- Elements that animate in start hidden only once JavaScript confirms it can
  animate them, and a sweep in `SmoothScroll.tsx` reveals anything left stranded.
  A section losing its entrance animation is a far better failure than a section
  the visitor never sees. **`REVEAL_HOOKS` in `lib/animations.ts` lists every
  attribute a scroll animation hides an element behind** — add a new hook there
  or it escapes the net and can be stranded invisible.
- The mobile sheet scrolls (`overflow-y-auto`), because the body is locked while
  it is open: on a short screen the last row would otherwise sit below the fold
  with no way to reach it.
- The header is `pointer-events-none` so clicks pass through the space around
  the floating pill. **Anything rendered inside it has to opt back in** — the
  pill does, and so does the open mobile sheet.
- Skill levels carry a text alternative; nothing is communicated by colour alone.
- **Text colours are checked, not eyeballed.** The `ink` scale in
  `tailwind.config.ts` runs muted 9.6:1, faint 6.0:1, ghost 4.6:1 against the
  page background — every step clears the 4.5:1 minimum. An earlier scale
  bottomed out at 1.4:1, which is decoration pretending to be text; if you add a
  tone, measure it.
- `useMediaQuery` re-reads on `resize` as well as on the query's own `change`
  event. A `change` that fires while the document is not being rendered is
  simply lost, and the result is a layout stuck on the wrong breakpoint.

## Textures

`public/textures/earth/` holds NASA Blue Marble imagery (public domain, via the
three.js examples) at 2048px for desktop and 1024px for mobile, selected at
runtime in `globe-config.ts`.

## Performance

three.js, drei and the textures are behind `next/dynamic` with `ssr: false`, so
nothing 3D touches the server bundle or the first paint. The canvas now runs for
the whole page rather than just the hero, so the render loop stops the moment the
tab is hidden, and mobile gets fewer stars, lower-resolution textures, a lower
device pixel ratio and no pointer parallax. The section fade is opacity only — a
CSS blur on a full-viewport canvas would cost a filter pass every frame.
