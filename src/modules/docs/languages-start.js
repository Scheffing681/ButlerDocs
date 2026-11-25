/* ===== Butler Docs: languages for the start (v49) =====
   For the start in Germany eight languages are shown: Deutsch, English, Türkçe, Русский, Українська and (v79) Polski, Français, Español.
   The other eight (pl, fr, es, it, ro, bg, sr, hr) stay in the code with their dictionaries – they are only hidden
   from the language list and the sign-in screen. To show one again: add it to LGS_ON (and to tools/i18n-active.json
   so new texts are translated for it again). A phone in a hidden language starts in English. */
const LGS_ON=['de','en','tr','ru','uk','pl','fr','es'];
const LGS={moved:['Этот язык пока не входит в приложение – оно открыто на английском. Язык можно сменить в профиле.','Diese Sprache ist noch nicht in der App – sie ist jetzt auf Englisch. Die Sprache ändern Sie im Profil.','This language is not in the app yet – it is in English for now. You can change the language in the profile.']};
try{const keep=Xl.filter(([k])=>LGS_ON.includes(k));if(keep.length)Xl.splice(0,Xl.length,...keep)}catch(e){Hooks.err('lgsList',e)}
let lgsNote=0;
function lgsFix(){try{if(g.lang&&!LGS_ON.includes(g.lang)){g.lang='en';$();if(!lgsNote){lgsNote=1;setTimeout(()=>{try{v();T(cv5n(LGS.moved))}catch{}},400)}}}catch(e){Hooks.err('lgsFix',e)}}
lgsFix();Hooks.on('render',lgsFix);
