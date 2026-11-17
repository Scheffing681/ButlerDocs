/* ===== Butler Docs: your own city (with postal code) =====
   In «Настройки календаря → Регион» the fixed city list is replaced by a field: type a city or a postal code
   («60311 Frankfurt»), tap «Найти», choose the right place. Its exact coordinates become the city of the app
   (weather, sunrise, sunset, prayer times) as the entry 'my' in the city list (nc); kept in g.cityX.
   The search asks OpenStreetMap (Nominatim) once, with only the typed text. */
const mcS={
 lab:['Город или индекс','Ort oder Postleitzahl','City or postal code','Miasto lub kod pocztowy','Şehir veya posta kodu','Ville ou code postal','Ciudad o código postal'],
 ph:['например 60311 Frankfurt','z. B. 60311 Frankfurt','e.g. 60311 Frankfurt','np. 60311 Frankfurt','ör. 60311 Frankfurt','p. ex. 60311 Frankfurt','p. ej. 60311 Frankfurt'],
 go:['Найти','Suchen','Find','Szukaj','Ara','Chercher','Buscar'],
 none:['Ничего не найдено. Проверьте написание или впишите индекс.','Nichts gefunden. Schreibweise prüfen oder Postleitzahl eingeben.','Nothing found. Check the spelling or enter a postal code.','Nic nie znaleziono. Sprawdź pisownię lub wpisz kod.','Bulunamadı. Yazımı kontrol edin veya posta kodu girin.','Rien trouvé. Vérifiez l’orthographe ou saisissez un code postal.','Nada encontrado. Revise la ortografía o escriba el código postal.'],
 off:['Нет связи — попробуйте чуть позже.','Keine Verbindung – bitte später erneut.','No connection – try again later.','Brak połączenia – spróbuj później.','Bağlantı yok – sonra tekrar deneyin.','Pas de connexion – réessayez plus tard.','Sin conexión: inténtelo más tarde.'],
 busy:['Ищу…','Suche …','Searching…','Szukam…','Aranıyor…','Recherche…','Buscando…'],
 now:['Сейчас','Jetzt','Now','Teraz','Şu an','Actuel','Ahora'],
 ok:['Город сохранён','Ort gespeichert','City saved','Miasto zapisane','Şehir kaydedildi','Ville enregistrée','Ciudad guardada']};
const mct=k=>cv5n(mcS[k]);
const MC_ID='my';
function mcEnsure(){try{const c=g.cityX;if(!c||!isFinite(c.lat)||!isFinite(c.lon))return;const row=[MC_ID,+c.lat,+c.lon,[c.name,c.name,c.name],c.ctry||'de',c.tz||'Europe/Berlin'];
 const e=nc.find(q=>q[0]===MC_ID);if(e)row.forEach((x,k)=>{e[k]=x});else nc.push(row)}catch(e){Hooks.err('mcensure',e)}}
mcEnsure();
const mcLabel=c=>c?[c.zip,c.name].filter(Boolean).join(' ')+(c.region?', '+c.region:''):'';
function mcMount(){try{mcEnsure();const sel=document.querySelector('select[data-cv5="city"]');if(!sel)return;const lab=sel.closest('label')||sel;
 const cur=g.city===MC_ID&&g.cityX?mcLabel(g.cityX):(()=>{try{return ic(sc())}catch{return''}})();
 const w=document.createElement('div');w.className='mcw cv5lb';
 w.innerHTML=`<label for="mcq">${i(mct('lab'))}</label><form class="mcrow" data-mcform autocomplete="off"><input class="field" id="mcq" type="search" enterkeyhint="search" placeholder="${i(mct('ph'))}"><button type="submit" class="mcgo">${i(mct('go'))}</button></form>
  <div class="mcres" aria-live="polite"></div>${cur?`<p class="mccur">📍 <small>${i(mct('now'))}:</small> <b>${i(cur)}</b></p>`:''}`;
 lab.replaceWith(w)}catch(e){Hooks.err('mcmount',e)}}
Hooks.on('render',mcMount);
{let q=0;new MutationObserver(()=>{if(q||!document.querySelector('select[data-cv5="city"]'))return;q=1;requestAnimationFrame(()=>{q=0;mcMount()})}).observe(document.body,{childList:!0,subtree:!0})}
let mcHits=[];
async function mcFind(text){const box=document.querySelector('.mcres');if(!box)return;text=String(text||'').trim();if(text.length<2)return;box.innerHTML=`<p class="mcmsg">${i(mct('busy'))}</p>`;
 const lang=g.lang||'de',ct=(()=>{try{return cv5ctry()}catch{return''}})();
 const ask=async cc=>{const r=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=6&accept-language=${encodeURIComponent(lang)}${cc?'&countrycodes='+cc:''}&q=${encodeURIComponent(text)}`);if(!r.ok)throw new Error('http '+r.status);return r.json()};
 let L2;try{L2=await ask(ct);if(!L2.length&&ct)L2=await ask('')}catch(e){box.innerHTML=`<p class="mcmsg">${i(mct('off'))}</p>`;return}
 mcHits=(L2||[]).map(x=>{const a=x.address||{},name=a.city||a.town||a.village||a.municipality||a.hamlet||a.suburb||a.county||(x.display_name||'').split(',')[0];
  return{name,zip:a.postcode||'',region:a.state||a.county||'',ctry:(a.country_code||ct||'de').toLowerCase(),lat:+x.lat,lon:+x.lon,full:x.display_name||''}}).filter(h=>h.name&&isFinite(h.lat));
 const seen=new Set();mcHits=mcHits.filter(h=>{const k=h.zip+'|'+h.name+'|'+h.region;if(seen.has(k))return!1;seen.add(k);return!0});
 box.innerHTML=mcHits.length?mcHits.map((h,k)=>`<button type="button" class="mchit" data-mc="${k}"><b>${i([h.zip,h.name].filter(Boolean).join(' '))}</b><small>${i([h.region,(()=>{try{return Nx(h.ctry)}catch{return h.ctry.toUpperCase()}})()].filter(Boolean).join(' · '))}</small></button>`).join(''):`<p class="mcmsg">${i(mct('none'))}</p>`}
function mcPick(k){const h=mcHits[k];if(!h)return;const same=nc.find(q=>q[4]===h.ctry&&q[0]!==MC_ID);
 let tz=same&&same[5];if(!tz)try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone}catch{tz='Europe/Berlin'}
 g.cityX={name:h.name,zip:h.zip,region:h.region,ctry:h.ctry,lat:Math.round(h.lat*1e4)/1e4,lon:Math.round(h.lon*1e4)/1e4,tz};mcEnsure();g.city=MC_ID;
 try{const c=cv5C();if(nc.some(q=>q[4]===h.ctry&&q[0]!==MC_ID))c.ctry=h.ctry}catch{}
 $();T(mct('ok'),2200);v()}
document.addEventListener('submit',e=>{const f=e.target.closest&&e.target.closest('form[data-mcform]');if(!f)return;e.preventDefault();e.stopPropagation();mcFind(f.querySelector('#mcq').value)},!0);
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.mchit[data-mc]');if(!b)return;e.preventDefault();e.stopPropagation();mcPick(+b.dataset.mc)},!0);
Hooks.css('docs-my-city',`
.mcw{display:flex;flex-direction:column;gap:6px}
.mcrow{display:flex;gap:8px;align-items:stretch}.mcrow .field{flex:1;min-width:0}
.mcgo{flex:none;border:0;border-radius:16px;padding:0 18px;background:var(--green);color:#fff!important;font-weight:600;font-size:16px;cursor:pointer}
.mcres{display:flex;flex-direction:column;gap:6px;margin-top:4px}
.mchit{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:12px 14px;border-radius:16px;border:1px solid var(--line);background:var(--card,#fff);color:var(--ink)!important;font:inherit;cursor:pointer}
.mchit b{font-weight:600}.mchit small{color:var(--muted);font-size:13px}
.mcmsg{margin:4px 2px;color:var(--muted);font-size:14px}
.mccur{margin:6px 2px 0;font-size:15px}.mccur small{color:var(--muted)}
`);
