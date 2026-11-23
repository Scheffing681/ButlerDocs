/* ===== Butler Docs: the dark «Smaragd» look (v56) — final concept, board 1 (dark) =====
   A new choice in Profil → Stil: deep emerald background with a soft glow, cards with a thin green edge,
   bright emerald accents and gold. It is built on «Glanz» (so every screen that already knows the dark gold look
   stays readable): g.style='smaragd' → <html data-style="glanz" data-sm="1">, and data-sm changes the colours.
   Only the look changes; nothing in the data. */
const smS={t:['Оформление','Erscheinungsbild','Appearance'],h:['Светлое','Hell','Light'],hs:['Слоновая кость и зелень','Elfenbein und Grün','Ivory and green'],n:['Изумруд','Smaragd','Emerald'],d:['Тёмно-зелёный со свечением','Dunkles Grün mit Leuchten','Dark green with a glow']};
const smt=k=>cv5n(smS[k]);
function smApply(){try{const r=document.documentElement;if(g&&g.style==='smaragd'){if(r.dataset.style!=='glanz')r.dataset.style='glanz';if(r.dataset.sm!=='1')r.dataset.sm='1';r.style.colorScheme='dark'}
 else if(r.dataset.sm){delete r.dataset.sm}}catch(e){Hooks.err('smapply',e)}}
Hooks.on('render',smApply);
/* the core sets data-style again on its own occasions (Ws); put «Glanz» back underneath each time */
try{new MutationObserver(()=>{if(g&&g.style==='smaragd'&&document.documentElement.dataset.style!=='glanz')smApply()}).observe(document.documentElement,{attributes:!0,attributeFilter:['data-style']})}catch{}
/* the choice on top of Profil → Stil: Hell or Smaragd */
Hooks.on('render',()=>{try{if(m.route!=='style'||document.querySelector('.smpick'))return;const sc=document.querySelector('.screen');const hd=sc&&sc.querySelector('.sub-hdr');if(!hd)return;
 const on=g.style==='smaragd',b=(v,c,lab,sub)=>`<button type="button" class="smo ${c}${(v==='sm')===on?' on':''}" data-act="smset" data-v="${v}"><span class="smsw"></span><b>${i(lab)}</b><small>${i(sub)}</small></button>`;
 const d=document.createElement('div');d.className='smpick';d.innerHTML=`<h3>${i(smt('t'))}</h3><div>${b('hell','smh',smt('h'),smt('hs'))}${b('sm','sms',smt('n'),smt('d'))}</div>`;hd.after(d)}catch(e){Hooks.err('smpick',e)}});
Hooks.act('smset',d=>{if(d.v==='sm'){if(g.style!=='smaragd'){g.smPrev=g.style||'auto';g.style='smaragd'}}else{g.style=g.smPrev&&g.smPrev!=='smaragd'?g.smPrev:'auto';delete document.documentElement.dataset.sm;try{Ws()}catch{}}$();v()});
Hooks.css('docs-smaragd',`
/* the palette of «Anordnung und Farbe» sits inline on <html>; !important wins over it */
:root[data-sm]{--bg:#07140d!important;--surface:#0f2418!important;--field:#132c1e!important;--line:#24503a!important;--ink:#eef5ea!important;--muted:#9fc2a8!important;--green:#2e9459!important;--green-ink:#ffffff!important;--gold:#f0c35a!important;--gold-soft:#2b2a16!important;--tile-bg:linear-gradient(#123222,#0d2618)!important;--tile-ink:#eef5ea!important;--tile-ic:#7fe0a6!important;--tile-line:#24503a!important;--tile-badge:#2e9459!important;--tile-bink:#ffffff!important;--tile-muted:#9fc2a8!important;--bd8a:#7fe0a6!important;--bd8o:#07140d!important;--bd8mu:#9fc2a8!important;--bd8nv:#0b1d13!important;--bd8ln:#24503a!important;--lg-bg:#0f3a24!important;--lg-gold:#f0c35a!important;--h10bot:#07140d!important;--gg:linear-gradient(145deg,#f0c35a 0%,#5fe39a 45%,#2e9459 70%,#f0c35a 100%)!important;--glow:0 0 12px rgba(79,208,138,.20),0 0 22px rgba(79,208,138,.08)!important;color-scheme:dark}
:root[data-sm] body,:root[data-sm] #app{background:radial-gradient(120% 60% at 50% 0%,#15462d 0%,#0a1d13 45%,#07140d 75%) fixed;background-color:#07140d}
.smpick{margin:4px 0 16px}.smpick h3{font-size:15px;margin:0 2px 8px;color:var(--muted);font-weight:600}.smpick>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.smo{display:flex;flex-direction:column;align-items:flex-start;gap:3px;border:1px solid var(--line);border-radius:18px;background:var(--surface);padding:10px 10px 12px;font:inherit;color:var(--ink)!important;text-align:left;cursor:pointer}
.smo.on{border:2px solid var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent)}.smo b{font-size:15.5px}.smo small{font-size:12px;color:var(--muted)}
.smsw{width:100%;height:64px;border-radius:12px;margin-bottom:6px}.smh .smsw{background:linear-gradient(160deg,#fbf7ee,#e9e0c9);box-shadow:inset 0 0 0 1px #e3d6bc}
.sms .smsw{background:radial-gradient(circle at 50% 15%,#2f9a5c 0%,#0f3a24 45%,#06120b 100%);box-shadow:inset 0 0 0 1px #3bb36a66,0 0 14px #3bb36a44}
/* cards: a thin emerald edge instead of a shadow */
:root[data-sm] .stcard,:root[data-sm] .stai,:root[data-sm] .sta,:root[data-sm] .stask,:root[data-sm] .stcb,:root[data-sm] .ddt,:root[data-sm] .ddqa button,:root[data-sm] .ddq,:root[data-sm] .ddbk,
:root[data-sm] .egm,:root[data-sm] .egok,:root[data-sm] .btq,:root[data-sm] .btc,:root[data-sm] .brw,:root[data-sm] .sptools button,:root[data-sm] .strow,:root[data-sm] .dhcard,:root[data-sm] .dht{
 background:rgba(15,36,24,.86)!important;box-shadow:0 0 0 1px #24503a,0 6px 18px rgba(0,0,0,.35)!important;border-color:transparent!important}
:root[data-sm] .sta.hl,:root[data-sm] .ddqa button.on{background:linear-gradient(160deg,#1f6b42,#124a2d)!important;box-shadow:0 0 0 1px #4fd08a,0 0 18px rgba(59,179,106,.35)!important;color:#eef5ea!important}
:root[data-sm] .ddqa button.on svg{color:#eef5ea}
:root[data-sm] .stbig,:root[data-sm] .ddsoon{background:linear-gradient(140deg,#2f9a5c,#14532f)!important;box-shadow:0 0 0 1px #4fd08a55,0 0 26px rgba(59,179,106,.30)!important}
:root[data-sm] .stsp,:root[data-sm] .nav .navplus,:root[data-sm] .ddqs,:root[data-sm] .egall,:root[data-sm] .bkpgo,:root[data-sm] .stsc{box-shadow:0 0 18px rgba(79,208,138,.45)!important}
:root[data-sm] .sta .dhi,:root[data-sm] .stmp .dhi,:root[data-sm] .ddqa button svg,:root[data-sm] .brw .dhi,:root[data-sm] .brt .dhi.big,:root[data-sm] .btq svg,:root[data-sm] .sptools button .dhi,:root[data-sm] .strow>.dhi:first-child{color:#7fe0a6}
:root[data-sm] .sta small.ok,:root[data-sm] .ddbk b{color:#7fe0a6}:root[data-sm] .sta small.y{color:#f0c35a}:root[data-sm] .sta small.r{color:#ff8e70}
:root[data-sm] .string{background:conic-gradient(#4fd08a var(--p),#1c3a2a 0)}:root[data-sm] .string>i{background:#0f2418}
:root[data-sm] .stav{box-shadow:0 0 0 3px #0f2418,0 0 14px rgba(79,208,138,.35)}
:root[data-sm] .egs.ok,:root[data-sm] .brt em,:root[data-sm] .btm .tg.off{background:#1f6b42;color:#d6f5e0}:root[data-sm] .egs.chk,:root[data-sm] .ddt em.y,:root[data-sm] .brt em.y{background:#4a3a12;color:#f6d78a}
:root[data-sm] .egs.dup,:root[data-sm] .ddt em.r,:root[data-sm] .brt em.r{background:#4d2216;color:#ffb39c}
:root[data-sm] .ddbk.no,:root[data-sm] .bkpwarn{background:#2f2a12!important;border-color:#6b5a1f!important;color:#f6d78a!important}:root[data-sm] .ddbk.no b{color:#f6d78a}
:root[data-sm] .egtabs button{background:rgba(15,36,24,.86);border-color:#24503a}:root[data-sm] .egtabs button.on{background:#2e9459;border-color:#4fd08a}
:root[data-sm] .btorb{box-shadow:0 0 50px rgba(59,179,106,.45),inset -12px -14px 26px rgba(4,19,11,.6),inset 8px 10px 22px rgba(255,255,255,.35);background:radial-gradient(circle at 32% 28%,#ffffffcc 0%,#9be8b4 25%,#2f9a5c 55%,#0f4a2a 85%)}
:root[data-sm] .spov,:root[data-sm] .bkpov{background:radial-gradient(120% 60% at 50% 0%,#15462d 0%,#07140d 70%)}
:root[data-sm] .sppg,:root[data-sm] .egth{background:#f4f4ef}
`);
