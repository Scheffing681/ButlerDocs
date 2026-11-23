/* ===== Butler Docs: Start in the new look «Glas» (v58), step 2 =====
   Order: header (initials · BUTLER · bell) → greeting → search → «Wichtig für Sie» (first) → Erfassen | Eingang → eight areas.
   «Wichtig für Sie»: overdue items stay until they are marked; others appear 14 days before the date.
   Status with sign and word, never by colour alone: ⚠ überfällig · ⏰ in 3 Tagen · ✓ 12 Tage.
   Tap = sheet (Öffnen · Erledigt · Später · In den iPhone-Kalender); swipe left = Später / Erledigt.
   Erledigt hides the item (a task is ticked off) with 5 s «Rückgängig»; Später hides it until the chosen day.
   g.bdImp[key] = {d:1} done | {s:'YYYY-MM-DD'} later. The 50 % ring moves to Dokumente (step 4). */
const sgS={
 all:['Все','Alle','All'],open:['Открыть','Öffnen','Open'],done:['Готово','Erledigt','Done'],later:['Позже','Später','Later'],
 tom:['Завтра напомнить','Morgen erinnern','Remind tomorrow'],d3:['Через 3 дня','In 3 Tagen','In 3 days'],wk:['На следующей неделе','Nächste Woche','Next week'],
 cal:['В календарь iPhone','In den iPhone-Kalender','To the iPhone calendar'],calS:['С напоминанием за день и в тот же день в 9:00','Mit Erinnerung am Vortag und am Tag um 9:00','With an alert the day before and on the day at 9:00'],
 doneT:['Отмечено как готово','Als erledigt markiert','Marked as done'],laterT:['Скрыто до %d','Ausgeblendet bis %d','Hidden until %d'],undo:['Отменить','Rückgängig','Undo'],
 none:['Всё под контролем: в ближайшие 14 дней сроков нет','Alles im Griff: keine Fristen in den nächsten 14 Tagen','All in hand: no deadlines in the next 14 days'],
 late:['просрочено','überfällig','overdue'],today:['сегодня','heute','today'],tmw:['завтра','morgen','tomorrow'],inN:['через %n дн.','in %n Tagen','in %n days'],nD:['%n дн.','%n Tage','%n days'],
 cap:['Добавить','Erfassen','Capture'],capS:['Скан · Фото','Scan · Foto','Scan · Photo'],inb:['Входящие','Eingang','Inbox'],
 chk:['%n проверить','%n prüfen','%n to check'],ready:['всё проверено','alles geprüft','all checked'],empty:['пусто','leer','empty'],
 calHint:['Файл календаря открыт — нажмите «Добавить» в календаре.','Kalenderdatei geöffnet – im Kalender auf «Hinzufügen» tippen.','Calendar file opened – tap «Add» in the calendar.']};
const sgt=(k,o)=>{let s=cv5n(sgS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const sgIso=n=>{const x=new Date();x.setHours(12,0,0,0);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
const sgKey=t=>(t.src||'')+'|'+t.k+'|'+(t.t||'');
const sgSt=()=>{if(!g.bdImp||typeof g.bdImp!=='object')g.bdImp={};return g.bdImp};
/* the list: overdue (until marked) + the next 14 days, minus done and «later» */
function sgList(){const S=sgSt(),today=sgIso(0);let L2=[];try{L2=stDlAll()}catch{}
 return L2.filter(t=>{const n=stDays(t.k);if(n>14||n<-365)return!1;const s=S[sgKey(t)];if(s&&s.d)return!1;if(s&&s.s&&s.s>today)return!1;return!0})}
/* tidy: forget marks of items more than 60 days past */
function sgTidy(){try{const S=sgSt(),lim=sgIso(-60);Object.keys(S).forEach(k=>{const d=k.split('|')[1];if(d&&d<lim)delete S[k]})}catch{}}
function sgPill(k){const n=stDays(k);if(n<0)return`<span class="sgp r">⚠ ${i(sgt('late'))}</span>`;
 if(n<=7)return`<span class="sgp y">⏰ ${i(n===0?sgt('today'):n===1?sgt('tmw'):sgt('inN',{n}))}</span>`;return`<span class="sgp g">✓ ${i(sgt('nD',{n}))}</span>`}
const sgDay=k=>{try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{weekday:'short',day:'numeric',month:'short'})}catch{return k}};
function sgImp(){const L2=sgList();m.sgL=L2;
 const rows=L2.slice(0,3).map((t,j)=>`<div class="sgr" data-j="${j}"><div class="sgsw"><button type="button" class="sgl" data-sga="later" data-j="${j}">${i(sgt('later'))}</button><button type="button" class="sgd" data-sga="done" data-j="${j}">✓ ${i(sgt('done'))}</button></div>
  <button type="button" class="sgi" data-act="sgitem" data-j="${j}"><span><b>${i(t.t)}</b><small>${i([sgDay(t.k),t.w].filter(Boolean).join(', '))}</small></span>${sgPill(t.k)}</button></div>`).join('');
 return`<div class="stcard sgimp"><div class="sgh"><b>${i(stt('imp'))}</b><button type="button" data-act="go" data-to="dsrok">${i(sgt('all'))} ›</button></div>${rows||`<p class="sgnone">✓ ${i(sgt('none'))}</p>`}${L2.length>3?`<button type="button" class="sgmore" data-act="go" data-to="dsrok">+ ${i(stt('more',{n:L2.length-3}))}</button>`:''}</div>`}
function sgStart(){sgTidy();let E=[];try{E=typeof egList==='function'?egList():[]}catch{}const chk=E.filter(x=>x.s!=='ok').length;
 const ds=(()=>{try{return new Date().toLocaleDateString(he(),{weekday:'short',day:'numeric',month:'long'})}catch{return''}})();
 const area=([k,ic,a])=>{const s=stArea(k);let t=s?s.t:'';if(k==='dl'&&s&&s.c==='r')t='⚠ '+t.replace(/\D+/g,'');return`<button type="button" class="sta sga" data-k="${k}" ${a}>${sti(ic)}<b>${i(stt('a_'+k))}</b><small class="${s?s.c:''}">${t?i(t):'&nbsp;'}</small></button>`};
 return`<div class="screen dhome stn sgs">
 <div class="sthd sghd"><button type="button" class="stav" data-act="go" data-to="profile" aria-label="${i(stt('n_prof'))}">${i(stIni())}</button><span class="sgwm">BUTLER</span>
  <div class="dhtr"><button type="button" class="stcb" data-act="go" data-to="reminders" aria-label="bell">${dhi('bell')}</button></div></div>
 <h1 class="sggr">${i(stHello())},${stName()?` <em>${i(stName())}</em>`:''}</h1><p class="sgdt">${i(ds)}</p>
 <button type="button" class="sgq" data-act="go" data-to="search">${sti('search')}<span>${i(stt('ask'))}</span></button>
 ${sgImp()}
 <div class="sgtwo"><button type="button" class="sgc" data-act="stcap">${dhi('scan')}<span><b>${i(sgt('cap'))}</b><small>${i(sgt('capS'))}</small></span></button>
  <button type="button" class="sgc sge" data-act="go" data-to="eing">${sti('mpx')}<span><b>${i(sgt('inb'))}</b><small>${i(E.length?(chk?sgt('chk',{n:chk}):sgt('ready')):sgt('empty'))}</small></span>${E.length?`<em>${E.length}</em>`:''}</button></div>
 <div class="star sgar">${ST_A.map(area).join('')}</div></div>`}
const sgH0=stHome;stHome=function(){try{if(typeof bdOn==='function'&&bdOn())return sgStart()}catch(e){Hooks.err('sgstart',e)}return sgH0.apply(this,arguments)};
/* ---- actions ---- */
function sgOpen(t){try{const w=document.createElement('div');w.hidden=!0;w.innerHTML=`<button ${t.act||'data-act="go" data-to="dsrok"'}></button>`;document.body.appendChild(w);w.firstChild.click();w.remove()}catch(e){Hooks.err('sgopen',e)}}
function sgDone(t){const S=sgSt(),key=sgKey(t),prev=S[key];let tk=null;
 if(t.src==='task'&&t.tid){tk=(g.tasks||[]).find(x=>x.id===t.tid);if(tk)tk.done=!0}S[key]={d:1};$();v();
 lnqBar(sgt('doneT'),()=>{if(prev)S[key]=prev;else delete S[key];if(tk)tk.done=!1;$();v()})}
function sgLater(t,days){const S=sgSt(),key=sgKey(t),prev=S[key],d=sgIso(days);S[key]={s:d};$();v();
 lnqBar(sgt('laterT',{d:sgDay(d)}),()=>{if(prev)S[key]=prev;else delete S[key];$();v()})}
function sgIcs(t){const esc=s=>String(s||'').replace(/[\\;,]/g,c=>'\\'+c).replace(/\n/g,'\\n');const d=t.k.replace(/-/g,''),nx=new Date(t.k+'T12:00:00');nx.setDate(nx.getDate()+1);const d2=nx.toISOString().slice(0,10).replace(/-/g,'');
 const st=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'');
 const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Butler Docs//DE','BEGIN:VEVENT','UID:'+d+'-'+Math.random().toString(36).slice(2)+'@butlerdocs','DTSTAMP:'+st,'DTSTART;VALUE=DATE:'+d,'DTEND;VALUE=DATE:'+d2,'SUMMARY:'+esc(t.t),'DESCRIPTION:'+esc('Butler Docs'),
  'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+esc(t.t),'TRIGGER:-PT15H','END:VALARM','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+esc(t.t),'TRIGGER:PT9H','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
 try{const u=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));const a=document.createElement('a');a.href=u;a.download=(String(t.t).replace(/[^\wäöüÄÖÜß -]+/g,'').trim().slice(0,40)||'Frist')+'.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),6e4);T(sgt('calHint'))}catch(e){Hooks.err('sgics',e)}}
function sgLaterSheet(t){const sh=H(sgt('later'),`<div class="sgm">${[['1','tom'],['3','d3'],['7','wk']].map(([n,k])=>`<button type="button" data-n="${n}">${i(sgt(k))}<small>${i(sgDay(sgIso(+n)))}</small></button>`).join('')}</div>`);
 sh.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{sh.remove();sgLater(t,+b.dataset.n)})}
Hooks.act('sgitem',d=>{const t=(m.sgL||[])[+d.j];if(!t)return;const n=stDays(t.k);
 const b=(a,lab,sub,c)=>`<button type="button" class="${c||''}" data-a="${a}">${i(lab)}${sub?`<small>${i(sub)}</small>`:''}</button>`;
 const sh=H(t.t,`<div class="sgm"><p class="sgmw">${i(sgDay(t.k))} · ${sgPill(t.k)}</p>${b('open',sgt('open'),'','pri')}${b('done','✓ '+sgt('done'))}${b('1',sgt('tom'),sgDay(sgIso(1)))}${b('3',sgt('d3'),sgDay(sgIso(3)))}${b('7',sgt('wk'),sgDay(sgIso(7)))}${n>=0?b('cal',sgt('cal'),sgt('calS')):''}</div>`);
 sh.querySelectorAll('[data-a]').forEach(x=>x.onclick=()=>{const a=x.dataset.a;sh.remove();if(a==='open')sgOpen(t);else if(a==='done')sgDone(t);else if(a==='cal')sgIcs(t);else sgLater(t,+a)})});
/* swipe left on a row = Später / Erledigt */
let sgX=null;
document.addEventListener('touchstart',e=>{const r=e.target.closest&&e.target.closest('.sgr');if(!r||e.target.closest('.sgsw'))return;document.querySelectorAll('.sgr.op').forEach(z=>z!==r&&z.classList.remove('op'));sgX={r,x:e.touches[0].clientX,y:e.touches[0].clientY,dx:0,on:0}},{passive:!0});
document.addEventListener('touchmove',e=>{if(!sgX)return;const dx=e.touches[0].clientX-sgX.x,dy=e.touches[0].clientY-sgX.y;if(!sgX.on){if(Math.abs(dy)>Math.abs(dx)||Math.abs(dx)<8){if(Math.abs(dy)>10)sgX=null;return}sgX.on=1;sgX.r.classList.add('dr')}
 sgX.dx=Math.max(-170,Math.min(0,dx+(sgX.r.classList.contains('op')?-160:0)));const it=sgX.r.querySelector('.sgi');it.style.transition='none';it.style.transform=`translateX(${sgX.dx}px)`},{passive:!0});
document.addEventListener('touchend',()=>{if(!sgX)return;const s=sgX;sgX=null;const it=s.r.querySelector('.sgi');it.style.transition='';it.style.transform='';s.r.classList.remove('dr');if(!s.on)return;s.r.classList.toggle('op',s.dx<-60);
 {const blk=ev=>{ev.stopPropagation();ev.preventDefault()};it.addEventListener('click',blk,{capture:!0,once:!0});setTimeout(()=>it.removeEventListener('click',blk,{capture:!0}),400)}},{passive:!0});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-sga]');if(!b)return;const t=(m.sgL||[])[+b.dataset.j];if(!t)return;e.stopPropagation();if(b.dataset.sga==='done')sgDone(t);else sgLaterSheet(t)},!0);
Hooks.css('docs-start-glas',`
.sgs{padding-bottom:24px}
.sghd{display:grid!important;grid-template-columns:44px 1fr 44px;align-items:center}.sgwm{text-align:center;font:600 13px Georgia,"Cormorant Garamond",serif;letter-spacing:.42em;color:var(--muted);padding-left:.42em}
.sggr{font:600 28px/1.15 var(--display);margin:8px 2px 2px;color:var(--ink)}.sggr em{font-style:normal;color:var(--bd-acc,var(--green))}
.sgdt{margin:0 2px 12px;font-size:15px;color:var(--muted)}
.sgq{display:flex;align-items:center;gap:10px;width:100%;min-height:48px;border-radius:16px;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--muted);font:16px var(--body);padding:0 14px;margin-bottom:12px;text-align:left;cursor:pointer}.sgq svg{width:20px;height:20px}
.sgimp{padding:12px 14px 6px!important;margin-bottom:12px;border-radius:22px!important}
.sgh{display:flex;align-items:center;margin-bottom:2px}.sgh b{font-size:17px}.sgh button{margin-left:auto;border:0;background:none;color:var(--bd-acc,var(--green));font:600 15px var(--body);padding:6px 0 6px 10px;cursor:pointer}
.sgr{position:relative;overflow:hidden;border-radius:12px}.sgr+.sgr{border-top:1px solid var(--line)}
.sgsw{position:absolute;inset:0 0 0 auto;display:flex}.sgsw button{border:0;width:80px;font:700 14px var(--body);color:#fff;cursor:pointer}.sgl{background:#7d8ad1}.sgd{background:#2f8f6d}
.sgi{position:relative;display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;color:var(--ink);font:inherit;text-align:left;padding:10px 0;cursor:pointer;transition:transform .2s}
.sgr .sgsw{visibility:hidden}.sgr.op .sgsw,.sgr.dr .sgsw{visibility:visible}.sgr.op .sgi{transform:translateX(-160px)}.sgr.op .sgi,.sgr.dr .sgi{background:var(--bg)}
.sgi>span:first-child{flex:1;min-width:0}.sgi b{display:block;font-size:15.5px;font-weight:600;line-height:1.25;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}.sgi small{display:block;font-size:13.5px;color:var(--muted);margin-top:2px}
.sgp{flex:none;display:inline-flex;align-items:center;gap:3px;border-radius:10px;padding:4px 8px;font-size:13px;font-weight:700;white-space:nowrap}
.sgp.r{background:#fde6e0;color:#a63b25}.sgp.y{background:#fbefd5;color:#7d540c}.sgp.g{background:#dff3ec;color:#226c58}
:root[data-bd="dunkel"] .sgp.r{background:#4d2216;color:#ffb39c}:root[data-bd="dunkel"] .sgp.y{background:#4a3a12;color:#f6d78a}:root[data-bd="dunkel"] .sgp.g{background:#1f5a4b;color:#bff3e4}
.sgnone{margin:8px 0 10px;font-size:15px;color:var(--muted)}.sgmore{border:0;background:none;color:var(--bd-acc,var(--green));font:600 14.5px var(--body);padding:6px 0 8px;cursor:pointer}
.sgtwo{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.sgc{display:flex;align-items:center;gap:10px;min-width:0;border-radius:18px;padding:12px;border:1px solid rgba(255,255,255,.7);font:inherit;color:var(--ink);text-align:left;cursor:pointer;background:linear-gradient(150deg,#d6f1ea,#b8e3d8cc)}
.sgc.sge{background:linear-gradient(150deg,#e3effa,#cfe0f3cc)}
:root[data-bd="dunkel"] .sgc{background:linear-gradient(150deg,#1f6b5ccc,#14403acc);border-color:#5fe0c444}:root[data-bd="dunkel"] .sgc.sge{background:linear-gradient(150deg,#244a73cc,#1a2f4dcc);border-color:#8ab4ff44}
.sgc svg{width:24px;height:24px;flex:none;color:var(--bd-acc,var(--green))}:root[data-bd="dunkel"] .sgc.sge svg{color:#9cc0ff}.sgc>span{flex:1;min-width:0}.sgc b{display:block;font-size:16px}.sgc small{display:block;font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sgc em{flex:none;font-style:normal;background:var(--bd-acc,var(--green));color:#fff;border-radius:11px;min-width:24px;height:24px;display:grid;place-items:center;font-size:13px;font-weight:700}:root[data-bd="dunkel"] .sgc em{color:#05201A}
.sgar{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:8px!important}
.sga{display:flex!important;flex-direction:column;align-items:center;gap:3px;padding:11px 2px 9px!important;min-width:0;border-radius:16px!important}
.sga b{font-size:12.5px!important;font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sga svg{width:22px;height:22px}
.sga small{font-size:12px!important;font-weight:700;color:var(--bd-acc,var(--green))}.sga small.r{color:#c2412a}.sga small.y{color:#9a6a10}:root[data-bd="dunkel"] .sga small.r{color:#ff9c80}:root[data-bd="dunkel"] .sga small.y{color:#f0c35a}
.sgm{display:flex;flex-direction:column;gap:8px}.sgm button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;border:1px solid var(--bd-edge,var(--line));border-radius:14px;background:var(--bd-glass,var(--surface));color:var(--ink);font:600 16px var(--body);padding:12px 14px;text-align:left;cursor:pointer}
.sgm button small{font-weight:400;font-size:13.5px;color:var(--muted)}.sgm button.pri{background:var(--bd-acc,var(--green));color:#fff;border-color:transparent}:root[data-bd="dunkel"] .sgm button.pri{color:#05201A}
.sgmw{display:flex;align-items:center;gap:8px;margin:0 2px 4px;color:var(--muted);font-size:14.5px}
`);
