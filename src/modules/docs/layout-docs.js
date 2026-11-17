/* ===== Butler Docs: «Anordnung und Farbe» for Docs =====
   The screen came from the old Butler: half of it set things Docs no longer has (quick-access tiles, Butler sections,
   «home on one screen»). Here it sets what Docs really shows:
   - Stilfarbe (unchanged), Startseite: order and visibility of the home tiles (g.dhOrd, g.dhHid),
   - blocks on home: weather, Butler AI, today, offices, quick actions (g.dhBlk[key]=1 → hidden),
   - bottom bar: only Docs places (Start, Suche, Aufgaben, Kalender, Dokumente, Briefe, Behörden, Finanzen, Tresor, Scanner, Profil).
   The old settings (g.quick, g.cats) are not deleted, only no longer shown. */
const lydS={home:['Главная','Startseite','Home'],homeS:['Порядок плиток ↑↓ · глаз — показать или скрыть','Reihenfolge der Kacheln ↑↓ · Auge = zeigen/ausblenden','Order of the tiles ↑↓ · eye = show/hide'],
 hid:['скрыто','ausgeblendet','hidden'],blk:['Блоки на главной','Blöcke auf der Startseite','Blocks on home'],
 b_wx:['Погода','Wetter','Weather'],b_ai:['Butler AI','Butler AI','Butler AI'],b_today:['Сегодня','Heute','Today'],b_bsv:['Ведомства (термины, сроки)','Behörden (Termine, Fristen)','Offices (appointments, deadlines)'],b_quick:['Быстрые действия','Schnellaktionen','Quick actions'],
 reset:['Сбросить расположение','Anordnung zurücksetzen','Reset layout'],resetOk:['Расположение как раньше ✓','Anordnung wie vorher ✓','Layout restored ✓'],
 n_bsv:['Ведомства','Behörden','Offices'],n_fz:['Финансы','Finanzen','Finances'],n_safe:['Сейф','Tresor','Vault'],n_scan:['Сканер','Scanner','Scanner'],n_docs:['Документы','Dokumente','Documents']};
const lydt=k=>cv5n(lydS[k]||[k]);
const LYD_POOL=['home','search','tasks','mycal','archive','letters','bsv','fzm','dsafe','sc9','profile'];
const LYD_DEF=['home','search','tasks','profile'];
const lydOn=()=>{try{return!g.dhOff}catch{return!0}};
/* the bottom bar knows the new places */
const lydSvg=p=>{try{return _('star').replace(/(<svg[^>]*>)[\s\S]*<\/svg>/,'$1'+p+'</svg>')}catch{return`<svg class="i" viewBox="0 0 24 24">${p}</svg>`}};
try{Object.assign(ly6EXT,{
 bsv:{lab:()=>lydt('n_bsv'),ic:()=>lydSvg(DH_I.gov||''),open:()=>R('bsv')},
 fzm:{lab:()=>lydt('n_fz'),ic:()=>lydSvg(DH_I.coin||''),open:()=>R('fzm')},
 dsafe:{lab:()=>lydt('n_safe'),ic:()=>lydSvg(DH_I.vault||''),open:()=>R('dsafe')},
 sc9:{lab:()=>lydt('n_scan'),ic:()=>lydSvg(DH_I.scan||''),open:()=>{try{L.go({to:'sc9'})}catch{R('sc9')}}},
 archive:{lab:()=>lydt('n_docs'),ic:()=>lydSvg(DH_I.fld||''),open:()=>R('archive')}});
 ['bsv','fzm','dsafe','sc9'].forEach(k=>{ly6POOL.includes(k)||ly6POOL.push(k)})}catch(e){Hooks.err('lydext',e)}
/* Docs: «Прогресс» was never a Docs place — the default bar is Start · Suche · Aufgaben · Profil, and old places are replaced */
function lydNav(){try{if(!lydOn())return;if(ly6DEF[2]==='stats')ly6DEF[2]='tasks';if(!Array.isArray(g.nav6)||g.nav6.length!==4)return;
 let ch=0;const S=g.nav6.map(k=>k==='stats'?(ch=1,'tasks'):k);for(let j=0;j<4;j++)if(!LYD_POOL.includes(S[j])){S[j]=LYD_DEF.find(k=>!S.includes(k))||'home';ch=1}
 if(ch){g.nav6=S;$()}}catch(e){Hooks.err('lydnav',e)}}
lydNav();

/* --- the screen: replace the old sections --- */
function lydStart(){const ord=Array.isArray(g.dhOrd)?g.dhOrd:[],hid=Array.isArray(g.dhHid)?g.dhHid:[];
 const A=DH_T.slice().sort((a,b)=>{const x1=ord.indexOf(a[0]),x2=ord.indexOf(b[0]);return(x1<0?99+DH_T.indexOf(a):x1)-(x2<0?99+DH_T.indexOf(b):x2)});
 const rows=A.map((t,j)=>{const off=hid.includes(t[0]);return`<div class="ly6r ${off?'off':''}">${dhi(t[1])}<span>${i(dht(t[0]))}${off?` · <em>${i(lydt('hid'))}</em>`:''}</span><button type="button" data-act="lydmv" data-k="${t[0]}" data-d="-1" ${j?'':'disabled'} aria-label="↑">↑</button><button type="button" data-act="lydmv" data-k="${t[0]}" data-d="1" ${j<A.length-1?'':'disabled'} aria-label="↓">↓</button><button type="button" class="lydeye${off?'':' on'}" data-act="lydhide" data-k="${t[0]}" aria-label="👁">${off?'＋':'👁'}</button></div>`}).join('');
 const B=g.dhBlk||{},blk=['wx','ai','today','bsv','quick'].map(k=>`<label class="lydtg"><span>${i(lydt('b_'+k))}</span><input type="checkbox" data-lydb="${k}" ${B[k]?'':'checked'}></label>`).join('');
 return`<h3 class="ly6h">▦ ${i(lydt('home'))}</h3><p class="ly6p">${i(lydt('homeS'))}</p><div class="ly6list">${rows}</div>
 <h3 class="ly6h">☰ ${i(lydt('blk'))}</h3><div class="ly6list lydblk">${blk}</div>`}
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='ly6'||!lydOn())return h;
 /* bottom bar: only Docs places */
 const ps=h.indexOf('<div class="ly6pool">');if(ps>=0){const pe=h.indexOf('</div>',ps)+6;const S=ly6slots();
  h=h.slice(0,ps)+`<div class="ly6pool">${LYD_POOL.map(k=>`<button type="button" class="${S.includes(k)?'u':''}" data-act="ly6put" data-k="${k}">${ly6ic(k)}<span>${i(ly6lab(k))}</span></button>`).join('')}</div>`+h.slice(pe)}
 h=h.replace(/<div class="ly6tip">[\s\S]*?<\/div><\/div>/,'');
 /* the old quick-access tiles and Butler sections go; Startseite and the home blocks come before the bar */
 const qs=h.indexOf('<h3 class="ly6h">✥'),rs=h.indexOf('<button type="button" class="btn ly6rs"');if(qs>=0&&rs>qs)h=h.slice(0,qs)+h.slice(rs);
 h=h.replace('<h3 class="ly6h" id="ly6nav">',lydStart()+'<h3 class="ly6h" id="ly6nav">');
 h=h.replace('data-act="ly6reset">↺ '+i(ly6t('reset')),'data-act="lydreset">↺ '+i(lydt('reset')));
 return h}catch(e){Hooks.err('lydscreen',e);return h}});
Hooks.on('route',r=>{if(r==='ly6'||r==='home')lydNav()});Hooks.on('render',()=>{if(m.route==='ly6'||m.route==='home')lydNav()});
const lydRe=()=>{try{ly6re()}catch{v()}};
Hooks.act('lydmv',d=>{const ord=DH_T.slice().sort((a,b)=>{const o=Array.isArray(g.dhOrd)?g.dhOrd:[],x1=o.indexOf(a[0]),x2=o.indexOf(b[0]);return(x1<0?99+DH_T.indexOf(a):x1)-(x2<0?99+DH_T.indexOf(b):x2)}).map(t=>t[0]);
 const j=ord.indexOf(d.k),k=j+ +d.d;if(j<0||k<0||k>=ord.length)return;[ord[j],ord[k]]=[ord[k],ord[j]];g.dhOrd=ord;$();lydRe()});
Hooks.act('lydhide',d=>{const H2=Array.isArray(g.dhHid)?g.dhHid:[];const j=H2.indexOf(d.k);j<0?H2.push(d.k):H2.splice(j,1);g.dhHid=H2;$();lydRe()});
Hooks.act('lydreset',()=>{g.nav6=LYD_DEF.slice();delete g.dhOrd;delete g.dhHid;delete g.dhBlk;$();T(lydt('resetOk'),2200);lydRe()});
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.lydb)return;const B=g.dhBlk=g.dhBlk&&typeof g.dhBlk==='object'?g.dhBlk:{};if(t.checked)delete B[t.dataset.lydb];else B[t.dataset.lydb]=1;$()},!0);

Hooks.css('docs-layout',`
.od .screen.ly6 h3.ly6h:has(+ .ly7tg),.od .screen.ly6 .ly7tg{display:none!important}
.lydeye{font-size:15px}.ly6r.off .lydeye{color:var(--green)!important}
.lydblk{padding-top:2px;padding-bottom:2px}.lydtg{display:flex;align-items:center;gap:10px;padding:11px 4px;font-size:16px}.lydtg+.lydtg{border-top:1px solid var(--line)}.lydtg span{flex:1}
.lydtg input{appearance:none;-webkit-appearance:none;width:46px;height:28px;border-radius:14px;background:#cfd6cc;position:relative;flex:none;cursor:pointer;transition:background .2s}
.lydtg input:after{content:'';position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s}
.lydtg input:checked{background:var(--green)}.lydtg input:checked:after{left:21px}
`);
