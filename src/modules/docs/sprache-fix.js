/* ===== Butler Docs: texts that Butler wrote itself follow the app language (v90) =====
   Some lines are stored once when they are made: the automatic calendar entry «Personalausweis · Gültig bis»,
   the journal «Was Butler getan hat», the history of a Vorgang, tasks Butler created («Antworten: …»).
   They were kept in the language of that moment. Now each keeps its recipe (tk) and is rewritten whenever the
   language changes — what the user typed or renamed himself is never touched (a task only while its text is
   still exactly the one Butler wrote). */
const LXF_F=()=>{const o={};try{o.eit=eit}catch{}try{o.brxt=brxt}catch{}try{o.tlxt=tlxt}catch{}try{o.kpt=kpt}catch{}try{o.kgt=kgt}catch{}return o};
const lxfTx=(F,tk)=>{try{const f=F[tk[0]];return f?f(tk[1],tk[2]||void 0):null}catch{return null}};
function lxfRun(){const F=LXF_F();let ch=0;
 try{(g.eiLog||[]).forEach(x=>{if(x&&x.tk){const t=lxfTx(F,x.tk);if(t&&t!==x.t){x.t=t;ch=1}}})}catch{}
 try{(g.vg||[]).forEach(v=>(v.log||[]).forEach(x=>{if(x&&x.tk){const t=lxfTx(F,x.tk);if(t&&t!==x.t){x.t=t;ch=1}}}))}catch{}
 try{(g.tasks||[]).forEach(x=>{if(x&&x.tk&&x.t===x.tkT){const t=lxfTx(F,x.tk);if(t&&t!==x.t){x.t=x.tkT=t;ch=1}}})}catch{}
 try{const before=JSON.stringify((g.events||[]).filter(e=>e&&e.dcdoc).map(e=>e.title));m8();if(JSON.stringify((g.events||[]).filter(e=>e&&e.dcdoc).map(e=>e.title))!==before)ch=1}catch(e){Hooks.err('lxfm8',e)}
 return ch}
Hooks.on('render',()=>{try{if(!g||!g.lang||g.lxL===g.lang)return;g.lxL=g.lang;lxfRun();$();setTimeout(()=>{try{v()}catch{}},0)}catch(e){Hooks.err('lxf',e)}});
