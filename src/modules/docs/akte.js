/* ===== Butler Docs: stage 4 of BUTLER 2.0 — Document Connection (v77) =====
   Documents stop being single files and form one file per matter — on the phone only, nothing linked without a yes.
   - Akte of a contract (route akte): price history as bars, the timeline contract → bills → payments → letters
     (every document with d.ctr = this contract), bills without «bezahlt» are marked «prüfen?», the deadlines,
     the note, «＋ Dokument verknüpfen» (suggestions first: same number or company), «Kündigen».
     The contract screen gets a card «Akte · N Dokumente ›».
   - On every document: «Gehört das zu „X“?» Ja / Nein (Nein is remembered, d.ctrNo), or «Gehört zu: Vertrag X ›»
     with ✕ (the link goes, the document stays); a bill can be marked «bezahlt» (d.paid = date).
   - Besitz cards (route akw): «Auto» and «Wohnung» gather the contracts, documents and expenses that belong to them
     (by kind and words, plus what the user added: d.ast, removed: d.astNo), the next TÜV / deadlines and the cost
     since January. Reached from Finanzen → Verträge and from the vehicle document.
   Data: d.ctr, d.ctrNo{id:1}, d.paid, d.ast ('car'|'home'), d.astNo{car|home:1} */
const akS={
 akte:['Дело','Akte','File'],docsN:['документов: %n','%n Dokumente','%n documents'],dlN:['сроков: %n','%n Fristen','%n deadlines'],ctrNo:['Договор · № %n','Vertrag · Nr. %n','Contract · No. %n'],ctrT:['Договор','Vertrag','Contract'],
 perM:['%a / мес.','%a / Monat','%a / month'],since:['с %d','seit %d','since %d'],nextP:['с %d: %a','ab %d: %a','from %d: %a'],
 hist:['История цены','Preisverlauf','Price history'],line:['История','Verlauf','History'],paid:['✓ оплачено %d','✓ bezahlt am %d','✓ paid on %d'],unpaid:['без отметки «оплачено» — проверить?','ohne „bezahlt“ – prüfen?','not marked “paid” – check?'],
 start:['Начало договора','Vertragsbeginn','Contract start'],orig:['оригинал','Original','original'],note:['Заметка','Notiz','Note'],
 link:['＋ Связать документ','＋ Dokument verknüpfen','＋ Link a document'],pick:['Какие документы относятся к делу?','Welche Dokumente gehören dazu?','Which documents belong here?'],sug:['Похоже, подходят','Passt vermutlich','Probably fitting'],all:['Все документы','Alle Dokumente','All documents'],save:['Сохранить','Speichern','Save'],
 noDocs:['Пока нет связанных документов. Счета и письма связываются сами — через «Входящие» или кнопкой ниже.','Noch keine verknüpften Dokumente. Rechnungen und Briefe kommen über den „Eingang“ oder den Knopf unten dazu.','No linked documents yet. Bills and letters come in via the “Inbox” or the button below.'],
 open:['Открыть договор','Vertrag öffnen','Open contract'],cancel:['Расторгнуть','Kündigen','Cancel'],
 q:['Это относится к «%n»?','Gehört das zu „%n“?','Does this belong to “%n”?'],qNum:['Тот же номер %v.','Gleiche Nummer %v.','Same number %v.'],qName:['То же название фирмы.','Gleicher Firmenname.','Same company name.'],
 yes:['Да, связать','Ja, verknüpfen','Yes, link'],no:['Нет','Nein','No'],belongs:['Относится к: %n','Gehört zu: %n','Belongs to: %n'],linked:['Связано с «%n»','Verknüpft mit „%n“','Linked with “%n”'],unlinked:['Связь убрана, документ остался','Verknüpfung entfernt, das Dokument bleibt','Link removed, the document stays'],
 markPaid:['✓ Отметить как оплаченный','✓ Als bezahlt markieren','✓ Mark as paid'],paidOk:['Отмечено: оплачено','Vermerkt: bezahlt','Noted: paid'],
 keep:['Удаление связи никогда не удаляет сам документ.','Eine Verknüpfung löschen entfernt nie das Dokument selbst.','Removing a link never deletes the document itself.'],
 car:['Машина','Auto','Car'],home:['Жильё','Wohnung','Home'],carAll:['Всё о машине','Alles zum Auto','Everything about the car'],homeAll:['Всё о жилье','Alles zur Wohnung','Everything about the home'],
 besitz:['Имущество','Besitz','Property'],costY:['%a с января','%a seit Januar','%a since January'],perMo:['≈ %a в месяц','≈ %a / Monat','≈ %a / month'],
 soon:['Скоро','Bald','Soon'],every:['Всё по теме','Alles dazu','Everything'],ctrs:['Договоры','Verträge','Contracts'],docs:['Документы','Dokumente','Documents'],spend:['Расходы с января','Ausgaben seit Januar','Spending since January'],
 addDoc:['＋ Добавить документ','＋ Dokument hinzufügen','＋ Add a document'],rm:['Не относится','Gehört nicht dazu','Not related'],tuv:['TÜV до %d','TÜV bis %d','TÜV until %d'],
 emptyA:['Пока ничего не найдено. Добавьте документ (Fahrzeugschein, страховку, TÜV) — Батлер соберёт остальное.','Noch nichts gefunden. Fügen Sie ein Dokument hinzu (Fahrzeugschein, Versicherung, TÜV) – Butler sammelt den Rest.','Nothing found yet. Add a document (registration, insurance, TÜV) – Butler gathers the rest.']};
const akt=(k,o)=>{let s=cv5n(akS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const akDocs=()=>{try{return(Ke().items||[]).filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const akDate=d=>{const o=(()=>{try{return eiRead(d)}catch{return{}}})();return d.date||o.due||(d.ts?new Date(d.ts).toISOString().slice(0,10):'')};
const akLinked=id=>akDocs().filter(d=>d.ctr===id);
let akSel=null,akKind=null;
/* ---------- the Akte of a contract ---------- */
function akScreen(e){let P=[];try{P=qr(e)}catch{}const mo=p=>vaMo(e,p),r=vaRise(e),D=akLinked(e.id).map(d=>({d,k:akDate(d),o:(()=>{try{return eiRead(d)}catch{return{}}})()})).sort((a,b)=>String(b.k).localeCompare(String(a.k)));
 let kb=null;try{kb=uc(e)}catch{}const dls=[kb?{t:krt('kbS',{d:vaDate(kb)}),k:kb}:null,r&&r.dl&&!r.ok?{t:vat('sk',{d:vaDate(r.dl)}),k:r.dl}:null].filter(Boolean);
 const mx=Math.max(1,...P.map(mo)),bars=P.slice(-6).map((p,j,A)=>`<div><i class="${j===A.length-1&&r?'u':''}" style="height:${Math.max(8,Math.round(mo(p)/mx*80))}px"></i>${i(String(p.from||'').slice(0,4))}<br>${i(vaEur(mo(p)).replace(/,00\s/,' '))}</div>`).join('');
 const tl=D.map(x=>{const o=x.o,inv=o.kind==='inv',warn=inv&&!x.d.paid||o.newP;
  const sub=[x.k?vaDate(x.k):'',o.newP?vaEur(o.newP):o.amt?vaEur(o.amt):'',inv?(x.d.paid?akt('paid',{d:vaDate(x.d.paid)}):akt('unpaid')):''].filter(Boolean).join(' · ');
  return`<button type="button" class="${warn?'w':''}" data-act="dzopen" data-id="${x.d.id}"><b>${i(x.d.title||'—')}</b><small>${i(sub)}</small></button>`}).join('');
 return`<div class="screen dhome fz va akw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(e.co||e.title||'—')}</h2></div><span></span></div>
 <div class="vahero"><small>${i(e.polno?akt('ctrNo',{n:e.polno}):akt('ctrT'))}</small><b>${i(akt('perM',{a:vaEur(vaMo(e))}))}</b><small>${i([e.start?akt('since',{d:vaDate(e.start)}):'',r&&r.from>vaIso(0)?akt('nextP',{d:vaDate(r.from),a:vaEur(r.neu)}):''].filter(Boolean).join(' · '))}</small>
  <div class="vahs"><span>${i(akt('docsN',{n:D.length}))}</span><span>${i(akt('dlN',{n:dls.length}))}</span></div></div>
 ${r&&!r.ok?vaRiseCard(r):''}
 ${P.length>1?`<h3 class="vash">${i(akt('hist'))}</h3><div class="vacard"><div class="akpc">${bars}</div></div>`:''}
 ${dls.length?`<h3 class="vash">${i(akt('soon'))}</h3><div class="vacard vasoon">${dls.map(x=>`<button type="button" data-act="go" data-to="dsrok"><span>${i(x.t)}</span><em>${i(vat('left',{n:vaDays(x.k)}))}</em></button>`).join('')}</div>`:''}
 <h3 class="vash">${i(akt('line'))}</h3><div class="vacard"><div class="aktl">${tl}${e.start?`<button type="button" data-act="insopen" data-id="${e.id}"><b>${i(akt('start'))}</b><small>${i(vaDate(e.start))}${(e.files||[]).length?' · '+i(akt('orig')):''}</small></button>`:''}</div>${D.length?'':`<p class="dhnone">${i(akt('noDocs'))}</p>`}</div>
 ${e.note?`<div class="vacard"><div class="varow"><span class="vaic">📝</span><span class="vatx"><b>${i(akt('note'))}</b><small>${i(e.note)}</small></span></div></div>`:''}
 <button type="button" class="vaadd" data-act="aklink" data-id="${e.id}">${i(akt('link'))}</button>
 <div class="vabtns"><button type="button" class="vabtn" data-act="insopen" data-id="${e.id}">${i(akt('open'))}</button><button type="button" class="vabtn" data-act="vakd" data-id="${e.id}">${i(akt('cancel'))}</button></div>
 <p class="vanote">${i(akt('keep'))}</p></div>`}
function akLinkSheet(id){const e=vaContracts().find(z=>z.id===id);if(!e)return;const D=akDocs(),fit=d=>{try{const mt=eiMatch(d);return mt&&mt.c.id===id}catch{return!1}};
 const S=D.filter(d=>d.ctr===id||fit(d)),O=D.filter(d=>!S.includes(d)).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,60),row=d=>`<label class="bsvtog"><input type="checkbox" data-akd="${i(d.id)}" ${d.ctr===id?'checked':''}><span>${i(d.title||'—')}${d.party?` · <small>${i(d.party)}</small>`:''}</span></label>`;
 H(akt('pick'),`<div class="bsvys">${S.length?`<h3 class="odh">${i(akt('sug'))}</h3><div class="krdl">${S.map(row).join('')}</div>`:''}${O.length?`<h3 class="odh">${i(akt('all'))}</h3><div class="krdl">${O.map(row).join('')}</div>`:''}<button type="button" class="dcadd gold vaadd" data-aksave>${i(akt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');const b=el.querySelector('[data-aksave]');b&&(b.onclick=()=>{el.querySelectorAll('[data-akd]').forEach(c=>{const d=D.find(z=>z.id===c.dataset.akd);if(!d)return;if(c.checked){if(d.ctr!==id){d.ctr=id;try{eiAddLog('link',eit('l_link',{t:d.title||'—',n:e.co||'—'}),{doc:d.id},['eit','l_link',{t:d.title||'—',n:e.co||'—'}])}catch{}}}else if(d.ctr===id)delete d.ctr});$();el.remove();v()})})}
/* ---------- Besitz: Auto / Wohnung ---------- */
const AK_K={car:{ic:'🚗',ctr:e=>e.cat==='ins_car'||/kfz|\bauto|fahrzeug|pkw|leasing|car\b/i.test([e.co,e.title].join(' ')),
  doc:d=>d.dtype==='vehicle'||d.dtype==='license'&&!1||/kfz|tüv|tuev|hauptuntersuchung|werkstatt|inspektion|fahrzeug|zulassung|reifen|autohaus|kfz-steuer|kraftfahrzeugsteuer|\bauto\b/i.test([d.title,d.party].join(' ')),aus:['tank','auto']},
 home:{ic:'🏠',ctr:e=>/miete|wohnung|strom|gas\b|wasser|stadtwerke|internet|dsl|hausrat|gebäude|rundfunk|ard zdf|beitragsservice|energie/i.test([e.co,e.title].join(' '))||e.cat==='ins_home',
  doc:d=>/miet|nebenkosten|wohnung|grundbuch|hausrat|grundsteuer|handwerker|hausverwaltung|vermieter|wohngeld|kaution|übergabeprotokoll/i.test([d.title,d.party].join(' ')),aus:['haus']}};
function akAsset(k){const K=AK_K[k],y0=new Date().getFullYear()+'-01-01',Mo=(()=>{try{return zqMonths(y0,vaIso(0))}catch{return[]}})();
 const C=vaRows().filter(r=>K.ctr(r.e)&&!(r.e.astNo||{})[k]),D=akDocs().filter(d=>(d.ast===k||K.doc(d))&&!(d.astNo||{})[k]).sort((a,b)=>String(akDate(b)).localeCompare(String(akDate(a))));
 const E=vaAD().e.filter(x=>x.d>=y0&&K.aus.includes(x.c));let cc=0;C.forEach(r=>Mo.forEach(mk=>{try{if(r.e.start&&r.e.start>mk+'-28')return;cc+=or(r.e,mk+'-15')}catch{}}));
 const ce=E.reduce((a,b)=>a+(+b.a||0),0),tot=cc+ce;
 let soon=[];try{soon=stDlAll().filter(t=>vaDays(t.k)>=0&&vaDays(t.k)<=120&&(C.some(r=>t.t.includes(r.nm))||D.some(d=>t.t.includes(d.title||'#'))||(k==='car'&&/tüv|kfz|auto/i.test(t.t)))).slice(0,4)}catch{}
 const veh=k==='car'&&D.find(d=>d.dtype==='vehicle'),tuv=k==='car'&&D.find(d=>/tüv|tuev|hauptuntersuchung/i.test(d.title||'')&&(d.end||(d.f||{}).valid));
 return{K,C,D,E,tot,cc,ce,soon,veh,tuv,Mo}}
function akwScreen(k){const A=akAsset(k),K=A.K,name=k==='car'?(A.veh&&(A.veh.f||{}).number?A.veh.f.number:akt('car')):akt('home');
 const chips=[A.D.length?akt('docsN',{n:A.D.length}):'',A.tuv?akt('tuv',{d:vaDate(A.tuv.end||A.tuv.f.valid)}):''].filter(Boolean);
 return`<div class="screen dhome fz va akw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(k==='car'?akt('carAll'):akt('homeAll'))}</h2></div><span></span></div>
 <div class="vahero"><small>${K.ic} ${i(name)}</small><b>${i(akt('perMo',{a:vaEur(A.Mo.length?A.tot/A.Mo.length:0)}))}</b><small>${i(akt('costY',{a:vaEur(A.tot)}))}</small>${chips.length?`<div class="vahs">${chips.map(c=>`<span>${i(c)}</span>`).join('')}</div>`:''}</div>
 ${A.soon.length?`<h3 class="vash">${i(akt('soon'))}</h3><div class="vacard">${A.soon.map(t=>`<button type="button" class="varow" ${t.act||'data-act="go" data-to="dsrok"'}><span class="vaic">⏰</span><span class="vatx"><b>${i(t.t)}</b><small>${i(vaDate(t.k))} · ${i(vat('left',{n:vaDays(t.k)}))}</small></span><span class="vaam">›</span></button>`).join('')}</div>`:''}
 ${A.C.length?`<h3 class="vash">${i(akt('ctrs'))}</h3><div class="vacard">${A.C.map(r=>`<button type="button" class="varow" data-act="akopen" data-id="${r.e.id}"><span class="vaic">${vaIcon(r.e)}</span><span class="vatx"><b>${i(r.nm)}</b><small>${i(vat('perM',{a:vaEur(r.mo)}))}</small></span><span class="vaam">›</span></button>`).join('')}</div>`:''}
 ${A.D.length?`<h3 class="vash">${i(akt('docs'))}</h3><div class="vacard">${A.D.slice(0,15).map(d=>`<div class="varow akdr"><button type="button" class="akdo" data-act="dzopen" data-id="${d.id}"><span class="vaic">📄</span><span class="vatx"><b>${i(d.title||'—')}</b><small>${i(akDate(d)?vaDate(akDate(d)):'')}</small></span></button><button type="button" class="akx" data-act="akrm" data-id="${d.id}" data-k="${k}" aria-label="${i(akt('rm'))}">✕</button></div>`).join('')}</div>`:''}
 ${A.E.length?`<h3 class="vash">${i(akt('spend'))}</h3><div class="vacard">${K.aus.map(c=>{const L2=A.E.filter(x=>x.c===c);if(!L2.length)return'';return`<button type="button" class="varow" data-act="zqaus"><span class="vaic">${vaCi(c)}</span><span class="vatx"><b>${i(vat('c_'+c))}</b><small>${i(cv5n(['записей: %n','%n Einträge','%n entries']).replace('%n',L2.length))}</small></span><span class="vaam">${i(vaEur(L2.reduce((a,b)=>a+(+b.a||0),0)))}</span></button>`}).join('')}</div>`:''}
 ${!A.C.length&&!A.D.length&&!A.E.length?`<div class="vacard"><p class="dhnone">${i(akt('emptyA'))}</p></div>`:''}
 <button type="button" class="vaadd" data-act="akadd" data-k="${k}">${i(akt('addDoc'))}</button></div>`}
function akAddSheet(k){const K=AK_K[k],D=akDocs().filter(d=>!(d.ast===k||K.doc(d))||(d.astNo||{})[k]).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,80);
 H(akt('pick'),`<div class="bsvys"><div class="krdl">${D.map(d=>`<label class="bsvtog"><input type="checkbox" data-akd="${i(d.id)}"><span>${i(d.title||'—')}</span></label>`).join('')}</div><button type="button" class="dcadd gold vaadd" data-aksave>${i(akt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');const b=el.querySelector('[data-aksave]');b&&(b.onclick=()=>{el.querySelectorAll('[data-akd]:checked').forEach(c=>{const d=D.find(z=>z.id===c.dataset.akd);if(!d)return;d.ast=k;if(d.astNo)delete d.astNo[k]});$();el.remove();v()})})}
['akte','akw'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='akte'){const e=akSel&&vaContracts().find(z=>z.id===akSel);if(!e){setTimeout(()=>R('fzm',void 0,!0),0);return'<div class="screen"></div>'}return akScreen(e)}if(m.route==='akw')return akwScreen(akKind==='home'?'home':'car')}catch(er){Hooks.err('akscreen',er)}});
Hooks.act('akopen',d=>{akSel=d.id;R('akte')});Hooks.act('aklink',d=>akLinkSheet(d.id));
Hooks.act('akw',d=>{akKind=d.k==='home'?'home':'car';R('akw')});Hooks.act('akadd',d=>akAddSheet(d.k));
Hooks.act('akrm',d=>{const doc=akDocs().find(z=>z.id===d.id);if(!doc)return;doc.astNo=doc.astNo||{};doc.astNo[d.k]=1;if(doc.ast===d.k)delete doc.ast;$();v()});
/* the contract screen gets a card to its Akte */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='ins'||!m.insid)return h;const e=vaContracts().find(z=>z.id===m.insid);if(!e)return h;const n=akLinked(e.id).length;
 const b=`<button type="button" class="vaabot akbtn" data-act="akopen" data-id="${i(e.id)}"><span><b>📂 ${i(akt('akte'))}</b><small>${i(akt('docsN',{n}))} · ${i(akt('line'))}</small></span><span class="akch">›</span></button>`;
 const k=h.indexOf('<button type="button" class="vaabot"');if(k>0)return h.slice(0,k)+b+h.slice(k);const e2=h.lastIndexOf('</div>');return h.slice(0,e2)+b+h.slice(e2)}catch(er){Hooks.err('akins',er);return h}});
/* Finanzen → Verträge: the two Besitz cards */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='fzm'||(fzD().tab!=='kost'))return h;const k=h.indexOf('<button type="button" class="vaadd" data-act="insnew"');if(k<0)return h;
 const row=kk=>{const A=akAsset(kk);if(!A.C.length&&!A.D.length&&!A.E.length)return'';return`<button type="button" class="varow" data-act="akw" data-k="${kk}"><span class="vaic">${AK_K[kk].ic}</span><span class="vatx"><b>${i(kk==='car'?akt('carAll'):akt('homeAll'))}</b><small>${i(akt('costY',{a:vaEur(A.tot)}))}</small></span><span class="vaam">›</span></button>`};
 const rr=row('car')+row('home');if(!rr)return h;return h.slice(0,k)+`<h3 class="vash">${i(akt('besitz'))}</h3><div class="vacard">${rr}</div>`+h.slice(k)}catch(er){Hooks.err('akfz',er);return h}});
/* on a document: «Gehört das zu …?», «Gehört zu …», «bezahlt» */
function akDocPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.akdc'))return;const d=akDocs().find(z=>z.id===m.bdid);if(!d)return;
 const o=(()=>{try{return eiRead(d)}catch{return{}}})();let html='';
 if(d.ctr){const c=vaContracts().find(z=>z.id===d.ctr);if(c)html+=`<div class="vacard akdc"><div class="varow"><button type="button" class="akdo" data-act="akopen" data-id="${c.id}"><span class="vaic">🔗</span><span class="vatx"><b>${i(akt('belongs',{n:c.co||c.title||'—'}))}</b><small>${i(akt('akte'))} ›</small></span></button><button type="button" class="akx" data-act="akun" data-id="${d.id}" aria-label="✕">✕</button></div></div>`}
 else{let mt=null;try{mt=eiMatch(d,o)}catch{}if(mt&&!(d.ctrNo||{})[mt.c.id])html+=`<div class="vacard akdc aksug"><b>🔗 ${i(akt('q',{n:mt.c.co||mt.c.title||'—'}))}</b><p>${i(mt.why==='num'?akt('qNum',{v:o.num}):akt('qName'))}</p><div class="vabtns"><button type="button" class="vabtn p" data-act="akyes" data-id="${d.id}" data-c="${mt.c.id}">${i(akt('yes'))}</button><button type="button" class="vabtn" data-act="akno" data-id="${d.id}" data-c="${mt.c.id}">${i(akt('no'))}</button></div></div>`}
 if(o.kind==='inv')html+=d.paid?`<div class="vacard akdc"><div class="varow"><span class="vaic">✓</span><span class="vatx"><b>${i(akt('paid',{d:vaDate(d.paid)}))}</b></span><button type="button" class="akx" data-act="akpaid" data-id="${d.id}">✕</button></div></div>`:`<button type="button" class="vabtn akdc akpaidb" data-act="akpaid" data-id="${d.id}">${i(akt('markPaid'))}</button>`;
 if(d.dtype==='vehicle')html+=`<button type="button" class="vaabot akdc" data-act="akw" data-k="car"><span><b>🚗 ${i(akt('carAll'))}</b></span><span class="akch">›</span></button>`;
 if(!html)return;const w=document.createElement('div');w.className='akdcw';w.innerHTML=html;const hd=sc.querySelector(':scope>.bghd,:scope>.sub-hdr');const t=sc.querySelector(':scope>.bgtitle');(t||hd)?(t||hd).insertAdjacentElement('afterend',w):sc.prepend(w)}catch(e){Hooks.err('akdoc',e)}}
Hooks.on('render',()=>setTimeout(akDocPut,0));
Hooks.act('akyes',d=>{const doc=akDocs().find(z=>z.id===d.id),c=vaContracts().find(z=>z.id===d.c);if(!doc||!c)return;doc.ctr=c.id;try{eiAddLog('link',eit('l_link',{t:doc.title||'—',n:c.co||'—'}),{doc:doc.id},['eit','l_link',{t:doc.title||'—',n:c.co||'—'}])}catch{}$();T(akt('linked',{n:c.co||'—'}));v()});
Hooks.act('akno',d=>{const doc=akDocs().find(z=>z.id===d.id);if(!doc)return;doc.ctrNo=doc.ctrNo||{};doc.ctrNo[d.c]=1;$();v()});
Hooks.act('akun',d=>{const doc=akDocs().find(z=>z.id===d.id);if(!doc)return;const c=doc.ctr;delete doc.ctr;doc.ctrNo=doc.ctrNo||{};if(c)doc.ctrNo[c]=1;$();T(akt('unlinked'));v()});
Hooks.act('akpaid',d=>{const doc=akDocs().find(z=>z.id===d.id);if(!doc)return;if(doc.paid)delete doc.paid;else{doc.paid=vaIso(0);T(akt('paidOk'))}$();v()});
Hooks.css('docs-akte',`
.akpc{display:flex;align-items:flex-end;gap:10px;height:110px;padding-top:8px}.akpc div{flex:1;text-align:center;font-size:11px;color:var(--muted);line-height:1.3}.akpc i{display:block;background:var(--bd-acc,var(--green));border-radius:6px 6px 0 0;margin-bottom:4px}.akpc i.u{background:#e0a23a}
.aktl{position:relative;padding:6px 0 6px 22px}.aktl:before{content:'';position:absolute;left:7px;top:14px;bottom:14px;width:2px;background:var(--line)}
.aktl button{position:relative;display:block;width:100%;text-align:left;border:0;background:none;padding:8px 0;color:var(--ink)}.aktl button:before{content:'';position:absolute;left:-20px;top:13px;width:12px;height:12px;border-radius:50%;background:var(--bd-acc,var(--green))}.aktl button.w:before{background:#e0a23a}
.aktl b{display:block;font-size:15px}.aktl small{display:block;color:var(--muted);font-size:13px}
.akbtn .akch,.vaabot .akch{font-size:22px;color:var(--muted)}.akdcw{display:block;margin:0 0 10px}.akdcw .vacard{margin-bottom:8px}
.akdr{gap:6px}.akdo{display:flex;align-items:center;gap:12px;flex:1;min-width:0;border:0;background:none;text-align:left;color:var(--ink);padding:0}.akx{border:0;background:none;color:var(--muted);font-size:16px;padding:6px}
.aksug{border:1.5px dashed var(--bd-acc,var(--green));background:color-mix(in srgb,var(--bd-acc,#1f7a63) 7%,var(--bd-glass,var(--surface)));padding:12px 16px}.aksug b{font-size:16px}.aksug p{color:var(--muted);font-size:14px;margin:6px 0}
.akpaidb{display:block;width:100%;margin:0 0 10px}
`);
