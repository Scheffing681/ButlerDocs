/* Butler Docs — «no doubles» for documents (v23).
   A document is kept once. When a new document gets the same title as one that is already there
   (same sender, or no sender on both), a small bar says so: «Ansehen» opens the old one, «Beide behalten» hides the bar.
   Nothing is merged or deleted on its own. Other places (Karriere, Behörden, Steuer) only link to documents, they never copy them. */
const ndS={has:['Такой документ уже есть: «%t»','Dieses Dokument gibt es schon: „%t“','This document is already there: “%t”'],
 look:['Посмотреть','Ansehen','View'],keep:['Оставить оба','Beide behalten','Keep both']};
const ndt=(k,o)=>{let s=cv5n(ndS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const ndKey=d=>String(d&&d.title||'').toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/\b(kopie|copy|копия|scan|скан)\b/g,'').replace(/[^a-zа-яё0-9]+/g,'');
const ndP=d=>String(d&&d.party||'').toLowerCase().replace(/[^a-zа-яёäöüß0-9]+/g,'');
const ndSeen=new Set();let ndBusy=!1;
function ndCheck(){if(ndBusy)return;let A=[];try{A=Ke().items.filter(d=>d&&!d.type&&d.title)}catch{return}
 const now=Date.now();for(const d of A){if(ndSeen.has(d.id))continue;ndSeen.add(d.id);if(d.ndOk||!(now-(d.ts||0)<10*60e3))continue;
  const k=ndKey(d);if(k.length<3)continue;const o=A.find(z=>z!==d&&z.id!==d.id&&ndKey(z)===k&&ndP(z)===ndP(d)&&(z.ts||0)<=(d.ts||0));if(o){ndBar(d,o);break}}}
function ndBar(d,o){document.querySelectorAll('.ndbar').forEach(x=>x.remove());const b=document.createElement('div');b.className='ndbar';b.setAttribute('role','status');
 b.innerHTML=`<span>⧉</span><b>${i(ndt('has',{t:o.title}))}</b><div><button type="button" data-act="dzopen" data-id="${i(o.id)}" data-ndl>${i(ndt('look'))}</button><button type="button" data-ndk>${i(ndt('keep'))}</button></div>`;
 b.addEventListener('click',e=>{if(e.target.closest('[data-ndk]')){d.ndOk=1;ndBusy=!0;try{$()}finally{ndBusy=!1}b.remove()}else if(e.target.closest('[data-ndl]'))setTimeout(()=>b.remove(),50)});
 document.body.appendChild(b);setTimeout(()=>b.remove(),15000)}
Hooks.on('save',()=>{try{ndCheck()}catch(e){Hooks.err('ndcheck',e)}});
Hooks.on('signin',()=>{try{Ke().items.forEach(d=>ndSeen.add(d.id))}catch{}});
Hooks.css('docs-no-doubles',`.krdup b,.krdup small{display:block}.krdup small{margin:2px 0 8px;opacity:.75}.ndbar{font-family:inherit}
.ndbar{position:fixed;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:60;display:grid;grid-template-columns:auto 1fr;gap:6px 10px;align-items:center;padding:12px 14px;border-radius:16px;background:var(--card,#fff);color:var(--ink,#1d2b22);box-shadow:0 8px 28px rgba(0,0,0,.18);border:1px solid rgba(190,150,70,.5)}
.ndbar>span{font-size:20px}.ndbar b{font-size:14px;line-height:1.35}.ndbar>div{grid-column:1/-1;display:flex;gap:8px;justify-content:flex-end}
.ndbar button{border:1px solid rgba(190,150,70,.6);background:transparent;color:inherit;border-radius:999px;padding:7px 14px;font:inherit;font-size:13px}.ndbar [data-ndl]{background:#c49a45;color:#fff;border-color:#c49a45}`);
