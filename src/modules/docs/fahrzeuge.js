/* ===== Butler Docs: Fahrzeuge — the vehicle department (v97) =====
   Built on the vehicles of «Vermögen» (U().assets with vk 'fz') — one record per vehicle, nothing kept twice.
   Route fzg: tabs Überblick · Fahrzeuge · Kosten · Termine · Dokumente; on top four numbers (vehicles, service due,
   TÜV due, costs since January from «Alles zum Auto»), the vehicles, eight section tiles.
   Vehicle card (route vnxd for a vehicle): sections Fahrzeugdaten · Zulassung & Papiere · TÜV/HU/AU · Wartung & Service ·
   Reparaturen · Reifen · Kilometer & Verlauf · Kosten · Weitere Dokumente. Each section has its own log (a.log:
   [{id,t,d,km,eur,note}]) — a TÜV entry sets the next TÜV in 24 months, a km entry updates the mileage; dates go to
   the calendar and «Fristen» (vnxCal). Sell/Archive keeps the record (a.sold). PDF of one vehicle. */
const FZG_S={
 t:['Транспорт','Fahrzeuge','Vehicles'],sub:['Мои машины и всё, что с ними связано','Meine Fahrzeuge und alles rund um den Betrieb','My vehicles and everything around them'],
 tb_ov:['Обзор','Überblick','Overview'],tb_veh:['Машины','Fahrzeuge','Vehicles'],tb_cost:['Расходы','Kosten','Costs'],tb_dl:['Сроки','Termine','Dates'],tb_doc:['Документы','Dokumente','Documents'],
 st_n:['машин','Fahrzeuge','vehicles'],st_serv:['сервис скоро','Service bald','service soon'],st_tuv:['TÜV скоро','TÜV / HU bald','MOT soon'],st_cost:['расходы с января','Kosten seit Januar','costs since January'],
 mine:['Мои машины','Meine Fahrzeuge','My vehicles'],active:['Активна','Aktiv','Active'],sold:['Продана','Verkauft','Sold'],add:['＋ Машина','＋ Fahrzeug','＋ Vehicle'],
 none:['Машин пока нет. Добавьте первую — данные из техпаспорта можно вписать вручную.','Noch kein Fahrzeug. Fügen Sie das erste hinzu – die Angaben aus dem Fahrzeugschein tragen Sie selbst ein.','No vehicle yet. Add the first – you type the details from the registration yourself.'],
 s_dat:['Данные машины','Fahrzeugdaten','Vehicle data'],s_zul:['Регистрация и бумаги','Zulassung & Papiere','Registration & papers'],s_tuv:['TÜV / HU / AU','TÜV / HU / AU','MOT'],s_serv:['Обслуживание','Wartung & Service','Service'],
 s_rep:['Ремонт','Reparaturen','Repairs'],s_reif:['Шины','Reifen','Tyres'],s_km:['Пробег и история','Kilometer & Verlauf','Mileage & history'],s_kost:['Расходы','Kosten','Costs'],s_dok:['Другие документы','Weitere Dokumente','Other documents'],
 entry:['＋ Запись','＋ Eintrag','＋ Entry'],date:['Дата','Datum','Date'],km:['Пробег, км','Kilometerstand','Mileage, km'],eur:['Сумма, €','Betrag, €','Amount, €'],note:['Что сделано','Was wurde gemacht','What was done'],
 next:['Следующий срок','Nächster Termin','Next date'],nextTuv:['Следующий TÜV через 24 месяца поставлен','Nächster TÜV in 24 Monaten eingetragen','Next MOT set in 24 months'],
 noLog:['Записей пока нет.','Noch keine Einträge.','No entries yet.'],save:['Сохранить','Speichern','Save'],saved:['Сохранено','Gespeichert','Saved'],
 season:['Сейчас стоят','Aktuell montiert','Currently fitted'],sommer:['Летние','Sommerreifen','Summer'],winter:['Зимние','Winterreifen','Winter'],allj:['Всесезонные','Ganzjahresreifen','All-season'],
 thisY:['В этом году','Dieses Jahr','This year'],allT:['Всего','Insgesamt','In total'],fromCar:['Договоры и расходы «Alles zum Auto»','Verträge und Ausgaben aus „Alles zum Auto“','Contracts and expenses from “Alles zum Auto”'],
 sell:['Продана / в архив','Verkauft / archivieren','Sold / archive'],unsell:['Снова активна','Wieder aktiv','Active again'],soldOn:['Продана %d','Verkauft am %d','Sold on %d'],
 pdf:['Карточка машины (PDF)','Fahrzeugakte (PDF)','Vehicle file (PDF)'],edit:['Изменить данные','Daten bearbeiten','Edit data'],
 linkDoc:['Связать документ','Dokument verknüpfen','Link a document'],noDoc:['Документов пока нет.','Noch keine Dokumente.','No documents yet.'],
 zulHint:['Техпаспорт (Teil I), ПТС (Teil II), договор купли','Zulassungsbescheinigung Teil I und II, Kaufvertrag','Registration parts I and II, purchase contract'],
 ai:['Butler напоминает о TÜV, сервисе и шинах и считает расходы — по Вашим записям.','Butler erinnert an TÜV, Service und Reifen und zählt die Kosten – aus Ihren Einträgen.','Butler reminds you of MOT, service and tyres and counts the costs – from your entries.'],
 pick:['Для какой машины?','Für welches Fahrzeug?','For which vehicle?'],due:['через %n дн.','in %n Tagen','in %n days'],over:['просрочено','überfällig','overdue']};
const fzgt=(k,o)=>{let s=cv5n(FZG_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const FZG_SEC=zlL('dat|car|#4A84D6 zul|doc|#3F9FA3 tuv|cal|#E3873A serv|wrench|#4E9E5F rep|warn|#D65A69 reif|repeat|#8B6FD0 km|chart|#4A84D6 kost|coins|#E0A92E dok|fld|#8A93A0');
const fzgAll=()=>{try{return U().assets.filter(a=>a&&vnxCat(a)==='fz')}catch{return[]}};
const fzgAct=()=>fzgAll().filter(a=>!a.sold);
const fzgEur=c=>{try{return vaEur(c)}catch{return fzEur(c)}};
const fzgD=k=>{try{return new Date(k+'T00:00:00').toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'})}catch{return k}};
const fzgDays=k=>{try{return vaDays(k)}catch{return Math.round((new Date(k)-new Date())/864e5)}};
const fzgDue=k=>{const n=fzgDays(k);return n<0?fzgt('over'):fzgt('due',{n})};
const fzgYear=a=>{const y=new Date().getFullYear()+'';return(a.log||[]).filter(l=>String(l.d||'').startsWith(y)).reduce((s,l)=>s+(+l.eur||0),0)};
let fzgTab='ov',fzgSec='dat',fzgCar=null;
const fzgTile=(ic,col,n,lab)=>`<div class="fzgst">${iknF(ic,col,'m')}<b>${i(String(n))}</b><small>${i(lab)}</small></div>`;
function fzgRowV(a){return`<button type="button" class="odr zlr" data-act="vnxa" data-id="${i(a.id)}">${iknF('car','#4A84D6','s')}<span><b>${i(a.name||'—')}</b><small>${i([(a.x||{}).kz,(a.x||{}).km?(a.x.km+' km'):''].filter(Boolean).join(' · '))}</small></span><em class="fzgchip${a.sold?' off':''}">${i(a.sold?fzgt('sold'):fzgt('active'))}</em>${dhi('chev','sm')}</button>`}
function fzgScr(){const A=fzgAct(),All=fzgAll();let car={tot:0,C:[],D:[],E:[]};try{car=akAsset('car')}catch{}
 const tuv=A.filter(a=>(a.dl||{}).tuv&&fzgDays(a.dl.tuv)<=90).length,serv=A.filter(a=>(a.dl||{}).oel&&fzgDays(a.dl.oel)<=60).length,cost=(car.tot||0)+A.reduce((s,a)=>s+fzgYear(a),0);
 const tab=k=>`<button type="button" class="${fzgTab===k?'on':''}" data-act="fzgtab" data-k="${k}">${i(fzgt('tb_'+k))}</button>`;let body='';
 if(fzgTab==='ov')body=`<div class="fzgsts">${fzgTile('car','#4A84D6',A.length,fzgt('st_n'))}${fzgTile('wrench','#8B6FD0',serv,fzgt('st_serv'))}${fzgTile('cal','#E3873A',tuv,fzgt('st_tuv'))}${fzgTile('coins','#E0A92E',fzgEur(cost),fzgt('st_cost'))}</div>
  <h3 class="odh">${i(fzgt('mine'))}</h3>${A.length?`<div class="dhcard odl">${A.map(fzgRowV).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzgt('none'))}</p></div>`}
  <div class="fzgsec">${FZG_SEC.slice(1).map(([k,ic,c])=>`<button type="button" data-act="fzgsec" data-k="${k}">${iknF(ic,c,'m')}<b>${i(fzgt('s_'+k))}</b></button>`).join('')}</div>
  <div class="dhcard fzgai">${iknF('spark','#3E8E63','s')}<small>${i(fzgt('ai'))}</small></div>`;
 else if(fzgTab==='veh')body=All.length?`<div class="dhcard odl">${All.map(fzgRowV).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzgt('none'))}</p></div>`;
 else if(fzgTab==='cost'){const rows=A.map(a=>`<div class="odr zlr">${iknF('car','#4A84D6','s')}<span><b>${i(a.name)}</b><small>${i(fzgt('thisY'))}</small></span><b>${i(fzgEur(fzgYear(a)))}</b></div>`).join('');
  body=`<div class="dhcard vnxtot"><small>${i(fzgt('st_cost'))}</small><b>${i(fzgEur(cost))}</b></div><div class="dhcard odl">${rows}<button type="button" class="odr zlr" data-act="go" data-to="akw">${iknF('receipt','#E0A92E','s')}<span><b>${i(fzgt('fromCar'))}</b></span><b>${i(fzgEur(car.tot||0))}</b>${dhi('chev','sm')}</button></div>`}
 else if(fzgTab==='dl'){const L=[];A.forEach(a=>{(VNX_DL.fz||[]).map(vnxSp).forEach(f=>{const d=(a.dl||{})[f.k];if(d)L.push([d,vnxt(f.l),a])})});L.sort((x,y)=>x[0].localeCompare(y[0]));
  body=L.length?`<div class="dhcard odl">${L.map(([d,t,a])=>`<button type="button" class="odr zlr" data-act="vnxa" data-id="${i(a.id)}">${iknF('cal','#E3873A','s')}<span><b>${i(t)} · ${i(a.name)}</b><small>${i(fzgD(d))} · ${i(fzgDue(d))}</small></span>${dhi('chev','sm')}</button>`).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzgt('noLog'))}</p></div>`}
 else{const ids=new Set();A.forEach(a=>(a.docs||[]).forEach(x=>ids.add(x)));let D=[];try{D=zlDocs().filter(d=>ids.has(d.id)||(car.D||[]).some(z=>z.id===d.id))}catch{}
  body=D.length?`<div class="dhcard odl">${D.map(d=>zlRowDoc(d)).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzgt('noDoc'))}</p></div>`}
 return`<div class="screen dhome vnx fzg">${bsvHdr(fzgt('t'),'bsvback')}<div class="bkxhd">${iknF('car','#4A84D6')}<div><h3>${i(fzgt('t'))}</h3><small>${i(fzgt('sub'))}</small></div></div>
 <div class="bkxtabs fzgtabs">${['ov','veh','cost','dl','doc'].map(tab).join('')}</div>${body}
 <button type="button" class="bsvaddb" data-act="vnxnew" data-k="fz">${i(fzgt('add'))}</button></div>`}

/* --- one vehicle --- */
const fzgLog=(a,t)=>(a.log||[]).filter(l=>l.t===t).sort((x,y)=>String(y.d).localeCompare(String(x.d)));
const fzgLogHtml=(a,t)=>{const L=fzgLog(a,t);return L.length?`<div class="dhcard odl">${L.map(l=>`<div class="odr zlr">${iknF(FZG_SEC.find(s=>s[0]===t)[1],FZG_SEC.find(s=>s[0]===t)[2],'s')}<span><b>${i(l.note||fzgt('s_'+t))}</b><small>${i([fzgD(l.d),l.km?l.km+' km':''].filter(Boolean).join(' · '))}</small></span>${+l.eur?`<b>${i(fzgEur(l.eur))}</b>`:''}<button type="button" class="iconbtn fzgdel" data-act="fzglogdel" data-id="${i(a.id)}" data-l="${i(l.id)}" aria-label="x">×</button></div>`).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzgt('noLog'))}</p></div>`};
const fzgDl=(a,k,lab)=>{const d=(a.dl||{})[k];return`<div class="dhcard fzgnext">${iknF('cal','#E3873A','s')}<span><small>${i(fzgt('next'))} · ${i(lab)}</small><b>${d?i(fzgD(d))+' · '+i(fzgDue(d)):'—'}</b></span></div>`};
function fzgDocsOf(a,rx){let D=[];try{D=zlDocs().filter(d=>(a.docs||[]).includes(d.id))}catch{}return rx?D.filter(d=>rx.test(d.title||'')):D}
const fzgDocList=(a,rx)=>{const D=fzgDocsOf(a,rx);return`<div class="dhcard odl">${D.map(d=>zlRowDoc(d)).join('')||`<p class="dhnone">${i(fzgt('noDoc'))}</p>`}<button type="button" class="bsvplus" data-act="vnxdoc" data-id="${i(a.id)}">＋ ${i(fzgt('linkDoc'))}</button></div>`};
function fzgCard(a){const x=a.x||{},s=fzgSec,kv=(l,v)=>v?`<div><small>${i(l)}</small><b>${i(v)}</b></div>`:'';let body='';
 if(s==='dat')body=`<div class="dhcard vkv">${(VNX_F.fz||[]).map(vnxSp).map(f=>kv(vnxt(f.l),f.t==='date'&&x[f.k]?fzgD(x[f.k]):x[f.k])).join('')}${kv(vnxt('f_date'),a.date?fzgD(a.date):'')}${+a.cost?kv(vnxt('f_cost'),fzgEur(a.cost)):''}${+a.value?kv(vnxt('f_value'),fzgEur(a.value)):''}${kv(vnxt('f_orig'),a.orig)}${kv(vnxt('f_note'),a.note)}</div>
  <button type="button" class="bsvplus" data-act="vnxedit" data-id="${i(a.id)}">${i(fzgt('edit'))}</button>`;
 else if(s==='zul')body=`<p class="dnnote">${i(fzgt('zulHint'))}</p>${fzgDocList(a,/zulassung|fahrzeugschein|fahrzeugbrief|kaufvertrag|teil i/i)}`;
 else if(s==='tuv')body=fzgDl(a,'tuv',vnxt('d_tuv'))+fzgLogHtml(a,'tuv');
 else if(s==='serv')body=fzgDl(a,'oel',vnxt('d_oel'))+fzgLogHtml(a,'serv');
 else if(s==='rep')body=fzgLogHtml(a,'rep');
 else if(s==='reif')body=fzgDl(a,'reif',vnxt('d_reif'))+`<div class="zlchips">${['sommer','winter','allj'].map(k=>`<button type="button" class="${x.reifen===k?'on':''}" data-act="fzgreif" data-id="${i(a.id)}" data-k="${k}">${i(fzgt(k))}</button>`).join('')}</div>`+fzgLogHtml(a,'reif');
 else if(s==='km')body=`<div class="dhcard vnxtot"><small>${i(fzgt('km'))}</small><b>${i(x.km?x.km+' km':'—')}</b></div>`+fzgLogHtml(a,'km');
 else if(s==='kost'){const by={};(a.log||[]).forEach(l=>{if(+l.eur)by[l.t]=(by[l.t]||0)+(+l.eur)});const tot=Object.values(by).reduce((p,q)=>p+q,0);
  body=`<div class="dhcard vnxtot"><small>${i(fzgt('thisY'))}</small><b>${i(fzgEur(fzgYear(a)))}</b></div><div class="dhcard odl">${Object.keys(by).map(t=>`<div class="odr zlr">${iknF(FZG_SEC.find(z=>z[0]===t)[1],FZG_SEC.find(z=>z[0]===t)[2],'s')}<span><b>${i(fzgt('s_'+t))}</b></span><b>${i(fzgEur(by[t]))}</b></div>`).join('')}<div class="odr zlr"><span><b>${i(fzgt('allT'))}</b></span><b>${i(fzgEur(tot))}</b></div>
  <button type="button" class="odr zlr" data-act="go" data-to="akw">${iknF('receipt','#E0A92E','s')}<span><b>${i(fzgt('fromCar'))}</b></span>${dhi('chev','sm')}</button></div>`}
 else body=fzgDocList(a);
 const logT=['tuv','serv','rep','reif','km','kost'].includes(s);
 return`<div class="screen dhome vnx vnxd fzg fzgd">${bsvHdr(fzgt('t'),'bsvback')}
 <div class="bkxhd">${iknF('car','#4A84D6')}<div><h3>${i(a.name||'—')}</h3><small>${i([x.kz,a.sold?fzgt('soldOn',{d:fzgD(a.sold)}):fzgt('active')].filter(Boolean).join(' · '))}</small></div></div>
 <div class="fzgsecs">${FZG_SEC.map(([k,ic,c])=>`<button type="button" class="${s===k?'on':''}" data-act="fzgcs" data-k="${k}">${iknF(ic,c,'s')}<span>${i(fzgt('s_'+k))}</span></button>`).join('')}</div>
 <h3 class="odh">${i(fzgt('s_'+s))}</h3>${body}
 ${logT?`<button type="button" class="dcadd gold" data-act="fzglog" data-id="${i(a.id)}" data-k="${s==='kost'?'rep':s}">${i(fzgt('entry'))}</button>`:''}
 <div class="fzgfoot"><button type="button" class="bsvplus" data-act="fzgpdf" data-id="${i(a.id)}">${i(fzgt('pdf'))}</button><button type="button" class="bsvplus" data-act="fzgsell" data-id="${i(a.id)}">${i(a.sold?fzgt('unsell'):fzgt('sell'))}</button></div></div>`}
const _fzgVC=vnxCard;
vnxCard=function(a){try{if(vnxCat(a)==='fz'){if(fzgCar!==a.id){fzgCar=a.id;if(!fzgSecKeep)fzgSec='dat'}fzgSecKeep=0;return fzgCard(a)}}catch(e){Hooks.err('fzgcard',e)}return _fzgVC(a)};
let fzgSecKeep=0;
/* sold vehicles stay reachable from the vehicle list */
const _fzgGet=vnxGet;vnxGet=function(id){return _fzgGet(id)||(()=>{try{return U().assets.find(a=>a.id===id)}catch{return null}})()};

/* --- actions --- */
Hooks.act('fzgtab',d=>{fzgTab=d.k;v()});
Hooks.act('fzgcs',d=>{fzgSec=d.k;fzgSecKeep=1;v()});
Hooks.act('fzgsec',d=>{const A=fzgAct();const go=a=>{fzgSec=d.k;fzgSecKeep=1;fzgCar=a.id;vnxSelA=a.id;R('vnxd')};if(!A.length){vnxRunAct('vnxnew');return}if(A.length===1)return go(A[0]);
 H(fzgt('pick'),`<div class="dhcard odl">${A.map(a=>`<button type="button" class="odr zlr" data-fz="${i(a.id)}">${iknF('car','#4A84D6','s')}<span><b>${i(a.name)}</b></span>${dhi('chev','sm')}</button>`).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-fz]');if(!b)return;el.remove();go(A.find(z=>z.id===b.dataset.fz))})})});
Hooks.act('fzglog',d=>{const a=vnxGet(d.id);if(!a)return;const t=d.k,today=new Date().toISOString().slice(0,10);
 H(fzgt('s_'+t),`<div class="bsvys"><label class="bsvl">${i(fzgt('date'))}</label><input class="field" type="date" data-fl="d" value="${today}">
 <label class="bsvl">${i(fzgt('km'))}</label><input class="field" inputmode="numeric" data-fl="km" value="${i((a.x||{}).km||'')}">
 ${t!=='km'?`<label class="bsvl">${i(fzgt('eur'))}</label><input class="field" inputmode="decimal" data-fl="eur"><label class="bsvl">${i(fzgt('note'))}</label><input class="field" data-fl="note">`:''}
 ${['tuv','serv','reif'].includes(t)?`<label class="bsvl">${i(fzgt('next'))}</label><input class="field" type="date" data-fl="next">`:''}
 <button type="button" class="dcadd gold" data-fls>${i(fzgt('save'))}</button></div>`,
 el=>{el.classList.add('bsvsh');const nx=el.querySelector('[data-fl=next]'),dd=el.querySelector('[data-fl=d]');const sug=()=>{if(!nx||nx.dataset.ed)return;const b=new Date(dd.value||today);if(t==='tuv')b.setMonth(b.getMonth()+24);else if(t==='serv')b.setFullYear(b.getFullYear()+1);else b.setMonth(b.getMonth()+6);nx.value=b.toISOString().slice(0,10)};sug();
  dd.addEventListener('change',sug);nx&&nx.addEventListener('input',()=>nx.dataset.ed=1);
  el.querySelector('[data-fls]').onclick=()=>{const g2=k=>{const e=el.querySelector(`[data-fl=${k}]`);return e?e.value.trim():''};const l={id:V(),t,d:g2('d')||today,km:g2('km').replace(/\D/g,''),eur:g2('eur')?aa(g2('eur'))||0:0,note:g2('note')};
   a.log=Array.isArray(a.log)?a.log:[];a.log.push(l);a.x=a.x||{};if(l.km&&(+l.km>(+a.x.km||0)))a.x.km=l.km;
   const nk=g2('next');if(nk){a.dl=a.dl||{};a.dl[{tuv:'tuv',serv:'oel',reif:'reif'}[t]]=nk;vnxCal(a)}$();el.remove();fzgSecKeep=1;v();T(t==='tuv'&&nk?fzgt('nextTuv'):fzgt('saved'))}})});
Hooks.act('fzglogdel',d=>{const a=vnxGet(d.id);if(!a)return;a.log=(a.log||[]).filter(l=>l.id!==d.l);$();fzgSecKeep=1;v()});
Hooks.act('fzgreif',d=>{const a=vnxGet(d.id);if(!a)return;a.x=a.x||{};a.x.reifen=d.k;$();fzgSecKeep=1;v()});
Hooks.act('fzgsell',d=>{const a=vnxGet(d.id);if(!a)return;a.sold=a.sold?'':new Date().toISOString().slice(0,10);$();fzgSecKeep=1;v()});
Hooks.act('fzgpdf',async d=>{const a=vnxGet(d.id);if(!a)return;const x=a.x||{};const B=[{h:fzgt('s_dat'),l:(VNX_F.fz||[]).map(vnxSp).filter(f=>x[f.k]).map(f=>({t:vnxt(f.l)+': '+(f.t==='date'?fzgD(x[f.k]):x[f.k])}))}];
 const dl=(VNX_DL.fz||[]).map(vnxSp).filter(f=>(a.dl||{})[f.k]);if(dl.length)B.push({h:vnxt('sDates'),l:dl.map(f=>({t:vnxt(f.l)+': '+fzgD(a.dl[f.k])}))});
 ['tuv','serv','rep','reif','km'].forEach(t=>{const L=fzgLog(a,t);if(L.length)B.push({h:fzgt('s_'+t),l:L.map(l=>({t:'• '+[fzgD(l.d),l.note,l.km?l.km+' km':'',+l.eur?fzgEur(l.eur):''].filter(Boolean).join(' · '),s:20,hh:28}))})});
 const D=fzgDocsOf(a);if(D.length)B.push({h:fzgt('s_dok'),l:D.map(z=>({t:'• '+z.title,s:20,hh:28}))});B.push({h:fzgt('thisY'),l:[{t:fzgEur(fzgYear(a)),b:1}]});
 T(vnxt('pvBusy'));try{await vnxPdfMake(fzgt('pdf').replace(/\s*\(PDF\)/,'')+' – '+a.name,B)}catch(e){Hooks.err('fzgpdf',e)}});
/* Fahrzeuge from Vermögen and from the Start tile open the department */
Hooks.act('vnxk',d=>{if(d.k==='fz'){fzgTab='ov';return R('fzg')}vnxSelK=d.k||'';R('vnxk')},{replace:1});
try{OD_OK.add('fzg');Te.includes('fzg')||Te.push('fzg');AG_R.push('fzg')}catch{}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='fzg')return fzgScr()}catch(e){Hooks.err('fzgscr',e)}});
Hooks.css('docs-fahrzeuge',`.fzgtabs{overflow-x:auto}.fzgtabs button{white-space:nowrap;font-size:12.5px!important}
.fzgsts{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:0 0 12px}.fzgst{background:var(--card,#fff);border-radius:16px;padding:8px 4px 10px;display:flex;flex-direction:column;align-items:center;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,.05)}.fzgst b{font-size:15px;margin-top:2px}.fzgst small{font-size:10.5px;opacity:.65;line-height:1.2}
.fzgchip{font-style:normal;font-size:12px;font-weight:700;color:var(--green);background:color-mix(in srgb,var(--green) 13%,transparent);padding:2px 9px;border-radius:12px}.fzgchip.off{color:var(--muted);background:color-mix(in srgb,var(--muted,#888) 14%,transparent)}
.fzgsec{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:12px 0}.fzgsec button{background:var(--card,#fff);border:0;border-radius:16px;padding:6px 3px 10px;display:flex;flex-direction:column;align-items:center;gap:2px;color:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05)}.fzgsec b{font-size:11px;line-height:1.15;text-align:center;font-weight:600}
.fzgai{display:flex;align-items:center;gap:10px;background:color-mix(in srgb,var(--green) 7%,var(--card,#fff))!important}.fzgai small{font-size:12.5px;opacity:.8}
.fzgsecs{display:flex;gap:6px;overflow-x:auto;padding:2px 0 8px;margin:0 -2px}.fzgsecs button{flex:none;display:flex;align-items:center;gap:6px;border:1.5px solid transparent;background:var(--card,#fff);border-radius:14px;padding:2px 10px 2px 4px;font-size:12.5px;color:inherit}.fzgsecs button.on{border-color:var(--green);font-weight:700}.fzgsecs .ikf.s{margin:4px 0 0}
.fzgnext{display:flex;align-items:center;gap:12px;margin-bottom:10px}.fzgnext span{display:flex;flex-direction:column}.fzgnext small{opacity:.65;font-size:12px}.fzgdel{flex:none;width:30px;height:30px;font-size:18px;opacity:.5}
.fzgfoot{display:flex;gap:8px;margin-top:10px}.fzgfoot button{flex:1}`);
