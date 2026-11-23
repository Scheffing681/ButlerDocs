/* ===== Butler Docs: the new Start (v50) =====
   The owner's own design, thought through (final concept, board 1):
   - head: initials (→ Profil), greeting, bell (→ Erinnerungen, red count from badge-place.js), menu (→ Alle Bereiche);
   - «Butler fragen oder suchen …» (→ Suche) with ✦ (→ Butler);
   - «Erfassen» — one way in for every source (camera, photos, file; printer and chip come with the app) and «KI-Hilfe»;
   - «Wichtig für Sie»: the next deadlines from everywhere (documents, contracts, offices, tasks) — the same sources as «Fristen»;
   - «Vollständig»: how many of the papers one usually needs in Germany are already in «Dokumente»; a tap shows what is missing;
   - «Meine Mappen»; eight areas, each with a live status under its name.
   Bottom bar: Start · Dokumente · ＋ · Fristen · Butler (Profil via the initials, Suche via the bar, Notizen via the menu).
   Nothing is deleted: the old home (docs-home.js) stays in the code; g.st50Off=1 brings it back. */
const stS={
 ask:['Спросить Батлера или найти …','Butler fragen oder suchen …','Ask Butler or search …'],
 cap:['Добавить','Erfassen','Capture'],capS:['Скан · Фото · Файл · Принтер','Scannen · Foto · Datei · Drucker','Scan · Photo · File · Printer'],
 ai:['ИИ-помощь','KI-Hilfe','AI help'],aiS:['Объяснить письмо, найти срок','Brief erklären, Frist finden','Explain a letter, find a deadline'],
 imp:['Важно для Вас','Wichtig für Sie','Important for you'],
 impNone:['Всё под контролем: в ближайшие 60 дней сроков нет','Alles im Griff: keine Fristen in den nächsten 60 Tagen','All in hand: no deadlines in the next 60 days'],
 more:['Ещё %n','%n weitere','%n more'],
 full:['Полнота','Vollständig','Complete'],fullS:['важных документов','wichtige Unterlagen','key documents'],
 mpx:['Мои подборки','Meine Mappen','My sets'],
 a_docs:['Документы','Dokumente','Documents'],a_dl:['Сроки','Fristen','Deadlines'],a_fin:['Финансы','Finanzen','Finances'],a_work:['Работа','Arbeit','Work'],
 a_gov:['Ведомства','Behörden','Offices'],a_med:['Здоровье','Gesundheit','Health'],a_fam:['Семья','Familie','Family'],a_vor:['Забота','Vorsorge','Provision'],
 soon:['%n скоро','%n bald','%n soon'],late:['%n просрочено','%n überfällig','%n overdue'],
 today:['сегодня','heute','today'],inN:['через %n дн.','in %n Tagen','in %n days'],past:['просрочено','überfällig','overdue'],
 /* Erfassen */
 capT:['Добавить документ','Dokument erfassen','Add a document'],
 c_cam:['Сканировать камерой','Mit der Kamera scannen','Scan with the camera'],c_camS:['Края, тени, несколько страниц → PDF','Ränder, Schatten, mehrere Seiten → PDF','Edges, shadows, several pages → PDF'],
 c_pic:['Из фото','Aus Fotos','From photos'],c_picS:['Снимки и скриншоты','Bilder und Screenshots','Pictures and screenshots'],
 c_file:['Файл или PDF','Datei oder PDF','File or PDF'],c_fileS:['Из «Файлов» и iCloud','Aus «Dateien» und iCloud','From «Files» and iCloud'],
 c_prn:['Принтер и сканер (Wi-Fi)','Drucker & Scanner (WLAN)','Printer & scanner (Wi-Fi)'],c_chip:['Прочитать чип паспорта','Chip im Ausweis lesen','Read the ID chip'],
 c_app:['в приложении','in der App','in the app'],
 c_appT:['Это появится в приложении из App Store и Google Play: браузер не может обращаться к принтеру и к чипу.','Das kommt mit der App aus App Store und Google Play: Ein Browser darf weder den Drucker noch den Chip ansprechen.','This comes with the app from the App Store and Google Play: a browser may not talk to the printer or the chip.'],
 c_note:['Butler сам распознаёт вид документа, даты и сроки — Вы только подтверждаете.','Butler erkennt Art, Daten und Fristen selbst – Sie bestätigen nur.','Butler recognises the kind, dates and deadlines itself – you only confirm.'],
 /* Vollständig */
 fT:['Важные документы','Wichtige Unterlagen','Key documents'],
 fIn:['Что обычно нужно в Германии. Галочка — документ уже есть в «Документах».','Was man in Deutschland meist braucht. Haken = schon in «Dokumente».','What one usually needs in Germany. Tick = already in «Documents».'],
 fScan:['Сканировать','Scannen','Scan'],
 k_id:['Паспорт или ID-карта','Personalausweis oder Reisepass','ID card or passport'],k_hc:['Карта больничной кассы','Gesundheitskarte','Health insurance card'],
 k_tax:['Налоговый номер (Steuer-ID)','Steuer-ID','Tax ID'],k_soc:['Номер социального страхования','Sozialversicherungsausweis','Social insurance card'],
 k_birth:['Свидетельство о рождении','Geburtsurkunde','Birth certificate'],k_reg:['Справка о прописке','Meldebescheinigung','Registration certificate'],
 k_rent:['Договор аренды','Mietvertrag','Rental contract'],k_job:['Трудовой договор','Arbeitsvertrag','Employment contract'],
 /* menu and bar */
 n_notes:['Заметки','Notizen','Notes'],n_prof:['Профиль','Profil','Profile'],n_butler:['Батлер','Butler','Butler']};
const stt=(k,o)=>{let s=cv5n(stS[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const stOn=()=>{try{return!g.dhOff&&!g.st50Off}catch{return!0}};
const STI={spark:'<path d="M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9z"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',cam:'<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.8" r="3.4"/>',
 pic:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4.5 3.5"/>',
 file:'<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M9 13h6M9 16.5h4"/>',
 prn:'<path d="M7 9V4h10v5"/><rect x="3.5" y="9" width="17" height="7.5" rx="1.8"/><path d="M7 14h10v6H7z"/>',
 chip:'<rect x="4" y="5" width="16" height="14" rx="2.2"/><path d="M9 9.5h6v5H9zM12 9.5v5M9 12h6"/>',
 heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
 brief:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.8A1.3 1.3 0 0 1 10.3 4.5h3.4A1.3 1.3 0 0 1 15 5.8v1.7M3.5 12.5h17"/>',
 coin:'<circle cx="12" cy="12" r="8.5"/><path d="M15.2 8.6a4.2 4.2 0 1 0 0 6.8M7.5 11h6M7.5 13.4h6"/>',
 gov:'<path d="M3 9.5L12 4l9 5.5M4.5 10h15M6 10v7.5M10 10v7.5M14 10v7.5M18 10v7.5M3.5 20h17"/>',
 mpx:'<path d="M3.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z"/><path d="M8 12.5l2.4 2.4 5-5"/>'};
const sti=(n,c)=>`<svg class="dhi${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true">${STI[n]||(typeof DH_I!=='undefined'&&DH_I[n])||''}</svg>`;
const stDays=k=>{try{const a=new Date();a.setHours(0,0,0,0);return Math.round((new Date(k+'T00:00:00')-a)/864e5)}catch{return 999}};
/* every deadline the app knows: the sources of «Fristen» (documents, contracts, car, offices) plus open tasks with a date */
function stDlAll(){let L2=[];const tag=(A,src)=>(A||[]).map(t=>Object.assign({src},t));
 try{if(typeof IZ==='function')L2=tag(IZ(),'doc')}catch{}
 try{if(typeof vDl==='function')L2=L2.concat(tag(vDl(),'doc'))}catch{}try{if(typeof bsvDl==='function')L2=L2.concat(tag(bsvDl(),'gov'))}catch{}try{if(typeof bsvDl3==='function')L2=L2.concat(tag(bsvDl3(),'gov'))}catch{}
 try{(g.tasks||[]).forEach(t=>{if(!t||t.done||t.knd==='w'||!t.due||!/^\d{4}-\d\d-\d\d$/.test(t.due))return;L2.push({src:'task',tid:t.id,k:t.due,t:t.t||'—',w:t.time||'',act:'data-act="go" data-to="tasks"'})})}catch{}
 const seen=new Set();return L2.filter(t=>t&&/^\d{4}-\d\d-\d\d$/.test(t.k||'')).filter(t=>{const key=t.k+'|'+t.t;if(seen.has(key))return!1;seen.add(key);return!0}).sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:0)}
/* «important»: overdue up to 60 days back and everything in the next 60 days */
const stImp=()=>stDlAll().filter(t=>{const n=stDays(t.k);return n>=-60&&n<=60});
const stWhen=k=>{const n=stDays(k);return n<0?stt('past'):n===0?stt('today'):stt('inN',{n})};
const stDate=k=>{try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{day:'numeric',month:'short'})}catch{return k}};
/* --- the key documents for «Vollständig» --- */
const ST_KEY=[['id',d=>/^(id|passport|intpass)$/.test(d.dtype||'')||/ausweis|reisepass|passport|паспорт/i.test(d.title||'')],
 ['hc',d=>d.dtype==='hcard'||/gesundheitskarte|krankenversichertenkarte|versichertenkarte|\begk\b|health.?card/i.test(d.title||'')],
 ['tax',d=>/steuer-?id|identifikationsnummer|tax.?id/i.test(d.title||'')],
 ['soc',d=>d.dtype==='social'||/sozialversicherung|rentenversicherungsnummer|social.?(insurance|security)/i.test(d.title||'')],
 ['birth',d=>d.dtype==='birth'||/geburtsurkunde|birth.?cert|свидетельство о рождении/i.test(d.title||'')],
 ['reg',d=>/meldebescheinigung|anmeldebest(ä|ae)tigung|wohnungsgeberbest/i.test(d.title||'')],
 ['rent',d=>/mietvertrag|rental.?(contract|agreement)|договор аренды/i.test(d.title||'')],
 ['job',d=>/arbeitsvertrag|employment.?contract|трудовой договор/i.test(d.title||'')]];
const stDocs=()=>{try{return(typeof Vi==='function'?Vi():Ke().items).filter(d=>d&&d.type!=='old20')}catch{return[]}};
function stFull(){const D=stDocs();return ST_KEY.map(([k,f])=>{const d=D.find(x=>{try{return f(x)}catch{return!1}});return{k,ok:!!d,id:d&&d.id}})}
/* --- area statuses --- */
function stArea(k){try{
 if(k==='docs'){const n=stDocs().length;return n?{t:String(n),c:'ok'}:null}
 if(k==='dl'){const I=stImp(),late=I.filter(t=>stDays(t.k)<0).length,soon=I.filter(t=>{const n=stDays(t.k);return n>=0&&n<=30}).length;
  return late?{t:stt('late',{n:late}),c:'r'}:soon?{t:stt('soon',{n:soon}),c:'y'}:{t:'✓',c:'ok'}}
 if(k==='med'){const n=stDocs().filter(d=>{try{return ho(d)==='med'}catch{return!1}}).length;return n?{t:String(n),c:'ok'}:null}
 if(k==='fam'){const n=(typeof Va==='function'?Va():[]).length;return n?{t:String(n),c:'ok'}:null}
 if(k==='gov'){const n=(typeof bsvDl==='function'?bsvDl():[]).filter(t=>{const d=stDays(t.k);return d>=0&&d<=30}).length;return n?{t:stt('soon',{n}),c:'y'}:null}
 if(k==='vor'){const s=typeof vsgSub==='function'?vsgSub():'';return s&&s.length<22?{t:s,c:'ok'}:null}
 }catch{}return null}
const ST_A=[['docs','fld','data-act="go" data-to="archive"',0],['dl','clock','data-act="go" data-to="dsrok"',0],['fin','coin','data-act="go" data-to="fzm"',0],['work','brief','data-act="go" data-to="kar"',0],
 ['gov','gov','data-act="go" data-to="bsv"',0],['med','heart','data-act="dccat" data-v="med"',0],['fam','users','data-act="go" data-to="people"',0],['vor','sprout','data-act="go" data-to="dnach"',0]];
function stIni(){try{const u=g.user||{};const a=(u.first||'').trim(),b=(u.last||'').trim();const s=((a[0]||'')+(b[0]||'')).toUpperCase();return s||((u.short||'B')[0]||'B').toUpperCase()}catch{return'B'}}
function stName(){try{const u=g.user||{};return u.short||[u.first,u.last].filter(Boolean).join(' ')||''}catch{return''}}
function stHello(){const h=new Date().getHours();return dht(h<5?'night':h<11?'morning':h<18?'day':h<22?'evening':'night')}
function stHome(){const I=stImp(),F=stFull(),ok=F.filter(x=>x.ok).length,p=Math.round(ok/F.length*100);let nm=0;try{nm=((g.mpx&&g.mpx.list)||[]).length}catch{}
 const dot=n=>n<0?'r':n<=14?'y':'g';
 const imp=I.length?I.slice(0,3).map(t=>{const n=stDays(t.k);return`<button type="button" class="stwi" ${t.act||'data-act="go" data-to="dsrok"'}><i class="${dot(n)}"></i><span><b>${i(t.t)}</b><small>${i([stDate(t.k),stWhen(t.k)].join(' · '))}</small></span></button>`}).join('')+(I.length>3?`<button type="button" class="stmore" data-act="go" data-to="dsrok">${i(stt('more',{n:I.length-3}))} ›</button>`:'')
  :`<p class="stnone">✓ ${i(stt('impNone'))}</p>`;
 return`<div class="screen dhome stn">
 <div class="sthd"><button type="button" class="stav" data-act="go" data-to="profile" aria-label="${i(stt('n_prof'))}">${i(stIni())}</button>
  <div class="sthi"><small>${i(stHello())},</small><b>${i(stName())}</b></div>
  <div class="dhtr"><button type="button" class="stcb" data-act="go" data-to="reminders" aria-label="bell">${dhi('bell')}</button><button type="button" class="stcb" data-act="go" data-to="dall" aria-label="menu">${sti('menu')}</button></div></div>
 <div class="stask"><button type="button" class="stq" data-act="go" data-to="search">${sti('search')}<span>${i(stt('ask'))}</span></button><button type="button" class="stsp" data-act="go" data-to="concierge" aria-label="Butler">${sti('spark')}</button></div>
 <div class="stcap"><button type="button" class="stbig" data-act="stcap"><span class="stic">${dhi('scan')}${sti('cam')}${sti('file')}</span><b>${i(stt('cap'))}</b><small>${i(stt('capS'))}</small></button>
  <button type="button" class="stai" data-act="go" data-to="concierge">${sti('spark','gold')}<b>${i(stt('ai'))}</b><small>${i(stt('aiS'))}</small></button></div>
 <div class="stduo"><div class="stcard stimp"><button type="button" class="sth" data-act="go" data-to="dsrok">${dhi('bell')}<b>${i(stt('imp'))}</b>${I.length?`<em>${I.length}</em>`:''}</button>${imp}</div>
  <div class="stov"><button type="button" class="stcard stfull" data-act="stfull"><small>${i(stt('full'))}</small><span class="string" style="--p:${p}%"><i><b>${p}%</b><small>${i(stt('fullS'))}</small></i></span></button>
  ${typeof egList==='function'?`<button type="button" class="stcard stmp" data-act="go" data-to="eing">${sti('mpx')}<b>${i(egt('t'))}</b>${(n=>n?`<em>${n}</em>`:'')(egList().length)}</button>`:`<button type="button" class="stcard stmp" data-act="go" data-to="mpx">${sti('mpx')}<b>${i(stt('mpx'))}</b>${nm?`<em>${nm}</em>`:''}</button>`}</div></div>
 <div class="star">${ST_A.map(([k,ic,a])=>{const s=stArea(k);return`<button type="button" class="sta${k==='docs'?' hl':''}" data-k="${k}" ${a}>${sti(ic)}<b>${i(stt('a_'+k))}</b>${s?`<small class="${s.c}">${i(s.t)}</small>`:'<small>&nbsp;</small>'}</button>`}).join('')}</div>
 </div>`}
/* the screen itself: docs-home.js hands the home over to stHome() (the hooks that add cards — backup reminder, offices — keep working) */
/* --- Erfassen: one sheet for every way in --- */
function stPick(sel){try{L.go?L.go({to:'sc9'}):R('sc9')}catch{try{R('sc9')}catch{}}try{const x=document.querySelector(sel);x&&x.click()}catch{}}
Hooks.act('stcap',()=>{const row=(k,ic,act,app)=>`<button type="button" class="strow${app?' stapp':''}" data-stc="${act}">${sti(ic)}<span><b>${i(stt(k))}</b>${stS[k+'S']?`<small>${i(stt(k+'S'))}</small>`:''}</span>${app?`<em>${i(stt('c_app'))}</em>`:dhi('chev','sm')}</button>`;
 const plug=typeof cpxPlug==='function'&&cpxPlug();
 H(stt('capT'),`<div class="stsheet">${row('c_cam','cam','cam')}${row('c_pic','pic','pic')}${row('c_file','file','file')}${row('c_prn','prn','app',1)}${row('c_chip','chip',plug?'chip':'app',!plug)}<p class="stnote">${i(stt('c_note'))}</p></div>`,sh=>{
  sh.querySelectorAll('[data-stc]').forEach(b=>b.onclick=()=>{const a=b.dataset.stc;if(a==='app'){T(stt('c_appT'),4200);return}sh.remove();
   if(a==='cam')stPick(null);else if(a==='pic')stPick('.sc9gi:not(.sc9ni)');else if(a==='file')stPick('.sc9fi');else if(a==='chip'){try{cpxSheet()}catch{stPick(null)}}})})});
/* --- Vollständig: what is there, what is missing --- */
Hooks.act('stfull',()=>{const F=stFull();
 H(stt('fT'),`<p class="stnote" style="margin-top:0;font-family:system-ui,sans-serif">${i(stt('fIn'))}</p><div class="stsheet">${F.map(x=>`<div class="strow ${x.ok?'ok':''}"><span class="stck">${x.ok?'✓':''}</span><span><b>${i(stt('k_'+x.k))}</b></span>${x.ok?`<button type="button" class="linkbtn" data-sto="${x.id}">›</button>`:`<button type="button" class="stsc" data-sts="1">${i(stt('fScan'))}</button>`}</div>`).join('')}</div>`,sh=>{
  sh.querySelectorAll('[data-sts]').forEach(b=>b.onclick=()=>{sh.remove();stPick(null)});
  sh.querySelectorAll('[data-sto]').forEach(b=>b.onclick=()=>{sh.remove();try{L.dzopen({id:b.dataset.sto})}catch{}})})});
/* --- the bottom bar: Start · Dokumente · ＋ · Fristen · Butler --- */
try{Object.assign(ly6EXT,{
 fristen:{lab:()=>stt('a_dl'),ic:()=>lydSvg(DH_I.clock||''),open:()=>R('dsrok')},
 butler:{lab:()=>stt('n_butler'),ic:()=>lydSvg(STI.spark),open:()=>R('concierge')}});
 ['fristen','butler'].forEach(k=>{ly6POOL.includes(k)||ly6POOL.push(k);LYD_POOL.includes(k)||LYD_POOL.push(k)});
 LYD_DEF.splice(0,4,'home','archive','fristen','butler');OD_OK.add('fristen');OD_OK.add('butler');
 BD8N.fristen='clock';BD8N.butler='spark';BD8I.spark=BD8I.spark||'<path d="M13 3.5l2.2 7.3 7.3 2.2-7.3 2.2L13 22.5l-2.2-7.3L3.5 13l7.3-2.2z"/>'}catch(e){Hooks.err('stnav',e)}
/* which place of the bar is lit: ly6EXT[k].on(route) */
try{ly6EXT.fristen.on=r=>r==='dsrok';ly6EXT.butler.on=r=>r==='concierge';if(ly6EXT.archive)ly6EXT.archive.on=r=>['archive','dccat','bdoc','arcf'].includes(r)}catch{}
/* once: the new bar for everybody (a bar set by hand later stays as it is) */
function stNav(){try{if(!m.logged||g.st50nav||!stOn())return;g.st50nav=1;g.nav6=['home','archive','fristen','butler'];$()}catch(e){Hooks.err('stnav1',e)}}
Hooks.on('render',stNav);
/* the menu (Alle Bereiche) is drawn by bereiche.js (v53) */
Hooks.css('docs-start',`
.stn{padding-bottom:110px!important}
.stn .bsvhm2{display:none}
.sthd{display:flex;align-items:center;gap:12px;margin:4px 0 12px}
.stav{flex:none;width:48px;height:48px;padding:0!important;display:flex;align-items:center;justify-content:center;text-align:center;border-radius:50%;border:0;background:linear-gradient(135deg,color-mix(in srgb,var(--green) 80%,#fff),var(--green));color:#fff!important;font-weight:700;font-size:16px;letter-spacing:.02em;box-shadow:0 0 0 3px var(--surface),0 3px 10px rgba(20,60,30,.15)}
.sthi{flex:1;min-width:0;display:flex;flex-direction:column}.sthi small{font-size:13.5px;color:var(--muted)}.sthi b{font-size:21px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stn .dhtr{gap:8px}.stcb{width:42px;height:42px;border-radius:50%;border:0;background:var(--surface);box-shadow:0 3px 10px rgba(20,60,30,.08);display:flex;align-items:center;justify-content:center;color:var(--green)!important}
.stask{display:flex;align-items:center;gap:8px;background:var(--surface);border-radius:24px;padding:6px 6px 6px 14px;box-shadow:0 4px 14px rgba(20,60,30,.07);margin-bottom:12px}
.stq{flex:1;display:flex;align-items:center;gap:10px;border:0;background:none;color:var(--muted)!important;font-size:15px;text-align:left;padding:6px 0;min-width:0}.stq span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.stq .dhi{width:20px;height:20px}
.stsp{flex:none;width:40px;height:40px;border-radius:50%;border:0;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--green) 65%,#fff),var(--green));color:#fff!important;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px color-mix(in srgb,var(--green) 45%,transparent)}.stsp .dhi{width:20px;height:20px}
.stcap{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:10px;margin-bottom:12px}
.stbig{display:flex;flex-direction:column;align-items:flex-start;gap:2px;border:0;border-radius:22px;padding:14px 16px;text-align:left;color:#fff!important;background:linear-gradient(140deg,color-mix(in srgb,var(--green) 75%,#4fbf7a),var(--green));box-shadow:0 8px 20px color-mix(in srgb,var(--green) 35%,transparent)}
.stbig .stic{display:flex;gap:8px;margin-bottom:6px;color:#f1d58e}.stbig .stic .dhi{width:22px;height:22px}.stbig b{font-size:19px}.stbig small{font-size:12.5px;opacity:.88;line-height:1.25}
.stai{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;border-radius:22px;padding:12px 8px;background:var(--surface);box-shadow:0 4px 14px rgba(20,60,30,.07);text-align:center}
.stai .dhi.gold{width:28px;height:28px;color:#c99a3e;fill:color-mix(in srgb,#c99a3e 22%,transparent)}.stai b{font-size:15.5px}.stai small{font-size:11.5px;color:var(--muted);line-height:1.25}
.stduo{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:10px;margin-bottom:12px;align-items:stretch}
.stcard{display:block;border:0;border-radius:22px;background:var(--surface);box-shadow:0 4px 14px rgba(20,60,30,.07);padding:12px 14px;text-align:left;width:100%}
.sth{display:flex;align-items:center;gap:7px;width:100%;border:0;background:none;padding:0 0 4px;text-align:left}.sth .dhi{width:19px;height:19px;color:#c99a3e}.sth b{font-size:15.5px}
.sth em,.stmp em{margin-left:auto;font-style:normal;background:var(--green);color:#fff;border-radius:11px;min-width:22px;height:22px;padding:0 6px;display:inline-flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700}
.stwi{display:flex;gap:9px;align-items:flex-start;width:100%;border:0;background:none;padding:6px 0;text-align:left}.stwi+.stwi{border-top:1px solid var(--line)}
.stwi i{flex:none;width:9px;height:9px;border-radius:50%;margin-top:5px}.stwi i.r{background:#e0684a}.stwi i.y{background:#e5a83a}.stwi i.g{background:#3bb36a}
.stwi span{min-width:0;display:flex;flex-direction:column}.stwi b{font-size:13.5px;line-height:1.25;font-weight:650;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.stwi small{font-size:11.8px;color:var(--muted)}
.stmore{border:0;background:none;color:var(--green)!important;font-size:13px;padding:4px 0 0;font-weight:600}
.stnone{font-size:13.5px;color:var(--muted);margin:6px 0 2px;line-height:1.35}
.stov{display:flex;flex-direction:column;gap:10px}
.stfull{text-align:center;flex:1;padding:10px}.stfull>small{display:block;text-align:left;font-size:12.5px;color:var(--muted)}
.string{display:flex;width:84px;height:84px;margin:4px auto 0;border-radius:50%;background:conic-gradient(var(--green) var(--p),color-mix(in srgb,var(--line) 85%,transparent) 0);align-items:center;justify-content:center}
.string>i{width:68px;height:68px;border-radius:50%;background:var(--surface);display:flex;flex-direction:column;align-items:center;justify-content:center;font-style:normal}.string b{font-size:20px;line-height:1}.string small{font-size:9px;color:var(--muted);line-height:1.1;margin-top:2px;max-width:58px}
.stmp{display:flex;align-items:center;gap:8px;padding:11px 12px}.stmp .dhi{width:20px;height:20px;color:var(--green);flex:none}.stmp b{font-size:13.5px;line-height:1.15}
.star{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}
.sta{display:flex;flex-direction:column;align-items:center;gap:3px;border:0;border-radius:20px;background:var(--surface);box-shadow:0 4px 12px rgba(20,60,30,.07);padding:12px 2px 9px;min-width:0}
.sta .dhi{width:24px;height:24px;color:var(--green)}.sta b{font-size:12.3px;font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sta small{font-size:10.5px;color:var(--muted);white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
.sta small.ok{color:var(--green)}.sta small.y{color:#b07514}.sta small.r{color:#c4472e;font-weight:600}
.sta.hl{background:linear-gradient(160deg,color-mix(in srgb,var(--green) 12%,var(--surface)),color-mix(in srgb,var(--green) 20%,var(--surface)))}
.stsheet{display:flex;flex-direction:column;gap:8px;font-family:-apple-system,"SF Pro Text",system-ui,sans-serif}.stsheet *{box-sizing:border-box}
.strow{display:flex!important;flex-direction:row!important;min-width:0;align-items:center;gap:12px;width:100%;border:1px solid var(--line);border-radius:16px;background:var(--surface);padding:12px 14px;text-align:left;color:var(--ink);font:inherit}
.strow>.dhi:first-child{width:24px;height:24px;color:var(--green);flex:none}.strow>span:not(.stck){flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.strow b{font-weight:600;font-size:15.5px}.strow small{color:var(--muted);font-size:12.5px}
.strow.stapp{opacity:.78}.strow em{font-style:normal;font-size:11.5px;border-radius:8px;padding:2px 7px;background:#efe4ff;color:#6a4bb0;white-space:nowrap}
.stck{flex:none;width:26px;height:26px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:700}.strow.ok .stck{background:var(--green);border-color:var(--green)}
.stsc{border:0;border-radius:12px;padding:7px 12px;background:var(--green);color:#fff!important;font-size:13px;font-weight:600}
.stnote{color:var(--muted);font-size:13px;line-height:1.4;margin:10px 2px 0}
.stdall .dhi.big{color:var(--green)}
`);
