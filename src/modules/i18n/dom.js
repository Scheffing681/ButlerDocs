/* ===== Butler Docs: the new languages (v45) — it, uk, ro, bg, sr, hr =====
   The old core has its own texts only in ru/de/en/pl/tr/fr/es. For a new language it shows English (sometimes German or
   Russian). This translator replaces those UI texts on screen with I18N[lang] (keyed by the English text; German/Russian
   go through I18N_AL to their English twin). Only whole texts are replaced, never parts, and never what people type
   (inputs, textareas, editable notes). The module texts ([ru,de,en] arrays) are translated already by cv5n. */
const I18N_NEW=['it','uk','ro','bg','sr','hr'];
const i18On=()=>{try{return I18N_NEW.includes(g.lang)&&typeof I18N!=='undefined'&&!!I18N[g.lang]}catch{return!1}};
const I18_NAT={it:'Italiano',uk:'Українська',ro:'Română',bg:'Български',sr:'Srpski',hr:'Hrvatski'};
function i18Tr(s){const D=I18N[g.lang];if(!D)return null;const t=s.trim();if(!t||t.length>600)return null;
 /* «Sprache: Deutsch» – the old core has no own word for a new language */
 const lm=t.match(/^(Sprache|Language|Язык|Dil|Język|Langue|Idioma): \S+$/);if(lm)return s.replace(t,(D.Language||'Language')+': '+I18_NAT[g.lang]);
 let v=D[t];
 if(v==null&&typeof I18N_AL!=='undefined'){const e=I18N_AL[t];if(e!=null)v=D[e]}
 return v==null||v===t?null:s.replace(t,v)}
const I18_SKIP='script,style,textarea,input,select,[contenteditable],[contenteditable] *,.nzqed .nzqt,.i18skip';
function i18Run(root){if(!i18On())return;try{root=root||document.body;if(!root)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())L.push(n);
 for(const x of L){const p=x.parentElement;if(!p||p.closest(I18_SKIP))continue;const r=i18Tr(x.nodeValue);if(r!=null)x.nodeValue=r}
 const E=root.querySelectorAll?root.querySelectorAll('[placeholder],[aria-label],[title]'):[];
 for(const e of E)for(const a of['placeholder','aria-label','title']){const v=e.getAttribute(a);if(!v)continue;const r=i18Tr(v);if(r!=null)e.setAttribute(a,r)}}catch(er){try{Hooks.err('i18dom',er)}catch{}}}
let i18Q=0;const i18Obs=new MutationObserver(()=>{if(i18Q||!i18On())return;i18Q=1;requestAnimationFrame(()=>{i18Q=0;i18Obs.disconnect();i18Run();i18Watch()})});
function i18Watch(){try{document.body&&i18Obs.observe(document.body,{childList:!0,subtree:!0,characterData:!0})}catch{}}
Hooks.on('render',()=>{if(i18On()){i18Run();i18Watch()}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',i18Watch);else i18Watch();
