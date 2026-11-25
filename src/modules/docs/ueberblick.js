/* ===== Butler Docs: stage 5 of BUTLER 2.0 — Life Overview (v78) =====
   - Start gets «Ihre Woche»: deadlines, payments (bills due, with the sum), price rises and what waits in the Eingang
     for the next 7 days, one tap → «Überblick».
   - «Überblick» (route ubl): blocks Ausgaben · Dokumente · Verträge & Abos · Termine & Aufgaben · Besitz · Familie,
     week or month. Every number says where it comes from («aus: …»); where data is missing Butler says so instead
     of guessing. Every row opens its place.
   - «Anpassen» (route ublset): which blocks, the order (↑ ↓), week / month / quarter, «Ihre Woche» on Start or not.
   Data: g.ubl = {hide:{k:1}, ord:[k…], per:'w'|'m'|'q', noStart:1} */
const ubS={
 wk:['Ваша неделя','Ihre Woche','Your week'],ovw:['Обзор','Überblick','Overview'],dl:['Сроки','Fristen','Deadlines'],pay:['Платежи · %a','Zahlungen · %a','Payments · %a'],payN:['Платежи','Zahlungen','Payments'],
 rise:['Цена растёт','Preis steigt','Price rises'],inb:['Во входящих','im Eingang','in the inbox'],
 per_w:['Неделя','Woche','Week'],b_kauf:['Покупки и гарантия','Käufe & Garantie','Purchases & warranty'],noKauf:['покупки ещё не внесены','noch keine Käufe eingetragen','no purchases entered yet'],kNew:['Куплено в этом месяце','Diesen Monat gekauft','Bought this month'],kEnd:['Скоро конец гарантии','Garantie / Gewährleistung endet bald','Warranty ends soon'],srcKauf:['покупки (%n)','Käufe (%n)','purchases (%n)'],
 pdf:['Отчёт PDF','Bericht als PDF','Report as PDF'],pdfS:['период, дата и источники — для себя или консультанта','Zeitraum, Datum und Quellen – für Sie oder Ihren Berater','period, date and sources – for you or your adviser'],rT:['Обзор Butler · %p','Butler-Überblick · %p','Butler overview · %p'],rMade:['Создано %d · только данные с этого телефона','Erstellt am %d · nur Daten von diesem Telefon','Created %d · only data from this phone'],rNote:['Цифры показывают только то, что внесено в приложение. Если чего-то нет — в отчёте этого тоже нет.','Die Zahlen zeigen nur, was in der App erfasst ist. Was fehlt, fehlt auch im Bericht.','The figures show only what is in the app. What is missing is missing in the report, too.'],per_m:['Месяц','Monat','Month'],per_q:['Квартал','Quartal','Quarter'],adj:['Настроить','Anpassen','Customise'],
 b_aus:['Расходы','Ausgaben','Spending'],b_doc:['Документы','Dokumente','Documents'],b_ver:['Договоры и подписки','Verträge & Abos','Contracts & subs'],b_dl:['Сроки и задачи','Termine & Aufgaben','Dates & tasks'],b_bes:['Имущество','Besitz','Property'],b_fam:['Семья','Familie','Family'],
 vsM:['к %m','zu %m','vs %m'],src:['из: %t','aus: %t','from: %t'],srcAus:['расходов и %n договоров','Ausgaben + %n Verträgen','spending + %n contracts'],
 inEing:['Во входящих','Im Eingang','In the inbox'],exp:['Скоро истекают','Laufen bald ab','Run out soon'],unpaid:['Счета без «оплачено»','Rechnungen ohne „bezahlt“','Bills not marked paid'],
 kb:['Скоро можно расторгнуть','Bald kündbar','Can be cancelled soon'],abos:['Подписки в месяц','Abos im Monat','Subscriptions a month'],
 thisP:['В этот период','In diesem Zeitraum','In this period'],open:['Открытые задачи','Offene Aufgaben','Open tasks'],
 tuv:['TÜV машины','TÜV Auto','Car TÜV'],carC:['Машина с января','Auto seit Januar','Car since January'],homeC:['Жильё с января','Wohnung seit Januar','Home since January'],
 bday:['День рождения: %n','Geburtstag: %n','Birthday: %n'],famDoc:['Документы семьи истекают','Familien-Dokumente laufen ab','Family documents run out'],
 none:['нет данных — %t','keine Angaben – %t','no data – %t'],noAus:['внесите расходы','Ausgaben eintragen','enter spending'],noVer:['добавьте договоры','Verträge hinzufügen','add contracts'],noFam:['добавьте близких в «Контакты»','Angehörige in „Kontakte“ eintragen','add relatives in “Contacts”'],noBes:['добавьте Fahrzeugschein или договор аренды','Fahrzeugschein oder Mietvertrag hinzufügen','add a vehicle registration or rental contract'],
 ok:['всё спокойно ✓','alles ruhig ✓','all calm ✓'],
 show:['Показывать','Anzeigen','Show'],per:['Период','Zeitraum','Period'],first:['Порядок','Reihenfolge','Order'],onStart:['«Ваша неделя» на главной','„Ihre Woche“ auf Start','“Your week” on Start'],
 honest:['Каждая цифра показывает, откуда она. Если данных мало, Батлер так и скажет.','Jede Zahl im Überblick zeigt, woher sie stammt. Fehlen Angaben, sagt Butler das.','Every number shows where it comes from. If data is missing, Butler says so.']};
const ubt=(k,o)=>{let s=cv5n(ubS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const UB_K=['aus','doc','ver','dl','kauf','bes','fam'],UB_IC={aus:'💶',doc:'📄',ver:'🔁',dl:'⏰',kauf:'🛍',bes:'🚗',fam:'👪'};
const ubD=()=>{const o=g.ubl=g.ubl&&typeof g.ubl==='object'?g.ubl:{};if(!o.hide||typeof o.hide!=='object')o.hide={};if(!Array.isArray(o.ord))o.ord=UB_K.slice();o.ord=o.ord.filter(k=>UB_K.includes(k));UB_K.forEach((k,j)=>{if(!o.ord.includes(k))o.ord.splice(Math.min(j,o.ord.length),0,k)});if(!o.per)o.per='w';return o};
const ubDays=()=>({w:7,m:31,q:92})[m.ublP||ubD().per]||7;
/* bills that are due in the next n days and not marked paid */
function ubPays(n){const out=[];try{Ke().items.filter(d=>d&&!d.type&&!d.del&&!d.paid).forEach(d=>{const o=eiRead(d);if(o.kind==='inv'&&o.due&&o.amt&&vaDays(o.due)>=0&&vaDays(o.due)<=n)out.push({d,o})})}catch{}return out}
function ubWeek(){let F=[];try{F=stDlAll().filter(t=>vaDays(t.k)>=0&&vaDays(t.k)<=7)}catch{}const P=ubPays(7),sum=P.reduce((a,b)=>a+b.o.amt,0);let R2=[],E=[];try{R2=vaRises()}catch{}try{E=egList()}catch{}
 return{f:F.length,p:P.length,sum,r:R2.length,e:E.length}}
function ubWeekCard(){const W=ubWeek();return`<button type="button" class="stcard ubwk" data-act="go" data-to="ubl"><div class="ubwh"><b>${i(ubt('wk'))}</b><span>${i(ubt('ovw'))} ›</span></div>
 <div class="ubg"><div><b>${W.f}</b>${i(ubt('dl'))}</div><div><b>${W.p}</b>${i(W.p?ubt('pay',{a:vaEur(W.sum)}):ubt('payN'))}</div><div class="${W.r?'w':''}"><b>${W.r}</b>${i(ubt('rise'))}</div><div><b>${W.e}</b>${i(ubt('inb'))}</div></div></button>`}
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='home'||ubD().noStart)return h;const k=h.indexOf('<div class="stcard sgimp">');if(k<0)return h;return h.slice(0,k)+ubWeekCard()+h.slice(k)}catch(e){Hooks.err('ubwk',e);return h}});
/* ---------- blocks ---------- */
const ubRow=(t,s,v2,act)=>`<button type="button" class="varow" ${act||''}><span class="vatx"><b>${i(t)}</b>${s?`<small>${i(s)}</small>`:''}</span><span class="vaam">${v2!==''&&v2!=null?i(String(v2)):''}${act?' ›':''}</span></button>`;
const ubNone=t=>`<p class="ubnone">${i(ubt('none',{t}))}</p>`;
function ubBlock(k){const n=ubDays();let body='',src='';
 if(k==='aus'){let fix=0,own=0,ownP=0,fixP=0,nC=0;try{const k0=vaMonKey(0),k1=vaMonKey(-1);fix=vaFixOf(k0);fixP=vaFixOf(k1);own=vaEntries(k0).reduce((a,b)=>a+(+b.a||0),0);ownP=vaEntries(k1).reduce((a,b)=>a+(+b.a||0),0);nC=vaContracts().length}catch{}
  const tot=fix+own,totP=fix+ownP,pct=totP?Math.round((tot-totP)/totP*100):null;if(!tot)return ubNone(ubt('noAus'));
  body=`<div class="ubkpi"><div><b>${i(vaEur(tot))}</b>${i(vaMonName(vaMonKey(0)))}</div>${pct!==null?`<div><b class="${pct>0?'up':'dn'}">${pct>0?'+':''}${pct} %</b>${i(ubt('vsM',{m:vaMonName(vaMonKey(-1))}))}</div>`:''}</div>`;src=ubt('src',{t:ubt('srcAus',{n:nC})});body=`<button type="button" class="ubin" data-act="zqaus">${body}</button>`}
 if(k==='doc'){let E=[];try{E=egList()}catch{}const exp=(()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del&&(d.end||(d.f||{}).valid)&&vaDays(d.end||d.f.valid)>=0&&vaDays(d.end||d.f.valid)<=Math.max(90,n))}catch{return[]}})();
  const up=(()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.del&&!d.paid&&d.ctr&&eiRead(d).kind==='inv').length}catch{return 0}})();
  body=ubRow(ubt('inEing'),'',E.length,'data-act="go" data-to="eing"')+(exp.length?ubRow(ubt('exp'),exp.slice(0,2).map(d=>d.title+' '+vaDate(d.end||d.f.valid).replace(/^\d+\./,'')).join(', '),exp.length,'data-act="go" data-to="dsrok"'):'')+(up?ubRow(ubt('unpaid'),'',up,'data-act="go" data-to="fzm"'):'')}
 if(k==='ver'){let R2=[],rows=[];try{R2=vaRises();rows=vaRows()}catch{}if(!rows.length)return ubNone(ubt('noVer'));const kb=rows.filter(r=>r.kb&&vaDays(r.kb)>=0&&vaDays(r.kb)<=60),ab=rows.filter(r=>r.abo).reduce((a,b)=>a+b.mo,0);
  body=(R2.length?ubRow(ubt('rise'),R2.map(r=>(r.e.co||'')+' +'+vaPct(r.pct)).join(', '),R2.length,`data-act="vapr" data-id="${R2[0].e.id}"`):'')+(kb.length?ubRow(ubt('kb'),kb.map(r=>r.nm).slice(0,3).join(', '),kb.length,'data-act="fzkost"'):'')+ubRow(ubt('abos'),'',vaEur(ab),'data-act="fzkost"')}
 if(k==='dl'){let F=[];try{F=stDlAll().filter(t=>vaDays(t.k)>=0&&vaDays(t.k)<=n)}catch{}const op=(g.tasks||[]).filter(t=>t&&!t.done&&t.knd!=='w').length;
  body=ubRow(ubt('thisP'),F[0]?F[0].t+' · '+vaDate(F[0].k):ubt('ok'),F.length,'data-act="go" data-to="dsrok"')+ubRow(ubt('open'),'',op,'data-act="go" data-to="tasks"')}
 if(k==='kauf'){let K=[];try{K=kgK()}catch{}if(!K.length)return ubNone(ubt('noKauf'));const mk=vaMonKey(0),newM=K.filter(x=>String(x.d||'').startsWith(mk)),end=K.map(x=>({x,e:x.gar&&vaDays(x.gar)>=0?x.gar:kgGew(x)})).filter(z=>z.e&&vaDays(z.e)>=0&&vaDays(z.e)<=Math.max(90,n)).sort((a,b)=>a.e.localeCompare(b.e));
  body=ubRow(ubt('kNew'),newM.map(x=>x.n).slice(0,3).join(', '),newM.length,'data-act="go" data-to="kauf"')+ubRow(ubt('kEnd'),end.slice(0,2).map(z=>z.x.n+' '+vaDate(z.e)).join(', ')||ubt('ok'),end.length,'data-act="go" data-to="kauf"');src=ubt('src',{t:ubt('srcKauf',{n:K.length})})}
 if(k==='bes'){let car=null,home=null;try{car=akAsset('car');home=akAsset('home')}catch{}const has=A=>A&&(A.C.length||A.D.length||A.E.length);if(!has(car)&&!has(home))return ubNone(ubt('noBes'));
  body=(has(car)?(car.tuv?ubRow(ubt('tuv'),'',vaDate(car.tuv.end||car.tuv.f.valid),'data-act="akw" data-k="car"'):'')+ubRow(ubt('carC'),'',vaEur(car.tot),'data-act="akw" data-k="car"'):'')+(has(home)?ubRow(ubt('homeC'),'',vaEur(home.tot),'data-act="akw" data-k="home"'):'')}
 if(k==='fam'){let C=[];try{C=Va().filter(c=>c&&(c.cat==='family'||c.fam))}catch{}if(!C.length)return ubNone(ubt('noFam'));
  const bd=C.map(c=>{const b=c.birthday||c.bday||c.dob;if(!b||!/\d{4}-\d\d-\d\d/.test(b))return null;const y=new Date().getFullYear();let k2=y+b.slice(4);if(vaDays(k2)<0)k2=(y+1)+b.slice(4);return{c,k:k2}}).filter(x=>x&&vaDays(x.k)<=Math.max(n,31)).sort((a,b)=>a.k.localeCompare(b.k));
  body=bd.map(x=>ubRow(ubt('bday',{n:x.c.first||x.c.name||'—'}),'',vaDate(x.k).replace(/\d{4}$/,''),`data-act="pgo" data-id="${x.c.id}"`)).join('')+ubRow(cv5n(['Близкие','Angehörige','Relatives']),C.map(c=>c.first||c.name).filter(Boolean).slice(0,4).join(', '),C.length,'data-act="go" data-to="people"')}
 return body+(src?`<p class="ubsrc">${i(src)}</p>`:'')}
function ublScreen(){const D=ubD(),P=m.ublP||D.per;
 return`<div class="screen dhome fz va ubs"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(ubt('ovw'))}</h2></div><span></span></div>
 <div class="vachips">${['w','m','q'].map(p=>`<button type="button" class="${P===p?'on':''}" data-act="ublp" data-k="${p}">${i(ubt('per_'+p))}</button>`).join('')}</div>
 ${D.ord.filter(k=>!D.hide[k]).map(k=>`<div class="vacard ubb"><h3>${UB_IC[k]} ${i(ubt('b_'+k))}</h3>${ubBlock(k)}</div>`).join('')}
 <div class="vacard"><button type="button" class="varow" data-act="ubpdf"><span class="vaic">📄</span><span class="vatx"><b>${i(ubt('pdf'))}</b><small>${i(ubt('pdfS'))}</small></span><span class="vaam">›</span></button></div>
 <button type="button" class="valnk" data-act="go" data-to="ublset">${i(ubt('adj'))}</button><p class="vanote">${i(ubt('honest'))}</p></div>`}
function ublSet(){const D=ubD(),tg=(on,t,a,k)=>`<button type="button" class="vaabot" data-act="${a}" data-k="${k}"><span><b>${t}</b></span><u class="${on?'on':''}"></u></button>`;
 return`<div class="screen dhome fz va ubs"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(ubt('adj'))}</h2></div><span></span></div>
 <h3 class="vash">${i(ubt('show'))}</h3>${D.ord.map((k,j)=>`<div class="ubset">${tg(!D.hide[k],UB_IC[k]+' '+i(ubt('b_'+k)),'ubltog',k)}<button type="button" class="ubmv" data-act="ublmv" data-k="${k}" data-d="-1" ${j?'':'disabled'} aria-label="↑">↑</button><button type="button" class="ubmv" data-act="ublmv" data-k="${k}" data-d="1" ${j<D.ord.length-1?'':'disabled'} aria-label="↓">↓</button></div>`).join('')}
 <h3 class="vash">${i(ubt('per'))}</h3><div class="vachips">${['w','m','q'].map(p=>`<button type="button" class="${D.per===p?'on':''}" data-act="ublper" data-k="${p}">${i(ubt('per_'+p))}</button>`).join('')}</div>
 ${tg(!D.noStart,i(ubt('onStart')),'ublst','')}
 <p class="vanote">${i(ubt('honest'))}</p></div>`}
/* the report: exactly what the screen shows, with period, date and the «aus: …» sources, as a PDF */
function ubReport(){const P=m.ublP||ubD().per,per=ubt('per_'+P)+' · '+(P==='w'?vaDate(vaIso(0))+' – '+vaDate(vaIso(7)):vaMonName(vaMonKey(0))),L2=[];
 document.querySelectorAll('.ubs .ubb').forEach(b=>{const h=b.querySelector('h3');L2.push({h:(h&&h.textContent||'').replace(/^[^\p{L}\p{N}]+/u,'').trim()});
  b.querySelectorAll('.varow,.ubkpi>div,.ubnone').forEach(r=>{const t=r.querySelector('b'),sm=r.querySelector('small'),am=r.querySelector('.vaam');L2.push({t:(t?t.textContent:r.textContent).trim(),s:sm?sm.textContent.trim():'',a:am?am.textContent.replace('›','').trim():''})});
  const sr=b.querySelector('.ubsrc');sr&&L2.push({src:sr.textContent.trim()})});return{per,L2}}
async function ubPdf(){const{per,L2}=ubReport();const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=140,line=(t,o)=>{o=o||{};if(yy>FZ_H-150){[c,x2]=fzPage();P.push(c);yy=140}x2.fillStyle=o.g?'#666':'#000';x2.font=`${o.b?'bold ':''}${o.s||26}px Georgia, serif`;x2.fillText(String(t).slice(0,o.r?58:80),ml+(o.x||0),yy);if(o.r){const w=x2.measureText(o.r).width;x2.fillText(o.r,FZ_W-120-w,yy)}yy+=o.h||40};
 line(ubt('rT',{p:per}),{b:1,s:38,h:56});line(ubt('rMade',{d:vaDate(vaIso(0))}),{s:22,g:1,h:60});
 L2.forEach(r=>{if(r.h){yy+=14;line(r.h,{b:1,s:30,h:48})}else if(r.src)line(r.src,{s:20,g:1,x:20,h:40});else{line(r.t,{x:20,r:r.a});if(r.s)line(r.s,{x:40,s:21,g:1,h:34})}});
 yy+=20;line(ubt('rNote'),{s:20,g:1});
 const name=ubt('rT',{p:per}).replace(/[\\/:*?"<>|]/g,'-')+'.pdf',f=new File([new Blob([Kn(P)],{type:'application/pdf'})],name,{type:'application/pdf'});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return f}}catch(e){if(e&&e.name==='AbortError')return f}try{Hl(f)}catch{}try{tlxLog('csv',name)}catch{}return f}
Hooks.act('ubpdf',()=>{ubPdf().catch(e=>Hooks.err('ubpdf',e))});
['ubl','ublset'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='ubl')return ublScreen();if(m.route==='ublset')return ublSet()}catch(e){Hooks.err('ubscreen',e)}});
Hooks.act('ublp',d=>{m.ublP=d.k;v()});Hooks.act('ublper',d=>{ubD().per=d.k;m.ublP=null;$();v()});
Hooks.act('ubltog',d=>{const D=ubD();if(D.hide[d.k])delete D.hide[d.k];else D.hide[d.k]=1;$();v()});
Hooks.act('ublmv',d=>{const D=ubD(),j=D.ord.indexOf(d.k),k2=j+(+d.d);if(j<0||k2<0||k2>=D.ord.length)return;D.ord.splice(j,1);D.ord.splice(k2,0,d.k);$();v()});
Hooks.act('ublst',()=>{const D=ubD();D.noStart=D.noStart?0:1;$();v()});
Hooks.css('docs-ueberblick',`
.ubwk{display:block;width:100%;text-align:left;border:1px solid var(--bd-edge,var(--line));color:var(--ink);padding:14px 16px!important}
.ubwh{display:flex;justify-content:space-between;align-items:center}.ubwh b{font-size:18px}.ubwh span{color:var(--bd-acc,var(--green));font-weight:600;font-size:14px}
.ubg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}.ubg div{border-radius:14px;padding:9px 10px;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 8%,transparent);font-size:13px;color:var(--muted);line-height:1.25}
.ubg b{display:block;font-size:20px;color:var(--ink)}.ubg .w{background:#fdebd0}.ubg .w b{color:#b9770e}html[data-bd=dunkel] .ubg .w{background:color-mix(in srgb,#f5b942 18%,transparent)}
.ubb{padding:10px 16px}.ubb h3{margin:4px 0 4px;font-size:17px}.ubin{display:block;width:100%;border:0;background:none;padding:0;text-align:left;color:var(--ink)}
.ubkpi{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:6px 0}.ubkpi div{border-radius:14px;padding:9px 10px;background:color-mix(in srgb,var(--bd-acc,#1f7a63) 8%,transparent);font-size:13px;color:var(--muted)}.ubkpi b{display:block;font-size:20px;color:var(--ink)}.ubkpi .up{color:#c0392b}.ubkpi .dn{color:#1e8449}
html[data-bd=dunkel] .ubkpi .up{color:#ff8a7a}html[data-bd=dunkel] .ubkpi .dn{color:#5fd39a}
.ubsrc{font-size:12px;color:var(--bd-acc,var(--green))!important;margin:2px 0 6px;background:transparent!important}.ubnone{font-size:14px;color:var(--muted)!important;margin:6px 0 8px;background:transparent!important}
.ubset{display:flex;gap:6px;align-items:center}.ubset .vaabot{margin:4px 0;flex:1}.ubmv{border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));border-radius:12px;width:38px;height:38px;font-size:16px;color:var(--ink)}.ubmv:disabled{opacity:.3}
`);
