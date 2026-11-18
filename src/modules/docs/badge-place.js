/* ===== Butler Docs: where the number on the app icon comes from (v37) =====
   The icon number counts the urgent («red») points of the butler's report (warranty ends, TÜV due, value check…).
   That report screen is not part of Butler Docs, so the number had no place to be found.
   Now: the bell on the home screen shows the same number, and «Erinnerungen» lists these points on top. */
const dbS={t:['Требует внимания','Braucht Ihre Aufmerksamkeit','Needs your attention','Wymaga uwagi','Dikkat gerektiriyor','Requiert votre attention','Requiere su atención'],
 h:['Эти пункты — число на значке приложения.','Diese Punkte zählt die Zahl am App-Symbol.','These points are the number on the app icon.','Te punkty to liczba na ikonie aplikacji.','Uygulama simgesindeki sayı bu maddelerdir.','Ces points forment le chiffre sur l’icône.','Estos puntos son el número del icono.']};
const dbt=k=>cv5n(dbS[k]);
const dbRed=()=>{try{return He().filter(x=>x&&x.col==='r')}catch{return[]}};
Hooks.on('render',()=>{try{
 if(m.route==='home'){const b=document.querySelector('.dhtr [data-to="reminders"]');if(b&&!b.querySelector('.dbn')){const n=dbRed().length;if(n){b.style.position='relative';b.insertAdjacentHTML('beforeend',`<span class="dbn">${n>9?'9+':n}</span>`)}}}
 if(m.route==='reminders'){const s=document.querySelector('.screen');if(!s||s.querySelector('.dbc'))return;const L2=dbRed();if(!L2.length)return;
  const hd=s.querySelector('.sub-hdr')||s.firstElementChild;const html=`<div class="dbc"><b>${i(dbt('t'))}</b><small>${i(dbt('h'))}</small>${L2.map(x=>`<button type="button" class="dbr" ${x.go||''}><span class="dbd"></span><span class="dbx"><b>${i(x.t||'')}</b><small>${i(x.why||'')}</small></span></button>`).join('')}</div>`;
  hd?hd.insertAdjacentHTML('afterend',html):s.insertAdjacentHTML('afterbegin',html)}
}catch(e){Hooks.err('dbadge',e)}});
Hooks.css('docs-badge',`
.dbn{position:absolute;top:6px;right:2px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#e5483f;color:#fff;font-size:11px;font-weight:700;line-height:18px;text-align:center;box-sizing:border-box}
.dbc{margin:4px 0 14px;padding:14px 16px;border-radius:20px;background:var(--surface);border:1px solid rgba(229,72,63,.35)}.dbc>b{display:block;font-size:17px;color:#b8322a}.dbc>small{display:block;color:var(--muted);font-size:13px;margin:2px 0 6px}
.dbr{display:flex;align-items:center;gap:12px;width:100%;padding:11px 0;border:0;background:none;text-align:left;color:var(--ink);font:inherit;cursor:pointer}.dbr+.dbr{border-top:1px solid var(--line)}
.dbd{flex:none;width:9px;height:9px;border-radius:50%;background:#e5483f}.dbx{display:flex;flex-direction:column;gap:2px}.dbx b{font-weight:600}.dbx small{color:var(--muted);font-size:13px}
`);
