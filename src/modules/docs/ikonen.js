/* ===== Butler Docs: one icon style everywhere (v93) =====
   The app already has its own icon: a coloured folder with a white line symbol (.ddf — Start tiles, document categories).
   This module gives that same folder to every place that still shows an emoji or a bare symbol: list rows (.vaic),
   offices (.bsvemo), quick actions in Mein Business, «Mehr» rows with a leading emoji, the tiles of Arbeit & Business.
   One palette of ten category colours (also used by «Behörden & Dienste»), one set of line symbols.
   iknF(glyph,color,size) returns the folder; IKN_K holds the category colours; iknEmo(emoji) maps an emoji. */
const IKN_K={stadt:'#3F9FA3',fin:'#4E9E5F',arb:'#E3873A',ges:'#D65A69',recht:'#8B6FD0',auto:'#4A84D6',wohn:'#E0A92E',vers:'#A8714E',bild:'#A45EC6',weit:'#6E7C8C',gold:'#C59A3E',green:'#3E8E63'};
const IKN_G={
 amt:'<path d="M3 9.5L12 4l9 5.5M4.5 10h15M6 10v7.5M10 10v7.5M14 10v7.5M18 10v7.5M3.5 20h17"/>',
 coins:'<ellipse cx="9" cy="7" rx="5" ry="2.2"/><path d="M4 7v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V7M4 11v4c0 1.2 2.2 2.2 5 2.2 1 0 1.9-.1 2.6-.3"/><ellipse cx="16" cy="14" rx="4.5" ry="2"/><path d="M11.5 14v3.5c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V14"/>',
 ppl:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9.5" r="2.3"/><path d="M3.5 19c.5-3.2 2.7-5 5.5-5s5 1.8 5.5 5M14.5 19c.3-2.3 1.6-3.6 3.5-3.6s3 1.3 3.3 3.6"/>',
 heart:'<path d="M12 19.5s-7.5-4.6-7.5-10A4 4 0 0 1 12 7a4 4 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/><path d="M7.5 11.5h2.5l1-2 2 4 1-2h2.5"/>',
 scale:'<path d="M12 4v16M7 20h10M5 7h14M7 7l-3 6a3 3 0 0 0 6 0zM17 7l-3 6a3 3 0 0 0 6 0z"/>',
 car:'<path d="M5 16.5h14v-3.5l-1.8-4.5H6.8L5 13z"/><path d="M3.5 13h17M7 16.5v2M17 16.5v2"/><circle cx="8" cy="13.8" r=".6"/><circle cx="16" cy="13.8" r=".6"/>',
 house:'<path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/>',
 bolt:'<path d="M13 3L5.5 13.5H12L11 21l7.5-10.5H12z"/>',
 cap:'<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.5c3 2 8 2 11 0v-4.5M21.5 9.5v5"/>',
 grid:'<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 doc:'<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6"/>',
 brief:'<rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M9 7.5V5.5h6v2M3.5 12.5h17"/>',
 chart:'<path d="M5 20V11M12 20V5M19 20v-7"/>',
 clock:'<circle cx="12" cy="12.5" r="7.5"/><path d="M12 8.5v4.3l2.8 1.7"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 euro:'<path d="M17 7.5A6 6 0 1 0 17 16.5M5 10.5h8M5 13.5h7"/>',
 sun:'<circle cx="12" cy="12" r="3.5"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6"/>',
 fld:'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2h8.8A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/>',
 shield:'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.6 12l2.3 2.3 4.6-4.6"/>',
 bag:'<path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
 pill:'<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.6 8.6l4.8 6.8"/>',
 syr:'<path d="M15 4l5 5M17.5 6.5L8 16l-2 .5.5-2L16 5M12 8l4 4M4 20l2.5-2.5"/>',
 steth:'<path d="M6 4v5a4 4 0 0 0 8 0V4M10 13v2.5a4.5 4.5 0 0 0 9 0V13"/><circle cx="19" cy="11" r="2"/>',
 wrench:'<path d="M14.5 6.5a4 4 0 0 0 5 5l-8.5 8.5a2.1 2.1 0 0 1-3-3L16.5 8.5"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/>',
 mail:'<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
 lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
 star:'<path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M6 18l1.6-1.6M16.4 7.6L18 6"/>',
 id:'<rect x="3" y="5" width="18" height="14" rx="2.2"/><circle cx="8.6" cy="10.6" r="2"/><path d="M5.6 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4M14 9.5h4.5M14 12.5h4.5M14 15.5h3"/>',
 disk:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
 help:'<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2-2.4 3.6M12 17h.01"/>',
 map:'<path d="M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
 pin:'<path d="M12 21s6-5.6 6-10.5a6 6 0 0 0-12 0C6 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
 tag:'<path d="M4 12.5V5h7.5l8.5 8.5-7.5 7.5z"/><circle cx="8" cy="9" r="1.2"/>',
 copy:'<rect x="8" y="8" width="11.5" height="11.5" rx="2"/><path d="M5 15.5V6a1.5 1.5 0 0 1 1.5-1.5H16"/>',
 arch:'<rect x="3.5" y="4.5" width="17" height="4.5" rx="1"/><path d="M5 9v10.5h14V9M10 13h4"/>',
 down:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
 cloud:'<path d="M7 18.5a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6-1.3A4.3 4.3 0 0 1 17 18.5z"/>',
 zip:'<path d="M7 3.5h7l4 4v13H7z"/><path d="M11 5v2M11 9v2M11 13v2M10 17h2v2h-2z"/>',
 repeat:'<path d="M4 12a7 7 0 0 1 12-5l2 2M20 12a7 7 0 0 1-12 5l-2-2M18 4v5h-5M6 20v-5h5"/>',
 bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
 phone:'<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
 user:'<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.6-3.8 3.4-6 7-6s6.4 2.2 7 6"/>',
 camera:'<path d="M4 8.5h3.5L9 6h6l1.5 2.5H20v11H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
 receipt:'<path d="M6 3.5h12v17l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z"/><path d="M9 8h6M9 11.5h6M9 15h4"/>',
 box:'<path d="M3.5 7.5L12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5L12 11.5l8.5-4M12 11.5v9"/>',
 pen:'<path d="M15 4.5l4.5 4.5L9 19.5l-5 1 1-5z"/><path d="M13 6.5l4.5 4.5"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
 party:'<path d="M4 20l4.5-12 7.5 7.5z"/><path d="M14 4.5l.5 2M18.5 6l-1.5 1.5M20 10.5l-2 .5"/>',
 warn:'<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.2h.01"/>',
 inbox:'<path d="M3.5 13.5l2.5-8h12l2.5 8v6h-17z"/><path d="M3.5 13.5H9l1 2h4l1-2h5.5"/>',
 trash:'<path d="M4.5 7h15M9 7V4.5h6V7M6.5 7l1 13h9l1-13"/>',
 link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'};
const iknSvg=g=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKN_G[g]||IKN_G.fld}</svg>`;
const iknF=(g,c,sz)=>`<span class="ddf ikf${sz?' '+sz:''}" style="--c:${IKN_K[c]||c||IKN_K.weit}">${iknSvg(g)}</span>`;
/* emoji → [symbol, colour] — so old rows get the same folder */
const IKN_E={'📄':['doc','weit'],'📑':['doc','fin'],'📂':['fld','stadt'],'📁':['fld','vers'],'🗂':['fld','stadt'],'🛍':['bag','arb'],'🛡':['shield','green'],'⚖️':['scale','recht'],'⚖':['scale','recht'],'🔧':['wrench','vers'],
 '✉️':['mail','stadt'],'✉':['mail','stadt'],'📮':['mail','stadt'],'🩺':['steth','ges'],'💊':['pill','ges'],'💉':['syr','ges'],'🏥':['heart','ges'],'🦷':['heart','ges'],'🔒':['lock','weit'],'🔐':['lock','weit'],'✨':['spark','gold'],'⚙️':['gear','weit'],'⚙':['gear','weit'],
 '🪪':['id','auto'],'💾':['disk','weit'],'❓':['help','stadt'],'🗺':['map','stadt'],'📌':['pin','arb'],'🏷':['tag','wohn'],'⧉':['copy','recht'],'🗄':['arch','vers'],'⬇':['down','green'],'☁️':['cloud','auto'],'🗜':['zip','weit'],
 '🔁':['repeat','auto'],'💶':['euro','fin'],'💰':['coins','fin'],'🏦':['amt','fin'],'⏰':['clock','arb'],'⏱':['clock','arb'],'🚗':['car','auto'],'👪':['ppl','arb'],'👨‍👩‍👧':['ppl','arb'],'🎉':['party','bild'],'📅':['cal','auto'],'🗓':['cal','auto'],
 '🏛️':['amt','stadt'],'🏛':['amt','stadt'],'🛂':['id','stadt'],'🧾':['receipt','fin'],'💼':['brief','arb'],'👮':['shield','recht'],'🏫':['cap','bild'],'🎓':['cap','bild'],'⚽':['star','weit'],'🎵':['star','weit'],'⛪':['house','weit'],
 '🏠':['house','wohn'],'🐾':['heart','weit'],'📞':['phone','weit'],'⭐':['star','gold'],'🕵️':['user','recht'],'🔗':['link','weit'],'🧪':['heart','ges'],'🏢':['amt','weit'],'📷':['camera','auto'],'👤':['user','stadt'],'📝':['pen','recht'],
 '🔔':['bell','arb'],'⚠':['warn','arb'],'⚠️':['warn','arb'],'📥':['inbox','auto'],'🗑':['trash','weit'],'🖊':['pen','recht'],'🔑':['lock','gold'],'🏖':['sun','wohn'],'🤒':['heart','ges'],'🍼':['ppl','bild'],'🚙':['car','auto']};
const iknEmo=s=>{s=String(s||'').trim();return IKN_E[s]||IKN_E[s.replace(/️/g,'')]||null};
const IKN_LEAD=/^(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*)\s+/u;
function iknPaint(){const sc=document.querySelector('.screen');if(!sc)return;
 sc.querySelectorAll('.vaic:not([data-ik]),.bsvemo:not([data-ik])').forEach(el=>{el.dataset.ik=1;const e=iknEmo(el.textContent);if(!e)return;const big=el.classList.contains('big');el.innerHTML=iknF(e[0],e[1],big?'':'s');el.classList.add('ikw')});
 sc.querySelectorAll('.bzqa button>b:not([data-ik])').forEach(el=>{el.dataset.ik=1;const e=iknEmo(el.textContent);if(e){el.innerHTML=iknF(e[0],e[1],'m');el.classList.add('ikw')}});
 sc.querySelectorAll('.vaabot>span>b:not([data-ik]),.vaabot>b:not([data-ik])').forEach(el=>{el.dataset.ik=1;const t=el.firstChild;if(!t||t.nodeType!==3)return;const mm=IKN_LEAD.exec(t.nodeValue);if(!mm)return;const e=iknEmo(mm[1]);if(!e)return;t.nodeValue=t.nodeValue.slice(mm[0].length);
  const btn=el.closest('.vaabot');if(btn&&!btn.querySelector(':scope>.ikf')){btn.insertAdjacentHTML('afterbegin',iknF(e[0],e[1],'s'));btn.classList.add('ikrow')}});
 const AWT={'awzt':['cal','auto'],'awg':['euro','fin'],'awu':['sun','wohn'],'kropen':['doc','vers']};
 sc.querySelectorAll('.awtiles button:not([data-ik])').forEach(b=>{b.dataset.ik=1;const k=b.dataset.act==='go'?b.dataset.to:b.dataset.act,e=AWT[k];if(e){b.insertAdjacentHTML('afterbegin',iknF(e[0],e[1],'s'));b.classList.add('ikt')}});
 sc.querySelectorAll('.bzpr:not([data-ik])').forEach(b=>{b.dataset.ik=1;const k=b.dataset.act==='bzprep'?['chart','fin']:/lager|склад|stock/i.test(b.textContent)?['box','vers']:['tag','arb'];b.insertAdjacentHTML('afterbegin',iknF(k[0],k[1],'s'))})}
Hooks.on('render',()=>{try{iknPaint();setTimeout(iknPaint,60)}catch(e){Hooks.err('iknpaint',e)}});
Hooks.css('docs-ikonen',`.ikf.s{width:34px;height:26px;margin:4px 0 0;border-radius:3px 7px 7px 7px;flex:none}.ikf.s:before{width:15px;height:6px;top:-4px}.ikf.s svg{width:15px!important;height:15px!important}
.ikf.m{width:42px;height:32px;margin:6px auto 2px;border-radius:3px 8px 8px 8px}.ikf.m:before{width:18px;height:7px;top:-5px}.ikf.m svg{width:17px!important;height:17px!important}
.ikf svg{color:#fff!important;stroke:#fff!important;fill:none!important}.vaic.ikw,.bsvemo.ikw{background:none!important;width:auto!important;min-width:34px;font-size:0}.bsvemo.big.ikw{display:flex;justify-content:center}
.ikrow{display:flex!important;align-items:center;gap:12px}.ikrow>span{flex:1}.ikt{display:flex!important;flex-direction:column}.ikt .ikf{margin-bottom:6px}.bzpr .ikf{margin:2px 0 0}`);
