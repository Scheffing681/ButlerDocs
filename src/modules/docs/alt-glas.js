/* ===== Butler Docs: the remaining old screens in the new look (v71) =====
   Tresor, Testament & Vorsorge, Recht & Gesetze, Versicherungen, Vermögen, Projekte, Ihre Daten, Heute get the Glas header
   (via areas-glas AG_R); here their hard-coded gold (#C9A55E, rgba(201,165,94…), rgba(226,185,98…)) becomes the accent,
   gold chips/tabs turn turquoise, serif money figures turn sans, the dark «Staat» box of Recht turns into a glass card.
   Notizen and Finanzen: emoji icons become calm icon tiles. Look only. */
Hooks.css('docs-alt-glas',`
:root[data-bd] .krsi{background:color-mix(in srgb,var(--bd-acc) 14%,transparent)!important;filter:grayscale(.15)}
:root[data-bd] .vsg button.krp,:root[data-bd] .vsg .krplus,:root[data-bd] .vsg [class*=plus]{border-color:var(--bd-acc)!important;color:var(--bd-acc)!important}
:root[data-bd] .vsg em,:root[data-bd] .vsg i.ico{color:var(--bd-acc)!important;border-color:var(--bd-acc)!important}
:root[data-bd] .vsg>.odin,:root[data-bd] .vsg .vsginfo,:root[data-bd] .screen [class*=note],:root[data-bd] .tblaw{background:color-mix(in srgb,var(--bd-acc) 7%,var(--bd-glass))!important;border-color:color-mix(in srgb,var(--bd-acc) 30%,transparent)!important;color:var(--ink)!important}
:root[data-bd] .lwhead{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;color:var(--ink)!important;box-shadow:0 6px 18px rgba(20,40,35,.06)!important}
:root[data-bd] .lwhead *{color:var(--ink)!important}:root[data-bd] .lwhead small,:root[data-bd] .lwhead label{color:var(--muted)!important}
:root[data-bd] .lwseal{border-color:var(--bd-acc)!important;background:color-mix(in srgb,var(--bd-acc) 12%,transparent)!important}:root[data-bd] .lwseal b{color:var(--bd-acc)!important}
:root[data-bd] .lwask{border-color:var(--bd-edge)!important;background:var(--bd-glass)!important}
:root[data-bd] .screen button.on:not(.bdorb):not(.sglday):not(.bnsl):not([data-act=bdacc]):not([data-act=bdtheme]){background:var(--bd-acc)!important;background-image:none!important;color:#fff!important;border-color:transparent!important}
:root[data-bd="dunkel"] .screen button.on:not(.bdorb):not(.sglday):not(.bnsl):not([data-act=bdacc]):not([data-act=bdtheme]){color:#05201A!important}
:root[data-bd] .wdcard.gold{border-color:color-mix(in srgb,var(--bd-acc) 35%,transparent)!important;background:color-mix(in srgb,var(--bd-acc) 6%,var(--bd-glass))!important}
:root[data-bd] .axadd.gold{background:var(--bd-acc)!important;background-image:none!important;color:#fff!important;border:0!important}
:root[data-bd] .asv b,:root[data-bd] .asv strong,:root[data-bd] .asv .asnet,:root[data-bd] .asv [class*=net]{font-family:var(--display)!important}
:root[data-bd] .dhcard.vst{display:grid!important;grid-template-columns:auto 1fr;gap:4px 12px;align-items:start}
:root[data-bd] .dhcard.vst>button{grid-column:1/-1;justify-self:start;margin-top:8px}:root[data-bd] .dhcard.vst svg{color:var(--bd-acc)!important}
:root[data-bd] .nzqinfo{background:color-mix(in srgb,var(--bd-acc) 7%,var(--bd-glass))!important;border-color:color-mix(in srgb,var(--bd-acc) 30%,transparent)!important;color:var(--ink)!important}
:root[data-bd] .vsafe .card,:root[data-bd] .vsafe>div{word-break:normal}
:root[data-bd] .nzq .nzqa button,:root[data-bd] .nzq [class*=quick] button{font-family:var(--body)!important}
:root[data-bd] .nzq [class*=fold] b,:root[data-bd] .fz .fzc>span:first-child,:root[data-bd] .fz [class*=row]>.ic{filter:saturate(.75)}
`);
