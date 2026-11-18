/* ===== Butler Docs: Arbeit & Karriere, stage 2 (v30) =====
   - Each employer has fixed places for its papers: Arbeitsvertrag, Arbeitszeugnis, Kündigung/Aufhebung,
     Gehaltsabrechnungen, Lohnsteuerbescheinigung. «＋» on a place: scan/photo, a file, or a document already in
     «Dokumente». A new paper is saved ONCE in «Dokumente» and only linked here (j.docs + j.dk[docId]=place) — no copy.
   - Tab «Ausbildung & Abschlüsse»: school certificate (Attestat), Ausbildung, Studium, courses, certificates, each
     with its pages and, for foreign ones, «Anerkennung in Deutschland» (anerkannt / beantragt with a date → reminder).
   - «Bewerbungsmappe»: the user ticks what goes in (CV list, Zeugnisse, certificates …) and gets ONE PDF.
     Image pages are put in; a document that is only a PDF file cannot be put in and says so.
   Data: g.kar.tab ('job'|'edu'); g.kar.edu=[{id,t,kind,org,y,land,an,anDue,anTask,note,docs[]}]; job.dk={docId:slot} */
const KR2={
 tJob:['Работодатели','Arbeitgeber','Employers'],tEdu:['Образование и аттестаты','Ausbildung & Abschlüsse','Education & certificates'],
 unt:['Документы','Unterlagen','Papers'],of:['%a из %b','%a von %b','%a of %b'],more:['Другие документы','Weitere Unterlagen','Other papers'],
 s_vertrag:['Трудовой договор','Arbeitsvertrag','Employment contract'],s_zeugnis:['Arbeitszeugnis','Arbeitszeugnis','Reference (Zeugnis)'],
 s_kuend:['Увольнение / соглашение','Kündigung / Aufhebung','Termination'],s_gehalt:['Расчётные листы','Gehaltsabrechnungen','Payslips'],s_lst:['Lohnsteuerbescheinigung','Lohnsteuerbescheinigung','Wage tax certificate'],
 h_vertrag:['подписанный договор','unterschriebener Vertrag','signed contract'],h_zeugnis:['промежуточный или итоговый','Zwischen- oder Endzeugnis','interim or final'],h_kuend:['если есть','falls vorhanden','if any'],h_gehalt:['по месяцам','Monat für Monat','month by month'],h_lst:['для налоговой','für die Steuer','for the tax return'],
 addT:['%s — добавить','%s hinzufügen','Add %s'],once:['Сохраняется один раз в «Документах» и здесь только привязывается — без копии.','Wird einmal in «Dokumente» gespeichert und hier verknüpft – keine Kopie.','Saved once in «Documents» and linked here – no copy.'],
 cam:['Сканировать / сфотографировать','Scannen / Fotografieren','Scan / take a photo'],camS:['можно несколько страниц','mehrere Seiten möglich','several pages possible'],
 file:['Выбрать файл','Datei wählen','Pick a file'],fileS:['PDF или фото из «Файлов»','PDF oder Bild aus «Dateien»','PDF or picture from Files'],
 have:['Уже есть в «Документах»','Schon in «Dokumente»','Already in «Documents»'],haveS:['нажать = привязать','antippen = verknüpfen','tap = link'],find:['Поиск …','Suchen …','Search …'],fits:['подходит','passt','fits'],noHave:['Документов пока нет','Noch keine Dokumente','No documents yet'],
 linked:['Привязано ✓','Verknüpft ✓','Linked ✓'],saved:['Сохранено в «Документах» и привязано ✓','In «Dokumente» gespeichert und verknüpft ✓','Saved in «Documents» and linked ✓'],
 open:['Открыть','Öffnen','Open'],unlink:['Отвязать','Lösen','Unlink'],unlinkS:['Документ останется в «Документах».','Das Dokument bleibt in «Dokumente».','The document stays in «Documents».'],addMore:['＋ Ещё документ','＋ Weiteres Dokument','＋ Another document'],
 eAdd:['＋ Аттестат или диплом','＋ Abschluss hinzufügen','＋ Add a qualification'],eEmpty:['Школьный аттестат, Ausbildung, диплом, курсы, сертификаты — всё в одном месте и под рукой для заявлений.','Schulabschluss, Ausbildung, Studium, Kurse, Zertifikate – alles an einem Ort und griffbereit für Bewerbungen.','School, training, degree, courses, certificates – all in one place for applications.'],
 k_school:['Школьный аттестат','Schulabschluss / Attestat','School certificate'],k_ausb:['Ausbildung','Ausbildung','Vocational training'],k_stud:['Высшее / диплом','Studium / Diplom','Degree'],k_kurs:['Курс / повышение квалификации','Weiterbildung / Kurs','Course'],k_zert:['Сертификат / права','Zertifikat / Schein','Certificate / licence'],
 eKind:['Вид','Art','Kind'],eT:['Название','Bezeichnung','Title'],eOrg:['Школа / учебное заведение','Schule / Einrichtung','School / institution'],eY:['Год','Jahr','Year'],eLand:['Страна','Land','Country'],
 an:['Признание в Германии','Anerkennung in Deutschland','Recognition in Germany'],an_:['— (немецкий документ)','— (deutscher Abschluss)','— (German qualification)'],an_ok:['Признан ✓','Anerkannt ✓','Recognised ✓'],an_req:['Подано заявление','Beantragt','Applied for'],an_no:['Ещё не подано','Noch nicht beantragt','Not applied yet'],
 anDue:['Ответ / срок до','Antwort / Frist bis','Answer / deadline by'],anTask:['Признание: %t','Anerkennung: %t','Recognition: %t'],anHint:['Признание иностранных документов: anerkennung-in-deutschland.de','Ausländische Abschlüsse: anerkennung-in-deutschland.de','Foreign qualifications: anerkennung-in-deutschland.de'],
 eDocs:['Страницы и документы','Seiten & Unterlagen','Pages & papers'],eDocsNew:['Документы можно добавить после сохранения.','Unterlagen können Sie nach dem Speichern hinzufügen.','You can add papers after saving.'],needT:['Впишите название','Bitte eine Bezeichnung eintragen','Please enter a title'],
 badMon:['Дата в виде ММ.ГГГГ, например 02.2026','Datum als MM.JJJJ, z. B. 02.2026','Date as MM.YYYY, e.g. 02.2026'],
 mappe:['Bewerbungsmappe (PDF)','Bewerbungsmappe (PDF)','Application folder (PDF)'],mT:['Bewerbungsmappe','Bewerbungsmappe','Application folder'],mS:['Что войдёт в PDF? Оригиналы не меняются.','Was soll in die PDF? Die Originale bleiben unverändert.','What goes into the PDF? The originals stay unchanged.'],
 cv:['Резюме (профессиональный путь)','Lebenslauf (Werdegang)','CV (career)'],pp:['%n стр.','%n S.','%n p.'],onlyPdf:['PDF-файл — в папку не вставляется','PDF-Datei – nicht einfügbar','PDF file – cannot be inserted'],noPg:['без страниц','ohne Seiten','no pages'],
 mGo:['Создать PDF · %n стр.','PDF erstellen · %n Seiten','Make the PDF · %n pages'],mNone:['Отметьте хотя бы одно','Bitte mindestens eins wählen','Please tick at least one'],mBusy:['Собираю PDF …','PDF wird erstellt …','Making the PDF …'],
 mAfter:['Потом: отправить через вашу почту или сохранить в «Файлах»','Danach: per E-Mail (Ihre E-Mail) senden oder in «Dateien» sichern','Then: send by your own e-mail or keep in Files']};
const krt2=(k,o)=>{let s=cv5n(KR2[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const KR_SLOT=[['vertrag','📄'],['zeugnis','🏅'],['kuend','✉️'],['gehalt','💶'],['lst','🧾']];
const KR_EK=[['school','🎓'],['ausb','🛠'],['stud','📜'],['kurs','📚'],['zert','🏷']];
/* dates as MM.JJJJ: "2026-02" ⇄ "02.2026"; a bare year stays a year */
const krMonIn=k=>{if(!k)return'';const[y,mo]=String(k).split('-');return mo?`${mo}.${y}`:y};
function krMonParse(t){t=String(t||'').trim();if(!t)return'';let r=t.match(/^(\d{1,2})\s*[./\-\s]\s*(\d{4})$/);if(r&&+r[1]>=1&&+r[1]<=12)return`${r[2]}-${String(r[1]).padStart(2,'0')}`;
 r=t.match(/^(\d{4})-(\d{1,2})$/);if(r&&+r[2]>=1&&+r[2]<=12)return`${r[1]}-${String(r[2]).padStart(2,'0')}`;if(/^(19|20)\d{2}$/.test(t))return t;return null}
/* which place a document belongs to, guessed from its title for papers linked before v30 */
const krGuess=d=>{const t=String(d&&d.title||'').toLowerCase();return/lohnsteuer/.test(t)?'lst':/zeugnis/.test(t)?'zeugnis':/kündigung|kuendigung|aufhebung/.test(t)?'kuend':/gehalt|lohn|entgelt|abrechnung|зарплат|расч/.test(t)?'gehalt':/vertrag|договор/.test(t)?'vertrag':''};
function krDk(j){j.dk=j.dk&&typeof j.dk==='object'?j.dk:{};(j.docs||[]).forEach(id=>{if(j.dk[id]==null){const d=krDocs([id])[0];if(d)j.dk[id]=krGuess(d)}});return j.dk}
const krPg=d=>(d&&d.pages||[]).length;
function krSlotsHtml(j){const dk=krDk(j),D=krDocs(j.docs),by=k=>D.filter(d=>dk[d.id]===k),filled=KR_SLOT.filter(([k])=>by(k).length).length,rest=D.filter(d=>!KR_SLOT.some(([k])=>k===dk[d.id]));
 return`<h3 class="odh">${i(krt2('unt'))}</h3><div class="dhcard krslots"><div class="krprog"><span>${i(krt2('of',{a:filled,b:KR_SLOT.length}))}</span><div><i style="width:${Math.round(filled/KR_SLOT.length*100)}%"></i></div></div>
 ${KR_SLOT.map(([k,e])=>{const L2=by(k);return`<button type="button" class="krslot ${L2.length?'ok':'no'}" data-act="krslot" data-j="${i(j.id)}" data-k="${k}"><span class="krsi">${e}</span><span class="krst"><b>${i(krt2('s_'+k))}</b><small>${i(L2.length?L2.map(d=>d.title||'—').join(', '):krt2('h_'+k))}</small></span><em>${L2.length?'✓'+(L2.length>1?' '+L2.length:''):'＋'}</em></button>`}).join('')}</div>
 ${rest.length?`<h3 class="odh">${i(krt2('more'))}</h3><div class="dhcard odl">${rest.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-act="dzopen" data-id="${i(d.id)}">${dhi('fld')}<span><b>${i(d.title||'—')}</b>${d.date?`<small>${i(vA(d.date))}</small>`:''}</span></button><button type="button" class="bsvsm x" data-act="krdocx" data-j="${i(j.id)}" data-id="${i(d.id)}" aria-label="×">×</button></div>`).join('')}</div>`:''}`}
/* the target of an «add»: a place of an employer, or a qualification */
const krTgt=t=>t.e?(krD().edu||[]).find(z=>z.id===t.e):krJob(t.j);
function krLink(t,id){const o=krTgt(t);if(!o)return;o.docs=o.docs||[];if(!o.docs.includes(id))o.docs.push(id);if(!t.e){krDk(o);o.dk[id]=t.k}$()}
function krFolder(){try{const F=Ke().folders||[],nm=f=>{try{return String(Ri(f)||f.name||'')}catch{return String(f.name||'')}};const w=F.find(f=>!f.sp&&/arbeit|beruf|job|work|работ|karriere/i.test(nm(f)));return(w||F.find(f=>!f.sp)||{}).id}catch{return void 0}}
async function krNewDoc(files,title,party){const n=gt({id:V(),title:String(title||'').slice(0,100),kind:'other',party:party||'',start:'',end:'',notice:'',note:'',files:[],pages:[],ts:Date.now()});
 n.folder=krFolder();n.date=x(new Date());Ke().items.push(n);$();const img=files.filter(f=>/^image\//.test(f.type)||/\.(jpe?g|png|heic|heif|webp)$/i.test(f.name||'')),oth=files.filter(f=>!img.includes(f));
 if(img.length)await xo(n,img,'orig','');for(const f of oth)try{await Cr(n,f)}catch(e){Hooks.err('krcr',e)}n.ts=Date.now();$();try{bsvQuiet()}catch{}return n}
function krAddSheet(t){const o=krTgt(t);if(!o)return;const lab=t.e?o.t:krt2('s_'+t.k),party=t.e?(o.org||''):(o.co||''),ttl=t.e?o.t:`${krt2('s_'+t.k)} ${o.co||''}`.trim();
 let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!(o.docs||[]).includes(d.id))}catch{}const words=String(party).toLowerCase().split(/\s+/).filter(w=>w.length>=4);
 const fit=d=>{const s=[d.title,d.party].filter(Boolean).join(' ').toLowerCase();return words.some(w=>s.includes(w))||(!t.e&&krGuess(d)===t.k)};
 D.sort((a,b)=>(fit(b)-fit(a))||((b.ts||0)-(a.ts||0)));
 const row=d=>`<button type="button" class="krhv" data-kh="${i(d.id)}" data-s="${i([d.title,d.party].filter(Boolean).join(' ').toLowerCase())}"><span>📄 ${i(d.title||'—')}${d.party?` <small>· ${i(d.party)}</small>`:''}</span>${fit(d)?`<em>${i(krt2('fits'))}</em>`:''}</button>`;
 const done=async(files)=>{if(!files||!files.length)return;try{const n=await krNewDoc(files,ttl,party);krLink(t,n.id);T(krt2('saved'));krAfter(t)}catch(e){Hooks.err('kradd',e);T(String(e&&e.message||e))}};
 H(krt2('addT',{s:lab}),`<p class="fdsmall">${i(krt2('once'))}</p>
 <button type="button" class="kropt" data-ko="cam"><span>📷</span><span><b>${i(krt2('cam'))}</b><small>${i(krt2('camS'))}</small></span></button>
 <button type="button" class="kropt" data-ko="file"><span>📄</span><span><b>${i(krt2('file'))}</b><small>${i(krt2('fileS'))}</small></span></button>
 <div class="kropt krhave"><span>🗂</span><span><b>${i(krt2('have'))}</b><small>${i(krt2('haveS'))}</small></span></div>
 ${D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}" autocomplete="off"><div class="krhl">${D.slice(0,60).map(row).join('')}</div>`:`<p class="dhnone">${i(krt2('noHave'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');sh.querySelector('[data-ko=cam]').onclick=()=>{sh.remove();try{scOpen({multi:!0,saveLabel:krt('save'),done:files=>done(files)})}catch(e){Hooks.err('krscan',e)}};
  sh.querySelector('[data-ko=file]').onclick=()=>{const e=document.createElement('input');e.type='file';e.multiple=!0;e.accept='image/*,application/pdf';e.onchange=()=>{sh.remove();done([...(e.files||[])])};e.click()};
  const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-kh]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-kh]').forEach(b=>b.onclick=()=>{krLink(t,b.dataset.kh);sh.remove();T(krt2('linked'));krAfter(t)})})}
/* after adding: an employer redraws; a qualification reopens its sheet */
function krAfter(t){if(t.e)krEduSheet(t.e);else v()}
function krSlotSheet(jid,k){const j=krJob(jid);if(!j)return;const dk=krDk(j),L2=krDocs(j.docs).filter(d=>dk[d.id]===k);if(!L2.length){krAddSheet({j:jid,k});return}
 H(krt2('s_'+k),`<div class="dhcard odl">${L2.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-act="dzopen" data-id="${i(d.id)}" data-x="1">📄<span><b>${i(d.title||'—')}</b><small>${i([d.date?vA(d.date):'',krPg(d)?krt2('pp',{n:krPg(d)}):''].filter(Boolean).join(' · '))}</small></span></button><button type="button" class="bsvsm x" data-ku="${i(d.id)}" aria-label="${i(krt2('unlink'))}">×</button></div>`).join('')}</div>
 <p class="fdsmall">× = ${i(krt2('unlink'))}. ${i(krt2('unlinkS'))}</p><button type="button" class="dcadd gold" data-kadd>${i(krt2('addMore'))}</button>`,
 sh=>{sh.classList.add('bsvsh');sh.querySelector('[data-kadd]').onclick=()=>{sh.remove();krAddSheet({j:jid,k})};
  sh.querySelectorAll('[data-ku]').forEach(b=>b.onclick=()=>{const id=b.dataset.ku;j.docs=(j.docs||[]).filter(z=>z!==id);delete dk[id];$();sh.remove();v();krSlotSheet(jid,k)})})}
/* ---------- Ausbildung & Abschlüsse ---------- */
const krEdu=()=>{const o=krD();if(!Array.isArray(o.edu))o.edu=[];return o.edu};
const krTabs=()=>{const t=krD().tab==='edu'?'edu':'job';return`<div class="fztabs krtabs"><button type="button" class="${t==='job'?'on':''}" data-act="krtab" data-k="job">${i(krt2('tJob'))}</button><button type="button" class="${t==='edu'?'on':''}" data-act="krtab" data-k="edu">${i(krt2('tEdu'))}</button></div>`};
const krMappeBtn=()=>(krD().jobs.length||krEdu().length)?`<button type="button" class="fzpdf krmb" data-act="krmappe">📎 ${i(krt2('mappe'))}</button>`:'';
const krAnPill=e=>e.an==='ok'?`<span class="krpill ok">${i(krt2('an_ok'))}</span>`:e.an==='req'?`<span class="krpill wait">${i(krt2('an_req'))}${e.anDue?' · '+i(vA(e.anDue)):''}</span>`:e.an==='no'?`<span class="krpill wait">${i(krt2('an_no'))}</span>`:'';
function krEduList(){const E=krEdu().slice().sort((a,b)=>String(b.y||'').localeCompare(String(a.y||'')));
 return`<div class="screen dhome fz kar"><div class="sub-hdr"><button class="iconbtn" data-act="fzback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(krt('kar'))}</h2></div><span></span></div>${krTabs()}
 ${E.length?E.map(e=>{const D=krDocs(e.docs),pg=D.reduce((a,d)=>a+krPg(d),0),em=(KR_EK.find(z=>z[0]===e.kind)||KR_EK[0])[1];
  return`<button type="button" class="dhcard kred" data-act="kredu" data-id="${i(e.id)}"><span class="kre">${em}</span><span><b>${i(e.t)}</b><small>${i([e.org,e.land,e.y,D.length?(pg?krt2('pp',{n:pg}):'📄 '+D.length)+' ✓':''].filter(Boolean).join(' · '))}</small>${krAnPill(e)}</span></button>`}).join(''):`<div class="dhcard"><p class="dhnone">${i(krt2('eEmpty'))}</p></div>`}
 <button type="button" class="dcadd gold" data-act="kredu">${i(krt2('eAdd'))}</button>${krMappeBtn()}</div>`}
function krEduSheet(id){const e0=id&&krEdu().find(z=>z.id===id),e=e0?JSON.parse(JSON.stringify(e0)):{t:'',kind:'school',org:'',y:'',land:'',an:'',anDue:'',note:''};
 const D=e0?krDocs(e0.docs):[];
 H(e0?e0.t:krt2('eAdd').replace(/^＋\s*/,''),`<div class="bsvys"><label class="bsvl">${i(krt2('eKind'))}</label><select class="field" data-ef="kind">${KR_EK.map(([k,em])=>`<option value="${k}" ${e.kind===k?'selected':''}>${em} ${i(krt2('k_'+k))}</option>`).join('')}</select>
  <label class="bsvl">${i(krt2('eT'))}</label><input class="field" data-ef="t" value="${i(e.t)}" autocomplete="off">
  <label class="bsvl">${i(krt2('eOrg'))}</label><input class="field" data-ef="org" value="${i(e.org||'')}" autocomplete="off">
  <div class="bsv2c krdates"><div><label class="bsvl">${i(krt2('eY'))}</label><input class="field" data-ef="y" inputmode="numeric" maxlength="4" placeholder="JJJJ" value="${i(e.y||'')}"></div><div><label class="bsvl">${i(krt2('eLand'))}</label><input class="field" data-ef="land" value="${i(e.land||'')}" autocomplete="off"></div></div>
  <label class="bsvl">${i(krt2('an'))}</label><select class="field" data-ef="an">${['','ok','req','no'].map(k=>`<option value="${k}" ${e.an===k?'selected':''}>${i(krt2('an_'+k))}</option>`).join('')}</select>
  <div class="kranD" ${e.an==='req'?'':'hidden'}><label class="bsvl">${i(krt2('anDue'))}</label><input class="field" type="date" data-ef="anDue" value="${i(e.anDue||'')}"></div><p class="fdsmall krhint" ${e.an&&e.an!=='ok'?'':'hidden'}>ⓘ ${i(krt2('anHint'))}</p>
  <label class="bsvl">${i(krt2('eDocs'))}</label>${e0?`${D.length?`<div class="dhcard odl">${D.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-act="dzopen" data-id="${i(d.id)}" data-x="1">📄<span><b>${i(d.title||'—')}</b><small>${i(krPg(d)?krt2('pp',{n:krPg(d)}):'')}</small></span></button><button type="button" class="bsvsm x" data-eu="${i(d.id)}" aria-label="×">×</button></div>`).join('')}</div>`:''}<button type="button" class="bsvplus" data-eadd>${i(krt2('addMore'))}</button>`:`<p class="fdsmall">${i(krt2('eDocsNew'))}</p>`}
  <label class="bsvl">${i(krt('note'))}</label><textarea class="field" data-ef="note" rows="2">${i(e.note||'')}</textarea>
  <small class="verr" data-eerr></small><button type="button" class="dcadd gold" data-esave>${i(krt('save'))}</button>${e0?`<button type="button" class="bsvdel" data-edel>${i(krt('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh');let arm=0;const an=sh.querySelector('[data-ef=an]');an.onchange=()=>{sh.querySelector('.kranD').hidden=an.value!=='req';sh.querySelector('.krhint').hidden=!an.value||an.value==='ok'};
  const read=()=>sh.querySelectorAll('[data-ef]').forEach(z=>{e[z.dataset.ef]=z.value.trim()});
  const ea=sh.querySelector('[data-eadd]');ea&&(ea.onclick=()=>{read();Object.assign(e0,e);$();sh.remove();krAddSheet({e:e0.id})});
  sh.querySelectorAll('[data-eu]').forEach(b=>b.onclick=()=>{e0.docs=(e0.docs||[]).filter(z=>z!==b.dataset.eu);$();sh.remove();v();krEduSheet(e0.id)});
  sh.querySelector('[data-esave]').onclick=()=>{read();if(!e.t){sh.querySelector('[data-eerr]').textContent=krt2('needT');return}if(e.an!=='req')e.anDue='';
   let o=e0;if(o)Object.assign(o,e);else{o=Object.assign(e,{id:V(),docs:[]});krEdu().push(o)}krAnTask(o);$();try{bsvQuiet()}catch{}sh.remove();v();if(!e0)krEduSheet(o.id)};
  const dl=sh.querySelector('[data-edel]');dl&&(dl.onclick=()=>{if(!arm){arm=1;dl.textContent=krt('delQ');dl.classList.add('on');return}krD().edu=krEdu().filter(z=>z.id!==id);$();sh.remove();v()})})}
/* a «beantragt» recognition with a date becomes one task in «Aufgaben» (kept in step when the date changes) */
function krAnTask(o){try{g.tasks=g.tasks||[];let t=o.anTask&&g.tasks.find(z=>z.id===o.anTask);if(o.an==='req'&&o.anDue){if(!t){t={id:V(),t:'',due:'',time:'',prio:1,proj:'',done:!1};g.tasks.push(t);o.anTask=t.id}t.t=krt2('anTask',{t:o.t});t.due=o.anDue}
 else if(t&&!t.done){g.tasks=g.tasks.filter(z=>z!==t);delete o.anTask}}catch(e){Hooks.err('kranTask',e)}}
/* ---------- Bewerbungsmappe ---------- */
function krMappe(){const J=krD().jobs.slice().sort((a,b)=>String(b.from||'').localeCompare(String(a.from||''))),E=krEdu(),rows=[];
 rows.push({id:'cv',t:krt2('cv'),pg:1,on:1});
 J.forEach(j=>{const dk=krDk(j);krDocs(j.docs).forEach(d=>rows.push({id:d.id,t:`${d.title||'—'}`,pg:krPg(d),on:dk[d.id]==='zeugnis'?1:0,pdf:!krPg(d),fl:(d.files||[]).length}))});
 E.forEach(e=>krDocs(e.docs).forEach(d=>{if(!rows.some(r=>r.id===d.id))rows.push({id:d.id,t:d.title||e.t,pg:krPg(d),on:1,pdf:!krPg(d),fl:(d.files||[]).length})}));
 rows.forEach(r=>{if(r.pdf)r.on=0});
 const sum=sh=>[...sh.querySelectorAll('[data-km]:checked')].reduce((a,b)=>a+(+b.dataset.pg||0),0);
 H(krt2('mT'),`<p class="fdsmall">${i(krt2('mS'))}</p><div class="krml">${rows.map(r=>`<label class="krmr ${r.pdf?'off':''}"><input type="checkbox" data-km="${i(r.id)}" data-pg="${r.pg}" ${r.on?'checked':''} ${r.pdf?'disabled':''}><span>${i(r.t)}</span><small>${i(r.pdf?(r.fl?krt2('onlyPdf'):krt2('noPg')):krt2('pp',{n:r.pg}))}</small></label>`).join('')}</div>
  <small class="verr" data-merr></small><button type="button" class="dcadd gold" data-mgo></button><p class="fdsmall" style="text-align:center">${i(krt2('mAfter'))}</p>`,
 sh=>{sh.classList.add('bsvsh');const go=sh.querySelector('[data-mgo]'),upd=()=>{go.textContent=krt2('mGo',{n:sum(sh)})};upd();sh.addEventListener('change',upd);
  go.onclick=async()=>{const sel=[...sh.querySelectorAll('[data-km]:checked')].map(b=>b.dataset.km);if(!sel.length){sh.querySelector('[data-merr]').textContent=krt2('mNone');return}
   go.disabled=!0;go.textContent=krt2('mBusy');try{await krMappePdf(sel);sh.remove()}catch(e){Hooks.err('krmappe',e);go.disabled=!1;upd()}}})}
function krCvPages(){const J=krD().jobs.slice().sort((a,b)=>String(b.from||'').localeCompare(String(a.from||'')));
 const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=140,W2=FZ_W-ml-120;
 const wrap=(t,f)=>{x2.font=f;const out=[];let line='';for(const w of String(t).split(/(\s+)/)){if(x2.measureText(line+w).width>W2&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line);return out};
 const put=(t,o)=>{o=o||{};const f=`${o.b?'bold ':''}${o.s||26}px Georgia, serif`;for(const l of wrap(t,f)){if(yy>FZ_H-140){[c,x2]=fzPage();P.push(c);yy=140}x2.font=f;x2.fillStyle=o.c||'#000';x2.fillText(l,ml+(o.x||0),yy);yy+=o.h||38}};
 let me={};try{me=ja()}catch{}put(krt('cvT'),{b:1,s:40,h:58});put([me.first,me.last].filter(Boolean).join(' '),{s:26,h:56});
 for(const j of J){put(krPer(j),{s:22,c:'#555',h:32});put(j.co+(j.role?' — '+j.role:''),{b:1,s:28,h:42});if(j.note)put(j.note,{s:22,x:20,h:32});
  for(const p of (j.proj||[])){put('• '+p.t+(p.y?' ('+p.y+')':''),{b:1,s:23,x:20,h:34});if(p.what)put(p.what,{s:22,x:44,h:32});if(p.res)put(krt('res')+': '+p.res,{s:22,x:44,h:32})}yy+=20}
 const E=krEdu().slice().sort((a,b)=>String(b.y||'').localeCompare(String(a.y||'')));if(E.length){yy+=10;put(krt2('tEdu'),{b:1,s:30,h:46});
  for(const e of E){put([e.y,e.land].filter(Boolean).join(' · '),{s:22,c:'#555',h:32});put(e.t+(e.org?' — '+e.org:''),{b:1,s:26,h:40});if(e.an==='ok')put(krt2('an_ok'),{s:22,x:20,h:32});yy+=12}}
 return P}
async function krMappePdf(sel){const P=[];if(sel.includes('cv'))P.push(...krCvPages());
 for(const id of sel){if(id==='cv')continue;const d=krDocs([id])[0];if(!d)continue;let k=0;for(const pg of (d.pages||[])){k++;try{const b=await ni(pg);if(!b)continue;const im=new Image();
  await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src='data:'+(pg.type||'image/jpeg')+';base64,'+b});const[pc,px]=fzPage();P.push(pc);
  const s=Math.min((FZ_W-120)/im.width,(FZ_H-120)/im.height);px.drawImage(im,(FZ_W-im.width*s)/2,(FZ_H-im.height*s)/2,im.width*s,im.height*s)}catch(e){Hooks.err('krmimg',e)}}}
 if(!P.length)return;const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=krt2('mT')+'.pdf',f=new File([blob],name,{type:'application/pdf'});window.__krMappe={pages:P.length,size:blob.size};
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
Hooks.act('krslot',d=>krSlotSheet(d.j,d.k));Hooks.act('krtab',d=>{krD().tab=d.k==='edu'?'edu':'job';$();v()});Hooks.act('kredu',d=>krEduSheet(d&&d.id));Hooks.act('krmappe',()=>krMappe());
Hooks.css('docs-karriere-2',`
.krtabs{margin:0 0 12px}.krslots{padding:10px 14px!important}.krprog{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);margin:2px 0 4px}.krprog div{flex:1;height:7px;border-radius:9px;background:rgba(0,0,0,.07);overflow:hidden}.krprog i{display:block;height:100%;background:#C9A55E;border-radius:9px}
.krslot{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:0;border-bottom:1px solid var(--line);background:none;padding:11px 0;color:inherit;font:inherit}.krslot:last-child{border-bottom:0}
.krsi{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-size:19px;flex:none;background:rgba(201,165,94,.14)}.krslot.ok .krsi{background:rgba(47,107,62,.12)}
.krst{flex:1;min-width:0}.krst b{display:block;font-size:15.5px}.krst small{display:block;color:var(--muted);font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.krslot em{font-style:normal;font-weight:700;flex:none}.krslot.ok em{color:var(--green,#2f6b3e)}.krslot.no em{color:#a8812e;border:1.5px solid #C9A55E;border-radius:999px;width:30px;height:30px;display:grid;place-items:center;font-size:17px}
.kradd .kropt{display:flex;gap:12px;align-items:center;width:100%;text-align:left;border:1px solid var(--line);background:var(--surface);border-radius:16px;padding:13px 14px;margin:0 0 8px;color:inherit;font:inherit}
.kradd .kropt>span:first-child{font-size:22px;flex:none}.kradd .kropt b{display:block;font-size:15.5px}.kradd .kropt small{display:block;color:var(--muted);font-size:12.5px}.kradd .krhave{border:0;background:none;padding:8px 2px 4px;margin:0}
.krfind{margin:0 0 6px}.krhl{display:flex;flex-direction:column;max-height:30vh;overflow:auto;background:var(--surface);border-radius:14px;padding:2px 12px}
.krhv{display:flex;justify-content:space-between;gap:8px;align-items:center;text-align:left;border:0;border-bottom:1px solid var(--line);background:none;padding:10px 0;color:inherit;font:inherit;font-size:14.5px}.krhv:last-child{border:0}.krhv small{color:var(--muted)}.krhv em{font-style:normal;color:var(--green,#2f6b3e);font-weight:700;font-size:13px;flex:none}
.kred{display:flex!important;gap:12px;align-items:flex-start;width:100%;text-align:left;margin-bottom:10px}.kre{font-size:24px;flex:none}.kred b{display:block;font-size:16px}.kred small{display:block;color:var(--muted);font-size:13px;margin-top:2px}
.krpill{display:inline-block;margin-top:6px;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px}.krpill.ok{background:rgba(47,107,62,.12);color:var(--green,#2f6b3e)}.krpill.wait{background:#fff3dc;color:#a86b14}
.krmb{margin-top:10px}.krml{display:flex;flex-direction:column;gap:7px;max-height:46vh;overflow:auto;margin-bottom:6px}
.krmr{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:11px 12px;font-size:14.5px}.krmr span{flex:1;min-width:0}.krmr small{color:var(--muted);font-size:12px;flex:none}.krmr.off{opacity:.55}
.krmr input{width:20px;height:20px;flex:none;accent-color:#2f6b3e}
.bsvsh .bsv2c{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px}.bsvsh .bsv2c>div{min-width:0}.bsvsh .bsv2c .field{width:100%;min-width:0;box-sizing:border-box}
`);
