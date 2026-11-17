/* ===== Butler Docs: Behörden & Services (stage 3) — letters, Anträge, journal =====
   - A scanned letter: the scanned text tells which office wrote, what kind of letter, its date and (for a Bescheid)
     the objection deadline: date + 4 days (Bekanntgabe, rule since 2025) + 1 month, moved off a weekend. Always «bitte prüfen».
     An explicit «bis zum …» in the letter is taken as it stands. The document can be tied to the office.
   - Letters from templates, in German only (Einspruch/Widerspruch, Fristverlängerung, Adressänderung, Unterlagen nachreichen,
     Sachstandsanfrage, free text): sender, office, reference numbers and dates are filled in. Print / PDF, e-mail, copy;
     «Отправлено» writes it into the journal and into «Письма».
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
 v_ein:['Einschreiben','Einschreiben','Registered'],v_post:['Обычной почтой','Brief','Post'],v_mail:['E-mail','E-Mail','Email'],v_fax:['Факс','Fax','Fax'],v_hand:['Лично','Persönlich','In person'],
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
 all:['Все записи: %n','Alle Einträge: %n','All entries: %n'],date:['Дата','Datum','Date'],save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],none:['Пока пусто','Noch leer','Empty so far'],photo:['фото','Foto','photo']};
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
 const c=bsvScanC[id];if(c&&c.len===t.length)return c.r;const r=bsvParse(t);bsvScanC[id]={len:t.length,r};return r}catch(e){Hooks.err('bsvscan',e);return null}}
async function bsvLetterBanner(){try{if(m.route!=='bdoc')return;const id=m.bdid,d=Ke().items.find(z=>z.id===id);if(!d||(d.bsvL&&d.bsvL.no))return;
 const hd=document.querySelector('.screen > .sub-hdr');if(!hd)return;const ex=document.querySelector('.bsvlb');if(ex&&ex.dataset.id===id&&ex.dataset.v===String(bsvLetterBanner.v))return;
 const r=await bsvScanDoc(id);if(m.route!=='bdoc'||m.bdid!==id)return;if(!r){ex&&ex.remove();return}const L2=d.bsvL||{};const on=bsvOffName(Object.assign({},r,L2.it?{it:L2.it}:{}));
 const f=L2.frist||r.frist,dl=L2.dl||r.dl;
 const html=`<div class="dhcard warn bsvlb" data-id="${i(id)}" data-v="${bsvLetterBanner.v}"><b>🏛️ ${i(bsvt3('ltOf',{o:on}))}</b>${r.kind||r.date?`<small>${i(bsvt3('ltKind',{k:r.kind||bsvt3('lt'),d:r.date?bsvDE(r.date):'—'}))}</small>`:''}
  ${f?`<small>${i(bsvt3('obj',{e:r.obj,f:bsvDE(f)}))}</small>`:''}${dl?`<small><b>${i(bsvt3('expl',{f:bsvDE(dl)}))}</b></small>`:''}
  <div class="bsvfxb">${f||dl?L2.ev?`<span class="bsvok">${i(bsvt3('inCal'))}</span>`:`<button type="button" class="on" data-act="bsvlcal" data-id="${i(id)}">${i(bsvt3('toCal'))}</button>`:''}
  ${L2.it&&bsvGet(L2.it)?`<button type="button" data-act="bsvopen" data-id="${i(L2.it)}">${i(bsvt3('tied',{o:bsvGet(L2.it).n}))}</button>`:(r.it||r.src)?`<button type="button" data-act="bsvltie" data-id="${i(id)}">${i(bsvt3('toOff',{o:on}))}</button>`:''}
  ${r.obj?`<button type="button" data-act="bsvlobj" data-id="${i(id)}">${i(r.obj)}</button>`:''}<button type="button" class="x" data-act="bsvlno" data-id="${i(id)}" aria-label="×">×</button></div></div>`;
 const w=document.createElement('div');w.innerHTML=html;if(ex)ex.replaceWith(w.firstElementChild);else hd.after(w.firstElementChild)}catch(e){Hooks.err('bsvlb',e)}}
bsvLetterBanner.v=0;
Hooks.on('render',()=>{if(m.route==='bdoc')bsvLetterBanner()});
{let q=0;new MutationObserver(()=>{if(q||m.route!=='bdoc')return;q=1;setTimeout(()=>{q=0;if(!document.querySelector('.bsvlb'))bsvLetterBanner()},300)}).observe(document.body,{childList:!0,subtree:!0})}
async function bsvLDo(id,f){const d=Ke().items.find(z=>z.id===id);if(!d)return;const r=await bsvScanDoc(id);if(!r)return;d.bsvL=Object.assign({src:r.src,it:r.it,kind:r.kind,date:r.date,frist:r.frist,dl:r.dl,obj:r.obj},d.bsvL||{});f(d,r);$();bsvLetterBanner.v++;bsvLetterBanner()}
function bsvLTie(d){const L2=d.bsvL;if(L2.it&&bsvGet(L2.it))return bsvGet(L2.it);let it=L2.src&&bsvD().items.find(z=>z.src===L2.src);if(!it&&L2.src)it=bsvAddSrc(L2.src,!1);if(it)L2.it=it.id;return it}

/* --- letters from templates (German only) --- */
const BSV_TPL={
 obj:{n:'Einspruch / Widerspruch',subj:c=>`${c.objW} gegen den ${c.kind||'Bescheid'} vom ${c.rd||'…'}`,body:c=>`hiermit lege ich gegen den ${c.kind||'Bescheid'} vom ${c.rd||'…'} fristgerecht ${c.objW} ein.\n\nDie Begründung reiche ich gesondert nach.\n\nBitte bestätigen Sie mir den Eingang dieses Schreibens.`},
 frist:{n:'Fristverlängerung',subj:c=>`Antrag auf Fristverlängerung${c.rd?' – Ihr Schreiben vom '+c.rd:''}`,body:c=>`in der oben genannten Angelegenheit bitte ich um Verlängerung der Frist bis zum ${c.plus4w}.\n\nGrund: \n\nVielen Dank für Ihr Verständnis.`},
 adr:{n:'Adressänderung',subj:()=>'Mitteilung meiner neuen Anschrift',body:c=>`hiermit teile ich Ihnen mit, dass sich meine Anschrift ab dem ${c.today} geändert hat.\n\nNeue Anschrift:\n${c.addr||'…'}\n\nBitte senden Sie künftige Post an diese Anschrift.`},
 nach:{n:'Unterlagen nachreichen',subj:c=>`Nachreichung von Unterlagen${c.rd?' – Ihr Schreiben vom '+c.rd:''}`,body:()=>`anbei übersende ich Ihnen die angeforderten Unterlagen:\n\n- \n- \n\nBitte bestätigen Sie mir den Eingang.`},
 stand:{n:'Sachstandsanfrage',subj:c=>`Sachstandsanfrage${c.ant?' – '+c.ant:''}`,body:c=>`am ${c.antD||'…'} habe ich ${c.ant?'meinen Antrag „'+c.ant+'“':'einen Antrag'} gestellt. Bis heute habe ich keine Nachricht von Ihnen erhalten.\n\nBitte teilen Sie mir den aktuellen Stand der Bearbeitung mit.`},
 frei:{n:'Freier Text',subj:()=>'',body:()=>''}};
let bsvBr=null;
function bsvMe(){let me={};try{me=ja()}catch{}const name=[me.first,me.mid,me.last].filter(Boolean).join(' ')||((g.user&&[g.user.first,g.user.last].filter(Boolean).join(' '))||'');const addr=String(me.addr||(bsvD().nf||{}).addr||'').trim();return{name,addr}}
function bsvAz(it,ant){if(ant&&ant.az)return'Aktenzeichen: '+ant.az;const n=(it.nums||[]).find(z=>!z.s&&z.v&&/aktenzeichen|steuernummer|kundennummer|bg-nummer|kindergeld|versicherungsnummer|\baz\b/i.test(z.t||''));return n?(n.t+': '+n.v):''}
function bsvLetter(b){const it=bsvGet(b.it)||{},me=bsvMe(),ant=b.ant&&bsvAnts().find(z=>z.id===b.ant),tp=BSV_TPL[b.tpl]||BSV_TPL.frei;
 const today=bsvDE(x(new Date())),c={objW:/finanzamt|familienkasse/i.test(it.n||'')||it.src==='fa'||it.src==='fk'?'Einspruch':(b.objW||'Widerspruch'),kind:b.kind,rd:bsvDE(b.rdate),plus4w:bsvDE(bsvAddDay(x(new Date()),28)),today,addr:me.addr,ant:ant&&ant.t,antD:ant&&bsvDE(ant.d)};
 if(b.objW)c.objW=b.objW;const city=(me.addr.match(/\d{5}\s+([^\n,]+)/)||[])[1]||((g.cityX&&g.cityX.name)||'');
 const to=[it.n,...String(it.addr||'').split(/\s*,\s*/)].filter(Boolean).join('\n'),az=b.az!=null?b.az:bsvAz(it,ant),subj=tp.subj(c);
 return{subj,text:[me.name,me.addr,'',to,'',(city?city.trim()+', ':'')+today,'',subj,az,'','Sehr geehrte Damen und Herren,','',tp.body(c),'','Mit freundlichen Grüßen','','',me.name].filter((l,j,a)=>!(l===''&&a[j-1]==='')).join('\n').replace(/^\n+/,'')}}
function bsvBrNew(o){bsvBr=Object.assign({it:'',tpl:'frei',rdate:'',kind:'',objW:'',ant:'',doc:'',via:'ein',trk:''},o||{});const L2=bsvLetter(bsvBr);bsvBr.subj=L2.subj;bsvBr.text=L2.text;R('bsvbr')}
function bsvBrScreen(){const b=bsvBr,it=bsvGet(b.it)||{},me=bsvMe();
 return`<div class="screen dhome bsv bsvbr">${bsvHdr(bsvt3('br'),'bsvbrx')}
 <div class="bsvhd sm"><span class="bsvemo big">${i(it.e||'🏛️')}</span><h3>${i(it.n||'—')}</h3></div>
 <label class="bsvl">${i(bsvt3('tpl'))}</label><div class="bsvchips">${Object.entries(BSV_TPL).map(([k,t])=>`<button type="button" class="${b.tpl===k?'on':''}" data-act="bsvbrtpl" data-k="${k}">${i(t.n)}</button>`).join('')}</div>
 ${me.addr?'':`<p class="vhint">${i(bsvt3('noAddr'))}</p>`}
 <label class="bsvl">${i(bsvt3('txt'))}</label><textarea class="field bsvbrt" data-brf="text" rows="16" spellcheck="true" lang="de">${i(b.text)}</textarea>
 <label class="bsvl">${i(bsvt3('via'))}</label><div class="bsvchips">${['ein','post','mail','fax','hand'].map(k=>`<button type="button" class="${b.via===k?'on':''}" data-act="bsvbrvia" data-k="${k}">${i(bsvt3('v_'+k))}</button>`).join('')}</div>
 ${b.via==='ein'?`<label class="bsvl">${i(bsvt3('trk'))}</label><input class="field" data-brf="trk" value="${i(b.trk||'')}" placeholder="RR 1234 5678 9DE" autocomplete="off">`:''}
 <div class="bsvbra"><button type="button" class="dcadd gold" data-act="bsvbrprint">${i(bsvt3('print'))}</button>
 <div class="bsv2c"><button type="button" class="bsvsm" data-act="bsvbrmail">${i(bsvt3('mail'))}</button><button type="button" class="bsvsm" data-act="bsvbrcopy">${i(bsvt3('copy'))}</button></div>
 <button type="button" class="dcadd" data-act="bsvbrsent">✓ ${i(bsvt3('sent'))}</button></div></div>`}
document.addEventListener('input',e=>{const t=e.target;if(!bsvBr||m.route!=='bsvbr'||!t.dataset||!t.dataset.brf)return;bsvBr[t.dataset.brf]=t.value},!0);
function bsvBrPrint(){const b=bsvBr;if(!b)return;const it=bsvGet(b.it)||{};const doc=`<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(b.subj||'Brief')}</title>
<style>@page{size:A4;margin:25mm 20mm 20mm 25mm}body{font:11.5pt/1.45 Georgia,"Times New Roman",serif;color:#000;max-width:170mm;margin:12mm auto;padding:0 6mm;white-space:pre-wrap}</style></head><body>${i(b.text)}</body>
<script>setTimeout(function(){try{print()}catch(e){}},500)<\/script></html>`;
 try{const u=URL.createObjectURL(new Blob([doc],{type:'text/html'}));const w=window.open(u,'_blank');if(!w){const a=document.createElement('a');a.href=u;a.download=(it.n||'Brief').replace(/[^\wäöüß -]+/gi,'')+'.html';a.click()}setTimeout(()=>URL.revokeObjectURL(u),6e4)}catch(e){Hooks.err('bsvprint',e)}}
function bsvBrSent(){const b=bsvBr;if(!b)return;const it=bsvGet(b.it)||{};bsvLogs().unshift({id:bsvId(),it:b.it,k:'sent',d:x(new Date()),txt:b.subj||BSV_TPL[b.tpl].n,via:b.via,trk:b.via==='ein'?String(b.trk||'').trim():''});
 try{g.drafts=g.drafts||[];g.drafts.unshift({id:V(),to:it.mail||it.n||'',subj:b.subj||'',text:b.text,at:Date.now(),sent:!0})}catch{}
 if(b.ant){const a=bsvAnts().find(z=>z.id===b.ant);if(a)a.asked=x(new Date())}
 bsvQuiet();$();bsvToast(bsvt3('sentOk'));const id=b.it;bsvBr=null;const h=m.hist||[];while(h.length&&h[h.length-1].route==='bsvbr')h.pop();if(bsvGet(id)){bsvSel=id;R('bsvi',void 0,!0)}else R('bsv',void 0,!0)}

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
 const ants=`<h3 class="odh">${i(bsvt3('ants'))}</h3>${A.map(bsvAntCard).join('')}<button type="button" class="bsvplus" data-act="bsvantadd" data-id="${i(it.id)}">${i(bsvt3('antAdd'))}</button>`;
 const LG=bsvLogs().filter(l=>l.it===it.id),sh=bsvLogAll?LG:LG.slice(0,5);
 const log=`<h3 class="odh">${i(bsvt3('log'))}</h3>${LG.length?`<div class="dhcard bsvlgs">${sh.map(bsvLogRow).join('')}${LG.length>sh.length?`<button type="button" class="bsvmore" data-act="bsvlogall">${i(bsvt3('all',{n:LG.length}))}</button>`:''}</div>`:''}
  <div class="bsvfxb bsvlgadd">${['call','sent','got'].map(k=>`<button type="button" ${k==='call'?'class="on"':''} data-act="bsvlog" data-k="${k}" data-id="${i(it.id)}">＋ ${i(bsvt3('k_'+k))}</button>`).join('')}</div>`;
 return h.replace('<button type="button" class="bsvdel',lets+ants+log+'<button type="button" class="bsvdel')}catch(e){Hooks.err('bsv3screen',e);return h}});
Hooks.on('render',()=>{if(m.route!=='bsvi')bsvLogAll=0;if(m.route!=='bsvbr')bsvBr=null});
function bsvDl3(){try{return Ke().items.filter(d=>d.bsvL&&!d.bsvL.no&&d.bsvL.ev&&(d.bsvL.dl||d.bsvL.frist)).map(d=>{const L2=d.bsvL;return{k:L2.dl||L2.frist,t:(L2.dl?'Frist':L2.obj||'Frist')+': '+bsvOffName(L2),w:d.title||'',act:`data-act="dzopen" data-id="${d.id}"`}})}catch{return[]}}
OD_OK.add('bsvbr');Te.includes('bsvbr')||Te.push('bsvbr');
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bsvbr'){if(!bsvBr)return setTimeout(()=>R('bsv'),0),'<div class="screen"></div>';return bsvBrScreen()}}catch(e){Hooks.err('bsvbrscreen',e)}});

/* --- actions --- */
Hooks.act('bsvbrnew',d=>bsvBrNew({it:d.id}));
Hooks.act('bsvbrx',()=>{const id=bsvBr&&bsvBr.it;bsvBr=null;const h=m.hist||[];if(h.length){const p=h.pop();return R(p.route,p.route==='cat'?p.cat:void 0,!0)}if(id&&bsvGet(id)){bsvSel=id;return R('bsvi',void 0,!0)}R('bsv',void 0,!0)});
Hooks.act('bsvbrtpl',d=>{if(!bsvBr)return;bsvBr.tpl=d.k;const L2=bsvLetter(bsvBr);bsvBr.subj=L2.subj;bsvBr.text=L2.text;bsvRe()});
Hooks.act('bsvbrvia',d=>{if(!bsvBr)return;bsvBr.via=d.k;bsvRe()});
Hooks.act('bsvbrprint',()=>bsvBrPrint());Hooks.act('bsvbrcopy',()=>{if(bsvBr)bsvCopy(bsvBr.text)});
Hooks.act('bsvbrmail',()=>{const b=bsvBr;if(!b)return;const it=bsvGet(b.it)||{};if(!it.mail)return bsvToast(bsvt3('noMail'));location.href='mailto:'+encodeURIComponent(it.mail).replace('%40','@')+'?subject='+encodeURIComponent(b.subj||'')+'&body='+encodeURIComponent(b.text||'')});
Hooks.act('bsvbrsent',()=>{try{bsvBrSent()}catch(e){Hooks.err('bsvbrsent',e)}});
Hooks.act('bsvlcal',d=>bsvLDo(d.id,doc=>{const L2=doc.bsvL,it=bsvLTie(doc),on=it?it.n:bsvOffName(L2),k=L2.dl||L2.frist,e=L2.dl?'Antwort':L2.obj||'Frist';if(!k||L2.ev)return;
 const ev=bsvEv({title:bsvt3('calT',{e,o:on}),date:k,note:doc.title||''});ev.bsvD=doc.id;L2.ev=ev.id;const rd=bsvAddDay(k,-7);
 if(bsvDays(rd)>=0){const tk={id:V(),t:bsvt3('calR',{e,o:on}),due:rd,prio:2,proj:'',done:!1,bsvD:doc.id};g.tasks.push(tk);L2.tk=tk.id}bsvQuiet();bsvToast(bsvt2('tSaved').split(',')[0])}));
Hooks.act('bsvltie',d=>bsvLDo(d.id,doc=>{const it=bsvLTie(doc);if(it)bsvToast(bsvt3('tied',{o:it.n}))}));
Hooks.act('bsvlobj',d=>bsvLDo(d.id,doc=>{const it=bsvLTie(doc);if(!it)return;setTimeout(()=>bsvBrNew({it:it.id,tpl:'obj',rdate:doc.bsvL.date,kind:doc.bsvL.kind,objW:doc.bsvL.obj,doc:doc.id}),0)}));
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
.bsvbr .bsvl{display:block;font-size:13px;font-weight:600;color:var(--muted);margin:14px 2px 6px}.bsvbr .field{width:100%;box-sizing:border-box}
.bsvbrt{font:14.5px/1.45 Georgia,"Times New Roman",serif!important;height:440px!important;min-height:440px!important;max-height:none!important;resize:vertical;white-space:pre-wrap}
.bsvbra{display:flex;flex-direction:column;gap:8px;margin-top:12px}.bsvbra .bsv2c .bsvsm{width:100%;padding:12px}
.bsvant{padding-top:10px!important}.bsvat{display:flex;flex-direction:column;gap:2px;border:0;background:none;padding:0 0 6px;text-align:left;width:100%}.bsvat b{font-weight:700}.bsvat small{color:var(--muted);font-size:13px}
.bsvst2{display:flex;gap:10px;align-items:flex-start;padding:5px 0;font-size:14.5px}.bsvst2 i{width:13px;height:13px;border-radius:50%;background:var(--line);margin-top:4px;flex:none}.bsvst2.ok i{background:#2c8a4b}.bsvst2.now i{background:#d9a017;box-shadow:0 0 0 4px #fbecc4}.bsvst2 small{color:var(--muted);font-size:12.5px}
.bsvant .bsvfxb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600}.bsvant .bsvfxb .on{background:var(--green);border-color:var(--green);color:#fff!important}
.bsvlgs{display:flex;flex-direction:column;padding-top:4px!important;padding-bottom:4px!important}.bsvlg{display:flex;gap:10px;align-items:flex-start;padding:9px 0}.bsvlg+.bsvlg{border-top:1px solid var(--line)}
.bsvlg>span:nth-child(2){flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.bsvlg b{font-weight:600;font-size:14px}.bsvlg small{color:var(--muted);font-size:13px;overflow-wrap:anywhere}
.bsvlgb{display:flex;gap:4px;flex:none}.bsvlgb button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:5px 9px;font-size:12px;font-weight:600;color:var(--green)!important}.bsvlgb .x{color:var(--muted)!important}
.bsvlgadd{margin-top:6px}.bsvlgadd button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 12px;font-size:13.5px;font-weight:600}.bsvlgadd .on{background:var(--green);border-color:var(--green);color:#fff!important}
.bsvmore{border:0;background:none;color:var(--green)!important;font-weight:600;padding:8px 0;text-align:left}
`);
