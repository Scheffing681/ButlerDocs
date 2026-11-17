/* ===== Butler Docs: only the original plan =====
   Butler Docs is a document app. Everything inherited from Butler that has nothing to do with papers
   (wardrobe, fitness, health, places, growth, recipes, shopping, money planning, clocks, mirror, tariffs…)
   is closed here in one place, without touching Butler's code:
   - a white list of screens: any other screen sends the user home (or to its document-side replacement);
   - section tabs, buttons and links that lead to a closed screen are hidden;
   - ▦ opens «All sections» with only the document sections;
   - «Progress» becomes «Deadlines» (when a passport, policy or contract runs out);
   - the «+» sheet offers only Document, Scan, Task, Event, Reminder;
   - the sign-in sign says DOCS, the tab is called Butler Docs, the welcome tour speaks about documents.
   Data of closed parts stays on the phone; nothing is deleted. */
const odS={
 all:['Все разделы','Alle Bereiche','All sections','Wszystkie działy','Tüm bölümler','Toutes les rubriques','Todas las secciones'],
 more:['Ещё','Weitere','More','Więcej','Diğer','Autres','Más'],
 scan:['Сканер','Scanner','Scanner','Skaner','Tarayıcı','Scanner','Escáner'],scanS:['Снять документ','Dokument aufnehmen','Capture a document','Zeskanuj dokument','Belge tara','Numériser un document','Escanear un documento'],
 let:['Письма','Briefe','Letters','Listy','Mektuplar','Lettres','Cartas'],letS:['Написать, отправить','Schreiben, senden','Write, send','Napisz, wyślij','Yaz, gönder','Écrire, envoyer','Escribir, enviar'],
 law:['Правовые документы','Rechtliche Dokumente','Legal documents','Dokumenty prawne','Hukuki belgeler','Documents juridiques','Documentos legales'],lawS:['Договоры, доверенности, счета','Verträge, Vollmachten, Rechnungen','Contracts, powers of attorney, bills','Umowy, pełnomocnictwa, rachunki','Sözleşmeler, vekaletler, faturalar','Contrats, procurations, factures','Contratos, poderes, facturas'],
 ppl:['Контакты','Kontakte','Contacts','Kontakty','Kişiler','Contacts','Contactos'],pplS:['Нотариус, страховая, близкие','Notar, Versicherung, Angehörige','Notary, insurer, family','Notariusz, ubezpieczyciel, bliscy','Noter, sigorta, yakınlar','Notaire, assureur, proches','Notario, aseguradora, familia'],
 tk:['Задачи','Aufgaben','Tasks','Zadania','Görevler','Tâches','Tareas'],
 dl:['Сроки','Fristen','Deadlines','Terminy','Süreler','Échéances','Plazos'],dlS:['Что скоро истекает','Was bald abläuft','What runs out soon','Co wkrótce wygasa','Yakında dolacaklar','Ce qui expire bientôt','Lo que vence pronto'],
 dlT:['Сроки документов','Fristen der Dokumente','Document deadlines','Terminy dokumentów','Belge süreleri','Échéances des documents','Plazos de los documentos'],
 dlIn:['Паспорт, ID, полисы, договоры — всё, у чего есть срок действия или последний день расторжения.','Pass, Ausweis, Policen, Verträge – alles mit Ablaufdatum oder letztem Kündigungstag.','Passport, ID, policies, contracts – everything with an expiry date or a last day to cancel.','Paszport, dowód, polisy, umowy – wszystko, co ma termin ważności lub wypowiedzenia.','Pasaport, kimlik, poliçeler, sözleşmeler – süresi ya da fesih son günü olan her şey.','Passeport, carte d’identité, polices, contrats – tout ce qui a une date d’expiration ou de résiliation.','Pasaporte, DNI, pólizas, contratos: todo lo que tiene fecha de caducidad o de cancelación.'],
 gPast:['Истекли','Abgelaufen','Expired','Wygasłe','Süresi doldu','Expirés','Vencidos'],gSoon:['В ближайшие 90 дней','In den nächsten 90 Tagen','In the next 90 days','W ciągu 90 dni','Önümüzdeki 90 gün','Dans les 90 jours','En los próximos 90 días'],gLater:['Позже','Später','Later','Później','Daha sonra','Plus tard','Más adelante'],
 past:['истёк','abgelaufen','expired','wygasł','doldu','expiré','vencido'],inN:['через %n дн.','in %n Tagen','in %n days','za %n dni','%n gün sonra','dans %n j','en %n días'],today:['сегодня','heute','today','dziś','bugün','aujourd’hui','hoy'],
 none:['Сроков пока нет. Впишите «Срок действия» в документе или страховке — и он появится здесь.','Noch keine Fristen. Tragen Sie bei einem Dokument oder einer Versicherung ein Ablaufdatum ein – dann erscheint es hier.','No deadlines yet. Add an expiry date to a document or policy and it will appear here.','Brak terminów. Dodaj datę ważności w dokumencie lub polisie.','Henüz süre yok. Bir belgeye veya poliçeye bitiş tarihi ekleyin.','Pas encore d’échéances. Ajoutez une date d’expiration à un document ou une police.','Aún no hay plazos. Añada una fecha de caducidad a un documento o póliza.'],
 add:['Добавить документ','Dokument hinzufügen','Add a document','Dodaj dokument','Belge ekle','Ajouter un document','Añadir documento'],
 doc:['Документ','Dokument','Document','Dokument','Belge','Document','Documento'],rem:['Напоминание','Erinnerung','Reminder','Przypomnienie','Hatırlatma','Rappel','Recordatorio'],
 nf:['Ничего не найдено.','Nichts gefunden.','Nothing found.','Nic nie znaleziono.','Hiçbir şey bulunamadı.','Aucun résultat.','No se encontró nada.'],
 day:['Календарь и задачи','Kalender & Aufgaben','Calendar & tasks','Kalendarz i zadania','Takvim ve görevler','Agenda et tâches','Calendario y tareas']};
const odt=k=>cv5n(odS[k]);

/* --- the white list --- */
const OD_OK=new Set(['home','search','profile','concierge','style','stylemy','styleic','stylecol','ly6','pv','dossier',
 'archive','arcf','dccat','lpage','bdoc','letters','envl','law','dcana','ins','insedit','sc9',
 'mycal','reminders','tasks','projects','project','ax5now','ax5week','td9today',
 'fnacc','fnlost','life','lbooks','lbook','lsearch',
 'dnach','assets','asset','axdet','axdata','axdocs','axsvc','axval','people','person','dall','dsrok']);
const OD_CAT=new Set(['law','contacts']);
const OD_TO={stats:'dsrok',fin:'fnacc',bd9all:'dall',areas:'dall'};
const odOn=()=>{try{return!g.dhOff}catch{return!0}};
const odOk=(r,c)=>r==='cat'?OD_CAT.has(c):OD_OK.has(r);
const odTo=(r,c)=>r==='cat'&&c==='bank'?'fnacc':OD_TO[r]||'home';
['dall','dsrok'].forEach(r=>{Te.includes(r)||Te.push(r)});
Hooks.on('route',(r,a)=>{try{if(!m.logged||!odOn()||odOk(r,a&&a[1]))return;const to=odTo(r,a&&a[1]);setTimeout(()=>{try{R(to)}catch{}},0);return!1}catch(e){Hooks.err('odroute',e)}});
/* section tabs (Мой день · Документы · Люди …) show only parts that stay */
Hooks.on('section',k=>{try{if(!odOn())return;const r=String(k||''),p=r.slice(0,2),n=r.slice(2);if(p==='c:')return OD_CAT.has(n);if(p==='q:'||p==='r:')return OD_OK.has(n)}catch{}});
try{if(typeof h9S==='object'&&h9S.day)h9S.day=odS.day}catch{}
/* search: no money, shopping or daily routine */
Hooks.on('search',G=>{try{if(!odOn())return G;return(G||[]).filter(x=>!['sMoney','sShop','sRout'].includes(x.k))}catch{return G}});

/* --- after every redraw: hide what leads out of the plan, keep names and signs right --- */
const OD_TK='<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8.2 12.2l2.6 2.6 5-5.2"/>';
const OD_DL='<path d="M7 3h12M7 23h12M8.5 3c0 5 9 6 9 10s-9 5-9 10M17.5 3c0 5-9 6-9 10"/>';
function odTidy(){try{
 const on=odOn();document.documentElement.classList.toggle('od',on);if(!on)return;
 if(m.logged&&m.route&&!odOk(m.route,m.cat)&&!odTidy.busy){odTidy.busy=1;setTimeout(()=>{odTidy.busy=0;try{R(odTo(m.route,m.cat))}catch{}},0)}
 if(document.title!=='Butler Docs')document.title='Butler Docs';
 odPrune();
 /* bottom bar: «Aufgaben» in place of «Прогресс» (deadlines are on home, in ▦ and in the calendar) */
 const st=document.querySelector('nav.nav [data-k="stats"]');if(st&&!st.dataset.od){st.dataset.od=1;st.dataset.k='tasks';st.dataset.to='tasks';const s=st.querySelector('span');s&&(s.textContent=odt('tk'));const sv=st.querySelector('svg');sv&&(sv.innerHTML=OD_TK)}
 const tk=document.querySelector('nav.nav [data-od]');if(tk){const on=['tasks','projects','project'].includes(m.route);tk.classList.toggle('on',on);if(on)document.querySelectorAll('nav.nav [data-k=home].on').forEach(x=>x.classList.remove('on'))}
 document.querySelectorAll('.hl9tx').forEach(x=>{if(!x.querySelector('.odsg')){const e=document.createElement('em');e.className='odsg';e.textContent='DOCS';x.appendChild(e)}});
}catch(e){Hooks.err('odtidy',e)}}
/* a link out of the plan is hidden; a «back» arrow that would lead out goes home instead.
   Runs after every redraw and when a part of the screen is filled in later (search results, chat). */
const OD_NOTE=/заметк|notiz|\bnote|notatk|\bnot\b|\bnota\b/i;
function odPrune(){try{if(!odOn())return;
 const off=b=>{if(b.matches('.sub-hdr .iconbtn,.iconbtn[aria-label]')&&b.closest('.sub-hdr,.hdr,header,.screen>div:first-child')){b.dataset.act='odback';delete b.dataset.to;delete b.dataset.id;return}b.hidden=!0;b.classList.add('odoff')};
 document.querySelectorAll('[data-to]:not(.odoff)').forEach(b=>{const t=String(b.dataset.to||'').split(':')[0];if(!t||OD_OK.has(t)||OD_TO[t]||t==='cat')return;off(b)});
 document.querySelectorAll('[data-act="cat"][data-id]:not(.odoff),[data-act="opencat"][data-id]:not(.odoff)').forEach(b=>{OD_CAT.has(b.dataset.id)||off(b)});
 document.querySelectorAll('.chip[data-act="ask"][data-q]:not(.odoff)').forEach(b=>{OD_NOTE.test(b.dataset.q)&&off(b)});
 const sr=document.getElementById('sres');if(sr){sr.querySelectorAll('.list').forEach(l=>{const vis=[...l.children].some(c=>!c.classList.contains('odoff'));l.classList.toggle('odoff',!vis);const h=l.previousElementSibling;if(h&&h.matches('h3'))h.classList.toggle('odoff',!vis)});
  const any=[...sr.children].some(c=>!c.classList.contains('odoff')&&!c.classList.contains('odnone'));let e=sr.querySelector('.odnone');if(!any&&!sr.querySelector('.empty')&&!e){e=document.createElement('p');e.className='empty odnone';e.textContent=odt('nf');sr.appendChild(e)}else if(any&&e)e.remove()}
}catch(e){Hooks.err('odprune',e)}}
Hooks.on('render',odTidy);
{let q=0;new MutationObserver(()=>{if(q||!odOn())return;q=1;requestAnimationFrame(()=>{q=0;odPrune()})}).observe(document.body,{childList:!0,subtree:!0})}
/* weather on the home screen is only information (it used to open the wardrobe) */
/* and the sign at the top is the original living sign from the sign-in screen (with DOCS) */
Hooks.on('screen',h=>{if(typeof h!=='string'||m.route!=='home'||!odOn())return h;h=h.replace(/class="dhwx" data-act="go" data-to="wd"/,'class="dhwx" aria-disabled="true"');
 try{if(typeof hl9sign==='function')h=h.replace(/<div class="dhlogo">[\s\S]*?<\/div>/,`<div class="odlogo">${hl9sign('head')}</div>`)}catch(e){Hooks.err('odlogo',e)}return h});
Hooks.act('dhbank',()=>{try{R(odOn()?'fnacc':'cat',odOn()?void 0:'bank')}catch{}},{replace:!0});

/* --- the «+» sheet: Document · Scan · Task · Event · Reminder --- */
new MutationObserver(()=>{try{if(!odOn())return;document.querySelectorAll('.bd8pm:not([data-od])').forEach(pm=>{pm.dataset.od=1;
 const sh=pm.closest('.bd8sheet'),mk=(cls,ic,lab,fn)=>{const b=document.createElement('button');b.type='button';b.className=cls+' odpm';b.innerHTML=dhi(ic)+`<span>${i(lab)}</span>`;
  b.onclick=e=>{e.stopPropagation();try{const x=sh&&sh.querySelector('[data-x]');x&&x.click()}catch{}setTimeout(()=>{try{fn()}catch(er){Hooks.err('odplus',er)}},120)};return b};
 pm.prepend(mk('oddoc','add',odt('doc'),()=>L.dcaddq()));pm.append(mk('odrem','bell',odt('rem'),()=>L.remnew()))})}catch(e){Hooks.err('odplus',e)}}).observe(document.body,{childList:!0,subtree:!0});

/* --- ▦ All sections: only the document sections --- */
function odAll(){const x=[['scan','scan','data-act="go" data-to="sc9"'],['dl','clock','data-act="go" data-to="dsrok"'],['let','mail','data-act="go" data-to="letters"'],['law','fld','data-act="dccat" data-v="law"'],['ppl','id','data-act="go" data-to="people"']];
 return`<div class="screen dhome odall"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(odt('all'))}</h2></div><span></span></div>
 <div class="dhgrid">${DH_T.map(([k,ic,a])=>`<button type="button" class="dht" ${a}>${dhi(ic,'big')}<b>${i(dht(k))}</b><small>${i(dht(k+'S'))}</small></button>`).join('')}</div>
 <h3 class="odh">${i(odt('more'))}</h3>
 <div class="dhgrid">${x.map(([k,ic,a])=>`<button type="button" class="dht" ${a}>${dhi(ic,'big')}<b>${i(odt(k))}</b><small>${i(odt(k+'S'))}</small></button>`).join('')}</div></div>`}

/* --- Deadlines: what runs out and when --- */
function odDays(k){try{const a=new Date();a.setHours(0,0,0,0);const b=new Date(k+'T00:00:00');return Math.round((b-a)/864e5)}catch{return 0}}
function odDate(k){try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{day:'numeric',month:'long',year:'numeric'})}catch{return k}}
function odSrok(){let L2=[];try{L2=typeof IZ==='function'?IZ():[]}catch(e){Hooks.err('odsrok',e)}
 try{if(typeof vDl==='function')L2=L2.concat(vDl()).sort((a,b)=>a.k<b.k?-1:1)}catch{}
 const row=t=>{const n=odDays(t.k),c=n<0?'r':n<=90?'y':'g',w=n<0?odt('past'):n===0?odt('today'):odt('inN').replace('%n',n);
  return`<button type="button" class="odr ${c}" ${t.act||''}><i></i><span><b>${i(t.t)}</b><small>${i([t.w,odDate(t.k)].filter(Boolean).join(' · '))}</small></span><em>${i(w)}</em></button>`};
 const grp=(k,f)=>{const R2=L2.filter(f);return R2.length?`<h3 class="odh">${i(odt(k))}</h3><div class="dhcard odl">${R2.map(row).join('')}</div>`:''};
 return`<div class="screen dhome odsrok"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(odt('dlT'))}</h2></div><span></span></div>
 <p class="odin">${i(odt('dlIn'))}</p>
 ${L2.length?grp('gPast',t=>odDays(t.k)<0)+grp('gSoon',t=>{const n=odDays(t.k);return n>=0&&n<=90})+grp('gLater',t=>odDays(t.k)>90):`<div class="dhcard"><p class="dhnone">${i(odt('none'))}</p></div>`}
 <button type="button" class="dhcard odadd" data-act="dcaddq">${dhi('add')}<span>${i(odt('add'))}</span></button></div>`}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='dall')return odAll();if(m.route==='dsrok')return odSrok()}catch(e){Hooks.err('odscreen',e)}});
Hooks.act('odback',()=>R('home',void 0,!0));

/* --- the welcome tour speaks about documents --- */
try{const T={
 ru:['Спросите Дворецкого','Нажмите «Butler AI» и попросите найти документ, записать дело или напомнить о сроке.','Всё важное — на главной','Документы, страховки, сейф, наследство — девять разделов на одном экране. Внизу «Сроки»: что скоро истекает.','Сканируйте бумаги','Фотографируйте договоры, письма и удостоверения. Дворецкий прочитает текст и напомнит о сроках.','Письма и пакеты','Пишите письма с печатью или подписью, собирайте нужные документы в один пакет.'],
 de:['Fragen Sie den Butler','Tippen Sie auf „Butler AI“ – er findet ein Dokument, notiert eine Aufgabe oder erinnert an eine Frist.','Alles Wichtige auf einen Blick','Dokumente, Versicherungen, Tresor, Nachlass – neun Bereiche auf einem Bildschirm. Unten „Fristen“: was bald abläuft.','Papiere scannen','Fotografieren Sie Verträge, Briefe und Ausweise. Der Butler liest den Text und erinnert an Fristen.','Briefe und Pakete','Schreiben Sie Briefe mit Siegel oder Unterschrift und bündeln Sie Dokumente zu einem Paket.'],
 en:['Ask the Butler','Tap “Butler AI” – it finds a document, notes a task or reminds you of a deadline.','Everything important at a glance','Documents, insurance, vault, estate – nine sections on one screen. Below, “Deadlines”: what runs out soon.','Scan your papers','Photograph contracts, letters and IDs. The Butler reads the text and reminds you of deadlines.','Letters and packages','Write letters with a seal or signature and bundle documents into one package.'],
 pl:['Zapytaj Kamerdynera','Dotknij „Butler AI” – znajdzie dokument, zapisze zadanie lub przypomni o terminie.','Wszystko ważne na jednym ekranie','Dokumenty, ubezpieczenia, sejf, spadek – dziewięć działów. Na dole „Terminy”: co wkrótce wygasa.','Skanuj dokumenty','Fotografuj umowy, listy i dowody. Kamerdyner odczyta tekst i przypomni o terminach.','Listy i pakiety','Pisz listy z pieczęcią lub podpisem i łącz dokumenty w jeden pakiet.'],
 tr:['Uşağa sorun','“Butler AI”ye dokunun – belge bulur, görev yazar ya da süreyi hatırlatır.','Önemli olan her şey tek ekranda','Belgeler, sigortalar, kasa, miras – tek ekranda dokuz bölüm. Altta “Süreler”: yakında dolacaklar.','Belgeleri tarayın','Sözleşme, mektup ve kimlikleri fotoğraflayın. Uşak metni okur ve süreleri hatırlatır.','Mektuplar ve paketler','Mühürlü ya da imzalı mektuplar yazın, belgeleri tek pakette toplayın.'],
 fr:['Demandez au Majordome','Touchez « Butler AI » : il trouve un document, note une tâche ou rappelle une échéance.','L’essentiel d’un coup d’œil','Documents, assurances, coffre, succession – neuf rubriques sur un écran. En bas, « Échéances » : ce qui expire bientôt.','Numérisez vos papiers','Photographiez contrats, lettres et pièces d’identité. Le Majordome lit le texte et rappelle les échéances.','Lettres et dossiers','Écrivez des lettres avec sceau ou signature et réunissez les documents en un dossier.'],
 es:['Pregunte al Mayordomo','Toque «Butler AI»: encuentra un documento, anota una tarea o le recuerda un plazo.','Lo importante, de un vistazo','Documentos, seguros, caja fuerte, herencia: nueve secciones en una pantalla. Abajo, «Plazos»: lo que vence pronto.','Escanee sus papeles','Fotografíe contratos, cartas y documentos de identidad. El Mayordomo lee el texto y le recuerda los plazos.','Cartas y paquetes','Escriba cartas con sello o firma y reúna documentos en un solo paquete.']};
 Object.keys(T).forEach(l=>{const a=T[l];TD9T[l]&&Object.assign(TD9T[l],{t1:a[0],x1:a[1],t2:a[2],x2:a[3],t3:a[4],x3:a[5],t4:a[6],x4:a[7]})})}catch(e){Hooks.err('odtour',e)}

Hooks.css('only-docs',`
.od .plprof,.od .row[data-act=sheet][data-s=start],.od .bd8pm .note,.od .bd8pm .inc,.od .bd8pm .exp,.od .bd8pm .proj,.od .bd8pm .shop,.od .bd8sheet .bd8me,.od .odoff{display:none!important}
.bd8pm .odpm .dhi{width:26px;height:26px;color:var(--green)}
.dhwx[aria-disabled]{cursor:default}
.odlogo{flex:1;display:flex;justify-content:center;min-width:0;margin:-6px 4px -4px}
.odlogo .hl9-head{width:min(62vw,244px);height:104px;color:var(--ink)}
.odlogo .hl9-head b{font-size:20.5px}.odlogo .hl9-head span{font-size:9.5px;margin-top:3px;gap:7px}.odlogo .hl9-head span i{width:20px}.odlogo .odsg{font-size:9.5px;margin-top:3px;color:var(--green)}
.hl9tx .odsg{display:block;font-style:normal;font-size:10px;font-weight:700;letter-spacing:.42em;margin-top:2px;color:var(--gold,#C99A3E)}
.odh{margin:20px 2px 10px;font-size:17px}
.odin{color:var(--muted);font-size:14.5px;line-height:1.45;margin:2px 0 6px}
.odl{padding:4px 16px}.odr{display:flex;align-items:center;gap:12px;width:100%;padding:12px 0;border:0;background:none;text-align:left;color:var(--ink);font:inherit;cursor:pointer}.odr+.odr{border-top:1px solid var(--line)}
.odr>i{flex:none;width:10px;height:10px;border-radius:50%;background:#3d9a5b}.odr.y>i{background:#d9a017}.odr.r>i{background:#d0453a}
.odr span{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.odr b{font-weight:600}.odr small{color:var(--muted);font-size:13px}
.odr em{flex:none;font-style:normal;font-size:13px;color:var(--muted)}.odr.r em{color:#d0453a;font-weight:600}.odr.y em{color:#a87a0c;font-weight:600}
.odadd{display:flex;align-items:center;justify-content:center;gap:8px;font-weight:600;color:var(--green)!important;margin-bottom:24px}
`);
