/* Lists every 3-language string array [ru,de,en] in src/modules/docs (the Docs modules), keyed by the English text.
   Output: tools/i18n-strings.json  {en:{ru,de,files:[..]}}  — the source for the dictionaries in src/modules/i18n/. */
const fs=require('fs'),path=require('path'),acorn=require('/opt/npm-tools/node_modules/acorn'),walk=require('/opt/npm-tools/node_modules/acorn-walk');
const dir=path.join(__dirname,'..','src','modules','docs');const out={};let n=0;
const str=e=>e&&(e.type==='Literal'&&typeof e.value==='string'?e.value:e.type==='TemplateLiteral'&&!e.expressions.length?e.quasis[0].value.cooked:null);
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.js'))){const src=fs.readFileSync(path.join(dir,f),'utf8');let ast;
 try{ast=acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true})}catch(e){console.error('parse',f,e.message);continue}
 walk.full(ast,nd=>{if(nd.type!=='ArrayExpression'||nd.elements.length!==3)return;const v=nd.elements.map(str);if(v.some(x=>x==null))return;
  const[ru,de,en]=v;if(!en.trim()||!/[a-z]/i.test(en))return;if(!/[а-яё]/i.test(ru)&&(en===de||v.every(x=>/^[a-z0-9_]*$/.test(x))))return;n++;const o=out[en]=out[en]||{ru,de,files:[]};if(!o.files.includes(f))o.files.push(f)})}
/* keep the order of tools/i18n-keys.json (the .txt files are aligned to it); new texts go at the end */
const kf=path.join(__dirname,'i18n-keys.json');let K=[];try{K=JSON.parse(fs.readFileSync(kf,'utf8'))}catch{}const gone=K.filter(k=>!out[k]);K=K.concat(Object.keys(out).filter(k=>!K.includes(k)));fs.writeFileSync(kf,JSON.stringify(K));if(gone.length)console.log('no longer used:',gone.length);
fs.writeFileSync(path.join(__dirname,'i18n-strings.json'),JSON.stringify(out,null,1));console.log('arrays',n,'unique en',Object.keys(out).length,'chars',Object.keys(out).join('').length);
