/* ===== Butler Docs: build your own Start (v96) =====
   On Start, hold a tile → the tiles wiggle (as before, ordnen.js) and the bar gets «＋ Kacheln»:
   a sheet with every tile there is — the eight usual ones and more (Kalender, Verträge, Steuern, Immobilien, Fahrzeuge,
   Vermögen, Tresor, Anweisungen, Käufe, Mappen, Versicherungen, Bildung, Scannen, Kontakte) — each switched on or off.
   New tiles come at the end and can be dragged like the others. «Zurücksetzen» in the sheet = the usual eight.
   All tiles use the same coloured folders. Data: g.stTiles = {on:[extra keys], off:[usual keys]}. */
const SKX_S={tiles:['＋ Плитки','＋ Kacheln','＋ Tiles'],title:['Мой стартовый экран','Mein Startbildschirm','My start screen'],
 hint:['Включите нужные плитки. Порядок меняется перетаскиванием.','Schalten Sie die Kacheln ein, die Sie möchten. Die Reihenfolge ändern Sie durch Ziehen.','Switch on the tiles you want. Drag to change the order.'],
 base:['Обычные','Standard','Standard'],more:['Дополнительно','Weitere','More'],save:['Готово','Fertig','Done'],reset:['Как было','Zurücksetzen','Reset'],min:['Оставьте хотя бы одну плитку','Mindestens eine Kachel behalten','Keep at least one tile'],
 x_kal:['Календарь','Kalender','Calendar'],x_vtr:['Договоры','Verträge','Contracts'],x_steu:['Налоги','Steuern','Taxes'],x_immo:['Недвижимость','Immobilien','Property'],x_fz:['Транспорт','Fahrzeuge','Vehicles'],
 x_verm:['Имущество','Vermögen','Assets'],x_tres:['Сейф','Tresor','Safe'],x_anw:['Указания','Anweisungen','Instructions'],x_kauf:['Покупки','Käufe','Purchases'],x_mpx:['Подборки','Mappen','Folder sets'],
 x_vers:['Страховки','Versicherungen','Insurance'],x_bild:['Образование','Bildung','Education'],x_scan:['Сканировать','Scannen','Scan'],x_post:['Письма','Briefe','Letters'],x_ber:['Разделы','Bereiche','Areas']};
const skxt=k=>cv5n(SKX_S[k]||[k]);
/* key|glyph|colour|action */
const SKX_X=[['kal','cal','#4A84D6','data-act="go" data-to="kal"'],['vtr','pen','#E3873A','data-act="fzkost"'],['steu','coins','#E0A92E','data-act="taxopen"'],['immo','house','#3F9FA3','data-act="vnxk" data-k="immo"'],
 ['fz','car','#4A84D6','data-act="vnxk" data-k="fz"'],['verm','diamond','#8B6FD0','data-act="skxverm"'],['tres','safe','#E3873A','data-act="dhvault"'],['anw','list','#4E9E5F','data-act="go" data-to="vnxa"'],
 ['kauf','bag','#E3873A','data-act="go" data-to="kauf"'],['mpx','fld','#3F9FA3','data-act="go" data-to="mpx"'],['vers','shield','#8B6FD0','data-act="zlopen" data-k="vers"'],['bild','cap','#8B6FD0','data-act="zlopen" data-k="bild"'],
 ['scan','camera','#4E9E5F','data-act="go" data-to="sc9"'],['ber','grid','#8A93A0','data-act="skxber"']];
const skxD=()=>{const o=g.stTiles=g.stTiles&&typeof g.stTiles==='object'?g.stTiles:{};if(!Array.isArray(o.on))o.on=[];if(!Array.isArray(o.off))o.off=[];return o};
const skxTile=([k,gl,c,a])=>`<button type="button" class="sta sga skxt" data-k="x_${k}" ${a}>${iknF(gl,c)}<b>${i(skxt('x_'+k))}</b><small>&nbsp;</small></button>`;
Hooks.on('screen',h=>{try{if(m.route!=='home'||typeof h!=='string'||!h.includes('class="star sgar"'))return h;const o=skxD();if(!o.on.length&&!o.off.length)return h;
 o.off.forEach(k=>{h=h.replace(new RegExp(`<button type="button" class="sta sga" data-k="${k}"[\\s\\S]*?</button>`),'')});
 const add=SKX_X.filter(x=>o.on.includes(x[0])).map(skxTile).join('');if(add){const p=h.indexOf('class="star sgar"'),e=h.indexOf('</div>',p);if(e>0)h=h.slice(0,e)+add+h.slice(e)}}catch(e){Hooks.err('skxscreen',e)}return h});
Hooks.act('skxverm',()=>{g.dnach=Object.assign(g.dnach||{},{tab:'a'});R('dnach')});
Hooks.act('skxber',()=>{m.zlV='ber';R('archive')});
const skxCol={},skxLab={};
function skxSheet(){const o=skxD(),BK=ST_A.map(([k,ic])=>[k==='docs'&&document.querySelector('.screen .sgar [data-k="post"]')?'post':k,ic]),B=BK.map(a=>a[0]);
 const row=(k,lab,ico,on)=>`<label class="bsvtog skxr"><input type="checkbox" data-skx="${k}" ${on?'checked':''}>${ico}<span>${i(lab)}</span></label>`;
 H(skxt('title'),`<div class="bsvys"><p class="dnnote">${i(skxt('hint'))}</p><label class="bsvl">${i(skxt('base'))}</label>
 ${BK.map(([k,ic])=>{const t=document.querySelector(`.screen .sgar [data-k="${k}"]`),f=t&&t.querySelector('.ddf'),c=f?f.style.getPropertyValue('--c'):(skxCol[k]||'#8A93A0'),lab=t&&t.querySelector('b')?t.querySelector('b').textContent:(skxLab[k]||stt('a_'+(k==='post'?'docs':k)));if(f)skxCol[k]=c;if(t)skxLab[k]=lab;return row(k,lab,`<span class="ddf ikf s" style="--c:${c}">${sti(ic)}</span>`,!o.off.includes(k))}).join('')}
 <label class="bsvl">${i(skxt('more'))}</label>${SKX_X.map(([k,gl,c])=>row('x_'+k,skxt('x_'+k),iknF(gl,c,'s'),o.on.includes(k))).join('')}
 <small class="verr" data-skxe></small><button type="button" class="dcadd gold" data-skxs>${i(skxt('save'))}</button><button type="button" class="bsvplus" data-skxr>${i(skxt('reset'))}</button></div>`,
 el=>{el.classList.add('bsvsh');
  el.querySelector('[data-skxs]').onclick=()=>{const C=[...el.querySelectorAll('[data-skx]')],off=C.filter(c=>!c.checked&&!c.dataset.skx.startsWith('x_')).map(c=>c.dataset.skx),on=C.filter(c=>c.checked&&c.dataset.skx.startsWith('x_')).map(c=>c.dataset.skx.slice(2));
   if(B.length-off.length+on.length<1){el.querySelector('[data-skxe]').textContent=skxt('min');return}o.off=off;o.on=on;$();el.remove();skxRe()};
  el.querySelector('[data-skxr]').onclick=()=>{o.off=[];o.on=[];try{delete g.bdOrd.start}catch{}$();el.remove();skxRe()}})}
function skxRe(){const was=!!(typeof orOn!=='undefined'&&orOn);try{if(was)orStop()}catch{}v();if(was)setTimeout(()=>{try{const c=document.querySelector('.screen .sgar');if(c)orStart(c,'start')}catch{}},80)}
/* the button in the «arrange» bar, only on Start */
const _skxBar=orBar;
orBar=function(){_skxBar.apply(this,arguments);try{if(!orOn||orOn.key!=='start')return;const b=document.querySelector('.orbar');if(!b||b.querySelector('[data-skxb]'))return;
 const x=document.createElement('button');x.type='button';x.dataset.skxb=1;x.textContent=skxt('tiles');b.insertBefore(x,b.querySelector('[data-or]'))}catch(e){Hooks.err('skxbar',e)}};
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-skxb]');if(!b)return;e.preventDefault();e.stopPropagation();skxSheet()},!0);
Hooks.css('docs-kacheln',`.skxr{display:flex!important;align-items:center;gap:10px}.skxr .ikf.s{margin:4px 0 0}.skxr .ikf.s svg{width:15px;height:15px;color:#fff;stroke:#fff}
.orbar [data-skxb]{background:rgba(255,255,255,.16)}.orbar span{font-size:13px}`);
