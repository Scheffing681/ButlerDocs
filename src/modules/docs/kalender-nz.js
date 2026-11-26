/* ===== Butler Docs: Kalender 2.0 and one bell (v83) =====
   KALENDER (route kal): everything with a date in one place — deadlines from all sections, contracts, payments, tasks,
   own events, birthdays and the public holidays of the chosen Bundesland (g.bl; week starts on Monday).
   Views: Liste (agenda, next 60 days by day) · Woche (Mon–Sun, ‹ ›) · Jahr (12 months with counts → that month).
   Schnelleingabe: «Termin mit Vermieter 5.12. 15 Uhr» → preview → save (g.events). A clash with an event at the same
   time is shown with the next free hour; nothing is moved by itself. Reminders per event: 90/30/14/7/3/1 days (e.rem).
   GLOCKE (route nz): one list of what needs attention — overdue and soon deadlines, Kündigung dates, price rises,
   bills due (payments of one day are combined: «Heute 3 Zahlungen · 245 €»), inbox, expected answers, event reminders,
   a backup that is old — with priority (hoch · mittel · niedrig), category filter, «gelesen», «Alle gelesen»,
   quiet mode (only «hoch» counts) and the day summary on top. Start's bell opens it.
   Data: g.bl, g.events[].rem, g.nz = {read:{key:1}, quiet} */
const knS={
 kal:['Календарь','Kalender','Calendar'],v_list:['Список','Liste','List'],v_week:['Неделя','Woche','Week'],v_year:['Год','Jahr','Year'],
 quick:['Напр. «Термин у арендодателя 5.12. 15:00»','z. B. „Termin mit Vermieter 5.12. 15 Uhr“','e.g. “Meeting landlord 5.12. 3 pm”'],prev:['Будет создано: %t','Wird angelegt: %t','Will be created: %t'],add:['Добавить','Eintragen','Add'],
 clash:['В это время уже есть «%t». Свободно в %h.','Um diese Zeit ist schon „%t“. Frei wäre %h Uhr.','“%t” is already at this time. Free at %h.'],useFree:['Взять %h','%h Uhr nehmen','Take %h'],anyway:['Всё равно сохранить','Trotzdem speichern','Save anyway'],
 noDate:['Не нашёл дату — напишите, например, «5.12.» или «завтра»','Kein Datum erkannt – z. B. „5.12.“ oder „morgen“','No date found – e.g. “5.12.” or “tomorrow”'],saved:['Сохранено','Eingetragen','Saved'],
 rem:['Напомнить','Erinnern','Remind'],dB:['за %n дн.','%n T. vorher','%n d before'],
 bl:['Федеральная земля','Bundesland','Federal state'],blS:['для праздников','für die Feiertage','for public holidays'],hol:['Праздник','Feiertag','Holiday'],bday:['День рождения','Geburtstag','Birthday'],
 none:['Ничего в эти дни','Nichts an diesen Tagen','Nothing on these days'],today:['Сегодня','Heute','Today'],tom:['Завтра','Morgen','Tomorrow'],
 /* bell */
 nz:['Уведомления','Mitteilungen','Notifications'],day:['Сегодня: сроков %a · платежей %b · встреч %c','Heute: %a Fristen · %b Zahlungen · %c Termine','Today: %a deadlines · %b payments · %c events'],
 p_hi:['важно','hoch','high'],p_mid:['средне','mittel','medium'],p_lo:['инфо','niedrig','low'],c_all:['Все','Alle','All'],c_fin:['Деньги','Finanzen','Money'],c_doc:['Документы','Dokumente','Documents'],c_ver:['Договоры','Verträge','Contracts'],c_kal:['Календарь','Termine','Calendar'],c_post:['Письма','Post','Mail'],c_sys:['Система','System','System'],
 read:['Прочитано','Gelesen','Read'],c_kauf:['Покупки','Käufe','Purchases'],c_ges:['Здоровье','Gesundheit','Health'],
 s_neu:['Новые','Neu','New'],s_rd:['Прочитанные','Gelesen','Read'],s_sn:['Отложенные','Später','Snoozed'],snz:['Напомнить позже','Später erinnern','Remind later'],sn1:['Завтра','Morgen','Tomorrow'],sn3:['Через 3 дня','In 3 Tagen','In 3 days'],sn7:['Через неделю','In einer Woche','In a week'],snU:['до %d','bis %d','until %d'],snBack:['Вернуть','Zurückholen','Bring back'],
 cats:['Какие уведомления показывать','Welche Hinweise anzeigen','Which notices to show'],catsS:['выключенные категории не попадают в колокольчик','abgeschaltete Bereiche erscheinen nicht in der Glocke','switched-off areas do not appear in the bell'],
 pushN:['Push-уведомления появятся с версией из App Store. Сейчас всё видно в колокольчике.','Push-Mitteilungen kommen mit der App-Store-Version. Bis dahin steht alles in der Glocke.','Push notifications come with the App Store version. Until then everything is in the bell.'],allRead:['Отметить всё прочитанным','Alle als gelesen','Mark all as read'],quiet:['Тихий режим','Ruhemodus','Quiet mode'],quietS:['считать только важное','nur „hoch“ zählen','count only “high”'],
 payN:['%d: платежей %n · %a','%d: %n Zahlungen · %a','%d: %n payments · %a'],late:['просрочено','überfällig','overdue'],inD:['через %n дн.','in %n Tagen','in %n days'],
 inb:['Во входящих: %n','Im Eingang: %n','In the inbox: %n'],ans:['Ответа нет: %t','Keine Antwort: %t','No answer: %t'],bk:['Копия старше 30 дней','Sicherung älter als 30 Tage','Backup older than 30 days'],
 empty:['Всё спокойно ✓','Alles ruhig ✓','All calm ✓'],openKal:['Календарь','Kalender','Calendar']};
const knt=(k,o)=>{let s=cv5n(knS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* ---------- holidays ---------- */
const KN_BL=[['BW','Baden-Württemberg'],['BY','Bayern'],['BE','Berlin'],['BB','Brandenburg'],['HB','Bremen'],['HH','Hamburg'],['HE','Hessen'],['MV','Mecklenburg-Vorpommern'],['NI','Niedersachsen'],['NW','Nordrhein-Westfalen'],['RP','Rheinland-Pfalz'],['SL','Saarland'],['SN','Sachsen'],['ST','Sachsen-Anhalt'],['SH','Schleswig-Holstein'],['TH','Thüringen']];
function knEaster(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g2=Math.floor((b-f+1)/3),h=(19*a+b-d-g2+15)%30,i2=Math.floor(c/4),k=c%4,l=(32+2*e+2*i2-h-k)%7,m2=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m2+114)/31),da=((h+l-7*m2+114)%31)+1;return new Date(Date.UTC(y,mo-1,da))}
const knIso=d=>d.toISOString().slice(0,10);const knPlus=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x};
const KN_HN={'Neujahr':['Новый год','Neujahr','New Year’s Day'],'Karfreitag':['Страстная пятница','Karfreitag','Good Friday'],'Ostermontag':['Пасхальный понедельник','Ostermontag','Easter Monday'],'Tag der Arbeit':['День труда','Tag der Arbeit','Labour Day'],'Christi Himmelfahrt':['Вознесение','Christi Himmelfahrt','Ascension Day'],'Pfingstmontag':['Духов день (понедельник после Троицы)','Pfingstmontag','Whit Monday'],'Tag der Deutschen Einheit':['День единства Германии','Tag der Deutschen Einheit','German Unity Day'],'1. Weihnachtstag':['Рождество','1. Weihnachtstag','Christmas Day'],'2. Weihnachtstag':['Второй день Рождества','2. Weihnachtstag','Boxing Day'],
 'Heilige Drei Könige':['Богоявление (Трёх королей)','Heilige Drei Könige','Epiphany'],'Frauentag':['Международный женский день','Frauentag','International Women’s Day'],'Fronleichnam':['Праздник Тела Христова','Fronleichnam','Corpus Christi'],'Mariä Himmelfahrt':['Успение Богородицы','Mariä Himmelfahrt','Assumption Day'],'Weltkindertag':['День защиты детей','Weltkindertag','World Children’s Day'],'Reformationstag':['День Реформации','Reformationstag','Reformation Day'],'Allerheiligen':['День всех святых','Allerheiligen','All Saints’ Day'],'Buß- und Bettag':['День покаяния и молитвы','Buß- und Bettag','Day of Repentance and Prayer']};
const knHN=n=>KN_HN[n]?cv5n(KN_HN[n]):n;
function knHolidays(y,bl){const E=knEaster(y),f=(m2,d)=>`${y}-${String(m2).padStart(2,'0')}-${String(d).padStart(2,'0')}`,H=[[f(1,1),'Neujahr'],[knIso(knPlus(E,-2)),'Karfreitag'],[knIso(knPlus(E,1)),'Ostermontag'],[f(5,1),'Tag der Arbeit'],[knIso(knPlus(E,39)),'Christi Himmelfahrt'],[knIso(knPlus(E,50)),'Pfingstmontag'],[f(10,3),'Tag der Deutschen Einheit'],[f(12,25),'1. Weihnachtstag'],[f(12,26),'2. Weihnachtstag']];
 const s=(L2,d,n)=>{if(L2.includes(bl))H.push([d,n])};s('BW BY ST'.split(' '),f(1,6),'Heilige Drei Könige');s(['BE','MV'],f(3,8),'Frauentag');s(['BW','BY','HE','NW','RP','SL'],knIso(knPlus(E,60)),'Fronleichnam');s(['SL','BY'],f(8,15),'Mariä Himmelfahrt');s(['TH'],f(9,20),'Weltkindertag');
 s(['BB','HB','HH','MV','NI','SN','ST','SH','TH'],f(10,31),'Reformationstag');s(['BW','BY','NW','RP','SL'],f(11,1),'Allerheiligen');if(bl==='SN'){const d=new Date(Date.UTC(y,10,22));while(d.getUTCDay()!==3)d.setUTCDate(d.getUTCDate()-1);H.push([knIso(d),'Buß- und Bettag'])}
 return H.sort((a,b)=>a[0].localeCompare(b[0]))}
/* ---------- all dated items ---------- */
const knEv=()=>Array.isArray(g.events)?g.events:(g.events=[]);
function knItems(from,to){const out=[];const inR=k=>k>=from&&k<=to;
 try{stDlAll().forEach(t=>{if(inR(t.k))out.push({k:t.k,t:t.t,w:t.w||'',c:t.src==='task'?'kal':t.src==='vapr'?'ver':'doc',ic:t.src==='task'?'✓':t.src==='vapr'?'▲':'⏰',act:t.act||'data-act="go" data-to="dsrok"'})})}catch{}
 try{const y0=+from.slice(0,4),y1=+to.slice(0,4);knEv().forEach(e=>{if(!e||!e.date)return;const ys=e.yearly?[...new Set([y0,y1])]:[0];ys.forEach(y=>{const k=e.yearly?y+e.date.slice(4):e.date;if(inR(k))out.push({k,t:e.title||'—',w:e.time||'',c:'kal',ic:e.type==='birthday'?'🎂':'📅',act:'data-act="go" data-to="mycal"',ev:e})})})}catch{}
 try{(typeof Va==='function'?Va():[]).forEach(c=>{const b=c.birthday||c.bday||c.dob;if(!b||!/^\d{4}-\d\d-\d\d$/.test(b))return;[+from.slice(0,4),+to.slice(0,4)].forEach(y=>{const k=y+b.slice(4);if(inR(k)&&!out.some(o=>o.k===k&&o.ic==='🎂'))out.push({k,t:knt('bday')+': '+(c.first||c.name||''),c:'kal',ic:'🎂',act:`data-act="pgo" data-id="${c.id}"`})})})}catch{}
 try{const bl=g.bl||'';[...new Set([+from.slice(0,4),+to.slice(0,4)])].forEach(y=>knHolidays(y,bl).forEach(([k,n])=>{if(inR(k))out.push({k,t:knHN(n),c:'hol',ic:'🎉',hol:1})}))}catch{}
 try{ubPays(400).forEach(({d,o})=>{if(inR(o.due)&&!out.some(x=>x.k===o.due&&x.t.includes(d.title||'#')))out.push({k:o.due,t:d.title||'—',w:vaEur(o.amt),c:'fin',ic:'💶',act:`data-act="dzopen" data-id="${d.id}"`})})}catch{}
 return out.sort((a,b)=>a.k.localeCompare(b.k)||String(a.w).localeCompare(String(b.w)))}
const knDay=k=>{try{return new Date(k+'T12:00:00').toLocaleDateString(he(),{weekday:'long',day:'numeric',month:'long'})}catch{return k}};
const knRow=x=>`<button type="button" class="varow ${x.hol?'knhol':''}" ${x.act||''}><span class="vaic">${x.ic}</span><span class="vatx"><b>${i(x.t)}</b>${x.w?`<small>${i(x.w)}</small>`:''}</span><span class="vaam">${x.act?'›':''}</span></button>`;
function kalScreen(){const v2=m.knV||'list',today=vaIso(0);let body='';
 if(v2==='list'){const L2=knItems(today,vaAdd(today,60)),days=[...new Set(L2.map(x=>x.k))];
  body=days.length?days.map(k=>`<h3 class="vash">${i(k===today?knt('today'):k===vaAdd(today,1)?knt('tom'):knDay(k))}</h3><div class="vacard">${L2.filter(x=>x.k===k).map(knRow).join('')}</div>`).join(''):`<div class="vacard"><p class="dhnone">${i(knt('none'))}</p></div>`}
 if(v2==='week'){const off=m.knW||0,d0=new Date(today+'T12:00:00');const wd=(d0.getDay()+6)%7;d0.setDate(d0.getDate()-wd+off*7);const mon=d0.toISOString().slice(0,10),sun=vaAdd(mon,6),L2=knItems(mon,sun);
  body=`<div class="vamnav knnav"><button type="button" data-act="knw" data-d="-1">‹</button><b>${i(vaDate(mon))} – ${i(vaDate(sun))}</b><button type="button" data-act="knw" data-d="1">›</button></div>`+[0,1,2,3,4,5,6].map(j=>{const k=vaAdd(mon,j),D=L2.filter(x=>x.k===k);return`<div class="vacard knday ${k===today?'now':''}"><div class="kndh">${i(knDay(k))}</div>${D.length?D.map(knRow).join(''):'<p class="kn0">—</p>'}</div>`}).join('')}
 if(v2==='year'){const y=m.knY||new Date().getFullYear(),L2=knItems(y+'-01-01',y+'-12-31');
  body=`<div class="vamnav knnav"><button type="button" data-act="kny" data-d="-1">‹</button><b>${y}</b><button type="button" data-act="kny" data-d="1">›</button></div><div class="kngrid">${[...Array(12)].map((_x,j)=>{const mk=y+'-'+String(j+1).padStart(2,'0'),D=L2.filter(x=>x.k.startsWith(mk)),nH=D.filter(x=>x.hol).length;
   return`<button type="button" class="knm" data-act="knm" data-k="${mk}"><b>${i(new Date(mk+'-15T12:00:00').toLocaleDateString(he(),{month:'long'}))}</b><span>${D.length-nH}</span><small>${nH?'🎉 '+nH:''}</small></button>`}).join('')}</div>`;
  if(m.knM&&m.knM.startsWith(String(y))){const D=L2.filter(x=>x.k.startsWith(m.knM));body+=D.length?D.map(x=>`<div class="vacard"><div class="kndh">${i(knDay(x.k))}</div>${knRow(x)}</div>`).join(''):`<div class="vacard"><p class="dhnone">${i(knt('none'))}</p></div>`}}
 const bl=(KN_BL.find(b=>b[0]===g.bl)||['','—'])[1];
 return`<div class="screen dhome fz va knw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(knt('kal'))}</h2></div><span></span></div>
 <div class="knq"><input class="field" data-knq placeholder="${i(knt('quick'))}"><button type="button" class="vabtn p" data-act="knadd">${i(knt('add'))}</button></div><div data-knp></div>
 <div class="fztabs vatabs">${['list','week','year'].map(k=>`<button type="button" class="${v2===k?'on':''}" data-act="knv" data-k="${k}">${i(knt('v_'+k))}</button>`).join('')}</div>
 ${body}
 <button type="button" class="vaabot abent" data-act="knbl"><span><b>🗺 ${i(knt('bl'))}: ${i(bl)}</b><small>${i(knt('blS'))}</small></span><span class="akch">›</span></button></div>`}
/* quick entry with clash check */
let knDraft=null;
function knParse(t){try{const w=td9when(' '+t+' ');if(!w||!w.due)return null;let title=(w.rest||t),time=w.time||'';
 if(!time){const r=title.match(/(?:\b(?:um|в|at|à|a las)\s*)?\b(\d{1,2})(?:[:.](\d{2}))?\s*(?:uhr|h|ч|час\w*|o'?clock)\b|\b(\d{1,2}):(\d{2})\b/i);if(r){const hh=+(r[1]||r[3]),mm=r[2]||r[4]||'00';if(hh<24){time=String(hh).padStart(2,'0')+':'+mm;title=title.replace(r[0],' ')}}}
 return{title:title.replace(/\s+/g,' ').trim()||t,date:w.due,time}}catch{return null}}
const knMin=s=>{const[a,b]=String(s||'').split(':').map(Number);return a*60+(b||0)};
function knClash(d){if(!d.time)return null;const same=knEv().filter(e=>e&&e.date===d.date&&e.time&&Math.abs(knMin(e.time)-knMin(d.time))<60);if(!same.length)return null;
 let t=knMin(d.time);for(let j=0;j<12;j++){t+=60;if(t>=22*60)break;if(!knEv().some(e=>e&&e.date===d.date&&e.time&&Math.abs(knMin(e.time)-t)<60))return{e:same[0],free:String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0')}}return{e:same[0],free:''}}
function knPreview(){const box=document.querySelector('[data-knp]');if(!box)return;if(!knDraft){box.innerHTML='';return}const d=knDraft,c=knClash(d);
 box.innerHTML=`<div class="vacard knpv"><b>📅 ${i(knt('prev',{t:d.title}))}</b><small>${i(knDay(d.date))}${d.time?' · '+i(d.time):''}</small>
 <div class="vachips knrem">${[90,30,14,7,3,1].map(n=>`<button type="button" class="${(d.rem||[]).includes(n)?'on':''}" data-knr="${n}">${i(knt('dB',{n}))}</button>`).join('')}</div>
 ${c?`<p class="kncl">⚠ ${i(knt('clash',{t:c.e.title||'—',h:c.free||'—'}))}</p><div class="vabtns">${c.free?`<button type="button" class="vabtn p" data-kns="${c.free}">${i(knt('useFree',{h:c.free}))}</button>`:''}<button type="button" class="vabtn" data-kns="">${i(knt('anyway'))}</button></div>`:`<button type="button" class="vaadd" data-kns="">${i(knt('add'))}</button>`}</div>`}
Hooks.act('knadd',()=>{const inp=document.querySelector('[data-knq]');if(!inp||!inp.value.trim())return;const d=knParse(inp.value.trim());if(!d){T(knt('noDate'));return}d.rem=[1];knDraft=d;knPreview()});
document.addEventListener('keydown',e=>{if(m.route==='kal'&&e.key==='Enter'&&e.target.matches&&e.target.matches('[data-knq]')){e.preventDefault();L.knadd&&L.knadd({})}},!0);
document.addEventListener('click',e=>{try{if(m.route!=='kal'||!knDraft)return;const r=e.target.closest('[data-knr]');if(r){const n=+r.dataset.knr,R2=knDraft.rem||[];knDraft.rem=R2.includes(n)?R2.filter(x=>x!==n):R2.concat(n);knPreview();return}
 const s=e.target.closest('[data-kns]');if(s){if(s.dataset.kns)knDraft.time=s.dataset.kns;knEv().push({id:V(),title:knDraft.title,date:knDraft.date,type:'event',yearly:!1,time:knDraft.time||'',note:'',at:Date.now(),rem:knDraft.rem||[]});$();knDraft=null;T(knt('saved'));v()}}catch(er){Hooks.err('knclick',er)}},!0);
Hooks.act('knv',d=>{m.knV=d.k;v()});Hooks.act('knw',d=>{m.knW=(m.knW||0)+(+d.d);v()});Hooks.act('kny',d=>{m.knY=(m.knY||new Date().getFullYear())+(+d.d);m.knM=null;v()});Hooks.act('knm',d=>{m.knM=m.knM===d.k?null:d.k;v()});
Hooks.act('knbl',()=>{H(knt('bl'),`<div class="bsvys">${KN_BL.map(([k,n])=>`<button type="button" class="varow" data-blk="${k}"><span class="vatx"><b>${i(n)}</b></span><span class="vaam">${g.bl===k?'✓':''}</span></button>`).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-blk]');if(!b)return;g.bl=b.dataset.blk;$();el.remove();v()})})});
/* ---------- the bell ---------- */
const nzD=()=>{const o=g.nz=g.nz&&typeof g.nz==='object'?g.nz:{};['read','off','sn'].forEach(k=>{if(!o[k]||typeof o[k]!=='object')o[k]={}});return o};
const NZ_C=['fin','doc','ver','kal','post','kauf','ges','sys'];const nzSn=x=>{const u=nzD().sn[x.key];return u&&u>vaIso(0)?u:''};
function nzItems(){const out=[],today=vaIso(0),add=(key,c,p,ic,t,s,act)=>out.push({key,c,p,ic,t,s,act});
 try{stDlAll().forEach(t=>{const n=vaDays(t.k);if(n<-60||n>30)return;const kd=/kündig|kuendig|cancel|расторг|sonderkünd/i.test(t.t);const c=t.src==='vapr'?'ver':t.src==='task'?'kal':t.src==='kauf'?'kauf':t.src==='ges'?'ges':kd?'ver':'doc';
  const p=n<0?'hi':kd&&n<=14?'hi':n<=3?'mid':'lo';add('dl|'+t.k+'|'+t.t,c,p,n<0?'⚠':'⏰',t.t,n<0?knt('late'):n===0?knt('today'):knt('inD',{n}),t.act||'data-act="go" data-to="dsrok"')})}catch{}
 try{vaRises().forEach(r=>add('pr|'+r.key,'ver','hi','▲',vat('riseS')+': '+(r.e.co||''),vaEur(r.old)+' → '+vaEur(r.neu)+' · +'+vaPct(r.pct),`data-act="vapr" data-id="${r.e.id}"`))}catch{}
 try{const P=ubPays(7),by={};P.forEach(x=>(by[x.o.due]=by[x.o.due]||[]).push(x));Object.keys(by).sort().forEach(k=>{const L2=by[k],sum=L2.reduce((a,b)=>a+b.o.amt,0),n=vaDays(k);
  if(L2.length>1)add('pay|'+k,'fin',n<=3?'mid':'lo','💶',knt('payN',{d:n===0?knt('today'):vaDate(k),n:L2.length,a:vaEur(sum)}),L2.map(x=>x.d.title).join(', '),'data-act="go" data-to="kal"');
  else add('pay|'+k+'|'+L2[0].d.id,'fin',n<=3?'mid':'lo','💶',L2[0].d.title||'—',vaEur(L2[0].o.amt)+' · '+(n===0?knt('today'):knt('inD',{n})),`data-act="dzopen" data-id="${L2[0].d.id}"`)})}catch{}
 try{const E=egList();if(E.length)add('inb|'+E.length+'|'+(E[0].d.id),'doc',E.some(x=>x.s!=='ok')?'mid':'lo','📥',knt('inb',{n:E.length}),'','data-act="go" data-to="eing"')}catch{}
 try{kpVg().filter(x=>['vers','zug','wart'].includes(x.st)&&x.exp&&x.exp<today).forEach(x=>add('vg|'+x.id+'|'+x.exp,'post','mid','📂',knt('ans',{t:x.t}),x.whoN||'',`data-act="vgopen" data-id="${x.id}"`))}catch{}
 try{knEv().forEach(e=>{if(!e||!e.date||!Array.isArray(e.rem)||!e.rem.length||e.yearly)return;const n=vaDays(e.date);if(n<0||n>Math.max(...e.rem))return;add('ev|'+e.id+'|'+e.date,'kal',n<=1?'mid':'lo','📅',e.title||'—',(n===0?knt('today'):knt('inD',{n}))+(e.time?' · '+e.time:''),'data-act="go" data-to="kal"')})}catch{}
 try{const last=+(localStorage.getItem('bdocs:bd.lastbk')||0)||g.bkLast||0;if(last&&Date.now()-last>30*864e5)add('bk|'+Math.floor(last/864e5),'sys','mid','☁️',knt('bk'),'','data-act="pvbk"')}catch{}
 const P={hi:0,mid:1,lo:2},off=nzD().off||{};return out.filter(x=>!off[x.c]).sort((a,b)=>P[a.p]-P[b.p])}
function nzScreen(){const D=nzD(),f=m.nzF||'all',st=m.nzS||'neu',A0=nzItems(),A=A0.filter(x=>st==='sn'?!!nzSn(x):!nzSn(x)&&(st==='rd'?!!D.read[x.key]:!D.read[x.key])),L2=A.filter(x=>f==='all'||x.c===f),today=vaIso(0);
 let dl=0,pay=0,ev=0;try{dl=stDlAll().filter(t=>t.k===today).length}catch{}try{pay=ubPays(0).length}catch{}try{ev=knEv().filter(e=>e&&e.date===today).length}catch{}
 const cats=['all',...NZ_C.filter(c=>A.some(x=>x.c===c))];
 return`<div class="screen dhome fz va nzw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(knt('nz'))}</h2></div><span></span></div>
 <div class="vahero"><small>${i(knt('today'))}</small><b class="kpn">${i(new Date().toLocaleDateString(he(),{weekday:'long',day:'numeric',month:'long'}))}</b><small>${i(knt('day',{a:dl,b:pay,c:ev}))}</small></div>
 <div class="eitabs">${['neu','rd','sn'].map(k=>`<button type="button" class="${st===k?'on':''}" data-act="nzs" data-k="${k}">${i(knt('s_'+k))} ${A0.filter(x=>k==='sn'?!!nzSn(x):!nzSn(x)&&(k==='rd'?!!D.read[x.key]:!D.read[x.key])).length||''}</button>`).join('')}</div>
 <div class="vachips">${cats.map(c=>`<button type="button" class="${f===c?'on':''}" data-act="nzf" data-k="${c}">${i(knt('c_'+c))}</button>`).join('')}</div>
 ${L2.length?`<div class="vacard">${L2.map(x=>`<div class="varow nzr ${D.read[x.key]?'rd':''}"><button type="button" class="akdo" data-nzk="${i(x.key)}" ${x.act||''}><span class="vaic">${x.ic}</span><span class="vatx"><b>${i(x.t)}</b><small>${i(x.s)}</small></span></button><span class="nzp ${x.p}">${i(nzSn(x)?knt('snU',{d:vaDate(nzSn(x))}):knt('p_'+x.p))}</span><button type="button" class="akx nzsz" data-act="nzsn" data-k="${i(x.key)}" aria-label="${i(knt('snz'))}">${nzSn(x)?'↩':'⏱'}</button></div>`).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(knt('empty'))}</p></div>`}
 ${L2.length?`<button type="button" class="valnk" data-act="nzall">${i(knt('allRead'))}</button>`:''}
 <button type="button" class="vaabot" data-act="nzq"><span><b>🌙 ${i(knt('quiet'))}</b><small>${i(knt('quietS'))}</small></span><u class="${D.quiet?'on':''}"></u></button>
 <h3 class="vash">${i(knt('cats'))}</h3><div class="vacard nzcs"><p class="vanote">${i(knt('catsS'))}</p>${NZ_C.map(c=>`<button type="button" class="vaabot" data-act="nzc" data-k="${c}"><span><b>${i(knt('c_'+c))}</b></span><u class="${D.off[c]?'':'on'}"></u></button>`).join('')}<p class="vanote">${i(knt('pushN'))}</p></div>
 <button type="button" class="vaabot abent" data-act="go" data-to="kal"><span><b>📅 ${i(knt('openKal'))}</b></span><span class="akch">›</span></button></div>`}
document.addEventListener('click',e=>{try{if(m.route!=='nz')return;const b=e.target.closest('[data-nzk]');if(b){nzD().read[b.dataset.nzk]=1;$()}}catch{}},!0);
Hooks.act('nzf',d=>{m.nzF=d.k;v()});Hooks.act('nzs',d=>{m.nzS=d.k;m.nzF='all';v()});Hooks.act('nzc',d=>{const D=nzD();D.off[d.k]?delete D.off[d.k]:D.off[d.k]=1;$();v()});
Hooks.act('nzsn',d=>{const D=nzD();if(D.sn[d.k]&&D.sn[d.k]>vaIso(0)){delete D.sn[d.k];$();v();return}H(knt('snz'),`<div class="bsvys">${[1,3,7].map(n=>`<button type="button" class="varow" data-n="${n}"><span class="vatx"><b>${i(knt('sn'+n))}</b><small>${i(vaDate(vaIso(n)))}</small></span></button>`).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-n]');if(!b)return;D.sn[d.k]=vaIso(+b.dataset.n);$();el.remove();v()})})});Hooks.act('nzall',()=>{const D=nzD();nzItems().forEach(x=>D.read[x.key]=1);$();v()});Hooks.act('nzq',()=>{const D=nzD();D.quiet=D.quiet?0:1;$();v()});
const nzCount=()=>{try{const D=nzD();return nzItems().filter(x=>!D.read[x.key]&&!nzSn(x)&&(!D.quiet||x.p==='hi')).length}catch{return 0}};
['kal','nz'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='kal')return kalScreen();if(m.route==='nz')return nzScreen()}catch(e){Hooks.err('knscreen',e)}});
/* Start's bell → the one list, with its own count; Fristen and the core calendar get a way into Kalender */
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;if(m.route==='home'&&h.includes('data-to="reminders"')){return h.replace('data-to="reminders"','data-to="nz"')}
 if(m.route==='dsrok'||m.route==='mycal'){const e=h.lastIndexOf('</div>');return h.slice(0,e)+`<button type="button" class="vaabot abent" data-act="go" data-to="kal"><span><b>📅 ${i(knt('kal'))}: ${i(knt('v_list'))} · ${i(knt('v_week'))} · ${i(knt('v_year'))}</b></span><span class="akch">›</span></button>`+h.slice(e)}}catch(er){Hooks.err('knent',er)}return h});
Hooks.on('render',()=>{try{if(m.route!=='home')return;const b=document.querySelector('[data-to="nz"]');if(!b)return;const n=nzCount();let s=b.querySelector('.nzb');b.querySelectorAll(':scope>i,:scope>em,:scope>.badge,:scope>b').forEach(x=>{if(!x.classList.contains('nzb'))x.style.display='none'});
 if(!n){s&&s.remove();return}if(!s){s=document.createElement('span');s.className='nzb';b.appendChild(s)}s.textContent=n>9?'9+':String(n)}catch(e){Hooks.err('nzbadge',e)}});
try{SP_L.push(['kal','cal',knS.kal,['kalender','календар','calendar','termin','woche','feiertag','праздник','holiday']],['nz','cal',knS.nz,['mitteilung','уведомл','notification','glocke','benachricht']])}catch{}
Hooks.css('docs-kalender-nz',`.nzsz{flex:none;margin-left:4px}.nzcs .vaabot{margin:6px 0}
.knq{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;margin:0 0 10px}.knpv{padding:12px 16px}.knpv b{display:block}.knpv small{color:var(--muted)}.knrem{flex-wrap:wrap;margin:8px 0}.kncl{color:#b9770e;font-size:14px;margin:6px 0}
.knnav{margin:0 0 10px;color:var(--ink)}.knnav button{background:var(--bd-glass,var(--surface));color:var(--ink);border:1px solid var(--bd-edge,var(--line))}
.knday{padding:6px 16px}.knday.now{border:1.5px solid var(--bd-acc,var(--green))}.kndh{font-size:13px;font-weight:700;color:var(--muted);text-transform:capitalize;padding:6px 0 2px}.kn0{color:var(--muted);margin:2px 0 8px}
.kngrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 12px}.knm{border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink);border-radius:16px;padding:10px 6px;text-align:center}
.knm b{display:block;font-size:13px;text-transform:capitalize}.knm span{display:block;font-size:22px;font-weight:700}.knm small{color:var(--muted);font-size:11px}.knhol b{color:#b9770e}
.nzr{gap:6px}.nzr.rd{opacity:.55}.nzp{font-size:11px;font-weight:700;border-radius:8px;padding:2px 7px;white-space:nowrap}.nzp.hi{background:#fadbd8;color:#c0392b}.nzp.mid{background:#fdebd0;color:#b9770e}.nzp.lo{background:var(--line);color:var(--muted)}
[data-to="nz"]{position:relative}.nzb{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:#e74c3c;color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;padding:0 5px}
`);
