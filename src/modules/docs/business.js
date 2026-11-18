/* ===== Butler Docs: «Mein Business» (v36) — inside the tile «Arbeit & Business» =====
   No new tile: the old «Arbeit & Karriere» gets a third tab «Mein Business». It is hidden until the user says
   «Ich habe ein eigenes Geschäft» (link on the tab «Arbeitgeber»).
   - Firm card (name, form, Steuernummer, USt-IdNr, Kleinunternehmer § 19 UStG), Puls (open / overdue invoices,
     Steuererklärung, USt-Voranmeldung), quick actions Rechnung · Beleg · Kunde · Unterlagen.
   - Income / expenses / profit per year (simplified EÜR: income counts on the day it was paid, § 11 EStG).
   - Invoice editor (route bzinv): automatic number, date, Leistungsdatum, payment days, positions; the § 19 text is
     set by itself for Kleinunternehmer, otherwise net + USt per rate. «PDF erstellen» saves the PDF ONCE in
     «Dokumente» (re-making it replaces the file of the same document) and opens the share sheet; e-mail goes only
     through the user's own mail. An unpaid invoice becomes a task on its due date.
   - Belege: amount, date, category, photo/file saved once in «Dokumente».
   - Unterlagen der Firma (route bzunt): Gewerbeanmeldung, Steuernummer, Betriebshaftpflicht, Kundenverträge,
     Miete/Büro, Handelsregister/IHK — linked, not copied. Fristen incl. retention 8 years (since 2025, bitte prüfen).
   - «Für den Steuerberater»: CSV list + one PDF (overview, invoices, Beleg pictures).
   General rules only, marked «bitte prüfen» — no tax advice. E-Rechnung format = later step.
   Data: g.bzx={on,firm{},cust[],inv[],exp[],docs[],dk{},tk{},yr} */
const BZX={
 tab:['Мой бизнес','Mein Business','My business'],tEdu3:['Образование','Ausbildung','Education'],
 offer:['💼 У меня есть своё дело','💼 Ich habe ein eigenes Geschäft','💼 I have my own business'],offerS:['Счета, чеки, документы фирмы, сроки — вкладка «Mein Business»','Rechnungen, Belege, Firmenunterlagen, Fristen – Bereich «Mein Business»','Invoices, receipts, firm papers, deadlines – «My business»'],
 firmNone:['Данные фирмы ещё не заполнены','Firmendaten noch nicht eingetragen','Firm data not filled in yet'],firmTap:['Нажмите, чтобы заполнить','Tippen zum Eintragen','Tap to fill in'],
 klein:['Kleinunternehmer § 19 UStG','Kleinunternehmer § 19 UStG','Small business § 19 UStG'],regel:['с НДС (Regelbesteuerung)','Regelbesteuerung (mit USt)','Standard VAT'],
 puls:['ПУЛЬС','PULS','PULSE'],open:['Неоплаченные счета','Offene Rechnungen','Open invoices'],over:['Просрочено с %d дн.','Überfällig seit %d Tagen','Overdue for %d days'],over1:['Просрочено с 1 дня','Überfällig seit 1 Tag','Overdue for 1 day'],
 nopen:['Все счета оплачены','Alle Rechnungen bezahlt','All invoices paid'],est:['Налоговая декларация %y','Steuererklärung %y','Tax return %y'],uva:['USt-Voranmeldung','USt-Voranmeldung','VAT pre-return'],
 qInv:['Счёт','Rechnung','Invoice'],qExp:['Чек','Beleg','Receipt'],qCust:['Клиент','Kunde','Customer'],qDocs:['Документы','Unterlagen','Papers'],
 yr:['%y · доходы и расходы','%y · Einnahmen & Ausgaben','%y · income & expenses'],inc:['Доходы','Einnahmen','Income'],exp:['Расходы','Ausgaben','Expenses'],gew:['Прибыль','Gewinn','Profit'],
 eurS:['Упрощённо: доход считается в день оплаты. Проверьте, пожалуйста.','Vereinfacht: Einnahmen zählen am Tag der Zahlung. Bitte prüfen.','Simplified: income counts on the day it was paid. Please check.'],
 sb:['📎 Для налогового консультанта: список + чеки (PDF/CSV)','📎 Für den Steuerberater: Liste + Belege (PDF/CSV)','📎 For the tax adviser: list + receipts (PDF/CSV)'],
 invs:['Счета %y','Rechnungen %y','Invoices %y'],exps:['Расходы %y','Ausgaben %y','Expenses %y'],noInv:['Счетов пока нет','Noch keine Rechnungen','No invoices yet'],noExp:['Чеков пока нет','Noch keine Belege','No receipts yet'],
 paid:['оплачен','bezahlt','paid'],opn:['открыт','offen','open'],ovd:['просрочен','überfällig','overdue'],storno:['отменён','storniert','cancelled'],
 eRe:['С 2028 года счета фирмам (B2B) должны быть в формате E-Rechnung – Kleinunternehmer освобождены, частных клиентов это не касается. Проверьте, пожалуйста.','Ab 2028 brauchen Rechnungen an Firmen (B2B) ein E-Rechnungsformat – Kleinunternehmer sind ausgenommen, Privatkunden betrifft es nicht. Bitte prüfen.','From 2028 invoices to firms (B2B) need an e-invoice format – small businesses are exempt, private customers are not affected. Please check.'],
 /* firm sheet */
 fT:['Моя фирма','Mein Business','My business'],fN:['Название фирмы','Name der Firma','Business name'],fOwn:['Владелец (полное имя)','Inhaber/in (voller Name)','Owner (full name)'],fForm:['Форма','Rechtsform','Legal form'],
 fAddr:['Адрес','Anschrift','Address'],fStnr:['Steuernummer','Steuernummer','Tax number'],fUst:['USt-IdNr (если есть)','USt-IdNr (falls vorhanden)','VAT ID (if any)'],
 fKlein:['Я Kleinunternehmer (§ 19 UStG, без НДС)','Ich bin Kleinunternehmer (§ 19 UStG, ohne USt)','I am a small business (§ 19 UStG, no VAT)'],fUva:['USt-Voranmeldung','USt-Voranmeldung','VAT pre-return'],uva_:['не нужна','keine','none'],uva_m:['ежемесячно','monatlich','monthly'],uva_q:['ежеквартально','vierteljährlich','quarterly'],
 fSb:['У меня есть налоговый консультант (Steuerberater)','Ich habe einen Steuerberater','I have a tax adviser'],fIban:['IBAN','IBAN','IBAN'],fBank:['Банк','Bank','Bank'],fMail:['E-Mail','E-Mail','E-mail'],fTel:['Телефон','Telefon','Phone'],
 fPre:['Префикс номера счёта','Kürzel der Rechnungsnummer','Invoice number prefix'],fOff:['Скрыть «Mein Business»','«Mein Business» ausblenden','Hide «My business»'],fOffS:['Данные остаются, вкладку можно вернуть на вкладке «Arbeitgeber».','Die Daten bleiben; der Bereich lässt sich unter «Arbeitgeber» wieder einschalten.','Data stays; you can switch it on again under «Employers».'],
 form_eu:['Einzelunternehmen','Einzelunternehmen','Sole trader'],form_fb:['Freiberufler','Freiberufler/in','Freelancer'],form_gbr:['GbR','GbR','GbR'],form_ug:['UG (haftungsbeschränkt)','UG (haftungsbeschränkt)','UG'],form_gmbh:['GmbH','GmbH','GmbH'],form_x:['другая','Sonstige','Other'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],needN:['Укажите название','Bitte einen Namen eintragen','Please enter a name'],
 /* customers */
 cT:['Клиенты','Kunden','Customers'],cNew:['＋ Новый клиент','＋ Neuer Kunde','＋ New customer'],cN:['Имя / фирма','Name / Firma','Name / company'],cAddr:['Адрес','Anschrift','Address'],cMail:['E-Mail','E-Mail','E-mail'],
 cNone:['Клиентов пока нет','Noch keine Kunden','No customers yet'],cInv:['%n счетов','%n Rechnungen','%n invoices'],cUsed:['У клиента есть счета – удалить нельзя','Kunde hat Rechnungen – Löschen nicht möglich','Customer has invoices – cannot delete'],
 /* invoice */
 iNew:['Новый счёт','Neue Rechnung','New invoice'],iCust:['Клиент','Kunde','Customer'],iPick:['— выбрать —','— auswählen —','— choose —'],iNo:['Номер (автоматически)','Nr. (automatisch)','No. (automatic)'],
 iD:['Дата счёта','Rechnungsdatum','Invoice date'],iLd:['Дата услуги / поставки','Leistungsdatum','Date of service'],iDue:['Оплата в течение','Zahlbar innerhalb','Payable within'],days:['%n дней','%n Tagen','%n days'],
 iPos:['Позиции','Positionen','Items'],iT:['Описание','Beschreibung','Description'],iQ:['Кол-во','Menge','Qty'],iU:['Ед.','Einheit','Unit'],iP:['Цена, €','Preis €','Price €'],iR:['НДС','USt','VAT'],
 iAdd:['＋ Позиция','＋ Position','＋ Item'],net:['Нетто','Netto','Net'],vat:['USt %r %','USt %r %','VAT %r %'],tot:['Итого','Gesamt','Total'],
 i19:['Текст ставится сам: «Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.» Обязательные данные (имя, адрес, St.-Nr., дата, номер) берутся из «Mein Business».','Text wird selbst gesetzt: «Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.» Pflichtangaben (Name, Anschrift, St.-Nr., Datum, Nr.) kommen aus «Mein Business».','The text is set by itself: «Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.» Mandatory data (name, address, tax no., date, no.) comes from «My business».'],
 iReg:['Цены указываются нетто, НДС считается сам. Обязательные данные берутся из «Mein Business».','Preise netto eingeben, die USt wird selbst gerechnet. Pflichtangaben kommen aus «Mein Business».','Enter net prices; VAT is calculated. Mandatory data comes from «My business».'],
 iNote:['Примечание на счёте (необязательно)','Hinweis auf der Rechnung (optional)','Note on the invoice (optional)'],iPaid:['Оплачено (дата)','Bezahlt am','Paid on'],iPaidS:['Пусто = ещё не оплачен. Дата оплаты считается доходом этого года.','Leer = noch offen. Das Zahlungsdatum zählt für die Einnahmen des Jahres.','Empty = still open. The payment date counts for the income of that year.'],
 iPdf:['Создать PDF','PDF erstellen','Make PDF'],iMail:['✉ Отправить по e-mail (ваша почта)','✉ Per E-Mail senden (Ihre E-Mail)','✉ Send by e-mail (your mail)'],iSave:['Сохранить','Speichern','Save'],
 iStorno:['Отменить счёт (Storno)','Rechnung stornieren','Cancel invoice'],iStornoS:['Выставленный счёт не удаляют, а отменяют – он остаётся в списке.','Eine geschriebene Rechnung wird nicht gelöscht, sondern storniert – sie bleibt in der Liste.','An issued invoice is not deleted but cancelled – it stays in the list.'],iUnst:['Вернуть счёт','Storno aufheben','Undo cancel'],
 iSaved:['Счёт сохранён','Rechnung gespeichert','Invoice saved'],iPdfOk:['PDF сохранён в «Документах»','PDF in «Dokumente» gespeichert','PDF saved in «Documents»'],
 eCust:['Выберите клиента','Bitte einen Kunden wählen','Please choose a customer'],eItem:['Нужна хотя бы одна позиция с описанием и ценой','Mindestens eine Position mit Beschreibung und Preis','At least one item with description and price'],
 eFirm:['Сначала заполните название, владельца, адрес и Steuernummer фирмы','Bitte zuerst Name, Inhaber/in, Anschrift und Steuernummer der Firma eintragen','Please fill in the firm name, owner, address and tax number first'],eNo:['Такой номер уже есть','Diese Nummer gibt es schon','This number already exists'],
 mSub:['Счёт %n','Rechnung %n','Invoice %n'],mBody:['Здравствуйте,\n\nво вложении счёт %n на сумму %s.\n\nС уважением\n%f','Guten Tag,\n\nanbei erhalten Sie die Rechnung %n über %s.\n\nMit freundlichen Grüßen\n%f','Hello,\n\nplease find attached invoice %n for %s.\n\nKind regards\n%f'],
 mAtt:['PDF скачан – приложите его к письму.','PDF wurde geladen – bitte an die E-Mail anhängen.','PDF downloaded – please attach it to the e-mail.'],
 tPay:['Проверить оплату: %n · %c','Zahlung prüfen: %n · %c','Check payment: %n · %c'],tEst:['Налоговая декларация %y (EÜR) до %d','Steuererklärung %y (EÜR) bis %d','Tax return %y (EÜR) by %d'],
 /* receipts */
 bT:['Чек / расход','Beleg / Ausgabe','Receipt / expense'],bAmt:['Сумма, € (брутто)','Betrag € (brutto)','Amount € (gross)'],bD:['Дата','Datum','Date'],bWhat:['За что','Wofür','What for'],bCat:['Категория','Kategorie','Category'],
 bPic:['Фото или файл чека','Foto oder Datei des Belegs','Photo or file of the receipt'],bCam:['📷 Сканировать','📷 Scannen','📷 Scan'],bFile:['📄 Файл','📄 Datei','📄 File'],bHas:['✓ %n файл(ов) выбрано','✓ %n Datei(en) gewählt','✓ %n file(s) chosen'],bLinked:['✓ сохранён в «Документах»','✓ in «Dokumente» gespeichert','✓ saved in «Documents»'],
 bEAmt:['Укажите сумму','Bitte den Betrag eintragen','Please enter the amount'],bOk:['Чек сохранён','Beleg gespeichert','Receipt saved'],bNoPic:['без фото','ohne Bild','no picture'],
 cat_mat:['Материалы / товар','Material / Waren','Materials / goods'],cat_buero:['Офис','Büro','Office'],cat_soft:['Программы / сервисы','Software / Dienste','Software / services'],cat_fahrt:['Поездки / авто','Fahrt / Auto','Travel / car'],
 cat_tel:['Телефон / интернет','Telefon / Internet','Phone / internet'],cat_vers:['Страховки','Versicherungen','Insurance'],cat_miete:['Аренда','Miete','Rent'],cat_wer:['Реклама','Werbung','Advertising'],cat_x:['Прочее','Sonstiges','Other'],
 /* papers & deadlines */
 uT:['Документы и сроки фирмы','Unterlagen & Fristen','Papers & deadlines'],unt:['Документы','Unterlagen','Papers'],of:['%a из %b','%a von %b','%a of %b'],fr:['Сроки','Fristen','Deadlines'],
 s_gew:['Gewerbeanmeldung','Gewerbeanmeldung','Business registration'],s_stnr:['Steuernummer (Finanzamt)','Steuernummer (Finanzamt)','Tax number (tax office)'],s_bhv:['Betriebshaftpflicht','Betriebshaftpflicht','Business liability insurance'],
 s_kv:['Договоры с клиентами','Verträge mit Kunden','Customer contracts'],s_miete:['Аренда / офис','Miete / Büro','Rent / office'],s_hr:['Handelsregister / IHK','Handelsregister / IHK','Commercial register / IHK'],
 h_gew:['из Gewerbeamt','vom Gewerbeamt','from the trade office'],h_stnr:['анкета + письмо Finanzamt','Fragebogen + Bescheid','questionnaire + letter'],h_bhv:['→ договор также в Finanzen › Kosten','→ Vertrag auch in Finanzen › Kosten','→ contract also in Finance › Costs'],
 h_kv:['договоры, предложения','Verträge, Angebote','contracts, offers'],h_miete:['если есть','falls vorhanden','if any'],h_hr:['если есть','falls vorhanden','if any'],n_docs:['%n док.','%n Dokumente','%n documents'],
 addT:['%s — добавить','%s hinzufügen','Add %s'],once:['Документ сохраняется один раз в «Документах», здесь только ссылка.','Das Dokument wird einmal in «Dokumente» gespeichert und hier nur verknüpft.','The document is saved once in «Documents» and only linked here.'],
 cam:['Сканировать / фото','Scannen / Foto','Scan / photo'],file:['Файл (PDF, фото)','Datei (PDF, Foto)','File (PDF, photo)'],have:['Уже есть в «Документах»','Schon in «Dokumente»','Already in «Documents»'],find:['Поиск …','Suchen …','Search …'],
 noHave:['Других документов нет','Keine weiteren Dokumente','No other documents'],linked:['Связано','Verknüpft','Linked'],saved:['Сохранено','Gespeichert','Saved'],unlink:['убрать отсюда (документ остаётся)','hier entfernen (Dokument bleibt)','remove here (document stays)'],more:['＋ ещё','＋ Weitere','＋ More'],
 frDue:['Счёт %n к оплате','Rechnung %n fällig','Invoice %n due'],frEst:['Налоговая декларация %y (EÜR)','Steuererklärung %y (EÜR)','Tax return %y (EÜR)'],frEstS:['без консультанта','ohne Steuerberater','without tax adviser'],frEstSb:['с консультантом','mit Steuerberater','with tax adviser'],
 frKeep:['Хранить чеки и счета %y','Belege & Rechnungen %y aufbewahren','Keep receipts & invoices %y'],frKeepS:['8 лет (с 2025) – проверьте','8 Jahre (seit 2025) – bitte prüfen','8 years (since 2025) – please check'],bis:['до %d','bis %d','until %d'],frNone:['Открытых сроков нет','Keine offenen Fristen','No open deadlines'],
 frTip:['Общие правила, не налоговая консультация. Проверьте, пожалуйста, у Finanzamt или консультанта.','Allgemeine Regeln, keine Steuerberatung. Bitte beim Finanzamt oder Steuerberater prüfen.','General rules, not tax advice. Please check with the tax office or an adviser.'],
 /* export */
 xT:['Для налогового консультанта','Für den Steuerberater','For the tax adviser'],xYr:['Год','Jahr','Year'],xCnt:['%a счетов · %b чеков','%a Rechnungen · %b Belege','%a invoices · %b receipts'],
 xCsv:['Список (CSV, для Excel)','Liste (CSV, für Excel)','List (CSV, for Excel)'],xPdf:['Всё в одном PDF (обзор, счета, чеки)','Alles in einem PDF (Übersicht, Rechnungen, Belege)','All in one PDF (overview, invoices, receipts)'],
 xS:['Отправляете вы сами – через свою почту или «Поделиться». Чеки, которые есть только как PDF-файл, в общий PDF не попадают – они в «Документах».','Sie senden selbst – über Ihre E-Mail oder «Teilen». Belege, die nur als PDF-Datei vorliegen, kommen nicht ins Gesamt-PDF – sie liegen in «Dokumente».','You send it yourself – by your mail or «Share». Receipts that exist only as a PDF file are not put in the combined PDF – they are in «Documents».'],
 now:['сразу','sofort','immediately'],busy:['Собираю …','Wird erstellt …','Making …'],xOvT:['Обзор %y','Übersicht %y','Overview %y']
};
const bzxT=(k,o)=>{let s=cv5n(BZX[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const BZX_SLOT=[['gew','🏪'],['stnr','🧾'],['bhv','🛡'],['kv','🤝'],['miete','🏢'],['hr','📑']];
const BZX_CAT=['mat','buero','soft','fahrt','tel','vers','miete','wer','x'];
const BZX_FORM=['eu','fb','gbr','ug','gmbh','x'];
function bzxD(){const o=g.bzx=g.bzx&&typeof g.bzx==='object'?g.bzx:{};o.firm=o.firm&&typeof o.firm==='object'?o.firm:{};
 for(const k of['cust','inv','exp','docs'])if(!Array.isArray(o[k]))o[k]=[];o.dk=o.dk&&typeof o.dk==='object'?o.dk:{};o.tk=o.tk&&typeof o.tk==='object'?o.tk:{};
 if(o.firm.klein==null)o.firm.klein=!0;return o}
function bzxOn(){try{return!!(g.bzx&&g.bzx.on)}catch{return!1}}
const bzxToday=()=>x(new Date());
const bzxAdd=(iso,days)=>{const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+days);return x(d)};
const bzxDays=(a,b)=>Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5);
const bzxDe=iso=>{if(!iso)return'';const[y,mo,d]=String(iso).split('-');return`${d}.${mo}.${y}`};
const bzxEur=c=>(Math.round(c||0)/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
const bzxNum=c=>c==null||c===''?'':(Math.round(c)/100).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2});
function bzxParse(s){s=String(s==null?'':s).replace(/[\s€]/g,'');if(!s)return null;if(s.includes(','))s=s.replace(/\./g,'').replace(',','.');const n=parseFloat(s);return isFinite(n)?Math.round(n*100):null}
const bzxQ=s=>{const n=parseFloat(String(s==null?'':s).replace(',','.'));return isFinite(n)?n:0};
const bzxQs=q=>String(q).replace('.',',');
const bzxQuiet=()=>{try{bsvQuiet()}catch{}};
function bzxSave(){bzxQuiet();$()}
const bzxCust=id=>bzxD().cust.find(c=>c.id===id);
const bzxDocs=ids=>{try{return(ids||[]).map(id=>Ke().items.find(d=>d.id===id)).filter(d=>d&&!d.del)}catch{return[]}};
function bzxFolder(){try{const F=Ke().folders||[],nm=f=>{try{return String(Ri(f)||f.name||'')}catch{return String(f.name||'')}};const w=F.find(f=>!f.sp&&/business|firma|gewerbe|geschäft|бизнес|фирм/i.test(nm(f)));return w?w.id:krFolder()}catch{return void 0}}
/* sums of an invoice: net per rate, VAT, gross (cents) */
function bzxSum(v){const kl=v.klein!=null?v.klein:bzxD().firm.klein;let net=0;const R2={};
 for(const it of (v.items||[])){const n=Math.round(bzxQ(it.q)*(it.p||0));net+=n;if(!kl){const r=+it.r||0;R2[r]=(R2[r]||0)+n}}
 const vat=kl?[]:Object.keys(R2).map(Number).filter(r=>r>0).sort((a,b)=>b-a).map(r=>({r,n:R2[r],v:Math.round(R2[r]*r/100)}));
 const tv=vat.reduce((a,z)=>a+z.v,0);return{net,vat,tv,gross:net+tv,kl}}
const bzxSt=v=>v.storno?'st':v.paid?'ok':(v.due&&v.due<bzxToday()?'ov':'op');
function bzxNextNo(y){const f=bzxD().firm,pre=String(f.pre||'RE').trim()||'RE';let n=0;
 for(const v of bzxD().inv){const m2=String(v.no||'').match(/(\d+)\s*$/);if(String(v.d||'').slice(0,4)===String(y)&&m2)n=Math.max(n,+m2[1])}
 return`${pre}-${y}-${String(n+1).padStart(3,'0')}`}
/* Steuererklärung: without adviser 31.07. of the next year, with adviser end of February of the year after (weekend → Monday) */
function bzxWk(iso){const d=new Date(iso+'T12:00:00');while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1);return x(d)}
function bzxEst(){const f=bzxD().firm,td=bzxToday(),Y=+td.slice(0,4);
 const due=y=>f.sb?bzxWk(x(new Date(y+2,2,0,12))):bzxWk(`${y+1}-07-31`);for(const y of[Y-2,Y-1,Y]){const d=due(y);if(d>=td)return{y,d}}return{y:Y,d:due(Y)}}
function bzxUva(){const f=bzxD().firm;if(f.klein||!f.uva)return null;const t=new Date(),y=t.getFullYear(),mo=t.getMonth();
 const nx=(yy,mm)=>bzxWk(x(new Date(yy,mm,10,12)));let d;if(f.uva==='q'){const q=Math.floor(mo/3);d=nx(y,(q+1)*3);if(d<bzxToday())d=nx(y,(q+2)*3)}else{d=nx(y,mo+1)}
 if(f.uva!=='q'){const prev=nx(y,mo);if(prev>=bzxToday())d=prev}return d}
/* tasks: unpaid invoice → «Zahlung prüfen» on its due date; next Steuererklärung 30 days before */
function bzxSync(){try{const B=bzxD();g.tasks=g.tasks||[];const set=(k,on,t,due)=>{let o=B.tk[k]&&g.tasks.find(z=>z.id===B.tk[k]);
  if(on){if(!o){o={id:V(),t:'',due:'',time:'',prio:1,proj:'',done:!1};g.tasks.push(o);B.tk[k]=o.id}if(o.due!==due)o.done=!1;o.t=t;o.due=due}else{if(o&&!o.done)g.tasks=g.tasks.filter(z=>z!==o);else if(o)o.done=!0;delete B.tk[k]}};
 const ids=new Set(B.inv.map(v=>'i'+v.id));for(const k of Object.keys(B.tk))if(k[0]==='i'&&!ids.has(k))set(k,!1);
 for(const v of B.inv){const c=bzxCust(v.cust);set('i'+v.id,!!B.on&&!v.paid&&!v.storno&&!!v.due,bzxT('tPay',{n:v.no,c:c?c.n:''}),v.due||'')}
 const e=bzxEst(),ed=bzxAdd(e.d,-30)<bzxToday()?bzxToday():bzxAdd(e.d,-30);set('est',!!B.on&&!!(B.inv.length||B.exp.length),bzxT('tEst',{y:e.y,d:vA(e.d)}),ed)}catch(er){Hooks.err('bzxsync',er)}}
/* year sums (simplified EÜR) */
function bzxYear(y){const B=bzxD(),ys=String(y);let inc=0,ex=0;
 for(const v of B.inv)if(!v.storno&&v.paid&&String(v.paid).slice(0,4)===ys)inc+=bzxSum(v).gross;
 for(const e of B.exp)if(String(e.d||'').slice(0,4)===ys)ex+=e.amt||0;return{inc,ex,gew:inc-ex}}
const bzxYr=()=>{const B=bzxD();return+B.yr||+bzxToday().slice(0,4)};
const bzxHdr=(t,back)=>`<div class="sub-hdr"><button class="iconbtn" data-act="${back}" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(t)}</h2></div><span></span></div>`;
function bzxOffer(){return bzxOn()?'':`<button type="button" class="dhcard bzoffer" data-act="bzxon"><b>${i(bzxT('offer'))}</b><small>${i(bzxT('offerS'))}</small><em>›</em></button>`}
function bzxHome(){const B=bzxD(),f=B.firm,td=bzxToday(),y=bzxYr(),S=bzxYear(y);
 const O=B.inv.filter(v=>!v.paid&&!v.storno),osum=O.reduce((a,v)=>a+bzxSum(v).gross,0),ov=O.filter(v=>v.due&&v.due<td).sort((a,b)=>a.due.localeCompare(b.due));
 const est=bzxEst(),uva=bzxUva();
 const firm=f.n?`<button type="button" class="dhcard bzfirm" data-act="bzxfirm"><b>${i(f.n)}</b><small>${i([bzxT('form_'+(f.form||'eu')),f.stnr?'St.-Nr. '+f.stnr:'',f.ust?'USt-IdNr '+f.ust:''].filter(Boolean).join(' · '))}</small><span class="bzpill ${f.klein?'':'reg'}">${i(f.klein?bzxT('klein'):bzxT('regel'))}</span></button>`
  :`<button type="button" class="dhcard bzfirm none" data-act="bzxfirm"><b>${i(bzxT('firmNone'))}</b><small>${i(bzxT('firmTap'))} ›</small></button>`;
 const d1=ov.length?bzxDays(ov[0].due,td):0;
 const puls=`<div class="dhcard bzpuls"><h5>● ${i(bzxT('puls'))}</h5>
  ${O.length?`<div class="bzpl"><span>${i(bzxT('open'))}</span><b>${O.length} · ${i(bzxEur(osum))}</b></div>`:`<div class="bzpl"><span>${i(bzxT('nopen'))}</span><b>✓</b></div>`}
  ${ov.length?`<button type="button" class="bzpl w" data-act="bzxinv" data-id="${i(ov[0].id)}"><span>${i(d1===1?bzxT('over1'):bzxT('over',{d:d1}))}</span><b>${i(ov[0].no)}${ov.length>1?' +'+(ov.length-1):''}</b></button>`:''}
  ${uva?`<div class="bzpl"><span>${i(bzxT('uva'))}</span><b>${i(vA(uva))}</b></div>`:''}
  <div class="bzpl"><span>${i(bzxT('est',{y:est.y}))}</span><b>${i(vA(est.d))}</b></div></div>`;
 const qa=`<div class="bzqa"><button type="button" data-act="bzxinv"><b>🧾</b>${i(bzxT('qInv'))}</button><button type="button" data-act="bzxexp"><b>📷</b>${i(bzxT('qExp'))}</button><button type="button" data-act="bzxcusts"><b>👤</b>${i(bzxT('qCust'))}</button><button type="button" data-act="bzxunt"><b>📁</b>${i(bzxT('qDocs'))}</button></div>`;
 const eur=`<div class="bzyh"><button type="button" class="bzyb" data-act="bzxyr" data-d="-1" aria-label="‹">‹</button><h3 class="odh">${i(bzxT('yr',{y}))}</h3><button type="button" class="bzyb" data-act="bzxyr" data-d="1" aria-label="›" ${y>=+td.slice(0,4)?'disabled':''}>›</button></div>
  <div class="dhcard"><div class="bzeur"><div><small>${i(bzxT('inc'))}</small><b>${i(bzxEur(S.inc))}</b></div><div><small>${i(bzxT('exp'))}</small><b>${i(bzxEur(S.ex))}</b></div><div class="g"><small>${i(bzxT('gew'))}</small><b>${i(bzxEur(S.gew))}</b></div></div><p class="fdsmall">${i(bzxT('eurS'))}</p></div>
  <button type="button" class="fzpdf" data-act="bzxsb">${i(bzxT('sb'))}</button>`;
 const IV=B.inv.filter(v=>String(v.d||'').slice(0,4)===String(y)).sort((a,b)=>String(b.d).localeCompare(String(a.d))||String(b.no).localeCompare(String(a.no)));
 const EX=B.exp.filter(e=>String(e.d||'').slice(0,4)===String(y)).sort((a,b)=>String(b.d).localeCompare(String(a.d)));
 const lab={ok:bzxT('paid'),op:bzxT('opn'),ov:bzxT('ovd'),st:bzxT('storno')};
 const inv=`<h3 class="odh">${i(bzxT('invs',{y}))}</h3>${IV.length?`<div class="dhcard odl">${IV.map(v=>{const c=bzxCust(v.cust),st=bzxSt(v);return`<button type="button" class="odr bzrow ${st}" data-act="bzxinv" data-id="${i(v.id)}"><span><b>${i(v.no)}</b><small>${i([c?c.n:'',vA(v.d),lab[st]].filter(Boolean).join(' · '))}</small></span><em>${i(bzxEur(bzxSum(v).gross))}</em></button>`}).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(bzxT('noInv'))}</p></div>`}`;
 const ex=`<h3 class="odh">${i(bzxT('exps',{y}))}</h3>${EX.length?`<div class="dhcard odl">${EX.map(e=>`<button type="button" class="odr bzrow" data-act="bzxexp" data-id="${i(e.id)}"><span><b>${i(e.t||bzxT('cat_'+(e.cat||'x')))}</b><small>${i([vA(e.d),bzxT('cat_'+(e.cat||'x')),(e.docs||[]).length?'📄':bzxT('bNoPic')].join(' · '))}</small></span><em>${i(bzxEur(e.amt))}</em></button>`).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(bzxT('noExp'))}</p></div>`}`;
 return`<div class="screen dhome fz kar bzx">${bzxHdr(krt('kar'),'fzback')}${krTabs()}${firm}${puls}${qa}${eur}${inv}${ex}
 <div class="fztip"><b>ⓘ E-Rechnung</b> ${i(bzxT('eRe'))}</div></div>`}
/* ---------- firm sheet ---------- */
function bzxFirmSheet(){const B=bzxD(),f=Object.assign({},B.firm);let me={};try{me=ja()||{}}catch{}if(!f.own)f.own=[me.first,me.last].filter(Boolean).join(' ');
 const inp=(k,lab,o)=>`<label class="bsvl">${i(lab)}</label><input class="field" data-ff="${k}" value="${i(f[k]||'')}" autocomplete="off"${o||''}>`;
 H(bzxT('fT'),`<div class="bsvys">${inp('n',bzxT('fN'))}${inp('own',bzxT('fOwn'))}
  <label class="bsvl">${i(bzxT('fForm'))}</label><select class="field" data-ff="form">${BZX_FORM.map(k=>`<option value="${k}" ${(f.form||'eu')===k?'selected':''}>${i(bzxT('form_'+k))}</option>`).join('')}</select>
  <label class="bsvl">${i(bzxT('fAddr'))}</label><textarea class="field" data-ff="addr" rows="2" placeholder="Straße Nr.&#10;PLZ Ort">${i(f.addr||'')}</textarea>
  ${inp('stnr',bzxT('fStnr'),' placeholder="045/123/45678"')}${inp('ust',bzxT('fUst'),' placeholder="DE123456789"')}
  <label class="bzck"><input type="checkbox" data-ff="klein" ${f.klein?'checked':''}><span>${i(bzxT('fKlein'))}</span></label>
  <div class="bzuva" ${f.klein?'hidden':''}><label class="bsvl">${i(bzxT('fUva'))}</label><select class="field" data-ff="uva">${['','m','q'].map(k=>`<option value="${k}" ${(f.uva||'')===k?'selected':''}>${i(bzxT('uva_'+k))}</option>`).join('')}</select></div>
  <label class="bzck"><input type="checkbox" data-ff="sb" ${f.sb?'checked':''}><span>${i(bzxT('fSb'))}</span></label>
  ${inp('iban',bzxT('fIban'),' placeholder="DE00 0000 0000 0000 0000 00"')}${inp('bank',bzxT('fBank'))}
  <div class="bsv2c"><div>${inp('mail',bzxT('fMail'),' type="email" inputmode="email"')}</div><div>${inp('tel',bzxT('fTel'),' type="tel"')}</div></div>
  ${inp('pre',bzxT('fPre'),' placeholder="RE" maxlength="8"')}
  <small class="verr" data-ferr></small><button type="button" class="dcadd gold" data-fsave>${i(bzxT('save'))}</button>
  ${B.on?`<button type="button" class="bsvdel" data-foff>${i(bzxT('fOff'))}</button><p class="fdsmall">${i(bzxT('fOffS'))}</p>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh','bzsh');const kl=sh.querySelector('[data-ff=klein]');kl.onchange=()=>{sh.querySelector('.bzuva').hidden=kl.checked};
  sh.querySelector('[data-fsave]').onclick=()=>{const o={};sh.querySelectorAll('[data-ff]').forEach(z=>{o[z.dataset.ff]=z.type==='checkbox'?z.checked:z.value.trim()});
   if(!o.n){sh.querySelector('[data-ferr]').textContent=bzxT('needN');return}if(o.klein)o.uva='';Object.assign(B.firm,o);B.on=!0;bzxSync();sh.remove();bzxSave();v()};
  const off=sh.querySelector('[data-foff]');off&&(off.onclick=()=>{B.on=!1;krD().tab='job';bzxSync();sh.remove();bzxSave();v()})})}
/* ---------- customers ---------- */
function bzxCustList(){const B=bzxD();
 H(bzxT('cT'),`${B.cust.length?`<div class="dhcard odl">${B.cust.slice().sort((a,b)=>String(a.n).localeCompare(String(b.n))).map(c=>{const n=B.inv.filter(v=>v.cust===c.id).length;return`<button type="button" class="odr bzrow" data-bc="${i(c.id)}"><span><b>${i(c.n)}</b><small>${i([String(c.addr||'').split('\n').pop(),n?bzxT('cInv',{n}):''].filter(Boolean).join(' · '))}</small></span><em>›</em></button>`}).join('')}</div>`:`<p class="dhnone">${i(bzxT('cNone'))}</p>`}
 <button type="button" class="dcadd gold" data-bcn>${i(bzxT('cNew'))}</button>`,
 sh=>{sh.classList.add('bsvsh','bzsh');sh.querySelectorAll('[data-bc]').forEach(b=>b.onclick=()=>{sh.remove();bzxCustSheet(b.dataset.bc)});sh.querySelector('[data-bcn]').onclick=()=>{sh.remove();bzxCustSheet()}})}
function bzxCustSheet(id,after){const B=bzxD(),c0=id&&bzxCust(id),c=c0?Object.assign({},c0):{n:'',addr:'',mail:''};
 H(c0?c0.n:bzxT('cNew').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(bzxT('cN'))}</label><input class="field" data-cf="n" value="${i(c.n)}" autocomplete="off">
  <label class="bsvl">${i(bzxT('cAddr'))}</label><textarea class="field" data-cf="addr" rows="3" placeholder="Straße Nr.&#10;PLZ Ort">${i(c.addr||'')}</textarea>
  <label class="bsvl">${i(bzxT('cMail'))}</label><input class="field" data-cf="mail" type="email" inputmode="email" value="${i(c.mail||'')}" autocomplete="off">
  <small class="verr" data-cerr></small><button type="button" class="dcadd gold" data-csave>${i(bzxT('save'))}</button>${c0?`<button type="button" class="bsvdel" data-cdel>${i(bzxT('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh','bzsh');sh.querySelector('[data-csave]').onclick=()=>{sh.querySelectorAll('[data-cf]').forEach(z=>{c[z.dataset.cf]=z.value.trim()});
   if(!c.n){sh.querySelector('[data-cerr]').textContent=bzxT('needN');return}let o=c0;if(o)Object.assign(o,c);else{o=Object.assign({id:V()},c);B.cust.push(o)}
   sh.remove();bzxSave();if(after)after(o);else v();T(bzxT('saved'))};
  const dl=sh.querySelector('[data-cdel]');dl&&(dl.onclick=()=>{if(B.inv.some(v=>v.cust===c0.id)){sh.querySelector('[data-cerr]').textContent=bzxT('cUsed');return}B.cust=B.cust.filter(z=>z!==c0);sh.remove();bzxSave();v()})})}
/* ---------- invoice editor (route bzinv) ---------- */
let bzxCur=null;
function bzxInvOpen(id){const B=bzxD(),v0=id&&B.inv.find(z=>z.id===id),td=bzxToday();
 bzxCur=v0?JSON.parse(JSON.stringify(v0)):{id:'',no:bzxNextNo(td.slice(0,4)),d:td,ld:td,dd:14,cust:'',items:[{t:'',q:1,u:'',p:null,r:19}],note:'',paid:'',storno:!1};
 if(!bzxCur.items.length)bzxCur.items.push({t:'',q:1,u:'',p:null,r:19});R('bzinv')}
function bzxRead(){const s=document.querySelector('.bzinv');if(!s||!bzxCur)return;
 s.querySelectorAll('[data-bf]').forEach(z=>{const k=z.dataset.bf;bzxCur[k]=k==='dd'?+z.value||0:z.value.trim()});
 s.querySelectorAll('[data-bi]').forEach(z=>{const it=bzxCur.items[+z.dataset.bi];if(!it)return;const k=z.dataset.bk;it[k]=k==='p'?bzxParse(z.value):k==='r'?+z.value:k==='q'?bzxQ(z.value):z.value.trim()});
 bzxCur.klein=!!bzxD().firm.klein;if(bzxCur.d)bzxCur.due=bzxAdd(bzxCur.d,+bzxCur.dd||0)}
function bzxTotHtml(){const S=bzxSum(bzxCur);return S.kl?`<div class="bzsum"><span>${i(bzxT('tot'))}</span><b>${i(bzxEur(S.gross))}</b></div>`
 :`<div class="bzsub"><span>${i(bzxT('net'))}</span><b>${i(bzxEur(S.net))}</b></div>${S.vat.map(z=>`<div class="bzsub"><span>${i(bzxT('vat',{r:z.r}))}</span><b>${i(bzxEur(z.v))}</b></div>`).join('')}<div class="bzsum"><span>${i(bzxT('tot'))}</span><b>${i(bzxEur(S.gross))}</b></div>`}
function bzxInvScreen(){const B=bzxD(),c=bzxCur,kl=B.firm.klein,ex=!!c.id;
 const rows=c.items.map((it,k)=>`<div class="bzpos"><input class="field bzpt" data-bi="${k}" data-bk="t" value="${i(it.t||'')}" placeholder="${i(bzxT('iT'))}" autocomplete="off">
  <div class="bzpr"><label><small>${i(bzxT('iQ'))}</small><input class="field" data-bi="${k}" data-bk="q" inputmode="decimal" value="${i(bzxQs(it.q==null?1:it.q))}"></label><label><small>${i(bzxT('iU'))}</small><input class="field" data-bi="${k}" data-bk="u" value="${i(it.u||'')}" placeholder="Std." autocomplete="off"></label>
  <label><small>${i(bzxT('iP'))}</small><input class="field" data-bi="${k}" data-bk="p" inputmode="decimal" value="${i(bzxNum(it.p))}" placeholder="0,00"></label>${kl?'':`<label><small>${i(bzxT('iR'))}</small><select class="field" data-bi="${k}" data-bk="r">${[19,7,0].map(r=>`<option value="${r}" ${(+it.r||0)===r?'selected':''}>${r} %</option>`).join('')}</select></label>`}
  ${c.items.length>1?`<button type="button" class="bsvsm x" data-act="bzxpdel" data-k="${k}" aria-label="×">×</button>`:''}</div></div>`).join('');
 return`<div class="screen dhome fz bzinv">${bzxHdr(ex?c.no:bzxT('iNew'),'bzxback')}
 <label class="bsvl">${i(bzxT('iCust'))}</label><div class="bzcrow"><select class="field" data-bf="cust"><option value="">${i(bzxT('iPick'))}</option>${B.cust.map(z=>`<option value="${i(z.id)}" ${c.cust===z.id?'selected':''}>${i(z.n)}</option>`).join('')}</select><button type="button" class="bsvplus" data-act="bzxcnew" aria-label="${i(bzxT('cNew'))}">＋</button></div>
 <div class="bsv2c"><div><label class="bsvl">${i(bzxT('iNo'))}</label><input class="field" data-bf="no" value="${i(c.no)}" autocomplete="off"></div><div><label class="bsvl">${i(bzxT('iDue'))}</label><select class="field" data-bf="dd">${[0,7,14,30].map(n=>`<option value="${n}" ${(+c.dd||0)===n?'selected':''}>${i(n?bzxT('days',{n}):bzxT('now'))}</option>`).join('')}</select></div></div>
 <div class="bsv2c"><div><label class="bsvl">${i(bzxT('iD'))}</label><input class="field" type="date" data-bf="d" value="${i(c.d||'')}"></div><div><label class="bsvl">${i(bzxT('iLd'))}</label><input class="field" type="date" data-bf="ld" value="${i(c.ld||'')}"></div></div>
 <label class="bsvl">${i(bzxT('iPos'))}</label>${rows}<button type="button" class="bsvplus" data-act="bzxpadd">${i(bzxT('iAdd'))}</button>
 <div class="bztot">${bzxTotHtml()}</div>
 <div class="bznote">${i(kl?bzxT('i19'):bzxT('iReg'))}</div>
 <label class="bsvl">${i(bzxT('iNote'))}</label><textarea class="field" data-bf="note" rows="2">${i(c.note||'')}</textarea>
 ${ex?`<label class="bsvl">${i(bzxT('iPaid'))}</label><input class="field" type="date" data-bf="paid" value="${i(c.paid||'')}"><p class="fdsmall">${i(bzxT('iPaidS'))}</p>`:''}
 <small class="verr bzerr"></small>
 <button type="button" class="dcadd gold" data-act="bzxpdf">${i(bzxT('iPdf'))}</button><button type="button" class="btn bzbtn" data-act="bzxmail">${i(bzxT('iMail'))}</button><button type="button" class="btn bzbtn" data-act="bzxisave">${i(bzxT('iSave'))}</button>
 ${ex?`<button type="button" class="bsvdel" data-act="bzxstorno">${i(c.storno?bzxT('iUnst'):bzxT('iStorno'))}</button><p class="fdsmall">${i(bzxT('iStornoS'))}</p>`:''}
 <div class="fztip"><b>ⓘ E-Rechnung</b> ${i(bzxT('eRe'))}</div></div>`}
function bzxErr(t){const e=document.querySelector('.bzerr');if(e){e.textContent=t||'';t&&e.scrollIntoView({block:'center',behavior:'smooth'})}}
/* check & store the draft; returns the stored invoice or null */
function bzxCommit(){bzxRead();const B=bzxD(),c=bzxCur,f=B.firm;if(!c)return null;
 if(!f.n||!f.addr||!(f.stnr||f.ust)||(['eu','fb'].includes(f.form||'eu')&&!f.own)){bzxErr(bzxT('eFirm'));return null}if(!c.cust){bzxErr(bzxT('eCust'));return null}
 c.items=c.items.filter(it=>it.t||it.p);if(!c.items.length||!c.items.every(it=>it.t&&it.p!=null)){if(!c.items.length)c.items.push({t:'',q:1,u:'',p:null,r:19});bzxErr(bzxT('eItem'));return null}
 c.no=c.no||bzxNextNo(String(c.d||bzxToday()).slice(0,4));if(B.inv.some(v=>v.no===c.no&&v.id!==c.id)){bzxErr(bzxT('eNo'));return null}
 c.klein=!!f.klein;c.due=bzxAdd(c.d,+c.dd||0);let o=c.id&&B.inv.find(v=>v.id===c.id);
 if(o)Object.assign(o,JSON.parse(JSON.stringify(c)));else{c.id=V();o=JSON.parse(JSON.stringify(c));B.inv.push(o)}bzxErr('');bzxSync();bzxSave();return o}
/* ---------- invoice PDF ---------- */
function bzxInvPages(v){const B=bzxD(),f=B.firm,c=bzxCust(v.cust)||{n:'',addr:''},S=bzxSum(v),P=[];let[cv,x2]=fzPage();P.push(cv);
 const ml=110,mr=FZ_W-110,F=(s,b)=>`${b?'bold ':''}${s}px Helvetica, Arial, sans-serif`;
 const tx=(t,xx,yy,o)=>{o=o||{};x2.font=F(o.s||22,o.b);x2.fillStyle=o.c||'#111';x2.textAlign=o.a||'left';x2.fillText(String(t),xx,yy);x2.textAlign='left'};
 const wrap=(t,w,s)=>{x2.font=F(s);const out=[];for(const para of String(t||'').split('\n')){let line='';for(const wd of para.split(/(\s+)/)){if(x2.measureText(line+wd).width>w&&line.trim()){out.push(line);line=wd.trimStart()}else line+=wd}out.push(line)}return out};
 const fl=String(f.addr||'').split('\n').map(z=>z.trim()).filter(Boolean);
 tx(f.n,mr,100,{s:30,b:1,a:'right'});let yy=142;for(const l of[f.own&&f.own!==f.n?'Inh. '+f.own:'',...fl,f.tel?'Tel. '+f.tel:'',f.mail||''].filter(Boolean)){tx(l,mr,yy,{s:19,c:'#444',a:'right'});yy+=26}
 tx([f.n,...fl].join(' · '),ml,300,{s:15,c:'#777'});x2.fillStyle='#bbb';x2.fillRect(ml,322,560,1);
 yy=338;for(const l of[c.n,...String(c.addr||'').split('\n').map(z=>z.trim()).filter(Boolean)]){tx(l,ml,yy,{s:24});yy+=32}
 tx(v.storno?'Rechnung (storniert)':'Rechnung',ml,560,{s:44,b:1});
 const meta=[['Rechnungsnummer',v.no],['Rechnungsdatum',bzxDe(v.d)],['Leistungsdatum',bzxDe(v.ld||v.d)],f.ust?['USt-IdNr.',f.ust]:['Steuernummer',f.stnr]];
 if(f.ust&&f.stnr)meta.push(['Steuernummer',f.stnr]);yy=560;for(const[a,b]of meta){tx(a,mr-260,yy+6,{s:18,c:'#666',a:'right'});tx(b,mr,yy+6,{s:19,b:1,a:'right'});yy+=30}
 yy=Math.max(yy,640)+50;const cP=ml,cT=ml+60,cQ=mr-430,cE=mr-180,cB=mr,wT=cQ-cT-110;
 const head=()=>{x2.fillStyle='#f1efe8';x2.fillRect(ml-10,yy-6,mr-ml+20,40);tx('Pos.',cP,yy+2,{s:17,b:1});tx('Beschreibung',cT,yy+2,{s:17,b:1});tx('Menge',cQ,yy+2,{s:17,b:1,a:'right'});tx(S.kl?'Einzelpreis':'Einzelpreis netto',cE,yy+2,{s:17,b:1,a:'right'});tx(S.kl?'Betrag':'Betrag netto',cB,yy+2,{s:17,b:1,a:'right'});yy+=52};
 head();v.items.forEach((it,k)=>{const L2=wrap(it.t,wT,20),h=L2.length*28+14;if(yy+h>FZ_H-330){[cv,x2]=fzPage();P.push(cv);yy=120;head()}
  tx(k+1,cP,yy,{s:20});L2.forEach((l,j)=>tx(l,cT,yy+j*28,{s:20}));tx(`${bzxQs(bzxQ(it.q))}${it.u?' '+it.u:''}`,cQ,yy,{s:20,a:'right'});tx(bzxEur(it.p),cE,yy,{s:20,a:'right'});
  tx(bzxEur(Math.round(bzxQ(it.q)*(it.p||0))),cB,yy,{s:20,a:'right'});if(!S.kl)tx(`USt ${+it.r||0} %`,cT,yy+L2.length*28,{s:15,c:'#777'});yy+=h+(S.kl?0:20);x2.fillStyle='#e3e0d6';x2.fillRect(ml,yy-8,mr-ml,1)});
 if(yy>FZ_H-420){[cv,x2]=fzPage();P.push(cv);yy=120}yy+=14;
 if(!S.kl){tx('Summe netto',cE,yy,{s:20,a:'right'});tx(bzxEur(S.net),cB,yy,{s:20,a:'right'});yy+=32;for(const z of S.vat){tx(`zzgl. USt ${z.r} %`,cE,yy,{s:20,a:'right'});tx(bzxEur(z.v),cB,yy,{s:20,a:'right'});yy+=32}}
 x2.fillStyle='#111';x2.fillRect(cE-220,yy,cB-cE+220,2);yy+=12;tx(S.kl?'Gesamtbetrag':'Gesamtbetrag brutto',cE,yy,{s:24,b:1,a:'right'});tx(bzxEur(S.gross),cB,yy,{s:24,b:1,a:'right'});yy+=64;
 const para=(t,o)=>{o=Object.assign({s:20},o||{});for(const l of wrap(t,mr-ml,o.s)){tx(l,ml,yy,o);yy+=o.h||29}yy+=10};
 if(S.kl)para('Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.');
 if(S.vat.length===0&&!S.kl&&S.net>0)para('Steuerfreie Leistung.');
 if(v.note)para(v.note);
 if(!v.storno)para(v.paid?`Betrag erhalten am ${bzxDe(v.paid)}. Vielen Dank!`:(+v.dd?`Bitte überweisen Sie den Betrag bis zum ${bzxDe(v.due)} ohne Abzug`:'Zahlbar sofort ohne Abzug')+(f.iban?` auf das Konto IBAN ${f.iban}${f.bank?' ('+f.bank+')':''}`:'')+`. Verwendungszweck: ${v.no}.`);
 if(!v.paid&&!v.storno)para('Vielen Dank für Ihren Auftrag!');
 P.forEach((pc,k)=>{const cx=pc.getContext('2d');cx.fillStyle='#ccc';cx.fillRect(ml,FZ_H-120,mr-ml,1);cx.font=F(15);cx.fillStyle='#777';cx.textAlign='left';
  cx.fillText([f.own&&f.own!==f.n?f.n+' · Inh. '+f.own:f.n,f.stnr?'St.-Nr. '+f.stnr:'',f.ust?'USt-IdNr. '+f.ust:'',f.iban?'IBAN '+f.iban:''].filter(Boolean).join('  ·  '),ml,FZ_H-104);
  if(P.length>1){cx.textAlign='right';cx.fillText(`Seite ${k+1} von ${P.length}`,mr,FZ_H-104)}cx.textAlign='left'});
 return P}
const bzxFile=v=>{const P=bzxInvPages(v),blob=new Blob([Kn(P)],{type:'application/pdf'}),name=`Rechnung ${v.no}.pdf`.replace(/[\/\\:]/g,'-');return{blob,name,file:new File([blob],name,{type:'application/pdf'}),pages:P.length}};
/* the PDF is kept ONCE in «Dokumente»: a new version replaces the file of the same document */
async function bzxStore(v){const B=bzxD(),R0=bzxFile(v),c=bzxCust(v.cust);let n=null;try{n=v.docId&&Ke().items.find(d=>d.id===v.docId&&!d.del)}catch{}
 if(!n){n=gt({id:V(),title:'',kind:'other',party:'',start:'',end:'',notice:'',note:'',files:[],pages:[],ts:Date.now()});n.folder=bzxFolder();Ke().items.push(n);v.docId=n.id}
 n.title=`Rechnung ${v.no}${c?' · '+c.n:''}`.slice(0,100);n.party=c?c.n:'';n.date=v.d;n.files=[];bzxQuiet();$();await Cr(n,R0.file);n.ts=Date.now();
 const o=B.inv.find(z=>z.id===v.id);if(o)o.docId=n.id;bzxSave();window.__bzxLast={name:R0.name,size:R0.blob.size,pages:R0.pages,doc:n.id};return R0}
function bzxDl(R0){try{xu({blob:R0.blob,name:R0.name})}catch{const u=URL.createObjectURL(R0.blob),a=document.createElement('a');a.href=u;a.download=R0.name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
async function bzxShare(R0,txt){try{if(navigator.canShare&&navigator.canShare({files:[R0.file]})){await navigator.share(Object.assign({files:[R0.file],title:R0.name},txt?{text:txt}:{}));return'share'}}catch(e){if(e&&e.name==='AbortError')return'abort'}
 try{await xu({blob:R0.blob,name:R0.name})}catch{const u=URL.createObjectURL(R0.blob),a=document.createElement('a');a.href=u;a.download=R0.name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}return'dl'}
const bzxSign=()=>{const f=bzxD().firm;return[f.own,f.n].filter(Boolean).filter((z,k,A)=>A.indexOf(z)===k).join('\n')};
/* ---------- receipts ---------- */
function bzxExpSheet(id,dr){const B=bzxD(),e0=id&&B.exp.find(z=>z.id===id),e=dr?dr.e:e0?Object.assign({},e0):{amt:null,d:bzxToday(),t:'',cat:'mat',docs:[]};let files=dr?dr.files:[];
 const D=e0?bzxDocs(e0.docs):[];
 H(e0?(e0.t||bzxT('bT')):bzxT('bT'),`<div class="bsvys"><div class="bsv2c"><div><label class="bsvl">${i(bzxT('bAmt'))}</label><input class="field" data-ef="amt" inputmode="decimal" placeholder="0,00" value="${i(bzxNum(e.amt))}"></div><div><label class="bsvl">${i(bzxT('bD'))}</label><input class="field" type="date" data-ef="d" value="${i(e.d||'')}"></div></div>
  <label class="bsvl">${i(bzxT('bWhat'))}</label><input class="field" data-ef="t" value="${i(e.t||'')}" autocomplete="off">
  <label class="bsvl">${i(bzxT('bCat'))}</label><select class="field" data-ef="cat">${BZX_CAT.map(k=>`<option value="${k}" ${e.cat===k?'selected':''}>${i(bzxT('cat_'+k))}</option>`).join('')}</select>
  <label class="bsvl">${i(bzxT('bPic'))}</label>${D.length?`<div class="dhcard odl">${D.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i(bzxT('bLinked'))}</small></span></button></div>`).join('')}</div>`:''}
  <div class="bzpick"><button type="button" class="btn" data-ep="cam">${i(bzxT('bCam'))}</button><button type="button" class="btn" data-ep="file">${i(bzxT('bFile'))}</button></div><small class="fdsmall" data-ehas></small>
  <small class="verr" data-eerr></small><button type="button" class="dcadd gold" data-esave>${i(bzxT('save'))}</button>${e0?`<button type="button" class="bsvdel" data-edel>${i(bzxT('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh','bzsh');const has=()=>{sh.querySelector('[data-ehas]').textContent=files.length?bzxT('bHas',{n:files.length}):''};
  has();const rd=()=>sh.querySelectorAll('[data-ef]').forEach(z=>{const k=z.dataset.ef;e[k]=k==='amt'?bzxParse(z.value):z.value.trim()});
  sh.querySelector('[data-ep=cam]').onclick=()=>{rd();sh.remove();try{scOpen({multi:!0,saveLabel:bzxT('save'),done:fs=>bzxExpSheet(id,{e,files:files.concat(fs||[])})})}catch(er){Hooks.err('bzxscan',er)}};
  sh.querySelector('[data-ep=file]').onclick=()=>{const f=document.createElement('input');f.type='file';f.multiple=!0;f.accept='image/*,application/pdf';f.onchange=()=>{files=files.concat([...(f.files||[])]);has()};f.click()};
  sh.querySelector('[data-esave]').onclick=async()=>{rd();
   if(e.amt==null||e.amt<=0){sh.querySelector('[data-eerr]').textContent=bzxT('bEAmt');return}const b=sh.querySelector('[data-esave]');b.disabled=!0;
   let o=e0;if(o)Object.assign(o,e);else{o=Object.assign({id:V()},e);o.docs=[];B.exp.push(o)}
   if(files.length)try{const n=await krNewDoc(files,`Beleg ${vA(o.d)}${o.t?' · '+o.t:''}`,'');n.folder=bzxFolder();o.docs=(o.docs||[]).concat(n.id)}catch(er){Hooks.err('bzxbeleg',er)}
   sh.remove();bzxSave();v();T(bzxT('bOk'))};
  const dl=sh.querySelector('[data-edel]');dl&&(dl.onclick=()=>{B.exp=B.exp.filter(z=>z!==e0);sh.remove();bzxSave();v()})})}
/* ---------- firm papers & deadlines (route bzunt) ---------- */
function bzxDk(){const B=bzxD();B.docs=B.docs.filter(id=>bzxDocs([id]).length);return B.dk}
function bzxFristen(){const B=bzxD(),td=bzxToday(),L2=[],lab={ok:bzxT('paid'),op:bzxT('opn'),ov:bzxT('ovd')};
 for(const v of B.inv.filter(z=>!z.paid&&!z.storno).sort((a,b)=>String(a.due).localeCompare(String(b.due)))){const c=bzxCust(v.cust),st=bzxSt(v);
  L2.push(`<button type="button" class="bzfr ${st}" data-act="bzxinv" data-id="${i(v.id)}"><span><b>${i(bzxT('frDue',{n:v.no}))}</b><small>${i([c?c.n:'',bzxEur(bzxSum(v).gross)].filter(Boolean).join(' · '))}</small></span><em>${i(st==='ov'?lab.ov:vA(v.due))}</em></button>`)}
 const u=bzxUva();if(u)L2.push(`<div class="bzfr"><span><b>${i(bzxT('uva'))}</b><small>${i(bzxT('uva_'+B.firm.uva))}</small></span><em>${i(vA(u))}</em></div>`);
 const e=bzxEst();L2.push(`<div class="bzfr"><span><b>${i(bzxT('frEst',{y:e.y}))}</b><small>${i(B.firm.sb?bzxT('frEstSb'):bzxT('frEstS'))}</small></span><em>${i(vA(e.d))}</em></div>`);
 const ys=[...new Set(B.inv.map(v=>String(v.d||'').slice(0,4)).concat(B.exp.map(z=>String(z.d||'').slice(0,4))).filter(Boolean))].sort();const y0=ys[0]||td.slice(0,4);
 L2.push(`<div class="bzfr"><span><b>${i(bzxT('frKeep',{y:ys.length>1?ys[0]+'–'+ys[ys.length-1]:y0}))}</b><small>${i(bzxT('frKeepS'))}</small></span><em>${i(bzxT('bis',{d:'31.12.'+(+(ys[0]||y0)+8)}))}</em></div>`);
 return L2.join('')}
function bzxUntScreen(){const B=bzxD(),dk=bzxDk(),D=bzxDocs(B.docs),by=k=>D.filter(d=>dk[d.id]===k),filled=BZX_SLOT.filter(([k])=>by(k).length).length;
 return`<div class="screen dhome fz bzunt">${bzxHdr(bzxT('uT'),'bzxback')}
 <h3 class="odh">${i(bzxT('unt'))}</h3><div class="dhcard krslots"><div class="krprog"><span>${i(bzxT('of',{a:filled,b:BZX_SLOT.length}))}</span><div><i style="width:${Math.round(filled/BZX_SLOT.length*100)}%"></i></div></div>
 ${BZX_SLOT.map(([k,em])=>{const L2=by(k);return`<button type="button" class="krslot ${L2.length?'ok':'no'}" data-act="bzxslot" data-k="${k}"><span class="krsi">${em}</span><span class="krst"><b>${i(bzxT('s_'+k))}</b><small>${i(L2.length?(L2.length>1?bzxT('n_docs',{n:L2.length}):(L2[0].date?vA(L2[0].date):L2[0].title||'—')):bzxT('h_'+k))}</small></span><em>${L2.length?'✓'+(L2.length>1?' '+L2.length:''):'＋'}</em></button>`}).join('')}</div>
 <h3 class="odh">${i(bzxT('fr'))}</h3><div class="dhcard odl bzfrl">${bzxFristen()}</div>
 <div class="fztip"><b>ⓘ</b> ${i(bzxT('frTip'))}</div></div>`}
function bzxLink(k,id){const B=bzxD();if(!B.docs.includes(id))B.docs.push(id);B.dk[id]=k;bzxSave()}
function bzxSlot(k){const B=bzxD(),dk=bzxDk(),L2=bzxDocs(B.docs).filter(d=>dk[d.id]===k);if(!L2.length){bzxAddSheet(k);return}
 H(bzxT('s_'+k),`<div class="dhcard odl">${L2.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i(d.date?vA(d.date):'')}</small></span></button><button type="button" class="bsvsm x" data-bu="${i(d.id)}" aria-label="${i(bzxT('unlink'))}">×</button></div>`).join('')}</div>
 <p class="fdsmall">× = ${i(bzxT('unlink'))}</p><button type="button" class="dcadd gold" data-badd>${i(bzxT('more'))}</button>`,
 sh=>{sh.classList.add('bsvsh','bzsh');sh.querySelectorAll('[data-bu]').forEach(b=>b.onclick=()=>{B.docs=B.docs.filter(z=>z!==b.dataset.bu);delete B.dk[b.dataset.bu];sh.remove();bzxSave();v()});
  sh.querySelector('[data-badd]').onclick=()=>{sh.remove();bzxAddSheet(k)}})}
function bzxAddSheet(k){const B=bzxD(),lab=bzxT('s_'+k),ttl=`${lab}${B.firm.n?' '+B.firm.n:''}`;let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del&&!B.docs.includes(d.id)).sort((a,b)=>(b.ts||0)-(a.ts||0))}catch{}
 const done=async files=>{if(!files||!files.length)return;try{const n=await krNewDoc(files,ttl,B.firm.n||'');n.folder=bzxFolder();bzxLink(k,n.id);T(bzxT('saved'));v()}catch(e){Hooks.err('bzxadd',e);T(String(e&&e.message||e))}};
 H(bzxT('addT',{s:lab}),`<p class="fdsmall">${i(bzxT('once'))}</p>
 <button type="button" class="kropt" data-ko="cam"><span>📷</span><span><b>${i(bzxT('cam'))}</b></span></button>
 <button type="button" class="kropt" data-ko="file"><span>📄</span><span><b>${i(bzxT('file'))}</b></span></button>
 <div class="kropt krhave"><span>🗂</span><span><b>${i(bzxT('have'))}</b></span></div>
 ${D.length?`<input class="field krfind" type="search" placeholder="${i(bzxT('find'))}" autocomplete="off"><div class="krhl">${D.slice(0,60).map(d=>`<button type="button" class="krhv" data-kh="${i(d.id)}" data-s="${i([d.title,d.party].filter(Boolean).join(' ').toLowerCase())}"><span>📄 ${i(d.title||'—')}${d.party?` <small>· ${i(d.party)}</small>`:''}</span></button>`).join('')}</div>`:`<p class="dhnone">${i(bzxT('noHave'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');sh.querySelector('[data-ko=cam]').onclick=()=>{sh.remove();try{scOpen({multi:!0,saveLabel:bzxT('save'),done:fs=>done(fs)})}catch(e){Hooks.err('bzxscan2',e)}};
  sh.querySelector('[data-ko=file]').onclick=()=>{const e=document.createElement('input');e.type='file';e.multiple=!0;e.accept='image/*,application/pdf';e.onchange=()=>{sh.remove();done([...(e.files||[])])};e.click()};
  const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-kh]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-kh]').forEach(b=>b.onclick=()=>{bzxLink(k,b.dataset.kh);sh.remove();T(bzxT('linked'));v()})})}
/* ---------- «Für den Steuerberater» ---------- */
function bzxCsv(y){const B=bzxD(),ys=String(y),q=s=>{s=String(s==null?'':s);return/[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s},n=c=>bzxNum(c||0);
 const L2=[['Art','Datum','Nr.','Kunde / Wofür','Kategorie','Netto','USt','Brutto','Bezahlt am','Status','Beleg in Dokumente'].join(';')];
 for(const v of B.inv.filter(z=>String(z.d||'').slice(0,4)===ys||String(z.paid||'').slice(0,4)===ys).sort((a,b)=>String(a.d).localeCompare(String(b.d)))){const S=bzxSum(v),c=bzxCust(v.cust);
  L2.push(['Einnahme',bzxDe(v.d),v.no,c?c.n:'',S.kl?'§ 19 UStG':'Erlöse',n(S.net),n(S.tv),n(S.gross),bzxDe(v.paid),v.storno?'storniert':v.paid?'bezahlt':'offen',v.docId?'ja':'nein'].map(q).join(';'))}
 for(const e of B.exp.filter(z=>String(z.d||'').slice(0,4)===ys).sort((a,b)=>String(a.d).localeCompare(String(b.d))))
  L2.push(['Ausgabe',bzxDe(e.d),'',e.t||'',bzxT('cat_'+(e.cat||'x')),'','',n(e.amt),bzxDe(e.d),'',(e.docs||[]).length?'ja':'nein'].map(q).join(';'));
 const S=bzxYear(y);L2.push('');L2.push(['Summe Einnahmen (bezahlt)','','','','','','',n(S.inc)].map(q).join(';'));L2.push(['Summe Ausgaben','','','','','','',n(S.ex)].map(q).join(';'));L2.push(['Gewinn (vereinfacht)','','','','','','',n(S.gew)].map(q).join(';'));
 return'﻿'+L2.join('\r\n')}
function bzxOvPages(y){const B=bzxD(),f=B.firm,S=bzxYear(y),ys=String(y),P=[];let[c,x2]=fzPage();P.push(c);let yy=110;const ml=110,mr=FZ_W-110;
 const tx=(t,xx,o)=>{o=o||{};if(yy>FZ_H-130){[c,x2]=fzPage();P.push(c);yy=110}x2.font=`${o.b?'bold ':''}${o.s||20}px Helvetica, Arial, sans-serif`;x2.fillStyle=o.c||'#111';x2.textAlign=o.a||'left';x2.fillText(String(t),xx,yy);x2.textAlign='left'};
 tx(`Übersicht ${y} – ${f.n||''}`,ml,{s:34,b:1});yy+=50;tx([f.own,f.stnr?'St.-Nr. '+f.stnr:'',f.ust?'USt-IdNr. '+f.ust:'',f.klein?'Kleinunternehmer § 19 UStG':''].filter(Boolean).join(' · '),ml,{s:19,c:'#555'});yy+=50;
 for(const[a,b]of[['Einnahmen (bezahlt)',S.inc],['Ausgaben',S.ex],['Gewinn (vereinfacht)',S.gew]]){tx(a,ml,{s:24});tx(bzxEur(b),mr,{s:24,b:1,a:'right'});yy+=38}
 yy+=20;tx('Vereinfachte Aufstellung aus Butler Docs – keine Steuerberatung, bitte prüfen.',ml,{s:16,c:'#777'});yy+=50;
 tx('Rechnungen',ml,{s:26,b:1});yy+=40;for(const v of B.inv.filter(z=>String(z.d||'').slice(0,4)===ys||String(z.paid||'').slice(0,4)===ys).sort((a,b)=>String(a.d).localeCompare(String(b.d)))){const cu=bzxCust(v.cust);
  tx(bzxDe(v.d),ml,{s:18});tx(v.no,ml+150,{s:18,b:1});tx(String(cu?cu.n:'').slice(0,38),ml+390,{s:18});tx(v.storno?'storniert':v.paid?'bez. '+bzxDe(v.paid):'offen',mr-200,{s:16,c:'#666',a:'right'});tx(bzxEur(bzxSum(v).gross),mr,{s:18,a:'right'});yy+=30}
 yy+=26;tx('Ausgaben',ml,{s:26,b:1});yy+=40;for(const e of B.exp.filter(z=>String(z.d||'').slice(0,4)===ys).sort((a,b)=>String(a.d).localeCompare(String(b.d)))){
  tx(bzxDe(e.d),ml,{s:18});tx(String(e.t||'').slice(0,40),ml+150,{s:18});tx(bzxT('cat_'+(e.cat||'x')),mr-200,{s:16,c:'#666',a:'right'});tx(bzxEur(e.amt),mr,{s:18,a:'right'});yy+=30}
 return P}
async function bzxSbPdf(y){const B=bzxD(),ys=String(y),P=bzxOvPages(y);
 for(const v of B.inv.filter(z=>String(z.d||'').slice(0,4)===ys&&!z.storno).sort((a,b)=>String(a.d).localeCompare(String(b.d))))P.push(...bzxInvPages(v));
 for(const e of B.exp.filter(z=>String(z.d||'').slice(0,4)===ys))for(const d of bzxDocs(e.docs))for(const pg of (d.pages||[])){try{const b=await ni(pg);if(!b)continue;const im=new Image();
  await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src='data:'+(pg.type||'image/jpeg')+';base64,'+b});const[pc,px]=fzPage();P.push(pc);px.font='18px Helvetica, Arial';px.fillStyle='#555';px.fillText(`Beleg ${bzxDe(e.d)} · ${e.t||''} · ${bzxEur(e.amt)}`,60,40);
  const s=Math.min((FZ_W-120)/im.width,(FZ_H-160)/im.height);px.drawImage(im,(FZ_W-im.width*s)/2,80+(FZ_H-160-im.height*s)/2,im.width*s,im.height*s)}catch(er){Hooks.err('bzxsbimg',er)}}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=`Steuerberater ${y}${B.firm.n?' '+B.firm.n:''}.pdf`.replace(/[\/\\:]/g,'-');window.__bzxSb={pages:P.length,size:blob.size};
 return{blob,name,file:new File([blob],name,{type:'application/pdf'})}}
function bzxSbSheet(){const B=bzxD();let y=bzxYr();const cnt=()=>{const ys=String(y);return bzxT('xCnt',{a:B.inv.filter(z=>String(z.d||'').slice(0,4)===ys).length,b:B.exp.filter(z=>String(z.d||'').slice(0,4)===ys).length})};
 const yrs=[...new Set([+bzxToday().slice(0,4),...B.inv.map(v=>+String(v.d||'').slice(0,4)),...B.exp.map(e=>+String(e.d||'').slice(0,4))].filter(Boolean))].sort((a,b)=>b-a);
 H(bzxT('xT'),`<div class="bsvys"><label class="bsvl">${i(bzxT('xYr'))}</label><select class="field" data-xy>${yrs.map(z=>`<option value="${z}" ${z===y?'selected':''}>${z}</option>`).join('')}</select><p class="fdsmall" data-xc>${i(cnt())}</p>
 <button type="button" class="kropt" data-xo="csv"><span>📊</span><span><b>${i(bzxT('xCsv'))}</b></span></button><button type="button" class="kropt" data-xo="pdf"><span>📎</span><span><b>${i(bzxT('xPdf'))}</b></span></button>
 <p class="fdsmall">${i(bzxT('xS'))}</p><small class="verr" data-xe></small></div>`,
 sh=>{sh.classList.add('bsvsh','bzsh');const ys=sh.querySelector('[data-xy]');ys.onchange=()=>{y=+ys.value;sh.querySelector('[data-xc]').textContent=cnt()};
  sh.querySelector('[data-xo=csv]').onclick=async()=>{const s=bzxCsv(y),blob=new Blob([s],{type:'text/csv'}),name=`Steuerberater ${y}.csv`;window.__bzxCsv=s;await bzxShare({blob,name,file:new File([blob],name,{type:'text/csv'})})};
  sh.querySelector('[data-xo=pdf]').onclick=async()=>{const b=sh.querySelector('[data-xo=pdf] b'),t0=b.textContent;b.textContent=bzxT('busy');try{await bzxShare(await bzxSbPdf(y))}catch(e){Hooks.err('bzxsb',e);sh.querySelector('[data-xe]').textContent=String(e&&e.message||e)}b.textContent=t0}})}
/* ---------- wiring ---------- */
['bzinv','bzunt'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bzinv'){if(!bzxCur){setTimeout(()=>R('kar',void 0,!0),0);return'<div class="screen"></div>'}return bzxInvScreen()}
 if(m.route==='bzunt')return bzxUntScreen()}catch(e){Hooks.err('bzxscreen',e)}});
document.addEventListener('input',e=>{const s=e.target.closest&&e.target.closest('.bzinv');if(!s||!bzxCur)return;bzxRead();const t=s.querySelector('.bztot');if(t)t.innerHTML=bzxTotHtml()});
document.addEventListener('change',e=>{const s=e.target.closest&&e.target.closest('.bzinv');if(!s||!bzxCur)return;bzxRead();const t=s.querySelector('.bztot');if(t)t.innerHTML=bzxTotHtml()});
Hooks.act('bzxon',()=>{const B=bzxD();B.on=!0;krD().tab='biz';bzxSync();bzxSave();v();if(!B.firm.n)setTimeout(bzxFirmSheet,60)});
Hooks.act('bzxfirm',()=>bzxFirmSheet());Hooks.act('bzxcusts',()=>bzxCustList());Hooks.act('bzxexp',d=>bzxExpSheet(d&&d.id));Hooks.act('bzxsb',()=>bzxSbSheet());
Hooks.act('bzxunt',()=>R('bzunt'));Hooks.act('bzxslot',d=>bzxSlot(d.k));
Hooks.act('bzxyr',d=>{const B=bzxD(),Y=+bzxToday().slice(0,4);B.yr=Math.min(Y,bzxYr()+(+d.d||0));if(B.yr===Y)delete B.yr;bzxSave();v()});
Hooks.act('bzxback',()=>{bzxCur=null;const h=m.hist||[];if(h.length&&h[h.length-1].route==='kar')h.pop();R('kar',void 0,!0)});
Hooks.act('bzxinv',d=>bzxInvOpen(d&&d.id));
Hooks.act('bzxpadd',()=>{bzxRead();const last=bzxCur.items[bzxCur.items.length-1];bzxCur.items.push({t:'',q:1,u:'',p:null,r:last?last.r:19});v();setTimeout(()=>{const L2=document.querySelectorAll('.bzinv .bzpt');L2.length&&L2[L2.length-1].focus()},60)});
Hooks.act('bzxpdel',d=>{bzxRead();bzxCur.items.splice(+d.k,1);v()});
Hooks.act('bzxcnew',()=>{bzxRead();bzxCustSheet(null,o=>{bzxCur.cust=o.id;v()})});
Hooks.act('bzxisave',()=>{const o=bzxCommit();if(!o)return;bzxCur=JSON.parse(JSON.stringify(o));T(bzxT('iSaved'));v()});
Hooks.act('bzxpdf',async()=>{const o=bzxCommit();if(!o)return;bzxCur=JSON.parse(JSON.stringify(o));try{const R0=await bzxStore(o);bzxCur.docId=o.docId;T(bzxT('iPdfOk'));v();await bzxShare(R0)}catch(e){Hooks.err('bzxpdf',e);bzxErr(String(e&&e.message||e))}});
Hooks.act('bzxmail',async()=>{const o=bzxCommit();if(!o)return;bzxCur=JSON.parse(JSON.stringify(o));const c=bzxCust(o.cust)||{},S=bzxSum(o),sub=bzxT('mSub',{n:o.no}),body=bzxT('mBody',{n:o.no,s:bzxEur(S.gross),f:bzxSign()});
 try{const R0=await bzxStore(o);v();
  if(navigator.canShare&&navigator.canShare({files:[R0.file]})){try{await navigator.share({files:[R0.file],title:sub,text:body});return}catch(e){if(e&&e.name==='AbortError')return}}
  bzxDl(R0);T(bzxT('mAtt'));window.__bzxMail=`mailto:${encodeURIComponent(c.mail||'')}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  setTimeout(()=>{location.href=window.__bzxMail},400)}catch(e){Hooks.err('bzxmail',e);bzxErr(String(e&&e.message||e))}});
Hooks.act('bzxstorno',()=>{bzxRead();const B=bzxD(),o=B.inv.find(z=>z.id===bzxCur.id);if(!o)return;o.storno=!o.storno;bzxCur.storno=o.storno;bzxSync();bzxSave();v()});
Hooks.css('docs-business',`
.bzoffer{display:grid;grid-template-columns:1fr auto;gap:2px 10px;text-align:left;width:100%;margin-top:14px;border:1px dashed #c9a55e!important}.bzoffer b{font-size:15px}.bzoffer small{grid-column:1;color:var(--muted);font-size:12.5px}.bzoffer em{grid-row:1/3;grid-column:2;align-self:center;font-style:normal;font-size:22px;color:#a8812e}
.krtabs.kr3{grid-template-columns:1fr 1.15fr 1fr}.krtabs.kr3 button{font-size:13px;padding-left:2px;padding-right:2px;line-height:1.15}
.bzfirm{display:block;text-align:left;width:100%}.bzfirm b{display:block;font:700 18px Georgia,serif}.bzfirm small{display:block;color:var(--muted);font-size:12.5px;margin-top:2px}.bzfirm.none b{font:600 15px inherit}
.bzpill{display:inline-block;font-size:11.5px;font-weight:700;border-radius:999px;padding:3px 9px;background:#e3efe2;color:#2f6b3e;margin-top:7px}.bzpill.reg{background:#f3ead6;color:#7a5c1e}
.bzpuls{background:#eef3ea!important;border:1px solid #cfdcc9}.bzpuls h5{margin:0 0 4px;font-size:12px;letter-spacing:.1em;color:#2f6b3e}
.bzpl{display:flex;justify-content:space-between;gap:10px;font-size:14px;padding:5px 0;width:100%;background:none;border:0;color:inherit;text-align:left}.bzpl b{font-weight:700;white-space:nowrap}.bzpl.w b,.bzpl.w span{color:#a86b14}
.bzqa{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}.bzqa button{background:var(--card,#fff);border:0;border-radius:16px;min-height:74px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-size:12px;color:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05)}.bzqa b{font-size:21px;font-weight:400}
.bzyh{display:flex;align-items:center;gap:6px}.bzyh .odh{flex:1;text-align:center;margin:12px 0 6px}.bzyb{background:none;border:0;font-size:22px;color:#a8812e;width:36px;height:36px}.bzyb:disabled{opacity:.25}
.bzeur{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center}.bzeur div{background:rgba(0,0,0,.035);border-radius:12px;padding:8px 2px}.bzeur small{display:block;color:var(--muted);font-size:11.5px}.bzeur b{font-size:14.5px}.bzeur .g b{color:#2f6b3e}
.bzrow{display:flex;align-items:center;gap:10px;width:100%;text-align:left}.bzrow span{flex:1;min-width:0}.bzrow small{display:block;color:var(--muted);font-size:12px}.bzrow em{font-style:normal;font-weight:700;font-size:13.5px;white-space:nowrap}
.bzrow.ok em{color:#2f6b3e}.bzrow.op em{color:#a86b14}.bzrow.ov em{color:#b4442c}.bzrow.st b,.bzrow.st em{text-decoration:line-through;opacity:.55}
.bzinv .bsvl{display:block;margin-top:10px}.bzcrow{display:flex;gap:8px;align-items:center}.bzcrow select{flex:1}.bzcrow .bsvplus{width:46px;flex:none;margin:0}
.bzpos{background:var(--card,#fff);border:1px solid rgba(0,0,0,.09);border-radius:14px;padding:8px;margin:6px 0;position:relative}.bzpr{display:flex;gap:6px;margin-top:6px;align-items:flex-end}.bzpr label{flex:1;min-width:0}.bzpr label small{display:block;font-size:11px;color:var(--muted);margin:0 0 2px 2px}.bzpr .field{padding-left:8px;padding-right:6px}.bzpr .x{flex:none;margin-bottom:6px}
.bztot{margin:10px 2px}.bzsum{display:flex;justify-content:space-between;font-weight:700;font-size:16px;padding:4px 0}.bzsub{display:flex;justify-content:space-between;font-size:14px;color:var(--muted);padding:2px 0}
.bznote{background:#fff8ea;border:1px solid #ecd9ac;border-radius:12px;padding:9px 11px;font-size:12.5px;line-height:1.4;color:#6b5320;margin:8px 0}
.bzbtn{display:block;width:100%;margin-top:8px}.bzinv .dcadd{margin-top:12px}
.bzck{display:flex;gap:10px;align-items:flex-start;margin:12px 0 4px;font-size:14px}.bzck input{width:20px;height:20px;flex:none;margin-top:1px}
.bzpick{display:flex;gap:8px}.bzpick .btn{flex:1}
.bzfr{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(0,0,0,.06);width:100%;background:none;border-left:0;border-right:0;border-top:0;color:inherit;text-align:left}.bzfr:last-child{border-bottom:0}.bzfr span{flex:1;min-width:0}.bzfr b{display:block;font-size:14.5px}.bzfr small{color:var(--muted);font-size:12px}.bzfr em{font-style:normal;font-weight:700;font-size:13px;white-space:nowrap}.bzfr.ov em{color:#b4442c}.bzfrl{padding:4px 14px!important}
`);
