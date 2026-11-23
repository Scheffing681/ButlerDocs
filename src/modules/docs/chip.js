/* ===== Butler Docs: reading the chip of passports / ID cards / residence permits by NFC (v47) =====
   Works only in the app from the App Store / Google Play (native shell in /native, plugin «ButlerNfc»).
   In the browser version the status shows «Chip (in der App)» and a short note – nothing else changes.
   Access key: document number + date of birth + expiry (from the machine line, «MRZ geprüft») or the 6-digit CAN
   printed on the front of the German ID card. The phone reads DG1 (data) and the security object (SOD):
   - «Daten unverändert»: the hashes of the read data match the SOD;
   - «Signatur gültig»: the SOD is signed by the document signer certificate of the issuing state.
   Butler shows «Chip geprüft ✓» only when both are true. It is still no official identification (that is the
   state eID / EUDI wallet). Nothing leaves the phone.
   Data: doc.chip={ok,t,data:1,sig:1,num,valid,birth,land}; doc.mrz gets birth/num/valid when the MRZ is taken over. */
const CPX={
 st:['Чип проверен','Chip geprüft','Chip checked'],stApp:['Чип (в приложении)','Chip (in der App)','Chip (in the app)'],
 web:['Чтение чипа (NFC) работает только в приложении из App Store / Google Play. В браузере телефон не даёт доступа к NFC.','Das Lesen des Chips (NFC) geht nur in der App aus dem App Store / Google Play. Im Browser erlaubt das Telefon kein NFC.','Reading the chip (NFC) works only in the app from the App Store / Google Play. In the browser the phone allows no NFC.'],
 btn:['📡 Прочитать чип (NFC)','📡 Chip lesen (NFC)','📡 Read the chip (NFC)'],noNfc:['На этом телефоне NFC нет или он выключен.','Dieses Telefon hat kein NFC oder es ist ausgeschaltet.','This phone has no NFC or it is switched off.'],
 keyT:['Ключ к чипу','Schlüssel zum Chip','Key to the chip'],keyS:['Чип открывается данными из машинной строки или 6-значным номером CAN (на лицевой стороне немецкого ID справа внизу).','Der Chip öffnet sich mit den Daten der Maschinenzeile oder der 6-stelligen Zugangsnummer (CAN, beim deutschen Ausweis vorne rechts unten).','The chip opens with the data of the machine line or the 6-digit access number (CAN, on the front of the German ID card, bottom right).'],
 useMrz:['Данные машинной строки','Daten der Maschinenzeile','Machine line data'],useCan:['Номер CAN (6 цифр)','Zugangsnummer CAN (6 Ziffern)','Access number CAN (6 digits)'],
 go:['Читать – приложите телефон к документу','Lesen – Telefon an das Dokument halten','Read – hold the phone to the document'],hold:['Держите телефон у документа, не двигайте …','Telefon ans Dokument halten, nicht bewegen …','Hold the phone to the document, do not move …'],
 needKey:['Заполните номер, дату рождения и срок – или CAN.','Bitte Nummer, Geburtsdatum und Ablaufdatum ausfüllen – oder die CAN.','Please fill in number, date of birth and expiry – or the CAN.'],
 ok:['Чип прочитан: данные не изменены, подпись государства верна.','Chip gelesen: Daten unverändert, Signatur des Staates gültig.','Chip read: data unchanged, the state’s signature is valid.'],
 part:['Чип прочитан, но проверка неполная: %t. Проверьте документ сами.','Chip gelesen, aber die Prüfung ist unvollständig: %t. Bitte das Dokument selbst prüfen.','Chip read, but the check is incomplete: %t. Please check the document yourself.'],
 noData:['данные не совпадают с подписью','Daten passen nicht zur Signatur','data do not match the signature'],noSig:['подпись не подтверждена','Signatur nicht bestätigt','signature not confirmed'],
 fail:['Не удалось прочитать чип: %t','Chip nicht gelesen: %t','Chip not read: %t'],diff:['Данные чипа отличаются от карточки: %t','Chip-Daten weichen von der Karte ab: %t','Chip data differ from the card: %t'],
 note:['Проверка чипа подтверждает, что данные подписаны государством и не изменены. Это не официальная идентификация – для неё есть государственное eID / кошелёк EUDI.','Die Chip-Prüfung zeigt: die Daten sind vom Staat signiert und unverändert. Eine amtliche Identifizierung ist das nicht – dafür gibt es die staatliche eID / EUDI-Wallet.','The chip check shows: the data are signed by the state and unchanged. It is not an official identification – that is the state eID / EUDI wallet.']
};
const cpxT=(k,o)=>{let s=cv5n(CPX[k]||[k,k,k]);if(o)for(const p in o)s=s.split('%'+p).join(o[p]);return s};
/* native bridge (Capacitor). The page is the same in the browser and in the app. */
function cpxPlug(){try{const C=window.Capacitor;if(!C||!(C.isNativePlatform?C.isNativePlatform():C.isNative))return null;
 return C.Plugins&&C.Plugins.ButlerNfc||(C.registerPlugin?C.registerPlugin('ButlerNfc'):null)}catch{return null}}
const cpxYmd6=s=>/^\d{4}-\d\d-\d\d$/.test(s||'')?s.slice(2,4)+s.slice(5,7)+s.slice(8,10):'';
function cpxKey(d){const z=d.mrz||{},f=d.f||{};return{num:(z.num||f.number||'').toUpperCase().replace(/[^A-Z0-9]/g,''),birth:z.birth||'',valid:z.valid||f.valid||''}}
function cpxStatusHtml(d){const P=cpxPlug(),c=d.chip;
 if(c&&c.ok)return`<span class="mpxst on">${i(cpxT('st'))} ✓</span>`;return`<span class="mpxst off">${i(P?cpxT('st'):cpxT('stApp'))}</span>`}
function cpxBodyHtml(d){const P=cpxPlug(),c=d.chip;let h='';
 if(c&&c.msg)h+=`<p class="mpxsh ${c.ok?'okt':'wat'}">${i(c.msg)}</p>`;
 if(P)h+=`<button type="button" class="mpxmrz" data-act="cpxread" data-id="${i(d.id)}">${i(cpxT('btn'))}</button><small class="lnqx">${i(cpxT('note'))}</small>`;
 else h+=`<small class="lnqx">📡 ${i(cpxT('web'))}</small>`;return h}
function cpxSheet(d){const k=cpxKey(d),de=d.dtype==='id';
 H(cpxT('keyT'),`<p class="mpxsh">${i(cpxT('keyS'))}</p>
  <label class="lnqopt"><input type="radio" name="cpk" value="mrz" ${de&&!k.birth?'':'checked'}><span><b>${i(cpxT('useMrz'))}</b></span></label>
  <div class="cpxmrz"><label class="asf"><span>${i(mpxT('f_num'))}</span><input class="field" data-c="num" value="${i(k.num)}" autocomplete="off" autocapitalize="characters"></label>
  <label class="asf"><span>${i(mpxT('f_birth'))}</span><input class="field" type="date" data-c="birth" value="${i(k.birth)}"></label>
  <label class="asf"><span>${i(mpxT('f_valid'))}</span><input class="field" type="date" data-c="valid" value="${i(k.valid)}"></label></div>
  <label class="lnqopt"><input type="radio" name="cpk" value="can" ${de&&!k.birth?'checked':''}><span><b>${i(cpxT('useCan'))}</b></span></label>
  <input class="field" data-c="can" inputmode="numeric" maxlength="6" placeholder="123456" autocomplete="off">
  <button type="button" class="dcadd gold" data-cgo>${i(cpxT('go'))}</button><p class="mpxsh cpxmsg"></p>`,sh=>{sh.classList.add('bsvsh','lnqsh','mpxsheet');
  const g0=s=>sh.querySelector('[data-c='+s+']').value.trim(),msg=sh.querySelector('.cpxmsg');
  sh.querySelector('[data-cgo]').onclick=async()=>{const mode=sh.querySelector('[name=cpk]:checked').value,num=g0('num').toUpperCase().replace(/[^A-Z0-9]/g,''),b=g0('birth'),e=g0('valid'),can=g0('can').replace(/\D/g,'');
   const arg=mode==='can'?{can}:{docNumber:num,birth:cpxYmd6(b),expiry:cpxYmd6(e)};
   if(mode==='can'?can.length!==6:!(num&&arg.birth&&arg.expiry)){msg.textContent=cpxT('needKey');return}
   msg.textContent='📡 '+cpxT('hold');const bt=sh.querySelector('[data-cgo]');bt.disabled=!0;
   const r=await cpxRead(d,arg);bt.isConnected&&(bt.disabled=!1);if(r){sh.remove();mpxRecRe()}else msg.textContent=d.chip&&d.chip.msg||''}})}
async function cpxRead(d,arg){const P=cpxPlug();if(!P)return!1;
 try{const av=P.isAvailable?await P.isAvailable():{nfc:!0};if(av&&av.nfc===!1){d.chip={ok:0,t:Date.now(),msg:cpxT('noNfc')};return!1}
  const r=await P.readChip(arg);return cpxTake(d,r)}catch(e){d.chip={ok:0,t:Date.now(),msg:cpxT('fail',{t:String(e&&e.message||e).slice(0,120)})};mpxSave();return!1}}
/* r: {documentNumber,lastName,firstName,birth:'YYMMDD',expiry:'YYMMDD',nationality,issuer,documentCode,dataOk,signatureOk,errors} */
function cpxTake(d,r){if(!r||typeof r!=='object')return!1;const ymd=(s,f)=>{try{return mpxYmd(String(s||''),f)}catch{return''}},birth=ymd(r.birth),valid=ymd(r.expiry,1),num=String(r.documentNumber||'').replace(/</g,'');
 const dataOk=!!r.dataOk,sigOk=!!r.signatureOk,ok=dataOk&&sigOk,miss=[dataOk?'':cpxT('noData'),sigOk?'':cpxT('noSig')].filter(Boolean).join(', ');
 const f=d.f=d.f||{},diff=[];if(f.number&&num&&f.number.replace(/\s/g,'').toUpperCase()!==num)diff.push(mpxT('f_num'));if(f.valid&&valid&&f.valid!==valid)diff.push(mpxT('f_valid'));
 if(ok){if(num&&!f.number)f.number=num;if(valid&&!f.valid){f.valid=valid;d.end=valid}}
 d.chip={ok:ok?1:0,t:Date.now(),data:dataOk?1:0,sig:sigOk?1:0,num,valid,birth,land:String(r.issuer||r.nationality||''),msg:ok?cpxT('ok')+(diff.length?' '+cpxT('diff',{t:diff.join(', ')}):''):cpxT('part',{t:miss})};
 if(ok){d.mrz=Object.assign({},d.mrz||{},{ok:1,birth,num,valid})}mpxSave();return!0}
Hooks.act('cpxread',d=>{const doc=mpxDoc(d.id);doc&&cpxSheet(doc)});
Hooks.css('docs-chip',`.cpxmrz{margin:0 0 6px 4px}.cpxmsg{min-height:18px;margin-top:8px}`);
