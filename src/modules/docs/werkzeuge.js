/* ===== Butler Docs: Profil-Angaben, Daten & Speicher, Sicherheitsprotokoll, Hilfe, Regeln (v85) =====
   All on the phone, nothing sent anywhere.
   tlxp  – personal details: Bundesland (the same g.bl the calendar uses for holidays), Steuer-ID and Steuerklasse
           (optional, only for the user's own overview; the Steuer-ID is checked for 11 digits, nothing more).
   tlxd  – data & storage: used/free space (navigator.storage.estimate), counts, documents without a real title,
           possible duplicates (same title + same page count), ended contracts, CSV export of contracts, expenses,
           contacts and purchases (semicolon CSV for Excel), «keep data» (navigator.storage.persist).
   log   – g.secLog: app opened, backup, vault opened, CSV export, rules changed — shown in «Sicherheit» (last 20).
   tlxh  – help: short FAQ with a search field, Butler answers FAQ questions in the chat, «write to support» opens the
           user's own mail app with version and device filled in (no address is invented: the user enters it).
   tlxr  – rules: «if the sender/text contains X → put new documents into folder Y». Only documents added after the rule
           are touched, each only once (d.rlx), and every move is logged. Ready presets to start with.
   Data: g.pd {sid,skl}, g.secLog [{ts,k,t}], g.rules [{id,w,f,ts,n}] */
const tlxS={
 pd:['Личные данные','Persönliche Angaben','Personal details'],pdS:['Земля, Steuer-ID, класс — по желанию','Bundesland, Steuer-ID, Steuerklasse – freiwillig','State, tax ID, tax class – optional'],
 bl:['Федеральная земля','Bundesland','Federal state'],blS:['для праздников в календаре','für Feiertage im Kalender','for holidays in the calendar'],sid:['Steuer-ID (11 цифр)','Steuer-ID (11 Ziffern)','Tax ID (11 digits)'],skl:['Налоговый класс','Steuerklasse','Tax class'],
 sidBad:['Steuer-ID должна содержать 11 цифр','Die Steuer-ID hat 11 Ziffern','The tax ID has 11 digits'],pdNote:['Хранится только на телефоне. Нужно лишь для Вашего обзора.','Bleibt nur auf dem Telefon. Nur für Ihre Übersicht.','Stays on the phone only. Just for your overview.'],save:['Сохранить','Speichern','Save'],saved:['Сохранено','Gespeichert','Saved'],
 dat:['Данные и память','Daten & Speicher','Data & storage'],datS:['место, дубликаты, архив, CSV','Platz, Duplikate, Archiv, CSV','space, duplicates, archive, CSV'],
 used:['Занято %u из %q','Belegt: %u von %q','Used: %u of %q'],noEst:['Браузер не сообщает размер памяти','Der Browser nennt keine Speichergröße','The browser does not report storage size'],
 keep:['Не удалять данные автоматически','Daten dauerhaft behalten','Keep data permanently'],keepS:['просим браузер не чистить память','Browser bitten, nichts zu löschen','ask the browser not to clear storage'],keepOn:['Браузер подтвердил','Vom Browser bestätigt','Confirmed by the browser'],keepNo:['Браузер не подтвердил — делайте резервную копию','Browser hat nicht bestätigt – bitte Sicherung machen','Browser did not confirm – please make a backup'],
 cnt:['Что хранится','Was gespeichert ist','What is stored'],c_doc:['Документы','Dokumente','Documents'],c_ctr:['Договоры','Verträge','Contracts'],c_kon:['Контакты','Kontakte','Contacts'],c_kauf:['Покупки','Käufe','Purchases'],
 chk:['Проверить','Zu prüfen','To check'],noTitle:['Без понятного названия: %n','Ohne klaren Titel: %n','Without a clear title: %n'],dup:['Возможные дубликаты: %n','Mögliche Duplikate: %n','Possible duplicates: %n'],ended:['Закончившиеся договоры: %n','Beendete Verträge: %n','Ended contracts: %n'],allOk:['Всё в порядке','Alles in Ordnung','All fine'],
 dupNote:['Одинаковое название и число страниц. Батлер ничего не удаляет сам.','Gleicher Titel und gleiche Seitenzahl. Butler löscht nichts selbst.','Same title and page count. Butler deletes nothing by itself.'],
 csv:['Экспорт CSV','CSV-Export','CSV export'],csvS:['для Excel, разделитель «;»','für Excel, Trennzeichen „;“','for Excel, separator “;”'],x_ctr:['Договоры.csv','Verträge.csv','Contracts.csv'],x_aus:['Расходы.csv','Ausgaben.csv','Expenses.csv'],x_kon:['Контакты.csv','Kontakte.csv','Contacts.csv'],x_kauf:['Покупки.csv','Käufe.csv','Purchases.csv'],empty:['Пусто — нечего выгружать','Leer – nichts zu exportieren','Empty – nothing to export'],
 log:['Журнал безопасности','Sicherheitsprotokoll','Security log'],logS:['что происходило с Вашими данными на этом телефоне','was mit Ihren Daten auf diesem Telefon geschah','what happened to your data on this phone'],logNone:['Записей пока нет','Noch keine Einträge','No entries yet'],logClr:['Очистить журнал','Protokoll leeren','Clear log'],
 l_open:['Приложение открыто','App geöffnet','App opened'],l_bk:['Создана резервная копия','Sicherung erstellt','Backup created'],l_vault:['Открыт сейф','Tresor geöffnet','Vault opened'],l_csv:['Экспорт: %n','Export: %n','Export: %n'],l_rule:['Правило: %n','Regel: %n','Rule: %n'],l_move:['Перемещено правилом: %n','Per Regel verschoben: %n','Moved by rule: %n'],l_pd:['Изменены личные данные','Persönliche Angaben geändert','Personal details changed'],
 help:['Помощь','Hilfe','Help'],helpS:['вопросы и ответы, написать в поддержку','Fragen & Antworten, Support schreiben','questions & answers, write to support'],helpQ:['Поиск по вопросам','Fragen durchsuchen','Search questions'],
 sup:['Написать в поддержку','An den Support schreiben','Write to support'],supS:['откроется Ваша почта; версия уже вписана','öffnet Ihr Mailprogramm; Version ist eingetragen','opens your mail app; version included'],noHit:['Ничего не найдено — спросите Батлера','Nichts gefunden – fragen Sie Butler','Nothing found – ask Butler'],
 rules:['Правила','Regeln','Rules'],rulesS:['новые документы сами в нужную папку','neue Dokumente automatisch in den Ordner','new documents into the right folder'],
 rIf:['Если отправитель или текст содержит','Wenn Absender oder Text enthält','If sender or text contains'],rThen:['то в папку','dann in Ordner','then into folder'],rAdd:['＋ Правило','＋ Regel','＋ Rule'],rNone:['Правил пока нет.','Noch keine Regeln.','No rules yet.'],
 rNote:['Правило касается только новых документов, каждого один раз. Всё видно в журнале.','Eine Regel gilt nur für neue Dokumente, jedes nur einmal. Alles steht im Protokoll.','A rule applies only to new documents, each once. Everything is logged.'],
 rPre:['Готовые примеры','Vorlagen','Presets'],rHits:['сработало: %n','angewendet: %n','applied: %n'],rNeed:['Впишите слово и выберите папку','Bitte Wort eintragen und Ordner wählen','Please enter a word and choose a folder'],del:['Удалить','Löschen','Delete'],
 q1:['Где хранятся мои данные?','Wo liegen meine Daten?','Where is my data stored?'],a1:['Только на этом телефоне, в памяти браузера. Сервера нет. Поэтому регулярно делайте резервную копию (Профиль → Безопасность).','Nur auf diesem Telefon, im Speicher des Browsers. Es gibt keinen Server. Darum regelmäßig eine Sicherung machen (Profil → Sicherheit).','Only on this phone, in the browser storage. There is no server. So make a backup regularly (Profile → Security).'],
 q2:['Как перенести данные на новый телефон?','Wie komme ich auf ein neues Telefon?','How do I move to a new phone?'],a2:['Сделайте резервную копию (файл), перешлите её себе и на новом телефоне выберите «Восстановить».','Sicherung (Datei) erstellen, an sich selbst senden und auf dem neuen Telefon „Wiederherstellen“ wählen.','Create a backup file, send it to yourself and choose “Restore” on the new phone.'],
 q3:['Подключается ли Батлер к банку или почте?','Verbindet sich Butler mit Bank oder E-Mail?','Does Butler connect to my bank or email?'],a3:['Нет. Выписки и письма Вы добавляете сами (скан, файл, CSV). Так данные не покидают телефон.','Nein. Auszüge und Briefe fügen Sie selbst hinzu (Scan, Datei, CSV). So verlassen die Daten das Telefon nicht.','No. You add statements and letters yourself (scan, file, CSV). So the data never leaves the phone.'],
 q4:['Garantie и Gewährleistung — в чём разница?','Garantie oder Gewährleistung – was ist der Unterschied?','Warranty vs statutory warranty – the difference?'],a4:['Gewährleistung — по закону, 2 года от покупки, отвечает продавец. Garantie — добровольное обещание производителя, условия в документе.','Gewährleistung gilt per Gesetz 2 Jahre ab Kauf, der Händler haftet. Garantie ist ein freiwilliges Versprechen des Herstellers, Bedingungen im Dokument.','Statutory warranty: by law, 2 years from purchase, the shop is liable. Warranty: a voluntary promise by the maker, terms in the document.'],
 q5:['Батлер отправляет декларацию в ELSTER?','Sendet Butler die Steuererklärung an ELSTER?','Does Butler file the tax return to ELSTER?'],a5:['Нет. Батлер собирает чеки и папку для консультанта; отправляете Вы сами через ELSTER или консультанта.','Nein. Butler sammelt Belege und die Mappe für den Berater; senden tun Sie selbst über ELSTER oder Ihren Berater.','No. Butler collects receipts and the adviser folder; you file via ELSTER or your adviser.'],
 q6:['Как работают напоминания?','Wie funktionieren Erinnerungen?','How do reminders work?'],a6:['Сроки видны в колокольчике на главной. Push-уведомления появятся с версией из App Store; уже сейчас можно добавить срок в календарь телефона (.ics).','Fristen stehen in der Glocke auf Start. Push kommt mit der App-Store-Version; schon jetzt lässt sich eine Frist in den Telefonkalender übernehmen (.ics).','Deadlines are in the bell on Start. Push comes with the App Store version; you can already add a deadline to the phone calendar (.ics).'],
 q7:['Даёт ли Батлер юридические или медицинские советы?','Gibt Butler Rechts- oder Gesundheitsrat?','Does Butler give legal or medical advice?'],a7:['Нет. Батлер упорядочивает, считает сроки и готовит черновики. Решения — за Вами, юристом или врачом.','Nein. Butler ordnet, rechnet Fristen und bereitet Entwürfe vor. Entscheiden tun Sie, Anwalt oder Ärztin.','No. Butler organizes, counts deadlines and prepares drafts. You, a lawyer or a doctor decide.'],
 q8:['Как защитить приложение?','Wie schütze ich die App?','How do I protect the app?'],a8:['Код блокировки в Профиле, сейф для важных документов, отдельный код для «Здоровья».','Sperrcode im Profil, Tresor für wichtige Dokumente, eigener Code für „Gesundheit“.','Lock code in Profile, a vault for key documents, an own code for “Health”.'],
 p_fa:['Finanzamt','Finanzamt','Finanzamt'],p_kk:['Krankenkasse','Krankenkasse','Krankenkasse'],p_vs:['Versicherung','Versicherung','Versicherung']};
const tlxt=(k,o)=>{let s=cv5n(tlxS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const tlxRow=(ic,t,s,act,right)=>`<button type="button" class="varow" ${act||''}><span class="vaic">${ic}</span><span class="vatx"><b>${i(t)}</b>${s?`<small>${i(s)}</small>`:''}</span><span class="vaam">${right!=null?right:(act?'›':'')}</span></button>`;
const tlxHd=t=>`<div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(t)}</h2></div><span></span></div>`;
/* ---- security log ---- */
function tlxLog(k,t){try{const L2=Array.isArray(g.secLog)?g.secLog:(g.secLog=[]);L2.unshift({ts:Date.now(),k,t:t||''});if(L2.length>100)L2.length=100;$()}catch{}}
const tlxLogTxt=x=>({open:tlxt('l_open'),bk:tlxt('l_bk'),vault:tlxt('l_vault'),csv:tlxt('l_csv',{n:x.t}),rule:tlxt('l_rule',{n:x.t}),move:tlxt('l_move',{n:x.t}),pd:tlxt('l_pd')})[x.k]||x.t||x.k;
let tlxOpened=0,tlxLastR='';
Hooks.on('render',()=>{try{if(!tlxOpened&&g&&ja&&(()=>{try{return ja().first}catch{return 0}})()){tlxOpened=1;tlxLog('open')}if(m.route==='dsafe'&&tlxLastR!=='dsafe')tlxLog('vault');tlxLastR=m.route}catch{}});
document.addEventListener('click',e=>{try{const b=e.target.closest&&e.target.closest('[data-act="pvbk"]');if(b)tlxLog('bk')}catch{}},!0);
/* ---- personal details ---- */
const tlxPd=()=>g.pd&&typeof g.pd==='object'?g.pd:(g.pd={});
function tlxpScreen(){const P=tlxPd(),bl=(KN_BL.find(x=>x[0]===g.bl)||[])[1]||'—';
 return`<div class="screen dhome fz va tlxw">${tlxHd(tlxt('pd'))}<div class="vacard">${tlxRow('🗺',tlxt('bl'),tlxt('blS'),'data-act="knbl"',`<small>${i(bl)}</small>`)}</div>
 <div class="vacard tlxf"><label class="bsvl">${i(tlxt('sid'))}</label><input class="field" inputmode="numeric" maxlength="14" data-tlxs value="${i(P.sid||'')}" autocomplete="off">
 <label class="bsvl">${i(tlxt('skl'))}</label><div class="vachips">${['I','II','III','IV','V','VI'].map(k=>`<button type="button" class="${P.skl===k?'on':''}" data-act="tlxskl" data-k="${k}">${k}</button>`).join('')}</div>
 <small class="verr" data-tlxe></small><button type="button" class="vaadd" data-act="tlxpsave">${i(tlxt('save'))}</button></div><p class="vanote">${i(tlxt('pdNote'))}</p></div>`}
Hooks.act('tlxskl',d=>{const P=tlxPd();P.skl=P.skl===d.k?'':d.k;$();tlxLog('pd');v()});
Hooks.act('tlxpsave',()=>{const el=document.querySelector('[data-tlxs]');if(!el)return;const s2=el.value.replace(/\s/g,'');if(s2&&!/^\d{11}$/.test(s2)){const e=document.querySelector('[data-tlxe]');e&&(e.textContent=tlxt('sidBad'));return}tlxPd().sid=s2;$();tlxLog('pd');T(tlxt('saved'));v()});
/* ---- data & storage ---- */
const tlxDocs=()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const tlxNoTitle=()=>tlxDocs().filter(d=>!String(d.title||'').trim()||/^(scan|img|image|dokument|document|foto|photo|bild|pxl|dsc)[\s_-]*\d*(\.\w+)?$/i.test(String(d.title).trim()));
function tlxDups(){const by={};tlxDocs().forEach(d=>{const t=String(d.title||'').toLowerCase().replace(/\s+/g,' ').trim();if(!t||t.length<3)return;const k=t+'|'+((d.pages||[]).length||(d.files||[]).length);(by[k]=by[k]||[]).push(d)});return Object.values(by).filter(a=>a.length>1)}
const tlxEnded=()=>{try{const t=vaIso(0);return vaContracts().filter(e=>e.end&&e.end<t)}catch{return[]}};
const tlxMb=b=>b>=1e9?(b/1e9).toLocaleString(he(),{maximumFractionDigits:1})+' GB':Math.max(0.1,b/1e6).toLocaleString(he(),{maximumFractionDigits:1})+' MB';
function tlxdScreen(){const D=tlxDocs(),nt=tlxNoTitle(),du=tlxDups(),en=tlxEnded(),sub=m.tlxV||'';let ctr=[];try{ctr=vaContracts()}catch{}let kon=[];try{kon=Va()}catch{}
 const list=sub==='nt'?nt.map(d=>[d]):sub==='dup'?du:sub==='end'?en.map(d=>[d]):null;
 return`<div class="screen dhome fz va tlxw">${tlxHd(tlxt('dat'))}
 <div class="vahero tlxst"><small>${i(tlxt('dat'))}</small><b class="kpn" data-tlxq>…</b><span class="vabar"><i data-tlxb style="width:0%"></i></span></div>
 <div class="vacard">${tlxRow('📌',tlxt('keep'),m.tlxP==null?tlxt('keepS'):m.tlxP?tlxt('keepOn'):tlxt('keepNo'),'data-act="tlxkeep"',m.tlxP?'✓':'›')}</div>
 <h3 class="vash">${i(tlxt('cnt'))}</h3><div class="vacard tlxcn">${[['📄','c_doc',D.length],['📑','c_ctr',ctr.length],['👤','c_kon',kon.length],['🛍','c_kauf',(g.kauf||[]).length]].map(([ic,k,n])=>`<div><span>${ic}</span><b>${n}</b><small>${i(tlxt(k))}</small></div>`).join('')}</div>
 <h3 class="vash">${i(tlxt('chk'))}</h3><div class="vacard">${nt.length||du.length||en.length?[nt.length?tlxRow('🏷',tlxt('noTitle',{n:nt.length}),'','data-act="tlxv" data-k="nt"'):'',du.length?tlxRow('⧉',tlxt('dup',{n:du.length}),tlxt('dupNote'),'data-act="tlxv" data-k="dup"'):'',en.length?tlxRow('🗄',tlxt('ended',{n:en.length}),'','data-act="tlxv" data-k="end"'):''].join(''):tlxRow('✅',tlxt('allOk'),'','','')}</div>
 ${list?`<div class="vacard tlxls">${list.map(g2=>g2.map(d=>`<button type="button" class="varow" data-act="dzopen" data-id="${d.id}"><span class="vaic">📄</span><span class="vatx"><b>${i(d.title||'—')}</b><small>${i([d.party,d.end?vaDate(d.end):d.date?vaDate(d.date):''].filter(Boolean).join(' · '))}</small></span><span class="vaam">›</span></button>`).join('')+(g2.length>1?'<hr class="tlxhr">':'')).join('')}</div>`:''}
 <h3 class="vash">${i(tlxt('csv'))}</h3><div class="vacard">${['ctr','aus','kon','kauf'].map(k=>tlxRow('⬇',tlxt('x_'+k),tlxt('csvS'),`data-act="tlxcsv" data-k="${k}"`)).join('')}</div></div>`}
function tlxFill(){if(m.route!=='tlxd')return;const q=document.querySelector('[data-tlxq]');if(!q||q.dataset.ok)return;q.dataset.ok=1;
 try{navigator.storage.estimate().then(e=>{if(!e||!e.quota){q.textContent=tlxt('noEst');return}q.textContent=tlxt('used',{u:tlxMb(e.usage||0),q:tlxMb(e.quota)});const b=document.querySelector('[data-tlxb]');b&&(b.style.width=Math.max(1,Math.min(100,Math.round((e.usage||0)/e.quota*100)))+'%')}).catch(()=>{q.textContent=tlxt('noEst')})}catch{q.textContent=tlxt('noEst')}}
Hooks.on('render',()=>setTimeout(tlxFill,20));
Hooks.act('tlxv',d=>{m.tlxV=m.tlxV===d.k?'':d.k;v()});
Hooks.act('tlxkeep',()=>{try{navigator.storage.persist().then(r=>{m.tlxP=!!r;v()}).catch(()=>{m.tlxP=!1;v()})}catch{m.tlxP=!1;v()}});
const tlxCsvCell=x=>{const s=String(x==null?'':x);return/[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
const tlxCents=c=>c?(c/100).toFixed(2).replace('.',','):'';
function tlxCsv(k){const t=vaIso(0);let H2=[],rows=[];
 if(k==='ctr'){H2=['Titel','Partner','Beginn','Ende','Kündbar bis','Monatlich EUR'];rows=(()=>{try{return vaContracts()}catch{return[]}})().map(e=>[e.title,e.party,e.start,e.end,(()=>{try{return uc(e)||''}catch{return''}})(),tlxCents((()=>{try{return or(e,t)}catch{return 0}})())])}
 if(k==='aus'){H2=['Datum','Kategorie','Was','Betrag EUR'];rows=(()=>{try{return vaAD().e}catch{return[]}})().map(x=>[x.d,(()=>{try{return vat('c_'+x.c)}catch{return x.c}})(),x.w,tlxCents(+x.a||0)])}
 if(k==='kon'){H2=['Vorname','Nachname','Rolle','Telefon','E-Mail','Adresse'];rows=(()=>{try{return Va()}catch{return[]}})().map(c=>[c.first,c.last,c.role,c.phone||c.tel||'',c.email||c.mail||'',c.addr||c.address||''])}
 if(k==='kauf'){H2=['Produkt','Händler','Kaufdatum','Preis EUR','Seriennummer','Garantie bis','Gewährleistung bis'];rows=(g.kauf||[]).map(x=>[x.n,x.shop,x.d,tlxCents(x.p),x.sn,x.gar,x.d?vaAdd(x.d,730):''])}
 return{H:H2,rows,txt:'﻿'+[H2,...rows].map(r=>r.map(tlxCsvCell).join(';')).join('\r\n')}}
Hooks.act('tlxcsv',d=>{const c=tlxCsv(d.k);if(!c.rows.length){T(tlxt('empty'));return}const nm=tlxt('x_'+d.k);try{Hl(new File([c.txt],nm,{type:'text/csv'}))}catch{}tlxLog('csv',nm)});
/* ---- help ---- */
const TLX_Q=['1','2','3','4','5','6','7','8'];
const tlxNorm=s=>String(s||'').toLowerCase();
function tlxFaq(q){const w=tlxNorm(q).split(/[^\p{L}\p{N}]+/u).filter(x=>x.length>2);return TLX_Q.map(n=>({n,q:tlxt('q'+n),a:tlxt('a'+n),s:w.reduce((s,x)=>s+(tlxNorm(tlxt('q'+n)).includes(x)?3:0)+(tlxNorm(tlxt('a'+n)).includes(x)?1:0),0)})).filter(x=>!w.length||x.s>0).sort((a,b)=>b.s-a.s)}
function tlxhScreen(){const q=m.tlxQ||'',F=tlxFaq(q);let ver='';try{ver=NT}catch{}
 return`<div class="screen dhome fz va tlxw">${tlxHd(tlxt('help'))}<input class="field tlxq" type="search" data-tlxh placeholder="${i(tlxt('helpQ'))}" value="${i(q)}">
 <div class="vacard tlxfaq">${F.length?F.map(x=>`<details ${q&&x===F[0]?'open':''}><summary>${i(x.q)}</summary><p>${i(x.a)}</p></details>`).join(''):`<p class="dhnone">${i(tlxt('noHit'))}</p>`}</div>
 <div class="vacard">${tlxRow('✉️',tlxt('sup'),tlxt('supS'),'data-act="tlxsup"')}</div><p class="vanote">Butler Docs ${i(ver)}</p></div>`}
Hooks.on('render',()=>{if(m.route!=='tlxh')return;const el=document.querySelector('[data-tlxh]');if(!el||el.dataset.on)return;el.dataset.on=1;el.addEventListener('input',()=>{m.tlxQ=el.value;const st=el.selectionStart;v();setTimeout(()=>{const e2=document.querySelector('[data-tlxh]');if(e2){e2.focus();try{e2.setSelectionRange(st,st)}catch{}}},0)})});
Hooks.act('tlxsup',()=>{let ver='';try{ver=NT}catch{}const body=`\n\n—\nButler Docs ${ver}\n${navigator.userAgent}\n${he()}`;location.href='mailto:?subject='+encodeURIComponent('Butler Docs – Support ('+ver+')')+'&body='+encodeURIComponent(body)});
Hooks.on('ask',(r,t)=>{try{if(r)return r;const q=String(t||'');if(!/\?|wie |was |wo |как |где |что |how |where |what /i.test(q))return r;const F=tlxFaq(q);if(!F.length||F[0].s<4)return r;return{msg:F[0].q+'\n'+F[0].a,run:()=>{m.tlxQ=q;R('tlxh')}}}catch(e){Hooks.err('tlxask',e);return r}});
/* ---- rules ---- */
const tlxRules=()=>Array.isArray(g.rules)?g.rules:(g.rules=[]);
const tlxFolders=()=>{try{return Ke().folders.filter(f=>!f.sp||f.sp==='ins')}catch{return[]}};
const tlxFn=id=>{const f=(()=>{try{return Ke().folders.find(x=>x.id===id)}catch{return null}})();return f?(()=>{try{return Ri(f)}catch{return f.name||'—'}})():'—'};
function tlxrScreen(){const L2=tlxRules();
 return`<div class="screen dhome fz va tlxw">${tlxHd(tlxt('rules'))}
 <div class="vacard">${L2.length?L2.map(r=>`<div class="varow akdr"><span class="vaic">⚙️</span><span class="vatx"><b>„${i(r.w)}“ → ${i(tlxFn(r.f))}</b><small>${i(tlxt('rHits',{n:r.n||0}))}</small></span><button type="button" class="akx" data-act="tlxrdel" data-id="${r.id}" aria-label="${i(tlxt('del'))}">✕</button></div>`).join(''):`<p class="dhnone">${i(tlxt('rNone'))}</p>`}</div>
 <button type="button" class="vaadd" data-act="tlxradd">${i(tlxt('rAdd'))}</button>
 <h3 class="vash">${i(tlxt('rPre'))}</h3><div class="vachips tlxpre">${['p_fa','p_kk','p_vs'].map(k=>`<button type="button" data-act="tlxradd" data-w="${i(tlxt(k))}">${i(tlxt(k))} →</button>`).join('')}</div>
 <p class="vanote">${i(tlxt('rNote'))}</p></div>`}
Hooks.act('tlxradd',dd=>{const F=tlxFolders();H(tlxt('rAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(tlxt('rIf'))}</label><input class="field" data-tlxw value="${i(dd&&dd.w||'')}">
 <label class="bsvl">${i(tlxt('rThen'))}</label><select class="field" data-tlxf><option value=""></option>${F.map(f=>`<option value="${f.id}">${i(tlxFn(f.id))}</option>`).join('')}</select><small class="verr" data-tlxe2></small>
 <button type="button" class="vaadd" data-ks>${i(tlxt('save'))}</button></div>`,el=>{el.classList.add('bsvsh');el.querySelector('[data-ks]').onclick=()=>{const w=el.querySelector('[data-tlxw]').value.trim(),f=el.querySelector('[data-tlxf]').value;
  if(w.length<2||!f){el.querySelector('[data-tlxe2]').textContent=tlxt('rNeed');return}tlxRules().push({id:V(),w,f,ts:Date.now(),n:0});tlxLog('rule','„'+w+'“ → '+tlxFn(f));el.remove();v()}})});
Hooks.act('tlxrdel',d=>{const r=tlxRules().find(x=>x.id===d.id);g.rules=tlxRules().filter(x=>x.id!==d.id);r&&tlxLog('rule','✕ „'+r.w+'“');v()});
function tlxApply(){const L2=tlxRules();if(!L2.length)return 0;let n=0;tlxDocs().forEach(d=>{if(d.rlx)return;const ts=d.ts||0;const hay=tlxNorm([d.party,d.title,(()=>{try{return eiTxt(d)}catch{return''}})()].join(' '));
 const r=L2.find(r=>ts>=r.ts&&hay.includes(tlxNorm(r.w)));if(!r)return;d.rlx=r.id;if(d.folder!==r.f){d.folder=r.f;r.n=(r.n||0)+1;n++;tlxLog('move',(d.title||'—')+' → '+tlxFn(r.f))}});if(n)$();return n}
let tlxAT=0;Hooks.on('render',()=>{clearTimeout(tlxAT);tlxAT=setTimeout(()=>{try{tlxApply()}catch(e){Hooks.err('tlxapply',e)}},400)});
/* ---- routes, entries ---- */
['tlxp','tlxd','tlxh','tlxr'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='tlxp')return tlxpScreen();if(m.route==='tlxd')return tlxdScreen();if(m.route==='tlxh')return tlxhScreen();if(m.route==='tlxr')return tlxrScreen()}catch(e){Hooks.err('tlxscreen',e)}});
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;const ent=(to,ic,t,s)=>`<button type="button" class="vaabot abent tlxent" data-act="go" data-to="${to}"><span><b>${ic} ${i(t)}</b><small>${i(s)}</small></span><span class="akch">›</span></button>`;
 if(m.route==='profile'){const b=ent('tlxp','🪪',tlxt('pd'),tlxt('pdS'))+ent('tlxd','💾',tlxt('dat'),tlxt('datS'))+ent('tlxr','⚙️',tlxt('rules'),tlxt('rulesS'))+ent('tlxh','❓',tlxt('help'),tlxt('helpS'));const e=h.lastIndexOf('</div>');return h.slice(0,e)+b+h.slice(e)}
 if(m.route==='sich'){const L2=(g.secLog||[]).slice(0,20);const sec=`<h3 class="vash">${i(tlxt('log'))}</h3><div class="vacard tlxlog"><p class="vanote">${i(tlxt('logS'))}</p>${L2.length?L2.map(x=>`<div class="tlxle"><small>${i(new Date(x.ts).toLocaleString(he(),{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}))}</small><span>${i(tlxLogTxt(x))}</span></div>`).join('')+`<button type="button" class="valnk" data-act="tlxlclr">${i(tlxt('logClr'))}</button>`:`<p class="dhnone">${i(tlxt('logNone'))}</p>`}</div>`;
  const k=h.lastIndexOf('<p class="vanote">');return k>0?h.slice(0,k)+sec+h.slice(k):h}}catch(e){Hooks.err('tlxent',e)}return h});
Hooks.act('tlxlclr',()=>{g.secLog=[];$();v()});
try{SP_L.push(['tlxd','note',tlxS.dat,['speicher','память','storage','duplikat','дубликат','duplicate','csv','export','экспорт','archiv']],['tlxh','note',tlxS.help,['hilfe','помощь','help','faq','support','поддержк']],['tlxr','note',tlxS.rules,['regel','правил','rule','automat']],['tlxp','note',tlxS.pd,['steuer-id','steuerklasse','bundesland','налоговый класс','tax id']])}catch{}
Hooks.css('docs-werkzeuge',`.tlxcn{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:12px 8px}.tlxcn div{display:flex;flex-direction:column;align-items:center;gap:2px}.tlxcn b{font-size:20px}.tlxcn small{font-size:12px;opacity:.7;text-align:center}
.tlxst .vabar{display:block;margin-top:10px;background:rgba(255,255,255,.25)}.tlxst .vabar i{background:#fff}.tlxst b{font-size:20px}.tlxhr{border:0;border-top:2px dashed rgba(0,0,0,.08);margin:4px 0}
.tlxq{margin:0 0 12px;width:100%}.tlxfaq details{padding:12px 4px;border-bottom:1px solid rgba(0,0,0,.06)}.tlxfaq details:last-child{border:0}.tlxfaq summary{font-weight:600;cursor:pointer}.tlxfaq p{margin:8px 0 0;opacity:.85;line-height:1.45}
.tlxle{display:flex;gap:10px;padding:7px 4px;border-bottom:1px solid rgba(0,0,0,.05)}.tlxle small{opacity:.6;min-width:92px}.tlxpre{padding:0 2px 8px}.tlxf .vachips{margin:4px 0 10px}`);
