/* ===== Butler Docs: stages 6–7 of BUTLER 2.0 (v79) =====
   Stage 6 — the small things:
   - «Mappe für Berater» (route mbr): Steuerberater · Finanzberater · Familie · Eigene. Butler ticks the groups that fit
     (Lohnsteuerbescheinigung, Handwerker, Spenden, Steuerbescheid, Versicherungen, Lohnabrechnungen, Kredite, Ausweise,
     Vorsorge …), with the count; out as ZIP (originals + Inhaltsverzeichnis.txt) or one PDF (cover + overview + list of
     contracts). Butler only shows, he does not advise or sell.
   - soft screen changes (0,2 s, only when the screen really changes; «Bewegung reduzieren» is respected);
   - a little gold: the BUTLER word mark only.
   Stage 7 — ready for the App Store, everything on the phone:
   - «Sicherheit & Daten» (route sich): Tresor code, Face ID (App Store), first reminder 30 · 14 · 7 · 3 · 1 days before
     (works now: when deadlines appear in «Wichtig für Sie», g.remDays), push (App Store), backup now / to iCloud via
     the share sheet, privacy, Mappe for the family, Notfall-Mappe (Vorsorge), tariffs (Free now, Plus · Family later).
   - on a document: «Mit einer KI teilen …» — explained first, then the iPhone share sheet; Butler itself sends nothing.
   Data: g.remDays, g.mbr = {p, off:{group:1}} */
const abS={
 mT:['Папка для консультанта','Mappe für Berater','Folder for an adviser'],p_st:['Налоговый консультант','Steuerberater','Tax adviser'],p_fi:['Финансовый консультант','Finanzberater','Financial adviser'],p_fam:['Семья','Familie','Family'],p_own:['Своя','Eigene','Own'],
 g_lst:['Справка о зарплате и налоге','Lohnsteuerbescheinigung','Annual payroll tax statement'],g_lohn:['Зарплатные ведомости','Lohnabrechnungen','Payslips'],g_hand:['Счета мастеров, Nebenkosten','Handwerker & Nebenkosten','Tradesmen & service charges'],
 g_spend:['Пожертвования','Spendenquittungen','Donation receipts'],g_steu:['Налоговые решения','Steuerbescheide','Tax assessments'],g_vers:['Страховки','Versicherungen','Insurance'],g_kto:['Выписки из банка','Kontoauszüge','Bank statements'],
 g_kred:['Кредиты','Kredite & Darlehen','Loans'],g_miet:['Жильё','Miete & Wohnung','Rent & home'],g_id:['Удостоверения','Ausweise','ID documents'],g_vor:['Доверенности, распоряжения','Vollmachten & Verfügungen','Powers of attorney'],g_med:['Медицина','Gesundheit','Health'],
 n:['документов: %n','%n Dokumente','%n documents'],n1:['1 документ','1 Dokument','1 document'],lockT:['Код при открытии','Zugangscode beim Öffnen','Access code on opening'],lockS:['в профиле → «Защита доступа»','im Profil → „Zugangsschutz“','in the profile → “Access protection”'],none:['нет','keine','none'],ovw:['Обзор договоров','Übersicht der Verträge','Contracts overview'],ovwS:['%n договоров с суммами и сроками','%n Verträge mit Beträgen und Fristen','%n contracts with amounts and deadlines'],
 zip:['Архив ZIP','Als ZIP','As ZIP'],zipS:['все оригиналы + оглавление','alle Originale + Inhaltsverzeichnis','all originals + table of contents'],pdf:['Один PDF','Als ein PDF','As one PDF'],pdfS:['обложка, обзор и список','Deckblatt, Übersicht und Liste','cover, overview and list'],
 share:['Потом «Поделиться» → Почта, AirDrop или iCloud.','Danach „Teilen“ → Mail, AirDrop oder iCloud.','Then “Share” → Mail, AirDrop or iCloud.'],noAdv:['Батлер только показывает — он не консультирует и ничего не продаёт.','Butler zeigt nur – er berät nicht und verkauft nichts.','Butler only shows – he does not advise or sell anything.'],
 busy:['Собираю папку …','Mappe wird erstellt …','Building the folder …'],empty:['Не выбрано ни одного документа','Keine Dokumente ausgewählt','No documents selected'],toc:['Оглавление','Inhaltsverzeichnis','Table of contents'],made:['Создано %d','Erstellt am %d','Created on %d'],for:['для: %p','für: %p','for: %p'],
 /* security */
 sT:['Безопасность и данные','Sicherheit & Daten','Security & data'],prot:['Защита','Schutz','Protection'],vault:['Сейф с отдельным кодом','Tresor mit eigenem Code','Vault with its own code'],vaultS:['паспорт, пароли, PIN','Ausweise, Passwörter, PINs','IDs, passwords, PINs'],
 face:['Face ID вместо кода','Face ID statt Code','Face ID instead of a code'],store:['App Store','App Store','App Store'],storeS:['появится в версии из App Store','kommt mit der App-Store-Version','comes with the App Store version'],
 notif:['Напоминания','Erinnerungen','Reminders'],first:['Первый раз напомнить','Zum ersten Mal erinnern','First reminder'],firstS:['так рано срок появляется в «Важно для Вас»','so früh erscheint eine Frist in „Wichtig für Sie“','this early a deadline shows in “Important for you”'],daysB:['за %n дн.','%n Tage vorher','%n days before'],day1:['за 1 день','1 Tag vorher','1 day before'],
 push:['Push-уведомления','Push-Mitteilungen','Push notifications'],ics:['Сейчас: «В календарь iPhone» у каждого срока','Heute: „In den iPhone-Kalender“ bei jeder Frist','Today: “Add to iPhone calendar” on every deadline'],
 bk:['Резервная копия','Sicherung','Backup'],bkNow:['Сохранить копию сейчас','Jetzt Sicherung speichern','Save a backup now'],bkNowS:['зашифрованный файл — в iCloud Drive, на флешку или в «Файлы»','verschlüsselte Datei – in iCloud Drive, auf USB oder in „Dateien“','encrypted file – to iCloud Drive, USB or “Files”'],
 priv:['Конфиденциальность','Datenschutz','Privacy'],privS:['что хранится и где','was wo gespeichert ist','what is stored where'],
 famT:['Семья и экстренный случай','Familie & Notfall','Family & emergency'],famSend:['Отправить папку семье','Mappe an Familie senden','Send a folder to the family'],famSendS:['через AirDrop или почту — общего хранилища нет','per AirDrop oder Mail – ohne gemeinsamen Speicher','via AirDrop or mail – no shared storage'],
 sos:['Папка на крайний случай','Notfall-Mappe','Emergency folder'],sosS:['в «Предусмотрительности»: файл + пароль на бумаге для доверенного человека','in „Vorsorge“: Datei + Passwort auf Papier für eine Vertrauensperson','in “Provision”: file + password on paper for a trusted person'],
 tar:['Тарифы','Tarife','Plans'],free:['Free','Free','Free'],freeS:['всё, что есть сегодня','alles, was es heute gibt','everything there is today'],plus:['Plus · Family','Plus · Family','Plus · Family'],plusS:['через App Store','über den App Store','via the App Store'],later:['позже','später','later'],
 local:['Всё остаётся на этом телефоне. У Батлера нет сервера, он никогда не видит Ваши данные.','Alles bleibt auf diesem Telefon. Butler hat keinen Server und sieht Ihre Daten nie.','Everything stays on this phone. Butler has no server and never sees your data.'],
 /* share with AI */
 ai:['Поделиться с ИИ …','Mit einer KI teilen …','Share with an AI …'],aiT:['Поделиться документом с ИИ?','Dokument mit einer KI teilen?','Share the document with an AI?'],
 aiS:['«%t» тогда покинет этот телефон и попадёт в приложение, которое Вы выберете (например, Claude). Сам Батлер никогда ничего не отправляет.','„%t“ verlässt dann dieses Telefon und geht an die App, die Sie wählen (z. B. Claude). Butler selbst sendet nie etwas.','“%t” then leaves this phone and goes to the app you choose (e.g. Claude). Butler itself never sends anything.'],
 aiGo:['Выбрать приложение','App wählen','Choose an app'],cancel:['Отмена','Abbrechen','Cancel'],aiNo:['Этот браузер не умеет делиться файлами. Откройте документ и используйте «Поделиться».','Dieser Browser kann keine Dateien teilen. Öffnen Sie das Dokument und nutzen Sie „Teilen“.','This browser cannot share files. Open the document and use “Share”.'],aiNone:['В документе нет файла','Das Dokument hat keine Datei','The document has no file'],
 sichRow:['Безопасность и данные','Sicherheit & Daten','Security & data'],sichRowS:['Face ID, напоминания, копия, тарифы','Face ID, Erinnerungen, Sicherung, Tarife','Face ID, reminders, backup, plans'],mRow:['Папка для консультанта','Mappe für Berater','Folder for an adviser'],mRowS:['для налогового или финансового консультанта, ZIP или PDF','für Steuer- oder Finanzberater, als ZIP oder PDF','for a tax or financial adviser, as ZIP or PDF']};
const abt=(k,o)=>{let s=cv5n(abS[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* ---------- Mappe für Berater ---------- */
const AB_G=[['lst',/lohnsteuerbescheinigung|lohnsteuer-?bescheinigung/i],['lohn',/lohnabrechnung|gehaltsabrechnung|entgeltabrechnung|verdienstabrechnung|payslip|зарплатн/i],['hand',/handwerker|nebenkostenabrechnung|haushaltsnah|schornstein|wartung|reparatur/i],
 ['spend',/spende|zuwendungsbest/i],['steu',/steuerbescheid|finanzamt|einkommensteuer|steuererkl/i],['vers',/versicherung|police|polizze|beitragsrechnung|insurance/i],['kto',/kontoauszug|bank statement|выписк/i],['kred',/kredit|darlehen|leasing|finanzierung/i],
 ['miet',/mietvertrag|miete|wohnung|grundbuch|kaufvertrag (haus|wohnung)/i],['id',/ausweis|reisepass|pass\b|aufenthalt|führerschein|passport|паспорт/i],['vor',/vollmacht|patientenverf|testament|betreuungsverf|sorgerecht/i],['med',/arzt|befund|krank|impf|gesundheitskarte/i]];
const AB_P={st:['lst','hand','spend','steu','vers'],fi:['vers','kred','lohn','steu','kto'],fam:['id','vor','vers','med'],own:[]};
const abD=()=>{const o=g.mbr=g.mbr&&typeof g.mbr==='object'?g.mbr:{};if(!o.p)o.p='st';if(!o.on||typeof o.on!=='object')o.on={};return o};
const abDocs=()=>{try{return(Ke().items||[]).filter(d=>d&&!d.type&&!d.del)}catch{return[]}};
const abGroup=k=>{const rx=(AB_G.find(x=>x[0]===k)||[])[1];if(!rx)return[];return abDocs().filter(d=>rx.test([d.title,d.party,d.kind].join(' '))).filter(d=>k!=='lohn'||1)};
const abOn=k=>{const D=abD(),p=D.on[D.p];if(p&&k in p)return!!p[k];return(AB_P[D.p]||[]).includes(k)};
function abScreen(){const D=abD(),rows=AB_G.map(([k])=>({k,L:abGroup(k)})).filter(x=>x.L.length||(AB_P[D.p]||[]).includes(x.k));let nC=0;try{nC=vaContracts().length}catch{}
 const ovOn=abOn('ovw')||(!(D.on[D.p]||{}).hasOwnProperty('ovw')&&(D.p==='st'||D.p==='fi'));
 return`<div class="screen dhome fz va abw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(abt('mT'))}</h2></div><span></span></div>
 <div class="vachips">${['st','fi','fam','own'].map(p=>`<button type="button" class="${D.p===p?'on':''}" data-act="abp" data-k="${p}">${i(abt('p_'+({st:'st',fi:'fi',fam:'fam',own:'own'})[p]))}</button>`).join('')}</div>
 <div class="vacard eiopts">${rows.map(x=>`<label class="eiopt${x.L.length?'':' dis'}"><input type="checkbox" data-abg="${x.k}" ${abOn(x.k)&&x.L.length?'checked':''} ${x.L.length?'':'disabled'}><span class="eick"></span><span><b>${i(abt('g_'+x.k))}</b><small>${i(x.L.length?(x.L.length===1?abt('n1'):abt('n',{n:x.L.length})):abt('none'))}</small></span></label>`).join('')}
  ${nC?`<label class="eiopt"><input type="checkbox" data-abg="ovw" ${ovOn?'checked':''}><span class="eick"></span><span><b>${i(abt('ovw'))}</b><small>${i(abt('ovwS',{n:nC}))}</small></span></label>`:''}</div>
 <div class="vacard"><button type="button" class="varow" data-act="abzip"><span class="vaic">📦</span><span class="vatx"><b>${i(abt('zip'))}</b><small>${i(abt('zipS'))}</small></span><span class="vaam">›</span></button>
  <button type="button" class="varow" data-act="abpdf"><span class="vaic">📄</span><span class="vatx"><b>${i(abt('pdf'))}</b><small>${i(abt('pdfS'))}</small></span><span class="vaam">›</span></button></div>
 <p class="vanote">${i(abt('share'))} ${i(abt('noAdv'))}</p></div>`}
document.addEventListener('change',e=>{try{const c=e.target.closest&&e.target.closest('[data-abg]');if(!c||m.route!=='mbr')return;const D=abD();D.on[D.p]=D.on[D.p]||{};D.on[D.p][c.dataset.abg]=c.checked?1:0;$()}catch{}},!0);
Hooks.act('abp',d=>{abD().p=d.k;$();v()});
function abPicked(){const S=new Set();AB_G.forEach(([k])=>{if(abOn(k))abGroup(k).forEach(d=>S.add(d))});return[...S].sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))||(b.ts||0)-(a.ts||0))}
const abWithOvw=()=>{const D=abD(),p=D.on[D.p]||{};return'ovw' in p?!!p.ovw:(D.p==='st'||D.p==='fi')};
const abName=()=>abt('mT')+' – '+abt('p_'+abD().p);
const abLine=d=>{let o={};try{o=eiRead(d)}catch{}return[d.date?vaDate(d.date):'',d.title||'—',d.party||'',o.amt?vaEur(o.amt):''].filter(Boolean).join(' · ')};
async function abZip(){const docs=abPicked();if(!docs.length){T(abt('empty'));return}T(abt('busy'));const a=[],used=new Set,b64=s=>{const c=atob(s),u=new Uint8Array(c.length);for(let j=0;j<c.length;j++)u[j]=c.charCodeAt(j);return u},
 un=n=>{let c=n,k=2;while(used.has(c))c=n.replace(/(\.[^.\/]+)?$/,` (${k++})$1`);used.add(c);return c};
 for(const d of docs){const dir=r4((d.date?d.date+' ':'')+(d.title||'Dokument'));for(const f of d.files||[])try{const p=await ni(f);p&&a.push({name:un(dir+'/'+r4(f.name||'datei.'+l4(f.type))),data:b64(p)})}catch{}
  let n=0;for(const f of d.pages||[]){n++;try{const p=await ni(f);p&&a.push({name:un(dir+'/'+String(n).padStart(2,'0')+'.'+l4(f.type)),data:b64(p)})}catch{}}}
 let toc=abName()+'\n'+abt('made',{d:vaDate(vaIso(0))})+'\n\n'+abt('toc')+'\n'+docs.map((d,j)=>(j+1)+'. '+abLine(d)).join('\n');
 if(abWithOvw()){try{toc+='\n\n'+abt('ovw')+'\n'+vaRows().map(r=>'– '+r.nm+': '+vaEur(r.mo)+' / Monat'+(r.kb?' · kündbar bis '+vaDate(r.kb):'')).join('\n')}catch{}}
 a.unshift({name:'00 '+r4(abt('toc'))+'.txt',data:new TextEncoder().encode(toc)});
 const file=new File([DZ(a)],r4(abName())+' '+vaIso(0)+'.zip',{type:'application/zip'});let ok=!1;try{ok=!!(navigator.canShare&&navigator.canShare({files:[file]}))}catch{}
 if(ok)navigator.share({files:[file]}).catch(()=>{});else try{Hl(file)}catch{const u=URL.createObjectURL(file),x2=document.createElement('a');x2.href=u;x2.download=file.name;x2.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
async function abPdf(){const docs=abPicked();if(!docs.length&&!abWithOvw()){T(abt('empty'));return}const P=[];let[c,x2]=fzPage();P.push(c);let yy=160;const ml=140,W2=FZ_W-ml-120;
 const wrap=(t,f)=>{x2.font=f;const out=[];let line='';for(const w of String(t).split(/(\s+)/)){if(x2.measureText(line+w).width>W2&&line.trim()){out.push(line);line=w.trimStart()}else line+=w}out.push(line);return out};
 const put=(t,o)=>{o=o||{};const f=`${o.b?'bold ':''}${o.s||24}px Georgia, serif`;for(const l of wrap(t,f)){if(yy>FZ_H-140){[c,x2]=fzPage();P.push(c);yy=140}x2.font=f;x2.fillStyle=o.c||'#000';x2.fillText(l,ml+(o.x||0),yy);yy+=o.h||36}};
 let me={};try{me=ja()}catch{}put(abt('mT'),{b:1,s:44,h:64});put(abt('for',{p:abt('p_'+abD().p)}),{s:26,h:40,c:'#555'});put([me.first,me.last].filter(Boolean).join(' '),{s:26,h:40});put(abt('made',{d:vaDate(vaIso(0))}),{s:22,h:70,c:'#555'});
 if(abWithOvw()){put(abt('ovw'),{b:1,s:30,h:48});try{vaRows().forEach(r=>put(r.nm+' – '+vaEur(r.mo)+' / Monat'+(r.kb?' · kündbar bis '+vaDate(r.kb):''),{s:22,x:10,h:34}))}catch{}yy+=30}
 if(docs.length){put(abt('toc'),{b:1,s:30,h:48});docs.forEach((d,j)=>put((j+1)+'. '+abLine(d),{s:22,x:10,h:34}))}
 const blob=new Blob([Kn(P)],{type:'application/pdf'}),name=r4(abName())+'.pdf',f=new File([blob],name,{type:'application/pdf'});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==='AbortError')return}
 try{await xu({blob,name})}catch{const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),6e4)}}
Hooks.act('abzip',()=>{abZip().catch(e=>Hooks.err('abzip',e))});Hooks.act('abpdf',()=>{abPdf().catch(e=>Hooks.err('abpdf',e))});
Hooks.act('abfam',()=>{abD().p='fam';$();R('mbr')});
/* ---------- soft screen changes and the gold word mark ---------- */
let abLast='';Hooks.on('render',()=>{try{if(m.route===abLast)return;abLast=m.route;const sc=document.querySelector('.screen');if(!sc)return;sc.classList.remove('abin');void sc.offsetWidth;sc.classList.add('abin')}catch{}});
/* ---------- reminders: how early a deadline shows on Start ---------- */
const abRem=()=>{const n=+g.remDays;return[30,14,7,3,1].includes(n)?n:14};
try{const _sl=sgList;sgList=function(){let L2=_sl.apply(this,arguments);try{const W=abRem();if(W===14)return L2;const S=sgSt(),today=sgIso(0);
 if(W<14)return L2.filter(t=>t.src==='vapr'||stDays(t.k)<=W);const seen=new Set(L2.map(sgKey));
 const add=stDlAll().filter(t=>{const n=stDays(t.k);if(n<=14||n>W)return!1;const s=S[sgKey(t)];if(s&&(s.d||(s.s&&s.s>today)))return!1;return!seen.has(sgKey(t))});return L2.concat(add)}catch(e){Hooks.err('abrem',e)}return L2}}catch(e){Hooks.err('abrem0',e)}
/* ---------- Sicherheit & Daten ---------- */
function abSich(){const R2=abRem(),soon=`<span class="xsoon">${i(abt('store'))}</span>`;
 const row=(ic,t,s,act,right)=>`<button type="button" class="varow" ${act||''}><span class="vaic">${ic}</span><span class="vatx"><b>${t}</b>${s?`<small>${i(s)}</small>`:''}</span><span class="vaam">${right||(act?'›':'')}</span></button>`;
 return`<div class="screen dhome fz va abw"><div class="sub-hdr"><button class="iconbtn" data-act="back" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(abt('sT'))}</h2></div><span></span></div>
 <h3 class="vash">${i(abt('prot'))}</h3><div class="vacard">${row('🔑',i(abt('lockT')),abt('lockS'),'data-act="go" data-to="profile"')}${row('🔐',i(abt('vault')),abt('vaultS'),'data-act="go" data-to="dsafe"')}${row('🙂',i(abt('face'))+soon,abt('storeS'),'','<u class="abtg"></u>')}</div>
 <h3 class="vash">${i(abt('notif'))}</h3><div class="vacard"><div class="abrem"><b>${i(abt('first'))}</b><small>${i(abt('firstS'))}</small><div class="vachips">${[30,14,7,3,1].map(n=>`<button type="button" class="${R2===n?'on':''}" data-act="abrd" data-k="${n}">${i(n===1?abt('day1'):abt('daysB',{n}))}</button>`).join('')}</div></div>
  ${row('🔔',i(abt('push'))+soon,abt('ics'),'','<u class="abtg"></u>')}</div>
 <h3 class="vash">${i(abt('bk'))}</h3><div class="vacard">${row('☁️',i(abt('bkNow')),abt('bkNowS'),'data-act="pvbk"')}${row('🛡',i(abt('priv')),abt('privS'),'data-act="go" data-to="pv"')}</div>
 <h3 class="vash">${i(abt('famT'))}</h3><div class="vacard">${row('👪',i(abt('famSend')),abt('famSendS'),'data-act="abfam"')}${row('🆘',i(abt('sos')),abt('sosS'),'data-act="go" data-to="dvors"')}</div>
 <h3 class="vash">${i(abt('tar'))}</h3><div class="vacard">${row('',i(abt('free')),abt('freeS'),'','✓')}${row('',i(abt('plus')),abt('plusS'),'',`<span class="xsoon">${i(abt('later'))}</span>`)}</div>
 <p class="vanote">${i(abt('local'))}</p></div>`}
Hooks.act('abrd',d=>{g.remDays=+d.k;$();v()});
['mbr','sich'].forEach(r=>{OD_OK.add(r);Te.includes(r)||Te.push(r);try{AG_R.includes(r)||AG_R.push(r)}catch{}});
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='mbr')return abScreen();if(m.route==='sich')return abSich()}catch(e){Hooks.err('abscreen',e)}});
/* entries: profile, Finanzen (Steuer-Mappe tab), search */
Hooks.on('screen',h=>{try{if(typeof h!=='string')return h;
 if(m.route==='profile'){const b=`<button type="button" class="vaabot abent" data-act="go" data-to="sich"><span><b>🛡 ${i(abt('sichRow'))}</b><small>${i(abt('sichRowS'))}</small></span><span class="akch">›</span></button>`;const e=h.lastIndexOf('</div>');return h.slice(0,e)+b+h.slice(e)}
 if(m.route==='fzm'&&fzD().tab!=='kost'&&fzD().tab!=='aus'&&!(typeof fzCat!=='undefined'&&fzCat)){const b=`<button type="button" class="vaabot abent" data-act="go" data-to="mbr"><span><b>📦 ${i(abt('mRow'))}</b><small>${i(abt('mRowS'))}</small></span><span class="akch">›</span></button>`;const e=h.lastIndexOf('</div>');return h.slice(0,e)+b+h.slice(e)}
 }catch(er){Hooks.err('abent',er)}return h});
try{SP_L.push(['mbr','doc',abS.mT,['berater','steuerberater','консультант','adviser','advisor','mappe für','папка для']],['sich','note',abS.sT,['sicherheit','face id','безопасн','security','tarif','тариф','plan']],['ubl','cal',[ubS.ovw[0],ubS.ovw[1],ubS.ovw[2]],['überblick','ueberblick','обзор','overview','woche','недел','week']])}catch(e){Hooks.err('absp',e)}
/* ---------- share a document with an AI (only after a clear question) ---------- */
function abAiPut(){try{if(m.route!=='bdoc'||!m.bdid)return;const sc=document.querySelector('.screen');if(!sc||sc.querySelector('.abai'))return;const d=abDocs().find(z=>z.id===m.bdid);if(!d||!((d.files||[]).length||(d.pages||[]).length))return;
 const b=document.createElement('button');b.type='button';b.className='vabtn abai';b.dataset.act='abai';b.dataset.id=d.id;b.textContent='✨ '+abt('ai');const w=sc.querySelector('.akdcw');w?w.appendChild(b):(sc.querySelector(':scope>.bgtitle,:scope>.sub-hdr')||sc.firstElementChild).insertAdjacentElement('afterend',b)}catch(e){Hooks.err('abai',e)}}
Hooks.on('render',()=>setTimeout(abAiPut,10));
Hooks.act('abai',dd=>{const d=abDocs().find(z=>z.id===dd.id);if(!d)return;const sh=H(abt('aiT'),`<div class="bsvys"><p class="abaip">${i(abt('aiS',{t:d.title||'—'}))}</p><div class="vabtns"><button type="button" class="vabtn p" data-aigo>${i(abt('aiGo'))}</button><button type="button" class="vabtn" data-aix>${i(abt('cancel'))}</button></div></div>`,
 el=>{el.classList.add('bsvsh');el.querySelector('[data-aix]').onclick=()=>el.remove();el.querySelector('[data-aigo]').onclick=async()=>{try{const f0=(d.files||[])[0]||(d.pages||[])[0];if(!f0){T(abt('aiNone'));return}const p=await ni(f0);if(!p){T(abt('aiNone'));return}
  const c=atob(p),u=new Uint8Array(c.length);for(let j=0;j<c.length;j++)u[j]=c.charCodeAt(j);const type=f0.type||'application/octet-stream',file=new File([u],r4(f0.name||(d.title||'Dokument')+'.'+l4(type)),{type});
  if(navigator.canShare&&navigator.canShare({files:[file]})){el.remove();await navigator.share({files:[file],title:d.title||''})}else T(abt('aiNo'))}catch(e){if(!(e&&e.name==='AbortError'))T(abt('aiNo'))}}});return sh});
Hooks.css('docs-abschluss',`
.screen.abin{animation:abin .2s ease-out}@keyframes abin{from{opacity:.0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.screen.abin{animation:none}}
html[data-bd] .sgwm{background:linear-gradient(90deg,#9c7a3c,#c9a55e,#9c7a3c);-webkit-background-clip:text;background-clip:text;color:transparent!important}html[data-bd=dunkel] .sgwm{background:linear-gradient(90deg,#c9a55e,#ecd28f,#c9a55e);-webkit-background-clip:text;background-clip:text}
.xsoon{font-size:11px;font-weight:700;background:var(--line);color:var(--muted);border-radius:8px;padding:2px 7px;margin-left:6px;vertical-align:2px;white-space:nowrap}
.abtg{display:inline-block;width:46px;height:28px;border-radius:15px;background:var(--line);position:relative;opacity:.6}.abtg:after{content:'';position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff}
.abrem{padding:10px 0;border-bottom:1px solid var(--line)}.abrem b{display:block;font-size:16px}.abrem small{display:block;color:var(--muted);font-size:13px;margin-bottom:8px}.abrem .vachips{flex-wrap:wrap;margin:0}
.abent{margin:12px 0}.abai{display:block;width:100%;margin:0 0 10px}.abaip{font-size:15px;line-height:1.45;margin:4px 0 12px}
`);
