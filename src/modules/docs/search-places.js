/* ===== Butler Docs: the search also finds the app's own places (v63) =====
   «письмо», «Brief», «letter», «mail» → Briefe; «срок» → Fristen; «семья» → Familie … shown first as «Bereiche».
   A word matches when it contains a stem or a stem contains it (from 3 letters), in any language of the app. */
const SP_L=[
 ['letters','mail',['Письма','Briefe','Letters'],['письм','писем','лист','brief','letter','mail','почт','конверт','umschlag','envelope','mektup','schreib','написат']],
 ['eing','scan',['Входящие','Eingang','Inbox'],['входящ','вхідн','eingang','inbox','gelen','скан','scan','erfass']],
 ['dsrok','clock',['Сроки','Fristen','Deadlines'],['срок','строк','frist','deadline','süre','напомин','erinner','remind']],
 ['archive','doc',['Документы','Dokumente','Documents'],['документ','dokument','document','belge','бумаг','papier','ordner','папк']],
 ['people','person',['Семья и важные люди','Familie & wichtige Menschen','Family & important people'],['семь','сім','famil','aile','контакт','kontakt','contact','люд','mensch','people']],
 ['fzm','cal',['Финансы','Finanzen','Finances'],['финанс','фінанс','finanz','financ','банк','bank','налог','податк','steuer','tax','vergi']],
 ['kar','check',['Работа','Arbeit','Work'],['работ','робот','arbeit','work','job','gehalt','зарплат']],
 ['bsv','doc',['Ведомства','Behörden','Offices'],['ведомств','відомств','behörd','amt','office','kurum','бюргерамт','bürgeramt']],
 ['concierge','spark',['Батлер','Butler','Butler'],['батлер','butler','помощ','hilfe','help']],
 ['style','note',['Оформление','Erscheinungsbild','Appearance'],['оформлен','тема','тёмн','темн','светл','dunkel','hell','dark','light','stil','style','design','дизайн','farbe','цвет']]];
const SP_T={ru:'Разделы',de:'Bereiche',en:'Sections',tr:'Bölümler',uk:'Розділи',pl:'Obszary',fr:'Rubriques',es:'Secciones'};
try{Object.keys(SP_T).forEach(l=>{if(TD9T[l])TD9T[l].sPlaces=SP_T[l]});if(TD9T.en)TD9T.en.sPlaces=TD9T.en.sPlaces||'Sections'}catch(e){Hooks.err('spt',e)}
function spFind(q){const e=td9low(q).trim();if(e.length<3)return[];
 return SP_L.filter(([r,ic,lab,st])=>{const names=lab.map(x=>td9low(x));return names.some(n=>n.includes(e))||st.some(s=>{const k=td9low(s);return k.includes(e)||(e.length>=3&&e.includes(k))})})
  .map(([r,ic,lab])=>({ic,t:cv5n(lab),s:'',act:`data-act="go" data-to="${r}"`}))}
const spF0=td9find;td9find=function(q){let G=[];try{G=spF0.apply(this,arguments)||[]}catch(e){G=[]}try{const P=spFind(q);if(P.length)G.unshift({k:'sPlaces',rows:P.slice(0,4)})}catch(e){Hooks.err('spfind',e)}return G};
/* the letters screen in the new look: Glas header, the old hub tabs go (Dokumente, Gesetze and Scanner have their own places now) */
Hooks.on('render',()=>{try{if(typeof bdOn!=='function'||!bdOn()||m.route!=='letters')return;const sc=document.querySelector('.screen');if(!sc)return;sglHead(sc);sc.classList.add('splet')}catch(e){Hooks.err('splet',e)}});
Hooks.css('docs-search-places',`
:root[data-bd] .splet>.h9tabs{display:none!important}
:root[data-bd] .splet .card.lform{background:var(--bd-glass)!important;border:1px solid var(--bd-edge)!important;border-radius:22px!important;box-shadow:0 8px 24px rgba(20,40,35,.06)!important}
:root[data-bd] .splet .lseg,:root[data-bd] .splet .lmodes{background:color-mix(in srgb,var(--bd-acc) 7%,transparent)!important;border-color:var(--bd-edge)!important}
:root[data-bd] .splet .bookbtn,:root[data-bd] .splet .lval:not(.muted){color:var(--bd-acc)!important;border-color:color-mix(in srgb,var(--bd-acc) 60%,transparent)!important}
`);
