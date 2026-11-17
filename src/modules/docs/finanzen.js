/* ===== Butler Docs: Finanzen (stage 1) — the Steuer-Mappe; «Banken» move into «Behörden & Dienste» =====
   - The home tile «Banken» becomes «Finanzen». Bank accounts the user had entered (g.fin.accounts) become cards in
     «Behörden & Dienste» once (IBAN, BIC, card, block number, online banking); g.fin itself is not touched.
   - Steuer-Mappe: during the year every receipt goes in with one photo (category, amount, date, what);
     per year: count and sum per category; at the end one PDF (overview + every receipt) for ELSTER or the Steuerberater.
   - «Gut zu wissen»: short general rules per category, always «bitte prüfen» — not tax advice.
   Data: g.fzm = {y:{'2026':[{id,cat,d,amt(cents),t,ph:{id,n,type}}]}} */
const fzS={
 t:['Финансы','Finanzen','Finances'],tS:['Налоговая папка, расходы','Steuer-Mappe, Kosten','Tax folder, costs'],
 stm:['Налоговая папка %y','Steuer-Mappe %y','Tax folder %y'],sum:['Чеков: %n · %a','%n Belege · %a','%n receipts · %a'],
 due:['Декларация за %y — срок 31.07.%z (без консультанта, проверьте)','Steuererklärung %y fällig 31.07.%z (ohne Steuerberater – bitte prüfen)','Tax return %y due 31.07.%z (without adviser – please check)'],
 photo:['Сфотографировать чек','Beleg fotografieren','Photograph a receipt'],noPhoto:['Внести без фото','Ohne Foto eintragen','Add without photo'],
 pdf:['PDF для ELSTER / консультанта','PDF für ELSTER / Steuerberater','PDF for ELSTER / adviser'],pdfNo:['Пока нет чеков за этот год','Noch keine Belege für dieses Jahr','No receipts for this year yet'],
 tip:['Полезно знать:','Gut zu wissen:','Good to know:'],empty:['Здесь пока пусто — сфотографируйте первый чек.','Noch leer – fotografieren Sie den ersten Beleg.','Empty so far – photograph the first receipt.'],
 cat:['Раздел','Bereich','Category'],amt:['Сумма, €','Betrag, €','Amount, €'],date:['Дата','Datum','Date'],what:['Что это','Was ist es','What is it'],whatPh:['Напр. очки, Fielmann','z. B. Brille, Fielmann','e.g. glasses, optician'],
 nb:['Новый чек','Neuer Beleg','New receipt'],save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],
 saved:['Чек сохранён','Beleg gespeichert','Receipt saved'],badAmt:['Впишите сумму','Bitte einen Betrag eingeben','Please enter an amount'],back:['Все разделы','Alle Bereiche','All categories'],
 pdfT:['Belege für die Steuererklärung %y','Belege für die Steuererklärung %y','Receipts for the tax return %y'],total:['Итого','Summe','Total'],
 moved:['Банки теперь в «Ведомства и службы»','Banken stehen jetzt unter „Behörden & Dienste“','Banks are now under “Offices & services”'],
 c_arb:['Работа (Werbungskosten)','Arbeit (Werbungskosten)','Work (Werbungskosten)'],c_arbS:['Дорога, рабочие вещи, курсы','Fahrten, Arbeitsmittel, Fortbildung','Travel, work equipment, courses'],
 c_hand:['Мастера и хозяйство','Handwerker & Haushalt','Craftsmen & household'],c_handS:['Считается только работа','Nur Arbeitskosten zählen','Only labour counts'],
 c_ges:['Здоровье','Gesundheit','Health'],c_gesS:['Доплаты, очки, зубной врач','Zuzahlungen, Brille, Zahnarzt','Co-payments, glasses, dentist'],
 c_kind:['Присмотр за детьми','Kinderbetreuung','Childcare'],c_kindS:['Kita, Tagesmutter, Hort','Kita, Tagesmutter, Hort','Kita, childminder, after-school'],
 c_spend:['Пожертвования','Spenden','Donations'],c_spendS:['','',''],
 c_vers:['Страховки и пенсия','Versicherungen & Vorsorge','Insurance & pensions'],c_versS:['Kranken-, Haftpflicht-, Rentenversicherung','Kranken-, Haftpflicht-, Rentenversicherung','Health, liability, pension'],
 c_sonst:['Прочее','Sonstiges','Other'],c_sonstS:['','',''],
 t_arb:['Финансамт сам учитывает 1 230 € в год (Arbeitnehmer-Pauschbetrag). Чеки помогают, если расходов на работу больше.','Das Finanzamt rechnet automatisch 1.230 € im Jahr an (Arbeitnehmer-Pauschbetrag). Belege lohnen sich, wenn Ihre Kosten darüber liegen.','The tax office counts 1,230 € a year automatically (employee allowance). Receipts help if your costs are higher.'],
 t_hand:['Мастера: 20 % стоимости работы, максимум 1 200 € с налога. Материал не считается. Платить переводом, не наличными.','Handwerker: 20 % der Arbeitskosten, höchstens 1.200 € Steuerermäßigung. Material zählt nicht. Per Überweisung zahlen, nicht bar.','Craftsmen: 20 % of labour costs, at most 1,200 € off the tax. Material does not count. Pay by transfer, not cash.'],
 t_ges:['Расходы на здоровье считаются только выше «допустимой нагрузки», которая зависит от дохода. Чеки сохраняйте всё равно.','Krankheitskosten zählen erst über der „zumutbaren Belastung“, die vom Einkommen abhängt. Belege trotzdem sammeln.','Health costs count only above a “reasonable burden” that depends on income. Keep the receipts anyway.'],
 t_kind:['С 2025 года: 80 % расходов, максимум 4 800 € на ребёнка до 14 лет.','Ab 2025: 80 % der Kosten, höchstens 4.800 € je Kind bis 14 Jahre.','From 2025: 80 % of the costs, at most 4,800 € per child up to 14.'],
 t_spend:['До 300 € часто хватает выписки из банка вместо справки о пожертвовании.','Bis 300 € reicht oft der Kontoauszug statt einer Zuwendungsbestätigung.','Up to 300 € a bank statement often replaces a donation receipt.'],
 t_vers:['Многое уже учтено через зарплату (больничная касса, пенсия). Частные страховки — отдельной строкой.','Vieles ist über den Lohn schon erfasst (Kranken-, Rentenversicherung). Private Versicherungen gesondert angeben.','Much is already reported through your salary. Private insurance goes in separately.'],
 t_sonst:['','',''],chk:['Общие правила, не налоговая консультация — пожалуйста, проверьте.','Allgemeine Regeln, keine Steuerberatung – bitte prüfen.','General rules, not tax advice – please check.']};
const fzt=(k,o)=>{let s=cv5n(fzS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const FZ_CAT=[['arb','🚗',/fahrt|ticket|deutschlandticket|bahn|laptop|computer|büro|fortbildung|kurs|seminar|fachbuch|arbeitsmittel|werkzeug|arbeitskleidung|bewerbung/i],
 ['hand','🔧',/handwerk|maler|klempner|elektriker|reparatur|reinig|gärtner|schornstein|hausmeister|umzug|putz/i],
 ['ges','💊',/apotheke|brille|optik|fielmann|zahn|arzt|praxis|physio|kranken|hörgerät|zuzahlung|medikament/i],
 ['kind','🧸',/kita|tagesmutter|hort|kindergarten|betreuung/i],['spend','🎁',/spende|zuwendung|verein|unicef|caritas|kirche/i],
 ['vers','🛡️',/versicherung|police|beitrag|haftpflicht|rente|riester|rürup|bu-/i],['sonst','📎',/./]];
const fzD=()=>{const o=g.fzm=g.fzm&&typeof g.fzm==='object'?g.fzm:{};if(!o.y||typeof o.y!=='object')o.y={};return o};
const fzYear=()=>String(fzD().cur||new Date().getFullYear());
const fzList=y=>{const o=fzD();if(!Array.isArray(o.y[y]))o.y[y]=[];return o.y[y]};
const fzEur=c=>(Math.round(c||0)/100).toLocaleString(he(),{style:'currency',currency:'EUR'});
const fzCents=v=>{const s=String(v||'').replace(/[€\s]/g,'').replace(/\.(?=\d{3}(\D|$))/g,'').replace(',','.');const n=parseFloat(s);return isFinite(n)&&n>0?Math.round(n*100):null};
const fzGuess=t=>(FZ_CAT.find(([,,rx])=>rx.test(String(t||'')))||FZ_CAT[6])[0];
let fzCat='',fzDel='';

/* --- the screen --- */
function fzScreen(){const y=fzYear(),L2=fzList(y),tot=L2.reduce((a,b)=>a+(b.amt||0),0);
 const hdr=`<div class="sub-hdr"><button class="iconbtn" data-act="fzback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(fzt('t'))}</h2></div><span></span></div>`;
 const yr=`<div class="fzyr"><button type="button" data-act="fzy" data-d="-1" aria-label="‹">‹</button><b>${i(fzt('stm',{y}))}</b><button type="button" data-act="fzy" data-d="1" aria-label="›" ${+y>=new Date().getFullYear()?'disabled':''}>›</button></div>`;
 const sum=`<div class="fzsum"><b>${i(fzt('sum',{n:L2.length,a:fzEur(tot)}))}</b><small>${i(fzt('due',{y,z:+y+1}))}</small></div>`;
 const add=`<label class="dcadd gold fzph">📷 ${i(fzt('photo'))}<input type="file" accept="image/*" capture="environment" data-fzph hidden></label><button type="button" class="fzplain" data-act="fzadd">${i(fzt('noPhoto'))}</button>`;
 if(fzCat){const c=FZ_CAT.find(z=>z[0]===fzCat)||FZ_CAT[6],R2=L2.filter(z=>z.cat===fzCat).sort((a,b)=>(b.d||'').localeCompare(a.d||'')),tp=fzt('t_'+fzCat);
  return`<div class="screen dhome fz">${hdr}<button type="button" class="fzallb" data-act="fzall">‹ ${i(fzt('back'))}</button>${yr}<h3 class="fzch">${c[1]} ${i(fzt('c_'+fzCat))} · ${i(fzEur(R2.reduce((a,b)=>a+(b.amt||0),0)))}</h3>
  ${tp?`<div class="fztip"><b>ⓘ ${i(fzt('tip'))}</b> ${i(tp)}<small>${i(fzt('chk'))}</small></div>`:''}
  ${R2.length?`<div class="dhcard odl">${R2.map(r=>`<button type="button" class="odr fzr" data-act="fzed" data-id="${i(r.id)}"><span class="fzth">${r.ph?`<img data-fzimg="${i(r.ph.id)}" alt="">`:'🧾'}</span><span><b>${i(r.t||fzt('c_'+r.cat))}</b><small>${i(r.d?vA(r.d):'')}</small></span><em>${i(fzEur(r.amt))}</em></button>`).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(fzt('empty'))}</p></div>`}
  ${add}</div>`}
 const rows=FZ_CAT.map(([k,e])=>{const R2=L2.filter(z=>z.cat===k);if(!R2.length&&k==='sonst')return'';const s=R2.reduce((a,b)=>a+(b.amt||0),0),sub=fzt('c_'+k+'S');
  return`<button type="button" class="odr fzc" data-act="fzcat" data-k="${k}"><span class="fze">${e}</span><span><b>${i(fzt('c_'+k))}</b>${sub?`<small>${i(sub)}</small>`:''}</span><em>${R2.length?i(R2.length+' · '+fzEur(s)):'—'}</em></button>`}).join('');
 return`<div class="screen dhome fz">${hdr}${yr}${sum}<div class="dhcard odl">${rows}</div>${add}
 <button type="button" class="fzpdf" data-act="fzpdf">${i(fzt('pdf'))}</button></div>`}
/* receipt photos are drawn after the screen is there */
async function fzImgs(){for(const im of document.querySelectorAll('img[data-fzimg]:not([src])')){try{const L2=fzList(fzYear()),r=L2.find(z=>z.ph&&z.ph.id===im.dataset.fzimg);if(!r)continue;const b=await ni(r.ph);if(b)im.src='data:'+(r.ph.type||'image/jpeg')+';base64,'+b}catch(e){Hooks.err('fzimg',e)}}}

/* --- one receipt --- */
function fzSheet(r){const isNew=!r.id,d=Object.assign({cat:fzCat||'',d:x(new Date()),amt:null,t:''},r);
 H(isNew?fzt('nb'):(d.t||fzt('c_'+d.cat)),`<div class="bsvys fzsh">${d.ph?`<img class="fzbig" data-fzimg="${i(d.ph.id)}" alt="">`:''}
  <label class="bsvl">${i(fzt('cat'))}</label><div class="bsvchips">${FZ_CAT.map(([k,e])=>`<button type="button" class="${d.cat===k?'on':''}" data-fzc="${k}">${e} ${i(fzt('c_'+k))}</button>`).join('')}</div>
  <div class="bsv2c"><div><label class="bsvl">${i(fzt('amt'))}</label><input class="field" data-fzf="amt" inputmode="decimal" value="${d.amt!=null?i(String((d.amt/100).toFixed(2)).replace('.',',')):''}" placeholder="0,00"></div><div><label class="bsvl">${i(fzt('date'))}</label><input class="field" type="date" data-fzf="d" value="${i(d.d||'')}"></div></div>
  <label class="bsvl">${i(fzt('what'))}</label><input class="field" data-fzf="t" value="${i(d.t||'')}" placeholder="${i(fzt('whatPh'))}" autocomplete="off">
  <small class="verr" data-fzerr></small><button type="button" class="dcadd gold" data-fzsave>${i(fzt('save'))}</button>${isNew?'':`<button type="button" class="bsvdel" data-fzdel>${i(fzt('del'))}</button>`}</div>`,
 el=>{el.classList.add('bsvsh');fzImgs();let arm=0;
  const t=el.querySelector('[data-fzf=t]');t.addEventListener('input',()=>{if(!d.catSet){d.cat=fzGuess(t.value);el.querySelectorAll('[data-fzc]').forEach(b=>b.classList.toggle('on',b.dataset.fzc===d.cat))}});
  el.addEventListener('click',e=>{const c=e.target.closest('[data-fzc]');if(c){d.cat=c.dataset.fzc;d.catSet=1;el.querySelectorAll('[data-fzc]').forEach(b=>b.classList.toggle('on',b===c));return}
   if(e.target.closest('[data-fzsave]')){const amt=fzCents(el.querySelector('[data-fzf=amt]').value),er=el.querySelector('[data-fzerr]');if(!amt){er.textContent=fzt('badAmt');return}
    d.amt=amt;d.d=el.querySelector('[data-fzf=d]').value||x(new Date());d.t=t.value.trim();if(!d.cat)d.cat=fzGuess(d.t);delete d.catSet;
    const y=String(d.d).slice(0,4),L2=fzList(y);if(isNew){d.id=V();L2.push(d)}else{for(const k of Object.keys(fzD().y)){const A=fzD().y[k],ix=A.findIndex(z=>z.id===d.id);if(ix>=0)A.splice(ix,1)}L2.push(d)}
    fzD().cur=y;$();el.remove();T(fzt('saved')+' ✓',2200);v();return}
   if(e.target.closest('[data-fzdel]')){if(!arm){arm=1;const b=e.target.closest('[data-fzdel]');b.textContent=fzt('delQ');b.classList.add('on');return}
    for(const k of Object.keys(fzD().y))fzD().y[k]=fzD().y[k].filter(z=>z.id!==d.id);if(d.ph)try{yl(d.ph)}catch{}$();el.remove();v()}})})}
document.addEventListener('change',async e=>{const f=e.target;if(!f||!f.matches||!f.matches('[data-fzph]')||!f.files||!f.files[0])return;const file=f.files[0];f.value='';
 try{const r=await nr(file);fzSheet({ph:r?{id:r.id,n:r.n,type:file.type||'image/jpeg'}:null})}catch(er){Hooks.err('fzph',er);fzSheet({})}},!0);

/* --- the PDF: an overview, then every receipt on its own page --- */
const FZ_W=1240,FZ_H=1754;
function fzPage(){const c=document.createElement('canvas');c.width=FZ_W;c.height=FZ_H;const x2=c.getContext('2d');x2.fillStyle='#fff';x2.fillRect(0,0,FZ_W,FZ_H);x2.fillStyle='#000';x2.textBaseline='top';return[c,x2]}
async function fzPdf(){const y=fzYear(),L2=fzList(y).slice().sort((a,b)=>(a.d||'').localeCompare(b.d||''));if(!L2.length)return T(fzt('pdfNo'),2400);
 const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=140,line=(t,o)=>{o=o||{};if(yy>FZ_H-150){[c,x2]=fzPage();P.push(c);yy=140}x2.font=`${o.b?'bold ':''}${o.s||26}px Georgia, serif`;x2.fillText(t,ml+(o.x||0),yy);if(o.r){const w=x2.measureText(o.r).width;x2.fillText(o.r,FZ_W-120-w,yy)}yy+=o.h||40};
 let me={};try{me=ja()}catch{}line(fzt('pdfT',{y}),{b:1,s:40,h:60});line([me.first,me.last].filter(Boolean).join(' ')+(me.addr?' · '+String(me.addr).replace(/\n/g,', '):''),{s:24,h:60});
 let n=0;const idx={};for(const[k]of FZ_CAT){const R2=L2.filter(z=>z.cat===k);if(!R2.length)continue;line(fzt('c_'+k),{b:1,s:30,h:48,r:fzEur(R2.reduce((a,b)=>a+(b.amt||0),0))});
  for(const r of R2){n++;idx[r.id]=n;line(`${n}.  ${r.d?vA(r.d):''}   ${r.t||''}`.slice(0,70),{x:20,r:fzEur(r.amt)})}yy+=16}
 line(fzt('total'),{b:1,s:30,r:fzEur(L2.reduce((a,b)=>a+(b.amt||0),0)),h:60});line(fzt('chk'),{s:20});
 for(const r of L2){if(!r.ph)continue;try{const b=await ni(r.ph);if(!b)continue;const im=new Image();await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src='data:'+(r.ph.type||'image/jpeg')+';base64,'+b});
  const[pc,px]=fzPage();P.push(pc);px.font='bold 28px Georgia, serif';px.fillText(`${idx[r.id]}. ${fzt('c_'+r.cat)} · ${r.d?vA(r.d):''} · ${fzEur(r.amt)}`,100,70);
  const s=Math.min((FZ_W-200)/im.width,(FZ_H-260)/im.height);px.drawImage(im,(FZ_W-im.width*s)/2,140,im.width*s,im.height*s)}catch(e){Hooks.err('fzpdfimg',e)}}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=`Belege Steuererklärung ${y}.pdf`,f=new File([blob],name,{type:'application/pdf'});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}

/* --- banks → «Behörden & Dienste» (once per account; g.fin stays as it is) --- */
function fzBanks(){try{if(!g||!g.fin||!Array.isArray(g.fin.accounts)||typeof bsvD!=='function')return;const o=bsvD();let n=0;
 for(const a of g.fin.accounts){if(!a||a.bsvM)continue;if(!a.bank&&!a.iban&&!a.last4&&!a.url&&!a.block){a.bsvM='-';continue}
  const nums=[a.iban&&{id:bsvId(),t:'IBAN',v:String(a.iban).replace(/\s+/g,'').replace(/(.{4})/g,'$1 ').trim(),s:!1},a.bic&&{id:bsvId(),t:'BIC',v:a.bic,s:!1},a.last4&&{id:bsvId(),t:cv5n(['Карта','Karte','Card']),v:'•• '+a.last4,s:!1}].filter(Boolean);nums.forEach(z=>{z.m=z.v.slice(-2)});
  const links=[a.url&&{t:'Online-Banking',u:a.url},a.block&&{t:cv5n(['Заблокировать карту','Karte sperren','Block the card']),u:'tel:'+String(a.block).replace(/[^\d+]/g,'')}].filter(Boolean);
  const it={id:bsvId(),n:a.bank||a.name||'Bank',e:'🏦',grp:'',src:'bank',who:[],tel:'',mail:'',addr:'',hrs:'',term:'',links,nums,note:a.bank&&a.name&&a.name!==a.bank?a.name:'',ts:Date.now()};
  o.items.push(it);a.bsvM=it.id;n++}
 if(n){$();setTimeout(()=>T(fzt('moved'),2600),400)}}catch(e){Hooks.err('fzbanks',e)}}

/* --- tile, route, actions --- */
try{DH_I.coin='<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2a3.4 3.4 0 1 0 0 5.6M8 11h5M8 13.4h5"/>';dhS.fin=fzS.t;dhS.finS=fzS.tS;
 const ix=DH_T.findIndex(t=>t[0]==='bank');if(ix>=0)DH_T[ix]=['fin','coin','data-act="go" data-to="fzm"']}catch(e){Hooks.err('fztile',e)}
OD_OK.add('fzm');Te.includes('fzm')||Te.push('fzm');
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='fzm')return fzScreen()}catch(e){Hooks.err('fzscreen',e)}});
Hooks.on('render',()=>{if(m.route==='fzm')fzImgs();else fzCat='';if(m.logged&&!fzBanks.done){fzBanks.done=1;fzBanks()}});
Hooks.act('fzback',()=>R('home',void 0,!0));Hooks.act('fzall',()=>{fzCat='';v()});Hooks.act('fzcat',d=>{fzCat=d.k;v();window.scrollTo(0,0)});
Hooks.act('fzy',d=>{fzD().cur=String(+fzYear()+ +d.d);$();v()});Hooks.act('fzadd',()=>fzSheet({}));
Hooks.act('fzed',d=>{const r=fzList(fzYear()).find(z=>z.id===d.id);if(r)fzSheet(JSON.parse(JSON.stringify(r)))});
Hooks.act('fzpdf',()=>{fzPdf().catch(e=>Hooks.err('fzpdf',e))});

Hooks.css('docs-finanzen',`
.fzyr{display:flex;align-items:center;justify-content:space-between;margin:2px 0 10px}.fzyr b{font-size:17px}.fzyr button{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;color:var(--green)!important}.fzyr button[disabled]{opacity:.35}
.fzsum{background:#24402c;color:#fff;border-radius:20px;padding:16px;margin-bottom:12px;display:flex;flex-direction:column;gap:4px}.fzsum b{font-size:24px}.fzsum small{color:#cfe2d4;font-size:13px;line-height:1.35}
.fz .odr em{font-style:normal;font-weight:600;white-space:nowrap;flex:none}.fze,.fzth{flex:0 0 34px!important;width:34px;text-align:center;font-size:22px;display:block!important}
.fzth img{width:34px;height:34px;object-fit:cover;border-radius:8px;display:block}
.fzph{display:flex!important;align-items:center;justify-content:center;gap:8px;margin-top:12px;cursor:pointer;color:#1d1a10!important}
.fzplain{display:block;width:100%;border:0;background:none;padding:12px;color:var(--green)!important;font-weight:600}
.fzpdf{display:block;width:100%;text-align:center;border:2px dashed var(--green);background:none;border-radius:16px;padding:14px;margin-top:6px;font-weight:700;font-size:15.5px;color:var(--green)!important}
.fzallb{border:0;background:none;color:var(--green)!important;font-weight:600;font-size:15px;padding:2px 2px 8px}
.fzch{margin:4px 2px 10px;font-size:18px}.fztip{background:#eef5ee;border-radius:14px;padding:11px 13px;font-size:13.5px;line-height:1.45;margin-bottom:10px}.fztip b{color:var(--green)}.fztip small{display:block;color:var(--muted);font-size:12px;margin-top:4px}
.fzsh .bsvchips button{font-size:13px}.fzbig{width:100%;max-height:34vh;object-fit:contain;border-radius:12px;background:var(--surface)}.fzsh .bsvdel.on{background:#fdecea;border-radius:14px}
`);
