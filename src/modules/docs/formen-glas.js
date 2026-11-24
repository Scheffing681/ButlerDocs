/* ===== Butler Docs: group C of the check (v73) — sheets that were old or overloaded =====
   «Dokument erfassen»: the two «in der App» entries (printer over WLAN, passport chip) are hidden until the store app.
   «Neue Aufgabe / Frist»: only «Was» and «Wann»; time, priority, project, repeat, kind, person and steps under «Weitere Angaben».
   «Brief erhalten»: no emoji, calm headings, the long how-to folded.
   Notizen and Finanzen: single emoji icons sit in a calm tinted tile like the rest of the app. */
const fgS={more:['＋ Ещё подробности (время, повтор, человек …)','＋ Weitere Angaben (Uhrzeit, Wiederholung, Person …)','＋ More details (time, repeat, person …)'],
 less:['− Меньше','− Weniger','− Less']};
const fgt=k=>cv5n(fgS[k]||[k]);
const FG_EMO=/^\p{Extended_Pictographic}️?$/u;
function fgTask(root){root.querySelectorAll('form.f').forEach(f=>{if(f.dataset.fg||!f.querySelector('input[name=t]')||!f.querySelector('input[name=due]'))return;f.dataset.fg=1;f.classList.add('fgx');
 [...f.children].forEach(c=>{if(c.tagName==='LABEL'&&(c.querySelector('input[name=t]')||c.querySelector('input[name=due]')))c.classList.add('fgk')});
 const due=f.querySelector('input[name=due]').closest('label');const b=document.createElement('button');b.type='button';b.className='fgtog';b.textContent=fgt('more');
 b.onclick=()=>{const o=f.classList.toggle('open');b.textContent=o?fgt('less'):fgt('more')};due.after(b)})}
function fgLetter(root){const s=root.querySelector&&root.querySelector('.mlnew')||(root.classList&&root.classList.contains('mlnew')?root:null);const host=s?s.closest('.dtsheet')||s:null;if(!host||host.dataset.fg)return;host.dataset.fg=1;host.classList.add('fgml');
 const w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT);let n;const strip=/^\s*(\p{Extended_Pictographic}️?\s*)+/u;while(n=w.nextNode()){if(strip.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(strip,'')}
 host.querySelectorAll('details').forEach(d=>d.open=!1)}
function fgEmoji(){const sc=document.querySelector('.screen');if(!sc)return;sc.querySelectorAll('span,i,b,div,em').forEach(e=>{if(e.children.length||e.classList.contains('fgemo'))return;const t=(e.textContent||'').trim();if(t&&FG_EMO.test(t)&&parseFloat(getComputedStyle(e).fontSize)>=19)e.classList.add('fgemo')})}
const fgObs=new MutationObserver(ms=>{if(typeof bdOn!=='function'||!bdOn())return;for(const mu of ms)for(const nd of mu.addedNodes){if(nd.nodeType!==1)continue;try{fgTask(nd);fgLetter(nd)}catch(e){Hooks.err('fgobs',e)}}});
try{fgObs.observe(document.body,{childList:!0,subtree:!0})}catch{}
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn())return;if(m.route==='notiz'||m.route==='fzm'||m.route==='kar')fgEmoji()}catch(e){Hooks.err('fgemo',e)}});
Hooks.css('docs-formen-glas',`
:root[data-bd] .strow.stapp{display:none!important}
:root[data-bd] form.fgx:not(.open)>label:not(.fgk),:root[data-bd] form.fgx:not(.open)>.ax5subs,:root[data-bd] form.fgx:not(.open)>h4,:root[data-bd] form.fgx:not(.open)>.ax5subh{display:none!important}
.fgtog{display:block;width:100%;margin:4px 0 10px;border:1px dashed color-mix(in srgb,var(--bd-acc,var(--green)) 50%,transparent);border-radius:14px;background:none;color:var(--bd-acc,var(--green));font:600 15px var(--body);padding:11px 12px;text-align:left;cursor:pointer}
:root[data-bd] .fgml h4,:root[data-bd] .fgml .sith{color:var(--muted)!important;letter-spacing:.06em}
:root[data-bd] .fgml b{color:var(--ink)!important}
:root[data-bd] .fgml summary{color:var(--bd-acc)!important}
:root[data-bd] .fgemo{display:inline-grid!important;place-items:center;width:38px;height:38px;border-radius:12px;background:color-mix(in srgb,var(--bd-acc) 12%,transparent);font-size:19px;line-height:1;flex:none}
`);
