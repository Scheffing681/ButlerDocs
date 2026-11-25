/* ===== Butler Docs: Steuerzentrum 2.0 (v82) =====
   In «Finanzen → Steuer-Mappe» a card «Steuerjahr · Status · Check» leads to the Steuerzentrum (route szc):
   - years (this and the two before), the status of the year: Nicht begonnen · In Vorbereitung · Dokumente fehlen ·
     Zu prüfen · Vorbereitet · Eingereicht · Abgeschlossen — set by the user, never guessed;
   - Steuer-Check: Lohnsteuerbescheinigung, Lohnabrechnungen, Werbungskosten, Versicherungen & Vorsorge (also from the
     contracts — not twice), Sonderausgaben (Spenden, Kinderbetreuung), außergewöhnliche Belastungen (Gesundheit),
     Handwerker, Kinder / Kindergeld, Steuerbescheid → Vollständig · Zu prüfen · Fehlt, each with its source;
     «Fehlt» does not mean the paper is required by law;
   - the year against the year before (sums per category);
   - Steuerbescheid: Erstattung / Nachzahlung (entered by the user), the Einspruch deadline (date + 4 days + 1 month,
     «bitte prüfen»), «Einspruch vorbereiten» opens a Vorgang with the Bescheid;
   - CSV export of the year (opens in Excel / Numbers), the folder for the Steuerberater as before.
   ELSTER has no open interface for apps: Butler prepares, the user enters in Mein ELSTER.
   Data: g.stz = {y:{st, bes:{t:'erst'|'nach', a:cents}}} */
const szS={
 t:['Налоговый центр','Steuerzentrum','Tax centre'],yr:['Налоговый год %y','Steuerjahr %y','Tax year %y'],st:['Статус','Status','Status'],
 st_nb:['Не начато','Nicht begonnen','Not started'],st_iv:['Готовлю','In Vorbereitung','In preparation'],st_df:['Не хватает документов','Dokumente fehlen','Documents missing'],st_zp:['Проверить','Zu prüfen','To check'],
 st_vb:['Подготовлено','Vorbereitet','Prepared'],st_ei:['Подано','Eingereicht','Filed'],st_ab:['Закрыто','Abgeschlossen','Closed'],
 stHint:['Статус ставите Вы — Батлер его не угадывает.','Den Status setzen Sie – Butler rät ihn nicht.','You set the status – Butler does not guess it.'],
 chk:['Проверка','Steuer-Check','Tax check'],r_ok:['Есть','Vollständig','Complete'],r_zp:['Проверить','Zu prüfen','To check'],r_f:['Нет','Fehlt','Missing'],
 cnt:['%a есть · %b проверить · %c нет','%a vollständig · %b prüfen · %c fehlt','%a complete · %b check · %c missing'],
 i_lst:['Справка о зарплате (Lohnsteuerbescheinigung)','Lohnsteuerbescheinigung','Payroll tax statement'],i_lohn:['Зарплатные ведомости','Lohnabrechnungen','Payslips'],i_wk:['Расходы на работу (Werbungskosten)','Werbungskosten','Work expenses'],
 i_vers:['Страховки и пенсия','Versicherungen & Vorsorge','Insurance & pension'],i_sa:['Особые расходы (Spenden, Kinderbetreuung)','Sonderausgaben (Spenden, Kinderbetreuung)','Special expenses'],i_ag:['Медицина (außergewöhnliche Belastungen)','Außergewöhnliche Belastungen (Gesundheit)','Extraordinary burdens (health)'],
 i_hand:['Мастера и хозяйство','Handwerker & Haushalt','Tradesmen & household'],i_kind:['Дети, Kindergeld','Kinder & Kindergeld','Children & child benefit'],i_bes:['Налоговое решение (Steuerbescheid)','Steuerbescheid','Tax assessment'],
 n_docs:['документов: %n','%n Dokumente','%n documents'],n_rec:['чеков: %n · %a','%n Belege · %a','%n receipts · %a'],n_ctr:['договоров: %n','%n Verträge','%n contracts'],none:['ничего не найдено','nichts gefunden','nothing found'],
 kids:['детей в «Семье»: %n, документа о Kindergeld нет','%n Kinder in „Familie“, kein Kindergeld-Dokument','%n children in “Family”, no child benefit document'],noKids:['детей не указано','keine Kinder eingetragen','no children entered'],
 law:['«Нет» не значит, что документ обязателен по закону. Обычно документы не прикладывают, а хранят на случай запроса Finanzamt.','„Fehlt“ heißt nicht, dass das Dokument gesetzlich nötig ist. Belege werden meist nicht mitgeschickt, sondern für Rückfragen des Finanzamts aufbewahrt.','“Missing” does not mean the document is legally required. Receipts are usually kept for questions of the tax office, not sent.'],
 cmp:['Сравнение с %y','Vergleich mit %y','Compared with %y'],bes:['Налоговое решение','Steuerbescheid','Tax assessment'],erst:['Возврат','Erstattung','Refund'],nach:['Доплата','Nachzahlung','Additional payment'],amt:['Сумма из решения','Betrag laut Bescheid','Amount on the assessment'],
 ein:['Возражение (Einspruch) до %d — проверьте по письму','Einspruch bis %d – bitte im Bescheid prüfen','Objection until %d – please check in the assessment'],einB:['Подготовить возражение','Einspruch vorbereiten','Prepare an objection'],
 csv:['Экспорт года в CSV (Excel)','Jahr als CSV (Excel)','Year as CSV (Excel)'],berater:['Папка для консультанта','Mappe für Berater','Folder for an adviser'],
 elster:['ELSTER: открытого подключения для приложений нет. Батлер готовит данные — вводите их в Mein ELSTER сами.','ELSTER: Für Apps gibt es keine offene Schnittstelle. Butler bereitet vor – eingetragen wird in Mein ELSTER.','ELSTER: there is no open interface for apps. Butler prepares – you enter it in Mein ELSTER.'],
 open:['Открыть налоговый центр','Steuerzentrum öffnen','Open the tax centre'],saved:['Сохранено','Gespeichert','Saved']};
const szt=(k,o)=>{let s=cv5n(szS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const SZ_ST=['nb','iv','df','zp','vb','ei','ab'];
const szD=()=>{const o=g.stz=g.stz&&typeof g.stz==='object'?g.stz:{};if(!o.y||typeof o.y!=='object')o.y={};return o};
const szY=y=>{const o=szD().y;return o[y]=o[y]||{}};
const szDocs=()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const szInYear=(d,y)=>{const t=[d.title,d.dtname].join(' ');if(new RegExp('\\b'+y+'\\b').test(t))return!0;const k=d.date||(d.ts?new Date(d.ts).toISOString().slice(0,10):'');return k.startsWith(y)};
const szRec=(y,c)=>{try{return(fzD().y[y]||[]).filter(r=>!c||r.cat===c)}catch{return[]}};
const szSum=L2=>L2.reduce((a,b)=>a+(+b.amt||0),0);
function szCheck(y){const D=szDocs(),R=[];const add=(k,r,s,act)=>R.push({k,r,s,act});
 const lst=D.filter(d=>/lohnsteuerbescheinigung|lohnsteuer-bescheinigung/i.test(d.title||'')&&(szInYear(d,y)||szInYear(d,String(+y+1))));
 add('lst',lst.length?'ok':'f',lst.length?szt('n_docs',{n:lst.length}):szt('none'),lst[0]?`data-act="dzopen" data-id="${lst[0].id}"`:'data-act="go" data-to="kar"');
 const lohn=D.filter(d=>/lohnabrechnung|gehaltsabrechnung|entgeltabrechnung|verdienstabrechnung/i.test(d.title||'')&&szInYear(d,y));
 add('lohn',lohn.length>=1?'ok':'zp',lohn.length?szt('n_docs',{n:lohn.length}):szt('none'),'data-act="go" data-to="kar"');
 const wk=szRec(y,'arb');add('wk',wk.length?'ok':'zp',wk.length?szt('n_rec',{n:wk.length,a:fzEur(szSum(wk))}):szt('none'),'data-act="szcat" data-k="arb"');
 let ins=[];try{ins=vaContracts().filter(e=>/^ins_/.test(e.cat||'')&&e.cat!=='ins_other'&&e.cat!=='ins_car')}catch{}const vr=szRec(y,'vers'),vd=D.filter(d=>/beitragsbescheinigung|beitragsnachweis|bescheinigung.*(versicherung|kranken)|riester|rürup|ruerup/i.test(d.title||'')&&szInYear(d,y));
 add('vers',vd.length?'ok':ins.length||vr.length?'zp':'zp',[ins.length?szt('n_ctr',{n:ins.length}):'',vd.length?szt('n_docs',{n:vd.length}):'',vr.length?szt('n_rec',{n:vr.length,a:fzEur(szSum(vr))}):''].filter(Boolean).join(' · ')||szt('none'),'data-act="szcat" data-k="vers"');
 const sa=szRec(y,'spend').concat(szRec(y,'kind'));add('sa',sa.length?'ok':'zp',sa.length?szt('n_rec',{n:sa.length,a:fzEur(szSum(sa))}):szt('none'),'data-act="szcat" data-k="spend"');
 const ag=szRec(y,'ges');add('ag',ag.length?'ok':'zp',ag.length?szt('n_rec',{n:ag.length,a:fzEur(szSum(ag))}):szt('none'),'data-act="szcat" data-k="ges"');
 const ha=szRec(y,'hand');add('hand',ha.length?'ok':'zp',ha.length?szt('n_rec',{n:ha.length,a:fzEur(szSum(ha))}):szt('none'),'data-act="szcat" data-k="hand"');
 let kids=[];try{kids=(typeof Va==='function'?Va():[]).filter(c=>/child|kind|sohn|tochter|son|daughter|сын|доч/i.test([c.role,c.fam&&c.fam.rel].join(' ')))}catch{}
 const kg=D.filter(d=>/kindergeld|familienkasse/i.test([d.title,d.party].join(' ')));add('kind',!kids.length?'ok':kg.length?'ok':'zp',!kids.length?szt('noKids'):kg.length?szt('n_docs',{n:kg.length}):szt('kids',{n:kids.length}),'data-act="go" data-to="people"');
 const bes=D.filter(d=>/steuerbescheid|einkommensteuerbescheid|bescheid für \d{4}/i.test(d.title||'')&&new RegExp('\\b'+y+'\\b').test([d.title,eiTxt(d).slice(0,500)].join(' ')));
 add('bes',bes.length?'ok':(+y<new Date().getFullYear()?'f':'zp'),bes.length?szt('n_docs',{n:bes.length}):szt('none'),bes[0]?`data-act="dzopen" data-id="${bes[0].id}"`:'');
 return{R,bes:bes[0]||null}}
function szScreen(){const now=new Date().getFullYear(),y=String(m.szY||now),Y=szY(y),C=szCheck(y),n=k=>C.R.filter(x=>x.r===k).length,py=String(+y-1);
 const IC={ok:'✓',zp:'?',f:'✕'};
 const cats=FZ_CAT.map(c=>c[0]).filter(c=>szRec(y,c).length||szRec(py,c).length);
 const bes=C.bes,bd=bes&&(bes.date||'');let einD='';try{if(bd){const a=new Date(bd+'T12:00:00');a.setDate(a.getDate()+4);a.setMonth(a.getMonth()+1);einD=a.toISOString().slice(0,10)}}catch{}
 return`<div class="screen dhome fz va szw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(szt('t'))}</h2></div><span></span></div>
 <div class="vahero"><small>${i(szt('yr',{y}))}</small><b class="kpn">${i(szt('st_'+(Y.st||'nb')))}</b><small>${i(szt('cnt',{a:n('ok'),b:n('zp'),c:n('f')}))}</small></div>
 <div class="vachips szyrs">${[now,now-1,now-2].map(x=>`<button type="button" class="${+y===x?'on':''}" data-act="szy" data-k="${x}">${x}</button>`).join('')}</div>
 <h3 class="vash">${i(szt('st'))}</h3><div class="vachips kpst">${SZ_ST.map(s=>`<button type="button" class="${(Y.st||'nb')===s?'on':''}" data-act="szst" data-k="${s}">${i(szt('st_'+s))}</button>`).join('')}</div><p class="vanote">${i(szt('stHint'))}</p>
 <h3 class="vash">${i(szt('chk'))}</h3><div class="vacard">${C.R.map(x=>`<button type="button" class="varow" ${x.act||''}><span class="vaic szr ${x.r}">${IC[x.r]}</span><span class="vatx"><b>${i(szt('i_'+x.k))}</b><small>${i(szt('r_'+x.r))} · ${i(x.s)}</small></span><span class="vaam">${x.act?'›':''}</span></button>`).join('')}</div>
 <p class="vanote">${i(szt('law'))}</p>
 ${bes?`<h3 class="vash">${i(szt('bes'))}</h3><div class="vacard szbes"><div class="vachips">${['erst','nach'].map(k=>`<button type="button" class="${(Y.bes||{}).t===k?'on':''}" data-act="szbt" data-k="${k}">${i(szt(k))}</button>`).join('')}</div>
  <label class="bsvl">${i(szt('amt'))}</label><input class="field" inputmode="decimal" data-szb value="${(Y.bes||{}).a?i(((Y.bes.a)/100).toLocaleString(he(),{minimumFractionDigits:2})):''}" placeholder="0,00 €">
  ${einD&&vaDays(einD)>=0?`<p class="szein">⏰ ${i(szt('ein',{d:vaDate(einD)}))}</p>`:''}<button type="button" class="vabtn" data-act="szein" data-id="${bes.id}">${i(szt('einB'))}</button></div>`:''}
 ${cats.length?`<h3 class="vash">${i(szt('cmp',{y:py}))}</h3><div class="vacard"><table class="sztab"><tr><th></th><th>${i(y)}</th><th>${i(py)}</th></tr>${cats.map(c=>`<tr><td>${i(fzt('c_'+c))}</td><td>${i(fzEur(szSum(szRec(y,c))))}</td><td>${i(fzEur(szSum(szRec(py,c))))}</td></tr>`).join('')}</table></div>`:''}
 <div class="vacard"><button type="button" class="varow" data-act="szcsv"><span class="vaic">📊</span><span class="vatx"><b>${i(szt('csv'))}</b></span><span class="vaam">›</span></button><button type="button" class="varow" data-act="go" data-to="mbr"><span class="vaic">📦</span><span class="vatx"><b>${i(szt('berater'))}</b></span><span class="vaam">›</span></button></div>
 <p class="vanote">${i(szt('elster'))}</p></div>`}
['szc'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='szc')return szScreen()}catch(e){Hooks.err('szscreen',e)}});
Hooks.act('szy',d=>{m.szY=+d.k;v()});Hooks.act('szst',d=>{szY(String(m.szY||new Date().getFullYear())).st=d.k;$();v()});
Hooks.act('szbt',d=>{const Y=szY(String(m.szY||new Date().getFullYear()));Y.bes=Y.bes||{};Y.bes.t=d.k;$();v()});
document.addEventListener('change',e=>{try{if(m.route!=='szc'||!e.target.matches('[data-szb]'))return;const Y=szY(String(m.szY||new Date().getFullYear()));Y.bes=Y.bes||{};Y.bes.a=vaParseAmt(e.target.value)||0;$();T(szt('saved'))}catch{}},!0);
Hooks.act('szein',d=>{const doc=szDocs().find(z=>z.id===d.id);if(!doc)return;try{const x=vgCreate({t:'Einspruch – '+(doc.title||'Steuerbescheid'),cat:'einspr',whoN:doc.party||'Finanzamt',az:(()=>{try{return kpAz(doc)}catch{return''}})(),docs:[doc.id],st:'bearb'});vgSel=x.id;R('vgd')}catch(e){Hooks.err('szein',e)}});
Hooks.act('szcsv',()=>{const y=String(m.szY||new Date().getFullYear()),q=s=>'"'+String(s==null?'':s).replace(/"/g,'""')+'"',L2=[['Steuerjahr','Kategorie','Datum','Beschreibung','Betrag EUR'].map(q).join(';')];
 szRec(y).forEach(r=>L2.push([y,fzt('c_'+r.cat),r.d||'',r.t||'',((+r.amt||0)/100).toFixed(2).replace('.',',')].map(q).join(';')));
 try{vaContracts().filter(e=>/^ins_/.test(e.cat||'')).forEach(e=>L2.push([y,'Vertrag',e.start||'',e.co||'',((vaMo(e)*12)/100).toFixed(2).replace('.',',')].map(q).join(';')))}catch{}
 const f=new File(['﻿'+L2.join('\r\n')],'Steuerjahr-'+y+'.csv',{type:'text/csv'});let ok=!1;try{ok=!!(navigator.canShare&&navigator.canShare({files:[f]}))}catch{}if(ok)navigator.share({files:[f]}).catch(()=>{});else try{Hl(f)}catch{const u=URL.createObjectURL(f),a=document.createElement('a');a.href=u;a.download=f.name;a.click()}});
/* the card in Finanzen → Steuer-Mappe */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='fzm'||(typeof fzCat!=='undefined'&&fzCat)||fzD().tab==='kost'||fzD().tab==='aus')return h;const k=h.indexOf('<div class="fzyr">');if(k<0)return h;
 const y=fzYear(),C=szCheck(y),n=r=>C.R.filter(x=>x.r===r).length,st=szY(y).st||'nb';
 const card=`<button type="button" class="vaabot szcard" data-act="szgo" data-y="${y}"><span><b>🧾 ${i(szt('yr',{y}))} · ${i(szt('st_'+st))}</b><small>${i(szt('cnt',{a:n('ok'),b:n('zp'),c:n('f')}))}</small></span><span class="akch">›</span></button>`;return h.slice(0,k)+card+h.slice(k)}catch(e){Hooks.err('szcard',e);return h}});
Hooks.act('szcat',d=>{try{fzD().tab='stm';fzD().cur=String(m.szY||new Date().getFullYear());$();R('fzm');setTimeout(()=>{try{L.fzcat({k:d.k})}catch{}},60)}catch(e){Hooks.err('szcat',e)}});
Hooks.act('szgo',d=>{m.szY=+d.y;R('szc')});
try{SP_L.push(['szc','note',szS.t,['steuer','налог','tax','elster','finanzamt','steuerbescheid','lohnsteuer']])}catch{}
Hooks.css('docs-steuerzentrum',`
.szr.ok{background:color-mix(in srgb,var(--bd-acc,#1f7a63) 16%,transparent);color:var(--bd-acc,var(--green));font-weight:700}.szr.zp{background:#fdebd0;color:#b9770e;font-weight:700}.szr.f{background:#fadbd8;color:#c0392b;font-weight:700}
.szbes{padding:12px 16px}.szein{font-size:14px;margin:8px 0;color:#b9770e}.szcard{margin:0 0 12px}
.sztab{width:100%;border-collapse:collapse;font-size:14px;margin:6px 0}.sztab th,.sztab td{padding:7px 4px;border-bottom:1px solid var(--line);text-align:right}.sztab td:first-child,.sztab th:first-child{text-align:left}
`);
