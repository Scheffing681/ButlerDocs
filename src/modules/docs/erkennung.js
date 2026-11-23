/* ===== Butler Docs: a smarter recognition card after the scan (v48) =====
   The scanner already shows «Was der Butler verstanden hat» (type, folder, title, fields, deadline) after the text
   recognition. This module makes that card fit the rest of the app:
   - Passport / ID card / residence permit: the machine lines «<<<» are read from the recognised text and checked with
     their check digits → type, number, «gültig bis» filled; the document gets «MRZ geprüft» when all digits match.
   - «Gültig bis / Ablaufdatum / valid until» is taken for documents that have that field.
   - Payslips and bank statements get the month in the title («Lohnabrechnung 10/2026»), so «Meine Mappen» can tell
     whether they are recent enough.
   - Papers the Mappen ask for (Schufa, Mietschuldenfreiheit, Mieterselbstauskunft, Lebenslauf, Sprachzertifikat …)
     get their usual German name as title, so they are found by themselves.
   - In an open passport / ID document whose text is known, the machine line is checked once without a new scan.
   Nothing is sent anywhere; the user still confirms the card. */
const ERK_KW=[[/schufa[- ]?(?:auskunft|bonit|datenkopie)|datenkopie nach art\.? ?15/i,'Schufa-Auskunft'],[/mietschuldenfreiheit/i,'Mietschuldenfreiheitsbescheinigung'],
 [/mieterselbstauskunft|selbstauskunft (?:des|f(?:ü|ue)r) mie/i,'Mieterselbstauskunft'],[/vermieterbescheinigung|wohnungsgeberbest(?:ä|ae)tigung/i,'Wohnungsgeberbestätigung'],
 [/\blebenslauf\b|curriculum vitae/i,'Lebenslauf'],[/einb(?:ü|ue)rgerungstest|leben in deutschland/i,'Einbürgerungstest'],[/zertifikat deutsch|deutsch-test f(?:ü|ue)r zuwanderer|\btelc\b|goethe-zertifikat|sprachzertifikat/i,'Sprachzertifikat'],
 [/versicherungsverlauf|renteninformation|rentenauskunft/i,'Rentenversicherungsverlauf'],[/meldebescheinigung/i,'Meldebescheinigung'],[/arbeitsvertrag/i,'Arbeitsvertrag'],[/arbeitszeugnis|zwischenzeugnis/i,'Arbeitszeugnis'],
 [/geburtsurkunde/i,'Geburtsurkunde'],[/heiratsurkunde|eheurkunde/i,'Heiratsurkunde'],[/einkommensteuerbescheid|steuerbescheid/i,'Steuerbescheid']];
const ERK_MON={januar:1,februar:2,'märz':3,maerz:3,april:4,mai:5,juni:6,juli:7,august:8,september:9,oktober:10,november:11,dezember:12};
function erkMonth(t){let m2=String(t).match(/(?:abrechnung(?:smonat)?|abrechnungszeitraum|zeitraum|monat|f(?:ü|ue)r den monat|abrechnung f(?:ü|ue)r)\s*[:.]?\s*(januar|februar|m(?:ä|ae)rz|april|mai|juni|juli|august|september|oktober|november|dezember)\s+(20\d\d)/i);
 if(m2){const mo=ERK_MON[m2[1].toLowerCase().replace('ae','ä')]||ERK_MON[m2[1].toLowerCase()];if(mo)return String(mo).padStart(2,'0')+'/'+m2[2]}
 m2=String(t).match(/(?:abrechnung(?:smonat)?|abrechnungszeitraum|zeitraum|monat|kontoauszug(?: nr\.?)?)\s*[:.]?\s*(0?[1-9]|1[0-2])\s*[\/.]\s*(20\d\d)/i);if(m2)return String(+m2[1]).padStart(2,'0')+'/'+m2[2];return''}
function erkValid(t){const m2=String(t).match(/(?:g(?:ü|ue)ltig bis|ablaufdatum|l(?:ä|ae)uft ab am|date of expiry|valid until|expiry)\s*[:./]?\s*(\d{1,2})\s*[.\/ ]\s*(\d{1,2})\s*[.\/ ]\s*(20\d\d|\d\d)\b/i);
 if(!m2)return'';let y=+m2[3];if(y<100)y+=2000;const d=+m2[1],mo=+m2[2];return d>=1&&d<=31&&mo>=1&&mo<=12?`${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`:''}
function erkImprove(r,text){if(!r||typeof r!=='object')return r;const t=String(text||'');let P=null;try{P=mpxParse(t)}catch{}
 const has=k=>{try{return!!Ct[k]}catch{return!1}};
 if(P&&(P.ok||P.checks>=3)){const ty=P.kind==='P'?'passport':P.kind==='A'?'residence':'id';if(has(ty))r.type=ty;r.f=r.f||{};if(P.num)r.f.number=P.num;if(P.valid)r.f.valid=P.valid;
  r.mrz=P;r.sure=!0;try{r.title=[Ye('t_'+r.type),[P.last,P.first].filter(Boolean).join(' ')].filter(Boolean).join(' · ').slice(0,90)}catch{}
  try{const grp=(Ct[r.type]||[])[2],F=Ke().folders.filter(f2=>!f2.sp),hit=F.find(f2=>(Eg[f2.id]||[]).includes(grp));if(hit)r.folder=hit.id}catch{}}
 try{const want=(Ct[r.type]||[])[1]||[];if(want.includes('valid')&&!(r.f&&r.f.valid)){const v0=erkValid(t);if(v0){r.f=r.f||{};r.f.valid=v0}}}catch{}
 const kw=ERK_KW.find(([re])=>re.test(t));const mon=erkMonth(t);
 if(/lohnabrechnung|gehaltsabrechnung|entgeltabrechnung|verdienstabrechnung|lohn-? und gehaltsabrechnung/i.test(t)){r.title=['Lohnabrechnung'+(mon?' '+mon:''),r.org&&r.org.length<40?r.org:''].filter(Boolean).join(' · ').slice(0,90);if(mon)r.letter=r.letter||mon.slice(3)+'-'+mon.slice(0,2)+'-28'}
 else if(r.type==='bankst'&&mon)r.title=['Kontoauszug '+mon,r.org&&r.org.length<40?r.org:''].filter(Boolean).join(' · ').slice(0,90);
 else if(kw&&!(P&&P.ok)){r.title=[kw[1],r.org&&r.org.length<40&&!kw[0].test(r.org)?r.org:''].filter(Boolean).join(' · ').slice(0,90);if(r.type==='cert')r.sure=!0}
 return r}
/* After a document is saved with its recognised text: complete what the scanner card could not know.
   Only fields that are still empty are filled; the title only when it is still the scanner's own suggestion.
   A bar «Butler hat ergänzt: … · Rückgängig» shows what changed. Data: g.erk={seen:[ids]} */
const ERK={done:['Butler дополнил: %t','Butler hat ergänzt: %t','Butler added: %t']};
const erkT=(k,o)=>{let s=cv5n(ERK[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
function erkD(){const o=g.erk=g.erk&&typeof g.erk==='object'?g.erk:{};if(!Array.isArray(o.seen))o.seen=null;return o}
let erkBusy=0;
async function erkScan(){const E=erkD(),A=mpxDocs();if(!E.seen){E.seen=A.map(d=>d.id);mpxSave();return}if(erkBusy)return;
 const seen=new Set(E.seen);const d=A.find(z=>!seen.has(z.id)&&z.hasText&&Date.now()-(z.ts||0)<15*60e3);if(!d){if(E.seen.length>4000)E.seen=E.seen.filter(id=>A.some(z=>z.id===id));return}
 erkBusy=1;E.seen.push(d.id);try{const t=await vl(d);if(t&&t.trim())erkApply(d,t)}catch(e){Hooks.err('erkscan',e)}finally{erkBusy=0}}
function erkApply(d,t){let auto=null;try{auto=scClassify(t).title}catch{}
 const r=erkImprove({type:d.dtype||'cert',f:Object.assign({},d.f||{}),title:d.title,org:d.party||'',folder:d.folder,letter:''},t),before=JSON.parse(JSON.stringify({dtype:d.dtype,f:d.f,title:d.title,mrz:d.mrz,end:d.end,date:d.date})),ch=[];
 const has=k=>{try{return!!Ct[k]}catch{return!1}};
 if(r.mrz&&r.mrz.ok){if(r.type!==d.dtype&&has(r.type)&&(!d.dtype||d.dtype==='cert'||d.dtype==='free'||MPX_MRZ_DT.includes(d.dtype))){d.dtype=r.type;ch.push(Ye('t_'+r.type))}
  d.mrz={ok:1,t:Date.now(),birth:r.mrz.birth,num:r.mrz.num,valid:r.mrz.valid};mpxMrzRes[d.id]=r.mrz;ch.push(mpxT('st_mrz')+' ✓')}
 d.f=d.f||{};for(const k of['number','valid'])if(r.f&&r.f[k]&&!d.f[k]){d.f[k]=r.f[k];if(k==='valid'){d.end=d.end||r.f[k];ch.push(mpxT('f_valid')+' '+je(r.f[k]))}else ch.push(mpxT('f_num')+' '+r.f[k])}
 if(r.title&&r.title!==d.title&&(d.title===auto||!d.title||/^scan-|^Scan /i.test(d.title))){d.title=r.title;ch.unshift('«'+r.title+'»')}
 if(r.letter&&/^\d{4}-\d\d-\d\d$/.test(r.letter)&&d.date!==r.letter&&/lohnabrechnung/i.test(d.title||'')){d.date=r.letter}
 if(!ch.length)return;mpxSave();if(['bdoc','arcf','archive'].includes(m.route))v();
 try{lnqBar(erkT('done',{t:ch.join(' · ')}),()=>{Object.assign(d,before);if(!before.mrz)delete d.mrz;mpxSave();v()})}catch{}}
Hooks.on('save',()=>{clearTimeout(erkScan.t);erkScan.t=setTimeout(()=>{erkScan()},1400)});
/* an open passport / ID with known text: check the machine line once, without a new scan */
const erkTried={};
function erkAutoMrz(){try{if(m.route!=='bdoc'||!m.bdid)return;const d=mpxDoc(m.bdid);if(!d||d.mrz&&d.mrz.ok||erkTried[d.id]||!d.hasText||!MPX_MRZ_DT.includes(d.dtype))return;erkTried[d.id]=1;
 vl(d).then(t=>{const P=mpxParse(t);if(!P||!P.ok)return;d.mrz={ok:1,t:Date.now(),birth:P.birth,num:P.num,valid:P.valid};d.f=d.f||{};if(P.num&&!d.f.number)d.f.number=P.num;if(P.valid&&!d.f.valid){d.f.valid=P.valid;d.end=P.valid}
  mpxMrzRes[d.id]=P;mpxSave();if(m.route==='bdoc'&&m.bdid===d.id)mpxRecRe()}).catch(()=>{})}catch(e){Hooks.err('erkmrz',e)}}
Hooks.on('render',()=>{setTimeout(erkAutoMrz,500)});
