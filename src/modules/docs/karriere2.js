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
 return`${krFristHtml(j)}<h3 class="odh">${i(krt2('unt'))}</h3><div class="dhcard krslots"><div class="krprog"><span>${i(krt2('of',{a:filled,b:KR_SLOT.length}))}</span><div><i style="width:${Math.round(filled/KR_SLOT.length*100)}%"></i></div></div>
 ${KR_SLOT.map(([k,e])=>{const L2=by(k);return`<button type="button" class="krslot ${L2.length?'ok':'no'}" data-act="krslot" data-j="${i(j.id)}" data-k="${k}"><span class="krsi">${e}</span><span class="krst"><b>${i(krt2('s_'+k))}</b><small>${i(L2.length?L2.map(d=>d.title||'—').join(', '):krt2('h_'+k))}</small></span><em>${L2.length?'✓'+(L2.length>1?' '+L2.length:''):'＋'}</em></button>`}).join('')}</div>
 ${rest.length?`<h3 class="odh">${i(krt2('more'))}</h3><div class="dhcard odl">${rest.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-act="dzopen" data-id="${i(d.id)}">${dhi('fld')}<span><b>${i(d.title||'—')}</b>${d.date?`<small>${i(vA(d.date))}</small>`:''}</span></button><button type="button" class="bsvsm x" data-act="krdocx" data-j="${i(j.id)}" data-id="${i(d.id)}" aria-label="×">×</button></div>`).join('')}</div>`:''}`}
/* the target of an «add»: a place of an employer, or a qualification */
const krTgt=t=>t.e?(krD().edu||[]).find(z=>z.id===t.e):krJob(t.j);
function krLink(t,id){const o=krTgt(t);if(!o)return;o.docs=o.docs||[];if(!o.docs.includes(id))o.docs.push(id);if(!t.e){krDk(o);o.dk[id]=t.k}$()}
function krFolder(){try{const F=Ke().folders||[],nm=f=>{try{return String(Ri(f)||f.name||'')}catch{return String(f.name||'')}};const w=F.find(f=>!f.sp&&/arbeit|beruf|job|work|работ|karriere/i.test(nm(f)));return(w||F.find(f=>!f.sp)||{}).id}catch{return void 0}}
async function krNewDoc(files,title,party){const n=gt({id:V(),title:String(title||'').slice(0,100),kind:'other',party:party||'',start:'',end:'',notice:'',note:'',files:[],pages:[],ts:Date.now()});
 n.folder=krFolder();n.date=x(new Date());Ke().items.push(n);try{bsvQuiet()}catch{}$();const img=files.filter(f=>/^image\//.test(f.type)||/\.(jpe?g|png|heic|heif|webp)$/i.test(f.name||'')),oth=files.filter(f=>!img.includes(f));
 if(img.length)await xo(n,img,'orig','');for(const f of oth)try{await Cr(n,f)}catch(e){Hooks.err('krcr',e)}n.ts=Date.now();try{bsvQuiet()}catch{}$();return n}
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
 ${!t.e&&t.k==='zeugnis'?`<button type="button" class="btn krzsb" data-kgo="krzs" data-j="${i(t.j)}">ⓘ ${i(krt3('zs'))}</button>`:''}
 ${D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}" autocomplete="off"><div class="krhl">${D.slice(0,60).map(row).join('')}</div>`:`<p class="dhnone">${i(krt2('noHave'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');sh.querySelector('[data-ko=cam]').onclick=()=>{sh.remove();try{scOpen({multi:!0,saveLabel:krt('save'),done:files=>done(files)})}catch(e){Hooks.err('krscan',e)}};
  sh.querySelector('[data-ko=file]').onclick=()=>{const e=document.createElement('input');e.type='file';e.multiple=!0;e.accept='image/*,application/pdf';e.onchange=()=>{sh.remove();done([...(e.files||[])])};e.click()};
  const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-kh]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-kh]').forEach(b=>b.onclick=()=>{krLink(t,b.dataset.kh);sh.remove();T(krt2('linked'));krAfter(t)})})}
/* after adding: an employer redraws; a qualification reopens its sheet */
function krAfter(t){if(t.e)krEduSheet(t.e);else v()}
function krSlotSheet(jid,k){const j=krJob(jid);if(!j)return;const dk=krDk(j),L2=krDocs(j.docs).filter(d=>dk[d.id]===k);if(!L2.length){krAddSheet({j:jid,k});return}
 H(krt2('s_'+k),`<div class="dhcard odl">${L2.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i([d.date?vA(d.date):'',krPg(d)?krt2('pp',{n:krPg(d)}):''].filter(Boolean).join(' · '))}</small></span></button><button type="button" class="bsvsm x" data-ku="${i(d.id)}" aria-label="${i(krt2('unlink'))}">×</button></div>`).join('')}</div>
 <p class="fdsmall">× = ${i(krt2('unlink'))}. ${i(krt2('unlinkS'))}</p><button type="button" class="dcadd gold" data-kadd>${i(krt2('addMore'))}</button>${k==='zeugnis'?`<button type="button" class="btn krzsb" data-kgo="krzs" data-j="${i(jid)}">ⓘ ${i(krt3('zs'))}</button>`:''}`,
 sh=>{sh.classList.add('bsvsh');sh.querySelector('[data-kadd]').onclick=()=>{sh.remove();krAddSheet({j:jid,k})};
  sh.querySelectorAll('[data-ku]').forEach(b=>b.onclick=()=>{const id=b.dataset.ku;j.docs=(j.docs||[]).filter(z=>z!==id);delete dk[id];$();sh.remove();v();krSlotSheet(jid,k)})})}
/* ---------- Ausbildung & Abschlüsse ---------- */
const krEdu=()=>{const o=krD();if(!Array.isArray(o.edu))o.edu=[];return o.edu};
const krTabs=()=>{const bz=!0,t=krD().tab==='edu'?'edu':krD().tab==='biz'&&bz?'biz':'job';return`<div class="fztabs krtabs${bz?' kr3':''}"><button type="button" class="${t==='job'?'on':''}" data-act="krtab" data-k="job">${i(krt2('tJob'))}</button>${bz?`<button type="button" class="${t==='biz'?'on':''}" data-act="krtab" data-k="biz">${i(bzxT('tab'))}</button>`:''}<button type="button" class="${t==='edu'?'on':''}" data-act="krtab" data-k="edu">${i(bz?bzxT('tEdu3'):krt2('tEdu'))}</button></div>`};
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
  <label class="bsvl">${i(krt2('eDocs'))}</label>${e0?`${D.length?`<div class="dhcard odl">${D.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i(krPg(d)?krt2('pp',{n:krPg(d)}):'')}</small></span></button><button type="button" class="bsvsm x" data-eu="${i(d.id)}" aria-label="×">×</button></div>`).join('')}</div>`:''}<button type="button" class="bsvplus" data-eadd>${i(krt2('addMore'))}</button>`:`<p class="fdsmall">${i(krt2('eDocsNew'))}</p>`}
  <label class="bsvl">${i(krt('note'))}</label><textarea class="field" data-ef="note" rows="2">${i(e.note||'')}</textarea>
  <small class="verr" data-eerr></small><button type="button" class="dcadd gold" data-esave>${i(krt('save'))}</button>${e0?`<button type="button" class="bsvdel" data-edel>${i(krt('del'))}</button>`:''}</div>`,
 sh=>{sh.classList.add('bsvsh');let arm=0;const an=sh.querySelector('[data-ef=an]');an.onchange=()=>{sh.querySelector('.kranD').hidden=an.value!=='req';sh.querySelector('.krhint').hidden=!an.value||an.value==='ok'};
  const read=()=>sh.querySelectorAll('[data-ef]').forEach(z=>{e[z.dataset.ef]=z.value.trim()});
  const ea=sh.querySelector('[data-eadd]');ea&&(ea.onclick=()=>{read();Object.assign(e0,e);$();sh.remove();krAddSheet({e:e0.id})});
  sh.querySelectorAll('[data-eu]').forEach(b=>b.onclick=()=>{e0.docs=(e0.docs||[]).filter(z=>z!==b.dataset.eu);$();sh.remove();v();krEduSheet(e0.id)});
  sh.querySelector('[data-esave]').onclick=()=>{read();if(!e.t){sh.querySelector('[data-eerr]').textContent=krt2('needT');return}if(e.an!=='req')e.anDue='';
   let o=e0;if(o)Object.assign(o,e);else{o=Object.assign(e,{id:V(),docs:[]});krEdu().push(o)}krAnTask(o);try{bsvQuiet()}catch{}$();sh.remove();v();if(!e0)krEduSheet(o.id)};
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
Hooks.act('krslot',d=>krSlotSheet(d.j,d.k));Hooks.act('krtab',d=>{krD().tab=d.k==='edu'?'edu':d.k==='biz'?'biz':'job';try{bsvQuiet()}catch{}$();v()});Hooks.act('kredu',d=>krEduSheet(d&&d.id));Hooks.act('krmappe',()=>krMappe());
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
/* ===== v31: Zeugnissprache and the deadlines of the employment contract ===== */
const KR3={
 zs:['Что значат фразы Zeugnis','Zeugnissprache verstehen','What the Zeugnis phrases mean'],
 zsS:['В немецком Zeugnis оценка «зашифрована» вежливыми фразами. Общие правила — не юридическая оценка, пожалуйста, проверьте.','Im deutschen Arbeitszeugnis steckt die Note in höflichen Formeln. Allgemeine Regeln – keine Rechtsberatung, bitte prüfen.','A German Zeugnis hides the grade in polite phrases. General rules – not legal advice, please check.'],
 zFound:['Найдено в вашем Zeugnis:','Gefunden in Ihrem Zeugnis:','Found in your Zeugnis:'],zNone:['Текст Zeugnis не распознан. Отсканируйте его со «Texterkennung» — тогда фразы найдутся сами.','Der Text des Zeugnisses ist nicht erkannt. Mit Texterkennung scannen – dann werden die Formeln selbst gefunden.','The Zeugnis text is not recognised. Scan it with text recognition – then the phrases are found by themselves.'],
 zNoMatch:['Типичных фраз в тексте не найдено.','Keine typischen Formeln im Text gefunden.','No typical phrases found in the text.'],
 zTab:['Обычные формулы','Übliche Formeln','Usual phrases'],zEnd:['Концовка','Schlussformel','Closing'],
 zEndOk:['Есть благодарность и пожелания — хороший знак.','Dank und gute Wünsche sind da – ein gutes Zeichen.','Thanks and good wishes are there – a good sign.'],
 zEndNo:['Нет благодарности и пожеланий в конце — часто это знак плохой оценки.','Kein Dank und keine Wünsche am Ende – oft ein Zeichen für eine schlechte Bewertung.','No thanks or wishes at the end – often a sign of a poor rating.'],
 g1:['1 — очень хорошо','1 – sehr gut','1 – very good'],g2:['2 — хорошо','2 – gut','2 – good'],g3:['3 — удовлетворительно','3 – befriedigend','3 – satisfactory'],g4:['4 — достаточно','4 – ausreichend','4 – sufficient'],g5:['5 — плохо','5 – mangelhaft','5 – poor'],g6:['6 — неудовлетворительно','6 – ungenügend','6 – insufficient'],
 fr:['Сроки из договора','Fristen aus dem Vertrag','Contract deadlines'],frAdd:['＋ Сроки: Probezeit, Kündigungsfrist, конец договора','＋ Fristen: Probezeit, Kündigungsfrist, Befristung','＋ Deadlines: probation, notice, fixed term'],
 pz:['Испытательный срок до','Probezeit bis','Probation until'],end:['Договор (befristet) до','Befristet bis','Fixed term until'],kf:['Срок увольнения (Kündigungsfrist)','Kündigungsfrist','Notice period'],kfx:['Свой вариант','Eigene Angabe','Own wording'],
 kf_:['— не указан','– nicht angegeben','– not given'],kf_p2w:['2 недели (в Probezeit)','2 Wochen (in der Probezeit)','2 weeks (during probation)'],kf_g4w:['4 недели к 15-му или концу месяца (по закону)','4 Wochen zum 15. oder Monatsende (gesetzlich)','4 weeks to the 15th or month end (by law)'],
 kf_m1:['1 месяц к концу месяца','1 Monat zum Monatsende','1 month to month end'],kf_q3:['3 месяца к концу квартала','3 Monate zum Quartalsende','3 months to quarter end'],kf_x:['другой','andere','other'],
 pzOver:['испытательный срок прошёл ✓','Probezeit vorbei ✓','probation over ✓'],
 aa:['Встать на учёт как ищущий работу (Agentur für Arbeit) — до %d','Arbeitsuchend melden (Agentur für Arbeit) – bis %d','Register as job-seeking (Agentur für Arbeit) – by %d'],
 aaNow:['Встать на учёт как ищущий работу — как можно скорее (в течение 3 дней)','Arbeitsuchend melden – jetzt (innerhalb von 3 Tagen)','Register as job-seeking – now (within 3 days)'],
 aaS:['Общее правило: за 3 месяца до конца договора, если позже узнали — в течение 3 дней. Пожалуйста, проверьте.','Allgemeine Regel: 3 Monate vor Vertragsende, wenn später bekannt – innerhalb von 3 Tagen. Bitte prüfen.','General rule: 3 months before the end; if known later – within 3 days. Please check.'],
 monthEnd:['Конец договора %m? Впишите точную дату — тогда напомню вовремя.','Vertrag endet %m? Genaues Datum eintragen – dann erinnere ich rechtzeitig.','Contract ends %m? Enter the exact date – then I remind in time.'],
 tPz:['Испытательный срок заканчивается %d — %c','Probezeit endet am %d – %c','Probation ends on %d – %c'],tAa:['Встать на учёт в Agentur für Arbeit — договор %c до %d','Arbeitsuchend melden – Vertrag %c endet am %d','Register as job-seeking – contract %c ends on %d']};
const krt3=(k,o)=>{let s=cv5n(KR3[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* longest phrases first, so «stets zu unserer vollsten …» is not taken for «zu unserer vollen …» */
const KR_ZS=[['stets zu unserer vollsten zufriedenheit',1],['stets zu unserer vollen zufriedenheit',2],['zu unserer vollsten zufriedenheit',2],['jederzeit zu unserer vollsten zufriedenheit',1],
 ['im großen und ganzen zu unserer zufriedenheit',5],['stets zu unserer zufriedenheit',3],['zu unserer vollen zufriedenheit',3],['zu unserer zufriedenheit',4],['hat sich bemüht',6],['war stets bemüht',6],
 ['stets vorbildlich',1],['stets einwandfrei',2],['war einwandfrei',3],['war ohne tadel',3],['gab keinen anlass zu beanstandungen',4]];
const KR_ZT=[['stets zu unserer vollsten Zufriedenheit',1],['stets zu unserer vollen Zufriedenheit',2],['zu unserer vollen Zufriedenheit',3],['zu unserer Zufriedenheit',4],['im Großen und Ganzen zu unserer Zufriedenheit',5],['hat sich bemüht …',6]];
function krZsScan(txt){const t=' '+String(txt||'').toLowerCase().replace(/\s+/g,' ')+' ',hit=[];let rest=t;
 for(const[p,n]of KR_ZS.slice().sort((a,b)=>b[0].length-a[0].length)){if(rest.includes(p)){hit.push([p,n]);rest=rest.split(p).join(' # ')}}
 const end=/bedauern|danken|dank für|wünschen (ihm|ihr)|für (seinen|ihren) (weiteren )?(beruflichen|privaten)/.test(t);return{hit,end}}
async function krZsSheet(jid){const j=krJob(jid),D=j?krDocs(j.docs).filter(d=>krDk(j)[d.id]==='zeugnis'):[];let txt='';
 for(const d of D){try{if(d.hasText&&!Fa.text[d.id])await vl(d)}catch{}txt+=' '+(Fa.text&&Fa.text[d.id]||'')}
 const r=txt.trim()?krZsScan(txt):null,gr=n=>krt3('g'+n);
 H(krt3('zs'),`<p class="fdsmall">${i(krt3('zsS'))}</p>
 ${r?`<h3 class="odh">${i(krt3('zFound'))}</h3>${r.hit.length?r.hit.map(([p,n])=>`<div class="krzs g${n}"><span>«${i(p)}»</span><b>${i(gr(n))}</b></div>`).join(''):`<p class="fdsmall">${i(krt3('zNoMatch'))}</p>`}<div class="krzs ${r.end?'g2':'g5'}"><span>${i(krt3('zEnd'))}</span><b>${i(krt3(r.end?'zEndOk':'zEndNo'))}</b></div>`:(D.length?`<p class="fdsmall">ⓘ ${i(krt3('zNone'))}</p>`:'')}
 <h3 class="odh">${i(krt3('zTab'))}</h3>${KR_ZT.map(([p,n])=>`<div class="krzs g${n}"><span>«${i(p)}»</span><b>${i(gr(n))}</b></div>`).join('')}`,sh=>sh.classList.add('bsvsh'))}
/* --- deadlines --- */
const krAddD=(iso,days)=>{const d=new Date(iso+'T12:00:00');d.setDate(d.getDate()+days);return x(d)};
const krAddM=(iso,mo)=>{const d=new Date(iso+'T12:00:00'),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+mo);const last=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,last));return x(d)};
const krToday=()=>x(new Date());
function krAaDue(j){if(!j.end)return null;const due=krAddM(j.end,-3);return due<krToday()?krToday():due}
function krJobTasks(j){try{g.tasks=g.tasks||[];j.tk=j.tk||{};const set=(k,on,t,due)=>{let o=j.tk[k]&&g.tasks.find(z=>z.id===j.tk[k]);
  if(on){if(!o){o={id:V(),t:'',due:'',time:'',prio:1,proj:'',done:!1};g.tasks.push(o);j.tk[k]=o.id}if(o.due!==due)o.done=!1;o.t=t;o.due=due}else if(o&&!o.done){g.tasks=g.tasks.filter(z=>z!==o);delete j.tk[k]}};
 const td=krToday();set('pz',!!j.pz&&j.pz>=td,krt3('tPz',{d:j.pz?vA(j.pz):'',c:j.co}),j.pz?(krAddD(j.pz,-14)<td?td:krAddD(j.pz,-14)):'');
 set('aa',!!j.end&&j.end>=td,krt3('tAa',{d:j.end?vA(j.end):'',c:j.co}),krAaDue(j)||'')}catch(e){Hooks.err('krjobtasks',e)}}
function krFristHtml(j){const td=krToday(),L2=[];if(j.pz)L2.push(`<div class="krfl ${j.pz<td?'ok':''}"><span>${i(krt3('pz'))}</span><b>${i(vA(j.pz))}${j.pz<td?' · '+i(krt3('pzOver')):''}</b></div>`);
 if(j.end){const due=krAaDue(j),soon=j.end>=td&&(due===td||krDays(due)<=30);L2.push(`<div class="krfl"><span>${i(krt3('end'))}</span><b>${i(vA(j.end))}</b></div>`);
  if(j.end>=td)L2.push(`<div class="krfl ${soon?'warn':''}"><span>⚑ ${i(due===td&&krAddM(j.end,-3)<td?krt3('aaNow'):krt3('aa',{d:vA(due)}))}</span></div><small class="krfls">${i(krt3('aaS'))}</small>`)}
 else if(j.to&&j.to>=td.slice(0,7))L2.push(`<div class="krfl hint"><span>${i(krt3('monthEnd',{m:krMon(j.to)}))}</span></div>`);
 if(j.kf)L2.push(`<div class="krfl"><span>${i(krt3('kf'))}</span><b>${i(j.kf==='x'?(j.kfx||'—'):krt3('kf_'+j.kf))}</b></div>`);
 return`<h3 class="odh">${i(krt3('fr'))}</h3>${L2.length?`<button type="button" class="dhcard krfr" data-act="krfrist" data-j="${i(j.id)}">${L2.join('')}</button>`:`<button type="button" class="bsvplus" data-act="krfrist" data-j="${i(j.id)}">${i(krt3('frAdd'))}</button>`}`}
function krFristSheet(jid){const j=krJob(jid);if(!j)return;const sugg=!j.end&&j.to?(()=>{const[y,mo]=String(j.to).split('-');return mo?x(new Date(+y,+mo,0)):''})():'';
 H(krt3('fr'),`<div class="bsvys"><label class="bsvl">${i(krt3('pz'))}</label><input class="field" type="date" data-ff="pz" value="${i(j.pz||'')}">
  <label class="bsvl">${i(krt3('end'))}</label><input class="field" type="date" data-ff="end" value="${i(j.end||sugg)}">
  <label class="bsvl">${i(krt3('kf'))}</label><select class="field" data-ff="kf">${['','p2w','g4w','m1','q3','x'].map(k=>`<option value="${k}" ${(j.kf||'')===k?'selected':''}>${i(krt3('kf_'+k))}</option>`).join('')}</select>
  <input class="field" data-ff="kfx" placeholder="${i(krt3('kfx'))}" value="${i(j.kfx||'')}" ${j.kf==='x'?'':'hidden'}>
  <p class="fdsmall">ⓘ ${i(krt3('aaS'))}</p><button type="button" class="dcadd gold" data-fsave>${i(krt('save'))}</button></div>`,
 sh=>{sh.classList.add('bsvsh');const kf=sh.querySelector('[data-ff=kf]');kf.onchange=()=>{sh.querySelector('[data-ff=kfx]').hidden=kf.value!=='x'};
  sh.querySelector('[data-fsave]').onclick=()=>{sh.querySelectorAll('[data-ff]').forEach(z=>{const v2=z.value.trim();if(v2)j[z.dataset.ff]=v2;else delete j[z.dataset.ff]});if(j.kf!=='x')delete j.kfx;
   if(j.end)j.to=j.end.slice(0,7);krJobTasks(j);try{bsvQuiet()}catch{}$();sh.remove();v()}})}
Hooks.act('krfrist',d=>krFristSheet(d.j));Hooks.act('krzs',d=>krZsSheet(d.j));
Hooks.css('docs-karriere-3',`
.krfr{display:block!important;width:100%;text-align:left;padding:8px 14px!important}.krfl{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--line);font-size:14.5px}.krfl:last-of-type{border-bottom:0}
.krfl b{text-align:right;font-weight:600}.krfl.ok b{color:var(--green,#2f6b3e)}.krfl.warn{color:#a86b14;font-weight:700}.krfl.hint{color:var(--muted)}.krfls{display:block;color:var(--muted);font-size:12px;line-height:1.35;margin:0 0 6px}
.krzs{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;margin:0 0 6px;font-size:14px;background:var(--surface)}.krzs b{flex:none;font-size:13px}
.krzs.g1 b,.krzs.g2 b{color:var(--green,#2f6b3e)}.krzs.g3 b{color:#7a6a20}.krzs.g4 b,.krzs.g5 b,.krzs.g6 b{color:#b03a2e}.krzsb{width:100%;margin-top:8px}
`);

/* buttons inside a sheet (sheets sit outside the app root, where data-act taps are not dispatched):
   data-kgo="<action>" closes the sheet and runs L[<action>] with the button's data — usable by every Docs module */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-kgo]');if(!b)return;e.preventDefault();e.stopPropagation();const sh=b.closest('.dtsheet');sh&&sh.remove();
 const a=b.dataset.kgo;if(a==='krzs'){krZsSheet(b.dataset.j);return}const f=L[a];if(f)try{f(Object.assign({},b.dataset),b,e)}catch(x){Hooks.err('kgo',x)}},!0);
