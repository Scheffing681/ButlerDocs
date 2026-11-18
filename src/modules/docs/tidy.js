/* Butler Docs — self-check and a tidier profile (v31)
   1) Self-check, once a day after sign-in (and on «Jetzt prüfen» in Profil → Datenschutz): can the app still write its data,
      is the storage kept (not deletable by the phone), how full is it, can the photo store be opened, do the pages of a
      sample of documents still have their photos. Only problems are shown — as one card on home; the profile shows the result.
   2) Profile without the Butler leftovers that have nothing to do with documents: Baukasten (Butler home builder),
      Spiegel, Tarife und Vergleich, Butler-Protokoll, «Startbildschirm anpassen» (Butler start screen; Docs has
      «Anordnung und Farbe»), App-Geschwindigkeit (a developer tool). Nothing is deleted — the rows are only not shown. */
const TD_S={ok:['Самопроверка: всё в порядке ✓','Selbsttest: alles in Ordnung ✓','Self-check: all fine ✓'],when:['проверено %d','geprüft %d','checked %d'],run:['Проверить сейчас','Jetzt prüfen','Check now'],
 bad:['Самопроверка нашла проблему','Selbsttest hat etwas gefunden','The self-check found something'],busy:['Проверяю …','Wird geprüft …','Checking …'],
 i_write:['Приложение не может сохранять данные. Освободите место на телефоне и откройте приложение заново.','Die App kann nicht mehr speichern. Bitte Platz auf dem Telefon schaffen und die App neu öffnen.','The app cannot save any more. Please free space on the phone and reopen the app.'],
 i_persist:['iPhone может удалить данные этого приложения. Откройте его с экрана «Домой», а не в Safari, и сохраните копию.','Das iPhone darf die Daten dieser App löschen. Bitte vom Home-Bildschirm öffnen, nicht in Safari – und eine Sicherung speichern.','The phone may delete this app’s data. Please open it from the Home Screen, not in Safari – and save a backup.'],
 i_full:['Память приложения почти заполнена (%p %). Сохраните копию и удалите ненужные фото.','Der Speicher der App ist fast voll (%p %). Bitte Sicherung speichern und unnötige Fotos löschen.','The app storage is almost full (%p %). Please save a backup and delete photos you do not need.'],
 i_idb:['Хранилище фото не открывается. Перезапустите телефон; если не поможет — восстановите из копии.','Der Fotospeicher lässt sich nicht öffnen. Bitte Telefon neu starten; hilft das nicht – aus der Sicherung wiederherstellen.','The photo store cannot be opened. Please restart the phone; if that does not help – restore from a backup.'],
 i_miss:['У %n стр. нет фото. Если у вас есть копия, проверьте её в «Профиле».','Bei %n Seiten fehlt das Foto. Falls Sie eine Sicherung haben – in «Profil» prüfen.','%n pages have no photo. If you have a backup – check it in «Profile».'],
 open:['Открыть «Профиль»','Profil öffnen','Open profile'],later:['Понятно','Verstanden','Got it']};
const tdt=(k,o)=>{let s=cv5n(TD_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
let tdBusy=!1,tdMem=null;
async function tdRun(){if(tdBusy)return tdMem;tdBusy=!0;const is=[];try{
 try{localStorage.setItem('bdocs-tdw','1');localStorage.removeItem('bdocs-tdw')}catch{is.push(['write'])}
 let st=!1;try{st=matchMedia('(display-mode: standalone)').matches||!!navigator.standalone}catch{}
 try{if(navigator.storage&&navigator.storage.persisted){let p=await navigator.storage.persisted();if(!p&&navigator.storage.persist)try{p=await navigator.storage.persist()}catch{}if(!p&&!st)is.push(['persist'])}}catch{}
 try{if(navigator.storage&&navigator.storage.estimate){const e=await navigator.storage.estimate();if(e&&e.quota&&e.usage/e.quota>.85)is.push(['full',{p:Math.round(e.usage/e.quota*100)}])}}catch{}
 let idbOk=!0;try{await Promise.race([vt.get('__tdprobe'),new Promise((_,no)=>setTimeout(()=>no(new Error('timeout')),4000))])}catch{idbOk=!1;is.push(['idb'])}
 if(idbOk){let P=[];try{(Ke().items||[]).forEach(d=>(d&&d.pages||[]).forEach(pg=>pg&&pg.id&&P.push(pg)))}catch{}
  for(let k=P.length-1;k>0;k--){const r=Math.floor(Math.random()*(k+1));[P[k],P[r]]=[P[r],P[k]]}let miss=0;
  for(const pg of P.slice(0,25)){try{const b=await vt.get(pg.id);if(!b){const n=await ni(pg).catch(()=>null);if(!n)miss++}}catch{}}if(miss)is.push(['miss',{n:miss}])}
 }catch(e){Hooks.err('tdrun',e)}finally{tdBusy=!1}
 tdMem={ts:Date.now(),is};try{localStorage.setItem('bdocs-tdchk',JSON.stringify(tdMem))}catch{}return tdMem}
/* the result is kept outside the data too, so it is not part of a backup or a sync */
const tdLast=()=>{try{return tdMem||JSON.parse(localStorage.getItem('bdocs-tdchk')||'null')}catch{return null}};
Hooks.on('render',()=>{try{if(!m.logged||!g.user||g.user.needSetup)return;const l=tdLast();if(l&&Date.now()-l.ts<20*36e5)return;if(tdBusy)return;
 setTimeout(async()=>{const r=await tdRun();if(r&&r.is.length&&m.route==='home')v()},2500)}catch{}});
Hooks.on('screen',h=>{try{if(m.route!=='home'||typeof h!=='string'||g.dhOff||h.includes('tdcard'))return h;const l=tdLast();if(!l||!l.is.length||g.tdHide===l.ts)return h;
 const blk=`<div class="dhcard tdcard"><b>⚠ ${i(tdt('bad'))}</b>${l.is.map(([k,o])=>`<p>${i(tdt('i_'+k,o))}</p>`).join('')}<div class="bkrb"><button type="button" class="on" data-act="go" data-to="profile">${i(tdt('open'))}</button><button type="button" data-act="tdhide">${i(tdt('later'))}</button></div></div>`;
 return typeof bsvHomeIns==='function'?bsvHomeIns(h,blk):h}catch(e){Hooks.err('tdhome',e);return h}});
Hooks.act('tdhide',()=>{const l=tdLast();if(l)g.tdHide=l.ts;$();v()});
Hooks.act('tdrun',async()=>{T(tdt('busy'));await tdRun();v()});
Hooks.on('profile',a=>{try{if(typeof a!=='string'||a.includes('class="tdline'))return;const k=a.indexOf('data-act="rlcheck"');if(k<0)return;const e=a.indexOf('</button>',k)+9;const l=tdLast();
 const line=l?`<p class="tdline ${l.is.length?'warn':'ok'}">${i(l.is.length?tdt('bad'):tdt('ok'))} · ${i(tdt('when',{d:new Date(l.ts).toLocaleString(he(),{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}))}</p>${l.is.map(([k2,o])=>`<p class="tdline warn sm">${i(tdt('i_'+k2,o))}</p>`).join('')}`:'';
 return a.slice(0,e)+line+`<button type="button" class="btn rlchk" data-act="tdrun">${i(tdt('run'))}</button>`+a.slice(e)}catch(x){Hooks.err('tdprof',x)}});
/* tidy profile */
Hooks.on('render',()=>{try{document.documentElement.classList.toggle('tdprof',m.route==='profile')}catch{}});
Hooks.css('docs-tidy',`
html.tdprof .screen [data-to=bd8],html.tdprof .screen [data-to=mirror],html.tdprof .screen .mrentry,html.tdprof .screen [data-act=plopen],html.tdprof .screen [data-act=cmdlog],
html.tdprof .screen [data-act=sheet][data-s=start],html.tdprof .screen [data-act=sp8],html.tdprof .screen .sp8row{display:none!important}
.tdcard{border:1px solid rgba(176,58,46,.35)}.tdcard b{display:block;font-size:16px;color:#b03a2e}.tdcard p{margin:6px 0;line-height:1.4;font-size:14.5px}.tdcard .bkrb{margin-top:8px}
.tdline{margin:10px 0 4px;font-size:14px}.tdline.ok{color:var(--green,#2f6b3e)}.tdline.warn{color:#b03a2e}.tdline.sm{font-size:13px;margin:2px 0;line-height:1.35}
`);
