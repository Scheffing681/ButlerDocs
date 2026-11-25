/* ===== Butler Docs: Käufe & Garantie, Gesundheit (v84) =====
   KÄUFE (routes kauf, kaufd): a purchase is registered once — product, maker/model, shop, date, price, serial number,
   receipt and other documents (only links). Garantie (voluntary, only from a document — date entered) and
   Gewährleistung (by law, 2 years from the purchase) are shown apart and never mixed up; both appear as deadlines.
   Repairs with date, what, cost, shop. «Schreiben an den Händler» = a ready Mängelanzeige text (the user sends it;
   no promise of a result). A receipt or bill document offers «Als Kauf anlegen».
   GESUNDHEIT (route ges): visits (doctor, reason, note, next appointment → calendar), medicines exactly as entered by
   the user (no doses suggested, no advice), vaccinations (next booster → deadline), lab values as entered, in time
   order per value. Its own PIN (SHA-256, kept on the phone) if wanted. Butler does not diagnose.
   Data: g.kauf = [{id,n,mk,shop,d,p,sn,gar,docs[],rep[],note}], g.ges = {vis[],med[],imp[],lab[],pin} */
const kgS={
 kauf:['Покупки и гарантия','Käufe & Garantie','Purchases & warranty'],t_on:['Идёт','Läuft','Active'],t_soon:['Скоро','Bald','Soon'],t_off:['Истекла','Vorbei','Expired'],t_all:['Все','Alle','All'],
 add:['＋ Покупка','＋ Kauf','＋ Purchase'],none:['Покупок пока нет. Добавьте вручную или из чека («Als Kauf anlegen»).','Noch keine Käufe. Von Hand oder aus einem Beleg („Als Kauf anlegen“).','No purchases yet. By hand or from a receipt.'],
 n:['Товар','Produkt','Product'],mk:['Производитель / модель','Hersteller / Modell','Maker / model'],shop:['Магазин','Händler','Shop'],d:['Дата покупки','Kaufdatum','Purchase date'],p:['Цена','Preis','Price'],sn:['Серийный номер','Seriennummer','Serial number'],
 gar:['Гарантия до (по документу)','Garantie bis (laut Dokument)','Warranty until (per document)'],note:['Заметка','Notiz','Note'],save:['Сохранить','Speichern','Save'],need:['Впишите товар','Bitte das Produkt eintragen','Please enter the product'],
 gew:['Gewährleistung по закону до %d','Gewährleistung (gesetzlich) bis %d','Statutory warranty until %d'],garT:['Гарантия до %d','Garantie bis %d','Warranty until %d'],noGar:['гарантии по документу нет','keine Garantie laut Dokument','no warranty per document'],
 diff:['Garantie (добровольно, по документу) и Gewährleistung (по закону, 2 года) — разные вещи. Проверьте условия.','Garantie (freiwillig, laut Dokument) und Gewährleistung (Gesetz, 2 Jahre) sind verschieden. Bedingungen bitte prüfen.','Warranty (voluntary, per document) and statutory warranty (by law, 2 years) are different. Please check the terms.'],
 rep:['Ремонты','Reparaturen','Repairs'],repAdd:['＋ Ремонт','＋ Reparatur','＋ Repair'],repW:['Что сделано','Was wurde gemacht','What was done'],cost:['Стоимость','Kosten','Cost'],
 docs:['Документы','Dokumente','Documents'],docAdd:['＋ Связать документ','＋ Dokument verknüpfen','＋ Link a document'],
 letter:['Письмо продавцу','Schreiben an den Händler','Letter to the shop'],letterS:['готовый текст о недостатке — отправляете Вы','fertiger Text zur Mängelanzeige – Sie senden','ready defect notice – you send it'],
 noProm:['Батлер не обещает результат и не оценивает претензию юридически.','Butler verspricht kein Ergebnis und bewertet den Anspruch nicht rechtlich.','Butler promises no result and gives no legal assessment.'],
 asKauf:['Создать покупку с гарантией','Als Kauf mit Garantie anlegen','Create a purchase with warranty'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Ещё раз','Wirklich löschen? Nochmals','Really delete? Again'],
 dlGar:['Конец гарантии: %n','Garantie endet: %n','Warranty ends: %n'],dlGew:['Конец Gewährleistung: %n','Gewährleistung endet: %n','Statutory warranty ends: %n'],copied:['Текст скопирован','Text kopiert','Text copied'],
 /* health */
 ges:['Здоровье','Gesundheit','Health'],h_vis:['Визиты','Besuche','Visits'],h_med:['Лекарства','Arznei','Medicines'],h_imp:['Прививки','Impfungen','Vaccinations'],h_lab:['Анализы','Werte','Lab values'],
 doc:['Врач / учреждение','Ärztin / Praxis','Doctor / practice'],why:['Причина','Grund','Reason'],nextT:['Следующий визит','Nächster Termin','Next appointment'],
 mName:['Название','Name','Name'],dose:['Дозировка (как назначено)','Dosierung (wie verordnet)','Dose (as prescribed)'],since:['С','Seit','Since'],until:['До','Bis','Until'],by:['Назначил(а)','Verordnet von','Prescribed by'],
 vac:['Прививка','Impfung','Vaccination'],boost:['Следующая (если указано)','Nächste Auffrischung (falls angegeben)','Next booster (if stated)'],
 lName:['Показатель','Wert','Value'],lVal:['Результат','Ergebnis','Result'],unit:['Единица','Einheit','Unit'],ref:['Норма (как в бланке)','Referenz (wie im Befund)','Reference (as on the report)'],lab:['Лаборатория','Labor','Lab'],
 hNone:['Пока пусто.','Noch leer.','Empty yet.'],hAdd:['＋ Добавить','＋ Hinzufügen','＋ Add'],hNote:['Только то, что Вы внесли. Батлер не ставит диагнозы и не меняет лечение — это решает врач.','Nur was Sie eingetragen haben. Butler stellt keine Diagnosen und ändert keine Behandlung – das entscheidet die Ärztin.','Only what you entered. Butler makes no diagnoses and changes no treatment – your doctor decides.'],
 pin:['Код для раздела','Eigener Code','Own code'],pinS:['раздел откроется только с кодом','der Bereich öffnet nur mit Code','the section opens only with the code'],pinSet:['Задать код (4–8 цифр)','Code festlegen (4–8 Ziffern)','Set a code (4–8 digits)'],pinOff:['Убрать код','Code entfernen','Remove code'],
 pinAsk:['Введите код раздела «Здоровье»','Code für „Gesundheit“ eingeben','Enter the “Health” code'],pinBad:['Неверный код','Falscher Code','Wrong code'],open:['Открыть','Öffnen','Open'],
 dlImp:['Прививка: %n','Impfung fällig: %n','Vaccination due: %n'],tile:['Визиты, лекарства, прививки, анализы','Besuche, Medikamente, Impfungen, Werte','Visits, medicines, vaccinations, values']};
const kgt=(k,o)=>{let s=cv5n(kgS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const kgK=()=>Array.isArray(g.kauf)?g.kauf:(g.kauf=[]);
const kgGew=x=>x.d?vaAdd(x.d,730):'';
const kgEnd=x=>[x.gar,kgGew(x)].filter(Boolean).sort().pop()||'';
const kgTab=x=>{const e=kgEnd(x);if(!e)return'off';const n=vaDays(e);return n<0?'off':n<=90?'soon':'on'};
function kaufScreen(){const tab=m.kgT||'on',A=kgK(),L2=A.filter(x=>tab==='all'||kgTab(x)===tab).sort((a,b)=>String(kgEnd(a)).localeCompare(String(kgEnd(b))));const n=k=>A.filter(x=>k==='all'||kgTab(x)===k).length;
 return`<div class="screen dhome fz va kgw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(kgt('kauf'))}</h2></div><span></span></div>
 <div class="eitabs">${['on','soon','off','all'].map(k=>`<button type="button" class="${tab===k?'on':''}" data-act="kgt" data-k="${k}">${i(kgt('t_'+k))} ${n(k)}</button>`).join('')}</div>
 ${L2.length?`<div class="vacard">${L2.map(x=>`<button type="button" class="varow" data-act="kgopen" data-id="${x.id}"><span class="vaic">🛍</span><span class="vatx"><b>${i(x.n)}</b><small>${i([x.shop,x.d?vaDate(x.d):'',x.gar?kgt('garT',{d:vaDate(x.gar)}):kgt('gew',{d:vaDate(kgGew(x))})].filter(Boolean).join(' · '))}</small></span><span class="vaam">${x.p?i(vaEur(x.p)):'›'}</span></button>`).join('')}</div>`:`<div class="vacard"><p class="dhnone">${i(kgt('none'))}</p></div>`}
 <button type="button" class="vaadd" data-act="kgedit">${i(kgt('add'))}</button><p class="vanote">${i(kgt('diff'))}</p></div>`}
let kgSel=null;
function kaufCard(x){const D=(x.docs||[]).map(id=>{try{return Ke().items.find(d=>d.id===id)}catch{return null}}).filter(Boolean);
 return`<div class="screen dhome fz va kgw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(x.n)}</h2></div><button type="button" class="iconbtn" data-act="kgedit" data-id="${x.id}" aria-label="edit">✎</button></div>
 <div class="vahero"><small>${i([x.mk,x.shop].filter(Boolean).join(' · '))}</small><b class="kpn">${x.p?i(vaEur(x.p)):i(x.n)}</b><small>${i(x.d?vaDate(x.d):'')}${x.sn?' · SN '+i(x.sn):''}</small></div>
 <div class="vacard"><div class="varow"><span class="vaic">🛡</span><span class="vatx"><b>${i(x.gar?kgt('garT',{d:vaDate(x.gar)}):kgt('noGar'))}</b>${x.gar?`<small>${i(vaDays(x.gar)>=0?vat('left',{n:vaDays(x.gar)}):kgt('t_off'))}</small>`:''}</span></div>
  ${x.d?`<div class="varow"><span class="vaic">⚖️</span><span class="vatx"><b>${i(kgt('gew',{d:vaDate(kgGew(x))}))}</b><small>${i(vaDays(kgGew(x))>=0?vat('left',{n:vaDays(kgGew(x))}):kgt('t_off'))}</small></span></div>`:''}<p class="vanote">${i(kgt('diff'))}</p></div>
 <h3 class="vash">${i(kgt('docs'))}</h3><div class="vacard">${D.map(d=>`<div class="varow akdr"><button type="button" class="akdo" data-act="dzopen" data-id="${d.id}"><span class="vaic">📄</span><span class="vatx"><b>${i(d.title||'—')}</b></span></button><button type="button" class="akx" data-act="kgdocx" data-id="${x.id}" data-d="${d.id}">✕</button></div>`).join('')}<button type="button" class="valnk" data-act="kgdoc" data-id="${x.id}">${i(kgt('docAdd'))}</button></div>
 <h3 class="vash">${i(kgt('rep'))}</h3><div class="vacard">${(x.rep||[]).map(r=>`<div class="varow"><span class="vaic">🔧</span><span class="vatx"><b>${i(r.w||'—')}</b><small>${i([r.d?vaDate(r.d):'',r.shop].filter(Boolean).join(' · '))}</small></span><span class="vaam">${r.c?i(vaEur(r.c)):''}</span></div>`).join('')}<button type="button" class="valnk" data-act="kgrep" data-id="${x.id}">${i(kgt('repAdd'))}</button></div>
 <div class="vacard"><button type="button" class="varow" data-act="kglet" data-id="${x.id}"><span class="vaic">✉️</span><span class="vatx"><b>${i(kgt('letter'))}</b><small>${i(kgt('letterS'))}</small></span><span class="vaam">›</span></button></div><p class="vanote">${i(kgt('noProm'))}</p>
 ${x.note?`<div class="vacard"><p>${i(x.note)}</p></div>`:''}</div>`}
const kgForm=(F,o)=>F.map(f=>f.split('|')).map(([k,lab,type])=>`<label class="bsvl">${i(kgt(lab))}</label><input class="field" data-kf="${k}" ${type?`type="${type}"`:''} ${k==='p'||k==='c'?'inputmode="decimal"':''} value="${i(o[k]!=null?(k==='p'||k==='c'?(o[k]?(o[k]/100).toLocaleString(he(),{minimumFractionDigits:2}):''):o[k]):'')}">`).join('');
const kgRead=(el,F)=>{const o={};F.forEach(f=>{const k=f.split('|')[0];const v2=el.querySelector(`[data-kf="${k}"]`).value.trim();o[k]=(k==='p'||k==='c')?(vaParseAmt(v2)||0):v2});return o};
Hooks.act('kgedit',dd=>{const x0=dd&&dd.id?kgK().find(z=>z.id===dd.id):null,o=x0?Object.assign({},x0):{d:vaIso(0)};const F=['n|n','mk|mk','shop|shop','d|d|date','p|p','sn|sn','gar|gar|date','note|note'];
 H(x0?x0.n:kgt('add').replace(/^＋\s*/,''),`<div class="bsvys">${kgForm(F,o)}<small class="verr" data-ke></small><button type="button" class="vaadd" data-ks>${i(kgt('save'))}</button>${x0?`<button type="button" class="bsvdel" data-kd>${i(kgt('del'))}</button>`:''}</div>`,
 el=>{el.classList.add('bsvsh');let arm=0;el.addEventListener('click',e=>{if(e.target.closest('[data-ks]')){const r=kgRead(el,F);if(!r.n){el.querySelector('[data-ke]').textContent=kgt('need');return}if(x0)Object.assign(x0,r);else kgK().push(Object.assign({id:V(),docs:dd&&dd.doc?[dd.doc]:[],rep:[],ts:Date.now()},r));$();el.remove();kgSel=x0?x0.id:kgK()[kgK().length-1].id;R('kaufd');return}
  if(e.target.closest('[data-kd]')){if(!arm){arm=1;e.target.textContent=kgt('delQ');return}g.kauf=kgK().filter(z=>z.id!==x0.id);$();el.remove();R('kauf',void 0,!0)}})})});
Hooks.act('kgrep',dd=>{const x=kgK().find(z=>z.id===dd.id);if(!x)return;const F=['w|repW','d|d|date','shop|shop','c|cost'];H(kgt('repAdd').replace(/^＋\s*/,''),`<div class="bsvys">${kgForm(F,{d:vaIso(0)})}<button type="button" class="vaadd" data-ks>${i(kgt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-ks]').onclick=()=>{(x.rep=x.rep||[]).push(kgRead(el,F));$();el.remove();v()}})});
Hooks.act('kgdoc',dd=>{const x=kgK().find(z=>z.id===dd.id);if(!x)return;let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del).sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,80)}catch{}
 H(kgt('docAdd').replace(/^＋\s*/,''),`<div class="bsvys"><div class="krdl">${D.map(d=>`<label class="bsvtog"><input type="checkbox" data-kgd="${d.id}" ${(x.docs||[]).includes(d.id)?'checked':''}><span>${i(d.title||'—')}</span></label>`).join('')}</div><button type="button" class="vaadd" data-ks>${i(kgt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-ks]').onclick=()=>{x.docs=[...el.querySelectorAll('[data-kgd]:checked')].map(c=>c.dataset.kgd);$();el.remove();v()}})});
Hooks.act('kgdocx',d=>{const x=kgK().find(z=>z.id===d.id);if(!x)return;x.docs=(x.docs||[]).filter(z=>z!==d.d);$();v()});
Hooks.act('kglet',dd=>{const x=kgK().find(z=>z.id===dd.id);if(!x)return;const me=(()=>{try{return ja()}catch{return{}}})(),nm=[me.first,me.last].filter(Boolean).join(' ')||'—';
 const txt=`Mängelanzeige – ${x.n}${x.sn?' (Seriennummer '+x.sn+')':''}\n\nSehr geehrte Damen und Herren,\n\nam ${x.d?new Date(x.d+'T12:00:00').toLocaleDateString('de-DE'):'…'} habe ich bei Ihnen „${x.n}“${x.p?' zum Preis von '+vaEur(x.p):''} gekauft. Leider ist folgender Mangel aufgetreten:\n\n[Beschreibung des Mangels]\n\nIch bitte Sie, den Mangel zu beheben. Eine Kopie des Kaufbelegs liegt bei.\n\nMit freundlichen Grüßen\n${nm}`;
 H(kgt('letter'),`<div class="bsvys"><textarea class="field" rows="12" data-kgl>${i(txt)}</textarea><button type="button" class="vaadd" data-kgc>📋 ${i(cv5n(['Скопировать','Kopieren','Copy']))}</button><p class="vanote">${i(kgt('noProm'))}</p></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-kgc]').onclick=()=>{try{navigator.clipboard.writeText(el.querySelector('[data-kgl]').value).then(()=>T(kgt('copied')))}catch{}}})});
Hooks.act('kgt',d=>{m.kgT=d.k;v()});Hooks.act('kgopen',d=>{kgSel=d.id;R('kaufd')});
/* deadlines: Garantie and Gewährleistung */
try{const _dl=stDlAll;stDlAll=function(){const L2=_dl.apply(this,arguments);try{kgK().forEach(x=>{if(x.gar)L2.push({src:'kauf',k:x.gar,t:kgt('dlGar',{n:x.n}),act:`data-act="kgopen" data-id="${x.id}"`});const gw=kgGew(x);if(gw)L2.push({src:'kauf',k:gw,t:kgt('dlGew',{n:x.n}),act:`data-act="kgopen" data-id="${x.id}"`})});
 const G=g.ges||{};(G.imp||[]).forEach(v2=>{if(v2.next)L2.push({src:'ges',k:v2.next,t:kgt('dlImp',{n:v2.n||''}),act:'data-act="go" data-to="ges"'})});L2.sort((a,b)=>a.k<b.k?-1:a.k>b.k?1:0)}catch(e){Hooks.err('kgdl',e)}return L2}}catch(e){Hooks.err('kgdl0',e)}
/* ---------- Gesundheit ---------- */
const kgG=()=>{const o=g.ges=g.ges&&typeof g.ges==='object'?g.ges:{};['vis','med','imp','lab'].forEach(k=>{if(!Array.isArray(o[k]))o[k]=[]});return o};
const KG_F={vis:['d|d|date','doc|doc','why|why','note|note','next|nextT|date'],med:['n|mName','dose|dose','since|since|date','until|until|date','by|by','note|note'],
 imp:['n|vac','d|d|date','next|boost|date','doc|doc'],lab:['n|lName','val|lVal','unit|unit','ref|ref','d|d|date','lab|lab']};
async function kgHash(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('bd-ges|'+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch{return'x'+s}}
let kgUnlocked=!1;
function gesScreen(){const G=kgG();if(G.pin&&!kgUnlocked)return`<div class="screen dhome fz va kgw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(kgt('ges'))}</h2></div><span></span></div>
 <div class="vacard kgpin"><b>🔒 ${i(kgt('pinAsk'))}</b><input class="field" type="password" inputmode="numeric" data-kgp autocomplete="off"><small class="verr" data-kgpe></small><button type="button" class="vaadd" data-act="kgunlock">${i(kgt('open'))}</button></div></div>`;
 const tab=m.kgH||'vis',L2=G[tab].slice().sort((a,b)=>String(b.d||b.since||'').localeCompare(String(a.d||a.since||'')));
 const row=x=>tab==='vis'?[x.doc||'—',[x.d?vaDate(x.d):'',x.why].filter(Boolean).join(' · '),x.next?'→ '+vaDate(x.next):'']:tab==='med'?[x.n||'—',[x.dose,x.since?kgt('since')+' '+vaDate(x.since):'',x.until?kgt('until')+' '+vaDate(x.until):''].filter(Boolean).join(' · '),x.by||'']
  :tab==='imp'?[x.n||'—',x.d?vaDate(x.d):'',x.next?'→ '+vaDate(x.next):'']:[x.n||'—',[x.val,x.unit].filter(Boolean).join(' ')+(x.ref?' ('+x.ref+')':''),x.d?vaDate(x.d):''];
 const lab=tab==='lab'?[...new Set(L2.map(x=>x.n))]:null;
 return`<div class="screen dhome fz va kgw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(kgt('ges'))}</h2></div><span></span></div>
 <div class="eitabs">${['vis','med','imp','lab'].map(k=>`<button type="button" class="${tab===k?'on':''}" data-act="kgh" data-k="${k}">${i(kgt('h_'+k))} ${G[k].length||''}</button>`).join('')}</div>
 ${L2.length?(lab?lab.map(nm=>`<h3 class="vash">${i(nm)}</h3><div class="vacard">${L2.filter(x=>x.n===nm).map(x=>{const r=row(x);return`<button type="button" class="varow" data-act="kgge" data-id="${x.id}"><span class="vatx"><b>${i(r[1]||'—')}</b><small>${i(r[2])}${x.lab?' · '+i(x.lab):''}</small></span></button>`}).join('')}</div>`).join(''):`<div class="vacard">${L2.map(x=>{const r=row(x);return`<button type="button" class="varow" data-act="kgge" data-id="${x.id}"><span class="vaic">${({vis:'🩺',med:'💊',imp:'💉'})[tab]}</span><span class="vatx"><b>${i(r[0])}</b><small>${i(r[1])}</small></span><span class="vaam"><small>${i(r[2])}</small></span></button>`}).join('')}</div>`):`<div class="vacard"><p class="dhnone">${i(kgt('hNone'))}</p></div>`}
 <button type="button" class="vaadd" data-act="kgge">${i(kgt('hAdd'))}</button><p class="vanote">${i(kgt('hNote'))}</p>
 <button type="button" class="vaabot" data-act="kgpin"><span><b>🔒 ${i(kgt('pin'))}</b><small>${i(G.pin?kgt('pinOff'):kgt('pinS'))}</small></span><u class="${G.pin?'on':''}"></u></button></div>`}
Hooks.act('kgh',d=>{m.kgH=d.k;v()});
Hooks.act('kgunlock',async()=>{const inp=document.querySelector('[data-kgp]');if(!inp)return;const h=await kgHash(inp.value.trim());if(h===kgG().pin){kgUnlocked=!0;v()}else{const e=document.querySelector('[data-kgpe]');e&&(e.textContent=kgt('pinBad'))}});
Hooks.act('kgpin',()=>{const G=kgG();if(G.pin){delete G.pin;kgUnlocked=!1;$();v();return}H(kgt('pin'),`<div class="bsvys"><label class="bsvl">${i(kgt('pinSet'))}</label><input class="field" type="password" inputmode="numeric" maxlength="8" data-kgn><button type="button" class="vaadd" data-ks>${i(kgt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-ks]').onclick=async()=>{const p=el.querySelector('[data-kgn]').value.trim();if(!/^\d{4,8}$/.test(p))return;G.pin=await kgHash(p);kgUnlocked=!0;$();el.remove();v()}})});
Hooks.act('kgge',dd=>{const tab=m.kgH||'vis',G=kgG(),x0=dd&&dd.id?G[tab].find(z=>z.id===dd.id):null,F=KG_F[tab];
 H(kgt('h_'+tab),`<div class="bsvys">${kgForm(F,x0||{d:vaIso(0)})}${tab==='vis'?`<datalist id="kgdl">${(()=>{try{return Va().map(c=>`<option value="${i([c.first,c.last].filter(Boolean).join(' '))}">`).join('')}catch{return''}})()}</datalist>`:''}<button type="button" class="vaadd" data-ks>${i(kgt('save'))}</button>${x0?`<button type="button" class="bsvdel" data-kd>${i(kgt('del'))}</button>`:''}<p class="vanote">${i(kgt('hNote'))}</p></div>`,
 el=>{el.classList.add('bsvsh');const dc=el.querySelector('[data-kf="doc"]');dc&&dc.setAttribute('list','kgdl');let arm=0;el.addEventListener('click',e=>{
  if(e.target.closest('[data-ks]')){const r=kgRead(el,F);if(x0)Object.assign(x0,r);else G[tab].push(Object.assign({id:V(),ts:Date.now()},r));
   if(tab==='vis'&&r.next){g.events=Array.isArray(g.events)?g.events:[];if(!g.events.some(ev=>ev.ges===((x0||{}).id)&&ev.date===r.next))g.events.push({id:V(),title:(r.doc||kgt('h_vis')),date:r.next,time:'',type:'event',note:'',at:Date.now(),rem:[1],ges:(x0||{}).id||''})}$();el.remove();v();return}
  if(e.target.closest('[data-kd]')){if(!arm){arm=1;e.target.textContent=kgt('delQ');return}G[tab]=G[tab].filter(z=>z.id!==x0.id);$();el.remove();v()}})})});
['kauf','kaufd','ges'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='kauf')return kaufScreen();if(m.route==='kaufd'){const x=kgSel&&kgK().find(z=>z.id===kgSel);if(!x){setTimeout(()=>R('kauf',void 0,!0),0);return'<div class="screen"></div>'}return kaufCard(x)}if(m.route==='ges')return gesScreen()}catch(e){Hooks.err('kgscreen',e)}});
Hooks.on('render',()=>{if(m.route!=='ges')kgUnlocked=kgUnlocked&&m.route==='ges'});
/* entries: a receipt document, the health folder, Finanzen (Ausgaben), search */
function kgDocPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.kgdc'))return;const d=Ke().items.find(z=>z.id===m.bdid);if(!d||d.type)return;
 const k=kgK().find(x=>(x.docs||[]).includes(d.id));const rx=/kassenbon|quittung|rechnung|beleg|kaufbeleg|garantie|receipt|чек|invoice|bestellung/i;
 const html=k?`<button type="button" class="vaabot kgdc" data-act="kgopen" data-id="${k.id}"><span><b>🛍 ${i(k.n)}</b><small>${i(kgEnd(k)?kgt('gew',{d:vaDate(kgGew(k))}):'')}</small></span><span class="akch">›</span></button>`:rx.test([d.title,d.dtname,d.kind].join(' '))?`<button type="button" class="vabtn kgdc kpasvg" data-act="kgfrom" data-id="${d.id}">🛍 ${i(kgt('asKauf'))}</button>`:'';
 if(!html)return;const w=sc.querySelector('.akdcw');if(w)w.insertAdjacentHTML('beforeend',html);else{const t=sc.querySelector(':scope>.bgtitle,:scope>.sub-hdr');(t||sc.firstElementChild).insertAdjacentHTML('afterend',`<div class="akdcw">${html}</div>`)}}catch(e){Hooks.err('kgdoc',e)}}
Hooks.on('render',()=>setTimeout(kgDocPut,30));
Hooks.act('kgfrom',dd=>{const d=Ke().items.find(z=>z.id===dd.id);if(!d)return;let o={};try{o=eiRead(d)}catch{}
 const x={id:V(),n:(d.title||'').replace(/^(rechnung|kassenbon|quittung|beleg)\s*/i,'')||d.title||'—',shop:o.party||d.party||'',d:d.date||vaIso(0),p:o.amt||0,sn:'',gar:'',docs:[d.id],rep:[],ts:Date.now()};
 const gm=eiTxt(d).match(/(\d)\s*(jahre|years|jahr)\s*(hersteller)?garantie/i);if(gm)x.gar=vaAdd(x.d,365*(+gm[1]));kgK().push(x);$();kgSel=x.id;R('kaufd')});
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;const row=(act,ic,t,s)=>`<button type="button" class="vaabot abent" ${act}><span><b>${ic} ${i(t)}</b><small>${i(s)}</small></span><span class="akch">›</span></button>`;
 if(m.route==='dccat'&&m.dccat==='med'){const e=h.lastIndexOf('</div>');return h.slice(0,e)+row('data-act="go" data-to="ges"','🩺',kgt('ges'),kgt('tile'))+h.slice(e)}
 {const k=h.indexOf('<button type="button" class="valnk" data-act="vacsv"');if(k>0){const n=kgK().filter(x=>kgTab(x)!=='off').length;return h.slice(0,k)+row('data-act="go" data-to="kauf"','🛍',kgt('kauf')+(n?' · '+n:''),kgt('diff').split('.')[0])+h.slice(k)}}}catch(er){Hooks.err('kgent',er)}return h});
try{SP_L.push(['kauf','note',kgS.kauf,['garantie','gewährleistung','гарант','warranty','kauf','покупк','purchase','kassenbon','seriennummer']],['ges','note',kgS.ges,['gesundheit','здоров','health','arzt','врач','medikament','лекарств','impf','привив','laborwert','анализ']])}catch{}
Hooks.css('docs-kauf-gesund',`.kgpin{padding:14px 16px}.kgpin b{display:block;margin-bottom:10px}.kgw .vacard p{margin:8px 0}.kgw .eitabs button{font-size:13.5px;padding-left:8px;padding-right:8px}`);
