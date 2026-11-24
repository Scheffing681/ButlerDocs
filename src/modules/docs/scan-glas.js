/* ===== Butler Docs: the scanner page in the new look «Glas» (v65) =====
   One big «Scannen» (Blatt · Ausweis 2 Seiten), «Fertiges holen» (PDF / photo from Dateien, Fotos, iCloud — also what came
   from a printer or a mail), «Beste Qualität» (the iPhone's own camera at full resolution; Butler straightens the photo),
   a folding card «Vom Drucker oder aus der Mail», a tip for the iPhone's built-in document scanner, «Zuletzt».
   Buch, Tafel and Visitenkarte are gone from the page (they stay in the camera's own type switch).
   Every button opens the existing scanner (`stPick`: camera, `.sc9fi` files, `.sc9ni` native camera); nothing in its work changes. */
const scgS={t:['Сканер','Scanner','Scanner'],scan:['Сканировать','Scannen','Scan'],scanS:['Края и тени уберутся, несколько страниц → PDF','Ränder & Schatten weg, mehrere Seiten → PDF','Edges & shadows gone, several pages → PDF'],
 sheet:['Лист','Blatt','Sheet'],id:['Удостоверение · 2 стороны','Ausweis · 2 Seiten','ID · 2 sides'],
 get:['Взять готовое','Fertiges holen','Use a ready one'],getS:['PDF или фото из «Файлов», «Фото», iCloud','PDF oder Foto aus Dateien, Fotos, iCloud','PDF or photo from Files, Photos, iCloud'],
 best:['Лучшее качество','Beste Qualität','Best quality'],bestS:['Фото камерой iPhone, Батлер выровняет','Foto mit der iPhone-Kamera, Butler begradigt es','Photo with the iPhone camera, Butler straightens it'],
 how:['С принтера или из почты','Vom Drucker oder aus der Mail','From a printer or from mail'],
 pr:['Принтер','Drucker','Printer'],prS:['на принтере «Скан на e-mail / iCloud» — или в приложении принтера «Сохранить в Файлы»','am Drucker «Scan an E-Mail / iCloud» – oder in der Drucker-App «In Dateien sichern»','on the printer «Scan to e-mail / iCloud» – or in the printer app «Save to Files»'],
 ml:['Почта','Mail','Mail'],mlS:['вложение долго нажать → «Сохранить в Файлы»','Anhang lange drücken → «In Dateien sichern»','press and hold the attachment → «Save to Files»'],
 th:['Потом здесь','Dann hier','Then here'],thS:['«Взять готовое» — Батлер прочтёт вид, дату и срок','«Fertiges holen» – Butler liest Art, Datum und Frist','«Use a ready one» – Butler reads type, date and deadline'],
 tip:['Идеально, как настоящий сканер: в «Файлах» → ⋯ → «Сканировать документы», потом «Взять готовое».','Perfekt wie ein echter Scanner: in «Dateien» → ⋯ → «Dokumente scannen», dann «Fertiges holen».','Perfect like a real scanner: in «Files» → ⋯ → «Scan Documents», then «Use a ready one».'],
 rec:['Недавние','Zuletzt','Recent'],all:['Все','Alle','All'],none:['Пока ничего не отсканировано','Noch nichts gescannt','Nothing scanned yet'],pp:['%n стр.','%n S.','%n p.']};
const scgt=(k,o)=>{let s=cv5n(scgS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const SCG={scan:'<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/>',fold:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
 cam:'<path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.6"/>',prn:'<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M7 14h10v6H7z"/>',
 mail:'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l8.2 6 8.2-6"/>',doc:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M9.5 12h6M9.5 15.5h6"/>',
 id:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14 10h4M14 13h3"/>'};
const scgI=(k,s)=>`<svg viewBox="0 0 24 24" width="${s||22}" height="${s||22}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SCG[k]}</svg>`;
['scan'].forEach(r=>{Te.includes(r)||Te.push(r);OD_OK.add(r)});
function scgRecent(){let A=[];try{A=(Ke().items||[]).filter(d=>d&&d.id&&!d.type)}catch{}return A.sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,3)}
function scgScreen(){const k=g.scKind==='id'?'id':'doc',R3=scgRecent();
 const row=d=>{const n=(d.pages||[]).length;return`<button type="button" class="scgr" data-scgo="${i(d.id)}"><span class="th">${(d.pages||[])[0]?`<img data-dzimg="${i(d.pages[0].id)}" data-doc="${i(d.id)}" alt="">`:scgI(d.dtype==='id'?'id':'doc',20)}</span><span class="tx"><b>${i(d.title||'—')}</b><small>${i([d.folder?(()=>{try{return Ri(Vs(d.folder)||{})}catch{return''}})():'',n?scgt('pp',{n}):''].filter(Boolean).join(' · '))}</small></span></button>`};
 const st=(ic,t,s)=>`<div class="mkstep"><span class="ic">${scgI(ic,18)}</span><span><b>${i(scgt(t))}</b><small>${i(scgt(s))}</small></span></div>`;
 return`<div class="screen dhome scgw"><div class="sub-hdr"><button class="iconbtn" data-act="bgback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(scgt('t'))}</h2></div><span></span></div>
 <div class="scgh"><button type="button" class="scgrow" data-scg="cam"><span class="big">${scgI('scan',34)}</span><span><b>${i(scgt('scan'))}</b><small>${i(scgt('scanS'))}</small></span></button>
  <div class="scgseg" role="radiogroup"><button type="button" role="radio" aria-checked="${k==='doc'}" class="${k==='doc'?'on':''}" data-scgk="doc">${scgI('doc',18)} ${i(scgt('sheet'))}</button><button type="button" role="radio" aria-checked="${k==='id'}" class="${k==='id'?'on':''}" data-scgk="id">${scgI('id',18)} ${i(scgt('id'))}</button></div></div>
 <div class="scg2"><button type="button" data-scg="files"><span class="ic">${scgI('fold')}</span><b>${i(scgt('get'))}</b><small>${i(scgt('getS'))}</small></button>
  <button type="button" data-scg="nat"><span class="ic">${scgI('cam')}</span><b>${i(scgt('best'))}</b><small>${i(scgt('bestS'))}</small></button></div>
 <details class="scghelp"${g.scgHelp?' open':''}><summary><b>${i(scgt('how'))}</b><i aria-hidden="true">▾</i></summary>${st('prn','pr','prS')}${st('mail','ml','mlS')}${st('fold','th','thS')}</details>
 <p class="scgtip">💡 <span>${i(scgt('tip'))}</span></p>
 <div class="scgrec"><div class="h"><b>${i(scgt('rec'))}</b>${R3.length?`<button type="button" data-act="go" data-to="archive">${i(scgt('all'))} ›</button>`:''}</div>${R3.map(row).join('')||`<p class="sgnone">${i(scgt('none'))}</p>`}</div></div>`}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='scan')return scgScreen()}catch(e){Hooks.err('scgscreen',e)}});
Hooks.on('render',()=>{try{if(m.route!=='scan')return;try{Sg()}catch{}const d=document.querySelector('.scghelp');d&&!d.dataset.w&&(d.dataset.w=1,d.addEventListener('toggle',()=>{g.scgHelp=d.open?1:0;$()}))}catch(e){Hooks.err('scgrender',e)}});
document.addEventListener('click',e=>{const sc=e.target.closest&&e.target.closest('.scgw');if(!sc)return;
 const k=e.target.closest('[data-scgk]');if(k){g.scKind=k.dataset.scgk==='id'?'id':'doc';$();sc.querySelectorAll('[data-scgk]').forEach(b=>{const on=b===k;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)});return}
 const o=e.target.closest('[data-scgo]');if(o){m.bdid=o.dataset.scgo;R('bdoc');return}
 const b=e.target.closest('[data-scg]');if(!b)return;const a=b.dataset.scg;
 try{if(a==='cam')stPick(null);else if(a==='files')stPick('.sc9fi');else if(a==='nat')stPick('.sc9ni')}catch(er){Hooks.err('scgdo',er)}});
/* stPick opened the scanner's old home page (R('sc9') → scHome), so «Datei» / «Fotos» clicked a button that was not there.
   Now it opens the camera scanner itself (as the old home did) and, for files or the native camera, clicks its input
   in the same tap — iPhone allows a file picker only inside the tap itself. */
const scgP0=stPick;stPick=function(sel){try{if(typeof window.__scOpen!=='function')return scgP0.apply(this,arguments);
 window.__scOpen({multi:!0,card:!0,kind:g.scKind==='id'?'id':'doc',done:()=>{}});if(sel){const x=document.querySelector('.sc9 '+sel);x&&x.click()}}catch(e){Hooks.err('scgpick',e);return scgP0.apply(this,arguments)}};
/* in the new look the scanner's own page is this screen (also when something asks for the route «sc9») */
const scgR0=R;R=function(e){try{if(e==='sc9'&&typeof bdOn==='function'&&bdOn())return scgR0.call(this,'scan')}catch{}return scgR0.apply(this,arguments)};
const scgH0=scHome;scHome=function(){try{if(typeof bdOn==='function'&&bdOn()){R('scan');return}}catch{}return scgH0.apply(this,arguments)};
try{SP_L.push(['scan','scan',['Сканер','Scanner','Scanner'],['скан','scan','tara','принтер','drucker','printer','камер','kamera','camera']])}catch{}
Hooks.css('docs-scan-glas',`
.scgh{border-radius:26px;padding:16px 14px 12px;color:#fff;background:linear-gradient(145deg,var(--bd-acc,var(--green)),color-mix(in srgb,var(--bd-acc,var(--green)) 55%,#0b2a24));box-shadow:0 14px 34px color-mix(in srgb,var(--bd-acc,var(--green)) 35%,transparent);margin:0 0 12px}
:root[data-bd=dunkel] .scgh{color:#05201A}
.scgrow{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;color:inherit;font:inherit;text-align:left;padding:0;cursor:pointer}
.scgrow .big{flex:none;width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.95);color:var(--bd-acc,var(--green));box-shadow:0 0 0 6px rgba(255,255,255,.25)}
:root[data-bd=dunkel] .scgrow .big{background:#05201A;box-shadow:0 0 0 6px rgba(5,32,26,.25)}
.scgrow b{display:block;font-size:22px;font-weight:700}.scgrow small{display:block;font-size:14.5px;opacity:.92;margin-top:2px}.scgrow:active .big{transform:scale(.95)}
.scgseg{display:flex;gap:6px;margin-top:12px;background:rgba(255,255,255,.18);border-radius:14px;padding:4px}:root[data-bd=dunkel] .scgseg{background:rgba(5,32,26,.18)}
.scgseg button{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:0;border-radius:11px;background:none;color:inherit;font:600 14px var(--body);padding:9px 4px;cursor:pointer;min-width:0}
.scgseg button.on{background:rgba(255,255,255,.95);color:var(--bd-acc,var(--green))}:root[data-bd=dunkel] .scgseg button.on{background:#05201A}
.scg2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.scg2 button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;border:1px solid var(--bd-edge,var(--line));border-radius:20px;background:var(--bd-glass,var(--surface));padding:14px 12px;color:var(--ink);font:inherit;text-align:left;cursor:pointer}
.scg2 .ic,.scghelp .ic{display:grid;place-items:center;background:color-mix(in srgb,var(--bd-acc,var(--green)) 14%,transparent);color:var(--bd-acc,var(--green))}.scg2 .ic{width:40px;height:40px;border-radius:12px;margin-bottom:6px}
.scg2 b{font-size:16px}.scg2 small{font-size:13.5px;color:var(--muted);line-height:1.3}
.scghelp{border:1px solid var(--bd-edge,var(--line));border-radius:20px;background:var(--bd-glass,var(--surface));padding:12px 14px;margin-bottom:12px;color:var(--ink)}
.scghelp summary{display:flex;align-items:center;justify-content:space-between;list-style:none;cursor:pointer;font-size:16px}.scghelp summary::-webkit-details-marker{display:none}.scghelp summary i{font-style:normal;color:var(--muted);transition:transform .2s}.scghelp[open] summary i{transform:rotate(180deg)}
.scghelp .mkstep{display:flex;gap:10px;align-items:flex-start;margin-top:10px}.scghelp .ic{flex:none;width:34px;height:34px;border-radius:10px}
.scghelp .mkstep b{display:block;font-size:15px}.scghelp .mkstep small{display:block;font-size:13.5px;color:var(--muted);line-height:1.35}
.scgtip{display:flex;gap:10px;align-items:center;border-radius:16px;padding:10px 12px;margin:0 0 12px;background:color-mix(in srgb,#F2B544 18%,transparent);color:var(--ink);font-size:14px;line-height:1.35}
.scgrec{border:1px solid var(--bd-edge,var(--line));border-radius:20px;background:var(--bd-glass,var(--surface));padding:10px 14px 4px;color:var(--ink)}
.scgrec .h{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}.scgrec .h b{font-size:16px}.scgrec .h button{border:0;background:none;color:var(--bd-acc,var(--green));font:600 15px var(--body);cursor:pointer}
.scgr{display:flex;align-items:center;gap:10px;width:100%;padding:9px 0;border:0;border-top:1px solid var(--line);background:none;color:var(--ink);font:inherit;text-align:left;cursor:pointer}.scgr:first-of-type{border-top:0}
.scgr .th{flex:none;width:38px;height:48px;border-radius:7px;background:#fff;border:1px solid var(--line);display:grid;place-items:center;color:var(--bd-acc,var(--green));overflow:hidden}.scgr .th img{width:100%;height:100%;object-fit:cover}
:root[data-bd=dunkel] .scgr .th{background:#E9F2EF;color:#1F6B5C}.scgr .tx{min-width:0}.scgr b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.scgr small{display:block;font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`);
