/* ===== Butler Docs: the areas as one organism (v53) — final concept, board 6 =====
   - «Alle Bereiche» (≡): the same 9 areas as on Start, in the same order and with the same live status;
     below «Weitere»: Kalender, Aufgaben, Lebensbuch, Tresor, Notizen, Meine Mappen, Profil, Scanner.
     Lebensbuch and Tresor leave the main grid; Kalender and Aufgaben live on inside «Fristen» and here.
   - «Familie» (route people, formerly «Meine Kontakte»): two blocks — «Familie & Nahestehende» and «Wichtige Menschen»
     (doctor, notary, tax adviser, bank …), each with a first step when it is empty. Search and the category chips work as
     before and show the plain list. Nothing in the contacts changes.
   - «Vorsorge»: the Tresor is a row of its own under «Verfügungen» (passwords and PINs belong to provision).
   With g.st50Off=1 everything looks as before. */
const brS={
 s_docs:['Все папки, поиск, сканер','Alle Ordner, Suche, Scanner','All folders, search, scanner'],s_pers:['Паспорт, ID, права, карты','Pass, Ausweis, Führerschein, Karten','Passport, ID, licence, cards'],
 s_dl:['Все сроки в одном месте','Alle Fristen an einem Ort','All deadlines in one place'],s_gov:['Термины, номера, письма','Termine, Nummern, Briefe','Appointments, numbers, letters'],
 s_fin:['Налоги, договоры, расходы','Steuer, Verträge, Kosten','Tax, contracts, costs'],s_work:['Работа, своё дело, учёба','Job, eigenes Geschäft, Ausbildung','Job, own business, training'],
 s_med:['Карта, прививки, заключения','Karte, Impfungen, Befunde','Card, vaccinations, findings'],s_fam:['Семья и важные люди','Familie und wichtige Menschen','Family and important people'],
 s_vor:['Распоряжения, имущество, сейф','Verfügungen, Vermögen, Tresor','Wills, assets, safe'],
 all:['Все разделы','Alle Bereiche','All areas'],more:['Ещё','Weitere','More'],
 w_cal:['Календарь','Kalender','Calendar'],w_task:['Задачи','Aufgaben','Tasks'],w_life:['Книга жизни','Lebensbuch','Book of life'],w_vault:['Сейф','Tresor','Safe'],w_scan:['Сканер','Scanner','Scanner'],
 fam:['Семья и близкие','Familie & Nahestehende','Family & close ones'],imp:['Важные люди','Wichtige Menschen','Important people'],
 famE:['Впишите партнёра, детей, родителей — Батлер напомнит о днях рождения и будет знать, кого звать в беде.','Tragen Sie Partner, Kinder, Eltern ein – Butler erinnert an Geburtstage und weiß, wen er im Notfall ruft.','Add partner, children, parents – Butler reminds you of birthdays and knows whom to call in an emergency.'],
 impE:['Врач, нотариус, налоговый консультант, банк, арендодатель — все, кто нужен в делах.','Hausärztin, Notar, Steuerberater, Bank, Vermieter – alle, die man für Erledigungen braucht.','Doctor, notary, tax adviser, bank, landlord – everyone you need for your affairs.'],
 addP:['Добавить человека','Person hinzufügen','Add a person'],
 vS:['Пароли, PIN-коды, доступы — зашифровано','Passwörter, PINs, Zugänge – verschlüsselt','Passwords, PINs, access – encrypted']};
const brt=k=>cv5n(brS[k]||[k,k,k]);
/* --- Alle Bereiche --- */
function brAll(){const t=(ic,lab,sub,a,st)=>`<button type="button" class="dht brt" ${a}>${ic}<b>${i(lab)}</b><small>${i(sub)}</small>${st?`<em class="${st.c}">${i(st.t)}</em>`:''}</button>`;
 const main=[['docs','fld'],['pers','id'],['dl','clock'],['gov','gov'],['fin','coin'],['work','brief'],['med','heart'],['fam','users'],['vor','sprout']].map(([k,ic])=>{
  const a=k==='pers'?'data-act="dccat" data-v="personal"':(ST_A.find(x=>x[0]===k)||[])[2]||'';const lab=k==='pers'?dht('pers'):stt('a_'+k);
  return t(STI[ic]?sti(ic,'big'):dhi(ic,'big'),lab,brt('s_'+k),a,k==='pers'?null:stArea(k))}).join('');
 const more=[['cal','w_cal','data-act="go" data-to="mycal"',0],['chk','w_task','data-act="go" data-to="tasks"',0],['book','w_life','data-act="go" data-to="life"',0],['vault','w_vault','data-act="dhvault"',0],
  ['file','n_notes','data-act="go" data-to="notiz"',0],['mpx','mpx','data-act="go" data-to="mpx"',0],['users','n_prof','data-act="go" data-to="profile"',0],['scan','w_scan','data-act="go" data-to="sc9"',0]]
  .map(([ic,k,a])=>`<button type="button" class="brw stdall" ${a}>${STI[ic]?sti(ic):dhi(ic)}<span>${i(brS[k]?brt(k):stt(k))}</span></button>`).join('');
 return`<div class="screen dhome odall brall"><div class="sub-hdr"><button class="iconbtn" data-act="odback" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(brt('all'))}</h2></div><span></span></div>
 <div class="dhgrid brg">${main}</div><h3 class="odh">${i(brt('more'))}</h3><div class="brm">${more}</div></div>`}
Hooks.on('screen',h=>{try{if(m.route==='dall'&&stOn())return brAll()}catch(e){Hooks.err('brall',e)}return h});
/* --- Familie --- */
const BR_FAM=['family','friends','church'];
const brIsFam=c=>c&&(BR_FAM.includes(c.cat)||(c.fam&&c.fam.rel));
/* the core draws this list itself (y$, not through the screen hook), so the two blocks are laid over it after drawing */
function brPpl(){try{if(m.route!=='people'||m.pid||!stOn())return;const sc=document.querySelector('.screen.people');if(!sc)return;sc.classList.add('brppl');
 const h2=sc.querySelector('.sub-hdr h2');if(h2&&h2.textContent!==stt('a_fam'))h2.textContent=stt('a_fam');
 const pl=document.getElementById('plist');if(!pl||(m.pf||'all')!=='all'||(m.pq||'').trim()||pl.querySelector('.brh'))return;
 const A=Va(),F=A.filter(brIsFam),W=A.filter(c=>!brIsFam(c));
 const blk=(k,L2,e)=>`<h3 class="odh brh">${i(brt(k))}<span>${L2.length||''}</span></h3>${L2.length?v$(L2,'','all'):`<div class="dhcard brempty"><p>${i(brt(e))}</p><button type="button" class="brad" data-act="pnew">${_('plus')} ${i(brt('addP'))}</button></div>`}`;
 pl.innerHTML=blk('fam',F,'famE')+blk('imp',W,'impE')}catch(e){Hooks.err('brppl',e)}}
Hooks.on('render',brPpl);
document.addEventListener('input',e=>{if(e.target&&e.target.id==='pq')setTimeout(brPpl,0)});
/* --- Vorsorge: the Tresor under «Verfügungen» --- */
Hooks.on('screen',h=>{try{if(m.route!=='dnach'||typeof h!=='string'||!stOn()||h.includes('brvault')||!h.includes('data-to="dvors"'))return h;
 const row=`<button type="button" class="dnr brvault" data-act="dhvault">${dhi('vault')}<span><b>${i(brt('w_vault'))}</b><small>${i(brt('vS'))}</small></span>${dhi('chev','sm')}</button>`;
 return h.replace(/(<\/button>)(<\/div>\s*<h3 class="dnh")/,(s,a,b)=>a+row+b)}catch(e){Hooks.err('brvault',e);return h}});
Hooks.css('docs-bereiche',`
.brall>*{flex-shrink:0}
.brg .brt{position:relative}.brt em{font-style:normal;font-size:11px;border-radius:8px;padding:2px 7px;margin-top:4px;background:#e3f1e3;color:#2f6b3e;white-space:nowrap}.brt em.y{background:#fbecd2;color:#8a5a0c}.brt em.r{background:#fde4dc;color:#a8432a}
.brt .dhi.big{color:var(--green)}
.brm{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}
.brw{display:flex;flex-direction:column;align-items:center;gap:6px;border:0;border-radius:16px;background:var(--surface);box-shadow:0 3px 10px rgba(20,60,30,.06);padding:12px 2px 10px;font:inherit;font-size:12.5px;color:var(--ink)!important;min-width:0;cursor:pointer}
.brw .dhi{width:22px;height:22px;color:var(--green)}.brw span{max-width:100%;line-height:1.2;text-align:center;font-size:12px;hyphens:auto!important;-webkit-hyphens:auto!important;overflow-wrap:break-word}
.brppl .brh{display:flex;align-items:center;gap:8px;margin:14px 2px 8px}.brppl .brh span{font-size:13px;color:var(--muted);font-weight:500}
.brppl .brh:first-child{margin-top:2px}
.brempty p{color:var(--muted);margin:0 0 10px;line-height:1.45;font-size:14.5px}
.brad{display:inline-flex;align-items:center;gap:8px;border:1px dashed var(--green);border-radius:14px;background:none;color:var(--green)!important;padding:9px 14px;font:inherit;font-weight:600}.brad svg{width:18px;height:18px}
`);
