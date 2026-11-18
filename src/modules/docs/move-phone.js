/* Butler Docs — move to a new phone (v29)
   Old phone: Profil → «Auf neues Telefon umziehen»: save a backup (with password), put it in iCloud Drive / AirDrop, share the app link.
   New phone: the very first screen («Wie dürfen wir Sie ansprechen?», core P6 / .tbset) gets «Vom alten Telefon übernehmen» —
   the core restore (Oz: file → password → confirm → everything replaced → reload) runs without making an empty profile first.
   After the reload a «Willkommen zurück» sheet shows what came over. The Face ID of the old phone (g.waId, a passkey of that
   device) is cleared, so the lock screen does not try it here; the sheet offers to set Face ID (if the password lock is on)
   or a password on this phone. The Tresor keeps its own password. The old phone keeps its data. */
const MV_S={or:['или','oder','or'],btn:['Перенести со старого телефона','Vom alten Telefon übernehmen','Move from the old phone'],
 btnS:['Выберите файл копии — все данные перейдут','Sicherungsdatei wählen – alle Daten kommen mit','Pick the backup file – all data comes along'],
 wH:['✓ С возвращением','✓ Willkommen zurück','✓ Welcome back'],wS:['Ваши данные со старого телефона здесь:','Ihre Daten vom alten Telefon sind da:','Your data from the old phone is here:'],
 docs:['Документы','Dokumente','Documents'],ctr:['Договоры','Verträge','Contracts'],ph:['Фото / страницы','Fotos / Seiten','Photos / pages'],bsv:['Ведомства и службы','Behörden & Dienste','Authorities & services'],
 ev:['Сроки и термины','Termine & Fristen','Appointments & deadlines'],vault:['Сейф','Tresor','Vault'],vEnc:['зашифрован ✓','verschlüsselt ✓','encrypted ✓'],
 loginH:['Вход на этом телефоне','Anmeldung auf diesem Telefon','Sign-in on this phone'],
 loginFace:['Face ID старого телефона здесь не действует. Настройте заново:','Die Face ID des alten Telefons gilt hier nicht. Bitte neu einrichten:','The old phone’s Face ID does not work here. Please set it up again:'],
 loginPw:['Защитите приложение на этом телефоне паролем:','Schützen Sie die App auf diesem Telefon mit einem Passwort:','Protect the app on this phone with a password:'],
 face:['Настроить Face ID','Face ID einrichten','Set up Face ID'],pw:['Задать пароль','Passwort festlegen','Set a password'],later:['Позже','Später','Later'],
 vNote:['Сейф открывается вашим прежним паролем сейфа.','Der Tresor öffnet sich mit Ihrem bisherigen Tresor-Passwort.','The vault opens with your previous vault password.'],
 cardH:['Перенос на новый телефон','Auf neues Telefon umziehen','Move to a new phone'],
 s1:['Здесь «Сохранить копию» (с паролем) — файл положите в iCloud Drive или отправьте по AirDrop.','Hier «Sicherung speichern» (mit Passwort) – die Datei in iCloud Drive ablegen oder per AirDrop senden.','Here «Save a backup» (with a password) – put the file in iCloud Drive or send it by AirDrop.'],
 s2:['На новом телефоне откройте ссылку в Safari → «Поделиться» → «На экран Домой».','Auf dem neuen Telefon den Link in Safari öffnen → Teilen → «Zum Home-Bildschirm».','On the new phone open the link in Safari → Share → «Add to Home Screen».'],
 s3:['Откройте приложение → «Перенести со старого телефона» → файл → пароль.','App öffnen → «Vom alten Telefon übernehmen» → Datei wählen → Passwort.','Open the app → «Move from the old phone» → pick the file → password.'],
 save:['Сохранить копию сейчас','Sicherung jetzt speichern','Save a backup now'],link:['Поделиться ссылкой на приложение','Link zur App teilen','Share the app link'],copied:['Ссылка скопирована ✓','Link kopiert ✓','Link copied ✓'],
 keep:['На старом телефоне данные остаются, пока вы сами их не удалите.','Das alte Telefon behält seine Daten, bis Sie sie dort löschen.','The old phone keeps its data until you delete it there.']};
const mvt=k=>cv5n(MV_S[k]||[k]);
const MV_K='bdocs-mvjust';
/* the flag survives the reload of the restore; only a fresh one (15 min) counts */
const mvJust=()=>{try{const t=+sessionStorage.getItem(MV_K)||0;return t&&Date.now()-t<15*6e4}catch{return!1}};
try{if(mvJust()&&g&&g.waId&&!(g.user&&g.user.needSetup)){g.mvFace=1;g.waId='';$()}}catch(e){Hooks.err('mvinit',e)}
/* 1) first screen */
function mvAdd(){const c=document.querySelector('.tbset .tbcard');if(!c||c.querySelector('.mvbtn'))return;const go=c.querySelector('.tbgo');if(!go)return;
 go.insertAdjacentHTML('afterend',`<div class="mvor"><span>${i(mvt('or'))}</span></div><button type="button" class="mvbtn"><span class="mvi">📲</span><span><b>${i(mvt('btn'))}</b><small>${i(mvt('btnS'))}</small></span></button>`);
 c.querySelector('.mvbtn').onclick=()=>{try{sessionStorage.setItem(MV_K,String(Date.now()))}catch{}document.documentElement.classList.add('mvon');try{Oz()}catch(e){Hooks.err('mvoz',e)}}}
new MutationObserver(()=>{try{if(document.querySelector('.tbset'))mvAdd();else document.documentElement.classList.remove('mvon')}catch{}}).observe(document.body,{childList:!0,subtree:!0});
/* 2) after the restore */
function mvWelcome(){try{sessionStorage.removeItem(MV_K)}catch{}const A=(Ke().items||[]).filter(Boolean),docs=A.filter(d=>!d.type&&d.title).length,ctr=A.filter(d=>d.type==='ins').length;
 let ph=0;A.forEach(d=>{ph+=(d.pages||[]).length+(d.files||[]).length});const bsv=(g.bsv&&g.bsv.items||[]).length,ev=(g.events||[]).length,vt=g.vault||{};
 const row=(l,v)=>`<div class="rlr"><span>${i(l)}</span><b>${i(String(v))}</b></div>`,lock=(()=>{try{return Gl()}catch{return!!g.pw}})();
 H(mvt('wH'),`<p class="fdsmall">${i(mvt('wS'))}</p><div class="rlbox">${row(mvt('docs'),docs)}${ctr?row(mvt('ctr'),ctr):''}${row(mvt('ph'),ph)}${row(mvt('bsv'),bsv)}${row(mvt('ev'),ev)}${vt.enc||(vt.items||[]).length?row(mvt('vault'),vt.enc?mvt('vEnc'):(vt.items||[]).length):''}</div>
  <p class="mvlh"><b>${i(mvt('loginH'))}</b><br>${i(mvt(lock?'loginFace':'loginPw'))}</p>
  <button type="button" class="dcadd gold" data-mv="${lock?'face':'pw'}">${i(mvt(lock?'face':'pw'))}</button><button type="button" class="btn rlfull" data-x="1">${i(mvt('later'))}</button>
  ${vt.enc?`<p class="fdsmall">${i(mvt('vNote'))}</p>`:''}`,sh=>{sh.classList.add('mvwel');sh.querySelector('[data-mv]').onclick=async e=>{const k=e.currentTarget.dataset.mv;sh.remove();delete g.mvFace;$();
   if(k==='face'){try{await L.st4fid()}catch(x){Hooks.err('mvface',x)}return}
   try{L.st4set()}catch(x){Hooks.err('mvpw',x)}}})}
Hooks.on('render',()=>{try{if(mvJust()&&m.logged&&g.user&&!g.user.needSetup&&!document.querySelector('.mvwel'))setTimeout(()=>{if(mvJust()&&!document.querySelector('.mvwel'))mvWelcome()},400)}catch(e){Hooks.err('mvwel',e)}});
/* 3) profile card on the old phone */
Hooks.on('profile',a=>{try{if(typeof a!=='string'||a.includes('class="card mvcard"'))return;const k=a.indexOf('class="card st53"');if(k<0)return;const e=a.indexOf('</section>',k);if(e<0)return;
 const st=n=>`<div class="mvst"><span>${n}</span><p>${i(mvt('s'+n))}</p></div>`;
 return a.slice(0,e+10)+`<section class="card mvcard"><h3 class="section-t">📲 ${i(mvt('cardH'))}</h3>${st(1)}${st(2)}${st(3)}<button type="button" class="dcadd gold" data-act="st53bk">${i(mvt('save'))}</button><button type="button" class="btn rlfull" data-act="mvlink">${i(mvt('link'))}</button><p class="fdsmall">${i(mvt('keep'))}</p></section>`+a.slice(e+10)}catch(x){Hooks.err('mvprof',x)}});
Hooks.act('mvlink',()=>{const u=location.origin+location.pathname.replace(/index\.html$/,'');try{if(navigator.share){navigator.share({title:'Butler Docs',url:u}).catch(()=>{});return}}catch{}try{navigator.clipboard.writeText(u).then(()=>T(mvt('copied')))}catch{}});
Hooks.css('docs-move-phone',`
html.mvon .dtsheet{z-index:10050!important}
.mvor{display:flex;align-items:center;gap:10px;margin:14px 0 10px;opacity:.7;font-size:13px}.mvor:before,.mvor:after{content:"";flex:1;height:1px;background:currentColor;opacity:.35}
.mvbtn{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:12px 14px;border-radius:14px;border:1.5px solid #C9A55E;background:transparent;color:inherit;font:inherit;cursor:pointer}
.mvbtn .mvi{font-size:26px;flex:none}.mvbtn b{display:block;font-size:16px;color:#F2DFB4}.mvbtn small{display:block;font-size:12.5px;opacity:.75;margin-top:2px}
.mvlh{margin:10px 0 6px;line-height:1.45;font-size:14.5px}
.mvcard .mvst{display:flex;gap:12px;margin:10px 0;align-items:flex-start}.mvcard .mvst span{flex:none;width:26px;height:26px;border-radius:50%;background:#c49a45;color:#fff;display:grid;place-items:center;font-weight:700;font-size:13px}
.mvcard .mvst p{margin:2px 0 0;line-height:1.45}.mvcard .dcadd{margin-top:8px}`);
