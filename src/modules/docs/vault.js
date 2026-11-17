/* ===== Butler Docs: the safe (Сейф) =====
   A separate place for the most important papers. A document moved into the safe leaves the ordinary list
   (g.arc.items), so search, Butler AI, packages and reminders no longer see it.
   - Without a code: g.vault.items holds the documents as they are (a separate shelf, no lock).
   - With a code (4–8 digits, optional): the list is stored only encrypted in g.vault.enc, and every file and page
     of these documents is encrypted too (px:vault:<file>-<k>, the plain px:file chunks are deleted).
     Key: PBKDF2-SHA-256 (310 000 rounds, own salt) → AES-256-GCM. A wrong code fails the GCM check.
     The key lives only in memory; the safe locks itself after 2 minutes without a touch and when the app is hidden.
     Nobody can open a forgotten code — the user confirms this before the code is set.
   - «Сроки» shows only the dates of documents in the safe (g.vault.dl), never their names.
   - Backups carry g.vault and px:vault as they are, i.e. encrypted.
   The old Butler «archive PIN» is no longer offered. */
const sfStr={
 t:['Сейф','Tresor','Vault','Sejf','Kasa','Coffre','Caja fuerte'],
 open:['Сейф не защищён','Tresor ist nicht geschützt','The vault is not protected','Sejf nie jest chroniony','Kasa korunmuyor','Le coffre n’est pas protégé','La caja fuerte no está protegida'],
 openS:['Поставьте код — тогда документы в сейфе будут зашифрованы.','Legen Sie einen Code fest – dann werden die Dokumente im Tresor verschlüsselt.','Set a code and the documents in the vault will be encrypted.','Ustaw kod – dokumenty w sejfie zostaną zaszyfrowane.','Bir kod belirleyin – kasadaki belgeler şifrelenir.','Définissez un code : les documents du coffre seront chiffrés.','Ponga un código y los documentos de la caja se cifrarán.'],
 setC:['Поставить код','Code festlegen','Set a code','Ustaw kod','Kod belirle','Définir un code','Poner código'],
 enc:['Зашифровано','Verschlüsselt','Encrypted','Zaszyfrowane','Şifreli','Chiffré','Cifrado'],
 encS:['Сейф запрётся сам через 2 минуты или когда Вы свернёте приложение.','Der Tresor schließt sich nach 2 Minuten oder wenn Sie die App verlassen.','The vault locks itself after 2 minutes or when you leave the app.','Sejf zamknie się po 2 minutach lub gdy opuścisz aplikację.','Kasa 2 dakika sonra ya da uygulamadan çıkınca kilitlenir.','Le coffre se verrouille après 2 minutes ou quand vous quittez l’app.','La caja se cierra sola tras 2 minutos o al salir de la app.'],
 lock:['Запереть','Abschließen','Lock','Zamknij','Kilitle','Verrouiller','Cerrar'],
 codeM:['Код сейфа','Tresor-Code','Vault code','Kod sejfu','Kasa kodu','Code du coffre','Código de la caja'],
 locked:['Сейф заперт','Tresor ist verschlossen','The vault is locked','Sejf jest zamknięty','Kasa kilitli','Le coffre est verrouillé','La caja está cerrada'],
 nDocs:['Документов внутри: %n','Dokumente darin: %n','Documents inside: %n','Dokumentów: %n','İçindeki belgeler: %n','Documents : %n','Documentos dentro: %n'],
 enter:['Введите код','Code eingeben','Enter the code','Wpisz kod','Kodu girin','Saisissez le code','Introduzca el código'],
 openB:['Открыть','Öffnen','Open','Otwórz','Aç','Ouvrir','Abrir'],
 bad:['Неверный код','Falscher Code','Wrong code','Zły kod','Yanlış kod','Code incorrect','Código incorrecto'],
 wait:['Слишком много попыток. Подождите 30 секунд.','Zu viele Versuche. Bitte 30 Sekunden warten.','Too many attempts. Wait 30 seconds.','Za dużo prób. Poczekaj 30 sekund.','Çok fazla deneme. 30 saniye bekleyin.','Trop d’essais. Attendez 30 secondes.','Demasiados intentos. Espere 30 segundos.'],
 empty:['В сейфе пока пусто. Откройте документ и нажмите «В сейф» — или выберите его здесь.','Der Tresor ist noch leer. Öffnen Sie ein Dokument und tippen Sie „In den Tresor“ – oder wählen Sie es hier.','The vault is empty. Open a document and tap “Into the vault” – or pick it here.','Sejf jest pusty. Otwórz dokument i dotknij „Do sejfu” – albo wybierz go tutaj.','Kasa boş. Bir belgeyi açıp “Kasaya” deyin ya da buradan seçin.','Le coffre est vide. Ouvrez un document et touchez « Au coffre » – ou choisissez-le ici.','La caja está vacía. Abra un documento y toque «A la caja», o elíjalo aquí.'],
 pick:['Переложить документ в сейф','Dokument in den Tresor legen','Move a document into the vault','Przenieś dokument do sejfu','Kasaya belge taşı','Mettre un document au coffre','Pasar un documento a la caja'],
 pickT:['Какой документ положить в сейф?','Welches Dokument in den Tresor?','Which document goes into the vault?','Który dokument do sejfu?','Hangi belge kasaya?','Quel document mettre au coffre ?','¿Qué documento a la caja?'],
 noDocs:['Документов пока нет.','Noch keine Dokumente.','No documents yet.','Brak dokumentów.','Henüz belge yok.','Pas encore de documents.','Aún no hay documentos.'],
 into:['В сейф','In den Tresor','Into the vault','Do sejfu','Kasaya','Au coffre','A la caja'],
 intoS:['Документ уйдёт из общего списка, поиска и чата','Das Dokument verschwindet aus Liste, Suche und Chat','The document leaves the list, search and chat','Dokument zniknie z listy, wyszukiwania i czatu','Belge listeden, aramadan ve sohbetten çıkar','Le document quitte la liste, la recherche et le chat','El documento sale de la lista, la búsqueda y el chat'],
 moved:['Документ в сейфе','Dokument liegt im Tresor','Document is in the vault','Dokument w sejfie','Belge kasada','Document au coffre','Documento en la caja'],
 back:['Вернуть в документы','Zurück zu den Dokumenten','Back to documents','Przywróć do dokumentów','Belgelere geri al','Remettre dans les documents','Devolver a documentos'],
 backed:['Документ снова в общем списке','Dokument ist wieder in der Liste','Document is back in the list','Dokument wrócił na listę','Belge yeniden listede','Le document est de retour','El documento vuelve a la lista'],
 files:['Файлы','Dateien','Files','Pliki','Dosyalar','Fichiers','Archivos'],
 note:['Заметка','Notiz','Note','Notatka','Not','Note','Nota'],
 valid:['Действует до','Gültig bis','Valid until','Ważny do','Geçerlilik','Valable jusqu’au','Válido hasta'],
 c1:['Новый код (4–8 цифр)','Neuer Code (4–8 Ziffern)','New code (4–8 digits)','Nowy kod (4–8 cyfr)','Yeni kod (4–8 rakam)','Nouveau code (4 à 8 chiffres)','Código nuevo (4–8 cifras)'],
 c2:['Повторите код','Code wiederholen','Repeat the code','Powtórz kod','Kodu tekrarlayın','Répétez le code','Repita el código'],
 cOld:['Нынешний код','Aktueller Code','Current code','Obecny kod','Mevcut kod','Code actuel','Código actual'],
 warn:['Я понимаю: если забуду код, документы сейфа не восстановит никто — ни я, ни Butler.','Ich verstehe: Vergesse ich den Code, kann niemand die Tresor-Dokumente wiederherstellen – auch Butler nicht.','I understand: if I forget the code, nobody can recover the vault documents – not even Butler.','Rozumiem: jeśli zapomnę kod, nikt nie odzyska dokumentów z sejfu – nawet Butler.','Anlıyorum: kodu unutursam kasadaki belgeleri kimse kurtaramaz – Butler da.','Je comprends : si j’oublie le code, personne ne pourra récupérer les documents du coffre – pas même Butler.','Entiendo: si olvido el código, nadie podrá recuperar los documentos, ni siquiera Butler.'],
 hint:['Запишите код и храните отдельно от телефона.','Schreiben Sie den Code auf und bewahren Sie ihn getrennt vom Telefon auf.','Write the code down and keep it away from the phone.','Zapisz kod i trzymaj go z dala od telefonu.','Kodu yazın ve telefondan ayrı saklayın.','Notez le code et gardez-le loin du téléphone.','Anote el código y guárdelo lejos del teléfono.'],
 save:['Включить код','Code einschalten','Turn the code on','Włącz kod','Kodu aç','Activer le code','Activar código'],
 chg:['Сменить код','Code ändern','Change the code','Zmień kod','Kodu değiştir','Changer le code','Cambiar código'],
 off:['Снять код','Code entfernen','Remove the code','Usuń kod','Kodu kaldır','Retirer le code','Quitar código'],
 offS:['Документы сейфа будут расшифрованы и останутся в сейфе без замка.','Die Tresor-Dokumente werden entschlüsselt und bleiben ohne Schloss im Tresor.','The vault documents are decrypted and stay in the vault without a lock.','Dokumenty zostaną odszyfrowane i zostaną w sejfie bez zamka.','Belgeler şifresi çözülüp kasada kilitsiz kalır.','Les documents sont déchiffrés et restent au coffre sans verrou.','Los documentos se descifran y quedan en la caja sin cerradura.'],
 eFmt:['Код — от 4 до 8 цифр','Code: 4 bis 8 Ziffern','Code: 4 to 8 digits','Kod: 4–8 cyfr','Kod: 4–8 rakam','Code : 4 à 8 chiffres','Código: de 4 a 8 cifras'],
 eSame:['Коды не совпадают','Codes stimmen nicht überein','The codes do not match','Kody się różnią','Kodlar eşleşmiyor','Les codes ne correspondent pas','Los códigos no coinciden'],
 eWarn:['Подтвердите, что поняли предупреждение','Bitte bestätigen Sie den Hinweis','Please confirm the warning','Potwierdź ostrzeżenie','Lütfen uyarıyı onaylayın','Confirmez l’avertissement','Confirme el aviso'],
 busy:['Шифрую…','Verschlüssele …','Encrypting…','Szyfruję…','Şifreleniyor…','Chiffrement…','Cifrando…'],
 on:['Код включён — сейф зашифрован','Code aktiv – Tresor verschlüsselt','Code on – the vault is encrypted','Kod włączony – sejf zaszyfrowany','Kod açık – kasa şifreli','Code activé – coffre chiffré','Código activo: caja cifrada'],
 offed:['Код снят','Code entfernt','Code removed','Kod usunięty','Kod kaldırıldı','Code retiré','Código quitado'],
 err:['Не получилось. Ничего не потеряно — попробуйте ещё раз.','Das hat nicht geklappt. Nichts ging verloren – bitte erneut versuchen.','That did not work. Nothing was lost – please try again.','Nie udało się. Nic nie stracono – spróbuj ponownie.','Olmadı. Hiçbir şey kaybolmadı – tekrar deneyin.','Échec. Rien n’est perdu – réessayez.','No funcionó. No se perdió nada; inténtelo de nuevo.'],
 inSafe:['Документ в сейфе','Dokument im Tresor','Document in the vault','Dokument w sejfie','Kasadaki belge','Document au coffre','Documento en la caja'],
 number:['Номер','Nummer','Number','Numer','Numara','Numéro','Número'],issuer:['Кем выдан','Ausgestellt von','Issued by','Wydany przez','Veren','Délivré par','Expedido por'],issued:['Выдан','Ausgestellt am','Issued','Wydany','Veriliş','Délivré le','Expedido'],place:['Место','Ort','Place','Miejsce','Yer','Lieu','Lugar'],party:['Организация','Organisation','Organisation','Instytucja','Kurum','Organisme','Entidad']};
const sft=k=>cv5n(sfStr[k]);
/* a toast that never sticks (the app's own toast can stay behind when a sheet is open) */
const sfToast=t=>{try{document.querySelectorAll('.toast').forEach(x=>x.remove())}catch{}T(t,2600)};

/* --- storage and the key (memory only) --- */
const sfVault=()=>{const o=g.vault=g.vault&&typeof g.vault==='object'?g.vault:{};if(!o.enc&&!Array.isArray(o.items))o.items=[];return o};
let sfKey=null,sfItems=null,sfLast=0,sfFails=0,sfWait=0,sfSel=null,sfImg={};
const sfHas=()=>!!sfVault().enc;
const sfList=()=>sfHas()?(sfItems||[]):sfVault().items;
const sfRefs=d=>[...(d.files||[]),...(d.pages||[])].filter(f=>f&&f.id);
const sfB64=u=>{let s='';for(let j=0;j<u.length;j+=32768)s+=String.fromCharCode.apply(null,u.subarray(j,j+32768));return btoa(s)};
const sfU8=b=>{const s=atob(b),u=new Uint8Array(s.length);for(let j=0;j<s.length;j++)u[j]=s.charCodeAt(j);return u};
async function sfDerive(code,salt){const b=await crypto.subtle.importKey('raw',new TextEncoder().encode(String(code)),'PBKDF2',!1,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:310000,hash:'SHA-256'},b,{name:'AES-GCM',length:256},!1,['encrypt','decrypt'])}
async function sfEnc(key,u8){const iv=crypto.getRandomValues(new Uint8Array(12));return{iv:sfB64(iv),ct:sfB64(new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,u8)))}}
async function sfDec(key,o){return new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:sfU8(o.iv)},key,sfU8(o.ct)))}
async function sfSaveItems(){const o=sfVault();
 if(sfHas()){if(!sfKey)throw new Error('locked');const e=await sfEnc(sfKey,new TextEncoder().encode(JSON.stringify(sfItems||[])));o.enc={s:o.enc.s,iv:e.iv,ct:e.ct};delete o.items}
 const L2=sfList();o.dl=L2.map(d=>d.end).filter(k=>/^\d{4}-\d\d-\d\d$/.test(k||'')).sort();o.n=L2.length;$()}
/* one file: plain chunks (px:file) ⇄ encrypted chunks (px:vault) */
const SF_CH=18e4;
async function sfFileToSafe(f){const b=await ni(f);if(!b)return!0;const e=await sfEnc(sfKey,sfU8(b));const n=Math.ceil(e.ct.length/SF_CH)||1;
 for(let k=0;k<n;k++)if(!await ao('vault',f.id+'-'+k,k?{d:e.ct.slice(k*SF_CH,(k+1)*SF_CH)}:{iv:e.iv,n,d:e.ct.slice(0,SF_CH)}))return!1;return!0}
async function sfFileRead(f){const h=await fl('vault',f.id+'-0');if(!h||!h.iv)return null;let ct=h.d||'';for(let k=1;k<(h.n||1);k++){const c=await fl('vault',f.id+'-'+k);if(!c)return null;ct+=c.d}return sfB64(await sfDec(sfKey,{iv:h.iv,ct}))}
async function sfFileDropSafe(f){const h=await fl('vault',f.id+'-0');for(let k=0;k<(h&&h.n||1);k++)try{await To('vault',f.id+'-'+k)}catch{}}
async function sfFileToPlain(f){const b=await sfFileRead(f);if(b==null)return!0;const n=Math.ceil(b.length/SF_CH)||1;
 for(let k=0;k<n;k++)if(!await ao('file',f.id+'-'+k,{d:b.slice(k*SF_CH,(k+1)*SF_CH)}))return!1;f.n=n;return!0}
/* the scanned text and word positions of a document are kept apart from it (px:dtext / px:dwords) — they go into the safe too */
const SF_PRIV=['dtext','dwords'];
async function sfPrivToSafe(id){for(const k of SF_PRIV){const x=await fl(k,id);if(x==null)continue;const e=await sfEnc(sfKey,new TextEncoder().encode(JSON.stringify(x)));if(!await ao('vault',k+':'+id,{iv:e.iv,d:e.ct}))return!1}return!0}
async function sfPrivDropPlain(id){for(const k of SF_PRIV)try{await To(k,id)}catch{}try{delete Fa.text[id]}catch{}}
async function sfPrivToPlain(id){for(const k of SF_PRIV){const h=await fl('vault',k+':'+id);if(!h||!h.iv)continue;const x=JSON.parse(new TextDecoder().decode(await sfDec(sfKey,{iv:h.iv,ct:h.d})));if(!await ao(k,id,x))return!1}return!0}
async function sfPrivDropSafe(id){for(const k of SF_PRIV)try{await To('vault',k+':'+id)}catch{}}
const sfDropPlain=f=>{try{yl(f)}catch{}try{delete Fa.img[f.id]}catch{}};

/* --- code: set, check, unlock, lock, remove --- */
async function sfSetCode(code){if(sfHas())return!1;const salt=crypto.getRandomValues(new Uint8Array(16)),key=await sfDerive(code,salt),items=sfVault().items||[];
 sfKey=key;const done=[];for(const d of items){if(!await sfPrivToSafe(d.id)){sfKey=null;return!1}for(const f of sfRefs(d)){if(!await sfFileToSafe(f)){for(const x of done)await sfFileDropSafe(x);sfKey=null;return!1}done.push(f)}}
 sfVault().enc={s:sfB64(salt)};sfItems=items;sfDropEvents(items.map(d=>d.id));await sfSaveItems();try{typeof bsvSecIn==='function'&&await bsvSecIn()}catch{}for(const f of done)sfDropPlain(f);for(const d of items)await sfPrivDropPlain(d.id);sfLast=Date.now();return!0}
async function sfCheck(code){try{const o=sfVault();const key=await sfDerive(code,sfU8(o.enc.s));const u=await sfDec(key,o.enc);return{key,items:JSON.parse(new TextDecoder().decode(u))}}catch{return null}}
async function sfUnlock(code){if(Date.now()<sfWait)return'wait';const r=await sfCheck(code);if(!r){if(++sfFails>=5){sfWait=Date.now()+3e4;sfFails=0}return'bad'}
 sfKey=r.key;sfItems=r.items;sfFails=0;sfLast=Date.now();return'ok'}
function sfLock(){if(!sfKey&&!sfItems)return;sfKey=null;sfItems=null;sfSel=null;sfImg={};document.querySelectorAll('.dtsheet.vsh').forEach(x=>x.remove());if(m.route==='dsafe')v()}
async function sfClearCode(){if(!sfHas()||!sfKey)return!1;if(typeof bsvSecOut==='function'&&!await bsvSecOut())return!1;const all=[];for(const d of sfItems||[]){if(!await sfPrivToPlain(d.id))return!1;for(const f of sfRefs(d)){if(!await sfFileToPlain(f))return!1;all.push(f)}}
 const o=sfVault(),items=sfItems||[];delete o.enc;o.items=items;sfKey=null;sfItems=null;await sfSaveItems();for(const f of all)await sfFileDropSafe(f);for(const d of items)await sfPrivDropSafe(d.id);return!0}

/* --- moving documents in and out --- */
/* the calendar keeps an automatic «… · Срок действия» event per document — a safe document must not leave its name there */
const sfDropEvents=ids=>{try{if(Array.isArray(g.events))g.events=g.events.filter(e=>!(e&&e.dcdoc&&ids.includes(e.dcdoc)))}catch{}try{typeof un1Take==='function'&&un1Take()}catch{}try{document.querySelectorAll('.bd8sv').forEach(x=>x.remove())}catch{}};
const sfMovable=d=>d&&!d.type&&!d.insId;
async function sfIn(id){try{const A=Ke().items,ix=A.findIndex(d=>d.id===id);if(ix<0)return;const d=A[ix];if(!sfMovable(d))return;
 if(sfHas()){if(!sfKey)return sfAsk(()=>sfIn(id));sfToast(sft('busy'));if(!await sfPrivToSafe(d.id)){sfToast(sft('err'));return}for(const f of sfRefs(d))if(!await sfFileToSafe(f)){sfToast(sft('err'));return}
  sfItems.push(d);A.splice(ix,1);await sfSaveItems();sfRefs(d).forEach(sfDropPlain);await sfPrivDropPlain(d.id)}
 else{sfVault().items.push(d);A.splice(ix,1);await sfSaveItems()}
 d.vAt=Date.now();sfDropEvents([d.id]);$();sfSel=null;document.querySelectorAll('.dtsheet').forEach(x=>x.remove());sfToast(sft('moved'));R('dsafe')}catch(e){Hooks.err('vin',e);sfToast(sft('err'))}}
async function sfOut(id){try{const L2=sfList(),ix=L2.findIndex(d=>d.id===id);if(ix<0)return;const d=L2[ix];
 if(sfHas()){if(!sfKey)return;if(!await sfPrivToPlain(d.id)){sfToast(sft('err'));return}for(const f of sfRefs(d))if(!await sfFileToPlain(f)){sfToast(sft('err'));return}}
 L2.splice(ix,1);delete d.vAt;Ke().items.push(d);await sfSaveItems();if(sfHas()){for(const f of sfRefs(d))await sfFileDropSafe(f);await sfPrivDropSafe(d.id)}sfSel=null;sfToast(sft('backed'));v()}catch(e){Hooks.err('vout',e);sfToast(sft('err'))}}

/* --- reading a file of a safe document --- */
async function sfB64Of(f){return sfHas()?(sfKey?await sfFileRead(f):null):await ni(f)}
async function sfShowImgs(){for(const im of document.querySelectorAll('img[data-vimg]:not([src])')){const d=sfList().find(x=>x.id===im.dataset.doc),f=d&&sfRefs(d).find(x=>x.id===im.dataset.vimg);if(!f)continue;
 try{if(!sfImg[f.id]){const b=await sfB64Of(f);if(b)sfImg[f.id]='data:'+(f.type||'image/jpeg')+';base64,'+b}if(sfImg[f.id])im.src=sfImg[f.id]}catch(e){Hooks.err('vimg',e)}}}
async function sfOpenFile(docId,fid){try{const d=sfList().find(x=>x.id===docId),f=d&&sfRefs(d).find(x=>x.id===fid);if(!f)return;const b=await sfB64Of(f);if(!b){sfToast(sft('err'));return}
 const url=URL.createObjectURL(new Blob([sfU8(b)],{type:f.type||'application/octet-stream'}));if(!window.open(url,'_blank')){const a=document.createElement('a');a.href=url;a.download=f.name||'document';a.click()}setTimeout(()=>URL.revokeObjectURL(url),6e4)}catch(e){Hooks.err('vfile',e);sfToast(sft('err'))}}

/* --- screens --- */
const sfIc={lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',open:'<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 7.6-1.7"/>',key:'<circle cx="8" cy="15" r="3.5"/><path d="M10.5 12.5L19 4M16 7l2 2M14 9l1.5 1.5"/>',shield:'<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/>',file:'<path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3.5V8h4.5"/>'};
const sfi=(n,c)=>`<svg class="dhi${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true">${sfIc[n]||''}</svg>`;
const sfEmo=d=>{try{return(d.dtype&&typeof Ct!=='undefined'&&Ct[d.dtype]&&Ct[d.dtype][0])||'📄'}catch{return'📄'}};
const sfHdr=()=>`<div class="sub-hdr"><button class="iconbtn" data-act="${sfSel?'vlist':'odback'}" aria-label="back">${_('back')}</button><div class="ttl"><h2>${i(sft('t'))}</h2></div>${sfHas()&&sfKey?`<button class="iconbtn vlockb" data-act="vlock" aria-label="${i(sft('lock'))}">${sfi('lock')}</button>`:'<span></span>'}</div>`;
function sfLockScreen(){const n=sfVault().n||0;return`<div class="screen dhome vsafe">${sfHdr()}<div class="vlk">${sfi('lock','big')}<h3>${i(sft('locked'))}</h3><p>${i(sft('nDocs').replace('%n',n))}</p>
 <form class="vform" data-vform="unlock" autocomplete="off"><input class="field vcode" id="vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="${i(sft('enter'))}"><small class="verr" data-verr></small>
 <button type="submit" class="dhcard vbtn">${sfi('open')}<span>${i(sft('openB'))}</span></button></form></div></div>`}
function sfRow(d){const sm=[d.party,d.end?sft('valid')+' '+vA(d.end):''].filter(Boolean).join(' · ');return`<button type="button" class="odr vrow" data-act="vsel" data-id="${i(d.id)}"><span class="vemo">${sfEmo(d)}</span><span><b>${i(d.title||'—')}</b>${sm?`<small>${i(sm)}</small>`:''}</span>${dhi('chev','sm')}</button>`}
function sfListScreen(){const L2=sfList();
 const top=sfHas()?`<div class="dhcard vst on">${sfi('shield')}<span><b>${i(sft('enc'))}</b><small>${i(sft('encS'))}</small></span></div><button type="button" class="dhcard vline" data-act="vcode">${sfi('key')}<span>${i(sft('codeM'))}</span>${dhi('chev','sm')}</button>`
  :`<div class="dhcard vst">${sfi('open')}<span><b>${i(sft('open'))}</b><small>${i(sft('openS'))}</small></span><button type="button" class="vsetc" data-act="vcode">${i(sft('setC'))}</button></div>`;
 return`<div class="screen dhome vsafe">${sfHdr()}${top}
 ${L2.length?`<div class="dhcard odl vlist">${L2.map(sfRow).join('')}</div>`:`<div class="dhcard"><p class="dhnone">${i(sft('empty'))}</p></div>`}
 <button type="button" class="dhcard odadd" data-act="vpick">${sfi('lock')}<span>${i(sft('pick'))}</span></button></div>`}
function sfDetail(d){const F=d.f||{},rows=[['party',d.party],...['number','issuer','issued','place'].map(k=>[k,F[k]]),['valid',F.valid||d.end]].filter(([,x])=>x);
 const pg=(d.pages||[]).filter(x=>x&&x.id),fs=(d.files||[]).filter(x=>x&&x.id);
 return`<div class="screen dhome vsafe">${sfHdr()}<div class="vdh"><span class="vemo big">${sfEmo(d)}</span><h3>${i(d.title||'—')}</h3></div>
 ${rows.length?`<div class="dhcard vkv">${rows.map(([k,x])=>`<div><small>${i(sft(k))}</small><b>${i(/^\d{4}-\d\d-\d\d$/.test(x)?vA(x):x)}</b></div>`).join('')}</div>`:''}
 ${d.note?`<div class="dhcard"><small class="vlab">${i(sft('note'))}</small><p class="vnote">${i(d.note)}</p></div>`:''}
 ${pg.length?`<div class="vpgs">${pg.map(p=>`<img data-vimg="${i(p.id)}" data-doc="${i(d.id)}" alt="">`).join('')}</div>`:''}
 ${fs.length?`<div class="dhcard odl"><small class="vlab">${i(sft('files'))}</small>${fs.map(f=>`<button type="button" class="odr" data-act="vfile" data-id="${i(d.id)}" data-f="${i(f.id)}">${sfi('file')}<span><b>${i(f.name||'—')}</b></span>${dhi('chev','sm')}</button>`).join('')}</div>`:''}
 <button type="button" class="dhcard odadd" data-act="vout" data-id="${i(d.id)}">${dhi('fld')}<span>${i(sft('back'))}</span></button></div>`}
function sfScreen(){if(sfHas()&&!sfKey)return sfLockScreen();const d=sfSel&&sfList().find(x=>x.id===sfSel);if(sfSel&&!d)sfSel=null;return d?sfDetail(d):sfListScreen()}
OD_OK.add('dsafe');Te.includes('dsafe')||Te.push('dsafe');
(Hooks.h.screen=Hooks.h.screen||[]).unshift(()=>{try{if(m.route==='dsafe')return sfScreen()}catch(e){Hooks.err('vscreen',e)}});
Hooks.on('render',()=>{if(m.route==='dsafe'){sfShowImgs();if(sfHas()&&!sfKey)setTimeout(()=>{const c=document.getElementById('vcode');c&&!c.value&&c.focus()},80)}});
/* «В сейф» inside an ordinary document (that screen is drawn outside the 'screen' hook, so the button is put into the page) */
function sfIntoBtn(){try{if(m.route!=='bdoc'||document.querySelector('.vinto'))return;const d=Ke().items.find(x=>x.id===m.bdid);if(!sfMovable(d))return;
 const del=document.querySelector('.screen .dzdel');if(!del)return;const w=document.createElement('div');
 w.innerHTML=`<button type="button" class="dhcard vinto" data-act="vin" data-id="${i(d.id)}">${sfi('lock')}<span><b>${i(sft('into'))}</b><small>${i(sft('intoS'))}</small></span></button>`;del.before(w.firstChild)}catch(e){Hooks.err('vbdoc',e)}}
Hooks.on('render',sfIntoBtn);
{let q=0;new MutationObserver(()=>{if(q||m.route!=='bdoc')return;q=1;requestAnimationFrame(()=>{q=0;sfIntoBtn()})}).observe(document.body,{childList:!0,subtree:!0})}

/* --- sheets: unlock to move, set / change / remove the code --- */
const sfErr=(el,k)=>{const e=el.querySelector('[data-verr]');if(e)e.textContent=k?sft(k):''};
const sfOk=c=>/^\d{4,8}$/.test(c);
function sfAsk(then){H(sft('t'),`<form class="vform" data-vform="ask" autocomplete="off"><input class="field vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" placeholder="${i(sft('enter'))}" data-c1><small class="verr" data-verr></small><button type="submit" class="dcadd gold">${i(sft('openB'))}</button></form>`,el=>{el.classList.add('vsh');el._then=then;setTimeout(()=>{const c=el.querySelector('[data-c1]');c&&c.focus()},80)})}
const sfNewForm=(old)=>`<form class="vform" data-vform="${old?'chg':'set'}" autocomplete="off">${old?`<input class="field vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" placeholder="${i(sft('cOld'))}" data-c0>`:''}
 <input class="field vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" placeholder="${i(sft('c1'))}" data-c1><input class="field vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" placeholder="${i(sft('c2'))}" data-c2>
 <label class="vwarn"><input type="checkbox" data-cw> <span>${i(sft('warn'))}</span></label><p class="vhint">${i(sft('hint'))}</p><small class="verr" data-verr></small>
 <button type="submit" class="dcadd gold">${i(old?sft('chg'):sft('save'))}</button></form>`;
function sfCodeSheet(){if(!sfHas())return H(sft('setC'),sfNewForm(!1),el=>el.classList.add('vsh'));
 H(sft('codeM'),`<details class="vdet"><summary>${i(sft('chg'))}</summary>${sfNewForm(!0)}</details><details class="vdet"><summary>${i(sft('off'))}</summary><form class="vform" data-vform="off" autocomplete="off"><p class="vhint">${i(sft('offS'))}</p><input class="field vcode" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" placeholder="${i(sft('cOld'))}" data-c0><small class="verr" data-verr></small><button type="submit" class="dcadd">${i(sft('off'))}</button></form></details>`,el=>el.classList.add('vsh'))}
document.addEventListener('submit',async e=>{const f=e.target.closest&&e.target.closest('form[data-vform]');if(!f)return;e.preventDefault();e.stopPropagation();if(f.dataset.busy)return;
 const q=s=>{const x=f.querySelector(s);return x?String(x.value||'').trim():''},k=f.dataset.vform,sh=f.closest('.dtsheet');f.dataset.busy=1;
 try{
  if(k==='unlock'){const r=await sfUnlock(document.getElementById('vcode').value.trim());if(r==='ok'){v()}else{sfErr(f,r);const c=document.getElementById('vcode');c&&(c.value='',c.focus())}}
  else if(k==='ask'){const r=await sfUnlock(q('[data-c1]'));if(r==='ok'){const t=sh&&sh._then;sh&&sh.remove();t&&t()}else sfErr(f,r)}
  else if(k==='set'||k==='chg'){const c0=q('[data-c0]'),c1=q('[data-c1]'),c2=q('[data-c2]');
   if(k==='chg'&&!(await sfCheck(c0)))return sfErr(f,'bad');if(!sfOk(c1))return sfErr(f,'eFmt');if(c1!==c2)return sfErr(f,'eSame');if(!f.querySelector('[data-cw]').checked)return sfErr(f,'eWarn');
   sfToast(sft('busy'));if(k==='chg'&&!(await sfClearCode()))return sfToast(sft('err'));if(!(await sfSetCode(c1)))return sfToast(sft('err'));sh&&sh.remove();sfToast(sft('on'));v()}
  else if(k==='off'){if(!(await sfCheck(q('[data-c0]'))))return sfErr(f,'bad');sfToast(sft('busy'));if(!(await sfClearCode()))return sfToast(sft('err'));sh&&sh.remove();sfToast(sft('offed'));v()}
 }catch(er){Hooks.err('vform',er);sfToast(sft('err'))}finally{delete f.dataset.busy}},!0);
function sfPick(){const D=Ke().items.filter(sfMovable);H(sft('pickT'),D.length?`<div class="odl vpick">${D.map(d=>`<button type="button" class="odr" data-vin="${i(d.id)}"><span class="vemo">${sfEmo(d)}</span><span><b>${i(d.title||'—')}</b>${d.party?`<small>${i(d.party)}</small>`:''}</span></button>`).join('')}</div>`:`<p class="dhnone">${i(sft('noDocs'))}</p>`,
 el=>el.addEventListener('click',e=>{const b=e.target.closest('[data-vin]');if(b){el.remove();sfIn(b.dataset.vin)}}))}
Hooks.act('dhvault',()=>{sfSel=null;R('dsafe')},{replace:!0});
Hooks.act('vin',d=>sfIn(d.id));Hooks.act('vout',d=>sfOut(d.id));Hooks.act('vsel',d=>{sfSel=d.id;v()});Hooks.act('vlist',()=>{sfSel=null;v()});
Hooks.act('vlock',()=>sfLock());Hooks.act('vcode',()=>sfCodeSheet());Hooks.act('vpick',()=>sfPick());Hooks.act('vfile',d=>sfOpenFile(d.id,d.f));

/* --- the safe locks itself --- */
document.addEventListener('visibilitychange',()=>{if(document.hidden&&sfKey)sfLock()});
['pointerdown','keydown'].forEach(t=>document.addEventListener(t,()=>{if(sfKey)sfLast=Date.now()},!0));
setInterval(()=>{if(sfKey&&Date.now()-sfLast>12e4)sfLock()},1e4);
/* dates for «Сроки» — no names */
function vDl(){try{return(sfVault().dl||[]).map(k=>({k,t:sft('inSafe'),act:'data-act="dhvault"'}))}catch{return[]}}
const odV={vSetCode:sfSetCode,vUnlock:sfUnlock,vLock:sfLock,vClearCode:sfClearCode,vIn:sfIn,vOut:sfOut,vCheck:sfCheck,list:()=>sfList(),has:sfHas,open:()=>!!sfKey};

Hooks.css('docs-vault',`
.od [data-act=dcold]{display:none!important}
.vsafe .vst{display:flex;align-items:center;gap:12px}.vsafe .vst>.dhi{flex:none;color:#b07a10}.vsafe .vst.on>.dhi{color:var(--green)}.vsafe .vst span{flex:1;display:flex;flex-direction:column;gap:2px}.vsafe .vst small{color:var(--muted);font-size:13px;line-height:1.35}
.vsetc{flex:none;border:0;border-radius:999px;padding:9px 14px;background:var(--green);color:#fff!important;font-weight:600;font-size:14px}
.vline{display:flex;align-items:center;gap:12px;color:var(--ink)!important}.vline span{flex:1;font-weight:600}.vline>.dhi:first-child{color:var(--green)}
.vemo,.odr .vemo{flex:none;width:28px;text-align:center;font-size:20px;display:block}.vemo.big{font-size:44px;width:auto}
.vrow>.dhi{color:var(--muted)}
.vlk{display:flex;flex-direction:column;align-items:center;text-align:center;padding:28px 6px 10px}.vlk>.dhi.big{width:64px;height:64px;color:var(--green);stroke-width:1.3}.vlk h3{margin:12px 0 4px;font-size:22px}.vlk p{margin:0 0 18px;color:var(--muted)}
.vform{display:flex;flex-direction:column;gap:10px;width:100%;max-width:340px;margin:0 auto}.vcode{text-align:center;font-size:22px;letter-spacing:.35em;padding:12px}
.verr{color:#c0392b;min-height:16px;font-size:13.5px;text-align:center}
.vbtn{display:flex;align-items:center;justify-content:center;gap:8px;font-weight:600;color:var(--green)!important;margin-top:2px}
.vwarn{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.4;text-align:left}.vwarn input{margin-top:3px;width:20px;height:20px;flex:none}
.vhint{color:var(--muted);font-size:13px;margin:0}
.vdet{border:1px solid var(--line);border-radius:16px;padding:10px 14px;margin-bottom:10px}.vdet summary{font-weight:600;cursor:pointer;padding:4px 0}.vdet .vform{margin-top:10px}
.vdh{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0 8px}.vdh h3{margin:0;font-size:22px;text-align:center}
.vkv{display:grid;grid-template-columns:1fr 1fr;gap:12px}.vkv div{display:flex;flex-direction:column;gap:2px;min-width:0}.vkv small,.vlab{color:var(--muted);font-size:12.5px}.vkv b{font-weight:600;overflow-wrap:anywhere}
.vnote{margin:4px 0 0;white-space:pre-wrap;line-height:1.45}
.vpgs{display:flex;flex-direction:column;gap:10px;margin-top:12px}.vpgs img{width:100%;border-radius:14px;background:var(--surface);min-height:60px;box-shadow:0 3px 14px rgba(20,60,30,.08)}
.vinto{display:flex;align-items:center;gap:12px;margin:14px 0 10px;color:var(--ink)!important}.vinto>.dhi{color:var(--green);flex:none}.vinto span{display:flex;flex-direction:column;gap:2px}.vinto small{color:var(--muted);font-size:13px}
.vpick{max-height:60vh;overflow:auto}
`);
