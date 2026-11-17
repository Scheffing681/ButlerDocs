/* ===== Butler Docs: the entrance (sign-in screen) =====
   Ten designs drawn in code (marble, metal ribbons, amber, waves) after the owner's pictures.
   - the sign «The Silentium’s · BUTLER · DOCS»;
   - a living clock: real time, night sky with the moon (day: the sun), today’s moon phase in the arc above;
   - hold the clock for 3 seconds (a golden ring fills) or tap ⚙ → choose one of the ten designs. A short tap changes nothing.
   The working parts of the old screen (Войти / Face ID, password, language) stay; only their look changes.
   The choice is kept in g.enTheme. */
const enStr={
 pick:['Оформление','Gestaltung','Design','Wygląd','Tasarım','Apparence','Diseño'],
 hint:['Подержите часы 3 секунды, чтобы сменить оформление','Uhr 3 Sekunden halten, um das Design zu wechseln','Hold the clock for 3 seconds to change the design','Przytrzymaj zegar 3 sekundy, by zmienić wygląd','Tasarımı değiştirmek için saati 3 saniye basılı tutun','Maintenez l’horloge 3 secondes pour changer d’apparence','Mantenga el reloj 3 segundos para cambiar el diseño'],
 doc:['Документ','Dokument','Document','Dokument','Belge','Document','Documento'],docs:['Документы','Dokumente','Documents','Dokumenty','Belgeler','Documents','Documentos'],
 safe:['Сейф','Tresor','Vault','Sejf','Kasa','Coffre','Caja fuerte'],bk:['Резервная копия','Sicherung','Backup','Kopia zapasowa','Yedek','Sauvegarde','Copia de seguridad'],
 gear:['Оформление','Gestaltung','Design','Wygląd','Tasarım','Apparence','Diseño']};
const entx=k=>cv5n(enStr[k]);
const EN_T=[
 {id:'onyx',n:['Оникс и янтарь','Onyx & Bernstein','Onyx & amber','Onyks i bursztyn','Oniks ve kehribar','Onyx et ambre','Ónix y ámbar'],
  base:['#fbf4e8','#f1e3cb'],veins:'#c98a2c',veinA:.55,patch:'#f2b544',metal:'silver',ink:'#3b2414',acc:'#b9771c',rib:'amber',ribs:'tl br',
  ring:'marble',ringInk:'#e8a33a',marks:'gems',sky:['#22150c','#4a2d16'],wave:['#f4e9da','#e7b768'],btn:'amber',btnInk:'#3b2414',icon:'#fbf6ee',orn:'fleur'},
 {id:'gold',n:['Золото и янтарь','Gold & Bernstein','Gold & amber','Złoto i bursztyn','Altın ve kehribar','Or et ambre','Oro y ámbar'],
  base:['#fffdf9','#f6efe4'],veins:'#d9b26a',veinA:.45,metal:'gold',ink:'#3a200b',acc:'#b8741a',rib:'amber',ribs:'tl br',
  ring:'#3a2312',ringInk:'gold',marks:'ticks',sky:['#24150a','#5a3414'],wave:['#fbf3e6','#f2a43a'],btn:['#5a3112','#2a1406'],btnInk:'#fff4e0',icon:'#fffaf2',orn:'crown'},
 {id:'champ',n:['Шампань','Champagner','Champagne','Szampan','Şampanya','Champagne','Champán'],
  base:['#fff8ee','#f6e6cd'],veins:null,metal:'gold',ink:'#3a200b',acc:'#b8741a',rib:'soft',ribs:'tl br',gem:'br',
  ring:'#3a2312',ringInk:'gold',marks:'ticks',sky:['#24150a','#4f2f15'],wave:['#f6eadb','#e9c48f'],btn:['#5a3112','#2a1406'],btnInk:'#fff4e0',icon:'#fffaf2'},
 {id:'royal',n:['Королевский синий','Königsblau','Royal blue','Królewski błękit','Kraliyet mavisi','Bleu royal','Azul real'],
  base:['#ffffff','#eef1f7'],veins:null,metal:'gold',ink:'#0c2a6c',acc:'#c0952c',rib:'#0d2f86',ribs:'tl br',
  ring:'#0d2b6e',ringInk:'gold',marks:'ticks',sky:['#0b1f55','#1b3f8f'],wave:['#ffffff','#bcd0f2'],btn:['#123d9a','#0a2463'],btnInk:'#ffffff',icon:'#ffffff'},
 {id:'marble',n:['Белый мрамор','Weißer Marmor','White marble','Biały marmur','Beyaz mermer','Marbre blanc','Mármol blanco'],
  base:['#ffffff','#eef0ef'],veins:'#8f969a',veinA:.38,metal:'gold',ink:'#1d2a24',acc:'#b8862c',rib:'soft',ribs:'br',
  ring:'#15362e',ringInk:'gold',marks:'ticks',sky:['#0f1f2a','#2b4a52'],wave:['#f3f5f4','#c9d6d2'],btn:['#1f5a3a','#0f3a24'],btnInk:'#ffffff',icon:'#fffdf7'},
 {id:'mint',n:['Мята','Minze','Mint','Mięta','Nane','Menthe','Menta'],
  base:['#f1f8ef','#dcecd8'],veins:null,metal:'gold',ink:'#174a2c',acc:'#a8862e',rib:'#cfe6cb',ribs:'bl br',
  ring:'#1e5a38',ringInk:'gold',marks:'ticks',sky:['#0f3a26','#2f7a52'],wave:['#e9f4e6','#a9d3b0'],btn:['#21613d','#103d25'],btnInk:'#ffffff',icon:'#f6fbf4'},
 {id:'ice',n:['Лёд','Eis','Ice','Lód','Buz','Glace','Hielo'],
  base:['#f6f9fd','#e3ecf7'],veins:null,metal:'gold',ink:'#12304a',acc:'#8a96a8',rib:'#d4e3f4',ribs:'bl br',
  ring:'#1b3a55',ringInk:'gold',marks:'ticks',sky:['#0f2236','#3b5f80'],wave:['#f1f6fc','#bcd3ec'],btn:['#21476a','#11293f'],btnInk:'#ffffff',icon:'#fbfdff'},
 {id:'silver',n:['Серебро','Silber','Silver','Srebro','Gümüş','Argent','Plata'],
  base:['#ffffff','#eceef0'],veins:'#9aa0a6',veinA:.36,metal:'silver',ink:'#2d2f35',acc:'#7d8189',rib:'soft',ribs:'bl br',
  ring:'silver',ringInk:'#ffffff',marks:'ticks',sky:['#2c2f36','#6b7079'],wave:['#f2f3f5','#c9ccd2'],btn:['#6a6d75','#3f4148'],btnInk:'#ffffff',icon:'#fbfbfc'},
 {id:'night',n:['Ночной изумруд','Nacht-Smaragd','Night emerald','Nocny szmaragd','Gece zümrüdü','Émeraude de nuit','Esmeralda nocturna'],dark:1,
  base:['#0d1f17','#050d09'],veins:null,metal:'gold',ink:'#f2e7c9',acc:'#e3c27a',rib:'night',ribs:'bl br',
  ring:'#0f3324',ringInk:'gold',marks:'roman12',sky:['#060d14','#16263a'],wave:['#3a4a44','#c9b27a'],btn:['#0f3a26','#082116'],btnInk:'#f2e7c9',icon:'#0f1e17'},
 {id:'ivory',n:['Слоновая кость','Elfenbein','Ivory','Kość słoniowa','Fildişi','Ivoire','Marfil'],
  base:['#fbf8f2','#efe9de'],veins:null,metal:'gold',ink:'#0f3d24',acc:'#b07c1c',rib:'#14502f',ribs:'br',
  ring:'#155234',ringInk:'gold',marks:'roman4',sky:['#0b2233','#2f5a66'],wave:['#f5efe4','#d9c9a6'],btn:['#1d5c39','#0e3a22'],btnInk:'#f6ecd3',icon:'#fffdf8',round:1}];
const EN_DEF='ivory';
const enTh=()=>EN_T.find(t=>t.id===(g.enTheme||EN_DEF))||EN_T[EN_T.length-1];
const EN_M={gold:['#8a6420','#f7dd8a','#c9962e','#fff3c8','#a87a22'],silver:['#7e848c','#f4f6f8','#a9afb7','#ffffff','#6f757d']};
const enMetal=(id,k,x1,y1,x2,y2)=>`<linearGradient id="${id}" x1="${x1||0}" y1="${y1||0}" x2="${x2||1}" y2="${y2||1}">${EN_M[k].map((c,n)=>`<stop offset="${n/4}" stop-color="${c}"/>`).join('')}</linearGradient>`;

/* --- the moon of today (0 new … .5 full) --- */
function enPhase(d){const syn=29.530588853,ref=Date.UTC(2000,0,6,18,14);return(((d-ref)/864e5)%syn+syn)%syn/syn}
function enMoonPath(cx,cy,r,p){const k=(1-Math.cos(2*Math.PI*p))/2,wax=p<.5,rx=r*Math.abs(1-2*k),s1=wax?1:0,s2=(k>.5)===wax?0:1;
 return`M${cx} ${cy-r}A${r} ${r} 0 0 ${s1} ${cx} ${cy+r}A${rx} ${r} 0 0 ${s2} ${cx} ${cy-r}Z`}

/* --- background: marble veins, ribbons, waves, amber --- */
function enBg(t){const W=390,H=844,m=t.metal,dk=t.dark;
 const amberDefs=`<linearGradient id="enAm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset=".25" stop-color="#f6a51e"/><stop offset=".5" stop-color="#b85a0c"/><stop offset=".7" stop-color="#ffc74d"/><stop offset="1" stop-color="#c46a10"/></linearGradient>
  <filter id="enAmF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .85  0 0 0 0 .5  0 0 0 1.4 -.55"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in2="SourceGraphic" mode="screen"/></filter>`;
 const band=(d1,fill,edge)=>`<path d="${d1}" fill="${fill}" ${fill==='url(#enAm)'?'filter="url(#enAmF)"':''}/><path d="${d1}" fill="none" stroke="url(#enRb)" stroke-width="${edge}"/>`;
 const ribFill=t.rib==='amber'?'url(#enAm)':t.rib==='soft'?(dk?'#1a2c24':'rgba(255,255,255,.75)'):t.rib==='night'?'rgba(40,70,58,.55)':t.rib;
 const TL=`M-20 -20H150C112 40 60 92 -20 150Z`,TL2=`M-20 168C70 96 130 40 176 -20H196C150 52 84 118 -20 196Z`;
 const BR=`M410 864H200C262 806 330 752 410 716Z`,BR2=`M410 690C330 726 252 786 178 864H156C232 776 318 712 410 668Z`;
 const BL=`M-20 864H230C160 812 70 780 -20 776Z`;
 let rib='';if(t.ribs.includes('tl'))rib+=band(TL,ribFill,2.4)+`<path d="${TL2}" fill="url(#enRb)" opacity=".85"/>`;
 if(t.ribs.includes('br'))rib+=band(BR,ribFill,2.4)+`<path d="${BR2}" fill="url(#enRb)" opacity=".85"/>`;
 if(t.ribs.includes('bl'))rib+=band(BL,t.rib==='amber'?'url(#enAm)':ribFill,1.6);
 const waves=`<path d="M-20 560C90 520 170 610 260 580S380 520 410 530V900H-20Z" fill="${dk?'rgba(30,60,48,.35)':'rgba(255,255,255,.55)'}"/>
  <path d="M-20 560C90 520 170 610 260 580S380 520 410 530" fill="none" stroke="url(#enRb)" stroke-width=".9" opacity=".8"/>
  <path d="M-20 300C80 250 120 330 230 300S380 220 410 236" fill="none" stroke="url(#enRb)" stroke-width=".7" opacity=".5"/>
  <path d="M-20 720C120 660 220 760 410 690V900H-20Z" fill="${dk?'rgba(20,45,36,.45)':'rgba(255,255,255,.45)'}"/>`;
 const gem=t.gem?`<g transform="translate(330 780) rotate(-18)"><polygon points="-62,0 -30,-34 26,-40 64,-6 40,30 -20,36" fill="url(#enAm)" filter="url(#enAmF)"/><polygon points="-30,-34 26,-40 6,-6" fill="#ffe08a" opacity=".55"/><polygon points="-62,0 -30,-34 6,-6 -20,36" fill="#c4620e" opacity=".35"/><polygon points="26,-40 64,-6 6,-6" fill="#fff4c4" opacity=".4"/></g>`:'';
 const marble=t.veins?`<filter id="enMv" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0035 .011" numOctaves="5" seed="11" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="a0"/><feComponentTransfer in="a0" result="a"><feFuncA type="table" tableValues="0 0 0 0 .08 ${t.veinA} .08 0 0 0 0"/></feComponentTransfer><feFlood flood-color="${t.veins}" result="c"/><feComposite in="c" in2="a" operator="in"/></filter>
  <filter id="enMv2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".005 .012" numOctaves="4" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="a0"/><feComponentTransfer in="a0" result="a"><feFuncA type="table" tableValues="0 0 0 0 0 .06 .35 .06 0 0 0"/></feComponentTransfer><feFlood flood-color="${t.patch||t.veins}" result="c"/><feComposite in="c" in2="a" operator="in"/></filter>`:'';
 const mlay=t.veins?`<rect width="${W}" height="${H}" filter="url(#enMv)" fill="#000"/>${t.patch?`<rect width="${W}" height="${H}" filter="url(#enMv2)" fill="#000"/>`:''}`:'';
 return`<div class="en-bg" style="background:radial-gradient(120% 70% at 50% 35%,${t.base[0]},${t.base[1]})"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${enMetal('enRb',m,0,0,1,0)}${amberDefs}<linearGradient id="enMvG"/>${marble}</defs>${mlay}${waves}${rib}${gem}</svg></div>`}

/* --- the clock --- */
function enClock(t,small){const cx=160,cy=200,m=t.metal,now=new Date(),h=now.getHours(),mi=now.getMinutes(),day=h>=7&&h<19,id=small?'enStr':'enC';
 const ringFill=t.ring==='marble'?`url(#${id}Rm)`:t.ring==='silver'?`url(#${id}Rs)`:t.ring;
 const mk=[];for(let k=0;k<12;k++){const a=k*30*Math.PI/180,s=Math.sin(a),c=-Math.cos(a);
  if(t.marks==='gems'){mk.push(`<g transform="translate(${cx+s*97} ${cy+c*97}) rotate(${k*30})"><rect x="-6" y="-11" width="12" height="22" rx="1.5" fill="url(#${id}Me)"/><rect x="-4.3" y="-9.3" width="8.6" height="18.6" fill="url(#${id}Am)"/><path d="M-4.3 -9.3L4.3 9.3M4.3 -9.3L-4.3 9.3" stroke="#fff3c0" stroke-width=".5" opacity=".7"/></g>`)}
  else if(t.marks==='roman12'){const R=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'][k];mk.push(`<text x="${cx+s*97}" y="${cy+c*97}" transform="rotate(${k*30} ${cx+s*97} ${cy+c*97})" text-anchor="middle" dominant-baseline="central" class="en-rn" fill="url(#${id}Me)">${R}</text>`)}
  else if(t.marks==='roman4'&&k%3===0){mk.push(`<text x="${cx+s*96}" y="${cy+c*96}" text-anchor="middle" dominant-baseline="central" class="en-rn big" fill="url(#${id}Me)">${['XII','III','VI','IX'][k/3]}</text>`)}
  else{const q=k%3===0,r1=q?84:87,r2=q?110:108;mk.push(`<line x1="${cx+s*r1}" y1="${cy+c*r1}" x2="${cx+s*r2}" y2="${cy+c*r2}" stroke="${t.ringInk==='gold'?`url(#${id}Me)`:t.ringInk}" stroke-width="${q?4.5:3}" stroke-linecap="round"/>`)}}
 if(t.marks==='roman12')for(let k=0;k<60;k++)if(k%5){const a=k*6*Math.PI/180;mk.push(`<circle cx="${cx+Math.sin(a)*111}" cy="${cy-Math.cos(a)*111}" r=".9" fill="url(#${id}Me)"/>`)}
 const stars=[[118,150],[132,138],[146,160],[124,172],[160,130],[140,120],[110,186],[176,150],[152,146],[128,196]].map(([x,y],n)=>n%3?`<circle cx="${x}" cy="${y}" r="${n%2?1:1.4}" fill="#fff6d8"/>`:`<path d="M${x} ${y-4}L${x+1} ${y-1}L${x+4} ${y}L${x+1} ${y+1}L${x} ${y+4}L${x-1} ${y+1}L${x-4} ${y}L${x-1} ${y-1}Z" fill="#fff3c8"/>`).join('');
 const sky=day?[enMix(t.sky[0],'#ffffff',.35),enMix(t.sky[1],'#ffffff',.5)]:t.sky;
 const body=day?`<circle cx="194" cy="158" r="16" fill="#fff4cf"/><circle cx="194" cy="158" r="26" fill="#fff4cf" opacity=".25"/>`:`${stars}<path d="M206 140a20 20 0 1 0 0 34a16 16 0 1 1 0-34z" fill="#fff1c9"/><circle cx="198" cy="157" r="26" fill="#fff1c9" opacity=".08"/>`;
 const hand=(ang,len,w)=>`<g transform="rotate(${ang} ${cx} ${cy})"><path d="M${cx-w} ${cy+12}L${cx} ${cy-len}L${cx+w} ${cy+12}Z" fill="url(#${id}Me)"/><path d="M${cx} ${cy+12}L${cx} ${cy-len}" stroke="#fff" stroke-width=".6" opacity=".6"/></g>`;
 const ha=(h%12+mi/60)*30,ma=mi*6;
 const ph=enPhase(Date.now()),moons=[[-127,'l',6.5],[-108,'l',8],[-90,'p',10],[-72,'r',8],[-53,'r',6.5]].map(([a,k,r])=>{const R=a*Math.PI/180,x=cx+Math.cos(R)*176,y=cy+Math.sin(R)*176;
  if(k==='p')return`<circle cx="${x}" cy="${y}" r="${r}" fill="${t.dark?'#2a3a33':'#00000014'}"/><path d="${enMoonPath(x,y,r,ph)}" fill="url(#${id}Me)"/>`;
  const dx=k==='l'?r*.55:-r*.55;return`<path d="M${x} ${y-r}A${r} ${r} 0 1 ${k==='l'?0:1} ${x} ${y+r}A${r*.8} ${r} 0 1 ${k==='l'?1:0} ${x} ${y-r}Z" fill="url(#${id}Me)" transform="translate(${dx*.2} 0)"/>`}).join('');
 const arcs=`<path d="M${cx-150} ${cy}A150 150 0 0 1 ${cx+150} ${cy}" fill="none" stroke="url(#${id}Me)" stroke-width=".9" opacity=".7"/><circle cx="${cx}" cy="${cy}" r="138" fill="none" stroke="url(#${id}Me)" stroke-width=".6" opacity=".5"/>
  ${[[cx-150,cy],[cx+150,cy],[cx-106,cy-106],[cx+106,cy-106]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2" fill="url(#${id}Me)"/>`).join('')}`;
 return`<svg class="en-clk" viewBox="0 0 320 330" aria-hidden="true"><defs>${enMetal(id+'Me',m)}${enMetal(id+'Rs','silver',0,0,0,1)}
  <linearGradient id="${id}Am" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".45" stop-color="#f29a1a"/><stop offset="1" stop-color="#a94c08"/></linearGradient>
  <radialGradient id="${id}Rm" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset=".55" stop-color="#f3e2c4"/><stop offset=".8" stop-color="#eac184"/><stop offset="1" stop-color="#f8eedd"/></radialGradient>
  <linearGradient id="${id}Sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
  <linearGradient id="${id}Wv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.wave[0]}"/><stop offset="1" stop-color="${t.wave[1]}"/></linearGradient>
  <clipPath id="${id}Cl"><circle cx="${cx}" cy="${cy}" r="78"/></clipPath>
  <filter id="${id}Sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="${t.dark?.5:.18}"/></filter></defs>
  ${arcs}${moons}
  <circle cx="${cx}" cy="${cy}" r="122" fill="${t.dark?'#0b1712':'rgba(255,255,255,.55)'}" opacity=".7"/>
  <g filter="url(#${id}Sh)"><circle cx="${cx}" cy="${cy}" r="116" fill="${ringFill}"/><circle cx="${cx}" cy="${cy}" r="116" fill="none" stroke="url(#${id}Me)" stroke-width="7"/></g>
  <circle cx="${cx}" cy="${cy}" r="121" fill="none" stroke="url(#${id}Me)" stroke-width="1" opacity=".6"/>
  ${mk.join('')}
  <circle cx="${cx}" cy="${cy}" r="78" fill="url(#${id}Sk)"/>
  <g clip-path="url(#${id}Cl)">${body}<path d="M70 236C110 214 140 240 175 228S236 206 260 216V300H70Z" fill="url(#${id}Wv)" opacity=".55"/><path d="M70 250C112 232 150 256 190 244S240 232 260 238V300H70Z" fill="url(#${id}Wv)" opacity=".9"/><path d="M70 250C112 232 150 256 190 244S240 232 260 238" fill="none" stroke="url(#${id}Me)" stroke-width=".8"/></g>
  <circle cx="${cx}" cy="${cy}" r="78" fill="none" stroke="url(#${id}Me)" stroke-width="2.4"/>
  <g class="en-hands">${hand(ha,46,3.6)}${hand(ma,70,2.6)}</g><circle cx="${cx}" cy="${cy}" r="6.5" fill="url(#${id}Me)"/><circle cx="${cx}" cy="${cy}" r="2.2" fill="#fff" opacity=".7"/>
  ${small?'':`<circle class="en-hold" cx="${cx}" cy="${cy}" r="128" fill="none" stroke="url(#${id}Me)" stroke-width="4" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>`}</svg>`}
function enMix(a,b,k){const p=x=>[1,3,5].map(j=>parseInt(x.slice(j,j+2),16)),A=p(a),B=p(b);return'#'+A.map((v,j)=>Math.round(v+(B[j]-v)*k).toString(16).padStart(2,'0')).join('')}

/* --- icons, sign, gear --- */
const EN_I={doc:'<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5M8.5 12h7M8.5 15h7M8.5 18h4.5"/>',
 fld:'<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.2l2 2h8.8A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="M3 10.5h18"/>',
 safe:'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><rect x="9" y="11" width="6" height="5" rx="1" fill="currentColor"/><path d="M10 11V9.6a2 2 0 0 1 4 0V11"/>',
 bk:'<path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 9z"/><path d="M14.6 12.4a2.8 2.8 0 0 0-5.1.6M9.4 15.6a2.8 2.8 0 0 0 5.1-.6M14.8 10.8v1.8h-1.8M9.2 17.2v-1.8H11"/>',
 gear:'<path d="M9.77 5.37 L10.55 2.81 L13.45 2.81 L14.23 5.37 L15.11 5.73 L17.47 4.48 L19.52 6.53 L18.27 8.89 L18.63 9.77 L21.19 10.55 L21.19 13.45 L18.63 14.23 L18.27 15.11 L19.52 17.47 L17.47 19.52 L15.11 18.27 L14.23 18.63 L13.45 21.19 L10.55 21.19 L9.77 18.63 L8.89 18.27 L6.53 19.52 L4.48 17.47 L5.73 15.11 L5.37 14.23 L2.81 13.45 L2.81 10.55 L5.37 9.77 L5.73 8.89 L4.48 6.53 L6.53 4.48 L8.89 5.73Z"/><circle cx="12" cy="12" r="3.1"/>',
 crown:'<path d="M4 17h16l1-9-5 4-4-6-4 6-5-4z"/><path d="M4 20h16"/>',fleur:'<path d="M12 4c-2 3-2 6 0 9 2-3 2-6 0-9zM12 13c-3-2-6-2-8 0 2 2 5 2 8 0zm0 0c3-2 6-2 8 0-2 2-5 2-8 0zM12 13v7"/>'};
const eni=(n,c)=>`<svg class="en-i${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true">${EN_I[n]||''}</svg>`;
function enBlock(t){return`<div class="en-w">
 <div class="en-sign"><svg class="en-arc" viewBox="0 0 300 40" aria-hidden="true"><defs>${enMetal('enAr',t.metal,0,0,1,0)}</defs><path d="M10 38Q150 -8 290 38" fill="none" stroke="url(#enAr)" stroke-width="2"/><circle cx="150" cy="15.5" r="2" fill="url(#enAr)"/></svg>
  <b>The Silentium’s</b><span><i></i>BUTLER<i></i></span><em>DOCS</em></div>
 <div class="en-clock" role="img" aria-label="${i(entx('hint'))}" title="${i(entx('hint'))}">${enClock(t)}</div>
</div></div>`}
function enTail(t){return t.orn?`<div class="en-orn"><i></i>${eni(t.orn)}<i></i></div>`:''}
function enVars(t){const M=EN_M[t.metal],btn=t.btn==='amber'?'linear-gradient(90deg,#ffe2a0,#f39a1e,#ffd88a)':`linear-gradient(180deg,${t.btn[0]},${t.btn[1]})`;
 return`--en-ink:${t.ink};--en-acc:${t.acc};--en-m1:${M[0]};--en-m2:${M[1]};--en-m3:${M[2]};--en-ic:${t.icon};--en-btn:${btn};--en-btnInk:${t.btnInk}`}

/* --- mounting on the sign-in screen --- */
function enMount(){try{const lg=document.querySelector('.login');if(!lg||m.logged)return;const t=enTh();
 lg.classList.add('enL');lg.dataset.en=t.id;lg.classList.toggle('enDark',!!t.dark);lg.classList.toggle('enRound',!!t.round);lg.classList.toggle('enAmber',t.btn==='amber');lg.setAttribute('style',enVars(t));
 let bg=lg.querySelector(':scope>.en-bg');if(!bg||bg.dataset.t!==t.id){bg&&bg.remove();lg.insertAdjacentHTML('afterbegin',enBg(t));lg.firstElementChild.dataset.t=t.id}
 const w=lg.querySelector('.en-w');if(!w||w.dataset.t!==t.id){w&&w.remove();const mid=lg.querySelector('.lg9mid')||lg.querySelector('.pwform')||lg.firstElementChild;mid.insertAdjacentHTML('beforebegin',enBlock(t));lg.querySelector('.en-w').dataset.t=t.id}
 /* ⚙ sits next to the language button at the bottom (up top it touched the golden arc on the iPhone) */
 const lang=lg.querySelector('.lg9lang');let row=null;if(lang){row=lang.parentElement&&lang.parentElement.classList.contains('en-lrow')?lang.parentElement:null;if(!row){row=document.createElement('div');row.className='en-lrow';lang.before(row);row.appendChild(lang)}
  if(!row.querySelector('.en-gear'))row.insertAdjacentHTML('beforeend',`<button type="button" class="en-gear" data-act="enpick" aria-label="${i(entx('gear'))}">${eni('gear')}</button>`)}
 lg.querySelector('.en-orn')||row?.insertAdjacentHTML('afterend',enTail(t));
 document.documentElement.classList.add('enOn')}catch(e){Hooks.err('enmount',e)}}
function enUnmount(){if(!document.querySelector('.login'))document.documentElement.classList.remove('enOn')}
Hooks.on('render',()=>{enMount();enUnmount()});
setInterval(()=>{const c=document.querySelector('.login .en-clock');if(c&&!document.hidden){const h=c.querySelector('.en-hold.on');if(!h)c.innerHTML=enClock(enTh())}},2e4);

/* --- choosing the design: ⚙, or hold the clock for 3 seconds --- */
function enThumb(t){const M=EN_M[t.metal],ring=t.ring==='marble'?'#f1dfc0':t.ring==='silver'?'#c9cdd3':t.ring,btn=t.btn==='amber'?'linear-gradient(90deg,#ffd27a,#f39a1e,#ffcf6b)':`linear-gradient(180deg,${t.btn[0]},${t.btn[1]})`;
 return`<button type="button" class="en-th${(g.enTheme||EN_DEF)===t.id?' on':''}" data-en="${t.id}"><span class="en-tp" style="background:radial-gradient(120% 70% at 50% 35%,${t.base[0]},${t.base[1]})">
  <i class="en-tc" style="background:radial-gradient(circle,${t.sky[0]} 0 38%,${M[1]} 39% 42%,${ring} 43% 70%,${M[2]} 71% 76%,transparent 77%)"></i><i class="en-tb" style="background:${btn};border-color:${M[2]}"></i>
  ${t.rib!=='soft'&&t.rib!=='night'?`<i class="en-tr" style="background:${t.rib==='amber'?'linear-gradient(135deg,#ffd27a,#d9700f)':t.rib}"></i>`:''}</span><b>${i(cv5n(t.n))}</b></button>`}
function enPicker(){H(entx('pick'),`<p class="en-hint">${i(entx('hint'))}</p><div class="en-grid">${EN_T.map(enThumb).join('')}</div>`,el=>{el.classList.add('en-sheet');
 el.addEventListener('click',e=>{const b=e.target.closest('[data-en]');if(!b)return;g.enTheme=b.dataset.en;$();el.querySelectorAll('.en-th').forEach(x=>x.classList.toggle('on',x===b));setTimeout(()=>{el.remove();v()},220)})})}
Hooks.act('enpick',()=>enPicker());
{let tm=null,x0=0,y0=0;const stop=()=>{clearTimeout(tm);tm=null;document.querySelectorAll('.en-hold.on').forEach(c=>c.classList.remove('on'))};
 document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest('.login .en-clock');if(!c||!e.isPrimary)return;x0=e.clientX;y0=e.clientY;stop();
  const r=c.querySelector('.en-hold');r&&(r.getBoundingClientRect(),r.classList.add('on'));tm=setTimeout(()=>{stop();try{navigator.vibrate&&navigator.vibrate(18)}catch{}enPicker()},3000)},!0);
 document.addEventListener('pointermove',e=>{if(tm&&Math.hypot(e.clientX-x0,e.clientY-y0)>14)stop()},!0);
 ['pointerup','pointercancel'].forEach(k=>document.addEventListener(k,()=>{if(tm)stop()},!0));
 document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('.en-clock'))e.preventDefault()},!0)}

Hooks.css('docs-entrance',`
html.enOn,html.enOn body{background:${'transparent'}!important}
.login.enL>.en-bg{position:absolute;inset:0;z-index:0;pointer-events:none}.login.enL>.en-bg svg{position:absolute;inset:0;width:100%;height:100%}.login.enL>*:not(.en-bg){position:relative;z-index:1}
.login.enL{position:relative;z-index:1;background:none!important;color:var(--en-ink);min-height:100dvh;display:flex!important;flex-direction:column;align-items:center;justify-content:flex-start;gap:0;padding:calc(env(safe-area-inset-top) + 8px) 24px calc(env(safe-area-inset-bottom) + 14px)!important;box-sizing:border-box;overflow:hidden}
.login.enL>.lg9glow,.login.enL>.br9ltop,.login.enL>.hl9,.login.enL .hl9-login,.login.enL .br9clk,.login.enL .br9qc{display:none!important}
.en-w{width:100%;display:flex;flex-direction:column;align-items:center;position:relative}
.en-lrow{display:flex;align-items:center;justify-content:center;gap:10px}
.en-gear{position:relative;flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;padding:0;cursor:pointer;background:var(--en-ic);color:var(--en-ink);border:1.5px solid var(--en-m3);box-shadow:0 3px 10px rgba(0,0,0,.12);z-index:2}
.en-i{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.en-sign{display:flex;flex-direction:column;align-items:center;margin-top:48px;position:relative;width:100%}
.en-arc{position:absolute;top:-34px;width:min(78vw,300px);height:40px}
.en-sign b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:clamp(34px,10.5vw,44px);line-height:1;color:var(--en-ink);letter-spacing:.005em;text-shadow:0 1px 0 rgba(255,255,255,.35)}
.enDark .en-sign b{text-shadow:0 0 14px rgba(255,220,150,.25)}
.en-sign span{display:flex;align-items:center;gap:12px;font-family:'EB Garamond',Georgia,serif;font-weight:600;font-size:clamp(15px,4.6vw,19px);letter-spacing:.42em;padding-left:.42em;margin-top:8px;color:var(--en-ink)}
.en-sign span i{display:block;width:clamp(56px,20vw,90px);height:2px;background:linear-gradient(90deg,transparent,var(--en-m3) 30%,var(--en-ink));border-radius:2px}.en-sign span i:last-child{transform:scaleX(-1)}
.en-sign em{font-style:normal;font-family:'EB Garamond',Georgia,serif;font-weight:700;font-size:clamp(15px,4.6vw,19px);letter-spacing:.32em;padding-left:.32em;margin-top:4px;color:var(--en-acc)}
.en-clock{width:min(86vw,340px,50vh);margin:6px 0 22px;cursor:pointer;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;touch-action:manipulation}.en-clk{width:100%;height:auto;display:block}
.en-rn{font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:15px}.en-rn.big{font-size:20px}
.en-hold{stroke-dasharray:804.2;stroke-dashoffset:804.2;opacity:0;transition:none}.en-hold.on{opacity:1;stroke-dashoffset:0;transition:stroke-dashoffset 3s linear,opacity .2s}
.login.enL .lg9mid{width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;margin:0!important;position:static!important}
.login.enL .lg9go:not(.h12go){box-sizing:border-box;width:100%;max-width:340px;height:58px;border-radius:32px!important;background:var(--en-btn)!important;color:var(--en-btnInk)!important;border:1.6px solid var(--en-m3)!important;box-shadow:0 0 0 1px color-mix(in srgb,var(--en-m2) 60%,transparent) inset,0 8px 22px rgba(0,0,0,.2)!important;font-family:'EB Garamond',Georgia,serif!important;font-size:25px!important;font-weight:500!important;display:flex!important;align-items:center;justify-content:center;position:relative;padding:0 56px!important}
.login.enL .lg9go:not(.h12go) svg{position:absolute;right:22px;width:26px;height:26px;color:inherit;stroke:currentColor}
.login.enAmber .lg9go:not(.h12go),.login.enAmber .h12go{background:linear-gradient(90deg,#ffe2a0,#f6b247 22%,#fff1cc 40%,#f0a12f 60%,#ffd88a 80%,#e8952a)!important;color:#3b2414!important;font-weight:600!important}
.login.enL .lg9fg{background:none!important;border:0!important;color:var(--en-ink)!important;font-family:'EB Garamond',Georgia,serif!important;font-size:18px!important;text-decoration:underline;text-underline-offset:4px;padding:6px!important;box-shadow:none!important}
.login.enL .lg9lang{margin-top:8px!important;background:color-mix(in srgb,var(--en-ic) 55%,transparent)!important;border:0!important;color:var(--en-ink)!important;font-family:'EB Garamond',Georgia,serif!important;font-size:18px!important;border-radius:22px!important;padding:8px 22px!important;display:flex;gap:16px;align-items:center}
.login.enL .lg9lang svg{color:var(--en-ink)}
.login.enL .lg9copy{margin-top:auto!important;color:var(--en-ink)!important;opacity:.55;font-size:11px!important}
.login.enL .lg9f{box-sizing:border-box;width:100%;max-width:340px;height:58px;border-radius:32px!important;display:flex!important;align-items:center;gap:8px;padding:0 6px 0 14px!important;background:color-mix(in srgb,var(--en-ic) 92%,transparent)!important;border:1.6px solid var(--en-m3)!important;box-shadow:0 0 0 1px color-mix(in srgb,var(--en-m2) 60%,transparent) inset,0 8px 22px rgba(0,0,0,.14)!important}
.login.enL .lg9f .lg9eye{color:var(--en-ink)!important;background:none!important;border:0!important}.login.enL .lg9f .h12sep{background:var(--en-m3)!important;opacity:.6}
.login.enL .lg9f .lg9in{flex:1;min-width:0;height:44px;background:none!important;border:0!important;color:var(--en-ink)!important;font-family:'EB Garamond',Georgia,serif;font-size:20px!important;box-shadow:none!important;outline:none}
.login.enL .lg9f .lg9in::placeholder{color:color-mix(in srgb,var(--en-ink) 55%,transparent)}
.login.enL .h12go{flex:none;width:46px!important;height:46px!important;border-radius:50%!important;background:var(--en-btn)!important;color:var(--en-btnInk)!important;border:1.4px solid var(--en-m3)!important;display:grid!important;place-items:center;padding:0!important;box-shadow:0 4px 12px rgba(0,0,0,.2)!important}.login.enL .h12go svg{width:22px;height:22px;color:inherit;stroke:currentColor}
.login.enL .h11sub{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:10px;flex-wrap:wrap}.login.enL .h11sub .h12sep{display:none}.login.enL .h11sub .lg9lang{margin:0!important}.login.enL .h12plus{display:none!important}
.login.enL .pwform{width:100%;max-width:340px;display:flex;flex-direction:column;gap:10px}.login.enL .pwform label{color:var(--en-ink)!important}
.login.enL .pwform input{border-radius:16px!important;border:1.4px solid var(--en-m3)!important;background:color-mix(in srgb,var(--en-ic) 85%,transparent)!important;color:var(--en-ink)!important}
.en-orn{display:flex;align-items:center;gap:12px;margin-top:10px;color:var(--en-ink);opacity:.85}.en-orn i{display:block;width:70px;height:1.4px;background:linear-gradient(90deg,transparent,var(--en-ink))}.en-orn i:last-child{transform:scaleX(-1)}.en-orn .en-i{width:26px;height:26px}
.en-sheet .en-hint{margin:0 2px 12px;color:var(--muted);font-size:14px}
.en-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.en-th{display:flex;flex-direction:column;gap:6px;padding:0;border:0;background:none;cursor:pointer;text-align:center;color:inherit}.en-th b{font-size:13.5px;font-weight:600;color:inherit}
.en-tp{position:relative;display:block;height:150px;border-radius:18px;overflow:hidden;border:2px solid transparent;box-shadow:0 3px 12px rgba(0,0,0,.12)}.en-th.on .en-tp{border-color:var(--gold,#C99A3E);box-shadow:0 0 0 3px color-mix(in srgb,var(--gold,#C99A3E) 35%,transparent)}
.en-tc{position:absolute;left:50%;top:20px;width:84px;height:84px;margin-left:-42px;border-radius:50%}.en-tb{position:absolute;left:18%;right:18%;bottom:14px;height:14px;border-radius:8px;border:1px solid}
.en-tr{position:absolute;right:-24px;bottom:-24px;width:70px;height:70px;transform:rotate(45deg);opacity:.9}
`);
