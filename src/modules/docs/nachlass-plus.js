/* ===== Butler Docs: Vorsorge & Nachlass 2.0 (v94) =====
   One concept for both tabs, in the app's own style (coloured folders, our BUTLER header):
   «Verfügungen»: the five papers at a glance (count, there/missing) · Testament & Vorsorge · Paket für den Todesfall ·
     Tresor · Meine Anweisungen (structured, per category, with contact, papers and «vertraulich») · Verfügungs-Status
     (only what the user marked as needed for himself) · Nächste Prüfung (yearly check with a reminder).
   «Vermögen»: six categories (Immobilien, Fahrzeuge, Konten & Finanzen, Wertgegenstände, Beteiligungen, Sonstiges) built on the
     existing asset list (U().assets — one record per thing, nothing kept twice) · a card per thing with its own fields,
     linked documents and contracts, dates (TÜV, Wartung …) that go into the calendar and «Fristen» ·
     Vermögenspass in five variants · Vermögens-Status with what is missing.
   Honest limits: no bank connection (values are typed in or taken from papers); estimates are no market prices;
   PINs and passwords belong into the Tresor, not into a card; nothing is sent to anyone — the user shares a PDF himself.
   Data: g.vnx = {need:{test,vv,pv,bv,bs}, aneed:{immo…}, chk:{last,next,tk}, ins:[{id,cat,t,txt,who,docs[],conf,ts,upd}]}
         asset extras: a.vk (category), a.x {fields}, a.docs[], a.vtr[], a.orig, a.dl {tuv,oel,…: ISO date}, a.np (not in pass). */
const VNX_S={
 sub:['Всё, что понадобится близким: распоряжения, имущество и Ваши указания. Только на этом телефоне.','Alles, was Ihre Angehörigen brauchen: Verfügungen, Vermögen und Ihre Anweisungen. Nur auf diesem Telefon.','Everything your family will need: directives, assets and your instructions. Only on this phone.'],
 vOv:['Мои распоряжения — обзор','Meine Verfügungen im Überblick','My directives at a glance'],aOv:['Моё имущество — обзор','Mein Vermögen im Überblick','My assets at a glance'],
 add:['Добавить','Hinzufügen','Add'],all:['Показать все','Alle anzeigen','Show all'],
 r_tv:['Завещание и распоряжения','Testament & Vorsorge','Will & provisions'],r_tvS:['Завещание, дополнения и личные пожелания','Testament, Ergänzungen und persönliche Wünsche','Will, additions and personal wishes'],
 r_pk:['Пакет на случай смерти','Paket für den Todesfall','Package for the event of death'],r_pkS:['Всё важное для близких одним PDF','Alles Wichtige für Ihre Angehörigen in einem PDF','Everything important for your family in one PDF'],
 r_ts:['Сейф (Tresor)','Tresor','Safe'],r_tsS:['Пароли, PIN, доступы и конфиденциальное','Passwörter, PINs, Zugänge und Vertrauliches','Passwords, PINs, access data and confidential things'],
 r_an:['Мои указания','Meine Anweisungen','My instructions'],r_anS:['Важные советы, контакты и порядок действий','Wichtige Hinweise, Kontakte und Abläufe','Important notes, contacts and steps'],
 vSt:['Статус распоряжений','Verfügungs-Status','Directives status'],aSt:['Статус имущества','Vermögens-Status','Assets status'],
 stOf:['%a из %b нужных Вам пунктов есть','%a von %b für Sie nötigen Bereichen eingerichtet','%a of %b areas you need are set up'],
 stEdit:['Что нужно лично мне','Was brauche ich?','What do I need?'],stEditS:['Отметьте, что нужно именно Вам. Отсутствующий документ — не нарушение, а только подсказка.','Markieren Sie, was Sie für sich brauchen. Ein fehlendes Papier ist kein Fehler, nur ein Hinweis.','Mark what you need for yourself. A missing paper is no fault, only a hint.'],
 chk:['Следующая проверка','Nächste Prüfung','Next check'],chkS:['Рекомендуется раз в год проверять распоряжения.','Empfohlen: Ihre Verfügungen jährlich überprüfen.','Recommended: check your directives once a year.'],
 chkT:['Проверка распоряжений','Verfügungen prüfen','Check your directives'],
 chkQ1:['Контакты доверенных лиц ещё актуальны?','Sind die Kontakte der Bevollmächtigten noch aktuell?','Are the contacts of the named persons still current?'],
 chkQ2:['Оригиналы лежат там же, где указано?','Liegen die Originale noch dort, wo es steht?','Are the originals still where it says?'],
 chkQ3:['Есть новые версии документов?','Gibt es neue Fassungen der Papiere?','Are there new versions of the papers?'],
 chkQ4:['Доверенные лица не изменились?','Sind die Vertrauenspersonen dieselben?','Are the trusted persons the same?'],
 chkOk:['Всё проверено — следующая через год','Alles geprüft – nächste Prüfung in einem Jahr','All checked – next check in a year'],
 chkDate:['Другая дата','Anderes Datum','Other date'],chkDone:['Проверено %d','Geprüft am %d','Checked %d'],chkTask:['Проверить распоряжения (Vorsorge & Nachlass)','Verfügungen prüfen (Vorsorge & Nachlass)','Check directives (Vorsorge & Nachlass)'],
 chkNo:['ещё не проверялось','noch nie geprüft','not checked yet'],
 locked:['защищён кодом','mit Code geschützt','protected by a code'],
 there:['есть','vorhanden','there'],missing:['нет','fehlt','missing'],notNeed:['не нужно','nicht nötig','not needed'],
 /* instructions */
 ic_kon:['Важные контакты','Wichtige Kontakte','Important contacts'],ic_dok:['Документы — где оригиналы','Dokumente – wo die Originale sind','Documents – where the originals are'],ic_imm:['Недвижимость','Immobilien','Property'],ic_fz:['Транспорт','Fahrzeuge','Vehicles'],
 ic_ver:['Страховки','Versicherungen','Insurance'],ic_dig:['Цифровые аккаунты','Digitale Konten','Digital accounts'],ic_wun:['Личные пожелания','Persönliche Wünsche','Personal wishes'],ic_son:['Прочие указания','Sonstige Hinweise','Other notes'],
 inNew:['Новое указание','Neue Anweisung','New instruction'],inT:['Заголовок','Titel','Title'],inTxt:['Что нужно знать и сделать','Was man wissen und tun soll','What to know and to do'],
 inWho:['Ответственный контакт','Zuständige Person','Person in charge'],inWhoPh:['например сын Андрей, 0171 …','z. B. Sohn Andrej, 0171 …','e.g. son Andrej, 0171 …'],
 inConf:['Конфиденциально — не включать в пакет без моего выбора','Vertraulich – nur auf meine Auswahl ins Paket','Confidential – into the package only if I choose'],
 inDocs:['Связанные документы','Verknüpfte Dokumente','Linked documents'],inDocAdd:['＋ документ','＋ Dokument','＋ document'],
 inDig:['Пароли и PIN сюда не пишите — для них есть Tresor.','Passwörter und PINs nicht hier eintragen – dafür gibt es den Tresor.','Don’t put passwords or PINs here – that is what the safe is for.'],
 inNone:['Пока нет указаний. Начните с самого важного: кому позвонить первым и где лежат оригиналы.','Noch keine Anweisungen. Beginnen Sie mit dem Wichtigsten: wen man zuerst anruft und wo die Originale liegen.','No instructions yet. Start with the most important: whom to call first and where the originals are.'],
 upd:['обновлено %d','aktualisiert %d','updated %d'],conf:['конфиденциально','vertraulich','confidential'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],need:['Впишите заголовок','Bitte einen Titel eingeben','Please enter a title'],
 saved:['Сохранено','Gespeichert','Saved'],
 /* assets */
 k_immo:['Недвижимость','Immobilien','Property'],k_fz:['Транспорт','Fahrzeuge','Vehicles'],k_kto:['Счета и финансы','Konten & Finanzen','Accounts & finance'],k_wert:['Ценные вещи','Wertgegenstände','Valuables'],k_bet:['Доли участия','Beteiligungen','Shareholdings'],k_son:['Прочее имущество','Sonstiges Vermögen','Other assets'],
 ks_immo:['Дома, квартиры, участки','Häuser, Wohnungen, Grundstücke','Houses, flats, plots'],ks_fz:['Авто, мотоциклы, дома на колёсах','Autos, Motorräder, Wohnmobile','Cars, motorbikes, campers'],ks_kto:['Счета, депо, вклады','Konten, Depots, Sparanlagen','Accounts, depots, savings'],
 ks_wert:['Украшения, часы, искусство, коллекции','Schmuck, Uhren, Kunst, Sammlungen','Jewellery, watches, art, collections'],ks_bet:['Компании, доли, фирмы','Unternehmen, Anteile, Firmen','Companies, stakes, firms'],ks_son:['Другие ценности и вещи','Weitere Werte und Besitztümer','Other values and belongings'],
 aNone:['В этой категории пока ничего нет.','In dieser Kategorie ist noch nichts.','Nothing in this category yet.'],aAdd:['Добавить в «%k»','Zu „%k“ hinzufügen','Add to “%k”'],
 pass:['Паспорт имущества (PDF)','Vermögenspass (PDF)','Property passport (PDF)'],passS:['Обзор всего имущества — для нотариуса, страховой или наследников','Übersicht über Ihr gesamtes Vermögen – für Notar, Versicherung oder Erben','Overview of all your assets – for notary, insurer or heirs'],
 total:['Указанная стоимость','Angegebener Wert','Stated value'],approx:['ориентировочно','geschätzt','estimated'],
 /* card */
 f_name:['Название','Bezeichnung','Name'],f_value:['Ориентировочная стоимость, €','Geschätzter Wert, €','Estimated value, €'],f_cost:['Цена покупки, €','Kaufpreis, €','Purchase price, €'],f_date:['Дата приобретения','Erworben am','Acquired on'],
 f_orig:['Где лежат документы/оригинал','Wo liegen Papiere/Original','Where papers/original are'],f_note:['Заметка','Notiz','Note'],
 f_art:['Тип','Art','Type'],f_addr:['Адрес','Adresse','Address'],f_land:['Страна','Land','Country'],f_qm:['Площадь, м²','Fläche, m²','Area, m²'],f_zi:['Комнат','Zimmer','Rooms'],f_bj:['Год постройки / выпуска','Baujahr','Year built'],
 f_kred:['Остаток кредита, €','Restschuld Kredit, €','Loan balance, €'],f_mon:['Расходы в месяц, €','Kosten pro Monat, €','Costs per month, €'],f_miete:['Доход от аренды в месяц, €','Mieteinnahmen pro Monat, €','Rental income per month, €'],
 f_kz:['Номерной знак','Kennzeichen','Number plate'],f_vin:['VIN (FIN)','FIN / VIN','VIN'],f_km:['Пробег, км','Kilometerstand','Mileage, km'],f_halter:['Владелец','Halter','Keeper'],
 f_bank:['Банк или организация','Bank oder Institut','Bank or institution'],f_owner:['Владелец','Inhaber','Owner'],f_open:['Открыт','Eröffnet','Opened'],
 f_herst:['Производитель','Hersteller','Maker'],f_sn:['Серийный номер','Seriennummer','Serial number'],f_ort:['Где находится','Aufbewahrungsort','Where it is kept'],f_zert:['Сертификат подлинности','Echtheitszertifikat','Certificate of authenticity'],
 f_firma:['Компания','Firma','Company'],f_anteil:['Доля, %','Anteil, %','Share, %'],f_kontakt:['Контактное лицо','Ansprechpartner','Contact person'],
 f_kat:['Подкатегория','Unterkategorie','Subcategory'],f_erst:['Первая регистрация','Erstzulassung','First registration'],f_kraft:['Топливо / двигатель','Kraftstoff / Antrieb','Fuel / drive'],f_zust:['Состояние','Zustand','Condition'],f_reg:['Регистрация (Handelsregister)','Handelsregister-Nr.','Register number'],f_gar:['Гарантия до','Garantie bis','Warranty until'],
 d_tuv:['TÜV / техосмотр','TÜV / HU','MOT'],d_oel:['Замена масла / сервис','Ölwechsel / Inspektion','Oil change / service'],d_reif:['Смена шин','Reifenwechsel','Tyre change'],d_vers:['Страховка — срок','Versicherung – Termin','Insurance date'],
 d_heiz:['Обслуживание отопления','Heizungswartung','Heating service'],d_pruef:['Проверка/осмотр','Prüfung / Begehung','Inspection'],
 sMain:['Основное','Grunddaten','Basics'],sFin:['Финансы','Finanzen','Finance'],sDates:['Сроки','Termine & Fristen','Dates'],sDocs:['Документы','Dokumente','Documents'],sVtr:['Договоры и страховки','Verträge & Versicherungen','Contracts & insurance'],
 docAdd:['Связать документ','Dokument verknüpfen','Link a document'],vtrAdd:['Связать договор','Vertrag verknüpfen','Link a contract'],noVtr:['Договоров пока нет','Noch keine Verträge','No contracts yet'],
 sugg:['подходит','passt','fits'],inPass:['В паспорт имущества','In den Vermögenspass','In the property passport'],
 tresorHint:['PIN, пароли и доступы — только в Tresor.','PINs, Passwörter und Zugänge gehören in den Tresor.','PINs, passwords and access data belong in the safe.'],
 estHint:['Оценка — не рыночная цена и не гарантия.','Eine Schätzung ist kein Marktpreis und keine Garantie.','An estimate is no market price and no guarantee.'],
 calOk:['Даты внесены в календарь','Termine im Kalender eingetragen','Dates added to the calendar'],
 miss_docs:['без документов','ohne Dokumente','without documents'],miss_val:['без стоимости','ohne Wert','without value'],miss_orig:['не указано, где оригинал','Ablageort fehlt','storage place missing'],
 open:['Открыть','Öffnen','Open'],
 /* PDFs */
 pv_full:['Полный','Vollständig','Full'],pv_kurz:['Кратко','Kurzfassung','Short'],pv_not:['Для нотариуса','Für Notar','For the notary'],pv_vers:['Для страховой','Für Versicherung','For the insurer'],pv_ang:['Для близких','Für Angehörige','For the family'],
 pvS_full:['Все данные, документы, где оригиналы, что не хватает','Alle Angaben, Dokumente, Ablageorte, was fehlt','All details, documents, places, what is missing'],pvS_kurz:['Только название и стоимость','Nur Bezeichnung und Wert','Only name and value'],
 pvS_not:['Без цен покупки; документы и места хранения','Ohne Kaufpreise; Dokumente und Ablageorte','Without purchase prices; documents and places'],pvS_vers:['Ценности, серийные номера, стоимость, гарантии','Werte, Seriennummern, Garantien','Values, serial numbers, warranties'],
 pvS_ang:['Что есть и где документы — без сумм','Was es gibt und wo die Papiere liegen – ohne Beträge','What there is and where the papers are – no amounts'],
 pvCats:['Категории','Kategorien','Categories'],pvGo:['Создать PDF','PDF erstellen','Make PDF'],pvBusy:['Собираю PDF …','PDF wird erstellt …','Making the PDF …'],
 pvMiss:['Не хватает или стоит проверить','Fehlt oder bitte prüfen','Missing or worth checking'],pvAs:['По состоянию на %d','Stand: %d','As of %d'],
 pvNote:['Сведения внесены владельцем; стоимость ориентировочная. Не юридический документ.','Angaben vom Eigentümer; Werte geschätzt. Kein Rechtsdokument.','Details entered by the owner; values estimated. Not a legal document.'],
 pk:['Что включить в пакет','Was ins Paket kommt','What goes into the package'],pkS:['Пакет не отправляется сам — Вы сами решаете, кому и когда его дать.','Das Paket wird nicht verschickt – Sie entscheiden selbst, wem und wann Sie es geben.','The package is never sent by itself – you decide whom to give it and when.'],
 pk_vf:['Распоряжения и где оригиналы','Verfügungen und wo die Originale liegen','Directives and where the originals are'],pk_vm:['Обзор имущества','Vermögensübersicht','Asset overview'],pk_vt:['Договоры и страховки','Verträge & Versicherungen','Contracts & insurance'],
 pk_bh:['Ведомства и службы','Behörden & Dienste','Offices & services'],pk_an:['Мои указания','Meine Anweisungen','My instructions'],pk_cf:['вкл. конфиденциальные указания','inkl. vertrauliche Anweisungen','incl. confidential instructions'],
 pkDocs:['Добавить страницы документов распоряжений','Seiten der Verfügungs-Dokumente anhängen','Attach the pages of the directive papers'],pkMore:['Другие документы как пакет ›','Weitere Dokumente als Paket ›','Other documents as a package ›'],
 pkT:['Информация для моих близких','Informationen für meine Angehörigen','Information for my family'],pkGo:['Проверить и создать PDF','Prüfen und PDF erstellen','Check and make PDF'],
 pkChk:['Проверка перед PDF','Vor dem PDF geprüft','Checked before the PDF'],pkAllOk:['Всё на месте','Alles vorhanden','Everything there'],
 noPw:['PDF без пароля: храните его в надёжном месте или передавайте лично.','Das PDF hat kein Passwort: sicher aufbewahren oder persönlich übergeben.','The PDF has no password: keep it safe or hand it over in person.'],
 aAll:['Всё имущество','Alle Vermögenswerte','All assets'],
 /* Butler AI */
 aiAssets:['Имущество: %n записей, указано %v. %c','Vermögen: %n Einträge, angegeben %v. %c','Assets: %n entries, stated %v. %c'],
 aiMissV:['Не заполнено: %l.','Noch offen: %l.','Still open: %l.'],aiAllV:['Все нужные распоряжения есть.','Alle nötigen Verfügungen sind da.','All needed directives are there.'],
 aiOrig:['Оригинал завещания: %o','Original des Testaments: %o','Original of the will: %o'],aiOrigNo:['Где лежит оригинал завещания, ещё не указано.','Wo das Original des Testaments liegt, ist noch nicht eingetragen.','Where the original will is has not been entered yet.'],
 aiIns:['Указаний: %n','Anweisungen: %n','Instructions: %n'],aiDocs:['Для «%n» не хватает: %l','Für „%n“ fehlt: %l','For “%n” missing: %l'],aiDocsOk:['У «%n» всё связано.','Bei „%n“ ist alles verknüpft.','“%n” is fully linked.']};
const vnxt=(k,o)=>{let s=cv5n(VNX_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
Object.assign(IKN_G,{
 layers:'<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16L12 20.5l8.5-4.5"/>',
 safe:'<rect x="4" y="4.5" width="16" height="14.5" rx="2"/><circle cx="12" cy="11.8" r="3.2"/><path d="M12 10.6v1.2M7 19v1.5M17 19v1.5"/>',
 list:'<rect x="4.5" y="4" width="15" height="16.5" rx="2"/><path d="M8 9l1.5 1.5L12 8M8 14l1.5 1.5L12 13M14 9.5h2.5M14 14.5h2.5"/>',
 diamond:'<path d="M7 4.5h10l3.5 5L12 20 3.5 9.5z"/><path d="M3.5 9.5h17M9.5 4.5L8 9.5l4 10.5 4-10.5-1.5-5"/>',
 pie:'<path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12z"/><path d="M14.5 3.8a8.5 8.5 0 0 1 5.7 5.7h-5.7z"/>',
 dove:'<path d="M4 15c3 .5 5.5-.5 7-3l3-5c.6-1 1.8-1.5 3-1l2 1-2 1.2c.2 3.5-1.8 7.3-6 8.8L7 18.5"/><path d="M11 12c-1.5-1-2.5-3-2.5-5.5 1.8.5 3.5 1.8 4.5 3.5"/>',
 testam:'<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 11.5h6M9.5 14.5h3.5M10 18c1-1.2 2-1.4 2.5-.5s1.5.7 2.5-.3"/>'});
const vnxL=t=>t.split(' ').map(z=>z.split('|'));
const VNX_V=vnxL('test|testam|stadt vv|shield|green pv|heart|ges bv|ppl|recht bs|dove|vers');
const VNX_A=vnxL('immo|house|#3F9FA3 fz|car|#4A84D6 kto|coins|#4E9E5F wert|diamond|#8B6FD0 bet|pie|#E0A92E son|box|#A8714E');
const VNX_IC=vnxL('kon|phone|stadt dok|fld|vers imm|house|stadt fz|car|auto ver|shield|green dig|lock|recht wun|heart|ges son|list|weit');
const vnxD=()=>{const o=g.vnx=g.vnx&&typeof g.vnx==='object'?g.vnx:{};if(!o.need)o.need={test:1,vv:1,pv:1,bv:0,bs:1};if(!o.aneed)o.aneed={immo:1,fz:1,kto:1,wert:1,bet:0,son:0};if(!o.chk)o.chk={};
 if(!Array.isArray(o.ins)){o.ins=[];const old=g.dnach&&String(g.dnach.txt||'').trim();if(old)o.ins.push({id:V(),cat:'son',t:cv5n(VNX_S.ic_son),txt:old,who:'',docs:[],conf:0,ts:g.dnach.d||Date.now(),upd:g.dnach.d||Date.now()})}return o};
const vnxDate=ts=>{try{return new Date(ts).toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'})}catch{return''}};
const vnxIsoD=k=>{try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'})}catch{return k}};
const vnxRing=(p,c)=>{const r=26,L=2*Math.PI*r;return`<svg class="vnxring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="${r}" fill="none" stroke="color-mix(in srgb,${c||'var(--green)'} 16%,transparent)" stroke-width="7"/><circle cx="32" cy="32" r="${r}" fill="none" stroke="${c||'var(--green)'}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(L*p/100).toFixed(1)} ${L.toFixed(1)}" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">${p}%</text></svg>`};
const vnxRow=(ic,c,t,s,act,n)=>`<button type="button" class="odr vnxr" ${act}>${iknF(ic,c,'s')}<span><b>${i(t)}</b>${s?`<small>${i(s)}</small>`:''}</span>${n!=null&&n!==''?`<em class="vnxn">${i(String(n))}</em>`:''}${dhi('chev','sm')}</button>`;

/* ---------- Verfügungen ---------- */
const vnxVDocs=k=>{try{return vsgDocs(k)}catch{return[]}};
const vnxVName=k=>{try{return vsgt('s_'+k).replace(/\s*\(.*\)$/,'')}catch{return k}};
const VNX_SHORT={test:['Завещание','Testament','Will'],vv:['Доверенность','Vorsorge­vollmacht','Power of attorney'],pv:['Распоряжение пациента','Patienten­verfügung','Living will'],bv:['Об опеке','Betreuungs­verfügung','Care directive'],bs:['О похоронах','Bestattungs­verfügung','Funeral wishes']};
function vnxVStat(){const o=vnxD(),N=VNX_V.filter(([k])=>o.need[k]),ok=N.filter(([k])=>vnxVDocs(k).length);return{N,ok,p:N.length?Math.round(ok.length/N.length*100):0}}
function vnxTresor(){try{if(g.vault&&g.vault.enc&&!(g.vault.items||[]).length)return{n:'',s:vnxt('locked')};return{n:(g.vault&&g.vault.items||[]).length||'',s:vnxt('r_tsS')}}catch{return{n:'',s:vnxt('r_tsS')}}}
function vnxVTab(){const o=vnxD(),st=vnxVStat(),tr=vnxTresor(),nd=VNX_V.reduce((s,[k])=>s+vnxVDocs(k).length,0);
 const tiles=VNX_V.map(([k,ic,c])=>{const n=vnxVDocs(k).length;return`<button type="button" class="vnxt${n?' ok':''}" data-act="vsgslot" data-k="${k}">${iknF(ic,c,'m')}<b>${i(cv5n(VNX_SHORT[k]))}</b><em>${n}</em></button>`}).join('')+`<button type="button" class="vnxt vnxplus" data-act="vnxvadd"><span>＋</span><b>${i(vnxt('add'))}</b></button>`;
 const chk=o.chk.next||'';
 return`<h3 class="odh">${i(vnxt('vOv'))}</h3><div class="vnxtiles">${tiles}</div>
 <div class="dhcard odl dnl vnxrows">${vnxRow('fld','stadt',vnxt('r_tv'),(()=>{try{return vsgSub()}catch{return vnxt('r_tvS')}})(),'data-act="go" data-to="dvors"',nd||'')}${vnxRow('layers','recht',vnxt('r_pk'),vnxt('r_pkS'),'data-act="vnxpk"')}${vnxRow('safe','arb',vnxt('r_ts'),tr.s,'data-act="dhvault"',tr.n).replace('class="odr vnxr"','class="odr vnxr brvault"')}${vnxRow('list','green',vnxt('r_an'),vnxt('r_anS'),'data-act="go" data-to="vnxa"',o.ins.length||'')}</div>
 <button type="button" class="dhcard vnxst" data-act="vnxneed" data-w="v">${vnxRing(st.p)}<span class="vnxstt"><b>${i(vnxt('vSt'))}</b><small>${i(vnxt('stOf',{a:st.ok.length,b:st.N.length}))}</small></span>
  <span class="vnxstl">${VNX_V.filter(([k])=>o.need[k]).map(([k])=>{const ok=vnxVDocs(k).length;return`<i class="${ok?'ok':''}">${ok?'✓':''}</i><span>${i(cv5n(VNX_SHORT[k]).replace(/­/g,''))}</span>`}).join('')}</span></button>
 <button type="button" class="dhcard vnxchk" data-act="vnxchk">${iknF('cal','green','s')}<span><b>${i(vnxt('chk'))}</b><small>${i(o.chk.last?vnxt('chkDone',{d:vnxDate(o.chk.last)}):vnxt('chkS'))}</small></span><em>${i(chk?vnxIsoD(chk):vnxt('chkNo'))}</em>${dhi('chev','sm')}</button>
 <p class="dnnote">${i(dnt('note'))}</p>`}

/* ---------- Vermögen: one record per thing, on top of the existing asset list ---------- */
const vnxAs=()=>{try{return U().assets.filter(a=>a&&!a.sold)}catch{return[]}};
function vnxCat(a){if(a.vk&&VNX_A.some(c=>c[0]===a.vk))return a.vk;const t=String(a.type||''),k=String(a.ik||''),nm=String(a.name||'')+' '+String(a.note||'');
 if(/auto|pkw|fahrzeug|motorrad|wohnmobil|машин|автомоб|\bcar\b/i.test(nm))return'fz';if(t==='property')return'immo';if(t==='business')return'bet';
 if(/gold|valuable|crypto/.test(t+' '+k)&&!/crypto/.test(k))return'wert';if(/stocks|bonds|deposit|cash|account|sparbuch|tagesgeld|festgeld|etf|stock|bond|crypto/.test(t+' '+k))return'kto';
 if(/schmuck|uhr\b|kunst|antik|sammlung|ювелир|часы|картин/i.test(nm))return'wert';return'son'}
const vnxIn=k=>vnxAs().filter(a=>vnxCat(a)===k);
const vnxCol=k=>(VNX_A.find(c=>c[0]===k)||VNX_A[5])[2];
const vnxIc=(k,sz)=>{const c=VNX_A.find(z=>z[0]===k)||VNX_A[5];return iknF(c[1],c[2],sz)};
const vnxSum=L=>L.reduce((s,a)=>s+(+a.value||0),0);
function vnxMiss(a){const M=[];if(!(a.docs||[]).length)M.push(vnxt('miss_docs'));if(!(+a.value))M.push(vnxt('miss_val'));if(!a.orig)M.push(vnxt('miss_orig'));return M}
function vnxAStat(){const o=vnxD(),N=VNX_A.filter(([k])=>o.aneed[k]),ok=N.filter(([k])=>vnxIn(k).length);return{N,ok,p:N.length?Math.round(ok.length/N.length*100):0}}
function vnxATab(){const o=vnxD(),st=vnxAStat(),A=vnxAs(),tot=vnxSum(A);
 const tiles=VNX_A.slice(0,5).map(([k])=>`<button type="button" class="vnxt${vnxIn(k).length?' ok':''}" data-act="vnxk" data-k="${k}">${vnxIc(k,'m')}<b>${i(vnxt('k_'+k))}</b><em>${vnxIn(k).length}</em></button>`).join('')+`<button type="button" class="vnxt vnxplus" data-act="vnxnew"><span>＋</span><b>${i(vnxt('add'))}</b></button>`;
 return`<div class="bkxh"><h3 class="odh">${i(vnxt('aOv'))}</h3><button type="button" class="bkxall" data-act="vnxk" data-k="">${i(vnxt('all'))} ›</button></div><div class="vnxtiles">${tiles}</div>
 <div class="dhcard odl vnxrows">${VNX_A.map(([k])=>{const n=vnxIn(k).length;return vnxRow(VNX_A.find(c=>c[0]===k)[1],vnxCol(k),vnxt('k_'+k),vnxt('ks_'+k),`data-act="vnxk" data-k="${k}"`,n||'')}).join('')}</div>
 ${tot?`<div class="dhcard vnxtot"><small>${i(vnxt('total'))} · ${i(vnxt('approx'))}</small><b>${i(fzEur(tot))}</b></div>`:''}
 <button type="button" class="dhcard vnxpass" data-act="vnxpass">${iknF('layers','recht','s')}<span><b>${i(vnxt('pass'))}</b><small>${i(vnxt('passS'))}</small></span>${dhi('chev','sm')}</button>
 <button type="button" class="dhcard vnxst" data-act="vnxneed" data-w="a">${vnxRing(st.p)}<span class="vnxstt"><b>${i(vnxt('aSt'))}</b><small>${i(vnxt('stOf',{a:st.ok.length,b:st.N.length}))}</small></span>
  <span class="vnxstl">${st.N.map(([k])=>{const ok=vnxIn(k).length;return`<i class="${ok?'ok':''}">${ok?'✓':''}</i><span>${i(vnxt('k_'+k))}</span>`}).join('')}</span></button>
 <p class="dnnote">${i(vnxt('estHint'))} ${i(vnxt('tresorHint'))}</p>`}

/* the new home of «Vorsorge & Nachlass» */
function vnxScreen(){const N=g.dnach||{},tab=N.tab==='a'?'a':'v';
 return`<div class="screen dhome dnw vnx">${bsvHdr(dnt('t'),'dnback')}<p class="dnin">${i(vnxt('sub'))}</p>
 <div class="fztabs dntabs"><button type="button" class="${tab==='v'?'on':''}" data-act="dntab" data-k="v">${i(dnt('tV'))}</button><button type="button" class="${tab==='a'?'on':''}" data-act="dntab" data-k="a">${i(dnt('tA'))}</button></div>
 ${tab==='a'?vnxATab():vnxVTab()}</div>`}

/* ---------- a category / all assets ---------- */
let vnxSelK='immo',vnxSelA=null,vnxEd=null,vnxDel=0;
function vnxKScr(){const k=vnxSelK,L=k?vnxIn(k):vnxAs(),tot=vnxSum(L);
 return`<div class="screen dhome vnx vnxk">${bsvHdr(k?vnxt('k_'+k):vnxt('aAll'),'bsvback')}
 ${k?`<div class="bkxhd">${vnxIc(k)}<div><h3>${i(vnxt('k_'+k))}</h3><small>${i(vnxt('ks_'+k))}</small></div></div>`:''}
 ${tot?`<div class="dhcard vnxtot"><small>${i(vnxt('total'))} · ${i(vnxt('approx'))}</small><b>${i(fzEur(tot))}</b></div>`:''}
 ${L.length?`<div class="dhcard odl">${L.map(a=>{const c=vnxCat(a),M=vnxMiss(a);return`<button type="button" class="odr vnxr" data-act="vnxa" data-id="${i(a.id)}">${vnxIc(c,'s')}<span><b>${i(a.name||'—')}</b><small>${i([+a.value?fzEur(a.value):'',(a.docs||[]).length?vnxt('sDocs')+': '+a.docs.length:'',M.length?'⚠ '+M[0]:''].filter(Boolean).join(' · '))}</small></span>${dhi('chev','sm')}</button>`}).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(vnxt('aNone'))}</p></div>`}
 <button type="button" class="bsvaddb" data-act="vnxnew" data-k="${k}">＋ ${i(k?vnxt('aAdd',{k:vnxt('k_'+k)}):vnxt('add'))}</button></div>`}

/* fields per category: 'key|label|type'; dates d: go to the calendar */
const VNX_F={immo:['art|f_art|sel:Wohnung,Haus,Grundstück,Gewerbe','addr|f_addr','land|f_land','qm|f_qm|num','zi|f_zi|num','bj|f_bj|num','owner|f_owner'],
 fz:['typ|f_art|sel:PKW,Motorrad,Wohnmobile,Anhänger,Transporter,Sonstiges','kz|f_kz','vin|f_vin','bj|f_bj|num','erst|f_erst|date','km|f_km|num','kraft|f_kraft|sel:Benzin,Diesel,Elektro,Hybrid,Gas,Sonstiges','halter|f_halter'],
 kto:['bank|f_bank','art|f_art|sel:Sparguthaben,Festgeld,Tagesgeld,Wertpapiere,Investmentfonds,Bargeld,Girokonto,Sonstige','owner|f_owner','open|f_open|date'],
 wert:['art|f_kat|sel:Schmuck,Uhren,Kunst,Sammlungen,Edelmetalle,Antiquitäten,Weitere','herst|f_herst','sn|f_sn','ort|f_ort','zust|f_zust|sel:Neu,Sehr gut,Gut,Gebraucht','zert|f_zert'],
 bet:['firma|f_firma','land|f_land','art|f_art|sel:GmbH,UG,AG,KG,GbR,Einzelunternehmen,Projektanteil,Sonstige','reg|f_reg','anteil|f_anteil|num','kontakt|f_kontakt'],
 son:['art|f_kat|sel:Elektronik,Möbel,Werkzeuge,Maschinen,Geräte,Sonstige','ort|f_ort','sn|f_sn','herst|f_herst']};
const VNX_FIN={immo:'kred|f_kred|eur mon|f_mon|eur miete|f_miete|eur'.split(' ')};
const VNX_DL={immo:['heiz|d_heiz','pruef|d_pruef'],fz:['tuv|d_tuv','oel|d_oel','reif|d_reif','vers|d_vers'],wert:['gar|f_gar'],son:['gar|f_gar']};
const vnxSp=s=>{const p=String(s).split('|');return{k:p[0],l:p[1],t:p[2]||'txt'}};
function vnxGet(id){return vnxAs().find(a=>a.id===id)||(()=>{try{return U().assets.find(a=>a.id===id)}catch{return null}})()}
function vnxCard(a){const k=vnxCat(a),x=a.x||{},F=(VNX_F[k]||[]).map(vnxSp).filter(f=>x[f.k]),FI=(VNX_FIN[k]||[]).map(vnxSp).filter(f=>x[f.k]),DL=(VNX_DL[k]||[]).map(vnxSp).filter(f=>(a.dl||{})[f.k]);
 const kv=(l,v)=>`<div><small>${i(l)}</small><b>${i(v)}</b></div>`;
 let D=[];try{D=Ke().items.filter(d=>(a.docs||[]).includes(d.id))}catch{}
 const V2=(()=>{try{return vaContracts().filter(c=>(a.vtr||[]).includes(c.id))}catch{return[]}})(),M=vnxMiss(a);
 return`<div class="screen dhome vnx vnxd">${bsvHdr(vnxt('k_'+k),'bsvback',`<button type="button" class="iconbtn" data-act="vnxedit" data-id="${i(a.id)}" aria-label="edit">${bsvi('edit')}</button>`)}
 <div class="bkxhd">${vnxIc(k)}<div><h3>${i(a.name||'—')}</h3><small>${i(+a.value?fzEur(a.value)+' · '+vnxt('approx'):vnxt('miss_val'))}</small></div></div>
 ${M.length?`<div class="dhcard vnxmiss">⚠ ${i(M.join(' · '))}</div>`:''}
 <h3 class="odh">${i(vnxt('sMain'))}</h3><div class="dhcard vkv">${F.map(f=>kv(vnxt(f.l),f.t==='date'?vnxIsoD(x[f.k]):x[f.k])).join('')}${a.date?kv(vnxt('f_date'),vnxIsoD(a.date)):''}${+a.cost?kv(vnxt('f_cost'),fzEur(a.cost)):''}${a.orig?kv(vnxt('f_orig'),a.orig):''}${a.note?kv(vnxt('f_note'),a.note):''}${!F.length&&!a.date&&!a.orig&&!a.note?`<p class="dhnone">—</p>`:''}</div>
 ${FI.length?`<h3 class="odh">${i(vnxt('sFin'))}</h3><div class="dhcard vkv">${FI.map(f=>kv(vnxt(f.l),fzEur(x[f.k]))).join('')}</div>`:''}
 ${DL.length?`<h3 class="odh">${i(vnxt('sDates'))}</h3><div class="dhcard odl">${DL.map(f=>`<div class="odr vnxr">${iknF('cal',vnxCol(k),'s')}<span><b>${i(vnxt(f.l))}</b><small>${i(vnxIsoD(a.dl[f.k]))}</small></span></div>`).join('')}</div>`:''}
 <h3 class="odh">${i(vnxt('sDocs'))}</h3><div class="dhcard odl">${D.map(d=>`<button type="button" class="odr vnxr" data-act="dzopen" data-id="${i(d.id)}">${iknF('doc','weit','s')}<span><b>${i(d.title||'—')}</b></span>${dhi('chev','sm')}</button>`).join('')}<button type="button" class="bsvplus" data-act="vnxdoc" data-id="${i(a.id)}">＋ ${i(vnxt('docAdd'))}</button></div>
 <h3 class="odh">${i(vnxt('sVtr'))}</h3><div class="dhcard odl">${V2.map(c=>`<button type="button" class="odr vnxr" data-act="insopen" data-id="${i(c.id)}">${iknF('shield','green','s')}<span><b>${i(c.title||c.co||'—')}</b>${c.co&&c.title?`<small>${i(c.co)}</small>`:''}</span>${dhi('chev','sm')}</button>`).join('')}<button type="button" class="bsvplus" data-act="vnxvtr" data-id="${i(a.id)}">＋ ${i(vnxt('vtrAdd'))}</button></div>
 <label class="bsvtog vnxpt"><input type="checkbox" data-vnxnp="${i(a.id)}" ${a.np?'':'checked'}><span>${i(vnxt('inPass'))}</span></label>
 ${k==='kto'?`<p class="dnnote">${i(vnxt('tresorHint'))}</p>`:''}</div>`}

/* form (a screen: many fields fit better than in a sheet) */
function vnxForm(){const d=vnxEd,k=d.vk,x=d.x||{};
 const fld=(f,val,pre)=>{const t=f.t;const nm=`data-vf="${pre}${f.k}"`;if(t.startsWith('sel:'))return`<label class="bsvl">${i(vnxt(f.l))}</label><select class="field" ${nm}><option value=""></option>${t.slice(4).split(',').map(o=>`<option ${val===o?'selected':''}>${i(o)}</option>`).join('')}</select>`;
  return`<label class="bsvl">${i(vnxt(f.l))}</label><input class="field" ${nm} type="${t==='date'?'date':'text'}" ${t==='num'||t==='eur'?'inputmode="decimal"':''} value="${i(t==='eur'&&val?(val/100).toLocaleString(he()):val||'')}" autocomplete="off">`};
 return`<div class="screen dhome vnx vnxf">${bsvHdr(d.id?vnxt('k_'+k):vnxt('aAdd',{k:vnxt('k_'+k)}),'bsvback')}
 <div class="vnxkpick">${VNX_A.map(([kk])=>`<button type="button" class="${kk===k?'on':''}" data-act="vnxfk" data-k="${kk}">${vnxIc(kk,'s')}<span>${i(vnxt('k_'+kk))}</span></button>`).join('')}</div>
 <label class="bsvl">${i(vnxt('f_name'))}</label><input class="field" data-vf="name" value="${i(d.name||'')}" autocomplete="off">
 ${(VNX_F[k]||[]).map(vnxSp).map(f=>fld(f,x[f.k],'x.')).join('')}
 <label class="bsvl">${i(vnxt('f_value'))}</label><input class="field" data-vf="value" inputmode="decimal" value="${+d.value?(d.value/100).toLocaleString(he()):''}" autocomplete="off">
 <label class="bsvl">${i(vnxt('f_cost'))}</label><input class="field" data-vf="cost" inputmode="decimal" value="${+d.cost?(d.cost/100).toLocaleString(he()):''}" autocomplete="off">
 <label class="bsvl">${i(vnxt('f_date'))}</label><input class="field" data-vf="date" type="date" value="${i(d.date||'')}">
 ${(VNX_FIN[k]||[]).map(vnxSp).map(f=>fld(f,x[f.k],'x.')).join('')}
 ${(VNX_DL[k]||[]).length?`<h3 class="odh">${i(vnxt('sDates'))}</h3>${(VNX_DL[k]||[]).map(vnxSp).map(f=>fld(Object.assign(f,{t:'date'}),(d.dl||{})[f.k],'dl.')).join('')}`:''}
 <label class="bsvl">${i(vnxt('f_orig'))}</label><input class="field" data-vf="orig" value="${i(d.orig||'')}" placeholder="${i(vsgt('origPh'))}" autocomplete="off">
 <label class="bsvl">${i(vnxt('f_note'))}</label><textarea class="field" data-vf="note" rows="3">${i(d.note||'')}</textarea>
 <p class="dnnote">${i(vnxt('estHint'))}${k==='kto'?' '+i(vnxt('tresorHint')):''}</p><small class="verr" data-vnxe></small>
 <button type="button" class="dcadd gold" data-act="vnxsave">${i(vnxt('save'))}</button>
 ${d.id?`<button type="button" class="bsvdel${vnxDel?' on':''}" data-act="vnxdel">${i(vnxDel?vnxt('delQ'):vnxt('del'))}</button>`:''}</div>`}
function vnxRead(){const d=vnxEd;document.querySelectorAll('.vnxf [data-vf]').forEach(el=>{const f=el.dataset.vf,val=el.value.trim();
 if(f.startsWith('x.')){d.x=d.x||{};const k=f.slice(2),sp=(VNX_FIN[d.vk]||[]).map(vnxSp).find(z=>z.k===k);d.x[k]=sp&&sp.t==='eur'?(aa(val)||0):val;if(!d.x[k])delete d.x[k]}
 else if(f.startsWith('dl.')){d.dl=d.dl||{};const k=f.slice(3);if(val)d.dl[k]=val;else delete d.dl[k]}
 else if(f==='value'||f==='cost')d[f]=aa(val)||0;else d[f]=val})}
const VNX_TYPE={immo:'property',bet:'business',kto:'deposit',wert:'valuable',fz:'other',son:'other'};
function vnxSave(){vnxRead();const d=vnxEd;if(!d.name){const e=document.querySelector('[data-vnxe]');if(e)e.textContent=vnxt('need');return}
 const A=U().assets;let a=d.id&&A.find(z=>z.id===d.id);
 if(!a){a={id:V(),cur:U().cur,source:'',type:VNX_TYPE[d.vk]||'other'};A.push(a)}
 const keepType=a.type&&vnxCat(Object.assign({},a,{vk:''}))===d.vk;
 Object.assign(a,{name:d.name,vk:d.vk,x:d.x||{},value:d.value||0,cost:d.cost||0,date:d.date||'',orig:d.orig||'',note:d.note||'',dl:d.dl||{},approx:!0,docs:a.docs||[],vtr:a.vtr||[]});if(!keepType)a.type=VNX_TYPE[d.vk]||'other';
 vnxCal(a);$();vnxSelA=a.id;const h=m.hist||[];while(h.length&&h[h.length-1].route==='vnxf')h.pop();R('vnxd',void 0,!0);T(vnxt('saved'))}
/* dates of a thing → calendar events (one per date, updated in place) */
function vnxCal(a){try{g.events=Array.isArray(g.events)?g.events:[];const k=vnxCat(a),F=(VNX_DL[k]||[]).map(vnxSp),dl=a.dl||{};
 g.events=g.events.filter(e=>!(e.vnx&&e.vnx.startsWith(a.id+':')&&!dl[e.vnx.split(':')[1]]));
 F.forEach(f=>{if(!dl[f.k])return;const key=a.id+':'+f.k,t=vnxt(f.l)+' – '+a.name;const e=g.events.find(z=>z.vnx===key);if(e){e.date=dl[f.k];e.title=t}else g.events.push({id:V(),title:t,date:dl[f.k],type:'event',note:'',vnx:key,at:Date.now()})})}catch(e){Hooks.err('vnxcal',e)}}
try{const _dl=stDlAll;stDlAll=function(){const L2=_dl.apply(this,arguments);try{const td=new Date().toISOString().slice(0,10);vnxAs().forEach(a=>{const k=vnxCat(a);(VNX_DL[k]||[]).map(vnxSp).forEach(f=>{const d=(a.dl||{})[f.k];if(d&&d>=td)L2.push({src:'verm',k:d,t:vnxt(f.l)+' – '+a.name,act:`data-act="vnxa" data-id="${a.id}"`})})});
 const c=vnxD().chk;if(c.next)L2.push({src:'verm',k:c.next,t:vnxt('chkT'),act:'data-act="vnxchk"'})}catch(e){Hooks.err('vnxdl',e)}return L2}}catch(e){Hooks.err('vnxdlw',e)}

/* ---------- linking documents and contracts ---------- */
const vnxWords=s=>String(s||'').toLowerCase().split(/[^a-zа-яёäöüß0-9]+/i).filter(w=>w.length>=4);
function vnxPickDocs(sel,hint,done){let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del).sort((a,b)=>(b.ts||0)-(a.ts||0))}catch{}
 const W=vnxWords(hint),fit=d=>W.some(w=>String(d.title||'').toLowerCase().includes(w));D.sort((a,b)=>fit(b)-fit(a));
 H(vnxt('docAdd'),`<div class="bsvys">${D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}" autocomplete="off"><div class="krdl">${D.slice(0,120).map(d=>`<label class="bsvtog" data-s="${i(String(d.title||'').toLowerCase())}"><input type="checkbox" data-vd="${i(d.id)}" ${sel.includes(d.id)?'checked':''}><span>${i(d.title||'—')}${fit(d)?` <em class="vnxfit">${i(vnxt('sugg'))}</em>`:''}</span></label>`).join('')}</div>`:`<p class="dhnone">${i(vsgt2nodocs())}</p>`}
 <button type="button" class="vaadd" data-vds>${i(vnxt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');const f=el.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();el.querySelectorAll('[data-s]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  el.querySelector('[data-vds]').onclick=()=>{const ids=[...el.querySelectorAll('[data-vd]:checked')].map(c=>c.dataset.vd);el.remove();done(ids)}})}
const vsgt2nodocs=()=>{try{return bsvt2('noDocs')}catch{return'—'}};
Hooks.act('vnxdoc',d=>{const a=vnxGet(d.id);if(!a)return;vnxPickDocs(a.docs||[],a.name+' '+Object.values(a.x||{}).join(' '),ids=>{a.docs=ids;$();bsvRe()})});
Hooks.act('vnxvtr',d=>{const a=vnxGet(d.id);if(!a)return;let C=[];try{C=vaContracts()}catch{}const W=vnxWords(a.name+' '+Object.values(a.x||{}).join(' ')),fit=c=>W.some(w=>(String(c.title||'')+' '+String(c.co||'')).toLowerCase().includes(w));C.sort((p,q)=>fit(q)-fit(p));
 H(vnxt('vtrAdd'),`<div class="bsvys">${C.length?`<div class="krdl">${C.map(c=>`<label class="bsvtog"><input type="checkbox" data-vc="${i(c.id)}" ${(a.vtr||[]).includes(c.id)?'checked':''}><span>${i(c.title||c.co||'—')}${c.co&&c.title?' · '+i(c.co):''}${fit(c)?` <em class="vnxfit">${i(vnxt('sugg'))}</em>`:''}</span></label>`).join('')}</div>`:`<p class="dhnone">${i(vnxt('noVtr'))}</p>`}<button type="button" class="vaadd" data-vcs>${i(vnxt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-vcs]').onclick=()=>{a.vtr=[...el.querySelectorAll('[data-vc]:checked')].map(c=>c.dataset.vc);el.remove();$();bsvRe()}})});
document.addEventListener('change',e=>{const c=e.target.closest&&e.target.closest('[data-vnxnp]');if(!c)return;const a=vnxGet(c.dataset.vnxnp);if(a){a.np=!c.checked;$()}},!0);

/* ---------- instructions ---------- */
let vnxInEd=null,vnxInDel=0;
function vnxInScr(){const o=vnxD();const G=VNX_IC.map(([k,ic,c])=>[k,ic,c,o.ins.filter(x=>x.cat===k)]).filter(z=>z[3].length);
 return`<div class="screen dhome vnx vnxa">${bsvHdr(vnxt('r_an'),'bsvback')}
 <div class="bkxhd">${iknF('list','green')}<div><h3>${i(vnxt('r_an'))}</h3><small>${i(vnxt('r_anS'))}</small></div></div>
 ${G.length?G.map(([k,ic,c,L])=>`<h3 class="odh">${i(vnxt('ic_'+k))}</h3><div class="dhcard odl">${L.map(x=>`<button type="button" class="odr vnxr" data-act="vnxinopen" data-id="${i(x.id)}">${iknF(ic,c,'s')}<span><b>${i(x.t)}${x.conf?' · '+bsvi('lock','sm'):''}</b><small>${i([x.who,vnxt('upd',{d:vnxDate(x.upd||x.ts)}),(x.docs||[]).length?vnxt('sDocs')+': '+x.docs.length:''].filter(Boolean).join(' · '))}</small></span>${dhi('chev','sm')}</button>`).join('')}</div>`).join('')
  :`<div class="dhcard"><p class="dhnone">${i(vnxt('inNone'))}</p></div>`}
 <div class="vnxchips">${VNX_IC.map(([k,ic,c])=>`<button type="button" data-act="vnxinnew" data-k="${k}">${iknF(ic,c,'s')}<span>${i(vnxt('ic_'+k))}</span></button>`).join('')}</div></div>`}
function vnxInForm(){const d=vnxInEd;let D=[];try{D=Ke().items.filter(z=>(d.docs||[]).includes(z.id))}catch{}
 return`<div class="screen dhome vnx vnxif">${bsvHdr(d.id?vnxt('ic_'+d.cat):vnxt('inNew'),'bsvback')}
 <div class="vnxkpick">${VNX_IC.map(([k,ic,c])=>`<button type="button" class="${k===d.cat?'on':''}" data-act="vnxinc" data-k="${k}">${iknF(ic,c,'s')}<span>${i(vnxt('ic_'+k))}</span></button>`).join('')}</div>
 <label class="bsvl">${i(vnxt('inT'))}</label><input class="field" data-if="t" value="${i(d.t||'')}" autocomplete="off">
 <label class="bsvl">${i(vnxt('inTxt'))}</label><textarea class="field" data-if="txt" rows="7">${i(d.txt||'')}</textarea>
 ${d.cat==='dig'?`<p class="dnnote">🔒 ${i(vnxt('inDig'))}</p>`:''}
 <label class="bsvl">${i(vnxt('inWho'))}</label><input class="field" data-if="who" value="${i(d.who||'')}" placeholder="${i(vnxt('inWhoPh'))}" autocomplete="off">
 <label class="bsvl">${i(vnxt('inDocs'))}</label><div class="dhcard odl">${D.map(z=>`<div class="odr vnxr">${iknF('doc','weit','s')}<span><b>${i(z.title||'—')}</b></span></div>`).join('')}<button type="button" class="bsvplus" data-act="vnxindoc">${i(vnxt('inDocAdd'))}</button></div>
 <label class="bsvtog"><input type="checkbox" data-if="conf" ${d.conf?'checked':''}><span>${i(vnxt('inConf'))}</span></label>
 <small class="verr" data-vnie></small><button type="button" class="dcadd gold" data-act="vnxinsave">${i(vnxt('save'))}</button>
 ${d.id?`<button type="button" class="bsvdel${vnxInDel?' on':''}" data-act="vnxindel">${i(vnxInDel?vnxt('delQ'):vnxt('del'))}</button>`:''}</div>`}
const vnxInRead=()=>{const d=vnxInEd;document.querySelectorAll('.vnxif [data-if]').forEach(el=>{const f=el.dataset.if;d[f]=el.type==='checkbox'?(el.checked?1:0):el.value})};

/* ---------- PDFs: one writer for the passport and the package ---------- */
async function vnxPdfMake(title,blocks,extraDocs){const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=130,W2=FZ_W-ml-110;
 const put=(t,o)=>{o=o||{};const f=`${o.b?'bold ':''}${o.s||24}px Georgia, serif`;x2.font=f;const out=[];String(t).split('\n').forEach(par=>{let line='';for(const w of par.split(/(\s+)/)){if(x2.measureText(line+w).width>W2-(o.x||0)&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line)});
  for(const l of out){if(yy>FZ_H-130){[c,x2]=fzPage();P.push(c);yy=140}x2.font=f;x2.fillStyle=o.c||'#111';x2.fillText(l,ml+(o.x||0),yy);yy+=o.h||34}};
 let me={};try{me=ja()}catch{}put(title,{b:1,s:36,h:52});put([[me.first,me.last].filter(Boolean).join(' '),vnxt('pvAs',{d:vnxDate(Date.now())})].filter(Boolean).join(' · '),{s:22,h:50,c:'#555'});
 for(const b of blocks){if(b.h){yy+=10;put(b.h,{b:1,s:28,h:42,c:'#1d3a2a'})}(b.l||[]).forEach(l=>put(l.t,{s:l.s||22,x:l.x||0,h:l.hh||32,b:l.b,c:l.c}));yy+=8}
 for(const d of extraDocs||[])for(const pg of (d.pages||[])){try{const bs=await ni(pg);if(!bs)continue;const im=new Image();await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src='data:'+(pg.type||'image/jpeg')+';base64,'+bs});
  const[pc,px]=fzPage();P.push(pc);const s=Math.min((FZ_W-120)/im.width,(FZ_H-120)/im.height);px.drawImage(im,(FZ_W-im.width*s)/2,(FZ_H-im.height*s)/2,im.width*s,im.height*s)}catch(e){Hooks.err('vnximg',e)}}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=title.replace(/[\/\\:]/g,'-')+'.pdf',f=new File([blob],name,{type:'application/pdf'});window.__vnxPdf={pages:P.length,size:blob.size,blocks:blocks.length};
 if(window.__vnxNoShare)return;
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
function vnxPassBlocks(vr,cats){const B=[],miss=[];const money=vr!=='ang';
 for(const[k]of VNX_A){if(!cats.includes(k))continue;let L=vnxIn(k).filter(a=>!a.np);if(vr==='vers')L=L.filter(a=>['immo','fz','wert','son'].includes(k));if(!L.length)continue;
  const ls=[];L.forEach(a=>{const x=a.x||{},F=(VNX_F[k]||[]).map(vnxSp);ls.push({t:'• '+a.name+(money&&+a.value?' — '+fzEur(a.value)+' ('+vnxt('approx')+')':''),b:1});
   if(vr!=='kurz'){const det=F.filter(f=>x[f.k]&&(vr!=='ang'||!['sn','vin','kz','owner'].includes(f.k))&&(vr!=='vers'||['sn','herst','art','zert','kz','vin','addr'].includes(f.k))).map(f=>vnxt(f.l)+': '+(f.t==='date'?vnxIsoD(x[f.k]):x[f.k]));
    if(vr==='full'&&+a.cost)det.push(vnxt('f_cost')+': '+fzEur(a.cost));if(vr!=='vers'&&a.date)det.push(vnxt('f_date')+': '+vnxIsoD(a.date));if(det.length)ls.push({t:det.join(' · '),x:24,s:20,hh:28});
    if(vr!=='vers'&&a.orig)ls.push({t:'📍 '+vnxt('f_orig')+': '+a.orig,x:24,s:20,hh:28});
    if(vr==='vers'&&(VNX_DL[k]||[]).some(f=>vnxSp(f).k==='gar')&&(a.dl||{}).gar)ls.push({t:vnxt('f_gar')+': '+vnxIsoD(a.dl.gar),x:24,s:20,hh:28});
    if(['full','not','ang'].includes(vr)){let D=[];try{D=Ke().items.filter(d=>(a.docs||[]).includes(d.id))}catch{}if(D.length)ls.push({t:vnxt('sDocs')+': '+D.map(d=>d.title).join(', '),x:24,s:20,hh:28})}
    if(vr==='full'){let C=[];try{C=vaContracts().filter(c=>(a.vtr||[]).includes(c.id))}catch{}if(C.length)ls.push({t:vnxt('sVtr')+': '+C.map(c=>c.title||c.co).join(', '),x:24,s:20,hh:28})}}
   const M=vnxMiss(a).filter(z=>money||z!==vnxt('miss_val'));if(M.length)miss.push(a.name+': '+M.join(', '))});
  B.push({h:vnxt('k_'+k)+(money?' — '+fzEur(vnxSum(L)):''),l:ls})}
 if(money&&vr!=='ang'){const all=vnxAs().filter(a=>cats.includes(vnxCat(a))&&!a.np);B.unshift({h:vnxt('total'),l:[{t:fzEur(vnxSum(all))+' ('+vnxt('approx')+')',b:1}]})}
 if(['full','not'].includes(vr)&&miss.length)B.push({h:vnxt('pvMiss'),l:miss.map(t=>({t:'• '+t,s:20,hh:28,c:'#8a2a20'}))});
 B.push({l:[{t:vnxt('pvNote'),s:18,c:'#666'}]});return B}
Hooks.act('vnxpass',()=>{let vr='full';const cats=VNX_A.map(c=>c[0]).filter(k=>vnxIn(k).length);
 H(vnxt('pass'),`<div class="bsvys"><div class="dhcard odl">${['full','kurz','not','vers','ang'].map(k=>`<button type="button" class="odr vnxr vnxvar${k==='full'?' on':''}" data-vv="${k}"><span><b>${i(vnxt('pv_'+k))}</b><small>${i(vnxt('pvS_'+k))}</small></span><i class="vnxdot"></i></button>`).join('')}</div>
 <label class="bsvl">${i(vnxt('pvCats'))}</label>${VNX_A.map(([k])=>`<label class="bsvtog"><input type="checkbox" data-vk="${k}" ${cats.includes(k)?'checked':''}><span>${i(vnxt('k_'+k))} (${vnxIn(k).length})</span></label>`).join('')}
 <p class="dnnote">${i(vnxt('noPw'))}</p><button type="button" class="dcadd gold" data-vgo>${i(vnxt('pvGo'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',async e=>{const b=e.target.closest('[data-vv]');if(b){vr=b.dataset.vv;el.querySelectorAll('[data-vv]').forEach(z=>z.classList.toggle('on',z===b));return}
  if(e.target.closest('[data-vgo]')){const cs=[...el.querySelectorAll('[data-vk]:checked')].map(c=>c.dataset.vk);el.remove();T(vnxt('pvBusy'));try{await vnxPdfMake(vnxt('pass').replace(/\s*\(PDF\)/,'')+' – '+vnxt('pv_'+vr),vnxPassBlocks(vr,cs))}catch(er){Hooks.err('vnxpass',er)}}})})});
Hooks.act('aspass',()=>vnxRunAct('vnxpass'),{replace:1});
function vnxRunAct(a){const b=document.createElement('button');b.type='button';b.dataset.act=a;b.hidden=!0;(document.querySelector('.screen')||document.body).appendChild(b);b.click();b.remove()}

/* package for the event of death: choose → check what is missing → PDF */
function vnxPkBlocks(S,conf){const B=[],o=vnxD();
 if(S.vf){const ls=[];VNX_V.forEach(([k])=>{const L=vnxVDocs(k),vo=(()=>{try{return vsgD()[k]}catch{return{}}})();if(!L.length&&!o.need[k])return;ls.push({t:vnxVName(k)+' — '+(L.length?vnxt('there'):vnxt('missing')),b:1,c:L.length?'#1d3a2a':'#8a2a20'});
  L.forEach(d=>ls.push({t:'• '+(d.title||'—'),x:24,s:20,hh:28}));if(vo.orig)ls.push({t:'📍 '+vsgt('origS',{o:vo.orig}),x:24,s:20,hh:28});if(vo.who)ls.push({t:'👤 '+vo.who,x:24,s:20,hh:28})});B.push({h:vnxt('pk_vf'),l:ls})}
 if(S.an){const L=o.ins.filter(x=>conf||!x.conf);if(L.length)B.push({h:vnxt('pk_an'),l:L.flatMap(x=>[{t:vnxt('ic_'+x.cat)+': '+x.t,b:1},{t:x.txt||'',x:24,s:20,hh:28},...(x.who?[{t:'👤 '+x.who,x:24,s:20,hh:28}]:[])])})}
 if(S.vm){const A=vnxAs().filter(a=>!a.np);if(A.length)B.push({h:vnxt('pk_vm'),l:A.map(a=>({t:'• '+vnxt('k_'+vnxCat(a))+': '+a.name+(a.orig?' — 📍 '+a.orig:'')}))})}
 if(S.vt){let C=[];try{C=vaContracts()}catch{}if(C.length)B.push({h:vnxt('pk_vt'),l:C.map(c=>({t:'• '+[c.title,c.co].filter(Boolean).join(' · ')}))})}
 if(S.bh){let I=[];try{I=bsvD().items}catch{}if(I.length)B.push({h:vnxt('pk_bh'),l:I.map(it=>({t:'• '+it.n+(it.tel?' · '+it.tel:'')}))})}
 B.push({l:[{t:dnt('note'),s:18,c:'#666'}]});return B}
function vnxPkMiss(){const o=vnxD(),M=[];VNX_V.forEach(([k])=>{if(o.need[k]&&!vnxVDocs(k).length)M.push(vnxVName(k)+': '+vnxt('missing'));const vo=(()=>{try{return vsgD()[k]}catch{return{}}})();if(vnxVDocs(k).length&&!vo.orig)M.push(vnxVName(k)+': '+vnxt('miss_orig'))});
 if(!o.ins.length)M.push(vnxt('r_an')+': 0');vnxAs().forEach(a=>{if(!a.orig&&!(a.docs||[]).length)M.push(a.name+': '+vnxt('miss_docs'))});return M}
Hooks.act('vnxpk',()=>{const S={vf:1,an:1,vm:1,vt:1,bh:0};
 H(vnxt('r_pk'),`<div class="bsvys"><p class="dnnote">${i(vnxt('pkS'))}</p><label class="bsvl">${i(vnxt('pk'))}</label>
 ${['vf','an','vm','vt','bh'].map(k=>`<label class="bsvtog"><input type="checkbox" data-pk="${k}" ${S[k]?'checked':''}><span>${i(vnxt('pk_'+k))}</span></label>`).join('')}
 <label class="bsvtog"><input type="checkbox" data-pkc><span>${i(vnxt('pk_cf'))}</span></label><label class="bsvtog"><input type="checkbox" data-pkd checked><span>${i(vnxt('pkDocs'))}</span></label>
 <div class="dhcard vnxpkm"><b>${i(vnxt('pkChk'))}</b>${(()=>{const M=vnxPkMiss();return M.length?M.slice(0,8).map(t=>`<small>⚠ ${i(t)}</small>`).join(''):`<small>✓ ${i(vnxt('pkAllOk'))}</small>`})()}</div>
 <p class="dnnote">${i(vnxt('noPw'))}</p><button type="button" class="dcadd gold" data-pkgo>${i(vnxt('pkGo'))}</button><button type="button" class="bsvplus" data-pkmore>${i(vnxt('pkMore'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-pkmore]').onclick=()=>{el.remove();vnxRunAct('b3pack')};
  el.querySelector('[data-pkgo]').onclick=async()=>{const s={};el.querySelectorAll('[data-pk]').forEach(c=>s[c.dataset.pk]=c.checked?1:0);const conf=el.querySelector('[data-pkc]').checked,docs=el.querySelector('[data-pkd]').checked;el.remove();T(vnxt('pvBusy'));
   try{const D=docs&&s.vf?VNX_V.flatMap(([k])=>vnxVDocs(k)):[];await vnxPdfMake(vnxt('pkT'),vnxPkBlocks(s,conf),D)}catch(er){Hooks.err('vnxpk',er)}}})});

/* ---------- small sheets and actions ---------- */
Hooks.act('vnxvadd',()=>H(vnxt('add'),`<div class="dhcard odl">${VNX_V.map(([k,ic,c])=>vnxRow(ic,c,vnxVName(k),vnxVDocs(k).length?vnxt('there'):vnxt('missing'),`data-vk="${k}"`)).join('')}</div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-vk]');if(!b)return;el.remove();try{vsgAdd(b.dataset.vk)}catch(er){Hooks.err('vnxvadd',er)}})}));
Hooks.act('vnxneed',d=>{const o=vnxD(),w=d.w==='a',L=w?VNX_A.map(c=>[c[0],vnxt('k_'+c[0])]):VNX_V.map(c=>[c[0],vnxVName(c[0])]),src=w?o.aneed:o.need;
 H(vnxt('stEdit'),`<div class="bsvys"><p class="dnnote">${i(vnxt('stEditS'))}</p>${L.map(([k,n])=>`<label class="bsvtog"><input type="checkbox" data-nd="${k}" ${src[k]?'checked':''}><span>${i(n)}</span></label>`).join('')}<button type="button" class="dcadd gold" data-nds>${i(vnxt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-nds]').onclick=()=>{el.querySelectorAll('[data-nd]').forEach(c=>src[c.dataset.nd]=c.checked?1:0);el.remove();$();v()}})});
Hooks.act('vnxchk',()=>{const o=vnxD();
 H(vnxt('chkT'),`<div class="bsvys">${['chkQ1','chkQ2','chkQ3','chkQ4'].map(q=>`<label class="bsvtog"><input type="checkbox"><span>${i(vnxt(q))}</span></label>`).join('')}
 <button type="button" class="dcadd gold" data-cok>${i(vnxt('chkOk'))}</button><label class="bsvl">${i(vnxt('chkDate'))}</label><input class="field" type="date" data-cd value="${i(o.chk.next||'')}"><button type="button" class="bsvplus" data-cds>${i(vnxt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');const set=(next,done)=>{if(done)o.chk.last=Date.now();o.chk.next=next;g.tasks=Array.isArray(g.tasks)?g.tasks:[];let tk=g.tasks.find(t=>t.vnxchk&&!t.done);if(tk){tk.due=next}else g.tasks.push({id:V(),t:vnxt('chkTask'),due:next,done:!1,vnxchk:1,ts:Date.now()});$();el.remove();v();T(vnxt('saved'))};
  el.querySelector('[data-cok]').onclick=()=>{const d=new Date();d.setFullYear(d.getFullYear()+1);set(d.toISOString().slice(0,10),1)};
  el.querySelector('[data-cds]').onclick=()=>{const v2=el.querySelector('[data-cd]').value;if(v2)set(v2,0)}})});
Hooks.act('vnxk',d=>{vnxSelK=d.k||'';R('vnxk')});
Hooks.act('vnxa',d=>{vnxSelA=d.id;R('vnxd')});
Hooks.act('vnxnew',d=>{vnxDel=0;vnxEd={vk:d.k||vnxSelK||'immo',x:{},dl:{}};if(m.route!=='vnxk'&&!d.k)vnxEd.vk='immo';R('vnxf')});
Hooks.act('vnxedit',d=>{const a=vnxGet(d.id);if(!a)return;vnxDel=0;vnxEd=JSON.parse(JSON.stringify({id:a.id,vk:vnxCat(a),name:a.name,x:a.x||{},value:a.value,cost:a.cost,date:a.date,orig:a.orig,note:a.note,dl:a.dl||{}}));R('vnxf')});
Hooks.act('vnxfk',d=>{vnxRead();vnxEd.vk=d.k;bsvRe()});
Hooks.act('vnxsave',()=>{try{vnxSave()}catch(e){Hooks.err('vnxsave',e)}});
Hooks.act('vnxdel',()=>{if(!vnxDel){vnxDel=1;bsvRe();return}vnxDel=0;const A=U().assets,j=A.findIndex(a=>a.id===vnxEd.id);if(j>=0){const a=A[j];a.dl={};vnxCal(a);A.splice(j,1)}$();T(bsvt('deleted'));const h=m.hist||[];while(h.length&&['vnxf','vnxd'].includes(h[h.length-1].route))h.pop();R('vnxk',void 0,!0)});
Hooks.act('vnxinnew',d=>{vnxInDel=0;vnxInEd={cat:d.k||'son',t:'',txt:'',who:'',docs:[],conf:d.k==='dig'?1:0};R('vnxif')});
Hooks.act('vnxinopen',d=>{const x=vnxD().ins.find(z=>z.id===d.id);if(!x)return;vnxInDel=0;vnxInEd=JSON.parse(JSON.stringify(x));R('vnxif')});
Hooks.act('vnxinc',d=>{vnxInRead();vnxInEd.cat=d.k;bsvRe()});
Hooks.act('vnxindoc',()=>{vnxInRead();vnxPickDocs(vnxInEd.docs||[],vnxInEd.t,ids=>{vnxInEd.docs=ids;bsvRe()})});
Hooks.act('vnxinsave',()=>{vnxInRead();const d=vnxInEd;if(!String(d.t||'').trim()){const e=document.querySelector('[data-vnie]');if(e)e.textContent=vnxt('need');return}
 const o=vnxD();d.t=d.t.trim();d.upd=Date.now();if(d.id){const j=o.ins.findIndex(z=>z.id===d.id);if(j>=0)o.ins[j]=d}else{d.id=V();d.ts=Date.now();o.ins.push(d)}$();const h=m.hist||[];while(h.length&&h[h.length-1].route==='vnxif')h.pop();R('vnxa',void 0,!0);T(vnxt('saved'))});
Hooks.act('vnxindel',()=>{if(!vnxInDel){vnxInDel=1;bsvRe();return}vnxInDel=0;const o=vnxD();o.ins=o.ins.filter(z=>z.id!==vnxInEd.id);$();const h=m.hist||[];while(h.length&&h[h.length-1].route==='vnxif')h.pop();R('vnxa',void 0,!0)});

/* ---------- Butler AI: plain questions about both tabs ---------- */
Hooks.on('ask',(r,t,lt)=>{try{if(r)return r;const q=String(lt||t||'').toLowerCase();if(!q)return r;const o=vnxD();
 if(/(оригинал|original).*(завещ|testament)|(завещ|testament).*(оригинал|original|где|wo)/.test(q)){let vo={};try{vo=vsgD().test}catch{}return{msg:vo.orig?vnxt('aiOrig',{o:vo.orig}):vnxt('aiOrigNo'),run:()=>R('dvors')}}
 if(/(распоряжен|verfügung|directive).*(нет|не хват|не заполн|fehl|offen|missing)|(какие|welche|which).*(распоряжен|verfügung)/.test(q)){const st=vnxVStat(),M=st.N.filter(z=>!st.ok.includes(z)).map(([k])=>vnxVName(k));return{msg:M.length?vnxt('aiMissV',{l:M.join(', ')}):vnxt('aiAllV'),run:()=>{g.dnach=Object.assign(g.dnach||{},{tab:'v'});R('dnach')}}}
 if(/(указан|anweisung|instruction).*(близк|родств|angehörig|family)|мои указания|meine anweisungen/.test(q))return{msg:vnxt('aiIns',{n:o.ins.length}),run:()=>R('vnxa')};
 if(/(всё|все|mein|my|покажи).*(имуществ|vermögen|assets)|(имуществ|vermögen).*(всё|все|gesamt|alle)/.test(q)){const A=vnxAs(),c=VNX_A.map(([k])=>[k,vnxIn(k).length]).filter(z=>z[1]).map(([k,n])=>vnxt('k_'+k)+' '+n).join(', ');
  return{msg:vnxt('aiAssets',{n:A.length,v:fzEur(vnxSum(A)),c}),run:()=>{g.dnach=Object.assign(g.dnach||{},{tab:'a'});R('dnach')}}}
 if(/(документ|dokument|papiere|unterlagen).*(нет|не хват|fehl|missing)|(всё ли связан|alles verknüpft)/.test(q)){const qw=vnxWords(q);const a=vnxAs().find(z=>vnxWords(z.name).some(w=>qw.some(y=>y.startsWith(w.slice(0,5))||w.startsWith(y.slice(0,5)))))||(/квартир|wohnung|недвиж|immobil|haus|дом/.test(q)?vnxIn('immo')[0]:/машин|авто|auto|fahrzeug/.test(q)?vnxIn('fz')[0]:null);
  if(a){const M=vnxMiss(a);return{msg:M.length?vnxt('aiDocs',{n:a.name,l:M.join(', ')}):vnxt('aiDocsOk',{n:a.name}),run:()=>{vnxSelA=a.id;R('vnxd')}}}}
 if(/(сколько|wie viele|how many).*(машин|авто|fahrzeug|car)/.test(q)){const n=vnxIn('fz').length;return{msg:vnxt('k_fz')+': '+n,run:()=>{vnxSelK='fz';R('vnxk')}}}
 if(/(паспорт имущ|vermögenspass|property passport)/.test(q))return{msg:vnxt('passS'),run:()=>vnxRunAct('vnxpass')};
 return r}catch(e){Hooks.err('vnxask',e);return r}});

/* ---------- routes ---------- */
try{dnScreen=vnxScreen}catch(e){Hooks.err('vnxdn',e)}
['vnxk','vnxd','vnxf','vnxa','vnxif'].forEach(r=>{try{OD_OK.add(r);Te.includes(r)||Te.push(r);AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='vnxk')return vnxKScr();if(m.route==='vnxa')return vnxInScr();
 if(m.route==='vnxd'){const a=vnxGet(vnxSelA);if(!a){setTimeout(()=>R('dnach',void 0,!0),0);return'<div class="screen"></div>'}return vnxCard(a)}
 if(m.route==='vnxf'){if(!vnxEd){setTimeout(()=>R('dnach',void 0,!0),0);return'<div class="screen"></div>'}return vnxForm()}
 if(m.route==='vnxif'){if(!vnxInEd){setTimeout(()=>R('vnxa',void 0,!0),0);return'<div class="screen"></div>'}return vnxInForm()}}catch(e){Hooks.err('vnxscreen',e)}});
Hooks.css('docs-nachlass-plus',`.vnx .bsvhd{display:none}
.vnxtiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:4px 0 12px}.vnxt{background:var(--card,#fff);border:0;border-radius:16px;padding:8px 4px 10px;display:flex;flex-direction:column;align-items:center;gap:3px;color:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05);min-height:104px}
.vnxt b{font-size:12px;font-weight:600;line-height:1.15;text-align:center;hyphens:manual}.vnxt em{font-style:normal;font-weight:700;font-size:13px;min-width:24px;padding:1px 7px;border-radius:12px;background:color-mix(in srgb,var(--muted,#888) 15%,transparent);color:var(--muted)}.vnxt.ok em{background:color-mix(in srgb,var(--green) 15%,transparent);color:var(--green)}
.vnxplus span{font-size:30px;color:var(--green);line-height:1;margin:10px 0 6px}.vnxplus b{color:var(--green)}
.vnxrows{margin-bottom:12px}.vnxr{display:flex!important;align-items:center;gap:12px;width:100%}.vnxr>span{flex:1;display:flex;flex-direction:column;min-width:0}.vnxr small{opacity:.65;font-size:12.5px;white-space:normal}.vnxn{font-style:normal;font-weight:700;font-size:13px;color:var(--green);background:color-mix(in srgb,var(--green) 13%,transparent);padding:2px 9px;border-radius:12px}
.vnxst{display:flex!important;flex-wrap:wrap;align-items:center;gap:10px 14px;width:100%;border:0;text-align:left;color:inherit;margin-bottom:10px}.vnxring{width:64px;height:64px;flex:none;color:var(--ink)}.vnxstt{display:flex;flex-direction:column;flex:1;min-width:140px}.vnxstt small{opacity:.65;font-size:12.5px}
.vnxstl{display:grid;grid-template-columns:18px auto;gap:3px 6px;align-items:center;font-size:12px;flex-basis:100%;grid-template-columns:18px 1fr 18px 1fr;border-top:1px solid var(--line);padding-top:10px}.vnxstl i{width:15px;height:15px;border-radius:50%;border:1.5px solid var(--muted);font-style:normal;font-size:10px;display:grid;place-items:center;color:#fff}.vnxstl i.ok{background:var(--green);border-color:var(--green)}
.vnxchk{display:flex!important;align-items:center;gap:12px;width:100%;border:0;text-align:left;color:inherit;background:color-mix(in srgb,var(--green) 7%,var(--card,#fff))!important}.vnxchk>span{flex:1;display:flex;flex-direction:column}.vnxchk small{opacity:.65;font-size:12.5px}.vnxchk em{font-style:normal;font-weight:700;font-size:13.5px}
.vnxpass{display:flex!important;align-items:center;gap:12px;width:100%;border:0;text-align:left;color:inherit;margin-bottom:10px;background:color-mix(in srgb,var(--green) 7%,var(--card,#fff))!important}.vnxpass>span{flex:1;display:flex;flex-direction:column}.vnxpass small{opacity:.65;font-size:12.5px}
.vnx .bkxall{white-space:nowrap}.vnxtot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}.vnxtot small{opacity:.65}.vnxtot b{font-size:18px}
.vnxmiss{color:#a5562a;font-size:13.5px;margin-bottom:10px}.vnxfit{font-style:normal;font-size:11px;color:var(--green);font-weight:700}
.vnxkpick{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 0 10px}.vnxkpick button{border:1.5px solid transparent;background:var(--card,#fff);border-radius:14px;padding:6px 4px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11.5px;color:inherit}.vnxkpick button.on{border-color:var(--green);font-weight:700}
.vnxchips{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:10px}.vnxchips button{display:flex;align-items:center;gap:8px;border:1.5px dashed color-mix(in srgb,var(--green) 45%,transparent);background:none;border-radius:14px;padding:8px 10px;font-size:13px;color:inherit;text-align:left}
.vnxvar.on{outline:2px solid var(--green);border-radius:12px}.vnxdot{width:16px;height:16px;border-radius:50%;border:2px solid var(--muted)}.vnxvar.on .vnxdot{background:var(--green);border-color:var(--green)}
.vnxpkm{display:flex;flex-direction:column;gap:4px;margin:10px 0}.vnxpkm small{font-size:12.5px}.vnxpt{margin:12px 0}`);
