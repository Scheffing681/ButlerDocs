/* ===== Butler Docs: the document screen in the new look «Glas» (v62), step 6 — look only, nothing in its work changes =====
   Glas header (‹ · BUTLER, big title), glass cards, the gold accents (Ändern, Gültigkeit, the type card, the details badge) take the accent colour,
   Gültigkeit gets a sign: ⚠ expired · ⏰ soon · ✓ valid. */
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn())return;const sc=document.querySelector('.screen.dzv')||(m.route==='bdoc'&&document.querySelector('.screen.bizs'));if(!sc)return;sglHead(sc);sc.classList.add('dgw')}catch(e){Hooks.err('dgdoc',e)}});
Hooks.css('docs-doc-glas',`
:root[data-bd] .dgw .bgtitle{font-size:26px;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
:root[data-bd] .dgw .dccard,:root[data-bd] .dgw .dcinfo,:root[data-bd] .dgw .dcval,:root[data-bd] .dgw .dcsw,:root[data-bd] .dgw .dtcard,:root[data-bd] .dgw .inssec,:root[data-bd] .dgw .dcbtn,:root[data-bd] .dgw .st5show{
 background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;box-shadow:0 6px 18px rgba(20,40,35,.05)!important;border-radius:18px!important;background-image:none!important}
:root[data-bd] .dgw .dccard{background:transparent!important;border:0!important;box-shadow:none!important}
:root[data-bd] .dgw .dcprev{border-radius:20px!important;border:1px solid var(--bd-edge)!important;overflow:hidden}
:root[data-bd] .dgw .dcbtn{color:var(--ink)!important}:root[data-bd] .dgw .dcbtn svg{color:var(--bd-acc)!important}
:root[data-bd] .dgw .dc2hd em{background:color-mix(in srgb,var(--bd-acc) 14%,transparent)!important;color:var(--bd-acc)!important;border:0!important;font-style:normal}
:root[data-bd] .dgw .dcval b{color:var(--ink)!important}
:root[data-bd] .dgw .dcval.y b::before{content:"⏰ "}:root[data-bd] .dgw .dcval.r b::before{content:"⚠ ";color:#c2412a}:root[data-bd] .dgw .dcval.g b::before{content:"✓ ";color:var(--bd-acc)}
:root[data-bd] .dgw .dcsw.on i,:root[data-bd] .dgw .dcsw.on i::before{background-color:var(--bd-acc)!important}
:root[data-bd] .dgw .dtcard{border-color:color-mix(in srgb,var(--bd-acc) 40%,transparent)!important}
:root[data-bd] .dgw .dtnum{background:color-mix(in srgb,var(--bd-acc) 8%,transparent)!important;border-color:color-mix(in srgb,var(--bd-acc) 35%,transparent)!important}
:root[data-bd] .dgw .linkbtn{color:var(--bd-acc)!important}
:root[data-bd] .dgw .inssh>span:first-child{background:var(--bd-acc)!important;color:#fff!important;border-color:transparent!important}
:root[data-bd] .dgw .inssh{color:var(--bd-acc)!important}
:root[data-bd] .dgw .mldocbar .btn{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;color:var(--ink)!important;border-radius:14px!important}
:root[data-bd] .dgw .field{border-radius:12px!important}
:root[data-bd] .dgw .dtsec .btn,:root[data-bd] .dgw .dzbtns .btn{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;color:var(--ink)!important}
`);
