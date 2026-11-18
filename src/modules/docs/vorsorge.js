/* ===== Butler Docs: Testament & Vorsorge (v35) — Nachlass → first row =====
   Five places: Testament, Vorsorgevollmacht, Patientenverfügung, Betreuungsverfügung, Bestattungsverfügung.
   A paper is saved ONCE in «Dokumente» (category «Finanzen und Recht»: dtype will/poa or dcat law) and only linked here.
   Papers already there are found by themselves (dtype will → Testament, poa → Vorsorgevollmacht, titles for the rest).
   Per place: where the original lies (the most important thing for the family) and who is named / a hint.
   «Übersicht als PDF»: one PDF with the five places, the originals' places and the pages of the papers.
   Data: g.vors={k:{docs[],no[],orig,who}} (no = papers the user took away from the place). */
const VSG={t:['Завещание и распоряжения','Testament & Vorsorge','Will & provisions'],of:['%a из %b','%a von %b','%a of %b'],
 s_test:['Завещание','Testament','Will'],s_vv:['Генеральная доверенность (Vorsorgevollmacht)','Vorsorgevollmacht','Lasting power of attorney'],s_pv:['Распоряжение пациента','Patientenverfügung','Living will'],
 s_bv:['Распоряжение об опеке','Betreuungsverfügung','Care directive'],s_bs:['Распоряжение о похоронах','Bestattungsverfügung','Funeral wishes'],
 h_test:['собственноручное или у нотариуса','handschriftlich oder notariell','handwritten or notarised'],h_vv:['кто решает за вас','wer für Sie entscheidet','who decides for you'],h_pv:['пожелания о лечении','Wünsche zur Behandlung','wishes about treatment'],
 h_bv:['кто будет опекуном','wer betreuen soll','who should be your carer'],h_bs:['пожелания о похоронах','Wünsche zur Bestattung','wishes for the funeral'],
 orig:['Где лежит оригинал?','Wo liegt das Original?','Where is the original?'],origS:['Оригинал: %o','Original: %o','Original: %o'],origPh:['например папка в шкафу, гостиная','z. B. Ordner im Schrank, Wohnzimmer','e.g. folder in the cupboard, living room'],
 o1:['дома','zu Hause','at home'],o2:['у нотариуса','beim Notar','with the notary'],o3:['Amtsgericht','Amtsgericht','local court'],o4:['банковская ячейка','Bankschließfach','safe deposit box'],
 who:['Кому доверено / заметка','Bevollmächtigt / Hinweis','Named person / note'],whoPh:['например жена; копия у сына','z. B. Ehefrau; Kopie hat Sohn','e.g. wife; son has a copy'],
 add:['＋ Документ','＋ Dokument','＋ Document'],addT:['%s — добавить','%s hinzufügen','Add %s'],save:['Сохранить','Speichern','Save'],
 info:['Завещание можно сдать на хранение в Amtsgericht; Vorsorgevollmacht — зарегистрировать в Zentrales Vorsorgeregister. Общие правила — не юридическая консультация, проверьте, пожалуйста.','Ein Testament kann beim Amtsgericht verwahrt werden; eine Vorsorgevollmacht im Zentralen Vorsorgeregister eingetragen werden. Allgemeine Hinweise – keine Rechtsberatung, bitte prüfen.','A will can be deposited at the local court; a power of attorney registered in the Central Register. General hints – not legal advice, please check.'],
 folder:['Все документы папки «Финансы и право» ›','Alle Dokumente im Ordner „Finanzen und Recht“ ›','All documents in “Finance and law” ›'],
 pdf:['Обзор для родственников (PDF)','Übersicht für Angehörige (PDF)','Overview for the family (PDF)'],pdfT:['Завещание и распоряжения — обзор','Testament & Vorsorge – Übersicht','Will & provisions – overview'],
 none:['нет','fehlt','missing'],there:['есть','vorhanden','there'],busy:['Собираю PDF …','PDF wird erstellt …','Making the PDF …'],sub:['%a из %b · где лежат оригиналы','%a von %b · wo die Originale liegen','%a of %b · where the originals are']};
const vsgt=(k,o)=>{let s=cv5n(VSG[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
const VSG_S=[['test','📜','will',/testament|завещан/i],['vv','🤝','poa',/vorsorgevollmacht|vollmacht|доверенн/i],['pv','🩺','',/patientenverf/i],['bv','⚖️','',/betreuungsverf/i],['bs','🕊','',/bestattung|beerdigung|похорон/i]];
const vsgD=()=>{g.vors=g.vors&&typeof g.vors==='object'?g.vors:{};VSG_S.forEach(([k])=>{const o=g.vors[k]=g.vors[k]||{};o.docs=o.docs||[];o.no=o.no||[]});return g.vors};
let vsgSel=null;
function vsgDocs(k){const o=vsgD()[k],s=VSG_S.find(z=>z[0]===k);let A=[];try{A=Ke().items.filter(d=>d&&!d.type&&!d.del)}catch{}
 const st=A.filter(d=>o.docs.includes(d.id)),auto=A.filter(d=>!o.docs.includes(d.id)&&!o.no.includes(d.id)&&((s[2]&&d.dtype===s[2])||s[3].test(String(d.title||''))));
 /* a Vollmacht that is clearly a Patientenverfügung etc. is not taken twice */
 return st.concat(auto.filter(d=>!(k==='vv'&&/patientenverf|betreuungsverf/i.test(d.title||''))))}
const vsgN=()=>VSG_S.filter(([k])=>vsgDocs(k).length).length;
function vsgSub(){return vsgt('sub',{a:vsgN(),b:VSG_S.length})}
function vsgScreen(){const D=vsgD();
 return`<div class="screen dhome vsg"><div class="sub-hdr"><button class="iconbtn" data-act="go" data-to="dnach" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(vsgt('t'))}</h2></div><span></span></div>
 <div class="dhcard krslots"><div class="krprog"><span>${i(vsgt('of',{a:vsgN(),b:VSG_S.length}))}</span><div><i style="width:${Math.round(vsgN()/VSG_S.length*100)}%"></i></div></div>
 ${VSG_S.map(([k,e])=>{const L2=vsgDocs(k),o=D[k];return`<button type="button" class="krslot ${L2.length?'ok':'no'}" data-act="vsgslot" data-k="${k}"><span class="krsi">${e}</span><span class="krst"><b>${i(vsgt('s_'+k))}</b><small>${i(L2.length?L2.map(d=>[d.title,d.date?vA(d.date):''].filter(Boolean).join(' · ')).join(', '):vsgt('h_'+k))}</small>${o.orig?`<small class="vsgo">📍 ${i(vsgt('origS',{o:o.orig}))}</small>`:''}${o.who?`<small class="vsgw">👤 ${i(o.who)}</small>`:''}</span><em>${L2.length?'✓':'＋'}</em></button>`}).join('')}</div>
 <p class="nzqinfo">ⓘ ${i(vsgt('info'))}</p>
 ${vsgN()?`<button type="button" class="fzpdf krmb" data-act="vsgpdf">📎 ${i(vsgt('pdf'))}</button>`:''}
 <button type="button" class="bsvplus" data-act="dccat" data-v="law">${i(vsgt('folder'))}</button></div>`}
try{OD_OK.add('dvors');Te.includes('dvors')||Te.push('dvors')}catch(e){Hooks.err('vsgroute',e)}
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='dvors')return vsgScreen()}catch(e){Hooks.err('vsgscreen',e)}});
/* a place: its papers, where the original is, who is named */
function vsgSheet(k){const o=vsgD()[k],L2=vsgDocs(k);
 H(vsgt('s_'+k),`<div class="bsvys">${L2.length?`<div class="dhcard odl">${L2.map(d=>`<div class="odr krdr"><button type="button" class="bsvhit" data-kgo="dzopen" data-id="${i(d.id)}">📄<span><b>${i(d.title||'—')}</b><small>${i([d.date?vA(d.date):'',(d.pages||[]).length?krt2('pp',{n:d.pages.length}):''].filter(Boolean).join(' · '))}</small></span></button><button type="button" class="bsvsm x" data-vu="${i(d.id)}" aria-label="×">×</button></div>`).join('')}</div>`:''}
 <button type="button" class="${L2.length?'bsvplus':'dcadd gold'}" data-vadd>${i(vsgt('add'))}</button>
 <label class="bsvl">📍 ${i(vsgt('orig'))}</label><input class="field" data-vo value="${i(o.orig||'')}" placeholder="${i(vsgt('origPh'))}" autocomplete="off">
 <div class="nzqtagq">${['o1','o2','o3','o4'].map(q=>`<button type="button" class="chip" data-vq="${i(vsgt(q))}">${i(vsgt(q))}</button>`).join('')}</div>
 <label class="bsvl">👤 ${i(vsgt('who'))}</label><input class="field" data-vw value="${i(o.who||'')}" placeholder="${i(vsgt('whoPh'))}" autocomplete="off">
 <button type="button" class="dcadd gold" data-vs>${i(vsgt('save'))}</button></div>`,
 sh=>{sh.classList.add('bsvsh');const fo=sh.querySelector('[data-vo]'),fw=sh.querySelector('[data-vw]');const keep=()=>{o.orig=fo.value.trim();o.who=fw.value.trim()};
  sh.querySelectorAll('[data-vq]').forEach(b=>b.onclick=()=>{fo.value=b.dataset.vq;fo.focus()});
  sh.querySelector('[data-vs]').onclick=()=>{keep();try{bsvQuiet()}catch{}$();sh.remove();v()};
  sh.querySelector('[data-vadd]').onclick=()=>{keep();try{bsvQuiet()}catch{}$();sh.remove();vsgAdd(k)};
  sh.querySelectorAll('[data-vu]').forEach(b=>b.onclick=()=>{keep();const id=b.dataset.vu;o.docs=o.docs.filter(z=>z!==id);if(!o.no.includes(id))o.no.push(id);try{bsvQuiet()}catch{}$();sh.remove();v();vsgSheet(k)})})}
/* add: scan / file / a document already in «Dokumente» — new papers go to «Finanzen und Recht» */
async function vsgNew(k,files){const s=VSG_S.find(z=>z[0]===k),n=await krNewDoc(files,vsgt('s_'+k).replace(/\s*\(.*\)$/,''),'');try{n.dcat='law';if(s[2])n.dtype=s[2];if((Ke().folders||[]).some(f=>f.id==='f2'))n.folder='f2'}catch{}
 const o=vsgD()[k];o.docs.includes(n.id)||o.docs.push(n.id);o.no=o.no.filter(z=>z!==n.id);try{bsvQuiet()}catch{}$();return n}
function vsgAdd(k){const o=vsgD()[k],s=VSG_S.find(z=>z[0]===k);let D=[];try{D=Ke().items.filter(d=>d&&!d.type&&!d.del&&!vsgDocs(k).some(z=>z.id===d.id))}catch{}
 const fit=d=>(s[2]&&d.dtype===s[2])||s[3].test(String(d.title||''))||(()=>{try{return ho(d)==='law'}catch{return!1}})();D.sort((a,b)=>(fit(b)-fit(a))||((b.ts||0)-(a.ts||0)));
 const done=async fs=>{if(!fs||!fs.length)return;try{await vsgNew(k,fs);T(krt2('saved'));v();vsgSheet(k)}catch(e){Hooks.err('vsgnew',e)}};
 H(vsgt('addT',{s:vsgt('s_'+k)}),`<p class="fdsmall">${i(krt2('once'))}</p>
 <button type="button" class="kropt" data-ko="cam"><span>📷</span><span><b>${i(krt2('cam'))}</b><small>${i(krt2('camS'))}</small></span></button>
 <button type="button" class="kropt" data-ko="file"><span>📄</span><span><b>${i(krt2('file'))}</b><small>${i(krt2('fileS'))}</small></span></button>
 <div class="kropt krhave"><span>🗂</span><span><b>${i(krt2('have'))}</b><small>${i(krt2('haveS'))}</small></span></div>
 ${D.length?`<input class="field krfind" type="search" placeholder="${i(krt2('find'))}" autocomplete="off"><div class="krhl">${D.slice(0,60).map(d=>`<button type="button" class="krhv" data-kh="${i(d.id)}" data-s="${i(String(d.title||'').toLowerCase())}"><span>📄 ${i(d.title||'—')}</span>${fit(d)?`<em>${i(krt2('fits'))}</em>`:''}</button>`).join('')}</div>`:`<p class="dhnone">${i(krt2('noHave'))}</p>`}`,
 sh=>{sh.classList.add('bsvsh','kradd');sh.querySelector('[data-ko=cam]').onclick=()=>{sh.remove();try{scOpen({multi:!0,saveLabel:krt('save'),done:fs=>done(fs)})}catch(e){Hooks.err('vsgscan',e)}};
  sh.querySelector('[data-ko=file]').onclick=()=>{const e=document.createElement('input');e.type='file';e.multiple=!0;e.accept='image/*,application/pdf';e.onchange=()=>{sh.remove();done([...(e.files||[])])};e.click()};
  const f=sh.querySelector('.krfind');f&&f.addEventListener('input',()=>{const q=f.value.trim().toLowerCase();sh.querySelectorAll('[data-kh]').forEach(b=>{b.hidden=!!q&&!b.dataset.s.includes(q)})});
  sh.querySelectorAll('[data-kh]').forEach(b=>b.onclick=()=>{const id=b.dataset.kh;o.docs.includes(id)||o.docs.push(id);o.no=o.no.filter(z=>z!==id);try{bsvQuiet()}catch{}$();sh.remove();T(krt2('linked'));v();vsgSheet(k)})})}
/* one PDF for the family: the five places, where the originals are, then the pages */
async function vsgPdf(){const P=[];let[c,x2]=fzPage();P.push(c);let yy=140;const ml=140,W2=FZ_W-ml-120;
 const put=(t,o)=>{o=o||{};const f=`${o.b?'bold ':''}${o.s||26}px Georgia, serif`;x2.font=f;const words=String(t).split(/(\s+)/);let line='';const out=[];for(const w of words){if(x2.measureText(line+w).width>W2&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line);
  for(const l of out){if(yy>FZ_H-140){[c,x2]=fzPage();P.push(c);yy=140}x2.font=f;x2.fillStyle=o.c||'#000';x2.fillText(l,ml+(o.x||0),yy);yy+=o.h||38}};
 let me={};try{me=ja()}catch{}put(vsgt('pdfT'),{b:1,s:38,h:56});put([me.first,me.last].filter(Boolean).join(' ')+' · '+nzqWhen(Date.now()),{s:24,h:56,c:'#444'});
 const D=vsgD(),sel=[];for(const[k]of VSG_S){const L2=vsgDocs(k),o=D[k];put(vsgt('s_'+k)+' — '+(L2.length?vsgt('there'):vsgt('none')),{b:1,s:28,h:42,c:L2.length?'#1d3a2a':'#8a2a20'});
  L2.forEach(d=>{put('• '+(d.title||'—')+(d.date?' ('+vA(d.date)+')':''),{s:22,x:20,h:32});sel.push(d)});if(o.orig)put('📍 '+vsgt('origS',{o:o.orig}),{s:22,x:20,h:32});if(o.who)put('👤 '+o.who,{s:22,x:20,h:32});yy+=18}
 put(vsgt('info'),{s:19,h:28,c:'#666'});
 for(const d of sel)for(const pg of (d.pages||[])){try{const b=await ni(pg);if(!b)continue;const im=new Image();await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src='data:'+(pg.type||'image/jpeg')+';base64,'+b});
  const[pc,px]=fzPage();P.push(pc);const s=Math.min((FZ_W-120)/im.width,(FZ_H-120)/im.height);px.drawImage(im,(FZ_W-im.width*s)/2,(FZ_H-im.height*s)/2,im.width*s,im.height*s)}catch(e){Hooks.err('vsgimg',e)}}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=vsgt('pdfT').replace(/[\/\\:]/g,'-')+'.pdf',f=new File([blob],name,{type:'application/pdf'});window.__vsgPdf={pages:P.length,size:blob.size};
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
Hooks.act('vsgslot',d=>{const L2=vsgDocs(d.k);if(L2.length)vsgSheet(d.k);else vsgAdd(d.k)});
Hooks.act('vsgpdf',async()=>{T(vsgt('busy'));try{await vsgPdf()}catch(e){Hooks.err('vsgpdf',e)}});
Hooks.css('docs-vorsorge',`.vsg .krslots{margin-top:4px}.vsgo{color:var(--green,#2f6b3e)!important;white-space:normal!important}.vsgw{white-space:normal!important}`);
