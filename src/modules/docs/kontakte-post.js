/* ===== Butler Docs: Kontakte & Post & Anträge (v81) =====
   KONTAKTE (route kon): ONE list over what is already there — people (g.contacts), offices & services (g.bsv items)
   and the companies of the contracts — nothing is copied. Categories Persönlich · Beruflich · Behörden ·
   Versicherungen & Finanzen · Gesundheit · Firmen · Beratung, a search, favourites (g.kon.fav), import of
   VCF / CSV (doubles by name or phone are skipped).
   Card (route konk): call / mail / address, and by itself everything that belongs to this name: contracts,
   documents, letters, Vorgänge, deadlines; the history (calls, meetings, notes added by hand + documents and
   letters by date); «Melden in …» makes a task.
   POST & ANTRÄGE (route vg): every matter is one Vorgang with 11 statuses (Neu · Zu prüfen · In Bearbeitung ·
   Vorbereitet · Versendet · Zugestellt — only with proof · Wartet auf Antwort · Antwort erhalten · Rückfrage ·
   Erledigt · Archiviert), Aktenzeichen, contact, documents, next step with a date (a task), expected answer
   (Wiedervorlage), Anlagen check (Vollständig / Fehlt / Zu prüfen), history of every change, ZIP of the whole case.
   «Wartet auf Antwort» list with days passed, «Anrufen», «Nachfrage» (ready text, the user sends it).
   A new letter with the same Aktenzeichen or sender → Smart Inbox asks «Antwort zum Vorgang …?».
   Data: g.kon = {fav:{key:1}, h:{key:[{id,ts,k,t}]}}, g.vg = [{id,t,cat,who,az,st,ts,due,next,exp,docs[],anl[{t,doc}],log[]}] */
const kpS={
 kon:['Контакты','Kontakte','Contacts'],all:['Все','Alle','All'],c_per:['Личные','Persönlich','Personal'],c_job:['Работа','Beruflich','Work'],c_gov:['Ведомства','Behörden','Offices'],
 c_fin:['Страховки и финансы','Versicherungen & Finanzen','Insurance & finance'],c_med:['Здоровье','Gesundheit','Health'],c_firm:['Фирмы','Firmen','Companies'],c_adv:['Консультанты','Beratung','Advisers'],
 find:['Имя, фирма, телефон …','Name, Firma, Telefon …','Name, company, phone …'],fav:['Избранные','Favoriten','Favourites'],imp:['Импорт VCF / CSV','Import VCF / CSV','Import VCF / CSV'],
 impOk:['Добавлено: %n, уже были: %k','%n übernommen, %k schon vorhanden','%n added, %k already there'],impNo:['В файле нет контактов','In der Datei sind keine Kontakte','No contacts in the file'],
 none:['Ничего не найдено','Nichts gefunden','Nothing found'],ctrN:['договоров: %n','%n Verträge','%n contracts'],docN:['документов: %n','%n Dokumente','%n documents'],
 call:['Позвонить','Anrufen','Call'],mail:['Написать','E-Mail','E-mail'],map:['Адрес','Adresse','Address'],
 hist:['История общения','Verlauf','History'],addCall:['＋ Звонок','＋ Anruf','＋ Call'],addMeet:['＋ Встреча','＋ Treffen','＋ Meeting'],addNote:['＋ Заметка','＋ Notiz','＋ Note'],
 k_call:['Звонок','Anruf','Call'],k_meet:['Встреча','Treffen','Meeting'],k_note:['Заметка','Notiz','Note'],k_doc:['Документ','Dokument','Document'],k_let:['Письмо','Brief','Letter'],k_vg:['Дело','Vorgang','Case'],
 what:['О чём? (кратко)','Worum ging es? (kurz)','What was it about? (short)'],save:['Сохранить','Speichern','Save'],date:['Дата','Datum','Date'],
 rem:['Напомнить связаться','Erinnern, sich zu melden','Remind me to get in touch'],remIn:['через %n дн.','in %n Tagen','in %n days'],remT:['Связаться: %n','Melden bei: %n','Get in touch: %n'],remOk:['Задача создана','Aufgabe angelegt','Task created'],
 linked:['Связано','Verknüpft','Linked'],ctrs:['Договоры','Verträge','Contracts'],docs:['Документы','Dokumente','Documents'],vgs:['Дела','Vorgänge','Cases'],dls:['Сроки','Fristen','Deadlines'],
 noHist:['Пока пусто. Добавьте звонок, встречу или заметку — история сохранится здесь.','Noch leer. Anruf, Treffen oder Notiz hinzufügen – der Verlauf bleibt hier.','Empty yet. Add a call, meeting or note – the history stays here.'],
 open:['Открыть карточку','Karte öffnen','Open card'],newVg:['＋ Новое дело','＋ Neuer Vorgang','＋ New case'],
 /* Vorgang */
 vgT:['Дела и заявления','Post & Anträge','Letters & applications'],vgS:['Каждое письмо или заявление — одно дело: от получения до ответа.','Jedes Schreiben, jeder Antrag ist ein Vorgang – vom Eingang bis zur Antwort.','Every letter or application is one case – from arrival to answer.'],
 t_open:['Открыто','Offen','Open'],t_wait:['Жду ответа','Wartet','Waiting'],t_done:['Готово','Erledigt','Done'],
 s_neu:['Новое','Neu','New'],s_pruef:['Проверить','Zu prüfen','To check'],s_bearb:['В работе','In Bearbeitung','In progress'],s_vorb:['Подготовлено','Vorbereitet','Prepared'],s_vers:['Отправлено','Versendet','Sent'],
 s_zug:['Доставлено','Zugestellt','Delivered'],s_wart:['Жду ответа','Wartet auf Antwort','Waiting for answer'],s_antw:['Ответ получен','Antwort erhalten','Answer received'],s_rueck:['Нужен доп. запрос','Rückfrage erforderlich','Follow-up needed'],
 s_erl:['Завершено','Erledigt','Done'],s_arch:['В архиве','Archiviert','Archived'],
 zugNeed:['«Доставлено» — только с подтверждением. Привяжите квитанцию или подтверждение.','„Zugestellt“ nur mit Nachweis. Bitte Beleg oder Bestätigung verknüpfen.','“Delivered” only with proof. Please link a receipt or confirmation.'],
 title:['Тема','Betreff','Subject'],who:['С кем','Mit wem','With whom'],az:['Номер дела (Aktenzeichen)','Aktenzeichen','File number'],cat:['Вид','Art','Kind'],
 k_antrag:['Заявление','Antrag','Application'],k_einspr:['Возражение','Einspruch / Widerspruch','Objection'],k_kuend:['Расторжение','Kündigung','Cancellation'],k_rech:['Счёт / требование','Rechnung / Mahnung','Bill / reminder'],k_anfr:['Запрос / жалоба','Anfrage / Beschwerde','Request / complaint'],k_besch:['Решение / справка','Bescheid / Bestätigung','Decision / certificate'],k_sonst:['Прочее','Sonstiges','Other'],
 st:['Статус','Status','Status'],next:['Следующий шаг','Nächster Schritt','Next step'],nextD:['до','bis','by'],exp:['Ответ ожидается до','Antwort erwartet bis','Answer expected by'],
 anl:['Приложения','Anlagen','Enclosures'],anlAdd:['＋ Приложение','＋ Anlage','＋ Enclosure'],anlPh:['Напр. копия паспорта','z. B. Kopie Ausweis','e.g. copy of ID'],
 a_ok:['Комплект выглядит полным','Vollständig','Complete'],a_miss:['Не хватает: %n','Fehlt: %n','Missing: %n'],a_chk:['проверьте сами — это не юридическая проверка','bitte selbst prüfen – keine rechtliche Prüfung','check yourself – not a legal check'],
 docAdd:['＋ Связать документ','＋ Dokument verknüpfen','＋ Link a document'],logT:['История','Verlauf','History'],l_new:['Дело создано','Vorgang angelegt','Case created'],l_st:['Статус: %s','Status: %s','Status: %s'],l_doc:['Документ: %t','Dokument: %t','Document: %t'],l_next:['Следующий шаг: %t','Nächster Schritt: %t','Next step: %t'],
 zip:['Всё дело одним ZIP','Ganzen Vorgang als ZIP','Whole case as ZIP'],del:['Удалить дело','Vorgang löschen','Delete case'],delQ:['Точно удалить? Нажмите ещё раз (документы останутся)','Wirklich löschen? Nochmals tippen (Dokumente bleiben)','Really delete? Tap again (documents stay)'],
 days:['%n дн. назад','vor %n Tagen','%n days ago'],sentOn:['отправлено %d','versendet am %d','sent on %d'],ask:['Напомнить о себе','Nachfragen','Follow up'],
 askT:['Sachstandsanfrage','Sachstandsanfrage','Sachstandsanfrage'],copied:['Текст скопирован','Text kopiert','Text copied'],
 asVg:['Создать дело из этого письма','Als Vorgang anlegen','Create a case from this letter'],asVgOk:['Дело создано','Vorgang angelegt','Case created'],
 fitVg:['Ответ по делу «%t»?','Antwort zum Vorgang „%t“?','Answer to case “%t”?'],fitVgS:['то же Aktenzeichen','gleiches Aktenzeichen','same file number'],fitVgS2:['тот же отправитель','gleicher Absender','same sender'],
 emptyVg:['Дел пока нет. Создайте из письма («Als Vorgang anlegen») или кнопкой ниже.','Noch keine Vorgänge. Aus einem Brief („Als Vorgang anlegen“) oder unten anlegen.','No cases yet. Create one from a letter or below.'],
 needT:['Впишите тему','Bitte einen Betreff eintragen','Please enter a subject'],postRow:['Дела и заявления','Vorgänge & Anträge','Cases & applications'],postRowS:['статус, сроки, ожидаемые ответы','Status, Fristen, erwartete Antworten','status, deadlines, expected answers'],
 konRow:['Все контакты','Alle Kontakte','All contacts'],konRowS:['люди, ведомства, фирмы — с историей','Menschen, Ämter, Firmen – mit Verlauf','people, offices, companies – with history']};
const kpt=(k,o)=>{let s=cv5n(kpS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const KP_CAT=['per','job','gov','fin','med','firm','adv'];
const kpD=()=>{const o=g.kon=g.kon&&typeof g.kon==='object'?g.kon:{};if(!o.fav||typeof o.fav!=='object')o.fav={};if(!o.h||typeof o.h!=='object')o.h={};return o};
const kpLow=s=>String(s||'').toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss');
const kpWords=n=>kpLow(n).split(/[^a-zа-я0-9]+/).filter(w=>w.length>=4&&!/^(gmbh|versicherung|vertrag|stadt|deutsche|dienst|amt|bank)$/.test(w));
const kpCatOfP=c=>{const t=kpLow([c.cat,c.role,c.org].join(' '));return/arzt|aerzt|doctor|health|praxis|zahn|klinik|apothek/.test(t)?'med':/notar|anwalt|law|steuerber|berater|tax/.test(t)?'adv':/bank|fin|versicher/.test(t)?'fin':/work|kolleg|chef|arbeit|kunde|client|partner/.test(t)?'job':'per'};
const kpCatOfB=b=>{const t=kpLow([b.n,b.grp].join(' '));return/arzt|praxis|klinik|apothek|labor|kranken/.test(t)?'med':/versicher|bank|sparkasse|rente|finanz/.test(t)&&!/finanzamt/.test(t)?'fin':/notar|anwalt|steuerber|berat/.test(t)?'adv':/amt|behoerde|jobcenter|agentur|familienkasse|rathaus|polizei|gericht|stadt|kfz-zul|auslaender/.test(t)?'gov':'firm'};
/* one list over people, offices and contract companies */
function kpAll(){const out=[],seen=new Set();
 try{(typeof Va==='function'?Va():g.contacts||[]).forEach(c=>{const n=c.name||[c.first,c.last].filter(Boolean).join(' ');if(!n)return;out.push({key:'c:'+c.id,n,sub:c.role||'',cat:kpCatOfP(c),tel:c.phone||'',mail:c.email||'',addr:c.addr||'',ic:'👤',open:`data-act="pgo" data-id="${c.id}"`});seen.add(kpLow(n))})}catch{}
 try{(g.bsv&&g.bsv.items||[]).forEach(b=>{if(!b||!b.n)return;out.push({key:'b:'+b.id,n:b.n,sub:b.addr||'',cat:kpCatOfB(b),tel:b.tel||'',mail:b.mail||'',addr:b.addr||'',ic:b.e||'🏛️',open:`data-act="kpbsv" data-id="${b.id}"`});seen.add(kpLow(b.n))})}catch{}
 try{vaContracts().forEach(e=>{const n=String(e.co||'').trim();if(!n||seen.has(kpLow(n)))return;seen.add(kpLow(n));const ins=/^ins_/.test(e.cat||'')&&e.cat!=='ins_other';out.push({key:'v:'+kpLow(n),n,sub:'',cat:ins||/versicher|bank|kredit/i.test(n)?'fin':'firm',tel:'',mail:'',addr:'',ic:vaIcon(e),open:''})})}catch{}
 return out.sort((a,b)=>a.n.localeCompare(b.n))}
Hooks.act('kpbsv',d=>{try{bsvSel=d.id;R('bsvi')}catch{}});
const kpMatchName=(n,txt)=>{const w=kpWords(n);if(!w.length)return!1;const t=kpLow(txt);return w.some(x=>t.includes(x))};
function kpLinked(k){const n=k.n;let C=[],D=[],L=[],Vg=[],F=[];
 try{C=vaContracts().filter(e=>kpMatchName(n,e.co||''))}catch{}
 try{D=Ke().items.filter(d=>d&&!d.type&&!d.del&&kpMatchName(n,[d.party,d.title].join(' ')))}catch{}
 try{L=(g.mail||[]).filter(x=>kpMatchName(n,[x.from,x.subj].join(' '))).concat((g.drafts||[]).filter(x=>kpMatchName(n,[x.to,x.subj].join(' '))).map(x=>Object.assign({out:1},x)))}catch{}
 Vg=kpVg().filter(v=>v.who===k.key||kpMatchName(n,v.whoN||''));
 try{F=stDlAll().filter(t=>vaDays(t.k)>=0&&kpMatchName(n,t.t)).slice(0,5)}catch{}
 return{C,D,L,Vg,F}}
function konScreen(){const D=kpD(),f=m.kpF||'all',q=kpLow(m.kpQ||'');let A=kpAll();
 const cnt={all:A.length};KP_CAT.forEach(c=>cnt[c]=A.filter(x=>x.cat===c).length);
 let L2=A.filter(x=>(f==='all'||(f==='fav'?D.fav[x.key]:x.cat===f))&&(!q||kpLow([x.n,x.sub,x.tel,x.mail].join(' ')).includes(q)));
 const favN=A.filter(x=>D.fav[x.key]).length;
 return`<div class="screen dhome fz va kpw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(kpt('kon'))}</h2></div><span></span></div>
 <input class="field kpq" type="search" placeholder="${i(kpt('find'))}" value="${i(m.kpQ||'')}" data-kpq>
 <div class="vachips">${[['all',kpt('all')],...(favN?[['fav','⭐ '+kpt('fav')]]:[]),...KP_CAT.filter(c=>cnt[c]).map(c=>[c,kpt('c_'+c)])].map(([k,l])=>`<button type="button" class="${f===k?'on':''}" data-act="kpf" data-k="${k}">${i(l)}${k==='fav'?'':' '+(cnt[k]||0)}</button>`).join('')}</div>
 ${L2.length?`<div class="vacard">${L2.map(x=>`<button type="button" class="varow" data-act="kpopen" data-k="${i(x.key)}"><span class="vaic">${x.ic}</span><span class="vatx"><b>${i(x.n)}${D.fav[x.key]?' ⭐':''}</b><small>${i([kpt('c_'+x.cat),x.sub,x.tel].filter(Boolean).join(' · '))}</small></span><span class="vaam">›</span></button>`).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(kpt('none'))}</p></div>`}
 <button type="button" class="valnk" data-act="kpimp">${i(kpt('imp'))}</button></div>`}
let kpSel=null;
const kpByKey=k=>kpAll().find(x=>x.key===k);
function konCard(k){const D=kpD(),H=(D.h[k.key]||[]).slice(),Ln=kpLinked(k);
 const auto=[...Ln.D.map(d=>({ts:d.date?Date.parse(d.date):d.ts||0,k:'doc',t:d.title||'—',act:`data-act="dzopen" data-id="${d.id}"`})),...Ln.L.map(x=>({ts:x.date?Date.parse(x.date):x.at||0,k:'let',t:(x.out?'→ ':'← ')+(x.subj||x.from||x.to||'—'),act:'data-act="go" data-to="letters"'})),...Ln.Vg.map(v=>({ts:v.ts,k:'vg',t:v.t,act:`data-act="vgopen" data-id="${v.id}"`}))];
 const all=H.map(x=>Object.assign({own:1},x)).concat(auto).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,25);
 const IC={call:'📞',meet:'🤝',note:'📝',doc:'📄',let:'✉️',vg:'📂'};
 return`<div class="screen dhome fz va kpw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(k.n)}</h2></div><button type="button" class="iconbtn" data-act="kpfav" data-k="${i(k.key)}" aria-label="fav">${D.fav[k.key]?'★':'☆'}</button></div>
 <div class="vahero"><small>${k.ic} ${i(kpt('c_'+k.cat))}</small><b class="kpn">${i(k.n)}</b>${k.sub?`<small>${i(k.sub)}</small>`:''}<div class="vahs"><span>${i(kpt('ctrN',{n:Ln.C.length}))}</span><span>${i(kpt('docN',{n:Ln.D.length}))}</span></div></div>
 ${k.tel||k.mail||k.addr?`<div class="vabtns kpcta">${k.tel?`<a class="vabtn p" href="tel:${i(k.tel.replace(/\s/g,''))}">📞 ${i(kpt('call'))}</a>`:''}${k.mail?`<a class="vabtn" href="mailto:${i(k.mail)}">✉️ ${i(kpt('mail'))}</a>`:''}${k.addr?`<a class="vabtn" href="https://maps.apple.com/?q=${encodeURIComponent(k.addr)}" target="_blank" rel="noopener">📍 ${i(kpt('map'))}</a>`:''}</div>`:''}
 ${k.open?`<button type="button" class="valnk" ${k.open}>${i(kpt('open'))} ›</button>`:''}
 ${Ln.F.length?`<h3 class="vash">${i(kpt('dls'))}</h3><div class="vacard">${Ln.F.map(t=>`<button type="button" class="varow" ${t.act||'data-act="go" data-to="dsrok"'}><span class="vaic">⏰</span><span class="vatx"><b>${i(t.t)}</b><small>${i(vaDate(t.k))}</small></span><span class="vaam">›</span></button>`).join('')}</div>`:''}
 ${Ln.C.length?`<h3 class="vash">${i(kpt('ctrs'))}</h3><div class="vacard">${Ln.C.map(e=>`<button type="button" class="varow" data-act="akopen" data-id="${e.id}"><span class="vaic">${vaIcon(e)}</span><span class="vatx"><b>${i(e.co||'—')}</b><small>${i(vaEur(vaMo(e)))} / Monat</small></span><span class="vaam">›</span></button>`).join('')}</div>`:''}
 <h3 class="vash">${i(kpt('hist'))}</h3><div class="vabtns kpadd"><button type="button" class="vabtn" data-act="kph" data-k="${i(k.key)}" data-t="call">${i(kpt('addCall'))}</button><button type="button" class="vabtn" data-act="kph" data-k="${i(k.key)}" data-t="meet">${i(kpt('addMeet'))}</button><button type="button" class="vabtn" data-act="kph" data-k="${i(k.key)}" data-t="note">${i(kpt('addNote'))}</button></div>
 <div class="vacard">${all.length?`<div class="aktl">${all.map(x=>`<button type="button" ${x.act||''}><b>${IC[x.k]||'•'} ${i(x.t)}</b><small>${i(kpt('k_'+x.k))} · ${i(x.ts?vaDate(new Date(x.ts).toISOString().slice(0,10)):'')}</small></button>`).join('')}</div>`:`<p class="dhnone">${i(kpt('noHist'))}</p>`}</div>
 <div class="vacard"><div class="kprem"><b>${i(kpt('rem'))}</b><div class="vachips">${[7,14,30,90].map(n=>`<button type="button" data-act="kprem" data-k="${i(k.key)}" data-n="${n}">${i(kpt('remIn',{n}))}</button>`).join('')}</div></div></div>
 <button type="button" class="vaadd" data-act="vgnew" data-k="${i(k.key)}">${i(kpt('newVg'))}</button></div>`}
['kon','konk','vg','vgd'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
Hooks.act('kpf',d=>{m.kpF=d.k;v()});Hooks.act('kpopen',d=>{kpSel=d.k;R('konk')});
Hooks.act('kpfav',d=>{const D=kpD();if(D.fav[d.k])delete D.fav[d.k];else D.fav[d.k]=1;$();v()});
document.addEventListener('input',e=>{try{if(m.route!=='kon'||!e.target.matches('[data-kpq]'))return;m.kpQ=e.target.value;const pos=e.target.selectionStart;v();setTimeout(()=>{const x=document.querySelector('[data-kpq]');if(x){x.focus();try{x.setSelectionRange(pos,pos)}catch{}}},0)}catch{}},!0);
Hooks.act('kph',dd=>{H(kpt('k_'+dd.t),`<div class="bsvys"><textarea class="field" data-kpt rows="3" placeholder="${i(kpt('what'))}"></textarea><label class="bsvl">${i(kpt('date'))}</label><input class="field" type="date" data-kpd value="${vaIso(0)}"><button type="button" class="vaadd" data-kps>${i(kpt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-kps]').onclick=()=>{const t=el.querySelector('[data-kpt]').value.trim()||kpt('k_'+dd.t),d=el.querySelector('[data-kpd]').value||vaIso(0),D=kpD();(D.h[dd.k]=D.h[dd.k]||[]).push({id:V(),ts:Date.parse(d+'T12:00:00'),k:dd.t,t});$();el.remove();v()}})});
Hooks.act('kprem',d=>{const k=kpByKey(d.k);if(!k)return;g.tasks=Array.isArray(g.tasks)?g.tasks:[];g.tasks.push({id:V(),t:kpt('remT',{n:k.n}),due:vaIso(+d.n),done:!1,ts:Date.now()});$();T(kpt('remOk'))});
/* VCF / CSV import */
function kpParseVcf(t){const out=[];String(t||'').replace(/\r\n[ \t]/g,'').split(/BEGIN:VCARD/i).slice(1).forEach(b=>{const get=r=>{const m1=b.match(new RegExp('^'+r+'(?:;[^:\\n]*)?:(.*)$','im'));return m1?m1[1].trim():''};
 const n=get('N').split(';'),fn=get('FN'),o={first:n[1]||'',last:n[0]||'',phone:get('TEL'),email:get('EMAIL'),org:get('ORG').replace(/;/g,' ').trim(),addr:get('ADR').split(';').filter(Boolean).join(', ')};
 if(!o.first&&!o.last&&fn){const p=fn.split(' ');o.first=p.slice(0,-1).join(' ')||fn;o.last=p.length>1?p[p.length-1]:''}if(o.first||o.last||o.org)out.push(o)});return out}
function kpParseCsv(t){const L2=String(t||'').split(/\r?\n/).filter(Boolean);if(L2.length<2)return[];const sep=L2[0].split(';').length>L2[0].split(',').length?';':',';const H2=L2[0].split(sep).map(x=>kpLow(x.replace(/"/g,'')));
 const ix=re=>H2.findIndex(h=>re.test(h));const iF=ix(/first|vorname|имя/),iL=ix(/last|nachname|фамил/),iN=ix(/^name$|^full/),iP=ix(/phone|tel|телеф/),iE=ix(/mail/),iO=ix(/org|firma|company|фирм/),iA=ix(/addr|adresse|адрес/);
 return L2.slice(1).map(l=>{const c=l.split(sep).map(x=>x.replace(/^"|"$/g,'').trim());const nm=iN>=0?c[iN]:'';return{first:iF>=0?c[iF]:nm.split(' ').slice(0,-1).join(' ')||nm,last:iL>=0?c[iL]:(nm.includes(' ')?nm.split(' ').pop():''),phone:iP>=0?c[iP]:'',email:iE>=0?c[iE]:'',org:iO>=0?c[iO]:'',addr:iA>=0?c[iA]:''}}).filter(o=>o.first||o.last||o.org)}
function kpImport(list){const C=typeof Va==='function'?Va():(g.contacts=g.contacts||[]);const key=o=>kpLow([o.first,o.last].join(' ').trim()||o.org),ph=s=>String(s||'').replace(/\D/g,'').slice(-8);
 let n=0,k=0;list.forEach(o=>{const dup=C.find(c=>key(c)===key(o)||(ph(o.phone)&&ph(c.phone)===ph(o.phone)));if(dup){k++;return}
  C.push({id:V(),first:o.first||o.org,last:o.last||'',org:o.org||'',phone:o.phone,email:o.email,addr:o.addr,cat:'',role:o.org||'',v2:1,notes:[],hist:[],files:[]});n++});$();return{n,k}}
Hooks.act('kpimp',()=>{const inp=document.createElement('input');inp.type='file';inp.accept='.vcf,.csv,text/vcard,text/csv';inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();
 r.onload=()=>{const t=String(r.result||''),L2=/BEGIN:VCARD/i.test(t)?kpParseVcf(t):kpParseCsv(t);if(!L2.length){T(kpt('impNo'));return}const x=kpImport(L2);T(kpt('impOk',x));v()};r.readAsText(f)};inp.click()});
/* ---------- Vorgänge ---------- */
const VG_ST=['neu','pruef','bearb','vorb','vers','zug','wart','antw','rueck','erl','arch'],VG_K=['antrag','einspr','kuend','rech','anfr','besch','sonst'];
const kpVg=()=>{if(!Array.isArray(g.vg))g.vg=[];return g.vg};
const vgGet=id=>kpVg().find(x=>x.id===id);
const vgLog=(x,t)=>{(x.log=x.log||[]).unshift({ts:Date.now(),t})};
const vgTab=x=>['erl','arch'].includes(x.st)?'done':['vers','zug','wart'].includes(x.st)?'wait':'open';
function vgScreen(){const L2=kpVg(),tab=m.vgT||'open',S=L2.filter(x=>vgTab(x)===tab).sort((a,b)=>(b.ts||0)-(a.ts||0));const n=k=>L2.filter(x=>vgTab(x)===k).length;
 const row=x=>{const sent=(x.log||[]).find(l=>/^vers/.test(l.k||''));const days=sent?Math.round((Date.now()-sent.ts)/864e5):null;
  return`<button type="button" class="varow" data-act="vgopen" data-id="${x.id}"><span class="vaic">📂</span><span class="vatx"><b>${i(x.t)}</b><small>${i([kpt('s_'+x.st),x.whoN,x.az?'Az. '+x.az:'',tab==='wait'&&days!=null?kpt('days',{n:days}):'',x.exp&&tab==='wait'?kpt('exp')+' '+vaDate(x.exp):''].filter(Boolean).join(' · '))}</small></span><span class="vaam">${x.due&&tab==='open'?`<small class="${vaDays(x.due)<0?'vaup':''}">${i(vaDate(x.due))}</small>`:'›'}</span></button>`};
 return`<div class="screen dhome fz va kpw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(kpt('vgT'))}</h2></div><span></span></div>
 <p class="vanote">${i(kpt('vgS'))}</p>
 <div class="fztabs vatabs">${['open','wait','done'].map(k=>`<button type="button" class="${tab===k?'on':''}" data-act="vgtab" data-k="${k}">${i(kpt('t_'+k))} ${n(k)}</button>`).join('')}</div>
 ${S.length?`<div class="vacard">${S.map(row).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(kpt('emptyVg'))}</p></div>`}
 <button type="button" class="vaadd" data-act="vgnew">${i(kpt('newVg'))}</button>
 <button type="button" class="valnk" data-act="go" data-to="kon">👥 ${i(kpt('konRow'))}</button></div>`}
function vgAnl(x){const A=x.anl||[];if(!A.length)return null;const miss=A.filter(a=>!a.doc);return miss.length?{c:'miss',t:kpt('a_miss',{n:miss.map(a=>a.t).join(', ')})}:{c:'ok',t:kpt('a_ok')}}
function vgCard(x){const D=(x.docs||[]).map(id=>{try{return Ke().items.find(d=>d.id===id)}catch{return null}}).filter(Boolean),an=vgAnl(x);
 return`<div class="screen dhome fz va kpw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(x.t)}</h2></div><span></span></div>
 <div class="vahero"><small>${i(kpt('k_'+(x.cat||'sonst')))}${x.az?' · Az. '+i(x.az):''}</small><b class="kpn">${i(kpt('s_'+x.st))}</b><small>${i(x.whoN||'')}</small></div>
 <h3 class="vash">${i(kpt('st'))}</h3><div class="vachips kpst">${VG_ST.map(s=>`<button type="button" class="${x.st===s?'on':''}" data-act="vgst" data-id="${x.id}" data-k="${s}">${i(kpt('s_'+s))}</button>`).join('')}</div>
 <div class="vacard"><label class="bsvl">${i(kpt('next'))}</label><input class="field" data-vgf="next" value="${i(x.next||'')}"><div class="kp2 d2"><div><label class="bsvl">${i(kpt('nextD'))}</label><input class="field" type="date" data-vgf="due" value="${i(x.due||'')}"></div><div><label class="bsvl">${i(kpt('exp'))}</label><input class="field" type="date" data-vgf="exp" value="${i(x.exp||'')}"></div></div>
  <label class="bsvl">${i(kpt('az'))}</label><input class="field" data-vgf="az" value="${i(x.az||'')}"></div>
 <h3 class="vash">${i(kpt('docs'))}</h3><div class="vacard">${D.map(d=>`<div class="varow akdr"><button type="button" class="akdo" data-act="dzopen" data-id="${d.id}"><span class="vaic">📄</span><span class="vatx"><b>${i(d.title||'—')}</b><small>${i(d.date?vaDate(d.date):'')}</small></span></button><button type="button" class="akx" data-act="vgdocx" data-id="${x.id}" data-d="${d.id}">✕</button></div>`).join('')}<button type="button" class="valnk" data-act="vgdoc" data-id="${x.id}">${i(kpt('docAdd'))}</button></div>
 <h3 class="vash">${i(kpt('anl'))}</h3><div class="vacard">${(x.anl||[]).map((a,j)=>`<div class="varow akdr"><span class="vaic">${a.doc?'✓':'○'}</span><span class="vatx"><b>${i(a.t)}</b></span><button type="button" class="akx" data-act="vganl" data-id="${x.id}" data-j="${j}">${a.doc?'↺':'📎'}</button></div>`).join('')}
  ${an?`<p class="kpan ${an.c}">${i(an.t)} <small>(${i(kpt('a_chk'))})</small></p>`:''}<div class="kp2"><input class="field" data-anlt placeholder="${i(kpt('anlPh'))}"><button type="button" class="vabtn" data-act="vganladd" data-id="${x.id}">${i(kpt('anlAdd'))}</button></div></div>
 ${vgTab(x)==='wait'?`<div class="vabtns">${(()=>{const k=kpByKey(x.who);return k&&k.tel?`<a class="vabtn" href="tel:${i(k.tel.replace(/\s/g,''))}">📞 ${i(kpt('call'))}</a>`:''})()}<button type="button" class="vabtn p" data-act="vgask" data-id="${x.id}">${i(kpt('ask'))}</button></div>`:''}
 <h3 class="vash">${i(kpt('logT'))}</h3><div class="vacard"><div class="aktl">${(x.log||[]).map(l=>`<button type="button"><b>${i(l.t)}</b><small>${i(new Date(l.ts).toLocaleString(he(),{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'}))}</small></button>`).join('')}</div></div>
 <div class="vabtns"><button type="button" class="vabtn" data-act="vgzip" data-id="${x.id}">📦 ${i(kpt('zip'))}</button><button type="button" class="vabtn" data-act="vgdel" data-id="${x.id}">${i(kpt('del'))}</button></div></div>`}
let vgSel=null;
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='kon')return konScreen();if(m.route==='konk'){const k=kpSel&&kpByKey(kpSel);if(!k){setTimeout(()=>R('kon',void 0,!0),0);return'<div class="screen"></div>'}return konCard(k)}
 if(m.route==='vg')return vgScreen();if(m.route==='vgd'){const x=vgSel&&vgGet(vgSel);if(!x){setTimeout(()=>R('vg',void 0,!0),0);return'<div class="screen"></div>'}return vgCard(x)}}catch(e){Hooks.err('kpscreen',e)}});
Hooks.act('vgtab',d=>{m.vgT=d.k;v()});Hooks.act('vgopen',d=>{vgSel=d.id;R('vgd')});
function vgCreate(o){const x=Object.assign({id:V(),t:'',cat:'sonst',who:'',whoN:'',az:'',st:'neu',ts:Date.now(),due:'',next:'',exp:'',docs:[],anl:[],log:[]},o);vgLog(x,kpt('l_new'));kpVg().unshift(x);$();return x}
Hooks.act('vgnew',dd=>{const k=dd&&dd.k?kpByKey(dd.k):null;H(kpt('newVg').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(kpt('title'))}</label><input class="field" data-vn="t" autocomplete="off">
 <label class="bsvl">${i(kpt('cat'))}</label><div class="vachips kpwrap">${VG_K.map((c,j)=>`<button type="button" class="${j===0?'on':''}" data-vk="${c}">${i(kpt('k_'+c))}</button>`).join('')}</div>
 <label class="bsvl">${i(kpt('who'))}</label><input class="field" data-vn="w" value="${i(k?k.n:'')}" list="kpdl" autocomplete="off"><datalist id="kpdl">${kpAll().slice(0,200).map(x=>`<option value="${i(x.n)}">`).join('')}</datalist>
 <label class="bsvl">${i(kpt('az'))}</label><input class="field" data-vn="az" autocomplete="off"><small class="verr" data-ve></small><button type="button" class="vaadd" data-vs>${i(kpt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');let cat='antrag';el.addEventListener('click',e=>{const c=e.target.closest('[data-vk]');if(c){cat=c.dataset.vk;el.querySelectorAll('[data-vk]').forEach(b=>b.classList.toggle('on',b===c));return}
  if(e.target.closest('[data-vs]')){const t=el.querySelector('[data-vn=t]').value.trim();if(!t){el.querySelector('[data-ve]').textContent=kpt('needT');return}const wn=el.querySelector('[data-vn=w]').value.trim(),wk=kpAll().find(x=>kpLow(x.n)===kpLow(wn));
   const x=vgCreate({t,cat,who:wk?wk.key:'',whoN:wn,az:el.querySelector('[data-vn=az]').value.trim()});el.remove();vgSel=x.id;R('vgd')}})})});
Hooks.act('vgst',d=>{const x=vgGet(d.id);if(!x||x.st===d.k)return;if(d.k==='zug'&&!(x.docs||[]).some(id=>{try{const doc=Ke().items.find(z=>z.id===id);return doc&&/zustell|einschreiben|rückschein|rueckschein|sendungsverfolgung|empfangsbest|eingangsbest|zugang/i.test([doc.title,doc.snip].join(' '))}catch{return!1}})&&!x.zugOk){
  H(kpt('s_zug'),`<div class="bsvys"><p>${i(kpt('zugNeed'))}</p><button type="button" class="vaadd" data-zd>${i(kpt('docAdd'))}</button></div>`,el=>{el.classList.add('bsvsh');el.querySelector('[data-zd]').onclick=()=>{el.remove();vgDocSheet(x,1)}});return}
 x.st=d.k;vgLog(Object.assign(x,{}),kpt('l_st',{s:kpt('s_'+d.k)}));x.log[0].k=d.k;if(d.k==='wart'&&!x.exp){x.exp=vaIso(28)}
 if(d.k==='wart'&&x.exp){g.tasks=Array.isArray(g.tasks)?g.tasks:[];if(!g.tasks.some(t=>t.vg===x.id&&!t.done))g.tasks.push({id:V(),t:'Wiedervorlage: '+x.t,due:x.exp,done:!1,vg:x.id,ts:Date.now()})}$();v()});
document.addEventListener('change',e=>{try{const f=e.target.closest&&e.target.closest('[data-vgf]');if(!f||m.route!=='vgd')return;const x=vgGet(vgSel);if(!x)return;const k=f.dataset.vgf,val=f.value.trim();if(x[k]===val)return;x[k]=val;
 if(k==='next'&&val)vgLog(x,kpt('l_next',{t:val}));if(k==='due'&&val&&x.next){g.tasks=Array.isArray(g.tasks)?g.tasks:[];const tk=g.tasks.find(t=>t.vgn===x.id&&!t.done);if(tk){tk.due=val;tk.t=x.next+' – '+x.t}else g.tasks.push({id:V(),t:x.next+' – '+x.t,due:val,done:!1,vgn:x.id,ts:Date.now()})}$()}catch(er){Hooks.err('vgf',er)}},!0);
function vgDocSheet(x,zug){let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,80)}catch{}
 H(kpt('docAdd').replace(/^＋\s*/,''),`<div class="bsvys"><div class="krdl">${D.map(d=>`<label class="bsvtog"><input type="checkbox" data-vgd="${d.id}" ${(x.docs||[]).includes(d.id)?'checked':''}><span>${i(d.title||'—')}</span></label>`).join('')}</div><button type="button" class="vaadd" data-vgds>${i(kpt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-vgds]').onclick=()=>{const was=new Set(x.docs||[]);x.docs=[...el.querySelectorAll('[data-vgd]:checked')].map(c=>c.dataset.vgd);x.docs.filter(id=>!was.has(id)).forEach(id=>{const d=D.find(z=>z.id===id);vgLog(x,kpt('l_doc',{t:d?d.title:'—'}))});
  if(zug&&x.docs.length>was.size){x.zugOk=1;x.st='zug';vgLog(x,kpt('l_st',{s:kpt('s_zug')}))}$();el.remove();v()}})}
Hooks.act('vgdoc',d=>{const x=vgGet(d.id);x&&vgDocSheet(x)});Hooks.act('vgdocx',d=>{const x=vgGet(d.id);if(!x)return;x.docs=(x.docs||[]).filter(z=>z!==d.d);$();v()});
Hooks.act('vganladd',d=>{const x=vgGet(d.id),inp=document.querySelector('[data-anlt]');if(!x||!inp||!inp.value.trim())return;(x.anl=x.anl||[]).push({t:inp.value.trim(),doc:''});$();v()});
Hooks.act('vganl',dd=>{const x=vgGet(dd.id),a=x&&(x.anl||[])[+dd.j];if(!a)return;if(a.doc){a.doc='';$();v();return}const D=(x.docs||[]).map(id=>Ke().items.find(z=>z.id===id)).filter(Boolean);if(!D.length){vgDocSheet(x);return}
 H(a.t,`<div class="bsvys">${D.map(d=>`<button type="button" class="varow" data-ad="${d.id}"><span class="vaic">📄</span><span class="vatx"><b>${i(d.title||'—')}</b></span></button>`).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-ad]');if(!b)return;a.doc=b.dataset.ad;$();el.remove();v()})})});
Hooks.act('vgask',d=>{const x=vgGet(d.id);if(!x)return;const me=(()=>{try{return ja()}catch{return{}}})(),nm=[me.first,me.last].filter(Boolean).join(' ')||'—',sent=(x.log||[]).find(l=>l.k==='vers'||l.k==='wart');
 const txt=`${kpt('askT')}${x.az?' – Aktenzeichen '+x.az:''}\n\nSehr geehrte Damen und Herren,\n\nam ${sent?new Date(sent.ts).toLocaleDateString('de-DE'):'…'} habe ich Ihnen mein Schreiben „${x.t}“ gesendet. Bisher habe ich keine Antwort erhalten. Bitte teilen Sie mir den aktuellen Stand der Bearbeitung mit.\n\nMit freundlichen Grüßen\n${nm}`;
 const k=kpByKey(x.who);H(kpt('ask'),`<div class="bsvys"><textarea class="field" rows="10" data-askt>${i(txt)}</textarea><div class="vabtns">${k&&k.mail?`<a class="vabtn p" data-askm href="#">✉️ ${i(kpt('mail'))}</a>`:''}<button type="button" class="vabtn" data-askc>📋 ${i(cv5n(['Скопировать','Kopieren','Copy']))}</button></div></div>`,
 el=>{el.classList.add('bsvsh');const cur=()=>el.querySelector('[data-askt]').value;const mb=el.querySelector('[data-askm]');mb&&(mb.onclick=e=>{e.preventDefault();location.href='mailto:'+encodeURIComponent(k.mail)+'?subject='+encodeURIComponent(kpt('askT')+(x.az?' '+x.az:''))+'&body='+encodeURIComponent(cur())});
  el.querySelector('[data-askc]').onclick=()=>{try{navigator.clipboard.writeText(cur()).then(()=>T(kpt('copied')))}catch{}}})});
Hooks.act('vgdel',d=>{const x=vgGet(d.id);if(!x)return;if(m.vgDelArm!==x.id){m.vgDelArm=x.id;T(kpt('delQ'));return}g.vg=kpVg().filter(z=>z.id!==x.id);m.vgDelArm=null;$();R('vg',void 0,!0)});
Hooks.act('vgzip',async d=>{const x=vgGet(d.id);if(!x)return;try{const docs=(x.docs||[]).map(id=>Ke().items.find(z=>z.id===id)).filter(Boolean);const a=[],b64=s=>{const c=atob(s),u=new Uint8Array(c.length);for(let j=0;j<c.length;j++)u[j]=c.charCodeAt(j);return u},used=new Set(),un=n=>{let c=n,k=2;while(used.has(c))c=n.replace(/(\.[^.\/]+)?$/,` (${k++})$1`);used.add(c);return c};
 for(const doc of docs){const dir=r4((doc.date?doc.date+' ':'')+(doc.title||'Dokument'));for(const f of doc.files||[])try{const p=await ni(f);p&&a.push({name:un(dir+'/'+r4(f.name||'datei.'+l4(f.type))),data:b64(p)})}catch{}let n=0;for(const f of doc.pages||[]){n++;try{const p=await ni(f);p&&a.push({name:un(dir+'/'+String(n).padStart(2,'0')+'.'+l4(f.type)),data:b64(p)})}catch{}}}
 const sum=[x.t,kpt('k_'+x.cat)+(x.az?' · Az. '+x.az:''),x.whoN||'',kpt('st')+': '+kpt('s_'+x.st),'',kpt('logT')+':',...(x.log||[]).map(l=>new Date(l.ts).toLocaleString('de-DE')+' – '+l.t)].join('\n');a.unshift({name:'00 Vorgang.txt',data:new TextEncoder().encode(sum)});
 const file=new File([DZ(a)],r4('Vorgang '+x.t)+'.zip',{type:'application/zip'});let ok=!1;try{ok=!!(navigator.canShare&&navigator.canShare({files:[file]}))}catch{}if(ok)navigator.share({files:[file]}).catch(()=>{});else try{Hl(file)}catch{}}catch(er){Hooks.err('vgzip',er)}});
/* a letter → a Vorgang; a new letter with the same Aktenzeichen → answer to it */
const kpAz=d=>{const t=[d.title,eiTxt(d)].join(' ');const m1=t.match(/(aktenzeichen|az\.?|geschäftszeichen|gz\.?|steuernummer|vorgangsnummer|unser zeichen)\s*[:.]?\s*([A-Z0-9][A-Z0-9 \/\-.]{3,24}[A-Z0-9])/i);return m1?m1[2].replace(/\s+[A-Za-zÄÖÜäöüß]{3,}.*$/,'').trim():''};
function kpVgFor(d){const az=kpAz(d),dig=s=>String(s||'').replace(/[^A-Z0-9]/gi,'').toUpperCase();const open=kpVg().filter(x=>!['erl','arch'].includes(x.st)&&!(x.docs||[]).includes(d.id));
 if(az){const x=open.find(v=>v.az&&dig(v.az)===dig(az));if(x)return{x,why:'az'}}const p=d.party||'';if(p){const x=open.find(v=>v.whoN&&kpMatchName(v.whoN,p));if(x)return{x,why:'who'}}return null}
function kpDocPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.kpdc'))return;const d=Ke().items.find(z=>z.id===m.bdid);if(!d||d.type)return;
 const inVg=kpVg().find(x=>(x.docs||[]).includes(d.id));const mt=!inVg&&kpVgFor(d);let html='';
 if(inVg)html=`<button type="button" class="vaabot kpdc" data-act="vgopen" data-id="${inVg.id}"><span><b>📂 ${i(inVg.t)}</b><small>${i(kpt('s_'+inVg.st))}</small></span><span class="akch">›</span></button>`;
 else if(mt)html=`<div class="vacard aksug kpdc"><b>📂 ${i(kpt('fitVg',{t:mt.x.t}))}</b><p>${i(mt.why==='az'?kpt('fitVgS'):kpt('fitVgS2'))}</p><div class="vabtns"><button type="button" class="vabtn p" data-act="kpvgyes" data-id="${d.id}" data-v="${mt.x.id}">${i(cv5n(['Да','Ja','Yes']))}</button><button type="button" class="vabtn" data-act="kpvgno" data-id="${d.id}">${i(cv5n(['Нет','Nein','No']))}</button></div></div>`;
 else if(/brief|schreiben|bescheid|letter|письм|mahnung|antrag|kündigung|kuendigung|einspruch|widerspruch/i.test([d.title,d.dtname,d.kind].join(' '))||d.party)html=`<button type="button" class="vabtn kpdc kpasvg" data-act="kpasvg" data-id="${d.id}">📂 ${i(kpt('asVg'))}</button>`;
 if(!html)return;const w=sc.querySelector('.akdcw');if(w)w.insertAdjacentHTML('beforeend',html);else{const t=sc.querySelector(':scope>.bgtitle,:scope>.sub-hdr');(t||sc.firstElementChild).insertAdjacentHTML('afterend',`<div class="akdcw">${html}</div>`)}}catch(e){Hooks.err('kpdoc',e)}}
Hooks.on('render',()=>setTimeout(kpDocPut,20));
Hooks.act('kpvgyes',dd=>{const x=vgGet(dd.v),d=Ke().items.find(z=>z.id===dd.id);if(!x||!d)return;(x.docs=x.docs||[]).push(d.id);vgLog(x,kpt('l_doc',{t:d.title||'—'}));if(['vers','zug','wart'].includes(x.st)){x.st='antw';vgLog(x,kpt('l_st',{s:kpt('s_antw')}))}$();v()});
Hooks.act('kpvgno',dd=>{const d=Ke().items.find(z=>z.id===dd.id);if(!d)return;d.vgNo=1;$();v()});
Hooks.act('kpasvg',dd=>{const d=Ke().items.find(z=>z.id===dd.id);if(!d)return;const p=d.party||'',wk=p?kpAll().find(x=>kpMatchName(x.n,p)):null;const t=/einspruch|widerspruch/i.test(d.title||'')?'einspr':/kündigung|kuendigung/i.test(d.title||'')?'kuend':/rechnung|mahnung/i.test(d.title||'')?'rech':/bescheid|bestätigung/i.test(d.title||'')?'besch':/antrag/i.test(d.title||'')?'antrag':'sonst';
 const x=vgCreate({t:d.title||'—',cat:t,who:wk?wk.key:'',whoN:wk?wk.n:p,az:kpAz(d),docs:[d.id],st:'pruef'});vgLog(x,kpt('l_doc',{t:d.title||'—'}));$();T(kpt('asVgOk'));vgSel=x.id;R('vgd')});
/* entries: Post screen, Familie screen, search places */
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;const row=(act,ic,t,s)=>`<button type="button" class="vaabot abent" ${act}><span><b>${ic} ${i(t)}</b><small>${i(s)}</small></span><span class="akch">›</span></button>`;
 if(m.route==='post'){const n=kpVg().filter(x=>vgTab(x)!=='done').length;const e=h.lastIndexOf('</div>');return h.slice(0,e)+row('data-act="go" data-to="vg"','📂',kpt('postRow')+(n?' · '+n:''),kpt('postRowS'))+row('data-act="go" data-to="kon"','👥',kpt('konRow'),kpt('konRowS'))+h.slice(e)}
 if(m.route==='people'){const e=h.lastIndexOf('</div>');return h.slice(0,e)+row('data-act="go" data-to="kon"','👥',kpt('konRow'),kpt('konRowS'))+h.slice(e)}}catch(er){Hooks.err('kpent',er)}return h});
try{SP_L.push(['kon','person',kpS.kon,['kontakt','контакт','contact','adress','адрес','telefonbuch']],['vg','mail',kpS.vgT,['vorgang','antrag','заявлен','дело','application','wiedervorlage','aktenzeichen']])}catch(e){Hooks.err('kpsp',e)}
/* the Smart Search finds Vorgänge too */
try{const _f=td9find;td9find=function(q){const G=_f.apply(this,arguments)||[];try{const T2=zqTerms(q).T;if(!T2.length)return G;const R2=kpVg().filter(x=>zqHit([x.t,x.az,x.whoN,kpt('k_'+x.cat)].join(' '),T2)).map(x=>({ic:'mail',t:x.t,s:[kpt('s_'+x.st),x.whoN,x.az].filter(Boolean).join(' · '),act:`data-act="vgopen" data-id="${x.id}"`}));if(R2.length)G.push({k:'sVg',rows:R2.slice(0,8)});
 const K2=kpAll().filter(x=>!x.key.startsWith('c:')&&zqHit([x.n,kpt('c_'+x.cat)].join(' '),T2)).map(x=>({ic:'person',t:x.n,s:kpt('c_'+x.cat),act:`data-act="kpopen" data-k="${x.key}"`}));if(K2.length)G.push({k:'sKon',rows:K2.slice(0,6)})}catch(e){Hooks.err('kpfind',e)}return G}}catch(e){Hooks.err('kpfind0',e)}
try{Object.entries({ru:['Дела','Контакты'],de:['Vorgänge','Kontakte'],en:['Cases','Contacts'],tr:['Dosyalar','Kişiler'],uk:['Справи','Контакти'],pl:['Sprawy','Kontakty'],fr:['Dossiers','Contacts'],es:['Expedientes','Contactos']}).forEach(([l,[a,b]])=>{if(TD9T[l]){TD9T[l].sVg=a;TD9T[l].sKon=b}})}catch{}
Hooks.css('docs-kontakte-post',`
.kpq{margin:0 0 10px}.kpn{font-size:24px!important;line-height:1.2}.kpcta a{text-decoration:none;display:block}.kpadd{margin:0 0 10px}.kpadd .vabtn{font-size:14px;padding:9px 4px}
.kprem{padding:10px 0}.kprem b{display:block;margin-bottom:8px}.kprem .vachips{flex-wrap:wrap;margin:0}
.kpst{flex-wrap:wrap;overflow:visible!important;height:auto!important}.kpst button{font-size:13px;padding:6px 11px}.kpwrap{flex-wrap:wrap}.kp2{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:end;margin:6px 0}.kp2.d2{grid-template-columns:1fr 1fr}
.kpan{font-size:14px;margin:8px 0;padding:8px 10px;border-radius:12px}.kpan.ok{background:color-mix(in srgb,var(--bd-acc,#1f7a63) 12%,transparent)}.kpan.miss{background:#fdebd0;color:#7a4f06}.kpan small{opacity:.75}
.kpasvg{display:block;width:100%;margin:0 0 10px}
`);
