/* ===== Butler Docs: Behörden & Services (stage 1) =====
   The user's own list of offices and services: police, Bürgeramt, Finanzamt, doctors, clubs … — only what he uses.
   It takes the place of the «Aufgaben» tile on home (tasks stay in the calendar and in the bottom bar).
   - g.bsv = {items, grp (group order), ppl (for whom), nf (own emergency data), setup, plz}
   - an entry: {id, n, e (emoji), grp, who[], tel, mail, addr, hrs, term (Termin link), links[{t,u}], nums[{id,t,v|x,m,s}], pin, home, note, src, chk}
   - booking always happens on the office's own site — the app only keeps the right link at hand.
   - «secret» numbers are masked; once the vault has a code they are encrypted with the vault key (AES-GCM)
     and are shown only after the vault code. vault.js calls bsvSecIn / bsvSecOut when the code is set or removed.
   - the prefilled addresses (63741 Aschaffenburg) are marked «bitte prüfen»: offices move and change hours. */
const bsvS={
 t:['Ведомства и службы','Behörden & Services','Offices & services'],
 tS:['Термины, номера, ссылки','Termine, Nummern, Links','Appointments, numbers, links'],
 ord:['Порядок','Ordnen','Order'],done:['Готово','Fertig','Done'],
 add:['Добавить','Hinzufügen','Add'],addQ:['Что добавить?','Was hinzufügen?','What to add?'],
 own:['Создать своё','Eigenes anlegen','Create your own'],ownS:['Любая служба, врач, клуб — со своими ссылками и кнопками','Jede Stelle, Arzt, Verein – mit eigenen Links und Knöpfen','Any office, doctor or club – with your own links and buttons'],
 pinned:['Закреплённые','Angeheftet','Pinned'],all:['Все','Alle','All'],
 empty:['Здесь будут Ваши ведомства и службы. Добавьте только то, чем пользуетесь.','Hier stehen Ihre Behörden und Dienste. Fügen Sie nur hinzu, was Sie nutzen.','Your offices and services go here. Add only what you use.'],
 nfT:['Экстренно','Notfall','Emergency'],p110:['Полиция','Polizei','Police'],p112:['Пожар · скорая','Feuer · Rettung','Fire · ambulance'],p116:['Дежурный врач','Bereitschaftsarzt','Doctor on call'],
 nfMy:['Мои экстренные данные','Meine Notfalldaten','My emergency data'],
 nfSay:['Что сказать по телефону','Was sage ich am Telefon?','What to say on the phone'],
 nf5:['Где? — адрес, этаж · Что случилось? · Сколько пострадавших? · Кто звонит? · Ждите вопросов, не кладите трубку.','Wo? – Adresse, Etage · Was ist passiert? · Wie viele Verletzte? · Wer ruft an? · Warten auf Rückfragen – nicht auflegen.','Where? – address, floor · What happened? · How many hurt? · Who is calling? · Wait for questions – don’t hang up.'],
 nfAddr:['Мой адрес','Meine Adresse','My address'],nfBlood:['Группа крови','Blutgruppe','Blood type'],nfAll:['Аллергии','Allergien','Allergies'],nfMed:['Лекарства','Medikamente','Medication'],nfIce:['Кому сообщить','Notfallkontakt','Emergency contact'],nfIceT:['Его телефон','Telefon des Kontakts','Contact’s phone'],
 nfNone:['Заполните заранее — в беде некогда вспоминать.','Füllen Sie das vorher aus – im Notfall fehlt die Zeit.','Fill this in now – there is no time in an emergency.'],
 b115:['115 — единый номер ведомств: подскажут, какое ведомство Вам нужно','115 – Behördennummer: sagt Ihnen, welches Amt zuständig ist','115 – the public-service number: tells you which office is in charge'],
 open:['Открыто до %t','Geöffnet bis %t','Open until %t'],closed:['Закрыто','Geschlossen','Closed'],opens:['откроется %d %t','öffnet %d %t','opens %d %t'],today:['сегодня','heute','today'],tom:['завтра','morgen','tomorrow'],
 dn:['Пн Вт Ср Чт Пт Сб Вс','Mo Di Mi Do Fr Sa So','Mon Tue Wed Thu Fri Sat Sun'],
 term:['Термин','Termin','Appointment'],call:['Позвонить','Anrufen','Call'],mail:['Написать','E-Mail','Email'],route:['Маршрут','Route','Route'],
 nums:['Мои номера','Meine Nummern','My numbers'],copy:['Копировать','Kopieren','Copy'],copied:['Скопировано','Kopiert','Copied'],show:['Показать','Zeigen','Show'],
 secret:['секретный — в сейфе','geheim – im Tresor','secret – in the vault'],secNo:['Номер скрыт. Поставьте код сейфа — тогда он будет зашифрован.','Die Nummer ist verdeckt. Mit einem Tresor-Code wird sie verschlüsselt.','The number is masked. With a vault code it is encrypted.'],
 addr:['Адрес','Adresse','Address'],hrs:['Часы работы','Öffnungszeiten','Opening hours'],note:['Заметка','Notiz','Note'],
 chk:['Данные заполнены заранее — пожалуйста, проверьте: адреса и часы меняются.','Vorausgefüllt – bitte prüfen: Adressen und Zeiten ändern sich.','Prefilled – please check: addresses and hours change.'],
 chkOk:['Проверено','Geprüft','Checked'],
 edit:['Изменить','Bearbeiten','Edit'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],deleted:['Удалено','Gelöscht','Deleted'],
 nm:['Название','Name','Name'],nmPh:['Напр. Ausländerbehörde','z. B. Ausländerbehörde','e.g. Ausländerbehörde'],sym:['Значок','Symbol','Symbol'],grp:['Группа','Gruppe','Group'],newG:['Новая группа','Neue Gruppe','New group'],
 who:['Для кого','Für wen','For whom'],tel:['Телефон','Telefon','Phone'],em:['E-mail','E-Mail','Email'],
 hrsPh:['Mo–Fr 8–12, Do 14–18','Mo–Fr 8–12, Do 14–18','Mon–Fri 8–12, Thu 14–18'],
 termL:['Ссылка на запись (Termin)','Link zur Terminbuchung','Booking link'],termS:['Запись всегда на сайте ведомства — здесь только ссылка.','Gebucht wird immer auf der Seite des Amts – hier liegt nur der Link.','Booking always happens on the office’s site – this is only the link.'],
 paste:['Вставить','Einfügen','Paste'],pasteNo:['Не удалось вставить — удержите поле и нажмите «Вставить»','Einfügen nicht möglich – Feld gedrückt halten und „Einfügen“','Could not paste – hold the field and choose “Paste”'],
 btns:['Кнопки и ссылки','Knöpfe und Links','Buttons and links'],btnAdd:['＋ свою кнопку','＋ eigener Knopf','＋ own button'],btnT:['Надпись','Beschriftung','Label'],btnU:['Ссылка, телефон или e-mail','Link, Telefon oder E-Mail','Link, phone or email'],
 numAdd:['＋ номер','＋ Nummer','＋ number'],numT:['Что за номер','Wofür','What it is'],numV:['Номер','Nummer','Number'],numS:['секретный','geheim','secret'],
 numEx:['Steuer-ID, Kundennummer, Aktenzeichen …','Steuer-ID, Kundennummer, Aktenzeichen …','Tax ID, customer number, file reference …'],
 pin:['Закрепить наверху','Oben anheften','Pin to top'],home:['На главную','Auf die Startseite','On the home screen'],
 save:['Сохранить','Speichern','Save'],cancel:['Отмена','Abbrechen','Cancel'],saved:['Сохранено','Gespeichert','Saved'],
 needN:['Впишите название','Bitte einen Namen eingeben','Please enter a name'],badU:['Эта ссылка не подходит','Dieser Link passt nicht','This link is not valid'],
 added:['Добавлено — проверьте данные','Hinzugefügt – bitte Angaben prüfen','Added – please check the details'],has:['уже есть','schon da','added'],
 g_nf:['Экстренно','Notfall','Emergency'],g_amt:['Ведомства','Behörden','Offices'],g_med:['Здоровье','Gesundheit','Health'],g_fam:['Семья и школа','Familie & Schule','Family & school'],g_ver:['Клубы и прочее','Vereine & Sonstiges','Clubs & more'],
 me:['Я','Ich','Me'],sp:['Супруга','Ehefrau','Wife'],kid:['Ребёнок','Kind','Child'],newP:['Имя','Name','Name'],
 wz:['Настройка','Einrichten','Set up'],wzGo:['Настроить за минуту','In einer Minute einrichten','Set up in a minute'],
 wz1:['Где Вы живёте?','Wo wohnen Sie?','Where do you live?'],wz1S:['Индекс или город — по нему подставлю адреса ведомств (пока точно — для 63741 Aschaffenburg).','PLZ oder Ort – danach fülle ich Adressen vor (genau bisher für 63741 Aschaffenburg).','Postcode or town – used to prefill addresses (exact so far for 63741 Aschaffenburg).'],
 wz2:['Для кого вести?','Für wen?','For whom?'],wz2S:['Ведомства у каждого свои — потом можно отметить, чьё это.','Jeder hat eigene Ämter – später lässt sich markieren, für wen.','Each person has their own offices – you can mark whose later.'],
 wz3:['Что Вам нужно?','Was brauchen Sie?','What do you need?'],wz3S:['Отметьте нужное. Остальное можно добавить потом.','Wählen Sie aus. Den Rest können Sie später hinzufügen.','Pick what you need. Add the rest later.'],
 next:['Дальше','Weiter','Next'],back:['Назад','Zurück','Back'],skip:['Пропустить','Überspringen','Skip'],wzDone:['Готово: добавлено %n','Fertig: %n hinzugefügt','Done: %n added'],
 here:['Здесь','Hier','Here']};
const bsvt=(k,o)=>{let s=cv5n(bsvS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};

/* --- data --- */
const bsvD=()=>{const o=g.bsv=g.bsv&&typeof g.bsv==='object'?g.bsv:{};if(!Array.isArray(o.items))o.items=[];if(!Array.isArray(o.grp))o.grp=['nf','amt','med','fam','ver'];
 if(!Array.isArray(o.ppl)||!o.ppl.length)o.ppl=[bsvt('me')];if(!o.nf||typeof o.nf!=='object')o.nf={};return o};
const bsvGL=k=>String(k||'').startsWith('c:')?String(k).slice(2):bsvS['g_'+k]?bsvt('g_'+k):String(k||'');
const bsvGet=id=>bsvD().items.find(x=>x.id===id);
const bsvId=()=>'bs'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const bsvTel=s=>'tel:'+String(s||'').replace(/[^\d+*#]/g,'');
function bsvUrl(u){u=String(u||'').trim();if(!u)return'';if(/^(https?:\/\/|tel:|mailto:)/i.test(u))return/^https?:\/\/[^\s]+$|^tel:[\d+*#]+$|^mailto:[^\s]+$/i.test(u)?u:'';
 if(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(u))return'mailto:'+u;if(/^\+?[\d\s\/().-]{3,}$/.test(u))return'tel:'+u.replace(/[^\d+]/g,'');
 if(/^[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(u))return'https://'+u;return''}
const bsvMap=a=>'https://maps.apple.com/?daddr='+encodeURIComponent(a);

/* --- opening hours: «Mo–Mi 8:30–13, Do 8:30–17, Fr 8:30–12» → is it open now? --- */
const BSV_DAY={mo:0,montag:0,mon:0,monday:0,'пн':0,di:1,dienstag:1,tue:1,tues:1,tuesday:1,'вт':1,mi:2,mittwoch:2,wed:2,wednesday:2,'ср':2,
 do:3,donnerstag:3,thu:3,thursday:3,'чт':3,fr:4,freitag:4,fri:4,friday:4,'пт':4,sa:5,samstag:5,sat:5,saturday:5,'сб':5,so:6,sonntag:6,sun:6,sunday:6,'вс':6};
const BSV_DW=Object.keys(BSV_DAY).sort((a,b)=>b.length-a.length).join('|');
const BSV_RX=new RegExp(`(?:^|[^a-zа-яё])(${BSV_DW}|täglich|daily|ежедневно)(?![a-zа-яё])\\.?(?:\\s*[-–—]\\s*(${BSV_DW})(?![a-zа-яё])\\.?)?|(\\d{1,2})(?:[:.](\\d{2}))?\\s*(?:uhr|h)?\\s*[-–—]\\s*(\\d{1,2})(?:[:.](\\d{2}))?`,'gi');
function bsvHours(s){const W=[[],[],[],[],[],[],[]];let cur=[],fresh=!1,any=!1;const t=String(s||'').toLowerCase();BSV_RX.lastIndex=0;let x;
 while((x=BSV_RX.exec(t))){if(x[1]){const a=x[1];let ds;if(/täglich|daily|ежедневно/.test(a))ds=[0,1,2,3,4,5,6];else{const p=BSV_DAY[a],q=x[2]!=null?BSV_DAY[x[2]]:p;ds=[];for(let k=p;;k=(k+1)%7){ds.push(k);if(k===q||ds.length>7)break}}
   if(fresh){cur=[];fresh=!1}cur=cur.concat(ds)}
  else{const f=+x[3]*60+(+x[4]||0),e=+x[5]*60+(+x[6]||0);if(e>f&&f<1440&&e<=1440&&cur.length){cur.forEach(d=>W[d].push([f,e]));any=!0}fresh=!0}}
 return any?W:null}
const bsvHM=n=>Math.floor(n/60)+':'+String(n%60).padStart(2,'0');
function bsvNow(s,at){const W=bsvHours(s);if(!W)return null;const d=at||new Date(),wd=(d.getDay()+6)%7,mn=d.getHours()*60+d.getMinutes();
 const r=W[wd].find(([f,e])=>mn>=f&&mn<e);if(r)return{open:!0,txt:bsvt('open',{t:bsvHM(r[1])})};
 const dn=bsvt('dn').split(' ');for(let k=0;k<7;k++){const dd=(wd+k)%7,nx=W[dd].filter(([f])=>k>0||f>mn).sort((a,b)=>a[0]-b[0])[0];
  if(nx)return{open:!1,txt:bsvt('closed')+' · '+bsvt('opens',{d:k===0?bsvt('today'):k===1?bsvt('tom'):dn[dd],t:bsvHM(nx[0])})}}
 return{open:!1,txt:bsvt('closed')}}

/* --- catalog (local data only where it was checked: 63741 Aschaffenburg, marked «bitte prüfen») --- */
const BSV_C=[
 ['nf','gift',{n:'Giftnotruf (Bayern)',e:'🧪',tel:'089 19240'}],['nf','sperr',{n:'Sperr-Notruf (Karten, Online-Banking)',e:'💳',tel:'116 116'}],
 ['nf','seel',{n:'Telefonseelsorge',e:'📞',tel:'0800 111 0 111'}],['nf','b115',{n:'Behördennummer 115',e:'☎️',tel:'115'}],
 ['amt','buerger',{n:'Bürgeramt',e:'🏛️'}],['amt','ausl',{n:'Ausländerbehörde',e:'🛂'}],['amt','fa',{n:'Finanzamt',e:'🧾',term:'https://www.elster.de/eportal/uebersichtservicezentren'}],
 ['amt','jc',{n:'Jobcenter',e:'💼',links:[{t:'jobcenter.digital',u:'https://www.jobcenter.digital'}]}],['amt','aa',{n:'Agentur für Arbeit',e:'🧑‍💼',tel:'0800 4 5555 00',term:'https://www.arbeitsagentur.de/eservices'}],
 ['amt','kfz',{n:'Kfz-Zulassung',e:'🚗'}],['amt','ord',{n:'Ordnungs- & Straßenverkehrsamt',e:'🚦'}],['amt','ag',{n:'Amtsgericht',e:'⚖️'}],
 ['amt','fk',{n:'Familienkasse',e:'👨‍👩‍👧',tel:'0800 4 5555 30',links:[{t:'Familienkasse online',u:'https://www.arbeitsagentur.de/familie-und-kinder'}]}],
 ['amt','drv',{n:'Deutsche Rentenversicherung',e:'📮',tel:'0800 1000 4800',term:'https://www.deutsche-rentenversicherung.de'}],
 ['amt','pol',{n:'Polizeiinspektion',e:'👮'}],
 ['med','kk',{n:'Krankenkasse',e:'🏥'}],['med','arzt',{n:'Hausarzt',e:'🩺',links:[{t:'116117 Termin',u:'https://www.116117.de'}]}],['med','zahn',{n:'Zahnarzt',e:'🦷'}],
 ['fam','schule',{n:'Schule / Kita',e:'🏫'}],['ver','verein',{n:'Verein',e:'⚽'}]];
const BSV_AB={buerger:{n:'Bürgeramt Aschaffenburg',addr:'Dalbergstraße 15, 63739 Aschaffenburg',tel:'06021 330555',mail:'buergeramt@aschaffenburg.de',hrs:'Mo–Do 8–16, Fr 8–13',term:'https://www.aschaffenburg.de'},
 ausl:{n:'Ausländerbehörde Aschaffenburg',addr:'Dalbergstraße 15, 63739 Aschaffenburg',tel:'06021 330-0',hrs:'Mo–Do 8–16, Fr 8–13',links:[{t:'Online-Antrag Aufenthaltstitel',u:'https://www.bayernportal.de/dokumente/onlineverfahren/8198924057163'}]},
 fa:{n:'Finanzamt Aschaffenburg',addr:'Auhofstraße 13, 63741 Aschaffenburg',tel:'06021 492-0',hrs:'Mo–Mi 8:30–13, Do 8:30–17, Fr 8:30–12'},
 jc:{n:'Jobcenter Stadt Aschaffenburg',tel:'06021 390800',mail:'Jobcenter-Aschaffenburg@jobcenter-ge.de'},
 aa:{n:'Agentur für Arbeit Aschaffenburg',addr:'Memeler Straße 15, 63739 Aschaffenburg'},
 kfz:{n:'Kfz-Zulassung Aschaffenburg',tel:'06021 330-0',note:'Nur mit Termin'},
 ord:{n:'Ordnungs- & Straßenverkehrsamt Aschaffenburg',addr:'Wermbachstraße 30, 63739 Aschaffenburg',tel:'06021 330-1812'},
 ag:{n:'Amtsgericht Aschaffenburg',addr:'Erthalstraße 3, 63739 Aschaffenburg'}};
function bsvLocal(){try{const o=bsvD(),c=g.cityX||{};return/^637[34]\d|aschaffenburg/i.test(String(o.plz||'').trim())||(!o.plz&&(/^637[34]\d/.test(String(c.zip||''))||/aschaffenburg/i.test(String(c.name||''))))}catch{return!1}}
function bsvFrom(key){const c=BSV_C.find(x=>x[1]===key);if(!c)return null;const loc=bsvLocal()&&BSV_AB[key];
 const it=Object.assign({id:bsvId(),grp:c[0],src:key,who:[],links:[],nums:[],ts:Date.now()},JSON.parse(JSON.stringify(c[2])),loc?JSON.parse(JSON.stringify(loc)):{});
 if(loc&&c[2].links&&loc.links)it.links=c[2].links.concat(loc.links);if(loc)it.chk=1;return it}
const bsvHasSrc=k=>bsvD().items.some(x=>x.src===k);
function bsvAddSrc(key,open){if(bsvHasSrc(key))return null;const it=bsvFrom(key);if(!it)return null;const o=bsvD();o.items.push(it);if(!o.grp.includes(it.grp))o.grp.push(it.grp);$();if(open){bsvSel=it.id;R('bsvi');bsvToast(bsvt('added'))}return it}

/* --- secret numbers: masked; encrypted with the vault key once the vault has a code --- */
const bsvSecAll=()=>bsvD().items.flatMap(it=>(it.nums||[]).filter(n=>n&&n.s));
async function bsvSecIn(){try{if(typeof sfKey==='undefined'||!sfKey)return!1;for(const n of bsvSecAll())if(n.v!=null&&!n.x){const e=await sfEnc(sfKey,new TextEncoder().encode(String(n.v)));n.x=e;delete n.v}$();return!0}catch(e){Hooks.err('bsvsecin',e);return!1}}
async function bsvSecOut(){try{if(typeof sfKey==='undefined'||!sfKey)return!1;for(const n of bsvSecAll())if(n.x){n.v=new TextDecoder().decode(await sfDec(sfKey,n.x));delete n.x}$();return!0}catch(e){Hooks.err('bsvsecout',e);return!1}}
async function bsvSecVal(n){if(!n)return null;if(n.x){if(typeof sfKey==='undefined'||!sfKey)return null;return new TextDecoder().decode(await sfDec(sfKey,n.x))}return n.v!=null?String(n.v):null}
const bsvMask=n=>'•••• '+(n.m||'');
function bsvShow(id,nid){const it=bsvGet(id),n=it&&(it.nums||[]).find(z=>z.id===nid);if(!n)return;
 if(n.x&&!sfKey)return sfAsk(()=>bsvShow(id,nid));
 bsvSecVal(n).then(val=>{if(val==null)return bsvToast(bsvt('pasteNo'));sfLast=Date.now();
  H(n.t||bsvt('numV'),`<div class="bsvsec"><b class="bsvbig">${i(val)}</b>${!n.x?`<p class="vhint">${i(bsvt('secNo'))}</p>`:''}<button type="button" class="dcadd gold" data-bsvcp>${i(bsvt('copy'))}</button></div>`,
   el=>{el.querySelector('[data-bsvcp]').onclick=()=>{bsvCopy(val);el.remove()};setTimeout(()=>el.remove(),3e4)})}).catch(e=>{Hooks.err('bsvshow',e)})}

/* --- little helpers --- */
const bsvToast=t=>{try{document.querySelectorAll('.toast').forEach(x=>x.remove())}catch{}T(t,2400)};
function bsvCopy(s){const ok=()=>bsvToast(bsvt('copied')+' ✓');try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(String(s)).then(ok,()=>bsvCopy0(s,ok));return}}catch{}bsvCopy0(s,ok)}
function bsvCopy0(s,ok){try{const t=document.createElement('textarea');t.value=String(s);t.style.cssText='position:fixed;opacity:0;top:0';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();ok()}catch{}}
async function bsvPaste(inp){try{const t=await navigator.clipboard.readText();if(t==null)throw 0;inp.value=String(t).trim();inp.dispatchEvent(new Event('input',{bubbles:!0}))}catch{bsvToast(bsvt('pasteNo'))}}
const BSV_IC='<path d="M3 9.5L12 4l9 5.5"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20.5h17"/><circle cx="12" cy="7.6" r=".6"/>';
const bsvIco={tel:'<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 10h17M8 3v4M16 3v4M9 14.5l2 2 4-4"/>',mail:'<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
 map:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 star:'<path d="M12 3.8l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.4l-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7z"/>',edit:'<path d="M4 20h4l10.5-10.5-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
 up:'<path d="M6 14l6-6 6 6"/>',sort:'<path d="M8 4v16M4.5 7.5L8 4l3.5 3.5M16 20V4M12.5 16.5L16 20l3.5-3.5"/>',ok:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',down:'<path d="M6 10l6 6 6-6"/>',heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/><path d="M12 10v5M9.5 12.5h5"/>'};
const bsvi=(n,c)=>`<svg class="dhi${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true">${bsvIco[n]||''}</svg>`;
const bsvHdr=(t,back,right)=>`<div class="sub-hdr"><button class="iconbtn" data-act="${back}" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(t)}</h2></div>${right||'<span></span>'}</div>`;
const bsvRe=()=>{const s=document.scrollingElement||document.documentElement,y=s.scrollTop;v();requestAnimationFrame(()=>{s.scrollTop=y})};
/* move without leaving the form (or a deleted entry) behind in «back» */
const bsvGo=r=>{const h=m.hist||[];while(h.length&&['bsve',r].includes(h[h.length-1].route))h.pop();R(r,void 0,!0)};
let bsvSel=null,bsvEd=null,bsvOrd=0,bsvWho='',bsvDel=0;

/* --- the list --- */
function bsvRow(it){const st=it.hrs?bsvNow(it.hrs):null,sm=st?st.txt:[it.tel,it.addr].filter(Boolean)[0]||'';
 const mv=bsvOrd?`<span class="bsvmv"><button type="button" data-act="bsvmv" data-id="${i(it.id)}" data-d="-1" aria-label="up">${bsvi('up')}</button><button type="button" data-act="bsvmv" data-id="${i(it.id)}" data-d="1" aria-label="down">${bsvi('down')}</button></span>`
  :it.tel?`<a class="bsvq" href="${i(bsvTel(it.tel))}" aria-label="${i(bsvt('call'))}">${bsvi('tel')}</a>`:dhi('chev','sm');
 return`<div class="odr bsvrow"><button type="button" class="bsvhit" data-act="bsvopen" data-id="${i(it.id)}"><span class="bsvemo">${i(it.e||'🏛️')}</span><span><b>${i(it.n||'—')}${it.pin&&bsvOrd?' ★':''}</b>${sm?`<small class="${st?st.open?'on':'off':''}">${i(sm)}</small>`:''}</span></button>${mv}</div>`}
function bsvList(){const o=bsvD(),A=o.items.filter(it=>!bsvWho||!(it.who||[]).length||(it.who||[]).includes(bsvWho));
 const pin=bsvOrd?[]:A.filter(x=>x.pin),rest=bsvOrd?A:A.filter(x=>!x.pin);
 const grpK=[...o.grp,...rest.map(x=>x.grp).filter(k=>!o.grp.includes(k))].filter((k,j,a)=>a.indexOf(k)===j);
 const gs=grpK.map(k=>{const R2=rest.filter(x=>x.grp===k);if(!R2.length)return'';
  const mv=bsvOrd?`<span class="bsvmv"><button type="button" data-act="bsvgmv" data-k="${i(k)}" data-d="-1" aria-label="up">${bsvi('up')}</button><button type="button" data-act="bsvgmv" data-k="${i(k)}" data-d="1" aria-label="down">${bsvi('down')}</button></span>`:'';
  return`<h3 class="odh bsvgh"><span>${i(bsvGL(k))}</span>${mv}</h3><div class="dhcard odl">${R2.map(bsvRow).join('')}</div>`}).join('');
 const chips=o.ppl.length>1?`<div class="bsvchips">${['',...o.ppl].map(p=>`<button type="button" class="${bsvWho===p?'on':''}" data-act="bsvwho" data-p="${i(p)}">${i(p||bsvt('all'))}</button>`).join('')}</div>`:'';
 const nf=bsvOrd?'':`<div class="bsvnf"><a class="b110" href="tel:110"><b>110</b><small>${i(bsvt('p110'))}</small></a><a class="b112" href="tel:112"><b>112</b><small>${i(bsvt('p112'))}</small></a><a class="b116" href="tel:116117"><b>116 117</b><small>${i(bsvt('p116'))}</small></a></div>
  <button type="button" class="dhcard vline bsvmy" data-act="bsvnf">${bsvi('heart')}<span>${i(bsvt('nfMy'))}</span>${dhi('chev','sm')}</button>`;
 return`<div class="screen dhome bsv">${bsvHdr(bsvt('t'),'bsvback',o.items.length?`<button type="button" class="iconbtn bsvordb${bsvOrd?' on':''}" data-act="bsvord" aria-label="${i(bsvOrd?bsvt('done'):bsvt('ord'))}" title="${i(bsvOrd?bsvt('done'):bsvt('ord'))}">${bsvi(bsvOrd?'ok':'sort')}</button>`:'')}
 ${nf}${chips}
 ${pin.length?`<h3 class="odh">★ ${i(bsvt('pinned'))}</h3><div class="dhcard odl">${pin.map(bsvRow).join('')}</div>`:''}
 ${gs||(!pin.length?`<div class="dhcard"><p class="dhnone">${i(bsvt('empty'))}</p>${o.setup?'':`<button type="button" class="dcadd gold bsvwzb" data-act="bsvwz">${i(bsvt('wzGo'))}</button>`}</div>`:'')}
 ${bsvOrd?'':`<button type="button" class="dhcard odadd" data-act="bsvcat">${dhi('add')}<span>${i(bsvt('add'))}</span></button>
 <a class="dhcard bsv115" href="tel:115"><b>115</b><span>${i(bsvt('b115'))}</span>${bsvi('tel')}</a>`}</div>`}

/* --- one entry --- */
function bsvCard(it){const st=it.hrs?bsvNow(it.hrs):null,acts=[];
 if(it.term&&bsvUrl(it.term))acts.push(`<a class="bsvact main" href="${i(bsvUrl(it.term))}" target="_blank" rel="noopener">${bsvi('cal')}<span>${i(bsvt('term'))}</span></a>`);
 if(it.tel)acts.push(`<a class="bsvact" href="${i(bsvTel(it.tel))}">${bsvi('tel')}<span>${i(bsvt('call'))}</span></a>`);
 if(it.mail)acts.push(`<a class="bsvact" href="mailto:${i(it.mail)}">${bsvi('mail')}<span>${i(bsvt('mail'))}</span></a>`);
 if(it.addr)acts.push(`<a class="bsvact" href="${i(bsvMap(it.addr))}" target="_blank" rel="noopener">${bsvi('map')}<span>${i(bsvt('route'))}</span></a>`);
 const lk=(it.links||[]).map(l=>{const u=bsvUrl(l.u);return u?`<a class="bsvlink" href="${i(u)}" ${/^https?:/i.test(u)?'target="_blank" rel="noopener"':''}>${bsvi(/^tel:/.test(u)?'tel':/^mailto:/.test(u)?'mail':'link')}<span>${i(l.t||l.u)}</span></a>`:''}).join('');
 const nums=(it.nums||[]).map(n=>`<div class="bsvnum"><span><small>${i(n.t||bsvt('numV'))}${n.s?' · '+bsvi('lock','sm'):''}</small><b>${i(n.s?bsvMask(n):n.v||'')}</b></span>${n.s?`<button type="button" data-act="bsvshow" data-id="${i(it.id)}" data-n="${i(n.id)}">${i(bsvt('show'))}</button>`:`<button type="button" data-act="bsvcp" data-id="${i(it.id)}" data-n="${i(n.id)}">${bsvi('copy')}<span>${i(bsvt('copy'))}</span></button>`}</div>`).join('');
 return`<div class="screen dhome bsv bsvc">${bsvHdr(bsvt('t'),'bsvback',`<button type="button" class="iconbtn" data-act="bsvedit" data-id="${i(it.id)}" aria-label="${i(bsvt('edit'))}">${bsvi('edit')}</button>`)}
 <div class="bsvhd"><span class="bsvemo big">${i(it.e||'🏛️')}</span><h3>${i(it.n||'—')}</h3><p>${i(bsvGL(it.grp))}${(it.who||[]).length?' · '+i(it.who.join(', ')):''}</p>
  ${st?`<em class="bsvst ${st.open?'on':'off'}">${i(st.txt)}</em>`:''}
  <button type="button" class="bsvpin${it.pin?' on':''}" data-act="bsvpin" data-id="${i(it.id)}">${bsvi('star')}<span>${i(bsvt('pin'))}</span></button></div>
 ${it.chk?`<div class="dhcard bsvchk"><span>${i(bsvt('chk'))}</span><button type="button" data-act="bsvok" data-id="${i(it.id)}">${i(bsvt('chkOk'))}</button></div>`:''}
 ${acts.length?`<div class="bsvacts">${acts.join('')}</div>`:''}
 ${lk?`<div class="dhcard bsvlinks">${lk}</div>`:''}
 ${it.addr||it.hrs?`<div class="dhcard vkv bsvkv">${it.addr?`<div><small>${i(bsvt('addr'))}</small><b>${i(it.addr)}</b></div>`:''}${it.hrs?`<div><small>${i(bsvt('hrs'))}</small><b>${i(it.hrs)}</b></div>`:''}${it.tel?`<div><small>${i(bsvt('tel'))}</small><b>${i(it.tel)}</b></div>`:''}${it.mail?`<div><small>${i(bsvt('em'))}</small><b>${i(it.mail)}</b></div>`:''}</div>`:''}
 ${nums?`<h3 class="odh">${i(bsvt('nums'))}</h3><div class="dhcard bsvnums">${nums}</div>`:''}
 ${it.note?`<div class="dhcard"><small class="vlab">${i(bsvt('note'))}</small><p class="vnote">${i(it.note)}</p></div>`:''}
 <button type="button" class="bsvdel${bsvDel?' on':''}" data-act="bsvdel" data-id="${i(it.id)}">${i(bsvDel?bsvt('delQ'):bsvt('del'))}</button></div>`}

/* --- the form: one entry, own links and buttons, own numbers --- */
const BSV_EMO=['🏛️','🛂','🧾','💼','🚗','⚖️','👮','🚓','🚒','🚑','🩺','🦷','🏥','💊','🏫','⚽','🎵','⛪','🏦','📮','🔧','🏠','👨‍👩‍👧','🐾','📞','⭐','🕵️','🧪'];
function bsvNew(){return{id:'',n:'',e:'🏛️',grp:'amt',who:[],tel:'',mail:'',addr:'',hrs:'',term:'',links:[],nums:[],pin:!1,home:!1,note:''}}
function bsvForm(){const d=bsvEd,o=bsvD();const inp=(f,ph,t,v)=>`<input class="field" data-bf="${f}" type="${t||'text'}" placeholder="${i(ph||'')}" value="${i(v!=null?v:d[f]||'')}" autocomplete="off">`;
 const grps=[...o.grp,...(o.grp.includes(d.grp)?[]:[d.grp])];
 return`<div class="screen dhome bsv bsve">${bsvHdr(d.id?bsvt('edit'):bsvt('own'),'bsvback')}
 <label class="bsvl">${i(bsvt('nm'))}</label>${inp('n',bsvt('nmPh'))}
 <label class="bsvl">${i(bsvt('sym'))}</label><div class="bsvemos">${BSV_EMO.map(e=>`<button type="button" class="${d.e===e?'on':''}" data-act="bsvemo" data-e="${i(e)}">${e}</button>`).join('')}</div>
 <label class="bsvl">${i(bsvt('grp'))}</label><div class="bsvchips">${grps.map(k=>`<button type="button" class="${d.grp===k?'on':''}" data-act="bsvgrp" data-k="${i(k)}">${i(bsvGL(k))}</button>`).join('')}</div>
 <div class="bsvrowin">${inp('ng',bsvt('newG'),'text','')}<button type="button" class="bsvsm" data-act="bsvng">＋</button></div>
 <label class="bsvl">${i(bsvt('who'))}</label><div class="bsvchips">${o.ppl.map(p=>`<button type="button" class="${(d.who||[]).includes(p)?'on':''}" data-act="bsvwhoe" data-p="${i(p)}">${i(p)}</button>`).join('')}</div>
 <div class="bsvrowin">${inp('np',bsvt('newP'),'text','')}<button type="button" class="bsvsm" data-act="bsvnp">＋</button></div>
 <label class="bsvl">${i(bsvt('termL'))}</label><div class="bsvrowin">${inp('term','https://…','url')}<button type="button" class="bsvsm" data-act="bsvpaste" data-f="term">${i(bsvt('paste'))}</button></div><p class="vhint">${i(bsvt('termS'))}</p>
 <label class="bsvl">${i(bsvt('tel'))}</label>${inp('tel','06021 …','tel')}
 <label class="bsvl">${i(bsvt('em'))}</label>${inp('mail','name@…','email')}
 <label class="bsvl">${i(bsvt('addr'))}</label>${inp('addr','Straße 1, 12345 Ort')}
 <label class="bsvl">${i(bsvt('hrs'))}</label>${inp('hrs',bsvt('hrsPh'))}
 <label class="bsvl">${i(bsvt('btns'))}</label>
 ${(d.links||[]).map((l,j)=>`<div class="bsvlrow"><input class="field" data-bl="${j}" data-k="t" placeholder="${i(bsvt('btnT'))}" value="${i(l.t||'')}"><div class="bsvrowin"><input class="field" data-bl="${j}" data-k="u" placeholder="${i(bsvt('btnU'))}" value="${i(l.u||'')}"><button type="button" class="bsvsm" data-act="bsvpaste" data-l="${j}">${i(bsvt('paste'))}</button><button type="button" class="bsvsm x" data-act="bsvlrm" data-j="${j}" aria-label="${i(bsvt('del'))}">×</button></div></div>`).join('')}
 <button type="button" class="bsvplus" data-act="bsvladd">${i(bsvt('btnAdd'))}</button>
 <label class="bsvl">${i(bsvt('nums'))}</label><p class="vhint">${i(bsvt('numEx'))}</p>
 ${(d.nums||[]).map((n,j)=>`<div class="bsvlrow"><input class="field" data-bn="${j}" data-k="t" placeholder="${i(bsvt('numT'))}" value="${i(n.t||'')}"><div class="bsvrowin">${n.x?`<input class="field" disabled value="${i(bsvMask(n))}">`:`<input class="field" data-bn="${j}" data-k="v" placeholder="${i(bsvt('numV'))}" value="${i(n.v||'')}">`}<button type="button" class="bsvsm x" data-act="bsvnrm" data-j="${j}" aria-label="${i(bsvt('del'))}">×</button></div>
  <label class="bsvtog sm"><input type="checkbox" data-bn="${j}" data-k="s" ${n.s?'checked':''} ${n.x?'disabled':''}><span>${bsvi('lock','sm')} ${i(bsvt('numS'))}</span></label></div>`).join('')}
 <button type="button" class="bsvplus" data-act="bsvnadd">${i(bsvt('numAdd'))}</button>
 <label class="bsvl">${i(bsvt('note'))}</label><textarea class="field" data-bf="note" rows="3">${i(d.note||'')}</textarea>
 <label class="bsvtog"><input type="checkbox" data-bf="pin" ${d.pin?'checked':''}><span>★ ${i(bsvt('pin'))}</span></label>
 <label class="bsvtog"><input type="checkbox" data-bf="home" ${d.home?'checked':''}><span>⌂ ${i(bsvt('home'))}</span></label>
 <small class="verr" data-bsverr></small>
 <button type="button" class="dcadd gold" data-act="bsvsave">${i(bsvt('save'))}</button><button type="button" class="bsvcan" data-act="bsvback">${i(bsvt('cancel'))}</button></div>`}
/* every keystroke goes into the draft, so a redraw never loses what was typed */
document.addEventListener('input',e=>{const t=e.target;if(!bsvEd||m.route!=='bsve'||!t.closest||!t.closest('.bsve'))return;const d=bsvEd;
 if(t.dataset.bf){if(t.type==='checkbox')d[t.dataset.bf]=t.checked;else d[t.dataset.bf]=t.value}
 else if(t.dataset.bl!=null){const l=d.links[+t.dataset.bl];if(l)l[t.dataset.k]=t.value}
 else if(t.dataset.bn!=null){const n=d.nums[+t.dataset.bn];if(n)n[t.dataset.k]=t.type==='checkbox'?t.checked:t.value}},!0);
document.addEventListener('change',e=>{const t=e.target;if(t&&t.type==='checkbox'&&bsvEd&&m.route==='bsve'&&t.closest&&t.closest('.bsve'))t.dispatchEvent(new Event('input',{bubbles:!0}))},!0);
function bsvErr(k){const e=document.querySelector('[data-bsverr]');if(e)e.textContent=k?bsvt(k):''}
async function bsvSave(){const d=bsvEd;if(!d)return;d.n=String(d.n||'').trim();if(!d.n){bsvErr('needN');return}
 if(d.term&&!bsvUrl(d.term)){bsvErr('badU');return}
 d.links=(d.links||[]).map(l=>({t:String(l.t||'').trim(),u:String(l.u||'').trim()})).filter(l=>l.u);if(d.links.some(l=>!bsvUrl(l.u))){bsvErr('badU');return}
 d.nums=(d.nums||[]).filter(n=>n.x||String(n.v||'').trim()).map(n=>{if(!n.id)n.id=bsvId();if(n.v!=null){n.v=String(n.v).trim();n.m=n.v.slice(-2)}n.s=!!n.s;return n});
 const sec=d.nums.some(n=>n.s&&n.v!=null);if(sec&&sfHas()&&!sfKey)return sfAsk(()=>bsvSave());
 const o=bsvD();delete d.ng;delete d.np;['tel','mail','addr','hrs','term','note'].forEach(k=>{d[k]=String(d[k]||'').trim()});
 let it=d.id&&bsvGet(d.id);if(it)Object.assign(it,d);else{it=Object.assign(d,{id:bsvId(),ts:Date.now()});o.items.push(it)}
 if(!o.grp.includes(it.grp))o.grp.push(it.grp);
 if(sec&&sfHas()&&sfKey)await bsvSecIn();$();bsvEd=null;bsvSel=it.id;bsvToast(bsvt('saved')+' ✓');bsvGo('bsvi')}

/* --- catalog sheet --- */
function bsvCat(){const L2=g2=>BSV_C.filter(c=>c[0]===g2).map(([,k,d])=>{const has=bsvHasSrc(k),loc=bsvLocal()&&BSV_AB[k];
  return`<button type="button" class="odr" data-bsvk="${i(k)}" ${has?'disabled':''}><span class="bsvemo">${d.e}</span><span><b>${i(loc&&loc.n||d.n)}</b>${d.tel||loc?`<small>${i([d.tel||loc&&loc.tel,loc&&loc.addr].filter(Boolean).join(' · '))}</small>`:''}</span><em>${has?'✓ '+i(bsvt('has')):'＋'}</em></button>`}).join('');
 H(bsvt('addQ'),`<div class="bsvcat"><button type="button" class="dhcard vline" data-bsvown>${dhi('add')}<span><b>${i(bsvt('own'))}</b><small>${i(bsvt('ownS'))}</small></span></button>
  ${['nf','amt','med','fam','ver'].map(k=>`<h3 class="odh">${i(bsvGL(k))}</h3><div class="odl">${L2(k)}</div>`).join('')}</div>`,
  el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-bsvk]');if(b&&!b.disabled){el.remove();bsvAddSrc(b.dataset.bsvk,!0);return}
   if(e.target.closest('[data-bsvown]')){el.remove();bsvEd=bsvNew();R('bsve')}})})}

/* --- own emergency data --- */
function bsvNf(){const n=bsvD().nf,F=[['addr','nfAddr'],['blood','nfBlood'],['all','nfAll'],['med','nfMed'],['ice','nfIce'],['iceT','nfIceT']];
 H(bsvt('nfMy'),`<div class="bsvnfs"><div class="dhcard bsvsay"><b>${i(bsvt('nfSay'))}</b><p>${i(bsvt('nf5'))}</p></div>
  ${F.some(([k])=>n[k])?'':`<p class="vhint">${i(bsvt('nfNone'))}</p>`}
  ${F.map(([k,l])=>`<label class="bsvl">${i(bsvt(l))}</label><input class="field" data-nf="${k}" ${k==='iceT'?'type="tel"':''} value="${i(n[k]||'')}" autocomplete="off">`).join('')}
  ${n.iceT?`<a class="dcadd gold bsvice" href="${i(bsvTel(n.iceT))}">${i(bsvt('call'))}: ${i(n.ice||n.iceT)}</a>`:''}
  <button type="button" class="dcadd" data-nfsave>${i(bsvt('save'))}</button></div>`,
  el=>{el.classList.add('bsvsh');if(!n.addr){try{const a=document.querySelector('[data-nf=addr]');const me=g.me||{};if(a&&me.addr)a.value=me.addr}catch{}}
   el.querySelector('[data-nfsave]').onclick=()=>{el.querySelectorAll('[data-nf]').forEach(x=>{n[x.dataset.nf]=x.value.trim()});$();el.remove();bsvToast(bsvt('saved')+' ✓')}})}

/* --- first run: three questions --- */
let bsvWz={s:1};
function bsvWzOpen(){const o=bsvD(),c=g.cityX||{};bsvWz={s:1,plz:o.plz||[c.zip,c.name].filter(Boolean).join(' '),ppl:{sp:o.ppl.includes(bsvt('sp')),kid:o.ppl.includes(bsvt('kid'))},sel:null};bsvWzDraw()}
function bsvWzSugg(){const loc=bsvLocal(),kid=bsvWz.ppl.kid,on=new Set(['b115','buerger','fa','kk','arzt']);if(loc)on.add('ausl');if(kid){on.add('fk');on.add('schule')}return on}
function bsvWzDraw(){const w=bsvWz,o=bsvD();let b='';
 if(w.s===1)b=`<h3>${i(bsvt('wz1'))}</h3><p class="vhint">${i(bsvt('wz1S'))}</p><input class="field" data-wz="plz" value="${i(w.plz||'')}" placeholder="63741 Aschaffenburg" autocomplete="off">`;
 else if(w.s===2)b=`<h3>${i(bsvt('wz2'))}</h3><p class="vhint">${i(bsvt('wz2S'))}</p><label class="bsvtog"><input type="checkbox" checked disabled><span>${i(o.ppl[0])}</span></label>
  <label class="bsvtog"><input type="checkbox" data-wzp="sp" ${w.ppl.sp?'checked':''}><span>${i(bsvt('sp'))}</span></label><label class="bsvtog"><input type="checkbox" data-wzp="kid" ${w.ppl.kid?'checked':''}><span>${i(bsvt('kid'))}</span></label>`;
 else{if(!w.sel)w.sel=bsvWzSugg();const loc=bsvLocal();
  b=`<h3>${i(bsvt('wz3'))}</h3><p class="vhint">${i(bsvt('wz3S'))}</p><div class="odl bsvwzl">${BSV_C.map(([,k,d])=>bsvHasSrc(k)?'':`<label class="bsvtog"><input type="checkbox" data-wzk="${i(k)}" ${w.sel.has(k)?'checked':''}><span>${d.e} ${i(loc&&BSV_AB[k]&&BSV_AB[k].n||d.n)}</span></label>`).join('')}</div>`}
 const html=`<div class="bsvwz"><div class="bsvdots">${[1,2,3].map(n=>`<i class="${n<=w.s?'on':''}"></i>`).join('')}</div>${b}
  <div class="bsvwzb2">${w.s>1?`<button type="button" class="bsvcan" data-wzb>${i(bsvt('back'))}</button>`:`<button type="button" class="bsvcan" data-wzskip>${i(bsvt('skip'))}</button>`}<button type="button" class="dcadd gold" data-wzn>${i(w.s<3?bsvt('next'):bsvt('add'))}</button></div></div>`;
 const ex=document.querySelector('.dtsheet.bsvwzs .dtscroll');if(ex){ex.innerHTML=html;return}
 H(bsvt('wz'),html,el=>{el.classList.add('bsvsh','bsvwzs');el.addEventListener('click',e=>{const t=e.target;
  if(t.closest('[data-wzskip]')){o.setup=1;$();el.remove();v();return}
  if(t.closest('[data-wzb]')){bsvWzRead(el);w.s--;bsvWzDraw();return}
  if(t.closest('[data-wzn]')){bsvWzRead(el);if(w.s<3){w.s++;bsvWzDraw();return}bsvWzEnd();el.remove()}})})}
function bsvWzRead(el){const w=bsvWz,o=bsvD();const p=el.querySelector('[data-wz=plz]');if(p){w.plz=p.value.trim();o.plz=w.plz;w.sel=null}
 el.querySelectorAll('[data-wzp]').forEach(x=>{w.ppl[x.dataset.wzp]=x.checked;w.sel=null});
 const ks=el.querySelectorAll('[data-wzk]');if(ks.length){w.sel=new Set();ks.forEach(x=>{if(x.checked)w.sel.add(x.dataset.wzk)})}}
function bsvWzEnd(){const w=bsvWz,o=bsvD();['sp','kid'].forEach(k=>{const nm=bsvt(k);if(w.ppl[k]&&!o.ppl.includes(nm))o.ppl.push(nm)});
 let n=0;(w.sel||new Set()).forEach(k=>{if(bsvAddSrc(k,!1))n++});o.setup=1;$();bsvToast(bsvt('wzDone',{n}));if(m.route==='bsv')v();else R('bsv')}

/* --- screens and routes --- */
['bsv','bsvi','bsve'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{
 if(m.route==='bsv')return bsvList();
 if(m.route==='bsvi'){const it=bsvGet(bsvSel);if(it)return bsvCard(it);setTimeout(()=>R('bsv'),0);return bsvList()}
 if(m.route==='bsve'){if(!bsvEd)bsvEd=bsvNew();return bsvForm()}}catch(e){Hooks.err('bsvscreen',e)}});
/* first visit: the three questions */
Hooks.on('render',()=>{try{if(m.route==='bsv'&&!bsvD().setup&&!bsvD().items.length&&!document.querySelector('.dtsheet')&&!bsvWzOpen.done){bsvWzOpen.done=1;setTimeout(()=>{if(m.route==='bsv')bsvWzOpen()},250)}}catch(e){Hooks.err('bsvwz',e)}});
/* the tile on home (instead of «Aufgaben») and entries «Auf die Startseite» */
try{DH_I.gov=BSV_IC;dhS.bsv=bsvS.t;dhS.bsvS=bsvS.tS;const ix=DH_T.findIndex(t=>t[0]==='task');if(ix>=0)DH_T[ix]=['bsv','gov','data-act="go" data-to="bsv"']}catch(e){Hooks.err('bsvtile',e)}
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='home'||g.dhOff)return h;const H2=bsvD().items.filter(x=>x.home);if(!H2.length)return h;
 const blk=`<div class="dhcard bsvhome"><b class="dhqh">${i(bsvt('t'))}</b><div class="bsvhr">${H2.map(x=>`<button type="button" data-act="bsvopen" data-id="${i(x.id)}"><span>${i(x.e||'🏛️')}</span><small>${i(x.n)}</small></button>`).join('')}</div></div>`;
 return h.replace('<button type="button" class="dhcard dhai"',blk+'<button type="button" class="dhcard dhai"')}catch(e){Hooks.err('bsvhome',e);return h}});

/* --- actions --- */
Hooks.act('bsvback',()=>{bsvDel=0;if(m.route==='bsve'){const id=bsvEd&&bsvEd.id;bsvEd=null;if(id&&bsvGet(id)){bsvSel=id;return bsvGo('bsvi')}return bsvGo('bsv')}if(m.route==='bsvi')return bsvGo('bsv');bsvOrd=0;R('home',void 0,!0)});
Hooks.on('render',()=>{if(m.route!=='bsve')bsvEd=null;if(m.route!=='bsv')bsvOrd=0;if(m.route!=='bsvi')bsvDel=0});
Hooks.act('bsvopen',d=>{bsvSel=d.id;bsvDel=0;R('bsvi')});
Hooks.act('bsvord',()=>{bsvOrd=bsvOrd?0:1;v()});
Hooks.act('bsvwho',d=>{bsvWho=d.p||'';v()});
Hooks.act('bsvcat',()=>bsvCat());Hooks.act('bsvnf',()=>bsvNf());Hooks.act('bsvwz',()=>bsvWzOpen());
Hooks.act('bsvmv',d=>{const A=bsvD().items,ix=A.findIndex(x=>x.id===d.id);if(ix<0)return;const it=A[ix],dir=+d.d;let j=ix+dir;while(j>=0&&j<A.length&&A[j].grp!==it.grp)j+=dir;if(j<0||j>=A.length)return;A[ix]=A[j];A[j]=it;$();v()});
Hooks.act('bsvgmv',d=>{const G=bsvD().grp,ix=G.indexOf(d.k),j=ix+ +d.d;if(ix<0||j<0||j>=G.length)return;[G[ix],G[j]]=[G[j],G[ix]];$();v()});
Hooks.act('bsvpin',d=>{const it=bsvGet(d.id);if(!it)return;it.pin=!it.pin;$();v()});
Hooks.act('bsvok',d=>{const it=bsvGet(d.id);if(!it)return;delete it.chk;$();v()});
Hooks.act('bsvcp',d=>{const it=bsvGet(d.id),n=it&&(it.nums||[]).find(z=>z.id===d.n);if(n&&!n.s)bsvCopy(n.v||'')});
Hooks.act('bsvshow',d=>bsvShow(d.id,d.n));
Hooks.act('bsvdel',d=>{if(!bsvDel){bsvDel=1;v();setTimeout(()=>{if(bsvDel){bsvDel=0;if(m.route==='bsvi')v()}},4e3);return}bsvDel=0;const o=bsvD();o.items=o.items.filter(x=>x.id!==d.id);$();bsvToast(bsvt('deleted'));bsvGo('bsv')});
Hooks.act('bsvedit',d=>{const it=bsvGet(d.id);if(!it)return;bsvEd=JSON.parse(JSON.stringify(it));R('bsve')});
Hooks.act('bsvemo',d=>{if(bsvEd){bsvEd.e=d.e;document.querySelectorAll('.bsvemos button').forEach(b=>b.classList.toggle('on',b.dataset.e===d.e))}});
Hooks.act('bsvgrp',d=>{if(bsvEd){bsvEd.grp=d.k;document.querySelectorAll('[data-act=bsvgrp]').forEach(b=>b.classList.toggle('on',b.dataset.k===d.k))}});
Hooks.act('bsvng',()=>{if(!bsvEd)return;const n=String(bsvEd.ng||'').trim();if(!n)return;const k='c:'+n,o=bsvD();if(!o.grp.includes(k)&&!o.grp.some(x=>bsvGL(x).toLowerCase()===n.toLowerCase()))o.grp.push(k);bsvEd.grp=o.grp.find(x=>bsvGL(x).toLowerCase()===n.toLowerCase())||k;bsvEd.ng='';$();bsvRe()});
Hooks.act('bsvwhoe',d=>{if(!bsvEd)return;const w=bsvEd.who=bsvEd.who||[];const j=w.indexOf(d.p);j<0?w.push(d.p):w.splice(j,1);document.querySelectorAll('[data-act=bsvwhoe]').forEach(b=>b.classList.toggle('on',w.includes(b.dataset.p)))});
Hooks.act('bsvnp',()=>{if(!bsvEd)return;const n=String(bsvEd.np||'').trim();if(!n)return;const o=bsvD();if(!o.ppl.includes(n))o.ppl.push(n);bsvEd.who=bsvEd.who||[];bsvEd.who.includes(n)||bsvEd.who.push(n);bsvEd.np='';$();bsvRe()});
Hooks.act('bsvladd',()=>{if(!bsvEd)return;bsvEd.links.push({t:'',u:''});bsvRe();setTimeout(()=>{const x=[...document.querySelectorAll('[data-bl][data-k=t]')].pop();x&&x.focus()},60)});
Hooks.act('bsvlrm',d=>{if(!bsvEd)return;bsvEd.links.splice(+d.j,1);bsvRe()});
Hooks.act('bsvnadd',()=>{if(!bsvEd)return;bsvEd.nums.push({id:bsvId(),t:'',v:'',s:!1});bsvRe();setTimeout(()=>{const x=[...document.querySelectorAll('[data-bn][data-k=t]')].pop();x&&x.focus()},60)});
Hooks.act('bsvnrm',d=>{if(!bsvEd)return;bsvEd.nums.splice(+d.j,1);bsvRe()});
Hooks.act('bsvpaste',d=>{const x=d.f?document.querySelector(`[data-bf="${d.f}"]`):document.querySelector(`[data-bl="${d.l}"][data-k=u]`);if(x)bsvPaste(x)});
Hooks.act('bsvsave',()=>{bsvSave().catch(e=>{Hooks.err('bsvsave',e);bsvToast(bsvt('pasteNo'))})});

Hooks.css('docs-behoerden',`
.bsv .bsvordb{color:var(--green)!important}.bsv .bsvordb.on{background:var(--green)!important;color:#fff!important}
.odr.bsvrow span.bsvemo,.bsvsh .odr span.bsvemo,.bsvhit span.bsvemo{flex:0 0 30px!important;display:block!important}.odr .bsvmv{flex:none!important;flex-direction:row!important}
.bsvsh .dtscroll,.bsvsh .dtshh b{font-family:-apple-system,"SF Pro Text",system-ui,sans-serif}.bsvsh .dtshh b{font-weight:600}.bsvsh .dhcard{box-sizing:border-box;max-width:100%}
.bsvnf{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:4px 0 8px}
.bsvnf a{display:flex;flex-direction:column;align-items:center;gap:2px;padding:12px 4px;border-radius:16px;color:#fff!important;text-decoration:none;box-shadow:0 3px 12px rgba(0,0,0,.12)}
.bsvnf b{font-size:22px;font-weight:800;letter-spacing:.02em}.bsvnf small{font-size:11.5px;opacity:.95;text-align:center;line-height:1.2}
.bsvnf .b110{background:#1f5fbf}.bsvnf .b112{background:#d0362b}.bsvnf .b116{background:#2c8a4b}.bsvnf .b116 b{font-size:18px;padding:2px 0}
.bsvmy{margin-bottom:6px}.bsvmy>.dhi:first-child{color:#d0362b}
.bsvchips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px}.bsvchips button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 13px;font-size:14px}
.bsvchips button.on{background:var(--green);border-color:var(--green);color:#fff!important}
.bsvrow{padding:0!important;gap:6px}.bsvhit{flex:1;display:flex;align-items:center;gap:12px;border:0;background:none;padding:11px 0;text-align:left;min-width:0}
.bsvhit>span:last-child{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.bsvhit b{font-weight:600}.bsvhit small{color:var(--muted);font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bsvhit small.on{color:#2c8a4b}.bsvemo{flex:none;width:30px;text-align:center;font-size:22px;line-height:1}.bsvemo.big{font-size:46px;width:auto}
.bsvq{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(44,138,75,.1);color:var(--green)!important}
.bsvmv{flex:none;display:flex;gap:4px}.bsvmv button{width:36px;height:36px;border-radius:10px;border:1px solid var(--line);background:var(--surface);display:flex;align-items:center;justify-content:center;color:var(--green)!important}
.bsvgh{display:flex;align-items:center;justify-content:space-between}
.bsv115{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--ink)!important;margin-top:10px}.bsv115 b{font-size:20px;font-weight:800;color:var(--green)}.bsv115 span{flex:1;font-size:13.5px;color:var(--muted);line-height:1.35}.bsv115 .dhi{color:var(--green);flex:none}
.bsvhd{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;margin:2px 0 10px}.bsvhd h3{margin:4px 0 0;font-size:22px}.bsvhd p{margin:0;color:var(--muted);font-size:14px}
.bsvst{font-style:normal;font-size:13.5px;font-weight:600;padding:4px 11px;border-radius:999px;background:rgba(0,0,0,.05);color:var(--muted)}.bsvst.on{background:rgba(44,138,75,.12);color:#2c8a4b}
.bsvpin{display:flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:6px 12px;font-size:13.5px;margin-top:4px;color:var(--muted)!important}.bsvpin .dhi{width:17px;height:17px}
.bsvpin.on{color:#b07a10!important;border-color:#e2c27a}.bsvpin.on .dhi{fill:#e2b44a;stroke:#b07a10}
.bsvchk{display:flex;align-items:center;gap:10px;background:#fff8e6!important;border-color:#f0dca8!important;font-size:13.5px;line-height:1.35}.bsvchk span{flex:1}.bsvchk button{flex:none;border:0;border-radius:999px;padding:8px 12px;background:#b07a10;color:#fff!important;font-weight:600;font-size:13px}
.bsvacts{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;margin:8px 0 10px}
.bsvact{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;border-radius:16px;background:var(--surface);border:1px solid var(--line);text-decoration:none;color:var(--ink)!important;font-size:13px;font-weight:600}
.bsvact .dhi{color:var(--green)}.bsvact.main{background:var(--green);border-color:var(--green);color:#fff!important}.bsvact.main .dhi{color:#fff}
.bsvlinks{display:flex;flex-direction:column;padding-top:4px!important;padding-bottom:4px!important}.bsvlink{display:flex;align-items:center;gap:12px;padding:11px 0;text-decoration:none;color:var(--ink)!important;font-weight:600}.bsvlink+.bsvlink{border-top:1px solid var(--line)}.bsvlink .dhi{color:var(--green);flex:none}
.bsvkv{grid-template-columns:1fr!important}
.bsvnums{display:flex;flex-direction:column}.bsvnum{display:flex;align-items:center;gap:10px;padding:9px 0}.bsvnum+.bsvnum{border-top:1px solid var(--line)}.bsvnum>span{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}
.bsvnum small{color:var(--muted);font-size:12.5px;display:flex;align-items:center;gap:4px}.bsvnum b{font-weight:600;font-variant-numeric:tabular-nums;overflow-wrap:anywhere;letter-spacing:.02em}
.bsvnum button{flex:none;display:flex;align-items:center;gap:5px;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 11px;font-size:13px;font-weight:600;color:var(--green)!important}.bsvnum button .dhi{width:16px;height:16px}
.bsvdel{display:block;width:100%;text-align:center;margin:18px 0 6px;border:0;background:none;color:#c0392b!important;font-weight:600;padding:12px}.bsvdel.on{background:#fdecea;border-radius:14px}
.bsve .bsvl{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 2px 6px}.bsve .field{width:100%;box-sizing:border-box}.bsve textarea.field{resize:vertical}
.bsvemos{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.bsvemos button{font-size:22px;padding:6px 0;border-radius:12px;border:1px solid transparent;background:var(--surface)}.bsvemos button.on{border-color:var(--green);background:rgba(44,138,75,.1)}
.bsvrowin{display:flex;gap:6px;align-items:center;margin-top:6px}.bsvrowin .field{flex:1;min-width:0}
.bsvsm{flex:none;border:1px solid var(--line);background:var(--surface);border-radius:12px;padding:10px 11px;font-size:13.5px;font-weight:600;color:var(--green)!important}.bsvsm.x{color:#c0392b!important;font-size:18px;padding:7px 12px}
.bsvlrow{border:1px solid var(--line);border-radius:14px;padding:8px;margin-bottom:8px}
.bsvplus{border:1px dashed var(--green);background:none;border-radius:14px;padding:11px;width:100%;font-weight:600;color:var(--green)!important;margin-top:2px}
.bsvtog{display:flex;align-items:center;gap:10px;padding:10px 2px;font-size:15px}.bsvtog input{width:22px;height:22px;flex:none;accent-color:var(--green)}.bsvtog.sm{font-size:13.5px;padding:6px 2px 0}.bsvtog .dhi{width:15px;height:15px;vertical-align:-2px}
.bsvcan{display:block;width:100%;border:0;background:none;padding:12px;color:var(--muted)!important;font-weight:600}
.bsvsh .odh{margin:16px 0 4px}.bsvsh .odr[disabled]{opacity:.55}.bsvsh .odr em{font-style:normal;color:var(--green);font-weight:700;flex:none;font-size:14px}
.bsvcat .vline{display:flex;align-items:center;gap:12px}.bsvcat .vline span{display:flex;flex-direction:column;gap:2px}.bsvcat .vline small{color:var(--muted);font-weight:400;font-size:13px}
.bsvsay{background:#fdecea!important;border-color:#f5c6c0!important;margin-bottom:6px}.bsvsay p{margin:6px 0 0;font-size:14px;line-height:1.45}
.bsvnfs .field{width:100%;box-sizing:border-box}.bsvice{display:block;text-align:center;text-decoration:none;color:#fff!important}
.bsvsec{display:flex;flex-direction:column;align-items:center;gap:12px;padding:10px 0}.bsvbig{font-size:26px;letter-spacing:.06em;font-variant-numeric:tabular-nums;text-align:center;overflow-wrap:anywhere;user-select:all}
.bsvwz h3{margin:6px 0 4px;font-size:20px}.bsvwz .field{width:100%;box-sizing:border-box;margin-top:10px}.bsvdots{display:flex;gap:6px;justify-content:center}.bsvdots i{width:26px;height:5px;border-radius:3px;background:var(--line)}.bsvdots i.on{background:var(--green)}
.bsvwzl{max-height:46vh;overflow:auto}.bsvwzb2{display:flex;flex-direction:column}
.bsvhome .bsvhr{display:flex;gap:8px;overflow-x:auto;margin-top:8px;padding-bottom:2px}.bsvhome .bsvhr button{flex:none;display:flex;flex-direction:column;align-items:center;gap:3px;width:78px;border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:9px 4px}
.bsvhome .bsvhr span{font-size:24px}.bsvhome .bsvhr small{font-size:11.5px;line-height:1.2;text-align:center;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
`);
