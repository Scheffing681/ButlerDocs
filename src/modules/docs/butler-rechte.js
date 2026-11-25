/* ===== Butler Docs: Butler – Rechte & Verlauf (v87) =====
   Butler works only on this phone (no external AI model: the standalone app has no sampling host). Still the user decides
   which areas Butler may read and answer about in the chat. Gesundheit is off until switched on.
   A question (not a command like «trag ein …») touching a switched-off area gets a plain «this area is closed for Butler» with a way to the settings —
   Butler then answers nothing from it. The user's own search and screens are not limited.
   Everything Butler changes on its own goes into one journal («Was Butler getan hat», the Eingang journal, 90 days)
   with «Rückgängig»: entries from the chat (expense, appointment, task), rule moves, a purchase from a receipt,
   a Vorgang from a document. Route brx. Data: g.brx {off:{cat:1}, init} */
const brxS={
 t:['Батлер: доступ и история','Butler: Rechte & Verlauf','Butler: access & history'],tS:['что Батлеру можно видеть, что он сделал','was Butler sehen darf, was er getan hat','what Butler may see, what he did'],
 loc:['Батлер работает только на этом телефоне. Данные не уходят ни в какой внешний ИИ.','Butler arbeitet nur auf diesem Telefon. Keine Daten gehen an eine externe KI.','Butler works only on this phone. No data goes to an external AI.'],
 see:['Что Батлеру можно использовать в ответах','Was Butler in Antworten nutzen darf','What Butler may use in answers'],seeS:['выключенное Батлер не читает и не упоминает; Ваш собственный поиск это не ограничивает','Abgeschaltetes liest und nennt Butler nicht; Ihre eigene Suche bleibt frei','Butler neither reads nor mentions what is off; your own search is not limited'],
 a_doc:['Документы','Dokumente','Documents'],a_fin:['Деньги и расходы','Geld & Ausgaben','Money & expenses'],a_ver:['Договоры и подписки','Verträge & Abos','Contracts & subscriptions'],a_kon:['Контакты','Kontakte','Contacts'],a_kal:['Календарь и задачи','Kalender & Aufgaben','Calendar & tasks'],a_kauf:['Покупки и гарантия','Käufe & Garantie','Purchases & warranty'],a_ges:['Здоровье','Gesundheit','Health'],a_post:['Письма и заявления','Post & Anträge','Letters & applications'],
 n_ent:['%n записей','%n Einträge','%n entries'],gesOff:['по умолчанию выключено','standardmäßig aus','off by default'],
 blk:['Раздел «%a» закрыт для Батлера. Я не смотрю туда и ничего оттуда не называю. Открыть доступ можно в «Батлер: доступ и история».','Der Bereich „%a“ ist für Butler gesperrt. Ich schaue dort nicht hinein und nenne nichts daraus. Freigeben unter „Butler: Rechte & Verlauf“.','The area “%a” is closed for Butler. I do not look into it or name anything from it. Allow it under “Butler: access & history”.'],
 hist:['Что сделал Батлер','Was Butler getan hat','What Butler did'],histS:['всё, что Батлер изменил сам, — с отменой','alles, was Butler selbst geändert hat – mit Rückgängig','everything Butler changed itself – with undo'],
 always:['Важное Батлер не делает сам','Wichtiges macht Butler nie allein','Butler never does important things alone'],alwaysS:['отправка, удаление, платежи и доступ для других — только после Вашего подтверждения','Senden, Löschen, Zahlungen und Freigaben – nur nach Ihrer Bestätigung','sending, deleting, payments and sharing – only after you confirm'],
 l_exp:['Из чата: запись %n','Aus dem Chat: Buchung %n','From the chat: entry %n'],l_ev:['Из чата: событие «%n»','Aus dem Chat: Termin „%n“','From the chat: appointment “%n”'],l_task:['Из чата: задача «%n»','Aus dem Chat: Aufgabe „%n“','From the chat: task “%n”'],
 l_move:['Правило: «%n» → %f','Regel: „%n“ → %f','Rule: “%n” → %f'],l_kauf:['Покупка из чека: %n','Kauf aus Beleg: %n','Purchase from receipt: %n'],l_vg:['Дело из документа: %n','Vorgang aus Dokument: %n','Case from document: %n']};
const brxt=(k,o)=>{let s=cv5n(brxS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const BRX_A=['doc','fin','ver','kon','kal','kauf','post','ges'];
const brxD=()=>{const o=g.brx=g.brx&&typeof g.brx==='object'?g.brx:{};if(!o.off||typeof o.off!=='object')o.off={};if(!o.init){o.init=1;o.off.ges=1}return o};
const brxOn=a=>!brxD().off[a];
const BRX_RX={ges:/\b(arzt|ärzt|zahnarzt|impf|medikament|tablette|gesundheit|blutwert|laborwert|befund|krank|praxis)|врач|здоров|лекарств|таблет|прививк|анализ|болезн|\b(doctor|health|vaccin|medic|blood test)/i,
 fin:/\b(geld|ausgab|ausgegeben|kosten|bezahl|zahlung|überweis|konto|budget|steuer|einnahm)|деньг|расход|потрат|оплат|заплат|счёт|счет|налог|бюджет|доход|\b(money|spend|spent|paid|pay|tax|cost|budget|income)/i,
 ver:/\b(vertrag|verträg|abo\b|abos|kündig|versicherung|tarif)|договор|подписк|страхов|расторг|тариф|\b(contract|subscription|insurance|cancel)/i,
 kon:/\b(kontakt|telefonnummer|nummer von|adresse von)|контакт|номер телефона|телефон\s|\b(contact|phone number)/i,
 kal:/\b(termin|kalender|aufgabe|erinner|woche|morgen|heute)|встреч|календар|задач|напомн|недел|завтра|сегодня|\b(appointment|calendar|task|remind|week|tomorrow|today)/i,
 kauf:/\b(garantie|gewährleistung|kaufbeleg|gekauft|seriennummer)|гарант|покупк|купил|чек на|\b(warranty|purchase|receipt|bought)/i,
 post:/\b(vorgang|antrag|behörde|amt\b|bescheid|widerspruch)|заявлен|ведомств|ответ от|\b(application|authority|appeal)/i,
 doc:/\b(dokument|unterlagen|datei|scan|brief)|документ|бумаг|файл|скан|письм|\b(document|file|scan|letter)/i};
const brxCats=q=>BRX_A.filter(a=>BRX_RX[a].test(String(q||'')));
const BRX_READ=/\?|(^|\s)(wie|was|wann|wo|welche\w*|zeig\w*|finde?|such\w*|liste?|wieviel|wie viel)\s|(^|\s)(как|что|когда|где|какие|какой|покажи|найди|сколько|список|есть ли)\s|(^|\s)(how|what|when|where|which|show|find|list|do i have)\s/i;
const brxBlocked=q=>BRX_READ.test(' '+String(q||'')+' ')?brxCats(q).filter(a=>!brxOn(a)):[];
/* the chat: one check before anything answers; a closed area wins over every other answer */
try{const _cmd=td9cmd;td9cmd=function(t){try{const B=brxBlocked(t);if(B.length)return{msg:brxt('blk',{a:B.map(a=>brxt('a_'+a)).join(', ')}),run:()=>R('brx')}}catch(e){Hooks.err('brxcmd',e)}return _cmd.apply(this,arguments)}}catch(e){Hooks.err('brxcmd0',e)}
/* what Butler changes from the chat goes into the journal with undo */
try{const _tool=td9tool;td9tool=function(name,args){const before={t:(g.tasks||[]).map(x=>x.id),e:(g.events||[]).map(x=>x.id),x:(()=>{try{return U().tx.map(z=>z.id)}catch{return[]}})()};const r=_tool.apply(this,arguments);
 try{const nw=(arr,old)=>(arr||[]).filter(z=>z&&!old.includes(z.id));
  if(name==='fin_record'){const t=nw((()=>{try{return U().tx}catch{return[]}})(),before.x)[0];if(t)eiAddLog('new',brxt('l_exp',{n:vaEur(Math.round((+t.amt||0)*100))+(t.payee?' · '+t.payee:'')}),{col:'tx',id:t.id},['brxt','l_exp',{n:vaEur(Math.round((+t.amt||0)*100))+(t.payee?' · '+t.payee:'')}])}
  if(name==='add_event'){const e=nw(g.events,before.e)[0];if(e)eiAddLog('new',brxt('l_ev',{n:e.title||'—'}),{col:'events',id:e.id},['brxt','l_ev',{n:e.title||'—'}])}
  if(name==='add_task'){const k=nw(g.tasks,before.t)[0];if(k)eiAddLog('new',brxt('l_task',{n:k.t||k.title||'—'}),{col:'tasks',id:k.id},['brxt','l_task',{n:k.t||k.title||'—'}])}$()}catch(e){Hooks.err('brxtool',e)}return r}}catch(e){Hooks.err('brxtool0',e)}
/* rule moves, purchase from receipt, Vorgang from document */
try{const _ap=tlxApply;tlxApply=function(){const prev={};tlxDocs().forEach(d=>{if(!d.rlx)prev[d.id]=d.folder||''});const n=_ap.apply(this,arguments);
 try{if(n)tlxDocs().forEach(d=>{if(d.id in prev&&d.rlx&&d.folder!==prev[d.id]){const r=tlxRules().find(z=>z.id===d.rlx);eiAddLog('move',brxt('l_move',{n:d.title||'—',f:tlxFn(d.folder)}),{doc:d.id,prev:prev[d.id],rule:r&&r.id},['brxt','l_move',{n:d.title||'—',f:tlxFn(d.folder)}])}});n&&$()}catch(e){Hooks.err('brxap',e)}return n}}catch(e){Hooks.err('brxap0',e)}
document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('[data-act="kgfrom"],[data-act="kpasvg"]');if(!b)return;const k0=kgK().map(x=>x.id),v0=kpVg().map(x=>x.id),act=b.dataset.act;
 setTimeout(()=>{try{if(act==='kgfrom'){const x=kgK().find(z=>!k0.includes(z.id));x&&(eiAddLog('kauf',brxt('l_kauf',{n:x.n}),{id:x.id},['brxt','l_kauf',{n:x.n}]),$())}else{const x=kpVg().find(z=>!v0.includes(z.id));x&&(eiAddLog('vg',brxt('l_vg',{n:x.t||'—'}),{id:x.id},['brxt','l_vg',{n:x.t||'—'}]),$())}}catch{}},60)}catch{}},!0);
/* the screen */
function brxCount(a){try{switch(a){case'doc':return tlxDocs().length;case'fin':return vaAD().e.length+(()=>{try{return U().tx.length}catch{return 0}})();case'ver':return vaContracts().length;case'kon':return Va().length;case'kal':return(g.events||[]).length+(g.tasks||[]).length;case'kauf':return kgK().length;case'post':return kpVg().length;case'ges':{const G=g.ges||{};return['vis','med','imp','lab'].reduce((s,k)=>s+((G[k]||[]).length),0)}}}catch{}return 0}
function brxScreen(){const D=brxD(),L2=eiLogD().slice(0,5);
 return`<div class="screen dhome fz va brxw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(brxt('t'))}</h2></div><span></span></div>
 <div class="vahero"><small>🔒</small><b class="brxl">${i(brxt('loc'))}</b></div>
 <h3 class="vash">${i(brxt('see'))}</h3><div class="vacard"><p class="vanote">${i(brxt('seeS'))}</p>${BRX_A.map(a=>`<button type="button" class="vaabot" data-act="brxa" data-k="${a}"><span><b>${i(brxt('a_'+a))}</b><small>${i(brxt('n_ent',{n:brxCount(a)}))}${a==='ges'?' · '+i(brxt('gesOff')):''}</small></span><u class="${D.off[a]?'':'on'}"></u></button>`).join('')}</div>
 <h3 class="vash">${i(brxt('hist'))}</h3><div class="vacard">${L2.length?L2.map(x=>`<div class="varow"><span class="vaic">${EI_IC[x.k]||'•'}</span><span class="vatx"><b>${i(x.t)}</b><small>${i(new Date(x.ts).toLocaleString(he(),{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}))}</small></span>${x.done?`<span class="vaam vamut">${i(eit('undone'))}</span>`:`<button type="button" class="eiundo" data-act="eiundo" data-id="${x.id}">${i(eit('undo'))}</button>`}</div>`).join(''):`<p class="dhnone">${i(eit('none'))}</p>`}<button type="button" class="valnk" data-act="eilog">${i(brxt('histS'))} ›</button></div>
 <div class="vacard">${tlxRow('🛡',brxt('always'),brxt('alwaysS'),'','')}</div></div>`}
Hooks.act('brxa',d=>{const D=brxD();D.off[d.k]?delete D.off[d.k]:D.off[d.k]=1;$();v()});
OD_OK.add('brx');Te.includes('brx')||Te.push('brx');try{AG_R.includes('brx')||AG_R.push('brx')}catch{}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='brx')return brxScreen()}catch(e){Hooks.err('brxscreen',e)}});
Hooks.on('profile',h=>{try{if(typeof h!=='string'||h.includes('data-to="brx"'))return h;const k=h.indexOf('<div class="vacard tlxents">');if(k<0)return h;const row=tlxRow('✨',brxt('t'),brxt('tS'),'data-act="go" data-to="brx"').replace('class="varow"','class="varow tlxent"');return h.slice(0,k+'<div class="vacard tlxents">'.length)+row+h.slice(k+'<div class="vacard tlxents">'.length)}catch(e){return h}});
try{SP_L.push(['brx','note',brxS.t,['butler','ki','ai','ии','rechte','доступ','permission','verlauf','история','history','rückgängig','отмен','undo']])}catch{}
Hooks.css('docs-butler-rechte',`.brxw .vahero .brxl{font-size:17px;line-height:1.35;font-weight:600}.brxw .vaabot{margin:6px 0}`);
