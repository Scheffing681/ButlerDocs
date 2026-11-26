/* ===== Butler Docs: Mein Business — Variante 1 additions (v92) =====
   - Angebot (quote) uses the invoice editor (kind 'ang', own numbers AN-JJJJ-NNN, «Gültig bis», «In Rechnung umwandeln»);
     quotes never count as income.
   - Zahlungserinnerung / 1. / 2. Mahnung for an overdue invoice: German text + one-page PDF, new deadline, optional fee
     (only when agreed — the app says «bitte prüfen»), history on the invoice (v.mahn) and a task on the new deadline.
     Nothing is sent by the app: PDF / share / copy, the user sends it.
   - Produkte & Leistungen (route bzprod): a catalogue for invoice lines («Aus Katalog»). Lager is optional (off by default):
     stock and minimum per product; a saved invoice with catalogue lines takes the stock down ONCE (v.stk).
   - Bericht als PDF: month / quarter / year — income (paid in the period), expenses by category, result, invoices written
     and still open, quotes, top customers; period, creation date and «Quelle: Ihre Einträge» on the page. Simplified,
     not a bookkeeping statement.
   Data: g.bzx.ang[], g.bzx.prod [{id,t,u,p,r,stock,min}], g.bzx.lager (bool), inv.mahn [{lvl,d,frist,fee}] */
const bzpS={
 ang:['Предложение','Angebot','Quote'],mahn:['Mahnung','Mahnung','Reminder'],neu:['НОВОЕ','NEU','NEW'],
 conv:['счёт создан','in Rechnung umgewandelt','turned into invoice'],more:['Ещё для бизнеса','Mehr für Ihr Geschäft','More for your business'],angs:['Предложения: %n','Angebote: %n','Quotes: %n'],angsS:['не считаются доходом','zählen nicht als Einnahme','not counted as income'],
 prod:['Товары и услуги','Produkte & Leistungen','Products & services'],prodS:['для строк счёта в одно касание','für Rechnungszeilen mit einem Tipp','for invoice lines in one tap'],
 lager:['Склад','Lager','Stock'],lagerOpt:['по желанию','optional','optional'],lagerS:['остаток, минимум, «заканчивается»','Bestand, Mindestmenge, „wird knapp“','stock, minimum, “running low”'],low:['заканчивается: %n','knapp: %n','running low: %n'],
 rep:['Отчёт PDF','Bericht als PDF','Report as PDF'],repS:['месяц · квартал · год','Monat · Quartal · Jahr','month · quarter · year'],
 noOver:['Просроченных счетов нет','Keine überfälligen Rechnungen','No overdue invoices'],pickInv:['Какой счёт?','Welche Rechnung?','Which invoice?'],
 lvl:['Ступень','Stufe','Level'],l_ze:['Напоминание об оплате','Zahlungserinnerung','Payment reminder'],l_m1:['1-я Mahnung','1. Mahnung','1st reminder'],l_m2:['2-я Mahnung','2. Mahnung','2nd reminder'],
 frist:['Новый срок','Neue Frist','New deadline'],fee:['Плата за напоминание (если договорено)','Mahngebühr (falls vereinbart)','Reminder fee (if agreed)'],
 feeNote:['Плату указывайте, только если это допустимо и соразмерно — проверьте. Батлер ничего не отправляет.','Gebühr nur, wenn zulässig und angemessen – bitte prüfen. Butler sendet nichts.','Add a fee only if allowed and reasonable – please check. Butler sends nothing.'],
 pdf:['PDF','PDF','PDF'],copy:['Копировать текст','Text kopieren','Copy text'],copied:['Скопировано','Kopiert','Copied'],hist:['Уже: %h','Bisher: %h','So far: %h'],taskT:['Проверить оплату: %n','Zahlung prüfen: %n','Check payment: %n'],
 cat:['Из каталога','Aus Katalog','From catalogue'],catNone:['Каталог пуст — добавьте товары или услуги','Katalog leer – Produkte oder Leistungen anlegen','Catalogue empty – add products or services'],
 pAdd:['＋ Товар / услуга','＋ Produkt / Leistung','＋ Product / service'],pT:['Название','Bezeichnung','Name'],pU:['Единица','Einheit','Unit'],pP:['Цена','Preis','Price'],pR:['НДС','USt','VAT'],
 pStock:['Остаток','Bestand','In stock'],pMin:['Минимум','Mindestmenge','Minimum'],lagerOn:['Вести склад','Lager führen','Keep stock'],lagerOnS:['остаток уменьшается после сохранения счёта','Bestand sinkt, wenn eine Rechnung gespeichert wird','stock goes down when an invoice is saved'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],need:['Впишите название','Bitte eine Bezeichnung eintragen','Please enter a name'],none:['Пока пусто','Noch leer','Empty yet'],
 per:['Период','Zeitraum','Period'],pm:['Месяц','Monat','Month'],pq:['Квартал','Quartal','Quarter'],py:['Год','Jahr','Year'],make:['Создать PDF','PDF erstellen','Create PDF'],repOk:['Отчёт готов','Bericht erstellt','Report created']};
const bzpt=(k,o)=>{let s=cv5n(bzpS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const bzpNeu=()=>{try{return Date.now()-awD().seen<21*864e5?`<span class="awneu">${i(bzpt('neu'))}</span>`:''}catch{return''}};
const bzpLow=()=>{const B=bzxD();return B.lager?B.prod.filter(p=>p.min!=null&&p.min!==''&&(+p.stock||0)<=+p.min):[]};
/* ---------- home: quick actions + «Mehr» ---------- */
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;
 if(m.route==='kar'&&krD().tab==='biz'&&bzxOn()){const B=bzxD();
  h=h.replace('<div class="bzqa">','<div class="bzqa bzq6">').replace(/(<button type="button" data-act="bzxcusts">)/,`<button type="button" data-act="bzxang"><b class="ikw" data-ik="1">${iknF('pen','recht','m')}</b>${i(bzpt('ang'))}</button><button type="button" data-act="bzpm"><b class="ikw" data-ik="1">${iknF('bell','ges','m')}</b>${i(bzpt('mahn'))}</button>$1`);
  const low=bzpLow(),A=B.ang.slice().sort((a,b)=>String(b.d).localeCompare(String(a.d)));
  const blk=`<div class="vash bzpmh">${i(bzpt('more'))}${bzpNeu()}</div><div class="dhcard bzpmore">
   ${A.length?`<div class="bzpgrp">${A.slice(0,3).map(a=>{const c=bzxCust(a.cust);return`<button type="button" class="odr bzrow" data-act="bzxinv" data-id="${i(a.id)}"><span><b>${i(a.no)}</b><small>${i([c?c.n:'',bzxDe(a.d),a.inv?'→ '+bzpt('conv'):''].filter(Boolean).join(' · '))}</small></span><em>${i(bzxEur(bzxSum(a).gross))}</em></button>`}).join('')}<small class="bzpn">${i(bzpt('angs',{n:A.length}))} · ${i(bzpt('angsS'))}</small></div>`:''}
   <button type="button" class="bzpr" data-act="go" data-to="bzprod"><span><b>${i(bzpt('prod'))}</b><small>${i(B.prod.length?String(B.prod.length):bzpt('prodS'))}</small></span><i>›</i></button>
   <button type="button" class="bzpr" data-act="go" data-to="bzprod"><span><b>${i(bzpt('lager'))} <em>· ${i(B.lager?(low.length?bzpt('low',{n:low.length}):'✓'):bzpt('lagerOpt'))}</em></b><small>${i(bzpt('lagerS'))}</small></span><i>›</i></button>
   <button type="button" class="bzpr" data-act="bzprep"><span><b>${i(bzpt('rep'))}</b><small>${i(bzpt('repS'))}</small></span><i>›</i></button></div>`;
  const k=h.indexOf('<button type="button" class="fzpdf" data-act="bzxsb">');if(k>0)h=h.slice(0,k)+blk+h.slice(k)}
 if(m.route==='bzinv'&&bzxCur){const c=bzxCur;
  h=h.replace(/(<button type="button" class="bsvplus" data-act="bzxpadd">[^<]*<\/button>)/,`$1<button type="button" class="bsvplus bzpcat" data-act="bzpcat">${i(bzpt('cat'))}</button>`);
  if(c.id&&c.kind!=='ang'&&!c.paid&&!c.storno&&c.due&&c.due<bzxToday()){const k=h.indexOf('<button type="button" class="dcadd gold" data-act="bzxpdf">');if(k>0)h=h.slice(0,k)+`<button type="button" class="vaadd bzpmb" data-act="bzpmi" data-id="${i(c.id)}">⏰ ${i(bzpt('l_ze'))} / ${i(bzpt('mahn'))}</button>`+h.slice(k)}}
 }catch(e){Hooks.err('bzpscr',e)}return h});
/* ---------- Mahnung ---------- */
Hooks.act('bzpm',()=>{const B=bzxD(),td=bzxToday(),O=B.inv.filter(v=>!v.paid&&!v.storno&&v.due&&v.due<td).sort((a,b)=>a.due.localeCompare(b.due));if(!O.length){T(bzpt('noOver'));return}if(O.length===1){bzpMahn(O[0]);return}
 H(bzpt('pickInv'),`<div class="bsvys">${O.map(v=>{const c=bzxCust(v.cust);return`<button type="button" class="varow" data-id="${i(v.id)}"><span class="vatx"><b>${i(v.no)}</b><small>${i([c?c.n:'',bzxT('over',{d:bzxDays(v.due,td)})].filter(Boolean).join(' · '))}</small></span><span class="vaam">${i(bzxEur(bzxSum(v).gross))}</span></button>`}).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;el.remove();bzpMahn(B.inv.find(v=>v.id===b.dataset.id))})})});
Hooks.act('bzpmi',d=>{try{bzxRead()}catch{}const v0=bzxD().inv.find(v=>v.id===d.id);v0&&bzpMahn(v0)});
function bzpText(v,lvl,frist,fee){const c=bzxCust(v.cust)||{},S=bzxSum(v),f=bzxD().firm,tot=S.gross+(fee||0);
 const head=lvl==='ze'?'Zahlungserinnerung':lvl==='m1'?'1. Mahnung':'2. Mahnung';
 const open=lvl==='ze'?`sicher ist es Ihrer Aufmerksamkeit entgangen: Unsere Rechnung ${v.no} vom ${bzxDe(v.d)} über ${bzxEur(S.gross)} war am ${bzxDe(v.due)} fällig. Bis heute konnten wir keinen Zahlungseingang feststellen.`
  :lvl==='m1'?`leider haben wir für unsere Rechnung ${v.no} vom ${bzxDe(v.d)} über ${bzxEur(S.gross)}, fällig am ${bzxDe(v.due)}, noch keinen Zahlungseingang feststellen können.`
  :`trotz unserer bisherigen Erinnerung ist unsere Rechnung ${v.no} vom ${bzxDe(v.d)} über ${bzxEur(S.gross)} weiterhin offen.`;
 return`${head} – Rechnung ${v.no}\n\nSehr geehrte Damen und Herren${c.n?` (${c.n})`:''},\n\n${open}\n\n${fee?`Zuzüglich Mahngebühr: ${bzxEur(fee)}\nGesamt offen: ${bzxEur(tot)}\n\n`:''}Bitte überweisen Sie den offenen Betrag bis zum ${bzxDe(frist)}${f.iban?` auf das Konto IBAN ${f.iban}`:''} unter Angabe der Rechnungsnummer ${v.no}.\n\nSollten Sie die Zahlung bereits veranlasst haben, betrachten Sie dieses Schreiben bitte als gegenstandslos.\n\nMit freundlichen Grüßen\n${bzxSign()}`}
function bzpPdf(v,text,title){const B=bzxD(),f=B.firm,c=bzxCust(v.cust)||{n:'',addr:''},P=[];let[cv,x2]=fzPage();P.push(cv);const ml=110,mr=FZ_W-110,F=(s,b)=>`${b?'bold ':''}${s}px Helvetica, Arial, sans-serif`;
 const tx=(t,xx,yy,o)=>{o=o||{};x2.font=F(o.s||21,o.b);x2.fillStyle=o.c||'#111';x2.textAlign=o.a||'left';x2.fillText(String(t),xx,yy);x2.textAlign='left'};
 const fl=String(f.addr||'').split('\n').map(z=>z.trim()).filter(Boolean);tx(f.n||'',mr,100,{s:28,b:1,a:'right'});let yy=138;for(const l of fl){tx(l,mr,yy,{s:18,c:'#444',a:'right'});yy+=25}
 tx([f.n,...fl].filter(Boolean).join(' · '),ml,300,{s:15,c:'#777'});yy=338;for(const l of[c.n,...String(c.addr||'').split('\n').map(z=>z.trim()).filter(Boolean)]){tx(l,ml,yy,{s:23});yy+=31}
 tx(bzxDe(bzxToday()),mr,520,{s:19,a:'right'});yy=580;const lines=String(text).split('\n');tx(lines[0],ml,yy,{s:30,b:1});yy+=56;
 x2.font=F(21);for(const para of lines.slice(1)){let line='';for(const wd of para.split(/(\s+)/)){if(x2.measureText(line+wd).width>mr-ml&&line.trim()){tx(line,ml,yy);yy+=30;line=wd.trimStart()}else line+=wd}tx(line,ml,yy);yy+=30}
 return new File([new Blob([Kn(P)],{type:'application/pdf'})],`${title} ${v.no}.pdf`.replace(/[\/\\:]/g,'-'),{type:'application/pdf'})}
function bzpMahn(v){if(!v)return;const H0=(v.mahn||[]),lv0=H0.length?(H0[H0.length-1].lvl==='ze'?'m1':'m2'):'ze';let lvl=lv0,days=10,fee=0;
 const lab={ze:bzpt('l_ze'),m1:bzpt('l_m1'),m2:bzpt('l_m2')};
 H(`${v.no}`,`<div class="bsvys">${H0.length?`<p class="vanote">${i(bzpt('hist',{h:H0.map(x=>lab[x.lvl]+' '+bzxDe(x.d)).join(', ')}))}</p>`:''}<label class="bsvl">${i(bzpt('lvl'))}</label><div class="vachips" data-lv>${['ze','m1','m2'].map(k=>`<button type="button" class="${k===lvl?'on':''}" data-l="${k}">${i(lab[k])}</button>`).join('')}</div>
 <label class="bsvl">${i(bzpt('frist'))}</label><div class="vachips" data-dy>${[7,10,14].map(n=>`<button type="button" class="${n===days?'on':''}" data-n="${n}">${i(bzxT('days',{n}))}</button>`).join('')}</div>
 <label class="bsvl">${i(bzpt('fee'))}</label><input class="field" inputmode="decimal" data-fee placeholder="0,00"><p class="vanote">${i(bzpt('feeNote'))}</p>
 <textarea class="field" rows="12" data-tx></textarea><button type="button" class="vaadd" data-pdf>${i(bzpt('pdf'))}</button><button type="button" class="vaadd awsec" data-cp>${i(bzpt('copy'))}</button></div>`,el=>{el.classList.add('bsvsh');
  const fr=()=>bzxWk(bzxAdd(bzxToday(),days)),upd=()=>{el.querySelector('[data-tx]').value=bzpText(v,lvl,fr(),fee)};upd();
  el.querySelector('[data-fee]').addEventListener('input',e=>{fee=bzxParse(e.target.value)||0;upd()});
  const rec=()=>{(v.mahn=v.mahn||[]).push({lvl,d:bzxToday(),frist:fr(),fee});g.tasks=Array.isArray(g.tasks)?g.tasks:[];g.tasks.push({id:V(),t:bzpt('taskT',{n:v.no}),due:fr(),done:!1,ts:Date.now()});bzxSave()};
  el.addEventListener('click',async e=>{const l=e.target.closest('[data-l]');if(l){lvl=l.dataset.l;el.querySelectorAll('[data-l]').forEach(z=>z.classList.toggle('on',z===l));upd();return}
   const n=e.target.closest('[data-n]');if(n){days=+n.dataset.n;el.querySelectorAll('[data-n]').forEach(z=>z.classList.toggle('on',z===n));upd();return}
   if(e.target.closest('[data-cp]')){try{await navigator.clipboard.writeText(el.querySelector('[data-tx]').value);T(bzpt('copied'))}catch{}rec();return}
   if(e.target.closest('[data-pdf]')){const t=el.querySelector('[data-tx]').value,file=bzpPdf(v,t,lab[lvl]);rec();try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:file.name});return}}catch(er){if(er&&er.name==='AbortError')return}try{Hl(file)}catch{}}})})}
/* ---------- Produkte & Leistungen, Lager ---------- */
function bzprodScreen(){const B=bzxD(),low=bzpLow();
 return`<div class="screen dhome fz va bzx">${bzxHdr(bzpt('prod'),'back')}
 <button type="button" class="vaabot" data-act="bzplager"><span><b>${i(bzpt('lagerOn'))}</b><small>${i(bzpt('lagerOnS'))}</small></span><u class="${B.lager?'on':''}"></u></button>
 <div class="vacard">${B.prod.length?B.prod.map(p=>`<button type="button" class="varow" data-act="bzped" data-id="${i(p.id)}"><span class="vatx"><b>${i(p.t)}</b><small>${i([p.u,B.firm.klein?'':(+p.r||0)+' %',B.lager&&p.stock!=null&&p.stock!==''?bzpt('pStock')+' '+p.stock:''].filter(Boolean).join(' · '))}${B.lager&&low.includes(p)?` · <b class="bzplow">${i(bzpt('low',{n:''}).replace(/:\s*$/,''))}</b>`:''}</small></span><span class="vaam">${p.p!=null?i(bzxEur(p.p)):''}</span></button>`).join(''):`<p class="dhnone">${i(bzpt('none'))}</p>`}</div>
 <button type="button" class="vaadd" data-act="bzped">${i(bzpt('pAdd'))}</button></div>`}
Hooks.act('bzplager',()=>{const B=bzxD();B.lager=!B.lager;bzxSave();v()});
Hooks.act('bzped',dd=>{const B=bzxD(),p0=dd&&dd.id?B.prod.find(p=>p.id===dd.id):null,o=p0||{r:19};
 H(p0?p0.t:bzpt('pAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(bzpt('pT'))}</label><input class="field" data-k="t" value="${i(o.t||'')}">
 <div class="bsv2c"><div><label class="bsvl">${i(bzpt('pU'))}</label><input class="field" data-k="u" value="${i(o.u||'')}" placeholder="Std., Stk."></div><div><label class="bsvl">${i(bzpt('pP'))}</label><input class="field" inputmode="decimal" data-k="p" value="${i(bzxNum(o.p))}"></div></div>
 ${B.firm.klein?'':`<label class="bsvl">${i(bzpt('pR'))}</label><select class="field" data-k="r">${[19,7,0].map(r=>`<option value="${r}" ${(+o.r||0)===r?'selected':''}>${r} %</option>`).join('')}</select>`}
 ${B.lager?`<div class="bsv2c"><div><label class="bsvl">${i(bzpt('pStock'))}</label><input class="field" inputmode="decimal" data-k="stock" value="${i(o.stock!=null?o.stock:'')}"></div><div><label class="bsvl">${i(bzpt('pMin'))}</label><input class="field" inputmode="decimal" data-k="min" value="${i(o.min!=null?o.min:'')}"></div></div>`:''}
 <small class="verr" data-e></small><button type="button" class="vaadd" data-ks>${i(bzpt('save'))}</button>${p0?`<button type="button" class="bsvdel" data-kd>${i(bzpt('del'))}</button>`:''}</div>`,el=>{el.classList.add('bsvsh');
 el.addEventListener('click',e=>{if(e.target.closest('[data-ks]')){const r={};el.querySelectorAll('[data-k]').forEach(z=>{const k=z.dataset.k;r[k]=k==='p'?bzxParse(z.value):k==='r'?+z.value:k==='stock'||k==='min'?(z.value===''?'':bzxQ(z.value)):z.value.trim()});
  if(!r.t){el.querySelector('[data-e]').textContent=bzpt('need');return}if(p0)Object.assign(p0,r);else B.prod.push(Object.assign({id:V()},r));bzxSave();el.remove();v();return}
  if(e.target.closest('[data-kd]')){B.prod=B.prod.filter(p=>p!==p0);bzxSave();el.remove();v()}})})});
Hooks.act('bzpcat',()=>{try{bzxRead()}catch{}const B=bzxD();if(!B.prod.length){T(bzpt('catNone'));R('bzprod');return}
 H(bzpt('cat'),`<div class="bsvys">${B.prod.map(p=>`<button type="button" class="varow" data-id="${i(p.id)}"><span class="vatx"><b>${i(p.t)}</b><small>${i(p.u||'')}</small></span><span class="vaam">${p.p!=null?i(bzxEur(p.p)):''}</span></button>`).join('')}</div>`,el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const p=B.prod.find(z=>z.id===b.dataset.id);if(!p)return;
  const it={t:p.t,q:1,u:p.u||'',p:p.p,r:B.firm.klein?0:(+p.r||0),pid:p.id},L2=bzxCur.items,last=L2[L2.length-1];if(last&&!last.t&&last.p==null)L2[L2.length-1]=it;else L2.push(it);el.remove();v()})})});
try{const _cm=bzxCommit;bzxCommit=function(){const o=_cm.apply(this,arguments);try{const B=bzxD();if(o&&B.lager&&o.kind!=='ang'&&!o.stk&&!o.storno){let n=0;(o.items||[]).forEach(it=>{const p=it.pid&&B.prod.find(z=>z.id===it.pid);if(p&&p.stock!==''&&p.stock!=null){p.stock=Math.round(((+p.stock||0)-bzxQ(it.q))*100)/100;n++}});if(n){o.stk=1;bzxSave()}}}catch(e){Hooks.err('bzpstk',e)}return o}}catch(e){Hooks.err('bzpstk0',e)}
/* ---------- Bericht als PDF ---------- */
function bzpRange(kind,off){const t=new Date();let a,b,lab;if(kind==='m'){const d=new Date(t.getFullYear(),t.getMonth()+off,1);a=new Date(d);b=new Date(d.getFullYear(),d.getMonth()+1,0);lab=d.toLocaleDateString('de-DE',{month:'long',year:'numeric'})}
 else if(kind==='q'){const q0=Math.floor(t.getMonth()/3)+off,y=t.getFullYear()+Math.floor(q0/4),q=((q0%4)+4)%4;a=new Date(y,q*3,1);b=new Date(y,q*3+3,0);lab=`Q${q+1} ${y}`}
 else{const y=t.getFullYear()+off;a=new Date(y,0,1);b=new Date(y,11,31);lab=String(y)}return{a:x(a),b:x(b),lab}}
function bzpReport(r){const B=bzxD(),f=B.firm,inn=s=>s&&s>=r.a&&s<=r.b;let inc=0,ex=0;const cat={},cu={};
 B.inv.forEach(v=>{if(!v.storno&&inn(v.paid)){const s=bzxSum(v).gross;inc+=s;const c=bzxCust(v.cust);const k=c?c.n:'—';cu[k]=(cu[k]||0)+s}});
 B.exp.forEach(e=>{if(inn(e.d)){ex+=e.amt||0;const k=bzxT('cat_'+(e.cat||'x'));cat[k]=(cat[k]||0)+(e.amt||0)}});
 const W=B.inv.filter(v=>!v.storno&&inn(v.d)),wSum=W.reduce((s,v)=>s+bzxSum(v).gross,0),O=B.inv.filter(v=>!v.storno&&!v.paid&&v.d<=r.b),oSum=O.reduce((s,v)=>s+bzxSum(v).gross,0),A=B.ang.filter(v=>inn(v.d));
 const P=[];let[cv,x2]=fzPage();P.push(cv);let yy=120;const ml=110,mr=FZ_W-110,F=(s,b)=>`${b?'bold ':''}${s}px Helvetica, Arial, sans-serif`;
 const tx=(t,xx,y2,o)=>{o=o||{};x2.font=F(o.s||21,o.b);x2.fillStyle=o.c||'#111';x2.textAlign=o.a||'left';x2.fillText(String(t),xx,y2);x2.textAlign='left'};
 const row=(a,b,o)=>{if(yy>FZ_H-160){[cv,x2]=fzPage();P.push(cv);yy=120}tx(a,ml+(o&&o.x||0),yy,o);tx(b,mr,yy,Object.assign({},o,{a:'right'}));yy+=34};
 const h=t=>{yy+=18;if(yy>FZ_H-200){[cv,x2]=fzPage();P.push(cv);yy=120}tx(t,ml,yy,{s:25,b:1});yy+=12;x2.fillStyle='#ccc';x2.fillRect(ml,yy,mr-ml,1);yy+=34};
 tx('Geschäftsbericht · '+r.lab,ml,yy,{s:36,b:1});yy+=40;tx([f.n,`Zeitraum ${bzxDe(r.a)} – ${bzxDe(r.b)}`,`erstellt am ${bzxDe(bzxToday())}`].filter(Boolean).join(' · '),ml,yy,{s:18,c:'#666'});yy+=30;
 h('Ergebnis');row('Einnahmen (bezahlt im Zeitraum)',bzxEur(inc));row('Ausgaben',bzxEur(ex));row('Ergebnis (vereinfacht)',bzxEur(inc-ex),{b:1});
 h('Rechnungen');row(`Geschrieben: ${W.length}`,bzxEur(wSum));row(`Offen am ${bzxDe(r.b)}: ${O.length}`,bzxEur(oSum));if(A.length)row(`Angebote: ${A.length}`,bzxEur(A.reduce((s,v)=>s+bzxSum(v).gross,0)));
 const cats=Object.entries(cat).sort((a,b)=>b[1]-a[1]);if(cats.length){h('Ausgaben nach Kategorie');cats.forEach(([k,v2])=>row(k,bzxEur(v2)))}
 const cus=Object.entries(cu).sort((a,b)=>b[1]-a[1]).slice(0,5);if(cus.length){h('Kunden (Einnahmen)');cus.forEach(([k,v2])=>row(k,bzxEur(v2)))}
 yy+=20;tx('Quelle: Ihre Einträge in Butler Docs. Vereinfachte Übersicht – kein Jahresabschluss und keine Steuerberatung.',ml,Math.min(yy,FZ_H-130),{s:16,c:'#777'});
 return new File([new Blob([Kn(P)],{type:'application/pdf'})],`Geschäftsbericht ${r.lab}.pdf`,{type:'application/pdf'})}
Hooks.act('bzprep',()=>{let kind='m',off=0;H(bzpt('rep'),`<div class="bsvys"><label class="bsvl">${i(bzpt('per'))}</label><div class="vachips">${['m','q','y'].map(k=>`<button type="button" class="${k===kind?'on':''}" data-k="${k}">${i(bzpt('p'+k))}</button>`).join('')}</div>
 <div class="awnav"><button type="button" data-o="-1" aria-label="‹">‹</button><span data-lab></span><button type="button" data-o="1" aria-label="›">›</button></div><button type="button" class="vaadd" data-mk>${i(bzpt('make'))}</button></div>`,el=>{el.classList.add('bsvsh');const upd=()=>{el.querySelector('[data-lab]').textContent=bzpRange(kind,off).lab};upd();
 el.addEventListener('click',async e=>{const k=e.target.closest('[data-k]');if(k){kind=k.dataset.k;off=0;el.querySelectorAll('[data-k]').forEach(z=>z.classList.toggle('on',z===k));upd();return}const o=e.target.closest('[data-o]');if(o){off=Math.min(0,off+ +o.dataset.o);upd();return}
  if(e.target.closest('[data-mk]')){const file=bzpReport(bzpRange(kind,off));window.__bzpLast={name:file.name,size:file.size};T(bzpt('repOk'));try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:file.name});return}}catch(er){if(er&&er.name==='AbortError')return}try{Hl(file)}catch{}}})})});
OD_OK.add('bzprod');Te.includes('bzprod')||Te.push('bzprod');try{AG_R.includes('bzprod')||AG_R.push('bzprod')}catch{}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bzprod')return bzprodScreen()}catch(e){Hooks.err('bzprod',e)}});
Hooks.css('docs-business-plus',`.bzq6{grid-template-columns:repeat(3,1fr)!important}.bzpmh{display:flex;align-items:center;gap:8px;justify-content:space-between}.bzpmore{padding:4px 14px}
.bzpr{display:flex;align-items:center;gap:10px;width:100%;border:0;background:transparent;padding:12px 0;border-bottom:1px solid rgba(0,0,0,.06);text-align:left;color:inherit}.bzpr:last-child{border-bottom:0}.bzpr span{flex:1;display:flex;flex-direction:column}.bzpr small{opacity:.7;font-size:12px}.bzpr em{font-style:normal;font-weight:400;opacity:.7}.bzpr i{font-style:normal;color:#A8863A}
.bzpgrp{border-bottom:1px solid rgba(0,0,0,.06);padding-bottom:6px}.bzpn{display:block;opacity:.7;font-size:12px;margin:4px 0}.bzplow{color:#9A4A1E}.bzpcat{margin-left:8px}.bzpmb{margin-bottom:8px}`);
