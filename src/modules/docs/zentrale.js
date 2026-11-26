/* ===== Butler Docs: Dokumente as the one central store (v95) — «Ein Original, viele Wege» =====
   Nothing is copied: every document stays once in «Dokumente»; the areas only show links to it.
   - Dokumente gets four views: Ordner (the folders as before) · Bereiche (14 areas of life, counted) ·
     Verknüpft (documents that are linked to something) · Verlauf (newest first).
   - An area (route zla): its documents with filters Alle · Neu · Aktiv · Abgelaufen · Verknüpft.
     The area comes from the document's folder, kind and words; the user can change it (d.zl) — a wrong guess is fixable.
   - Every document shows «Verknüpft mit»: contract, office, asset, Vorsorge paper, instruction, health entry, purchase,
     own Mappe … each a tap away — the links work both ways.
   - Gesundheit and Vorsorge show «Verknüpfte Dokumente (aus Dokumente)».
   Data: d.zl (chosen area). Nothing else is stored. */
const ZL_S={
 v_ord:['Папки','Ordner','Folders'],v_ber:['Разделы','Bereiche','Areas'],v_ver:['Связанные','Verknüpft','Linked'],v_hist:['Недавние','Verlauf','Recent'],
 a_pers:['Личные документы','Persönliche Dokumente','Personal documents'],a_ges:['Здоровье','Gesundheit','Health'],a_arb:['Работа и зарплата','Arbeit & Gehalt','Work & pay'],a_fin:['Финансы','Finanzen','Finance'],
 a_steu:['Налоги','Steuern','Taxes'],a_vers:['Страховки','Versicherungen','Insurance'],a_vtr:['Договоры','Verträge','Contracts'],a_immo:['Недвижимость','Immobilien','Property'],a_fz:['Транспорт','Fahrzeuge','Vehicles'],
 a_fam:['Семья','Familie','Family'],a_beh:['Ведомства и службы','Behörden & Dienste','Offices & services'],a_vors:['Распоряжения и наследство','Vorsorge & Nachlass','Provisions & estate'],a_bild:['Образование','Bildung','Education'],a_son:['Прочее','Sonstiges','Other'],
 orig:['Один оригинал — все разделы видят его по ссылке.','Ein Original – alle Bereiche sehen es über eine Verknüpfung.','One original – every area sees it through a link.'],
 f_all:['Все','Alle','All'],f_new:['Новые','Neu','New'],f_act:['Действующие','Aktiv','Active'],f_exp:['Истёк срок','Abgelaufen','Expired'],f_lnk:['Связанные','Verknüpft','Linked'],
 none:['Здесь пока нет документов.','Hier sind noch keine Dokumente.','No documents here yet.'],noneF:['Под этот фильтр ничего не подходит.','Zu diesem Filter passt nichts.','Nothing matches this filter.'],
 lnkT:['Связано с','Verknüpft mit','Linked with'],lnkNo:['Пока ни с чем не связано.','Noch mit nichts verknüpft.','Not linked to anything yet.'],
 area:['Раздел','Bereich','Area'],areaQ:['В какой раздел?','In welchen Bereich?','Which area?'],areaAuto:['подобран автоматически','automatisch zugeordnet','assigned automatically'],
 k_ctr:['Договор','Vertrag','Contract'],k_bsv:['Ведомство','Behörde','Office'],k_ast:['Имущество','Vermögen','Asset'],k_vors:['Распоряжение','Verfügung','Directive'],k_ins:['Указание','Anweisung','Instruction'],
 k_ges:['Здоровье','Gesundheit','Health'],k_kauf:['Покупка','Kauf','Purchase'],k_mp:['Папка-подборка','Mappe','Folder set'],k_car:['Всё об автомобиле','Alles zum Auto','All about the car'],k_home:['Всё о жилье','Alles zur Wohnung','All about the home'],k_vg:['Дело','Vorgang','Case'],
 linkedDocs:['Связанные документы','Verknüpfte Dokumente','Linked documents'],fromDok:['(из «Документов»)','(aus Dokumente)','(from Documents)'],
 nL:['связей: %n','%n Verknüpfungen','%n links'],today:['сегодня','heute','today']};
const zlt=(k,o)=>{let s=cv5n(ZL_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const zlL=t=>t.split(' ').map(z=>z.split('|'));
const ZL_A=zlL('pers|id|#4A84D6 ges|heart|#D65A69 arb|brief|#E3873A fin|euro|#4E9E5F steu|coins|#E0A92E vers|shield|#8B6FD0 vtr|pen|#E3873A immo|house|#3F9FA3 fz|car|#4A84D6 fam|ppl|#E0A92E beh|amt|#5B7BB5 vors|dove|#4E9E5F bild|cap|#8B6FD0 son|grid|#8A93A0');
const ZL_RX=[['vors',/testament|vollmacht|patientenverf|betreuungsverf|bestattung|erbschein|nachlass/i],['steu',/steuer|lohnsteuerbesch|elster|finanzamt.*bescheid|einkommensteuer/i],
 ['ges',/arzt|ärzt|befund|labor|rezept|klinik|krankenhaus|attest|impf|diagnose|krankmeld/i],['fz',/kfz|fahrzeug|zulassung|tüv|hauptuntersuchung|führerschein|werkstatt/i],
 ['immo',/grundbuch|kaufvertrag.*(wohnung|haus|grundst)|bauantrag|baugenehm|notar.*kauf|eigentum/i],['vers',/versicherung|police|versicherungsschein|schadensmeld|beitragsrechnung/i],
 ['arb',/arbeitsvertrag|gehalt|lohnabrechnung|entgelt|arbeitszeugnis|arbeitgeber|kündigung.*arbeits/i],['beh',/bürgeramt|jobcenter|familienkasse|agentur für arbeit|ausländerbeh|gericht|landratsamt|stadtverwaltung|bescheid/i],
 ['vtr',/vertrag|mietvertrag|kündigung|vertragsbestät|tarif|mobilfunk|internet/i],['fin',/rechnung|quittung|kontoauszug|zahlung|überweisung|kredit|darlehen|mahnung|beleg/i],
 ['bild',/zeugnis|diplom|zertifikat|urkunde.*(abschluss|hochschul)|schule|studium|kurs/i],['fam',/geburtsurkunde|heiratsurkunde|kindergeld|kita|kinder|ehe|familie/i],['pers',/ausweis|reisepass|personalausweis|meldebesch|aufenthalt/i]];
const ZL_HO={personal:'pers',family:'fam',prop:'immo',work:'arb',trans:'fz',edu:'bild',med:'ges',law:'vtr',other:'son'};
const zlDocs=()=>{try{return Ke().items.filter(d=>d&&!d.type&&!d.insId&&!d.del)}catch{return[]}};
const zlTxt=d=>[d.title,d.party,d.sender,d.dtype,d.kind,d.snip].filter(Boolean).join(' ');
function zlArea(d){if(d.zl&&ZL_A.some(a=>a[0]===d.zl))return d.zl;if(d.dtype==='will'||d.dtype==='poa')return'vors';
 const t=zlTxt(d);for(const[k,rx]of ZL_RX)if(rx.test(t))return k;let h='other';try{h=ho(d)}catch{}if(d.bsvL&&d.bsvL.it)return'beh';return ZL_HO[h]||'son'}
const zlA=k=>ZL_A.find(a=>a[0]===k)||ZL_A[13];
const zlIco=(k,sz)=>{const a=zlA(k);return iknF(a[1],a[2],sz)};
const zlEnd=d=>d.end||(d.f&&d.f.valid)||'';
const zlToday=()=>new Date().toISOString().slice(0,10);
/* every link that points to a document, from every area — the reverse direction */
function zlLinks(d){const L=[],add=(k,t,act)=>L.push({k,t,act});
 try{if(d.ctr){const c=(vaContracts()||[]).find(z=>z.id===d.ctr);if(c)add('ctr',c.title||c.co,`data-act="insopen" data-id="${i(c.id)}"`)}}catch{}
 try{if(d.bsvL&&d.bsvL.it){const it=bsvGet(d.bsvL.it);if(it)add('bsv',it.n,`data-act="bsvopen" data-id="${i(it.id)}"`)}}catch{}
 try{if(d.ast)add(d.ast==='car'?'car':'home','',`data-act="go" data-to="akw"`)}catch{}
 try{U().assets.filter(a=>(a.docs||[]).includes(d.id)).forEach(a=>add('ast',a.name,`data-act="vnxa" data-id="${i(a.id)}"`))}catch{}
 try{VNX_V.forEach(([k])=>{if(vnxVDocs(k).some(z=>z.id===d.id))add('vors',vnxVName(k),'data-act="go" data-to="dvors"')})}catch{}
 try{vnxD().ins.filter(x=>(x.docs||[]).includes(d.id)).forEach(x=>add('ins',x.t,`data-act="vnxinopen" data-id="${i(x.id)}"`))}catch{}
 try{const G=g.ges||{};['vis','med','imp','lab'].forEach(s=>(G[s]||[]).forEach(x=>{if((x.docs||[]).includes(d.id)||x.doc===d.id)add('ges',x.t||x.n||x.what||'','data-act="go" data-to="ges"')}))}catch{}
 try{(Array.isArray(g.kauf)?g.kauf:[]).forEach(x=>{if((x.docs||[]).includes(d.id)||x.doc===d.id)add('kauf',x.n||x.t||'',`data-act="go" data-to="kauf"`)})}catch{}
 try{((g.mpx&&g.mpx.list)||[]).forEach(x=>{const ids=[].concat(...Object.values(x.pk||{}),x.extra||[]).map(z=>typeof z==='object'?z.id||z.doc:z);if(ids.includes(d.id))add('mp',x.name||'',`data-act="go" data-to="mpx"`)})}catch{}
 try{(Array.isArray(g.vg)?g.vg:[]).forEach(x=>{if((x.docs||[]).includes(d.id)||(x.anl||[]).some(a=>a.doc===d.id))add('vg',x.t||'',`data-act="vgopen" data-id="${i(x.id)}"`)})}catch{}
 return L}
const zlLinked=d=>zlLinks(d).length>0;

/* --- Dokumente: the four views --- */
function zlRowDoc(d,extra){const k=zlArea(d),e=zlEnd(d),n=zlLinks(d).length;let dt='';try{dt=new Date(d.ts||0).toLocaleDateString(he(),{day:'2-digit',month:'2-digit',year:'numeric'})}catch{}
 return`<button type="button" class="odr zlr" data-act="dzopen" data-id="${i(d.id)}">${zlIco(k,'s')}<span><b>${i(d.title||'—')}</b><small>${i([extra||zlt('a_'+k),dt,e&&e<zlToday()?zlt('f_exp'):'',n?zlt('nL',{n}):''].filter(Boolean).join(' · '))}</small></span>${dhi('chev','sm')}</button>`}
function zlView(){const v=m.zlV||'ord',D=zlDocs();if(v==='ord')return'';
 if(v==='ber'){const c={};D.forEach(d=>{const k=zlArea(d);c[k]=(c[k]||0)+1});
  return`<p class="dnnote zlorig">🔒 ${i(zlt('orig'))}</p><div class="dhcard odl zlber">${ZL_A.map(([k])=>`<button type="button" class="odr zlr" data-act="zlopen" data-k="${k}">${zlIco(k,'s')}<span><b>${i(zlt('a_'+k))}</b></span><em class="zln">${c[k]||0}</em>${dhi('chev','sm')}</button>`).join('')}</div>`}
 if(v==='ver'){const L=D.filter(zlLinked).sort((a,b)=>zlLinks(b).length-zlLinks(a).length);return L.length?`<div class="dhcard odl">${L.slice(0,60).map(d=>zlRowDoc(d)).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(zlt('lnkNo'))}</p></div>`}
 const L=D.slice().sort((a,b)=>(b.ts||0)-(a.ts||0)).slice(0,30);return L.length?`<div class="dhcard odl">${L.map(d=>zlRowDoc(d)).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(zlt('none'))}</p></div>`}
const zlTabs=()=>`<div class="zltabs">${['ord','ber','ver','hist'].map(k=>`<button type="button" class="${(m.zlV||'ord')===k?'on':''}" data-act="zlv" data-k="${k}">${i(zlt('v_'+k))}</button>`).join('')}</div>`;
Hooks.on('screen',h=>{try{if(m.route!=='archive'||typeof h!=='string'||!h.includes('<div class="ddg">'))return h;const v=m.zlV||'ord';
 h=h.replace('<div class="ddg">',zlTabs()+(v==='ord'?'<div class="ddg">':zlView()+'<div class="ddg" hidden>'))}catch(e){Hooks.err('zlscreen',e)}return h});
Hooks.act('zlv',d=>{m.zlV=d.k;v()});

/* --- one area --- */
let zlSel='pers',zlF='all';
function zlScr(){const k=zlSel,t0=zlToday(),A=zlDocs().filter(d=>zlArea(d)===k).sort((a,b)=>(b.ts||0)-(a.ts||0)),wk=Date.now()-14*864e5;
 const F={all:A,new:A.filter(d=>(d.ts||0)>=wk),act:A.filter(d=>{const e=zlEnd(d);return!e||e>=t0}),exp:A.filter(d=>{const e=zlEnd(d);return e&&e<t0}),lnk:A.filter(zlLinked)};const L=F[zlF]||A;
 return`<div class="screen dhome zl">${bsvHdr(zlt('a_'+k),'bsvback')}
 <div class="bkxhd">${zlIco(k)}<div><h3>${i(zlt('a_'+k))}</h3><small>${i(ddt('nDok',{n:A.length}))}</small></div></div>
 <div class="zlchips">${['all','new','act','exp','lnk'].map(f=>`<button type="button" class="${zlF===f?'on':''}" data-act="zlf" data-k="${f}">${i(zlt('f_'+f))} ${F[f].length}</button>`).join('')}</div>
 ${L.length?`<div class="dhcard odl">${L.map(d=>zlRowDoc(d,'')).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(A.length?zlt('noneF'):zlt('none'))}</p></div>`}
 <p class="dnnote">🔒 ${i(zlt('orig'))}</p></div>`}
Hooks.act('zlopen',d=>{zlSel=d.k||'son';zlF='all';R('zla')});
Hooks.act('zlf',d=>{zlF=d.k;v()});

/* --- on every document: area + «Verknüpft mit» --- */
function zlCard(){try{if(m.route!=='bdoc')return;const sc=document.querySelector('.screen');if(!sc)return;const d=zlDocs().find(z=>z.id===m.bdid);if(!d)return;
 const L=zlLinks(d),k=zlArea(d),key=d.id+'|'+k+'|'+L.map(x=>x.k+x.t).join(',');const ex=sc.querySelector('.zlcard');if(ex&&ex.dataset.k===key)return;
 const html=`<div class="dhcard zlcard" data-k="${i(key)}"><button type="button" class="odr zlr" data-act="zlset" data-id="${i(d.id)}">${zlIco(k,'s')}<span><small>${i(zlt('area'))}</small><b>${i(zlt('a_'+k))}</b>${d.zl?'':`<small>${i(zlt('areaAuto'))}</small>`}</span>${dhi('chev','sm')}</button>
 <div class="zllh">${i(zlt('lnkT'))}</div>${L.length?`<div class="zlchips zll">${L.map(x=>`<button type="button" ${x.act}><b>${i(zlt('k_'+x.k))}</b>${x.t?' · '+i(x.t):''} ›</button>`).join('')}</div>`:`<small class="zlno">${i(zlt('lnkNo'))}</small>`}</div>`;
 const w=document.createElement('div');w.innerHTML=html;const el=w.firstElementChild;if(ex){ex.replaceWith(el);return}
 const after=sc.querySelector('.bsvlb')||sc.querySelector('.sub-hdr');if(after)after.after(el);else sc.prepend(el)}catch(e){Hooks.err('zlcard',e)}}
Hooks.on('render',()=>{zlCard();setTimeout(zlCard,120)});
Hooks.act('zlset',d=>{const doc=zlDocs().find(z=>z.id===d.id);if(!doc)return;const cur=zlArea(doc);
 H(zlt('areaQ'),`<div class="dhcard odl">${ZL_A.map(([k])=>`<button type="button" class="odr zlr${k===cur?' on':''}" data-zk="${k}">${zlIco(k,'s')}<span><b>${i(zlt('a_'+k))}</b></span>${k===cur?bsvi('ok'):''}</button>`).join('')}</div>`,
 el=>{el.classList.add('bsvsh');el.addEventListener('click',e=>{const b=e.target.closest('[data-zk]');if(!b)return;doc.zl=b.dataset.zk;$();el.remove();const c=document.querySelector('.zlcard');if(c)c.dataset.k='';zlCard()})})});

/* --- Gesundheit & Vorsorge: «Verknüpfte Dokumente (aus Dokumente)» --- */
const zlFrom=k=>{const n=zlDocs().filter(d=>zlArea(d)===k).length;return`<button type="button" class="dhcard odr zlr zlfrom" data-act="zlopen" data-k="${k}">${iknF('fld',zlA(k)[2],'s')}<span><b>${i(zlt('linkedDocs'))}</b><small>${i(zlt('fromDok'))}</small></span><em class="zln">${n}</em>${dhi('chev','sm')}</button>`};
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;if(m.route==='ges'&&h.includes('kgw')&&!(kgG().pin&&!kgUnlocked)&&!h.includes('zlfrom'))return h.replace(/<\/div>\s*$/,zlFrom('ges')+'</div>');
 if(m.route==='dnach'&&h.includes('vnxrows')&&!h.includes('zlfrom')&&(g.dnach||{}).tab!=='a')return h.replace('<button type="button" class="dhcard vnxst"',zlFrom('vors')+'<button type="button" class="dhcard vnxst"')}catch(e){Hooks.err('zlfrom',e)}return h});

/* --- routes --- */
try{OD_OK.add('zla');Te.includes('zla')||Te.push('zla');AG_R.push('zla')}catch{}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='zla')return zlScr()}catch(e){Hooks.err('zlscr',e)}});
/* two more symbols for the folder icons (contracts list) */
try{Object.assign(IKN_E,{'📶':['phone','auto'],'🏋':['heart','arb'],'🏋️':['heart','arb'],'🏋️‍♂️':['heart','arb'],'📱':['phone','auto'],'🌐':['link','auto'],'⚡':['bolt','wohn'],'🎬':['star','bild'],'🎵':['star','bild'],'🎶':['star','bild'],'🏡':['house','wohn'],'💳':['coins','fin'],'🚘':['car','auto']})}catch{}
Hooks.css('docs-zentrale',`.zltabs{display:flex;background:var(--card,#fff);border-radius:14px;padding:4px;gap:4px;margin:6px 0 12px}.zltabs button{flex:1;border:0;background:none;border-radius:10px;padding:8px 2px;font-weight:600;font-size:13px;color:inherit}.zltabs button.on{background:var(--green);color:#fff}
.zlr{display:flex!important;align-items:center;gap:12px;width:100%}.zlr>span{flex:1;display:flex;flex-direction:column;min-width:0}.zlr small{opacity:.62;font-size:12.5px}.zln{font-style:normal;font-weight:700;font-size:13px;color:var(--green);background:color-mix(in srgb,var(--green) 13%,transparent);padding:2px 9px;border-radius:12px}
.zlchips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}.zlchips button{border:1px solid var(--line);background:var(--card,#fff);border-radius:18px;padding:6px 11px;font-size:13px;color:inherit}.zlchips button.on{background:var(--green);border-color:var(--green);color:#fff}
.zlcard{margin:8px 0 12px}.zllh{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.55;margin:10px 0 6px}.zll button{background:color-mix(in srgb,var(--green) 8%,var(--card,#fff))}.zlno{opacity:.6}
.zlfrom{border:0;text-align:left;color:inherit;margin:10px 0}.zlorig{margin:0 0 8px}`);
