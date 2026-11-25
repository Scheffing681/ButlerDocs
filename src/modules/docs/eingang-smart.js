/* ===== Butler Docs: stage 3 of BUTLER 2.0 — Smart Inbox (v76) =====
   The «Eingang» becomes the one place where every new document is understood and placed — on the phone only.
   - Tabs Neu · Prüfen · Erledigt · Archiv. «Neu» = Butler knows what it is; «Prüfen» = kind unclear or a possible
     double (same title, or the same number and amount); «Erledigt» = confirmed in the last 30 days; «Archiv» = put away.
   - Every new document is read: sender, amount («Gesamtbetrag» first), due date («fällig / zahlbar bis»), customer
     or contract number, a price change («Preisanpassung … ab 01.01.2027 … 79,00 €»). Sources stay visible.
   - A matching contract is found by its number or the company name → «Passt zu: Vertrag …».
   - The card (route eik) suggests, each with a tick: link with the contract · reminder to pay (2 days before) ·
     enter in «Ausgaben» (off when the contract already counts it — nothing twice) · put the new price into the contract
     (then stage 1 shows the price rise) · a task. «Bestätigen» does only what is ticked.
   - Journal «Was Butler getan hat» (route eij): every action with «Rückgängig», kept 90 days.
   Data: d.ctr = contract id, d.okTs, d.arch, g.eiLog = [{id,ts,k,t,u:{…}}] */
const eiS={
 neu:['Новые','Neu','New'],chk:['Проверить','Prüfen','Check'],done:['Готово','Erledigt','Done'],arch:['Архив','Archiv','Archive'],
 s_ok:['готово','bereit','ready'],s_chk:['проверить','prüfen','check'],s_dup:['дубликат?','Duplikat?','duplicate?'],s_pr:['▲ цена','▲ Preis','▲ price'],
 fits:['Подходит к: %t','Passt zu: %t','Fits: %t'],ctr:['договор «%n»','Vertrag „%n“','contract “%n”'],due:['срок %d','fällig %d','due %d'],
 add:['＋ Скан · Фото · Файл','＋ Scannen · Foto · Datei','＋ Scan · Photo · File'],many:['Можно сразу несколько файлов. Распознавание идёт только на этом телефоне.','Mehrere Dateien auf einmal möglich. Erkennung läuft nur auf diesem Telefon.','Several files at once. Recognition runs on this phone only.'],
 log:['Что сделал Батлер','Was Butler getan hat','What Butler did'],none:['Здесь пусто.','Hier ist nichts.','Nothing here.'],
 /* card */
 kT:['Документ распознан','Dokument erkannt','Document recognised'],kInv:['Счёт распознан','Rechnung erkannt','Bill recognised'],kLet:['Письмо распознано','Brief erkannt','Letter recognised'],
 from:['Отправитель','Absender','Sender'],amt:['Сумма','Betrag','Amount'],amtS:['из строки «%l»','aus Zeile „%l“','from the line “%l”'],dueT:['Оплатить до','Fällig am','Due on'],
 num:['Номер','Kunden-Nr.','Number'],numOk:['= договор «%n» ✓','= Vertrag „%n“ ✓','= contract “%n” ✓'],fold:['Папка','Ordner','Folder'],chg:['изменить','ändern','change'],
 newP:['Новая цена','Neuer Preis','New price'],newPS:['с %d','ab %d','from %d'],
 sug:['Батлер предлагает','Butler schlägt vor','Butler suggests'],
 o_link:['Связать с договором «%n»','Mit Vertrag „%n“ verknüpfen','Link with contract “%n”'],o_linkS:['тот же номер','gleiche Nummer','same number'],o_linkS2:['то же название фирмы','gleicher Firmenname','same company name'],
 o_rem:['Напомнить об оплате','Erinnerung zum Bezahlen','Reminder to pay'],o_remS:['%d, за 2 дня','am %d, 2 Tage vorher','on %d, 2 days before'],
 o_aus:['Внести в «Расходы»','In „Ausgaben“ eintragen','Enter in “Spending”'],o_ausS:['%a · %c','%a · %c','%a · %c'],o_ausNo:['уже учтено через договор — не дважды','zählt schon über den Vertrag – nicht doppelt','already counted via the contract – not twice'],
 o_price:['Внести новую цену в договор','Neuen Preis im Vertrag eintragen','Put the new price into the contract'],o_priceS:['%a с %d → Батлер покажет повышение','%a ab %d → Butler zeigt die Erhöhung','%a from %d → Butler shows the rise'],
 o_task:['Создать задачу','Aufgabe anlegen','Create a task'],o_taskS:['«%t» через 7 дней','„%t“ in 7 Tagen','“%t” in 7 days'],
 confirm:['Подтвердить','Bestätigen','Confirm'],noAuto:['Без Вашего подтверждения ничего не происходит. Всё можно отменить.','Nichts passiert ohne Ihre Bestätigung. Alles lässt sich rückgängig machen.','Nothing happens without your confirmation. Everything can be undone.'],
 archB:['В архив','Archivieren','Archive'],open:['Открыть документ','Dokument öffnen','Open document'],
 okN:['Сделано: %n','Erledigt: %n','Done: %n'],
 /* journal */
 today:['Сегодня','Heute','Today'],yest:['Вчера','Gestern','Yesterday'],earlier:['Раньше','Früher','Earlier'],undo:['Отменить','Rückgängig','Undo'],undone:['Отменено','Rückgängig gemacht','Undone'],
 keep90:['Журнал хранится 90 дней на этом телефоне.','Das Protokoll bleibt 90 Tage auf diesem Telefon.','The log stays 90 days on this phone.'],
 l_link:['%t → договор «%n»','%t → Vertrag „%n“','%t → contract “%n”'],l_rem:['Напоминание %d: %t','Erinnerung %d: %t','Reminder %d: %t'],l_aus:['%a в «Расходах»','%a in „Ausgaben“','%a in “Spending”'],
 l_price:['Новая цена %a в «%n»','Neuer Preis %a in „%n“','New price %a in “%n”'],l_task:['Задача: %t','Aufgabe: %t','Task: %t'],l_ok:['Подтверждено: %t','Bestätigt: %t','Confirmed: %t'],l_arch:['В архиве: %t','Archiviert: %t','Archived: %t'],
 byYou:['подтверждено Вами','von Ihnen bestätigt','confirmed by you'],remT:['Оплатить: %t (%a)','Bezahlen: %t (%a)','Pay: %t (%a)'],taskT:['Разобраться: %t','Erledigen: %t','Deal with: %t'],
 dupNum:['тот же номер и сумма, что у «%t»','gleiche Nummer und Summe wie „%t“','same number and amount as “%t”']};
const eit=(k,o)=>{let s=cv5n(eiS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* ---------- reading a document ---------- */
const eiTxt=d=>{try{return(typeof Fa!=='undefined'&&Fa.text&&Fa.text[d.id])||d.snip||''}catch{return d.snip||''}};
const eiNum=s=>{s=String(s||'').replace(/\s/g,'');if(/,\d{2}$/.test(s))s=s.replace(/\./g,'').replace(',','.');else s=s.replace(/,/g,'');const v2=Math.round(parseFloat(s)*100);return isNaN(v2)?0:v2};
const eiDe=s=>{const m1=String(s||'').match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);if(!m1)return'';const y=m1[3].length===2?'20'+m1[3]:m1[3];return`${y}-${m1[2].padStart(2,'0')}-${m1[1].padStart(2,'0')}`};
function eiRead(d){const t=eiTxt(d),o={party:d.party||'',amt:0,amtL:'',due:'',num:'',newP:0,newFrom:'',kind:''};const f=d.f||{};
 if(f.amount)o.amt=eiNum(f.amount);
 if(!o.amt){const m1=t.match(/(gesamtbetrag|rechnungsbetrag|endbetrag|zu zahlen|zahlbetrag|summe|betrag|total|итого|сумма)[^\d\n]{0,30}(\d{1,3}(?:\.\d{3})*,\d{2}|\d+[.,]\d{2})/i);if(m1){o.amt=eiNum(m1[2]);o.amtL=m1[1].replace(/^./,c=>c.toUpperCase())}}
 if(!o.amt){const all=[...t.matchAll(/(\d{1,3}(?:\.\d{3})*,\d{2})\s*(?:€|eur)/gi)].map(x=>eiNum(x[1]));if(all.length){o.amt=Math.max(...all);o.amtL=''}}
 const du=t.match(/(fällig(?: am)?|faellig|zahlbar bis|zahlungsziel|zu zahlen bis|abbuchung am|bis zum|due)[^\d\n]{0,20}(\d{1,2}\.\d{1,2}\.\d{2,4})/i);if(du)o.due=eiDe(du[2]);
 if(!o.due&&d.end&&/^\d{4}-\d\d-\d\d$/.test(d.end))o.due=d.end;
 const nu=t.match(/(kunden-?nr\.?|kundennummer|vertrags-?nr\.?|vertragsnummer|versicherungs-?(?:schein)?-?nr\.?|versicherungsnummer|policen-?nr\.?|mitglieds-?nr\.?|mitgliedsnummer|customer no\.?|contract no\.?)\s*[:.]?\s*([A-Z0-9][A-Z0-9 \-\/]{3,22}[A-Z0-9])/i);if(nu)o.num=nu[2].replace(/\s+[A-Za-zÄÖÜäöüß]{2,}.*$/,'').trim();
 if(!o.num&&f.number)o.num=f.number;
 if(/(preisanpassung|preiserhöhung|preiserhoehung|neuer (monats)?preis|neue[rn]? (grund)?gebühr|beitragsanpassung|beitragserhöhung)/i.test(t)){const ab=t.match(/(ab|zum|mit wirkung zum|gültig ab)\s+(dem\s+)?(\d{1,2}\.\d{1,2}\.\d{2,4})/i);
  const np=t.match(/(neu(?:er|e)?\s*(?:monats)?(?:preis|beitrag|grundgebühr)|künftig|kuenftig|ab dann)[^\d\n]{0,40}(\d{1,3}(?:\.\d{3})*,\d{2})/i);if(ab&&np){o.newFrom=eiDe(ab[3]);o.newP=eiNum(np[2])}}
 if(o.newP&&o.amt===o.newP&&!/(gesamtbetrag|rechnungsbetrag|zu zahlen)/i.test(t))o.amt=0;
 o.kind=/rechnung|invoice|счёт|счет|abschlag/i.test((d.title||'')+' '+t.slice(0,400))?'inv':/(sehr geehrte|dear|уважаем)/i.test(t)?'let':'';
 if(!o.party){const l=t.split('\n').map(x=>x.trim()).find(x=>/(gmbh|ag\b|se\b|kg\b|e\.v\.|versicherung|stadtwerke|bank|amt\b)/i.test(x)&&x.length<60);if(l)o.party=l}return o}
const eiDig=s=>String(s||'').replace(/\D/g,'');
function eiMatch(d,o){let C=[];try{C=vaContracts()}catch{}if(!C.length)return null;o=o||eiRead(d);const nd=eiDig(o.num);
 if(nd.length>=4){const c=C.find(e=>eiDig(e.polno)&&eiDig(e.polno)===nd);if(c)return{c,why:'num'}}
 const hay=zqLow([o.party,d.title,d.party,eiTxt(d).slice(0,600)].join(' '));
 const c=C.find(e=>{const w=zqLow(e.co||'').split(/[^a-zа-я0-9]+/).filter(x=>x.length>=4&&!/^(gmbh|versicherung|vertrag)$/.test(x));return w.length&&w.some(x=>hay.includes(x))});return c?{c,why:'name'}:null}
/* ---------- states ---------- */
try{const _st=egState;egState=function(d,A){const r=_st.apply(this,arguments);try{if(r.s!=='ok')return r;const o=eiRead(d),nd=eiDig(o.num);if(nd.length>=4&&o.amt){const tw=A.find(x=>x!==d&&!x.type&&!x.insId&&x.ok&&(()=>{const p=eiRead(x);return eiDig(p.num)===nd&&p.amt===o.amt&&(p.due||'')===(o.due||'')})());if(tw)return{s:'dup',tw,num:1}}}catch(e){Hooks.err('eist',e)}return r}}catch(e){Hooks.err('eist0',e)}
const eiLogD=()=>{if(!Array.isArray(g.eiLog))g.eiLog=[];const lim=Date.now()-90*864e5;g.eiLog=g.eiLog.filter(x=>x&&x.ts>lim);return g.eiLog};
const eiAddLog=(k,t,u)=>{eiLogD().unshift({id:V(),ts:Date.now(),k,t,u:u||{}})};
function eiDone(){let A=[];try{A=Ke().items}catch{}const lim=Date.now()-30*864e5;return A.filter(d=>d&&!d.type&&!d.insId&&d.ok&&!d.arch&&(d.okTs||0)>lim).sort((a,b)=>(b.okTs||0)-(a.okTs||0))}
function eiArch(){let A=[];try{A=Ke().items}catch{}return A.filter(d=>d&&!d.type&&!d.insId&&d.arch).sort((a,b)=>(b.okTs||0)-(a.okTs||0))}
function eiRow(d,st){const o=eiRead(d),mt=eiMatch(d,o);let pill='',why='';
 if(st){const s=st.s;pill=o.newP&&mt?`<em class="eis pr">${i(eit('s_pr'))}</em>`:`<em class="eis ${s}">${i(eit('s_'+s))}</em>`;why=s==='dup'?(st.num?eit('dupNum',{t:st.tw.title||'—'}):egt('w_dup',{t:st.tw.title||'—'})):s==='chk'?egt('w_chk'):''}
 const meta=[(()=>{try{return stDate(new Date(d.ts||Date.now()).toISOString().slice(0,10))}catch{return''}})(),o.amt?vaEur(o.amt):'',o.due?eit('due',{d:vaDate(o.due)}):''].filter(Boolean).join(' · ');
 return`<div class="eir"><button type="button" class="eim" data-act="eiopen" data-id="${d.id}"><span class="eiic">${o.kind==='let'?'✉️':o.kind==='inv'?'🧾':'📄'}</span><span class="eitx"><b>${i(d.title||'—')}</b><small>${i(why||meta)}</small></span>${pill}</button>
  ${mt&&st?`<button type="button" class="eifit" data-act="eiopen" data-id="${d.id}">${i(eit('fits',{t:eit('ctr',{n:mt.c.co||mt.c.title||'—'})}))}${o.newP?' · '+i(vaEur(o.newP)):''}</button>`:''}</div>`}
egScreen=function(){const L2=egList(),tab=m.egTab||'neu',N=L2.filter(x=>x.s==='ok'),C=L2.filter(x=>x.s!=='ok'),D=eiDone(),A=eiArch();
 const tabs=[['neu',N.length],['chk',C.length],['done',D.length],['arch',A.length]];
 const body=tab==='chk'?C.map(x=>eiRow(x.d,x)).join(''):tab==='done'?D.map(d=>eiRow(d)).join(''):tab==='arch'?A.map(d=>eiRow(d)).join(''):N.map(x=>eiRow(x.d,x)).join('');
 return`<div class="screen dhome egw eiw"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(egt('t'))}</h2></div><button type="button" class="iconbtn eilogb" data-act="eilog" aria-label="${i(eit('log'))}">🕘</button></div>
 <div class="eitabs">${tabs.map(([k,n])=>`<button type="button" class="${tab===k?'on':''}" data-act="egtab" data-k="${k}">${i(eit(k))}${n?' '+n:''}</button>`).join('')}</div>
 ${body?`<div class="eil">${body}</div>`:`<div class="vacard"><p class="dhnone">${i(tab==='neu'&&!L2.length?egt('empty'):eit('none'))}</p></div>`}
 ${tab==='neu'&&N.length?`<button type="button" class="egall" data-act="egall">${i(egt('confAll',{n:N.length}))}</button>`:''}
 ${typeof bdOn==="function"&&bdOn()?"":`<button type="button" class="vaadd" data-act="stcap">${i(eit('add'))}</button>`}<p class="vanote">${i(eit('many'))}</p>
 <button type="button" class="valnk" data-act="eilog">🕘 ${i(eit('log'))}</button></div>`};
/* confirm from the list also writes the journal */

Hooks.act('egok',d=>eiConfirm([d.id]));Hooks.act('egall',()=>eiConfirm(egList().filter(x=>x.s==='ok').map(x=>x.d.id)));
function eiConfirm(ids){const D=Ke().items.filter(d=>ids.includes(d.id));D.forEach(d=>{d.ok=1;d.okTs=Date.now();eiAddLog('ok',eit('l_ok',{t:d.title||'—'}),{doc:d.id})});$();v();try{lnqBar(egt('done',{n:D.length}),()=>{D.forEach(d=>{delete d.ok;delete d.okTs});eiLogD().forEach(x=>{if(x.k==='ok'&&D.some(d=>d.id===(x.u||{}).doc))x.done=1});$();v()})}catch{T(eit('okN',{n:D.length}))}}
/* ---------- the card ---------- */
let eiSel=null;
function eiCard(d){const o=eiRead(d),mt=eiMatch(d,o),c=mt&&mt.c;let fold='';try{fold=we('c_'+ho(d))}catch{}
 const inv=o.kind==='inv',dueOk=o.due&&vaDays(o.due)>=1,remD=dueOk?(vaDays(o.due)>=3?vaAdd(o.due,-2):vaIso(0)):'';
 const S=m.eiOpt||(m.eiOpt={link:!!c,rem:!!(dueOk&&o.amt),aus:!!(o.amt&&inv&&!c),price:!!(c&&o.newP&&o.newFrom),task:!1});
 const opt=(k,on,t,s,dis)=>`<label class="eiopt${dis?' dis':''}"><input type="checkbox" data-eio="${k}" ${on?'checked':''} ${dis?'disabled':''}><span class="eick"></span><span><b>${i(t)}</b>${s?`<small>${i(s)}</small>`:''}</span></label>`;
 const cn=c?(c.co||c.title||'—'):'';
 return`<div class="screen dhome egw eiw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(inv?eit('kInv'):o.kind==='let'?eit('kLet'):eit('kT'))}</h2></div><span></span></div>
 <div class="vacard eihead"><div class="eihd"><span class="eiic big">${inv?'🧾':o.kind==='let'?'✉️':'📄'}</span><span><b>${i(d.title||'—')}</b>${o.party?`<small>${i(o.party)}</small>`:''}</span></div>
  ${o.amt?`<div class="varow"><span class="vatx"><b>${i(eit('amt'))}</b>${o.amtL?`<small>${i(eit('amtS',{l:o.amtL}))}</small>`:''}</span><span class="vaam">${i(vaEur(o.amt))}</span></div>`:''}
  ${o.due?`<div class="varow"><span class="vatx"><b>${i(eit('dueT'))}</b></span><span class="vaam">${i(vaDate(o.due))}</span></div>`:''}
  ${o.num?`<div class="varow"><span class="vatx"><b>${i(eit('num'))}</b>${mt&&mt.why==='num'?`<small>${i(eit('numOk',{n:cn}))}</small>`:''}</span><span class="vaam">${i(o.num)}</span></div>`:''}
  ${o.newP?`<div class="varow"><span class="vatx"><b>${i(eit('newP'))}</b>${o.newFrom?`<small>${i(eit('newPS',{d:vaDate(o.newFrom)}))}</small>`:''}</span><span class="vaam vaup">${i(vaEur(o.newP))}</span></div>`:''}
  <button type="button" class="varow" data-act="dzopen" data-id="${d.id}"><span class="vatx"><b>${i(eit('fold'))}</b><small>${i(fold)}</small></span><span class="vaam eichg">${i(eit('chg'))} ›</span></button></div>
 <h3 class="vash">${i(eit('sug'))}</h3><div class="vacard eiopts">
  ${c?opt('link',S.link,eit('o_link',{n:cn}),mt.why==='num'?eit('o_linkS'):eit('o_linkS2')):''}
  ${c&&o.newP&&o.newFrom?opt('price',S.price,eit('o_price'),eit('o_priceS',{a:vaEur(o.newP),d:vaDate(o.newFrom)})):''}
  ${dueOk&&o.amt?opt('rem',S.rem,eit('o_rem'),eit('o_remS',{d:vaDate(remD)})):''}
  ${o.amt?opt('aus',S.aus&&!(S.link&&c),eit('o_aus'),S.link&&c?eit('o_ausNo'):eit('o_ausS',{a:vaEur(o.amt),c:vat('c_'+eiCat(d,o))}),!!(S.link&&c)):''}
  ${opt('task',S.task,eit('o_task'),eit('o_taskS',{t:d.title||'—'}))}</div>
 <button type="button" class="vaadd" data-act="eigo" data-id="${d.id}">${i(eit('confirm'))}</button>
 <p class="vanote">${i(eit('noAuto'))}</p>
 <div class="vabtns"><button type="button" class="vabtn" data-act="dzopen" data-id="${d.id}">${i(eit('open'))}</button><button type="button" class="vabtn" data-act="eiarch" data-id="${d.id}">${i(eit('archB'))}</button></div></div>`}
const eiCat=(d,o)=>{const t=[d.title,o.party,eiTxt(d).slice(0,300)].join(' ');try{const c=vaGuess(t);if(c!=='sonst')return c}catch{}return/kfz|werkstatt|tüv|auto/i.test(t)?'auto':/arzt|apotheke|praxis/i.test(t)?'drog':'sonst'};
['eik','eij'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});try{AG_R.includes('eing')||AG_R.push('eing')}catch{}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='eik'){const d=eiSel&&Ke().items.find(x=>x.id===eiSel);if(!d){setTimeout(()=>R('eing',void 0,!0),0);return'<div class="screen"></div>'}return eiCard(d)}if(m.route==='eij')return eiJournal()}catch(e){Hooks.err('eiscreen',e)}});
Hooks.act('eiopen',d=>{eiSel=d.id;m.eiOpt=null;const doc=Ke().items.find(x=>x.id===d.id);R('eik');try{if(doc&&doc.hasText&&!(Fa.text&&Fa.text[doc.id]!=null)&&typeof vl==='function')vl(doc).then(()=>{if(m.route==='eik'&&eiSel===doc.id){m.eiOpt=null;v()}})}catch{}});
document.addEventListener('change',e=>{try{const c=e.target.closest&&e.target.closest('[data-eio]');if(!c||m.route!=='eik'||!m.eiOpt)return;m.eiOpt[c.dataset.eio]=c.checked;if(c.dataset.eio==='link')v()}catch{}},!0);
Hooks.act('eigo',dd=>{const d=Ke().items.find(x=>x.id===dd.id);if(!d)return;const o=eiRead(d),mt=eiMatch(d,o),c=mt&&mt.c,S=m.eiOpt||{},nm=d.title||'—';let n=0;
 try{if(S.link&&c){const prev=d.ctr;d.ctr=c.id;eiAddLog('link',eit('l_link',{t:nm,n:c.co||c.title||'—'}),{doc:d.id,prev});n++}
  if(S.price&&c&&o.newP&&o.newFrom){c.prices=Array.isArray(c.prices)?c.prices:[];if(!c.prices.some(p=>p.from===o.newFrom)){const per='m';c.prices.push({from:o.newFrom,amt:o.newP,per});eiAddLog('price',eit('l_price',{a:vaEur(o.newP),n:c.co||'—'}),{ctr:c.id,from:o.newFrom});n++}}
  if(S.rem&&o.due&&o.amt){const due=vaDays(o.due)>=3?vaAdd(o.due,-2):vaIso(0),t=eit('remT',{t:nm,a:vaEur(o.amt)}),id=V();g.tasks=Array.isArray(g.tasks)?g.tasks:[];g.tasks.push({id,t,due,done:!1,ts:Date.now()});eiAddLog('rem',eit('l_rem',{d:vaDate(due),t:nm}),{task:id});n++}
  if(S.aus&&!(S.link&&c)&&o.amt){const id=V();vaAD().e.push({id,d:(o.due&&o.due<=vaIso(0))?o.due:vaIso(0),a:o.amt,c:eiCat(d,o),w:o.party||nm,ts:Date.now(),doc:d.id});eiAddLog('aus',eit('l_aus',{a:vaEur(o.amt)}),{aus:id});n++}
  if(S.task){const id=V();g.tasks=Array.isArray(g.tasks)?g.tasks:[];g.tasks.push({id,t:eit('taskT',{t:nm}),due:vaIso(7),done:!1,ts:Date.now()});eiAddLog('task',eit('l_task',{t:nm}),{task:id});n++}
  d.ok=1;d.okTs=Date.now();eiAddLog('ok',eit('l_ok',{t:nm}),{doc:d.id});$();T(eit('okN',{n:n+1}));m.eiOpt=null;eiSel=null;const h=m.hist||[];if(h.length&&h[h.length-1].route==='eing')h.pop();R('eing',void 0,!0)}catch(e){Hooks.err('eigo',e)}});
Hooks.act('eiarch',dd=>{const d=Ke().items.find(x=>x.id===dd.id);if(!d)return;d.ok=1;d.arch=1;d.okTs=d.okTs||Date.now();eiAddLog('arch',eit('l_arch',{t:d.title||'—'}),{doc:d.id});$();eiSel=null;R('eing',void 0,!0)});
/* ---------- the journal ---------- */
const EI_IC={move:'📁',new:'✨',kauf:'🛍',vg:'📂',link:'🔗',price:'▲',rem:'⏰',aus:'💶',task:'✓',ok:'📥',arch:'🗄'};
function eiJournal(){const L2=eiLogD(),day=ts=>{const a=new Date(ts);a.setHours(0,0,0,0);const n=new Date();n.setHours(0,0,0,0);const k=Math.round((n-a)/864e5);return k===0?'today':k===1?'yest':'earlier'};
 const grp=['today','yest','earlier'].map(k=>[k,L2.filter(x=>day(x.ts)===k)]).filter(x=>x[1].length);
 const tm=ts=>new Date(ts).toLocaleTimeString(he(),{hour:'2-digit',minute:'2-digit'});
 return`<div class="screen dhome egw eiw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(eit('log'))}</h2></div><span></span></div>
 ${grp.length?grp.map(([k,A])=>`<h3 class="vash">${i(eit(k))}</h3><div class="vacard">${A.map(x=>`<div class="varow"><span class="vaic">${EI_IC[x.k]||'•'}</span><span class="vatx"><b>${i(x.t)}</b><small>${i(k==='earlier'?vaDate(new Date(x.ts).toISOString().slice(0,10)):tm(x.ts))}${x.k==='ok'||x.k==='link'?' · '+i(eit('byYou')):''}</small></span>${x.done?`<span class="vaam vamut">${i(eit('undone'))}</span>`:`<button type="button" class="eiundo" data-act="eiundo" data-id="${x.id}">${i(eit('undo'))}</button>`}</div>`).join('')}</div>`).join(''):`<div class="vacard"><p class="dhnone">${i(eit('none'))}</p></div>`}
 <p class="vanote">${i(eit('keep90'))}</p></div>`}
Hooks.act('eilog',()=>R('eij'));
Hooks.act('eiundo',dd=>{const x=eiLogD().find(z=>z.id===dd.id);if(!x||x.done)return;const u=x.u||{},doc=u.doc&&Ke().items.find(z=>z.id===u.doc);
 try{if(x.k==='link'&&doc){if(u.prev)doc.ctr=u.prev;else delete doc.ctr}
  if(x.k==='price'){const c=vaContracts().find(z=>z.id===u.ctr);if(c)c.prices=(c.prices||[]).filter(p=>p.from!==u.from)}
  if((x.k==='rem'||x.k==='task')&&Array.isArray(g.tasks))g.tasks=g.tasks.filter(t=>t.id!==u.task);
  if(x.k==='aus')vaAD().e=vaAD().e.filter(z=>z.id!==u.aus);
  if(x.k==='ok'&&doc){delete doc.ok;delete doc.okTs}
  if(x.k==='arch'&&doc){delete doc.arch;delete doc.ok}
  if(x.k==='move'&&doc){doc.folder=u.prev||'';doc.rlx=doc.rlx||'undo'}
  if(x.k==='new'||x.k==='kauf'||x.k==='vg'){const col=x.k==='kauf'?'kauf':x.k==='vg'?'vg':u.col;if(col==='tx'){try{const F=U();F.tx=F.tx.filter(z=>z.id!==u.id)}catch{}}else if(col&&Array.isArray(g[col]))g[col]=g[col].filter(z=>z.id!==u.id)}
  x.done=1;$();v();T(eit('undone'))}catch(e){Hooks.err('eiundo',e)}});
Hooks.css('docs-eingang-smart',`
.eitabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;background:var(--bd-glass,var(--surface));border:1px solid var(--bd-edge,var(--line));border-radius:16px;padding:4px;margin:0 0 12px}
.eitabs button{border:0;background:none;border-radius:12px;padding:9px 2px;font-weight:600;font-size:13.5px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.eitabs .on{background:var(--bd-acc,var(--green));color:#fff}html[data-bd=dunkel] .eitabs .on{color:#062424}
.eil{display:flex;flex-direction:column;gap:10px;margin-bottom:12px}.eir{background:var(--bd-glass,var(--surface));border:1px solid var(--bd-edge,var(--line));border-radius:20px;padding:6px 14px}
.eim{display:flex;align-items:center;gap:12px;width:100%;border:0;background:none;text-align:left;padding:8px 0;color:var(--ink)}.eiic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex:none;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 12%,transparent)}
.eiic.big{width:52px;height:64px;font-size:26px}.eitx{flex:1;min-width:0}.eitx b{display:block;font-size:16px}.eitx small{display:block;color:var(--muted);font-size:13px}
.eim{padding-right:2px}.eis{flex:none;font-style:normal;font-size:12px;font-weight:700;border-radius:10px;padding:3px 8px;white-space:nowrap}.eis.ok{background:color-mix(in srgb,var(--bd-acc,#1f7a63) 15%,transparent);color:var(--bd-acc,var(--green))}.eis.chk{background:#e8eaf0;color:#556}.eis.dup,.eis.pr{background:#fdebd0;color:#b9770e}
.eifit{display:block;width:100%;text-align:left;border:0;border-top:1px solid var(--line);background:none;padding:7px 0 4px;font-size:12.5px;color:var(--bd-acc,var(--green))!important;font-weight:600}
.eihd{display:flex;gap:12px;align-items:center;padding:8px 0}.eihd b{display:block;font-size:18px}.eihd small{color:var(--muted);font-size:14px}.eichg{color:var(--bd-acc,var(--green))!important}
.eiopt{display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line);font-size:15px}.eiopt:last-child{border:0}.eiopt input{position:absolute;opacity:0;pointer-events:none}
.eick{width:24px;height:24px;border-radius:7px;border:2px solid var(--bd-edge,#bbb);flex:none;display:grid;place-items:center}.eiopt input:checked+.eick{background:var(--bd-acc,var(--green));border-color:transparent}.eiopt input:checked+.eick:after{content:'✓';color:#fff;font-size:14px;font-weight:700}
.eiopt b{display:block;font-weight:600}.eiopt small{display:block;color:var(--muted);font-size:13px}.eiopt.dis{opacity:.55}
.eiundo{border:0;background:none;color:var(--bd-acc,var(--green))!important;font-weight:600;font-size:13px;white-space:nowrap}.eilogb{font-size:18px}
`);
