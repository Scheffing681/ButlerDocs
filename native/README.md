# Butler Docs – native app (App Store / Google Play)

The same web app (repo root) packed into an iOS / Android app with [Capacitor](https://capacitorjs.com).
Everything that works in the browser works in the app; the app adds what the browser does not allow.

| Feature | Browser | App |
|---|---|---|
| Documents, Mappen, MRZ check (camera) | ✓ | ✓ |
| Chip of passport / ID card / residence permit (NFC) | – (no NFC for web pages) | ✓ plugin `ButlerNfc` |

## What is here

- `capacitor.config.json` – app id `de.silentium.butlerdocs` (change before the first store upload if needed), web folder `www`.
- `copy-web.js` – copies the built web app into `www`.
- `setup.sh` – creates `android/` and `ios/`, copies the plugin, adds permissions and libraries.
- `plugin/android/ButlerNfcPlugin.java` – JMRTD: PACE (MRZ or CAN) or BAC, reads DG1 + SOD, checks the DG1 hash and the SOD signature (document signer certificate).
- `plugin/ios/ButlerNfcPlugin.swift` – NFCPassportReader: BAC/PACE with the MRZ key, reads DG1 + SOD; `passportDataNotTampered` / `passportCorrectlySigned`. CAN is not wired on iPhone yet.
- `src/modules/docs/chip.js` (web side) – shows «Chip lesen (NFC)» only when the plugin exists; otherwise «Chip (in der App)».

**Status: written, not compiled.** There was no Xcode / Android SDK where this was made. Build it once,
fix what the compiler reports, then test with a real passport and a real ID card.

## Build

1. `node build.js` in the repo root (setup.sh does it too).
2. `cd native && npm install && bash setup.sh android` – then `npx cap open android`, run on a phone with NFC.
3. On a Mac: `bash setup.sh ios`, then in Xcode:
   - File › Add Package Dependencies › `https://github.com/AndyQ/NFCPassportReader`
   - Target App › Signing & Capabilities › your team, «+ Near Field Communication Tag Reading», entitlements file `App/App.entitlements`
   - check that `ButlerNfcPlugin.swift` and `MainViewController.swift` belong to the target App
4. After every change of the web app: `npm run sync`.

## What the chip check means

- «Daten unverändert»: the hash of the data read from the chip matches the security object (SOD).
- «Signatur gültig»: the SOD is signed with the document signer certificate stored on the chip.
- Not checked yet: the chain up to the issuing country (CSCA master list). That would be the next step.
- It is **not** an official identification (that is the state eID / EUDI wallet). Nothing leaves the phone.

## Licences of the native libraries

- JMRTD – LGPL 3 (Android; used as a library, unchanged)
- SCUBA – LGPL 3
- Bouncy Castle – MIT-style
- NFCPassportReader – MIT (iOS)

Mention them in the app's «Lizenzen» page before release.

## Later in the app (not yet)

- Share to Butler from WhatsApp / Mail (iOS Share Extension, Android intent filter)
- Face ID / fingerprint through the system
- updates: the app ships a fixed copy of the web app – the «check for updates» button of the web version does not apply there
