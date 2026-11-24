/* ===== Butler Docs: one colour per area (v66) — «B with the correction» =====
   Your things are coloured folders (the same look as the folders in «Dokumente»): «Alle Bereiche» and the area tiles on Start.
   The app's functions stay calm: «Weitere» gets turquoise icons on glass.
   One area = one colour everywhere (Arbeit brown, Gesundheit red, Familie gold, Finanzen green …).
   «Alle Bereiche» loses «Dokumente» and «Fristen» (both are in the bar) and gains «Post» and «Lebensbuch» (→ 3 × 3).
   The old hub tabs (Dokumente · Briefe · Gesetze · Scanner) are hidden on «Dokumente». */
const FB_C={archive:'#6b80d6',personal:'#5b9bd5',dsrok:'#e0894a',dl:'#e0894a',bsv:'#7d8ca3',gov:'#7d8ca3',fzm:'#5fa57c',fin:'#5fa57c',kar:'#b5794a',work:'#b5794a',
 med:'#d36a6a',people:'#d4a13c',fam:'#d4a13c',dnach:'#8d72c8',vor:'#8d72c8',post:'#3f9fa3',life:'#9a8f5c'};
const fbS={post:['Почта','Post','Mail'],postS:['Писать и получать письма','Briefe schreiben, bekommen','Write and receive letters'],
 life:['Книга жизни','Lebensbuch','Life book'],lifeS:['Воспоминания, история','Erinnerungen, Geschichte','Memories, history']};
const fbt=k=>cv5n(fbS[k]||[k]);
const fbKey=b=>b.dataset.k||b.dataset.v||b.dataset.to||b.dataset.act||'';
const FB_SV={post:'<svg class="dhi big" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l8.2 6 8.2-6"/></svg>',
 life:'<svg class="dhi big" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5zM12 6v13"/></svg>'};
function fbWrap(b,cls){if(b.querySelector(':scope>.'+cls))return;const sv=b.querySelector(':scope>svg');if(!sv)return;const c=FB_C[fbKey(b)];if(cls==='ddf'&&!c)return;
 const w=document.createElement('span');w.className=cls;if(c)w.style.setProperty('--c',c);sv.replaceWith(w);w.appendChild(sv)}
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn())return;const sc=document.querySelector('.screen');if(!sc)return;
 if(m.route==='dall'){const g2=sc.querySelector('.brg');if(g2&&!g2.dataset.fb){g2.dataset.fb=1;
   g2.querySelectorAll('.brt[data-to=archive],.brt[data-to=dsrok]').forEach(b=>b.remove());
   const t=g2.querySelector('.brt');const mk=(to,lab,sub)=>{if(!t||g2.querySelector(`.brt[data-to="${to}"]`))return;const n=document.createElement('button');n.type='button';n.className='dht brt';n.dataset.act='go';n.dataset.to=to;n.innerHTML=`${FB_SV[to]}<b>${i(fbt(lab))}</b><small>${i(fbt(sub))}</small>`;g2.appendChild(n)};
   mk('post','post','postS');mk('life','life','lifeS');
   sc.querySelectorAll('.brm .brw[data-to=life]').forEach(b=>b.remove())}
  sc.querySelectorAll('.brg .brt').forEach(b=>fbWrap(b,'ddf'));sc.querySelectorAll('.brm .brw').forEach(b=>fbWrap(b,'fbcalm'))}
 if(m.route==='home')sc.querySelectorAll('.sgar .sga').forEach(b=>fbWrap(b,'ddf'))}catch(e){Hooks.err('fbpaint',e)}});
Hooks.css('docs-farben',`
:root[data-bd] .ddw>.h9tabs{display:none!important}
:root[data-bd] .brt .ddf{margin:6px auto 8px}:root[data-bd] .brt .ddf svg{width:20px!important;height:20px!important;color:#fff!important;stroke:#fff!important}
:root[data-bd] .sga .ddf{width:46px;height:34px;margin:6px auto 4px}:root[data-bd] .sga .ddf svg{width:17px!important;height:17px!important;color:#fff!important;stroke:#fff!important}
:root[data-bd] .sga .ddf:before{width:20px;height:8px;top:-5px}
.fbcalm{width:40px;height:40px;border-radius:12px;margin:0 auto 4px;background:color-mix(in srgb,var(--bd-acc,var(--green)) 14%,transparent);display:grid;place-items:center}
.fbcalm svg{width:22px!important;height:22px!important;color:var(--bd-acc,var(--green))!important;stroke:var(--bd-acc,var(--green))!important;margin:0!important}
`);
