/* ===== Butler Docs: the Butler conversation in the new look «Glas» (v59), step 3 =====
   Header: ‹ back · BUTLER · ⋯ (the ⋯ sheet holds «Antworten vorlesen», «Gespräch löschen» and the mode line).
   Hero: the turquoise glass orb + «Wie kann ich helfen?». Bubbles: mine in the accent colour on the right, Butler's as glass cards.
   Deadline rows show a sign, not only a coloured dot: ⚠ overdue · ⏰ soon · ✓ later. The orb in the bar gets its ✦. */
const bgS={help:['Чем могу помочь?','Wie kann ich helfen?','How can I help?'],more:['Ещё','Weitere Optionen','More options'],back:['Назад','Zurück','Back'],
 read:['Читать ответы вслух','Antworten vorlesen','Read answers aloud'],on:['вкл.','an','on'],off:['выкл.','aus','off'],clear:['Очистить разговор','Gespräch löschen','Clear conversation'],
 clearS:['Документы и сроки останутся','Dokumente und Fristen bleiben','Documents and deadlines stay']};
const bgt=k=>cv5n(bgS[k]||[k]);
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn()||m.route!=='concierge')return;const sc=document.querySelector('.screen.chat');if(!sc)return;sc.classList.add('bgc');const hd=sc.querySelector('.sub-hdr');
 if(hd&&!sc.querySelector('.bghd')){const nh=document.createElement('div');nh.className='bghd';
  nh.innerHTML=`<button type="button" class="bgcb" data-act="bgback" aria-label="${i(bgt('back'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><span class="sgwm">BUTLER</span><button type="button" class="bgcb" data-act="bgmore" aria-label="${i(bgt('more'))}">⋯</button>`;
  hd.before(nh)}
 const h3=sc.querySelector('.bthero h3');if(h3&&h3.textContent!==bgt('help'))h3.textContent=bgt('help')}catch(e){Hooks.err('bgchat',e)}});
Hooks.act('bgmore',()=>{const st=(document.querySelector('.screen.chat .status')||{}).textContent||'';const on=g.voice!==!1;
 const sh=H('Butler',`<div class="sgm">${st?`<p class="sgmw">${i(st)}</p>`:''}<button type="button" data-a="voice">${i(bgt('read'))}<small>${i(on?bgt('on'):bgt('off'))}</small></button><button type="button" data-a="clear">${i(bgt('clear'))}<small>${i(bgt('clearS'))}</small></button></div>`);
 sh.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{sh.remove();try{if(b.dataset.a==='voice')L.voice();else L.clearchat()}catch(e){Hooks.err('bgmore',e)}})});
Hooks.css('docs-butler-glas',`
:root[data-bd] .screen.chat.bgc>.sub-hdr,:root[data-bd] .screen.chat.bgc>.status{display:none!important}
.bghd{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;margin:2px 0 6px}
.bgcb{width:44px;height:44px;border-radius:50%;border:1px solid var(--bd-edge,var(--line));background:var(--bd-glass,var(--surface));color:var(--ink);display:grid;place-items:center;font:700 20px/1 var(--body);cursor:pointer;padding:0}.bgcb svg{width:20px;height:20px}
:root[data-bd] .bthero h3{font:600 24px/1.2 var(--display)!important;letter-spacing:-.01em}
:root[data-bd] .bthero p{font-size:15px;color:var(--muted)}
:root[data-bd] .btorb{background:radial-gradient(circle at 34% 28%,#fff 0%,color-mix(in srgb,var(--bd-acc) 30%,#fff) 20%,var(--bd-acc) 55%,color-mix(in srgb,var(--bd-acc) 50%,#0b2a24) 100%)!important;
 box-shadow:0 16px 40px color-mix(in srgb,var(--bd-acc) 40%,transparent),inset -12px -14px 26px rgba(0,0,0,.2),inset 10px 10px 22px rgba(255,255,255,.45)!important}
:root[data-bd] .btorb:after{background:linear-gradient(90deg,transparent,#ffffffaa,#ffffffee,#ffffffaa,transparent)!important}
:root[data-bd="dunkel"] .btorb{box-shadow:0 0 50px color-mix(in srgb,var(--bd-acc) 45%,transparent),inset -12px -14px 26px rgba(0,0,0,.35),inset 10px 10px 22px rgba(255,255,255,.35)!important}
:root[data-bd] .screen.chat .msg.me{background:var(--bd-acc)!important;color:#fff!important;border-radius:20px 20px 6px 20px!important;font-size:16px}
:root[data-bd="dunkel"] .screen.chat .msg.me{color:#05201A!important}
:root[data-bd] .screen.chat .msg.bot{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:20px 20px 20px 6px!important;box-shadow:0 8px 24px rgba(20,40,35,.06)!important;color:var(--ink)!important;font-size:16px}
:root[data-bd] .btc{border-radius:14px!important}
:root[data-bd] .btc .btct small{font-size:13.5px}
:root[data-bd] .btd{width:auto!important;height:auto!important;background:none!important;border-radius:0!important;font-style:normal;font-size:15px;line-height:1}
:root[data-bd] .btd.r::before{content:"⚠";color:#c2412a}:root[data-bd] .btd.y::before{content:"⏰"}:root[data-bd] .btd.g::before{content:"✓";color:var(--bd-acc);font-weight:700}
:root[data-bd="dunkel"] .btd.r::before{color:#ff9c80}
:root[data-bd] .tg.off{background:color-mix(in srgb,var(--bd-acc) 16%,transparent)!important;color:var(--ink)!important;border-radius:9px}
:root[data-bd] .screen.chat .composer{background:transparent!important;border-top:0!important;gap:8px}
:root[data-bd] .screen.chat .composer input{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:24px!important;font-size:16px;color:var(--ink)}
:root[data-bd] .screen.chat .composer .micbtn{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;color:var(--bd-acc)!important}
:root[data-bd] .screen.chat .composer .send{background:var(--bd-acc)!important;color:#fff!important}:root[data-bd="dunkel"] .screen.chat .composer .send{color:#05201A!important}
/* the ✦ inside the orb of the bar */
.bdob{position:relative}.bdob::after{content:"✦";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:22px;text-shadow:0 1px 6px rgba(0,0,0,.25);opacity:.95}
`);
