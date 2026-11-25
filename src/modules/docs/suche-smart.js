/* ===== Butler Docs: stage 2 of BUTLER 2.0 — Smart Search (v75) =====
   One search for everything, on the phone, without a server and without a big AI:
   - finds contracts & subscriptions (name, number, kind), expenses, deadlines from everywhere and the TEXT inside
     documents (the recognised text, loaded once when the search opens), not only titles;
   - similar words: Strom = Stadtwerke = Energie = электричество, Auto = Kfz = Tanken = машина … (ZQ_SYN);
   - questions in plain words get an answer card on top with the source of every number:
     «Was zahle ich für Abos?», «Was kosten meine Verträge?», «Was ist in 3 Monaten kündbar?», «Ausgaben Oktober»,
     «Was kostet mein Auto im Jahr?», «Letzte Lohnabrechnung», «Nächste Frist». Missing data is said («unvollständig»),
     nothing is counted twice;
   - time words: letzten Monat, diesen Monat, Oktober, 2025, letzte 6 Monate, nächste 30 Tage, bis Jahresende (ru/de/en);
   - filter chips over the result groups; history (✕ one, clear all) and saved searches (always fresh results);
   - a microphone when the browser offers speech recognition (on the iPhone the keyboard dictation works anyway).
   Data: g.srh = {h:[{q,ts}], fav:[q]} */
const zqS={
 sVa:['Договоры и подписки','Verträge & Abos','Contracts & subscriptions'],sAus:['Расходы','Ausgaben','Spending'],sDl:['Сроки','Fristen','Deadlines'],
 inText:['«%t» в тексте','„%t“ im Text','“%t” in the text'],perM:['%a / мес.','%a / Monat','%a / month'],kb:['расторгнуть до %d','kündbar bis %d','cancel by %d'],
 hist:['Недавно искали','Zuletzt gesucht','Recent searches'],clr:['Очистить историю','Verlauf löschen','Clear history'],fav:['Сохранённые поиски','Gespeicherte Suchen','Saved searches'],
 ex:['Спросите, например','Fragen Sie z. B.','Ask for example'],save:['⭐ Сохранить поиск','⭐ Suche speichern','⭐ Save search'],saved:['Поиск сохранён','Suche gespeichert','Search saved'],unsave:['Убрать из сохранённых','Nicht mehr speichern','Remove from saved'],
 hits:['%n результатов · актуально','%n Treffer · aktuell','%n results · current'],all:['Все %n','Alle %n','All %n'],
 ex1:['Сколько я плачу за подписки?','Was zahle ich für Abos?','What do I pay for subscriptions?'],ex2:['Что можно расторгнуть за 3 месяца?','Was ist in 3 Monaten kündbar?','What can I cancel in 3 months?'],
 ex3:['Последняя зарплатная ведомость','Letzte Lohnabrechnung','Latest payslip'],ex4:['Расходы за прошлый месяц','Ausgaben letzten Monat','Spending last month'],ex5:['Сколько стоит машина в год?','Was kostet mein Auto im Jahr?','What does my car cost a year?'],
 aAbo:['Подписки: %n','Abos: %n','Subscriptions: %n'],aVert:['Договоры и подписки: %n','Verträge & Abos: %n','Contracts & subscriptions: %n'],aYear:['%a в год','%a im Jahr','%a a year'],
 srcV:['договор','Vertrag','contract'],srcA:['расходы «%c»','Ausgaben „%c“','spending “%c”'],nEnt:['записей: %n','%n Einträge','%n entries'],
 aKb:['Можно расторгнуть: %p','Kündbar: %p','Can be cancelled: %p'],aKbNone:['В этот период ничего расторгать не нужно.','In diesem Zeitraum ist nichts kündbar.','Nothing to cancel in this period.'],
 aSp:['Расходы · %p','Ausgaben · %p','Spending · %p'],fixM:['Постоянные расходы (договоры)','Feste Kosten (Verträge)','Fixed costs (contracts)'],months:['%n мес.','%n Monate','%n months'],
 aCar:['Машина · %p','Auto · %p','Car · %p'],perMo:['≈ %a в месяц','≈ %a im Monat','≈ %a a month'],
 inc:['Неполно','Unvollständig','Incomplete'],incMon:['Нет записей за: %m.','Für %m sind keine Ausgaben eingetragen.','No spending entered for %m.'],incCar:['Нет договора страховки машины.','Kein Kfz-Vertrag gespeichert.','No car contract saved.'],
 once:['Каждый документ и каждая запись считаются только один раз.','Jede Rechnung und jeder Eintrag zählt nur einmal.','Every bill and entry is counted only once.'],
 aLast:['Последний документ','Neuestes Dokument','Latest document'],aNext:['Ближайший срок','Nächste Frist','Next deadline'],inD:['через %n дн.','in %n Tagen','in %n days'],today:['сегодня','heute','today'],
 how:['Как посчитано: %t','So gerechnet: %t','How it was counted: %t'],howSp:['Ваши записи + постоянные расходы по договорам','Ihre Einträge + feste Kosten der Verträge','your entries + fixed costs of the contracts'],
 howCar:['договоры машины + «Бензин» и «Машина» из расходов','Kfz-Verträge + „Tanken“ und „Auto“ aus den Ausgaben','car contracts + “Fuel” and “Car” from spending'],
 mic:['Сказать','Sprechen','Speak'],syn:['Найдено также по похожим словам: %w','Auch gefunden über ähnliche Wörter: %w','Also found via similar words: %w'],
 thisM:['этот месяц','dieser Monat','this month'],lastM:['прошлый месяц','letzter Monat','last month'],yearTD:['с января','seit Januar','since January'],lastN:['последние %n мес.','letzte %n Monate','last %n months'],nextN:['ближайшие %n дн.','nächste %n Tage','next %n days'],toYE:['до конца года','bis Jahresende','until year end']};
const zqt=(k,o)=>{let s=cv5n(zqS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const ZQ_T={ru:{sVa:'Договоры и подписки',sAus:'Расходы',sDl:'Сроки'},de:{sVa:'Verträge & Abos',sAus:'Ausgaben',sDl:'Fristen'},en:{sVa:'Contracts & subscriptions',sAus:'Spending',sDl:'Deadlines'},
 tr:{sVa:'Sözleşmeler ve abonelikler',sAus:'Harcamalar',sDl:'Süreler'},uk:{sVa:'Договори й підписки',sAus:'Витрати',sDl:'Строки'}};
try{Object.keys(ZQ_T).forEach(l=>{if(TD9T[l])Object.assign(TD9T[l],ZQ_T[l])})}catch(e){Hooks.err('zqt',e)}
/* similar words — a word that starts like one of them brings the whole group */
const ZQ_SYN=[['strom','stadtwerke','energie','elektri','электр','свет','electric','power','enercity','vattenfall','eon','e.on','enbw','yello','abschlag'],
 ['auto','kfz','wagen','fahrzeug','pkw','машин','автомоб','car','vehicle','tank','benzin','diesel','werkstatt','tüv','tuev','inspektion','бензин','araç','авто'],
 ['internet','dsl','wlan','glasfaser','router','интернет','gigacube','vodafone','telekom','1&1','o2'],
 ['handy','mobil','telefon','zqartphone','телефон','phone'],
 ['miete','mietvertrag','wohnung','vermieter','nebenkosten','аренд','квартир','rent','flat','apartment'],
 ['versicherung','police','polizze','страхов','insurance','sigorta','haftpflicht','hausrat'],
 ['lohn','gehalt','lohnabrechnung','gehaltsabrechnung','entgelt','зарплат','payslip','salary','maaş','зарплата'],
 ['steuer','finanzamt','steuerbescheid','elster','налог','tax','vergi'],
 ['abo','abonnement','subscription','подписк','netflix','spotify','disney','prime'],
 ['arzt','praxis','krank','gesundheit','врач','doctor','health','klinik','apotheke'],
 ['kinder','kind','kita','schule','дети','ребен','school','child'],
 ['kündig','kuendig','расторж','cancel','fesih']];
const zqLow=s=>String(s||'').toLowerCase().replace(/ё/g,'е').replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
const ZQ_STOP=new Set('was wie viel vie ich mir mein meine meinen meiner fuer der die das den dem des und oder ist sind im in am an auf aus bei mit von zum zur bis ab pro jahr jahre monat monate monaten tag tage tagen woche zahle zahlen kostet kosten kostete bezahle gebe habe hab letzte letzten letzter neueste naechste naechsten kommende diese diesen dieser alle what how much many does did the and for my me is are was in on at of to by per year years month months day days week last next this all pay paid cost costs spend spent latest newest что как сколько мой моя мои мне меня я за на в во по до от из это этот все год году года месяц месяца месяцев день дней неделя последний последняя последние ближайший ближайшие следующий плачу стоит стоят трачу потратил ne kadar benim için ve bir bu son'.split(' '));
function zqTerms(q){const w=zqLow(q).split(/[^a-zа-я0-9&.\-ığşçöüі]+/i).filter(x=>x.length>=3&&!ZQ_STOP.has(x)&&!/^\d+$/.test(x));const T=new Set(w),via=[];
 w.forEach(x=>ZQ_SYN.forEach(gr=>{if(gr.some(s=>{const k=zqLow(s);return x.startsWith(k)||k.startsWith(x)})){gr.forEach(s=>{const k=zqLow(s);if(!T.has(k)){T.add(k);via.push(s)}})}}));return{T:[...T],w,via}}
const zqHit=(text,T)=>{const t=zqLow(text);return T.find(k=>t.includes(k))||null};
/* ---------- time words ---------- */
const ZQ_MO=[['januar','january','январ','ocak','січ'],['februar','february','феврал','şubat','лют'],['maerz','march','март','mart','берез'],['april','april','апрел','nisan','квіт'],['mai','may','мая','май','mayıs','трав'],['juni','june','июн','haziran','черв'],
 ['juli','july','июл','temmuz','лип'],['august','august','август','ağustos','серп'],['september','september','сентябр','eylül','верес'],['oktober','october','октябр','ekim','жовт'],['november','november','ноябр','kasım','листоп'],['dezember','december','декабр','aralık','груд']];
const zqIso=d=>{const a=new Date(d);a.setHours(12,0,0,0);return a.toISOString().slice(0,10)};
const zqMonKey=(y,mo)=>`${y}-${String(mo+1).padStart(2,'0')}`;
function zqPeriod(q,def){const s=' '+zqLow(q)+' ',now=new Date(),y=now.getFullYear(),mo=now.getMonth();const M=(a,b,lab)=>({from:a,to:b,lab});
 let r;
 if((r=s.match(/(naechste|kommende|ближайш|следующ|next|coming)\D{0,12}(\d{1,3})\s*(tag|дн|day|gün)/)))return{fwd:+r[2],lab:zqt('nextN',{n:r[2]})};
 if((r=s.match(/(\d{1,2})\s*(monat|месяц|month|ay\b)/))&&/(naechst|kommend|ближайш|через|next|in\s)/.test(s))return{fwd:+r[1]*30,lab:zqt('nextN',{n:+r[1]*30})};
 if(/(jahresende|ende des jahres|конца года|end of (the )?year|yıl sonu)/.test(s))return{fwd:Math.round((new Date(y,11,31)-now)/864e5),lab:zqt('toYE')};
 if((r=s.match(/(letzte|vergangene|последн|прошл|last|past|son)\D{0,10}(\d{1,2})\s*(monat|месяц|month|ay)/))){const a=new Date(y,mo-(+r[2])+1,1);return M(zqIso(a),zqIso(now),zqt('lastN',{n:r[2]}))}
 if(/(letzten monat|vormonat|прошл\w* месяц|last month|geçen ay)/.test(s)){const a=new Date(y,mo-1,1),b=new Date(y,mo,0);return M(zqIso(a),zqIso(b),new Date(y,mo-1,15).toLocaleDateString(he(),{month:'long'}))}
 if(/(diesen monat|dieser monat|этот месяц|в этом месяце|this month|bu ay)/.test(s))return M(zqIso(new Date(y,mo,1)),zqIso(now),new Date(y,mo,15).toLocaleDateString(he(),{month:'long'}));
 for(let k=0;k<12;k++)if(ZQ_MO[k].some(w=>new RegExp('[\\s(]'+zqLow(w)).test(s))){let yy=y;const ym=s.match(/\b(20\d\d)\b/);if(ym)yy=+ym[1];else if(k>mo)yy=y-1;const a=new Date(yy,k,1),b=new Date(yy,k+1,0);return M(zqIso(a),zqIso(b),a.toLocaleDateString(he(),{month:'long',year:yy!==y?'numeric':undefined}))}
 if((r=s.match(/\b(20\d\d)\b/))){const yy=+r[1];return M(`${yy}-01-01`,yy===y?zqIso(now):`${yy}-12-31`,String(yy))}
 if(/(im jahr|pro jahr|jährlich|jaehrlich|в год|за год|a year|per year|yearly|yılda)/.test(s)||def==='ytd')return M(`${y}-01-01`,zqIso(now),zqt('yearTD'));
 return def==='month'?M(zqIso(new Date(y,mo,1)),zqIso(now),new Date(y,mo,15).toLocaleDateString(he(),{month:'long'})):null}
const zqMonths=(a,b)=>{const out=[];const d=new Date(a+'T12:00:00');d.setDate(1);const e=new Date(b+'T12:00:00');while(d<=e&&out.length<60){out.push(zqMonKey(d.getFullYear(),d.getMonth()));d.setMonth(d.getMonth()+1)}return out};
/* ---------- answers ---------- */
const ZQ_Q={how:/(wie ?viel|was (zahle|kostet|kosten|bezahle|gebe)|сколько|во что|how much|what (do i|does|did) .*(pay|cost|spend)|ne kadar|скільки)/,
 abo:/(abo|abonnement|subscription|подписк|abonelik|підписк)/,vert:/(vertraeg|vertrag|contract|договор|fixkosten|feste kosten|sözleşme)/,
 kb:/(kuendbar|kuendigen|cancel|расторг|fesih|розірв)/,sp:/(ausgaben|ausgegeben|spent|spending|расход|потратил|trat|harca|витрат)/,
 car:/(\bauto\b|\bkfz|wagen|машин|автомоб|\bcar\b|araba|авто\b)/,last:/(letzte|neueste|последн|свеж|latest|last|newest|son )/,next:/(naechste frist|nächste frist|ближайш\w* срок|следующ\w* срок|next deadline|sonraki süre|найближч)/};
function zqAnswer(q){const s=' '+zqLow(q)+' ';try{
 if(ZQ_Q.next.test(s)||(/(frist|срок|deadline)/.test(s)&&/(naechst|ближайш|следующ|next)/.test(s)))return zqNext();
 if(ZQ_Q.abo.test(s)&&(ZQ_Q.how.test(s)||/(alle|все|all|summe|итог)/.test(s)))return zqAbo(!0);
 if(ZQ_Q.kb.test(s)&&!ZQ_Q.last.test(s))return zqKb(q);
 if(ZQ_Q.car.test(s)&&(ZQ_Q.how.test(s)||/(kosten|расход|cost)/.test(s)))return zqCar(q);
 if(ZQ_Q.sp.test(s))return zqSpend(q);
 if(ZQ_Q.vert.test(s)&&ZQ_Q.how.test(s))return zqAbo(!1);
 if(ZQ_Q.last.test(s)){const rest=s.replace(ZQ_Q.last,' ').trim();if(rest.length>=3)return zqLast(rest)}
}catch(e){Hooks.err('zqans',e)}return null}
const zqEur=c=>fzEur(c);
const zqRows=()=>{try{return vaRows()}catch{return[]}};
function zqAbo(onlyAbo){const R2=zqRows().filter(r=>onlyAbo?r.abo:!0),tot=R2.reduce((a,b)=>a+b.mo,0);
 return{t:onlyAbo?zqt('aAbo',{n:R2.length}):zqt('aVert',{n:R2.length}),big:zqt('perM',{a:zqEur(tot)}),sub:zqt('aYear',{a:zqEur(tot*12)}),
  rows:R2.slice(0,8).map(r=>({ic:vaIcon(r.e),t:r.nm,s:zqt('srcV'),a:zqEur(r.mo),act:`data-act="insopen" data-id="${r.e.id}"`}))}}
function zqKb(q){const P=zqPeriod(q)||{fwd:90,lab:zqt('nextN',{n:90})},lim=P.fwd!=null?P.fwd:Math.max(0,Math.round((new Date(P.to)-new Date())/864e5));
 const R2=zqRows().filter(r=>r.kb&&vaDays(r.kb)>=0&&vaDays(r.kb)<=lim).sort((a,b)=>a.kb.localeCompare(b.kb));
 return{t:zqt('aKb',{p:P.lab}),big:String(R2.length),sub:R2.length?'':zqt('aKbNone'),rows:R2.map(r=>({ic:vaIcon(r.e),t:r.nm,s:zqt('kb',{d:vaDate(r.kb)}),a:zqEur(r.mo),act:`data-act="insopen" data-id="${r.e.id}"`}))}}
function zqSpend(q){const P=zqPeriod(q,'month');const E=vaAD().e.filter(x=>x.d>=P.from&&x.d<=P.to),Mo=zqMonths(P.from,P.to);let fix=0;Mo.forEach(k=>{try{fix+=vaFixOf(k)}catch{}});
 const by={};E.forEach(x=>by[x.c]=(by[x.c]||0)+(+x.a||0));const own=E.reduce((a,b)=>a+(+b.a||0),0),tot=own+fix;
 const empty=Mo.filter(k=>!E.some(x=>String(x.d).startsWith(k))).map(k=>new Date(k+'-15T12:00:00').toLocaleDateString(he(),{month:'short'}));
 const rows=Object.keys(by).sort((a,b)=>by[b]-by[a]).map(c=>({ic:vaCi(c),t:vat('c_'+c),s:zqt('srcA',{c:vat('c_'+c)})+' · '+zqt('nEnt',{n:E.filter(x=>x.c===c).length}),a:zqEur(by[c]),act:'data-act="zqaus"'}));
 if(fix)rows.push({ic:'🔁',t:zqt('fixM'),s:Mo.length>1?zqt('months',{n:Mo.length}):zqt('srcV'),a:zqEur(fix),act:'data-act="fzkost"'});
 return{t:zqt('aSp',{p:P.lab}),big:zqEur(tot),sub:Mo.length>1?zqt('perMo',{a:zqEur(tot/Mo.length)}):'',rows,warn:empty.length?zqt('incMon',{m:empty.join(', ')}):'',how:zqt('how',{t:zqt('howSp')})}}
const ZQ_CAR=/kfz|auto|car|fahrzeug|pkw|машин|автомоб|leasing/i;
function zqCar(q){const P=zqPeriod(q,'ytd'),Mo=zqMonths(P.from,P.to),rows=[];let tot=0;
 const C=zqRows().filter(r=>r.e.cat==='ins_car'||ZQ_CAR.test([r.e.co,r.e.title,r.e.cat].join(' ')));
 C.forEach(r=>{let s=0;Mo.forEach(k=>{try{if(r.e.start&&r.e.start>k+'-28')return;s+=or(r.e,k+'-15')}catch{}});if(!s)return;tot+=s;rows.push({ic:vaIcon(r.e),t:r.nm,s:zqt('srcV')+' · '+Mo.length+' × '+zqEur(r.mo),a:zqEur(s),act:`data-act="insopen" data-id="${r.e.id}"`})});
 const E=vaAD().e.filter(x=>x.d>=P.from&&x.d<=P.to&&(x.c==='tank'||x.c==='auto'));['tank','auto'].forEach(c=>{const L2=E.filter(x=>x.c===c);if(!L2.length)return;const s=L2.reduce((a,b)=>a+(+b.a||0),0);tot+=s;rows.push({ic:vaCi(c),t:vat('c_'+c),s:zqt('srcA',{c:vat('c_'+c)})+' · '+zqt('nEnt',{n:L2.length}),a:zqEur(s),act:'data-act="zqaus"'})});
 const W=[];if(!C.length)W.push(zqt('incCar'));const emp=Mo.filter(k=>!E.some(x=>x.c==='tank'&&String(x.d).startsWith(k))).map(k=>new Date(k+'-15T12:00:00').toLocaleDateString(he(),{month:'short'}));
 if(emp.length&&emp.length<Mo.length+1)W.push(zqt('incMon',{m:emp.join(', ')}));
 return{t:zqt('aCar',{p:P.lab}),big:zqEur(tot),sub:Mo.length?zqt('perMo',{a:zqEur(tot/Mo.length)}):'',rows,warn:W.join(' '),how:zqt('how',{t:zqt('howCar')})}}
function zqDocs(){try{return(Ke().items||[]).filter(d=>!d.type)}catch{return[]}}
const zqDocDate=d=>d.date||(d.ts?new Date(d.ts).toISOString().slice(0,10):'');
function zqLast(rest){const{T}=zqTerms(rest);if(!T.length)return null;const D=zqDocs().filter(d=>zqHit([d.title,d.party,d.kind,d.snip].join(' '),T)).sort((a,b)=>zqDocDate(b).localeCompare(zqDocDate(a)));if(!D.length)return null;const d=D[0];
 return{t:zqt('aLast'),big:d.title||'—',sub:[d.party,zqDocDate(d)?vaDate(zqDocDate(d)):''].filter(Boolean).join(' · '),rows:D.slice(1,4).map(x=>({ic:'📄',t:x.title||'—',s:zqDocDate(x)?vaDate(zqDocDate(x)):'',a:'',act:`data-act="dzopen" data-id="${x.id}"`})),open:`data-act="dzopen" data-id="${d.id}"`,zqall:1}}
function zqNext(){let L2=[];try{L2=stDlAll().filter(t=>vaDays(t.k)>=0)}catch{}if(!L2.length)return null;const t=L2[0],n=vaDays(t.k);
 return{t:zqt('aNext'),big:t.t,sub:vaDate(t.k)+' · '+(n===0?zqt('today'):zqt('inD',{n})),rows:L2.slice(1,4).map(x=>({ic:'⏰',t:x.t,s:vaDate(x.k),a:'',act:x.act||'data-act="go" data-to="dsrok"'})),open:t.act||'data-act="go" data-to="dsrok"',zqall:1}}
Hooks.on('ask',(r,t,lt)=>{try{if(r)return r;const q=String(t||'');const A=zqAnswer(q);if(!A)return r;
 const L2=(A.rows||[]).slice(0,3).map(x=>'• '+x.t+(x.a?' – '+x.a:'')).join('\n');
 return{msg:[A.t+': '+A.big+(A.sub?' · '+A.sub:''),L2,A.warn?'⚠ '+zqt('inc')+': '+A.warn:''].filter(Boolean).join('\n'),run:()=>{R('search');setTimeout(()=>zqRun(q),350)}}}catch(e){Hooks.err('zqask',e);return r}});
Hooks.act('zqaus',()=>{try{fzD().tab='aus';$()}catch{}R('fzm')});
function zqAnsHtml(A){if(!A)return'';return`<div class="zqans"><zqall>${i(A.t)}</zqall>${A.open?`<button type="button" class="zqbig zqsm" ${A.open}>${i(A.big)} ›</button>`:`<div class="zqbig${A.zqall?' zqsm':''}">${i(A.big)}</div>`}${A.sub?`<zqall>${i(A.sub)}</zqall>`:''}
 ${A.rows&&A.rows.length?`<div class="zqrows">${A.rows.map(r=>`<button type="button" class="zqrow" ${r.act||''}><span class="zqic">${r.ic}</span><span class="zqtx"><b>${i(r.t)}</b>${r.s?`<zqall>${i(r.s)}</zqall>`:''}</span>${r.a?`<em>${i(r.a)}</em>`:''}</button>`).join('')}</div>`:''}
 ${A.warn?`<div class="zqwarn">⚠ <b>${i(zqt('inc'))}</b> ${i(A.warn)} ${i(zqt('once'))}</div>`:''}${A.how?`<p class="zqhow">${i(A.how)}</p>`:''}</div>`}

/* ---------- more groups in the result list ---------- */
const zqF0=td9find;td9find=function(q){let G=[];try{G=zqF0.apply(this,arguments)||[]}catch(e){G=[]}try{const{T,w}=zqTerms(q);if(!T.length)return G;const add=(k,rows,first)=>{if(!rows.length)return;const o={k,rows:rows.slice(0,8)};first?G.unshift(o):G.push(o)};
  add('sVa',zqRows().filter(r=>zqHit([r.e.co,r.e.title,r.e.polno,r.e.cat,(()=>{try{return pc(r.e)}catch{return''}})(),r.abo?'abo abonnement subscription подписка':''].join(' '),T)).map(r=>({ic:'note',t:r.nm,s:[r.abo?vat('abo'):zqt('srcV'),r.mo?zqt('perM',{a:zqEur(r.mo)}):'',r.kb?zqt('kb',{d:vaDate(r.kb)}):''].filter(Boolean).join(' · '),act:`data-act="insopen" data-id="${r.e.id}"`})),!0);
  /* the text inside documents (titles are found by the core already) */
  const have=new Set();G.forEach(gr=>gr.rows.forEach(r=>{const m1=String(r.act||'').match(/data-id="([^"]+)"/);if(m1)have.add(m1[1])}));
  const txt=d=>{try{return(typeof Fa!=='undefined'&&Fa.text&&Fa.text[d.id])||d.snip||''}catch{return d.snip||''}};
  const TR=zqDocs().filter(d=>!have.has(d.id)&&zqHit([d.title,d.party,d.note,d.kind,txt(d)].join(' '),T)).map(d=>{const t=txt(d),k=zqHit(t,T);let ex='';if(k){const lt=zqLow(t),p=lt.indexOf(k);ex='…'+t.slice(Math.max(0,p-30),p+50).replace(/\s+/g,' ').trim()+'…'}
   return{ic:'doc',t:d.title||'—',s:ex?zqt('inText',{t:ex}):(d.party||''),act:`data-act="dzopen" data-id="${d.id}"`}});
  if(TR.length){const gd=G.find(gr=>gr.k==='sDocs');if(gd)gd.rows=gd.rows.concat(TR).slice(0,10);else add('sDocs',TR)}
  add('sAus',vaAD().e.filter(x=>zqHit([x.w,vat('c_'+x.c),x.c].join(' '),T)).sort((a,b)=>String(b.d).localeCompare(String(a.d))).map(x=>({ic:'note',t:x.w||vat('c_'+x.c),s:vaDate(x.d)+' · '+vat('c_'+x.c)+' · '+zqEur(x.a),act:'data-act="zqaus"'})));
  let DL=[];try{DL=stDlAll()}catch{}add('sDl',DL.filter(t=>vaDays(t.k)>=-30&&zqHit(t.t,T)).map(t=>({ic:'cal',t:t.t,s:vaDate(t.k),act:t.act||'data-act="go" data-to="dsrok"'})));
 }catch(e){Hooks.err('zqfind',e)}return G};
const zqMy0=My;My=function(q){const r=zqMy0.apply(this,arguments);if(r)try{r.sm=zqAnswer(q);r.zqq=q;const{via,w}=zqTerms(q);r.zqVia=via.filter(x=>!w.includes(zqLow(x))).slice(0,3)}catch(x){r.sm=null}return r};
const zqGx0=gx;gx=function(e){const f=zqGx0;try{if(!e)return zqEmpty();let base=f.apply(this,arguments);const hasList=e.td9&&e.td9.length||e.cats.length||e.items.length||e.notes.length||e.events.length;
 if(!hasList&&e.sm)base='';const n=(e.td9||[]).length;
 const chips=n>1?`<div class="zqchips"><button type="button" class="on" data-zqf="-1">${i(zqt('all',{n:(e.td9||[]).reduce((a,b)=>a+b.rows.length,0)}))}</button>${e.td9.map((gr,j)=>`<button type="button" data-zqf="${j}">${i(td9(gr.k))} ${gr.rows.length}</button>`).join('')}</div>`:'';
 const fav=zqD().fav.includes(String(e.zqq||'').trim());
 return zqAnsHtml(e.sm)+chips+base+(hasList&&e.zqVia&&e.zqVia.length?`<p class="zqhow">${i(zqt('syn',{w:e.zqVia.join(', ')}))}</p>`:'')+(((e.td9&&e.td9.length)||e.sm)&&String(e.zqq||'').trim().length>=3?`<button type="button" class="zqsave" data-act="zqfav">${i(fav?zqt('unsave'):zqt('save'))}</button>`:'')}catch(er){Hooks.err('zqgx',er);return f.apply(this,arguments)}};
/* ---------- empty state: history, saved, examples ---------- */
const zqD=()=>{const o=g.srh=g.srh&&typeof g.srh==='object'?g.srh:{};if(!Array.isArray(o.h))o.h=[];if(!Array.isArray(o.fav))o.fav=[];return o};
const zqAgo=ts=>{const d=Math.round((Date.now()-ts)/864e5);return d<=0?zqt('today'):d===1?(cv5n(['вчера','gestern','yesterday'])):cv5n(['%n дн. назад','vor %n Tagen','%n days ago']).replace('%n',d)};
function zqCount(q){try{const r=My(q);if(!r)return 0;return(r.td9||[]).reduce((a,b)=>a+b.rows.length,0)+(r.sm?1:0)}catch{return 0}}
function zqEmpty(){const D=zqD();const H2=D.h.slice(0,6),F=D.fav.slice(0,8);
 return`${H2.length?`<h3 class="zqh">${i(zqt('hist'))}</h3><div class="zqcard">${H2.map((x,j)=>`<div class="zqrow"><button type="button" class="zqq" data-zqq="${i(x.q)}"><span class="zqic">🕘</span><span class="zqtx"><b>${i(x.q)}</b><zqall>${i(zqAgo(x.ts))}</zqall></span></button><button type="button" class="zqx" data-zqdel="${j}" aria-label="✕">✕</button></div>`).join('')}<button type="button" class="zqclr" data-act="zqclr">${i(zqt('clr'))}</button></div>`:''}
 ${F.length?`<h3 class="zqh">${i(zqt('fav'))}</h3><div class="zqcard">${F.map(q=>`<div class="zqrow"><button type="button" class="zqq" data-zqq="${i(q)}"><span class="zqic">⭐</span><span class="zqtx"><b>${i(q)}</b><zqall>${i(zqt('hits',{n:zqCount(q)}))}</zqall></span></button></div>`).join('')}</div>`:''}
 <h3 class="zqh">${i(zqt('ex'))}</h3><div class="zqex">${['ex1','ex2','ex5','ex3','ex4'].map(k=>`<button type="button" data-zqq="${i(zqt(k))}">${i(zqt(k))}</button>`).join('')}</div>`}
const zqRun=q=>{const inp=document.querySelector('.screen input');if(!inp)return;inp.value=q;inp.dispatchEvent(new Event('input',{bubbles:!0}));zqRec(q,!0)};
let zqTm=0;const zqRec=(q,now)=>{clearTimeout(zqTm);const go=()=>{q=String(q||'').trim();if(q.length<3)return;const D=zqD();D.h=D.h.filter(x=>x.q.toLowerCase()!==q.toLowerCase());D.h.unshift({q,ts:Date.now()});D.h=D.h.slice(0,15);$()};now?go():zqTm=setTimeout(go,1500)};
document.addEventListener('input',e=>{try{if(m.route==='search'&&e.target&&e.target.matches('.screen input'))zqRec(e.target.value)}catch{}},!0);
document.addEventListener('click',e=>{try{if(m.route!=='search')return;const q=e.target.closest('[data-zqq]');if(q){e.preventDefault();zqRun(q.dataset.zqq);return}
 const d=e.target.closest('[data-zqdel]');if(d){const D=zqD();D.h.splice(+d.dataset.zqdel,1);$();const r=document.getElementById('sres');r&&(r.innerHTML=zqEmpty());return}
 const f=e.target.closest('[data-zqf]');if(f){const k=+f.dataset.zqf,r=document.getElementById('sres');if(!r)return;f.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===f));
  const hs=[...r.querySelectorAll(':scope>h3.section-t')];hs.forEach(h=>{const j=hs.indexOf(h),grp=r.querySelectorAll(':scope>h3.section-t').length;const show=k<0||j===k+(hs.length-(e.target.closest('.zqchips').children.length-1));h.style.display=show?'':'none';const nx=h.nextElementSibling;if(nx&&nx.classList.contains('list'))nx.style.display=show?'':'none'})}
 if(e.target.closest('#sres .row,#sres .zqrow:not(.zqcard .zqrow),#sres .zqbig'))zqRec(m.q,!0)}catch(er){Hooks.err('zqclick',er)}},!0);
Hooks.act('zqclr',()=>{zqD().h=[];$();const r=document.getElementById('sres');r&&(r.innerHTML=zqEmpty())});
Hooks.act('zqfav',()=>{const q=String(m.q||'').trim();if(!q)return;const D=zqD(),j=D.fav.indexOf(q);if(j>=0)D.fav.splice(j,1);else{D.fav.unshift(q);T(zqt('saved'))}$();const r=document.getElementById('sres');r&&(r.innerHTML=gx(My(q)))});
/* on open: load the text of all documents once, add the microphone */
let zqTxtAsked=0;
Hooks.on('render',()=>{try{if(m.route!=='search')return;const sc=document.querySelector('.screen'),inp=sc&&sc.querySelector('input');if(!inp)return;
 if(!zqTxtAsked&&typeof Au==='function'){zqTxtAsked=1;Au().then(()=>{if(m.route==='search'&&m.q){const r=document.getElementById('sres');r&&(r.innerHTML=gx(My(m.q)))}}).catch(()=>{})}
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(SR&&!sc.querySelector('.zqmic')){const b=document.createElement('button');b.type='button';b.className='zqmic';b.setAttribute('aria-label',zqt('mic'));b.textContent='🎙';inp.insertAdjacentElement('afterend',b);try{const pa=inp.parentElement;if(getComputedStyle(pa).position==='static')pa.style.position='relative';inp.style.paddingRight='44px'}catch{}
  b.onclick=()=>{try{const rc=new SR();rc.lang={ru:'ru-RU',de:'de-DE',en:'en-US',tr:'tr-TR',uk:'uk-UA',pl:'pl-PL',fr:'fr-FR',es:'es-ES'}[g.lang]||'de-DE';rc.interimResults=!1;b.classList.add('on');rc.onresult=ev=>{const t=ev.results[0][0].transcript;zqRun(t)};rc.onend=()=>b.classList.remove('on');rc.start()}catch(er){b.classList.remove('on')}}}
 const r=document.getElementById('sres');if(r&&!String(m.q||'').trim()&&!r.querySelector('.zqh,.zqex'))r.innerHTML=zqEmpty()}catch(e){Hooks.err('zqrender',e)}});
Hooks.css('docs-suche-zqart',`
.zqans{background:var(--bd-glass,var(--surface));border:1px solid var(--bd-edge,var(--line));border-radius:20px;padding:14px 16px;margin:0 0 6px}
.zqans>zqall{display:block;color:var(--muted);font-size:14px}.zqbig{font-size:30px;font-weight:700;margin:2px 0;color:var(--ink);display:block;text-align:left;border:0;background:none;padding:0}.zqbig.zqsm{font-size:20px}
.zqrows{margin-top:6px}.zqrow{display:flex;align-items:center;gap:12px;width:100%;padding:9px 0;border:0;border-top:1px solid var(--line);background:none;text-align:left;color:var(--ink)}
.zqic{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-size:18px;flex:none;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 12%,transparent)}
.zqtx{flex:1;min-width:0}.zqtx b{display:block;font-size:15.5px}.zqtx zqall{display:block;color:var(--muted);font-size:12.5px}.zqrow em{font-style:normal;font-weight:700;font-size:15px;white-space:nowrap}
.zqwarn{margin-top:10px;border:1.5px solid #e0a23a;background:color-mix(in srgb,#f5b942 14%,transparent);border-radius:14px;padding:10px 12px;font-size:14px;line-height:1.4}.zqwarn b{color:#b9770e}
html[data-bd=dunkel] .zqwarn b{color:#f0b54d}
.zqhow{font-size:12.5px;color:var(--muted)!important;margin:8px 2px 4px;background:transparent!important}
.zqchips{display:flex;gap:8px;overflow-x:auto;margin:4px 0 2px;padding-bottom:2px}.zqchips button{white-space:nowrap;padding:7px 13px;border-radius:20px;font-size:14px;font-weight:600;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink)}
.zqchips .on{background:var(--bd-acc,var(--green));color:#fff;border-color:transparent}html[data-bd=dunkel] .zqchips .on{color:#062424}
.zqsave{align-self:flex-start;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink);border-radius:14px;padding:9px 14px;font-weight:600;font-size:14px;margin-top:4px}
.zqh{font-size:13px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin:10px 6px 0}
.zqcard{background:var(--bd-glass,var(--surface));border:1px solid var(--bd-edge,var(--line));border-radius:20px;padding:2px 16px}.zqcard .zqrow:first-child{border-top:0}
.zqq{display:flex;align-items:center;gap:12px;flex:1;min-width:0;border:0;background:none;text-align:left;color:var(--ink);padding:0}.zqx{border:0;background:none;font-size:16px;color:var(--muted);padding:6px}
.zqclr{display:block;margin:4px auto 10px;border:0;background:none;color:var(--bd-acc,var(--green));font-weight:600;font-size:14px}
.zqex{display:flex;flex-wrap:wrap;gap:8px}.zqex button{border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink);border-radius:18px;padding:8px 14px;font-size:14px;font-weight:600;text-align:left}
.zqmic{position:absolute;right:10px;top:50%;transform:translateY(-50%);border:0;background:none;font-size:20px;z-index:2}.zqmic.on{animation:zqp 1s infinite}@keyframes zqp{50%{opacity:.4}}
`);
