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
var ssMax={},ssCur='',ssGap=0;/* var: the old helpers may call ssSet before this file has run */
function ssTyping(){const a=document.activeElement;return!!(a&&(a.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!/^(button|checkbox|radio|range|submit|reset|file|color)$/i.test(a.type||'')))};
/* v26: THE one place that measures the screen. The old Butler helpers g9gap (screen-edges), h236 (app-mode-bottom)
   and h10edge (polish-and-back) no longer measure anything themselves — they call ssSet, and ssSet sets every value they used:
     --ssvh = --h10vh = --h236vh : the page height (the screen as it is now; kept while the keyboard is up)
     --h236gap : how much shorter iOS reports the page than the real screen (home-screen app, portrait, max 90)
     --g9gap   : the same gap, only when the «screen edges» option is on (as before)
     classes h236 (gap>0), h10x and g9short (g9gap>0) */
function ssSet(){try{if(!ssMax)return;const w=innerWidth,h=innerHeight;if(!w||!h)return;const R=document.documentElement,k=String(w),typing=ssTyping();
 const vv=window.visualViewport,vh=vv?Math.round(vv.height*(vv.scale||1)):0,kb=!!(vv&&vh<h-120);
 /* after the keyboard iOS may leave innerHeight short for a while — the visual viewport then already shows the full height */
 if(!typing&&!kb)ssMax[k]=Math.max(h,vh);
 const sh=screen&&screen.height>screen.width?screen.height:0,s=Math.min(ssMax[k]||h,sh||1e5);
 let st=!1;try{st=matchMedia('(display-mode: standalone)').matches||!!navigator.standalone}catch{}
 if(!typing&&!kb)ssGap=st&&h>w&&sh?Math.max(0,Math.min(90,sh-s)):0;
 const g9=(typeof g!=='undefined'&&g&&g.g9gapOn)?ssGap:0,key=s+'|'+ssGap+'|'+g9;if(key===ssCur)return;ssCur=key;
 ['--ssvh','--h10vh','--h236vh'].forEach(n=>R.style.setProperty(n,s+'px'));R.style.setProperty('--h236gap',ssGap+'px');R.style.setProperty('--g9gap',g9+'px');
 R.classList.toggle('h236',ssGap>0);R.classList.toggle('h10x',g9>0);R.classList.toggle('g9short',g9>0);
 if(!typing&&(scrollY||R.scrollTop))try{scrollTo(0,0)}catch{}}catch(e){Hooks.err('ssset',e)}}
Hooks.on('render',ssSet);
['resize','orientationchange','pageshow','focusin','focusout'].forEach(n=>addEventListener(n,()=>{setTimeout(ssSet,60);setTimeout(ssSet,500)},!0));
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
