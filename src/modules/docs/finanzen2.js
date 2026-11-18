/* ===== Butler Docs: Finanzen stage 2 — «Verträge & Kosten» and «Arbeit & Karriere» =====
   - Verträge & Kosten (a tab in «Finanzen»): what the contracts already in «Dokumente → Versicherungen» cost per month
     and per year; «kündbar bis …» soon, two contracts of the same kind, contracts without an amount, old contracts
     worth a price check. The app only shows — the user decides. Amounts and notice dates come from the contracts.
   - Arbeit & Karriere (own tile): employers with period and role, their documents from the app (contract, Zeugnis,
     payslips, certificates), projects with what was done and the result; one PDF list for a CV.
   Data: g.fzm.tab ('stm'|'kost'); g.kar = {jobs:[{id,co,role,from,to,note,docs[],proj:[{id,t,y,what,res,docs[]}]}]} */
const krS={
 tStm:['Налоговая папка','Steuer-Mappe','Tax folder'],tKost:['Договоры и расходы','Verträge & Kosten','Contracts & costs'],
 pay:['Я плачу по договорам','Ich zahle für Verträge','I pay for contracts'],perM:['%a в месяц','%a / Monat','%a / month'],perY:['%a в год · договоров: %n','%a im Jahr · %n Verträge','%a a year · %n contracts'],
 kb:['%n — можно расторгнуть до %d (через %k дн.)','%n – kündbar bis %d (in %k Tagen)','%n – can be cancelled until %d (in %k days)'],
 dbl:['%k: %n похожих договора — двойные? Проверьте.','%k: %n ähnliche Verträge – doppelt? Bitte prüfen.','%k: %n similar contracts – double? Please check.'],
 noAmt:['Без суммы: %n — допишите, чтобы итог был точным','Ohne Betrag: %n – ergänzen, damit die Summe stimmt','Without an amount: %n – add it so the total is right'],
 old:['с %y · цену стоит проверить','seit %y · Preis prüfen','since %y · check the price'],kbS:['можно расторгнуть до %d','kündbar bis %d','cancel by %d'],none:['Договоров пока нет. Их суммы и сроки берутся из «Документы → Страховки».','Noch keine Verträge. Beträge und Fristen kommen aus „Dokumente → Versicherungen“.','No contracts yet. Amounts and deadlines come from “Documents → Insurance”.'],
 add:['＋ Договор','＋ Vertrag','＋ Contract'],tip:['Полезно знать:','Gut zu wissen:','Good to know:'],
 tipK:['После повышения цены часто можно расторгнуть договор досрочно (Sonderkündigung) — это написано в письме фирмы.','Nach einer Preiserhöhung ist oft eine Sonderkündigung möglich – das steht im Schreiben des Anbieters.','After a price rise an early cancellation is often possible – it says so in the provider’s letter.'],
 chk:['Общие правила, не консультация — пожалуйста, проверьте.','Allgemeine Regeln, keine Beratung – bitte prüfen.','General rules, not advice – please check.'],
 kar:['Работа и карьера','Arbeit & Karriere','Work & career'],karS:['Работодатели, Zeugnisse, проекты','Arbeitgeber, Zeugnisse, Projekte','Employers, references, projects'],
 kEmpty:['Добавьте работодателей — договоры, Arbeitszeugnis и проекты будут под рукой и через годы.','Fügen Sie Ihre Arbeitgeber hinzu – Verträge, Zeugnisse und Projekte sind auch in Jahren noch griffbereit.','Add your employers – contracts, references and projects stay at hand for years.'],
 kAdd:['＋ Работодатель','＋ Arbeitgeber','＋ Employer'],kPdf:['Список для резюме (PDF)','Lebenslauf-Liste als PDF','CV list (PDF)'],
 co:['Фирма','Firma','Company'],role:['Должность','Position','Role'],from:['С (месяц)','Von (Monat)','From (month)'],to:['По (пусто — сейчас)','Bis (leer = heute)','To (empty = now)'],now:['по сей день','heute','now'],
 note:['Заметка','Notiz','Note'],docs:['Документы','Dokumente','Documents'],docAdd:['＋ Документ из приложения','＋ Dokument aus der App','＋ Document from the app'],docPick:['Какие документы?','Welche Dokumente?','Which documents?'],docSug:['Похоже, подходят','Passt vermutlich','Probably fitting'],docAll:['Все документы','Alle Dokumente','All documents'],noDocs:['Документов пока нет','Noch keine Dokumente','No documents yet'],
 proj:['Проекты и достижения','Projekte & Erfolge','Projects & achievements'],pAdd:['＋ Проект','＋ Projekt','＋ Project'],pT:['Название','Titel','Title'],pY:['Год','Jahr','Year'],pWhat:['Что я делал','Was habe ich gemacht','What I did'],pRes:['Результат (цифры, сроки, отзыв)','Ergebnis (Zahlen, Zeit, Lob)','Result (numbers, time, praise)'],
 dupH:['«%n» уже есть в списке','„%n“ steht schon in der Liste','“%n” is already in the list'],dupOpen:['Открыть его','Diesen öffnen','Open it'],dupNew:['Я там работал ещё раз','Ich war dort noch einmal','I worked there again'],
 save:['Сохранить','Speichern','Save'],del:['Удалить','Löschen','Delete'],delQ:['Точно удалить? Нажмите ещё раз','Wirklich löschen? Nochmals tippen','Really delete? Tap again'],need:['Впишите название фирмы','Bitte die Firma eintragen','Please enter the company'],needP:['Впишите название проекта','Bitte einen Titel eintragen','Please enter a title'],
 edit:['Изменить','Bearbeiten','Edit'],cvT:['Профессиональный путь','Beruflicher Werdegang','Career'],res:['Результат','Ergebnis','Result']};
const krt=(k,o)=>{let s=cv5n(krS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};

/* ---------- Verträge & Kosten ---------- */
const krDays=k=>{try{const a=new Date();a.setHours(0,0,0,0);return Math.round((new Date(k+'T00:00:00')-a)/864e5)}catch{return 999}};
function krKost(){let A=[];try{A=Pt().filter(e=>!Kt(e))}catch{}const rows=A.map(e=>{let mo=0,kb=null,nm='';try{mo=or(e)}catch{}try{kb=uc(e)}catch{}try{nm=pc(e)}catch{nm=e.co||e.title||'—'}return{e,mo,kb,nm}}).sort((a,b)=>b.mo-a.mo);
 const tot=rows.reduce((a,b)=>a+b.mo,0),W=[];
 rows.filter(r=>r.kb&&krDays(r.kb)>=0&&krDays(r.kb)<=60).sort((a,b)=>a.kb.localeCompare(b.kb)).forEach(r=>W.push(`<button type="button" class="fzw" data-act="insopen" data-id="${i(r.e.id)}">⏰ ${i(krt('kb',{n:r.e.co||r.nm,d:vA(r.kb),k:krDays(r.kb)}))}</button>`));
 const byCat={};rows.forEach(r=>{const c=r.e.cat||'';if(String(c).startsWith('ins_')&&c!=='ins_other')(byCat[c]=byCat[c]||[]).push(r)});
 Object.values(byCat).filter(L2=>L2.length>1).forEach(L2=>{let lab='';try{lab=ve('c_'+L2[0].e.cat)}catch{lab=L2[0].e.cat}W.push(`<div class="fzw">🔁 ${i(krt('dbl',{k:lab,n:L2.length}))}</div>`)});
 const na=rows.filter(r=>!r.mo);if(na.length)W.push(`<div class="fzw">✎ ${i(krt('noAmt',{n:na.map(r=>r.e.co||r.nm).slice(0,4).join(', ')}))}</div>`);
 const yr=new Date().getFullYear();
 return`<div class="fzsum"><small>${i(krt('pay'))}</small><b>${i(krt('perM',{a:fzEur(tot)}))}</b><small>${i(krt('perY',{a:fzEur(tot*12),n:rows.length}))}</small></div>
 ${W.join('')}
 ${rows.length?`<div class="dhcard odl">${rows.map(r=>{const y0=r.e.start?+String(r.e.start).slice(0,4):0,old=!String(r.e.cat||'').startsWith('ins_')&&y0&&yr-y0>=5;
  const sub=[r.kb?krt('kbS',{d:vA(r.kb)}):'',old?krt('old',{y:y0}):''].filter(Boolean).join(' · ');
  return`<button type="button" class="odr fzc" data-act="insopen" data-id="${i(r.e.id)}"><span class="fzth">${typeof Dg==='function'?Dg(r.e,'sm'):'📄'}</span><span><b>${i(r.nm)}</b>${sub?`<small>${i(sub)}</small>`:''}</span><em>${r.mo?i(fzEur(r.mo)):'—'}</em></button>`}).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(krt('none'))}</p></div>`}
 <div class="fztip"><b>ⓘ ${i(krt('tip'))}</b> ${i(krt('tipK'))}<small>${i(krt('chk'))}</small></div>
 <button type="button" class="fzpdf" data-act="insnew">${i(krt('add'))}</button>`}
/* the «Finanzen» screen gets two tabs */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||m.route!=='fzm'||fzCat)return h;const tab=fzD().tab==='kost'?'kost':'stm';
 const tabs=`<div class="fztabs"><button type="button" class="${tab==='stm'?'on':''}" data-act="fztab" data-k="stm">${i(krt('tStm'))}</button><button type="button" class="${tab==='kost'?'on':''}" data-act="fztab" data-k="kost">${i(krt('tKost'))}</button></div>`;
 const k=h.indexOf('<div class="fzyr">');if(k<0)return h;
 if(tab==='stm')return h.slice(0,k)+tabs+h.slice(k);
 const e=h.lastIndexOf('</div>');return h.slice(0,k)+tabs+krKost()+h.slice(e)}catch(er){Hooks.err('krkost',er);return h}});
Hooks.act('fztab',d=>{fzD().tab=d.k;$();v()});

/* ---------- Arbeit & Karriere ---------- */
const krD=()=>{const o=g.kar=g.kar&&typeof g.kar==='object'?g.kar:{};if(!Array.isArray(o.jobs))o.jobs=[];return o};
const krJob=id=>krD().jobs.find(j=>j.id===id);
const krMon=k=>{if(!k)return'';const[y,mo]=String(k).split('-');return mo?`${mo}/${y}`:y};
const krPer=j=>`${krMon(j.from)||'?'} – ${j.to?krMon(j.to):krt('now')}`;
const krDocs=ids=>{try{return(ids||[]).map(id=>Ke().items.find(d=>d.id===id)).filter(Boolean)}catch{return[]}};
let krSel=null;
function krList(){if(krD().tab==='edu')return krEduList();const J=krD().jobs.slice().sort((a,b)=>String(b.to||'9999').localeCompare(String(a.to||'9999'))||String(b.from||'').localeCompare(String(a.from||'')));
 return`<div class="screen dhome fz kar"><div class="sub-hdr"><button class="iconbtn" data-act="fzback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(krt('kar'))}</h2></div><span></span></div>${krTabs()}
 ${J.length?`<div class="krtl">${J.map(j=>{const D=krDocs(j.docs);return`<button type="button" class="krit" data-act="kropen" data-id="${i(j.id)}"><b>${i(j.co)}</b><small>${i([krPer(j),j.role].filter(Boolean).join(' · '))}</small>
  ${D.length||(j.proj||[]).length?`<span class="krch">${D.slice(0,3).map(d=>`<i>📄 ${i(d.title||'—')}</i>`).join('')}${D.length>3?`<i>+${D.length-3}</i>`:''}${(j.proj||[]).length?`<i>⭐ ${(j.proj||[]).length}</i>`:''}</span>`:''}</button>`}).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(krt('kEmpty'))}</p></div>`}
 <button type="button" class="dcadd gold" data-act="krjobed">${i(krt('kAdd'))}</button>${krMappeBtn()}</div>`}
function krJobScreen(j){const D=krDocs(j.docs);
 return`<div class="screen dhome fz kar"><div class="sub-hdr"><button class="iconbtn" data-act="krlist" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(j.co)}</h2></div><button type="button" class="iconbtn" data-act="krjobed" data-id="${i(j.id)}" aria-label="${i(krt('edit'))}">${bsvi('edit')}</button></div>
 <p class="krper">${i([krPer(j),j.role].filter(Boolean).join(' · '))}</p>${j.note?`<div class="dhcard"><p class="vnote">${i(j.note)}</p></div>`:''}
 ${krSlotsHtml(j)}
 <h3 class="odh">⭐ ${i(krt('proj'))}</h3>${(j.proj||[]).slice().sort((a,b)=>String(b.y||'').localeCompare(String(a.y||''))).map(p=>`<button type="button" class="dhcard krp" data-act="krproj" data-j="${i(j.id)}" data-id="${i(p.id)}"><b>${i(p.t)}${p.y?` (${i(p.y)})`:''}</b>${p.what?`<span>${i(p.what)}</span>`:''}${p.res?`<span class="krres">${i(krt('res'))}: ${i(p.res)}</span>`:''}</button>`).join('')}
 <button type="button" class="bsvplus" data-act="krproj" data-j="${i(j.id)}">${i(krt('pAdd'))}</button></div>`}
['kar','karj'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='kar')return krList();if(m.route==='karj'){const j=krSel&&krJob(krSel);if(j)return krJobScreen(j);setTimeout(()=>R('kar',void 0,!0),0);return'<div class="screen"></div>'}}catch(e){Hooks.err('krscreen',e)}});
Hooks.on('render',()=>{if(m.route!=='karj')krSel=null});
/* sheets: employer, project, documents */
function krJobSheet(id){const j0=id&&krJob(id),j=j0?JSON.parse(JSON.stringify(j0)):{co:'',role:'',from:'',to:'',note:''};
 H(j0?krt('edit'):krt('kAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(krt('co'))}</label><input class="field" data-kf="co" value="${i(j.co)}" autocomplete="off">
  <label class="bsvl">${i(krt('role'))}</label><input class="field" data-kf="role" value="${i(j.role||'')}" autocomplete="off">
  <div class="bsv2c"><div><label class="bsvl">${i(krt('from'))}</label><input class="field" data-kf="from" inputmode="numeric" placeholder="MM.JJJJ" value="${i(krMonIn(j.from))}"></div><div><label class="bsvl">${i(krt('to'))}</label><input class="field" data-kf="to" inputmode="numeric" placeholder="MM.JJJJ" value="${i(krMonIn(j.to))}"></div></div>
  <label class="bsvl">${i(krt('note'))}</label><textarea class="field" data-kf="note" rows="2">${i(j.note||'')}</textarea>
  <small class="verr" data-kerr></small><button type="button" class="dcadd gold" data-ksave>${i(krt('save'))}</button>${j0?`<button type="button" class="bsvdel" data-kdel>${i(krt('del'))}</button>`:''}</div>`,
 el=>{el.classList.add('bsvsh');let arm=0;el.addEventListener('click',e=>{
  if(e.target.closest('[data-ksave]')){el.querySelectorAll('[data-kf]').forEach(z=>{j[z.dataset.kf]=z.value.trim()});if(!j.co){el.querySelector('[data-kerr]').textContent=krt('need');return}
   for(const k of['from','to']){const q=krMonParse(j[k]);if(q===null){el.querySelector('[data-kerr]').textContent=krt2('badMon');return}j[k]=q}
   const nn=x=>String(x||'').toLowerCase().replace(/\b(gmbh|ag|kg|se|e\.?v\.?|co\.?|&)\b/g,'').replace(/[^a-zа-яёäöüß0-9]+/g,'');
   const tw=!j0&&!j.ndOk&&krD().jobs.find(z=>nn(z.co)&&nn(z.co)===nn(j.co));
   if(tw){const b=el.querySelector('.bsvys');if(!b.querySelector('.krdup'))b.insertAdjacentHTML('afterbegin',`<div class="dhcard warn krdup"><b>${i(krt('dupH',{n:tw.co}))}</b><small>${i(krPer(tw))}</small><div class="bsvfxb"><button type="button" data-kdo>${i(krt('dupOpen'))}</button><button type="button" data-kdn>${i(krt('dupNew'))}</button></div></div>`);
    b.querySelector('[data-kdo]').onclick=()=>{el.remove();krSel=tw.id;R('karj')};b.querySelector('[data-kdn]').onclick=()=>{j.ndOk=1;b.querySelector('.krdup').remove();el.querySelector('[data-ksave]').click()};return}
   delete j.ndOk;if(j0)Object.assign(j0,j);else{j.id=V();j.docs=[];j.proj=[];krD().jobs.push(j)}$();el.remove();krSel=j0?j0.id:j.id;if(m.route==='karj')v();else R('karj');return}
  if(e.target.closest('[data-kdel]')){if(!arm){arm=1;const b=e.target.closest('[data-kdel]');b.textContent=krt('delQ');b.classList.add('on');return}krD().jobs=krD().jobs.filter(z=>z.id!==id);$();el.remove();krSel=null;const h=m.hist||[];if(h.length&&h[h.length-1].route==='kar')h.pop();R('kar',void 0,!0)}})})}
function krProjSheet(jid,pid){const j=krJob(jid);if(!j)return;j.proj=j.proj||[];const p0=pid&&j.proj.find(z=>z.id===pid),p=p0?Object.assign({},p0):{t:'',y:String(new Date().getFullYear()),what:'',res:''};
 H(p0?p0.t:krt('pAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(krt('pT'))}</label><input class="field" data-pf="t" value="${i(p.t)}" autocomplete="off">
  <label class="bsvl">${i(krt('pY'))}</label><input class="field" data-pf="y" inputmode="numeric" maxlength="4" value="${i(p.y||'')}">
  <label class="bsvl">${i(krt('pWhat'))}</label><textarea class="field" data-pf="what" rows="3">${i(p.what||'')}</textarea>
  <label class="bsvl">${i(krt('pRes'))}</label><textarea class="field" data-pf="res" rows="3">${i(p.res||'')}</textarea>
  <small class="verr" data-perr></small><button type="button" class="dcadd gold" data-psave>${i(krt('save'))}</button>${p0?`<button type="button" class="bsvdel" data-pdel>${i(krt('del'))}</button>`:''}</div>`,
 el=>{el.classList.add('bsvsh');let arm=0;el.addEventListener('click',e=>{
  if(e.target.closest('[data-psave]')){el.querySelectorAll('[data-pf]').forEach(z=>{p[z.dataset.pf]=z.value.trim()});if(!p.t){el.querySelector('[data-perr]').textContent=krt('needP');return}
   if(p0)Object.assign(p0,p);else{p.id=V();j.proj.push(p)}$();el.remove();v();return}
  if(e.target.closest('[data-pdel]')){if(!arm){arm=1;const b=e.target.closest('[data-pdel]');b.textContent=krt('delQ');b.classList.add('on');return}j.proj=j.proj.filter(z=>z.id!==pid);$();el.remove();v()}})})}
const KR_RX=/arbeitsvertrag|arbeitszeugnis|zeugnis|gehalt|lohn|entgelt|abrechnung|kündigung|zertifikat|bescheinigung|weiterbildung|работ|трудов|зарплат/i;
function krDocSheet(jid){const j=krJob(jid);if(!j)return;let D=[];try{D=Ke().items.filter(d=>!d.type)}catch{}const co=String(j.co||'').toLowerCase().split(/\s+/).filter(w=>w.length>=4);
 const fit=d=>{const t=[d.title,d.party,d.note].filter(Boolean).join(' ').toLowerCase();return co.some(w=>t.includes(w))||KR_RX.test(t)};
 const S=D.filter(fit),O=D.filter(d=>!fit(d)),row=d=>`<label class="bsvtog"><input type="checkbox" data-kd="${i(d.id)}" ${(j.docs||[]).includes(d.id)?'checked':''}><span>${i(d.title||'—')}${d.party?` · <small>${i(d.party)}</small>`:''}</span></label>`;
 H(krt('docPick'),`<div class="bsvys">${D.length?`${S.length?`<h3 class="odh">${i(krt('docSug'))}</h3><div class="krdl">${S.map(row).join('')}</div>`:''}${O.length?`<h3 class="odh">${i(krt('docAll'))}</h3><div class="krdl">${O.map(row).join('')}</div>`:''}<button type="button" class="dcadd gold" data-dsave>${i(krt('save'))}</button>`:`<p class="dhnone">${i(krt('noDocs'))}</p>`}</div>`,
 el=>{el.classList.add('bsvsh');const b=el.querySelector('[data-dsave]');b&&(b.onclick=()=>{j.docs=[...el.querySelectorAll('[data-kd]:checked')].map(z=>z.dataset.kd);$();el.remove();v()})})}
/* the CV list as a PDF */
async function krPdf(){const J=krD().jobs.slice().sort((a,b)=>String(b.from||'').localeCompare(String(a.from||'')));if(!J.length)return;
 const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=140,W2=FZ_W-ml-120;
 const wrap=(t,f)=>{x2.font=f;const out=[];let line='';for(const w of String(t).split(/(\s+)/)){if(x2.measureText(line+w).width>W2&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line);return out};
 const put=(t,o)=>{o=o||{};const f=`${o.b?'bold ':''}${o.s||26}px Georgia, serif`;for(const l of wrap(t,f)){if(yy>FZ_H-140){[c,x2]=fzPage();P.push(c);yy=140}x2.font=f;x2.fillStyle=o.c||'#000';x2.fillText(l,ml+(o.x||0),yy);yy+=o.h||38}};
 let me={};try{me=ja()}catch{}put(krt('cvT'),{b:1,s:40,h:58});put([me.first,me.last].filter(Boolean).join(' '),{s:26,h:56});
 for(const j of J){put(krPer(j),{s:22,c:'#555',h:32});put(j.co+(j.role?' — '+j.role:''),{b:1,s:28,h:42});if(j.note)put(j.note,{s:22,x:20,h:32});
  for(const p of (j.proj||[])){put('• '+p.t+(p.y?' ('+p.y+')':''),{b:1,s:23,x:20,h:34});if(p.what)put(p.what,{s:22,x:44,h:32});if(p.res)put(krt('res')+': '+p.res,{s:22,x:44,h:32})}yy+=20}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=krt('cvT')+'.pdf',f=new File([blob],name,{type:'application/pdf'});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
Hooks.act('kropen',d=>{krSel=d.id;R('karj')});Hooks.act('krlist',()=>{krSel=null;const h=m.hist||[];if(h.length&&h[h.length-1].route==='kar')h.pop();R('kar',void 0,!0)});
Hooks.act('krjobed',d=>krJobSheet(d&&d.id));Hooks.act('krproj',d=>krProjSheet(d.j,d.id));Hooks.act('krdocs',d=>krDocSheet(d.id));
Hooks.act('krdocx',d=>{const j=krJob(d.j);if(!j)return;j.docs=(j.docs||[]).filter(z=>z!==d.id);$();v()});Hooks.act('krpdf',()=>{krPdf().catch(e=>Hooks.err('krpdf',e))});
/* the tile in the last free place */
try{DH_I.brief='<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17M11 12.5v1.5h2v-1.5"/>';dhS.kar=krS.kar;dhS.karS=krS.karS;
 if(!DH_T.some(t=>t[0]==='kar'))DH_T.push(['kar','brief','data-act="go" data-to="kar"']);ly6EXT.kar={lab:()=>krt('kar').split(/\s[&и]\s/)[0],ic:()=>lydSvg(DH_I.brief),open:()=>R('kar')};LYD_POOL.includes('kar')||LYD_POOL.splice(LYD_POOL.length-1,0,'kar');ly6POOL.includes('kar')||ly6POOL.push('kar')}catch(e){Hooks.err('krtile',e)}

Hooks.css('docs-finanzen-2',`
.fztabs{display:grid;grid-template-columns:1fr 1fr;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:4px;margin:0 0 12px}.fztabs button{border:0;background:none;border-radius:12px;padding:10px 6px;font-weight:600;font-size:14.5px}.fztabs .on{background:linear-gradient(#e8c47d,#cfa560);color:#1d1a10!important}
.fz .fzw{display:block;width:100%;text-align:left;background:#fff8e6;border:1px solid #f0dca8;border-radius:14px;padding:10px 13px;margin-bottom:8px;font-size:14px;line-height:1.35;color:var(--ink)!important}
.fz .fzth .inscirc{width:34px!important;height:34px!important;transform:none}.fz .fzth .inscirc b{font-size:12px}
.krtl{border-left:2px solid #C9A55E;margin:4px 0 12px 8px;padding-left:14px;display:flex;flex-direction:column;gap:12px}
.krit{position:relative;display:flex;flex-direction:column;gap:3px;text-align:left;border:0;background:var(--surface);border-radius:16px;padding:12px 14px;box-shadow:0 2px 10px rgba(30,60,40,.06)}
.krit:before{content:'';position:absolute;left:-22px;top:16px;width:12px;height:12px;border-radius:50%;background:#C9A55E}.krit b{font-size:16.5px}.krit small{color:var(--muted);font-size:13px}
.krch{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}.krch i{font-style:normal;background:rgba(0,0,0,.05);border-radius:99px;padding:3px 9px;font-size:12px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.krper{color:var(--muted);margin:0 2px 10px}.krdr{padding:0!important;gap:6px}.krdr .bsvhit{padding:10px 0}
.krp{display:flex!important;flex-direction:column;gap:4px;width:100%;text-align:left;margin-bottom:8px}.krp b{font-size:15.5px}.krp span{font-size:14px;line-height:1.4}.krp .krres{color:var(--green);font-weight:600}
.krdl{display:flex;flex-direction:column;max-height:34vh;overflow:auto}.krdl small{color:var(--muted)}
`);
