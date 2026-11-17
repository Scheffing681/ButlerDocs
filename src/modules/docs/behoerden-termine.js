/* ===== Butler Docs: Behörden & Services (stage 2) — Termine, deadlines, yearly duties, links to the rest of the app =====
   - Frist → Termin: a document that runs out soon (passport, residence title …) shows which office renews it and a Termin button.
   - «Termin eingetragen»: date, time, for whom, what for, a «Mitbringen» checklist and documents from the app.
     It goes into the calendar (an event) and the day before into tasks (a reminder). Termin-Mappe = one Termin with all of it.
   - Yearly duties (Steuererklärung, Kfz-Versicherung, TÜV …): next date, «erledigt» moves it on by 1 or 2 years.
   - Everywhere else: «Сроки», the home screen, search, Butler AI («Steuernummer?», «Finanzamt Telefon»), Nachlass. Backups carry g.bsv.
   Data: g.bsv.terms [{id,it,date,time,who[],what,bring[{t,ok}],docs[],note,doc,ev,tk,done}], g.bsv.yr [{id,t,next,iv,it,ev}], g.bsv.fx {dismissed deadline banners}. */
const bsvS2={
 tms:['Ближайшие термины','Nächste Termine','Upcoming appointments'],tmy:['Мои термины','Meine Termine','My appointments'],
 tNew:['Термин записан — внести','Termin eintragen','Add appointment'],tEdit:['Термин','Termin','Appointment'],
 date:['Дата','Datum','Date'],time:['Время','Uhrzeit','Time'],what:['Зачем','Worum geht es','What for'],whatPh:['Напр. продление ВНЖ','z. B. Verlängerung Aufenthaltstitel','e.g. renewing the residence permit'],
 bring:['Взять с собой','Mitbringen','Bring along'],bringAdd:['＋ пункт','＋ Punkt','＋ item'],bringPh:['Что ещё взять','Was noch mitnehmen','What else to bring'],
 docs:['Документы из приложения','Dokumente aus der App','Documents from the app'],docsPick:['Выбрать документы','Dokumente wählen','Choose documents'],noDocs:['Документов пока нет','Noch keine Dokumente','No documents yet'],
 needD:['Укажите дату','Bitte ein Datum angeben','Please enter a date'],tSaved:['Термин в календаре, напоминание — накануне','Termin im Kalender, Erinnerung am Vortag','Appointment in the calendar, reminder the day before'],
 remT:['Завтра термин: %n — подготовить документы','Morgen Termin: %n – Unterlagen bereitlegen','Tomorrow: %n – get the papers ready'],
 done:['Состоялся','Erledigt','Done'],undone:['Вернуть','Zurückholen','Restore'],ready:['Готово к термину: %a из %b','Bereit: %a von %b','Ready: %a of %b'],
 inN:['через %n дн.','in %n Tagen','in %n days'],today:['сегодня','heute','today'],tom:['завтра','morgen','tomorrow'],past:['прошло','vorbei','past'],
 fxT:['%d — истекает %w','%d – läuft ab %w','%d – runs out %w'],fxS:['Продлевает: %o. Записывайтесь заранее — сроки ожидания бывают недели.','Zuständig: %o. Früh buchen – Wartezeiten dauern oft Wochen.','Renewed by: %o. Book early – waits can take weeks.'],
 fxBook:['Записаться','Termin buchen','Book'],fxOpen:['Открыть','Öffnen','Open'],fxAdd:['Добавить «%o»','„%o“ hinzufügen','Add “%o”'],fxHave:['Термин уже есть','Termin habe ich','I have one'],fxNo:['Скрыть','Ausblenden','Hide'],
 yr:['Каждый год','Jährlich','Every year'],yrAdd:['＋ ежегодная обязанность','＋ jährliche Pflicht','＋ yearly duty'],yrQ:['Ежегодная обязанность','Jährliche Pflicht','Yearly duty'],
 yrOwn:['Своя','Eigene','Own'],yrT:['Что сделать','Was ist zu tun','What to do'],yrNext:['Следующий срок','Nächste Frist','Next date'],yrIv:['Повтор','Wiederholung','Repeat'],iv1:['каждый год','jedes Jahr','every year'],iv2:['раз в 2 года','alle 2 Jahre','every 2 years'],
 yrFor:['Ведомство','Behörde','Office'],none:['—','—','—'],yrDone:['Сделано — следующий срок %d','Erledigt – nächste Frist %d','Done – next date %d'],
 yrChk:['Сроки взяты из общих правил — проверьте их для себя.','Fristen nach allgemeinen Regeln – bitte für sich prüfen.','Dates follow general rules – please check them for you.'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],
 home:['Ведомства','Behörden','Offices'],nach:['Ведомства и службы','Behörden & Dienste','Offices & services'],nachS:['Куда сообщить: пенсионная, больничная касса, Finanzamt…','Wen benachrichtigen: Rente, Krankenkasse, Finanzamt …','Whom to notify: pension, health insurer, tax office …'],
 sGrp:['Ведомства и службы','Behörden & Services','Offices & services'],
 aSec:['%t лежит в сейфе — откройте карточку «%n» и нажмите «Показать».','%t liegt im Tresor – Karte „%n“ öffnen und „Zeigen“ tippen.','%t is in the vault – open “%n” and tap “Show”.'],
 aNum:['%t (%n): %v','%t (%n): %v','%t (%n): %v'],aTel:['%n: телефон %v','%n: Telefon %v','%n: phone %v'],aNext:['Ближайший термин: %n, %d','Nächster Termin: %n, %d','Next appointment: %n, %d'],aNoT:['Терминов нет','Keine Termine','No appointments']};
const bsvt2=(k,o)=>{let s=cv5n(bsvS2[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const bsvTs=()=>{const o=bsvD();if(!Array.isArray(o.terms))o.terms=[];return o.terms};
const bsvYs=()=>{const o=bsvD();if(!Array.isArray(o.yr))o.yr=[];return o.yr};
const bsvDays=k=>{try{const a=new Date();a.setHours(0,0,0,0);return Math.round((new Date(k+'T00:00:00')-a)/864e5)}catch{return 0}};
const bsvWhen=k=>{const n=bsvDays(k);return n<0?bsvt2('past'):n===0?bsvt2('today'):n===1?bsvt2('tom'):bsvt2('inN',{n})};
const bsvDt=(k,tm)=>{try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{weekday:'short',day:'numeric',month:'long'})+(tm?' · '+tm:'')}catch{return k}};
const bsvAddY=(k,n)=>{const[y,mo,d]=k.split('-').map(Number);const t=new Date(y+n,mo-1,d);if(t.getMonth()!==mo-1)t.setDate(0);return x(t)};

/* --- which office renews which document --- */
const BSV_FX=[[/aufenthalt|niederlassung|\beat\b|вид на жительство|внж|residence|blue card|blaue karte/i,'ausl',90],
 [/reisepass|personalausweis|ausweis|\bpass\b|паспорт|passport|id.?card|удостоверени/i,'buerger',56],
 [/führerschein|права|driving licen/i,'buerger',56],[/gesundheitskarte|versichertenkarte|\begk\b|медицинск.*карт/i,'kk',30]];
function bsvFxList(){let L2=[];try{L2=typeof IZ==='function'?IZ():[]}catch{}const o=bsvD(),fx=o.fx||{},T2=bsvTs();
 return L2.map(d=>{const s=[d.t,d.dt].filter(Boolean).join(' ');const r=BSV_FX.find(([rx])=>rx.test(s)||(d.dt&&rx.test(d.dt)));if(!r)return null;const n=bsvDays(d.k);
  if(n>r[2]||n<-60||fx[d.id+':'+d.k]||T2.some(t=>t.doc===d.id&&!t.done))return null;return{id:d.id,k:d.k,t:d.t,src:r[1],n}}).filter(Boolean).sort((a,b)=>a.n-b.n)}
const bsvOfName=k=>{const it=bsvD().items.find(x=>x.src===k);if(it)return it.n;const c=BSV_C.find(z=>z[1]===k);const loc=bsvLocal()&&BSV_AB[k];return loc&&loc.n||c&&c[2].n||k};
function bsvFxCard(f){const it=bsvD().items.find(x=>x.src===f.src),on=bsvOfName(f.src),tl=it&&it.term&&bsvUrl(it.term);
 return`<div class="dhcard bsvfx${f.n<0?' r':''}"><b>⏰ ${i(bsvt2('fxT',{d:f.t,w:f.n<0?bsvt2('past'):bsvWhen(f.k)+' · '+vA(f.k)}))}</b><small>${i(bsvt2('fxS',{o:on}))}</small>
 <div class="bsvfxb">${it?(tl?`<a class="on" href="${i(tl)}" target="_blank" rel="noopener">${i(bsvt2('fxBook'))}</a>`:'')+`<button type="button" ${tl?'':'class="on"'} data-act="bsvopen" data-id="${i(it.id)}">${i(bsvt2('fxOpen'))}</button>`
  :`<button type="button" class="on" data-act="bsvfxadd" data-k="${i(f.src)}">${i(bsvt2('fxAdd',{o:on}))}</button>`}
  <button type="button" data-act="bsvfxhave" data-k="${i(f.src)}" data-doc="${i(f.id)}">${i(bsvt2('fxHave'))}</button><button type="button" class="x" data-act="bsvfxno" data-id="${i(f.id)}" data-d="${i(f.k)}" aria-label="${i(bsvt2('fxNo'))}">×</button></div></div>`}

/* --- Termine --- */
const BSV_BRING={ausl:['Reisepass','Aktueller Aufenthaltstitel','Biometrisches Passfoto','Meldebescheinigung / Mietvertrag','Arbeitsvertrag + 3 Gehaltsabrechnungen','Nachweis Krankenversicherung','Terminbestätigung'],
 buerger:['Personalausweis oder Reisepass','Biometrisches Passfoto','Wohnungsgeberbestätigung (bei Ummeldung)','Terminbestätigung','EC-Karte oder Bargeld'],
 fa:['Steuer-ID und Steuernummer','Schreiben vom Finanzamt','Belege'],jc:['Personalausweis','Einladung / Schreiben','Kontoauszüge der letzten 3 Monate','Mietvertrag'],
 aa:['Personalausweis','Einladung / Schreiben','Lebenslauf','Zeugnisse'],kfz:['Personalausweis','Zulassungsbescheinigung Teil I und II','eVB-Nummer der Versicherung','IBAN für die Kfz-Steuer (SEPA)','Alte Kennzeichen'],
 arzt:['Gesundheitskarte','Überweisung','Medikamentenliste'],zahn:['Gesundheitskarte','Bonusheft'],kk:['Gesundheitskarte','Schreiben der Kasse']};
const bsvBringFor=it=>(BSV_BRING[it&&it.src]||['Personalausweis','Terminbestätigung','Schreiben / Unterlagen']).map(t=>({t,ok:!1}));
let bsvTd=null,bsvTSel=null,bsvTDel=0;
function bsvTNew(itId,o){const it=bsvGet(itId);bsvTd=Object.assign({id:'',it:itId,date:'',time:'',who:[],what:'',bring:bsvBringFor(it),docs:[],note:'',doc:''},o||{});R('bsvtf')}
function bsvTForm(){const d=bsvTd,it=bsvGet(d.it)||{},o=bsvD(),D=(()=>{try{return Ke().items.filter(z=>!z.type)}catch{return[]}})();
 const inp=(f,t,ph)=>`<input class="field" data-tf="${f}" type="${t||'text'}" value="${i(d[f]||'')}" placeholder="${i(ph||'')}" autocomplete="off">`;
 return`<div class="screen dhome bsv bsvtf">${bsvHdr(bsvt2('tEdit'),'bsvback')}
 <div class="bsvhd sm"><span class="bsvemo big">${i(it.e||'🏛️')}</span><h3>${i(it.n||'—')}</h3></div>
 <div class="bsv2c"><div><label class="bsvl">${i(bsvt2('date'))}</label>${inp('date','date')}</div><div><label class="bsvl">${i(bsvt2('time'))}</label>${inp('time','time')}</div></div>
 <label class="bsvl">${i(bsvt2('what'))}</label>${inp('what','text',bsvt2('whatPh'))}
 ${o.ppl.length>1?`<label class="bsvl">${i(bsvt('who'))}</label><div class="bsvchips">${o.ppl.map(p=>`<button type="button" class="${(d.who||[]).includes(p)?'on':''}" data-act="bsvtwho" data-p="${i(p)}">${i(p)}</button>`).join('')}</div>`:''}
 <label class="bsvl">${i(bsvt2('bring'))}</label><div class="dhcard bsvbr">${d.bring.map((b,j)=>`<div class="bsvbri"><label class="bsvtog"><input type="checkbox" data-tb="${j}" ${b.ok?'checked':''}><span>${i(b.t)}</span></label><button type="button" class="bsvsm x" data-act="bsvtbrm" data-j="${j}" aria-label="${i(bsvt2('del'))}">×</button></div>`).join('')}
  <div class="bsvrowin"><input class="field" data-tf="nb" placeholder="${i(bsvt2('bringPh'))}" value="${i(d.nb||'')}"><button type="button" class="bsvsm" data-act="bsvtbadd">＋</button></div></div>
 <label class="bsvl">${i(bsvt2('docs'))}</label><details class="vdet bsvdocs" ${d.docs.length?'':''}><summary>${i(bsvt2('docsPick'))}${d.docs.length?' · '+d.docs.length:''}</summary>
  ${D.length?`<div class="bsvdl">${D.map(z=>`<label class="bsvtog"><input type="checkbox" data-td="${i(z.id)}" ${d.docs.includes(z.id)?'checked':''}><span>${i(z.title||'—')}</span></label>`).join('')}</div>`:`<p class="vhint">${i(bsvt2('noDocs'))}</p>`}</details>
 <label class="bsvl">${i(bsvt('note'))}</label><textarea class="field" data-tf="note" rows="2">${i(d.note||'')}</textarea>
 <small class="verr" data-bsvterr></small>
 <button type="button" class="dcadd gold" data-act="bsvtsave">${i(bsvt2('save'))}</button><button type="button" class="bsvcan" data-act="bsvback">${i(bsvt('cancel'))}</button></div>`}
document.addEventListener('input',e=>{const t=e.target;if(!bsvTd||m.route!=='bsvtf'||!t.closest||!t.closest('.bsvtf'))return;const d=bsvTd;
 if(t.dataset.tf)d[t.dataset.tf]=t.value;else if(t.dataset.tb!=null){const b=d.bring[+t.dataset.tb];if(b)b.ok=t.checked}
 else if(t.dataset.td){const j=d.docs.indexOf(t.dataset.td);if(t.checked&&j<0)d.docs.push(t.dataset.td);if(!t.checked&&j>=0)d.docs.splice(j,1)}},!0);
document.addEventListener('change',e=>{const t=e.target;if(t&&t.type==='checkbox'&&bsvTd&&m.route==='bsvtf'&&t.closest&&t.closest('.bsvtf'))t.dispatchEvent(new Event('input',{bubbles:!0}))},!0);
/* the calendar event and the reminder task follow the Termin */
function bsvTSync(t){const it=bsvGet(t.it)||{},title='Termin: '+(it.n||'')+(t.what?' – '+t.what:''),note=[it.addr,t.bring.length?bsvt2('bring')+': '+t.bring.map(b=>b.t).join(', '):''].filter(Boolean).join('\n');
 g.events=g.events||[];let ev=t.ev&&g.events.find(z=>z.id===t.ev);if(t.done){if(ev)g.events=g.events.filter(z=>z!==ev);delete t.ev}
 else if(ev)Object.assign(ev,{title,date:t.date,time:t.time||'',note});else{ev=bsvEv({title,date:t.date,time:t.time,note});ev.bsvT=t.id;t.ev=ev.id}
 g.tasks=g.tasks||[];const dd=bsvAddDay(t.date,-1);let tk=t.tk&&g.tasks.find(z=>z.id===t.tk);
 if(t.done||bsvDays(dd)<0){if(tk&&!tk.done)g.tasks=g.tasks.filter(z=>z!==tk);if(!tk||!tk.done)delete t.tk}
 else if(tk)Object.assign(tk,{t:bsvt2('remT',{n:it.n||''}),due:dd});else{tk={id:V(),t:bsvt2('remT',{n:it.n||''}),due:dd,prio:2,proj:'',done:!1,bsvT:t.id};g.tasks.push(tk);t.tk=tk.id}bsvQuiet()}
/* the app's own «saved · open» bar would stay on every screen — these entries are made here on purpose */
const bsvQuiet=()=>{try{if(typeof bd8snap==='function')m.bd8ids=bd8snap()}catch{}try{typeof un1Take==='function'&&un1Take()}catch{}try{setTimeout(()=>document.querySelectorAll('.bd8sv').forEach(z=>z.remove()),0)}catch{}};
/* a calendar entry like fu() makes, but without saving yet (so the app does not take it for a new entry of the user) */
const bsvEv=o=>{const a={id:V(),title:String(o.title||'').trim(),date:o.date,type:'event',yearly:!!o.yearly,time:o.time||'',note:String(o.note||'').trim(),at:Date.now()};g.events.push(a);return a};
const bsvAddDay=(k,n)=>{const d=new Date(k+'T00:00:00');d.setDate(d.getDate()+n);return x(d)};
function bsvTSave(){const d=bsvTd;if(!d)return;const e=document.querySelector('[data-bsvterr]');if(!/^\d{4}-\d\d-\d\d$/.test(d.date||'')){if(e)e.textContent=bsvt2('needD');return}
 delete d.nb;d.what=String(d.what||'').trim();d.note=String(d.note||'').trim();const T2=bsvTs();let t=d.id&&T2.find(z=>z.id===d.id);
 if(t)Object.assign(t,d);else{t=Object.assign(d,{id:bsvId(),ts:Date.now()});T2.push(t)}bsvTSync(t);$();bsvTd=null;bsvTSel=t.id;bsvToast(bsvt2('tSaved'));bsvGo2('bsvtv')}
const bsvGo2=r=>{const h=m.hist||[];while(h.length&&['bsvtf',r].includes(h[h.length-1].route))h.pop();R(r,void 0,!0)};
function bsvTView(t){const it=bsvGet(t.it)||{},ok=t.bring.filter(b=>b.ok).length,D=(()=>{try{return Ke().items}catch{return[]}})();
 const docs=t.docs.map(id=>D.find(z=>z.id===id)).filter(Boolean);
 return`<div class="screen dhome bsv bsvtv">${bsvHdr(bsvt2('tEdit'),'bsvback',`<button type="button" class="iconbtn" data-act="bsvtedit" data-id="${i(t.id)}" aria-label="edit">${bsvi('edit')}</button>`)}
 <div class="bsvhd"><span class="bsvemo big">${i(it.e||'🏛️')}</span><h3>${i(it.n||'—')}</h3>${t.what?`<p>${i(t.what)}</p>`:''}<em class="bsvst ${t.done?'':'on'}">${i(bsvDt(t.date,t.time))} · ${i(t.done?bsvt2('done'):bsvWhen(t.date))}</em>${(t.who||[]).length?`<p>${i(t.who.join(', '))}</p>`:''}</div>
 <div class="bsvacts">${it.addr?`<a class="bsvact" href="${i(bsvMap(it.addr))}" target="_blank" rel="noopener">${bsvi('map')}<span>${i(bsvt('route'))}</span></a>`:''}${it.tel?`<a class="bsvact" href="${i(bsvTel(it.tel))}">${bsvi('tel')}<span>${i(bsvt('call'))}</span></a>`:''}<button type="button" class="bsvact" data-act="bsvopen" data-id="${i(it.id||'')}">${bsvi('link')}<span>${i(bsvt2('fxOpen'))}</span></button></div>
 <h3 class="odh">${i(bsvt2('bring'))} <small class="bsvrd">${i(bsvt2('ready',{a:ok,b:t.bring.length}))}</small></h3>
 <div class="dhcard bsvbr">${t.bring.map((b,j)=>`<label class="bsvtog"><input type="checkbox" data-tvb="${j}" data-id="${i(t.id)}" ${b.ok?'checked':''}><span>${i(b.t)}</span></label>`).join('')||'<p class="dhnone">—</p>'}</div>
 ${docs.length?`<h3 class="odh">${i(bsvt2('docs'))}</h3><div class="dhcard odl">${docs.map(z=>`<button type="button" class="odr" data-act="dzopen" data-id="${i(z.id)}">${dhi('fld')}<span><b>${i(z.title||'—')}</b></span>${dhi('chev','sm')}</button>`).join('')}</div>`:''}
 ${t.note?`<div class="dhcard"><small class="vlab">${i(bsvt('note'))}</small><p class="vnote">${i(t.note)}</p></div>`:''}
 <button type="button" class="dcadd ${t.done?'':'gold'}" data-act="bsvtdone" data-id="${i(t.id)}">${i(t.done?bsvt2('undone'):'✓ '+bsvt2('done'))}</button>
 <button type="button" class="bsvdel${bsvTDel?' on':''}" data-act="bsvtdel" data-id="${i(t.id)}">${i(bsvTDel?bsvt2('delQ'):bsvt2('del'))}</button></div>`}
document.addEventListener('change',e=>{const t=e.target;if(!t||t.dataset.tvb==null||m.route!=='bsvtv')return;const T0=bsvTs().find(z=>z.id===t.dataset.id);if(!T0)return;const b=T0.bring[+t.dataset.tvb];if(b){b.ok=t.checked;$();const s=document.querySelector('.bsvrd');if(s)s.textContent=bsvt2('ready',{a:T0.bring.filter(z=>z.ok).length,b:T0.bring.length})}},!0);
const bsvTRow=t=>{const it=bsvGet(t.it)||{};return`<button type="button" class="odr bsvtr" data-act="bsvtopen" data-id="${i(t.id)}"><span class="bsvemo">${i(it.e||'🏛️')}</span><span><b>${i(it.n||'—')}${t.what?' · '+i(t.what):''}</b><small>${i(bsvDt(t.date,t.time))} · ${i(bsvWhen(t.date))}</small></span>${dhi('chev','sm')}</button>`};
const bsvUp=()=>bsvTs().filter(t=>!t.done&&bsvDays(t.date)>=0).sort((a,b)=>(a.date+(a.time||'')).localeCompare(b.date+(b.time||'')));

/* --- yearly duties --- */
const BSV_YT=[['st',{t:'Steuererklärung abgeben',md:'07-31',iv:1,src:'fa'}],['kfzv',{t:'Kfz-Versicherung: Wechsel bis 30.11.',md:'11-30',iv:1}],['hu',{t:'Hauptuntersuchung (TÜV)',iv:2,src:'kfz'}],
 ['wba',{t:'Weiterbewilligungsantrag Bürgergeld',iv:1,src:'jc'}],['ausw',{t:'Ausweise der Familie prüfen',md:'01-15',iv:1,src:'buerger'}]];
const bsvNextMd=md=>{const y=new Date().getFullYear();let k=y+'-'+md;if(bsvDays(k)<0)k=(y+1)+'-'+md;return k};
let bsvYEd=null;
function bsvYSheet(id,itId){const Y=id&&bsvYs().find(z=>z.id===id);bsvYEd=Y?JSON.parse(JSON.stringify(Y)):{id:'',t:'',next:'',iv:1,it:itId||''};const o=bsvD();
 const tpl=Y?'':`<div class="bsvchips">${BSV_YT.map(([k,d])=>`<button type="button" data-yt="${k}">${i(d.t)}</button>`).join('')}</div>`;
 const body=()=>`${tpl}<label class="bsvl">${i(bsvt2('yrT'))}</label><input class="field" data-yf="t" value="${i(bsvYEd.t)}">
  <div class="bsv2c"><div><label class="bsvl">${i(bsvt2('yrNext'))}</label><input class="field" type="date" data-yf="next" value="${i(bsvYEd.next)}"></div><div><label class="bsvl">${i(bsvt2('yrIv'))}</label><select class="field" data-yf="iv"><option value="1" ${bsvYEd.iv==1?'selected':''}>${i(bsvt2('iv1'))}</option><option value="2" ${bsvYEd.iv==2?'selected':''}>${i(bsvt2('iv2'))}</option></select></div></div>
  <label class="bsvl">${i(bsvt2('yrFor'))}</label><select class="field" data-yf="it"><option value="">${i(bsvt2('none'))}</option>${o.items.map(z=>`<option value="${i(z.id)}" ${bsvYEd.it===z.id?'selected':''}>${i(z.e+' '+z.n)}</option>`).join('')}</select>
  <p class="vhint">${i(bsvt2('yrChk'))}</p><small class="verr" data-yerr></small><button type="button" class="dcadd gold" data-ysave>${i(bsvt2('save'))}</button>${Y?`<button type="button" class="bsvdel" data-ydel>${i(bsvt2('del'))}</button>`:''}`;
 H(bsvt2('yrQ'),`<div class="bsvys">${body()}</div>`,el=>{el.classList.add('bsvsh');let arm=0;
  el.addEventListener('input',e=>{const t=e.target;if(t.dataset.yf)bsvYEd[t.dataset.yf]=t.dataset.yf==='iv'?+t.value:t.value});el.addEventListener('change',e=>{const t=e.target;if(t.dataset.yf)bsvYEd[t.dataset.yf]=t.dataset.yf==='iv'?+t.value:t.value});
  el.addEventListener('click',e=>{const t=e.target,yt=t.closest('[data-yt]');
   if(yt){const d=BSV_YT.find(z=>z[0]===yt.dataset.yt)[1];const it=!bsvYEd.it&&d.src&&o.items.find(z=>z.src===d.src);Object.assign(bsvYEd,{t:d.t,iv:d.iv,next:d.md?bsvNextMd(d.md):bsvYEd.next,it:it?it.id:bsvYEd.it});el.querySelector('.bsvys').innerHTML=body();return}
   if(t.closest('[data-ysave]')){const y=bsvYEd;y.t=String(y.t||'').trim();if(!y.t||!/^\d{4}-\d\d-\d\d$/.test(y.next||'')){el.querySelector('[data-yerr]').textContent=bsvt2('needD');return}
    const Y2=bsvYs();let z=y.id&&Y2.find(q=>q.id===y.id);if(z)Object.assign(z,y);else{z=Object.assign(y,{id:bsvId()});Y2.push(z)}bsvYSync(z);$();el.remove();bsvToast(bsvt('saved')+' ✓');v();return}
   if(t.closest('[data-ydel]')){if(!arm){arm=1;t.closest('[data-ydel]').textContent=bsvt2('delQ');t.closest('[data-ydel]').classList.add('on');return}const z=bsvYs().find(q=>q.id===bsvYEd.id);if(z){z.done=1;bsvYSync(z)}bsvD().yr=bsvYs().filter(q=>q.id!==bsvYEd.id);$();el.remove();v()}})})}
function bsvYSync(y){g.events=g.events||[];let ev=y.ev&&g.events.find(z=>z.id===y.ev);if(y.done){if(ev)g.events=g.events.filter(z=>z!==ev);return}
 if(ev)Object.assign(ev,{title:y.t,date:y.next,yearly:y.iv==1});else{ev=bsvEv({title:y.t,date:y.next,yearly:y.iv==1});ev.bsvY=y.id;y.ev=ev.id}bsvQuiet()}
const bsvYRow=y=>{const n=bsvDays(y.next),c=n<0?'r':n<=30?'y':'g';return`<div class="odr ${c} bsvyr"><i></i><button type="button" class="bsvhit" data-act="bsvyed" data-id="${i(y.id)}"><span><b>${i(y.t)}</b><small>${i(vA(y.next))} · ${i(bsvWhen(y.next))}${y.iv==2?' · '+i(bsvt2('iv2')):''}</small></span></button>${n<=60?`<button type="button" class="bsvsm" data-act="bsvydone" data-id="${i(y.id)}">✓</button>`:''}</div>`};

/* --- the list and the card get the new parts --- */
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;
 if(m.route==='bsv'&&!bsvOrd){const F=bsvFxList(),U2=bsvUp().slice(0,4),Y=bsvYs().slice().sort((a,b)=>a.next.localeCompare(b.next));
  const top=F.map(bsvFxCard).join('')+(U2.length?`<h3 class="odh">${i(bsvt2('tms'))}</h3><div class="dhcard odl">${U2.map(bsvTRow).join('')}</div>`:'');
  /* v16: yearly duties show only when there are some (added from a card: «＋ ещё → Ежегодно») */
  const yr=Y.length?`<h3 class="odh">${i(bsvt2('yr'))}</h3><div class="dhcard odl">${Y.map(bsvYRow).join('')}</div>`:'';
  h=h.replace('<span class="bsvmy"></span>',top).replace('<button type="button" class="bsvaddb" data-act="bsvcat"',yr+'<button type="button" class="bsvaddb" data-act="bsvcat"')}
 if(m.route==='bsvi'){const it=bsvGet(bsvSel);if(!it)return h;const T2=bsvTs().filter(t=>t.it===it.id).sort((a,b)=>b.date.localeCompare(a.date)),Y=bsvYs().filter(y=>y.it===it.id);
  const blk=(T2.length?`<h3 class="odh">${i(bsvt2('tmy'))}</h3><div class="dhcard odl">${T2.map(bsvTRow).join('')}</div>`:'')+(Y.length?`<h3 class="odh">${i(bsvt2('yr'))}</h3><div class="dhcard odl">${Y.map(bsvYRow).join('')}</div>`:'');
  h=h.replace('<button type="button" class="bsvdel',blk+'<button type="button" class="bsvdel')}
 if(m.route==='home'&&!g.dhOff){const F=bsvFxList(),U2=bsvUp().filter(t=>bsvDays(t.date)<=14).slice(0,2);if(F.length||U2.length){
  const rows=F.slice(0,2).map(f=>`<button type="button" class="odr ${f.n<0?'r':'y'}" data-act="go" data-to="bsv"><i></i><span><b>${i(f.t)}</b><small>${i(bsvOfName(f.src))} · ${i(f.n<0?bsvt2('past'):bsvWhen(f.k))}</small></span>${dhi('chev','sm')}</button>`).join('')+U2.map(bsvTRow).join('');
  const card=`<div class="dhcard bsvhome bsvhm2"><b class="dhqh">${i(bsvt2('home'))}</b><div class="odl">${rows}</div></div>`;
  h=h.includes('class="dhcard bsvhome"')?h.replace('<div class="dhcard bsvhome">',card+'<div class="dhcard bsvhome">'):h.replace('<button type="button" class="dhcard dhai"',card+'<button type="button" class="dhcard dhai"')}}
 if(m.route==='dnach')h=h.replace('<button type="button" class="dnr" data-act="b3pack"',`<button type="button" class="dnr" data-act="go" data-to="bsv">${dhi('gov')}<span><b>${i(bsvt2('nach'))}</b><small>${i(bsvt2('nachS'))}</small></span>${dhi('chev','sm')}</button><button type="button" class="dnr" data-act="b3pack"`);
 return h}catch(e){Hooks.err('bsv2screen',e);return h}});
['bsvtf','bsvtv'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bsvtf'){if(!bsvTd)return setTimeout(()=>R('bsv'),0),'<div class="screen"></div>';return bsvTForm()}
 if(m.route==='bsvtv'){const t=bsvTs().find(z=>z.id===bsvTSel);if(t)return bsvTView(t);setTimeout(()=>R('bsv'),0);return'<div class="screen"></div>'}}catch(e){Hooks.err('bsvtscreen',e)}});
Hooks.on('render',()=>{if(m.route!=='bsvtf')bsvTd=null;if(m.route!=='bsvtv')bsvTDel=0});
/* the «back» of the forms */
Hooks.act('bsvback',()=>{bsvDel=0;if(m.route==='bsvtf'){const d=bsvTd;bsvTd=null;if(d&&d.id){bsvTSel=d.id;return bsvGo2('bsvtv')}if(d&&d.it&&bsvGet(d.it)){bsvSel=d.it;return bsvGo2('bsvi')}return bsvGo2('bsv')}
 if(m.route==='bsvtv'){const t=bsvTs().find(z=>z.id===bsvTSel);if(t&&bsvGet(t.it)){bsvSel=t.it;return R('bsvi')}return R('bsv')}
 if(m.route==='bsve'){const id=bsvEd&&bsvEd.id;bsvEd=null;if(id&&bsvGet(id)){bsvSel=id;return bsvGo('bsvi')}return bsvGo('bsv')}if(m.route==='bsvi')return bsvGo('bsv');bsvOrd=0;R('home',void 0,!0)},{replace:!0});

/* --- deadlines («Сроки») get Termine and yearly duties, without secret data --- */
function bsvDl(){try{return[...bsvUp().map(t=>{const it=bsvGet(t.it)||{};return{k:t.date,t:'Termin: '+(it.n||''),w:t.what||'',act:`data-act="bsvtopen" data-id="${t.id}"`}}),
 ...bsvYs().map(y=>({k:y.next,t:y.t,w:bsvt2('yr'),act:`data-act="bsvyed" data-id="${y.id}"`}))]}catch{return[]}}

/* --- search: offices, own numbers (never the secret ones), Termine --- */
try{for(const l in TD9T){const j={ru:0,de:1}[l];TD9T[l].sBsv=bsvS2.sGrp[j!=null?j:2]}}catch{}
Hooks.on('search',(G,q)=>{try{const e=String(q||'').toLowerCase().trim();if(e.length<2||!g.bsv)return G;const has=(...a)=>a.filter(Boolean).join(' ').toLowerCase().includes(e),rows=[];
 bsvD().items.forEach(it=>{const nm=(it.nums||[]).filter(n=>!n.s&&has(n.t,n.v));if(has(it.n,it.addr,it.tel,it.mail,it.note,bsvGL(it.grp))||nm.length)rows.push({ic:'note',t:(it.e||'')+' '+it.n,s:nm.length?nm.map(n=>n.t+': '+n.v).join(' · '):[it.tel,it.addr].filter(Boolean).join(' · '),act:`data-act="bsvopen" data-id="${it.id}"`})});
 bsvTs().forEach(t=>{const it=bsvGet(t.it)||{};if(has(it.n,t.what,t.note,'termin'))rows.push({ic:'cal',t:'Termin: '+(it.n||''),s:bsvDt(t.date,t.time),act:`data-act="bsvtopen" data-id="${t.id}"`})});
 if(rows.length)(G=G||[]).push({k:'sBsv',rows:rows.slice(0,8)});return G}catch(er){Hooks.err('bsvsearch',er);return G}});

/* --- Butler AI: «Steuernummer?», «телефон Finanzamt», «мой термин» --- */
const bsvWords=s=>String(s||'').toLowerCase().split(/[^a-zа-яёäöüß0-9-]+/).filter(w=>w.length>=4);
Hooks.on('ask',(r,t,lt)=>{try{if(r||!g.bsv)return r;const q=String(lt||t||'').toLowerCase();if(!q)return r;const o=bsvD();
 if(/термин|termin|appointment|запис/.test(q)&&!o.items.some(it=>bsvWords(it.n).some(w=>q.includes(w)))){const u=bsvUp()[0];if(!u)return/следующ|ближайш|nächst|next|мой|meine|my/.test(q)?{msg:bsvt2('aNoT')}:r;const it=bsvGet(u.it)||{};return{msg:bsvt2('aNext',{n:it.n||'',d:bsvDt(u.date,u.time)}),run:()=>{bsvTSel=u.id;R('bsvtv')}}}
 const qw=bsvWords(q);if(!qw.length)return r;
 for(const it of o.items)for(const n of it.nums||[]){const lw=bsvWords(n.t);if(lw.length&&lw.some(w=>qw.some(z=>z===w||(z.length>5&&w.startsWith(z.slice(0,-1)))))){
  if(n.s)return{msg:bsvt2('aSec',{t:n.t,n:it.n}),run:()=>{bsvSel=it.id;R('bsvi')}};return{msg:bsvt2('aNum',{t:n.t,n:it.n,v:n.v}),run:()=>{bsvSel=it.id;R('bsvi')}}}}
 const it=o.items.find(z=>bsvWords(z.n).some(w=>qw.includes(w)));if(!it)return r;const st=it.hrs?bsvNow(it.hrs):null;
 const parts=[it.tel?bsvt2('aTel',{n:it.n,v:it.tel}):it.n,st&&st.txt,it.addr].filter(Boolean);return{msg:parts.join(' · '),run:()=>{bsvSel=it.id;R('bsvi')}}}catch(e){Hooks.err('bsvask',e);return r}});

/* --- actions --- */
Hooks.act('bsvtnew',d=>bsvTNew(d.id));
Hooks.act('bsvtopen',d=>{bsvTSel=d.id;bsvTDel=0;R('bsvtv')});
Hooks.act('bsvtedit',d=>{const t=bsvTs().find(z=>z.id===d.id);if(!t)return;bsvTd=JSON.parse(JSON.stringify(t));R('bsvtf')});
Hooks.act('bsvtsave',()=>{try{bsvTSave()}catch(e){Hooks.err('bsvtsave',e)}});
Hooks.act('bsvtwho',d=>{if(!bsvTd)return;const w=bsvTd.who=bsvTd.who||[],j=w.indexOf(d.p);j<0?w.push(d.p):w.splice(j,1);document.querySelectorAll('[data-act=bsvtwho]').forEach(b=>b.classList.toggle('on',w.includes(b.dataset.p)))});
Hooks.act('bsvtbadd',()=>{if(!bsvTd)return;const s=String(bsvTd.nb||'').trim();if(!s)return;bsvTd.bring.push({t:s,ok:!1});bsvTd.nb='';bsvRe()});
Hooks.act('bsvtbrm',d=>{if(!bsvTd)return;bsvTd.bring.splice(+d.j,1);bsvRe()});
Hooks.act('bsvtdone',d=>{const t=bsvTs().find(z=>z.id===d.id);if(!t)return;t.done=t.done?0:1;bsvTSync(t);$();v()});
Hooks.act('bsvtdel',d=>{if(!bsvTDel){bsvTDel=1;v();setTimeout(()=>{if(bsvTDel){bsvTDel=0;if(m.route==='bsvtv')v()}},4e3);return}bsvTDel=0;const t=bsvTs().find(z=>z.id===d.id);if(!t)return;t.done=1;bsvTSync(t);
 const tk=t.tk&&(g.tasks||[]).find(z=>z.id===t.tk);if(tk)g.tasks=g.tasks.filter(z=>z!==tk);bsvD().terms=bsvTs().filter(z=>z.id!==d.id);$();bsvToast(bsvt('deleted'));const it=bsvGet(t.it);if(it){bsvSel=it.id;bsvGo2('bsvi')}else bsvGo2('bsv')});
Hooks.act('bsvfxadd',d=>{bsvAddSrc(d.k,!0)});
Hooks.act('bsvfxhave',d=>{let it=bsvD().items.find(z=>z.src===d.k);if(!it)it=bsvAddSrc(d.k,!1);if(!it)return;let doc=null;try{doc=Ke().items.find(z=>z.id===d.doc)}catch{}bsvTNew(it.id,{doc:d.doc,what:doc?doc.title:''})});
Hooks.act('bsvfxno',d=>{const o=bsvD();o.fx=o.fx||{};o.fx[d.id+':'+d.d]=1;$();v()});
Hooks.act('bsvyadd',d=>bsvYSheet('',d&&d.id));Hooks.act('bsvyed',d=>bsvYSheet(d.id));
Hooks.act('bsvydone',d=>{const y=bsvYs().find(z=>z.id===d.id);if(!y)return;y.next=bsvAddY(y.next,y.iv==2?2:1);while(bsvDays(y.next)<0)y.next=bsvAddY(y.next,y.iv==2?2:1);y.last=x(new Date());bsvYSync(y);$();bsvToast(bsvt2('yrDone',{d:vA(y.next)}));v()});

Hooks.css('docs-behoerden-2',`
.odr span.bsvemo{flex:0 0 30px!important;display:block!important}
.bsvfx{display:flex;flex-direction:column;gap:4px;background:#fff8e6!important;border-color:#f0dca8!important;margin-bottom:8px}.bsvfx.r{background:#fdecea!important;border-color:#f5c6c0!important}
.bsvfx b{font-weight:700;line-height:1.3}.bsvfx small{color:var(--muted);font-size:13px;line-height:1.35}
.bsvfxb{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}.bsvfxb a,.bsvfxb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600;text-decoration:none;color:var(--ink)!important}
.bsvfxb .on{background:var(--green);border-color:var(--green);color:#fff!important}.bsvfxb .x{margin-left:auto;padding:6px 12px;color:var(--muted)!important}
.bsvtadd{margin-top:10px}.bsvtadd>.dhi{color:var(--green)}
.bsvhd.sm .bsvemo.big{font-size:34px}.bsvhd.sm h3{font-size:19px}
.bsv2c{display:grid;grid-template-columns:1fr 1fr;gap:10px}.bsv2c .field{width:100%;box-sizing:border-box}
.bsvtf .bsvl,.bsvys .bsvl{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 2px 6px}.bsvtf .field,.bsvys .field{width:100%;box-sizing:border-box}
.bsvbr{display:flex;flex-direction:column;padding-top:4px!important;padding-bottom:6px!important}.bsvbri{display:flex;align-items:center;gap:6px}.bsvbri .bsvtog{flex:1}.bsvbr .bsvtog+.bsvtog{border-top:1px solid var(--line)}
.bsvdl{max-height:40vh;overflow:auto;margin-top:6px}.bsvrd{font-weight:500;color:var(--muted);font-size:13px;margin-left:6px}
.bsvtv .bsvhd p{margin:2px 0}.bsvtv .dcadd{margin-top:16px}
.bsvyr{padding:0!important;gap:8px}.bsvyr .bsvhit{padding:10px 0}.bsvyr>.bsvsm{padding:7px 12px}
.bsvys .bsvchips button{font-size:13px}.bsvys .bsvdel.on{background:#fdecea;border-radius:14px}
.bsvhm2 .odl{margin-top:4px}.bsvhm2 .odr{padding:10px 0}
`);
