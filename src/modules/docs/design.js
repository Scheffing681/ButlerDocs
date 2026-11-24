/* ===== Butler Docs: the new look «Glas» (v57), step 1 — colours, Hell / Dunkel / Auto, the fixed bottom bar with the Butler orb =====
   <html data-bd="hell|dunkel"> carries the whole palette (with !important, because «Anordnung und Farbe» writes colours inline on <html>).
   g.bdTheme: 'auto' (follows the phone) | 'hell' | 'dunkel'.  g.bdAcc: 'tuerkis' | 'gruen' | 'blau' | 'gold'.
   The bar is fixed: Start · Dokumente · (Butler) · Fristen · Mehr. Tap on the orb = Butler sheet, hold = scanner.
   g.bd57Off = the old look (kept until the new one is accepted). */
const bdS={
 hell:['Светлое','Hell','Light'],dunkel:['Тёмное','Dunkel','Dark'],auto:['Авто','Auto','Auto'],
 autoS:['Как на телефоне','Wie am Telefon','Like the phone'],look:['Оформление','Erscheinungsbild','Appearance'],
 acc:['Цвет акцента','Akzentfarbe','Accent colour'],a_tuerkis:['Бирюза','Türkis','Turquoise'],a_gruen:['Зелёный','Grün','Green'],a_blau:['Синий','Blau','Blue'],a_gold:['Золото','Gold','Gold'],
 old:['Прежний вид','Bisheriges Aussehen','Previous look'],oldS:['Вернуть старое оформление приложения','Das alte Aussehen der App wiederherstellen','Bring back the old look of the app'],
 more:['Ещё','Mehr','More'],butler:['Батлер','Butler','Butler'],
 o_talk:['Сказать','Sprechen','Speak'],o_scan:['Сканировать','Scannen','Scan'],o_dl:['Срок / заметка','Frist / Notiz','Deadline / note'],o_letter:['Объяснить письмо','Brief erklären','Explain a letter'],
 ask:['Спросите Батлера…','Fragen Sie Butler…','Ask Butler…'],send:['Отправить','Senden','Send'],sug:['Например','Zum Beispiel','For example'],
 tipT:['Это Батлер','Das ist Butler','This is Butler'],tipB:['Нажмите — спросить или добавить. Удерживайте — сразу скан.','Tippen: fragen oder erfassen. Gedrückt halten: sofort scannen.','Tap: ask or add. Hold: scan right away.'],ok:['Понятно','Verstanden','Got it']};
const bdt=k=>cv5n(bdS[k]||[k]);
const BD_ACC={tuerkis:['#23806E','#5FE0C4'],gruen:['#2E7D4F','#6FD69A'],blau:['#2F62C8','#86AEFF'],gold:['#9A7430','#E2B962']};
const bdOn=()=>{try{return!!(m.logged&&!g.bd57Off)}catch{return!1}};
let bdMQ=null;try{bdMQ=matchMedia('(prefers-color-scheme: dark)')}catch{}
const bdDark=()=>{const t=g.bdTheme||'auto';return t==='dunkel'||(t==='auto'&&!!(bdMQ&&bdMQ.matches))};
function bdApply(){try{const r=document.documentElement;if(!bdOn()){if(r.dataset.bd){delete r.dataset.bd;delete r.dataset.bda;try{Ws()}catch{}}return}
 /* once: the old «Smaragd» becomes Dunkel; the old style choice is kept for the way back */
 if(!g.bd57m){g.bd57m=1;if(g.style==='smaragd')g.bdTheme='dunkel';g.bdTheme=g.bdTheme||'auto';g.bdPrevStyle=g.style||'auto';if(g.style&&g.style!=='auto'){g.style='auto';try{Ws()}catch{}}$()}
 if(r.dataset.sm)delete r.dataset.sm;
 const v2=bdDark()?'dunkel':'hell',a=BD_ACC[g.bdAcc]?g.bdAcc:'tuerkis';if(r.dataset.bd!==v2)r.dataset.bd=v2;if(r.dataset.bda!==a)r.dataset.bda=a;
 r.style.setProperty('--bd-acc',BD_ACC[a][v2==='dunkel'?1:0]);r.style.colorScheme=v2==='dunkel'?'dark':'light';
 const mt=document.querySelector('meta[name="theme-color"]');mt&&mt.setAttribute('content',v2==='dunkel'?'#081216':'#F6F4EE')}catch(e){Hooks.err('bdapply',e)}}
Hooks.on('render',bdApply);
try{bdMQ&&bdMQ.addEventListener('change',()=>{bdApply()})}catch{}
try{new MutationObserver(()=>{if(bdOn()&&document.documentElement.dataset.sm)bdApply()}).observe(document.documentElement,{attributes:!0,attributeFilter:['data-sm','data-style']})}catch{}
/* ---------- the bar ---------- */
try{ly6EXT.mehr={lab:()=>bdt('more'),ic:()=>bd8i('grid'),open:()=>R('dall'),on:r=>r==='dall'};OD_OK.add('mehr')}catch(e){Hooks.err('bdmehr',e)}
const BD_NAV=['home','archive','fristen','mehr'];
const bdJ0=j0;
j0=function(){if(!bdOn())return bdJ0.apply(this,arguments);
 let c='mehr';try{const r=m.route;if(r==='concierge')c='orb';else if(r==='home'||r==='eing'||r==='post')c='home';else{const x=['archive','fristen'].find(k=>ly6EXT[k]&&ly6EXT[k].on&&ly6EXT[k].on(r));if(x)c=x;else if(r==='archive')c='archive'}}catch{}
 const b=k=>`<button data-act="ly6go" data-k="${k}" data-to="${k}" class="${c===k?'on':''}" ${c===k?'aria-current="page"':''}>${ly6ic(k)}<span>${i(ly6lab(k))}</span></button>`;
 return`<nav class="nav bdnav">${b('home')}${b('archive')}<button type="button" class="bdorb${c==='orb'?' on':''}${g.bdOrbSeen?'':' new'}" data-act="bdorb" aria-label="${i(bdt('butler'))}"><i class="bdob" aria-hidden="true"></i><span>${i(bdt('butler'))}</span></button>${b('fristen')}${b('mehr')}</nav>`};
/* hold the orb = scanner at once */
let bdLPt=0,bdLPdone=0;
document.addEventListener('pointerdown',e=>{const o=e.target.closest&&e.target.closest('.bdorb');if(!o)return;bdLPdone=0;clearTimeout(bdLPt);
 bdLPt=setTimeout(()=>{bdLPdone=Date.now();g.bdOrbSeen=1;$();try{navigator.vibrate&&navigator.vibrate(15)}catch{}document.querySelectorAll('.dtsheet,.bdtip').forEach(x=>x.remove());stPick(null)},480)},!0);
['pointerup','pointercancel','pointerleave'].forEach(t=>document.addEventListener(t,()=>clearTimeout(bdLPt),!0));
document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('.bdorb'))e.preventDefault()},!0);
/* tap = the Butler sheet */
const BD_SUG=['dl','letter','bank','miss'];
function bdSheet(){const q=k=>{try{return ddt('b_'+k)}catch{return k}};
 const big=(a,ic,k)=>`<button type="button" class="bdq" data-bq="${a}">${ic}<span>${i(bdt(k))}</span></button>`;
 const html=`<div class="bdsh"><div class="bdqs">${big('talk',_('mic'),'o_talk')}${big('scan',dhi('scan'),'o_scan')}${big('dl',dhi('clock'),'o_dl')}${big('letter',_('mail'),'o_letter')}</div>
  <h4>${i(bdt('sug'))}</h4><div class="bdsug">${BD_SUG.map(k=>`<button type="button" data-bk="${k}">${i(q(k))}</button>`).join('')}</div>
  <form class="bdin" autocomplete="off"><input class="field" name="q" enterkeyhint="send" placeholder="${i(bdt('ask'))}"><button type="submit" aria-label="${i(bdt('send'))}">${_('send')||'➤'}</button></form></div>`;
 H(bdt('butler'),html,sh=>{sh.classList.add('bdsheet');const inp=sh.querySelector('.bdin input');
  sh.querySelectorAll('[data-bq]').forEach(b=>b.onclick=()=>{const a=b.dataset.bq;if(a==='talk'){inp.focus();return}sh.remove();
   if(a==='scan')stPick(null);else if(a==='dl')L.remnew&&L.remnew();else if(a==='letter')L.mlnew?L.mlnew():R('concierge')});
  sh.querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{sh.remove();R('concierge');setTimeout(()=>{try{const x=document.createElement('button');x.dataset.act='btask';x.dataset.k=b.dataset.bk;x.hidden=!0;(document.querySelector('.screen')||document.body).appendChild(x);x.click();x.remove()}catch(e){Hooks.err('bdsug',e)}},60)});
  sh.querySelector('.bdin').onsubmit=ev=>{ev.preventDefault();const t=(inp.value||'').trim();if(!t)return;sh.remove();R('concierge');setTimeout(()=>{try{gu(t)}catch(e){Hooks.err('bdask',e)}},60)}})}
Hooks.act('bdorb',()=>{if(bdLPdone&&Date.now()-bdLPdone<1200){bdLPdone=0;return}document.querySelectorAll('.bdtip').forEach(x=>x.remove());if(!g.bdOrbSeen){g.bdOrbSeen=1;$();const o=document.querySelector('.bdorb');o&&o.classList.remove('new')}bdSheet()});
/* first time: a small hint above the orb */
Hooks.on('render',()=>{try{if(!bdOn()||m.route!=='home'||g.bdOrbSeen||g.bdTipSeen)document.querySelectorAll('.bdtip').forEach(x=>x.remove());if(!bdOn()||g.bdOrbSeen||g.bdTipSeen||m.route!=='home'||document.querySelector('.bdtip,.dtsheet,.bkpov,#td9tour'))return;
 const d=document.createElement('div');d.className='bdtip';d.innerHTML=`<b>${i(bdt('tipT'))}</b><p>${i(bdt('tipB'))}</p><button type="button">${i(bdt('ok'))}</button>`;
 d.querySelector('button').onclick=()=>{g.bdTipSeen=1;$();d.remove()};document.body.appendChild(d)}catch(e){Hooks.err('bdtip',e)}});
/* ---------- the switch: Profil → Stil and on top of «Mehr» ---------- */
function bdPick(full){const t=g.bdTheme||'auto',a=BD_ACC[g.bdAcc]?g.bdAcc:'tuerkis';
 const seg=`<div class="bdseg" role="radiogroup" aria-label="${i(bdt('look'))}">${['hell','dunkel','auto'].map(k=>`<button type="button" role="radio" aria-checked="${t===k}" class="${t===k?'on':''}" data-act="bdtheme" data-v="${k}"><i class="bdsw ${k}"></i><span>${i(bdt(k))}</span></button>`).join('')}</div>`;
 if(!full)return`<div class="bdpick sm"><h3>${i(bdt('look'))}</h3>${seg}</div>`;
 return`<div class="bdpick"><h3>${i(bdt('look'))}</h3>${seg}<small class="bdps">${i(bdt('auto'))}: ${i(bdt('autoS'))}</small>
  <h3>${i(bdt('acc'))}</h3><div class="bdacc">${Object.keys(BD_ACC).map(k=>`<button type="button" class="${a===k?'on':''}" data-act="bdacc" data-v="${k}" aria-pressed="${a===k}"><i style="background:${BD_ACC[k][bdDark()?1:0]}"></i><span>${i(bdt('a_'+k))}</span></button>`).join('')}</div>
  <button type="button" class="bdold" data-act="bdold"><b>${i(bdt('old'))}</b><small>${i(bdt('oldS'))}</small></button></div>`}
Hooks.on('render',()=>{try{if(!bdOn())return;const sc=document.querySelector('.screen');if(!sc)return;
 if(m.route==='style'&&!sc.querySelector('.bdpick')){const hd=sc.querySelector('.sub-hdr');if(!hd)return;sc.classList.add('bdstyle');const d=document.createElement('div');d.innerHTML=bdPick(1);hd.after(d.firstElementChild)}
 if(m.route==='dall'&&!sc.querySelector('.bdpick')){const hd=sc.querySelector('.sub-hdr');if(!hd)return;const d=document.createElement('div');d.innerHTML=bdPick(0);hd.after(d.firstElementChild)}}catch(e){Hooks.err('bdpick',e)}});
Hooks.act('bdtheme',d=>{if(!['hell','dunkel','auto'].includes(d.v))return;g.bdTheme=d.v;$();bdApply();v()});
Hooks.act('bdacc',d=>{if(!BD_ACC[d.v])return;g.bdAcc=d.v;$();bdApply();v()});
Hooks.act('bdold',()=>{g.bd57Off=1;if(g.bdPrevStyle&&g.bdPrevStyle!=='auto')g.style=g.bdPrevStyle;$();bdApply();try{Ws()}catch{}v()});
/* the way back from the old look: a button on top of Profil → Stil */
Hooks.on('render',()=>{try{if(!m.logged||!g.bd57Off||m.route!=='style'||document.querySelector('.bdback'))return;const hd=document.querySelector('.screen .sub-hdr');if(!hd)return;
 const d=document.createElement('button');d.type='button';d.className='bdback';d.dataset.act='bdnew';d.innerHTML=`<i class="bdob" aria-hidden="true"></i><b>Glas</b><small>${i(bdt('hell'))} · ${i(bdt('dunkel'))} · ${i(bdt('auto'))}</small>`;hd.after(d)}catch(e){Hooks.err('bdback',e)}});
Hooks.act('bdnew',()=>{delete g.bd57Off;if(g.style&&g.style!=='auto'){g.bdPrevStyle=g.style;g.style='auto';try{Ws()}catch{}}$();bdApply();v()});
Hooks.css('docs-design',`
/* ---- palette ---- */
:root[data-bd]{--display:-apple-system,"SF Pro Display","Segoe UI",Inter,Roboto,system-ui,sans-serif!important;--body:-apple-system,"SF Pro Text","Segoe UI",Inter,Roboto,system-ui,sans-serif!important;--radius:16px!important}
:root[data-bd="hell"]{--bg:#F6F4EE!important;--surface:rgba(255,255,255,.86)!important;--field:#EEF0EC!important;--line:#E1E3DD!important;--ink:#1F3A33!important;--muted:#4F625C!important;
 --green:var(--bd-acc)!important;--green-ink:#FFFFFF!important;--gold:var(--bd-acc)!important;--gold-soft:color-mix(in srgb,var(--bd-acc) 14%,#fff)!important;--bd-lav:#8A8FD6;--bd-glass:rgba(255,255,255,.82);--bd-edge:rgba(31,58,51,.08);
 --tile-bg:rgba(255,255,255,.86)!important;--tile-ink:#1F3A33!important;--tile-ic:var(--bd-acc)!important;--tile-line:#E1E3DD!important;--tile-muted:#4F625C!important;--tile-badge:var(--bd-acc)!important;--tile-bink:#fff!important;color-scheme:light}
:root[data-bd="dunkel"]{--bg:#081216!important;--surface:rgba(255,255,255,.07)!important;--field:rgba(255,255,255,.08)!important;--line:rgba(255,255,255,.12)!important;--ink:#E9F2EF!important;--muted:#A9BDB7!important;
 --green:var(--bd-acc)!important;--green-ink:#05201A!important;--gold:var(--bd-acc)!important;--gold-soft:color-mix(in srgb,var(--bd-acc) 16%,#081216)!important;--bd-lav:#A9AEF0;--bd-glass:rgba(255,255,255,.09);--bd-edge:rgba(255,255,255,.10);
 --tile-bg:rgba(255,255,255,.07)!important;--tile-ink:#E9F2EF!important;--tile-ic:var(--bd-acc)!important;--tile-line:rgba(255,255,255,.12)!important;--tile-muted:#A9BDB7!important;--tile-badge:var(--bd-acc)!important;--tile-bink:#05201A!important;color-scheme:dark}
:root[data-bd]{--bd8nv:var(--bg)!important;--bd8a:var(--bd-acc)!important;--bd8mu:var(--muted)!important;--bd8ln:var(--line)!important;--br9bg:var(--bg)!important;--lg-bg:var(--bg)!important;--lg-gold:var(--bd-acc)!important}
html[data-bd] .app,html[data-bd].bd8n .app{background:var(--bg)!important;background-image:none!important;isolation:isolate}
html[data-bd] .app::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none}
html[data-bd="hell"] .app::before{background:radial-gradient(70% 40% at 100% 0%,color-mix(in srgb,var(--bd-acc) 16%,transparent),transparent 70%),radial-gradient(60% 35% at 0% 30%,rgba(138,143,214,.14),transparent 70%)}
html[data-bd="dunkel"] .app::before{background:radial-gradient(80% 40% at 50% -5%,color-mix(in srgb,var(--bd-acc) 16%,transparent),transparent 70%),radial-gradient(60% 40% at 0% 60%,rgba(169,174,240,.07),transparent 70%)}
:root[data-bd] h1,:root[data-bd] h2,:root[data-bd] h3,:root[data-bd] h4{font-family:var(--display);letter-spacing:-.01em}
:root[data-bd] small:not(.string small),:root[data-bd] .muted{font-size:max(13px,1em)}
:root[data-bd] .string>i{background:var(--bg)!important}
/* glass cards: white glass on light, smoked glass on dark; a hairline edge instead of a heavy shadow */
:root[data-bd] .stcard,:root[data-bd] .stai,:root[data-bd] .sta,:root[data-bd] .stask,:root[data-bd] .stcb,:root[data-bd] .ddt,:root[data-bd] .ddqa button,:root[data-bd] .ddq,:root[data-bd] .ddbk,:root[data-bd] .egm,:root[data-bd] .btq,:root[data-bd] .btc,:root[data-bd] .brw,:root[data-bd] .brt,:root[data-bd] .strow,:root[data-bd] .dhcard,:root[data-bd] .dht,:root[data-bd] .card{
 background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;box-shadow:0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(20,40,35,.06)!important}
:root[data-bd="dunkel"] .stcard,:root[data-bd="dunkel"] .sta,:root[data-bd="dunkel"] .ddt,:root[data-bd="dunkel"] .dht,:root[data-bd="dunkel"] .brw,:root[data-bd="dunkel"] .brt,:root[data-bd="dunkel"] .card{box-shadow:0 8px 24px rgba(0,0,0,.25)!important}
:root[data-bd] .sta svg,:root[data-bd] .dht .dhi,:root[data-bd] .brw .dhi,:root[data-bd] .brt .dhi,:root[data-bd] .ddqa button svg{color:var(--bd-acc)}
:root[data-bd] .stbig,:root[data-bd] .ddsoon{background:linear-gradient(140deg,var(--bd-acc),color-mix(in srgb,var(--bd-acc) 60%,#0b2a24))!important;color:#fff!important}
/* ---- the fixed bar ---- */
:root[data-bd] .nav.bdnav,html[data-bd].bd8n .nav.bdnav{display:grid;grid-template-columns:1fr 1fr 84px 1fr 1fr;align-items:end;background:color-mix(in srgb,var(--bg) 88%,transparent)!important;border-top:1px solid var(--bd-edge)!important;box-shadow:0 -6px 24px rgba(0,0,0,.05)}
@supports ((-webkit-backdrop-filter:blur(2px)) or (backdrop-filter:blur(2px))){@media (min-resolution:2dppx) and (prefers-reduced-transparency:no-preference){:root[data-bd] .nav.bdnav{background:color-mix(in srgb,var(--bg) 72%,transparent)!important;-webkit-backdrop-filter:saturate(1.4) blur(18px);backdrop-filter:saturate(1.4) blur(18px)}}}
:root[data-bd] .nav.bdnav>button[data-act="ly6go"]{color:var(--muted);font-size:12px;font-weight:600}
:root[data-bd] .nav.bdnav>button[data-act="ly6go"].on{color:var(--bd-acc)}
:root[data-bd] .nav.bdnav>button[data-act="ly6go"] span{font-family:var(--body);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.bdorb{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;border:0;background:none;padding:0 0 4px;margin-top:-26px;font:600 12px var(--body);color:var(--ink);cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:manipulation}
.bdob{display:block;width:62px;height:62px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff 0%,color-mix(in srgb,var(--bd-acc,#2F9A85) 35%,#fff) 22%,var(--bd-acc,#2F9A85) 58%,color-mix(in srgb,var(--bd-acc,#2F9A85) 55%,#0b2a24) 100%);
 box-shadow:0 0 0 4px color-mix(in srgb,var(--bg,#fff) 90%,transparent),0 10px 26px color-mix(in srgb,var(--bd-acc,#2F9A85) 45%,transparent),inset -6px -8px 16px rgba(0,0,0,.18),inset 5px 6px 12px rgba(255,255,255,.45);transition:transform .15s}
:root[data-bd="dunkel"] .bdob{box-shadow:0 0 0 4px rgba(8,18,22,.9),0 0 34px color-mix(in srgb,var(--bd-acc) 55%,transparent),inset -6px -8px 16px rgba(0,0,0,.35),inset 5px 6px 12px rgba(255,255,255,.35)}
.bdorb:active .bdob{transform:scale(.93)}.bdorb.on span{color:var(--bd-acc)}
.bdorb.new::after{content:"";position:absolute;top:2px;right:12px;width:12px;height:12px;border-radius:50%;background:#F2B544;box-shadow:0 0 0 2px var(--bg),0 0 10px #F2B544;animation:bdpulse 1.8s ease-in-out infinite}
@keyframes bdpulse{50%{transform:scale(1.25);opacity:.75}}
@media (prefers-reduced-motion:reduce){.bdorb.new::after{animation:none}}
.bdtip{position:fixed;left:50%;bottom:calc(112px + env(safe-area-inset-bottom));transform:translateX(-50%);width:min(320px,86vw);background:var(--ink,#1F3A33);color:var(--bg,#fff);border-radius:18px;padding:14px 16px 12px;z-index:60;box-shadow:0 12px 34px rgba(0,0,0,.25);font-family:var(--body)}
.bdtip::after{content:"";position:absolute;left:50%;bottom:-8px;margin-left:-8px;border:8px solid transparent;border-bottom:0;border-top-color:var(--ink,#1F3A33)}
.bdtip b{font-size:17px}.bdtip p{margin:4px 0 10px;font-size:15px;line-height:1.35}.bdtip button{border:0;border-radius:12px;background:var(--bd-acc,#2F9A85);color:#fff;font:600 15px var(--body);padding:8px 16px;float:right}
:root[data-bd="dunkel"] .bdtip button{color:#05201A}
/* ---- the Butler sheet ---- */
.bdsh{padding:2px 2px 8px}.bdqs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bdq{display:flex;align-items:center;gap:10px;min-height:58px;border:1px solid var(--bd-edge,var(--line));border-radius:16px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 15.5px var(--body);padding:10px 12px;text-align:left;cursor:pointer}
.bdq svg{width:24px;height:24px;flex:none;color:var(--bd-acc,var(--green))}.bdq span{overflow-wrap:anywhere;hyphens:auto}
.bdsh h4{margin:16px 2px 8px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.bdsug{display:flex;flex-direction:column;gap:8px}.bdsug button{border:1px solid var(--bd-edge,var(--line));border-radius:14px;background:none;color:var(--ink);font:15px var(--body);padding:11px 12px;text-align:left;cursor:pointer}
.bdin{display:flex;gap:8px;margin-top:14px}.bdin input{flex:1;min-width:0;font-size:16px;border-radius:14px}
.bdin button{flex:none;width:48px;border:0;border-radius:14px;background:var(--bd-acc,var(--green));color:#fff;display:grid;place-items:center;cursor:pointer}.bdin button svg{width:20px;height:20px}
:root[data-bd="dunkel"] .bdin button{color:#05201A}
:root[data-bd] .dtsh{background:var(--bg)!important;border-top:1px solid var(--bd-edge)}
/* ---- the switch ---- */
.bdpick{margin:4px 0 16px}.bdpick h3{font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin:14px 2px 8px;color:var(--muted);font-weight:700}
.bdpick.sm{margin:0 0 12px}.bdpick.sm h3{margin-top:4px}
.bdseg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.bdseg button{display:flex;flex-direction:column;align-items:center;gap:6px;border:1px solid var(--bd-edge,var(--line));border-radius:16px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 15px var(--body);padding:10px 6px;cursor:pointer}
.bdseg button.on{border:2px solid var(--bd-acc);box-shadow:0 0 0 3px color-mix(in srgb,var(--bd-acc) 18%,transparent)}
.bdpick.sm .bdseg button{flex-direction:row;justify-content:center;padding:9px 6px}
.bdsw{display:block;width:100%;height:44px;border-radius:10px}.bdpick.sm .bdsw{width:18px;height:18px;border-radius:50%}
.bdsw.hell{background:linear-gradient(160deg,#fff,#EDEBE3);box-shadow:inset 0 0 0 1px #dcdcd4}.bdsw.dunkel{background:radial-gradient(circle at 50% 10%,#1d4b46,#081216 70%);box-shadow:inset 0 0 0 1px #8aa9a266}
.bdsw.auto{background:linear-gradient(110deg,#F6F4EE 0 50%,#081216 50% 100%);box-shadow:inset 0 0 0 1px #8888}
.bdps{display:block;margin:6px 4px 0;color:var(--muted);font-size:13px}
.bdacc{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.bdacc button{display:flex;flex-direction:column;align-items:center;gap:6px;border:1px solid var(--bd-edge,var(--line));border-radius:14px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 13px var(--body);padding:10px 4px;cursor:pointer}
.bdacc button.on{border:2px solid var(--bd-acc)}.bdacc i{width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 2px rgba(255,255,255,.5)}
.bdold{display:flex;flex-direction:column;align-items:flex-start;gap:2px;width:100%;margin-top:16px;border:1px dashed var(--line);border-radius:14px;background:none;color:var(--ink);font:inherit;padding:10px 12px;text-align:left;cursor:pointer}.bdold small{color:var(--muted);font-size:13px}
/* in the new look the old style choices of Profil → Stil are hidden; «Anordnung» of Start and the font size stay */
.bdstyle .smpick,.bdstyle .ly6col,.bdstyle [data-act="setstyle"],.bdstyle [data-act="style"],.bdstyle [data-act="accent"],.bdstyle [data-act="bgc"],.bdstyle [data-act="tiles"]{display:none!important}
.bdback{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:12px;align-items:center;width:100%;margin:4px 0 14px;border:1px solid var(--line);border-radius:16px;background:var(--surface);color:var(--ink);font:inherit;padding:10px 12px;text-align:left;cursor:pointer}
.bdback .bdob{grid-row:1/3;width:40px;height:40px;--bd-acc:#2F9A85}.bdback small{color:var(--muted)}
`);
