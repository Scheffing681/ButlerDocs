/* ===== Butler Docs: Dokumente, Fristen and Eingang in the new look «Glas» (v60), step 4 =====
   One header for all three: ‹ · BUTLER · (the screen's own right button), then the big title on the left; the intro line goes.
   Fristen: a week strip Mo–So (today marked, a dot under days with a deadline; tap = that day's deadlines).
   Dokumente: the ring «Wichtige Papiere 4 von 8» moved here from Start.
   Eingang: capture and inbox are one screen — Scannen · Fotos · Datei · ⋯ on top, then the list to check.
   Coloured dots become signs: ⚠ overdue · ⏰ up to 7 days · ✓ later. */
const sgl={papers:['Важные бумаги','Wichtige Papiere','Key papers'],ofN:['%a из %b','%a von %b','%a of %b'],
 scan:['Скан','Scannen','Scan'],pics:['Фото','Fotos','Photos'],file:['Файл','Datei','File'],more:['Ещё способы','Weitere Wege','More ways'],more2:['Ещё','Mehr','More'],
 day:['Сроки на %d','Fristen am %d','Deadlines on %d'],noDay:['В этот день сроков нет','An diesem Tag keine Fristen','No deadlines on this day']};
const sglt=(k,o)=>{let s=cv5n(sgl[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const SGL_R={archive:'ddw',dsrok:'frw',eing:'egw'};
const sglSign=n=>n<0?'r':n<=7?'y':'g';
function sglHead(sc){const hd=sc.querySelector(':scope>.sub-hdr');if(!hd||sc.querySelector(':scope>.bghd'))return;
 const t=(hd.querySelector('.ttl h2,.ttl h1')||{}).textContent||'';const rb=hd.lastElementChild&&hd.lastElementChild.tagName==='BUTTON'&&hd.lastElementChild!==hd.firstElementChild?hd.lastElementChild:null;
 const nh=document.createElement('div');nh.className='bghd';
 nh.innerHTML=`<button type="button" class="bgcb" aria-label="back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><span class="sgwm">BUTLER</span><span></span>`;
 const fb=hd.firstElementChild,bb=nh.firstElementChild;if(fb&&fb.tagName==='BUTTON'){[...fb.attributes].forEach(a=>{if(a.name.startsWith('data-'))bb.setAttribute(a.name,a.value)})}if(!bb.dataset.act)bb.dataset.act='odback';
 if(rb){const c=rb.cloneNode(!0);c.className='bgcb';c.removeAttribute('id');nh.lastElementChild.replaceWith(c)}
 const h=document.createElement('h1');h.className='bgtitle';h.textContent=t;hd.before(nh);hd.before(h);const sub=sc.querySelector(':scope>.dcsub');if(sub){sub.classList.add('bgsub');h.after(sub)}sc.classList.add('sglw')}
function sglWeek(){const A=(()=>{try{return stDlAll()}catch{return[]}})(),now=new Date();now.setHours(12,0,0,0);const wd=(now.getDay()+6)%7,mo=new Date(now);mo.setDate(now.getDate()-wd);
 let h='';for(let j=0;j<7;j++){const d=new Date(mo);d.setDate(mo.getDate()+j);const k=d.toISOString().slice(0,10),n=A.filter(t=>t.k===k);const late=n.some(t=>stDays(t.k)<0);
  let wn='';try{wn=d.toLocaleDateString(he(),{weekday:'short'}).replace('.','').slice(0,2)}catch{}
  h+=`<button type="button" class="sglday${j===wd?' on':''}" data-act="sglday" data-k="${k}"><small>${i(wn)}</small><b>${d.getDate()}</b>${n.length?`<i class="${late?'r':'a'}"></i>`:'<i></i>'}</button>`}
 return`<div class="sglweek">${h}</div>`}
Hooks.act('sglday',d=>{const A=(()=>{try{return stDlAll()}catch{return[]}})().filter(t=>t.k===d.k);m.sglD=A;
 const lab=(()=>{try{return new Date(d.k+'T12:00:00').toLocaleDateString(he(),{weekday:'long',day:'numeric',month:'long'})}catch{return d.k}})();
 const sh=H(sglt('day',{d:lab}),A.length?`<div class="sgm">${A.map((t,j)=>`<button type="button" data-j="${j}">${i(t.t)}<small>${i([t.w,stWhen(t.k)].filter(Boolean).join(' · '))}</small></button>`).join('')}</div>`:`<p class="sgnone">${i(sglt('noDay'))}</p>`);
 sh.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{const t=m.sglD[+b.dataset.j];sh.remove();try{sgOpen(t)}catch{}})});
function sglRing(){let F=[];try{F=stFull()}catch{}if(!F.length)return'';const a=F.filter(x=>x.ok).length,p=Math.round(a/F.length*100);
 return`<button type="button" class="sglring" data-act="stfull"><span class="sglr" style="--p:${p}%"><b>${p}%</b></span><span><b>${i(sglt('papers'))}</b><small>${i(sglt('ofN',{a,b:F.length}))}</small></span><i>›</i></button>`}
function sglCap(){const b=(a,ic,k)=>`<button type="button" data-sglc="${a}">${ic}<span>${i(sglt(k))}</span></button>`;
 return`<div class="sglcap">${b('cam',dhi('scan'),'scan')}${b('pic',sti('pic'),'pics')}${b('file',sti('file'),'file')}<button type="button" data-act="stcap" aria-label="${i(sglt('more'))}"><span class="sgldots">⋯</span><span>${i(sglt('more2'))}</span></button></div>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-sglc]');if(!b)return;const a=b.dataset.sglc;try{if(a==='cam')stPick(null);else if(a==='pic')stPick('.sc9gi:not(.sc9ni)');else stPick('.sc9fi')}catch(er){Hooks.err('sglcap',er)}});
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn())return;const cl=SGL_R[m.route];if(!cl)return;const sc=document.querySelector('.screen.'+cl);if(!sc)return;sglHead(sc);
 if(cl==='frw'&&!sc.querySelector('.sglweek')){const t=sc.querySelector('.bgtitle');t&&t.insertAdjacentHTML('afterend',sglWeek())}
 if(cl==='ddw'&&!sc.querySelector('.sglring')){const bk=sc.querySelector('.ddbk');bk&&bk.insertAdjacentHTML('afterend',sglRing())}
 if(cl==='egw'&&!sc.querySelector('.sglcap')){const t=sc.querySelector('.bgtitle');t&&t.insertAdjacentHTML('afterend',sglCap())}
 sc.querySelectorAll('.frm').forEach(r=>{const em=r.querySelector('em');const ic=r.querySelector(':scope>i');if(!em||!ic||r.dataset.sg)return;r.dataset.sg=1;const c=sglSign(+(em.dataset.n||0));em.className='sgp '+c;em.textContent=(c==='r'?'⚠ ':c==='y'?'⏰ ':'✓ ')+em.textContent});
 sc.querySelectorAll('.ddsr').forEach(r=>{const ic=r.querySelector(':scope>i'),sp=r.querySelector(':scope>span');if(!ic||!sp||r.dataset.sg)return;r.dataset.sg=1;const c=ic.className;sp.textContent=(c==='r'?'⚠ ':'')+sp.textContent})}catch(e){Hooks.err('sglscreens',e)}});
Hooks.css('docs-screens-glas',`
:root[data-bd] .sglw>.sub-hdr,:root[data-bd] .sglw>.odin{display:none!important}
.bgtitle{font:700 30px/1.15 var(--display);letter-spacing:-.02em;margin:2px 2px 12px;color:var(--ink)}
/* week strip */
.sglweek{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin:0 0 14px}
.sglday{display:flex;flex-direction:column;align-items:center;gap:1px;border:1px solid var(--bd-edge,var(--line));border-radius:14px;background:var(--bd-glass,var(--surface));color:var(--ink);font:inherit;padding:7px 0 5px;cursor:pointer;min-width:0}
.sglday small{font-size:12px;color:var(--muted)}.sglday b{font-size:18px;font-weight:600}.sglday i{width:6px;height:6px;border-radius:50%;margin-top:2px}
.sglday i.a{background:var(--bd-acc,var(--green))}.sglday i.r{background:#d2492f}
.sglday.on{background:var(--bd-acc,var(--green));border-color:transparent;color:#fff}.sglday.on small{color:#ffffffd0}.sglday.on i.a,.sglday.on i.r{background:#fff}
:root[data-bd="dunkel"] .sglday.on{color:#05201A}:root[data-bd="dunkel"] .sglday.on small{color:#05201Acc}:root[data-bd="dunkel"] .sglday.on i.a{background:#05201A}
/* rows with signs instead of dots */
:root[data-bd] .frm>i,:root[data-bd] .ddsr>i{display:none!important}
:root[data-bd] .frm em.sgp{font-style:normal}
:root[data-bd] .frl{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;display:flex;flex-direction:column;gap:8px}
:root[data-bd] .frr{background:var(--bd-glass);border:1px solid var(--bd-edge);border-radius:16px;box-shadow:0 6px 18px rgba(20,40,35,.05)}
:root[data-bd] .frw .odh{font-size:13px!important;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)!important;font-family:var(--body)!important;margin:14px 4px 8px!important;font-weight:700}
:root[data-bd] .egtabs button{border-radius:18px;background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;font-size:14.5px}
:root[data-bd] .egtabs button.on{background:var(--bd-acc)!important;color:#fff!important;border-color:transparent!important}:root[data-bd="dunkel"] .egtabs button.on{color:#05201A!important}
/* Dokumente: ring */
.sglring{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 12px;border:1px solid var(--bd-edge,var(--line));border-radius:18px;background:var(--bd-glass,var(--surface));color:var(--ink);font:inherit;padding:10px 14px;text-align:left;cursor:pointer}
.sglr{flex:none;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--bd-acc,var(--green)) var(--p),color-mix(in srgb,var(--bd-acc,var(--green)) 16%,transparent) 0);-webkit-mask:radial-gradient(circle,transparent 19px,#000 20px);mask:radial-gradient(circle,transparent 19px,#000 20px);position:relative}
.sglring>.sglr b{position:absolute}.sglring>span:nth-child(2){flex:1;min-width:0}.sglring>span b{display:block;font-size:16px}.sglring small{font-size:13.5px;color:var(--muted)}.sglring>i{font-style:normal;color:var(--muted);font-size:22px}
.sglring .sglr{-webkit-mask:none;mask:none;background:none}
.sglring .sglr::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(var(--bd-acc,var(--green)) var(--p),color-mix(in srgb,var(--bd-acc,var(--green)) 16%,transparent) 0);-webkit-mask:radial-gradient(circle,transparent 19px,#000 20px);mask:radial-gradient(circle,transparent 19px,#000 20px)}
.sglring .sglr b{font-size:13px;font-weight:700}
:root[data-bd] .ddsoon{border-radius:20px!important}:root[data-bd] .ddsr span{font-weight:600}
:root[data-bd] .ddqa button.on{background:var(--bd-acc)!important;color:#fff!important;border-color:transparent!important}:root[data-bd] .ddqa button.on svg{color:inherit!important}:root[data-bd="dunkel"] .ddqa button.on{color:#05201A!important}
/* Eingang: capture on top */
.sglcap{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 14px}
.sglcap button{display:flex;flex-direction:column;align-items:center;gap:5px;border:1px solid var(--bd-edge,var(--line));border-radius:16px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 13.5px var(--body);padding:12px 2px 10px;cursor:pointer;min-width:0}
.sglcap button:first-child{background:linear-gradient(150deg,var(--bd-acc,var(--green)),color-mix(in srgb,var(--bd-acc,var(--green)) 65%,#0b2a24));color:#fff;border-color:transparent}
:root[data-bd="dunkel"] .sglcap button:first-child{color:#05201A}
.sglcap svg{width:24px;height:24px;color:var(--bd-acc,var(--green))}.sglcap button:first-child svg{color:inherit}
.sglcap span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sgldots{font-size:22px;line-height:24px;color:var(--bd-acc,var(--green))}
:root[data-bd] .egr .egm,:root[data-bd] .egr .egok{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:16px!important}
:root[data-bd] .egall{background:var(--bd-acc)!important;color:#fff!important;border-radius:18px!important}:root[data-bd="dunkel"] .egall{color:#05201A!important}
`);
