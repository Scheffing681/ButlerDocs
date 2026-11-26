/* ===== Butler Docs: Behörden & Dienste — categories (v94) =====
   The home of «Behörden & Dienste» gets the same order as the rest of the app:
   search with a scan button · «Kategorien» (four folders + «Alle anzeigen») · «Häufig genutzt» (what the user opens or calls most) · then the full list as before.
   Ten categories, each a coloured folder (iknF from ikonen.js). An entry gets its category automatically from the office it is
   (src) or its name; the user can change it on the entry's card (it.kat).
   A category screen with three tabs: Dienste (the entries), Dokumente (documents that belong there — linked letters, the office's
   name in the text, or the category's words — sorted into sub-folders), Termine. Three actions: Antrag stellen (a Vorgang),
   Dokument scannen, Termin eintragen.
   Nothing is looked up online: no phone numbers or opening hours are invented — «Geöffnet bis» comes only from the hours the user typed. */
const BKX=[
 ['stadt','amt',['Город и гражданские службы','Stadt & Bürgerdienste','City & citizen services'],['Bürgeramt, Ausländerbehörde, Standesamt','Bürgeramt, Ausländerbehörde, Standesamt','Bürgeramt, Ausländerbehörde, Standesamt'],/bürger|buerger|stadt|gemeinde|rathaus|ausländer|standesamt|ordnungsamt|meldebeh|landratsamt/i],
 ['fin','coins',['Финансы и налоги','Finanzen & Steuern','Finance & taxes'],['Finanzamt, Familienkasse, Bank','Finanzamt, Familienkasse, Bank','Finanzamt, Familienkasse, bank'],/finanzamt|steuer|bank|sparkasse|familienkasse|kindergeld/i],
 ['arb','ppl',['Работа и соцслужбы','Arbeit & Soziales','Work & social'],['Jobcenter, Agentur für Arbeit, Rente','Jobcenter, Agentur für Arbeit, Rente','Jobcenter, Agentur für Arbeit, pension'],/jobcenter|agentur für arbeit|arbeitsagentur|rentenversicherung|\bdrv\b|sozialamt|elterngeld|wohngeld|bürgergeld/i],
 ['ges','heart',['Здоровье и уход','Gesundheit & Pflege','Health & care'],['Krankenkasse, Hausarzt, Zahnarzt','Krankenkasse, Hausarzt, Zahnarzt','Krankenkasse, GP, dentist'],/krankenkasse|krankenversicherung|arzt|ärztin|zahn|klinik|krankenhaus|apothek|praxis|pflege|\baok\b|barmer|\bdak\b|techniker/i],
 ['recht','scale',['Право и безопасность','Recht & Sicherheit','Law & safety'],['Polizei, Amtsgericht, Anwalt','Polizei, Amtsgericht, Anwalt','Police, court, lawyer'],/polizei|gericht|anwalt|notar|staatsanwalt|rechtsschutz/i],
 ['auto','car',['Авто и транспорт','Auto & Verkehr','Car & transport'],['Kfz-Zulassung, TÜV, Führerschein','Kfz-Zulassung, TÜV, Führerschein','Kfz-Zulassung, TÜV, licence'],/kfz|zulassung|tüv|dekra|straßenverkehr|strassenverkehr|führerschein|adac|werkstatt/i],
 ['wohn','house',['Жильё и энергия','Wohnen & Energie','Home & energy'],['Vermieter, Stadtwerke, Rundfunkbeitrag','Vermieter, Stadtwerke, Rundfunkbeitrag','landlord, utilities, licence fee'],/vermiet|hausverwalt|stadtwerke|strom|\bgas\b|wasser|energie|rundfunk|beitragsservice|abfall|müll/i],
 ['vers','shield',['Страхование','Versicherungen','Insurance'],['Haftpflicht, Hausrat, Kfz-Versicherung','Haftpflicht, Hausrat, Kfz-Versicherung','liability, contents, car insurance'],/versicherung|allianz|\bhuk\b|ergo|\baxa\b|debeka|haftpflicht|hausrat/i],
 ['bild','cap',['Образование и семья','Bildung & Familie','Education & family'],['Schule, Kita, Jugendamt','Schule, Kita, Jugendamt','school, nursery, youth office'],/schule|kita|kindergarten|hochschule|universität|volkshochschule|jugendamt|bafög|krippe/i],
 ['weit','grid',['Прочее','Weitere','Other'],['Vereine, Kirche, sonstige Stellen','Vereine, Kirche, sonstige Stellen','clubs, church, others'],null]];
const BKX_SRC={buerger:'stadt',ausl:'stadt',ord:'stadt',fa:'fin',fk:'fin',jc:'arb',aa:'arb',drv:'arb',kk:'ges',arzt:'ges',zahn:'ges',ag:'recht',pol:'recht',kfz:'auto',schule:'bild',verein:'weit'};
const BKX_MATCH=['arb','ges','auto','fin','wohn','stadt','recht','vers','bild'];
const bkxS={
 kat:['Категории','Kategorien','Categories'],all:['Показать все','Alle anzeigen','Show all'],oft:['Часто используемые','Häufig genutzt','Frequently used'],
 list:['Все записи','Alle Einträge','All entries'],n:['%n записей','%n Einträge','%n entries'],n1:['1 запись','1 Eintrag','1 entry'],n0:['пока пусто','noch leer','empty so far'],
 scan:['Сканировать письмо','Schreiben scannen','Scan a letter'],
 tSvc:['Службы','Dienste','Services'],tDoc:['Документы','Dokumente','Documents'],tTerm:['Термины','Termine','Appointments'],
 aAnt:['Подать заявление','Antrag stellen','Apply'],aScan:['Сканировать документ','Dokument scannen','Scan document'],aTerm:['Записать термин','Termin eintragen','Add appointment'],
 add:['Добавить учреждение','Einrichtung hinzufügen','Add an office'],noSvc:['В этой категории пока ничего нет.','In dieser Kategorie ist noch nichts.','Nothing in this category yet.'],
 noDoc:['Документов к этой категории пока нет. Отсканируйте письмо — оно попадёт сюда.','Noch keine Dokumente in dieser Kategorie. Scannen Sie ein Schreiben – es landet hier.','No documents in this category yet. Scan a letter – it lands here.'],
 noTerm:['Терминов нет.','Keine Termine.','No appointments.'],needSvc:['Сначала добавьте учреждение','Zuerst eine Einrichtung hinzufügen','Add an office first'],
 pick:['Для какого учреждения?','Für welche Einrichtung?','For which office?'],
 katL:['Категория','Kategorie','Category'],katQ:['Выберите категорию','Kategorie wählen','Choose a category'],katAuto:['подобрано автоматически','automatisch zugeordnet','assigned automatically'],
 f_bes:['Решения (Bescheide)','Bescheide','Decisions (Bescheide)'],f_ant:['Заявления','Anträge','Applications'],f_ver:['Договоры','Verträge','Contracts'],f_rech:['Счета','Rechnungen','Invoices'],f_kom:['Переписка','Kommunikation','Correspondence'],
 f_erk:['Налоговая декларация','Steuererklärung','Tax return'],f_lohn:['Lohnsteuer и зарплата','Lohnsteuer & Gehalt','Wage tax & pay'],f_kig:['Kindergeld','Kindergeld','Child benefit'],
 f_ausw:['Документы личности','Ausweise & Aufenthalt','ID & residence'],f_meld:['Регистрация (Meldebescheinigung)','Meldebescheinigung','Registration'],
 f_bef:['Заключения и анализы','Befunde & Arztbriefe','Findings & doctor’s letters'],f_rez:['Рецепты','Rezepte','Prescriptions'],f_police:['Полисы','Policen','Policies'],f_fz:['Автомобиль','Fahrzeug','Vehicle'],f_zeug:['Табели и справки','Zeugnisse & Bescheinigungen','Reports & certificates']};
const bkxt=(k,o)=>{let s=cv5n(bkxS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const bkxC=k=>BKX.find(c=>c[0]===k)||BKX[9];
const bkxName=k=>cv5n(bkxC(k)[2]);
const bkxIco=(k,sz)=>{const c=bkxC(k);return iknF(c[1],k,sz)};
function bkxAuto(it){if(BKX_SRC[it.src])return BKX_SRC[it.src];const t=[it.n,it.note,it.addr].filter(Boolean).join(' ');for(const k of BKX_MATCH){if(bkxC(k)[4].test(t))return k}
 const gk=String(it.grp||'');if(gk==='med')return'ges';if(gk==='fam')return'bild';return'weit'}
const bkxKat=it=>it&&BKX.some(c=>c[0]===it.kat)?it.kat:bkxAuto(it||{});
const bkxItems=k=>bsvD().items.filter(it=>bkxKat(it)===k);
const bkxCnt=n=>n===0?bkxt('n0'):n===1?bkxt('n1'):bkxt('n',{n});

/* --- usage: open and call count; «Häufig genutzt» is built from it --- */
document.addEventListener('click',e=>{try{const a=e.target.closest&&e.target.closest('[data-act="bsvopen"],a[data-bsvcall]');if(!a)return;const it=bsvGet(a.dataset.id||a.dataset.bsvcall);if(!it)return;it.use=(it.use||0)+1;it.lu=Date.now();$()}catch(er){Hooks.err('bkxuse',er)}},!0);
const bkxOft=()=>bsvD().items.slice().sort((a,b)=>(b.use||0)-(a.use||0)||(b.pin?1:0)-(a.pin?1:0)||(b.lu||0)-(a.lu||0)).slice(0,3);

/* --- home: search+scan, categories, frequently used, then the old list --- */
function bkxTile(k){const n=bkxItems(k).length;return`<button type="button" class="bkxt" data-act="bkxkat" data-k="${k}">${bkxIco(k,'m')}<b>${i(bkxName(k))}</b><small>${i(bkxCnt(n))}</small></button>`}
function bkxHome(){const o=bsvD();const cnt=k=>bkxItems(k).length;
 const top=BKX.map(c=>c[0]).filter(k=>cnt(k)).sort((a,b)=>cnt(b)-cnt(a));['stadt','fin','ges','arb','auto','wohn'].forEach(k=>{if(!top.includes(k))top.push(k)});
 const oft=bkxOft();
 return`<div class="bkxhide"><div class="bkxh"><h3 class="odh">${i(bkxt('kat'))}</h3><button type="button" class="bkxall" data-act="go" data-to="bkxk">${i(bkxt('all'))} ›</button></div>
 <div class="bkxg4">${top.slice(0,4).map(bkxTile).join('')}</div>
 ${o.items.length>1?`<h3 class="odh">${i(bkxt('oft'))}</h3><div class="dhcard odl bkxoft">${oft.map(bsvRow).join('')}</div>`:''}
 <h3 class="odh">${i(bkxt('list'))}</h3></div>`}
const _bkxList=bsvList;
bsvList=function(){let h=_bkxList();try{const o=bsvD();if(bsvOrd||!o.items.length)return h;
 h=h.replace(/<input class="field bsvsr"[^>]*>/,'');
 const sr=`<div class="bkxsr"><input class="field bsvsr" type="search" data-bsvsr placeholder="${i(bsvt('search'))}" autocomplete="off"><button type="button" class="bkxsc" data-act="bkxscan" aria-label="${i(bkxt('scan'))}" title="${i(bkxt('scan'))}">${iknSvg('camera')}</button></div>`;
 h=h.replace('<span class="bsvmy"></span>',sr+'<span class="bsvmy"></span>');
 const mm=/<span class="bsvmy"><\/span>(<div class="bsvchips">[\s\S]*?<\/div>)?/.exec(h);if(mm)h=h.slice(0,mm.index+mm[0].length)+bkxHome()+h.slice(mm.index+mm[0].length)}catch(e){Hooks.err('bkxlist',e)}return h};
document.addEventListener('input',e=>{const t=e.target;if(!t||!t.matches||!t.matches('[data-bsvsr]'))return;const q=t.value.trim();document.querySelectorAll('.bsv .bkxhide').forEach(x=>{x.hidden=!!q})},!0);
Hooks.act('bkxscan',()=>{try{R('sc9')}catch(e){Hooks.err('bkxscan',e)}});

/* --- all categories --- */
function bkxAllScr(){return`<div class="screen dhome bsv bkxk">${bsvHdr(bkxt('kat'),'bsvback')}
 <div class="dhcard odl">${BKX.map(c=>{const n=bkxItems(c[0]).length;return`<button type="button" class="odr bkxr" data-act="bkxkat" data-k="${c[0]}">${bkxIco(c[0],'s')}<span><b>${i(cv5n(c[2]))}</b><small>${i(cv5n(c[3]))}</small></span><em class="bkxn">${n||''}</em>${dhi('chev','sm')}</button>`}).join('')}</div></div>`}

/* --- documents of a category, sorted into sub-folders --- */
const BKX_SUB={fin:[['f_erk',/steuererkl|einkommensteuer|elster|anlage n\b/i],['f_lohn',/lohnsteuer|lohnabrechnung|gehaltsabrechnung|entgeltabrechnung/i],['f_kig',/kindergeld|familienkasse/i]],
 stadt:[['f_ausw',/ausweis|reisepass|aufenthalt|niederlassung/i],['f_meld',/melde/i]],ges:[['f_bef',/befund|labor|arztbrief|diagnose/i],['f_rez',/rezept/i]],
 vers:[['f_police',/police|versicherungsschein/i]],auto:[['f_fz',/fahrzeug|zulassungsbescheinigung|kfz|tüv|hauptuntersuchung/i]],bild:[['f_zeug',/zeugnis|bescheinigung|schulbescheinigung/i]]};
const BKX_GEN=[['f_bes',/bescheid/i],['f_ant',/antrag/i],['f_ver',/vertrag/i],['f_rech',/rechnung/i]];
const bkxDTxt=d=>[d.title,d.snip,d.party,d.sender,(()=>{try{return Ri(d.f)}catch{return''}})()].filter(Boolean).join(' ');
function bkxDocs(k){let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{return[]}
 const its=bkxItems(k),ids=new Set(its.map(x=>x.id)),names=its.map(x=>String(x.n||'').toLowerCase()).filter(s=>s.length>=5),rx=bkxC(k)[4];
 return D.filter(d=>{if(d.bsvL&&d.bsvL.it){const it=bsvGet(d.bsvL.it);if(it)return bkxKat(it)===k}const t=bkxDTxt(d),lt=t.toLowerCase();return names.some(n=>lt.includes(n))||(rx&&rx.test(t))}).sort((a,b)=>(b.ts||0)-(a.ts||0))}
function bkxSubs(k,D){const S=[...(BKX_SUB[k]||[]),...BKX_GEN],out=S.map(s=>[s[0],[]]),rest=[];
 D.forEach(d=>{const t=bkxDTxt(d),j=S.findIndex(s=>s[1].test(t));(j<0?rest:out[j][1]).push(d)});return out.filter(x=>x[1].length).concat(rest.length?[['f_kom',rest]]:[])}
const bkxDate=d=>{try{const t=d.date||d.dt||d.ts;return t?new Date(t).toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'}):''}catch{return''}};

/* --- one category --- */
let bkxSel='stadt',bkxTab='svc',bkxOpen=null;
function bkxKatScr(){const k=bkxSel,its=bkxItems(k),D=bkxDocs(k),sub=bkxSubs(k,D),ids=new Set(its.map(x=>x.id));
 let T=[];try{T=bsvTs().filter(t=>ids.has(t.it)).sort((a,b)=>(a.done?1:0)-(b.done?1:0)||String(a.date).localeCompare(String(b.date)))}catch{}
 const tab=(id,lab)=>`<button type="button" class="${bkxTab===id?'on':''}" data-act="bkxtab" data-k="${id}">${i(lab)}</button>`;
 let body='';
 if(bkxTab==='svc')body=its.length?`<div class="dhcard odl">${its.map(bsvRow).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(bkxt('noSvc'))}</p></div>`;
 else if(bkxTab==='doc')body=sub.length?sub.map(([f,L])=>{const on=bkxOpen===f;return`<div class="dhcard odl bkxsub"><button type="button" class="odr bkxr" data-act="bkxsub" data-k="${f}">${iknF('fld',k,'s')}<span><b>${i(bkxt(f))}</b></span><em class="bkxn">${L.length}</em>${dhi('chev','sm')}</button>
  ${on?L.map(d=>`<button type="button" class="odr bkxdoc" data-act="dzopen" data-id="${i(d.id)}">${iknF('doc','weit','s')}<span><b>${i(d.title||'—')}</b>${bkxDate(d)?`<small>${i(bkxDate(d))}</small>`:''}</span>${dhi('chev','sm')}</button>`).join(''):''}</div>`}).join(''):`<div class="dhcard"><p class="dhnone">${i(bkxt('noDoc'))}</p></div>`;
 else body=T.length?`<div class="dhcard odl">${T.map(t=>{const it=bsvGet(t.it)||{};return`<button type="button" class="odr bkxr${t.done?' bkxdone':''}" data-act="bsvtopen" data-id="${i(t.id)}">${iknF('cal',k,'s')}<span><b>${i(t.what||it.n||'—')}</b><small>${i(bsvDt(t.date,t.time))}${it.n&&t.what?' · '+i(it.n):''}</small></span>${dhi('chev','sm')}</button>`}).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(bkxt('noTerm'))}</p></div>`;
 return`<div class="screen dhome bsv bkxc">${bsvHdr(bsvt('t'),'bsvback')}
 <div class="bkxhd">${bkxIco(k)}<div><h3>${i(bkxName(k))}</h3><small>${i(bkxCnt(its.length))}</small></div></div>
 <div class="bkxtabs">${tab('svc',bkxt('tSvc'))}${tab('doc',bkxt('tDoc')+(D.length?' ('+D.length+')':''))}${tab('term',bkxt('tTerm'))}</div>
 ${body}
 <div class="bkxacts"><button type="button" data-act="bkxant">${iknF('pen',k,'s')}<span>${i(bkxt('aAnt'))}</span></button><button type="button" data-act="bkxscan">${iknF('camera',k,'s')}<span>${i(bkxt('aScan'))}</span></button><button type="button" data-act="bkxterm">${iknF('cal',k,'s')}<span>${i(bkxt('aTerm'))}</span></button></div>
 ${bkxTab==='svc'?`<button type="button" class="bsvaddb" data-act="bsvcat">＋ ${i(bkxt('add'))}</button>`:''}</div>`}

/* --- entries carry their category's colour; the symbol follows the entry's old emoji --- */
const bkxEmo=(it,sz)=>{const k=bkxKat(it),e=iknEmo(it.e);return`<span class="bsvemo${sz?'':' big'} ikw" data-ik="1">${iknF(e?e[0]:bkxC(k)[1],k,sz)}</span>`};
const _bkxRow=bsvRow;
bsvRow=function(it){return _bkxRow(it).replace(/<span class="bsvemo">[^<]*<\/span>/,bkxEmo(it,'s'))};
/* --- the entry's card: category row --- */
const _bkxCard=bsvCard;
bsvCard=function(it){let h=_bkxCard(it);try{h=h.replace(/<span class="bsvemo big">[^<]*<\/span>/,bkxEmo(it,''));const k=bkxKat(it);const row=`<button type="button" class="dhcard odr bkxkrow" data-act="bkxset" data-id="${i(it.id)}">${bkxIco(k,'s')}<span><small>${i(bkxt('katL'))}</small><b>${i(bkxName(k))}</b>${it.kat?'':`<small>${i(bkxt('katAuto'))}</small>`}</span>${dhi('chev','sm')}</button>`;
 h=h.replace(/(<div class="bsvacts">|<div class="dhcard bsvlinks">|<div class="dhcard vkv bsvkv">|<button type="button" class="bsvdel)/,row+'$1')}catch(e){Hooks.err('bkxcard',e)}return h};
Hooks.act('bkxset',d=>{const it=bsvGet(d.id);if(!it)return;const cur=bkxKat(it);
 H(bkxt('katQ'),`<div class="dhcard odl">${BKX.map(c=>`<button type="button" class="odr bkxr${c[0]===cur?' on':''}" data-bkk="${c[0]}">${bkxIco(c[0],'s')}<span><b>${i(cv5n(c[2]))}</b></span>${c[0]===cur?bsvi('ok'):''}</button>`).join('')}</div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-bkk]');if(!b)return;it.kat=b.dataset.bkk;$();el.remove();bsvRe()})})});

/* --- actions --- */
Hooks.act('bkxkat',d=>{bkxSel=d.k||'weit';bkxTab='svc';bkxOpen=null;R('bkxc')});
Hooks.act('bkxtab',d=>{bkxTab=d.k;bkxOpen=null;v()});
Hooks.act('bkxsub',d=>{bkxOpen=bkxOpen===d.k?null:d.k;bsvRe()});
Hooks.act('bkxant',()=>{try{const it=bkxItems(bkxSel)[0];let k=null;try{if(it&&typeof kpAll==='function'){const lo=String(it.n||'').toLowerCase();const c=kpAll().find(x=>String(x.n||'').toLowerCase()===lo);k=c?c.key:null}}catch{}
 const a=document.createElement('button');a.type='button';a.dataset.act='vgnew';if(k)a.dataset.k=k;a.hidden=!0;(document.querySelector('.screen')||document.body).appendChild(a);a.click();a.remove()}catch(e){Hooks.err('bkxant',e)}});
Hooks.act('bkxterm',()=>{const its=bkxItems(bkxSel);if(!its.length)return T(bkxt('needSvc'));if(its.length===1)return bsvTNew(its[0].id);
 H(bkxt('pick'),`<div class="dhcard odl">${its.map(it=>`<button type="button" class="odr bkxr" data-bkt="${i(it.id)}">${bkxIco(bkxSel,'s')}<span><b>${i(it.n||'—')}</b></span>${dhi('chev','sm')}</button>`).join('')}</div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-bkt]');if(!b)return;el.remove();bsvTNew(b.dataset.bkt)})})});

/* --- routes --- */
['bkxk','bkxc'].forEach(r=>{try{OD_OK.add(r);Te.push(r);AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='bkxk')return bkxAllScr();if(m.route==='bkxc')return bkxKatScr()}catch(e){Hooks.err('bkxscreen',e)}});
Hooks.css('docs-behoerden-kat',`.bkxsr{display:flex;gap:8px;align-items:center;margin:4px 0 10px}.bkxsr .bsvsr{flex:1;margin:0!important}.bkxsc{flex:none;width:48px;height:48px;border-radius:14px;border:0;background:var(--card,#fff);color:var(--green);display:grid;place-items:center;box-shadow:0 3px 10px rgba(0,0,0,.06)}.bkxsc svg{width:22px;height:22px}
.bkxh{display:flex;align-items:baseline;justify-content:space-between}.bkxall{border:0;background:none;color:var(--green);font-weight:700;font-size:14px;padding:6px 2px}
.bkxg4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:2px 0 12px}.bkxt{background:var(--card,#fff);border:0;border-radius:18px;padding:12px 12px 12px;display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;color:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05)}.bkxt .ikf.m{margin:6px 0 8px}.bkxt b{font-size:14.5px;line-height:1.2}.bkxt small{opacity:.6;font-size:12.5px}
.bkxr{display:flex!important;align-items:center;gap:12px}.bkxr>span{flex:1;display:flex;flex-direction:column}.bkxr small{opacity:.62;font-size:12.5px}.bkxn{font-style:normal;font-weight:700;opacity:.6;font-size:14px}.bkxr.on b{color:var(--green)}
.bkxhd{display:flex;align-items:center;gap:14px;margin:4px 0 14px}.bkxhd h3{margin:0;font-size:22px}.bkxhd small{opacity:.6}
.bkxtabs{display:flex;background:var(--card,#fff);border-radius:14px;padding:4px;margin-bottom:12px;gap:4px}.bkxtabs button{flex:1;border:0;background:none;border-radius:10px;padding:9px 4px;font-weight:600;font-size:13.5px;color:inherit}.bkxtabs button.on{background:var(--green);color:#fff}
.bkxsub{margin-bottom:8px}.bkxdoc{padding-left:22px!important;display:flex!important;align-items:center;gap:12px}.bkxdoc>span{flex:1;display:flex;flex-direction:column}.bkxdoc small{opacity:.6}.bkxdone{opacity:.55}
.bkxacts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.bkxacts button{background:var(--card,#fff);border:0;border-radius:16px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:inherit;box-shadow:0 3px 10px rgba(0,0,0,.05)}
.bkxkrow{display:flex!important;align-items:center;gap:12px;width:100%;border:0;text-align:left;color:inherit;margin-bottom:10px}.bkxkrow>span{flex:1;display:flex;flex-direction:column}.bkxkrow small{opacity:.6;font-size:12px}
.bsvrow .bsvemo.ikw{margin-right:2px}`);
