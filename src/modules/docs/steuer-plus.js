/* ===== Butler Docs: Steuer-Mappe plus (v41) =====
   In «Finanzen › Steuer-Mappe», per year:
   - Werbungskosten bar against the 1.230 € Arbeitnehmer-Pauschbetrag (Belege «Arbeit» + Weg zur Arbeit + Homeoffice).
   - «Weg zur Arbeit»: km one way, days with travel, Homeoffice days → Pendlerpauschale (2026+: 0,38 € from km 1;
     up to 2025: 0,30 € for km 1–20, 0,38 € from km 21) and Homeoffice-Pauschale (6 € a day, max 1.260 €).
   - Lohnsteuerbescheinigung: shown from the employer's place in «Arbeit & Business» (slot lst) — added once there.
     Reminder task at the end of February of the next year while it is missing.
   - Steuerbescheid: date on the letter → Bekanntgabe +4 days (since 2025) → Einspruch within one month, both moved off
     weekends; task one week before. The letter is saved once in «Dokumente».
   - Freistellungsaufträge: banks + amounts, check against 1.000 € (2.000 € together).
   - Steuer-ID & ELSTER: open ELSTER, open the Tresor (no copy of the number here).
   - «Was fehlt noch»: checklist per year.
   General rules, «bitte prüfen» — no tax advice. Data: g.sqx={way:{y:{km,days,ho}},bes:{y:{d,docs}},fsa:{joint,L:[{id,n,amt}]},tk:{}} */
const SQX={
 sec:['Для декларации %y','Für die Steuererklärung %y','For the tax return %y'],
 wk:['Расходы на работу','Werbungskosten','Work expenses'],wkOf:['%a из 1.230 €','%a von 1.230 €','%a of 1,230 €'],
 wkOk:['Больше 1.230 € – чеки имеют смысл ✓','Über 1.230 € – Belege lohnen sich ✓','Above 1,230 € – receipts pay off ✓'],wkNo:['Ещё %a до 1.230 € – до этого Finanzamt считает сам','Noch %a bis 1.230 € – bis dahin rechnet das Finanzamt selbst','%a more to 1,230 € – up to that the tax office counts it itself'],
 way:['Дорога на работу','Weg zur Arbeit','Way to work'],wayNo:['Не указано – км, дни, Homeoffice','Noch nicht eingetragen – km, Tage, Homeoffice','Not entered – km, days, home office'],
 waySub:['%k км · %d дн. · %h дн. дома','%k km · %d Tage · %h Tage Homeoffice','%k km · %d days · %h home office days'],
 km:['Км до работы (в одну сторону)','Kilometer zur Arbeit (einfache Strecke)','Km to work (one way)'],days:['Дней с поездкой на работу','Tage mit Fahrt zur Arbeit','Days you travelled to work'],ho:['Дней работы дома (Homeoffice)','Tage im Homeoffice','Home office days'],
 pend:['Расходы на дорогу (Pendlerpauschale)','Pendlerpauschale','Commuter allowance'],hoP:['Домашний офис (Homeoffice-Pauschale)','Homeoffice-Pauschale','Home office allowance'],sum:['Итого','Zusammen','Together'],
 rate26:['С 2026: 0,38 € за км с первого км, только дорога в одну сторону.','Ab 2026: 0,38 € je Kilometer ab dem 1. km, nur die einfache Strecke.','From 2026: 0.38 € per km from km 1, one way only.'],
 rate25:['До 2025: 0,30 € за км 1–20, с 21-го км 0,38 €.','Bis 2025: 0,30 € für km 1–20, ab dem 21. km 0,38 €.','Up to 2025: 0.30 € for km 1–20, 0.38 € from km 21.'],
 hoR:['Homeoffice: 6 € в день, максимум 1.260 € в год. В один день – или дорога, или Homeoffice.','Homeoffice: 6 € pro Tag, höchstens 1.260 € im Jahr. Pro Tag entweder Fahrt oder Homeoffice.','Home office: 6 € a day, at most 1,260 € a year. Per day either travel or home office.'],
 cap:['Без своей машины максимум 4.500 € в год. Проверьте, пожалуйста.','Ohne eigenes Auto höchstens 4.500 € im Jahr. Bitte prüfen.','Without your own car at most 4,500 € a year. Please check.'],
 lst:['Справка о налоге с зарплаты %y (Lohnsteuerbescheinigung)','Lohnsteuerbescheinigung %y','Wage tax certificate %y'],lstOk:['есть · %c','vorhanden · %c','there · %c'],lstNo:['Работодатель присылает до конца февраля %z','Kommt vom Arbeitgeber bis Ende Februar %z','The employer sends it by end of February %z'],
 lstNone:['Сначала добавьте работодателя в «Arbeit & Business» – там место для этого документа.','Bitte zuerst den Arbeitgeber in «Arbeit & Business» eintragen – dort ist ihr Platz.','Please add the employer in «Work & business» first – that is its place.'],toKar:['Открыть «Arbeit & Business»','«Arbeit & Business» öffnen','Open «Work & business»'],
 pickJ:['Какой работодатель?','Welcher Arbeitgeber?','Which employer?'],
 bes:['Налоговое решение %y (Steuerbescheid)','Steuerbescheid %y','Tax assessment %y'],besNo:['Ещё не пришёл','Noch nicht erhalten','Not received yet'],besOk:['Einspruch до %d','Einspruch bis %d','Objection by %d'],besOver:['Срок Einspruch прошёл (%d)','Einspruchsfrist vorbei (%d)','Objection period over (%d)'],
 besD:['Дата на письме','Datum auf dem Bescheid','Date on the letter'],besCalc:['Получен (по закону): %a · Einspruch до: %b','Bekanntgabe: %a · Einspruch bis: %b','Deemed received: %a · objection by: %b'],
 besTip:['Письмо считается полученным через 4 дня после даты (с 2025), затем 1 месяц на Einspruch. Einspruch бесплатный – через ELSTER или письмом. Проверьте, пожалуйста.','Der Bescheid gilt 4 Tage nach dem Datum als bekanntgegeben (seit 2025), dann 1 Monat für den Einspruch. Einspruch ist kostenlos – per ELSTER oder Brief. Bitte prüfen.','The letter counts as received 4 days after its date (since 2025), then 1 month to object. An objection is free – via ELSTER or letter. Please check.'],
 besPic:['Письмо (фото или файл)','Bescheid (Foto oder Datei)','Letter (photo or file)'],tBes:['Проверить Steuerbescheid %y – Einspruch до %d','Steuerbescheid %y prüfen – Einspruch bis %d','Check tax assessment %y – objection by %d'],
 tLst:['Отсканировать Lohnsteuerbescheinigung %y','Lohnsteuerbescheinigung %y scannen','Scan wage tax certificate %y'],
 fsa:['Освобождение доходов от налога (Freistellungsaufträge)','Freistellungsaufträge','Exemption orders'],fsaNo:['Не указано – максимум 1.000 € на все банки','Noch nicht eingetragen – höchstens 1.000 € für alle Banken','Not entered – at most 1,000 € for all banks'],fsaOf:['%a из %b','%a von %b','%a of %b'],
 fsaJ:['Вместе с супругом (2.000 €)','Zusammen veranlagt (Ehe) – 2.000 €','Joint assessment (married) – 2,000 €'],fsaBank:['Банк','Bank','Bank'],fsaAmt:['€','€','€'],fsaAdd:['＋ Банк','＋ Bank','＋ Bank'],
 fsaOver:['Больше лимита на %a – уменьшите в одном из банков','%a über der Grenze – bitte bei einer Bank verringern','%a over the limit – please lower it at one bank'],
 fsaTip:['Sparerpauschbetrag: 1.000 € в год на человека. Изменить Freistellungsauftrag можно в онлайн-банке.','Sparerpauschbetrag: 1.000 € im Jahr pro Person. Den Freistellungsauftrag ändern Sie im Online-Banking.','Saver’s allowance: 1,000 € a year per person. You change the order in online banking.'],
 sid:['Steuer-ID и ELSTER','Steuer-ID & ELSTER','Tax ID & ELSTER'],sidS:['Номер – в Tresor, вход – на elster.de','Nummer im Tresor, Zugang über elster.de','Number in the vault, access via elster.de'],
 elster:['Открыть ELSTER','ELSTER öffnen','Open ELSTER'],safe:['Steuer-ID в Tresor','Steuer-ID im Tresor','Tax ID in the vault'],sidTip:['Steuer-ID есть на Lohnsteuerbescheinigung и на каждом Steuerbescheid. Здесь не хранится вторая копия.','Die Steuer-ID steht auf der Lohnsteuerbescheinigung und jedem Steuerbescheid. Hier wird keine zweite Kopie gespeichert.','The tax ID is on the wage tax certificate and every assessment. No second copy is kept here.'],
 miss:['Чего ещё не хватает для %y','Was fehlt noch für %y','What is still missing for %y'],
 m_lst:['Справка о налоге с зарплаты (Lohnsteuerbescheinigung)','Lohnsteuerbescheinigung','Wage tax certificate'],m_way:['Дорога на работу / Homeoffice','Weg zur Arbeit / Homeoffice','Way to work / home office'],
 m_spend:['Справки о пожертвованиях','Spendenquittungen','Donation receipts'],m_spendS:['если жертвовали','falls gespendet','if you donated'],
 m_hand:['Nebenkostenabrechnung / мастера','Nebenkostenabrechnung / Handwerker','Service charges / craftsmen'],m_handS:['доля работы, оплата переводом','Arbeitsanteil, per Überweisung','labour share, by transfer'],
 m_vers:['Справка больничной кассы / страховки','Bescheinigung Krankenkasse / Versicherungen','Health insurer / insurance statements'],
 m_rente:['Пенсионная справка (Renteninformation)','Renteninformation','Pension statement'],m_renteS:['раз в год – проверить пробелы','jährlich – Lücken prüfen (Kontenklärung)','yearly – check gaps'],
 tip:['Общие правила, не налоговая консультация. Проверьте, пожалуйста.','Allgemeine Regeln, keine Steuerberatung. Bitte prüfen.','General rules, not tax advice. Please check.'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],cam:['📷 Сканировать','📷 Scannen','📷 Scan'],file:['📄 Файл','📄 Datei','📄 File'],has:['✓ %n файл(ов)','✓ %n Datei(en)','✓ %n file(s)'],
 saved:['Сохранено','Gespeichert','Saved'],linked:['✓ в «Документах»','✓ in «Dokumente»','✓ in «Documents»'],bad:['Проверьте числа','Bitte die Zahlen prüfen','Please check the numbers'],needD:['Укажите дату','Bitte das Datum eintragen','Please enter the date']
};
const sqxT=(k,o)=>{let s=cv5n(SQX[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
function sqxD(){const o=g.sqx=g.sqx&&typeof g.sqx==='object'?g.sqx:{};for(const k of['way','bes','tk'])o[k]=o[k]&&typeof o[k]==='object'?o[k]:{};
 o.fsa=o.fsa&&typeof o.fsa==='object'?o.fsa:{joint:!1,L:[]};if(!Array.isArray(o.fsa.L))o.fsa.L=[];return o}
const sqxEur=c=>(Math.round(c||0)/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
const sqxDe=iso=>{if(!iso)return'';const[y,mo,d]=String(iso).split('-');return`${d}.${mo}.${y}`};
const sqxSave=()=>{try{bsvQuiet()}catch{}$()};
/* weekend → Monday (holidays differ by Land, so only weekends — «bitte prüfen») */
function sqxWk(iso){const d=new Date(iso+'T12:00:00');while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1);return x(d)}
function sqxAddM(iso,n){const d=new Date(iso+'T12:00:00'),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return x(d)}
function sqxEinspruch(dl){const b=sqxWk(bzxAdd(dl,4));return{bk:b,end:sqxWk(sqxAddM(b,1))}}
/* Pendlerpauschale & Homeoffice in cents */
function sqxWay(y){const w=sqxD().way[y];if(!w||!(w.km>0||w.ho>0))return null;const km=Math.floor(+w.km||0),dd=+w.days||0,ho=+w.ho||0;
 const p=+y>=2026?km*38*dd:(Math.min(km,20)*30+Math.max(km-20,0)*38)*dd,h=Math.min(ho*600,126000);return{km,dd,ho,p,h,sum:p+h}}
function sqxWk_(y){let arb=0;try{arb=fzList(String(y)).filter(z=>z.cat==='arb').reduce((a,b)=>a+(b.amt||0),0)}catch{}const w=sqxWay(y);return arb+(w?w.sum:0)}
const sqxCat=(y,k)=>{try{return fzList(String(y)).filter(z=>z.cat===k).length}catch{return 0}};
/* Lohnsteuerbescheinigung of year y from the employers' places */
function sqxJobs(){try{return krD().jobs.filter(j=>j&&!j.del)}catch{return[]}}
function sqxLst(y){const out=[];for(const j of sqxJobs()){let dk={};try{dk=krDk(j)}catch{}for(const d of krDocs(j.docs||[])){if(dk[d.id]!=='lst')continue;const t=String(d.title||''),ys=t.match(/\b(20\d\d)\b/);
 const dy=ys?+ys[1]:+(String(d.date||'').slice(0,4))-1||new Date(d.ts||Date.now()).getFullYear()-1;if(dy===+y)out.push({d,j})}}return out}
function sqxRente(y){try{return Ke().items.filter(d=>d&&!d.del&&/renteninformation|rentenauskunft/i.test(d.title||'')&&(String(d.title).includes(String(y))||new Date(d.ts||0).getFullYear()===+y))}catch{return[]}}
/* tasks */
function sqxTask(k,on,t,due){const B=sqxD();g.tasks=g.tasks||[];let o=B.tk[k]&&g.tasks.find(z=>z.id===B.tk[k]);
 if(on){if(!o){o={id:V(),t:'',due:'',time:'',prio:1,proj:'',done:!1};g.tasks.push(o);B.tk[k]=o.id}if(o.due!==due)o.done=!1;o.t=t;o.due=due}
 else{if(o&&!o.done)g.tasks=g.tasks.filter(z=>z!==o);delete B.tk[k]}}
function sqxSync(){try{const B=sqxD(),Y=new Date().getFullYear(),td=x(new Date());
 for(const y of[Y-1,Y]){const feb=x(new Date(y+1,2,0,12)),need=sqxJobs().length>0&&!sqxLst(y).length&&(y<Y?td<`${Y}-07-31`:new Date().getMonth()>=10);sqxTask('lst'+y,need,sqxT('tLst',{y}),feb<td?td:feb)}
 for(const y of Object.keys(B.bes)){const b=B.bes[y];if(!b||!b.d){sqxTask('bes'+y,!1);continue}const e=sqxEinspruch(b.d),due=bzxAdd(e.end,-7);sqxTask('bes'+y,e.end>=td,sqxT('tBes',{y,d:sqxDe(e.end)}),due<td?td:due)}}catch(er){Hooks.err('sqxsync',er)}}
/* ---------- block in the Steuer-Mappe ---------- */
function sqxBlock(y){try{const B=sqxD(),wk=sqxWk_(y),pc=Math.min(100,Math.round(wk/123000*100)),w=sqxWay(y),L=sqxLst(y),b=B.bes[y],jobs=sqxJobs();
 const F=B.fsa,lim=F.joint?200000:100000,fs=F.L.reduce((a,z)=>a+(z.amt||0),0);
 const row=(act,e,t,s,em,cls)=>`<button type="button" class="odr sqxr ${cls||''}" data-act="${act}" data-y="${y}"><span class="fze">${e}</span><span><b>${i(t)}</b><small>${i(s)}</small></span><em>${em||'›'}</em></button>`;
 let bs=sqxT('besNo'),bc='';if(b&&b.d){const e=sqxEinspruch(b.d);if(e.end>=x(new Date()))bs=sqxT('besOk',{d:sqxDe(e.end)});else{bs=sqxT('besOver',{d:sqxDe(e.end)});bc='past'}}
 const wkCard=`<div class="dhcard sqxwk"><div class="sqxwh"><b>${i(sqxT('wk'))} ${y}</b><em>${i(sqxT('wkOf',{a:sqxEur(wk)}))}</em></div><div class="sqxbar"><i style="width:${pc}%"></i></div><small>${i(wk>=123000?sqxT('wkOk'):sqxT('wkNo',{a:sqxEur(123000-wk)}))}</small></div>`;
 const rows=[row('sqxway','🚗',sqxT('way'),w?sqxT('waySub',{k:w.km,d:w.dd,h:w.ho}):sqxT('wayNo'),w?i(sqxEur(w.sum)):'＋',w?'ok':''),
  row('sqxlst','📄',sqxT('lst',{y}),L.length?sqxT('lstOk',{c:L.map(z=>z.j.co||'').filter(Boolean).join(', ')}):sqxT('lstNo',{z:+y+1}),L.length?'✓':'＋',L.length?'ok':''),
  row('sqxbes','✉️',sqxT('bes',{y}),bs,b&&b.d?'✓':'＋',bc||(b&&b.d?'ok':'')),
  row('sqxfsa','🏦',sqxT('fsa'),F.L.length?sqxT('fsaOf',{a:sqxEur(fs),b:sqxEur(lim)}):sqxT('fsaNo'),F.L.length?(fs>lim?'⚠︎':'✓'):'＋',fs>lim?'past':F.L.length?'ok':''),
  row('sqxsid','🆔',sqxT('sid'),sqxT('sidS'),'›')].join('');
 const M=[];if(jobs.length)M.push(['lst',L.length>0,'sqxlst']);M.push(['way',!!w,'sqxway']);M.push(['spend',sqxCat(y,'spend')>0,'sqxcat','spend']);M.push(['hand',sqxCat(y,'hand')>0,'sqxcat','hand']);
 M.push(['vers',sqxCat(y,'vers')>0,'sqxcat','vers']);M.push(['rente',sqxRente(y).length>0,'sqxrente']);
 const miss=`<h3 class="odh">${i(sqxT('miss',{y}))}</h3><div class="dhcard odl sqxm">${M.map(([k,ok,act,c])=>`<button type="button" class="odr sqxmi ${ok?'ok':''}" data-act="${act}" data-y="${y}"${c?` data-k="${c}"`:''}><span class="sqxck">${ok?'✓':''}</span><span><b>${i(sqxT('m_'+k))}</b>${SQX['m_'+k+'S']?`<small>${i(sqxT('m_'+k+'S'))}</small>`:''}</span><em>${ok?'':'›'}</em></button>`).join('')}</div>`;
 return`${wkCard}<h3 class="odh">${i(sqxT('sec',{y}))}</h3><div class="dhcard odl">${rows}</div>${miss}<p class="fdsmall sqxtip">${i(sqxT('tip'))}</p>`}catch(e){Hooks.err('sqxblock',e);return''}}
/* ---------- sheets ---------- */
function sqxFiles(sh,files,cb){const has=()=>{const e=sh.querySelector('[data-qhas]');if(e)e.textContent=files.length?sqxT('has',{n:files.length}):''};
 sh.querySelector('[data-qp=file]').onclick=()=>{const f=document.createElement('input');f.type='file';f.multiple=!0;f.accept='image/*,application/pdf';f.onchange=()=>{files.push(...(f.files||[]));has()};f.click()};
 sh.querySelector('[data-qp=cam]').onclick=()=>{cb();sh.remove();try{scOpen({multi:!0,saveLabel:sqxT('save'),done:fs=>cb(fs||[])})}catch(e){Hooks.err('sqxscan',e)}};has()}
const sqxPick=`<div class="bzpick"><button type="button" class="btn" data-qp="cam">${'%cam'}</button><button type="button" class="btn" data-qp="file">${'%file'}</button></div><small class="fdsmall" data-qhas></small>`;
const sqxPickH=()=>sqxPick.replace('%cam',i(sqxT('cam'))).replace('%file',i(sqxT('file')));
function sqxWaySheet(y){const B=sqxD(),w=B.way[y]||{};
 H(`${sqxT('way')} ${y}`,`<div class="bsvys"><label class="bsvl">${i(sqxT('km'))}</label><input class="field" data-qw="km" inputmode="numeric" value="${i(w.km||'')}" placeholder="15">
 <div class="bsv2c"><div><label class="bsvl">${i(sqxT('days'))}</label><input class="field" data-qw="days" inputmode="numeric" value="${i(w.days||'')}" placeholder="180"></div><div><label class="bsvl">${i(sqxT('ho'))}</label><input class="field" data-qw="ho" inputmode="numeric" value="${i(w.ho||'')}" placeholder="40"></div></div>
 <div class="dhcard sqxcalc"></div><div class="fztip">${i(+y>=2026?sqxT('rate26'):sqxT('rate25'))} ${i(sqxT('hoR'))} ${i(sqxT('cap'))}</div>
 <small class="verr" data-qe></small><button type="button" class="dcadd gold" data-qs>${i(sqxT('save'))}</button>${B.way[y]?`<button type="button" class="bsvdel" data-qd>${i(sqxT('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh','sqxsh');const rd=()=>{const o={};sh.querySelectorAll('[data-qw]').forEach(z=>{o[z.dataset.qw]=Math.max(0,Math.floor(+String(z.value).replace(',','.')||0))});return o};
  const calc=()=>{const o=rd(),old=B.way[y];B.way[y]=o;const r=sqxWay(y);if(old)B.way[y]=old;else delete B.way[y];
   sh.querySelector('.sqxcalc').innerHTML=r?`<div class="bzsub"><span>${i(sqxT('pend'))}</span><b>${i(sqxEur(r.p))}</b></div><div class="bzsub"><span>${i(sqxT('hoP'))}</span><b>${i(sqxEur(r.h))}</b></div><div class="bzsum"><span>${i(sqxT('sum'))}</span><b>${i(sqxEur(r.sum))}</b></div>`:''};
  sh.addEventListener('input',calc);calc();
  sh.querySelector('[data-qs]').onclick=()=>{const o=rd();if(o.days+o.ho>366||o.km>1000){sh.querySelector('[data-qe]').textContent=sqxT('bad');return}B.way[y]=o;sh.remove();sqxSave();v()};
  const d=sh.querySelector('[data-qd]');d&&(d.onclick=()=>{delete B.way[y];sh.remove();sqxSave();v()})})}
function sqxLstOpen(y){const L=sqxLst(y),J=sqxJobs();
 if(L.length===1)return krSlotSheet(L[0].j.id,'lst');
 if(L.length>1)return H(sqxT('lst',{y}),`<div class="dhcard odl">${L.map(z=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(z.d.id)}">📄<span><b>${i(z.d.title||'—')}</b><small>${i(z.j.co||'')}</small></span></button></div>`).join('')}</div>`,sh=>sh.classList.add('bsvsh'));
 if(!J.length)return H(sqxT('lst',{y}),`<p class="fdsmall">${i(sqxT('lstNone'))}</p><button type="button" class="dcadd gold" data-qk>${i(sqxT('toKar'))}</button>`,sh=>{sh.classList.add('bsvsh');sh.querySelector('[data-qk]').onclick=()=>{sh.remove();try{krD().tab='job'}catch{}R('kar')}});
 const act=J.filter(j=>!j.to||String(j.to).includes(String(y))||String(j.to)>String(y));const P=act.length?act:J;
 if(P.length===1)return krAddSheet({j:P[0].id,k:'lst'});
 H(sqxT('pickJ'),`<div class="dhcard odl">${P.map(j=>`<button type="button" class="odr" data-qj="${i(j.id)}"><span><b>${i(j.co||'—')}</b></span><em>›</em></button>`).join('')}</div>`,sh=>{sh.classList.add('bsvsh');sh.querySelectorAll('[data-qj]').forEach(b=>b.onclick=()=>{sh.remove();krAddSheet({j:b.dataset.qj,k:'lst'})})})}
function sqxBesSheet(y,dr){const B=sqxD(),b=dr?dr.b:Object.assign({d:'',docs:[]},B.bes[y]||{}),files=dr?dr.files:[],D=bzxDocs(b.docs||[]);
 H(sqxT('bes',{y}),`<div class="bsvys"><label class="bsvl">${i(sqxT('besD'))}</label><input class="field" type="date" data-qb value="${i(b.d||'')}"><div class="sqxcalc dhcard"></div>
 <label class="bsvl">${i(sqxT('besPic'))}</label>${D.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i(sqxT('linked'))}</small></span></button></div>`).join('')}${sqxPickH()}
 <div class="fztip">${i(sqxT('besTip'))}</div><small class="verr" data-qe></small><button type="button" class="dcadd gold" data-qs>${i(sqxT('save'))}</button>${B.bes[y]?`<button type="button" class="bsvdel" data-qd>${i(sqxT('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh','sqxsh');const inp=sh.querySelector('[data-qb]'),calc=()=>{const e=inp.value?sqxEinspruch(inp.value):null;sh.querySelector('.sqxcalc').innerHTML=e?`<b>${i(sqxT('besCalc',{a:sqxDe(e.bk),b:sqxDe(e.end)}))}</b>`:'';sh.querySelector('.sqxcalc').hidden=!e};
  inp.addEventListener('input',calc);inp.addEventListener('change',calc);calc();
  sqxFiles(sh,files,fs=>{if(fs)sqxBesSheet(y,{b,files:files.concat(fs)});else b.d=inp.value});
  sh.querySelector('[data-qs]').onclick=async()=>{b.d=inp.value;if(!b.d){sh.querySelector('[data-qe]').textContent=sqxT('needD');return}const btn=sh.querySelector('[data-qs]');btn.disabled=!0;
   if(files.length)try{const n=await krNewDoc(files,`Steuerbescheid ${y}`,'Finanzamt');b.docs=(b.docs||[]).concat(n.id)}catch(er){Hooks.err('sqxbes',er)}
   B.bes[y]={d:b.d,docs:b.docs||[]};sqxSync();sh.remove();sqxSave();v();T(sqxT('saved'))};
  const d=sh.querySelector('[data-qd]');d&&(d.onclick=()=>{delete B.bes[y];sqxSync();sh.remove();sqxSave();v()})})}
function sqxFsaSheet(){const B=sqxD(),F=JSON.parse(JSON.stringify(B.fsa));let banks=[];try{banks=[...new Set(bsvD().items.filter(z=>z&&(z.src==='bank'||z.e==='🏦'||/bank|sparkasse|volksbank|ing\b|dkb|comdirect|postbank|n26|consors|targo|hypo/i.test(z.n||''))).map(z=>z.n))]}catch{}
 if(!F.L.length)F.L=(banks.length?banks.slice(0,3):['']).map(n=>({id:V(),n,amt:null}));
 const draw=sh=>{const lim=F.joint?200000:100000,s=F.L.reduce((a,z)=>a+(z.amt||0),0);
  sh.querySelector('.sqxfl').innerHTML=F.L.map((z,k)=>`<div class="sqxfr"><input class="field" list="sqxbl" data-fn="${k}" value="${i(z.n||'')}" placeholder="${i(sqxT('fsaBank'))}" autocomplete="off"><input class="field" data-fa="${k}" inputmode="decimal" value="${z.amt!=null?i(bzxNum(z.amt)):''}" placeholder="0,00"><button type="button" class="bsvsm x" data-fx="${k}" aria-label="×">×</button></div>`).join('');
  const t=sh.querySelector('.sqxft');t.innerHTML=`<div class="bzsum"><span>${i(sqxT('sum'))}</span><b>${i(sqxT('fsaOf',{a:sqxEur(s),b:sqxEur(lim)}))}</b></div>${s>lim?`<small class="verr">${i(sqxT('fsaOver',{a:sqxEur(s-lim)}))}</small>`:''}`};
 const upd=sh=>{const lim=F.joint?200000:100000,s=F.L.reduce((a,z)=>a+(z.amt||0),0),t=sh.querySelector('.sqxft');t.innerHTML=`<div class="bzsum"><span>${i(sqxT('sum'))}</span><b>${i(sqxT('fsaOf',{a:sqxEur(s),b:sqxEur(lim)}))}</b></div>${s>lim?`<small class="verr">${i(sqxT('fsaOver',{a:sqxEur(s-lim)}))}</small>`:''}`};
 H(sqxT('fsa'),`<div class="bsvys"><label class="bzck"><input type="checkbox" data-fj ${F.joint?'checked':''}><span>${i(sqxT('fsaJ'))}</span></label><datalist id="sqxbl">${banks.map(n=>`<option value="${i(n)}">`).join('')}</datalist>
 <div class="sqxfl"></div><button type="button" class="bsvplus" data-fadd>${i(sqxT('fsaAdd'))}</button><div class="sqxft"></div><div class="fztip">${i(sqxT('fsaTip'))}</div>
 <button type="button" class="dcadd gold" data-fs>${i(sqxT('save'))}</button></div>`,
 sh=>{sh.classList.add('bsvsh','sqxsh');draw(sh);
  sh.addEventListener('input',e=>{const t=e.target;if(t.dataset.fn!=null)F.L[+t.dataset.fn].n=t.value;if(t.dataset.fa!=null){F.L[+t.dataset.fa].amt=bzxParse(t.value);upd(sh)}});
  sh.addEventListener('click',e=>{const xb=e.target.closest('[data-fx]');if(xb){F.L.splice(+xb.dataset.fx,1);draw(sh)}});
  sh.querySelector('[data-fj]').onchange=e=>{F.joint=e.target.checked;upd(sh)};sh.querySelector('[data-fadd]').onclick=()=>{F.L.push({id:V(),n:'',amt:null});draw(sh)};
  sh.querySelector('[data-fs]').onclick=()=>{F.L=F.L.filter(z=>String(z.n||'').trim()||z.amt);F.L.forEach(z=>{z.n=String(z.n||'').trim()});B.fsa=F;sh.remove();sqxSave();v()}})}
function sqxSidSheet(){H(sqxT('sid'),`<button type="button" class="kropt" data-qe2><span>🌐</span><span><b>${i(sqxT('elster'))}</b><small>elster.de</small></span></button>
 <button type="button" class="kropt" data-qv><span>🔐</span><span><b>${i(sqxT('safe'))}</b></span></button><p class="fdsmall">${i(sqxT('sidTip'))}</p>`,
 sh=>{sh.classList.add('bsvsh');sh.querySelector('[data-qe2]').onclick=()=>{window.__sqxOpen='https://www.elster.de/eportal/start';try{window.open(window.__sqxOpen,'_blank','noopener')}catch{}};
  sh.querySelector('[data-qv]').onclick=()=>{sh.remove();R('dsafe')}})}
function sqxRenteSheet(y,dr){const files=dr?dr.files:[];
 H(`${sqxT('m_rente')} ${y}`,`<div class="bsvys"><p class="fdsmall">${i(sqxT('m_renteS'))}</p>${sqxPickH()}<button type="button" class="dcadd gold" data-qs>${i(sqxT('save'))}</button></div>`,
 sh=>{sh.classList.add('bsvsh','sqxsh');sqxFiles(sh,files,fs=>{if(fs)sqxRenteSheet(y,{files:files.concat(fs)})});
  sh.querySelector('[data-qs]').onclick=async()=>{if(!files.length){sh.remove();return}try{await krNewDoc(files,`Renteninformation ${y}`,'Deutsche Rentenversicherung')}catch(e){Hooks.err('sqxrente',e)}sh.remove();sqxSave();v();T(sqxT('saved'))}})}
/* ---------- wiring ---------- */
Hooks.act('sqxway',d=>sqxWaySheet(String(d.y)));Hooks.act('sqxlst',d=>sqxLstOpen(String(d.y)));Hooks.act('sqxbes',d=>sqxBesSheet(String(d.y)));
Hooks.act('sqxfsa',()=>sqxFsaSheet());Hooks.act('sqxsid',()=>sqxSidSheet());Hooks.act('sqxrente',d=>sqxRenteSheet(String(d.y)));
Hooks.act('sqxcat',d=>{fzCat=d.k;v();window.scrollTo(0,0)});
Hooks.on('render',()=>{if(m.logged&&m.route==='fzm'&&!sqxSync.t){sqxSync.t=1;sqxSync();setTimeout(()=>{sqxSync.t=0},6e4)}});
Hooks.css('docs-steuer-plus',`
.sqxwk{padding:14px 16px!important}.sqxwh{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.sqxwh b{font-size:15px;min-width:0}.sqxwh em{font-style:normal;font-weight:700;font-size:13.5px;white-space:nowrap;flex:none}
.sqxbar{height:9px;border-radius:9px;background:rgba(0,0,0,.07);margin:8px 0 6px;overflow:hidden}.sqxbar i{display:block;height:100%;background:linear-gradient(90deg,#3f7a50,#2f6b3e);border-radius:9px}.sqxwk small{color:var(--muted);font-size:12.5px}
.sqxr em,.sqxmi em{font-style:normal;font-weight:700;white-space:nowrap}.sqxr.ok em{color:#2f6b3e}.sqxr.past em,.sqxr.past small{color:#b4442c}
.sqxck{flex:0 0 26px!important;width:26px!important;max-width:26px;height:26px;box-sizing:border-box;border-radius:50%;border:2px solid #c9c3b3;display:flex!important;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:14px}.sqxmi.ok .sqxck{background:#2f6b3e;border-color:#2f6b3e}.sqxmi.ok b{color:var(--muted);font-weight:500}
.sqxcalc{padding:10px 12px!important;margin:10px 0}.sqxcalc:empty{display:none}.sqxsh .fztip{margin-top:10px}
.sqxfr{display:flex;gap:6px;align-items:center;margin:6px 0}.sqxfr .field:first-child{flex:1.4}.sqxfr .field:nth-child(2){flex:1;text-align:right}.sqxft{margin:8px 2px}.sqxtip{margin:6px 4px 14px}
`);
