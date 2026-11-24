/* ===== Butler Docs: the bottom bar is yours again — with «Ещё» and «Сохранить» (v69) =====
   Glas bar: four places around the Butler orb, g.bdNav (default Start · Dokumente · Fristen · Mehr). «Mehr» always stays
   (it is the way to everything else), the others can be chosen. Editing works on a draft; «Speichern» saves, «Wie vorher» resets.
   The old editor rows (with the old pool, no «Mehr», no save) are hidden in the new look.
   Start also stays still: when everything fits above the bar, the page does not scroll. */
const bnS={t:['Нижняя панель','Untere Leiste','Bottom bar'],s:['Нажмите место, затем то, что туда поставить. Батлер в центре и «Ещё» остаются всегда.','Platz antippen, dann das, was dorthin soll. Butler in der Mitte und «Mehr» bleiben immer.','Tap a place, then what should go there. Butler in the middle and «More» always stay.'],
 save:['Сохранить','Speichern','Save'],reset:['Как было','Wie vorher','Reset'],saved:['Нижняя панель сохранена','Untere Leiste gespeichert','Bottom bar saved'],always:['всегда','immer','always'],
 pool:['Что можно поставить','Was hin kann','What can go there'],chg:['Есть несохранённые изменения','Nicht gespeicherte Änderungen','Unsaved changes']};
const bnt=k=>cv5n(bnS[k]||[k]);
try{const ic=p=>`<svg class="i" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
 const add=(k,lab,p,on)=>{if(!ly6EXT[k])ly6EXT[k]={lab:()=>cv5n(lab),ic:()=>ic(p),open:()=>R(k),on:on||(r=>r===k)};OD_OK.add(k)};
 add('post',['Почта','Post','Mail'],'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l8.2 6 8.2-6"/>',r=>r==='post'||r==='letters');
 add('scan',['Сканер','Scanner','Scanner'],'<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/>');
 add('people',['Семья','Familie','Family'],'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5M14.5 15.2c.8-.7 1.6-1 2.5-1 2 0 3.4 1.4 4 4"/>');
 add('fzm',['Финансы','Finanzen','Finances'],'<circle cx="12" cy="12" r="8.5"/><path d="M15 8.6a4 4 0 1 0 0 6.8M7 11h6M7 13.4h6"/>');
 add('eing',['Входящие','Eingang','Inbox'],'<path d="M4 13l2.5-7h11L20 13v5H4z"/><path d="M4 13h4.5l1 2h5l1-2H20"/>');
}catch(e){Hooks.err('bnext',e)}
const BN_POOL=['home','archive','fristen','post','scan','eing','search','mycal','tasks','people','fzm','notiz','mehr'];
function bnValid(a){if(!Array.isArray(a)||a.length!==4)return null;const s=a.filter((k,j)=>BN_POOL.includes(k)&&a.indexOf(k)===j);if(s.length!==4)return null;if(!s.includes('mehr'))s[3]='mehr';return s}
function bdNavSlots(){return bnValid(g.bdNav)||['home','archive','fristen','mehr']}
function bnEditor(){const D=m.bnD||bdNavSlots(),sel=m.bnSel==null?-1:+m.bnSel,dirty=JSON.stringify(D)!==JSON.stringify(bdNavSlots());
 const slot=(k,j)=>`<button type="button" class="bnsl${sel===j?' on':''}${k==='mehr'?' lk':''}" data-bn="sel" data-i="${j}">${ly6ic(k)}<span>${i(ly6lab(k))}</span>${k==='mehr'?`<em>${i(bnt('always'))}</em>`:''}</button>`;
 return`<section class="bned"><h3 class="ly6h">▦ ${i(bnt('t'))}</h3><p class="ly6p">${i(bnt('s'))}</p>
 <div class="bnslots">${slot(D[0],0)}${slot(D[1],1)}<span class="bnorb"><i class="bdob"></i><span>Butler</span></span>${slot(D[2],2)}${slot(D[3],3)}</div>
 <p class="ly6p sm">${i(bnt('pool'))}</p><div class="bnpool">${BN_POOL.filter(k=>k!=='mehr').map(k=>`<button type="button" class="${D.includes(k)?'u':''}" data-bn="put" data-k="${k}">${ly6ic(k)}<span>${i(ly6lab(k))}</span></button>`).join('')}</div>
 ${dirty?`<p class="bnchg">● ${i(bnt('chg'))}</p>`:''}<div class="bnbtns"><button type="button" class="bnrs" data-bn="reset">↺ ${i(bnt('reset'))}</button><button type="button" class="bnsv${dirty?'':' off'}" data-bn="save">✓ ${i(bnt('save'))}</button></div></section>`}
function bnPaint(){const sc=document.querySelector('.screen.ly6');if(!sc)return;let ed=sc.querySelector('.bned');const h=bnEditor();if(ed){ed.outerHTML=h;return}
 const a=sc.querySelector('#ly6nav');if(!a)return;a.insertAdjacentHTML('beforebegin',h);sc.classList.add('bnon')}
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn()||m.route!=='ly6'){m.bnD=null;m.bnSel=null;return}bnPaint()}catch(e){Hooks.err('bned',e)}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-bn]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.bn,D=(m.bnD||bdNavSlots()).slice();
 if(a==='sel'){const j=+b.dataset.i;if(D[j]==='mehr'){m.bnSel=null}else m.bnSel=m.bnSel===j?null:j}
 else if(a==='put'){let j=m.bnSel;const k=b.dataset.k,ex=D.indexOf(k);if(j==null||j<0){j=D.findIndex(x=>x!=='mehr'&&x!=='home');if(j<0)j=0}
  if(D[j]==='mehr')return;if(ex>=0&&ex!==j)D[ex]=D[j];D[j]=k;m.bnD=D;m.bnSel=null}
 else if(a==='reset'){m.bnD=['home','archive','fristen','mehr'];m.bnSel=null}
 else if(a==='save'){const v2=bnValid(D);if(!v2)return;g.bdNav=v2;m.bnD=null;m.bnSel=null;$();T(bnt('saved'));v();return}
 bnPaint()},!0);
/* Start: no scrolling when everything fits above the bar */
function bnFit(){try{const sc=document.querySelector('.screen.sgs');if(!sc||typeof bdOn!=='function'||!bdOn())return;sc.style.overflowY='';const nav=document.querySelector('.nav.bdnav'),last=[...sc.children].filter(x=>x.offsetParent).pop();if(!nav||!last)return;
 const top=sc.scrollTop;const bottom=last.getBoundingClientRect().bottom+top,lim=nav.getBoundingClientRect().top+4;
 if(bottom<=lim){sc.scrollTop=0;sc.style.overflowY='hidden';sc.classList.add('bnfit')}else sc.classList.remove('bnfit')}catch(e){Hooks.err('bnfit',e)}}
Hooks.on('render',()=>{if(m.route==='home')requestAnimationFrame(bnFit)});addEventListener('resize',()=>{if(m.route==='home')bnFit()});
Hooks.css('docs-nav-edit',`
:root[data-bd] .ly6.bnon #ly6nav,:root[data-bd] .ly6.bnon #ly6nav+.ly6p,:root[data-bd] .ly6.bnon .ly6slots,:root[data-bd] .ly6.bnon .ly6tip,:root[data-bd] .ly6.bnon .ly6pool,:root[data-bd] .ly6.bnon .ly6pool+*:not(.ly6h)~.nothing{display:none!important}
:root[data-bd] .ly6.bnon .ly6p.sm:has(+.ly6pool){display:none!important}
.bned{margin:0 0 8px}.bnslots{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;align-items:end;margin:8px 0 12px}
.bnsl{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;border:1.5px dashed color-mix(in srgb,var(--bd-acc,var(--green)) 45%,transparent);border-radius:16px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 12.5px var(--body);padding:10px 2px 8px;cursor:pointer}
.bnsl svg{width:22px;height:22px;color:var(--bd-acc,var(--green))}.bnsl span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bnsl.on{border:2px solid var(--bd-acc,var(--green));box-shadow:0 0 0 3px color-mix(in srgb,var(--bd-acc,var(--green)) 18%,transparent)}
.bnsl.lk{border-style:solid;border-color:var(--bd-edge,var(--line))}.bnsl em{position:absolute;top:-8px;right:-2px;font-style:normal;font-size:10.5px;background:var(--bd-acc,var(--green));color:#fff;border-radius:8px;padding:1px 5px}
.bnorb{display:flex;flex-direction:column;align-items:center;gap:3px;font:600 12.5px var(--body);color:var(--ink)}.bnorb .bdob{width:50px;height:50px}
.bnpool{display:flex;flex-wrap:wrap;gap:8px}.bnpool button{display:flex;align-items:center;gap:6px;border:1px solid var(--bd-edge,var(--line));border-radius:14px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 14.5px var(--body);padding:8px 12px;cursor:pointer}
.bnpool button svg{width:20px;height:20px;color:var(--bd-acc,var(--green))}.bnpool button.u{border:1.5px solid var(--bd-acc,var(--green));color:var(--bd-acc,var(--green))}
.bnchg{margin:12px 2px 0;color:#b06a10;font-size:14px;font-weight:600}
.bnbtns{display:grid;grid-template-columns:1fr 1.4fr;gap:10px;margin-top:12px}.bnbtns button{border-radius:16px;padding:13px;font:700 16px var(--body);cursor:pointer}
.bnrs{border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink)}
.bnsv{border:0;background:var(--bd-acc,var(--green));color:#fff}:root[data-bd=dunkel] .bnsv{color:#05201A}.bnsv.off{opacity:.45}
.screen.sgs.bnfit{overscroll-behavior:none}
`);
