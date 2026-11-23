/* ===== Butler Docs: Meine Mappen — document sets with a completeness check (v46) =====
   A Mappe is a saved set of documents for one purpose (rent a flat, apply for a job, naturalisation …).
   It holds only links — every document stays once in «Dokumente».
   - Templates list what is needed («Slots»); the newest fitting documents are picked by themselves until the user
     chooses by hand. Own Mappe = no slots, only the documents the user adds.
   - Check per slot: missing · too few · expired · older than N months · page possibly blurred · twice in the set.
   - PDF: the core pack builder ($1) — cover letter with the list of enclosures, «Kopie» stamp, both ID sides on one
     page, size for e-mail, black-out. It is logged in «Was ich wohin geschickt habe».
   - In a document: status «Hochgeladen → Erkannt → MRZ geprüft», the machine-readable lines of a passport / ID card
     are read on the phone (Tesseract) and checked with their check digits. That is NOT a check of authenticity.
   Data: g.mpx={list:[{id,tpl,name,e,pk:{slot:[ids]},skip:{slot:1},extra:[ids],ord:[ids],ts,sent:[{d,to,pk}]}],sh:{pageId:score}} */
const MPX={
 title:['Мои подборки','Meine Mappen','My document sets'],rowS:['Комплекты документов: квартира, работа, гражданство …','Unterlagen-Sets: Wohnung, Bewerbung, Einbürgerung …','Document sets: flat, job application, citizenship …'],
 inWork:['В работе','In Arbeit','In progress'],fromTpl:['Новая подборка из шаблона','Neue Mappe aus Vorlage','New set from a template'],
 nDocs:['документов: %n','%n Unterlagen','%n documents'],own:['Своя подборка','Eigene Mappe','Own set'],ownS:['начать с пустой','leer beginnen','start empty'],
 links:['В подборке только ссылки – каждый документ хранится один раз в «Документах».','Eine Mappe enthält nur Verweise – jedes Dokument bleibt einmal in «Dokumente».','A set holds only links – every document stays once in «Documents».'],
 of:['%a из %b','%a von %b','%a of %b'],ready:['✓ готово','✓ fertig','✓ ready'],missL:['Открыто: %t','Offen: %t','Open: %t'],
 sentL:['Отправлено %d · ждём ответа','Gesendet %d · wartet auf Antwort','Sent %d · waiting for an answer'],sentA:['Отправлено %d · ответ получен','Gesendet %d · Antwort erhalten','Sent %d · answer received'],
 heroOk:['Всё готово','Alles bereit','All set'],heroOkS:['Можно собирать PDF и отправлять.','Sie können das PDF erstellen und senden.','You can make the PDF and send it.'],
 heroMiss:['Почти готово','Fast fertig','Almost there'],heroMissS:['Осталось пунктов: %n. Потом подборка готова к отправке.','Noch %n Punkte offen. Dann ist die Mappe bereit zum Senden.','%n points still open. Then the set is ready to send.'],
 heroNone:['Пока пусто','Noch leer','Empty so far'],heroNoneS:['Добавьте документы – Butler проверит сроки и читаемость.','Fügen Sie Dokumente hinzu – Butler prüft Fristen und Lesbarkeit.','Add documents – Butler checks dates and readability.'],
 miss:['нет · %h','fehlt · %h','missing · %h'],missN:['нет','fehlt','missing'],few:['%a из %b – добавьте ещё','%a von %b – bitte ergänzen','%a of %b – please add more'],
 exp:['%t: срок истёк %d','%t: abgelaufen am %d','%t: expired on %d'],old:['%t старше %n мес. – нужен новее','%t ist älter als %n Monate – bitte neuer','%t is older than %n months – please a newer one'],
 blur:['%t: стр. %p, возможно, нечёткая – переснять?','%t: Seite %p evtl. unscharf – neu scannen?','%t: page %p may be blurred – scan again?'],dup:['%t добавлен дважды','%t ist doppelt drin','%t is in twice'],
 skipped:['не нужно','nicht nötig','not needed'],optL:['по желанию','optional','optional'],
 pdf:['📄 Один PDF с сопроводительным письмом и списком','📄 Ein PDF mit Anschreiben & Anlagenliste','📄 One PDF with cover letter & list'],order:['↕ Порядок','↕ Reihenfolge','↕ Order'],
 addDoc:['＋ Ещё документ','＋ Weiteres Dokument','＋ Another document'],ren:['Переименовать','Umbenennen','Rename'],del:['Удалить подборку','Mappe löschen','Delete set'],
 delQ:['Удалить подборку? Документы остаются в «Документах».','Mappe löschen? Die Dokumente bleiben in «Dokumente».','Delete the set? The documents stay in «Documents».'],
 delOk:['Подборка удалена','Mappe gelöscht','Set deleted'],name:['Название','Name','Name'],save:['Сохранить','Speichern','Save'],
 pick:['Какие документы?','Welche Dokumente?','Which documents?'],fit:['Подходят','Passend','Fitting'],all:['Все документы','Alle Dokumente','All documents'],
 noneFit:['Подходящих документов пока нет.','Noch keine passenden Dokumente.','No fitting documents yet.'],scan:['📷 Отсканировать новый','📷 Neu scannen','📷 Scan a new one'],
 skip:['Не нужно для этой подборки','Für diese Mappe nicht nötig','Not needed for this set'],unskip:['Снова нужно','Doch nötig','Needed after all'],auto:['Выбрать автоматически','Automatisch wählen','Choose automatically'],
 done:['Готово','Fertig','Done'],need:['Нужно: %n','Benötigt: %n','Needed: %n'],
 ordT:['Порядок в PDF','Reihenfolge im PDF','Order in the PDF'],ordS:['Так документы пойдут в PDF и в список вложений.','So kommen die Dokumente ins PDF und in die Anlagenliste.','This is the order in the PDF and the list of enclosures.'],ordReset:['Как в шаблоне','Wie in der Vorlage','As in the template'],
 noDocs:['В подборке нет документов со страницами.','In der Mappe sind keine Dokumente mit Seiten.','The set has no documents with pages.'],
 to:['Кому','An wen','To whom'],toPh:['например, Hausverwaltung Müller','z. B. Hausverwaltung Müller','e.g. Hausverwaltung Müller'],ref:['Номер дела / объявления','Aktenzeichen / Inserat','Reference / listing'],subj:['Тема','Betreff','Subject'],me:['Отправитель','Absender','Sender'],
 make:['Создать PDF','PDF erstellen','Make the PDF'],warnSend:['Не всё готово: %n пунктов. Всё равно создать?','Noch nicht alles bereit: %n Punkte. Trotzdem erstellen?','Not everything is ready: %n points. Make it anyway?'],
 created:['Подборка «%n» создана','Mappe «%n» angelegt','Set «%n» created'],inMappe:['В подборках','In Mappen','In sets'],addTo:['＋ В подборку «%n»','＋ Mappe «%n»','＋ Set «%n»'],added:['Добавлено в «%n»','Zu «%n» hinzugefügt','Added to «%n»'],
 /* recognition */
 recT:['Распознавание','Erkennung','Recognition'],st_up:['Загружен','Hochgeladen','Uploaded'],st_rec:['Распознан','Erkannt','Recognised'],st_mrz:['MRZ проверена','MRZ geprüft','MRZ checked'],st_chip:['Чип (позже)','Chip (später)','Chip (later)'],
 mrzBtn:['🔎 Прочитать машинную строку (<<<)','🔎 Maschinenzeile lesen (<<<)','🔎 Read the machine line (<<<)'],mrzBusy:['Читаю строку … это занимает до минуты','Lese die Zeile … das dauert bis zu einer Minute','Reading the line … this takes up to a minute'],
 mrzNo:['Строки «<<<» не найдены. Сфотографируйте страницу с фото целиком и резко (у ID-карты строка на обороте).','Keine Zeilen «<<<» gefunden. Fotografieren Sie die Seite mit Foto ganz und scharf (beim Ausweis auf der Rückseite).','No «<<<» lines found. Photograph the page with the photo fully and sharply (on ID cards it is on the back).'],
 mrzBad:['Строка прочитана, но контрольные цифры не сходятся (%a из %b). Проверьте данные вручную.','Zeile gelesen, aber die Prüfziffern stimmen nicht (%a von %b). Bitte die Angaben selbst prüfen.','Line read, but the check digits do not match (%a of %b). Please check the details yourself.'],
 mrzOk:['Контрольные цифры сходятся – текст прочитан верно.','Die Prüfziffern stimmen – der Text ist richtig gelesen.','The check digits match – the text was read correctly.'],
 mrzNote:['«MRZ проверена» значит: строка прочитана без ошибок. Это не проверка подлинности. Проверка чипа (NFC) появится в приложении из App Store.','«MRZ geprüft» heißt: die Zeile ist fehlerfrei gelesen. Es ist keine Echtheitsprüfung. Die Chip-Prüfung (NFC) kommt mit der App aus dem App Store.','«MRZ checked» means: the line was read without errors. It is not a check of authenticity. The chip check (NFC) comes with the app from the App Store.'],
 f_name:['Имя','Name','Name'],f_num:['Номер','Nummer','Number'],f_birth:['Дата рождения','Geburtsdatum','Date of birth'],f_valid:['Действителен до','Gültig bis','Valid until'],f_land:['Страна','Land','Country'],
 take:['Перенести в документ','Übernehmen','Apply'],taken:['Данные перенесены','Angaben übernommen','Details applied'],k_P:['Паспорт','Reisepass','Passport'],k_I:['Удостоверение личности','Personalausweis / ID','ID card'],k_A:['Вид на жительство','Aufenthaltstitel','Residence permit'],
 /* template names and slots */
 t_wohnung:['Аренда квартиры','Wohnung mieten','Renting a flat'],t_bewerb:['Заявление на работу','Bewerbung','Job application'],t_einb:['Гражданство','Einbürgerung','Naturalisation'],
 t_kind:['Kindergeld / Elterngeld','Kindergeld / Elterngeld','Child benefit / parental allowance'],t_kredit:['Кредит / банк','Kredit / Bank','Loan / bank'],
 s_id:['Паспорт или ID','Ausweis oder Pass','ID card or passport'],s_selbst:['Анкета арендатора','Mieterselbstauskunft','Tenant self-disclosure'],h_selbst:['бланк от арендодателя','Formular vom Vermieter','form from the landlord'],
 s_gehalt:['Расчётные листы (3 последних)','Lohnabrechnungen (3 letzte)','Payslips (last 3)'],h_gehalt:['от работодателя, по месяцам','vom Arbeitgeber, monatlich','from the employer, monthly'],
 s_avertrag:['Трудовой договор','Arbeitsvertrag','Employment contract'],h_avertrag:['подписанный','unterschrieben','signed'],
 s_schufa:['Выписка Schufa','Schufa-Auskunft','Schufa report'],h_schufa:['бесплатно: meineschufa.de (копия данных)','kostenlos: meineschufa.de (Datenkopie)','free: meineschufa.de (data copy)'],
 s_msf:['Справка об отсутствии долгов по аренде','Mietschuldenfreiheit','Rent arrears clearance'],h_msf:['от прежнего арендодателя','vom bisherigen Vermieter','from the previous landlord'],
 s_konto:['Выписка со счёта','Kontoauszug','Bank statement'],h_konto:['не старше 3 месяцев','nicht älter als 3 Monate','not older than 3 months'],
 s_cv:['Резюме','Lebenslauf','CV'],h_cv:['с датой и подписью','mit Datum und Unterschrift','with date and signature'],s_anschr:['Сопроводительное письмо','Anschreiben','Cover letter'],h_anschr:['под эту вакансию','für diese Stelle','for this job'],
 s_zeugnis:['Отзывы с работы','Arbeitszeugnisse','Job references'],h_zeugnis:['от прежних работодателей','von früheren Arbeitgebern','from previous employers'],
 s_dipl:['Дипломы и аттестаты','Zeugnisse & Abschlüsse','Diplomas & certificates'],h_dipl:['школа, обучение, вуз','Schule, Ausbildung, Studium','school, training, degree'],s_cert:['Сертификаты, курсы','Zertifikate, Kurse','Certificates, courses'],h_cert:['если есть','falls vorhanden','if any'],
 s_aufent:['Вид на жительство','Aufenthaltstitel','Residence permit'],h_aufent:['действующий','gültig','valid'],s_birth:['Свидетельство о рождении','Geburtsurkunde','Birth certificate'],h_birth:['с переводом, если не на немецком','mit Übersetzung, falls nicht deutsch','with a translation if not German'],
 s_marr:['Свидетельство о браке','Heiratsurkunde','Marriage certificate'],h_marr:['если в браке','falls verheiratet','if married'],s_meld:['Справка о регистрации','Meldebescheinigung','Registration certificate'],h_meld:['из Bürgeramt','vom Bürgeramt','from the Bürgeramt'],
 s_rv:['Выписка пенсионного страхования','Rentenversicherungsverlauf','Pension insurance record'],h_rv:['Deutsche Rentenversicherung','Deutsche Rentenversicherung','Deutsche Rentenversicherung'],
 s_sprach:['Сертификат по языку (B1)','Sprachzertifikat (B1)','Language certificate (B1)'],h_sprach:['telc, Goethe, DTZ …','telc, Goethe, DTZ …','telc, Goethe, DTZ …'],
 s_test:['Тест на гражданство','Einbürgerungstest','Naturalisation test'],h_test:['«Жизнь в Германии»','«Leben in Deutschland»','«Leben in Deutschland»'],
 s_kv:['Медицинская страховка','Krankenversicherung','Health insurance'],h_kv:['карта или справка кассы','Karte oder Bescheinigung der Kasse','card or insurer’s certificate'],
 s_steuer:['Налоговое решение','Steuerbescheid','Tax assessment'],h_steuer:['последнее','letzter','latest'],
 s_kbirth:['Свидетельство о рождении ребёнка','Geburtsurkunde des Kindes','Child’s birth certificate'],h_kbirth:['для Elterngeld – из ЗАГСа','für Elterngeld – vom Standesamt','for Elterngeld – from the registry'],
 s_taxid:['Налоговый номер (Steuer-ID)','Steuer-ID','Tax ID'],h_taxid:['ваш и ребёнка','Ihre und die des Kindes','yours and the child’s'],s_bank:['Банковские реквизиты','Bankverbindung','Bank details'],h_bank:['IBAN – выписка или карта','IBAN – Auszug oder Karte','IBAN – statement or card']
};
const mpxT=(k,o)=>{let s=cv5n(MPX[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* slot: k (text key s_k / h_k), dt (document types), re (title/text), kg (job slot), n (how many), age (months), opt */
const MPX_TPL=[
 {id:'wohnung',e:'🏠',s:[{k:'id',dt:['id','passport']},{k:'selbst',re:/selbstauskunft|анкета аренд/},{k:'gehalt',kg:'gehalt',re:/gehalt|lohn|entgelt|abrechnung|расчётн|зарплат/,n:3,age:3},
  {k:'avertrag',kg:'vertrag',re:/arbeitsvertrag|трудов\w* договор/},{k:'schufa',re:/schufa/,age:3},{k:'msf',re:/mietschuldenfrei|mietbescheinigung/},{k:'konto',dt:['bankst'],re:/kontoauszug|выписк/,age:3}]},
 {id:'bewerb',e:'💼',s:[{k:'cv',re:/lebenslauf|\bcv\b|резюме|curriculum/},{k:'anschr',re:/anschreiben|bewerbungsschreiben|сопроводит/},{k:'zeugnis',kg:'zeugnis',re:/arbeitszeugnis|zwischenzeugnis/,n:1},
  {k:'dipl',dt:['diploma','school'],re:/abschluss|diplom|abitur|bachelor|master/},{k:'cert',dt:['cert','course'],re:/zertifikat|certificate|сертификат/,opt:1},{k:'id',dt:['id','passport'],opt:1}]},
 {id:'einb',e:'🇩🇪',s:[{k:'id',dt:['passport','id']},{k:'aufent',dt:['residence'],re:/aufenthalts/},{k:'birth',dt:['birth'],re:/geburtsurkunde/},{k:'marr',dt:['marriage'],re:/heiratsurkunde/,opt:1},
  {k:'meld',dt:['meldung'],re:/meldebescheinigung/},{k:'gehalt',kg:'gehalt',re:/gehalt|lohn|entgelt|abrechnung/,n:3,age:3},{k:'rv',re:/rentenversicherung|versicherungsverlauf|renteninformation/},
  {k:'sprach',re:/\bb1\b|sprachzertifikat|deutsch-test|\bdtz\b|telc|goethe/},{k:'test',re:/einbürgerungstest|leben in deutschland/},{k:'kv',dt:['hcard'],re:/krankenversicherung|krankenkasse/},{k:'steuer',dt:['taxnote'],re:/steuerbescheid|einkommensteuerbescheid/}]},
 {id:'kind',e:'👶',s:[{k:'kbirth',dt:['birthc','birth'],re:/geburtsurkunde|geburtsbescheinigung/},{k:'id',dt:['id','passport']},{k:'taxid',dt:['taxid'],re:/steuer-?id|identifikationsnummer/},
  {k:'meld',dt:['meldung'],re:/meldebescheinigung/},{k:'gehalt',kg:'gehalt',re:/gehalt|lohn|entgelt|abrechnung/,n:3,age:3,opt:1},{k:'bank',dt:['bankst'],re:/kontoauszug|iban/,opt:1}]},
 {id:'kredit',e:'🏦',s:[{k:'id',dt:['id','passport']},{k:'gehalt',kg:'gehalt',re:/gehalt|lohn|entgelt|abrechnung/,n:3,age:3},{k:'konto',dt:['bankst'],re:/kontoauszug/,age:3},
  {k:'avertrag',kg:'vertrag',re:/arbeitsvertrag/},{k:'steuer',dt:['taxnote'],re:/steuerbescheid/},{k:'schufa',re:/schufa/,age:3}]}
];
const mpxTpl=id=>MPX_TPL.find(t=>t.id===id);
function mpxD(){const o=g.mpx=g.mpx&&typeof g.mpx==='object'?g.mpx:{};if(!Array.isArray(o.list))o.list=[];o.sh=o.sh&&typeof o.sh==='object'?o.sh:{};
 for(const M of o.list){M.pk=M.pk&&typeof M.pk==='object'?M.pk:{};M.skip=M.skip&&typeof M.skip==='object'?M.skip:{};M.extra=Array.isArray(M.extra)?M.extra:[];M.sent=Array.isArray(M.sent)?M.sent:[];if(!Array.isArray(M.ord))M.ord=null}return o}
const mpxSave=()=>{try{bsvQuiet()}catch{}$()};
const mpxDocs=()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const mpxDoc=id=>mpxDocs().find(d=>d.id===id);
const mpxToday=()=>x(new Date);
const mpxName=M=>M.name||(M.tpl&&mpxTpl(M.tpl)?mpxT('t_'+M.tpl):mpxT('own'));
const mpxDocName=d=>{try{const n=On(d);return d.title&&d.title!==n&&!/^(Neues Dokument|Новый документ|New document)$/.test(d.title)?d.title:n}catch{return d.title||'—'}};
/* document date: issue date › month in the title › archive date › created */
const MPX_MON={jan:1,feb:2,'mär':3,mar:3,apr:4,mai:5,may:5,jun:6,jul:7,aug:8,sep:9,okt:10,oct:10,nov:11,dez:12,dec:12,'янв':1,'фев':2,'мар':3,'апр':4,'мая':5,'май':5,'июн':6,'июл':7,'авг':8,'сен':9,'окт':10,'ноя':11,'дек':12};
function mpxDate(d){const f=d.f||{};if(/^\d{4}-\d\d-\d\d$/.test(f.issued||''))return f.issued;const t=String(d.title||'').toLowerCase();
 let mm=t.match(/\b(0?[1-9]|1[0-2])[\/.](20\d\d)\b/);if(mm)return mm[2]+'-'+String(mm[1]).padStart(2,'0')+'-28';
 mm=t.match(/([a-zäа-я]{3})[a-zäа-я]*\.?\s+(20\d\d)/);if(mm&&MPX_MON[mm[1]])return mm[2]+'-'+String(MPX_MON[mm[1]]).padStart(2,'0')+'-28';
 if(/^\d{4}-\d\d-\d\d$/.test(d.date||''))return d.date;return d.ts?x(new Date(d.ts)):''}
function mpxFits(s,d){if(s.dt&&s.dt.includes(d.dtype))return!0;const t=(String(d.title||'')+' '+String(d.snip||'')).toLowerCase();
 if(s.kg){try{if((d.dtype==='work'||d.dcat==='work')&&krGuess(d)===s.kg)return!0}catch{}}return!!(s.re&&s.re.test(t))}
const mpxCands=s=>mpxDocs().filter(d=>mpxFits(s,d)).sort((a,b)=>String(mpxDate(b)).localeCompare(String(mpxDate(a))));
function mpxSlots(M){const tp=mpxTpl(M.tpl);return tp?tp.s:[]}
function mpxPicked(M,s){const ex=M.pk[s.k];if(Array.isArray(ex))return ex.map(mpxDoc).filter(Boolean);return mpxCands(s).slice(0,s.n||1)}
/* --- sharpness of a page: variance of the Laplacian on a small grey copy (cached per page) --- */
const MPX_BLUR=28;let mpxShQ=[],mpxShRun=0;
function mpxSharpOf(px,w,h){let s=0,s2=0,n=0;for(let y=1;y<h-1;y++)for(let x0=1;x0<w-1;x0++){const p=y*w+x0,l=4*px[p]-px[p-1]-px[p+1]-px[p-w]-px[p+w];s+=l;s2+=l*l;n++}if(!n)return 0;const mu=s/n;return Math.round(s2/n-mu*mu)}
async function mpxSharp(page){const D=mpxD();if(D.sh[page.id]!=null)return D.sh[page.id];const u=await Ds(page);if(!u)return null;const im=await z1(u),W=640,k=Math.min(1,W/Math.max(im.naturalWidth||im.width,im.naturalHeight||im.height)),
 w=Math.max(8,Math.round((im.naturalWidth||im.width)*k)),h=Math.max(8,Math.round((im.naturalHeight||im.height)*k)),cv=document.createElement('canvas');cv.width=w;cv.height=h;const c=cv.getContext('2d');c.drawImage(im,0,0,w,h);
 const a=c.getImageData(0,0,w,h).data,px=new Float32Array(w*h);for(let p=0;p<w*h;p++)px[p]=.299*a[4*p]+.587*a[4*p+1]+.114*a[4*p+2];cv.width=cv.height=0;const sc=mpxSharpOf(px,w,h);D.sh[page.id]=sc;return sc}
function mpxSharpLater(pages){for(const p of pages)if(p&&p.id&&mpxD().sh[p.id]==null&&!mpxShQ.some(q=>q.id===p.id))mpxShQ.push(p);if(mpxShRun||!mpxShQ.length)return;mpxShRun=1;
 (async()=>{let ch=0;while(mpxShQ.length){const p=mpxShQ.shift();try{if(await mpxSharp(p)!=null)ch=1}catch{mpxD().sh[p.id]=-1}}mpxShRun=0;if(ch){mpxSave();if(['mpx','mpxd'].includes(m.route))v()}})()}
/* --- check one slot --- */
function mpxCheck(M,s){const P=mpxPicked(M,s),n=s.n||1,today=mpxToday(),W=[];if(M.skip[s.k])return{st:'skip',P,W};
 if(!P.length)return{st:s.opt?'opt':'no',P,W};if(P.length<n)W.push(mpxT('few',{a:P.length,b:n}));
 for(const d of P){const nm=mpxDocName(d),vd=d.f&&d.f.valid;if(vd&&vd<today)W.push(mpxT('exp',{t:nm,d:je(vd)}));
  if(s.age){const dd=mpxDate(d);if(dd){const lim=new Date();lim.setMonth(lim.getMonth()-s.age);if(dd<x(lim))W.push(mpxT('old',{t:nm,n:s.age}))}}
  (d.pages||[]).forEach((p,k)=>{const sc=mpxD().sh[p.id];if(sc!=null&&sc>=0&&sc<MPX_BLUR)W.push(mpxT('blur',{t:nm,p:k+1}))})}
 return{st:W.length?'wa':'ok',P,W}}
function mpxSum(M){const S=mpxSlots(M),R=S.map(s=>({s,...mpxCheck(M,s)})),ids=[];R.forEach(r=>r.P.forEach(d=>ids.push(d.id)));M.extra.forEach(id=>ids.push(id));
 const seen={};ids.forEach(id=>seen[id]=(seen[id]||0)+1);R.forEach(r=>{if(r.st==='ok'||r.st==='wa'){const dd=r.P.filter(d=>seen[d.id]>1&&!(r.s.k==='id'));dd.forEach(d=>{const w=mpxT('dup',{t:mpxDocName(d)});if(!r.W.includes(w)){r.W.push(w);r.st='wa'}})}});
 const need=R.filter(r=>r.st!=='skip'&&!(r.s.opt&&r.st==='opt')),ok=need.filter(r=>r.st==='ok').length,X=M.extra.map(mpxDoc).filter(Boolean);
 return{R,X,need:need.length+(M.tpl?0:X.length),ok:ok+(M.tpl?0:X.length),open:need.filter(r=>r.st!=='ok')}}
function mpxOrder(M){const S=mpxSum(M),base=[];S.R.forEach(r=>{if(r.st!=='skip')r.P.forEach(d=>{if(!base.includes(d.id))base.push(d.id)})});S.X.forEach(d=>{if(!base.includes(d.id))base.push(d.id)});
 if(!M.ord)return base;const o=M.ord.filter(id=>base.includes(id));base.forEach(id=>{if(!o.includes(id))o.push(id)});return o}
/* --- screens --- */
const mpxHdr=(t,back)=>`<div class="sub-hdr"><button class="iconbtn" data-act="${back}" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(t)}</h2></div><span></span></div>`;
function mpxListScreen(){const D=mpxD();
 const cards=D.list.map(M=>{const S=mpxSum(M),pc=S.need?Math.round(S.ok/S.need*100):0,done=S.need&&S.ok===S.need,last=M.sent[0];
  let sub=done?'':S.open.length?mpxT('missL',{t:S.open.slice(0,2).map(r=>mpxT('s_'+r.s.k)).join(' · ')+(S.open.length>2?' …':'')}):'';
  if(last){const pk=(g.pkSent||[]).find(z=>z.id===last.pk);sub=mpxT(pk&&pk.ans?'sentA':'sentL',{d:je(last.d)})}
  return`<button type="button" class="dhcard mpxc" data-act="mpxopen" data-id="${i(M.id)}"><span class="mpxct"><b><span class="mpxe">${M.e||'📂'}</span> ${i(mpxName(M))}</b><em class="${done?'ok':''}">${done?i(mpxT('ready')):i(mpxT('of',{a:S.ok,b:S.need}))}</em></span>
   ${sub?`<small>${i(sub)}</small>`:''}<span class="mpxbar"><i style="width:${pc}%"></i></span></button>`}).join('');
 const tpl=MPX_TPL.map(tp=>`<button type="button" class="dhcard mpxt" data-act="mpxnew" data-t="${tp.id}"><span class="e">${tp.e}</span><b>${i(mpxT('t_'+tp.id))}</b><small>${i(mpxT('nDocs',{n:tp.s.filter(s=>!s.opt).length}))}</small></button>`).join('')
  +`<button type="button" class="dhcard mpxt" data-act="mpxnew" data-t=""><span class="e">📂</span><b>${i(mpxT('own'))}</b><small>${i(mpxT('ownS'))}</small></button>`;
 return`<div class="screen dhome mpx">${mpxHdr(mpxT('title'),'mpxback')}${cards?`<h3 class="odh">${i(mpxT('inWork'))}</h3>${cards}`:''}
  <h3 class="odh">${i(mpxT('fromTpl'))}</h3><div class="mpxtpl">${tpl}</div><p class="mpxnote">${i(mpxT('links'))}</p></div>`}
let mpxCur='';
function mpxRow(r){const s=r.s,P=r.P,ic=r.st==='ok'?'✓':r.st==='wa'?'!':r.st==='skip'?'–':'＋',cls=r.st==='ok'?'ok':r.st==='wa'?'wa':r.st==='skip'||r.st==='opt'?'sk':'no';
 const lab=mpxT('s_'+s.k)+((s.n||1)>1?'':'');let sub;
 if(r.st==='skip')sub=mpxT('skipped');else if(r.st==='opt')sub=mpxT('optL')+' · '+mpxT('h_'+s.k);else if(r.st==='no')sub=mpxT('miss',{h:mpxT('h_'+s.k)});
 else sub=P.map(d=>{const vd=d.f&&d.f.valid;return mpxDocName(d)+(vd&&r.st==='ok'?' · '+je(vd):'')}).join(', ');
 return`<button type="button" class="mpxr ${cls}" data-act="mpxslot" data-k="${i(s.k)}"><span class="st">${ic}</span><span class="t"><b>${i(lab)}</b><small>${i(sub)}</small>${r.W.map(w=>`<small class="w">${i(w)}</small>`).join('')}</span><span class="ch">›</span></button>`}
function mpxDetailScreen(){const M=mpxD().list.find(z=>z.id===mpxCur);if(!M){setTimeout(()=>R('mpx',void 0,!0),0);return'<div class="screen"></div>'}
 const S=mpxSum(M),pc=S.need?S.ok/S.need:0,open=S.need-S.ok;const pages=[];S.R.forEach(r=>r.P.forEach(d=>(d.pages||[]).forEach(p=>pages.push(p))));S.X.forEach(d=>(d.pages||[]).forEach(p=>pages.push(p)));setTimeout(()=>mpxSharpLater(pages),200);
 const hk=!S.need?'heroNone':open?'heroMiss':'heroOk';
 const xs=S.X.map(d=>`<div class="mpxr ok"><span class="st">✓</span><span class="t"><b>${i(mpxDocName(d))}</b><small>${i(d.date?je(d.date):'')}</small></span><button type="button" class="mpxx" data-act="mpxxrm" data-id="${i(d.id)}">×</button></div>`).join('');
 return`<div class="screen dhome mpx mpxd">${mpxHdr(mpxName(M),'mpxlist')}
  <div class="mpxhero"><div class="mpxring" style="--p:${Math.round(pc*100)}%"><i>${S.ok}/${S.need}</i></div><div><b>${i(mpxT(hk))}</b><small>${i(mpxT(hk+'S',{n:open}))}</small></div></div>
  <div class="dhcard mpxrows">${S.R.map(mpxRow).join('')}${xs}<button type="button" class="mpxadd" data-act="mpxextra">${i(mpxT('addDoc'))}</button></div>
  <button type="button" class="dcadd gold mpxpdf" data-act="mpxpdf">${i(mpxT('pdf'))}</button>
  <div class="mpx2"><button type="button" class="mpxb2" data-act="mpxord">${i(mpxT('order'))}</button><button type="button" class="mpxb2" data-act="mpxren">✎ ${i(mpxT('ren'))}</button></div>
  <button type="button" class="mpxdel" data-act="mpxdel">${i(mpxT('del'))}</button></div>`}
/* --- sheets --- */
function mpxPickSheet(M,s){const C=s?mpxCands(s):[],cur=new Set((s?mpxPicked(M,s):M.extra.map(mpxDoc).filter(Boolean)).map(d=>d.id)),A=mpxDocs().filter(d=>!C.includes(d)).sort((a,b)=>(b.ts||0)-(a.ts||0));
 const row=d=>`<label class="lnqopt"><input type="checkbox" data-mid="${i(d.id)}" ${cur.has(d.id)?'checked':''}><span><b>${i(mpxDocName(d))}</b><small>${i([mpxDate(d)?je(mpxDate(d)):'',(d.pages||[]).length?d.pages.length+' 🖼':'',(d.files||[]).length?d.files.length+' 📄':''].filter(Boolean).join(' · '))}</small></span></label>`;
 H(s?mpxT('s_'+s.k):mpxT('pick'),`${s?`<p class="mpxsh">${i(mpxT('h_'+s.k))}${(s.n||1)>1?' · '+i(mpxT('need',{n:s.n})):''}</p><h5 class="mpxh5">${i(mpxT('fit'))}</h5>${C.length?C.map(row).join(''):`<p class="mpxsh">${i(mpxT('noneFit'))}</p>`}`:''}
  ${A.length?`<details class="mpxall" ${s?'':'open'}><summary>${i(mpxT('all'))} (${A.length})</summary>${A.map(row).join('')}</details>`:''}
  <button type="button" class="dcadd gold" data-mok>${i(mpxT('done'))}</button>
  ${s?`<button type="button" class="lnqno" data-mscan>${i(mpxT('scan'))}</button><button type="button" class="lnqno sm" data-mskip>${i(mpxT(M.skip[s.k]?'unskip':'skip'))}</button>${Array.isArray(M.pk[s.k])?`<button type="button" class="lnqno sm" data-mauto>${i(mpxT('auto'))}</button>`:''}`:''}`,
 sh=>{sh.classList.add('bsvsh','lnqsh','mpxsheet');
  sh.querySelector('[data-mok]').onclick=()=>{const ids=[...sh.querySelectorAll('[data-mid]:checked')].map(c=>c.dataset.mid);if(s){M.pk[s.k]=ids;delete M.skip[s.k]}else M.extra=ids;mpxSave();sh.remove();v()};
  const sc=sh.querySelector('[data-mscan]');sc&&(sc.onclick=()=>{sh.remove();const dt=s.dt&&s.dt[0];if(dt)HE(dt);else{try{const n=gt({id:V(),title:mpxT('s_'+s.k).replace(/\s*\(.*\)$/,''),kind:'other',party:'',start:'',end:'',notice:'',note:'',files:[],pages:[],ts:Date.now(),folder:'f1',date:mpxToday(),dtype:'',f:{},who:'me'});Ke().items.push(n);mpxSave();m.bdid=n.id;R('bdoc')}catch{R('archive')}}});
  const sk=sh.querySelector('[data-mskip]');sk&&(sk.onclick=()=>{M.skip[s.k]?delete M.skip[s.k]:M.skip[s.k]=1;mpxSave();sh.remove();v()});
  const au=sh.querySelector('[data-mauto]');au&&(au.onclick=()=>{delete M.pk[s.k];mpxSave();sh.remove();v()})})}
function mpxOrdSheet(M){const draw=()=>{const O=mpxOrder(M);return O.map((id,k)=>{const d=mpxDoc(id);return d?`<div class="mpxo"><span>${k+1}. ${i(mpxDocName(d))}</span><button type="button" data-up="${k}" ${k?'':'disabled'}>↑</button><button type="button" data-dn="${k}" ${k<O.length-1?'':'disabled'}>↓</button></div>`:''}).join('')};
 H(mpxT('ordT'),`<p class="mpxsh">${i(mpxT('ordS'))}</p><div class="mpxol">${draw()}</div><button type="button" class="dcadd gold" data-x="1">${i(mpxT('done'))}</button><button type="button" class="lnqno sm" data-ores>${i(mpxT('ordReset'))}</button>`,sh=>{sh.classList.add('bsvsh','mpxsheet');
  const L0=sh.querySelector('.mpxol');L0.onclick=e=>{const b=e.target.closest('[data-up],[data-dn]');if(!b)return;const O=mpxOrder(M),k=+(b.dataset.up||b.dataset.dn),j=b.dataset.up!=null?k-1:k+1;[O[k],O[j]]=[O[j],O[k]];M.ord=O;mpxSave();L0.innerHTML=draw()};
  sh.querySelector('[data-ores]').onclick=()=>{M.ord=null;mpxSave();L0.innerHTML=draw()};sh.querySelector('[data-x]').addEventListener('click',()=>v())})}
function mpxPdfSheet(M){const D=mpxOrder(M).map(mpxDoc).filter(d=>d&&((d.pages||[]).length||(d.files||[]).length));if(!D.length){T(mpxT('noDocs'));return}
 const S=mpxSum(M),open=S.need-S.ok,o=Object.assign({cover:!0,kopie:!0,both:!0,small:!0,black:!1},g.pkOpt||{}),last=M.sent[0]||{};
 let me='';try{me=GE()}catch{}
 H('📦 '+mpxName(M),`<form class="asform asbox sitpk mpxpk">${open?`<p class="mpxwarn">⚠ ${i(mpxT('warnSend',{n:open}))}</p>`:''}
  <label class="asf"><span>${i(mpxT('to'))}</span><input class="field" name="to" placeholder="${i(mpxT('toPh'))}" value="${i(last.to||'')}"></label>
  <label class="asf"><span>${i(mpxT('ref'))}</span><input class="field" name="ref" value=""></label>
  <label class="asf"><span>${i(mpxT('subj'))}</span><input class="field" name="sub" value="${i((M.name||(M.tpl&&MPX['t_'+M.tpl]?MPX['t_'+M.tpl][1]:mpxName(M)))+' – Unterlagen')}"></label>
  <label class="asf"><span>${i(mpxT('me'))}</span><textarea class="field" name="me" rows="3">${i(me)}</textarea></label>
  <ol class="mpxlist">${D.map(d=>`<li>${i(mpxDocName(d))}</li>`).join('')}</ol>
  ${['cover','kopie','both','small','black'].map(k=>`<label class="astg"><input type="checkbox" name="${k}" ${o[k]?'checked':''}><span><b>${i(na(k))}</b></span></label>`).join('')}
  <div class="asbtns"><button type="submit" class="btn primary">📄 ${i(mpxT('make'))}</button></div></form>`,sh=>{const f=sh.querySelector('form');
  f.onsubmit=async e=>{e.preventDefault();const h=new FormData(f),b={cover:f.cover.checked,kopie:f.kopie.checked,both:f.both.checked,small:f.small.checked,black:f.black.checked};g.pkOpt=b;
   const k={to:String(h.get('to')||'').trim(),ref:String(h.get('ref')||'').trim(),sub:String(h.get('sub')||'').trim(),me:String(h.get('me')||'').trim(),sit:'mpx'};g.pkMe=k.me;$();
   const bt=f.querySelector('[type=submit]');bt.disabled=!0;const before=(g.pkSent||[])[0];
   try{await $1(D,b,k,sh);const now=(g.pkSent||[])[0];if(now&&now!==before){M.sent.unshift({d:mpxToday(),to:k.to,pk:now.id});M.sent=M.sent.slice(0,30);mpxSave()}}catch(er){Hooks.err('mpxpdf',er)}finally{bt.isConnected&&(bt.disabled=!1)}}})}
function mpxRenSheet(M){H(mpxT('ren'),`<label class="asf"><span>${i(mpxT('name'))}</span><input class="field mpxnm" value="${i(mpxName(M))}" maxlength="60"></label><button type="button" class="dcadd gold" data-ok>${i(mpxT('save'))}</button>`,sh=>{sh.classList.add('bsvsh');
 const inp=sh.querySelector('.mpxnm');setTimeout(()=>inp.focus(),80);sh.querySelector('[data-ok]').onclick=()=>{const n=inp.value.trim();if(n)M.name=n.slice(0,60);mpxSave();sh.remove();v()}})}
function mpxNew(tid){const tp=tid?mpxTpl(tid):null,M={id:V(),tpl:tp?tp.id:'',e:tp?tp.e:'📂',name:'',pk:{},skip:{},extra:[],ord:null,ts:Date.now(),sent:[]};mpxD().list.unshift(M);mpxSave();mpxCur=M.id;R('mpxd');
 if(tp)T(mpxT('created',{n:mpxName(M)}));else setTimeout(()=>mpxPickSheet(M,null),120)}
/* --- recognition in the document: status + MRZ --- */
const MPX_MRZ_DT=['passport','id','residence','intpass'];
function mpxCd(s){const w=[7,3,1];let t=0;for(let k=0;k<s.length;k++){const c=s[k];const val=c==='<'?0:/[0-9]/.test(c)?+c:/[A-Z]/.test(c)?c.charCodeAt(0)-55:0;t+=val*w[k%3]}return String(t%10)}
const MPX_NUM={O:'0',Q:'0',D:'0',I:'1',L:'1',Z:'2',S:'5',G:'6',B:'8',T:'7'};
const mpxDig=s=>s.replace(/[A-Z]/g,c=>MPX_NUM[c]||c);
function mpxFix(f,cd,num){const c=num?mpxDig(f):f,d=mpxDig(cd);if(mpxCd(c)===d)return[c,d,1];if(!num){const c2=f.replace(/O/g,'0');if(mpxCd(c2)===d)return[c2,d,1]}return[c,d,0]}
function mpxYmd(s,fut){if(!/^\d{6}$/.test(s))return'';const yy=+s.slice(0,2),cy=new Date().getFullYear()%100,y=fut?2000+yy:(yy>cy?1900+yy:2000+yy),m2=s.slice(2,4),d2=s.slice(4,6);return+m2>=1&&+m2<=12&&+d2>=1&&+d2<=31?y+'-'+m2+'-'+d2:''}
function mpxNames(s){const p=s.replace(/<+$/,'').split('<<');const last=(p[0]||'').replace(/</g,' ').trim(),first=(p.slice(1).join(' ')||'').replace(/</g,' ').trim();const cap=t=>t.toLowerCase().replace(/(^|[\s-])\S/g,z=>z.toUpperCase());return{last:cap(last),first:cap(first)}}
function mpxParse(txt){const L=String(txt||'').toUpperCase().replace(/[«‹]/g,'<').split(/\n/).map(l=>l.replace(/[^A-Z0-9<]/g,'')).filter(l=>l.length>=28&&(l.match(/</g)||[]).length>=2);if(!L.length)return null;
 const fit=(l,n)=>l.length>n?l.slice(0,n):l.padEnd(n,'<');let r=null;
 const td3=L.findIndex((l,k)=>l.length>=40&&L[k+1]&&L[k+1].length>=40&&/^[PV]/.test(l));
 if(td3>=0){const a=fit(L[td3],44),b=fit(L[td3+1],44),[num,c1,o1]=mpxFix(b.slice(0,9),b[9],0),[bd,c2,o2]=mpxFix(b.slice(13,19),b[19],1),[ex,c3,o3]=mpxFix(b.slice(21,27),b[27],1);
  const comp=num+c1+b.slice(13,20).replace(/^.{6}/,bd)+b.slice(21,43).replace(/^.{6}/,ex),o4=mpxCd(comp)===mpxDig(b[43])?1:0;
  r={kind:'P',land:a.slice(2,5).replace(/</g,''),...mpxNames(a.slice(5)),num:num.replace(/</g,''),birth:mpxYmd(bd),valid:mpxYmd(ex,1),checks:o1+o2+o3+o4,of:4}}
 else{const td1=L.findIndex((l,k)=>l.length>=28&&l.length<=34&&L[k+1]&&L[k+2]&&/^[IAC]/.test(l));
  if(td1>=0){const a=fit(L[td1],30),b=fit(L[td1+1],30),c=fit(L[td1+2],30),[num,c1,o1]=mpxFix(a.slice(5,14),a[14],0),[bd,c2,o2]=mpxFix(b.slice(0,6),b[6],1),[ex,c3,o3]=mpxFix(b.slice(8,14),b[14],1);
   const comp=a.slice(5,14).replace(/^.{9}/,num)+c1+a.slice(15,30)+bd+c2+ex+c3+b.slice(18,29),o4=mpxCd(comp)===mpxDig(b[29])?1:0;
   r={kind:/^A|^R/.test(a.slice(0,2))?'A':'I',land:a.slice(2,5).replace(/</g,''),...mpxNames(c),num:num.replace(/</g,''),birth:mpxYmd(bd),valid:mpxYmd(ex,1),checks:o1+o2+o3+o4,of:4}}
  else{const td2=L.findIndex((l,k)=>l.length>=34&&L[k+1]&&L[k+1].length>=34&&/^[IAC]/.test(l));if(td2<0)return null;const a=fit(L[td2],36),b=fit(L[td2+1],36),[num,c1,o1]=mpxFix(b.slice(0,9),b[9],0),[bd,c2,o2]=mpxFix(b.slice(13,19),b[19],1),[ex,c3,o3]=mpxFix(b.slice(21,27),b[27],1);
   const comp=num+c1+bd+c2+ex+c3+b.slice(28,35),o4=mpxCd(comp)===mpxDig(b[35])?1:0;r={kind:/^A|^R/.test(a.slice(0,2))?'A':'I',land:a.slice(2,5).replace(/</g,''),...mpxNames(a.slice(5)),num:num.replace(/</g,''),birth:mpxYmd(bd),valid:mpxYmd(ex,1),checks:o1+o2+o3+o4,of:4}}}
 r.ok=r.checks===r.of;return r}
async function mpxMrzOcr(d){const Ts=await WY(),base=new URL('lib/ocr/',location.href).href,pages=(d.pages||[]).slice(0,3),out=[];
 const w=await Ts.createWorker('eng',1,{workerPath:base+'worker.min.js',corePath:base,langPath:base.replace(/\/$/,''),gzip:!1,cacheMethod:'none',workerBlobURL:!1});
 try{await w.setParameters({tessedit_char_whitelist:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',tessedit_pageseg_mode:'6'});
  for(const p of pages){const u=await Ds(p);if(!u)continue;const im=await z1(u),W=im.naturalWidth||im.width,Hh=im.naturalHeight||im.height,y0=Math.round(Hh*.55),k=Math.min(2,1600/W),cv=document.createElement('canvas');
   cv.width=Math.round(W*k);cv.height=Math.round((Hh-y0)*k);const c=cv.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,cv.width,cv.height);c.filter='grayscale(1) contrast(1.6)';c.drawImage(im,0,y0,W,Hh-y0,0,0,cv.width,cv.height);
   const rr=await w.recognize(cv);cv.width=cv.height=0;const t=rr&&rr.data&&rr.data.text||'';const P=mpxParse(t);if(P){out.push(P);if(P.ok)break}}}finally{try{await w.terminate()}catch{}}
 out.sort((a,b)=>b.checks-a.checks);return out[0]||null}
let mpxMrzRes={};
function mpxRecHtml(d){const up=!!((d.pages||[]).length||(d.files||[]).length),rec=!!(d.dtype&&d.dtype!=='free'&&(d.f&&(d.f.number||d.f.valid||d.f.issued)||d.hasText)),mrzOn=MPX_MRZ_DT.includes(d.dtype),mz=d.mrz&&d.mrz.ok;
 const chip=(on,k,off)=>`<span class="mpxst ${on?'on':off?'off':''}">${i(mpxT(k))}${on?' ✓':''}</span>`;
 const R0=mpxMrzRes[d.id];let body='';
 if(R0==='busy')body=`<p class="mpxsh">⏳ ${i(mpxT('mrzBusy'))}</p>`;else if(R0==='none')body=`<p class="mpxsh">${i(mpxT('mrzNo'))}</p>`;
 else if(R0&&typeof R0==='object'){const r=R0;body=`<p class="mpxsh ${r.ok?'okt':'wat'}">${i(r.ok?mpxT('mrzOk'):mpxT('mrzBad',{a:r.checks,b:r.of}))}</p>
  <div class="mpxkv"><span>${i(mpxT('f_name'))}</span><b>${i([r.last,r.first].filter(Boolean).join(', ')||'—')}</b></div><div class="mpxkv"><span>${i(mpxT('f_num'))}</span><b>${i(r.num||'—')}</b></div>
  <div class="mpxkv"><span>${i(mpxT('f_birth'))}</span><b>${r.birth?i(je(r.birth)):'—'}</b></div><div class="mpxkv"><span>${i(mpxT('f_valid'))}</span><b>${r.valid?i(je(r.valid)):'—'}</b></div><div class="mpxkv"><span>${i(mpxT('f_land'))}</span><b>${i(r.land||'—')} · ${i(mpxT('k_'+r.kind))}</b></div>
  <button type="button" class="dcadd gold" data-act="mpxtake" data-id="${i(d.id)}">${i(mpxT('take'))}</button>`}
 const inM=mpxD().list.filter(M=>mpxOrder(M).includes(d.id)),sug=mpxD().list.filter(M=>!inM.includes(M)&&mpxSlots(M).some(s=>!M.skip[s.k]&&mpxFits(s,d)&&mpxPicked(M,s).length<(s.n||1)));
 const mp=inM.length||sug.length?`<div class="lnqchips mpxin">${inM.map(M=>`<button type="button" class="lnqchip" data-act="mpxopen" data-id="${i(M.id)}">📁 ${i(mpxName(M))}</button>`).join('')}${sug.map(M=>`<button type="button" class="lnqchip add" data-act="mpxaddto" data-m="${i(M.id)}" data-id="${i(d.id)}">${i(mpxT('addTo',{n:mpxName(M)}))}</button>`).join('')}</div>`:'';
 if(!up&&!mp)return'';
 return`<div class="dhcard mpxrec"><h5>${i(mpxT('recT'))}</h5><div class="mpxsts">${chip(up,'st_up')}${chip(rec||mz,'st_rec')}${mrzOn?chip(mz,'st_mrz'):''}${mrzOn?cpxStatusHtml(d):''}</div>
  ${mrzOn&&up&&(d.pages||[]).length&&R0!=='busy'&&!(R0&&typeof R0==='object')?`<button type="button" class="mpxmrz" data-act="mpxmrz" data-id="${i(d.id)}">${i(mpxT('mrzBtn'))}</button>`:''}${body}
  ${mrzOn&&!cpxPlug()?`<small class="lnqx">${i(mpxT('mrzNote'))}</small>`:''}${mrzOn?cpxBodyHtml(d):''}${mp?`<h5 style="margin-top:12px">${i(mpxT('inMappe'))}</h5>${mp}`:''}</div>`}
function mpxRecPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.mpxrec'))return;const d=mpxDoc(m.bdid);if(!d)return;const h=mpxRecHtml(d);if(!h)return;
 const ln=sc.querySelector('.lnqcard:not(.mpxrec)');if(ln){ln.insertAdjacentHTML('beforebegin',h);return}let pb=sc.querySelector('[data-act=dzprint]');while(pb&&pb.parentElement&&pb.parentElement!==sc)pb=pb.parentElement;
 if(pb&&pb.parentElement===sc){const hr=pb.previousElementSibling&&pb.previousElementSibling.tagName==='HR'?pb.previousElementSibling:pb;hr.insertAdjacentHTML('beforebegin',h)}else sc.insertAdjacentHTML('beforeend',h)}catch(er){Hooks.err('mpxrec',er)}}
const mpxRecRe=()=>{document.querySelectorAll('.mpxrec').forEach(z=>z.remove());mpxRecPut()};
/* --- wiring --- */
['mpx','mpxd'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='mpx')return mpxListScreen();if(m.route==='mpxd')return mpxDetailScreen()}catch(e){Hooks.err('mpxscreen',e)}});
Hooks.on('screen',h=>{try{if(m.route!=='archive'||typeof h!=='string'||h.includes('mpxrow'))return h;const row=`<button type="button" class="dcrow fzonerow mpxrow" data-act="mpxgo"><span class="fzonei">🗂</span><span><b>${i(mpxT('title'))}</b><small>${i(mpxT('rowS'))}</small></span><span class="fzonea">›</span></button>`;
 const k=h.indexOf('<button type="button" class="dcrow fzonerow"');return k>=0?h.slice(0,k)+row+h.slice(k):h}catch(e){Hooks.err('mpxrow',e);return h}});
Hooks.on('render',()=>{mpxRecPut();setTimeout(mpxRecPut,0);setTimeout(mpxRecPut,380)});
Hooks.act('mpxgo',()=>R('mpx'));Hooks.act('mpxback',()=>R('archive',void 0,!0));Hooks.act('mpxlist',()=>R('mpx',void 0,!0));
Hooks.act('mpxopen',d=>{mpxCur=d.id;R('mpxd')});Hooks.act('mpxnew',d=>mpxNew(d.t||''));
Hooks.act('mpxslot',d=>{const M=mpxD().list.find(z=>z.id===mpxCur),s=M&&mpxSlots(M).find(z=>z.k===d.k);s&&mpxPickSheet(M,s)});
Hooks.act('mpxextra',()=>{const M=mpxD().list.find(z=>z.id===mpxCur);M&&mpxPickSheet(M,null)});
Hooks.act('mpxxrm',d=>{const M=mpxD().list.find(z=>z.id===mpxCur);if(!M)return;M.extra=M.extra.filter(z=>z!==d.id);mpxSave();v()});
Hooks.act('mpxord',()=>{const M=mpxD().list.find(z=>z.id===mpxCur);M&&mpxOrdSheet(M)});Hooks.act('mpxren',()=>{const M=mpxD().list.find(z=>z.id===mpxCur);M&&mpxRenSheet(M)});
Hooks.act('mpxpdf',()=>{const M=mpxD().list.find(z=>z.id===mpxCur);M&&mpxPdfSheet(M)});
let mpxDelArm=0;Hooks.act('mpxdel',()=>{const D=mpxD(),M=D.list.find(z=>z.id===mpxCur);if(!M)return;if(Date.now()-mpxDelArm>4000){mpxDelArm=Date.now();T(mpxT('delQ'));return}mpxDelArm=0;D.list=D.list.filter(z=>z!==M);mpxSave();T(mpxT('delOk'));R('mpx',void 0,!0)});
Hooks.act('mpxaddto',d=>{const M=mpxD().list.find(z=>z.id===d.m),doc=mpxDoc(d.id);if(!M||!doc)return;const s=mpxSlots(M).find(z=>!M.skip[z.k]&&mpxFits(z,doc)&&mpxPicked(M,z).length<(z.n||1));
 if(s){const P=mpxPicked(M,s).map(z=>z.id);if(!P.includes(doc.id))P.unshift(doc.id);M.pk[s.k]=P.slice(0,Math.max(s.n||1,P.length))}else if(!M.extra.includes(doc.id))M.extra.push(doc.id);mpxSave();T(mpxT('added',{n:mpxName(M)}));mpxRecRe()});
Hooks.act('mpxmrz',async d=>{const doc=mpxDoc(d.id);if(!doc)return;mpxMrzRes[doc.id]='busy';mpxRecRe();let r=null;try{r=await mpxMrzOcr(doc)}catch(e){Hooks.err('mpxmrz',e)}
 mpxMrzRes[doc.id]=r||'none';if(r&&r.ok){doc.mrz={ok:1,t:Date.now(),birth:r.birth,num:r.num,valid:r.valid};mpxSave()}if(m.route==='bdoc'&&m.bdid===doc.id)mpxRecRe()});
Hooks.act('mpxtake',d=>{const doc=mpxDoc(d.id),r=mpxMrzRes[d.id];if(!doc||!r||typeof r!=='object')return;doc.f=doc.f||{};if(r.num&&!doc.f.number)doc.f.number=r.num;if(r.valid&&!doc.f.valid){doc.f.valid=r.valid;doc.end=r.valid}
 if(!doc.dtype||doc.dtype==='free')doc.dtype=r.kind==='P'?'passport':r.kind==='A'?'residence':'id';if(r.ok)doc.mrz={ok:1,t:Date.now(),birth:r.birth,num:r.num,valid:r.valid};mpxSave();T(mpxT('taken'));v()});
Hooks.css('docs-mappen',`
.mpx .odh{margin:16px 4px 8px}.mpxc{display:block!important;width:100%;text-align:left;margin:0 0 10px!important;padding:14px 16px!important}.mpxct{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.mpxct b{font-size:16px}.mpxct em{font-style:normal;font-size:13px;color:#b7791f;white-space:nowrap}.mpxct em.ok{color:#2f6b3e}
.mpxc small{display:block;color:var(--muted);font-size:12.5px;margin-top:3px}.mpxbar{display:block;height:5px;border-radius:4px;background:var(--line,#e3d6bc);margin-top:9px;overflow:hidden}.mpxbar i{display:block;height:100%;background:#2f6b3e;border-radius:4px}
.mpxtpl{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mpxt{display:block!important;text-align:left;margin:0!important;padding:12px!important;min-height:96px}.mpxt .e{font-size:22px;display:block}.mpxt b{display:block;font-size:14.5px;margin-top:4px;line-height:1.2}.mpxt small{color:var(--muted);font-size:12px}
.mpxnote{color:var(--muted);font-size:12.5px;margin:12px 4px;line-height:1.4}
.mpxhero{display:flex;gap:16px;align-items:center;background:#173d2c;color:#f3ebda;border-radius:20px;padding:16px 18px;margin:6px 0 14px}.mpxhero b{display:block;font-size:18px}.mpxhero small{display:block;opacity:.82;font-size:13px;line-height:1.35;margin-top:3px}
.mpxring{width:72px;height:72px;flex:none;border-radius:50%;background:conic-gradient(#d2b272 var(--p),rgba(255,255,255,.16) 0);display:flex;align-items:center;justify-content:center}.mpxring i{width:56px;height:56px;border-radius:50%;background:#173d2c;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:700;font-size:18px}
.mpxrows{padding:4px 14px!important}.mpxr{display:flex;align-items:center;gap:11px;width:100%;text-align:left;background:none;border:0;border-bottom:1px solid rgba(0,0,0,.07);padding:11px 0;color:inherit;font:inherit}.mpxr:last-of-type{border-bottom:0}
.mpxr .st{width:27px;height:27px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;background:#2f7d4f}.mpxr.wa .st{background:#c98a1b}.mpxr.no .st{background:#fff;color:#b08a45;border:1.5px dashed #b08a45}.mpxr.sk .st{background:#e7e1d3;color:#8a826f}
.mpxr .t{flex:1;min-width:0}.mpxr b{display:block;font-size:15px;font-weight:600}.mpxr small{display:block;color:var(--muted);font-size:12.5px;margin-top:1px;overflow-wrap:anywhere}.mpxr small.w{color:#b7791f}.mpxr .ch{color:#b9ae97;font-size:20px}.mpxx{background:none;border:0;color:var(--muted);font-size:22px;padding:0 4px}
.mpxadd{display:block;width:100%;background:none;border:0;border-top:1px solid rgba(0,0,0,.07);color:#2f6b3e;font-weight:600;font-size:14.5px;padding:12px 0;text-align:left}
.mpxpdf{margin:14px 0 8px!important}.mpx2{display:flex;gap:8px}.mpxb2{flex:1;border:1px solid #b08a45;background:none;color:inherit;border-radius:14px;padding:11px;font:inherit;font-size:14px}
.mpxdel{display:block;margin:18px auto 6px;background:none;border:0;color:#a5402f;font-size:13.5px;text-decoration:underline}
.mpxsh{color:var(--muted);font-size:13.5px;margin:0 0 8px;line-height:1.4}.mpxsh.okt{color:#2f6b3e}.mpxsh.wat{color:#b7791f}.mpxh5{margin:6px 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.mpxall summary{cursor:pointer;color:#2f6b3e;font-weight:600;font-size:14px;margin:10px 0 4px}.mpxo{display:flex;align-items:center;gap:6px;background:#fff;border-radius:12px;padding:9px 10px;margin:6px 0}.mpxo span{flex:1;font-size:14px}.mpxo button{width:38px;height:34px;border:1px solid #cfdcc9;border-radius:10px;background:#f3f8f1;font-size:16px}.mpxo button:disabled{opacity:.3}
.mpxwarn{background:#fff4df;border-radius:12px;padding:9px 12px;color:#8a5a12;font-size:13.5px;margin:0 0 10px}.mpxlist{margin:6px 0 10px 20px;font-size:13.5px;color:var(--muted)}.mpxlist li{margin:2px 0}
.mpxrec{font-family:-apple-system,Inter,Helvetica,Arial,sans-serif;margin:14px 0!important}.mpxrec h5{margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.mpxsts{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 10px}.mpxst{font-size:12px;padding:5px 9px;border-radius:10px;background:#ece6d8;color:#8a826f}.mpxst.on{background:#2f7d4f;color:#fff}.mpxst.off{background:none;border:1px dashed #c9bb9c}
.mpxmrz{display:block;width:100%;border:1px solid #b08a45;background:none;border-radius:12px;padding:10px;font:inherit;font-size:14px;color:inherit;margin:0 0 8px}
.mpxkv{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.06);font-size:14px}.mpxkv span{color:var(--muted)}.mpxkv b{font-weight:600;text-align:right}
`);
