/* ===== Butler Docs: arrange tiles like on the iPhone (v66) =====
   Press and hold a tile (0.8 s) → the tiles wiggle; drag one to another place; «Fertig» saves. «Zurücksetzen» = the original order.
   Works on: Start (area tiles), «Alle Bereiche» (areas and «Weitere»), «Dokumente» (folders).
   g.bdOrd[grid] = [tile keys]; a tile not in the list keeps its place at the end. Nothing opens while arranging. */
const orS={done:['Готово','Fertig','Done'],reset:['Как было','Zurücksetzen','Reset'],hint:['Перетащите плитку','Kachel verschieben','Drag a tile']};
const ort=k=>cv5n(orS[k]||[k]);
const OR_G={'.sgar':'start','.brg':'bereiche','.brm':'weitere','.ddg':'ordner'};
const orKey=b=>b.dataset.k||b.dataset.v||b.dataset.to||b.dataset.act||'';
const orSt=()=>{if(!g.bdOrd||typeof g.bdOrd!=='object')g.bdOrd={};return g.bdOrd};
function orGrid(el){for(const s in OR_G){const c=el.closest&&el.closest(s);if(c)return[c,OR_G[s]]}return[null,null]}
function orApply(){const S=orSt();for(const s in OR_G){const c=document.querySelector('.screen '+s);const L2=S[OR_G[s]];if(!c||!L2||!L2.length)continue;
 const kids=[...c.children].filter(x=>x.tagName==='BUTTON');const pos=k=>{const p=L2.indexOf(k);return p<0?1e3:p};
 kids.map((x,j)=>[x,j]).sort((a,b)=>(pos(orKey(a[0]))-pos(orKey(b[0])))||(a[1]-b[1])).forEach(([x])=>c.appendChild(x))}}
let orOn=null;/* {c,key} */
function orBar(){document.querySelectorAll('.orbar').forEach(x=>x.remove());const d=document.createElement('div');d.className='orbar';
 d.innerHTML=`<span>${i(ort('hint'))}</span><button type="button" data-or="reset">${i(ort('reset'))}</button><button type="button" class="pri" data-or="done">${i(ort('done'))}</button>`;document.body.appendChild(d)}
function orStart(c,key){if(orOn)return;orOn={c,key};c.classList.add('orjig');document.documentElement.classList.add('oron');orBar();try{navigator.vibrate&&navigator.vibrate(18)}catch{}}
function orSave(){if(!orOn)return;orSt()[orOn.key]=[...orOn.c.children].filter(x=>x.tagName==='BUTTON').map(orKey);$()}
function orStop(){if(!orOn)return;orSave();orOn.c.classList.remove('orjig');orOn=null;document.documentElement.classList.remove('oron');document.querySelectorAll('.orbar').forEach(x=>x.remove())}
Hooks.on('render',()=>{try{if(orOn&&!document.body.contains(orOn.c)){orOn=null;document.documentElement.classList.remove('oron');document.querySelectorAll('.orbar').forEach(x=>x.remove())}orApply()}catch(e){Hooks.err('orapply',e)}});
/* hold to start */
let orT=0,orP=null,orDrag=null,orJust=0;
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('button');if(!b)return;const[c,key]=orGrid(b);if(!c||b.parentElement!==c)return;
 if(orOn&&orOn.c===c){e.preventDefault();const r=b.getBoundingClientRect();orDrag={b,c,x0:e.clientX,y0:e.clientY,dx:e.clientX-r.left,dy:e.clientY-r.top,id:e.pointerId,mv:0};try{b.setPointerCapture(e.pointerId)}catch{}b.classList.add('ordrag');return}
 orP={x:e.clientX,y:e.clientY};clearTimeout(orT);orT=setTimeout(()=>{orP=null;orJust=Date.now();orStart(c,key)},800)},!0);
document.addEventListener('pointermove',e=>{if(orP&&(Math.abs(e.clientX-orP.x)>8||Math.abs(e.clientY-orP.y)>8)){clearTimeout(orT);orP=null}
 if(!orDrag||e.pointerId!==orDrag.id)return;e.preventDefault();const d=orDrag;d.mv=1;d.b.style.transform=`translate(${e.clientX-d.x0}px,${e.clientY-d.y0}px) scale(1.06)`;
 d.b.style.pointerEvents='none';const under=document.elementFromPoint(e.clientX,e.clientY);d.b.style.pointerEvents='';const t=under&&under.closest('button');
 if(t&&t!==d.b&&t.parentElement===d.c){const r1=d.b.getBoundingClientRect(),kids=[...d.c.children],i1=kids.indexOf(d.b),i2=kids.indexOf(t);
  d.c.insertBefore(d.b,i2>i1?t.nextSibling:t);const r2=d.b.getBoundingClientRect();d.x0+=r2.left-r1.left;d.y0+=r2.top-r1.top;d.b.style.transform=`translate(${e.clientX-d.x0}px,${e.clientY-d.y0}px) scale(1.06)`}},{passive:!1,capture:!0});
const orUp=e=>{clearTimeout(orT);orP=null;if(!orDrag)return;const d=orDrag;orDrag=null;d.b.classList.remove('ordrag');d.b.style.transform='';orSave()};
document.addEventListener('pointerup',orUp,!0);document.addEventListener('pointercancel',orUp,!0);
/* nothing opens while arranging; the tap right after the long press does nothing either */
document.addEventListener('click',e=>{const bb=e.target.closest&&e.target.closest('[data-or]');if(bb){e.stopPropagation();if(bb.dataset.or==='done')orStop();else if(orOn){const k=orOn.key;orOn.c.classList.remove('orjig');orOn=null;document.documentElement.classList.remove('oron');document.querySelectorAll('.orbar').forEach(x=>x.remove());delete orSt()[k];$();v()}return}
 if(orOn){const b=e.target.closest&&e.target.closest('button');if(b&&b.parentElement===orOn.c){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()}return}
 if(orJust&&Date.now()-orJust<700){const b=e.target.closest&&e.target.closest('button');if(b&&orGrid(b)[0]){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()}}},!0);
document.addEventListener('contextmenu',e=>{if(e.target.closest&&orGrid(e.target)[0])e.preventDefault()},!0);
Hooks.on('route',()=>{try{orStop()}catch{}});
Hooks.css('docs-ordnen',`
.sgar>button,.brg>button,.brm>button,.ddg>button{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
.orjig>button{animation:orwig .32s ease-in-out infinite alternate;touch-action:none}
.orjig>button:nth-child(2n){animation-delay:-.16s;animation-direction:alternate-reverse}
@keyframes orwig{from{transform:rotate(-1.6deg)}to{transform:rotate(1.6deg)}}
@media (prefers-reduced-motion:reduce){.orjig>button{animation:none;outline:2px dashed var(--bd-acc,var(--green));outline-offset:-4px}}
.orjig>button.ordrag{animation:none;z-index:30;position:relative;box-shadow:0 16px 34px rgba(0,0,0,.22)!important;transition:none}
.orbar{position:fixed;left:12px;right:12px;top:calc(env(safe-area-inset-top,0px) + 10px);z-index:70;display:flex;align-items:center;gap:8px;padding:10px 10px 10px 14px;border-radius:18px;
 background:var(--ink,#1F3A33);color:var(--bg,#fff);box-shadow:0 12px 30px rgba(0,0,0,.25);font:600 14px var(--body)}
.orbar span{flex:1;min-width:0;line-height:1.3}.orbar button{flex:none;border:0;border-radius:12px;padding:9px 12px;font:700 14px var(--body);cursor:pointer;background:rgba(255,255,255,.16);color:inherit}
.orbar button.pri{background:var(--bd-acc,#2F9A85);color:#fff}:root[data-bd=dunkel] .orbar button.pri{color:#05201A}
`);
