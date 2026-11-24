/* ===== Butler Docs: «Dokumente» variant D and the Butler page (v52) — final concept, boards 2 and 5 =====
   Dokumente (route archive, while the new Start is on):
   - one line on top: is there a backup (tap → make one) and how many documents;
   - search over name, text and number, with the scanner one tap away;
   - four quick ways in: Scannen · Datei · Brief · Mappen;
   - «Bald fällig»: the next deadlines of documents (the same list as «Fristen», filter Dokumente);
   - the folders as coloured tiles, each with its count and a warning when a paper runs out;
   - with fewer than 3 documents: «Los geht's – die 3 wichtigsten» instead of «Bald fällig»;
   - «⋯»: letters, tax, contracts & insurances, deadlines, folder settings — what used to be in tabs and rows.
   Butler (route concierge): an empty chat starts with the orb and four questions Butler answers on the phone,
   without internet, from the owner's own data — answers come as cards one can tap. Typed questions still go to the
   basic Butler as before. «Ein Schreiben erklären» says honestly what works now and what needs the online AI later. */
const ddS={
 bkOk:['Сохранено %n дн. назад','Gesichert vor %n Tagen','Backed up %n days ago'],bkToday:['Сохранено сегодня','Heute gesichert','Backed up today'],
 nDok:['%n док.','%n Dok.','%n docs'],bkNo:['Резервной копии ещё нет','Noch keine Sicherung','No backup yet'],nDocs:['Документов: %n','%n Dokumente','%n documents'],
 q:['Поиск: название, текст, номер …','Suchen: Name, Text, Nummer …','Search: name, text, number …'],
 qa_scan:['Скан','Scannen','Scan'],qa_file:['Файл','Datei','File'],qa_letter:['Письмо','Brief','Letter'],qa_mpx:['Подборки','Mappen','Sets'],
 soon:['Скоро срок','Bald fällig','Due soon'],allN:['все %n','alle %n','all %n'],
 runs:['%n истекает','%n läuft ab','%n runs out'],gone:['%n истёк','%n abgelaufen','%n expired'],
 go3:['Начнём — 3 самых важных','Los geht’s – die 3 wichtigsten','Let’s start – the 3 most important'],
 go3S:['Тогда Батлер знает сроки, и в беде всё под рукой.','Damit Butler Fristen kennt und im Notfall alles da ist.','So Butler knows the deadlines and everything is there in an emergency.'],
 more:['Ещё','Mehr','More'],m_letters:['Входящие письма','Eingegangene Briefe','Incoming letters'],m_tax:['Налоги','Steuer','Tax'],
 m_ins:['Договоры и страховки','Verträge & Versicherungen','Contracts & insurances'],m_fold:['Настройка папок','Ordner verwalten','Manage folders'],
 /* Butler */
 hi:['Здравствуйте, я Батлер.','Hallo, ich bin Butler.','Hello, I am Butler.'],
 hiS:['Я знаю Ваши документы и сроки — и отвечаю без интернета.','Ich kenne Ihre Dokumente und Fristen – und antworte ohne Internet.','I know your documents and deadlines – and answer without internet.'],
 hiT:['Или спросите своими словами внизу.','Oder fragen Sie unten mit eigenen Worten.','Or ask below in your own words.'],
 b_letter:['Объяснить письмо','Ein Schreiben erklären','Explain a letter'],b_dl:['Какие сроки скоро?','Welche Fristen stehen an?','Which deadlines are coming?'],
 b_bank:['Подготовить документы для банка','Unterlagen für die Bank vorbereiten','Prepare papers for the bank'],b_miss:['Найти недостающие документы','Fehlende Dokumente finden','Find missing documents'],
 off:['без интернета','ohne Internet','without internet'],later:['ИИ · позже','KI · später','AI · later'],
 a_dl:['В ближайшие 30 дней сроков: %n.','In den nächsten 30 Tagen: %n Fristen.','In the next 30 days: %n deadlines.'],
 a_dlLate:['В ближайшие 30 дней сроков: %n, из них просрочено: %l.','In den nächsten 30 Tagen: %n Fristen, davon %l überfällig.','In the next 30 days: %n deadlines, %l of them overdue.'],
 a_dl0:['В ближайшие 30 дней сроков нет. Всё под контролем.','In den nächsten 30 Tagen steht keine Frist an. Alles im Griff.','No deadline in the next 30 days. All in hand.'],
 a_allDl:['Все сроки','Alle Fristen','All deadlines'],
 a_miss:['Из 8 важных документов у Вас есть %k.','Von 8 wichtigen Unterlagen haben Sie %k.','Of 8 key papers you have %k.'],
 a_miss8:['Все 8 важных документов на месте.','Alle 8 wichtigen Unterlagen sind da.','All 8 key papers are there.'],
 a_list:['Весь список','Ganze Liste','Whole list'],a_scan:['сканировать','scannen','scan'],a_miss1:['нет','fehlt','missing'],
 a_bank:['Для кредита банк обычно просит %n документов. У Вас готово: %k.','Für einen Kredit braucht die Bank meist %n Unterlagen. Sie haben %k davon.','For a loan the bank usually needs %n papers. You have %k of them.'],
 a_bankGo:['Собрать подборку «Кредит / банк»','Mappe «Kredit / Bank» anlegen','Create the set «Loan / bank»'],
 a_letter:['Сфотографируйте письмо: Батлер найдёт отправителя, дату и срок — без интернета. Объяснить письмо своими словами Батлер сможет с онлайн-ИИ: это будет позже и только с Вашего согласия.','Fotografieren Sie den Brief: Butler findet Absender, Datum und Frist – ohne Internet. Einen Brief in eigenen Worten erklären kann Butler erst mit der Online-KI; die kommt später und nur mit Ihrer Zustimmung.','Take a photo of the letter: Butler finds sender, date and deadline – without internet. Explaining a letter in its own words needs the online AI; that comes later and only with your consent.'],
 a_letterGo:['Сфотографировать письмо','Brief fotografieren','Photograph the letter']};
const ddt=(k,o)=>{let s=cv5n(ddS[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const DD_COL={personal:'#5b9bd5',family:'#d4a13c',prop:'#d4839b',work:'#b5794a',trans:'#6b80d6',edu:'#8d72c8',med:'#d36a6a',law:'#5fa57c',other:'#9d957f'};
/* --- Dokumente --- */
function ddBk(){try{const l=+g.bkLast||0;if(!l)return{ok:0,t:ddt('bkNo')};const n=Math.floor((Date.now()-l)/864e5);return{ok:n<30?1:0,t:n<1?ddt('bkToday'):ddt('bkOk',{n})}}catch{return{ok:0,t:ddt('bkNo')}}}
function ddFold(){const D=Vi(),c={},w={};const t0=stDays;D.forEach(d=>{let k='other';try{k=ho(d)}catch{}c[k]=(c[k]||0)+1;const e=d.end||(d.f&&d.f.valid);if(e&&/^\d{4}-\d\d-\d\d$/.test(e)){const n=t0(e);w[k]=w[k]||{r:0,g:0};if(n<0&&n>=-365)w[k].g++;else if(n>=0&&n<=90)w[k].r++}});
 return Kj.map(([k,ic])=>{const W=w[k]||{};const chip=W.g?{c:'r',t:ddt('gone',{n:W.g})}:W.r?{c:'y',t:ddt('runs',{n:W.r})}:null;
  return`<button type="button" class="ddt" data-act="dccat" data-v="${k}"><span class="ddf" style="--c:${DD_COL[k]||'#9d957f'}">${_(ic)}</span><b>${i(we('c_'+k))}</b><small>${i(ddt('nDok',{n:c[k]||0}))}</small>${chip?`<em class="${chip.c}">${i(chip.t)}</em>`:''}</button>`}).join('')}
function ddScreen(){const D=Vi(),bk=ddBk(),q=(m.ddq||'').trim().toLowerCase();
 const S=stDlAll().filter(t=>t.src==='doc'&&stDays(t.k)>=-60&&stDays(t.k)<=120);
 const soon=S.length?`<div class="ddsoon"><button type="button" class="ddsh" data-act="ddalldl">📅 <b>${i(ddt('soon'))}</b><span>${i(ddt('allN',{n:S.length}))} ›</span></button>${S.slice(0,3).map(t=>{const n=stDays(t.k);return`<button type="button" class="ddsr" ${t.act||'data-act="ddalldl"'}><i class="${n<0?'r':n<=30?'y':'g'}"></i><b>${i(t.t)}</b><span>${i(n<=60?stWhen(t.k):stDate(t.k))}</span></button>`}).join('')}</div>`:'';
 const F=stFull().slice(0,3);
 const go3=D.length<3?`<div class="dhcard ddgo"><h3>${i(ddt('go3'))}</h3><p>${i(ddt('go3S'))}</p>${F.map(x=>`<div class="strow ${x.ok?'ok':''}"><span class="stck">${x.ok?'✓':''}</span><span><b>${i(stt('k_'+x.k))}</b></span>${x.ok?'':`<button type="button" class="stsc" data-act="ddscan">${i(stt('fScan'))}</button>`}</div>`).join('')}</div>`:'';
 return`<div class="screen dhome ddw"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(we('title'))}</h2></div><button type="button" class="iconbtn" data-act="ddmore" aria-label="${i(ddt('more'))}">⋯</button></div>
 <button type="button" class="ddbk ${bk.ok?'ok':'no'}" data-act="${bk.ok?'ddnop':'bkrgo'}"><b>${bk.ok?'✓':'⚠'} ${i(bk.t)}</b><span>${i(ddt('nDocs',{n:D.length}))}</span></button>
 <div class="ddq">${_('search')}<input id="ddq" type="search" autocomplete="off" placeholder="${i(ddt('q'))}" value="${i(m.ddq||'')}"><button type="button" class="ddqs" data-act="go" data-to="sc9" aria-label="${i(ddt('qa_scan'))}">${dhi('scan')}</button></div>
 <div id="ddres">${q.length>=2?u8(q):''}</div>
 <div class="ddbody"${q.length>=2?' hidden':''}>
 <div class="ddqa"><button type="button" class="on" data-act="go" data-to="sc9">${dhi('scan')}<span>${i(ddt('qa_scan'))}</span></button><button type="button" data-act="ddfile">${sti('file')}<span>${i(ddt('qa_file'))}</span></button><button type="button" data-act="mlnew">${_('mail')}<span>${i(ddt('qa_letter'))}</span></button><button type="button" data-act="go" data-to="mpx">${sti('mpx')}<span>${i(ddt('qa_mpx'))}</span></button></div>
 ${go3||soon}
 <div class="ddg">${ddFold()}</div></div></div>`}
Hooks.on('screen',h=>{try{if(m.route==='archive'&&stOn()&&(m.dcTab||'docs')==='docs')return ddScreen()}catch(e){Hooks.err('ddscreen',e)}return h});
Hooks.act('ddnop',()=>{});
Hooks.act('ddscan',()=>stPick(null));Hooks.act('ddfile',()=>stPick('.sc9fi'));
Hooks.act('ddalldl',()=>{m.frF='doc';R('dsrok')});
Hooks.act('ddmore',()=>{const row=(ic,k,a)=>`<button type="button" class="strow" data-ddm="${a}">${ic}<span><b>${i(ddt(k))}</b></span>${dhi('chev','sm')}</button>`;
 H(ddt('more'),`<div class="stsheet">${row(_('mail'),'m_letters','mllist')}${row(_('doc'),'m_tax','taxopen')}${row(sti('brief'),'m_ins','fzkost')}${row(dhi('clock'),'a_allDl','ddalldl')}${row(_('arch'),'m_fold','dcold')}</div>`,sh=>{
  sh.querySelectorAll('[data-ddm]').forEach(b=>b.onclick=()=>{const a=b.dataset.ddm;sh.remove();if(a==='ddalldl'){m.frF='doc';R('dsrok');return}try{const x=document.createElement('button');x.type='button';x.dataset.act=a;x.hidden=!0;(document.querySelector('.screen')||document.body).appendChild(x);x.click();x.remove()}catch(e){Hooks.err('ddmore',e)}})})});
/* the search runs as you type (≥ 2 letters), over title, number and the recognised text */
document.addEventListener('input',e=>{const a=e.target;if(!a||a.id!=='ddq')return;m.ddq=a.value;clearTimeout(window.ddqT);window.ddqT=setTimeout(()=>{const q=(m.ddq||'').trim().toLowerCase(),r=document.getElementById('ddres'),b=document.querySelector('.ddbody');if(!r)return;
 const put=()=>{if((m.ddq||'').trim().toLowerCase()!==q)return;r.innerHTML=q.length>=2?u8(q):'';if(b)b.hidden=q.length>=2};if(q.length>=2)try{Au().then(put)}catch{}put()},220)});
/* --- Butler --- */
const BT_Q=['letter','dl','bank','miss'];
function btCards(k){const card=(ic,t,s,a,cls)=>`<button type="button" class="btc ${cls||''}" ${a}><span class="btci">${ic}</span><span class="btct"><b>${i(t)}</b>${s?`<small>${i(s)}</small>`:''}</span><span class="btgo">›</span></button>`;
 try{if(k==='dl'){const L2=stDlAll().filter(t=>{const n=stDays(t.k);return n>=-60&&n<=30});return L2.slice(0,4).map(t=>card('<i class="btd '+(stDays(t.k)<0?'r':stDays(t.k)<=7?'y':'g')+'"></i>',t.t,stDate(t.k)+' · '+stWhen(t.k),t.act||'data-act="go" data-to="dsrok"')).join('')+card(dhi('clock'),ddt('a_allDl'),'','data-act="go" data-to="dsrok"','lnk')}
 if(k==='miss'){const F=stFull().filter(x=>!x.ok);return F.slice(0,4).map(x=>card('<i class="btd y"></i>',stt('k_'+x.k),ddt('a_miss1'),'data-act="ddscan"')).join('')+card(sti('mpx'),ddt('a_list'),'','data-act="stfull"','lnk')}
 if(k==='bank'){const M={tpl:'kredit',pk:{},skip:{},extra:[]},S=mpxSum(M);return card('🏦',ddt('a_bankGo'),S.ok+' / '+S.need,'data-act="mpxnew" data-t="kredit"','lnk')+S.open.slice(0,4).map(r=>card('<i class="btd y"></i>',mpxT('s_'+r.s.k),r.st==='no'?ddt('a_miss1'):(r.W[0]||''),'data-act="mpxnew" data-t="kredit"')).join('')}
 if(k==='letter')return card(_('mail'),ddt('a_letterGo'),'','data-act="mlnew"','lnk')}catch(e){Hooks.err('btcards',e)}return''}
function btText(k){try{if(k==='dl'){const L2=stDlAll().filter(t=>{const n=stDays(t.k);return n>=-60&&n<=30}),l=L2.filter(t=>stDays(t.k)<0).length;return!L2.length?ddt('a_dl0'):l?ddt('a_dlLate',{n:L2.length,l}):ddt('a_dl',{n:L2.length})}
 if(k==='miss'){const n=stFull().filter(x=>x.ok).length;return n===8?ddt('a_miss8'):ddt('a_miss',{k:n})}
 if(k==='bank'){const S=mpxSum({tpl:'kredit',pk:{},skip:{},extra:[]});return ddt('a_bank',{n:S.need,k:S.ok})}
 if(k==='letter')return ddt('a_letter')}catch(e){Hooks.err('bttext',e)}return'—'}
const btMsg=x=>`<div class="msg bot btm">${i(x.t)} <span class="tg off">${i(ddt('off'))}</span>${x.bt==='letter'?` <span class="tg on">${i(ddt('later'))}</span>`:''}<div class="btcs">${btCards(x.bt)}</div></div>`;
function btHero(){return`<div class="bthero"><div class="btorb"></div><h3>${i(ddt('hi'))}</h3><p>${i(ddt('hiS'))}</p>
 <div class="btqs">${BT_Q.map(k=>`<button type="button" class="btq" data-act="btask" data-k="${k}">${{letter:_('mail'),dl:dhi('clock'),bank:'🏦',miss:sti('mpx')}[k]}<span>${i(ddt('b_'+k))}</span></button>`).join('')}</div><small>${i(ddt('hiT'))}</small></div>`}
Hooks.on('screen',h=>{try{if(m.route!=='concierge'||typeof h!=='string'||!stOn())return h;
 const C=Array.isArray(g.chat)?g.chat:[];const body=C.length?C.map(x=>x&&x.bt?btMsg(x):hu(x)).join('')+(m.busy?`<div class="msg bot think" id="live">${K('thinking')}</div>`:''):btHero();
 return h.replace(/<div class="msgs">[\s\S]*?<\/div>(\s*<form class="composer")/,(s,f)=>`<div class="msgs btmsgs">${body}</div>${f}`).replace('class="screen chat"','class="screen chat btw"')}catch(e){Hooks.err('btscreen',e);return h}});
Hooks.act('btask',d=>{const k=d.k;if(!BT_Q.includes(k))return;g.chat=Array.isArray(g.chat)?g.chat:[];g.chat.push({r:'me',t:ddt('b_'+k)},{r:'bot',t:btText(k),bt:k});$();v();
 setTimeout(()=>{try{const M=document.querySelector('.btmsgs');M&&M.lastElementChild&&M.lastElementChild.scrollIntoView({block:'start',behavior:'smooth'})}catch{}},60)});
Hooks.css('docs-dokumente-butler',`
.ddw>*{flex-shrink:0}.ddw .h9tabs{display:none!important}
.btw .btq,.btw .btc,.btw .bthero p,.btw .bthero small,.btw .btm{font-family:-apple-system,"SF Pro Text",system-ui,sans-serif}
.ddbk{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;border:1px solid var(--line);border-radius:14px;background:var(--surface);padding:9px 13px;margin:2px 0 10px;font:inherit;font-size:13.5px;color:var(--muted)!important;cursor:pointer}
.ddbk b{font-weight:600;color:var(--green)}.ddbk.no{background:#fdf3dd;border-color:#ecd39a}.ddbk.no b{color:#8a5a0c}
.ddq{display:flex;align-items:center;gap:10px;border:1px solid var(--line);border-radius:18px;background:var(--surface);padding:6px 6px 6px 14px;margin-bottom:12px}.ddq>svg{width:19px;height:19px;color:var(--muted);flex:none}
.ddq input{flex:1;min-width:0;border:0;background:none;font:inherit;font-size:15.5px;color:var(--ink);outline:none;padding:6px 0}
.ddqs{flex:none;width:40px;height:40px;border-radius:12px;border:0;background:var(--green);color:#fff!important;display:flex;align-items:center;justify-content:center}.ddqs .dhi{width:20px;height:20px}
.ddqa{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-bottom:12px}
.ddqa button{display:flex;flex-direction:column;align-items:center;gap:5px;border:0;border-radius:18px;background:var(--surface);box-shadow:0 3px 12px rgba(20,60,30,.07);padding:12px 2px 10px;font:inherit;font-size:13px;color:var(--ink)!important;cursor:pointer}
.ddqa button svg{width:22px;height:22px;color:var(--green)}.ddqa button.on{background:linear-gradient(160deg,#f1d58e,#dcb35c);color:#3a2a08!important}.ddqa button.on svg{color:#3a2a08}
.ddsoon{border-radius:22px;background:linear-gradient(150deg,color-mix(in srgb,var(--green) 88%,#3a7a52),var(--green));color:#eef5ea;padding:12px 14px 6px;margin-bottom:12px;box-shadow:0 8px 20px color-mix(in srgb,var(--green) 30%,transparent)}
.ddsh{display:flex;align-items:center;justify-content:flex-start!important;text-align:left;gap:8px;width:100%;border:0;background:none;color:#fff!important;font:inherit;padding:0 0 6px;cursor:pointer}.ddsh b{font-size:16px;flex:1;text-align:left}.ddsh span{margin-left:auto;color:#f1d58e;font-size:13.5px}
.ddsr{display:flex;align-items:center;gap:10px;width:100%;border:0;border-top:1px solid rgba(255,255,255,.14);background:none;color:#eef5ea!important;font:inherit;padding:10px 0;text-align:left;cursor:pointer}
.ddsr i{flex:none;width:9px;height:9px;border-radius:50%}.ddsr i.r{background:#ef7a5a}.ddsr i.y{background:#f1c75a}.ddsr i.g{background:#6fd394}
.ddsr b{flex:1;min-width:0;font-weight:600;font-size:14.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ddsr span{flex:none;font-size:12.5px;opacity:.85}
.ddg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
.ddt{display:flex;flex-direction:column;align-items:center;gap:3px;border:0;border-radius:18px;background:var(--surface);box-shadow:0 3px 12px rgba(20,60,30,.07);padding:12px 4px 10px;font:inherit;color:var(--ink)!important;min-width:0;cursor:pointer}
.ddt b{font-size:13.5px;font-weight:650;line-height:1.2;text-align:center;hyphens:auto!important;-webkit-hyphens:auto!important;overflow-wrap:break-word;max-width:100%}.ddt small{font-size:12px;color:var(--muted)}
.ddt em{font-style:normal;font-size:11px;border-radius:8px;padding:2px 7px;margin-top:2px;white-space:nowrap}.ddt em.y{background:#fbecd2;color:#8a5a0c}.ddt em.r{background:#fde4dc;color:#a8432a}
.ddf{position:relative;width:56px;height:42px;margin:4px 0 4px;border-radius:4px 9px 9px 9px;background:linear-gradient(170deg,color-mix(in srgb,var(--c) 70%,#fff),var(--c));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px color-mix(in srgb,var(--c) 35%,transparent)}
.ddf:before{content:'';position:absolute;left:0;top:-6px;width:24px;height:9px;border-radius:4px 6px 0 0;background:color-mix(in srgb,var(--c) 80%,#000 8%)}
.ddf svg{width:20px;height:20px;color:#fff;stroke:#fff;position:relative}
.ddgo{margin-bottom:12px}.ddgo h3{font-family:var(--serif,inherit);font-size:21px;margin:0 0 2px}.ddgo p{color:var(--muted);font-size:13.5px;margin:0 0 10px}.ddgo .strow{margin-top:8px}
#ddres .dcdocs{margin-bottom:12px}
/* Butler */
.btw .msgs.btmsgs{display:flex;flex-direction:column}
.bthero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:6px 4px 10px}
.btorb{width:128px;height:128px;border-radius:50%;margin:6px 0 14px;position:relative;overflow:hidden;background:radial-gradient(circle at 32% 28%,#ffffffee 0%,#dff0d6 22%,#9fd3a6 48%,#4f9a68 72%,#2f6b3e 100%);box-shadow:0 14px 34px rgba(47,107,62,.35),inset -12px -14px 26px rgba(31,91,55,.4),inset 8px 10px 22px rgba(255,255,255,.65);animation:btpulse 4s ease-in-out infinite}
.btorb:after{content:'';position:absolute;left:-10%;right:-10%;top:46%;height:22px;border-radius:50%;background:linear-gradient(90deg,transparent,#e9ffe0cc,#ffffffee,#bff0c8cc,transparent);filter:blur(3px);transform:rotate(-8deg)}
@keyframes btpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}@media (prefers-reduced-motion:reduce){.btorb{animation:none}}
.bthero h3{font-family:var(--serif,inherit);font-size:26px;margin:0}.bthero p{color:var(--muted);font-size:14.5px;margin:4px 10px 14px;line-height:1.4}.bthero small{color:var(--muted);font-size:12.5px;margin-top:10px}
.btqs{display:flex;flex-direction:column;gap:9px;width:100%}
.btq{display:flex;align-items:center;gap:12px;width:100%;border:0;border-radius:18px;background:var(--surface);box-shadow:0 3px 12px rgba(20,60,30,.08);padding:13px 15px;font:inherit;font-size:15px;color:var(--ink)!important;text-align:left;cursor:pointer}
.btq:first-child{background:linear-gradient(90deg,color-mix(in srgb,var(--green) 14%,var(--surface)),var(--surface))}.btq svg{width:20px;height:20px;color:var(--green);flex:none}
.btm .tg{display:inline-block;font-size:11px;border-radius:7px;padding:1px 7px;vertical-align:1px}.btm .tg.off{background:#e3f1e3;color:#2f6b3e}.btm .tg.on{background:#efe4ff;color:#6a4bb0}
.btcs{display:flex;flex-direction:column;gap:6px;margin-top:9px}
.btc{display:flex;align-items:center;gap:10px;width:100%;border:1px solid var(--line);border-radius:13px;background:var(--surface);padding:8px 10px;font:inherit;color:var(--ink)!important;text-align:left;cursor:pointer}
.btc.lnk{background:color-mix(in srgb,var(--green) 9%,var(--surface));border-color:color-mix(in srgb,var(--green) 25%,var(--line))}
.btci{flex:none;width:22px;display:flex;justify-content:center;color:var(--green)}.btci svg{width:18px;height:18px}.btd{width:9px;height:9px;border-radius:50%;display:block}.btd.r{background:#e0684a}.btd.y{background:#e5a83a}.btd.g{background:#4f9a68}
.btct{flex:1;min-width:0;display:flex;flex-direction:column}.btct b{font-size:14px;font-weight:600;line-height:1.25}.btct small{font-size:12px;color:var(--muted)}.btgo{color:var(--green);font-weight:700}
`);
