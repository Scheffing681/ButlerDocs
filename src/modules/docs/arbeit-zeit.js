/* ===== Butler Docs: Arbeit & Business, tab «Arbeitgeber» — Variante 1 (v92) =====
   The employer list stays as it is and gains, for the CURRENT employer (no end date or one still ahead):
   - chips «Aktuell» · «Befristet bis MM/JJJJ» (and «Ehemalig» on past ones);
   - «Diese Woche»: hours worked against the weekly target, next shift (from the user's own entries or shift pattern);
   - tiles Schichtplan · Gehalt · Urlaub · Unterlagen; a block «Bewerbungen». New pieces carry a small «NEU» for 21 days.
   Routes: awz (Arbeitszeit: Woche · Monat · Schichtplan), awg (Gehalt), awu (Urlaub), awb (Bewerbungen).
   Everything is what the user enters (or confirms from a payslip): no guessed hours, no guessed salary.
   Working days of a year can be handed to the Steuer-Mappe (Pendlerpauschale, g.sqx.way[y].days) — only on a tap.
   The shift pattern goes into the calendar only on a tap («In den Kalender»), as events marked aw:1, 4 weeks ahead.
   Data: g.awz = {wk:[{id,j,d,typ,von,bis,pa}], pat:{j,start,seq[],t:{F,S,N:[von,bis,pause]}}, bw:[{id,co,pos,url,d,st,talk,note,ev}], seen}
         job.soll (hours/week), job.pay [{id,m,br,ne,doc}], job.ur {tage,rest,list:[{id,von,bis,n,ev}]} */
const awzS={
 akt:['Сейчас','Aktuell','Current'],bef:['Срочный до %d','Befristet bis %d','Fixed-term until %d'],ehem:['Прежний','Ehemalig','Former'],neu:['НОВОЕ','NEU','NEW'],
 week:['Эта неделя','Diese Woche','This week'],worked:['Отработано','Gearbeitet','Worked'],hrs:['%a / %b ч','%a / %b Std.','%a / %b h'],next:['Следующая смена: %s','Nächste Schicht: %s','Next shift: %s'],noNext:['Смены не внесены — нажмите, чтобы внести','Noch keine Schichten – tippen zum Eintragen','No shifts yet – tap to add'],
 t_plan:['План смен','Schichtplan','Shift plan'],t_planS:['ранняя · поздняя · ночная','Früh · Spät · Nacht','early · late · night'],t_pay:['Зарплата','Gehalt','Salary'],t_payS:['брутто · нетто по месяцам','Brutto · Netto je Monat','gross · net per month'],t_payN:['нетто %a за %m','Netto %a im %m','net %a in %m'],
 t_ur:['Отпуск','Urlaub','Holiday'],t_urS:['осталось: %n дн.','Rest: %n Tage','left: %n days'],t_urE:['внесите дни отпуска','Urlaubstage eintragen','enter holiday days'],t_doc:['Документы','Unterlagen','Papers'],t_docS:['договор, расчётные листы','Vertrag, Abrechnungen','contract, payslips'],
 bw:['Заявки на работу','Bewerbungen','Job applications'],bwNone:['Пока нет — статус, собеседование в календаре, «ждёт ответа»','Noch keine – Status, Gespräch im Kalender, „wartet auf Antwort“','None yet – status, interview in the calendar, “awaiting reply”'],
 bwOpen:['открыто: %n · ждут ответа: %w','offen: %n · wartet auf Antwort: %w','open: %n · awaiting reply: %w'],
 /* Arbeitszeit */
 az:['Рабочее время','Arbeitszeit','Working time'],kw:['Неделя %w · %a – %b','KW %w · %a – %b','Week %w · %a – %b'],tw:['Неделя','Woche','Week'],tm:['Месяц','Monat','Month'],tp:['План смен','Schichtplan','Shift plan'],
 ist:['Факт / план','Ist / Soll','Actual / target'],left:['Осталось %n ч','Noch %n Std.','%n h to go'],over:['Сверх плана: %n ч','Überstunden: %n Std.','Overtime: %n h'],
 shF:['Ранняя смена','Frühschicht','Early shift'],shS:['Поздняя смена','Spätschicht','Late shift'],shN:['Ночная смена','Nachtschicht','Night shift'],F:['Ранняя','Früh','Early'],S:['Поздняя','Spät','Late'],N:['Ночная','Nacht','Night'],X:['Другое','Andere','Other'],U:['Отпуск','Urlaub','Holiday'],K:['Больничный','Krank','Sick'],frei:['выходной','frei','off'],
 planned:['по плану','geplant','planned'],asPlan:['✓ Отработал по плану','✓ So gearbeitet','✓ Worked as planned'],add:['＋ Внести смену','＋ Schicht erfassen','＋ Add a shift'],
 d:['Дата','Datum','Date'],typ:['Смена','Schicht','Shift'],von:['С','Von','From'],bis:['До','Bis','To'],pa:['Перерыв, мин','Pause (Min.)','Break (min)'],save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],
 clash:['%d: смена и «%e» пересекаются','%d: Schicht und „%e“ überschneiden sich','%d: shift and “%e” overlap'],
 soll:['Норма в неделю, ч','Soll pro Woche (Std.)','Target per week (h)'],sollS:['по договору','laut Vertrag','per contract'],
 mIst:['Отработано в %m','Gearbeitet im %m','Worked in %m'],mSoll:['План (рабочие дни × норма)','Soll (Arbeitstage × Soll/5)','Target (working days × target/5)'],
 days:['Рабочих дней в %y: %n','Arbeitstage %y: %n','Working days %y: %n'],tax:['Передать в налоговую папку (Pendlerpauschale)','Für die Pendlerpauschale übernehmen','Hand over for the commuter allowance'],taxOk:['Внесено в налоговую папку: %n дн.','In die Steuer-Mappe übernommen: %n Tage','Taken into the tax folder: %n days'],
 taxS:['Считаются дни, где Вы внесли смену (без отпуска и больничного). Проверьте перед декларацией.','Gezählt werden Tage mit erfasster Schicht (ohne Urlaub und Krank). Vor der Erklärung bitte prüfen.','Days with an entered shift count (no holiday or sick days). Please check before filing.'],
 seq:['Ритм (нажмите на день, чтобы сменить)','Rhythmus (Tag antippen zum Wechseln)','Rhythm (tap a day to change)'],start:['Начало ритма','Beginnt am','Starts on'],len:['＋ день','＋ Tag','＋ day'],lenM:['− день','− Tag','− day'],
 times:['Время смен','Schichtzeiten','Shift times'],toCal:['В календарь на 4 недели','Für 4 Wochen in den Kalender','Into the calendar for 4 weeks'],calOk:['В календаре: %n смен','Im Kalender: %n Schichten','In the calendar: %n shifts'],
 prev:['Ближайшие 14 дней','Nächste 14 Tage','Next 14 days'],noJob:['Сначала добавьте работодателя','Bitte zuerst einen Arbeitgeber anlegen','Please add an employer first'],
 hNote:['Только Ваши записи. Батлер не считает зарплату и ничего не отправляет работодателю.','Nur Ihre Einträge. Butler rechnet keinen Lohn und sendet nichts an den Arbeitgeber.','Only your entries. Butler computes no pay and sends nothing to the employer.'],
 /* Gehalt */
 m:['Месяц','Monat','Month'],br:['Брутто','Brutto','Gross'],ne:['Нетто (к выплате)','Netto (Auszahlung)','Net (paid out)'],doc:['Расчётный лист','Abrechnung','Payslip'],docPick:['Из документа (необязательно)','Aus Dokument (optional)','From a document (optional)'],
 found:['Найдено в документе — проверьте цифры','Im Dokument gefunden – bitte Zahlen prüfen','Found in the document – please check the figures'],notFound:['В документе суммы не найдены — впишите сами','Im Dokument keine Beträge gefunden – bitte selbst eintragen','No amounts found in the document – please enter them'],
 avg:['В среднем нетто: %a','Durchschnitt netto: %a','Average net: %a'],ySum:['Брутто за %y: %a','Brutto %y: %a','Gross %y: %a'],yHint:['сравните с Lohnsteuerbescheinigung','mit der Lohnsteuerbescheinigung vergleichen','compare with the wage tax certificate'],
 payNone:['Месяцев пока нет. Внесите сумму сами или из расчётного листа.','Noch keine Monate. Selbst eintragen oder aus der Abrechnung übernehmen.','No months yet. Enter yourself or take from a payslip.'],addPay:['＋ Месяц','＋ Monat','＋ Month'],
 /* Urlaub */
 urT:['Отпуск %y','Urlaub %y','Holiday %y'],urTage:['Дней отпуска в году','Urlaubstage pro Jahr','Holiday days per year'],urRest:['Остаток с прошлого года','Rest aus dem Vorjahr','Left from last year'],
 urLeft:['Осталось %n из %t','Noch %n von %t Tagen','%n of %t days left'],urAdd:['＋ Отпуск','＋ Urlaub','＋ Holiday'],urN:['%n раб. дн.','%n Arbeitstage','%n working days'],
 urCarry:['Остаток прошлого года часто сгорает около 31 марта — смотрите договор.','Resturlaub verfällt oft ≈ am 31. März – maßgeblich ist Ihr Vertrag.','Leftover days often lapse around 31 March – your contract decides.'],
 urEv:['Отпуск до %d','Urlaub bis %d','Holiday until %d'],urNone:['Отпусков пока нет','Noch kein Urlaub eingetragen','No holiday entered yet'],
 /* Bewerbungen */
 co:['Фирма','Firma','Company'],pos:['Должность','Position','Position'],url:['Ссылка на вакансию','Link zur Stelle','Link to the job'],dSent:['Дата заявки','Beworben am','Applied on'],st:['Статус','Status','Status'],talk:['Собеседование','Gespräch','Interview'],note:['Заметка','Notiz','Note'],
 s_int:['Интересно','Interessant','Interesting'],s_prep:['Готовлю','Vorbereiten','Preparing'],s_sent:['Отправлено','Beworben','Applied'],s_talk:['Собеседование','Gespräch','Interview'],s_wait:['Жду ответа','Rückmeldung ausstehend','Awaiting reply'],s_yes:['Предложение','Zusage','Offer'],s_no:['Отказ','Absage','Rejected'],s_done:['Закрыто','Erledigt','Closed'],
 wait:['Ждут ответа','Wartet auf Antwort','Awaiting reply'],waitD:['%n дн. без ответа','seit %n Tagen ohne Antwort','%n days without reply'],talkEv:['Собеседование: %c','Vorstellungsgespräch: %c','Interview: %c'],need:['Впишите фирму','Bitte die Firma eintragen','Please enter the company'],
 mappe:['Bewerbungsmappe (PDF)','Bewerbungsmappe (PDF)','Application folder (PDF)'],bwAdd:['＋ Заявка','＋ Bewerbung','＋ Application'],delQ:['Точно удалить? Ещё раз','Wirklich löschen? Nochmals','Really delete? Again']};
const awt=(k,o)=>{let s=cv5n(awzS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const awD=()=>{const o=g.awz=g.awz&&typeof g.awz==='object'?g.awz:{};['wk','bw'].forEach(k=>{if(!Array.isArray(o[k]))o[k]=[]});if(!o.seen)o.seen=Date.now();return o};
const awNeu=()=>Date.now()-awD().seen<21*864e5?`<span class="awneu">${i(awt('neu'))}</span>`:'';
const awMk=()=>vaIso(0).slice(0,7);
const awCur=()=>{const mk=awMk();return krD().jobs.filter(j=>!j.to||j.to>=mk).sort((a,b)=>String(b.from||'').localeCompare(String(a.from||'')))[0]||null};
const awMin=t=>{const m2=/^(\d\d?):(\d\d)$/.exec(t||'');return m2?+m2[1]*60+ +m2[2]:null};
const awDur=e=>{const a=awMin(e.von),b=awMin(e.bis);if(a==null||b==null)return 0;let m2=b-a;if(m2<=0)m2+=1440;return Math.max(0,m2-(+e.pa||0))/60};
const awH=n=>(Math.round(n*10)/10).toLocaleString(he(),{maximumFractionDigits:1});
const awAdd=(iso,n)=>{const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const awMon=iso=>{const d=new Date(iso+'T12:00:00'),k=(d.getDay()+6)%7;return awAdd(iso,-k)};
const awKW=iso=>{const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+3-(d.getDay()+6)%7);const w1=new Date(d.getFullYear(),0,4,12);return 1+Math.round(((d-w1)/864e5-3+(w1.getDay()+6)%7)/7)};
const awWd=iso=>new Date(iso+'T12:00:00').toLocaleDateString(he(),{weekday:'short'});
const awDT=iso=>new Date(iso+'T12:00:00').toLocaleDateString(he(),{day:'2-digit',month:'2-digit'});
const AW_T={F:['06:00','14:30',30],S:['14:00','22:30',30],N:['22:00','06:00',30]};
const awTimes=()=>{const p=awD().pat||{};return Object.assign({},AW_T,p.t||{})};
function awPlan(iso){const p=awD().pat;if(!p||!p.start||!Array.isArray(p.seq)||!p.seq.length||iso<p.start)return null;const n=Math.round((new Date(iso+'T12:00:00')-new Date(p.start+'T12:00:00'))/864e5);const typ=p.seq[n%p.seq.length];if(!typ||typ==='-')return null;const t=awTimes()[typ]||[];return{typ,von:t[0],bis:t[1],pa:t[2]||0,plan:1}}
const awEnt=(j,iso)=>awD().wk.filter(e=>e.j===j.id&&e.d===iso);
const awSoll=j=>+j.soll>0?+j.soll:40;
function awWeek(j,mon){let ist=0;for(let k=0;k<7;k++)awEnt(j,awAdd(mon,k)).forEach(e=>{if(!['U','K'].includes(e.typ))ist+=awDur(e)});return ist}
function awNext(j){const now=new Date(),t0=vaIso(0),nm=now.getHours()*60+now.getMinutes();for(let k=0;k<21;k++){const d=awAdd(t0,k);const E=awEnt(j,d).filter(e=>!['U','K'].includes(e.typ));const c=E[0]||(!E.length?awPlan(d):null);if(!c)continue;if(k===0&&awMin(c.von)!=null&&awMin(c.von)<=nm)continue;return`${k===0?cv5n(['сегодня','heute','today']):k===1?cv5n(['завтра','morgen','tomorrow']):awWd(d)+' '+awDT(d)} · ${awt(c.typ||'X')} ${c.von||''}`}return''}
function awClash(j,iso){const E=awEnt(j,iso).filter(e=>!['U','K'].includes(e.typ)),c=E[0]||(!E.length?awPlan(iso):null);if(!c)return null;const a=awMin(c.von),b0=awMin(c.bis);if(a==null||b0==null)return null;let b=b0<=a?b0+1440:b0;
 const ev=(g.events||[]).find(e=>e&&!e.aw&&e.date===iso&&e.time&&(()=>{const t=awMin(e.time);return t!=null&&t>=a-60&&t<=b})());return ev?ev.title||'—':null}
/* ---------- the tab: chips + card + tiles + Bewerbungen ---------- */
function awBlock(){const j=awCur();const D=awD();let card='',tiles='';
 if(j){const mon=awMon(vaIso(0)),ist=awWeek(j,mon),so=awSoll(j),pc=Math.min(100,Math.round(ist/so*100)),nx=awNext(j);
  card=`<button type="button" class="dhcard awcard" data-act="go" data-to="awz"><span class="awh"><b>${i(awt('week'))}</b>${awNeu()}</span><span class="awrow"><span>${i(awt('worked'))}</span><b>${i(awt('hrs',{a:awH(ist),b:awH(so)}))}</b></span><span class="awbar"><i style="width:${pc}%"></i></span><small>${i(nx?awt('next',{s:nx}):awt('noNext'))}</small></button>`;
  const ur=j.ur||{},left=awUrLeft(j),P=(j.pay||[]).slice().sort((a,b)=>b.m.localeCompare(a.m))[0];
  tiles=`<div class="awtiles"><button type="button" data-act="awzt" data-k="p"><b>${i(awt('t_plan'))}</b><small>${i(awt('t_planS'))}</small></button>
   <button type="button" data-act="go" data-to="awg"><b>${i(awt('t_pay'))}</b><small>${i(P&&P.ne?awt('t_payN',{a:vaEur(P.ne),m:krMon(P.m)}):awt('t_payS'))}</small></button>
   <button type="button" data-act="go" data-to="awu"><b>${i(awt('t_ur'))}</b><small>${i(ur.tage?awt('t_urS',{n:left}):awt('t_urE'))}</small></button>
   <button type="button" data-act="kropen" data-id="${i(j.id)}"><b>${i(awt('t_doc'))}</b><small>${i(awt('t_docS'))}</small></button></div>`}
 const B=D.bw,open=B.filter(b=>!['no','done','yes'].includes(b.st)),w=B.filter(awWaits).length;
 const bw=`<button type="button" class="dhcard awcard" data-act="go" data-to="awb"><span class="awh"><b>${i(awt('bw'))}</b>${awNeu()}</span><small>${i(B.length?awt('bwOpen',{n:open.length,w}):awt('bwNone'))}</small></button>`;
 return{card,tiles,bw}}
const awWaits=b=>(b.st==='sent'||b.st==='wait')&&b.d&&(Date.now()-new Date(b.d+'T12:00:00'))/864e5>=14;
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='kar'||['edu','biz'].includes(krD().tab))return h;
 const mk=awMk();h=h.replace(/(data-act="kropen" data-id="([^"]+)"><b>[^<]*<\/b><small>[^<]*<\/small>)/g,(all,pre,id)=>{const j=krJob(id);if(!j)return all;
  const ch=!j.to||j.to>=mk?`<span class="awch"><em class="on">${i(awt('akt'))}</em>${j.to?`<em class="gold">${i(awt('bef',{d:krMon(j.to)}))}</em>`:''}</span>`:`<span class="awch"><em>${i(awt('ehem'))}</em></span>`;return pre+ch});
 const B=awBlock(),k=h.indexOf('<button type="button" class="dcadd gold" data-act="krjobed">');if(k<0)return h;
 h=h.slice(0,k)+B.card+B.tiles+h.slice(k);const k2=h.indexOf('<button type="button" class="dcadd gold" data-act="krjobed">');const e2=h.indexOf('</button>',k2)+9;return h.slice(0,e2)+B.bw+h.slice(e2)}catch(e){Hooks.err('awtab',e);return h}});
/* ---------- Arbeitszeit ---------- */
function awzScreen(){const j=awCur();const hdr=`<div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(awt('az'))}</h2></div><span></span></div>`;
 if(!j)return`<div class="screen dhome fz va aww">${hdr}<div class="vacard"><p class="dhnone">${i(awt('noJob'))}</p></div></div>`;
 const tab=m.awzT||'w',tabs=`<div class="eitabs">${['w','m','p'].map(k=>`<button type="button" class="${tab===k?'on':''}" data-act="awzt" data-k="${k}">${i(awt('t'+k))}</button>`).join('')}</div>`;
 let body='';
 if(tab==='w'){const mon=awAdd(awMon(vaIso(0)),7*(m.awzW||0)),ist=awWeek(j,mon),so=awSoll(j),pc=Math.min(100,Math.round(ist/so*100));
  const rows=[0,1,2,3,4,5,6].map(k=>{const d=awAdd(mon,k),E=awEnt(j,d),p=!E.length?awPlan(d):null,cl=awClash(j,d);
   const ent=E.map(e=>`<button type="button" class="awday" data-act="awzed" data-id="${e.id}"><span class="awwd">${i(awWd(d))}<small>${i(awDT(d))}</small></span><span class="awtp ${e.typ}">${i(awt(e.typ||'X'))}</span><span class="awtx">${['U','K'].includes(e.typ)?'':i(`${e.von||''}–${e.bis||''}`+(e.pa?` · ${e.pa}′`:''))}</span><b>${['U','K'].includes(e.typ)?'':i(awH(awDur(e)))}</b></button>`).join('');
   const pl=p?`<div class="awday pl"><span class="awwd">${i(awWd(d))}<small>${i(awDT(d))}</small></span><span class="awtp ${p.typ}">${i(awt(p.typ))}</span><span class="awtx">${i(awt('planned'))} ${i(p.von+'–'+p.bis)}</span>${d<=vaIso(0)?`<button type="button" class="awok" data-act="awzok" data-d="${d}">${i(awt('asPlan'))}</button>`:'<b></b>'}</div>`:'';
   const none=!E.length&&!p?`<button type="button" class="awday fr" data-act="awzed" data-d="${d}"><span class="awwd">${i(awWd(d))}<small>${i(awDT(d))}</small></span><span class="awtx">${i(awt('frei'))}</span><b>＋</b></button>`:'';
   return ent+pl+none+(cl?`<div class="awcl">⚠ ${i(awt('clash',{d:awWd(d),e:cl}))}</div>`:'')}).join('');
  body=`<div class="awnav"><button type="button" data-act="awzw" data-n="-1" aria-label="‹">‹</button><span>${i(awt('kw',{w:awKW(mon),a:awDT(mon),b:awDT(awAdd(mon,6))}))}</span><button type="button" data-act="awzw" data-n="1" aria-label="›">›</button></div>
  <div class="vacard awsum"><span class="awrow"><span>${i(awt('ist'))}</span><b>${i(awt('hrs',{a:awH(ist),b:awH(so)}))}</b></span><span class="awbar"><i style="width:${pc}%"></i></span><small>${i(ist<=so?awt('left',{n:awH(so-ist)}):awt('over',{n:awH(ist-so)}))}</small></div>
  <div class="vacard awlist">${rows}</div><button type="button" class="vaadd" data-act="awzed">${i(awt('add'))}</button>
  <button type="button" class="vaabot" data-act="awsoll"><span><b>${i(awt('soll'))}: ${i(awH(so))}</b><small>${i(awt('sollS'))}</small></span><span class="akch">›</span></button>`}
 if(tab==='m'){const mk=m.awzM||awMk(),y=+mk.slice(0,4),mo=+mk.slice(5,7),last=new Date(y,mo,0).getDate();let ist=0,wd=0;const hol=(()=>{try{return knHolidays(y,g.bl||'').map(h=>h[0])}catch{return[]}})();
  for(let dd=1;dd<=last;dd++){const iso=`${mk}-${String(dd).padStart(2,'0')}`,dw=new Date(iso+'T12:00:00').getDay();if(dw&&dw<6&&!hol.includes(iso))wd++;awEnt(j,iso).forEach(e=>{if(!['U','K'].includes(e.typ))ist+=awDur(e)})}
  const so=wd*awSoll(j)/5,yd=new Set(awD().wk.filter(e=>e.j===j.id&&e.d.startsWith(String(y))&&!['U','K'].includes(e.typ)).map(e=>e.d)).size,mn=new Date(y,mo-1,15).toLocaleDateString(he(),{month:'long',year:'numeric'});
  let took='';try{const w=sqxD().way[y];if(w&&+w.days===yd)took=awt('taxOk',{n:yd})}catch{}
  body=`<div class="awnav"><button type="button" data-act="awzm" data-n="-1" aria-label="‹">‹</button><span>${i(mn)}</span><button type="button" data-act="awzm" data-n="1" aria-label="›">›</button></div>
  <div class="vacard awsum"><span class="awrow"><span>${i(awt('mIst',{m:mn}))}</span><b>${i(awH(ist))}</b></span><span class="awrow"><span>${i(awt('mSoll'))}</span><b>${i(awH(so))}</b></span><span class="awrow"><span>${i(ist>=so?awt('over',{n:''}).replace(/\s*:?\s*$/,''):awt('left',{n:''}).replace(/\s*$/,''))}</span><b>${i((ist>=so?'+':'−')+awH(Math.abs(ist-so)))}</b></span></div>
  <div class="vacard"><div class="awrow"><span>${i(awt('days',{y,n:yd}))}</span></div>${took?`<p class="vanote">✓ ${i(took)}</p>`:yd?`<button type="button" class="valnk" data-act="awtax" data-y="${y}" data-n="${yd}">${i(awt('tax'))} ›</button>`:''}<p class="vanote">${i(awt('taxS'))}</p></div>`}
 if(tab==='p'){const p=awD().pat||{},seq=Array.isArray(p.seq)&&p.seq.length?p.seq:['F','F','S','S','N','-','-'],T=awTimes(),pv=[];for(let k=0;k<14;k++){const d=awAdd(vaIso(0),k),q=p.start?awPlan(d):null;pv.push(`<span class="awpv ${q?q.typ:''}"><small>${i(awWd(d))}</small>${q?i(q.typ):'·'}</span>`)}
  body=`<div class="vacard"><div class="vash" style="margin:4px 0 8px">${i(awt('seq'))}</div><div class="awseq">${seq.map((s,k)=>`<button type="button" class="awtp ${s==='-'?'':s}" data-act="awseq" data-k="${k}">${s==='-'?i(awt('frei')):i(awt(s))}</button>`).join('')}</div>
   <div style="display:flex;gap:14px;margin-top:8px"><button type="button" class="valnk" data-act="awlen" data-n="1">${i(awt('len'))}</button>${seq.length>1?`<button type="button" class="valnk" data-act="awlen" data-n="-1">${i(awt('lenM'))}</button>`:''}</div>
   <label class="bsvl">${i(awt('start'))}</label><input class="field" type="date" data-awst value="${i(p.start||vaIso(0))}"></div>
  <div class="vacard"><div class="vash" style="margin:4px 0 8px">${i(awt('times'))}</div>${'FSN'.split('').map(k=>`<div class="awtm"><span class="awtp ${k}">${i(awt(k))}</span><input class="field" type="time" data-awt="${k}" data-i="0" value="${i(T[k][0])}"><input class="field" type="time" data-awt="${k}" data-i="1" value="${i(T[k][1])}"><input class="field" inputmode="numeric" data-awt="${k}" data-i="2" value="${i(T[k][2])}" aria-label="${i(awt('pa'))}"></div>`).join('')}</div>
  <button type="button" class="vaadd" data-act="awpsave">${i(awt('save'))}</button><button type="button" class="vaadd awsec" data-act="awcal">${i(awt('toCal'))}</button>
  ${p.start?`<div class="vash">${i(awt('prev'))}</div><div class="awprev">${pv.join('')}</div>`:''}`}
 return`<div class="screen dhome fz va aww">${hdr}${tabs}${body}<p class="vanote">${i(awt('hNote'))}</p></div>`}
Hooks.act('awzt',d=>{m.awzT=d.k;if(m.route!=='awz')R('awz');else v()});Hooks.act('awzw',d=>{m.awzW=(m.awzW||0)+ +d.n;v()});
Hooks.act('awzm',d=>{const mk=m.awzM||awMk();const dt=new Date(+mk.slice(0,4),+mk.slice(5,7)-1+ +d.n,15);m.awzM=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;v()});
Hooks.act('awzed',dd=>{const j=awCur();if(!j){T(awt('noJob'));return}const e0=dd&&dd.id?awD().wk.find(e=>e.id===dd.id):null,pl=dd&&dd.d?awPlan(dd.d):null,o=e0||Object.assign({d:dd&&dd.d||vaIso(0),typ:'F'},pl||awTimes().F&&{von:awTimes().F[0],bis:awTimes().F[1],pa:awTimes().F[2]});
 H(awt('add').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(awt('d'))}</label><input class="field" type="date" data-k="d" value="${i(o.d)}">
 <label class="bsvl">${i(awt('typ'))}</label><div class="vachips awtyp">${['F','S','N','X','U','K'].map(k=>`<button type="button" class="${o.typ===k?'on':''}" data-ty="${k}">${i(awt(k))}</button>`).join('')}</div>
 <div class="bsv2c awtimes"><div><label class="bsvl">${i(awt('von'))}</label><input class="field" type="time" data-k="von" value="${i(o.von||'')}"></div><div><label class="bsvl">${i(awt('bis'))}</label><input class="field" type="time" data-k="bis" value="${i(o.bis||'')}"></div></div>
 <label class="bsvl awtimes">${i(awt('pa'))}</label><input class="field awtimes" inputmode="numeric" data-k="pa" value="${i(o.pa!=null?o.pa:30)}">
 <button type="button" class="vaadd" data-ks>${i(awt('save'))}</button>${e0?`<button type="button" class="bsvdel" data-kd>${i(awt('del'))}</button>`:''}</div>`,el=>{el.classList.add('bsvsh');let typ=o.typ;const tg=()=>el.querySelectorAll('.awtimes').forEach(z=>z.style.display=['U','K'].includes(typ)?'none':'');tg();
 el.addEventListener('click',e=>{const b=e.target.closest('[data-ty]');if(b){typ=b.dataset.ty;el.querySelectorAll('[data-ty]').forEach(z=>z.classList.toggle('on',z===b));const T2=awTimes()[typ];if(T2&&!e0){el.querySelector('[data-k=von]').value=T2[0];el.querySelector('[data-k=bis]').value=T2[1];el.querySelector('[data-k=pa]').value=T2[2]}tg();return}
  if(e.target.closest('[data-ks]')){const r={j:j.id,typ};el.querySelectorAll('[data-k]').forEach(z=>r[z.dataset.k]=z.dataset.k==='pa'?(+z.value||0):z.value);if(!r.d)return;if(e0)Object.assign(e0,r);else awD().wk.push(Object.assign({id:V()},r));$();el.remove();v();return}
  if(e.target.closest('[data-kd]')){awD().wk=awD().wk.filter(z=>z.id!==e0.id);$();el.remove();v()}})})});
Hooks.act('awzok',d=>{const j=awCur(),p=awPlan(d.d);if(!j||!p)return;awD().wk.push({id:V(),j:j.id,d:d.d,typ:p.typ,von:p.von,bis:p.bis,pa:p.pa});$();v()});
Hooks.act('awsoll',()=>{const j=awCur();if(!j)return;H(awt('soll'),`<div class="bsvys"><input class="field" inputmode="decimal" data-s value="${i(awH(awSoll(j)))}"><button type="button" class="vaadd" data-ks>${i(awt('save'))}</button></div>`,el=>{el.classList.add('bsvsh');el.querySelector('[data-ks]').onclick=()=>{const n=parseFloat(String(el.querySelector('[data-s]').value).replace(',','.'));if(n>0&&n<100){j.soll=n;$()}el.remove();v()}})});
Hooks.act('awtax',d=>{try{const W=sqxD().way;W[d.y]=Object.assign({},W[d.y]||{},{days:+d.n});$();T(awt('taxOk',{n:d.n}));v()}catch(e){Hooks.err('awtax',e)}});
const awPatRead=()=>{const p=awD().pat=awD().pat||{};if(!Array.isArray(p.seq)||!p.seq.length)p.seq=['F','F','S','S','N','-','-'];const s=document.querySelector('[data-awst]');if(s)p.start=s.value||vaIso(0);p.t=p.t||{};
 document.querySelectorAll('[data-awt]').forEach(z=>{const k=z.dataset.awt,t=p.t[k]=p.t[k]||AW_T[k].slice();t[+z.dataset.i]=z.dataset.i==='2'?(+z.value||0):z.value});const j=awCur();if(j)p.j=j.id;return p};
Hooks.act('awseq',d=>{const p=awPatRead(),o=['F','S','N','-'],c=p.seq[+d.k];p.seq[+d.k]=o[(o.indexOf(c)+1)%o.length];$();v()});
Hooks.act('awlen',d=>{const p=awPatRead();if(+d.n>0)p.seq.push('-');else if(p.seq.length>1)p.seq.pop();$();v()});
Hooks.act('awpsave',()=>{awPatRead();$();T(awt('save')+' ✓');v()});
Hooks.act('awcal',()=>{awPatRead();g.events=Array.isArray(g.events)?g.events:[];const t0=vaIso(0);g.events=g.events.filter(e=>!(e&&e.aw&&e.date>=t0));let n=0;
 for(let k=0;k<28;k++){const d=awAdd(t0,k),p=awPlan(d);if(!p)continue;g.events.push({id:V(),title:awt('sh'+p.typ),date:d,time:p.von,type:'event',note:p.von+'–'+p.bis,aw:1,at:Date.now()});n++}
 $();T(awt('calOk',{n}));v()});
/* ---------- Gehalt ---------- */
const awPay=j=>Array.isArray(j.pay)?j.pay:(j.pay=[]);
function awgScreen(){const j=awCur();const hdr=`<div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(awt('t_pay'))}</h2></div><span></span></div>`;
 if(!j)return`<div class="screen dhome fz va aww">${hdr}<div class="vacard"><p class="dhnone">${i(awt('noJob'))}</p></div></div>`;
 const P=awPay(j).slice().sort((a,b)=>b.m.localeCompare(a.m)),L12=P.slice(0,12).reverse(),mx=Math.max(1,...L12.map(p=>p.ne||0)),y=String(new Date().getFullYear()),yb=P.filter(p=>p.m.startsWith(y)).reduce((s,p)=>s+(p.br||0),0),nn=P.filter(p=>p.ne),av=nn.length?Math.round(nn.reduce((s,p)=>s+p.ne,0)/nn.length):0;
 return`<div class="screen dhome fz va aww">${hdr}<div class="vahero"><small>${i(j.co)}</small><b class="kpn">${i(av?awt('avg',{a:vaEur(av)}):awt('t_payS'))}</b><small>${yb?i(awt('ySum',{y,a:vaEur(yb)}))+' · '+i(awt('yHint')):''}</small></div>
 ${L12.length>1?`<div class="vacard awchart">${L12.map(p=>`<span><i style="height:${Math.max(4,Math.round((p.ne||0)/mx*90))}px"></i><small>${i(p.m.slice(5))}</small></span>`).join('')}</div>`:''}
 <div class="vacard">${P.length?P.map(p=>`<button type="button" class="varow" data-act="awged" data-id="${p.id}"><span class="vatx"><b>${i(krMon(p.m))}</b><small>${i([p.br?awt('br')+' '+vaEur(p.br):'',p.doc?'📄':''].filter(Boolean).join(' · '))}</small></span><span class="vaam">${p.ne?i(vaEur(p.ne)):'—'}</span></button>`).join(''):`<p class="dhnone">${i(awt('payNone'))}</p>`}</div>
 <button type="button" class="vaadd" data-act="awged">${i(awt('addPay'))}</button><p class="vanote">${i(awt('hNote'))}</p></div>`}
function awPayParse(d){let t='';try{t=eiTxt(d)}catch{}const f=re=>{const m2=re.exec(t);return m2?vaParseAmt(m2[m2.length-1]):null};
 return{br:f(/(gesamt[\s-]?brutto|brutto[\s-]?(?:bezüge|verdienst|lohn)|bruttoentgelt)\D{0,30}?([\d.]{1,7},\d{2})/i)||f(/\bbrutto\b\D{0,30}?([\d.]{1,7},\d{2})/i),ne:f(/(auszahlungsbetrag|auszahlung|überweisungsbetrag|netto[\s-]?(?:verdienst|bezüge|lohn))\D{0,30}?([\d.]{1,7},\d{2})/i)}}
Hooks.act('awged',dd=>{const j=awCur();if(!j)return;const p0=dd&&dd.id?awPay(j).find(p=>p.id===dd.id):null,o=p0||{m:vaIso(-15).slice(0,7)};let D=[];try{const ids=j.docs||[];D=Ke().items.filter(d=>d&&!d.type&&!d.del&&(ids.includes(d.id)||/abrechnung|entgelt|gehalt|lohn/i.test(d.title||''))).slice(0,40)}catch{}
 const amt=c=>c?(c/100).toLocaleString(he(),{minimumFractionDigits:2}):'';
 H(awt('t_pay'),`<div class="bsvys"><label class="bsvl">${i(awt('m'))}</label><input class="field" type="month" data-k="m" value="${i(o.m)}">
 ${D.length?`<label class="bsvl">${i(awt('docPick'))}</label><select class="field" data-k="doc"><option value="">—</option>${D.map(d=>`<option value="${d.id}" ${o.doc===d.id?'selected':''}>${i(d.title||'—')}</option>`).join('')}</select><small class="vanote" data-hint></small>`:''}
 <div class="bsv2c"><div><label class="bsvl">${i(awt('br'))}</label><input class="field" inputmode="decimal" data-k="br" value="${i(amt(o.br))}"></div><div><label class="bsvl">${i(awt('ne'))}</label><input class="field" inputmode="decimal" data-k="ne" value="${i(amt(o.ne))}"></div></div>
 <button type="button" class="vaadd" data-ks>${i(awt('save'))}</button>${p0?`<button type="button" class="bsvdel" data-kd>${i(awt('del'))}</button>`:''}</div>`,el=>{el.classList.add('bsvsh');const sel=el.querySelector('[data-k=doc]');
 sel&&sel.addEventListener('change',()=>{const d=Ke().items.find(z=>z.id===sel.value);if(!d)return;const r=awPayParse(d),h=el.querySelector('[data-hint]');if(r.br)el.querySelector('[data-k=br]').value=amt(r.br);if(r.ne)el.querySelector('[data-k=ne]').value=amt(r.ne);h&&(h.textContent=r.br||r.ne?awt('found'):awt('notFound'))});
 el.addEventListener('click',e=>{if(e.target.closest('[data-ks]')){const r={m:el.querySelector('[data-k=m]').value||o.m,br:vaParseAmt(el.querySelector('[data-k=br]').value)||0,ne:vaParseAmt(el.querySelector('[data-k=ne]').value)||0,doc:sel?sel.value:o.doc||''};
  const same=awPay(j).find(p=>p.m===r.m&&p!==p0);if(same){Object.assign(same,r);if(p0)j.pay=awPay(j).filter(p=>p!==p0)}else if(p0)Object.assign(p0,r);else awPay(j).push(Object.assign({id:V()},r));$();el.remove();v();return}
  if(e.target.closest('[data-kd]')){j.pay=awPay(j).filter(p=>p!==p0);$();el.remove();v()}})})});
/* ---------- Urlaub ---------- */
const awUr=j=>{const u=j.ur=j.ur&&typeof j.ur==='object'?j.ur:{};if(!Array.isArray(u.list))u.list=[];return u};
function awWork(a,b){let n=0;const hol={};try{for(let y=+a.slice(0,4);y<=+b.slice(0,4);y++)knHolidays(y,g.bl||'').forEach(h=>hol[h[0]]=1)}catch{}for(let d=a;d<=b&&n<400;d=awAdd(d,1)){const w=new Date(d+'T12:00:00').getDay();if(w&&w<6&&!hol[d])n++}return n}
function awUrLeft(j){const u=awUr(j),y=String(new Date().getFullYear());return(+u.tage||0)+(+u.rest||0)-u.list.filter(x=>String(x.von).startsWith(y)).reduce((s,x)=>s+(+x.n||0),0)}
function awuScreen(){const j=awCur();const hdr=`<div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(awt('t_ur'))}</h2></div><span></span></div>`;
 if(!j)return`<div class="screen dhome fz va aww">${hdr}<div class="vacard"><p class="dhnone">${i(awt('noJob'))}</p></div></div>`;
 const u=awUr(j),y=new Date().getFullYear(),tot=(+u.tage||0)+(+u.rest||0),L2=u.list.filter(x=>String(x.von).startsWith(String(y))).sort((a,b)=>a.von.localeCompare(b.von));
 return`<div class="screen dhome fz va aww">${hdr}<div class="vahero"><small>${i(awt('urT',{y}))}</small><b class="kpn">${i(awt('urLeft',{n:awUrLeft(j),t:tot}))}</b></div>
 <div class="vacard"><div class="bsv2c"><div><label class="bsvl">${i(awt('urTage'))}</label><input class="field" inputmode="numeric" data-awu="tage" value="${i(u.tage||'')}"></div><div><label class="bsvl">${i(awt('urRest'))}</label><input class="field" inputmode="numeric" data-awu="rest" value="${i(u.rest||'')}"></div></div><p class="vanote">${i(awt('urCarry'))}</p></div>
 <div class="vacard">${L2.length?L2.map(x=>`<div class="varow akdr"><span class="vatx"><b>${i(vaDate(x.von))} – ${i(vaDate(x.bis))}</b><small>${i(awt('urN',{n:x.n}))}</small></span><button type="button" class="akx" data-act="awudel" data-id="${x.id}" aria-label="${i(awt('del'))}">✕</button></div>`).join(''):`<p class="dhnone">${i(awt('urNone'))}</p>`}</div>
 <button type="button" class="vaadd" data-act="awuadd">${i(awt('urAdd'))}</button></div>`}
Hooks.on('render',()=>{if(m.route!=='awu')return;document.querySelectorAll('[data-awu]').forEach(z=>{if(z.dataset.on)return;z.dataset.on=1;z.addEventListener('change',()=>{const j=awCur();if(!j)return;awUr(j)[z.dataset.awu]=Math.max(0,+z.value||0);$();v()})})});
Hooks.act('awuadd',()=>{const j=awCur();if(!j)return;H(awt('urAdd').replace(/^＋\s*/,''),`<div class="bsvys"><div class="bsv2c"><div><label class="bsvl">${i(awt('von'))}</label><input class="field" type="date" data-a value="${vaIso(7)}"></div><div><label class="bsvl">${i(awt('bis'))}</label><input class="field" type="date" data-b value="${vaIso(11)}"></div></div><small class="vanote" data-n></small><button type="button" class="vaadd" data-ks>${i(awt('save'))}</button></div>`,el=>{el.classList.add('bsvsh');
 const a=el.querySelector('[data-a]'),b=el.querySelector('[data-b]'),upd=()=>{el.querySelector('[data-n]').textContent=a.value&&b.value&&b.value>=a.value?awt('urN',{n:awWork(a.value,b.value)}):''};a.oninput=b.oninput=upd;upd();
 el.querySelector('[data-ks]').onclick=()=>{if(!a.value||!b.value||b.value<a.value)return;const n=awWork(a.value,b.value),id=V(),ev=V();g.events=Array.isArray(g.events)?g.events:[];g.events.push({id:ev,title:'🏖 '+awt('urEv',{d:vaDate(b.value)}),date:a.value,time:'',type:'event',note:'',at:Date.now(),awu:id});
  awUr(j).list.push({id,von:a.value,bis:b.value,n,ev});for(let d=a.value;d<=b.value;d=awAdd(d,1))if(!awD().wk.some(e=>e.j===j.id&&e.d===d))awD().wk.push({id:V(),j:j.id,d,typ:'U'});$();el.remove();v()}})});
Hooks.act('awudel',d=>{const j=awCur();if(!j)return;const u=awUr(j),x=u.list.find(z=>z.id===d.id);if(!x)return;u.list=u.list.filter(z=>z!==x);g.events=(g.events||[]).filter(e=>e.id!==x.ev);awD().wk=awD().wk.filter(e=>!(e.j===j.id&&e.typ==='U'&&e.d>=x.von&&e.d<=x.bis));$();v()});
/* ---------- Bewerbungen ---------- */
const AW_ST=['int','prep','sent','talk','wait','yes','no','done'];
function awbScreen(){const B=awD().bw.slice().sort((a,b)=>String(b.d||'').localeCompare(String(a.d||''))),W=B.filter(awWaits),f=m.awbF||'all',L2=B.filter(b=>f==='all'||b.st===f);
 const days=b=>Math.round((Date.now()-new Date(b.d+'T12:00:00'))/864e5);
 return`<div class="screen dhome fz va aww"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(awt('bw'))}</h2></div><span></span></div>
 ${W.length?`<div class="vash">${i(awt('wait'))}</div><div class="vacard">${W.map(b=>`<button type="button" class="varow" data-act="awbed" data-id="${b.id}"><span class="vatx"><b>${i(b.co)}</b><small>${i([b.pos,awt('waitD',{n:days(b)})].filter(Boolean).join(' · '))}</small></span><span class="vaam">›</span></button>`).join('')}</div>`:''}
 <div class="vachips">${['all',...AW_ST.filter(s=>B.some(b=>b.st===s))].map(s=>`<button type="button" class="${f===s?'on':''}" data-act="awbf" data-k="${s}">${i(s==='all'?cv5n(['Все','Alle','All']):awt('s_'+s))}</button>`).join('')}</div>
 <div class="vacard">${L2.length?L2.map(b=>`<button type="button" class="varow" data-act="awbed" data-id="${b.id}"><span class="vatx"><b>${i(b.co)}</b><small>${i([b.pos,b.d?vaDate(b.d):'',b.talk?awt('talk')+' '+vaDate(b.talk.slice(0,10)):''].filter(Boolean).join(' · '))}</small></span><span class="awst ${b.st}">${i(awt('s_'+(b.st||'int')))}</span></button>`).join(''):`<p class="dhnone">${i(awt('bwNone'))}</p>`}</div>
 <button type="button" class="vaadd" data-act="awbed">${i(awt('bwAdd'))}</button><button type="button" class="vaadd awsec" data-act="krmappe">${i(awt('mappe'))}</button></div>`}
Hooks.act('awbf',d=>{m.awbF=d.k;v()});
Hooks.act('awbed',dd=>{const b0=dd&&dd.id?awD().bw.find(b=>b.id===dd.id):null,o=b0||{st:'sent',d:vaIso(0)};
 H(b0?b0.co:awt('bwAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(awt('co'))}</label><input class="field" data-k="co" value="${i(o.co||'')}"><label class="bsvl">${i(awt('pos'))}</label><input class="field" data-k="pos" value="${i(o.pos||'')}">
 <label class="bsvl">${i(awt('url'))}</label><input class="field" type="url" data-k="url" value="${i(o.url||'')}"><label class="bsvl">${i(awt('dSent'))}</label><input class="field" type="date" data-k="d" value="${i(o.d||'')}">
 <label class="bsvl">${i(awt('st'))}</label><div class="vachips">${AW_ST.map(s=>`<button type="button" class="${o.st===s?'on':''}" data-st="${s}">${i(awt('s_'+s))}</button>`).join('')}</div>
 <label class="bsvl">${i(awt('talk'))}</label><input class="field" type="datetime-local" data-k="talk" value="${i(o.talk||'')}"><label class="bsvl">${i(awt('note'))}</label><textarea class="field" rows="2" data-k="note">${i(o.note||'')}</textarea>
 <small class="verr" data-e></small><button type="button" class="vaadd" data-ks>${i(awt('save'))}</button>${b0?`<button type="button" class="bsvdel" data-kd>${i(awt('del'))}</button>`:''}</div>`,el=>{el.classList.add('bsvsh');let st=o.st,arm=0;
 el.addEventListener('click',e=>{const sb=e.target.closest('[data-st]');if(sb){st=sb.dataset.st;el.querySelectorAll('[data-st]').forEach(z=>z.classList.toggle('on',z===sb));return}
  if(e.target.closest('[data-ks]')){const r={st};el.querySelectorAll('[data-k]').forEach(z=>r[z.dataset.k]=z.value.trim());if(!r.co){el.querySelector('[data-e]').textContent=awt('need');return}
   const b=b0||Object.assign({id:V()},r);if(b0)Object.assign(b0,r);else awD().bw.push(b);g.events=Array.isArray(g.events)?g.events:[];g.events=g.events.filter(ev=>ev.id!==b.ev);delete b.ev;
   if(r.talk){const ev=V();g.events.push({id:ev,title:awt('talkEv',{c:r.co}),date:r.talk.slice(0,10),time:r.talk.slice(11,16),type:'event',note:r.pos||'',at:Date.now(),rem:[1]});b.ev=ev;if(['sent','wait','int','prep'].includes(st))b.st='talk'}$();el.remove();v();return}
  if(e.target.closest('[data-kd]')){if(!arm){arm=1;e.target.textContent=awt('delQ');return}g.events=(g.events||[]).filter(ev=>ev.id!==b0.ev);awD().bw=awD().bw.filter(b=>b!==b0);$();el.remove();v()}})})});
/* ---------- routes, deadlines, search ---------- */
['awz','awg','awu','awb'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='awz')return awzScreen();if(m.route==='awg')return awgScreen();if(m.route==='awu')return awuScreen();if(m.route==='awb')return awbScreen()}catch(e){Hooks.err('awscreen',e)}});
try{const _dl=stDlAll;stDlAll=function(){const L2=_dl.apply(this,arguments);try{const j=awCur();if(j&&j.to){const end=j.to+'-28';L2.push({src:'job',k:end,t:awt('bef',{d:krMon(j.to)})+' · '+j.co,act:'data-act="go" data-to="kar"'})}
 awD().bw.filter(awWaits).forEach(b=>L2.push({src:'job',k:awAdd(b.d,14),t:awt('wait')+': '+b.co,act:'data-act="go" data-to="awb"'}));L2.sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:0)}catch(e){Hooks.err('awdl',e)}return L2}}catch(e){Hooks.err('awdl0',e)}
try{SP_L.push(['awz','note',awzS.az,['arbeitszeit','schicht','рабоч','смен','shift','überstunden','сверхуроч']],['awg','note',awzS.t_pay,['gehalt','lohn','зарплат','salary','brutto','netto']],['awu','note',awzS.t_ur,['urlaub','отпуск','holiday','resturlaub']],['awb','note',awzS.bw,['bewerbung','заявк','вакан','application','vorstellungsgespräch','собеседов']])}catch{}
Hooks.css('docs-arbeit-zeit',`.awcard{display:flex;flex-direction:column;align-items:stretch;gap:6px;text-align:left;width:100%;margin-top:12px}.awh{display:flex;justify-content:space-between;align-items:center}
.awneu{font-size:10px;font-weight:700;letter-spacing:1px;color:#8A6A22;background:#F6E7B9;padding:3px 7px;border-radius:6px}.awrow{display:flex;justify-content:space-between;align-items:baseline;gap:10px}.awrow b{font-size:18px}
.awbar{display:block;height:7px;border-radius:4px;background:rgba(0,0,0,.08);overflow:hidden}.awbar i{display:block;height:7px;background:var(--acc,#2E7D4F)}
.awch{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap}.awch em{font-style:normal;font-size:11px;font-weight:600;padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.06)}.awch em.on{background:#E3EEE7;color:#1E5B3F}.awch em.gold{background:#FBF3E2;color:#8A6A22}
.awtiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:12px 0}.awtiles button{border:0;border-radius:16px;padding:12px;text-align:left;background:var(--card,#fff);box-shadow:0 1px 4px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:2px;color:inherit}.awtiles b{font-size:14px}.awtiles small{opacity:.7;font-size:12px}
.awnav{display:flex;justify-content:space-between;align-items:center;margin:6px 0 10px}.awnav button{border:0;background:var(--card,#fff);width:36px;height:36px;border-radius:18px;font-size:18px}.awnav span{font-weight:600}
.awsum{display:flex;flex-direction:column;gap:8px;padding:14px 16px}.awlist{padding:4px 12px}.awday{display:flex;align-items:center;gap:10px;width:100%;padding:10px 2px;border:0;border-bottom:1px solid rgba(0,0,0,.06);background:transparent;text-align:left;color:inherit;font-size:13px}
.awday.pl .awtx,.awday.pl .awwd{opacity:.75}.awday.fr{opacity:.55}.awwd{width:46px;display:flex;flex-direction:column;font-weight:600}.awwd small{font-weight:400;opacity:.7;font-size:11px}.awtx{flex:1}
.awtp{font-size:11px;font-weight:600;padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.06)}.awtp.F{background:#E3EEE7;color:#1E5B3F}.awtp.S{background:#F3E9D2;color:#8A6A22}.awtp.N{background:#DCE3EA;color:#2F4A63}.awtp.U{background:#FDE9DA;color:#9A4A1E}.awtp.K{background:#F3DCDC;color:#8A2E2E}
.awok{border:0;border-radius:10px;padding:6px 8px;background:#1E5B3F;color:#fff;font-size:11px}.awcl{font-size:12px;color:#9A4A1E;padding:6px 2px}.awsec{background:transparent!important;color:var(--acc,#1E5B3F)!important;border:1.5px solid currentColor!important}
.awseq{display:flex;flex-wrap:wrap;gap:6px}.awseq .awtp{border:0;padding:8px 10px;font-size:12px}.awtm{display:grid;grid-template-columns:76px 1fr 1fr 60px;gap:6px;align-items:center;margin:6px 0}
.awprev{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin:6px 0 12px}.awpv{display:flex;flex-direction:column;align-items:center;padding:6px 0;border-radius:10px;background:rgba(0,0,0,.04);font-weight:700;font-size:12px}.awpv small{font-weight:400;font-size:10px;opacity:.7}.awpv.F{background:#E3EEE7}.awpv.S{background:#F3E9D2}.awpv.N{background:#DCE3EA}
.awchart{display:flex;align-items:flex-end;gap:6px;height:120px;padding:12px}.awchart span{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px}.awchart i{display:block;width:100%;border-radius:6px 6px 2px 2px;background:#2E7D4F}.awchart small{font-size:10px;opacity:.7}
.awst{font-size:11px;font-weight:600;padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.06)}.awst.yes{background:#E3EEE7;color:#1E5B3F}.awst.no{background:#F3DCDC;color:#8A2E2E}.awst.talk{background:#FBF3E2;color:#8A6A22}`);
