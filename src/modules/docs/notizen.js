/* ===== Butler Docs: Notizen (v33) — takes the place of «Aufgaben» in the bottom bar =====
   Data: the core's own g.notes (Butler kept notes there; Docs had hidden them). A note stays compatible with the core:
     n.text = the whole text, first line = title (like Apple Notes) — so the core search keeps finding it.
   Extra fields: fld (folder id), tags[], pin, ck[{id,t,done,due,tk}] (checklist), docs[] (document ids — photos, scans and
   files are saved ONCE in «Dokumente» and only linked), lk[{k:'job'|'bsv'|'doc',id}], arch (archive), del (deleted at, ms),
   u (changed at), big (large text).
   - A checklist point WITH a date becomes one task in g.tasks (n.ck[i].tk) → it shows in the calendar, in «Offene Punkte»,
     in the iPhone calendar export and in the badge. Ticked here or there — both stay in step.
   - The old «Aufgaben» are kept: they show in «Offene Punkte» and in the calendar.
   - Papierkorb keeps deleted notes 30 days.
   Folders: g.nzqF=[{id,n,e,c,hid}] — rename, symbol, colour, hide, delete (notes go to «Ohne Ordner»). */
const NZQ={
 t:['Заметки','Notizen','Notes'],sub:['Всё быстрое — в одном месте','Alles Schnelle an einem Ort','Everything quick in one place'],
 qNew:['Новая заметка','Neue Notiz','New note'],qMic:['Диктовать','Diktieren','Dictate'],qScan:['Сканировать','Scannen','Scan'],qPh:['Фото-заметка','Foto-Notiz','Photo note'],
 all:['Все заметки','Alle Notizen','All notes'],pin:['Закреплённые','Angeheftet','Pinned'],open:['Открытые пункты','Offene Punkte','Open points'],dated:['С датой → календарь','Mit Datum → Kalender','With date → calendar'],
 arch:['Архив','Archiv','Archive'],trash:['Корзина','Papierkorb','Bin'],flds:['Папки','Ordner','Folders'],allF:['все','alle','all'],noF:['Без папки','Ohne Ordner','No folder'],
 n1:['%n заметка','%n Notiz','%n note'],nN:['%n заметок','%n Notizen','%n notes'],
 f_arbeit:['Работа','Arbeit','Work'],f_finanzen:['Финансы','Finanzen','Finances'],f_lernen:['Учёба','Lernen','Learning'],f_gesund:['Здоровье','Gesundheit','Health'],f_fitness:['Фитнес','Fitness','Fitness'],
 f_reisen:['Поездки','Reisen','Travel'],f_familie:['Семья','Familie','Family'],f_ideen:['Идеи','Ideen','Ideas'],f_projekte:['Проекты','Projekte','Projects'],
 fAdd:['＋ Папка','＋ Ordner','＋ Folder'],fEdit:['Папка','Ordner','Folder'],fName:['Название','Name','Name'],fSym:['Значок','Symbol','Symbol'],fCol:['Цвет','Farbe','Colour'],fHide:['Скрыть папку','Ordner ausblenden','Hide folder'],
 fShow:['Показать скрытые','Ausgeblendete zeigen','Show hidden'],fDel:['Удалить папку','Ordner löschen','Delete folder'],fDelQ:['Точно? Заметки останутся «без папки».','Sicher? Die Notizen bleiben „ohne Ordner“.','Sure? The notes stay “without folder”.'],
 fInfo:['Папки свои: переименовать, значок, цвет, скрыть. Заметка лежит в одной папке — без копий.','Ordner sind frei: umbenennen, Symbol, Farbe, ausblenden. Eine Notiz liegt in einem Ordner – keine Kopien.','Folders are yours: rename, symbol, colour, hide. A note lives in one folder – no copies.'],
 empty:['Здесь пока пусто.','Hier ist noch nichts.','Nothing here yet.'],emptyAll:['Нажмите «Новая заметка» — или продиктуйте, отсканируйте, сфотографируйте.','Tippen Sie auf „Neue Notiz“ – oder diktieren, scannen, fotografieren.','Tap “New note” – or dictate, scan, take a photo.'],
 find:['Поиск в заметках …','In Notizen suchen …','Search notes …'],
 ttl:['Заголовок','Titel','Title'],body:['Текст …','Text …','Text …'],ckAdd:['＋ Пункт','＋ Punkt','＋ Point'],ckPh:['Новый пункт','Neuer Punkt','New point'],notesH:['Заметки','Notizen','Notes'],
 due:['Срок','Datum','Date'],dueNone:['без даты','ohne Datum','no date'],dueSet:['Дата пункта','Datum für den Punkt','Date for the point'],dueClr:['Убрать дату','Datum entfernen','Remove date'],
 fromNote:['из заметки','aus Notiz','from a note'],oldTask:['задача','Aufgabe','task'],calOpen:['Открыть календарь','Kalender öffnen','Open calendar'],
 calHint:['Пункт с датой сам попадает в календарь. «In den iPhone-Kalender» в профиле — со звуком.','Ein Punkt mit Datum kommt von selbst in den Kalender. «In den iPhone-Kalender» im Profil – mit Ton.','A point with a date goes to the calendar by itself. «Into the iPhone calendar» in the profile – with sound.'],
 tags:['Метки','Tags','Tags'],tagsPh:['например Business, Arzt','z. B. Business, Arzt','e.g. Business, doctor'],
 menu:['Действия','Aktionen','Actions'],toArch:['В архив','Archivieren','Archive'],unArch:['Из архива','Aus dem Archiv','Unarchive'],toTrash:['В корзину','In den Papierkorb','Move to bin'],
 restore:['Восстановить','Wiederherstellen','Restore'],killQ:['Удалить навсегда?','Endgültig löschen?','Delete for good?'],kill:['Удалить навсегда','Endgültig löschen','Delete for good'],emptyT:['Очистить корзину','Papierkorb leeren','Empty the bin'],
 trashS:['Заметки в корзине удаляются сами через 30 дней.','Notizen im Papierkorb werden nach 30 Tagen gelöscht.','Notes in the bin are deleted after 30 days.'],
 trashed:['В корзине ✓','Im Papierkorb ✓','In the bin ✓'],undo:['Отменить','Rückgängig','Undo'],share:['Поделиться','Teilen','Share'],big:['Крупный текст','Große Schrift','Large text'],
 lk:['Связано с','Verknüpft mit','Linked with'],lkAdd:['Связать с …','Verknüpfen mit …','Link with …'],lkJob:['Работодатели','Arbeitgeber','Employers'],lkBsv:['Ведомства и службы','Behörden & Dienste','Authorities & services'],lkDoc:['Документы','Dokumente','Documents'],
 lkNone:['Пока нечего связать.','Noch nichts zum Verknüpfen.','Nothing to link yet.'],k_job:['работодатель','Arbeitgeber','employer'],k_bsv:['ведомство','Behörde','authority'],k_doc:['документ','Dokument','document'],
 att:['Документ из «Документов»','Aus «Dokumente»','From «Documents»'],attLinked:['из «Документов» · связано','aus «Dokumente» · verknüpft','from «Documents» · linked'],
 attSheet:['Прикрепить','Anhängen','Attach'],attCam:['Сфотографировать / сканировать','Fotografieren / scannen','Photo / scan'],attFile:['Файл (PDF или фото)','Datei (PDF oder Bild)','File (PDF or picture)'],
 attOnce:['Сохраняется один раз в «Документах» и здесь только привязывается — без копии.','Wird einmal in «Dokumente» gespeichert und hier verknüpft – keine Kopie.','Saved once in «Documents» and linked here – no copy.'],
 micNo:['Диктовка здесь недоступна. Нажмите 🎙 на клавиатуре iPhone — это работает в любом поле.','Diktieren ist hier nicht verfügbar. Tippen Sie auf 🎙 der iPhone-Tastatur – das geht in jedem Feld.','Dictation is not available here. Tap 🎙 on the iPhone keyboard – it works in every field.'],
 micOn:['Говорите … (нажмите 🎙 ещё раз, чтобы остановить)','Sprechen Sie … (🎙 nochmal = Stopp)','Speak … (🎙 again = stop)'],micInfo:['Распознавание речи делает iPhone (Apple), может понадобиться интернет.','Die Spracherkennung macht das iPhone (Apple), ggf. mit Internet.','Speech recognition is done by the iPhone (Apple), may need internet.'],
 scanT:['Скан %d','Scan %d','Scan %d'],phT:['Фото %d','Foto %d','Photo %d'],linkedHere:['Заметки','Notizen','Notes'],newHere:['＋ Заметка','＋ Notiz','＋ Note'],
 created:['создано %d','erstellt %d','made %d'],edited:['изменено %d','geändert %d','changed %d']};
const nzqt=(k,o)=>{let s=cv5n(NZQ[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const NZQ_F0=[['arbeit','💼'],['finanzen','💶'],['lernen','🎓'],['gesund','❤️'],['fitness','🏃'],['reisen','✈️'],['familie','👪'],['ideen','💡'],['projekte','🎯']];
const NZQ_EM=['💼','💶','🎓','❤️','🏃','✈️','👪','💡','🎯','🏠','🚗','🛒','📚','🎵','🍽','🐾','⚖️','🩺','🧾','⭐','📌','🌱','🎁','🔧'];
const NZQ_COL=['','#e8f1e6','#fdf3de','#e6eef8','#f8e8ea','#efe9f7','#e9f4f3'];
let nzqId=null,nzqF='all',nzqQ='',nzqTimer=null,nzqMic=null,nzqPurged=!1;
function nzqD(){g.notes=Array.isArray(g.notes)?g.notes:[];if(!Array.isArray(g.nzqF))g.nzqF=NZQ_F0.map(([k,e])=>({id:k,n:'',e,c:'',hid:0}));
 if(!nzqPurged){nzqPurged=!0;const lim=Date.now()-30*864e5,before=g.notes.length;g.notes=g.notes.filter(n=>!(n&&n.del&&n.del<lim));if(g.notes.length!==before)try{bsvQuiet()}catch{}}return g.notes}
const nzqFName=f=>f?(f.n||(NZQ['f_'+f.id]?nzqt('f_'+f.id):'—')):nzqt('noF');
const nzqFld=id=>(g.nzqF||[]).find(f=>f.id===id);
const nzqTitle=n=>{const t=String(n&&n.text||'').split('\n')[0].trim();return t||(n&&n.ck&&n.ck[0]&&n.ck[0].t)||'—'};
const nzqBody=n=>String(n&&n.text||'').split('\n').slice(1).join('\n');
const nzqLive=()=>nzqD().filter(n=>n&&!n.del&&!n.arch);
const nzqCnt=k=>k===1?nzqt('n1',{n:k}):nzqt('nN',{n:k});
const nzqWhen=t=>{try{return new Date(t).toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'})}catch{return''}};
const nzqGet=id=>nzqD().find(n=>n&&n.id===id);
/* --- open points: unticked checklist points of live notes + the old tasks that do not belong to a note --- */
function nzqOpen(){const out=[];nzqLive().forEach(n=>(n.ck||[]).forEach(c=>{if(!c.done)out.push({n,c,due:c.due||''})}));
 (g.tasks||[]).forEach(t=>{if(t&&!t.done&&!t.nz)out.push({t,due:t.due||''})});return out.sort((a,b)=>(a.due||'9999').localeCompare(b.due||'9999'))}
/* --- a dated point ⇄ one task --- */
function nzqSync(n){try{g.tasks=g.tasks||[];const ids=new Set();(n.ck||[]).forEach(c=>{let t=c.tk&&g.tasks.find(z=>z.id===c.tk);
  if(c.due&&!n.del&&!n.arch){if(!t){t={id:V(),t:'',due:'',time:'',prio:1,proj:'',done:!1,nz:n.id};g.tasks.push(t);c.tk=t.id}t.t=c.t+' · '+nzqTitle(n);t.due=c.due;t.done=!!c.done;t.nz=n.id;ids.add(t.id)}
  else if(t){g.tasks=g.tasks.filter(z=>z!==t);delete c.tk}});
 g.tasks=g.tasks.filter(t=>!(t.nz===n.id&&!ids.has(t.id)))}catch(e){Hooks.err('nzqsync',e)}}
/* a task ticked in the calendar ticks its point */
function nzqPull(){try{(g.tasks||[]).forEach(t=>{if(!t||!t.nz)return;const n=nzqGet(t.nz);if(!n){t.nz=void 0;return}const c=(n.ck||[]).find(z=>z.tk===t.id);if(c&&!!c.done!==!!t.done)c.done=!!t.done})}catch{}}
function nzqSave(n,quiet){n.u=Date.now();nzqSync(n);try{bsvQuiet()}catch{}$()}
function nzqNew(o){const n=Object.assign({id:V(),text:'',d:Date.now(),u:Date.now(),fld:nzqF.startsWith('fld:')?nzqF.slice(4):'',tags:[],ck:[],docs:[],lk:[]},o||{});nzqD().unshift(n);try{bsvQuiet()}catch{}$();return n}
function nzqOpenNote(id,back){nzqId=id;R('nzed')}
/* ---------- screens ---------- */
const nzqHdr=(t,right)=>`<div class="sub-hdr"><button class="iconbtn" data-act="nzqback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(t)}</h2></div>${right||'<span></span>'}</div>`;
function nzqHome(){nzqPull();const L2=nzqLive(),F=(g.nzqF||[]).filter(f=>!f.hid),cnt=f=>L2.filter(n=>(n.fld||'')===f.id).length,open=nzqOpen().length,dated=nzqOpen().filter(x=>x.due).length,
 ar=nzqD().filter(n=>n&&n.arch&&!n.del).length,tr=nzqD().filter(n=>n&&n.del).length,pin=L2.filter(n=>n.pin).length;
 const row=(k,ic,lab,n)=>`<button type="button" class="nzqli" data-act="nzqlist" data-f="${k}"><span class="nzqic">${ic}</span><span>${i(lab)}</span><em>${n} ›</em></button>`;
 return`<div class="screen dhome nzq"><div class="sub-hdr"><button class="iconbtn" data-act="nzqback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(nzqt('t'))}</h2></div><button class="iconbtn" data-act="nzqlist" data-f="find" aria-label="${i(nzqt('find'))}">${_('search')}</button></div>
 <p class="nzqsub">${i(nzqt('sub'))}</p>
 <div class="nzqqa"><button type="button" data-act="nzqnew"><b>✎</b>${i(nzqt('qNew'))}</button><button type="button" data-act="nzqnew" data-m="mic"><b>🎙</b>${i(nzqt('qMic'))}</button><button type="button" data-act="nzqnew" data-m="scan"><b>⌗</b>${i(nzqt('qScan'))}</button><button type="button" data-act="nzqnew" data-m="photo"><b>📷</b>${i(nzqt('qPh'))}</button></div>
 <div class="dhcard nzqlist">${row('all','▤',nzqt('all'),L2.length)}${row('pin','☆',nzqt('pin'),pin)}${row('open','☑',nzqt('open'),open)}${row('dated','📅',nzqt('dated'),dated)}${row('arch','🗄',nzqt('arch'),ar)}${row('trash','🗑',nzqt('trash'),tr)}</div>
 <div class="nzqh"><span>${i(nzqt('flds'))}</span><button type="button" data-act="nzqord">${i(nzqt('allF'))} ›</button></div>
 <div class="nzqgrid">${F.slice(0,6).map(f=>nzqTile(f,cnt(f))).join('')}</div>
 ${L2.length?'':`<p class="nzqempty">${i(nzqt('emptyAll'))}</p>`}</div>`}
const nzqTile=(f,c)=>`<button type="button" class="nzqf" data-act="nzqlist" data-f="fld:${i(f.id)}" ${f.c?`style="background:${f.c}"`:''}><b>${f.e||'📁'}</b><span>${i(nzqFName(f))}</span><small>${i(nzqCnt(c))}</small></button>`;
function nzqOrd(){const L2=nzqLive(),show=m.nzqHid,F=(g.nzqF||[]).filter(f=>show||!f.hid),none=L2.filter(n=>!n.fld||!nzqFld(n.fld)).length;
 return`<div class="screen dhome nzq">${nzqHdr(nzqt('flds'),`<button class="iconbtn" data-act="nzqhid" aria-label="${i(nzqt('fShow'))}">${show?'◉':'◎'}</button>`)}
 <div class="nzqgrid">${F.map(f=>`<div class="nzqfw ${f.hid?'hid':''}">${nzqTile(f,L2.filter(n=>n.fld===f.id).length)}<button type="button" class="nzqfe" data-act="nzqfed" data-id="${i(f.id)}" aria-label="${i(nzqt('fEdit'))}">⋯</button></div>`).join('')}
 ${none?`<div class="nzqfw">${nzqTile({id:'',e:'📄',n:nzqt('noF')},none).replace('data-f="fld:"','data-f="fld:-"')}</div>`:''}<button type="button" class="nzqf add" data-act="nzqfed"><b>＋</b><span>${i(nzqt('fAdd').replace(/^＋\s*/,''))}</span></button></div>
 <p class="nzqinfo">${i(nzqt('fInfo'))}</p></div>`}
function nzqPick(f){const L2=nzqLive();if(f==='all'||f==='find')return L2;if(f==='pin')return L2.filter(n=>n.pin);if(f==='arch')return nzqD().filter(n=>n&&n.arch&&!n.del);if(f==='trash')return nzqD().filter(n=>n&&n.del);
 if(f==='fld:-')return L2.filter(n=>!n.fld||!nzqFld(n.fld));if(f.startsWith('fld:'))return L2.filter(n=>n.fld===f.slice(4));if(f.startsWith('tag:'))return L2.filter(n=>(n.tags||[]).includes(f.slice(4)));return L2}
function nzqListName(f){if(f.startsWith('fld:'))return f==='fld:-'?nzqt('noF'):nzqFName(nzqFld(f.slice(4)));if(f.startsWith('tag:'))return'🏷 '+f.slice(4);return nzqt({find:'all',all:'all',pin:'pin',open:'open',dated:'dated',arch:'arch',trash:'trash'}[f]||'all')}
function nzqCard(n){const ck=n.ck||[],dn=ck.filter(c=>c.done).length,b=nzqBody(n).replace(/\s+/g,' ').trim(),f=nzqFld(n.fld);
 return`<button type="button" class="dhcard nzqn" data-act="nzqopen" data-id="${i(n.id)}"><span class="nzqnt">${n.pin?'📌 ':''}<b>${i(nzqTitle(n))}</b></span>${b?`<small class="nzqnb">${i(b.slice(0,120))}</small>`:''}
 <span class="nzqnm">${f?`<i>${f.e} ${i(nzqFName(f))}</i>`:''}${ck.length?`<i>☑ ${dn}/${ck.length}</i>`:''}${(n.docs||[]).length?`<i>📎 ${n.docs.length}</i>`:''}${(n.tags||[]).map(t=>`<i>🏷 ${i(t)}</i>`).join('')}<i class="d">${i(nzqWhen(n.u||n.d))}</i></span></button>`}
function nzqList(){nzqPull();const f=nzqF;
 if(f==='open'||f==='dated'){const O=nzqOpen().filter(x=>f==='open'||x.due);
  return`<div class="screen dhome nzq">${nzqHdr(nzqListName(f))}${f==='dated'?`<p class="nzqinfo">📅 ${i(nzqt('calHint'))}</p><button type="button" class="bsvplus" data-act="go" data-to="mycal">${i(nzqt('calOpen'))}</button>`:''}
  ${O.length?`<div class="dhcard nzqol">${O.map(x=>x.t?`<div class="nzqo"><button type="button" class="nzqcb" data-act="nzqtk" data-id="${i(x.t.id)}" aria-label="✓"></button><span><b>${i(x.t.t||'—')}</b><small>${i([x.due?vA(x.due):'',nzqt('oldTask')].filter(Boolean).join(' · '))}</small></span></div>`
   :`<div class="nzqo"><button type="button" class="nzqcb" data-act="nzqck" data-id="${i(x.n.id)}" data-c="${i(x.c.id)}" aria-label="✓"></button><button type="button" class="nzqot" data-act="nzqopen" data-id="${i(x.n.id)}"><b>${i(x.c.t||'—')}</b><small>${i([x.due?vA(x.due):'',nzqt('fromNote')+' «'+nzqTitle(x.n)+'»'].filter(Boolean).join(' · '))}</small></button></div>`).join('')}</div>`:`<p class="nzqempty">${i(nzqt('empty'))}</p>`}</div>`}
 let N=nzqPick(f);const q=nzqQ.trim().toLowerCase();if(q)N=N.filter(n=>[n.text,(n.ck||[]).map(c=>c.t).join(' '),(n.tags||[]).join(' ')].join(' ').toLowerCase().includes(q));
 N=N.slice().sort((a,b)=>(f==='trash'?(b.del||0)-(a.del||0):((b.pin?1:0)-(a.pin?1:0))||((b.u||b.d||0)-(a.u||a.d||0))));
 return`<div class="screen dhome nzq">${nzqHdr(nzqListName(f))}
 ${f==='trash'?`<p class="nzqinfo">🗑 ${i(nzqt('trashS'))}</p>${N.length?`<button type="button" class="bsvdel" data-act="nzqempty">${i(nzqt('emptyT'))}</button>`:''}`:`<input class="field nzqfind" type="search" placeholder="${i(nzqt('find'))}" value="${i(nzqQ)}" autocomplete="off">`}
 ${N.length?N.map(nzqCard).join(''):`<p class="nzqempty">${i(nzqt(q?'empty':'emptyAll'))}</p>`}
 ${f!=='trash'&&f!=='arch'?`<button type="button" class="dcadd gold" data-act="nzqnew">${i('✎ '+nzqt('qNew'))}</button>`:''}</div>`}
function nzqEd(){const n=nzqId&&nzqGet(nzqId);if(!n){setTimeout(()=>R('notiz',void 0,!0),0);return'<div class="screen"></div>'}nzqPull();const f=nzqFld(n.fld),tl=nzqTitle(n)==='—'?'':String(n.text||'').split('\n')[0];
 const D=krDocs(n.docs||[]),lk=(n.lk||[]).map(nzqLkInfo).filter(Boolean);
 return`<div class="screen dhome nzq nzqed ${n.big?'big':''}"><div class="sub-hdr"><button class="iconbtn" data-act="nzqback" aria-label="back">${_('back')}</button><div class="ttl"></div>
 <span class="nzqtop"><button class="iconbtn" data-act="nzqpin" aria-label="${i(nzqt('pin'))}">${n.pin?'★':'☆'}</button><button class="iconbtn" data-act="nzqshare" aria-label="${i(nzqt('share'))}">⇪</button><button class="iconbtn" data-act="nzqmenu" aria-label="${i(nzqt('menu'))}">⋯</button></span></div>
 ${n.del?`<div class="dhcard nzqdel"><span>🗑 ${i(nzqt('trashS'))}</span><button type="button" data-act="nzqrest">${i(nzqt('restore'))}</button></div>`:''}
 <textarea class="nzqtt" data-nz="title" rows="1" placeholder="${i(nzqt('ttl'))}">${i(tl)}</textarea>
 <div class="nzqchips"><button type="button" class="chip" data-act="nzqfpick">${f?f.e+' '+i(nzqFName(f)):'📁 '+i(nzqt('noF'))}</button>${(n.tags||[]).map(t=>`<button type="button" class="chip" data-act="nzqtags">🏷 ${i(t)}</button>`).join('')}<button type="button" class="chip" data-act="nzqtags">${(n.tags||[]).length?'＋':'🏷 '+i(nzqt('tags'))}</button><span class="chip g">📅 ${i(nzqWhen(n.d))}</span></div>
 <div class="nzqck">${(n.ck||[]).map(c=>`<div class="nzqci ${c.done?'dn':''}"><button type="button" class="nzqcb ${c.done?'y':''}" data-act="nzqck" data-id="${i(n.id)}" data-c="${i(c.id)}" aria-label="✓">${c.done?'✓':''}</button><input class="nzqct" data-c="${i(c.id)}" value="${i(c.t)}" placeholder="${i(nzqt('ckPh'))}"><button type="button" class="nzqdue ${c.due?'on':''}" data-act="nzqdue" data-c="${i(c.id)}">${c.due?'📅 '+i(vA(c.due).slice(0,6)):'📅'}</button></div>`).join('')}
  <button type="button" class="nzqckadd" data-act="nzqckadd">${i(nzqt('ckAdd'))}</button></div>
 <div class="nzqnh">▾ ${i(nzqt('notesH'))}</div><textarea class="nzqbody" data-nz="body" placeholder="${i(nzqt('body'))}">${i(nzqBody(n))}</textarea>
 ${D.map(d=>{const pg=(d.pages||[])[0];return`<div class="nzqatt"><button type="button" class="nzqab" data-kgo="dzopen" data-id="${i(d.id)}">${pg?`<span class="nzqth" data-ph="${i(d.id)}"></span>`:`<span class="nzqpdf">PDF</span>`}<span><b>${i(d.title||'—')}</b><small>${i(nzqt('attLinked'))}</small></span></button><button type="button" class="bsvsm x" data-act="nzqdocx" data-id="${i(d.id)}" aria-label="×">×</button></div>`}).join('')}
 ${lk.length?`<div class="nzqlk"><span>🔗 ${i(nzqt('lk'))}:</span>${lk.map(l=>`<span class="nzqlki"><button type="button" class="nzqlkb" data-act="nzqlkgo" data-k="${l.k}" data-id="${i(l.id)}"><b>${i(l.n)}</b> <small>(${i(nzqt('k_'+l.k))})</small></button><button type="button" class="nzqlkx" data-act="nzqlkx" data-k="${l.k}" data-id="${i(l.id)}" aria-label="×">×</button></span>`).join('')}</div>`:''}
 <p class="nzqmeta">${i(nzqt('created',{d:nzqWhen(n.d)}))}${n.u&&n.u!==n.d?' · '+i(nzqt('edited',{d:nzqWhen(n.u)})):''}</p>
 <div class="nzqtb"><button type="button" data-act="nzqbig" aria-label="${i(nzqt('big'))}">Aa</button><button type="button" data-act="nzqckadd" aria-label="☑">☑</button><button type="button" data-act="nzqbul" aria-label="•">☰</button><button type="button" data-act="nzqph" aria-label="🖼">🖼</button><button type="button" data-act="nzqatt" aria-label="📎">📎</button><button type="button" data-act="nzqmic" class="${nzqMic?'on':''}" aria-label="🎙">🎙</button><button type="button" data-act="nzqlk" aria-label="🔗">🔗</button></div></div>`}
try{['notiz','nzlist','nzord','nzed'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r)})}catch(e){Hooks.err('nzqroutes',e)}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='notiz')return nzqHome();if(m.route==='nzlist')return nzqList();if(m.route==='nzord')return nzqOrd();if(m.route==='nzed')return nzqEd()}catch(e){Hooks.err('nzqscreen',e)}});
/* ---------- editing ---------- */
function nzqRead(){const n=nzqId&&nzqGet(nzqId),sc=document.querySelector('.nzqed');if(!n||!sc)return null;const tt=sc.querySelector('[data-nz=title]'),bd=sc.querySelector('[data-nz=body]');
 const t=(tt?tt.value:'').replace(/\n/g,' ').trim(),b=bd?bd.value.replace(/\s+$/,''):nzqBody(n);n.text=t+(b?'\n'+b:'');sc.querySelectorAll('.nzqct').forEach(x=>{const c=(n.ck||[]).find(z=>z.id===x.dataset.c);if(c)c.t=x.value});return n}
function nzqLater(){clearTimeout(nzqTimer);nzqTimer=setTimeout(()=>{const n=nzqRead();if(n)nzqSave(n)},600)}
document.addEventListener('input',e=>{if(!e.target.closest||!e.target.closest('.nzqed'))return;if(e.target.matches('.nzqtt,.nzqbody'))nzqGrow(e.target);nzqLater()},!0);
document.addEventListener('input',e=>{if(e.target.matches&&e.target.matches('.nzqfind')){nzqQ=e.target.value;clearTimeout(nzqTimer);nzqTimer=setTimeout(()=>{const p=e.target.selectionStart;v();const f=document.querySelector('.nzqfind');if(f){f.focus();try{f.setSelectionRange(p,p)}catch{}}},250)}},!0);
document.addEventListener('keydown',e=>{const x=e.target;if(!x.matches)return;if(x.matches('.nzqct')&&e.key==='Enter'){e.preventDefault();L.nzqckadd({after:x.dataset.c})}
 if(x.matches('.nzqtt')&&e.key==='Enter'){e.preventDefault();const b=document.querySelector('.nzqbody');b&&b.focus()}
 if(x.matches('.nzqbody')&&e.key==='Enter'){const s=x.selectionStart,ln=x.value.slice(0,s).split('\n').pop();const mm=ln.match(/^(\s*[•\-]\s)/);if(mm){e.preventDefault();if(ln.trim()===mm[1].trim()){x.setRangeText('',s-ln.length,s,'end')}else x.setRangeText('\n'+mm[1],s,s,'end');nzqLater()}}},!0);
const nzqGrow=t=>{t.style.height='auto';const h=t.scrollHeight;if(h)t.style.height=Math.max(t.classList.contains('nzqbody')?140:0,h)+'px';else t.style.height=''};
Hooks.on('render',()=>{try{if(m.route!=='nzed')return;requestAnimationFrame(()=>document.querySelectorAll('.nzqtt,.nzqbody').forEach(nzqGrow));
 document.querySelectorAll('.nzqth[data-ph]').forEach(async s=>{const d=krDocs([s.dataset.ph])[0],pg=d&&(d.pages||[])[0];if(!pg)return;try{const b=await ni(pg);if(b)s.style.backgroundImage=`url(data:${pg.type||'image/jpeg'};base64,${b})`}catch{}});
 const n=nzqGet(nzqId);if(n&&!String(n.text||'').trim()&&!(n.ck||[]).length&&!m.nzqFocused){m.nzqFocused=1;setTimeout(()=>{const t=document.querySelector('.nzqtt');t&&t.focus()},120)}}catch(e){Hooks.err('nzqrender',e)}});
/* leaving an empty new note removes it */
Hooks.on('route',r=>{try{if(m.route==='nzed'&&r!=='nzed'){const n=nzqRead()||nzqGet(nzqId);if(n){if(!String(n.text||'').trim()&&!(n.ck||[]).length&&!(n.docs||[]).length){g.notes=g.notes.filter(z=>z!==n);try{bsvQuiet()}catch{}$()}else nzqSave(n)}
 if(nzqMic){try{nzqMic.stop()}catch{}nzqMic=null}m.nzqFocused=0}}catch(e){Hooks.err('nzqleave',e)}});
/* ---------- actions ---------- */
Hooks.act('nzqback',()=>{const r=m.route;if(r==='nzed'){R(m.nzqFrom||'notiz',void 0,!0);return}if(r==='nzlist'||r==='nzord'){R('notiz',void 0,!0);return}R('home',void 0,!0)});
Hooks.act('nzqlist',d=>{nzqF=d.f||'all';nzqQ='';m.nzqFrom='nzlist';R('nzlist');if(d.f==='find')setTimeout(()=>{const f=document.querySelector('.nzqfind');f&&f.focus()},150)});
Hooks.act('nzqord',()=>R('nzord'));Hooks.act('nzqhid',()=>{m.nzqHid=!m.nzqHid;v()});
Hooks.act('nzqopen',d=>{m.nzqFrom=m.route==='nzed'?(m.nzqFrom||'notiz'):m.route;nzqOpenNote(d.id)});
Hooks.act('nzqnew',d=>{const md=d&&d.m;m.nzqFrom=m.route==='nzed'?'notiz':m.route;
 if(md==='scan'){try{scOpen({multi:!0,saveLabel:krt('save'),done:async files=>{if(!files||!files.length)return;const t=nzqt('scanT',{d:nzqWhen(Date.now())});const dc=await krNewDoc(files,t,'');const n=nzqNew({text:t,docs:[dc.id]});nzqOpenNote(n.id)}})}catch(e){Hooks.err('nzqscan',e)}return}
 if(md==='photo'){nzqPhoto(null);return}
 const n=nzqNew();nzqOpenNote(n.id);if(md==='mic')setTimeout(()=>L.nzqmic(),400)});
Hooks.act('nzqpin',()=>{const n=nzqRead();if(!n)return;n.pin=!n.pin;nzqSave(n);v()});
Hooks.act('nzqbig',()=>{const n=nzqRead();if(!n)return;n.big=!n.big;nzqSave(n);v()});
Hooks.act('nzqckadd',d=>{const n=nzqRead();if(!n)return;n.ck=n.ck||[];const c={id:V(),t:'',done:!1,due:''},k=d&&d.after?n.ck.findIndex(z=>z.id===d.after):-1;if(k>=0)n.ck.splice(k+1,0,c);else n.ck.push(c);nzqSave(n);v();
 setTimeout(()=>{const x=document.querySelector(`.nzqct[data-c="${c.id}"]`);x&&x.focus()},60)});
Hooks.act('nzqck',d=>{const n=nzqGet(d.id);if(!n)return;if(m.route==='nzed')nzqRead();const c=(n.ck||[]).find(z=>z.id===d.c);if(!c)return;c.done=!c.done;nzqSave(n);v()});
Hooks.act('nzqtk',d=>{const t=(g.tasks||[]).find(z=>z.id===d.id);if(!t)return;t.done=!0;try{bsvQuiet()}catch{}$();v()});
Hooks.act('nzqbul',()=>{const b=document.querySelector('.nzqbody');if(!b)return;const s=b.selectionStart||b.value.length,before=b.value.slice(0,s),pre=before&&!before.endsWith('\n')?'\n':'';b.focus();b.setRangeText(pre+'• ',s,s,'end');nzqGrow(b);nzqLater()});
Hooks.act('nzqdue',d=>{const n=nzqRead();if(!n)return;const c=(n.ck||[]).find(z=>z.id===d.c);if(!c)return;
 H(nzqt('dueSet'),`<div class="bsvys"><p class="fdsmall">«${i(c.t||nzqt('ckPh'))}»</p><input class="field" type="date" data-dd value="${i(c.due||'')}"><p class="fdsmall">📅 ${i(nzqt('calHint'))}</p><button type="button" class="dcadd gold" data-ds>${i(krt('save'))}</button>${c.due?`<button type="button" class="bsvdel" data-dc>${i(nzqt('dueClr'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh');sh.querySelector('[data-ds]').onclick=()=>{c.due=sh.querySelector('[data-dd]').value||'';sh.remove();nzqSave(n);v()};const dc=sh.querySelector('[data-dc]');dc&&(dc.onclick=()=>{c.due='';sh.remove();nzqSave(n);v()})})});
Hooks.act('nzqfpick',()=>{const n=nzqRead();if(!n)return;const F=(g.nzqF||[]).filter(f=>!f.hid||f.id===n.fld);
 H(nzqt('flds'),`<div class="nzqfp">${[{id:'',e:'📄'}].concat(F).map(f=>`<button type="button" class="${(n.fld||'')===f.id?'on':''}" data-fp="${i(f.id)}"><b>${f.e}</b>${i(f.id?nzqFName(f):nzqt('noF'))}</button>`).join('')}</div>`,
 sh=>{sh.classList.add('bsvsh');sh.querySelectorAll('[data-fp]').forEach(b=>b.onclick=()=>{n.fld=b.dataset.fp;sh.remove();nzqSave(n);v()})})});
Hooks.act('nzqtags',()=>{const n=nzqRead();if(!n)return;const all=[...new Set(nzqD().flatMap(z=>z.tags||[]))].filter(t=>!(n.tags||[]).includes(t)).slice(0,12);
 H(nzqt('tags'),`<div class="bsvys"><input class="field" data-tg value="${i((n.tags||[]).join(', '))}" placeholder="${i(nzqt('tagsPh'))}" autocomplete="off">${all.length?`<div class="nzqtagq">${all.map(t=>`<button type="button" class="chip" data-tq="${i(t)}">🏷 ${i(t)}</button>`).join('')}</div>`:''}<button type="button" class="dcadd gold" data-ts>${i(krt('save'))}</button></div>`,
 sh=>{sh.classList.add('bsvsh');const f=sh.querySelector('[data-tg]');setTimeout(()=>f.focus(),60);sh.querySelectorAll('[data-tq]').forEach(b=>b.onclick=()=>{f.value=(f.value.trim()?f.value.replace(/,\s*$/,'')+', ':'')+b.dataset.tq;b.remove()});
  sh.querySelector('[data-ts]').onclick=()=>{n.tags=[...new Set(f.value.split(',').map(t=>t.trim()).filter(Boolean))].slice(0,10);sh.remove();nzqSave(n);v()}})});
Hooks.act('nzqmenu',()=>{const n=nzqRead();if(!n)return;
 H(nzqt('menu'),`<div class="bsvys"><button type="button" class="btn rlfull" data-mm="pin">${n.pin?'★ ':'☆ '}${i(nzqt('pin'))}</button><button type="button" class="btn rlfull" data-mm="arch">🗄 ${i(nzqt(n.arch?'unArch':'toArch'))}</button><button type="button" class="btn rlfull" data-mm="share">⇪ ${i(nzqt('share'))}</button>
 ${n.del?`<button type="button" class="btn rlfull" data-mm="rest">↺ ${i(nzqt('restore'))}</button><button type="button" class="bsvdel" data-mm="kill">${i(nzqt('kill'))}</button>`:`<button type="button" class="bsvdel" data-mm="trash">🗑 ${i(nzqt('toTrash'))}</button>`}</div>`,
 sh=>{sh.classList.add('bsvsh');let arm=0;sh.querySelectorAll('[data-mm]').forEach(b=>b.onclick=()=>{const k=b.dataset.mm;
  if(k==='kill'&&!arm){arm=1;b.textContent=nzqt('killQ');b.classList.add('on');return}sh.remove();
  if(k==='pin'){n.pin=!n.pin;nzqSave(n);v()}else if(k==='arch'){n.arch=n.arch?0:1;nzqSave(n);R(m.nzqFrom||'notiz',void 0,!0)}else if(k==='share')L.nzqshare();
  else if(k==='trash'){nzqTrash(n)}else if(k==='rest'){delete n.del;nzqSave(n);v()}else if(k==='kill'){nzqKill(n);R('nzlist',void 0,!0)}})})});
function nzqTrash(n){n.del=Date.now();nzqSave(n);m.nzqFocused=0;nzqId=null;R(m.nzqFrom&&m.nzqFrom!=='nzed'?m.nzqFrom:'notiz',void 0,!0);
 setTimeout(()=>{try{document.querySelectorAll('.nzqundo').forEach(x=>x.remove());const b=document.createElement('div');b.className='ndbar nzqundo';b.innerHTML=`<span>🗑</span><b>${i(nzqt('trashed'))}</b><div><button type="button" data-u>${i(nzqt('undo'))}</button></div>`;
  b.querySelector('[data-u]').onclick=()=>{delete n.del;nzqSave(n);b.remove();v()};document.body.appendChild(b);setTimeout(()=>b.remove(),6000)}catch{}},200)}
function nzqKill(n){n.del=1;nzqSync(n);g.notes=nzqD().filter(z=>z!==n);try{bsvQuiet()}catch{}$()}
Hooks.act('nzqrest',()=>{const n=nzqGet(nzqId);if(!n)return;delete n.del;nzqSave(n);v()});
Hooks.act('nzqempty',()=>{const B=nzqD().filter(n=>n&&n.del);B.forEach(n=>{n.del=1;nzqSync(n)});g.notes=nzqD().filter(n=>!(n&&n.del));try{bsvQuiet()}catch{}$();v()});
Hooks.act('nzqshare',()=>{const n=nzqRead();if(!n)return;const txt=nzqTitle(n)+'\n'+(n.ck||[]).map(c=>(c.done?'☑ ':'☐ ')+c.t+(c.due?' ('+vA(c.due)+')':'')).join('\n')+(n.ck&&n.ck.length?'\n':'')+nzqBody(n);
 try{if(navigator.share){navigator.share({title:nzqTitle(n),text:txt}).catch(()=>{});return}}catch{}try{navigator.clipboard.writeText(txt).then(()=>T(cv5n(RL_S.copied)))}catch{}});
/* attachments: saved once in «Dokumente», linked here */
function nzqAddDoc(n,id){n.docs=n.docs||[];if(!n.docs.includes(id))n.docs.push(id);nzqSave(n)}
function nzqPhoto(n){const e=document.createElement('input');e.type='file';e.accept='image/*';e.setAttribute('capture','environment');e.onchange=async()=>{const fs=[...(e.files||[])];if(!fs.length)return;
 try{const t=n?nzqTitle(n)+' · '+nzqt('phT',{d:nzqWhen(Date.now())}):nzqt('phT',{d:nzqWhen(Date.now())});const dc=await krNewDoc(fs,t,'');
  if(n){nzqAddDoc(n,dc.id);v()}else{const nn=nzqNew({text:t,docs:[dc.id]});nzqOpenNote(nn.id)}}catch(x){Hooks.err('nzqphoto',x)}};e.click()}
Hooks.act('nzqph',()=>{const n=nzqRead();if(n)nzqPhoto(n)});
Hooks.act('nzqatt',()=>{const n=nzqRead();if(!n)return;let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!(n.docs||[]).includes(d.id)).sort((a,b)=>(b.ts||0)-(a.ts||0))}catch{}
 const add=async fs=>{if(!fs||!fs.length)return;const dc=await krNewDoc(fs,nzqTitle(n),'');nzqAddDoc(n,dc.id);v()};
 H(nzqt('attSheet'),`<p class="fdsmall">${i(nzqt('attOnce'))}</p><button type="button" class="kropt" data-ao="cam"><span>📷</span><span><b>${i(nzqt('attCam'))}</b></span></button><button type="button" class="kropt" data-ao="file"><span>📄</span><span><b>${i(nzqt('attFile'))}</b></span></button>
 <div class="kropt krhave"><span>🗂</span><span><b>${i(nzqt('att'))}</b></span></div>${D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}"><div class="krhl">${D.slice(0,60).map(d=>`<button type="button" class="krhv" data-kh="${i(d.id)}" data-s="${i(String(d.title||'').toLowerCase())}"><span>📄 ${i(d.title||'—')}</span></button>`).join('')}</div>`:`<p class="dhnone">${i(krt2('noHave'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');sh.querySelector('[data-ao=cam]').onclick=()=>{sh.remove();try{scOpen({multi:!0,saveLabel:krt('save'),done:fs=>add(fs)})}catch(e){Hooks.err('nzqattcam',e)}};
  sh.querySelector('[data-ao=file]').onclick=()=>{const e=document.createElement('input');e.type='file';e.multiple=!0;e.accept='image/*,application/pdf';e.onchange=()=>{sh.remove();add([...(e.files||[])])};e.click()};
  const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-kh]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-kh]').forEach(b=>b.onclick=()=>{nzqAddDoc(n,b.dataset.kh);sh.remove();v()})})});
Hooks.act('nzqdocx',d=>{const n=nzqRead();if(!n)return;n.docs=(n.docs||[]).filter(z=>z!==d.id);nzqSave(n);v()});
/* dictation (the iPhone's own speech recognition, when the browser offers it) */
Hooks.act('nzqmic',()=>{if(nzqMic){try{nzqMic.stop()}catch{}nzqMic=null;v();return}const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){T(nzqt('micNo'));const b=document.querySelector('.nzqbody');b&&b.focus();return}
 try{const r=new SR();r.lang=({de:'de-DE',ru:'ru-RU',en:'en-US',pl:'pl-PL',tr:'tr-TR',fr:'fr-FR',es:'es-ES'})[g.lang]||'de-DE';r.continuous=!0;r.interimResults=!1;
  r.onresult=ev=>{let s='';for(let k=ev.resultIndex;k<ev.results.length;k++)if(ev.results[k].isFinal)s+=ev.results[k][0].transcript;if(!s)return;const b=document.querySelector('.nzqbody');if(!b)return;const pre=b.value&&!/\s$/.test(b.value)?' ':'';b.value+=pre+s.trim();nzqGrow(b);nzqLater()};
  r.onend=()=>{if(nzqMic===r){nzqMic=null;v()}};r.onerror=()=>{if(nzqMic===r){nzqMic=null;v();T(nzqt('micNo'))}};r.start();nzqMic=r;T(nzqt('micOn')+' · '+nzqt('micInfo'));v()}catch(e){nzqMic=null;T(nzqt('micNo'))}});
/* links: employer, authority, document */
function nzqLkInfo(l){try{if(l.k==='job'){const j=krJob(l.id);return j&&{k:'job',id:l.id,n:j.co}}if(l.k==='bsv'){const b=bsvGet(l.id);return b&&{k:'bsv',id:l.id,n:b.n}}if(l.k==='doc'){const d=krDocs([l.id])[0];return d&&{k:'doc',id:l.id,n:d.title||'—'}}}catch{}return null}
Hooks.act('nzqlk',()=>{const n=nzqRead();if(!n)return;const has=(k,id)=>(n.lk||[]).some(l=>l.k===k&&l.id===id);let J=[],B=[],D=[];try{J=(krD().jobs||[]).filter(j=>!has('job',j.id))}catch{}try{B=(bsvD().items||[]).filter(b=>!has('bsv',b.id))}catch{}try{D=Ke().items.filter(d=>d&&!d.type&&d.title&&!has('doc',d.id)).slice(0,40)}catch{}
 const sec=(t,k,A,nm,em)=>A.length?`<h3 class="odh">${i(t)}</h3>${A.map(x=>`<button type="button" class="krhv" data-lk="${k}" data-id="${i(x.id)}" data-s="${i(String(nm(x)).toLowerCase())}"><span>${em} ${i(nm(x))}</span></button>`).join('')}`:'';
 H(nzqt('lkAdd'),`${J.length+B.length+D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}"><div class="nzqlkl">${sec(nzqt('lkJob'),'job',J,j=>j.co,'💼')}${sec(nzqt('lkBsv'),'bsv',B,b=>b.n,'🏛')}${sec(nzqt('lkDoc'),'doc',D,d=>d.title,'📄')}</div>`:`<p class="dhnone">${i(nzqt('lkNone'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-lk]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-lk]').forEach(b=>b.onclick=()=>{(n.lk=n.lk||[]).push({k:b.dataset.lk,id:b.dataset.id});sh.remove();nzqSave(n);v()})})});
Hooks.act('nzqlkx',d=>{const n=nzqRead();if(!n)return;n.lk=(n.lk||[]).filter(l=>!(l.k===d.k&&l.id===d.id));nzqSave(n);v()});
Hooks.act('nzqlkgo',d=>{nzqRead();if(d.k==='job'){krSel=d.id;R('karj')}else if(d.k==='bsv'){try{bsvSel=d.id}catch{}R('bsvi')}else{const f=L.dzopen;f&&f({id:d.id})}});
/* the other side of a link: employer and authority show their notes */
function nzqLinkedHtml(k,id){const N=nzqLive().filter(n=>(n.lk||[]).some(l=>l.k===k&&l.id===id));
 return`<h3 class="odh">✎ ${i(nzqt('linkedHere'))}</h3>${N.map(n=>`<button type="button" class="dhcard nzqn sm" data-act="nzqopen" data-id="${i(n.id)}"><span class="nzqnt"><b>${i(nzqTitle(n))}</b></span><span class="nzqnm"><i class="d">${i(nzqWhen(n.u||n.d))}</i></span></button>`).join('')}<button type="button" class="bsvplus" data-act="nzqnewlk" data-k="${k}" data-id="${i(id)}">${i(nzqt('newHere'))}</button>`}
Hooks.act('nzqnewlk',d=>{m.nzqFrom=m.route;const n=nzqNew({lk:[{k:d.k,id:d.id}]});nzqOpenNote(n.id)});
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;if(m.route==='karj'&&krSel&&!h.includes('data-act="nzqnewlk"')){const e=h.lastIndexOf('</div>');return h.slice(0,e)+nzqLinkedHtml('job',krSel)+h.slice(e)}
 if(m.route==='bsvi'&&typeof bsvSel!=='undefined'&&bsvSel&&!h.includes('data-act="nzqnewlk"')){const e=h.lastIndexOf('</div>');return h.slice(0,e)+nzqLinkedHtml('bsv',bsvSel)+h.slice(e)}return h}catch(e){Hooks.err('nzqlinked',e);return h}});
/* folders */
Hooks.act('nzqfed',d=>{const f0=d&&d.id&&nzqFld(d.id),f=f0?Object.assign({},f0):{id:V(),n:'',e:'📁',c:'',hid:0};
 H(f0?nzqFName(f0):nzqt('fAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(nzqt('fName'))}</label><input class="field" data-fn value="${i(f0?nzqFName(f0):'')}" autocomplete="off">
 <label class="bsvl">${i(nzqt('fSym'))}</label><div class="nzqem">${NZQ_EM.map(e=>`<button type="button" class="${f.e===e?'on':''}" data-em="${e}">${e}</button>`).join('')}</div>
 <label class="bsvl">${i(nzqt('fCol'))}</label><div class="nzqcol">${NZQ_COL.map(c=>`<button type="button" class="${(f.c||'')===c?'on':''}" data-co="${c}" style="background:${c||'#fff'}"></button>`).join('')}</div>
 ${f0?`<label class="nzqhide"><input type="checkbox" data-fh ${f.hid?'checked':''}> ${i(nzqt('fHide'))}</label>`:''}<small class="verr" data-fe></small><button type="button" class="dcadd gold" data-fs>${i(krt('save'))}</button>${f0?`<button type="button" class="bsvdel" data-fd>${i(nzqt('fDel'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh');let arm=0;sh.querySelectorAll('[data-em]').forEach(b=>b.onclick=()=>{f.e=b.dataset.em;sh.querySelectorAll('[data-em]').forEach(x=>x.classList.toggle('on',x===b))});
  sh.querySelectorAll('[data-co]').forEach(b=>b.onclick=()=>{f.c=b.dataset.co;sh.querySelectorAll('[data-co]').forEach(x=>x.classList.toggle('on',x===b))});
  sh.querySelector('[data-fs]').onclick=()=>{const nm=sh.querySelector('[data-fn]').value.trim();if(!nm){sh.querySelector('[data-fe]').textContent=nzqt('fName')+' ?';return}
   const def=NZQ['f_'+f.id]&&nzqt('f_'+f.id)===nm;f.n=def?'':nm;const hb=sh.querySelector('[data-fh]');if(hb)f.hid=hb.checked?1:0;if(f0)Object.assign(f0,f);else g.nzqF.push(f);try{bsvQuiet()}catch{}$();sh.remove();v()};
  const dl=sh.querySelector('[data-fd]');dl&&(dl.onclick=()=>{if(!arm){arm=1;dl.textContent=nzqt('fDelQ');dl.classList.add('on');return}g.nzqF=g.nzqF.filter(x=>x.id!==f0.id);nzqD().forEach(n=>{if(n.fld===f0.id)n.fld=''});try{bsvQuiet()}catch{}$();sh.remove();v()})})});
/* ---------- the bottom bar: «Notizen» takes the place of «Aufgaben» ---------- */
try{if(typeof BD8N==='object')Object.assign(BD8N,{notiz:'note',bsv:BD8N.bsv||'book',fzm:BD8N.fzm||'coin',dsafe:BD8N.dsafe||'shield',sc9:BD8N.sc9||'scan',kar:BD8N.kar||'tgt'})}catch{}
try{ly6EXT.notiz={lab:()=>nzqt('t'),ic:()=>lydSvg('<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>'),open:()=>R('notiz')};
 ly6POOL.includes('notiz')||ly6POOL.push('notiz');
 if(!g.nzqNav){g.nzqNav=1;if(Array.isArray(g.nav6)){const k=g.nav6.indexOf('tasks');if(k>=0&&!g.nav6.includes('notiz')){g.nav6[k]='notiz'}}try{bsvQuiet()}catch{}$()}}catch(e){Hooks.err('nzqnav',e)}
Hooks.css('docs-notizen',`
.nzq .nzqsub{margin:-4px 0 10px;color:var(--muted);font-size:14px}
.nzqqa{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0 0 12px}.nzqqa button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;height:84px;border:0;border-radius:18px;background:var(--card,#fff);color:inherit;font:inherit;font-size:12.5px;line-height:1.15;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,.05);padding:4px}
.nzqqa b{font-size:23px;font-weight:400;line-height:1}
.nzqlist{padding:2px 14px!important}.nzqli{display:flex;align-items:center;gap:12px;width:100%;border:0;border-bottom:1px solid var(--line);background:none;color:inherit;font:inherit;font-size:15.5px;padding:12px 0;text-align:left}.nzqli:last-child{border-bottom:0}
.nzqic{width:24px;text-align:center;font-size:17px;flex:none}.nzqli em{margin-left:auto;font-style:normal;color:var(--muted);font-size:14px}
.nzqh{display:flex;justify-content:space-between;align-items:center;margin:16px 2px 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.nzqh button{border:0;background:none;color:#a8812e;font:inherit;font-size:13px;letter-spacing:0;text-transform:none}
.nzqgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.nzqf{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;width:100%;height:104px;border:0;border-radius:20px;background:var(--card,#fff);color:inherit;font:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05);padding:6px;text-align:center}
.nzqf b{font-size:26px;font-weight:400;line-height:1.1}.nzqf span{font-weight:700;font-size:14px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nzqf small{color:var(--muted);font-size:12px}.nzqf.add{border:1.5px dashed #C9A55E;background:transparent;box-shadow:none;color:#8a6420}
.nzqfw{position:relative}.nzqfw.hid{opacity:.45}.nzqfe{position:absolute;top:4px;right:4px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(0,0,0,.05);color:inherit;font-size:16px}
.nzqinfo{background:#fff8ea;border:1px solid #ecd9ac;border-radius:14px;padding:10px 12px;font-size:13.5px;line-height:1.4;color:#6b5320;margin:12px 0}.nzqempty{color:var(--muted);text-align:center;margin:26px 10px;line-height:1.45}
.nzqfind{margin:0 0 10px}
.nzqn{display:block!important;width:100%;text-align:left;margin-bottom:9px}.nzqnt{display:block;font-size:16px}.nzqnb{display:block;color:var(--muted);font-size:13.5px;margin-top:3px;line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.nzqnm{display:flex;gap:6px;flex-wrap:wrap;margin-top:7px}.nzqnm i{font-style:normal;font-size:12px;background:rgba(0,0,0,.05);border-radius:999px;padding:2px 8px}.nzqnm i.d{background:none;color:var(--muted);margin-left:auto}.nzqn.sm{padding:10px 14px!important}
.nzqol{padding:4px 14px!important}.nzqo{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--line)}.nzqo:last-child{border-bottom:0}.nzqo span,.nzqot{flex:1;min-width:0}.nzqot{border:0;background:none;color:inherit;font:inherit;text-align:left;padding:0}
.nzqo b{display:block;font-size:15px;font-weight:600}.nzqo small{display:block;color:var(--muted);font-size:12.5px;margin-top:2px}
.nzqcb{width:22px;height:22px;border-radius:7px;border:2px solid #b9c4b2;background:#fff;flex:none;margin-top:1px;color:#fff;font-size:13px;line-height:1;padding:0;display:grid;place-items:center}.nzqcb.y{background:var(--green,#2f6b3e);border-color:var(--green,#2f6b3e)}
.nzqtop{display:flex;gap:0}.nzqtop .iconbtn{font-size:19px;width:38px;min-width:38px}
.nzqtt{width:100%;min-height:1.3em;border:0;background:none;resize:none;font:600 26px Georgia,serif;color:inherit;padding:2px 0;margin:2px 0 8px;line-height:1.2;overflow:hidden;outline:none}
.nzqchips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}.nzqchips .chip,.nzqtagq .chip{border:1px solid var(--line);border-radius:999px;padding:6px 11px;font:inherit;font-size:13px;background:var(--card,#fff);color:inherit}.nzqchips .chip.g{border-color:#C9A55E;color:#8a6420;background:#fff8ea}
.nzqtagq{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.nzqci{display:flex;gap:10px;align-items:center;padding:5px 0}.nzqct{flex:1;min-width:0;border:0;border-bottom:1px solid transparent;background:none;font:inherit;font-size:15.5px;color:inherit;padding:4px 0;outline:none}.nzqct:focus{border-bottom-color:var(--line)}
.nzqci.dn .nzqct{text-decoration:line-through;color:var(--muted)}.nzqdue{border:0;background:none;font-size:12px;color:var(--muted);flex:none;padding:4px}.nzqdue.on{color:#a8812e;font-weight:700}
.nzqckadd{border:0;background:none;color:#8a6420;font:inherit;font-size:14.5px;padding:8px 0}
.nzqnh{font:600 18px Georgia,serif;color:var(--green,#2f6b3e);margin:12px 0 4px}.nzqbody{width:100%;min-height:140px;border:0;background:none;resize:none;font:inherit;font-size:15.5px;line-height:1.6;color:inherit;outline:none;padding:0;overflow:hidden}
.nzqed.big .nzqbody,.nzqed.big .nzqct{font-size:19px}
.nzqatt{display:flex;align-items:center;gap:8px;background:var(--card,#fff);border-radius:14px;padding:8px 10px;margin:10px 0}.nzqab{display:flex;align-items:center;gap:12px;flex:1;min-width:0;border:0;background:none;color:inherit;font:inherit;text-align:left;padding:0}
.nzqab b{display:block;font-size:14.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nzqab small{color:var(--muted);font-size:12px}.nzqpdf{width:36px;height:44px;border-radius:7px;background:var(--green,#2f6b3e);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700;flex:none}
.nzqth{width:56px;height:56px;border-radius:10px;background:#eee center/cover no-repeat;flex:none}
.nzqlk{display:flex;flex-wrap:wrap;gap:6px;align-items:center;background:rgba(47,107,62,.08);border-radius:12px;padding:9px 12px;font-size:13.5px;margin:6px 0}.nzqlki{display:inline-flex;align-items:center;background:var(--card,#fff);border-radius:999px;padding:2px 4px 2px 10px}
.nzqlkb{border:0;background:none;color:inherit;font:inherit;font-size:13.5px;padding:4px 0}.nzqlkb small{color:var(--muted)}.nzqlkx{border:0;background:none;color:var(--muted);font-size:16px;padding:2px 6px}
.nzqlkl{max-height:52vh;overflow:auto}.nzqmeta{color:var(--muted);font-size:12px;margin:14px 0 90px}
.nzqtb{position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 94px);z-index:30;display:flex;justify-content:space-around;background:var(--card,#fff);border-radius:18px;padding:6px 2px;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.nzqtb button{border:0;background:none;font-size:19px;color:inherit;padding:8px 6px;min-width:38px;border-radius:10px}.nzqtb button:first-child{font:700 17px Georgia,serif}.nzqtb button.on{background:#fdecea;color:#b03a2e}
html.rltyping .nzqtb{bottom:calc(env(safe-area-inset-bottom,0px) + 8px)}
.nzqdel{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:13.5px}.nzqdel button{border:1px solid var(--line);background:none;border-radius:999px;padding:6px 12px;font:inherit;color:inherit}
.nzqfp{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.nzqfp button{display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:12px 4px;font:inherit;font-size:13px;color:inherit}.nzqfp button b{font-size:22px;font-weight:400}.nzqfp button.on{border:2px solid var(--green,#2f6b3e)}
.nzqem{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px}.nzqem button{border:1px solid var(--line);background:var(--surface);border-radius:10px;font-size:20px;padding:6px 0}.nzqem button.on{border:2px solid var(--green,#2f6b3e)}
.nzqcol{display:flex;gap:10px}.nzqcol button{width:34px;height:34px;border-radius:50%;border:1px solid var(--line)}.nzqcol button.on{outline:3px solid var(--green,#2f6b3e);outline-offset:2px}
.nzqhide{display:flex;gap:8px;align-items:center;margin:12px 0 4px;font-size:15px}
`);
/* the core search lists notes as «cat notes» (Butler's old notes page, not in Docs) — each result opens its own note here */
Hooks.on('screen',h=>{try{if(typeof h!=='string'||!h.includes('data-act="cat" data-id="notes"'))return h;const N=nzqD();
 return h.replace(/<button class="row" data-act="cat" data-id="notes">([\s\S]*?)<\/button>/g,(a,inner)=>{const t=(inner.match(/<span class="t">([\s\S]*?)<\/span>/)||[])[1];const n=t!=null&&N.find(z=>z&&!z.del&&i(z.text)===t);
  return n?`<button class="row" data-act="nzqopen" data-id="${i(n.id)}">${inner.replace(/<span class="t">[\s\S]*?<\/span>/,`<span class="t">${i(nzqTitle(n))}</span>`)}</button>`:a.replace('data-act="cat" data-id="notes"','data-act="go" data-to="notiz"')})}catch(e){Hooks.err('nzqsearch',e);return h}});
/* the live search draws its results itself (not through the screen hook) and Docs hid the note rows — show them and open the note */
function nzqFixRows(){try{const B=document.querySelectorAll('button[data-act="cat"][data-id="notes"]');if(!B.length)return;const N=nzqD();
 B.forEach(b=>{const t=b.querySelector('.t'),n=t&&N.find(z=>z&&!z.del&&String(z.text||'')===t.textContent);b.hidden=!1;b.classList.remove('odoff');
  if(n){b.dataset.act='nzqopen';b.dataset.id=n.id;t.textContent=nzqTitle(n)}else{b.dataset.act='go';b.dataset.to='notiz'}})}catch(e){Hooks.err('nzqrows',e)}}
new MutationObserver(()=>nzqFixRows()).observe(document.body,{childList:!0,subtree:!0});
