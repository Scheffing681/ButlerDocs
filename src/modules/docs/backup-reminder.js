/* Butler Docs — backup reminder on home (v27).
   Everything lives only on this phone. The full backup (Profil → «Ihre Daten» → «Sicherung speichern», core hh())
   was there, but nothing reminded of it. Now, when the last backup is 30+ days old (or there never was one and
   documents exist for 2+ days), home shows one small card: «Sicherung speichern» runs the same backup,
   «Später» hides the card for 7 days. g.bkLast is set by the core once the file is saved. */
const BKR_S={t:['Резервная копия','Sicherung','Backup','Kopia zapasowa','Yedek','Sauvegarde','Copia de seguridad'],
 never:['Копии ещё нет. Всё хранится только на этом телефоне.','Noch keine Sicherung. Alles liegt nur auf diesem Telefon.','No backup yet. Everything is only on this phone.','Brak kopii. Wszystko jest tylko na tym telefonie.','Henüz yedek yok. Her şey yalnızca bu telefonda.','Pas encore de sauvegarde. Tout est seulement sur ce téléphone.','Aún no hay copia. Todo está solo en este teléfono.'],
 old:['Последняя копия: %n дн. назад. Сохраните новую — в iCloud или на флешку.','Letzte Sicherung vor %n Tagen. Neue speichern – in iCloud oder auf einen Stick.','Last backup %n days ago. Save a new one – to iCloud or a stick.','Ostatnia kopia %n dni temu. Zapisz nową.','Son yedek %n gün önce. Yenisini kaydedin.','Dernière sauvegarde il y a %n jours. Enregistrez-en une nouvelle.','Última copia hace %n días. Guarde una nueva.'],
 go:['Сохранить копию','Sicherung speichern','Save a backup','Zapisz kopię','Yedeği kaydet','Enregistrer','Guardar copia'],
 later:['Позже','Später','Later','Później','Sonra','Plus tard','Más tarde']};
const bkrt=(k,o)=>{let s=cv5n(BKR_S[k]||[k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
function bkrDue(){try{if(!m.logged||!g.user||g.user.needSetup)return 0;if(g.bkrHide&&Date.now()-g.bkrHide<7*864e5)return 0;
 const D=(Ke().items||[]).filter(d=>d&&d.title);if(!D.length)return 0;const last=+g.bkLast||0;
 if(!last){const first=Math.min(...D.map(d=>d.ts||Date.now()));return Date.now()-first>2*864e5?-1:0}
 const days=Math.floor((Date.now()-last)/864e5);return days>=30?days:0}catch{return 0}}
Hooks.on('screen',h=>{try{if(m.route!=='home'||typeof h!=='string'||g.dhOff||h.includes('bkrcard'))return h;const d=bkrDue();if(!d)return h;
 const blk=`<div class="dhcard bkrcard"><span class="bkri">🗝</span><div><b>${i(bkrt('t'))}</b><p>${i(d<0?bkrt('never'):bkrt('old',{n:d}))}</p>
  <div class="bkrb"><button type="button" class="on" data-act="bkrgo">${i(bkrt('go'))}</button><button type="button" data-act="bkrlater">${i(bkrt('later'))}</button></div></div></div>`;
 return bsvHomeIns(h,blk)}catch(e){Hooks.err('bkrhome',e);return h}});
Hooks.act('bkrgo',()=>{try{hh()}catch(e){Hooks.err('bkrgo',e)}});
Hooks.act('bkrlater',()=>{g.bkrHide=Date.now();$();v()});
Hooks.css('docs-backup-reminder',`.bkrcard{display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(190,150,70,.55)}
.bkrcard .bkri{font-size:24px;flex:none;line-height:1.2}.bkrcard b{display:block;font-size:16px}.bkrcard p{margin:4px 0 10px;line-height:1.4;opacity:.85}
.bkrb{display:flex;gap:8px;flex-wrap:wrap}.bkrb button{border:1px solid var(--line);background:transparent;color:inherit;border-radius:999px;padding:8px 14px;font:inherit;font-size:14px}
.bkrb button.on{background:var(--green,#2f6b3e);border-color:var(--green,#2f6b3e);color:#fff}`);
