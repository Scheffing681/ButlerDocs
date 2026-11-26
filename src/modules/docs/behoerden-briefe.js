/* ===== Butler Docs: Behörden & Dienste (stage 3) — letters, Anträge, journal =====
   - A scanned letter: the scanned text tells which office wrote, what kind of letter, its date and (for a Bescheid)
     the objection deadline: date + 4 days (Bekanntgabe, rule since 2025) + 1 month, moved off a weekend. Always «bitte prüfen».
     An explicit «bis zum …» in the letter is taken as it stands. The document can be tied to the office.
   - Writing (v17): one button «Schreiben» → «Leeres Schreiben» or a German template (Einspruch/Widerspruch, Fristverlängerung,
     Unterlagen nachreichen, Sachstandsanfrage, Adressänderung) → the user's own «Briefe» editor opens filled in
     (to, subject, reference number, text). Envelope, letterhead, PDF / e-mail / SMS, signature stay the user's own.
     What the user sent from «Briefe» to the office's address shows on the card («Gesendete Schreiben»).
   - Anträge: submitted → in progress → decision; a reminder to ask after 4 weeks; «Спросить статус» = Sachstandsanfrage.
   - Journal per office: calls (who, what), sent (Einschreiben number, photo of the receipt), received.
     After «Позвонить» from the app, coming back to the app asks «С кем говорили?».
   Data: doc.bsvL {src,it,kind,date,frist,dl,ev,tk,no}, g.bsv.ant [{id,it,t,who[],az,how,d,st,d2,d3,tk}], g.bsv.log [{id,it,k,d,who,txt,trk,via,ph}] */
const bsvS3={
 lt:['Письмо из ведомства','Behördenschreiben','Letter from an office'],ltOf:['Похоже на письмо: %o','Schreiben von: %o','Looks like a letter from: %o'],
 ltKind:['%k от %d','%k vom %d','%k of %d'],obj:['%e — примерно до %f: дата письма + 4 дня на доставку + 1 месяц. Проверьте по письму.','%e – etwa bis %f: Datum + 4 Tage Zustellung + 1 Monat. Bitte im Schreiben prüfen.','%e – about until %f: letter date + 4 days delivery + 1 month. Please check the letter.'],
 expl:['Срок в письме: до %f','Frist im Schreiben: bis %f','Deadline in the letter: until %f'],
 toCal:['Срок в календарь','Frist eintragen','Deadline to calendar'],inCal:['Срок в календаре ✓','Frist eingetragen ✓','Deadline in calendar ✓'],toOff:['К «%o»','Zu „%o“','To “%o”'],tied:['Привязано к «%o»','Zugeordnet: %o','Tied to “%o”'],
 calT:['Frist: %e — %o','Frist: %e – %o','Deadline: %e – %o'],calR:['Через неделю срок: %e — %o','In einer Woche Frist: %e – %o','Deadline in a week: %e – %o'],
 lets:['Письма и решения','Schreiben & Bescheide','Letters & decisions'],
 br:['Письмо','Brief','Letter'],tpl:['Шаблон','Vorlage','Template'],ref:['Решение / письмо от','Bescheid / Schreiben vom','Decision / letter of'],az:['Номер дела','Aktenzeichen','Reference'],
 txt:['Текст письма','Brieftext','Letter text'],via:['Как отправить','Versand','How to send'],
 v_ein:['Заказное письмо (Einschreiben)','Einschreiben','Registered'],v_post:['Обычной почтой','Brief','Post'],v_mail:['E-mail','E-Mail','Email'],v_fax:['Факс','Fax','Fax'],v_hand:['Лично','Persönlich','In person'],
 print:['PDF / печать','PDF / Drucken','PDF / print'],mail:['E-mail','E-Mail','Email'],copy:['Копировать','Kopieren','Copy'],sent:['Отправлено','Gesendet','Sent'],
 trk:['Номер отправления (Einschreiben)','Sendungsnummer (Einschreiben)','Tracking number'],sentOk:['Записано в журнал и в «Письма»','Im Verlauf und unter „Briefe“ gespeichert','Saved to the log and “Letters”'],
 noAddr:['Свой адрес впишите в «Мои данные» — он встанет в письмо сам.','Ihre Adresse unter „Meine Angaben“ eintragen – dann steht sie im Brief.','Add your address under “My details” – it then goes into the letter.'],
 noMail:['У ведомства нет e-mail — впишите его в карточке','Keine E-Mail-Adresse beim Amt – bitte in der Karte eintragen','No email for this office – add it on the card'],
 ants:['Мои заявления','Meine Anträge','My applications'],antAdd:['＋ заявление','＋ Antrag','＋ application'],antT:['Что подано','Was wurde beantragt','What was applied for'],
 antD:['Подано','Gestellt am','Submitted'],antHow:['Как подано','Wie gestellt','How'],h_on:['онлайн','online','online'],h_post:['почтой','per Post','by post'],h_hand:['лично','persönlich','in person'],
 st1:['Подано','Gestellt','Submitted'],st2:['В работе','In Bearbeitung','In progress'],st3:['Решение получено','Bescheid erhalten','Decision received'],
 stNext:['Следующий шаг','Nächster Schritt','Next step'],stAsk:['Спросить статус','Sachstand anfragen','Ask for status'],askBy:['спросить, если нет ответа до %d','nachfragen, falls bis %d nichts kommt','ask if nothing comes by %d'],
 antRem:['Спросить статус: %t — %o','Nachfragen: %t – %o','Ask for status: %t – %o'],
 log:['Звонки и доказательства','Gespräche & Nachweise','Calls & proof'],k_call:['Звонок','Anruf','Call'],k_sent:['Отправил','Gesendet','Sent'],k_got:['Получил','Erhalten','Received'],
 lWho:['С кем говорили','Gesprächspartner','Who'],lTxt:['Что сказали / что это','Was wurde gesagt / was ist es','What was said / what it is'],lPh:['Фото квитанции или письма','Foto vom Beleg oder Schreiben','Photo of the receipt or letter'],
 track:['Отследить','Verfolgen','Track'],trackS:['Номер скопирован — вставьте его на странице Deutsche Post','Nummer kopiert – auf der Seite der Deutschen Post einfügen','Number copied – paste it on the Deutsche Post page'],
 after:['Вы звонили в «%o». С кем говорили? Что сказали?','Sie haben „%o“ angerufen. Mit wem? Was wurde gesagt?','You called “%o”. Who did you talk to? What was said?'],
 all:['Все записи: %n','Alle Einträge: %n','All entries: %n'],moreR:['ещё','mehr','more'],antOne:['Заявление','Antrag','Application'],
 fl:['Нашёл в письме','Im Schreiben gefunden','Found in the letter'],flOff:['Ведомство','Behörde','Office'],flTake:['Что сохранить','Was übernehmen','What to keep'],flNone:['Ничего не нашёл — впишите сами','Nichts gefunden – bitte selbst eintragen','Nothing found – please type it'],
 flDl:['Срок из письма — решаете Вы','Frist aus dem Schreiben – Sie entscheiden','Deadline from the letter – you decide'],flSug:['Похоже: %e до %f','Vermutlich: %e bis %f','Looks like: %e until %f'],
 flYes:['Внести','Eintragen','Add'],flOther:['Другая дата','Anderes Datum','Other date'],flNo:['Не нужно','Nicht nötig','Not needed'],
 flNew:['Создать карточку','Karte anlegen','Create the card'],flUpd:['Сохранить в «%n»','In „%n“ speichern','Save to “%n”'],flChg:['Адрес изменился: было «%a»','Adresse geändert: vorher „%a“','Address changed: was “%a”'],
 flSaved:['Готово — карточка «%n»','Fertig – Karte „%n“','Done – card “%n”'],addrChg:['Адрес изменился — обновить','Adresse geändert – aktualisieren','Address changed – update'],
 wrT:['Написать: %o','Schreiben an %o','Write to %o'],wrEmpty:['Пустое письмо','Leeres Schreiben','Empty letter'],wrEmptyS:['Адрес и номер дела уже внутри','Adresse und Aktenzeichen sind schon drin','Address and reference are already in'],
 sentT:['Отправленные письма','Gesendete Schreiben','Sent letters'],date:['Дата','Datum','Date'],save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],none:['Пока пусто','Noch leer','Empty so far'],photo:['фото','Foto','photo']};
const bsvt3=(k,o)=>{let s=cv5n(bsvS3[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const bsvAnts=()=>{const o=bsvD();if(!Array.isArray(o.ant))o.ant=[];return o.ant};
const bsvLogs=()=>{const o=bsvD();if(!Array.isArray(o.log))o.log=[];return o.log};
const bsvDE=k=>{const[y,mo,d]=String(k||'').split('-');return d?`${d}.${mo}.${y}`:''};

/* --- reading a scanned letter --- */
const BSV_OFF=[[/finanzamt/i,'fa'],[/ausländerbehörde|ausländeramt|ausländerangelegenheiten/i,'ausl'],[/jobcenter/i,'jc'],[/familienkasse/i,'fk'],[/agentur für arbeit|bundesagentur für arbeit/i,'aa'],
 [/rentenversicherung/i,'drv'],[/amtsgericht/i,'ag'],[/zulassungsstelle|kfz-zulassung|fahrzeugzulassung/i,'kfz'],[/bußgeldstelle|straßenverkehrsamt|ordnungsamt/i,'ord'],
 [/krankenkasse|\baok\b|techniker krankenkasse|barmer|\bdak\b|\bikk\b|\bbkk\b/i,'kk'],[/polizei/i,'pol'],[/bürgeramt|bürgerbüro|einwohnermeldeamt|standesamt|landratsamt/i,'buerger']];
const BSV_KIND=[[/\banhörung/i,'Anhörung'],[/bescheid/i,'Bescheid'],[/mahnung|zahlungserinnerung/i,'Mahnung'],[/einladung/i,'Einladung'],[/aufforderung|reichen sie .{0,40}(ein|nach)|fehlende unterlagen/i,'Aufforderung'],[/rechnung/i,'Rechnung']];
const bsvD8=(d,mo,y)=>{d=+d;mo=+mo;y=+y;if(y<100)y+=2000;if(mo<1||mo>12||d<1||d>31||y<2000||y>2100)return'';const t=new Date(y,mo-1,d);return t.getDate()===d?x(t):''};
const bsvWknd=k=>{const d=new Date(k+'T00:00:00');while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1);return x(d)};
const bsvAddM=(k,n)=>{const[y,mo,d]=k.split('-').map(Number);const t=new Date(y,mo-1+n,d);if(t.getDate()!==d)t.setDate(0);return x(t)};
function bsvParse(text){const t=String(text||'').replace(/\s+/g,' ');if(t.length<30)return null;const lt=t.toLowerCase(),o=bsvD();
 let it=o.items.find(z=>!/^(nf)$/.test(z.grp)&&z.n&&bsvWords(z.n).filter(w=>w.length>=5&&!/aschaffenburg|stadt/.test(w)).some(w=>lt.includes(w)));
 let src=it?it.src||'':'';if(!it){const f=BSV_OFF.find(([rx])=>rx.test(t));if(f){src=f[1];it=o.items.find(z=>z.src===src)}}
 const kd=BSV_KIND.find(([rx])=>rx.test(t)),kind=kd?kd[1]:'';if(!src&&!it&&!kind)return null;
 const today=x(new Date());let date='';const pick=rx=>{const mm=t.match(rx);return mm?bsvD8(mm[1],mm[2],mm[3]):''};
 date=pick(/datum:?\s*(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{2,4})/i)||pick(/[a-zäöüß]{3,}, (?:den )?(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})/i)||pick(/(?:bescheid|schreiben)\s+vom\s+(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})/i);
 if(!date||date>today){const all=[...t.matchAll(/(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})/g)].map(mm=>bsvD8(mm[1],mm[2],mm[3])).filter(k=>k&&k<=today).sort();date=all.pop()||''}
 let dl='';const e=t.match(/(?:bis zum|bis spätestens(?: zum| am)?|spätestens (?:bis )?(?:zum|am)|bis)\s+(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})/i);if(e){const k=bsvD8(e[1],e[2],e[3]);if(k&&(!date||k>date))dl=k}
 const objW=/einspruch/i.test(t)&&!/widerspruch/i.test(t)?'Einspruch':/widerspruch/i.test(t)?'Widerspruch':/einspruch/i.test(t)?'Einspruch':'';
 const hasRb=objW&&/rechtsbehelf|innerhalb eines monats|binnen eines monats|einspruch einlegen|widerspruch (?:einlegen|erheben|erhoben)|einspruch (?:ist|kann)|widerspruch (?:ist|kann)/i.test(t);
 const frist=hasRb&&date?bsvWknd(bsvAddM(bsvAddDay(date,4),1)):'';
 return{src,it:it?it.id:'',kind,date,frist,dl,obj:hasRb?objW:''}}
const bsvOffName=r=>{const it=r.it&&bsvGet(r.it);return it?it.n:r.src?bsvOfName(r.src):bsvt3('lt')};
let bsvScanC={};
async function bsvScanDoc(id){try{const d=Ke().items.find(z=>z.id===id);if(!d)return null;let t='';try{t=(Fa.text&&Fa.text[id])||''}catch{}if(!t){const r=await fl('dtext',id);t=r&&r.t||''}
 const c=bsvScanC[id];if(c&&c.len===t.length)return c.r;const r=bsvParse(t);bsvScanC[id]={len:t.length,r,t};return r}catch(e){Hooks.err('bsvscan',e);return null}}
async function bsvLetterBanner(){try{if(m.route!=='bdoc')return;const id=m.bdid,d=Ke().items.find(z=>z.id===id);if(!d||(d.bsvL&&d.bsvL.no))return;
 const hd=document.querySelector('.screen > .sub-hdr');if(!hd)return;const ex=document.querySelector('.bsvlb');if(ex&&ex.dataset.id===id&&ex.dataset.v===String(bsvLetterBanner.v))return;
 const r=await bsvScanDoc(id);if(m.route!=='bdoc'||m.bdid!==id)return;if(!r){ex&&ex.remove();return}const L2=d.bsvL||{};const on=bsvOffName(Object.assign({},r,L2.it?{it:L2.it}:{}));
 const f=L2.frist||r.frist,dl=L2.dl||r.dl;
 const html=`<div class="dhcard warn bsvlb" data-id="${i(id)}" data-v="${bsvLetterBanner.v}"><b>🏛️ ${i(bsvt3('ltOf',{o:on}))}</b>${r.kind||r.date?`<small>${i(bsvt3('ltKind',{k:r.kind||bsvt3('lt'),d:r.date?bsvDE(r.date):'—'}))}</small>`:''}
  ${f?`<small>${i(bsvt3('obj',{e:r.obj,f:bsvDE(f)}))}</small>`:''}${dl?`<small><b>${i(bsvt3('expl',{f:bsvDE(dl)}))}</b></small>`:''}
  <div class="bsvfxb">${f||dl?L2.ev?`<span class="bsvok">${i(bsvt3('inCal'))}</span>`:`<button type="button" class="on" data-act="bsvlcal" data-id="${i(id)}">${i(bsvt3('toCal'))}</button>`:''}
  ${(()=>{const t2=L2.it&&bsvGet(L2.it);if(t2){const ld=bsvLetterData(bsvScanC[id]&&bsvScanC[id].t||'');const ch=ld.addr&&t2.addr&&bsvNorm(ld.addr)!==bsvNorm(t2.addr);
   return`<button type="button" data-act="bsvopen" data-id="${i(L2.it)}">${i(bsvt3('tied',{o:t2.n}))}</button>`+(ch?`<button type="button" class="on" data-act="bsvltie" data-id="${i(id)}">${i(bsvt3('addrChg'))}</button>`:'')}
   return`<button type="button" data-act="bsvltie" data-id="${i(id)}">${i(bsvt3('toOff',{o:on}))}</button>`})()}
  ${r.obj?`<button type="button" data-act="bsvlobj" data-id="${i(id)}">${i(r.obj)}</button>`:''}<button type="button" class="x" data-act="bsvlno" data-id="${i(id)}" aria-label="×">×</button></div></div>`;
 const w=document.createElement('div');w.innerHTML=html;if(ex)ex.replaceWith(w.firstElementChild);else hd.after(w.firstElementChild)}catch(e){Hooks.err('bsvlb',e)}}
bsvLetterBanner.v=0;
Hooks.on('render',()=>{if(m.route==='bdoc')bsvLetterBanner()});
{let q=0;new MutationObserver(()=>{if(q||m.route!=='bdoc')return;q=1;setTimeout(()=>{q=0;if(!document.querySelector('.bsvlb'))bsvLetterBanner()},300)}).observe(document.body,{childList:!0,subtree:!0})}
async function bsvLDo(id,f){const d=Ke().items.find(z=>z.id===id);if(!d)return;const r=await bsvScanDoc(id);if(!r)return;d.bsvL=Object.assign({src:r.src,it:r.it,kind:r.kind,date:r.date,frist:r.frist,dl:r.dl,obj:r.obj},d.bsvL||{});f(d,r);$();bsvLetterBanner.v++;bsvLetterBanner()}
function bsvLTie(d){const L2=d.bsvL;if(L2.it&&bsvGet(L2.it))return bsvGet(L2.it);const it=L2.src&&bsvD().items.find(z=>z.src===L2.src);if(it)L2.it=it.id;return it||null}

/* --- letters from templates (German only) --- */
const BSV_TPL={
 obj:{n:'Einspruch / Widerspruch',subj:c=>`${c.objW} gegen den ${c.kind||'Bescheid'} vom ${c.rd||'…'}`,body:c=>`hiermit lege ich gegen den ${c.kind||'Bescheid'} vom ${c.rd||'…'} fristgerecht ${c.objW} ein.\n\nDie Begründung reiche ich gesondert nach.\n\nBitte bestätigen Sie mir den Eingang dieses Schreibens.`},
 frist:{n:'Fristverlängerung',subj:c=>`Antrag auf Fristverlängerung${c.rd?' – Ihr Schreiben vom '+c.rd:''}`,body:c=>`in der oben genannten Angelegenheit bitte ich um Verlängerung der Frist bis zum ${c.plus4w}.\n\nGrund: \n\nVielen Dank für Ihr Verständnis.`},
 adr:{n:'Adressänderung',subj:()=>'Mitteilung meiner neuen Anschrift',body:c=>`hiermit teile ich Ihnen mit, dass sich meine Anschrift ab dem ${c.today} geändert hat.\n\nNeue Anschrift:\n${c.addr||'…'}\n\nBitte senden Sie künftige Post an diese Anschrift.`},
 nach:{n:'Unterlagen nachreichen',subj:c=>`Nachreichung von Unterlagen${c.rd?' – Ihr Schreiben vom '+c.rd:''}`,body:()=>`anbei übersende ich Ihnen die angeforderten Unterlagen:\n\n- \n- \n\nBitte bestätigen Sie mir den Eingang.`},
 stand:{n:'Sachstandsanfrage',subj:c=>`Sachstandsanfrage${c.ant?' – '+c.ant:''}`,body:c=>`am ${c.antD||'…'} habe ich ${c.ant?'meinen Antrag „'+c.ant+'“':'einen Antrag'} gestellt. Bis heute habe ich keine Nachricht von Ihnen erhalten.\n\nBitte teilen Sie mir den aktuellen Stand der Bearbeitung mit.`},
 frei:{n:'Leeres Schreiben',subj:()=>'',body:()=>''}};
function bsvMe(){let me={};try{me=ja()}catch{}const name=[me.first,me.mid,me.last].filter(Boolean).join(' ')||((g.user&&[g.user.first,g.user.last].filter(Boolean).join(' '))||'');const addr=String(me.post||me.addr||(bsvD().nf||{}).addr||'').trim();const mail=String(me.email||(g.user&&g.user.email)||'').trim();return{name,addr,mail}}
function bsvAz(it,ant){if(ant&&ant.az)return'Aktenzeichen: '+ant.az;const n=(it.nums||[]).find(z=>!z.s&&z.v&&/aktenzeichen|steuernummer|kundennummer|bg-nummer|kindergeld|versicherungsnummer|\baz\b/i.test(z.t||''));return n?(n.t+': '+n.v):''}
/* the letter's subject and text (sender, office, date, signature come from the «Briefe» editor itself) */
function bsvLetter(b){const it=bsvGet(b.it)||{},me=bsvMe(),ant=b.ant&&bsvAnts().find(z=>z.id===b.ant),tp=BSV_TPL[b.tpl]||BSV_TPL.frei;
 const c={objW:b.objW||(it.src==='fa'||it.src==='fk'||/finanzamt|familienkasse/i.test(it.n||'')?'Einspruch':'Widerspruch'),kind:b.kind,rd:bsvDE(b.rdate),plus4w:bsvDE(bsvAddDay(x(new Date()),28)),today:bsvDE(x(new Date())),addr:me.addr,ant:ant&&ant.t,antD:ant&&bsvDE(ant.d)};
 const az=bsvAz(it,ant),subj=tp.subj(c),body=[az,az?'':null,'Sehr geehrte Damen und Herren,','',tp.body(c)].filter(l=>l!=null).join('\n').replace(/\n+$/,'')+'\n';return{subj,body,text:body}}
function bsvToBriefe(o){const b=Object.assign({it:'',tpl:'frei',rdate:'',kind:'',objW:'',ant:''},o||{}),it=bsvGet(b.it)||{},L2=bsvLetter(b);
 try{p_({to:it.mail||'',toName:it.n||'',subj:L2.subj,body:L2.body,lang:'de'})}catch(e){Hooks.err('bsvbriefe',e);R('letters')}}
const bsvBrNew=o=>bsvToBriefe(o);
const BSV_WR=[['frei','📝'],['obj','⚖️'],['frist','⏳'],['nach','📎'],['stand','❓'],['adr','🏠']];
function bsvWriteSheet(itId){const it=bsvGet(itId)||{};
 H(bsvt3('wrT',{o:it.n||''}),`<div class="bsvadd3">${BSV_WR.map(([k,e],j)=>`<button type="button" class="bsvbig${j?'':' main'}" data-wr="${k}"><span>${e}</span><span><b>${i(k==='frei'?bsvt3('wrEmpty'):BSV_TPL[k].n)}</b>${k==='frei'?`<small>${i(bsvt3('wrEmptyS'))}</small>`:''}</span></button>`).join('')}</div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-wr]');if(!b)return;el.remove();const k=b.dataset.wr,an=k==='stand'&&bsvAnts().filter(z=>z.it===itId&&(z.st||1)<3).sort((x1,x2)=>x2.d.localeCompare(x1.d))[0];bsvToBriefe({it:itId,tpl:k,ant:an?an.id:''})})})}
/* what the user sent from «Briefe» to this office's e-mail */
function bsvSentTo(it){try{const ml=String(it.mail||'').toLowerCase();if(!ml)return[];return(g.drafts||[]).filter(d=>d&&d.sent&&String(d.to||'').toLowerCase().includes(ml)).sort((a,b)=>(b.at||0)-(a.at||0))}catch{return[]}}

/* --- «Из письма»: what the letterhead says, the user ticks what to keep --- */
const bsvNorm=a=>String(a||'').toLowerCase().replace(/str\.|straße|strasse/g,'str').replace(/[^a-z0-9äöüß]/g,'');
const BSV_OFFN=/(Finanzamt|Ausländerbehörde|Jobcenter|Familienkasse|Agentur für Arbeit|Deutsche Rentenversicherung|Amtsgericht|Landgericht|Landratsamt|Bürgeramt|Bürgerbüro|Standesamt|Zulassungsstelle|Ordnungsamt|Straßenverkehrsamt|Bußgeldstelle|Polizeiinspektion|AOK|Techniker Krankenkasse|Barmer|DAK-Gesundheit|IKK|Krankenkasse|Stadt|Gemeinde|Kreisverwaltung)(?:\s+(?!Bescheid|Steuernummer|Postfach|Herrn|Frau|Datum|Telefon|Tel|Fax|Ihr|Sehr)([A-ZÄÖÜ][a-zäöüß]+(?:-[A-ZÄÖÜ][a-zäöüß]+)?))?/;
const BSV_NUMR=/(Steuernummer|Steuer-Nr\.?|St\.-Nr\.?|Aktenzeichen|Az\.|Kundennummer|Kunden-Nr\.?|BG-Nummer|Versicherungsnummer|Versichertennummer|Kindergeldnummer|Vorgangsnummer|Geschäftszeichen)\s*:?\s*([0-9A-Z][0-9A-Z\/.-]*(?: [0-9A-Z\/.-]*[0-9][0-9A-Z\/.-]*)*)/g;
function bsvLetterData(text){const t=String(text||'').replace(/\s+/g,' '),me=bsvMe(),meA=bsvNorm(me.addr),R2={name:'',addr:'',tel:'',mail:'',nums:[]};if(!t)return R2;
 const n=t.match(BSV_OFFN);if(n)R2.name=(n[1]+(n[2]?' '+n[2]:'')).trim();
 const A=[...t.matchAll(/((?:[A-ZÄÖÜ][a-zäöüß]+(?:e|er|es)\s)?(?:[A-ZÄÖÜ][a-zäöüß.-]*(?:straße|str\.|strasse|weg|platz|allee|gasse|ring|damm|ufer|steig|berg)|Straße|Str\.|Weg|Platz|Allee|Gasse|Ring|Damm|Ufer)\s*\d+\s?[a-z]?)[,\s]+(\d{5})\s+([A-ZÄÖÜ][a-zäöüß-]+(?: am [A-ZÄÖÜ][a-zäöüß]+)?)/g)].map(z=>z[1].trim()+', '+z[2]+' '+z[3]).filter(a=>!meA||!meA.includes(bsvNorm(a.split(',')[0])));
 R2.addr=A[0]||'';const tl=t.match(/(?:Telefon|Tel\.?|Fon)\s*:?\s*(\+?\d[\d \/()-]{4,}\d)/);if(tl)R2.tel=tl[1].trim();
 R2.mail=([...t.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)].map(z=>z[0]).find(z=>z.toLowerCase()!==String(me.mail||'').toLowerCase())||'').replace(/\.$/,'');
 for(const z of t.matchAll(BSV_NUMR)){const v=z[2].trim().replace(/[.,-]+$/,'');if(/\d/.test(v)&&v.length>=4&&!R2.nums.some(q=>q.v===v))R2.nums.push({t:z[1].replace(/\.$/,'').replace('Steuer-Nr','Steuernummer').replace('St.-Nr','Steuernummer').replace('Az','Aktenzeichen'),v})}
 return R2}
let bsvFl=null;
async function bsvFromLetter(docId,then){try{const d=Ke().items.find(z=>z.id===docId);if(!d)return;const r=await bsvScanDoc(docId),t=(bsvScanC[docId]&&bsvScanC[docId].t)||'';const ld=bsvLetterData(t);
 let it=(d.bsvL&&d.bsvL.it&&bsvGet(d.bsvL.it))||(r&&r.it&&bsvGet(r.it))||(r&&r.src&&bsvD().items.find(z=>z.src===r.src))||((ld.name||ld.mail||ld.tel)&&(bsvSame({n:ld.name||'',mail:ld.mail||'',tel:ld.tel||'',links:[]})||{}).it)||null;
 const k=r&&(r.dl||r.frist);
 bsvFl={doc:docId,it:it?it.id:'',name:it?it.n:(ld.name||(r&&r.src?bsvOfName(r.src):'')),src:r&&r.src||'',addr:ld.addr,tel:ld.tel,mail:ld.mail,nums:ld.nums,
  take:{addr:!!ld.addr,tel:!!ld.tel&&!(it&&it.tel),mail:!1},takeN:ld.nums.map(()=>!0),dk:k||'',dKind:r&&(r.dl?'Antwort':r.obj||'Frist')||'',dOn:k?'yes':'no',kind:r&&r.kind||'',date:r&&r.date||'',obj:r&&r.obj||'',then:then||''};R('bsvfl')}catch(e){Hooks.err('bsvfl',e)}}
function bsvFlScreen(){const f=bsvFl,it=f.it&&bsvGet(f.it);const row=(k,v)=>v?`<label class="bsvtog"><input type="checkbox" data-flt="${k}" ${f.take[k]?'checked':''}><span>${i(v)}</span></label>`:'';
 const ch=it&&f.addr&&it.addr&&bsvNorm(f.addr)!==bsvNorm(it.addr);const found=f.addr||f.tel||f.mail||f.nums.length;
 return`<div class="screen dhome bsv bsvfl">${bsvHdr(bsvt3('fl'),'bsvflx')}
 <label class="bsvl">${i(bsvt3('flOff'))}</label><input class="field" data-fln value="${i(f.name)}" placeholder="${i(bsvt('nmPh'))}" autocomplete="off" ${it?'disabled':''}>
 <label class="bsvl">${i(bsvt3('flTake'))}</label><div class="dhcard bsvbr">${found?row('addr',f.addr)+row('tel',f.tel?'Tel. '+f.tel:'')+row('mail',f.mail)+f.nums.map((n,j)=>`<label class="bsvtog"><input type="checkbox" data-fln2="${j}" ${f.takeN[j]?'checked':''}><span>${i(n.t+' '+n.v)}</span></label>`).join(''):`<p class="dhnone">${i(bsvt3('flNone'))}</p>`}</div>
 ${ch?`<p class="vhint"><b>${i(bsvt3('flChg',{a:it.addr}))}</b></p>`:''}
 ${f.dk?`<label class="bsvl">${i(bsvt3('flDl'))}</label><div class="dhcard warn bsvlb"><b>${i(bsvt3('flSug',{e:f.dKind,f:bsvDE(f.dk)}))}</b><div class="bsvfxb">${['yes','other','no'].map(k=>`<button type="button" class="${f.dOn===k?'on':''}" data-act="bsvfld" data-k="${k}">${i(bsvt3(k==='yes'?'flYes':k==='other'?'flOther':'flNo'))}</button>`).join('')}</div>
  ${f.dOn==='other'?`<input class="field" type="date" data-fldate value="${i(f.dk)}">`:''}</div>`:''}
 <small class="verr" data-flerr></small>
 <button type="button" class="dcadd gold" data-act="bsvflsave">${i(it?bsvt3('flUpd',{n:it.n}):bsvt3('flNew'))}</button><button type="button" class="bsvcan" data-act="bsvflx">${i(bsvt('cancel'))}</button></div>`}
document.addEventListener('change',e=>{const t=e.target;if(!bsvFl||m.route!=='bsvfl'||!t||!t.dataset)return;if(t.dataset.flt)bsvFl.take[t.dataset.flt]=t.checked;if(t.dataset.fln2!=null)bsvFl.takeN[+t.dataset.fln2]=t.checked;if(t.matches('[data-fldate]'))bsvFl.dk=t.value},!0);
document.addEventListener('input',e=>{const t=e.target;if(!bsvFl||m.route!=='bsvfl'||!t||!t.dataset)return;if(t.matches('[data-fln]'))bsvFl.name=t.value;if(t.matches('[data-fldate]'))bsvFl.dk=t.value},!0);
function bsvFlSave(){const f=bsvFl;if(!f)return;const d=Ke().items.find(z=>z.id===f.doc);let it=f.it&&bsvGet(f.it);
 if(!it){const n=String(f.name||'').trim();if(!n){const er=document.querySelector('[data-flerr]');if(er)er.textContent=bsvt('needN');return}
  const c=f.src&&BSV_C.find(z=>z[1]===f.src);it={id:bsvId(),n,e:c?c[2].e:'🏛️',grp:'',src:f.src||'',who:[],tel:'',mail:'',addr:'',hrs:'',term:'',links:[],nums:[],ts:Date.now()};bsvD().items.push(it)}
 if(f.take.addr&&f.addr)it.addr=f.addr;if(f.take.tel&&f.tel)it.tel=f.tel;if(f.take.mail&&f.mail)it.mail=f.mail;
 it.nums=it.nums||[];f.nums.forEach((n,j)=>{if(f.takeN[j]&&!it.nums.some(q=>q.v===n.v))it.nums.push({id:bsvId(),t:n.t,v:n.v,s:!1,m:n.v.slice(-2)})});delete it.chk;
 if(d){d.bsvL=Object.assign(d.bsvL||{},{src:f.src,it:it.id,kind:f.kind,date:f.date,obj:f.obj});delete d.bsvL.no;
  if(f.dk&&f.dOn!=='no'&&/^\d{4}-\d\d-\d\d$/.test(f.dk)&&!d.bsvL.ev){const e=f.dKind,ev=bsvEv({title:bsvt3('calT',{e,o:it.n}),date:f.dk,note:d.title||''});ev.bsvD=d.id;d.bsvL.ev=ev.id;if(f.dKind==='Antwort')d.bsvL.dl=f.dk;else d.bsvL.frist=f.dk;
   const rd=bsvAddDay(f.dk,-7);if(bsvDays(rd)>=0){const tk={id:V(),t:bsvt3('calR',{e,o:it.n}),due:rd,prio:2,proj:'',done:!1,bsvD:d.id};g.tasks.push(tk);d.bsvL.tk=tk.id}}}
 bsvQuiet();$();bsvLetterBanner.v++;const then=f.then;bsvFl=null;bsvToast(bsvt3('flSaved',{n:it.n}));const h=m.hist||[];while(h.length&&h[h.length-1].route==='bsvfl')h.pop();
 if(then==='obj'&&d)return bsvBrNew({it:it.id,tpl:'obj',rdate:d.bsvL.date,kind:d.bsvL.kind,objW:d.bsvL.obj,doc:d.id});bsvSel=it.id;R('bsvi',void 0,!0)}

/* --- Anträge --- */
const BSV_ANT={ausl:['Verlängerung Aufenthaltstitel','Niederlassungserlaubnis','Einbürgerung'],buerger:['Personalausweis','Reisepass','Ummeldung','Führerschein'],fk:['Kindergeld'],jc:['Bürgergeld','Weiterbewilligung Bürgergeld'],
 aa:['Arbeitslosengeld'],fa:['Steuererklärung','Antrag auf Lohnsteuerermäßigung'],drv:['Rentenantrag','Kontenklärung'],kfz:['Zulassung','Ummeldung Fahrzeug'],kk:['Familienversicherung','Kostenübernahme']};
function bsvAntSheet(itId,id){const a=id?JSON.parse(JSON.stringify(bsvAnts().find(z=>z.id===id)||{})):{id:'',it:itId,t:'',who:[],az:'',how:'on',d:x(new Date()),st:1};const it=bsvGet(a.it)||{},o=bsvD();
 const pre=(BSV_ANT[it.src]||[]).map(t=>`<button type="button" data-at="${i(t)}">${i(t)}</button>`).join('');
 H(bsvt3('ants'),`<div class="bsvys bsvas">${pre&&!id?`<div class="bsvchips">${pre}</div>`:''}<label class="bsvl">${i(bsvt3('antT'))}</label><input class="field" data-af="t" value="${i(a.t)}">
  ${o.ppl.length>1?`<label class="bsvl">${i(bsvt('who'))}</label><div class="bsvchips">${o.ppl.map(p=>`<button type="button" class="${a.who.includes(p)?'on':''}" data-ap="${i(p)}">${i(p)}</button>`).join('')}</div>`:''}
  <div class="bsv2c"><div><label class="bsvl">${i(bsvt3('antD'))}</label><input class="field" type="date" data-af="d" value="${i(a.d)}"></div><div><label class="bsvl">${i(bsvt3('antHow'))}</label><select class="field" data-af="how">${['on','post','hand'].map(k=>`<option value="${k}" ${a.how===k?'selected':''}>${i(bsvt3('h_'+k))}</option>`).join('')}</select></div></div>
  <label class="bsvl">${i(bsvt3('az'))}</label><input class="field" data-af="az" value="${i(a.az||'')}" autocomplete="off">
  <small class="verr" data-aerr></small><button type="button" class="dcadd gold" data-asave>${i(bsvt3('save'))}</button>${id?`<button type="button" class="bsvdel" data-adel>${i(bsvt3('del'))}</button>`:''}</div>`,
 el=>{el.classList.add('bsvsh');let arm=0;const rd=()=>el.querySelectorAll('[data-af]').forEach(z=>{a[z.dataset.af]=z.value.trim()});
  el.addEventListener('click',e=>{const t=e.target;const at=t.closest('[data-at]');if(at){el.querySelector('[data-af=t]').value=at.dataset.at;return}
   const ap=t.closest('[data-ap]');if(ap){const j=a.who.indexOf(ap.dataset.ap);j<0?a.who.push(ap.dataset.ap):a.who.splice(j,1);ap.classList.toggle('on');return}
   if(t.closest('[data-asave]')){rd();if(!a.t||!/^\d{4}-\d\d-\d\d$/.test(a.d||'')){el.querySelector('[data-aerr]').textContent=bsvt2('needD');return}const A=bsvAnts();let z=a.id&&A.find(q=>q.id===a.id);
    if(z)Object.assign(z,a);else{z=Object.assign(a,{id:bsvId(),st:1});A.push(z)}bsvAntSync(z);$();el.remove();v();return}
   if(t.closest('[data-adel]')){if(!arm){arm=1;const b=t.closest('[data-adel]');b.textContent=bsvt2('delQ');b.classList.add('on');return}const z=bsvAnts().find(q=>q.id===a.id);if(z){z.st=3;bsvAntSync(z)}bsvD().ant=bsvAnts().filter(q=>q.id!==a.id);$();el.remove();v()}})})}
/* the «ask after 4 weeks» reminder follows the Antrag */
function bsvAntSync(a){const it=bsvGet(a.it)||{};g.tasks=g.tasks||[];let tk=a.tk&&g.tasks.find(z=>z.id===a.tk);const due=bsvAddDay(a.d,28);
 if(a.st>=3){if(tk&&!tk.done)g.tasks=g.tasks.filter(z=>z!==tk);delete a.tk}
 else if(tk)Object.assign(tk,{t:bsvt3('antRem',{t:a.t,o:it.n||''}),due});else{tk={id:V(),t:bsvt3('antRem',{t:a.t,o:it.n||''}),due,prio:2,proj:'',done:!1,bsvA:a.id};g.tasks.push(tk);a.tk=tk.id}bsvQuiet()}
function bsvAntCard(a){const it=bsvGet(a.it)||{},s=a.st||1,step=(n,lab,d,sub)=>`<div class="bsvst2 ${s>n?'ok':s===n?'now':''}"><i></i><div>${i(lab)}${d?' · '+i(bsvDE(d)):''}${sub?`<br><small>${i(sub)}</small>`:''}</div></div>`;
 return`<div class="dhcard bsvant"><button type="button" class="bsvat" data-act="bsvanted" data-id="${i(a.id)}"><b>${i(a.t)}${(a.who||[]).length?' · '+i(a.who.join(', ')):''}</b>${a.az?`<small>${i(bsvt3('az'))}: ${i(a.az)}</small>`:''}</button>
 ${step(1,bsvt3('st1'),a.d,bsvt3('h_'+(a.how||'on')))}${step(2,bsvt3('st2'),a.d2,s===2||s===1?bsvt3('askBy',{d:bsvDE(bsvAddDay(a.d,28))}):'')}${step(3,bsvt3('st3'),a.d3,'')}
 ${s<3?`<div class="bsvfxb"><button type="button" class="on" data-act="bsvantnx" data-id="${i(a.id)}">${i(bsvt3('stNext'))}</button><button type="button" data-act="bsvantask" data-id="${i(a.id)}">${i(bsvt3('stAsk'))}</button></div>`:''}</div>`}

/* --- journal: calls, sent, received --- */
let bsvCallP=null;
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[data-bsvcall]');if(a)bsvCallP={it:a.dataset.bsvcall,at:Date.now()}},!0);
function bsvAfterCall(){const p=bsvCallP;bsvCallP=null;if(!p||!bsvGet(p.it))return;const ag=Date.now()-p.at;if(ag<3e3||ag>3*36e5)return;bsvLogSheet(p.it,'call',!0)}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&bsvCallP)setTimeout(bsvAfterCall,400)});
function bsvLogSheet(itId,k,after){const it=bsvGet(itId)||{};const L2={id:'',it:itId,k,d:x(new Date()),who:'',txt:'',trk:'',ph:null};
 H(bsvt3('k_'+k)+' · '+(it.n||''),`<div class="bsvys">${after?`<p class="vhint"><b>${i(bsvt3('after',{o:it.n||''}))}</b></p>`:''}
  <label class="bsvl">${i(bsvt3('date'))}</label><input class="field" type="date" data-lf="d" value="${i(L2.d)}">
  ${k==='call'?`<label class="bsvl">${i(bsvt3('lWho'))}</label><input class="field" data-lf="who" placeholder="Frau / Herr …" autocomplete="off">`:''}
  <label class="bsvl">${i(bsvt3('lTxt'))}</label><textarea class="field" data-lf="txt" rows="3"></textarea>
  ${k==='sent'?`<label class="bsvl">${i(bsvt3('trk'))}</label><input class="field" data-lf="trk" placeholder="RR 1234 5678 9DE" autocomplete="off">`:''}
  ${k!=='call'?`<label class="bsvl">${i(bsvt3('lPh'))}</label><input class="field" type="file" accept="image/*" data-lph>`:''}
  <button type="button" class="dcadd gold" data-lsave>${i(bsvt3('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-lsave]').onclick=async()=>{el.querySelectorAll('[data-lf]').forEach(z=>{L2[z.dataset.lf]=z.value.trim()});
  const f=el.querySelector('[data-lph]');if(f&&f.files&&f.files[0]){try{const r=await nr(f.files[0]);if(r)L2.ph={id:r.id,n:r.n,type:f.files[0].type||'image/jpeg'}}catch(er){Hooks.err('bsvph',er)}}
  L2.id=bsvId();bsvLogs().unshift(L2);$();el.remove();bsvToast(bsvt('saved')+' ✓');if(m.route==='bsvi')v()}})}
const bsvLogIc={call:'📞',sent:'✉️',got:'📥'};
function bsvLogRow(l){return`<div class="bsvlg"><span class="bsvemo">${bsvLogIc[l.k]||'•'}</span><span><b>${i(bsvDE(l.d))} · ${i(bsvt3('k_'+l.k))}${l.who?' · '+i(l.who):''}${l.via?' · '+i(bsvt3('v_'+l.via)):''}</b>${l.txt?`<small>${i(l.txt)}</small>`:''}${l.trk?`<small>№ ${i(l.trk)}</small>`:''}</span>
 <span class="bsvlgb">${l.trk?`<button type="button" data-act="bsvtrack" data-t="${i(l.trk)}">${i(bsvt3('track'))}</button>`:''}${l.ph?`<button type="button" data-act="bsvlph" data-id="${i(l.id)}">${i(bsvt3('photo'))}</button>`:''}<button type="button" class="x" data-act="bsvlrmv" data-id="${i(l.id)}" aria-label="${i(bsvt3('del'))}">×</button></span></div>`}
let bsvLogAll=0;

/* --- the card gets letters, Anträge and the journal; «Сроки» get the letter deadlines --- */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='bsvi')return h;const it=bsvGet(bsvSel);if(!it)return h;
 let D=[];try{D=Ke().items.filter(d=>d.bsvL&&d.bsvL.it===it.id&&!d.bsvL.no)}catch{}
 const lets=D.length?`<h3 class="odh">${i(bsvt3('lets'))}</h3><div class="dhcard odl">${D.map(d=>{const L2=d.bsvL,f=L2.dl||L2.frist;return`<button type="button" class="odr" data-act="dzopen" data-id="${i(d.id)}">${dhi('mail')}<span><b>${i(d.title||L2.kind||'—')}</b><small>${i([L2.kind,L2.date&&bsvDE(L2.date),f&&('Frist '+bsvDE(f))].filter(Boolean).join(' · '))}</small></span>${dhi('chev','sm')}</button>`}).join('')}</div>`:'';
 const A=bsvAnts().filter(a=>a.it===it.id).sort((a,b)=>(a.st||1)-(b.st||1)||b.d.localeCompare(a.d));
 const ants=A.length?`<h3 class="odh">${i(bsvt3('ants'))}</h3>${A.map(bsvAntCard).join('')}`:'';
 const LG=bsvLogs().filter(l=>l.it===it.id),sh=bsvLogAll?LG:LG.slice(0,5);
 const SD=bsvSentTo(it),sent=SD.length?`<h3 class="odh">${i(bsvt3('sentT'))}</h3><div class="dhcard odl">${SD.slice(0,6).map(d=>`<button type="button" class="odr" data-act="go" data-to="letters">${dhi('mail')}<span><b>${i(d.subj||'—')}</b><small>${i(d.at?vA(x(new Date(d.at))):'')}</small></span>${dhi('chev','sm')}</button>`).join('')}</div>`:'';
 const log=`<h3 class="odh">${i(bsvt3('log'))}</h3>${LG.length?`<div class="dhcard bsvlgs">${sh.map(bsvLogRow).join('')}${LG.length>sh.length?`<button type="button" class="bsvmore" data-act="bsvlogall">${i(bsvt3('all',{n:LG.length}))}</button>`:''}</div>`:''}
`;
 /* v16: one row «＋ ещё» instead of empty sections */
 const more=`<div class="bsvmorer"><b>＋ ${i(bsvt3('moreR'))}</b><div class="bsvfxb">${[['bsvtnew','',bsvt2('tEdit')],['bsvantadd','',bsvt3('antOne')],['bsvlog','call',bsvt3('k_call')],['bsvlog','sent',bsvt3('k_sent')],['bsvlog','got',bsvt3('k_got')],['bsvyadd','',bsvt2('yr')]].map(([a2,k,t])=>`<button type="button" data-act="${a2}" ${k?`data-k="${k}"`:''} data-id="${i(it.id)}">${i(t)}</button>`).join('')}</div></div>`;
 return h.replace('<button type="button" class="bsvdel',lets+sent+ants+(LG.length?log:'')+more+'<button type="button" class="bsvdel')}catch(e){Hooks.err('bsv3screen',e);return h}});
Hooks.on('render',()=>{if(m.route!=='bsvi')bsvLogAll=0;if(m.route!=='bsvfl')bsvFl=null});
function bsvDl3(){try{return Ke().items.filter(d=>d.bsvL&&!d.bsvL.no&&d.bsvL.ev&&(d.bsvL.dl||d.bsvL.frist)).map(d=>{const L2=d.bsvL;return{k:L2.dl||L2.frist,t:(L2.dl?'Frist':L2.obj||'Frist')+': '+bsvOffName(L2),w:d.title||'',act:`data-act="dzopen" data-id="${d.id}"`}})}catch{return[]}}
['bsvfl'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bsvfl'){if(!bsvFl)return setTimeout(()=>R('bsv'),0),'<div class="screen"></div>';return bsvFlScreen()}}catch(e){Hooks.err('bsvbrscreen',e)}});

/* --- actions --- */
Hooks.act('bsvbrnew',d=>bsvToBriefe({it:d.id}));Hooks.act('bsvwrite',d=>bsvWriteSheet(d.id));
Hooks.act('bsvfld',d=>{if(!bsvFl)return;bsvFl.dOn=d.k;bsvRe()});Hooks.act('bsvflsave',()=>{try{bsvFlSave()}catch(e){Hooks.err('bsvflsave',e)}});
Hooks.act('bsvflx',()=>{bsvFl=null;const h=m.hist||[];if(h.length){const p=h.pop();return R(p.route,p.route==='cat'?p.cat:void 0,!0)}R('bsv',void 0,!0)});
Hooks.act('bsvlcal',d=>bsvLDo(d.id,doc=>{const L2=doc.bsvL,it=bsvLTie(doc),on=it?it.n:bsvOffName(L2),k=L2.dl||L2.frist,e=L2.dl?'Antwort':L2.obj||'Frist';if(!k||L2.ev)return;
 const ev=bsvEv({title:bsvt3('calT',{e,o:on}),date:k,note:doc.title||''});ev.bsvD=doc.id;L2.ev=ev.id;const rd=bsvAddDay(k,-7);
 if(bsvDays(rd)>=0){const tk={id:V(),t:bsvt3('calR',{e,o:on}),due:rd,prio:2,proj:'',done:!1,bsvD:doc.id};g.tasks.push(tk);L2.tk=tk.id}bsvQuiet();bsvToast(bsvt2('tSaved').split(',')[0])}));
Hooks.act('bsvltie',d=>bsvFromLetter(d.id));
Hooks.act('bsvlobj',d=>bsvLDo(d.id,doc=>{const it=bsvLTie(doc);if(!it)return bsvFromLetter(doc.id,'obj');setTimeout(()=>bsvBrNew({it:it.id,tpl:'obj',rdate:doc.bsvL.date,kind:doc.bsvL.kind,objW:doc.bsvL.obj,doc:doc.id}),0)}));
Hooks.act('bsvlno',d=>{const doc=Ke().items.find(z=>z.id===d.id);if(!doc)return;doc.bsvL=Object.assign(doc.bsvL||{},{no:1});$();document.querySelectorAll('.bsvlb').forEach(z=>z.remove())});
Hooks.act('bsvantadd',d=>bsvAntSheet(d.id));Hooks.act('bsvanted',d=>{const a=bsvAnts().find(z=>z.id===d.id);if(a)bsvAntSheet(a.it,a.id)});
Hooks.act('bsvantnx',d=>{const a=bsvAnts().find(z=>z.id===d.id);if(!a)return;a.st=Math.min(3,(a.st||1)+1);a['d'+a.st]=x(new Date());bsvAntSync(a);$();v()});
Hooks.act('bsvantask',d=>{const a=bsvAnts().find(z=>z.id===d.id);if(a)bsvBrNew({it:a.it,tpl:'stand',ant:a.id})});
Hooks.act('bsvlog',d=>bsvLogSheet(d.id,d.k));Hooks.act('bsvlogall',()=>{bsvLogAll=1;bsvRe()});
Hooks.act('bsvlrmv',d=>{const l=bsvLogs().find(z=>z.id===d.id);if(l&&l.ph)try{yl(l.ph)}catch{}bsvD().log=bsvLogs().filter(z=>z.id!==d.id);$();bsvRe()});
Hooks.act('bsvtrack',d=>{bsvCopy(String(d.t||'').replace(/\s+/g,''));bsvToast(bsvt3('trackS'));setTimeout(()=>{try{window.open('https://www.deutschepost.de/briefstatus','_blank','noopener')}catch{}},300)});
Hooks.act('bsvlph',d=>{const l=bsvLogs().find(z=>z.id===d.id);if(!l||!l.ph)return;ni(l.ph).then(b=>{if(!b)return;const s=atob(b),u=new Uint8Array(s.length);for(let j=0;j<s.length;j++)u[j]=s.charCodeAt(j);
 const url=URL.createObjectURL(new Blob([u],{type:l.ph.type||'image/jpeg'}));H(bsvt3('photo'),`<img src="${url}" alt="" style="width:100%;border-radius:14px">`);setTimeout(()=>URL.revokeObjectURL(url),12e4)}).catch(e=>Hooks.err('bsvlph',e))});

Hooks.css('docs-behoerden-3',`
.bsvlb,.bsvlb button,.bsvlb small{font-family:-apple-system,"SF Pro Text",system-ui,sans-serif!important}.bsvlb b{font-weight:700}
.bsvlb{display:flex;flex-direction:column;gap:4px;background:#fff8e6!important;border:1px solid #f0dca8!important;margin:6px 0 10px}.bsvlb small{color:var(--muted);font-size:13px;line-height:1.38}.bsvlb small b{color:var(--ink)}
.bsvlb .bsvfxb a,.bsvlb .bsvfxb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600;color:var(--ink)!important}
.bsvlb .bsvfxb .on{background:var(--green);border-color:var(--green);color:#fff!important}.bsvlb .bsvfxb .x{margin-left:auto;color:var(--muted)!important}.bsvok{font-size:13.5px;font-weight:600;color:#2c8a4b;padding:8px 4px}
.bsvant{padding-top:10px!important}.bsvat{display:flex;flex-direction:column;gap:2px;border:0;background:none;padding:0 0 6px;text-align:left;width:100%}.bsvat b{font-weight:700}.bsvat small{color:var(--muted);font-size:13px}
.bsvst2{display:flex;gap:10px;align-items:flex-start;padding:5px 0;font-size:14.5px}.bsvst2 i{width:13px;height:13px;border-radius:50%;background:var(--line);margin-top:4px;flex:none}.bsvst2.ok i{background:#2c8a4b}.bsvst2.now i{background:#d9a017;box-shadow:0 0 0 4px #fbecc4}.bsvst2 small{color:var(--muted);font-size:12.5px}
.bsvant .bsvfxb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600}.bsvant .bsvfxb .on{background:var(--green);border-color:var(--green);color:#fff!important}
.bsvlgs{display:flex;flex-direction:column;padding-top:4px!important;padding-bottom:4px!important}.bsvlg{display:flex;gap:10px;align-items:flex-start;padding:9px 0}.bsvlg+.bsvlg{border-top:1px solid var(--line)}
.bsvlg>span:nth-child(2){flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.bsvlg b{font-weight:600;font-size:14px}.bsvlg small{color:var(--muted);font-size:13px;overflow-wrap:anywhere}
.bsvlgb{display:flex;gap:4px;flex:none}.bsvlgb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:5px 9px;font-size:12px;font-weight:600;color:var(--green)!important}.bsvlgb .x{color:var(--muted)!important}
.bsvlgadd{margin-top:6px}.bsvlgadd button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600}.bsvlgadd .on{background:var(--green);border-color:var(--green);color:#fff!important}
.bsvmorer{margin:14px 0 4px}.bsvmorer>b{display:block;color:var(--green);font-size:15px;margin:0 2px 2px}.bsvmorer .bsvfxb button{border:1px dashed var(--green);background:none;border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600;color:var(--green)!important}
.bsvfl .bsvl{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 2px 6px}.bsvfl .field{width:100%;box-sizing:border-box}.bsvfl .bsvlb input{margin-top:8px}
.bsvmore{border:0;background:none;color:var(--green)!important;font-weight:600;padding:8px 0;text-align:left}
`);
