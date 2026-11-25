/* ===== Butler Docs: stage 1 of BUTLER 2.0 — contracts & subscriptions, price rises, expenses (v74) =====
   Finanzen gets three tabs: Steuer-Mappe · Verträge · Ausgaben.
   Verträge: «Feste Kosten» per month and year (contracts and subscriptions apart), a card for every price rise
   (old → new price, +%, extra per year, «kündigen bis» = the day before the new price, please check), «Bald kündbar»
   in one calm card, a filter Alle · Verträge · Abos, the list with a clear icon per contract.
   A price rise = the newest price of a contract (from up to 120 days ago or in the future) is higher per month than
   the one before. «Behalten» hides the card (g.vaOk[key]); «Kündigung vorbereiten» opens a ready letter (route vakd):
   send with one's own mail app, save as PDF or copy; after sending Butler adds a task «Bestätigung prüfen» in 14 days.
   The rise is also shown first in «Wichtig für Sie» on Start and as a deadline in «Fristen».
   Ausgaben: only spending, no income, no bank. Month total = own entries + the fixed costs of the contracts;
   comparison with the month before, categories with bars, the last entries, «＋ Ausgabe» (amount, category, where,
   date), optional CSV import of a bank statement (only minus amounts, doubles skipped).
   Abo or contract: g-flag e.abo (1/0) set on the contract screen; without it a name list decides (Netflix, Spotify …).
   Data: g.aus = {e:[{id,d:'YYYY-MM-DD',a:cents,c:cat,w:text}]}, g.vaOk = {key:1}, m.vaF filter, m.vaM month offset */
const vaS={
 tStm:['Налоги','Steuer-Mappe','Tax folder'],tV:['Договоры','Verträge','Contracts'],tA:['Расходы','Ausgaben','Spending'],
 fix:['Постоянные расходы','Feste Kosten','Fixed costs'],perM:['%a / мес.','%a / Monat','%a / month'],perY:['%a в год','%a im Jahr','%a a year'],
 nV:['Договоров: %n · %a','%n Verträge · %a','%n contracts · %a'],nA:['Подписок: %n · %a','%n Abos · %a','%n subscriptions · %a'],
 rise:['Цена выросла','Preiserhöhung erkannt','Price rise found'],riseS:['Цена растёт','Preis steigt','Price goes up'],
 from:['с %d','ab %d','from %d'],extra:['+%a в год','+%a im Jahr','+%a a year'],
 sk:['Расторгнуть из-за повышения можно до %d (проверьте в письме)','Sonderkündigung möglich bis %d (bitte prüfen)','Early cancellation possible until %d (please check)'],
 prep:['Подготовить расторжение','Kündigung vorbereiten','Prepare cancellation'],keep:['Оставить','Behalten','Keep'],
 soon:['Скоро можно расторгнуть','Bald kündbar','Can be cancelled soon'],kbD:['до %d · %k дн.','bis %d · %k Tage','by %d · %k days'],
 all:['Все %n','Alle %n','All %n'],fV:['Договоры %n','Verträge %n','Contracts %n'],fA:['Подписки %n','Abos %n','Subscriptions %n'],
 abo:['Подписка','Abo','Sub'],mon:['ежемесячно','monatlich','monthly'],any:['можно расторгнуть в любой момент','jederzeit kündbar','cancel any time'],
 yr:['в год %a','jährlich %a','%a a year'],since:['с %y','seit %y','since %y'],kbS:['расторгнуть до %d','kündbar bis %d','cancel by %d'],
 add:['＋ Договор или подписка','＋ Vertrag oder Abo','＋ Contract or subscription'],
 onlyHere:['Всё хранится только на этом телефоне. Батлер только показывает — решаете Вы.','Alles bleibt nur auf diesem Telefon. Butler zeigt nur – Sie entscheiden.','Everything stays on this phone only. Butler only shows – you decide.'],
 none:['Договоров пока нет. Нажмите «＋ Договор или подписка»: страховка, свет, телефон, интернет, спорт, Netflix …','Noch keine Verträge. Tippen Sie auf „＋ Vertrag oder Abo“ – Versicherung, Strom, Handy, Internet, Sport, Netflix …','No contracts yet. Tap “＋ Contract or subscription” – insurance, power, phone, internet, gym, Netflix …'],
 /* price rise screen */
 prT:['Повышение цены','Preiserhöhung','Price rise'],more:['Доплата','Mehrkosten','Extra cost'],moreS:['в месяц / в год','pro Monat / pro Jahr','per month / per year'],
 until:['Расторгнуть до','Kündigen bis','Cancel by'],untilS:['досрочно из-за повышения','Sonderkündigung wegen Preiserhöhung','early, because of the price rise'],left:['осталось %n дн.','noch %n Tage','%n days left'],
 sinceT:['Договор с','Vertrag seit','Contract since'],no:['№','Nr.','No.'],what:['Что сделать?','Was möchten Sie tun?','What would you like to do?'],
 prepS:['Готовое письмо — Вы проверяете и отправляете','Fertiger Brief, Sie prüfen und senden','A ready letter, you check and send'],
 rem:['Напомнить','Erinnern','Remind me'],remS:['%a и %b','am %a und am %b','on %a and %b'],keepS:['новая цена принимается','neuer Preis wird übernommen','the new price is accepted'],
 remOk:['Напоминания добавлены в задачи','Erinnerungen angelegt','Reminders added'],keepOk:['Хорошо, договор остаётся','Gut, der Vertrag bleibt','Fine, the contract stays'],
 remT:['%n: решить о расторжении (до %d)','%n: über Kündigung entscheiden (bis %d)','%n: decide about cancelling (by %d)'],
 law:['Пожалуйста, проверьте срок в письме фирмы. Батлер не даёт юридических советов.','Bitte prüfen Sie die Frist im Brief des Anbieters. Butler gibt keine Rechtsberatung.','Please check the deadline in the provider’s letter. Butler gives no legal advice.'],
 /* letter */
 kT:['Расторжение','Kündigung','Cancellation'],
 kSubj:['Kündigung – %n','Kündigung – %n','Kündigung – %n'],kSubjS:['Sonderkündigung – %n','Sonderkündigung – %n','Sonderkündigung – %n'],
 hl:['Жёлтым — то, что Батлер взял из Ваших данных. Нажмите на текст, чтобы изменить.','Gelb markiert: von Butler aus Ihren Unterlagen eingesetzt. Tippen zum Ändern.','Yellow: filled in by Butler from your data. Tap the text to change it.'],
 mail:['Отправить моей почтой','Mit meiner Mail senden','Send with my mail'],mailS:['откроется Ваше почтовое приложение','öffnet Ihre Mail-App','opens your mail app'],
 pdf:['Сохранить как PDF','Als PDF speichern','Save as PDF'],pdfS:['для печати или загрузки','zum Drucken oder Hochladen','to print or upload'],
 copy:['Скопировать текст','Text kopieren','Copy text'],copyS:['для формы на сайте','für das Kontaktformular','for the contact form'],copied:['Текст скопирован','Text kopiert','Text copied'],
 after:['После отправки Батлер напомнит через 14 дней проверить подтверждение.','Nach dem Senden erinnert Butler Sie in 14 Tagen an die Bestätigung.','After sending, Butler reminds you in 14 days to check the confirmation.'],
 chkT:['%n: проверить подтверждение расторжения','%n: Kündigungsbestätigung prüfen','%n: check the cancellation confirmation'],
 sent:['Отмечено: расторжение отправлено','Vermerkt: Kündigung gesendet','Noted: cancellation sent'],
 /* expenses */
 ausM:['Расходы · %m','Ausgaben %m','Spending · %m'],vs:['%m: %a','%m: %a','%m: %a'],fixS:['Постоянные %a','Feste Kosten %a','Fixed %a'],ownS:['Внесено %a','Eingetragen %a','Entered %a'],
 aAdd:['＋ Расход','＋ Ausgabe','＋ Expense'],wof:['На что','Wofür','What for'],last:['Последние','Zuletzt','Latest'],auto:['автоматически','automatisch','automatic'],
 csv:['Загрузить выписку (CSV) — по желанию','Kontoauszug laden (CSV) – freiwillig','Load bank statement (CSV) – optional'],
 ausNote:['Только расходы — без доходов и без банка. Всё хранится на этом телефоне.','Nur Ausgaben, ohne Einnahmen und ohne Bankverbindung. Alles bleibt auf diesem Telefon.','Spending only, no income and no bank connection. Everything stays on this phone.'],
 ausNone:['В этом месяце ещё ничего не внесено. Нажмите «＋ Расход» — сумма, категория, готово.','In diesem Monat noch nichts eingetragen. „＋ Ausgabe“ – Betrag, Kategorie, fertig.','Nothing entered this month yet. “＋ Expense” – amount, category, done.'],
 newA:['Новый расход','Neue Ausgabe','New expense'],editA:['Расход','Ausgabe','Expense'],amt:['Сумма','Betrag','Amount'],date:['Дата','Datum','Date'],
 wo:['Где? (по желанию) — например, REWE','Wo? (freiwillig) – z. B. REWE','Where? (optional) – e.g. REWE'],save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],
 needA:['Впишите сумму','Bitte einen Betrag eintragen','Please enter an amount'],quick:['Сумма, категория — готово.','Betrag eintippen, Kategorie tippen, fertig.','Type the amount, tap a category, done.'],
 csvOk:['Загружено расходов: %n (повторы пропущены: %k)','%n Ausgaben übernommen (%k doppelte übersprungen)','%n expenses imported (%k doubles skipped)'],csvNo:['В файле не найдено расходов','In der Datei wurden keine Ausgaben gefunden','No expenses found in the file'],
 c_leb:['Продукты','Lebensmittel','Groceries'],c_tank:['Бензин','Tanken','Fuel'],c_rest:['Кафе','Restaurant','Restaurant'],c_kleid:['Одежда','Kleidung','Clothes'],
 c_drog:['Аптека, косметика','Drogerie','Drugstore'],c_haus:['Дом','Haushalt','Household'],c_gesch:['Подарки','Geschenke','Gifts'],c_auto:['Машина','Auto','Car'],
 c_frei:['Досуг','Freizeit','Leisure'],c_sonst:['Прочее','Sonstiges','Other'],c_fix:['Договоры и подписки','Verträge & Abos','Contracts & subs'],
 asAbo:['Считать подпиской','Als Abo zählen','Count as subscription'],asAboS:['в «Финансах» отдельно от договоров','in „Finanzen“ getrennt von Verträgen','shown apart from contracts in “Finances”']};
const vat=(k,o)=>{let s=cv5n(vaS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const VA_CAT=[['leb','🛒'],['tank','⛽'],['rest','🍽'],['kleid','👕'],['drog','🧴'],['haus','🏠'],['gesch','🎁'],['auto','🚗'],['frei','🎉'],['sonst','•']];
const vaCi=c=>(VA_CAT.find(x=>x[0]===c)||['','•'])[1];
const VA_ABO_RX=/netflix|spotify|disney|prime video|amazon prime|dazn|sky\b|apple ?(tv|music|one)|youtube|audible|kindle|fitness|gym|mcfit|clever ?fit|urban sports|zeitung|magazin|abo\b|abonnement|icloud|google one|dropbox|microsoft 365|office 365|playstation|xbox|nintendo|chatgpt|claude|deezer|tidal|joyn|rtl\+|wow\b|paramount/i;
const VA_IC=[[/strom|energie|stadtwerke|eon|e\.on|vattenfall|enbw|yello/i,'⚡'],[/gas\b|erdgas|heiz/i,'🔥'],[/wasser/i,'💧'],[/kfz|auto|car|fahrzeug/i,'🚗'],
 [/internet|dsl|glasfaser|gigacube|vodafone|telekom|o2|1&1|congstar|handy|mobil|telefon/i,'📶'],[/netflix|disney|dazn|sky|kino|prime video|joyn|paramount/i,'🎬'],[/spotify|music|deezer|tidal|audible/i,'🎵'],
 [/fitness|gym|mcfit|sport/i,'🏋️'],[/zeitung|magazin|news/i,'📰'],[/miete|wohnung|vermiet/i,'🏠'],[/haftpflicht|versicherung|hausrat|kranken|leben|unfall|rechtsschutz|allianz|huk|ergo|axa|devk/i,'🛡'],[/kredit|darlehen|leasing/i,'🏦']];
const vaIcon=e=>{const t=[e.co,e.title,e.cat].filter(Boolean).join(' ');const f=VA_IC.find(([r])=>r.test(t));return f?f[1]:'📄'};
const vaIso=d=>{const a=new Date();a.setHours(12,0,0,0);a.setDate(a.getDate()+(d||0));return a.toISOString().slice(0,10)};
const vaAdd=(k,d)=>{const a=new Date(k+'T12:00:00');a.setDate(a.getDate()+d);return a.toISOString().slice(0,10)};
const vaDays=k=>{try{const a=new Date();a.setHours(0,0,0,0);return Math.round((new Date(k+'T00:00:00')-a)/864e5)}catch{return 999}};
const vaDate=k=>{try{return typeof vA==='function'?vA(k):new Date(k+'T00:00:00').toLocaleDateString(he())}catch{return k}};
const vaEur=c=>fzEur(c);
const vaContracts=()=>{try{return Pt().filter(e=>!Kt(e))}catch{return[]}};
const vaIsAbo=e=>e.abo===1||(e.abo!==0&&VA_ABO_RX.test([e.co,e.title].filter(Boolean).join(' ')));
const vaMo=(e,p)=>{try{return p?p.amt/((typeof zl!=='undefined'&&zl[p.per||e.per||'m'])||1):or(e)}catch{return 0}};
const vaOkD=()=>{if(!g.vaOk||typeof g.vaOk!=='object')g.vaOk={};return g.vaOk};
/* the newest price is higher than the one before → a rise */
function vaRise(e){let P=[];try{P=qr(e)}catch{}if(P.length<2)return null;const L=P[P.length-1],Pr=P[P.length-2];if(!L.from||L.from<vaIso(-120))return null;
 const a=vaMo(e,Pr),b=vaMo(e,L);if(!(b>a)||!(a>0))return null;const key=e.id+'|'+L.from;
 return{e,key,old:a,neu:b,pct:(b/a-1)*100,from:L.from,dl:L.from>vaIso(0)?vaAdd(L.from,-1):null,ok:!!vaOkD()[key]}}
const vaRises=()=>vaContracts().map(vaRise).filter(r=>r&&!r.ok&&!(r.e.kuend&&r.e.kuend.d));
const vaPct=p=>(Math.round(p*10)/10).toLocaleString(he(),{minimumFractionDigits:1})+' %';
function vaRows(){return vaContracts().map(e=>{let kb=null,nm='';try{kb=uc(e)}catch{}nm=e.co||e.title||'—';return{e,mo:vaMo(e),kb,nm,abo:vaIsAbo(e),r:vaRise(e)}}).sort((a,b)=>b.mo-a.mo)}
const vaYr=e=>e.start?String(e.start).slice(0,4):'';
function vaRiseCard(r){return`<div class="vacard varise"><div class="vart">▲ ${i(vat('rise'))}</div><h3>${i(r.e.co||r.e.title||'—')}</h3>
 <div class="vabig">${i(vaEur(r.old))} → ${i(vaEur(r.neu))}<em>+${i(vaPct(r.pct))}</em></div><p>${i(vat('from',{d:vaDate(r.from)}))} · ${i(vat('extra',{a:vaEur((r.neu-r.old)*12)}))}</p>
 ${r.dl&&vaDays(r.dl)>=0?`<p>${i(vat('sk',{d:vaDate(r.dl)}))}</p>`:''}
 <div class="vabtns"><button type="button" class="vabtn p" data-act="vakd" data-id="${i(r.e.id)}">${i(vat('prep'))}</button><button type="button" class="vabtn" data-act="vapr" data-id="${i(r.e.id)}">${i(vat('keep'))} …</button></div></div>`}
function vaKost(){const R2=vaRows(),f=m.vaF||'all',V2=R2.filter(r=>!r.abo),A2=R2.filter(r=>r.abo),sum=L2=>L2.reduce((a,b)=>a+b.mo,0),tot=sum(R2);
 const rises=R2.map(r=>r.r).filter(r=>r&&!r.ok&&!(r.e.kuend&&r.e.kuend.d));
 const soon=R2.filter(r=>r.kb&&vaDays(r.kb)>=0&&vaDays(r.kb)<=60).sort((a,b)=>a.kb.localeCompare(b.kb));
 const W=[];const byCat={};R2.forEach(r=>{const c=r.e.cat||'';if(String(c).startsWith('ins_')&&c!=='ins_other')(byCat[c]=byCat[c]||[]).push(r)});
 Object.values(byCat).filter(L2=>L2.length>1).forEach(L2=>{let lab='';try{lab=ve('c_'+L2[0].e.cat)}catch{lab=L2[0].e.cat}W.push(`<div class="vawarn">🔁 ${i(krt('dbl',{k:lab,n:L2.length}))}</div>`)});
 const na=R2.filter(r=>!r.mo);if(na.length)W.push(`<div class="vawarn">✎ ${i(krt('noAmt',{n:na.map(r=>r.nm).slice(0,4).join(', ')}))}</div>`);
 const L3=f==='v'?V2:f==='a'?A2:R2,yr=new Date().getFullYear();
 const row=r=>{const p=r.e.prices&&r.e.prices.length?(r.e.prices.slice().sort((a,b)=>(a.from||'').localeCompare(b.from||'')).pop()):null,per=p&&(p.per||r.e.per)==='y';
  const sub=[r.abo?(r.kb?vat('kbS',{d:vaDate(r.kb)}):vat('mon')+' · '+vat('any')):[(()=>{let c='';try{if(r.e.cat&&r.e.cat!=='ins_other'&&r.e.cat!=='other')c=pc(r.e).split(' · ').slice(1).join(' · ')}catch{}return c})(),r.kb?vat('kbS',{d:vaDate(r.kb)}):per?vat('yr',{a:vaEur(p.amt)}):vaYr(r.e)?vat('since',{y:vaYr(r.e)}):''].filter(Boolean).join(' · ')].join('');
  const rr=r.r&&!r.r.ok?`<small class="vaup">→ ${i(vaEur(r.r.neu))}</small>`:'';
  return`<button type="button" class="varow fzc" data-act="insopen" data-id="${i(r.e.id)}"><span class="vaic">${vaIcon(r.e)}</span><span class="vatx"><b>${i(r.nm)}${r.abo?`<span class="vatag">${i(vat('abo'))}</span>`:''}</b>${sub?`<small>${i(sub)}</small>`:''}</span><span class="vaam">${r.mo?i(vaEur(r.r&&r.r.from>vaIso(0)?r.r.old:r.mo)):'—'}${rr}</span></button>`};
 return`<div class="vahero"><small>${i(vat('fix'))}</small><b>${i(vat('perM',{a:vaEur(tot)}))}</b><small>${i(vat('perY',{a:vaEur(tot*12)}))}</small>
  <div class="vahs"><span>${i(vat('nV',{n:V2.length,a:vaEur(sum(V2))}))}</span><span>${i(vat('nA',{n:A2.length,a:vaEur(sum(A2))}))}</span></div></div>
 ${rises.map(vaRiseCard).join('')}
 ${soon.length?`<h3 class="vash">${i(vat('soon'))}</h3><div class="vacard vasoon">${soon.map(r=>`<button type="button" data-act="insopen" data-id="${i(r.e.id)}"><span>${i(r.nm)}</span><em>${i(vat('kbD',{d:vaDate(r.kb).replace(/\d{4}$/,''),k:vaDays(r.kb)}))}</em></button>`).join('')}</div>`:''}
 ${W.join('')}
 ${R2.length?`<div class="vachips"><button type="button" class="${f==='all'?'on':''}" data-act="vaf" data-k="all">${i(vat('all',{n:R2.length}))}</button><button type="button" class="${f==='v'?'on':''}" data-act="vaf" data-k="v">${i(vat('fV',{n:V2.length}))}</button><button type="button" class="${f==='a'?'on':''}" data-act="vaf" data-k="a">${i(vat('fA',{n:A2.length}))}</button></div>
  <div class="vacard valist">${L3.map(row).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(vat('none'))}</p></div>`}
 <button type="button" class="vaadd" data-act="insnew">${i(vat('add'))}</button>
 <div class="fztip"><b>ⓘ ${i(krt('tip'))}</b> ${i(krt('tipK'))}<small>${i(krt('chk'))}</small></div>
 <p class="vanote">${i(vat('onlyHere'))}</p>`}
try{krKost=vaKost}catch(e){Hooks.err('vakost',e)}
Hooks.act('vaf',d=>{m.vaF=d.k;v()});

/* ---------- Ausgaben ---------- */
const vaAD=()=>{const o=g.aus=g.aus&&typeof g.aus==='object'?g.aus:{};if(!Array.isArray(o.e))o.e=[];return o};
const vaMonKey=off=>{const a=new Date();a.setDate(1);a.setMonth(a.getMonth()+(off||0));return a.toISOString().slice(0,7)};
const vaMonName=k=>{try{return new Date(k+'-15T12:00:00').toLocaleDateString(he(),{month:'long'})}catch{return k}};
const vaFixOf=k=>{let s=0;vaContracts().forEach(e=>{try{const day=k+'-15';if(e.start&&e.start>day)return;if(e.end&&e.end<k+'-01')return;s+=or(e,day)}catch{}});return s};
const vaEntries=k=>vaAD().e.filter(x=>String(x.d||'').startsWith(k));
function vaAus(){const off=Math.min(0,m.vaM||0),k=vaMonKey(off),kp=vaMonKey(off-1),E=vaEntries(k),Ep=vaEntries(kp),fix=vaFixOf(k),fixP=vaFixOf(kp);
 const own=E.reduce((a,b)=>a+(+b.a||0),0),ownP=Ep.reduce((a,b)=>a+(+b.a||0),0),tot=own+fix,totP=ownP+fixP,dif=tot-totP;
 const by={},byP={};E.forEach(x=>by[x.c]=(by[x.c]||0)+(+x.a||0));Ep.forEach(x=>byP[x.c]=(byP[x.c]||0)+(+x.a||0));
 const cats=Object.keys(by).map(c=>({c,ic:vaCi(c),n:vat('c_'+c),a:by[c],p:byP[c]||0}));if(fix)cats.push({c:'fix',ic:'🔁',n:vat('c_fix'),a:fix,p:null});cats.sort((a,b)=>b.a-a.a);
 const mx=Math.max(1,...cats.map(x=>x.a)),pm=vaMonName(kp).slice(0,3);
 const last=E.slice().sort((a,b)=>String(b.d).localeCompare(String(a.d))||(b.ts||0)-(a.ts||0)).slice(0,6);
 const pct=totP?Math.round(dif/totP*100):0,sg=dif>0?'+':dif<0?'−':'±';
 return`<div class="vahero"><div class="vamnav"><button type="button" data-act="vam" data-d="-1" aria-label="‹">‹</button><small>${i(vat('ausM',{m:vaMonName(k)}))}</small><button type="button" data-act="vam" data-d="1" ${off>=0?'disabled':''} aria-label="›">›</button></div>
  <b>${i(vaEur(tot))}</b>${totP?`<small>${i(vat('vs',{m:vaMonName(kp),a:vaEur(totP)}))} · <strong>${sg}${i(vaEur(Math.abs(dif)))} (${sg}${Math.abs(pct)} %)</strong></small>`:''}
  <div class="vahs"><span>${i(vat('fixS',{a:vaEur(fix)}))}</span><span>${i(vat('ownS',{a:vaEur(own)}))}</span></div></div>
 <button type="button" class="vaadd" data-act="vanew">${i(vat('aAdd'))}</button>
 ${cats.length?`<h3 class="vash">${i(vat('wof'))}</h3><div class="vacard">${cats.map(x=>`<div class="varow vacat"><span class="vaic">${x.ic}</span><span class="vatx"><b>${i(x.n)}</b><span class="vabar"><i style="width:${Math.max(3,Math.round(x.a/mx*100))}%"></i></span></span><span class="vaam">${i(vaEur(x.a))}<small class="vamut">${x.p===null?i(vat('auto')):i(pm+' '+vaEur(x.p))}</small></span></div>`).join('')}</div>`:''}
 ${last.length?`<h3 class="vash">${i(vat('last'))}</h3><div class="vacard">${last.map(x=>`<button type="button" class="varow" data-act="vaed" data-id="${i(x.id)}"><span class="vaic">${vaCi(x.c)}</span><span class="vatx"><b>${i(x.w||vat('c_'+x.c))}</b><small>${i(vaDate(x.d))} · ${i(vat('c_'+x.c))}</small></span><span class="vaam">${i(vaEur(x.a))}</span></button>`).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(vat('ausNone'))}</p></div>`}
 <button type="button" class="valnk" data-act="vacsv">${i(vat('csv'))}</button><p class="vanote">${i(vat('ausNote'))}</p>`}
Hooks.act('vam',d=>{m.vaM=Math.min(0,(m.vaM||0)+(+d.d||0));v()});
const vaParseAmt=s=>{s=String(s||'').replace(/[€\s]/g,'');if(!s)return NaN;if(/,\d{1,2}$/.test(s))s=s.replace(/\./g,'').replace(',','.');else s=s.replace(/,/g,'');return Math.round(parseFloat(s)*100)};
function vaSheet(id){const x0=id&&vaAD().e.find(z=>z.id===id),x=x0?Object.assign({},x0):{d:vaIso(0),a:0,c:'leb',w:''};
 const sh=H(x0?vat('editA'):vat('newA'),`<div class="vash2"><input class="field vaamt" data-vf="a" inputmode="decimal" placeholder="0,00 €" value="${x.a?i((x.a/100).toLocaleString(he(),{minimumFractionDigits:2})):''}" aria-label="${i(vat('amt'))}">
  <div class="vagrid">${VA_CAT.map(([c,ic])=>`<button type="button" class="${x.c===c?'on':''}" data-vc="${c}"><span>${ic}</span>${i(vat('c_'+c))}</button>`).join('')}</div>
  <input class="field" data-vf="w" placeholder="${i(vat('wo'))}" value="${i(x.w||'')}" autocomplete="off">
  <label class="bsvl">${i(vat('date'))}</label><input class="field" type="date" data-vf="d" value="${i(x.d)}">
  <small class="verr" data-verr></small><button type="button" class="vaadd" data-vsave>${i(vat('save'))}</button>${x0?`<button type="button" class="bsvdel" data-vdel>${i(vat('del'))}</button>`:`<p class="vanote">${i(vat('quick'))}</p>`}</div>`,
 el=>{el.classList.add('bsvsh');let arm=0;setTimeout(()=>{try{x0||el.querySelector('.vaamt').focus()}catch{}},250);el.addEventListener('click',e=>{const c=e.target.closest('[data-vc]');
  if(c){x.c=c.dataset.vc;el.querySelectorAll('[data-vc]').forEach(b=>b.classList.toggle('on',b===c));return}
  if(e.target.closest('[data-vsave]')){const a=vaParseAmt(el.querySelector('[data-vf="a"]').value);if(!(a>0)){el.querySelector('[data-verr]').textContent=vat('needA');return}
   x.a=a;x.w=el.querySelector('[data-vf="w"]').value.trim();x.d=el.querySelector('[data-vf="d"]').value||vaIso(0);
   if(x0)Object.assign(x0,x);else{x.id=V();x.ts=Date.now();vaAD().e.push(x)}$();el.remove();v();return}
  if(e.target.closest('[data-vdel]')){if(!arm){arm=1;const b=e.target.closest('[data-vdel]');b.textContent=vat('delQ');b.classList.add('on');return}vaAD().e=vaAD().e.filter(z=>z.id!==id);$();el.remove();v()}})});return sh}
Hooks.act('vanew',()=>vaSheet());Hooks.act('vaed',d=>vaSheet(d.id));
/* CSV import: date; text; amount — only negative amounts are spending */
const VA_GUESS=[[/rewe|aldi|lidl|edeka|netto|penny|kaufland|real\b|norma|tegut|globus|bäcker|baecker|metzger/i,'leb'],[/aral|shell|esso|jet\b|total|tankstelle|agip|avia|star\b/i,'tank'],
 [/restaurant|pizza|mcdonald|burger|kfc|döner|doener|cafe|café|bistro|lieferando|wolt/i,'rest'],[/h&m|zara|c&a|primark|deichmann|zalando|about you|kik\b/i,'kleid'],[/\bdm\b|dm-drogerie|rossmann|müller|apotheke|douglas/i,'drog'],
 [/ikea|obi\b|bauhaus|hornbach|toom|hagebau|baumarkt|saturn|media ?markt|otto\b/i,'haus'],[/werkstatt|atu\b|reifen|tüv|tuev|dekra|kfz/i,'auto'],[/kino|theater|ticket|eventim|spiel|bahn|db\b|flixbus/i,'frei']];
const vaGuess=t=>{const f=VA_GUESS.find(([r])=>r.test(t||''));return f?f[1]:'sonst'};
function vaCsvParse(txt){const L2=String(txt||'').split(/\r?\n/).filter(l=>l.trim());if(!L2.length)return[];const sep=(L2.slice(0,5).join('').match(/;/g)||[]).length>(L2.slice(0,5).join('').match(/,/g)||[]).length/2?';':',';
 const split=l=>{const out=[];let cur='',q=!1;for(const ch of l){if(ch==='"'){q=!q;continue}if(ch===sep&&!q){out.push(cur.trim());cur='';continue}cur+=ch}out.push(cur.trim());return out};
 const out=[];for(const l of L2){const c=split(l);let d=null,a=NaN,t='';for(const f of c){if(!d){const m1=f.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/),m2=f.match(/^(\d{4})-(\d\d)-(\d\d)$/);if(m1){const y=m1[3].length===2?'20'+m1[3]:m1[3];d=`${y}-${m1[2].padStart(2,'0')}-${m1[1].padStart(2,'0')}`;continue}if(m2){d=f;continue}}
  if(isNaN(a)&&/^[+-−]?\s?[\d.]+(,\d{1,2})?\s?€?$|^[+-−]?\s?[\d,]+(\.\d{1,2})?\s?€?$/.test(f)&&/\d/.test(f)){const neg=/^[-−]/.test(f);const v2=vaParseAmt(f.replace(/^[+-−]\s?/,''));if(!isNaN(v2)){a=neg?-v2:v2;continue}}
  if(f.length>t.length&&/[a-zäöüß]/i.test(f))t=f}
  if(d&&!isNaN(a)&&a<0)out.push({d,a:-a,w:t.slice(0,60),c:vaGuess(t)})}return out}
Hooks.act('vacsv',()=>{const inp=document.createElement('input');inp.type='file';inp.accept='.csv,text/csv,text/plain';inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{const N=vaCsvParse(r.result);if(!N.length){T(vat('csvNo'));return}const have=new Set(vaAD().e.map(x=>x.d+'|'+x.a+'|'+String(x.w||'').toLowerCase()));let n=0,k=0;
  N.forEach(x=>{const key=x.d+'|'+x.a+'|'+x.w.toLowerCase();if(have.has(key)){k++;return}have.add(key);vaAD().e.push(Object.assign({id:V(),ts:Date.now(),csv:1},x));n++});$();v();T(vat('csvOk',{n,k}))};r.readAsText(f)};inp.click()});

/* ---------- three tabs in «Finanzen» ---------- */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='fzm'||(typeof fzCat!=='undefined'&&fzCat))return h;const k0=h.indexOf('<div class="fztabs">');if(k0<0)return h;
 const k1=h.indexOf('</div>',k0)+6,tab=fzD().tab==='kost'?'kost':fzD().tab==='aus'?'aus':'stm';
 const tabs=`<div class="fztabs vatabs">${[['stm','tStm'],['kost','tV'],['aus','tA']].map(([t,l])=>`<button type="button" class="${tab===t?'on':''}" data-act="fztab" data-k="${t}">${i(vat(l))}</button>`).join('')}</div>`;
 if(tab!=='aus')return h.slice(0,k0)+tabs+h.slice(k1);
 const e=h.lastIndexOf('</div>');return h.slice(0,k0)+tabs+vaAus()+h.slice(e)}catch(er){Hooks.err('vatabs',er);return h}});

/* ---------- price rise screen and the letter ---------- */
const vaC=id=>vaContracts().find(e=>e.id===id);
let vaSel=null;
function vaPrScreen(e){const r=vaRise(e);const back=`<div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(vat('prT'))}</h2></div><span></span></div>`;
 if(!r)return`<div class="screen dhome fz va">${back}<div class="vacard"><p class="dhnone">—</p></div></div>`;
 const dl=r.dl&&vaDays(r.dl)>=0?r.dl:null,a1=dl?vaAdd(dl,-14):null,a2=dl?vaAdd(dl,-3):null;
 return`<div class="screen dhome fz va">${back}
 <div class="vacard varise"><div class="vart">▲ ${i(vat('riseS'))}</div><h3>${i(e.co||e.title||'—')}</h3><div class="vabig">${i(vaEur(r.old))} → ${i(vaEur(r.neu))}<em>+${i(vaPct(r.pct))}</em></div><p>${i(vat('from',{d:vaDate(r.from)}))}</p></div>
 <div class="vacard"><div class="varow"><span class="vatx"><b>${i(vat('more'))}</b><small>${i(vat('moreS'))}</small></span><span class="vaam vaup">+${i(vaEur(r.neu-r.old))}<small>${i(vat('extra',{a:vaEur((r.neu-r.old)*12)}))}</small></span></div>
  ${dl?`<div class="varow"><span class="vatx"><b>${i(vat('until'))}</b><small>${i(vat('untilS'))}</small></span><span class="vaam">${i(vaDate(dl))}<small>${i(vat('left',{n:vaDays(dl)}))}</small></span></div>`:''}
  ${e.start||e.polno?`<div class="varow"><span class="vatx"><b>${i(vat('sinceT'))}</b><small>${i([e.start?vaDate(e.start):'',e.polno?vat('no')+' '+e.polno:''].filter(Boolean).join(' · '))}</small></span></div>`:''}</div>
 <h3 class="vash">${i(vat('what'))}</h3><div class="vacard">
  <button type="button" class="varow" data-act="vakd" data-id="${i(e.id)}"><span class="vaic">✉️</span><span class="vatx"><b>${i(vat('prep'))}</b><small>${i(vat('prepS'))}</small></span><span class="vaam">›</span></button>
  ${dl&&vaDays(a1)>=0?`<button type="button" class="varow" data-act="varem" data-id="${i(e.id)}"><span class="vaic">⏰</span><span class="vatx"><b>${i(vat('rem'))}</b><small>${i(vat('remS',{a:vaDate(a1),b:vaDate(a2)}))}</small></span><span class="vaam">›</span></button>`:''}
  <button type="button" class="varow" data-act="vaok" data-id="${i(e.id)}"><span class="vaic">✓</span><span class="vatx"><b>${i(vat('keep'))}</b><small>${i(vat('keepS'))}</small></span><span class="vaam">›</span></button></div>
 <p class="vanote">${i(vat('law'))}</p></div>`}
function vaLetter(e){const me=(()=>{try{return ja()}catch{return{}}})(),nm=[me.first,me.last].filter(Boolean).join(' ')||[(g.user||{}).first,(g.user||{}).last].filter(Boolean).join(' ')||'—',r=vaRise(e),de=g.lang==='de'||1;
 const DE=k=>new Date(k+'T12:00:00').toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}),today=DE(vaIso(0)),hl=s=>`<span class="vahl">${i(s)}</span>`;
 const subj=(r?'Sonderkündigung':'Kündigung')+(e.polno?' – Nr. '+e.polno:'');
 const body=r?`Ihre Preiserhöhung zum ${DE(r.from)} akzeptiere ich nicht. Hiermit kündige ich meinen Vertrag ${e.co||''} außerordentlich${r.dl?' zum '+DE(r.dl):''}, hilfsweise zum nächstmöglichen Zeitpunkt.`
  :`hiermit kündige ich meinen Vertrag ${e.co||''} fristgerecht zum nächstmöglichen Zeitpunkt.`;
 const plain=[nm,me.addr||'','',e.co||'','',today,'',subj,'','Sehr geehrte Damen und Herren,','',r?body:body.charAt(0).toUpperCase()+body.slice(1),'','Bitte bestätigen Sie mir die Kündigung und das Vertragsende schriftlich.','','Mit freundlichen Grüßen',nm].join('\n');
 const html=`${hl(nm)}${me.addr?'<br>'+hl(me.addr):''}<br><br>${hl(e.co||'—')}<br><br><span class="vard">${i(today)}</span><br><br><b>${i(r?'Sonderkündigung':'Kündigung')}${e.polno?' – Nr. '+hl(e.polno):''}</b><br><br>Sehr geehrte Damen und Herren,<br><br>${r?`Ihre Preiserhöhung zum ${hl(DE(r.from))} akzeptiere ich nicht. Hiermit kündige ich meinen Vertrag ${hl(e.co||'')} außerordentlich${r.dl?' zum '+hl(DE(r.dl)):''}, hilfsweise zum nächstmöglichen Zeitpunkt.`:`Hiermit kündige ich meinen Vertrag ${hl(e.co||'')} fristgerecht zum nächstmöglichen Zeitpunkt.`}<br><br>Bitte bestätigen Sie mir die Kündigung und das Vertragsende schriftlich.<br><br>Mit freundlichen Grüßen<br>${hl(nm)}`;
 return{subj,plain,html}}
function vaKdScreen(e){const L=vaLetter(e);
 return`<div class="screen dhome fz va"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(vat('kT'))}</h2></div><span></span></div>
 <div class="valtr" contenteditable="true" spellcheck="false" data-valtr>${L.html}</div><p class="vanote">${i(vat('hl'))}</p>
 <div class="vacard"><button type="button" class="varow" data-act="vamail" data-id="${i(e.id)}"><span class="vaic">📧</span><span class="vatx"><b>${i(vat('mail'))}</b><small>${i(vat('mailS'))}</small></span><span class="vaam">›</span></button>
  <button type="button" class="varow" data-act="vapdf" data-id="${i(e.id)}"><span class="vaic">📄</span><span class="vatx"><b>${i(vat('pdf'))}</b><small>${i(vat('pdfS'))}</small></span><span class="vaam">›</span></button>
  <button type="button" class="varow" data-act="vacopy" data-id="${i(e.id)}"><span class="vaic">📋</span><span class="vatx"><b>${i(vat('copy'))}</b><small>${i(vat('copyS'))}</small></span><span class="vaam">›</span></button></div>
 <p class="vanote">${i(vat('after'))}</p></div>`}
['vapr','vakd'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='vapr'||m.route==='vakd'){const e=vaSel&&vaC(vaSel);if(!e){setTimeout(()=>R('fzm',void 0,!0),0);return'<div class="screen"></div>'}return m.route==='vapr'?vaPrScreen(e):vaKdScreen(e)}}catch(er){Hooks.err('vascreen',er)}});
Hooks.act('vapr',d=>{vaSel=d.id;R('vapr')});Hooks.act('vakd',d=>{vaSel=d.id;R('vakd')});
const vaTask=(t,due)=>{try{g.tasks=Array.isArray(g.tasks)?g.tasks:[];if(g.tasks.some(x=>x&&!x.done&&x.t===t&&x.due===due))return;g.tasks.push({id:V(),t,due,done:!1,ts:Date.now()})}catch(e){Hooks.err('vatask',e)}};
Hooks.act('varem',d=>{const e=vaC(d.id),r=e&&vaRise(e);if(!r||!r.dl)return;const nm=e.co||e.title||'—';[vaAdd(r.dl,-14),vaAdd(r.dl,-3)].forEach(k=>{if(vaDays(k)>=0)vaTask(vat('remT',{n:nm,d:vaDate(r.dl)}),k)});$();T(vat('remOk'))});
Hooks.act('vaok',d=>{const e=vaC(d.id),r=e&&vaRise(e);if(r){vaOkD()[r.key]=1;$()}T(vat('keepOk'));R('fzm',void 0,!0)});
const vaText=()=>{const el=document.querySelector('[data-valtr]');if(!el)return'';const c=el.cloneNode(!0);c.querySelectorAll('br').forEach(b=>b.replaceWith('\n'));return c.textContent.replace(/\n{3,}/g,'\n\n').trim()};
const vaSent=e=>{if(!e)return;e.kuend={d:vaIso(0)};vaTask(vat('chkT',{n:e.co||e.title||'—'}),vaIso(14));$();T(vat('sent'))};
Hooks.act('vamail',d=>{const e=vaC(d.id);if(!e)return;const L=vaLetter(e),txt=vaText()||L.plain;location.href='mailto:?subject='+encodeURIComponent(L.subj)+'&body='+encodeURIComponent(txt);setTimeout(()=>vaSent(e),600)});
Hooks.act('vacopy',d=>{const e=vaC(d.id);if(!e)return;const txt=vaText()||vaLetter(e).plain;const ok=()=>T(vat('copied'));try{navigator.clipboard.writeText(txt).then(ok,()=>{})}catch{}});
Hooks.act('vapdf',async d=>{const e=vaC(d.id);if(!e)return;try{const txt=vaText()||vaLetter(e).plain;const P=[];let[c,x2]=fzPage();P.push(c);let yy=150;const ml=150,W2=FZ_W-ml-150;
 const wrap=(t,f)=>{x2.font=f;const out=[];for(const para of String(t).split('\n')){let line='';for(const w of para.split(/(\s+)/)){if(x2.measureText(line+w).width>W2&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line)}return out};
 for(const l of wrap(txt,'24px Georgia, serif')){if(yy>FZ_H-140){[c,x2]=fzPage();P.push(c);yy=150}x2.font='24px Georgia, serif';x2.fillStyle='#000';x2.fillText(l,ml,yy);yy+=36}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name='Kuendigung '+(e.co||'')+'.pdf',f=new File([blob],name,{type:'application/pdf'});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});vaSent(e);return}}catch(er){if(er&&er.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}vaSent(e)}catch(er){Hooks.err('vapdf',er)}});

/* ---------- Start «Wichtig für Sie» and «Fristen» ---------- */
try{const _dl=stDlAll;stDlAll=function(){const L2=_dl.apply(this,arguments);try{vaRises().forEach(r=>{if(r.dl)L2.push({src:'vapr',k:r.dl,t:vat('riseS')+': '+(r.e.co||r.e.title||'—'),act:`data-act="vapr" data-id="${r.e.id}"`,vaPct:r.pct,vaTxt:vaEur(r.old)+' → '+vaEur(r.neu)})});L2.sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:0)}catch(e){Hooks.err('vadl',e)}return L2}}catch(e){Hooks.err('vadl0',e)}
try{const _sl=sgList;sgList=function(){const L2=_sl.apply(this,arguments);try{const S=sgSt(),today=sgIso(0),seen=new Set(L2.map(sgKey));const add=[];
 stDlAll().filter(t=>t.src==='vapr').forEach(t=>{const s=S[sgKey(t)];if(s&&s.d)return;if(s&&s.s&&s.s>today)return;if(seen.has(sgKey(t)))return;add.push(t)});
 const P=L2.filter(t=>t.src==='vapr'),O=L2.filter(t=>t.src!=='vapr');return add.concat(P,O)}catch(e){Hooks.err('vasl',e);return L2}}}catch(e){Hooks.err('vasl0',e)}
Hooks.on('render',()=>{try{if(m.route!=='home'||!Array.isArray(m.sgL))return;m.sgL.forEach((t,j)=>{if(t.src!=='vapr')return;const b=document.querySelector(`.sgi[data-j="${j}"]`);if(!b)return;
 const p=b.querySelector('.sgp');if(p){p.className='sgp y vapill';p.textContent='▲ +'+vaPct(t.vaPct||0)}const s=b.querySelector('small');if(s&&t.vaTxt)s.textContent=t.vaTxt+' · '+vat('kbS',{d:vaDate(t.k)})})}catch(e){Hooks.err('vapill',e)}});

/* ---------- «Als Abo zählen» on the contract screen ---------- */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='ins'||!m.insid)return h;const e=vaContracts().find(z=>z.id===m.insid);if(!e)return h;const on=vaIsAbo(e);
 const b=`<button type="button" class="vaabot" data-act="vaabo" data-id="${i(e.id)}"><span><b>${i(vat('asAbo'))}</b><small>${i(vat('asAboS'))}</small></span><u class="${on?'on':''}"></u></button>`;const k=h.lastIndexOf('</div>');return h.slice(0,k)+b+h.slice(k)}catch(er){Hooks.err('vaabo',er);return h}});
Hooks.act('vaabo',d=>{const e=vaContracts().find(z=>z.id===d.id);if(!e)return;e.abo=vaIsAbo(e)?0:1;$();v()});

Hooks.css('docs-vertraege-abos',`
.vatabs{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:4px}.vatabs button{font-size:14px!important;padding:9px 2px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
html[data-bd] .vatabs .on{background:var(--bd-acc)!important;color:#fff!important}html[data-bd=dunkel] .vatabs .on{color:#062424!important}
.vahero{background:linear-gradient(135deg,var(--bd-acc,#1f7a63),color-mix(in srgb,var(--bd-acc,#1f7a63) 70%,#000));color:#fff;border-radius:22px;padding:16px 18px;margin:0 0 12px}
html[data-bd=dunkel] .vahero{background:linear-gradient(135deg,color-mix(in srgb,var(--bd-acc) 45%,#062424),color-mix(in srgb,var(--bd-acc) 25%,#041818))}
.vahero small{display:block;opacity:.88;font-size:14px}.vahero b{display:block;font-size:28px;margin:2px 0;color:#fff}.vahero strong{font-weight:700}
.vahs{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.vahs span{background:rgba(255,255,255,.16);border-radius:12px;padding:6px 10px;font-size:13px}
.vamnav{display:flex;align-items:center;justify-content:space-between}.vamnav button{border:0;background:rgba(255,255,255,.16);color:#fff;border-radius:10px;width:32px;height:28px;font-size:18px}.vamnav button:disabled{opacity:.3}
.vacard{background:var(--bd-glass,var(--surface));border:1px solid var(--bd-edge,var(--line));border-radius:20px;padding:6px 16px;margin:0 0 12px}
.varise{border:1.5px solid #e0a23a;background:color-mix(in srgb,#f5b942 14%,var(--bd-glass,var(--surface)));padding:14px 16px}
.vart{font-size:13px;font-weight:700;color:#b9770e;text-transform:uppercase;letter-spacing:.04em}.varise h3{margin:6px 0 2px;font-size:18px}
.vabig{font-size:22px;font-weight:700;margin:4px 0}.vabig em{font-style:normal;color:#c0392b;font-size:16px;margin-left:6px}.varise p{margin:4px 0;color:var(--muted);font-size:14px}
html[data-bd=dunkel] .vart{color:#f0b54d}html[data-bd=dunkel] .vabig em,html[data-bd=dunkel] .vaup{color:#ff8a7a}
.vabtns{display:flex;gap:8px;margin-top:10px}.vabtn{flex:1;border-radius:14px;padding:11px 8px;text-align:center;font-weight:600;font-size:15px;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink)}
.vabtn.p{background:var(--bd-acc,var(--green));color:#fff;border-color:transparent}html[data-bd=dunkel] .vabtn.p{color:#062424}
.vash{font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin:16px 6px 8px}
.vasoon button{display:flex;justify-content:space-between;gap:10px;width:100%;border:0;background:none;padding:9px 0;font-size:15px;border-bottom:1px solid var(--line);color:var(--ink);text-align:left}.vasoon button:last-child{border:0}.vasoon em{font-style:normal;color:#b9770e;font-weight:600;font-size:14px;white-space:nowrap}
html[data-bd=dunkel] .vasoon em{color:#f0b54d}
.vawarn{font-size:14px;color:var(--muted);background:var(--bd-glass,var(--surface));border:1px dashed var(--bd-edge,var(--line));border-radius:14px;padding:9px 12px;margin:0 0 8px}
.vachips{display:flex;gap:8px;margin:4px 0 10px;overflow-x:auto}.vachips button{white-space:nowrap;padding:7px 14px;border-radius:20px;font-size:14px;border:1px solid var(--bd-edge,var(--line));font-weight:600;background:var(--bd-glass,var(--surface));color:var(--ink)}
.vachips .on{background:var(--bd-acc,var(--green));color:#fff;border-color:transparent}html[data-bd=dunkel] .vachips .on{color:#062424}
.varow{display:flex;align-items:center;gap:12px;width:100%;padding:10px 0;border:0;border-bottom:1px solid var(--line);background:none;text-align:left;color:var(--ink)}.vacard>.varow:last-child{border-bottom:0}
.vaic{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex:none;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 12%,transparent)}
.vatx{flex:1;min-width:0}.vatx b{display:block;font-size:16px}.vatx small{display:block;color:var(--muted);font-size:13px}
.vaam{text-align:right;font-weight:700;font-size:15px;white-space:nowrap}.vaam small{display:block;font-weight:600;font-size:12px}.vaup{color:#c0392b}.vamut{color:var(--muted)}
.vatag{font-size:11px;font-weight:700;border-radius:8px;padding:2px 6px;margin-left:6px;vertical-align:2px;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 15%,transparent);color:var(--bd-acc,var(--green))}
.vabar{display:block;height:8px;border-radius:5px;background:var(--line);margin-top:6px;overflow:hidden}.vabar i{display:block;height:100%;background:var(--bd-acc,var(--green));border-radius:5px}
.vaadd{display:block;width:100%;border:0;margin:0 0 12px;border-radius:18px;padding:14px;text-align:center;font-weight:700;font-size:17px;background:var(--bd-acc,var(--green))!important;color:#fff!important;opacity:1!important}html[data-bd=dunkel] .vaadd{color:#062424!important}
.valnk{display:block;margin:4px auto 6px;border:0;background:none;color:var(--bd-acc,var(--green));font-weight:600;font-size:14px}
.vanote{font-size:13px;color:var(--muted)!important;margin:6px 6px 14px;line-height:1.4;background:transparent!important;border:0!important;padding:0!important}
.valtr{background:#fff;color:#222;border-radius:14px;margin:0 0 10px;padding:18px;font-family:Georgia,serif;font-size:14.5px;line-height:1.5;box-shadow:0 2px 10px rgba(0,0,0,.08);outline:none}.vahl{background:#fff4d6;border-radius:4px;padding:0 3px}
.vash2 .vaamt{font-size:36px;font-weight:700;text-align:center;padding:12px}
.vagrid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:10px 0}.vagrid button{hyphens:none;word-break:keep-all;border:1px solid var(--line);border-radius:14px;padding:8px 0;text-align:center;font-size:10.5px;font-weight:600;background:var(--surface);color:var(--ink);overflow:hidden;text-overflow:ellipsis}
.vagrid button span{display:block;font-size:22px;margin-bottom:2px}.vagrid .on{border:2px solid var(--bd-acc,var(--green));background:color-mix(in srgb,var(--bd-acc,#1f7a63) 10%,transparent)}
.vaabot{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;margin:12px 0;padding:12px 14px;border-radius:16px;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));text-align:left;color:var(--ink)}
.vaabot b{display:block;font-size:15px}.vaabot small{display:block;color:var(--muted);font-size:13px}.vaabot u{width:46px;height:28px;border-radius:15px;background:var(--line);position:relative;flex:none}.vaabot u:after{content:'';position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:left .2s}
.vaabot u.on{background:var(--bd-acc,var(--green))}.vaabot u.on:after{left:21px}
.sgp.vapill{background:#fdebd0!important;color:#b9770e!important}
`);
