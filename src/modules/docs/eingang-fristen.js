/* ===== Butler Docs: «Eingang» and «Fristen» (v51) — final concept, board 3 and the bar =====
   Eingang: every document captured after v51 (scanner, photo, file, a new one by hand) waits here until the owner
   confirms it. Status: «bereit» (Butler knows what it is) · «prüfen» (kind or name unknown) · «Duplikat?» (same name
   as one that is already there — nothing is merged or deleted). Old documents never come here (g.st51t = start).
   The document is in «Dokumente» from the first moment; the Eingang is only a list of what still needs a look (d.ok=1).
   Fristen: one list from everywhere (documents, contracts, car, safe, offices, letters, tasks), grouped
   Überfällig · Diese Woche · Dieser Monat · Später, with a filter; a task is ticked off right here. The calendar stays
   one tap away. It replaces the old «Fristen der Dokumente» (route dsrok) while the new Start is on. */
const egS={t:['Входящие','Eingang','Inbox'],
 in:['Новые документы сначала попадают сюда. Проверьте, что Батлер распознал, и подтвердите.','Neue Dokumente landen zuerst hier. Prüfen Sie, was Butler erkannt hat, und bestätigen Sie.','New documents land here first. Check what Butler recognised and confirm.'],
 all:['Все','Alle','All'],chk:['Проверить','Prüfen','Check'],ok:['Готово','Bereit','Ready'],
 s_chk:['проверить','prüfen','check'],s_ok:['готово','bereit','ready'],s_dup:['дубликат?','Duplikat?','duplicate?'],
 w_chk:['Вид не распознан — дайте название','Art nicht erkannt – bitte benennen','Kind not recognised – please name it'],
 w_dup:['Похож на «%t»','Ähnlich wie «%t»','Similar to «%t»'],
 conf:['Подтвердить','Bestätigen','Confirm'],confAll:['Подтвердить готовые: %n','%n bereite bestätigen','Confirm %n ready ones'],
 done:['Подтверждено: %n','Bestätigt: %n','Confirmed: %n'],
 empty:['Входящие пусты. Всё, что Вы добавите, сначала появится здесь.','Der Eingang ist leer. Alles, was Sie erfassen, erscheint zuerst hier.','The inbox is empty. Everything you capture shows up here first.'],
 /* Fristen */
 fIn:['Все сроки в одном месте: документы, договоры, ведомства и задачи.','Alle Fristen an einem Ort: Dokumente, Verträge, Behörden und Aufgaben.','All deadlines in one place: documents, contracts, offices and tasks.'],
 f_task:['Задачи','Aufgaben','Tasks'],
 g_late:['Просрочено','Überfällig','Overdue'],g_week:['На этой неделе','Diese Woche','This week'],g_month:['В этом месяце','Dieser Monat','This month'],g_later:['Позже','Später','Later'],
 none:['Сроков нет','Keine Fristen','No deadlines'],add:['Срок или задача','Frist oder Aufgabe','Deadline or task'],cal:['Календарь','Kalender','Calendar'],
 tdone:['Выполнено ✓','Erledigt ✓','Done ✓']};
const egt=(k,o)=>{let s=cv5n(egS[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* the start line: what was there before v51 is not «new» */
function egInit(){try{if(m.logged&&g&&!g.st51t){g.st51t=Date.now();$()}}catch{}}Hooks.on('render',egInit);
const EG_GEN=/^(scan|скан|dokument|neues dokument|new document|новый документ|документ|document|foto|photo|img|image|bild)[\s_\-–·.:0-9]*$/i;
function egState(d,A){const key=typeof ndKey==='function'?ndKey(d):'';
 if(key){const tw=A.find(x=>x!==d&&!x.type&&!x.insId&&ndKey(x)===key&&(typeof ndP!=='function'||ndP(x)===ndP(d)));if(tw)return{s:'dup',tw}}
 const t=String(d.title||'').trim();let fr='';try{fr=Ye('t_free')}catch{}
 if(!t||EG_GEN.test(t)||t===fr||(d.dtype==='free'&&!(d.end||d.date&&d.party)))return{s:'chk'};return{s:'ok'}}
function egList(){try{const t0=g.st51t||Date.now(),A=Ke().items.filter(d=>d&&!d.del);
 return A.filter(d=>!d.type&&!d.insId&&!d.ok&&(d.ts||0)>t0).sort((a,b)=>(b.ts||0)-(a.ts||0)).map(d=>Object.assign({d},egState(d,A)))}catch{return[]}}
function egMeta(d){const o=[];try{o.push(we('c_'+ho(d)))}catch{}const f=d.f||{};if(f.amount)o.push(f.amount+' €');
 const k=d.end||f.valid;if(k&&/^\d{4}-\d\d-\d\d$/.test(k))o.push('⏰ '+stDate(k));if(d.pages&&d.pages.length)o.push(d.pages.length+' S.');return o.filter(Boolean).join(' · ')}
function egScreen(){const L2=egList(),tab=m.egTab||'all',n={all:L2.length,chk:L2.filter(x=>x.s!=='ok').length,ok:L2.filter(x=>x.s==='ok').length};
 const S=L2.filter(x=>tab==='all'||(tab==='ok'?x.s==='ok':x.s!=='ok'));
 const row=x=>{const d=x.d,why=x.s==='dup'?egt('w_dup',{t:x.tw.title||'—'}):x.s==='chk'?egt('w_chk'):egMeta(d);
  return`<div class="egr"><button type="button" class="egm" data-act="dzopen" data-id="${d.id}"><span class="egth">${sti(x.s==='dup'?'file':d.dtype&&/^(id|passport|residence|license)$/.test(d.dtype)?'chip':'file')}</span><span class="egtx"><b>${i(d.title||'—')}</b><small>${i(why)}</small></span><em class="egs ${x.s}">${i(egt('s_'+x.s))}</em></button>
  <button type="button" class="egok" data-act="egok" data-id="${d.id}" aria-label="${i(egt('conf'))}">✓</button></div>`};
 return`<div class="screen dhome egw"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(egt('t'))}</h2></div><span></span></div>
 <p class="odin">${i(egt('in'))}</p>
 ${L2.length?`<div class="egtabs">${['all','chk','ok'].map(k=>`<button type="button" class="${tab===k?'on':''}" data-act="egtab" data-k="${k}">${i(egt(k))} ${n[k]}</button>`).join('')}</div>
 <div class="egl">${S.map(row).join('')}</div>${n.ok?`<button type="button" class="egall" data-act="egall">${i(egt('confAll',{n:n.ok}))}</button>`:''}`
 :`<div class="dhcard egempty"><p>${i(egt('empty'))}</p><button type="button" class="egall" data-act="stcap">${dhi('scan')} ${i(stt('cap'))}</button></div>`}</div>`}
['eing'].forEach(r=>{Te.includes(r)||Te.push(r);OD_OK.add(r)});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='eing')return egScreen()}catch(e){Hooks.err('egscreen',e)}});
Hooks.act('egtab',d=>{m.egTab=d.k;v()});
const egConfirm=ids=>{const D=Ke().items.filter(d=>ids.includes(d.id));D.forEach(d=>d.ok=1);$();v();try{lnqBar(egt('done',{n:D.length}),()=>{D.forEach(d=>delete d.ok);$();v()})}catch{T(egt('done',{n:D.length}))}};
Hooks.act('egok',d=>egConfirm([d.id]));
Hooks.act('egall',()=>egConfirm(egList().filter(x=>x.s==='ok').map(x=>x.d.id)));
/* --- Fristen --- */
const FR_SRC={doc:'fld',gov:'gov',task:'chk'};
function frScreen(){const A=stDlAll(),f=m.frF||'all',S=A.filter(t=>f==='all'||t.src===f);
 const cnt=k=>A.filter(t=>k==='all'||t.src===k).length;
 const row=t=>{const n=stDays(t.k),c=n<0?'r':n<=14?'y':'g';
  return`<div class="frr"><button type="button" class="frm" ${t.act||''}><i class="${c}"></i>${dhi(FR_SRC[t.src]||'clock')}<span><b>${i(t.t)}</b><small>${i([t.w,stDate(t.k)].filter(Boolean).join(' · '))}</small></span><em class="${c}" data-n="${n}">${i(stWhen(t.k))}</em></button>${t.src==='task'?`<button type="button" class="frck" data-act="frdone" data-id="${i(t.tid)}" aria-label="✓"></button>`:''}</div>`};
 const grp=(k,fn)=>{const R2=S.filter(t=>fn(stDays(t.k)));return R2.length?`<h3 class="odh">${i(egt(k))}</h3><div class="dhcard frl">${R2.map(row).join('')}</div>`:''};
 const wd=(new Date().getDay()+6)%7,toSun=6-wd,dm=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate()-new Date().getDate();
 return`<div class="screen dhome frw"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(stt('a_dl'))}</h2></div><button type="button" class="iconbtn" data-act="go" data-to="mycal" aria-label="${i(egt('cal'))}">${dhi('cal')}</button></div>
 <p class="odin">${i(egt('fIn'))}</p>
 <div class="egtabs">${[['all',egt('all')],['doc',stt('a_docs')],['gov',stt('a_gov')],['task',egt('f_task')]].map(([k,l])=>`<button type="button" class="${f===k?'on':''}" data-act="frf" data-k="${k}">${i(l)} ${cnt(k)}</button>`).join('')}</div>
 ${S.length?grp('g_late',n=>n<0)+grp('g_week',n=>n>=0&&n<=toSun)+grp('g_month',n=>n>toSun&&n<=Math.max(dm,toSun))+grp('g_later',n=>n>Math.max(dm,toSun)):`<div class="dhcard"><p class="dhnone">${i(egt('none'))}</p></div>`}
 <button type="button" class="dhcard odadd" data-act="remnew">${dhi('add')}<span>${i(egt('add'))}</span></button></div>`}
Hooks.act('frf',d=>{m.frF=d.k;v()});
Hooks.act('frdone',d=>{const t=(g.tasks||[]).find(x=>String(x.id)===String(d.id));if(!t)return;t.done=!0;t.doneAt=Date.now();$();v();try{lnqBar(egt('tdone'),()=>{t.done=!1;delete t.doneAt;$();v()})}catch{T(egt('tdone'))}});
Hooks.css('docs-eingang-fristen',`
.frw>*,.egw>*,.stn>*{flex-shrink:0}
.egtabs{flex:0 0 auto;display:flex;gap:8px;overflow-x:auto;margin:2px 0 12px;scrollbar-width:none}.egtabs::-webkit-scrollbar{display:none}
.egtabs button{flex:none;border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:7px 13px;font-size:14px;color:var(--ink)!important;font:inherit;font-size:14px}
.egtabs button.on{background:var(--green);border-color:var(--green);color:#fff!important}
.egl{display:flex;flex-direction:column;gap:8px}
.egr{display:flex;align-items:stretch;gap:8px}
.egm{flex:1;min-width:0;display:flex;align-items:center;gap:11px;border:0;border-radius:18px;background:var(--surface);box-shadow:0 3px 12px rgba(20,60,30,.07);padding:10px 12px;text-align:left;color:var(--ink);font:inherit;cursor:pointer}
.egth{flex:none;width:40px;height:50px;border-radius:8px;border:1px solid var(--line);background:#fff;display:flex;align-items:center;justify-content:center;color:var(--green)}.egth .dhi{width:20px;height:20px}
.egtx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.egtx b{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.egtx small{font-size:12.5px;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.egs{flex:none;font-style:normal;font-size:11.5px;border-radius:9px;padding:3px 8px;white-space:nowrap}.egs.ok{background:#e3f1e3;color:#2f6b3e}.egs.chk{background:#fbecd2;color:#9a6512}.egs.dup{background:#fde4dc;color:#a8432a}
.egok{flex:none;width:46px;border:0;border-radius:16px;background:var(--surface);box-shadow:0 3px 12px rgba(20,60,30,.07);color:var(--green)!important;font-size:20px;font-weight:700;cursor:pointer}
.egall{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;border:0;border-radius:18px;padding:14px;background:var(--green);color:#fff!important;font:inherit;font-weight:600;font-size:15.5px;cursor:pointer}.egall .dhi{color:#fff}
.egempty p{color:var(--muted);margin:0 0 4px;line-height:1.45}
.frl{padding:4px 14px}.frr{display:flex;align-items:center;gap:6px}.frr+.frr{border-top:1px solid var(--line)}
.frm{flex:1;min-width:0;display:flex;align-items:center;gap:10px;border:0;background:none;padding:11px 0;text-align:left;color:var(--ink);font:inherit;cursor:pointer}
.frm>i{flex:none;width:9px;height:9px;border-radius:50%}.frm>i.r{background:#e0684a}.frm>i.y{background:#e5a83a}.frm>i.g{background:#3bb36a}
.frm>.dhi{flex:none;width:19px;height:19px;color:var(--muted)}.frm span{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.frm b{font-size:15px;font-weight:600;line-height:1.25}.frm small{font-size:12.5px;color:var(--muted)}
.frm em{flex:none;font-style:normal;font-size:12.5px;font-weight:600;white-space:nowrap}.frm em.r{color:#c4472e}.frm em.y{color:#b07514}.frm em.g{color:var(--muted);font-weight:500}
.frw .frm b,.egw .egtx small{hyphens:auto!important;-webkit-hyphens:auto!important;overflow-wrap:break-word;word-break:normal}
.frck{flex:none;width:28px;height:28px;border-radius:50%;border:2px solid var(--green);background:none;cursor:pointer}
`);
