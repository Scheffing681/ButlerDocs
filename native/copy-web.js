/* Copies the web app (repo root) into native/www – the folder Capacitor packs into the iOS / Android app.
   Run after every `node build.js` in the repo root. */
const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..'),out=path.join(__dirname,'www');
const take=['index.html','app.js','app.css','manifest.webmanifest','sw.js','relay.js','fonts','geo','icons','img','lib'];
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of take){const s=path.join(root,f);if(!fs.existsSync(s)){console.log('missing',f);continue}fs.cpSync(s,path.join(out,f),{recursive:true})}
console.log('www ready:',take.length,'entries');
