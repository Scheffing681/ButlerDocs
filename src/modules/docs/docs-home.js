/* ===== Butler Docs: home screen =====
   A light, document-first home: 9 sections, Butler AI, today, quick actions. Every tile opens a part of the app that already exists. */
const dhS={
 docs:['Документы','Dokumente','Documents','Dokumenty','Belgeler','Documents','Documentos'],docsS:['Договоры, письма, справки','Verträge, Briefe, Nachweise','Contracts, letters, proofs','Umowy, listy, zaświadczenia','Sözleşmeler, mektuplar, belgeler','Contrats, lettres, justificatifs','Contratos, cartas, justificantes'],
 ins:['Страховки','Versicherungen','Insurance','Ubezpieczenia','Sigortalar','Assurances','Seguros'],insS:['Полисы, договоры, сроки','Policen, Verträge, Fristen','Policies, contracts, deadlines','Polisy, umowy, terminy','Poliçeler, sözleşmeler, süreler','Polices, contrats, échéances','Pólizas, contratos, plazos'],
 pers:['Личные документы','Persönliche Dokumente','Personal documents','Dokumenty osobiste','Kişisel belgeler','Documents personnels','Documentos personales'],persS:['Паспорт, ID, права, справки','Pass, ID, Führerschein, Nachweise','Passport, ID, licence, proofs','Paszport, dowód, prawo jazdy','Pasaport, kimlik, ehliyet','Passeport, ID, permis','Pasaporte, DNI, carné'],
 cal:['Календарь','Kalender','Calendar','Kalendarz','Takvim','Calendrier','Calendario'],calS:['Встречи, сроки, напоминания','Termine, Fristen, Erinnerungen','Appointments, deadlines, reminders','Spotkania, terminy, przypomnienia','Randevular, süreler, hatırlatmalar','Rendez-vous, échéances, rappels','Citas, plazos, recordatorios'],
 task:['Задачи','Aufgaben','Tasks','Zadania','Görevler','Tâches','Tareas'],taskS:['Дела, проекты, контроль','To-dos, Projekte, Kontrolle','To-dos, projects, follow-up','Zadania, projekty, kontrola','Yapılacaklar, projeler, takip','À faire, projets, suivi','Pendientes, proyectos, control'],
 bank:['Банки','Banken','Banks','Banki','Bankalar','Banques','Bancos'],bankS:['Счета, кредиты, документы','Konten, Kredite, Unterlagen','Accounts, loans, papers','Konta, kredyty, dokumenty','Hesaplar, krediler, belgeler','Comptes, crédits, papiers','Cuentas, créditos, papeles'],
 vault:['Сейф','Tresor','Vault','Sejf','Kasa','Coffre','Caja fuerte'],vaultS:['Защищённые папки с PIN','Sichere Ablage wichtiger Daten','Safe storage for key data','Bezpieczne miejsce na dane','Önemli veriler için güvenli alan','Rangement sûr des données','Lugar seguro para datos'],
 life:['Книга жизни','Lebensbuch','Book of life','Księga życia','Hayat kitabı','Livre de vie','Libro de la vida'],lifeS:['Моя история, события, документы','Meine Geschichte, Ereignisse, Dokumente','My story, events, documents','Moja historia, wydarzenia','Hikâyem, olaylar, belgeler','Mon histoire, événements','Mi historia, sucesos'],
 leg:['Наследство','Nachlass','Estate','Spadek','Miras','Succession','Herencia'],legS:['Забота, наследование, указания','Vorsorge, Vererbung, Anweisungen','Provision, inheritance, instructions','Zabezpieczenie, dziedziczenie','Önlem, miras, talimatlar','Prévoyance, héritage, consignes','Previsión, herencia, instrucciones'],
 ai:['Butler AI','Butler AI','Butler AI','Butler AI','Butler AI','Butler AI','Butler AI'],aiS:['Искать, упорядочить, подготовить','Suchen, organisieren, vorbereiten','Search, organise, prepare','Szukaj, porządkuj, przygotuj','Ara, düzenle, hazırla','Chercher, organiser, préparer','Buscar, organizar, preparar'],
 today:['Сегодня','Heute','Today','Dziś','Bugün','Aujourd’hui','Hoy'],all:['Все','Alle','All','Wszystko','Tümü','Tout','Todo'],none:['На сегодня ничего не запланировано','Für heute nichts geplant','Nothing planned for today','Na dziś nic nie zaplanowano','Bugün için plan yok','Rien de prévu aujourd’hui','Nada previsto para hoy'],
 quick:['Быстрые действия','Schnellaktionen','Quick actions','Szybkie akcje','Hızlı işlemler','Actions rapides','Acciones rápidas'],
 q_scan:['Сканировать','Scannen','Scan','Skanuj','Tara','Scanner','Escanear'],q_add:['Добавить','Hinzufügen','Add','Dodaj','Ekle','Ajouter','Añadir'],q_pack:['Собрать пакет','Paket erstellen','Build package','Pakiet','Paket oluştur','Dossier PDF','Crear paquete'],q_rem:['Напоминание','Erinnerung','Reminder','Przypomnienie','Hatırlatma','Rappel','Recordatorio'],q_mail:['E-Mail','E-Mail','E-mail','E-mail','E-posta','E-mail','E-mail'],
 morning:['Доброе утро','Guten Morgen','Good morning','Dzień dobry','Günaydın','Bonjour','Buenos días'],day:['Добрый день','Guten Tag','Good afternoon','Dzień dobry','İyi günler','Bonjour','Buenas tardes'],evening:['Добрый вечер','Guten Abend','Good evening','Dobry wieczór','İyi akşamlar','Bonsoir','Buenas tardes'],night:['Доброй ночи','Gute Nacht','Good night','Dobranoc','İyi geceler','Bonne nuit','Buenas noches']};
const dht=k=>cv5n(dhS[k]);
/* light green look as the default of this app (can still be changed under Design) */
const dhInit=()=>{try{if(g&&!g.bdInit&&m.logged&&m.route==='home'){g.bdInit=1;setTimeout(()=>{try{if(typeof br9set==='function')br9set('g')}catch{}},300)}}catch{}};dhInit();Hooks.on('render',dhInit);
const DH_I={
 fld:'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2h8.8A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="M3 10h18"/>',
 shield:'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.6 12l2.3 2.3 4.6-4.6"/>',
 id:'<rect x="3" y="5" width="18" height="14" rx="2.2"/><circle cx="8.6" cy="10.6" r="2"/><path d="M5.6 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M14 9.5h4.5M14 12.5h4.5M14 15.5h3"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 chk:'<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8.2 12.2l2.6 2.6 5-5.2"/>',
 bank:'<path d="M3 9.5L12 4l9 5.5M4.5 10h15M6 10v7.5M10 10v7.5M14 10v7.5M18 10v7.5M3.5 20h17"/>',
 vault:'<rect x="3.5" y="4.5" width="17" height="14.5" rx="2"/><circle cx="12" cy="11.7" r="3.6"/><circle cx="12" cy="11.7" r="1"/><path d="M6.5 19v1.5M17.5 19v1.5"/>',
 book:'<path d="M12 6.5C10 5 7.5 4.5 4 4.8v13.4c3.5-.3 6 .2 8 1.8 2-1.6 4.5-2.1 8-1.8V4.8c-3.5-.3-6 .2-8 1.7zM12 6.5V20"/>',
 sprout:'<path d="M12 21v-9"/><path d="M12 12c0-4 2.8-6.6 7.5-6.8-.2 4.7-2.9 7-7.5 6.8z"/><path d="M12 14.5c0-3.4-2.3-5.6-6.3-5.8.2 4 2.5 6 6.3 5.8z"/>',
 scan:'<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M4 12h16"/>',
 add:'<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h5"/><path d="M14 3.5L18.5 8v4M14 3.5V8h4.5M17 15v6M14 18h6"/>',
 layers:'<path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z"/><path d="M3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
 bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
 mail:'<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 leaf:'<path d="M5 19c0-8 5-13.5 14.5-14-.3 9.5-5.8 14.5-14 14z"/><path d="M5 19l8.5-8.5"/>',
 clock:'<circle cx="12" cy="12.5" r="7.5"/><path d="M12 8.5v4.3l2.8 1.7M9 3h6"/>',
 umb:'<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>',
 chev:'<path d="M9.5 6l6 6-6 6"/>'};
const dhi=(n,c)=>`<svg class="dhi${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true">${DH_I[n]||''}</svg>`;
/* «Versicherungen» has no tile of its own: «Dokumente» switches between documents and insurance */
const DH_T=[['docs','fld','data-act="go" data-to="archive"'],['pers','id','data-act="dccat" data-v="personal"'],
 ['cal','cal','data-act="go" data-to="mycal"'],['task','chk','data-act="go" data-to="tasks"'],['bank','bank','data-act="dhbank"'],
 ['vault','vault','data-act="dhvault"'],['life','book','data-act="go" data-to="life"'],['leg','sprout','data-act="go" data-to="dnach"']];
function dhGreet(){const h=new Date().getHours();const k=h<5?'night':h<11?'morning':h<18?'day':h<22?'evening':'night';let n='';try{n=(g.user&&(g.user.short||g.user.first))||''}catch{}return dht(k)+(n?',':'')+(n?'<br>'+i(n):'')}
function dhWx(){try{const r=typeof bd8wx==='function'?bd8wx():null;if(!r)return'';const w=r.w||{},t=w.t!=null?w.t:w.temp!=null?w.temp:w.tt;const nm=r.nm||'';if(t==null&&!nm)return'';
 return`<button type="button" class="dhwx" data-act="go" data-to="wd"><span class="dhsun">${w.e||w.ic||'⛅'}</span><b>${t!=null?Math.round(t)+' °C':'—'}</b><small>${i(nm)}</small></button>`}catch{return''}}
function dhToday(){let L=[];try{L=typeof bd8today==='function'?bd8today().filter(x=>!x.done).slice(0,4):[]}catch{}
 return`<div class="dhcard dhtd"><div class="dhhd"><b>${i(dht('today'))}</b><button type="button" data-act="go" data-to="ax5now">${i(dht('all'))} ${dhi('chev','sm')}</button></div>${L.length?L.map(x=>`<div class="dhrow">${dhi(x.ev?'cal':/versich|polic|страх|insur/i.test(x.t)?'umb':'clock')}<span class="tm">${i(x.tm||'')}</span><span class="tx">${i(x.t)}</span></div>`).join(''):`<p class="dhnone">${i(dht('none'))}</p>`}</div>`}
/* the user's own order and choice of tiles and blocks («Anordnung und Farbe» → Startseite) */
const dhTiles=()=>{const ord=Array.isArray(g.dhOrd)?g.dhOrd:[],hid=Array.isArray(g.dhHid)?g.dhHid:[];const A=DH_T.slice().sort((a,b)=>{const x1=ord.indexOf(a[0]),x2=ord.indexOf(b[0]);return(x1<0?99+DH_T.indexOf(a):x1)-(x2<0?99+DH_T.indexOf(b):x2)});return A.filter(t=>!hid.includes(t[0]))};
const dhOff=k=>{try{return!!(g.dhBlk&&g.dhBlk[k])}catch{return!1}};
function dhHome(){const d=new Date();let ds='';try{ds=d.toLocaleDateString(he(),{weekday:'short',day:'numeric',month:'long'})}catch{}
 return`<div class="screen dhome">
 <div class="dhtop"><button type="button" class="dhrb" data-act="go" data-to="bd9all" aria-label="menu">${dhi('grid')}</button>
  <div class="dhlogo"><span class="t1">The Silentium’s</span><span class="t2">BUTLER</span><span class="t3">DOCS</span></div>
  <div class="dhtr"><button type="button" class="dhib" data-act="go" data-to="reminders" aria-label="bell">${dhi('bell')}</button><button type="button" class="dhrb" data-act="go" data-to="style" aria-label="design">${dhi('leaf')}</button></div></div>
 <div class="dhgr"><div><h1>${dhGreet()}</h1><p>${i(ds)}</p></div>${dhOff('wx')?'':dhWx()}</div>
 <div class="dhgrid">${dhTiles().map(([k,ic,a])=>`<button type="button" class="dht" ${a}>${dhi(ic,'big')}<b>${i(dht(k))}</b><small>${i(dht(k+'S'))}</small></button>`).join('')}</div>
 ${dhOff('ai')?'':`<button type="button" class="dhcard dhai" data-act="go" data-to="concierge"><span class="inf"><svg viewBox="0 0 64 32" aria-hidden="true"><defs><linearGradient id="dhrg" x1="0" x2="1"><stop offset="0" stop-color="#22c3ee"/><stop offset=".3" stop-color="#3ddc84"/><stop offset=".55" stop-color="#f7d63b"/><stop offset=".8" stop-color="#ff6a3d"/><stop offset="1" stop-color="#e040fb"/></linearGradient></defs><path d="M32 16c-5-7-9.5-10-14-10a10 10 0 0 0 0 20c4.5 0 9-3 14-10s9.5-10 14-10a10 10 0 0 1 0 20c-4.5 0-9-3-14-10z" fill="none" stroke="url(#dhrg)" stroke-width="5"/></svg></span><span class="tx"><b>${i(dht('ai'))}</b><small>${i(dht('aiS'))}</small></span>${dhi('chev')}</button>`}
 ${dhOff('today')?'':dhToday()}
 ${dhOff('quick')?'':`<div class="dhcard dhq"><b class="dhqh">${i(dht('quick'))}</b><div class="dhqr">
  <button type="button" data-act="go" data-to="sc9">${dhi('scan')}<span>${i(dht('q_scan'))}</span></button>
  <button type="button" data-act="dcaddq">${dhi('add')}<span>${i(dht('q_add'))}</span></button>
  <button type="button" data-act="b3pack">${dhi('layers')}<span>${i(dht('q_pack'))}</span></button>
  <button type="button" data-act="remnew">${dhi('bell')}<span>${i(dht('q_rem'))}</span></button>
  <button type="button" data-act="go" data-to="letters">${dhi('mail')}<span>${i(dht('q_mail'))}</span></button></div></div>`}
 </div>`}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='home'&&!g.dhOff)return dhHome()}catch(e){Hooks.err('dhhome',e)}});
Hooks.act('dhbank',()=>{try{R('cat','bank')}catch{}});
Hooks.act('dhvault',()=>{try{R('archive');setTimeout(()=>{const b=document.querySelector('[data-act=dcold]');b&&b.click()},60)}catch{}});
Hooks.css('docs-home',`
/* «Neuer Vertrag»: the camera sits on the edge of the round logo (the label was inline, so the badge slid below the circle) */
.insprev .fmphl{display:block;flex:none;width:112px;height:112px}.insprev .fmphl .fmcam{right:0;bottom:2px}
.dhome{padding-top:calc(env(safe-area-inset-top) + 6px)!important;font-family:-apple-system,"SF Pro Text",system-ui,sans-serif;color:var(--ink)}
.dhome button{font:inherit;color:inherit;cursor:pointer}.dhome,.dhome *{hyphens:manual!important;-webkit-hyphens:manual!important}
:root[data-style="klassisch"] .dhome .dht,:root[data-style="klassisch"] .dhome .dhcard,:root[data-style="klassisch"] .dhome .dhwx,:root[data-style="klassisch"] .dhome .dhqr button,:root[data-style="klassisch"] .dhome .dhrb{background:#fff}
.dhtop{display:flex;align-items:center;justify-content:space-between;margin:4px 0 10px}
.dhrb{width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:center;color:var(--green)!important;box-shadow:0 2px 8px rgba(20,60,30,.06)}
.dhib{width:40px;height:46px;border:0;background:none;display:flex;align-items:center;justify-content:center;color:var(--green)!important}
.dhtr{display:flex;gap:4px;align-items:center}
.dhi{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}.dhi.big{width:40px;height:40px;stroke-width:1.5;color:var(--green)}.dhi.sm{width:14px;height:14px}
.dhlogo{position:relative;display:flex;flex-direction:column;align-items:center;padding:12px 26px 10px;border-radius:50%;background:#fff;
 box-shadow:0 0 0 2.5px transparent,0 0 14px rgba(120,90,255,.18);background-image:linear-gradient(#fff,#fff),conic-gradient(from 200deg,#ff5a5f,#ffb13b,#f7e43b,#3ddc84,#22c3ee,#5b6cff,#e040fb,#ff5a5f);background-origin:border-box;background-clip:padding-box,border-box;border:3px solid transparent}
.dhlogo .t1{font-family:"Cormorant Garamond",Georgia,serif;font-size:20px;line-height:1;color:#1a1a1a}.dhlogo .t2{font-family:Georgia,serif;font-size:9.5px;letter-spacing:.42em;margin-top:3px;color:#222}.dhlogo .t3{font-size:8.5px;letter-spacing:.35em;font-weight:700;color:var(--green);margin-top:2px}
.dhgr{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin:6px 0 14px}.dhgr h1{font-family:-apple-system,system-ui,sans-serif;font-size:30px;line-height:1.12;font-weight:700;margin:0;letter-spacing:-.01em}.dhgr p{margin:6px 0 0;color:var(--muted);font-size:16px}
.dhwx{flex:none;min-width:104px;padding:12px 14px;border:0;border-radius:22px;background:var(--surface);box-shadow:0 4px 16px rgba(20,60,30,.08);display:flex;flex-direction:column;align-items:center;gap:2px}.dhwx .dhsun{font-size:26px;line-height:1}.dhwx b{font-size:21px}.dhwx small{color:var(--muted);font-size:13px}
.dhgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.dht{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:16px 6px 14px;border:0;border-radius:22px;background:var(--surface);box-shadow:0 3px 14px rgba(20,60,30,.07);min-height:132px}
.dht b{font-size:14.5px;letter-spacing:-.01em;font-weight:700;line-height:1.15;margin-top:4px}.dht small{font-size:11.5px;line-height:1.25;color:var(--muted)}
.dhcard{display:block;width:100%;margin-top:12px;padding:16px 18px;border:0;border-radius:22px;background:var(--surface);box-shadow:0 3px 14px rgba(20,60,30,.07);text-align:left}
.dhai{display:flex;align-items:center;gap:14px}.dhai .inf{flex:none;width:76px;padding-right:14px;border-right:1px solid var(--line)}.dhai .inf svg{width:64px;height:32px;display:block}.dhai .tx{flex:1;display:flex;flex-direction:column;gap:2px}.dhai .tx b{font-size:20px}.dhai .tx small{color:var(--muted);font-size:14px}.dhai>.dhi{color:var(--ink)}
.dhhd{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}.dhhd b{font-size:19px}.dhhd button{border:0;background:none;color:var(--muted)!important;font-size:15px;display:flex;align-items:center;gap:2px}
.dhrow{display:flex;align-items:center;gap:12px;padding:9px 0;color:var(--ink)}.dhrow+.dhrow{border-top:1px solid var(--line)}.dhrow .dhi{color:var(--green);flex:none}.dhrow .tm{min-width:44px;font-variant-numeric:tabular-nums}.dhrow .tx{flex:1;font-size:15px}
.dhnone{color:var(--muted);margin:8px 0 2px;font-size:14.5px}
.dhqh{display:block;font-size:19px;margin-bottom:10px}.dhqr{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.dhqr button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 2px;border:1px solid var(--line);border-radius:16px;background:var(--surface)}.dhqr .dhi{color:var(--green);width:26px;height:26px}.dhqr span{font-size:10.5px;max-width:100%;overflow-wrap:anywhere;line-height:1.15;text-align:center}
`);
/* ===== Nachlass: one place for provision and instructions for the family ===== */
const dnS={t:['Наследство и забота','Nachlass & Vorsorge','Estate & provision','Spadek i zabezpieczenie','Miras ve önlem','Succession & prévoyance','Herencia y previsión'],
 intro:['Всё, что понадобится близким: документы, имущество, контакты и ваши указания. Хранится только на этом телефоне.','Alles, was Ihre Angehörigen brauchen: Dokumente, Vermögen, Kontakte und Ihre Anweisungen. Nur auf diesem Telefon.','Everything your family will need: documents, assets, contacts and your instructions. Only on this phone.','Wszystko, czego potrzebują bliscy. Tylko na tym telefonie.','Yakınlarınızın ihtiyaç duyacağı her şey. Yalnızca bu telefonda.','Tout ce dont vos proches auront besoin. Uniquement sur ce téléphone.','Todo lo que necesitará su familia. Solo en este teléfono.'],
 l1:['Завещание и доверенности','Testament & Vollmachten','Will & powers of attorney','Testament i pełnomocnictwa','Vasiyet ve vekaletler','Testament & procurations','Testamento y poderes'],l1s:['Документы «Финансы и право»','Dokumente „Finanzen und Recht“','“Finance and law” documents','Dokumenty „Finanse i prawo”','“Finans ve hukuk” belgeleri','Documents « Finances et droit »','Documentos «Finanzas y derecho»'],
 l2:['Имущество','Vermögen','Assets','Majątek','Varlıklar','Patrimoine','Patrimonio'],l2s:['Что есть, сколько стоит, где документы','Was es gibt, was es wert ist, wo die Papiere sind','What there is, its value, where the papers are','Co jest, ile warte, gdzie papiery','Neler var, değeri, belgeler nerede','Ce qu’il y a, sa valeur, où sont les papiers','Qué hay, su valor, dónde están los papeles'],
 l3:['Личное дело','Persönliche Akte','Personal file','Akta osobowa','Kişisel dosya','Dossier personnel','Expediente personal'],l3s:['Данные для учреждений','Daten für Behörden','Details for authorities','Dane dla urzędów','Kurumlar için bilgiler','Données pour les administrations','Datos para organismos'],
 l4:['Важные люди','Wichtige Menschen','Important people','Ważne osoby','Önemli kişiler','Personnes importantes','Personas importantes'],l4s:['Семья, нотариус, консультанты','Familie, Notar, Berater','Family, notary, advisers','Rodzina, notariusz, doradcy','Aile, noter, danışmanlar','Famille, notaire, conseillers','Familia, notario, asesores'],
 l5:['Пакет на случай смерти','Paket für den Todesfall','Package for the event of death','Pakiet na wypadek śmierci','Vefat durumu paketi','Dossier en cas de décès','Paquete en caso de fallecimiento'],l5s:['Все документы одним PDF','Alle Dokumente in einem PDF','All documents in one PDF','Wszystkie dokumenty w jednym PDF','Tüm belgeler tek PDF','Tous les documents en un PDF','Todos los documentos en un PDF'],
 ins:['Мои указания близким','Meine Anweisungen an die Angehörigen','My instructions for the family','Moje wskazówki dla bliskich','Yakınlarıma talimatlarım','Mes consignes pour mes proches','Mis instrucciones para la familia'],
 insPh:['Например: где лежат оригиналы, кому позвонить первым, что сделать с подписками и аккаунтами, пожелания…','z. B.: wo die Originale liegen, wen man zuerst anruft, was mit Abos und Konten passiert, Wünsche …','e.g. where the originals are, whom to call first, what to do with subscriptions and accounts, wishes…','np. gdzie są oryginały, do kogo zadzwonić…','örn. asıllar nerede, önce kim aranmalı…','ex. où sont les originaux, qui appeler d’abord…','p. ej. dónde están los originales, a quién llamar primero…'],
 saved:['Сохранено','Gespeichert','Saved','Zapisano','Kaydedildi','Enregistré','Guardado'],
 note:['Это не юридическая консультация. Завещание действительно, только если оформлено по закону — в Германии от руки или у нотариуса.','Keine Rechtsberatung. Ein Testament gilt nur in gesetzlicher Form – in Deutschland handschriftlich oder beim Notar.','Not legal advice. A will is valid only in legal form – in Germany handwritten or with a notary.','To nie porada prawna.','Hukuki tavsiye değildir.','Ceci n’est pas un conseil juridique.','No es asesoramiento jurídico.']};
const dnt=k=>cv5n(dnS[k]);
function dnScreen(){const N=g.dnach||{};const row=(ic,k,a)=>`<button type="button" class="dnr" ${a}>${dhi(ic)}<span><b>${i(dnt(k))}</b><small>${i(dnt(k+'s'))}</small></span>${dhi('chev','sm')}</button>`;
 return`<div class="screen dnw"><div class="sub-hdr"><button class="iconbtn" data-act="dnback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(dnt('t'))}</h2></div><span></span></div>
 <p class="dnin">${i(dnt('intro'))}</p>
 <div class="dhcard dnl">${row('fld','l1','data-act="dccat" data-v="law"')}${row('bank','l2','data-act="go" data-to="assets"')}${row('chk','l4','data-act="go" data-to="people"')}${row('layers','l5','data-act="b3pack"')}</div>
 <h3 class="dnh">${i(dnt('ins'))}</h3><textarea class="field dnta" rows="8" placeholder="${i(dnt('insPh'))}" data-dnin>${i(N.txt||'')}</textarea><small class="dnst" data-dnst></small>
 <p class="dnnote">${i(dnt('note'))}</p></div>`}
['dnach'].forEach(r=>{Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='dnach')return dnScreen()}catch(e){Hooks.err('dnscreen',e)}});
Hooks.act('dnback',()=>R('home',void 0,!0));
{let tmr=null;document.addEventListener('input',e=>{const t=e.target;if(!t||!t.dataset||t.dataset.dnin==null)return;clearTimeout(tmr);tmr=setTimeout(()=>{g.dnach=Object.assign(g.dnach||{},{txt:t.value,d:Date.now()});$();const s=document.querySelector('[data-dnst]');if(s)s.textContent='✓ '+dnt('saved')},500)})}
Hooks.css('docs-nachlass',`
.dnin{color:var(--muted);font-size:14.5px;line-height:1.45;margin:2px 0 4px}
.dnl{padding:4px 16px}.dnr{display:flex;align-items:center;gap:12px;width:100%;padding:13px 0;border:0;background:none;text-align:left;color:var(--ink);font:inherit;cursor:pointer}.dnr+.dnr{border-top:1px solid var(--line)}.dnr>.dhi:first-child{color:var(--green);flex:none}.dnr span{flex:1;display:flex;flex-direction:column;gap:2px}.dnr b{font-weight:600}.dnr small{color:var(--muted);font-size:13px}
.dnh{margin:20px 0 8px;font-size:17px}.dnta{width:100%;min-height:150px;line-height:1.45}.dnst{display:block;color:var(--green);font-size:13px;margin-top:6px;min-height:16px}
.dnnote{color:var(--muted);font-size:12.5px;line-height:1.4;margin-top:10px}
`);
