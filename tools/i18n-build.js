/* Builds src/modules/i18n/<lang>.js from tools/i18n/<lang>.txt («index<TAB>text», \n = line break).
   Checks: every key translated, the same %placeholders, the same number of line breaks, the weekday list has 7 words.
   Usage: node tools/i18n-build.js tr pl fr es it uk ro bg sr hr */
const fs=require('fs'),path=require('path');const keys1=require('./i18n-keys.json'),keysN=require('./i18n-keys-new.json');let bad=0;
/* the new languages (no own texts in the old core) also need the visible core texts: tools/i18n-keys-new.json */
const NEW=['it','uk','ro','bg','sr','hr'];
const ph=s=>(s.match(/%[a-z]/g)||[]).sort().join(',');
for(const lg of process.argv.slice(2)){const keys=NEW.includes(lg)?keysN:keys1;const f=path.join(__dirname,'i18n',lg+'.txt');const L=fs.readFileSync(f,'utf8').split('\n').filter(l=>l.trim());const T={};
 for(const l of L){const m=l.match(/^(\d+)\t(.*)$/);if(!m){console.log(lg,'bad line',l.slice(0,60));bad++;continue}T[+m[1]]=m[2].replace(/\\n/g,'\n')}
 const D={};keys.forEach((k,i)=>{const t=T[i];if(t==null||!t.trim()){console.log(lg,'missing',i,k);bad++;return}
  if(ph(t)!==ph(k)){console.log(lg,'placeholders',i,JSON.stringify(k),'→',JSON.stringify(t));bad++}
  if((t.match(/\n/g)||[]).length!==(k.match(/\n/g)||[]).length){console.log(lg,'line breaks',i);bad++}
  if(k==='Mon Tue Wed Thu Fri Sat Sun'&&t.split(' ').length!==7){console.log(lg,'weekdays');bad++}
  D[k]=t});
 const extra=Object.keys(T).filter(i=>+i>=keys.length);if(extra.length){console.log(lg,'extra lines',extra.join(','));bad++}
 const js=`/* Butler Docs – ${lg} texts for the Docs modules, keyed by the English text (tools/i18n-build.js; do not edit by hand). */\nvar I18N=typeof I18N!=='undefined'?I18N:{};I18N.${lg}=${JSON.stringify(D)};\n`;
 fs.writeFileSync(path.join(__dirname,'..','src','modules','i18n',lg+'.js'),js);console.log(lg,Object.keys(D).length+'/'+keys.length)}
process.exit(bad?1:0);
