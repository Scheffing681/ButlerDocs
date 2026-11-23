#!/usr/bin/env bash
# Butler Docs – creates the iOS / Android projects and puts the NFC plugin in.
# Needs: Node 18+, internet (npm), for Android: Android Studio; for iOS: a Mac with Xcode.
# Usage:  cd native && bash setup.sh            (both)
#         bash setup.sh android | bash setup.sh ios
set -e
cd "$(dirname "$0")"
WANT="${1:-all}"
(cd .. && node build.js)
node copy-web.js
[ -d node_modules ] || npm install

if [ "$WANT" = all ] || [ "$WANT" = android ]; then
  [ -d android ] || npx cap add android
  J=android/app/src/main/java/de/silentium/butlerdocs
  mkdir -p "$J"
  cp plugin/android/ButlerNfcPlugin.java plugin/android/MainActivity.java "$J/"
  M=android/app/src/main/AndroidManifest.xml
  grep -q 'android.permission.NFC' "$M" || perl -0pi -e 's#<application#<uses-permission android:name="android.permission.NFC" />\n    <uses-feature android:name="android.hardware.nfc" android:required="false" />\n\n    <application#' "$M"
  G=android/app/build.gradle
  grep -q 'org.jmrtd' "$G" || awk -v add="$(cat plugin/android/gradle-dependencies.txt)" '{print} /^dependencies \{/ && !done {print add; done=1}' "$G" > "$G.new" && mv "$G.new" "$G"
  echo "Android: open with  npx cap open android"
fi

if [ "$WANT" = all ] || [ "$WANT" = ios ]; then
  if [ "$(uname)" != Darwin ]; then echo "iOS needs a Mac with Xcode – skipped"; else
    [ -d ios ] || npx cap add ios
    A=ios/App/App
    cp plugin/ios/ButlerNfcPlugin.swift plugin/ios/MainViewController.swift "$A/"
    cp plugin/ios/App.entitlements "$A/App.entitlements"
    P="$A/Info.plist"
    /usr/libexec/PlistBuddy -c "Add :NFCReaderUsageDescription string 'Butler Docs liest den Chip Ihres Ausweises oder Passes, um die Daten zu prüfen. Nichts verlässt das Telefon.'" "$P" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add :com.apple.developer.nfc.readersession.iso7816.select-identifiers array" "$P" 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add :com.apple.developer.nfc.readersession.iso7816.select-identifiers:0 string A0000002471001" "$P" 2>/dev/null || true
    S="$A/Base.lproj/Main.storyboard"
    sed -i '' 's#customClass="CAPBridgeViewController" customModule="Capacitor"#customClass="MainViewController" customModule="App" customModuleProvider="target"#' "$S" || true
    echo "iOS – still by hand in Xcode (npx cap open ios):"
    echo "  1. File › Add Package Dependencies › https://github.com/AndyQ/NFCPassportReader"
    echo "  2. Target App › Signing & Capabilities › + Near Field Communication Tag Reading; Code Signing Entitlements = App/App.entitlements"
    echo "  3. Add ButlerNfcPlugin.swift and MainViewController.swift to the target App (drag into Xcode if they are not listed)"
  fi
fi
npx cap sync
echo "done"
