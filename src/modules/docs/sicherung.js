/* ===== Butler Docs: the backup password — first start (v55) =====
   Everything lives only on this phone, so the backup is the owner's insurance. Until now every backup asked for a
   password and also allowed «without password». Now:
   - once, after signing in (also for people who already use the app), a full screen asks for a backup password
     (at least 8 characters, typed twice, «I have written it down» ticked). It cannot be skipped;
   - then «Erste Sicherung speichern» or «Später»;
   - every backup (Profil, the reminder card, the line in «Dokumente») is encrypted with it without asking again;
     a backup without a password is no longer offered;
   - «Passwort ändern» (Profil → Datenschutz, under the backup) asks for the current one first.
   The password stays on this phone (localStorage, not in g — so it is never inside a backup or an export). Whoever can
   open the unlocked phone could read the documents anyway; the password protects the FILE that leaves the phone.
   The backup itself is the core one (photos and Tresor included, AES via yT), only without the question each time. */
const BKP_K='bd.bkpw';
const bkpGet=()=>{try{return localStorage.getItem(BKP_K)||''}catch{return''}};
const bkpSet=p=>{try{localStorage.setItem(BKP_K,p);return!0}catch{return!1}};
const bkpS={
 t:['Защитите резервную копию','Ihre Sicherung schützen','Protect your backup'],
 s1:['Всё хранится только на этом телефоне. Резервная копия вернёт всё — при потере, поломке или на новом телефоне.','Alles liegt nur auf diesem Telefon. Eine Sicherung holt alles zurück – bei Verlust, Defekt oder einem neuen Telefon.','Everything is only on this phone. A backup brings it all back – after loss, damage or on a new phone.'],
 s2:['Батлер шифрует каждую копию Вашим паролем: без него файл не откроет никто, даже мы.','Butler verschlüsselt jede Sicherung mit Ihrem Passwort: Ohne es kann niemand die Datei öffnen – auch wir nicht.','Butler encrypts every backup with your password: without it nobody can open the file – not even we.'],
 warn:['Запишите пароль на бумаге и положите к важным документам. Забыли пароль — копия потеряна.','Schreiben Sie das Passwort auf Papier und legen Sie es zu Ihren wichtigen Unterlagen. Passwort vergessen = Sicherung verloren.','Write the password on paper and keep it with your important papers. Password forgotten = backup lost.'],
 pw:['Пароль (не меньше 8 знаков)','Passwort (mindestens 8 Zeichen)','Password (at least 8 characters)'],pw2:['Повторите пароль','Passwort wiederholen','Repeat the password'],
 tip:['Например, три слова: Липа-Гавань-Кофе','Zum Beispiel drei Wörter: Linde-Hafen-Kaffee','For example three words: Linden-Harbour-Coffee'],
 paper:['Я записал(а) пароль','Ich habe das Passwort aufgeschrieben','I have written the password down'],
 set:['Установить пароль','Passwort festlegen','Set the password'],
 eMin:['Нужно не меньше 8 знаков','Mindestens 8 Zeichen','At least 8 characters'],eDiff:['Пароли не совпадают','Die Passwörter sind verschieden','The passwords differ'],
 ePaper:['Пожалуйста, сначала запишите пароль','Bitte schreiben Sie das Passwort zuerst auf','Please write the password down first'],
 ok:['Пароль установлен','Passwort festgelegt','Password set'],
 first:['Сохранить первую копию сейчас? Она попадёт в «Файлы» — лучше всего в iCloud Drive.','Jetzt die erste Sicherung speichern? Sie landet in «Dateien» – am besten in iCloud Drive.','Save the first backup now? It goes to «Files» – best into iCloud Drive.'],
 firstGo:['Сохранить первую копию','Erste Sicherung speichern','Save the first backup'],later:['Позже','Später','Later'],
 kept:['Пароль хранится на этом телефоне, чтобы копия делалась одним нажатием.','Das Passwort bleibt auf diesem Telefon, damit eine Sicherung mit einem Tipp geht.','The password stays on this phone so a backup takes one tap.'],
 chg:['Изменить пароль копии','Passwort der Sicherung ändern','Change the backup password'],cur:['Текущий пароль','Aktuelles Passwort','Current password'],
 eCur:['Текущий пароль неверен','Das aktuelle Passwort stimmt nicht','The current password is wrong'],
 chgOk:['Пароль изменён. Старые копии открываются старым паролем.','Passwort geändert. Ältere Sicherungen öffnen sich mit dem alten Passwort.','Password changed. Older backups open with the old password.'],
 lock:['Копии шифруются Вашим паролем','Sicherungen werden mit Ihrem Passwort verschlüsselt','Backups are encrypted with your password']};
const bkpt=k=>cv5n(bkpS[k]||[k,k,k]);
/* the backup — the core one, with the stored password instead of the question */
async function bkpRun(pw){const a=new Date,t=`silentium-${x(a)}.json`;try{T(C('bkBusy'));const n=await qz(),s=typeof KL=='function'?await KL():{};
 let o=JSON.stringify(Object.assign({},g,{_ph:n,_px:s}));o=await yT(o,pw);await hl(t,o);T(z(C('bkOk'),{n:Object.keys(n).length}))}catch(e){Hooks.err('bkprun',e);T(C('bkErr'))}}
hh=async function(){const pw=bkpGet();if(pw)return bkpRun(pw);bkpOpen(()=>{const p=bkpGet();p&&bkpRun(p)})};
/* the full screen: set the password (cannot be skipped) */
function bkpForm(cur){return`<form class="bkpf" autocomplete="off">${cur?`<label><span>${i(bkpt('cur'))}</span><input class="field" type="password" name="c" autocomplete="current-password"></label>`:''}
 <label><span>${i(bkpt('pw'))}</span><input class="field" type="password" name="a" autocomplete="new-password" minlength="8"></label>
 <label><span>${i(bkpt('pw2'))}</span><input class="field" type="password" name="b" autocomplete="new-password"></label>
 <small class="bkptip">💡 ${i(bkpt('tip'))}</small>
 <label class="bkpck"><input type="checkbox" name="p"> <span>${i(bkpt('paper'))}</span></label>
 <p class="bkperr" hidden></p><button type="submit" class="bkpgo">🔒 ${i(bkpt(cur?'chg':'set'))}</button></form>`}
function bkpCheck(f,cur){const er=f.querySelector('.bkperr'),bad=k=>{er.textContent=bkpt(k);er.hidden=!1;return null};
 if(cur&&f.c.value!==bkpGet())return bad('eCur');const a=f.a.value;if(a.length<8)return bad('eMin');if(a!==f.b.value)return bad('eDiff');if(!f.p.checked)return bad('ePaper');return a}
function bkpOpen(after){if(document.querySelector('.bkpov'))return;const ov=document.createElement('div');ov.className='bkpov';ov.setAttribute('role','dialog');
 ov.innerHTML=`<div class="bkpin"><div class="bkplock">🔒</div><h2>${i(bkpt('t'))}</h2><p>${i(bkpt('s1'))}</p><p>${i(bkpt('s2'))}</p><p class="bkpwarn">✍ ${i(bkpt('warn'))}</p>${bkpForm(!1)}<small class="bkpkept">${i(bkpt('kept'))}</small></div>`;
 document.body.appendChild(ov);const f=ov.querySelector('form');setTimeout(()=>{try{f.a.focus()}catch{}},80);
 f.onsubmit=ev=>{ev.preventDefault();const a=bkpCheck(f,!1);if(!a)return;bkpSet(a);g.bkpAt=Date.now();$();
  if(after){ov.remove();after();return}
  ov.querySelector('.bkpin').innerHTML=`<div class="bkplock ok">✓</div><h2>${i(bkpt('ok'))}</h2><p>${i(bkpt('first'))}</p><button type="button" class="bkpgo" data-bkp="go">⬇ ${i(bkpt('firstGo'))}</button><button type="button" class="bkplater" data-bkp="later">${i(bkpt('later'))}</button>`;
  ov.querySelector('[data-bkp=go]').onclick=()=>{ov.remove();bkpRun(a)};ov.querySelector('[data-bkp=later]').onclick=()=>{ov.remove();v()}}}
/* once after signing in, for everybody without a password */
Hooks.on('render',()=>{try{if(!m.logged||!g.user||g.user.needSetup||bkpGet()||document.querySelector('.bkpov,.en-wrap,#entrance'))return;bkpOpen(null)}catch(e){Hooks.err('bkpfirst',e)}});
/* change it: Profil → Datenschutz, under «Sicherung» */
Hooks.act('bkpchg',()=>{H(bkpt('chg'),`<p class="stnote" style="margin-top:0">✍ ${i(bkpt('warn'))}</p>${bkpForm(!0)}`,sh=>{const f=sh.querySelector('form');
 f.onsubmit=ev=>{ev.preventDefault();const a=bkpCheck(f,!0);if(!a)return;bkpSet(a);g.bkpAt=Date.now();$();sh.remove();T(bkpt('chgOk'),4200)}})});
/* the core draws «Datenschutz» itself, so the line is added after drawing */
Hooks.on('render',()=>{try{const r=document.querySelector('.pvbtns [data-act=bkrestore]');if(!r||document.querySelector('.bkpnote'))return;const n=document.createElement('p');n.className='bkpnote';
 n.innerHTML=`🔒 ${i(bkpt('lock'))} · <button type="button" class="trlink" data-act="bkpchg">${i(bkpt('chg'))}</button>`;r.parentElement.after(n)}catch(e){Hooks.err('bkppv',e)}});
Hooks.css('docs-sicherung',`
.bkpov{position:fixed;inset:0;z-index:9500;background:var(--bg,#f6f3ea);overflow-y:auto;padding:calc(env(safe-area-inset-top) + 24px) 22px calc(env(safe-area-inset-bottom) + 24px);font-family:-apple-system,"SF Pro Text",system-ui,sans-serif;color:var(--ink)}
.bkpin{max-width:460px;margin:0 auto;display:flex;flex-direction:column}
.bkplock{width:72px;height:72px;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:32px;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--green) 55%,#fff),var(--green));color:#fff;box-shadow:0 10px 24px color-mix(in srgb,var(--green) 35%,transparent)}
.bkpin h2{font-family:var(--serif,inherit);font-size:28px;text-align:center;margin:0 0 10px}.bkpin>p{font-size:15.5px;line-height:1.45;margin:0 0 10px}
.bkpwarn{background:#fdf3dd;border:1px solid #ecd39a;border-radius:14px;padding:10px 12px;color:#6b4a0b}
.bkpf{display:flex;flex-direction:column;gap:10px;margin-top:6px}.bkpf label{display:flex;flex-direction:column;gap:4px;font-size:13.5px;color:var(--muted)}.bkpf input.field{font-size:17px}
.bkptip{color:var(--muted);font-size:12.5px}
.bkpf label.bkpck{flex-direction:row;align-items:center;gap:10px;color:var(--ink);font-size:15px;padding:4px 0}.bkpck input{width:22px;height:22px;accent-color:var(--green)}
.bkperr{color:#b23b22;font-size:14px;margin:0}
.bkpgo{border:0;border-radius:18px;padding:15px;background:var(--green);color:#fff!important;font:inherit;font-weight:700;font-size:16px;margin-top:6px;cursor:pointer}
.bkplater{display:block;width:100%;text-align:center;border:0;background:none;color:var(--muted)!important;font:inherit;font-size:15px;padding:12px;cursor:pointer}
.bkpkept{display:block;text-align:center;color:var(--muted);font-size:12px;margin-top:14px;line-height:1.4}
.bkpnote{font-size:13px;color:var(--muted);margin:8px 0 0}.bkpnote .trlink{font-size:13px}
`);
