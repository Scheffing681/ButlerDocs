/* ===== Butler Docs: one place for the look (v72), group B of the check =====
   Profil → «Stil» is the one place: Hell / Dunkel / Auto, accent colour, «Untere Leiste», Schrift- und Kachelgröße.
   Gone in the new look (they belonged to the old design and fought with it): the old colour picker on «Anordnung»
   (Stilfarbe, Grundfarbe, Gold/Silber/Kupfer), old style kits, «Eigenen Stil gestalten», Baukasten, the old Start lists.
   Profil keeps «Schnellzugriff»; the duplicate rows («Anordnung und Farbe», Baukasten) leave Profil.
   Dokumente: the extra scan button inside the search field goes (Scannen stays once, in the quick actions). */
const ewS={bar:['Нижняя панель','Untere Leiste','Bottom bar'],barS:['Что стоит рядом с Батлером','Was neben Butler steht','What sits next to Butler'],
 stilS:['Светлое · Тёмное · Авто, цвет, нижняя панель','Hell · Dunkel · Auto, Farbe, untere Leiste','Light · Dark · Auto, colour, bottom bar']};
const ewt=k=>cv5n(ewS[k]||[k]);
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn())return;const sc=document.querySelector('.screen');if(!sc)return;
 if(m.route==='ly6'){sc.classList.add('egly6');const t=sc.querySelector(':scope>.bgtitle');t&&t.textContent!==ewt('bar')&&(t.textContent=ewt('bar'))}
 if(m.route==='style'){sc.classList.add('egsty');if(!sc.querySelector('.egbar')){const p2=sc.querySelector('.bdpick');if(p2){const b=document.createElement('button');b.type='button';b.className='ly6row egbar';b.dataset.act='go';b.dataset.to='ly6';
   b.innerHTML=`<span><b>${i(ewt('bar'))}</b><small>${i(ewt('barS'))}</small></span><i aria-hidden="true">›</i>`;p2.after(b)}}}
 if(m.route==='profile'){sc.classList.add('egpro');const r=sc.querySelector('.st39prow');if(r){const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT);let n2;while(n2=w.nextNode()){if(n2.parentElement&&n2.parentElement.tagName!=='B'&&n2.nodeValue.trim().length>12&&n2.nodeValue.includes(',')){n2.nodeValue=ewt('stilS');break}}}}
}catch(e){Hooks.err('egset',e)}});
Hooks.css('docs-einstellungen-glas',`
:root[data-bd] .egly6>*:not(.bghd):not(.bgtitle):not(.sub-hdr):not(.bned){display:none!important}:root[data-bd] .egly6 .bned>h3{display:none}
:root[data-bd] .egsty>.smpick,:root[data-bd] .egsty>.ly6row:not(.egbar),:root[data-bd] .egsty>.bd8row,:root[data-bd] .egsty>.br9qrow,:root[data-bd] .egsty>.section-s,:root[data-bd] .egsty>.st39pv,:root[data-bd] .egsty>.st41feat,:root[data-bd] .egsty>.st39b,:root[data-bd] .egsty>.st40ch,:root[data-bd] .egsty>.st40kg{display:none!important}
:root[data-bd] .egpro>.ly6row:not(.br9qrow):not(.ly7tour):not(.sp8row),:root[data-bd] .egpro>.bd8row{display:none!important}
.egbar{display:flex!important;align-items:center;gap:10px;width:100%;margin:0 0 14px;border:1px solid var(--bd-edge,var(--line));border-radius:18px;background:var(--bd-glass,var(--surface));color:var(--ink);font:inherit;padding:12px 14px;text-align:left;cursor:pointer}
.egbar span{flex:1}.egbar b{display:block;font-size:16px}.egbar small{display:block;color:var(--muted);font-size:13.5px}.egbar i{font-style:normal;color:var(--muted);font-size:20px}
:root[data-bd] .ddw .ddq [data-act=go]{display:none!important}
`);
