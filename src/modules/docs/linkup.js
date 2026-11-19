/* ===== Butler Docs: one document — several places (v42) =====
   A document is saved ONCE in «Dokumente»; other sections only link to it.
   1. After saving a new document whose place is clear:
      - type chosen by the user in «Welches Dokument?» (dtype work + named) and exactly one current employer →
        linked at once, bar «Auch bei X gezeigt · Rückgängig»;
      - otherwise a short question «Auch hier zeigen?» (employers / new employer / Mein Business place).
      No matching place → no question. Two «Nein» for one kind → offer «Nicht mehr fragen».
   2. In the document: «Erscheint auch in» with chips (× removes the link, the document stays) and «＋ Weitere Stelle».
   3. Once: «N Dokumente passen zu …» on the employer tab — link all in one tap, or «Später» (30 days).
   Data: g.lnq={seen:[ids],done:{id:1},no:{k:n},mute:{k:1},later:ts} */
const LNQ={
 ask:['Показать и здесь? (без копии)','Auch hier zeigen? (keine Kopie)','Show here too? (no copy)'],saved:['Сохранено один раз в «Документах»','Einmal in «Dokumente» gespeichert','Saved once in «Documents»'],
 newJ:['Добавить работодателя «%n»','Arbeitgeber «%n» anlegen','Add employer «%n»'],newJ0:['Добавить работодателя','Arbeitgeber neu anlegen','Add an employer'],coN:['Название фирмы','Name der Firma','Company name'],
 done:['Готово','Fertig','Done'],only:['Оставить только в «Документах»','Nur in Dokumente lassen','Keep only in Documents'],mute:['Больше не спрашивать для «%k»','Für «%k» nicht mehr fragen','Stop asking for «%k»'],
 bar:['Показано и у %n','Auch bei %n gezeigt','Also shown at %n'],undo:['Отменить','Rückgängig','Undo'],
 also:['Показан также в','Erscheint auch in','Also shown in'],more:['＋ Ещё место','＋ Weitere Stelle','＋ Another place'],xS:['× убирает отсюда – документ остаётся.','× nimmt es dort weg – das Dokument bleibt.','× removes it there – the document stays.'],
 none:['Пока только в «Документах»','Bisher nur in «Dokumente»','Only in «Documents» so far'],tax:['→ также в Steuer-Mappe %y','→ auch in der Steuer-Mappe %y','→ also in the tax folder %y'],
 where:['Куда ещё?','Wo noch zeigen?','Where else?'],emp:['Работодатель','Arbeitgeber','Employer'],biz:['Mein Business','Mein Business','My business'],slot:['Какое место?','Welcher Platz?','Which place?'],other:['Прочее','Sonstiges','Other'],
 noPl:['Подходящих мест нет. Работодателя можно добавить в «Arbeit & Business».','Keine passenden Stellen. Einen Arbeitgeber legen Sie in «Arbeit & Business» an.','No matching places. Add an employer in «Work & business».'],
 vsg:['Завещание и доверенности','Testament & Vorsorge','Will & powers'],ban:['%n док. подходят к %c','%n Dokumente passen zu %c','%n documents match %c'],banS:['Они уже в «Документах» – связать?','Sie liegen schon in «Dokumente» – verknüpfen?','They are already in «Documents» – link them?'],
 banGo:['Связать %n','%n verknüpfen','Link %n'],later:['Позже','Später','Later'],linked:['Связано: %n','Verknüpft: %n','Linked: %n']
};
const lnqT=(k,o)=>{let s=cv5n(LNQ[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
function lnqD(){const o=g.lnq=g.lnq&&typeof g.lnq==='object'?g.lnq:{};for(const k of['done','no','mute'])o[k]=o[k]&&typeof o[k]==='object'?o[k]:{};if(!Array.isArray(o.seen))o.seen=null;return o}
const lnqItems=()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const lnqJobs=()=>{try{return krD().jobs.filter(j=>j&&!j.del)}catch{return[]}};
const lnqQuiet=()=>{try{bsvQuiet()}catch{}};
const lnqNorm=s=>String(s||'').toLowerCase().replace(/\b(gmbh|ag|kg|se|e\.?v\.?|co\.?|ug|ohg|mbh|&)\b/g,'').replace(/[^a-zа-яёäöüß0-9]+/g,'');
const lnqWork=d=>d.dtype==='work'||d.dcat==='work';
const lnqSlotLab=k=>{try{return krt2('s_'+k)}catch{return k}};
function lnqBizK(d){const t=String(d.title||'').toLowerCase();return/gewerbeanmeld|gewerbeschein/.test(t)?'gew':/handelsregister|\bihk\b/.test(t)?'hr':/betriebshaftpflicht/.test(t)?'bhv':''}
/* where is the document linked now */
function lnqWhere(id){const W=[];for(const j of lnqJobs())if((j.docs||[]).includes(id)){let k='';try{k=krDk(j)[id]||''}catch{}W.push({t:'job',j,k})}
 try{if(bzxOn()&&bzxD().docs.includes(id))W.push({t:'biz',k:bzxD().dk[id]||''})}catch{}
 try{for(const[k]of VSG_S)if(vsgDocs(k).some(d=>d.id===id))W.push({t:'vsg',k})}catch{}return W}
function lnqLinkJob(j,id,k){j.docs=j.docs||[];if(!j.docs.includes(id))j.docs.push(id);j.dk=j.dk&&typeof j.dk==='object'?j.dk:{};j.dk[id]=k||'';try{krJobTasks&&krJobTasks(j)}catch{}}
function lnqUnlinkJob(j,id){j.docs=(j.docs||[]).filter(z=>z!==id);if(j.dk)delete j.dk[id]}
/* ---------- 1. after saving ---------- */
let lnqBusy=0;
function lnqScan(){const B=lnqD(),A=lnqItems();if(!B.seen){B.seen=A.map(d=>d.id);return}
 if(lnqBusy||document.querySelector('.dtsheet')||!['bdoc','arcf','archive','docs','home','kar','karj','fzm'].includes(m.route))return;
 const seen=new Set(B.seen);for(const d of A){if(seen.has(d.id))continue;if(!((d.pages||[]).length||(d.files||[]).length))continue;
  B.seen.push(d.id);if(B.done[d.id])continue;B.done[d.id]=1;const r=lnqPlan(d);if(r){lnqBusy=1;setTimeout(()=>{try{r()}finally{lnqBusy=0}},450)}lnqQuiet();$();return}
 if(B.seen.length>4000)B.seen=B.seen.filter(id=>A.some(d=>d.id===id))}
function lnqPlan(d){const B=lnqD();if(lnqWhere(d.id).some(w=>w.t!=='vsg'))return null;
 const k=lnqWork(d)?krGuess(d):'';if(k){if(B.mute[k])return null;const J=lnqJobs(),act=J.filter(j=>!j.to);
  if(d.dtype==='work'&&d.named===1&&act.length===1&&!(J.length>1))return()=>{lnqLinkJob(act[0],d.id,k);lnqQuiet();$();v();lnqBar(lnqT('bar',{n:act[0].co||'—'}),()=>{lnqUnlinkJob(act[0],d.id);lnqQuiet();$();v()})};
  return()=>lnqAsk(d,k)}
 const bk=(()=>{try{return bzxOn()?lnqBizK(d):''}catch{return''}})();if(bk&&!B.mute['b_'+bk])return()=>lnqAsk(d,'',bk);return null}
function lnqAsk(d,k,bk){document.querySelectorAll('.lnqbar').forEach(z=>z.remove());const B=lnqD(),J=lnqJobs(),act=J.filter(j=>!j.to),pre=act.length===1?act[0].id:'',mk=k||'b_'+bk;
 const opts=k?J.map(j=>`<label class="lnqopt"><input type="checkbox" data-lj="${i(j.id)}" ${j.id===pre?'checked':''}><span><b>${i(lnqT('emp'))} › ${i(j.co||'—')}</b><small>${i(lnqSlotLab(k))}${j.to?' · '+i(String(j.to)):''}</small></span></label>`).join('')
  +`<label class="lnqopt"><input type="checkbox" data-ln ${J.length?'':'checked'}><span><b>${i(d.party?lnqT('newJ',{n:d.party}):lnqT('newJ0'))}</b><small>${i(lnqSlotLab(k))}</small></span></label><input class="field lnqco" placeholder="${i(lnqT('coN'))}" value="${i(d.party||'')}" ${J.length?'hidden':''} autocomplete="off">`
  :`<label class="lnqopt"><input type="checkbox" data-lb checked><span><b>${i(lnqT('biz'))} › ${i(bzxT('s_'+bk))}</b><small>${i(bzxD().firm.n||'')}</small></span></label>`;
 H(lnqT('ask'),`<div class="lnqdoc">📄 <span><b>${i(d.title||'—')}</b><small>${i(lnqT('saved'))}</small></span></div>${opts}
 <button type="button" class="dcadd gold" data-lok>${i(lnqT('done'))}</button><button type="button" class="lnqno" data-lno>${i(lnqT('only'))}</button>
 ${(B.no[mk]||0)>=1?`<button type="button" class="lnqno sm" data-lmute>${i(lnqT('mute',{k:k?lnqSlotLab(k):bzxT('s_'+bk)}))}</button>`:''}`,
 sh=>{sh.classList.add('bsvsh','lnqsh');const nb=sh.querySelector('[data-ln]'),co=sh.querySelector('.lnqco');nb&&(nb.onchange=()=>{co.hidden=!nb.checked;nb.checked&&co.focus()});
  sh.querySelector('[data-lok]').onclick=()=>{let n=0;
   if(k){sh.querySelectorAll('[data-lj]:checked').forEach(c=>{const j=J.find(z=>z.id===c.dataset.lj);if(j){lnqLinkJob(j,d.id,k);n++}});
    if(nb&&nb.checked&&co.value.trim()){const j={id:V(),co:co.value.trim().slice(0,80),from:'',to:'',docs:[],proj:[]};krD().jobs.push(j);lnqLinkJob(j,d.id,k);n++}}
   else if(sh.querySelector('[data-lb]:checked')){try{bzxLink(bk,d.id)}catch{}n++}
   if(!n)B.no[mk]=(B.no[mk]||0)+1;sh.remove();lnqQuiet();$();v()};
  sh.querySelector('[data-lno]').onclick=()=>{B.no[mk]=(B.no[mk]||0)+1;sh.remove();lnqQuiet();$()};
  const mu=sh.querySelector('[data-lmute]');mu&&(mu.onclick=()=>{B.mute[mk]=1;sh.remove();lnqQuiet();$()})})}
function lnqBar(t,undo){document.querySelectorAll('.lnqbar').forEach(z=>z.remove());const b=document.createElement('div');b.className='lnqbar';
 b.innerHTML=`<span>✓ ${i(t)}</span><button type="button">${i(lnqT('undo'))}</button>`;b.querySelector('button').onclick=()=>{b.remove();undo()};document.body.appendChild(b);setTimeout(()=>b.remove(),8000)}
/* ---------- 2. in the document ---------- */
function lnqDocHtml(id){const d=lnqItems().find(z=>z.id===id);if(!d)return'';const W=lnqWhere(id);
 const ch=W.map(w=>w.t==='job'?`<button type="button" class="lnqchip" data-act="lnqrm" data-t="job" data-j="${i(w.j.id)}" data-id="${i(id)}">💼 ${i(w.j.co||'—')}${w.k?' · '+i(lnqSlotLab(w.k)):''} ×</button>`
  :w.t==='biz'?`<button type="button" class="lnqchip" data-act="lnqrm" data-t="biz" data-id="${i(id)}">🏪 ${i(lnqT('biz'))}${w.k?' · '+i(bzxT('s_'+w.k)):''} ×</button>`
  :`<button type="button" class="lnqchip" data-act="lnqrm" data-t="vsg" data-k="${i(w.k)}" data-id="${i(id)}">📜 ${i(lnqT('vsg'))} ×</button>`).join('');
 let tax='';const lj=W.find(w=>w.t==='job'&&w.k==='lst');if(lj){const ys=String(d.title||'').match(/\b(20\d\d)\b/);const y=ys?ys[1]:new Date(d.ts||Date.now()).getFullYear()-1;tax=`<small class="lnqtax">${i(lnqT('tax',{y}))}</small>`}
 return`<div class="dhcard lnqcard"><h5>${i(lnqT('also'))}</h5><div class="lnqchips">${ch||`<small class="lnqnone">${i(lnqT('none'))}</small>`}<button type="button" class="lnqchip add" data-act="lnqadd" data-id="${i(id)}">${i(lnqT('more'))}</button></div>${tax}${W.length?`<small class="lnqx">${i(lnqT('xS'))}</small>`:''}</div>`}
function lnqAddSheet(id){const d=lnqItems().find(z=>z.id===id);if(!d)return;const J=lnqJobs(),W=lnqWhere(id);let bz=!1;try{bz=bzxOn()}catch{}
 const rows=J.filter(j=>!W.some(w=>w.t==='job'&&w.j.id===j.id)).map(j=>`<button type="button" class="lnqrow" data-aj="${i(j.id)}"><span class="e">💼</span><span><b>${i(j.co||'—')}</b><small>${i(lnqT('emp'))}</small></span><em>›</em></button>`).join('')
  +(bz&&!W.some(w=>w.t==='biz')?`<button type="button" class="lnqrow" data-ab><span class="e">🏪</span><span><b>${i(lnqT('biz'))}</b><small>${i(bzxD().firm.n||'')}</small></span><em>›</em></button>`:'');
 H(lnqT('where'),rows?`<div class="dhcard odl lnql">${rows}</div>`:`<p class="fdsmall">${i(lnqT('noPl'))}</p>`,
 sh=>{sh.classList.add('bsvsh','lnqsh');sh.querySelectorAll('[data-aj]').forEach(b=>b.onclick=()=>{const j=J.find(z=>z.id===b.dataset.aj);sh.remove();lnqSlotSheet(KR_SLOT.map(z=>z[0]),lnqSlotLab,krGuess(d),k=>{lnqLinkJob(j,id,k)})});
  const bb=sh.querySelector('[data-ab]');bb&&(bb.onclick=()=>{sh.remove();lnqSlotSheet(BZX_SLOT.map(z=>z[0]),k=>bzxT('s_'+k),lnqBizK(d),k=>{bzxLink(k,id)},1)})})}
function lnqSlotSheet(keys,lab,guess,cb,noOther){H(lnqT('slot'),`<div class="dhcard odl lnql">${keys.concat(noOther?[]:['']).map(k=>`<button type="button" class="lnqrow ${k===guess?'on':''}" data-ak="${k}"><span><b>${i(k?lab(k):lnqT('other'))}</b></span><em>${k===guess?'✓':'›'}</em></button>`).join('')}</div>`,
 sh=>{sh.classList.add('bsvsh','lnqsh');sh.querySelectorAll('[data-ak]').forEach(b=>b.onclick=()=>{cb(b.dataset.ak);sh.remove();lnqQuiet();$();v()})})}
/* ---------- 3. once: documents that are already there ---------- */
function lnqFind(){const out=[],used=new Set();for(const j of lnqJobs())(j.docs||[]).forEach(id=>used.add(id));try{if(bzxOn())bzxD().docs.forEach(id=>used.add(id))}catch{}
 const A=lnqItems().filter(d=>!used.has(d.id));for(const j of lnqJobs()){const c=lnqNorm(j.co);if(c.length<3)continue;
  const L=A.filter(d=>{const s=lnqNorm([d.title,d.party].join(' '));return s.includes(c)&&(lnqWork(d)||krGuess(d))&&!out.some(o=>o.L.includes(d))});if(L.length)out.push({j,L})}return out}
function lnqBanner(){try{const B=lnqD();if(B.later&&Date.now()-B.later<30*864e5)return'';const F=lnqFind();if(!F.length)return'';const f=F[0];
 return`<div class="dhcard lnqban"><b>${i(lnqT('ban',{n:f.L.length,c:f.j.co}))}</b><small>${i(lnqT('banS'))}</small><div class="lnqbl">${f.L.slice(0,5).map(d=>`<span>📄 ${i(d.title||'—')}${krGuess(d)?` <em>${i(lnqSlotLab(krGuess(d)))}</em>`:''}</span>`).join('')}${f.L.length>5?`<span>…</span>`:''}</div>
 <div class="lnqbb"><button type="button" class="dcadd gold" data-act="lnqall" data-j="${i(f.j.id)}">${i(lnqT('banGo',{n:f.L.length}))}</button><button type="button" class="lnqno" data-act="lnqlater">${i(lnqT('later'))}</button></div></div>`}catch(e){Hooks.err('lnqban',e);return''}}
/* ---------- wiring ---------- */
Hooks.on('save',()=>{clearTimeout(lnqScan.t);lnqScan.t=setTimeout(()=>{try{lnqScan()}catch(e){Hooks.err('lnqscan',e)}},900)});
function lnqPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.lnqcard'))return;const h=lnqDocHtml(m.bdid);if(!h)return;let pb=sc.querySelector('[data-act=dzprint]');while(pb&&pb.parentElement&&pb.parentElement!==sc)pb=pb.parentElement;if(pb&&pb.parentElement===sc){const hr=pb.previousElementSibling&&pb.previousElementSibling.tagName==='HR'?pb.previousElementSibling:pb;hr.insertAdjacentHTML('beforebegin',h)}else sc.insertAdjacentHTML('beforeend',h)}catch(er){Hooks.err('lnqdoc',er)}}
Hooks.on('render',()=>{lnqPut();setTimeout(lnqPut,0);setTimeout(lnqPut,350)});
Hooks.act('lnqrm',d=>{if(d.t==='job'){const j=lnqJobs().find(z=>z.id===d.j);j&&lnqUnlinkJob(j,d.id)}else if(d.t==='biz'){try{const B=bzxD();B.docs=B.docs.filter(z=>z!==d.id);delete B.dk[d.id]}catch{}}
 else if(d.t==='vsg'){try{const o=vsgD()[d.k];o.docs=(o.docs||[]).filter(z=>z!==d.id);if(!o.no.includes(d.id))o.no.push(d.id)}catch{}}lnqQuiet();$();v()});
Hooks.act('lnqadd',d=>lnqAddSheet(d.id));
Hooks.act('lnqall',d=>{const F=lnqFind().find(f=>f.j.id===d.j);if(!F)return;F.L.forEach(x=>lnqLinkJob(F.j,x.id,krGuess(x)));lnqQuiet();$();v();T(lnqT('linked',{n:F.L.length}))});
Hooks.act('lnqlater',()=>{lnqD().later=Date.now();lnqQuiet();$();v()});
Hooks.css('docs-linkup',`
.lnqsh .lnqdoc{display:flex;gap:10px;align-items:center;background:#fff;border-radius:14px;padding:10px 12px;margin:0 0 10px;font-size:22px}.lnqdoc span{font-size:14px}.lnqdoc b{display:block;font-size:15px}.lnqdoc small{color:var(--muted);font-size:12.5px}
.lnqopt{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1.5px solid #cfdcc9;border-radius:14px;padding:11px 12px;margin:7px 0}.lnqopt:has(input:checked){border-color:#2f6b3e;background:#f3f8f1}.lnqopt input{width:21px;height:21px;flex:none;margin-top:1px;accent-color:#2f6b3e}.lnqopt b{display:block;font-size:14.5px}.lnqopt small{color:var(--muted);font-size:12.5px}
.lnqco{margin:4px 0 6px}.lnqno{display:block;width:100%;background:none;border:0;color:var(--muted);font-size:14.5px;padding:12px 0 2px;text-align:center}.lnqno.sm{font-size:13px;padding-top:6px;text-decoration:underline}
.lnqbar{font-family:-apple-system,Inter,Helvetica,Arial,sans-serif;position:fixed;left:12px;right:12px;bottom:calc(96px + env(safe-area-inset-bottom));z-index:9999;background:#203a2a;color:#fff;border-radius:14px;padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.25)}.lnqbar span{flex:1}.lnqbar button{background:none;border:0;color:#f0cf86;font-weight:700;font-size:14px}
.lnqcard h5{margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.lnqchips{display:flex;flex-wrap:wrap;gap:7px}.lnqchip{background:#e3efe2;color:#2f6b3e;border:0;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:600}.lnqchip.add{background:transparent;color:#8a6420;border:1.5px dashed #c49a45}
.lnqx,.lnqtax,.lnqnone{display:block;color:var(--muted);font-size:12.5px;margin-top:7px}.lnqnone{margin:6px 4px 0 0;display:inline-block}.lnqtax{color:#2f6b3e}
.lnqban{background:#eef3ea!important;border:1px solid #cfdcc9;margin-top:10px}.lnqban>b{display:block;font-size:15px;color:#2f5a38}.lnqban>small{color:var(--muted);font-size:12.5px}.lnqbl{margin:8px 0}.lnqbl span{display:block;font-size:13.5px;padding:3px 0}.lnqbl em{font-style:normal;color:#2f6b3e;font-weight:700;font-size:12px;margin-left:4px}.lnqbb .dcadd{margin-top:4px}
.lnqrow{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid rgba(0,0,0,.06);padding:12px 2px;color:inherit;font:inherit}.lnqrow:last-child{border-bottom:0}.lnqrow span{flex:1;min-width:0}.lnqrow .e{flex:none;font-size:20px}.lnqrow b{display:block;font-size:15px}.lnqrow small{color:var(--muted);font-size:12.5px}.lnqrow em{font-style:normal;color:#a8812e;font-weight:700}.lnqrow.on b,.lnqrow.on em{color:#2f6b3e}.lnql{padding:2px 14px!important}
.lnqcard{font-family:-apple-system,Inter,Helvetica,Arial,sans-serif;margin:14px 0!important}
`);
