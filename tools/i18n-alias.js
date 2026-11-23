/* For the new languages the old core sometimes falls back to German or Russian instead of English.
   This maps those German/Russian texts to their English twin (same key in the same language object of the core),
   only for English texts that have translations (tools/i18n-keys-new.json). Output: src/modules/i18n/alias.js */
const fs=require('fs'),path=require('path'),acorn=require('/opt/npm-tools/node_modules/acorn'),walk=require('/opt/npm-tools/node_modules/acorn-walk');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');const ast=acorn.parse(app,{ecmaVersion:'latest',sourceType:'module',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true});
const K=new Set(require('./i18n-keys-new.json'));const C={},P={};const add=(x,en)=>{const o=C[x]=C[x]||{};o[en]=(o[en]||0)+1};const kn=p=>p.key&&(p.key.name||p.key.value);
const flat=o=>{const r={};if(!o||o.type!=='ObjectExpression')return r;for(const p of o.properties){if(p.type!=='Property')continue;const v=p.value;if(v.type==='Literal'&&typeof v.value==='string')r[kn(p)]=v.value;else if(v.type==='TemplateLiteral'&&!v.expressions.length)r[kn(p)]=v.quasis[0].value.cooked}return r};
walk.full(ast,nd=>{if(nd.type!=='ObjectExpression')return;const P={};for(const p of nd.properties)if(p.type==='Property')P[kn(p)]=p.value;if(!P.en||!(P.de||P.ru))return;
 if(P.en.type==='ObjectExpression'){const en=flat(P.en),de=flat(P.de),ru=flat(P.ru);for(const k in en){if(!K.has(en[k]))continue;for(const o of[de,ru])if(o[k]&&o[k]!==en[k])add(o[k],en[k])}}
 else{const s=x=>x&&x.type==='Literal'&&typeof x.value==='string'?x.value:null;const en=s(P.en);if(en&&K.has(en))for(const o of[P.de,P.ru]){const v=s(o);if(v&&v!==en)add(v,en)}}});
/* the 3- and 7-language arrays of the modules: [ru,de,en,…] */
walk.full(ast,nd=>{if(nd.type!=='ArrayExpression'||nd.elements.length<3)return;const v=nd.elements.slice(0,3).map(e=>e&&e.type==='Literal'&&typeof e.value==='string'?e.value:null);if(v.some(x=>x==null)||!K.has(v[2]))return;for(const x of v.slice(0,2))if(x!==v[2])add(x,v[2])});
/* one German/Russian text with several English twins: take the most frequent twin; a tie is dropped */
const A={};for(const x in C){const e=Object.entries(C[x]).sort((p,q)=>q[1]-p[1]);if(e.length===1||e[0][1]>e[1][1])A[x]=e[0][0]}
/* a few short labels seen on screen (bottom bar) that are ambiguous in the core */
Object.assign(A,{Start:'Home','Главная':'Home',Notiz:'Notes'});
fs.writeFileSync(path.join(__dirname,'..','src','modules','i18n','alias.js'),`/* German/Russian UI texts → their English twin, so the new languages find them (tools/i18n-alias.js; do not edit by hand). */\nvar I18N_AL=${JSON.stringify(A)};\n`);console.log('alias',Object.keys(A).length);
