# Butler Docs

The Silentium's Butler — Dokumente. A separate app next to Butler: documents, insurance, personal papers, calendar, tasks, banks, vault, book of life and estate.

- Own address and own home-screen icon (Butler Docs).
- Own data: every key is stored under the `bdocs:` prefix, own databases (`bdocs-*`) and own offline cache, so it never mixes with Butler on the same site.
- Built the same way as Butler: `node build.js`, `node tests/bump.js`, `node tests/smoke.js`.
- Only the original plan: `src/modules/docs/only-docs.js` closes every Butler part that is not about documents (wardrobe, fitness, health, places, growth, shopping, money planning…). Their data is not deleted.
- Сейф: `src/modules/docs/vault.js`. Without a code a separate shelf; with a code (4–8 digits) the list, files and scanned text of its documents are encrypted (PBKDF2 → AES-256-GCM). A forgotten code cannot be recovered.
- Behörden & Services: `src/modules/docs/behoerden.js` (home tile in place of «Aufgaben»; tasks stay in the calendar and in the bottom bar). Only the offices the user adds; emergency buttons 110 / 112 / 116 117, 115; per entry a Termin link, own buttons and links, numbers to copy, secret numbers (encrypted with the vault code), opening hours with «open now», route, for whom, pin, «on the home screen». Booking always happens on the office's own site. Prefilled addresses (63741 Aschaffenburg) are marked «bitte prüfen».
- Behörden stage 2: `src/modules/docs/behoerden-termine.js`. A document that runs out soon shows the office that renews it (Frist → Termin); «Termin eintragen» puts it into the calendar with a reminder the day before and a «Mitbringen» checklist plus documents from the app (Termin-Mappe); yearly duties; Termine and duties in «Сроки», on home, in search, in Butler AI (`Hooks.run('ask')` in `td9cmd`) and in Nachlass. Secret numbers never appear in search or in answers.
