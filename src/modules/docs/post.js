/* ===== Butler Docs: «Post» (v64) — letters in one place, and «‹» goes back one step =====
   Start: the tile «Dokumente» (the bar already has it) becomes «Post». Eingang: «Datei» → «Post» (Datei stays under «Mehr»).
   The Post screen: Brief schreiben (the own «Briefe» editor: letterhead, envelope, PDF, e-mail, SMS) ·
   Brief bekommen (photo of a paper letter, or the text of an e-mail pasted — both the «Пришло письмо» sheet) ·
   Meine Briefe (received g.mail and written g.drafts together). Mail does not arrive by itself: the app has no mail server.
   Back: the Glas «‹» now steps back once (core `eg()`, the history), not straight to Start. */
const poS={t:['Почта','Post','Mail'],w:['Написать письмо','Brief schreiben','Write a letter'],wS:['С гербом, конвертом — PDF, e-mail или СМС','Mit Briefkopf, Umschlag – PDF, E-Mail oder SMS','With letterhead, envelope – PDF, e-mail or SMS'],wB:['Написать','Schreiben','Write'],
 in:['Пришло письмо','Brief bekommen','A letter came'],p:['Бумажное письмо','Brief aus dem Briefkasten','Letter from the mailbox'],pS:['Сфотографировать — Батлер найдёт срок','fotografieren – Butler findet die Frist','photograph it – Butler finds the deadline'],pB:['Фото','Foto','Photo'],
 e:['Письмо по e-mail','Brief per E-Mail','Letter by e-mail'],eS:['Скопировать текст в «Почте» и вставить','Text in «Mail» kopieren und hier einfügen','Copy the text in «Mail» and paste it'],eB:['Вставить','Einfügen','Paste'],
 my:['Мои письма','Meine Briefe','My letters'],all:['Все','Alle','All'],none:['Писем пока нет','Noch keine Briefe','No letters yet'],
 rcv:['получено','erhalten','received'],sent:['отправлено','gesendet','sent'],draft:['черновик','Entwurf','draft'],ok:['готово','erledigt','done'],
 note:['Письма не приходят сами: у приложения нет своего почтового сервера. Автоматически — только в версии для App Store.','Briefe kommen nicht von selbst an: die App hat keinen eigenen Mail-Server. Automatisch erst in der App-Store-Version.','Letters do not arrive by themselves: the app has no mail server of its own. Automatic only in the App Store version.'],
 n:['%n писем','%n Briefe','%n letters'],n1:['1 письмо','1 Brief','1 letter']};
const pot=(k,o)=>{let s=cv5n(poS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const PO_MAIL='<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l8.2 6 8.2-6"/>',PO_CAM='<path d="M4 8h3l1.6-2.2h6.8L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.6"/>',PO_PEN='<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',PO_PASTE='<rect x="6" y="4.5" width="12" height="16" rx="2"/><path d="M9.5 4.5h5v2.5h-5z"/><path d="M9 11h6M9 14.5h6"/>';
const poIc=p=>`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
['post'].forEach(r=>{Te.includes(r)||Te.push(r);OD_OK.add(r)});
function poList(){const R0=(g.mail||[]).map(x=>({k:'r',id:x.id,t:x.from||'—',s:[pot('rcv'),x.ref].filter(Boolean).join(' · '),due:x.status!=='done'?x.due:'',done:x.status==='done',at:x.at||x.date||x.due||''})),
 W=(g.drafts||[]).map(x=>({k:'w',id:x.id,t:x.subj||x.to||'—',s:[x.sent?pot('sent'):pot('draft'),x.to].filter(Boolean).join(' · '),at:x.at?new Date(x.at).toISOString().slice(0,10):''}));
 return[...R0.filter(x=>!x.done&&x.due).sort((a,b)=>String(a.due).localeCompare(String(b.due))),...[...R0.filter(x=>x.done||!x.due),...W].sort((a,b)=>String(b.at).localeCompare(String(a.at)))]}
const poCount=()=>(g.mail||[]).length+(g.drafts||[]).length;
function poScreen(){const L2=poList();
 const st=(ic,t,s,b,a,sc)=>`<div class="agstep"><span class="agi">${poIc(ic)}</span><span class="agtx"><b>${i(pot(t))}</b><small>${i(pot(s))}</small></span><button type="button" class="agb${sc?' sc':''}" data-poa="${a}">${i(pot(b))}</button></div>`;
 const pill=x=>{if(x.k==='w')return'';if(x.done)return`<span class="sgp g">✓ ${i(pot('ok'))}</span>`;if(!x.due)return'';const n=stDays(x.due);return`<span class="sgp ${n<0?'r':n<=7?'y':'g'}">${n<0?'⚠':n<=7?'⏰':'✓'} ${i(stWhen(x.due))}</span>`};
 const rows=L2.slice(0,6).map(x=>`<div class="sgr"><button type="button" class="sgi" data-pok="${x.k}" data-poi="${x.id}"><span><b>${i(x.t)}</b><small>${i(x.s)}</small></span>${pill(x)}</button></div>`).join('');
 return`<div class="screen dhome powr"><div class="sub-hdr"><button class="iconbtn" data-act="bgback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(pot('t'))}</h2></div><span></span></div>
 <div class="agsteps po1">${st(PO_PEN,'w','wS','wB','write',1)}</div>
 <h3 class="poh">${i(pot('in'))}</h3><div class="agsteps">${st(PO_CAM,'p','pS','pB','photo',1)}${st(PO_PASTE,'e','eS','eB','paste',0)}</div>
 <div class="stcard sgimp pomy"><div class="sgh"><b>${i(pot('my'))}</b>${L2.length?`<button type="button" data-poa="list">${i(pot('all'))} ›</button>`:''}</div>${rows||`<p class="sgnone">${i(pot('none'))}</p>`}</div>
 <p class="ponote">ℹ️ ${i(pot('note'))}</p></div>`}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='post')return poScreen()}catch(e){Hooks.err('poscreen',e)}});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-poa],[data-pok]');if(!b||!b.closest('.powr'))return;
 try{const a=b.dataset.poa;if(a==='write')R('letters');else if(a==='photo'||a==='paste')L.mlnew();else if(a==='list')L.mllist();
  else if(b.dataset.pok==='r')L.mlopen({id:b.dataset.poi});else if(b.dataset.pok==='w')f5(b.dataset.poi)}catch(er){Hooks.err('poact',er)}});
/* back one step */
Hooks.act('bgback',()=>{try{if(!eg())R('home')}catch{R('home')}});
/* Start: «Dokumente» tile → «Post» (only in the new look; the bar keeps Dokumente) */
const poSA=sgStart;sgStart=function(){let h=poSA.apply(this,arguments);try{const n=poCount();
 h=h.replace(/<button type="button" class="sta sga" data-k="docs"[^>]*>[\s\S]*?<\/button>/,`<button type="button" class="sta sga" data-k="post" data-act="go" data-to="post">${poIc(PO_MAIL)}<b>${i(pot('t'))}</b><small>${n?i(n===1?pot('n1'):pot('n',{n})):'&nbsp;'}</small></button>`)}catch(e){Hooks.err('postart',e)}return h};
/* Eingang: Datei → Post */
const poCap=sglCap;sglCap=function(){let h=poCap.apply(this,arguments);try{h=h.replace(/<button type="button" data-sglc="file">[\s\S]*?<\/button>/,`<button type="button" data-act="go" data-to="post">${poIc(PO_MAIL)}<span>${i(pot('t'))}</span></button>`)}catch(e){Hooks.err('pocap',e)}return h};
/* search: «почта», «Post» */
try{SP_L.unshift(['post','mail',['Почта','Post','Mail'],['почт','пошт','post','mail','e-mail','письм','писем','лист','brief','letter','mektup']])}catch(e){Hooks.err('posp',e)}
Hooks.css('docs-post',`
.powr .po1{margin-bottom:6px}.poh{font-size:13px!important;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:16px 4px 8px!important;font-weight:700}
.powr .pomy{margin-top:14px}.ponote{margin:8px 4px 0;font-size:14px;line-height:1.4;color:var(--muted)}
.powr .po1 .agi{background:var(--bd-acc,var(--green));color:#fff}:root[data-bd="dunkel"] .powr .po1 .agi{color:#05201A}
`);
