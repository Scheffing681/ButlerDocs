# Butler source

`app.js` is **built** from this folder — edit here, then run `node build.js`, never edit `app.js` by hand.

- `00-core.js` — the compressed base of the app (no original sources exist). Do not edit; new behaviour goes into modules.
- `modules/<topic>/` — every later update as readable code, grouped by topic.
- `order.txt` — the load order. Order matters (later modules wrap earlier ones):
  before moving a line, `node tests/overlap.js <a> <b>` must show no shared functions, listeners or styles.
- `99-end.js` — closes the app.

## Topics

| Folder | What is inside |
| --- | --- |
| `clocks/` | thirty more clocks; day-night map, sky and time, background, Galaxy, classic kits; light kits; clock faces |
| `seal/` | seal and signature |
| `today/` | «?» tour, Today, search across everything, Butler commands |
| `notes/` | notes and quick input (shopping, recipes, pantry and meal plan were removed in Butler Docs) |
| `affairs/` | manager of affairs: repeat, steps, promises, weekly review |
| `calendar/` | personal calendar: faiths, holidays, sky, setup |
| `home/` | own bottom bar and layout, home on one screen, builder and templates, folded templates |
| `signin/` | sign-in screen, Face ID, bottom pill, one «+» button |
| `sections/` | all sections, 9 sections, folders as on the iPhone, guard against unknown routes |
| `brand/` | brand design and the living sign |
| `iphone/` | screen edges, polish and back, app-mode bottom |
| `saved/` | saved entries stay visible |
| `scanner/` | the document scanner |
| `kits/` | ready-made style sets (hidden) |
| `backup/` | data protection, safety copy, restore the latest copy |
| `docs/` | Butler Docs: document home, Nachlass; `entrance.js` is the sign-in screen (10 designs, living clock, 4 icons, hold the clock 3 s to choose); `my-city.js` lets you type your city or postal code in the calendar region step; `steady-screen.js` keeps the iPhone app full-height after the keyboard and lets sheets slide in without a fade (no half see-through windows); `vault.js` is the Сейф (separate shelf; optional code → AES-256-GCM encryption of list, files, scanned text); `only-docs.js` keeps the app to the original plan (white list of screens, ▦ All sections, Deadlines, «+» with document actions); `behoerden.js` is «Behörden & Services» (only own entries: add from a letter, a pasted link or by hand with one smart field; Termin links, own buttons and numbers, secret numbers under the vault code); `behoerden-termine.js` adds Frist → Termin, Termin-Mappe, yearly duties and the links to calendar, «Сроки», search, Butler AI and Nachlass; `behoerden-briefe.js` reads scanned letters (deadline), hands German templates to the user's own «Briefe» editor, keeps Anträge and the journal of calls and proof; `finanzen.js` is «Finanzen» (Steuer-Mappe; banks → «Behörden & Dienste»); `layout-docs.js` makes «Anordnung und Farbe» set what Docs shows (home tiles order/visibility, home blocks, bottom bar with Docs places only) |

Removed in Butler Docs (step 2): the finance modules, shopping/recipes/pantry/meal plan, «Зеркало себя», the travel globe colours, the philosophy library texts (`books/`) and the health/fitness/Kakebo pictures. Butler keeps them.

## One connection point (Hooks)
New code does not wrap app functions any more. It plugs in through `Hooks` (`src/modules/hooks/registry.js`, installed last by `hooks/install.js`):
- `Hooks.on('screen'|'profile'|'signin', html=>html)` — change screen HTML
- `Hooks.on('route', r=>false)` — stop/redirect a route; `Hooks.on('render'|'save'|'file', ...)`
- `Hooks.act('name', fn)` — a button action (`data-act`); `Hooks.css('id', css)` — styles
Errors inside hooks never break the app; they are kept in `Hooks.errors` (localStorage `bh-errors`).
The robot fails if the number of old wrapper layers grows (`tests/wrappers-baseline.txt`).
