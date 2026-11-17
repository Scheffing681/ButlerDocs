/* Butler Docs — reliability (v28)
   1) «Sicherung prüfen»: opens a backup (the latest one kept on this phone, or a file from «Dateien»), decrypts it if it has a
      password, and only COUNTS what is inside — documents, photos, Behörden, Termine, Tresor. Nothing on the phone is changed.
      A missing photo or a broken file is said plainly.
   2) The update bar (core Vk/pA, shown when a newer version is on the server) was there, but its text was dark on dark green
      (a later «.upbar{color:#2A1F0E}» in app.css) — practically invisible. Now it is readable, sits above the bottom bar and
      waits while a field is being typed in.
   3) One «Fehlerbericht»: the two old report buttons (core «Problem melden», tour «Fehler melden» with an empty address)
      become one sheet: version, screen, backup date, recent errors — no documents, no names. «Per E-Mail» opens the user's own
      mail, «Teilen …» the share sheet, «Kopieren» copies. The app sends nothing by itself. */
const RL_S={chk:['Проверить копию','Sicherung prüfen','Check a backup'],
 src:['Какую копию проверить?','Welche Sicherung prüfen?','Which backup to check?'],
 here:['Последняя копия на этом телефоне','Letzte Sicherung auf diesem Telefon','Latest backup on this phone'],
 file:['Выбрать файл в «Файлах» …','Datei in «Dateien» wählen …','Pick a file in Files …'],
 pw:['Пароль копии','Passwort der Sicherung','Backup password'],pwGo:['Открыть','Öffnen','Open'],pwBad:['Пароль не подходит','Passwort passt nicht','Wrong password'],
 busy:['Проверяю копию …','Sicherung wird geprüft …','Checking the backup …'],
 okH:['✓ Копия в порядке','✓ Sicherung ist in Ordnung','✓ The backup is fine'],
 warnH:['⚠ Копия неполная','⚠ Sicherung ist unvollständig','⚠ The backup is incomplete'],
 badH:['✕ Это не копия Butler Docs или файл повреждён','✕ Keine Sicherung von Butler Docs oder Datei beschädigt','✕ Not a Butler Docs backup, or the file is damaged'],
 made:['Создана %d','Erstellt am %d','Made on %d'],
 docs:['Документы','Dokumente','Documents'],ctr:['Договоры','Verträge','Contracts'],ph:['Фото / страницы','Fotos / Seiten','Photos / pages'],
 bsv:['Ведомства и службы','Behörden & Dienste','Authorities & services'],ev:['Сроки и термины','Termine & Fristen','Appointments & deadlines'],
 vault:['Сейф','Tresor','Vault'],vEnc:['зашифрован ✓','verschlüsselt ✓','encrypted ✓'],vNone:['пуст','leer','empty'],
 phone:['на телефоне: %n','auf dem Telefon: %n','on the phone: %n'],
 miss:['Не хватает %n фото — в копии их нет. Сохраните новую копию.','%n Fotos fehlen in der Sicherung. Bitte neue Sicherung speichern.','%n photos are missing from the backup. Please save a new one.'],
 brk:['%n фото повреждены.','%n Fotos sind beschädigt.','%n photos are damaged.'],
 older:['В копии меньше документов, чем на телефоне — она старая. Сохраните новую.','Die Sicherung hat weniger Dokumente als das Telefon – sie ist älter. Bitte neue speichern.','The backup has fewer documents than the phone – it is older. Please save a new one.'],
 only:['Только проверено — ваши данные не изменены.','Nur geprüft – Ihre Daten wurden nicht verändert.','Only checked – your data was not changed.'],
 save:['Сохранить новую копию','Neue Sicherung speichern','Save a new backup'],done:['Готово','Fertig','Done'],
 rep:['Отчёт об ошибке','Fehlerbericht','Error report'],
 repS:['Будет отправлено только техническое — без документов и имён. Отправляете вы сами, через свою почту.','Gesendet werden nur technische Angaben – keine Dokumente, keine Namen. Sie senden selbst, über Ihre E-Mail.','Only technical details are sent – no documents, no names. You send it yourself, from your own mail.'],
 repPh:['Что случилось? (по желанию)','Was ist passiert? (optional)','What happened? (optional)'],
 shot:['Снимок экрана: нажмите боковую кнопку и громкость вверх, потом приложите его в письме.','Bildschirmfoto: Seitentaste + Lauter drücken und es dann an die E-Mail anhängen.','Screenshot: press the side button + volume up, then attach it to the mail.'],
 mail:['Отправить по e-mail (ваша почта)','Per E-Mail senden (Ihre E-Mail)','Send by e-mail (your mail)'],share:['Поделиться …','Teilen …','Share …'],copy:['Скопировать','Kopieren','Copy'],copied:['Скопировано ✓','Kopiert ✓','Copied ✓'],
 subj:['Butler Docs — отчёт об ошибке','Butler Docs – Fehlerbericht','Butler Docs – error report'],
 errs:['Ошибки (7 дней)','Fehler (letzte 7 Tage)','Errors (last 7 days)'],none:['нет','keine','none'],
 ver:['Версия','Version','Version'],scr:['Экран','Ansicht','Screen'],dev:['Устройство','Gerät','Device'],bk:['Копия','Sicherung','Backup'],mode:['Запуск','Start','Mode'],
 home:['с экрана «Домой»','vom Home-Bildschirm','from the Home Screen'],tab:['в браузере','im Browser','in the browser']};
const rlt=(k,o)=>{let s=cv5n(RL_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const rlWhen=ts=>{try{return new Date(ts).toLocaleString(he(),{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}catch{return''}};
/* ---------- 1) Sicherung prüfen ---------- */
function rlAnalyze(o){if(!o||typeof o!=='object'||o.v!==1)return{bad:1};const ph=o._ph&&typeof o._ph==='object'?o._ph:{},keys=new Set(Object.keys(ph));
 const A=(o.arc&&Array.isArray(o.arc.items)?o.arc.items:[]).filter(Boolean),docs=A.filter(d=>!d.type&&d.title),ctr=A.filter(d=>d.type==='ins');
 const ref=new Set();A.forEach(d=>{(d.pages||[]).forEach(p=>{const id=p&&(typeof p==='string'?p:p.id);if(id)ref.add(id)});(d.files||[]).forEach(f=>{const id=f&&(typeof f==='string'?f:f.id);if(id)ref.add(id)})});
 let miss=0;ref.forEach(id=>{if(!keys.has(id))miss++});let brk=0;keys.forEach(k=>{const x=ph[k];if(typeof x!=='string'||!/^data:[^,]{3,},/.test(x)||x.length<80)brk++});
 const vt=o.vault&&typeof o.vault==='object'?o.vault:{};let now=0;try{now=Ke().items.filter(d=>d&&!d.type&&d.title).length}catch{}
 return{bad:0,ts:o.bkTs||o.ts||0,docs:docs.length,ctr:ctr.length,ph:keys.size,miss,brk,bsv:(o.bsv&&Array.isArray(o.bsv.items)?o.bsv.items.length:0),ev:Array.isArray(o.events)?o.events.length:0,
  vault:vt.enc?'enc':Array.isArray(vt.items)?vt.items.length:0,now,older:now>docs.length}}
function rlShow(r,name,size){const row=(l,v,s)=>`<div class="rlr"><span>${i(l)}</span><b>${i(String(v))}${s?`<small>${i(s)}</small>`:''}</b></div>`;
 if(r.bad){H(rlt('chk'),`<div class="rlres bad"><h4>${i(rlt('badH'))}</h4><p>${i(name||'')}</p></div><p class="fdsmall">${i(rlt('only'))}</p><button type="button" class="dcadd gold" data-x="1" data-act="st53bk">${i(rlt('save'))}</button>`);return}
 const warn=r.miss||r.brk||r.older,mb=!size?'':size>=1048576?(size/1048576).toFixed(1).replace('.',',')+' MB':Math.max(1,Math.round(size/1024))+' KB';
 H(rlt('chk'),`<div class="rlres ${warn?'warn':'ok'}"><h4>${i(rlt(warn?'warnH':'okH'))}</h4><p>${i([name,mb].filter(Boolean).join(' · '))}${r.ts?'<br>'+i(rlt('made',{d:rlWhen(r.ts)})):''}</p></div>
  <div class="rlbox">${row(rlt('docs'),r.docs,rlt('phone',{n:r.now}))}${r.ctr?row(rlt('ctr'),r.ctr):''}${row(rlt('ph'),r.ph)}${row(rlt('bsv'),r.bsv)}${row(rlt('ev'),r.ev)}${row(rlt('vault'),r.vault==='enc'?rlt('vEnc'):r.vault||rlt('vNone'))}</div>
  ${r.miss?`<p class="rlw">${i(rlt('miss',{n:r.miss}))}</p>`:''}${r.brk?`<p class="rlw">${i(rlt('brk',{n:r.brk}))}</p>`:''}${r.older?`<p class="rlw">${i(rlt('older'))}</p>`:''}
  <p class="fdsmall">${i(rlt('only'))}</p>${warn?`<button type="button" class="dcadd gold" data-x="1" data-act="st53bk">${i(rlt('save'))}</button>`:`<button type="button" class="btn rlfull" data-x="1">${i(rlt('done'))}</button>`}`)}
async function rlOpen(text,name){let t=null;try{t=JSON.parse(text)}catch{}if(!t){rlShow({bad:1},name);return}
 const go=o=>{let r;try{r=rlAnalyze(o)}catch(e){Hooks.err('rlanalyze',e);r={bad:1}}rlShow(r,name,text.length)};
 if(!t['silentium-enc']){go(t);return}
 H(rlt('pw'),`<form class="kbsheetf rlpw"><input class="field" type="password" name="a" autocomplete="current-password"><p class="wdwarn" hidden data-rlbad>${i(rlt('pwBad'))}</p><button class="dcadd gold" type="submit">${i(rlt('pwGo'))}</button></form>`,sh=>{const f=sh.querySelector('form');setTimeout(()=>f.a.focus(),60);
  f.onsubmit=async e=>{e.preventDefault();try{const s=await fL(t,f.a.value);sh.remove();go(JSON.parse(s))}catch{sh.querySelector('[data-rlbad]').hidden=!1}}})}
function rlPick(){const e=document.createElement('input');e.type='file';e.accept='.json,application/json';e.onchange=async()=>{const f=e.files&&e.files[0];if(!f)return;T(rlt('busy'));try{rlOpen(await f.text(),f.name)}catch(x){Hooks.err('rlpick',x);rlShow({bad:1},f.name)}};e.click()}
const rlKv=()=>new Promise(res=>{try{const r=indexedDB.open('bdocs-core',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onerror=()=>res(null);
 r.onsuccess=()=>{try{const q=r.result.transaction('kv','readonly').objectStore('kv').get('K');q.onsuccess=()=>res(q.result||null);q.onerror=()=>res(null)}catch{res(null)}}}catch{res(null)}});
Hooks.act('rlcheck',async()=>{const k=await rlKv();if(!k||!k.data){rlPick();return}
 H(rlt('chk'),`<p class="fdsmall">${i(rlt('src'))}</p><button type="button" class="rlsrc" data-rl="k"><small>${i(rlt('here'))}</small><b>${i(rlWhen(k.ts))}</b><span>${i(k.name||'')}${k.enc?' · 🔒':''}</span></button><button type="button" class="btn rlfull" data-rl="f">${i(rlt('file'))}</button>`,sh=>{
  sh.querySelector('[data-rl=k]').onclick=()=>{sh.remove();rlOpen(k.data,k.name)};sh.querySelector('[data-rl=f]').onclick=()=>{sh.remove();rlPick()}})});
Hooks.on('profile',a=>{try{if(typeof a!=='string'||a.includes('data-act="rlcheck"'))return;const k=a.indexOf('data-act="st53bk"');if(k<0)return;const e=a.indexOf('</button>',k)+9;
 return a.slice(0,e)+`<button type="button" class="btn rlchk" data-act="rlcheck">✓ ${i(rlt('chk'))}</button>`+a.slice(e)}catch(e){Hooks.err('rlprof',e)}});
/* ---------- 3) one Fehlerbericht ---------- */
function rlErrs(){const out=[],wk=Date.now()-7*864e5;try{(Hooks.errors||[]).forEach(e=>{if((e.t||0)>wk)out.push(new Date(e.t).toISOString().slice(5,16).replace('T',' ')+' '+e.k+' – '+String(e.m||'').slice(0,90))})}catch{}
 try{(typeof Uk!=='undefined'?Uk:[]).forEach(e=>out.push(e.at+' '+String(e.m||'').slice(0,90)+(e.s?' ('+e.s+')':'')))}catch{}return out.slice(-12)}
function rlTech(){let st=!1;try{st=matchMedia('(display-mode: standalone)').matches||!!navigator.standalone}catch{}const ua=navigator.userAgent,dev=/iPhone|iPad/.test(ua)?(ua.match(/iPhone|iPad/)[0]+' iOS '+((ua.match(/OS (\d+)_(\d+)/)||[]).slice(1).join('.'))):/Android/.test(ua)?'Android':(navigator.platform||'');
 const E=rlErrs();return['Butler Docs · '+rlt('ver')+' '+String(NT).split(' ')[0],rlt('dev')+': '+dev+' · '+screen.width+'×'+screen.height+' · '+innerWidth+'×'+innerHeight,rlt('mode')+': '+rlt(st?'home':'tab')+' · '+String(g.lang||'').toUpperCase(),
  rlt('scr')+': '+(m.route||'')+(m.bsec?'/'+m.bsec:''),rlt('bk')+': '+(g.bkLast?new Date(g.bkLast).toISOString().slice(0,10):'—'),rlt('errs')+': '+(E.length||rlt('none'))].concat(E.map(x=>'  '+x)).join('\n')}
function rlReport(){const tech=rlTech();const sh=H(rlt('rep'),`<p class="fdsmall">${i(rlt('repS'))}</p><textarea class="field rlnote" rows="3" placeholder="${i(rlt('repPh'))}"></textarea><pre class="rlpre">${i(tech)}</pre><p class="fdsmall">📷 ${i(rlt('shot'))}</p>
 <button type="button" class="dcadd gold" data-rr="mail" data-keep="1">${i(rlt('mail'))}</button><button type="button" class="btn rlfull" data-rr="share" data-keep="1">${i(rlt('share'))}</button><button type="button" class="btn rlfull" data-rr="copy" data-keep="1">${i(rlt('copy'))}</button>`);
 const txt=()=>{const n=sh.querySelector('.rlnote').value.trim();return(n?n+'\n\n':'')+tech};
 sh.querySelector('[data-rr=mail]').onclick=()=>{const a=document.createElement('a');a.href='mailto:?subject='+encodeURIComponent(rlt('subj'))+'&body='+encodeURIComponent(txt());document.body.appendChild(a);a.click();a.remove()};
 sh.querySelector('[data-rr=share]').onclick=()=>{try{navigator.share?navigator.share({title:rlt('subj'),text:txt()}).catch(()=>{}):navigator.clipboard.writeText(txt()).then(()=>T(rlt('copied')))}catch{}};
 sh.querySelector('[data-rr=copy]').onclick=()=>{try{navigator.clipboard.writeText(txt()).then(()=>T(rlt('copied')))}catch{}};return sh}
Hooks.act('st1rep',()=>rlReport(),{replace:!0});Hooks.act('td9rep',()=>rlReport(),{replace:!0});
/* the second, older button is not shown any more — one place to report */
Hooks.on('render',()=>{try{if(m.route==='profile')document.querySelectorAll('.screen .td9rep').forEach(b=>b.remove())}catch{}});
/* ---------- 2) the update bar: readable, above the bottom bar, waits while typing ---------- */
document.addEventListener('focusin',e=>{if(e.target&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))document.documentElement.classList.add('rltyping')},!0);
document.addEventListener('focusout',()=>setTimeout(()=>{const a=document.activeElement;if(!(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)))document.documentElement.classList.remove('rltyping')},120),!0);
Hooks.css('docs-reliability',`
.upbar{color:#F3EBDA!important;top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 96px)!important;font-family:inherit}
.upbar b{color:#fff!important;font-weight:600!important;font-size:15px}.upbar small{color:#F3EBDA!important;opacity:.85!important;font-size:13px}
.upbar .upgo{flex:none;white-space:nowrap}.upbar .upx{color:#F3EBDA!important;background:transparent;border:0;font-size:20px;padding:4px 6px}
html.rltyping .upbar{display:none!important}
.rlchk{width:100%}.rlsrc{display:flex;flex-direction:column;gap:4px;width:100%;text-align:left;padding:14px;border:1px solid var(--line);border-radius:16px;background:var(--surface);margin:8px 0 10px;color:inherit;font:inherit}
.rlsrc small{color:var(--muted);font-size:13px}.rlsrc b{font-size:17px}.rlsrc span{color:var(--muted);font-size:13px;word-break:break-all}.rlfull{width:100%;margin-top:8px}
.rlres{border-radius:16px;padding:12px 14px;margin-bottom:10px}.rlres h4{margin:0 0 4px;font-size:17px}.rlres p{margin:0;font-size:13.5px;color:var(--muted);line-height:1.45;word-break:break-all}
.rlres.ok h4{color:var(--good,#2f6b3e)}.rlres.warn{background:rgba(201,138,46,.1)}.rlres.warn h4{color:var(--warn,#a86b14)}.rlres.bad{background:rgba(192,57,43,.08)}.rlres.bad h4{color:#b03a2e}
.rlbox{border-radius:16px;background:var(--surface);padding:4px 14px;margin-bottom:10px}.rlr{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);font-size:15px}.rlr:last-child{border:0}
.rlr b{text-align:right;font-weight:600}.rlr b small{display:block;font-weight:400;font-size:12px;color:var(--muted)}.rlw{color:var(--warn,#a86b14);font-size:14px;margin:6px 0}
.rlpre{white-space:pre-wrap;font:12px/1.5 ui-monospace,Menlo,monospace;background:var(--surface);border-radius:12px;padding:10px 12px;margin:10px 0;max-height:190px;overflow:auto}.rlnote{width:100%;margin-top:6px}
`);
