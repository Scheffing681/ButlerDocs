/* ===== Butler Docs: «Mehr», Familie and the areas in the new look «Glas» (v61), step 5 =====
   The same header as Dokumente/Fristen (‹ · BUTLER · right button, big title) on Mehr, Familie, Finanzen, Arbeit, Behörden,
   Vorsorge, every document category, Mappen, Aufgaben, Kalender, Notizen, Profil, Stil.
   Gold buttons and tabs take the accent colour. Every empty area shows «Noch leer – 3 erste Schritte» with one button per step. */
const agS={t:['Пока пусто — 3 первых шага','Noch leer – 3 erste Schritte','Still empty – 3 first steps'],s:['Так всё будет под рукой, когда понадобится.','So ist alles beisammen, wenn Sie es brauchen.','So everything is together when you need it.'],
 add:['добавить','hinzufügen','add'],scan:['сканировать','scannen','scan'],open:['открыть','öffnen','go there'],
 job:['Работодатель','Arbeitgeber','Employer'],jobS:['Название и с какого времени','Name und seit wann','Name and since when'],
 con:['Трудовой договор','Arbeitsvertrag','Employment contract'],conS:['Фото или файл','fotografieren oder Datei','photo or file'],
 pay:['Расчётный лист','Gehaltsabrechnung','Payslip'],payS:['Достаточно последнего','die letzte genügt','the latest is enough'],
 ba:['Бюргерамт','Bürgeramt hinzufügen','Add the citizens’ office'],baS:['Адрес, часы работы, запись','Adresse, Öffnungszeiten, Termin','Address, hours, appointment'],
 fa:['Финансовое ведомство','Finanzamt','Tax office'],faS:['Указать налоговый номер','Steuernummer eintragen','Enter the tax number'],
 br:['Письмо из ведомства','Brief vom Amt','Letter from an office'],brS:['Фото — срок найдётся сам','fotografieren – Frist wird gefunden','photograph it – the deadline is found'],
 kk:['Карта больничной кассы','Gesundheitskarte','Health insurance card'],kkS:['Обе стороны','Vorder- und Rückseite','Front and back'],
 ip:['Прививочный паспорт','Impfpass','Vaccination record'],ipS:['Все страницы с отметками','alle Seiten mit Einträgen','every page with entries'],
 ha:['Домашний врач','Hausarzt','Family doctor'],haS:['Имя и телефон в «Важных людях»','Name und Telefon bei «Wichtige Menschen»','Name and phone under «Important people»'],
 d1:['Сканировать документ','Dokument scannen','Scan a document'],d1S:['Края и тени убираются сами','Ränder und Schatten werden entfernt','Edges and shadows are removed'],
 d2:['Из фото','Aus Fotos','From photos'],d2S:['Снимки и скриншоты','Bilder und Screenshots','Pictures and screenshots'],
 d3:['Файл или PDF','Datei oder PDF','File or PDF'],d3S:['Из «Файлов» и iCloud','Aus «Dateien» und iCloud','From «Files» and iCloud']};
const agt=k=>cv5n(agS[k]||[k]);
const AG_R=['scan','post','letters','search','dall','people','fzm','kar','bsv','dccat','dnach','mpx','tasks','mycal','notiz','life','profile','style','reminders'];
/* the steps: [title, subtitle, icon, button word, what it does] */
const AG_STEPS={
 kar:[['job','jobS','brief','add','act:krjobed'],['con','conS','file','scan','cam'],['pay','payS','coin','scan','cam']],
 bsv:[['ba','baS','gov','add','act:bsvcat'],['fa','faS','coin','add','act:bsvcat'],['br','brS','mail','scan','cam']],
 med:[['kk','kkS','id','scan','cam'],['ip','ipS','heart','scan','cam'],['ha','haS','users','open','go:people']],
 doc:[['d1','d1S','scan','scan','cam'],['d2','d2S','pic','add','pic'],['d3','d3S','file','add','file']]};
const agIc=k=>{try{return STI[k]?sti(k):dhi(k)}catch{return''}};
function agEmpty(kind,big){const S=AG_STEPS[kind];if(!S)return'';
 return`<div class="agempty"><div class="agbig">${agIc(big)}</div><b>${i(agt('t'))}</b><small>${i(agt('s'))}</small></div>
 <div class="agsteps">${S.map(([t,s,ic,w,a],j)=>`<div class="agstep"><span class="agi">${agIc(ic)}</span><span class="agtx"><b>${i(agt(t))}</b><small>${i(agt(s))}</small></span><button type="button" class="agb${w==='scan'?' sc':''}" data-agdo="${a}">${w==='add'?'＋ ':''}${i(agt(w))}</button></div>`).join('')}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-agdo]');if(!b)return;const a=b.dataset.agdo;
 try{if(a.startsWith('act:')){const x=document.querySelector(`.screen [data-act="${a.slice(4)}"]`);if(x)x.click();else if(L[a.slice(4)])L[a.slice(4)]({})}
  else if(a.startsWith('go:'))R(a.slice(3));else if(a==='cam')stPick(null);else if(a==='pic')stPick('.sc9gi:not(.sc9ni)');else if(a==='file')stPick('.sc9fi')}catch(er){Hooks.err('agdo',er)}});
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn()||!AG_R.includes(m.route))return;const sc=document.querySelector('.screen');if(!sc)return;sglHead(sc);
 if(sc.querySelector('.agempty'))return;let kind=null,anchor=null,big='fld';
 if(m.route==='kar'){const on=sc.querySelector('.krtabs button.on');const none=sc.querySelector(':scope>.dhcard>.dhnone');if(none&&on&&on===sc.querySelector('.krtabs button')){kind='kar';anchor=none.parentElement;big='brief'}}
 else if(m.route==='bsv'){const none=sc.querySelector(':scope>.dhcard>.dhnone');if(none&&!sc.querySelector('.bsvr,.bsvrow,.odr')){kind='bsv';anchor=none.parentElement;big='gov'}}
 else if(m.route==='dccat'){const em=sc.querySelector(':scope>p.empty');if(em){kind=m.dccat==='med'?'med':'doc';anchor=em;big=m.dccat==='med'?'heart':'fld'}}
 if(kind&&anchor){anchor.insertAdjacentHTML('afterend',agEmpty(kind,big));anchor.classList.add('aghide');sc.classList.add('agscr')}}catch(e){Hooks.err('agareas',e)}});
Hooks.css('docs-areas-glas',`
.bgsub{margin:-8px 2px 12px!important;text-align:left!important;color:var(--muted)!important;font-size:15px!important}
:root[data-bd] .sglw .ttl,:root[data-bd] .sglw .dcsub:not(.bgsub){display:none}
:root[data-bd] .aghide,:root[data-bd] .agscr>.dcadd,:root[data-bd] .agscr>.bsvaddb{display:none!important}
.agempty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;border:1px solid var(--bd-edge,var(--line));border-radius:22px;background:var(--bd-glass,var(--surface));padding:18px 16px 16px;margin:0 0 12px}
.agbig{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--bd-acc,var(--green)) 18%,transparent);color:var(--bd-acc,var(--green));margin-bottom:6px}.agbig svg{width:30px;height:30px}
:root[data-bd="dunkel"] .agbig{background:var(--bd-acc);color:#05201A}
.agempty b{font-size:17px}.agempty small{font-size:14.5px;color:var(--muted)}
.agsteps{display:flex;flex-direction:column;gap:8px}
.agstep{display:flex;align-items:center;gap:10px;border:1px solid var(--bd-edge,var(--line));border-radius:16px;background:var(--bd-glass,var(--surface));padding:10px 10px 10px 12px}
.agi{flex:none;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--bd-acc,var(--green)) 12%,transparent);color:var(--bd-acc,var(--green))}.agi svg{width:20px;height:20px}
.agtx{flex:1;min-width:0}.agtx b{display:block;font-size:15.5px;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}.agtx small{display:block;font-size:13.5px;color:var(--muted);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.agb{flex:none;border:0;border-radius:12px;padding:8px 9px;font:700 13.5px var(--body);cursor:pointer;background:color-mix(in srgb,var(--bd-acc,var(--green)) 14%,transparent);color:var(--bd-acc,var(--green));max-width:40%;white-space:normal;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.agb.sc{background:var(--bd-acc,var(--green));color:#fff}:root[data-bd="dunkel"] .agb.sc{color:#05201A}:root[data-bd="dunkel"] .agb:not(.sc){color:var(--bd-acc)}
/* gold → accent */
:root[data-bd] .xpchip{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;color:var(--ink)!important}
:root[data-bd] .xpchip.on{background:var(--bd-acc)!important;color:#fff!important;border-color:transparent!important}:root[data-bd="dunkel"] .xpchip.on{color:#05201A!important}
:root[data-bd] .searchbox{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:16px!important}
:root[data-bd] .dcadd.gold,:root[data-bd] .bsvaddb,:root[data-bd] .gold.btn,:root[data-bd] .btn.primary{background:var(--bd-acc)!important;color:#fff!important;border:0!important;background-image:none!important;box-shadow:0 8px 20px color-mix(in srgb,var(--bd-acc) 30%,transparent)!important}
:root[data-bd="dunkel"] .dcadd.gold,:root[data-bd="dunkel"] .bsvaddb{color:#05201A!important}
:root[data-bd] .fztabs{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:16px!important}
:root[data-bd] .fztabs button.on{background:var(--bd-acc)!important;color:#fff!important;background-image:none!important}:root[data-bd="dunkel"] .fztabs button.on{color:#05201A!important}
:root[data-bd] .fzsum{background:linear-gradient(140deg,var(--bd-acc),color-mix(in srgb,var(--bd-acc) 55%,#0b2a24))!important;color:#fff!important;border-radius:20px!important}
:root[data-bd] .fzsum small{color:#ffffffd8!important}
:root[data-bd] .dhcard.odl,:root[data-bd] .dhcard{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:18px!important}
:root[data-bd] .brt,:root[data-bd] .dht{border-radius:18px!important}
:root[data-bd] .brt em.r{background:#fde6e0!important;color:#a63b25!important}:root[data-bd="dunkel"] .brt em.r{background:#4d2216!important;color:#ffb39c!important}
`);
