/* ===== Butler Docs: a steady screen on iPhone =====
   Two faults seen on the owner's iPhone (home-screen app):
   1) After the keyboard was open, the whole app stayed short: the bottom bar hung in the middle, empty space below.
      Cause: two Butler helpers (h10x / h236) copy window.innerHeight into the body height on every redraw — while the
      keyboard is up (or still closing) that height is the small one, and it stays.
      Fix: one steady height — the largest height seen for this screen width while no field is being typed in.
      The keyboard never makes the page shorter; turning the phone resets it.
   2) A sheet with a text field («Ereignis eintragen», tasks, notes…) stayed half see-through, the screen behind
      showing through it. Cause: sheets fade in (opacity 0→1 / .4→1) and the field gets the focus at once; when the
      keyboard rises during that fade, iOS freezes the animation half-way.
      Fix: sheets and full-screen editors slide in without any fade, so there is nothing to freeze. */
let ssMax={},ssCur=0;
const ssTyping=()=>{const a=document.activeElement;return!!(a&&(a.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!/^(button|checkbox|radio|range|submit|reset|file|color)$/i.test(a.type||'')))};
function ssSet(){try{const w=innerWidth,h=innerHeight;if(!w||!h)return;const k=String(w);
 if(!ssTyping()){const vv=window.visualViewport;const kb=vv&&vv.height<h-120;if(!kb)ssMax[k]=Math.max(ssMax[k]||0,h)}
 const s=ssMax[k]||h;if(s===ssCur)return;ssCur=s;document.documentElement.style.setProperty('--ssvh',s+'px')}catch(e){Hooks.err('ssset',e)}}
Hooks.on('render',ssSet);
['resize','orientationchange','pageshow','focusout'].forEach(n=>addEventListener(n,()=>{setTimeout(ssSet,60);setTimeout(ssSet,500)},!0));
addEventListener('orientationchange',()=>{ssMax={}});
try{window.visualViewport&&visualViewport.addEventListener('resize',()=>setTimeout(ssSet,80))}catch{}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(ssSet,150)});
ssSet();
Hooks.css('docs-steady-screen',`
html.h10x,html.h236{min-height:calc(var(--ssvh,100%) + var(--g9gap,var(--h236gap,0px)))!important}
html.h10x body,html.h236 body{height:var(--ssvh,100%)!important}
html.h10x body::after,html.h236 body::after{top:var(--ssvh,100%)!important}
@keyframes ssUp{from{transform:translateY(30px)}to{transform:none}}
.sheet{animation-name:ssUp!important}
.dtsheet,.dzov,.nz5ed,.sh12{animation:none!important}
/* whatever happens to an animation on iOS, a window is never see-through */
.sheet-wrap,.sheet,.dtsheet,.dtsheet>*,.dzov,.nz5ed,.sh12{opacity:1!important}
`);
