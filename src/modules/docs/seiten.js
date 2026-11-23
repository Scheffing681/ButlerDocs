/* ===== Butler Docs: «Seiten bearbeiten» (v54) — final concept, board 5 =====
   From a document («Seiten» → «Seiten bearbeiten»): all pages as a grid, tap to select, then
   Früher · Später · Drehen · Löschen · Teilen · Zusammenführen, the name on top, and «Neue Version».
   Everything happens on a draft: the document changes only on «Fertig»; «Abbrechen» leaves it as it was.
   - Teilen: the selected pages become a new document on «Fertig» (same folder and kind, «– Teil 2»).
   - Zusammenführen: pages of another document are added as copies; the other document stays unchanged.
   - Neue Version: the result is saved as a new document, the original stays untouched (pages are copied).
   Pictures no longer used are removed on «Fertig» (and new ones on «Abbrechen»), so no storage is lost.
   Works for scans and photos (pages are pictures). Splitting PDF files themselves needs pdf-lib — later. */
const spS={t:['Редактировать страницы','Seiten bearbeiten','Edit pages'],
 sub:['Стр.: %n · оригинал меняется только по «Готово»','%n Seiten · das Original ändert sich erst bei «Fertig»','%n pages · the original changes only on «Done»'],
 subV:['Стр.: %n · оригинал останется без изменений','%n Seiten · das Original bleibt unverändert','%n pages · the original stays unchanged'],
 cancel:['Отмена','Abbrechen','Cancel'],done:['Готово','Fertig','Done'],
 hint:['Нажмите на страницы, чтобы выбрать.','Tippen Sie Seiten an, um sie auszuwählen.','Tap pages to select them.'],sel:['Выбрано: %n','%n ausgewählt','%n selected'],
 up:['Раньше','Früher','Earlier'],down:['Позже','Später','Later'],rot:['Повернуть','Drehen','Rotate'],del:['Удалить','Löschen','Delete'],
 split:['Разделить','Teilen','Split'],merge:['Добавить','Zusammenführen','Merge'],ver:['Новая версия','Neue Version','New version'],name:['Название','Name','Name'],
 splitN:['Стр.: %n — станут отдельным документом по «Готово»','%n Seiten werden bei «Fertig» ein eigenes Dokument','%n pages become a document of their own on «Done»'],
 parts:['Отдельный документ: %n стр.','Eigenes Dokument: %n Seiten','Own document: %n pages'],undoSplit:['вернуть','zurückholen','bring back'],
 mergeT:['Добавить страницы из документа','Seiten aus Dokument anfügen','Add pages from a document'],mergeN:['Другой документ не изменится.','Das andere Dokument bleibt unverändert.','The other document stays unchanged.'],
 part:['%t — часть %n','%t – Teil %n','%t – part %n'],verT:['%t (новая версия)','%t (neue Version)','%t (new version)'],
 saved:['Сохранено','Gespeichert','Saved'],savedV:['Сохранено как новая версия','Als neue Version gespeichert','Saved as a new version'],
 keep1:['Должна остаться хотя бы одна страница','Mindestens eine Seite muss bleiben','At least one page must stay'],
 wait:['Подождите …','Einen Moment …','One moment …'],
 note:['Для сканов и фото. Резать готовые PDF-файлы — позже.','Für Scans und Fotos. Fertige PDF-Dateien zerteilen – später.','For scans and photos. Cutting finished PDF files – later.']};
const spt=(k,o)=>{let s=cv5n(spS[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const spIc={up:'<path d="M15 5l-7 7 7 7"/>',down:'<path d="M9 5l7 7-7 7"/>',rot:'<path d="M20 11a8 8 0 1 1-2.3-5.6L20 7.5M20 3v4.5h-4.5"/>',
 del:'<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5"/>',split:'<circle cx="6.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/><path d="M8.6 8l11 9.5M8.6 16l11-9.5"/>',
 merge:'<rect x="3.5" y="4" width="10" height="13" rx="1.5"/><path d="M10.5 20h8.5a1.5 1.5 0 0 0 1.5-1.5V8M17 4v6M14 7h6"/>',ver:'<rect x="7.5" y="7.5" width="12" height="13" rx="1.6"/><path d="M4.5 16.5V5a1.5 1.5 0 0 1 1.5-1.5h9.5"/>'};
const spSvg=k=>`<svg class="dhi" viewBox="0 0 24 24" aria-hidden="true">${spIc[k]}</svg>`;
async function spRotImg(p){const u=await Ds(p),im=new Image;im.src=u;await im.decode();const c=document.createElement('canvas');c.width=im.naturalHeight;c.height=im.naturalWidth;
 const x=c.getContext('2d');x.translate(c.width,0);x.rotate(Math.PI/2);x.drawImage(im,0,0);const b=await new Promise(r=>c.toBlob(r,'image/jpeg',.85)),k=await nr(b);if(!k)throw new Error('store');
 return Object.assign({},p,{id:k.id,n:k.n,type:'image/jpeg',w:c.width,h:c.height})}
async function spCopyImg(p){const u=await Ds(p);if(!u)throw new Error('img');const b=await (await fetch(u)).blob(),k=await nr(b);if(!k)throw new Error('store');return Object.assign({},p,{id:k.id,n:k.n})}
const spDrop=p=>{try{yl(p);delete Fa.img[p.id]}catch{}};
function spNewDoc(e,title,pages){const d=JSON.parse(JSON.stringify(Object.assign({},e,{pages:[]})));
 Object.assign(d,{id:V(),title,pages,files:[],ts:Date.now(),ok:1});delete d.insId;delete d.type;delete d.chip;Ke().items.push(d);return d}
function spOpen(e){if(!e||!e.pages||!e.pages.length)return;document.querySelectorAll('.spov').forEach(x=>x.remove());
 const orig=new Set(e.pages.map(p=>p.id)),fresh=new Map();let P=e.pages.map(p=>Object.assign({},p)),sel=new Set(),parts=[],ver=!1,busy=!1,title=e.title||'';
 const ov=document.createElement('div');ov.className='spov';ov.setAttribute('role','dialog');document.body.appendChild(ov);
 const draw=()=>{const ns=sel.size,ix=P.map((p,k)=>sel.has(p.id)?k:-1).filter(k=>k>=0);
  const can={up:ns&&ix[0]>0,down:ns&&ix[ix.length-1]<P.length-1,rot:ns,del:ns&&ns<P.length,split:ns&&ns<P.length,merge:1,ver:1};
  ov.innerHTML=`<div class="sphd"><button type="button" class="spx" data-sp="cancel">${i(spt('cancel'))}</button><b>${i(spt('t'))}</b><button type="button" class="spok" data-sp="done">${i(spt('done'))}</button></div>
  <label class="spname"><small>${i(spt('name'))}</small><input id="spname" class="field" maxlength="120" value="${i(title)}"></label>
  <p class="spsub">${i(spt(ver?'subV':'sub',{n:P.length}))}${busy?' · '+i(spt('wait')):''}</p>
  <div class="spgrid">${P.map((p,k)=>`<button type="button" class="sppg${sel.has(p.id)?' on':''}" data-sp="pick" data-id="${p.id}"><img data-spimg="${p.id}" alt=""><i>${k+1}</i>${sel.has(p.id)?'<em>✓</em>':''}</button>`).join('')}</div>
  ${parts.map((L2,k)=>`<div class="sppart">✂ ${i(spt('parts',{n:L2.length}))}<button type="button" data-sp="unsplit" data-k="${k}">${i(spt('undoSplit'))}</button></div>`).join('')}
  <p class="spnote">${i(ns?spt('sel',{n:ns}):spt('hint'))}</p>
  <div class="sptools">${['up','down','rot','del','split','merge','ver'].map(k=>`<button type="button" class="${k==='ver'&&ver?'on':''}${k==='del'?' red':''}" data-sp="${k}" ${can[k]&&!busy?'':'disabled'}>${spSvg(k)}<span>${i(spt(k))}</span></button>`).join('')}</div>
  <p class="spnote sm">${i(spt('note'))}</p>`;
  ov.querySelectorAll('img[data-spimg]').forEach(im=>{const p=P.find(x=>x.id===im.dataset.spimg);p&&Ds(p).then(u=>{if(u)im.src=u})})};
 const close=()=>{ov.remove();v()};
 ov.addEventListener('input',ev=>{if(ev.target.id==='spname')title=ev.target.value});
 ov.onclick=async ev=>{const b=ev.target.closest('[data-sp]');if(!b||b.disabled||busy)return;const a=b.dataset.sp;
  if(a==='pick'){const id=b.dataset.id;sel.has(id)?sel.delete(id):sel.add(id);draw();return}
  if(a==='cancel'){fresh.forEach(p=>spDrop(p));close();return}
  if(a==='up'||a==='down'){const S2=P.filter(p=>sel.has(p.id));if(a==='up'){for(let k=1;k<P.length;k++)if(sel.has(P[k].id)&&!sel.has(P[k-1].id)){[P[k-1],P[k]]=[P[k],P[k-1]]}}
   else{for(let k=P.length-2;k>=0;k--)if(sel.has(P[k].id)&&!sel.has(P[k+1].id)){[P[k+1],P[k]]=[P[k],P[k+1]]}}void S2;draw();return}
  if(a==='del'){if(sel.size>=P.length){T(spt('keep1'));return}P=P.filter(p=>!sel.has(p.id));sel.clear();draw();return}
  if(a==='split'){if(sel.size>=P.length){T(spt('keep1'));return}const L2=P.filter(p=>sel.has(p.id));parts.push(L2);P=P.filter(p=>!sel.has(p.id));sel.clear();T(spt('splitN',{n:L2.length}));draw();return}
  if(a==='unsplit'){const L2=parts.splice(+b.dataset.k,1)[0]||[];P=P.concat(L2);draw();return}
  if(a==='ver'){ver=!ver;draw();return}
  if(a==='rot'){busy=!0;draw();try{for(let k=0;k<P.length;k++)if(sel.has(P[k].id)){const o=P[k],nw=await spRotImg(o);fresh.set(nw.id,nw);if(fresh.has(o.id)){fresh.delete(o.id);spDrop(o)}sel.delete(o.id);sel.add(nw.id);P[k]=nw}}catch(x){Hooks.err('sprot',x)}busy=!1;draw();return}
  if(a==='merge'){const D=Ke().items.filter(d=>d&&d.id!==e.id&&!d.del&&d.pages&&d.pages.length).sort((x,y)=>(y.ts||0)-(x.ts||0)).slice(0,40);
   H(spt('mergeT'),`<p class="stnote" style="margin-top:0">${i(spt('mergeN'))}</p><div class="stsheet">${D.map(d=>`<button type="button" class="strow" data-spm="${d.id}">${dhi('fld')}<span><b>${i(d.title||'—')}</b><small>${d.pages.length} S.</small></span></button>`).join('')||'—'}</div>`,sh=>{
    sh.querySelectorAll('[data-spm]').forEach(x=>x.onclick=async()=>{const d=Ke().items.find(y=>y.id===x.dataset.spm);sh.remove();if(!d)return;busy=!0;draw();
     try{for(const p of d.pages){const c=await spCopyImg(p);fresh.set(c.id,c);P.push(c)}}catch(err){Hooks.err('spmerge',err)}busy=!1;draw()})});return}
  if(a==='done'){busy=!0;draw();try{const t=(title||'').trim()||e.title||'—';
    const own=async p=>{if(!ver||fresh.has(p.id))return p;const c=await spCopyImg(p);return c};
    const fin=[];for(const p of P)fin.push(await own(p));const pts=[];for(const L2 of parts){const o=[];for(const p of L2)o.push(await own(p));pts.push(o)}
    const used=new Set(fin.map(p=>p.id).concat(...pts.map(L2=>L2.map(p=>p.id))));
    let target=e;if(ver){target=spNewDoc(e,spt('verT',{t}),fin)}else{e.pages.forEach(p=>{if(!used.has(p.id))spDrop(p)});e.pages=fin;e.title=t}
    fresh.forEach((p,id)=>{if(!used.has(id))spDrop(p)});
    pts.forEach((L2,k)=>spNewDoc(e,spt('part',{t,n:k+2}),L2));
    $();ov.remove();T(spt(ver?'savedV':'saved'));if(ver){try{L.dzopen({id:target.id})}catch{v()}}else v()}catch(x){Hooks.err('spdone',x);busy=!1;draw()}return}};
 draw()}
/* the entry: under the pages of a document */
Hooks.on('render',()=>{try{const pg=document.querySelector('.dzpages');if(!pg||pg.nextElementSibling&&pg.nextElementSibling.classList.contains('spgo'))return;
 const b=document.createElement('button');b.type='button';b.className='spgo';b.dataset.act='spopen';b.innerHTML=`${spSvg('ver')}<span>${i(spt('t'))}</span>`;pg.after(b)}catch(e){Hooks.err('spgo',e)}});
Hooks.act('spopen',()=>{try{spOpen(qe(m.bdid))}catch(e){Hooks.err('spopen',e)}});
Hooks.css('docs-seiten',`
.spgo{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin:8px 0 4px;border:1px dashed var(--green);border-radius:14px;background:none;color:var(--green)!important;padding:10px;font:inherit;font-weight:600;cursor:pointer}.spgo .dhi{width:19px;height:19px}
.spov{position:fixed;inset:0;z-index:9000;background:var(--bg,#f6f3ea);overflow-y:auto;padding:calc(env(safe-area-inset-top) + 8px) 16px calc(env(safe-area-inset-bottom) + 20px);font-family:-apple-system,"SF Pro Text",system-ui,sans-serif;color:var(--ink)}
.sphd{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 0 10px}.sphd b{font-family:var(--serif,inherit);font-size:21px}
.sphd button{border:0;background:none;font:inherit;font-size:16px;padding:8px 4px;cursor:pointer}.spx{color:var(--muted)!important}.spok{color:var(--green)!important;font-weight:700}
.spname{display:flex;flex-direction:column;gap:4px;margin-bottom:6px}.spname small{color:var(--muted);font-size:12.5px}.spname input{font-size:16px}
.spsub{color:var(--muted);font-size:13px;margin:4px 2px 10px}
.spgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.sppg{position:relative;aspect-ratio:3/4;border:1px solid var(--line);border-radius:10px;background:#fff;padding:0;overflow:hidden;cursor:pointer;box-shadow:0 3px 8px rgba(0,0,0,.06)}
.sppg img{width:100%;height:100%;object-fit:contain;display:block}.sppg i{position:absolute;left:0;right:0;bottom:0;font-style:normal;font-size:12px;background:linear-gradient(transparent,rgba(0,0,0,.45));color:#fff;padding:10px 0 4px;text-align:center}
.sppg.on{outline:3px solid var(--green);outline-offset:-1px}.sppg em{position:absolute;top:6px;right:6px;width:24px;height:24px;border-radius:50%;background:var(--green);color:#fff;font-style:normal;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:14px}
.sppart{display:flex;align-items:center;gap:10px;margin-top:10px;border:1px dashed var(--line);border-radius:12px;padding:8px 12px;font-size:14px}.sppart button{margin-left:auto;border:0;background:none;color:var(--green)!important;font:inherit;font-weight:600}
.spnote{color:var(--muted);font-size:13.5px;text-align:center;margin:12px 0 8px}.spnote.sm{font-size:12px;margin-top:10px}
.sptools{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.sptools button{display:flex;flex-direction:column;align-items:center;gap:4px;border:0;border-radius:14px;background:var(--surface);box-shadow:0 3px 10px rgba(20,60,30,.07);padding:10px 2px;font:inherit;font-size:12px;color:var(--ink)!important;cursor:pointer}
.sptools button .dhi{width:21px;height:21px;color:var(--green)}.sptools button.red .dhi{color:#c4472e}.sptools button:disabled{opacity:.38}
.sptools button.on{background:var(--green);color:#fff!important}.sptools button.on .dhi{color:#fff}
`);
