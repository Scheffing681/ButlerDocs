/* ===== Butler Docs: arrange the home screen like on the iPhone (v39) =====
   Hold a tile (or a block) for a moment → edit mode, the tiles wiggle:
   - «−» sends a tile to «Alle Bereiche» (g.dhHid) or hides a block (g.dhBlk), nothing is deleted;
   - the size switch makes a tile a square or a wide row (g.dhWide), rows save space;
   - drag a tile to move it (g.dhOrd);
   - «＋» in the bar lists what is not on home and puts it back; in «Alle Bereiche» a tile not on home has a «＋» too;
   - «Fertig», or a tap on an empty place, ends edit mode.
   Same data as «Anordnung und Farbe → Startseite», so both places always agree.
   Squares fill the gaps next to a wide row (grid dense), so the page has no holes. */
const heS={done:['Готово','Fertig','Done','Gotowe','Bitti','Terminé','Listo'],add:['Добавить','Hinzufügen','Add','Dodaj','Ekle','Ajouter','Añadir'],
 hint:['Перетащите плитку · − убрать · ▭ размер','Kachel ziehen · − entfernen · ▭ Größe','Drag a tile · − remove · ▭ size','Przeciągnij · − usuń · ▭ rozmiar','Sürükle · − kaldır · ▭ boyut','Glisser · − retirer · ▭ taille','Arrastrar · − quitar · ▭ tamaño'],
 addT:['Добавить на главную','Zur Startseite hinzufügen','Add to home','Dodaj do strony głównej','Ana sayfaya ekle','Ajouter à l’accueil','Añadir al inicio'],
 tiles:['Плитки','Kacheln','Tiles','Kafelki','Kutucuklar','Tuiles','Mosaicos'],blocks:['Блоки','Blöcke','Blocks','Bloki','Bloklar','Blocs','Bloques'],
 none:['Всё уже на главной.','Alles ist schon auf der Startseite.','Everything is already on home.','Wszystko już jest na stronie głównej.','Her şey zaten ana sayfada.','Tout est déjà sur l’accueil.','Todo está ya en el inicio.'],
 gone:['Убрано в «Все разделы»','In «Alle Bereiche» verschoben','Moved to «All sections»','Przeniesiono do «Wszystkie działy»','«Tüm bölümler»e taşındı','Déplacé dans « Toutes les rubriques »','Movido a «Todas las secciones»'],
 back:['На главной ✓','Auf der Startseite ✓','On home ✓','Na stronie głównej ✓','Ana sayfada ✓','Sur l’accueil ✓','En el inicio ✓'],
 b_wx:['Погода','Wetter','Weather','Pogoda','Hava','Météo','Tiempo'],b_ai:['Butler AI','Butler AI','Butler AI','Butler AI','Butler AI','Butler AI','Butler AI'],b_today:['Сегодня','Heute','Today','Dziś','Bugün','Aujourd’hui','Hoy'],
 b_bsv:['Ведомства','Behörden','Offices','Urzędy','Kurumlar','Administrations','Organismos'],b_quick:['Быстрые действия','Schnellaktionen','Quick actions','Szybkie akcje','Hızlı işlemler','Actions rapides','Acciones rápidas']};
const het=k=>cv5n(heS[k]);
const HE_BLK=[['wx','.dhwx'],['ai','.dhai'],['today','.dhtd'],['bsv','.bsvhome'],['quick','.dhq']];
const heArr=k=>Array.isArray(g[k])?g[k]:(g[k]=[]);
const heOrd=()=>DH_T.slice().sort((a,b)=>{const o=Array.isArray(g.dhOrd)?g.dhOrd:[],x1=o.indexOf(a[0]),x2=o.indexOf(b[0]);return(x1<0?99+DH_T.indexOf(a):x1)-(x2<0?99+DH_T.indexOf(b):x2)}).map(t=>t[0]);
const heOn=()=>m.route==='home'&&!!m.dhEdit;
function heStart(){if(m.dhEdit)return;m.dhEdit=1;try{navigator.vibrate&&navigator.vibrate(12)}catch{}v()}
function heStop(){if(!m.dhEdit)return;m.dhEdit=0;v()}
/* keep the scroll place when the screen is drawn again */
function heRe(){const sc=document.querySelector('.screen'),y=sc?sc.scrollTop:0;v();const s2=document.querySelector('.screen');if(s2)s2.scrollTop=y}

/* the bar on top while editing */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||!heOn()||h.indexOf('dhome')<0)return h;
 const bar=`<div class="hebar"><button type="button" class="headd" data-act="headd">＋ ${i(het('add'))}</button><small>${i(het('hint'))}</small><button type="button" class="hedone" data-act="hedone">${i(het('done'))}</button></div>`;
 return h.replace('<div class="dhgr">',bar+'<div class="dhgr">')}catch(e){Hooks.err('hebar',e);return h}});
/* «−» on the blocks while editing */
Hooks.on('render',()=>{try{if(!heOn())return;const s=document.querySelector('.dhome');if(!s)return;s.classList.add('heon');
 HE_BLK.forEach(([k,sel])=>{const el=s.querySelector(sel);if(el&&!el.querySelector(':scope > .dhx')){el.classList.add('heblk');el.insertAdjacentHTML('beforeend',`<button type="button" class="dhx" data-act="hebx" data-k="${k}" aria-label="−">−</button>`)}})}catch(e){Hooks.err('heblk',e)}});

Hooks.act('hedone',()=>heStop());
Hooks.act('dhex',d=>{const H2=heArr('dhHid');if(!H2.includes(d.k))H2.push(d.k);$();T(het('gone'));heRe()});
Hooks.act('dhsz',d=>{const W=heArr('dhWide'),j=W.indexOf(d.k);j<0?W.push(d.k):W.splice(j,1);$();heRe()});
Hooks.act('hebx',d=>{const B=g.dhBlk=g.dhBlk&&typeof g.dhBlk==='object'?g.dhBlk:{};B[d.k]=1;$();heRe()});
function heBack(k,blk){if(blk){if(g.dhBlk)delete g.dhBlk[k]}else{const H2=heArr('dhHid'),j=H2.indexOf(k);if(j>=0)H2.splice(j,1)}$()}
Hooks.act('headd',()=>{const hid=heArr('dhHid'),T2=DH_T.filter(t=>hid.includes(t[0])),B=g.dhBlk||{},B2=HE_BLK.filter(([k])=>B[k]);
 const row=(k,ic,lab,blk)=>`<button type="button" class="headr" data-headk="${k}" data-headb="${blk?1:''}">${ic?dhi(ic):''}<span>${i(lab)}</span><em>＋</em></button>`;
 const body=T2.length||B2.length?`${T2.length?`<h4 class="headh">${i(het('tiles'))}</h4>${T2.map(([k,ic])=>row(k,ic,dht(k))).join('')}`:''}${B2.length?`<h4 class="headh">${i(het('blocks'))}</h4>${B2.map(([k])=>row(k,'',het('b_'+k),1)).join('')}`:''}`:`<p class="dhnone">${i(het('none'))}</p>`;
 H(het('addT'),`<div class="headl">${body}</div>`,sh=>{sh.querySelectorAll('[data-headk]').forEach(b=>b.onclick=()=>{heBack(b.dataset.headk,!!b.dataset.headb);b.remove();T(het('back'));heRe()})})});
/* «Alle Bereiche»: a tile that is not on home gets a «＋» */
Hooks.on('render',()=>{try{if(m.route!=='dall')return;const hid=Array.isArray(g.dhHid)?g.dhHid:[];
 const G=document.querySelector('.odall .dhgrid');G&&G.querySelectorAll('.dht').forEach((b,n)=>{const t=DH_T[n];if(!t||!hid.includes(t[0])||b.querySelector('.heplus'))return;b.style.position='relative';b.insertAdjacentHTML('beforeend',`<span class="heplus" data-act="heplus" data-k="${t[0]}" role="button" aria-label="＋">＋</span>`)})}catch(e){Hooks.err('heplus',e)}});
Hooks.act('heplus',d=>{heBack(d.k);T(het('back'));v()});

/* hold → edit mode; drag → move; taps while editing do not open anything */
{let tm=null,x0=0,y0=0,eat=0,lp=0,drag=null;
 const tileAt=(x,y)=>{const el=document.elementFromPoint(x,y);return el&&el.closest&&el.closest('.dhgrid.dhed .dht[data-k]')};
 document.addEventListener('pointerdown',e=>{try{if(m.route!=='home')return;const t=e.target.closest&&e.target.closest('.dhome .dht, .dhome .dhcard, .dhome .dhwx');
  if(!t)return;x0=e.clientX;y0=e.clientY;
  if(m.dhEdit){const d=e.target.closest('.dhgrid.dhed .dht[data-k]');if(d&&!e.target.closest('.dhx,.dhsz')){drag={el:d,k:d.dataset.k,moved:0};d.setPointerCapture&&d.setPointerCapture(e.pointerId)}return}
  clearTimeout(tm);tm=setTimeout(()=>{tm=null;lp=1;heStart()},550)}catch(er){Hooks.err('hedown',er)}},!0);
 document.addEventListener('pointermove',e=>{if(tm&&(Math.abs(e.clientX-x0)>10||Math.abs(e.clientY-y0)>10)){clearTimeout(tm);tm=null}
  if(!drag)return;if(!drag.moved&&Math.abs(e.clientX-x0)+Math.abs(e.clientY-y0)<8)return;drag.moved=1;drag.el.classList.add('hedrag');e.preventDefault();
  const o=tileAt(e.clientX,e.clientY);if(!o||o===drag.el)return;const P=o.parentNode,r=o.getBoundingClientRect(),after=o.classList.contains('wide')?e.clientY>r.top+r.height/2:e.clientX>r.left+r.width/2||e.clientY>r.bottom;
  P.insertBefore(drag.el,after?o.nextSibling:o)},{passive:!1});
 const up=()=>{clearTimeout(tm);tm=null;if(lp){lp=0;eat=Date.now()}if(!drag)return;const d=drag;drag=null;d.el.classList.remove('hedrag');if(!d.moved)return;eat=Date.now();
  const shown=[...document.querySelectorAll('.dhgrid.dhed .dht[data-k]')].map(x=>x.dataset.k),all=heOrd(),rest=all.filter(k=>!shown.includes(k));g.dhOrd=shown.concat(rest);$()};
 document.addEventListener('pointerup',up,!0);document.addEventListener('pointercancel',up,!0);
 document.addEventListener('click',e=>{const fresh=eat&&Date.now()-eat<350;eat=0;if(fresh){e.preventDefault();e.stopPropagation();return}
  if(!heOn())return;if(e.target.closest&&e.target.closest('[data-act=dhex],[data-act=dhsz],[data-act=hebx],[data-act=hedone],[data-act=headd],.dtsheet'))return;
  e.preventDefault();e.stopPropagation();if(!e.target.closest('.dht,.dhcard,.dhwx,.hebar'))heStop()},!0);
 document.addEventListener('contextmenu',e=>{if(m.route==='home'&&e.target.closest&&e.target.closest('.dhome .dht, .dhome .dhcard'))e.preventDefault()},!0)}
/* v40: the «Butler AI» card is hidden once for everyone (the green ＋ held opens the same Butler); «＋ Hinzufügen» brings it back */
const heAi=()=>{try{if(m.logged&&g&&!g.heAi40){g.heAi40=1;const B=g.dhBlk=g.dhBlk&&typeof g.dhBlk==='object'?g.dhBlk:{};B.ai=1;$();if(m.route==='home')setTimeout(v,0)}}catch(e){Hooks.err('heai40',e)}};heAi();Hooks.on('render',heAi);
/* leaving home ends edit mode */
Hooks.on('route',r=>{if(r!=='home'&&m.dhEdit)m.dhEdit=0});

Hooks.css('docs-home-edit',`
.dhome .dht,.dhome .dhcard,.dhome .dhwx{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}
.dhome .dhgrid{grid-auto-flow:row dense}
.dhgrid .dht.wide{grid-column:1/-1;flex-direction:row;text-align:left;min-height:0;padding:14px 18px;gap:16px}
.dht.wide>.dhi.big{flex:none;padding-right:16px;border-right:1px solid var(--line);box-sizing:content-box}
.dht.wide .dhwt{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.dht.wide .dhwt b{font-size:17px;margin:0}.dht.wide .dhwt small{font-size:13px}
.dht.wide>.dhi:last-of-type:not(.big){flex:none;color:var(--ink)}
.hebar{position:sticky;top:calc(env(safe-area-inset-top) + 4px);z-index:5;display:flex;align-items:center;gap:8px;margin:0 0 10px;padding:8px;border-radius:18px;background:var(--surface);box-shadow:0 4px 16px rgba(20,60,30,.12)}
.hebar small{flex:1;text-align:center;color:var(--muted);font-size:11.5px;line-height:1.2}
.hebar button{border:0;border-radius:13px;padding:9px 13px;font-weight:600;font-size:14.5px}.headd{background:none;color:var(--green)!important;border:1px solid var(--line)!important}.hedone{background:var(--green);color:#fff!important}
.dhgrid.dhed .dht{position:relative;animation:hewig .32s ease-in-out infinite alternate;touch-action:none;cursor:grab}
.dhgrid.dhed .dht:nth-child(2n){animation-delay:-.16s}.dhgrid.dhed .dht.wide{animation-name:hewigw}
@keyframes hewig{from{transform:rotate(-1.3deg)}to{transform:rotate(1.3deg)}}@keyframes hewigw{from{transform:rotate(-.4deg)}to{transform:rotate(.4deg)}}
.dhgrid.dhed .dht.hedrag{animation:none;transform:scale(1.06);box-shadow:0 10px 26px rgba(20,60,30,.22);z-index:3;opacity:.95;pointer-events:none}
.dhx,.dhsz{position:absolute;top:-7px;width:28px;height:28px;border-radius:50%;border:0;display:flex;align-items:center;justify-content:center;padding:0;z-index:2;box-shadow:0 2px 6px rgba(0,0,0,.18)}
.dhx{left:-7px;background:#8e8e93;color:#fff!important;font-size:22px;font-weight:700;line-height:1}.dhsz{right:-7px;background:var(--surface);color:var(--green)!important;border:1px solid var(--line)}.dhsz .dhi{width:16px;height:16px;stroke-width:2}
.heon .heblk{position:relative;opacity:.88}.heon .heblk>.dhx{top:-7px;left:-7px}
.headl{padding:4px 2px 10px}.headh{margin:12px 0 4px;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
.headr{display:flex;align-items:center;gap:12px;width:100%;padding:12px 4px;border:0;border-bottom:1px solid var(--line);background:none;text-align:left;color:var(--ink);font:inherit;cursor:pointer}.headr .dhi{color:var(--green);flex:none}.headr span{flex:1;font-weight:600}.headr em{font-style:normal;color:var(--green);font-size:20px;font-weight:700}
.heplus{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;line-height:1}
`);
