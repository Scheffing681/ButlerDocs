/* Butler smoke test — run before every release:  node tests/smoke.js
   Serves a copy of the app (with a line that exposes its internals to the test), drives it in Chrome
   at iPhone size and fails loudly on anything that broke. Nothing here ships to users. */
const fs=require('fs'),path=require('path'),http=require('http'),os=require('os');
const ROOT=path.resolve(__dirname,'..');
const PW=process.env.PLAYWRIGHT||'/opt/npm-tools/node_modules/playwright';
const CHROME=process.env.CHROME||'/usr/bin/google-chrome';
const {chromium}=require(PW);

/* ---------- a private copy of the app with a test hook ---------- */
const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'butler-smoke-'));
const copy=(s,d)=>{for(const n of fs.readdirSync(s)){if(n==='.git'||n==='tests')continue;const a=path.join(s,n),b=path.join(d,n);fs.statSync(a).isDirectory()?(fs.mkdirSync(b),copy(a,b)):fs.copyFileSync(a,b)}};
copy(ROOT,TMP);
{const f=path.join(TMP,'app.js');let s=fs.readFileSync(f,'utf8');const end='v(),Sq()})();',i=s.trimEnd().lastIndexOf(end);
 if(i<0)throw new Error('app.js end marker not found');
 s=s.slice(0,i)+'try{window.__krZs=t=>krZsScan(t);window.__krTasks=j=>krJobTasks(j);window.__tdRun=()=>tdRun();window.__rlA=o=>rlAnalyze(o);window.__rlOpen=(t,n)=>rlOpen(t,n);window.__ndSame=c=>bsvSame(c);window.__ndMerge=(a,b)=>bsvMerge(a,b);window.__T={vault:odV,fz:{D:()=>fzD(),banks:()=>fzBanks(),guess:t=>fzGuess(t),cents:v=>fzCents(v),pdf:()=>fzPdf()},bsv:{D:()=>bsvD(),hours:bsvHours,now:bsvNow,url:bsvUrl,fx:()=>bsvFxList(),up:()=>bsvUp(),dl:()=>bsvDl(),ask:t=>td9cmd(t),add:k=>bsvAddSrc(k,!1),parse:t=>bsvParse(t),letter:t=>bsvLetterData(t),call:o=>{bsvCallP=o;bsvAfterCall()}},Ke,nr,ni,fl,ao,bd8cfg,L,g:()=>g,m:()=>m,R:(...a)=>R(...a),v:()=>v(),save:()=>$(),x:()=>x_(),h9go:k=>h9go(k),hh:()=>hh(),vt,Ic,bd8C,BD8T,NT,Hooks,sc:{scDetect,scWarp,scClean,scSmooth,scHome}}}catch(e){}\n'+s.slice(i);fs.writeFileSync(f,s)}
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf'};
const srv=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);const f=path.join(TMP,u==='/'?'index.html':u);if(!f.startsWith(TMP)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});

/* ---------- checks ---------- */
const results=[];let failed=0;
const check=(name,ok,detail)=>{results.push([ok?'PASS':'FAIL',name,detail||'']);if(!ok)failed++};
/* no new wrapper layers: new code plugs into Hooks (src/modules/hooks/registry.js); the number may only go down */
{const order=fs.readFileSync(path.join(ROOT,'src','order.txt'),'utf8').split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#')&&!l.startsWith('hooks/'));
 let n=0;for(const f of order)n+=(fs.readFileSync(path.join(ROOT,'src','modules',f),'utf8').match(/(?<![\w$.])[A-Za-z_$][\w$]*(?:\.[\w$]+)?=\((?:f|e)=>(?:async )?function/g)||[]).length;
 const base=+fs.readFileSync(path.join(__dirname,'wrappers-baseline.txt'),'utf8').trim();check('no new wrapper layers (use Hooks)',n<=base,`${n} wrappers, limit ${base}`);
 if(n<base)fs.writeFileSync(path.join(__dirname,'wrappers-baseline.txt'),String(n)+'\n')}
/* app.js must be exactly what src/ builds — nobody edits app.js by hand */
{const {execFileSync}=require('child_process');let ok=true;try{execFileSync(process.execPath,[path.join(ROOT,'build.js'),'--check'],{stdio:'pipe'})}catch{ok=false}check('app.js is built from src/',ok,ok?'':'run node build.js')}

(async()=>{await new Promise(r=>srv.listen(0,r));const URL0=`http://localhost:${srv.address().port}/index.html`;
 const b=await chromium.launch({executablePath:CHROME,args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:393,height:852},locale:'ru-RU',serviceWorkers:'block',acceptDownloads:true});
 const p=await ctx.newPage();const errs=[];let where='start';
 p.on('pageerror',e=>errs.push(where+': '+e.message.slice(0,160)));
 p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_|net::/.test(m.text()))errs.push(where+': console '+m.text().slice(0,160))});
 await p.addInitScript(()=>{navigator.canShare=()=>true;navigator.share=async()=>{}});
 const T=(fn,arg)=>p.evaluate(fn,arg);
 const login=async()=>{for(let k=0;k<12;k++){let ok=false;try{ok=await T(()=>!!(window.__T&&window.__T.m().logged))}catch{await p.waitForTimeout(1200);continue}if(ok)break;try{await T(()=>document.querySelector('[data-act=face]')?.click())}catch{}await p.waitForTimeout(1600)}await T(()=>document.querySelectorAll('#td9tour').forEach(t=>t.remove()))};
 const kind=()=>T(()=>document.querySelector('.screen.bd8s')?'design':document.querySelector('.screen.home2')?'old-home':'screen');

 await p.goto(URL0);await p.waitForTimeout(2000);
 await p.locator('input:visible').last().fill('Тест');await p.getByText('Начать',{exact:true}).click();await p.waitForTimeout(1000);await login();
 check('sign in',await T(()=>window.__T.m().logged));

 /* version numbers agree, so the «new version» banner cannot loop */
 const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8').match(/bdocs-v(\d+)/)[1],idx=fs.readFileSync(path.join(ROOT,'index.html'),'utf8').match(/app\.js\?v=(\d+)/)[1],nt=String(await T(()=>window.__T.NT)).split(' ')[0];
 check('version numbers agree (sw / index / app)',sw===idx&&idx===nt,`sw ${sw} · index ${idx} · app ${nt}`);
 await p.waitForTimeout(4500);check('no update banner on a fresh start',!(await T(()=>!!document.querySelector('.upbar'))));

 /* every screen and every section opens without errors and never falls back to the old home */
 const routes=['home','search','stats','profile','bd9all','bd8','style','ly6','goals','mycal','tasks','notes','pv','td9today'];
 /* Butler Docs: the old home is tested with the new home switched off */
 await T(()=>{window.__T.g().dhOff=1});
 for(const r of routes){where='route '+r;await T(r=>window.__T.R(r),r);await p.waitForTimeout(350);const k=await kind();if(r!=='home')check('screen '+r+' is not the old home',k!=='old-home',k)}
 await T(()=>window.__T.L.f12solo());await p.waitForTimeout(300);
 const keys=await T(()=>window.__T.x());check('sections listed',keys.length>=25,keys.length+' sections');
 for(const k of keys){where='section '+k;await T(k=>{window.__T.R('home');window.__T.h9go(k)},k);await p.waitForTimeout(300);
  const st=await T(()=>({old:!!document.querySelector('.screen.home2'),sc:!!document.querySelector('.sc9'),sheet:!!document.querySelector('.dtsheet')}));
  check('section '+k+' opens',!st.old||st.sc||st.sheet,st.old?'shows the old home':'');
  await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());window.__T.R('home')});await p.waitForTimeout(150)}
 where='after sections';check('scanner window closes when the screen changes',!(await T(()=>!!document.querySelector('.sc9'))));
 await T(()=>window.__T.L.f12grp&&(window.confirm=()=>true,window.__T.L.f12grp()));

 /* buttons on every visible screen have an action behind them */
 const dead=await T(()=>{const L=window.__T.L,out=new Set();document.querySelectorAll('[data-act]').forEach(e=>{if(typeof L[e.dataset.act]!=='function')out.add(e.dataset.act)});return[...out]});
 check('home buttons all have an action',!dead.length,dead.join(', '));

 /* scanner: its home page has every kind, and the image pipeline turns a photo of a sheet into a clean page */
 where='scanner';await T(()=>window.__T.sc.scHome());await p.waitForTimeout(500);
 const kinds=await T(()=>[...document.querySelectorAll('.sc9home [data-a]')].map(b=>b.dataset.a));check('scanner home offers every kind',['cam','book','board','files','id','bcard','arc'].every(k=>kinds.includes(k)),kinds.join(','));
 await T(()=>window.__T.R('home'));
 const pipe=await T(()=>{try{const c=document.createElement('canvas');c.width=900;c.height=1200;const x=c.getContext('2d');x.fillStyle='#2a3a4a';x.fillRect(0,0,900,1200);x.save();x.translate(450,600);x.rotate(.06);x.fillStyle='#e8e4dc';x.fillRect(-330,-460,660,920);x.fillStyle='#222';x.font='22px serif';for(let k=0;k<26;k++)x.fillText('Der Bescheid ist nach § 165 AO teilweise vorläufig '+k,-300,-420+k*34);x.restore();
  const S=window.__T.sc,det=S.scDetect(c,900,1200,640);if(!det)return'no sheet found';const q=det.q.map(p=>[p[0]*900,p[1]*1200]);const flat=S.scWarp(c,q,null),sm=S.scSmooth(flat),out=S.scClean(sm,'doc',true);
  const d=out.getContext('2d').getImageData(0,0,out.width,out.height).data;let w=0;for(let k=0;k<d.length;k+=4*37)if(d[k]>235&&d[k+1]>235&&d[k+2]>235)w++;return{w:out.width,h:out.height,white:w/(d.length/(4*37))}}catch(e){return'error: '+e.message}});
 check('scanner turns a photo of a sheet into a clean page',typeof pipe==='object'&&pipe.white>.6&&pipe.h>pipe.w,JSON.stringify(pipe));
 /* make entries, back up, change, restore, bring back */
 where='data';
 await T(()=>{const g=window.__T.g();g.tasks=g.tasks||[];g.tasks.push({id:'smk1',t:'Смоук: задача',due:'',prio:2,proj:'',done:false});g.notes=g.notes||[];g.notes.push({id:'smk2',t:'Смоук: заметка',x:'текст',ts:Date.now()});window.__T.save()});
 await T(()=>window.__T.hh());await p.waitForTimeout(500);await T(()=>document.querySelector('.dtsheet [data-x=no]')?.click());await p.waitForTimeout(2500);
 check('a copy is made',!!(await T(()=>window.__T.g().bkLast)));
 await T(()=>{const g=window.__T.g();g.tasks=[{id:'smk3',t:'Смоук: после копии',due:'',prio:2,proj:'',done:false}];window.__T.save();window.__T.R('profile')});await p.waitForTimeout(600);
 const card=await T(()=>document.querySelector('.card.st53')?.innerText||'');check('«Защита данных» card is shown',/Защита данных/.test(card));
 await T(()=>document.querySelector('.card.st53 [data-act=bkrestore]').click());await p.waitForTimeout(800);
 const hasIn=await T(()=>!!document.querySelector('.dtsheet [data-x=in]'));check('restore offers the copy kept on the phone',hasIn);
 if(hasIn){await T(()=>document.querySelector('.dtsheet [data-x=in]').click());await p.waitForTimeout(800);
  await Promise.all([p.waitForEvent('load',{timeout:15000}).catch(()=>null),T(()=>document.querySelector('.dtsheet [data-x=go]')?.click())]);await p.waitForTimeout(2200);await login();
  const t=await T(()=>window.__T.g().tasks.map(x=>x.t));check('restore brings the copy back',t.includes('Смоук: задача')&&!t.includes('Смоук: после копии'),t.join(' | '));
  await T(()=>window.__T.R('profile'));await p.waitForTimeout(600);
  const undo=await T(()=>!!document.querySelector('[data-act=st53undo]'));check('«Вернуть как было» is offered after a restore',undo);
  if(undo){p.once('dialog',d=>d.accept());await Promise.all([p.waitForEvent('load',{timeout:15000}).catch(()=>null),T(()=>document.querySelector('[data-act=st53undo]').click())]);await p.waitForTimeout(2200);await login();
   const t2=await T(()=>window.__T.g().tasks.map(x=>x.t));check('«Вернуть как было» brings the data back',t2.includes('Смоук: после копии'),t2.join(' | '))}}

 /* folders: make one by dropping a section on another, then undo */
 where='folders';await T(()=>{window.__T.R('bd9all')});await p.waitForTimeout(500);await T(()=>document.querySelector('[data-act=bd9edit]')?.click());await p.waitForTimeout(500);
 await T(()=>window.__T.L.f12solo());await p.waitForTimeout(500);
 const tiles=p.locator('.screen.bd9 .bd9b[data-f12k]');const n0=await tiles.count();
 if(n0>3){const a=await tiles.nth(2).boundingBox(),c=await tiles.nth(0).boundingBox();await p.mouse.move(a.x+a.width/2,a.y+a.height/2);await p.mouse.down();await p.waitForTimeout(400);
  for(let s=1;s<=10;s++){await p.mouse.move(a.x+a.width/2+(c.x-a.x)*s/10,a.y+a.height/2+(c.y-a.y)*s/10);await p.waitForTimeout(25)}await p.mouse.up();await p.waitForTimeout(700)}
 const n1=await tiles.count();check('drag a section onto another makes a folder',n1===n0-1,`${n0} → ${n1}`);
 await T(()=>document.querySelector('[data-act=f12undo]')?.click());await p.waitForTimeout(600);check('undo takes the folder apart',(await tiles.count())===n0);
 await T(()=>{window.confirm=()=>true;window.__T.L.f12grp()});

 /* projects inside tasks (v261); the finance checks are gone with the finance modules (Butler Docs) */
 where='projects';{await T(()=>window.__T.R('tasks'));await p.waitForTimeout(400);await T(()=>document.querySelector('.pj1chip').click());await p.waitForTimeout(400);check('Проекты open from Задачи',await T(()=>window.__T.m().route)==='projects')}
 /* no twin sections (v262) */
 where='no twins';{const ks=await T(()=>window.__T.x());check('no twin Контакты / Здоровье tiles',!ks.includes('c:contacts')&&!ks.includes('q:body'),ks.join(','));
 await T(()=>{window.__T.R('home');window.__T.h9go('c:health')});await p.waitForTimeout(500);await T(()=>document.querySelector('[data-act=gobody]').click());await p.waitForTimeout(900);await T(()=>document.querySelector('[data-act=tw1health]').click());await p.waitForTimeout(400);{const rr=await T(()=>window.__T.m().route+':'+window.__T.m().cat);check('Моё состояние goes back to Здоровье',rr==='cat:health',rr+' btn:'+await T(()=>!!document.querySelector('[data-act=tw1health]')))}
 await T(()=>window.__T.R('archive'));await p.waitForTimeout(400);await T(()=>document.querySelector('[data-act=tw1scan]').click());await p.waitForTimeout(500);check('Scanner opens from Документы',await T(()=>!!document.querySelector('.sc9')));await T(()=>document.querySelector('.sc9 [data-a=x]')?.click());await p.waitForTimeout(300);await T(()=>document.querySelectorAll('.sc9').forEach(x=>x.remove()))}
 /* letter with a deadline → task with a link (v263) */
 where='letter to task';{const id=await T(()=>{const g=window.__T.g();g.mail=g.mail||[];const d=new Date(Date.now()+5*864e5).toISOString().slice(0,10);const l={id:'lk1test',ts:Date.now(),doc:'',text:'Test',status:'open',from:'Finanzamt',date:'',due:d,req:[],kinds:[]};g.mail.unshift(l);window.__T.save();return l.id});
 await p.waitForTimeout(300);const tk=await T(()=>window.__T.g().tasks.find(q=>q.ml==='lk1test'));check('letter with a deadline makes a task',!!tk&&!tk.done&&/Finanzamt/.test(tk.t),JSON.stringify(tk));
 await T(()=>{window.__T.m().tf='all';window.__T.R('tasks')});await p.waitForTimeout(400);check('task shows ✉ link to the letter',await T(()=>!!document.querySelector('[data-act=lk1open][data-id=lk1test]')));
 await T(()=>document.querySelector('[data-act=lk1open]').click());await p.waitForTimeout(500);check('✉ opens the letter',await T(()=>/Finanzamt/.test(document.querySelector('.sheet,.sh,[class*=sheet]')?.innerText||document.body.innerText)));
 await T(()=>document.querySelectorAll('.sheet,.ovl,.sheet-bg').forEach(x=>x.remove()));
 await T(()=>{const g=window.__T.g();g.mail.find(l=>l.id==='lk1test').status='done';window.__T.save()});await p.waitForTimeout(200);check('closed letter → task done',await T(()=>!!window.__T.g().tasks.find(q=>q.ml==='lk1test'&&q.done)));
 await T(()=>{const g=window.__T.g();g.mail=g.mail.filter(l=>l.id!=='lk1test');g.tasks=g.tasks.filter(q=>q.ml!=='lk1test');window.__T.save();window.__T.R('home')});await p.waitForTimeout(300)}
 /* one search + undo (v264) */
 where='search and undo';{await T(()=>{const g=window.__T.g();g.mail=g.mail||[];g.mail.unshift({id:'os1m',ts:Date.now(),text:'Kfz Beitrag',status:'closed',from:'Allianz Versicherung',due:'',req:[],kinds:[]});g.projects=g.projects||[];window.__T.save()});
 await T(()=>window.__T.R('search'));await p.waitForTimeout(400);await p.locator('#sq').fill('Allianz');await p.waitForTimeout(700);
 check('search finds incoming letters',await T(()=>!!document.querySelector('#sres [data-act=lk1open][data-id=os1m]')));
 await T(()=>{const g=window.__T.g();g.mail=g.mail.filter(l=>l.id!=='os1m');window.__T.save()});await p.waitForTimeout(300);
 check('deleting shows «Вернуть»',await T(()=>!!document.querySelector('.un1 button')));
 await T(()=>document.querySelector('.un1 button').click());await p.waitForTimeout(300);check('«Вернуть» brings the record back',await T(()=>!!window.__T.g().mail.find(l=>l.id==='os1m')));
 await T(()=>{const g=window.__T.g();g.un1off=1;g.mail=g.mail.filter(l=>l.id!=='os1m');window.__T.save();g.un1off=0;document.querySelectorAll('.un1').forEach(x=>x.remove());window.__T.R('home')});await p.waitForTimeout(300)}
 /* quick input: Сканер instead of Фото (v265) */
 where='quick input scanner';{await T(()=>window.__T.L.st20());await p.waitForTimeout(600);const has=await T(()=>!!document.querySelector('.qi5three [data-sc1]')&&!document.querySelector('.qi5three [data-ph="0"]'));check('quick input has Сканер, not Фото',has);
 if(has){await T(()=>document.querySelector('.qi5three [data-sc1]').click());await p.waitForTimeout(600);check('Сканер from quick input opens the scanner',await T(()=>!!document.querySelector('.sc9')));}
 await T(()=>{document.querySelectorAll('.sc9,.dtsheet').forEach(x=>x.remove());document.documentElement.classList.remove('sc9on')});await p.waitForTimeout(200)}
 /* edit the home in place (v266) */
 where='home edit';{await T(()=>document.querySelectorAll('body>div:not([class]):not([id])').forEach(d=>{if(getComputedStyle(d).position==='fixed')d.remove()}));await T(()=>{window.__T.m().bd8d=window.__T.bd8cfg('plan');window.__T.m().bd8d.blocks=['greet','tiles','today','goal','acts'];window.__T.L.bd8apply()});await p.waitForTimeout(1000);await T(()=>document.querySelectorAll('#td9tour').forEach(t=>t.remove()));
 const r=await T(()=>{const e=document.querySelector('.screen.bd8s .bd8gr')?.getBoundingClientRect();return e?[e.left+40,e.top+30]:null});
 if(r){await p.mouse.move(r[0],r[1]);await p.mouse.down();await p.waitForTimeout(800);await p.mouse.up();await p.waitForTimeout(600)}
 check('holding a block opens edit mode',await T(()=>window.__T.m().he1===1&&document.querySelectorAll('.he1f').length>=4));
 check('header is locked in edit mode',await T(()=>!!document.querySelector('.he1lock')));
 const hd=await T(()=>{const f=document.querySelector('.he1f[data-k=goal] .he1h')?.getBoundingClientRect();return f?[f.left+15,f.top+15]:null}),td=await T(()=>document.querySelector('.he1f[data-k=today]')?.getBoundingClientRect().top+10);
 if(hd&&td){await p.mouse.move(hd[0],hd[1]);await p.mouse.down();for(let k=1;k<=10;k++){await p.mouse.move(hd[0],hd[1]+(td-hd[1])*k/10);await p.waitForTimeout(30)}await p.mouse.up();await p.waitForTimeout(600)}
 const ord=await T(()=>window.__T.bd8C().cfg.blocks.join(','));check('dragging ≡ moves a block',ord.indexOf('goal')<ord.indexOf('today'),ord);
 if(await T(()=>!document.querySelector('.he1f')))throw new Error('no edit mode');await T(()=>document.querySelector('.he1f[data-k=tiles]').click());await p.waitForTimeout(400);await T(()=>document.querySelector('.he1sheet [data-v=list]').click());await p.waitForTimeout(400);
 check('tile size can be changed',await T(()=>window.__T.bd8C().cfg.cols===1));await T(()=>document.querySelectorAll('.he1sheet').forEach(s=>s.remove()));
 await T(()=>document.querySelector('[data-he=undo]').click());await p.waitForTimeout(500);
 check('«Отменить» puts everything back',await T(()=>window.__T.bd8C().cfg.blocks.join(',')==='greet,tiles,today,goal,acts'&&window.__T.bd8C().cfg.cols===4&&!window.__T.m().he1));
 if(r){await p.mouse.move(r[0],r[1]);await p.mouse.down();await p.waitForTimeout(800);await p.mouse.up();await p.waitForTimeout(500)}
 await T(()=>document.querySelector('.he1f[data-k=goal] [data-he=rm]').click());await p.waitForTimeout(400);await T(()=>document.querySelector('[data-he=done]').click());await p.waitForTimeout(500);
 check('«Готово» keeps it as «Мой: …»',await T(()=>!window.__T.bd8C().cfg.blocks.includes('goal')&&window.__T.bd8C().saved.some(s=>s.he1&&/План/.test(s.n))))}
 /* Butler Docs: only the original plan (docs/only-docs.js) — the checks above run with the Butler shell (dhOff) */
 where='only docs';{await T(()=>{document.querySelectorAll('.he1sheet,.dtsheet').forEach(s=>s.remove());const g=window.__T.g();g.dhOff=0;window.__T.m().he1=null;window.__T.R('home');window.__T.v()});await p.waitForTimeout(500);
 const go=async(r,c)=>{await T(([r,c])=>window.__T.R(r,c),[r,c]);await p.waitForTimeout(350);return T(()=>window.__T.m().route)};
 for(const r of ['wd','fin','body','kbshop','trv','mira','lib','routine','cycle','food']){const to=await go(r);check('closed screen '+r+' leads away',to!=='wd'&&to===({fin:'fnacc'}[r]||'home'),to)}
 check('Банки open the bank accounts, not Butler Finance',(await go('cat','bank'))==='fnacc');check('Законы stay',(await go('cat','law'))==='cat');check('Здоровье is closed',(await go('cat','health'))==='home');
 await T(()=>{delete window.__T.g().bsv});for(const n of [0,1,2,3,4,5,6,7,8]){await go('home');await T(n=>document.querySelectorAll('.dhgrid .dht')[n].click(),n);await p.waitForTimeout(500);const r=await T(()=>window.__T.m().route);check('home tile '+(n+1)+' opens its section',r!=='home',r);if(r==='bsv'){await p.waitForTimeout(400);check('Ведомства open empty, without emergency buttons',await T(()=>!document.querySelector('.bsv a[href="tel:110"]')&&!!document.querySelector('.bsv [data-act=bsvcat]')));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()))}}
 await go('home');check('home has 9 tiles, no separate «Versicherungen» (it is inside «Dokumente»)',await T(()=>document.querySelectorAll('.dhgrid .dht').length===9&&!document.querySelector('.dhgrid .dht[data-to=ins]')));check('the living sign is on top of home',await T(()=>!!document.querySelector('.odlogo canvas.hl9cv')&&/DOCS/.test(document.querySelector('.odlogo').innerText)));
 for(const n of [0,1]){await go('dall');await T(n=>document.querySelectorAll('.odall .dhgrid')[1].querySelectorAll('.dht')[n].click(),n);await p.waitForTimeout(500);const r=await T(()=>window.__T.m().route+(document.querySelector('.sc9')?':sc9':''));check('▦ extra tile '+(n+1)+' opens',r!=='home'&&r!=='dall',r);await T(()=>document.querySelectorAll('.sc9').forEach(x=>x.remove()))}
 check('Прогресс becomes Сроки',(await go('stats'))==='dsrok');check('Сроки screen is drawn',await T(()=>!!document.querySelector('.screen.odsrok')));
 check('▦ shows only document sections',(await go('bd9all'))==='dall'&&await T(()=>document.querySelectorAll('.odall .dht').length===11));
 await T(()=>document.querySelector('.odall [data-to=sc9]')?.click());await p.waitForTimeout(600);check('Сканер opens from ▦',await T(()=>!!document.querySelector('.sc9')));await T(()=>{document.querySelector('.sc9 [data-a=x]')?.click();document.querySelectorAll('.sc9').forEach(x=>x.remove())});
 for(const r of ['archive','ins','mycal','tasks','fnacc','life','dnach','assets','people','letters','dossier','profile','search','concierge'])check('screen '+r+' stays open',(await go(r))===r);
 const ks=await T(()=>window.__T.x());check('no Butler-only sections in lists',!ks.some(k=>/^(c:(health|sport|wd|rest|travel|books|work|notes|bank|family)|q:(routine|report|fin|stats|goals|edu|body))$/.test(k)),ks.join(','));
 await go('home');check('the tab is called Butler Docs',await T(()=>document.title)==='Butler Docs');check('weather no longer opens the wardrobe',await T(()=>!document.querySelector('[data-to=wd]')));
 check('nav says Заметки (in place of Прогресс / Задачи, v33)',await T(()=>/Заметки|Notizen/.test(document.querySelector('nav.nav [data-k=notiz]')?.innerText||'')&&!document.querySelector('nav.nav [data-k=stats]')));
 await go('search');await T(()=>{const q=document.querySelector('.screen input');q.value='гардероб';q.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(600);
 check('search does not offer closed sections',await T(()=>![...document.querySelectorAll('#sres button')].some(b=>getComputedStyle(b).display!=='none'&&b.offsetParent)),await T(()=>document.getElementById('sres')?.innerText));
 await go('home');
 await T(()=>document.querySelector('[data-act=bd8plus]')?.click());await p.waitForTimeout(700);
 const pl=await T(()=>[...document.querySelectorAll('.bd8pm button')].filter(b=>getComputedStyle(b).display!=='none').map(b=>b.innerText.trim()).join(','));check('«+» offers only document actions',pl==='Документ,Задача,Событие,Сканер,Напоминание',pl);
 await T(()=>document.querySelector('.bd8sheet [data-x]')?.click());await p.waitForTimeout(300);await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()))}
 /* Butler Docs: the vault (docs/vault.js) */
 where='vault';{await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());window.__T.g().dhOff=0;window.__T.R('home')});
 const mk=await T(async()=>{const W=window.__T,c=document.createElement('canvas');c.width=40;c.height=30;const x=c.getContext('2d');x.fillStyle='#c33';x.fillRect(0,0,40,30);
  const b=await new Promise(r=>c.toBlob(r,'image/jpeg'));const f=await W.nr(b);const b64=await W.ni({id:f.id,n:f.n});
  await W.ao('dtext','vt1doc',{t:'ПАСПОРТ ТЕКСТ 45 01 123456'});W.Ke().items.push({id:'vt1doc',title:'Паспорт ТЕСТ-СЕЙФ',kind:'other',party:'МВД',end:'2027-03-12',note:'серия 45',files:[],pages:[{id:f.id,n:f.n,type:'image/jpeg'}],ts:Date.now(),folder:'f1',dcat:'personal',dtype:'passport',f:{number:'45 01 123456'}});W.save();return{pid:f.id,b64}});
 await T(()=>{window.__T.m().bdid='vt1doc';window.__T.R('bdoc')});await p.waitForTimeout(500);check('a document offers «В сейф»',await T(()=>!!document.querySelector('[data-act=vin][data-id=vt1doc]')));
 await T(()=>document.querySelector('[data-act=vin][data-id=vt1doc]').click());await p.waitForTimeout(800);
 check('moved: out of the document list, into the vault',await T(()=>window.__T.m().route==='dsafe'&&!window.__T.Ke().items.some(d=>d.id==='vt1doc')&&window.__T.vault.list().some(d=>d.id==='vt1doc')));
 check('the vault screen lists it',await T(()=>/ТЕСТ-СЕЙФ/.test(document.querySelector('.screen').innerText)));
 check('without a code the vault is plain (no lock)',await T(()=>!window.__T.vault.has()&&!!document.querySelector('.vsafe [data-act=vcode]')));
 const ok=await T(()=>window.__T.vault.vSetCode('2468'));check('a code can be set',ok===true);
 const st=await T(async([pid])=>{const W=window.__T,G=W.g();const plain=await W.ni({id:pid,n:1});const txt=await W.fl('dtext','vt1doc');const txs=await W.fl('vault','dtext:vt1doc');const h=await W.fl('vault',pid+'-0');return{txt,txs:!!(txs&&txs.iv&&!JSON.stringify(txs).includes('ПАСПОРТ')),plain,h:!!(h&&h.iv&&h.d),enc:!!(G.vault.enc&&G.vault.enc.ct),items:G.vault.items,where:Object.keys(G).filter(k=>{const t=JSON.stringify(G[k]);return t&&(t.includes('ТЕСТ-СЕЙФ')||t.includes('45 01 123456'))}).map(k=>k+':'+JSON.stringify(G[k]).slice(0,300)),leak:JSON.stringify(G).includes('ТЕСТ-СЕЙФ')||JSON.stringify(G).includes('45 01 123456')}},[mk.pid]);
 check('with the code: scanned text is encrypted too',!st.txt&&st.txs);
 await p.waitForTimeout(600);const px=await T(async()=>{const I=window.__T.Ic,out=[];for(const k of await I.keys()){const v=JSON.stringify(await I.get(k));if(/ПАСПОРТ|ТЕСТ-СЕЙФ|45 01 123456/.test(v))out.push(k)}let ls=[];for(let j=0;j<localStorage.length;j++){const k=localStorage.key(j),v=localStorage.getItem(k)||'';if(/ПАСПОРТ|ТЕСТ-СЕЙФ|45 01 123456/.test(v))ls.push(k)}const core=await new Promise(res=>{const r=indexedDB.open('bdocs-core',1);r.onsuccess=()=>{try{const q=r.result.transaction('kv','readonly').objectStore('kv').get('S');q.onsuccess=()=>res(q.result&&q.result.json||'');q.onerror=()=>res('')}catch{res('')}};r.onerror=()=>res('')});if(/ТЕСТ-СЕЙФ|45 01 123456/.test(core))out.push('bdocs-core:S');return out.concat(ls)});
 check('with the code: nothing readable left anywhere on the phone',!px.length,px.join(','));check('with the code: page is encrypted, plain copy deleted',st.h&&!st.plain,JSON.stringify(st).slice(0,200));check('with the code: no name or number left in the saved data',st.enc&&!st.items&&!st.leak,JSON.stringify(st.where).slice(0,600));
 await T(()=>{window.__T.vault.vLock();window.__T.R('dsafe')});await p.waitForTimeout(400);
 check('locked: the list is gone from memory and the lock screen shows',await T(()=>!window.__T.vault.open()&&window.__T.vault.list().length===0&&!!document.querySelector('.vlk #vcode')));
 check('a wrong code does not open it',(await T(()=>window.__T.vault.vUnlock('1111')))==='bad');
 await T(()=>{const c=document.getElementById('vcode');c.value='2468';c.form.requestSubmit()});await p.waitForTimeout(2500);
 check('the right code opens it',await T(()=>window.__T.vault.open()&&/ТЕСТ-СЕЙФ/.test(document.querySelector('.screen').innerText)));
 await T(()=>document.querySelector('[data-act=vsel][data-id=vt1doc]').click());await p.waitForTimeout(1200);
 check('an opened document shows its decrypted page',await T(()=>/^data:image/.test(document.querySelector('img[data-vimg]')?.src||'')));
 check('«Сроки» show the date but not the name',await T(()=>{window.__T.R('dsrok');const t=document.querySelector('.screen').innerText;return /в сейфе/i.test(t)&&!/ТЕСТ-СЕЙФ/.test(t)}));
 await T(()=>window.__T.vault.vOut('vt1doc'));await p.waitForTimeout(500);
 const back=await T(async([pid])=>{const W=window.__T;return{inList:W.Ke().items.some(d=>d.id==='vt1doc'),b64:await W.ni({id:pid,n:1}),h:await W.fl('vault',pid+'-0'),txt:await W.fl('dtext','vt1doc')}},[mk.pid]);
 check('back to documents: the page is plain again and identical',back.inList&&back.b64===mk.b64&&!back.h);check('back to documents: the scanned text is back',(back.txt&&back.txt.t)==='ПАСПОРТ ТЕКСТ 45 01 123456');
 await T(()=>window.__T.vault.vIn('vt1doc'));await p.waitForTimeout(700);check('a locked vault still takes documents after the code',await T(()=>window.__T.vault.list().some(d=>d.id==='vt1doc')));
 const off=await T(()=>window.__T.vault.vClearCode());const st2=await T(async([pid])=>{const W=window.__T;return{has:W.vault.has(),b64:await W.ni({id:pid,n:1})}},[mk.pid]);
 check('the code can be removed, files come back',off===true&&!st2.has&&st2.b64===mk.b64);
 await T(()=>{const W=window.__T;W.vault.vOut('vt1doc')});await p.waitForTimeout(400);await T(()=>{const W=window.__T,A=W.Ke().items,k=A.findIndex(d=>d.id==='vt1doc');k>=0&&A.splice(k,1);W.save();W.R('home')})}
 /* Butler Docs: the entrance (docs/entrance.js) */
 where='entrance';{const out=async()=>{await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());const m=window.__T.m();m.logged=false;m.pw=false;window.__T.v()});await p.waitForTimeout(600)};
 const waitIn=async()=>{for(let k=0;k<20;k++){if(await T(()=>window.__T.m().logged))break;await p.waitForTimeout(300)}await p.waitForTimeout(700)};
 const ptr=(type)=>T(type=>{const c=document.querySelector('.login .en-clock');const r=c.getBoundingClientRect();c.dispatchEvent(new PointerEvent(type,{bubbles:true,isPrimary:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2}))},type);
 await out();check('the entrance shows the sign, the clock and ⚙, no icons',await T(()=>!!document.querySelector('.login .en-sign')&&!!document.querySelector('.login .en-clock svg')&&!document.querySelector('.login .en-ic')&&!!document.querySelector('.login .en-gear')));
 check('the working parts stay: Войти, password, language',await T(()=>!!document.querySelector('.login [data-act=face]')&&!!document.querySelector('.login [data-act=pw]')&&!!document.querySelector('.login .lg9lang')));
 await ptr('pointerdown');await p.waitForTimeout(300);await ptr('pointerup');await p.waitForTimeout(3300);check('a short tap on the clock opens nothing',await T(()=>!document.querySelector('.en-sheet')));
 await ptr('pointerdown');await p.waitForTimeout(1500);check('holding fills the golden ring',await T(()=>!!document.querySelector('.en-hold.on')));await p.waitForTimeout(1800);
 check('holding the clock 3 s opens the 10 designs',await T(()=>document.querySelectorAll('.en-sheet .en-th').length===10));await ptr('pointerup');
 await T(()=>document.querySelector('.en-sheet [data-en=night]').click());await p.waitForTimeout(700);check('a design is chosen and kept',await T(()=>window.__T.g().enTheme==='night'&&document.querySelector('.login').dataset.en==='night'&&!document.querySelector('.en-sheet')));
 await T(()=>document.querySelector('.login .en-gear').click());await p.waitForTimeout(400);check('⚙ opens the designs too',await T(()=>!!document.querySelector('.en-sheet')));await T(()=>document.querySelector('.en-sheet [data-en=ivory]').click());await p.waitForTimeout(600);
 await T(()=>document.querySelector('.login [data-act=face]').click());await waitIn();check('back inside after the entrance checks',await T(()=>window.__T.m().logged))}
 /* Butler Docs: own city with postal code (docs/my-city.js) */
 where='my city';{await p.route('**/nominatim.openstreetmap.org/**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify([{lat:'50.1106',lon:'8.6820',display_name:'60311, Frankfurt am Main',address:{postcode:'60311',city:'Frankfurt am Main',state:'Hessen',country_code:'de'}}])}));
 await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());window.__T.R('mycal');window.__T.L.cv5set()});await p.waitForTimeout(700);
 check('the region step has a city/postal-code field instead of the list',await T(()=>!!document.getElementById('mcq')&&!document.querySelector('select[data-cv5=city]')));
 await T(()=>{const q=document.getElementById('mcq');q.value='60311 Frankfurt';q.form.requestSubmit()});await p.waitForTimeout(800);
 check('typed place is found',await T(()=>/60311 Frankfurt am Main/.test(document.querySelector('.mcres').innerText)));
 await T(()=>document.querySelector('.mchit').click());await p.waitForTimeout(600);
 check('the chosen place becomes the city of the app',await T(()=>{const G=window.__T.g();return G.city==='my'&&G.cityX.zip==='60311'&&Math.abs(G.cityX.lat-50.1106)<1e-3}));
 await T(()=>{window.__T.L.cv5close();window.__T.R('home')});await p.unroute('**/nominatim.openstreetmap.org/**')}
 /* Butler Docs: steady screen (docs/steady-screen.js) — sheets never fade, the keyboard never leaves the app short */
 where='steady screen';{const open=async t=>{await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());window.__T.m().sheet=null;window.__T.R('home')});await p.waitForTimeout(300);await T(()=>document.querySelector('[data-act=bd8plus]').click());await p.waitForTimeout(400);await T(t=>[...document.querySelectorAll('.bd8pm button')].find(b=>b.innerText.includes(t)).click(),t)};
 for(const t of ['Задача','Событие']){await open(t);await p.waitForTimeout(30);const op=await T(()=>{const s=document.querySelector('.sheet-wrap .sheet');return s?+getComputedStyle(s).opacity:-1});check('«'+t+'» opens solid at once (no half see-through)',op>.99,String(op));await T(()=>{window.__T.m().sheet=null;window.__T.v()})}
 await T(()=>{window.__T.R('dsafe')});await p.waitForTimeout(300);await T(()=>document.querySelector('[data-act=vcode]').click());await p.waitForTimeout(30);
 await T(()=>{window.__T.R('dossier')});await p.waitForTimeout(300);await T(()=>window.__T.L.mesheet());await p.waitForTimeout(30);
 check('«Meine Angaben / Unterschriften» opens solid at once',await T(()=>{const s=document.querySelector('.sheet-wrap .sheet');return!!s&&+getComputedStyle(s).opacity>.99}));await T(()=>{window.__T.m().sheet=null;window.__T.v()});
 await T(()=>{window.__T.R('dsafe')});await p.waitForTimeout(300);await T(()=>document.querySelector('[data-act=vcode]').click());await p.waitForTimeout(30);
 check('a drawn sheet (vault code) opens solid at once',await T(()=>{const s=document.querySelector('.dtsheet');return!!s&&+getComputedStyle(s).opacity>.99}));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
 const q=await ctx.newPage();await q.addInitScript(()=>{Object.defineProperty(navigator,'standalone',{get:()=>true});const mm=window.matchMedia.bind(window);window.matchMedia=x=>/standalone/.test(x)?{matches:true,media:x,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}}:mm(x);Object.defineProperty(screen,'height',{get:()=>878,configurable:true})});
 await q.goto(URL0);await q.waitForTimeout(1500);await q.evaluate(()=>{const m=window.__T.m();m.logged=true;window.__T.R('mycal')});await q.waitForTimeout(500);
 await q.setViewportSize({width:393,height:470});await q.evaluate(()=>window.__T.v());await q.waitForTimeout(300);
 await q.setViewportSize({width:393,height:852});await q.evaluate(()=>{Object.defineProperty(window,'innerHeight',{get:()=>470,configurable:true});window.__T.v()});await q.waitForTimeout(300);
 const bh=await q.evaluate(()=>Math.round(document.body.getBoundingClientRect().height));check('after the keyboard the app keeps its full height (iPhone app mode)',bh>=848,bh+' of 852');
 const one=await q.evaluate(()=>{const R=document.documentElement,c=getComputedStyle(R),v=n=>c.getPropertyValue(n).trim();return [v('--ssvh'),v('--h10vh'),v('--h236vh'),v('--h236gap'),R.classList.contains('h236')]});
 check('one height for all old helpers (v26: ssvh = h10vh = h236vh, gap = real screen − page)',one[0]==='852px'&&one[1]==='852px'&&one[2]==='852px'&&one[3]==='26px'&&one[4]===true,JSON.stringify(one));await q.close()}
 /* Butler Docs: Behörden & Services (docs/behoerden.js) */
 where='behoerden';{await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());const g=window.__T.g();g.dhOff=0;g.me=Object.assign(g.me||{},{first:'Alexander',last:'Scheffing',addr:'Tannenweg 11, 63741 Aschaffenburg',email:'alex@example.de'});
  g.bsv={items:[{id:'old115',n:'Behördennummer 115',e:'☎️',grp:'nf',src:'b115',tel:'115',links:[],nums:[]},{id:'oldfa',n:'Mein Steuerberater',e:'🧾',grp:'amt',src:'',tel:'06021 1',links:[],nums:[]}],grp:['nf','amt'],ppl:['Я'],nf:{},setup:1};window.__T.m().sheet=null;window.__T.R('home')});await p.waitForTimeout(400);
 const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||400)};
 const fill=(sel,v)=>T(([sel,v])=>{const x=document.querySelector(sel);x.value=v;x.dispatchEvent(new Event('input',{bubbles:true}));x.dispatchEvent(new Event('change',{bubbles:true}))},[sel,v]);
 check('home tile «Ведомства и службы» replaces «Задачи»',await T(()=>!!document.querySelector('.dhgrid .dht[data-to=bsv]')&&!document.querySelector('.dhgrid .dht[data-to=tasks]')));
 await clk('.dhgrid .dht[data-to=bsv]',700);check('the tile opens the section',await rt()==='bsv');
 check('no emergency buttons, no 115, no «Notfalldaten»',await T(()=>!document.querySelector('.bsv a[href^="tel:11"]')&&!document.querySelector('[data-act=bsvnf]')&&!/115/.test(document.querySelector('.screen').innerText)));
 check('the old emergency entries are gone, own entries stay',await T(()=>{const D=window.__T.bsv.D();return!D.items.some(x=>x.id==='old115')&&D.items.some(x=>x.id==='oldfa')&&!D.grp.includes('nf')}));
 check('no questions, no ready-made sets',await T(()=>!document.querySelector('.bsvwzs')));
 await clk('[data-act=bsvcat]',400);check('«Добавить» offers: from a letter · a link · by hand',await T(()=>['l','u','m'].every(k=>document.querySelector(`.dtsheet [data-a3=${k}]`))));
 /* from a letter */
 await T(async()=>{const W=window.__T;await W.ao('dtext','bsl0',{t:'Finanzamt Aschaffenburg Auhofstraße 13 63741 Aschaffenburg Telefon 06021 492-0 poststelle@fa-ab.bayern.de Herrn Alexander Scheffing Tannenweg 11 63741 Aschaffenburg Steuernummer 204/123/45678 Aschaffenburg, 10.11.2026 Bescheid für 2025 über Einkommensteuer. Rechtsbehelfsbelehrung: Der Einspruch ist innerhalb eines Monats nach Bekanntgabe einzulegen.'});
  W.Ke().items.push({id:'bsl0',title:'Bescheid ТЕСТ0',kind:'other',files:[],pages:[],ts:Date.now()+5,folder:'f1',dcat:'other'});W.save()});
 await clk('.dtsheet [data-a3=l]',400);check('«Из письма» lists the scans',await T(()=>!!document.querySelector('.dtsheet [data-pld=bsl0]')&&!!document.querySelector('.dtsheet [data-pls]')));
 await clk('.dtsheet [data-pld=bsl0]',900);const fl=await T(()=>document.querySelector('.bsvfl')?.innerText||'');
 check('the letterhead gives office, address (not mine), phone and number',await rt()==='bsvfl'&&await T(()=>document.querySelector('[data-fln]').value==='Finanzamt Aschaffenburg')&&/Auhofstraße 13, 63741 Aschaffenburg/.test(fl)&&!/Tannenweg/.test(fl)&&/06021 492-0/.test(fl)&&/204\/123\/45678/.test(fl),fl.slice(0,300));
 check('the deadline is only suggested',/14\.12\.2026/.test(fl)&&await T(()=>!!document.querySelector('[data-act=bsvfld][data-k=no]')));
 await clk('[data-act=bsvfld][data-k=no]',300);await clk('[data-act=bsvflsave]',700);
 const fa0=await T(()=>{const W=window.__T,it=W.bsv.D().items.find(x=>x.n==='Finanzamt Aschaffenburg'),d=W.Ke().items.find(z=>z.id==='bsl0');return{it,L:d.bsvL,ev:W.g().events.some(e=>e.bsvD==='bsl0')}});
 check('card made from the letter, nothing put into the calendar on its own',await rt()==='bsvi'&&fa0.it&&fa0.it.src==='fa'&&/Auhofstraße 13/.test(fa0.it.addr)&&fa0.it.tel==='06021 492-0'&&fa0.it.nums[0].v==='204/123/45678'&&fa0.L.it===fa0.it.id&&!fa0.ev,JSON.stringify(fa0));
 check('the card shows only what is filled, plus «＋ ещё»',await T(()=>!!document.querySelector('.bsvmorer')&&!/Мои заявления|Звонки и доказательства/.test(document.querySelector('.screen').innerText)));
 /* a new letter with another address */
 await T(async()=>{const W=window.__T;await W.ao('dtext','bsl0',{t:'Finanzamt Aschaffenburg Neue Straße 5 63739 Aschaffenburg Telefon 06021 492-0 Herrn Alexander Scheffing Tannenweg 11 63741 Aschaffenburg Steuernummer 204/123/45678 Aschaffenburg, 10.11.2026 Schreiben.'});W.m().bdid='bsl0';W.R('bdoc')});await p.waitForTimeout(1200);await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));await p.waitForTimeout(400);
 check('a letter with a new address offers «обновить»',await T(()=>!!document.querySelector('.bsvlb [data-act=bsvltie].on')));
 await clk('.bsvlb [data-act=bsvltie]',900);await clk('[data-act=bsvflsave]',700);check('…and updates the card',await T(id=>/Neue Straße 5/.test(window.__T.bsv.D().items.find(x=>x.id===id).addr),fa0.it.id));
 /* by hand: one smart field */
 await T(()=>window.__T.R('bsv'));await p.waitForTimeout(300);await clk('[data-act=bsvcat]',300);await clk('.dtsheet [data-a3=m]',500);check('«Вручную» opens the short form',await rt()==='bsve');
 await fill('[data-bf=n]','Dr. Müller');await fill('[data-bct="0"]','06021 12345');await clk('[data-act=bsvctadd]',300);await fill('[data-bct="1"]','doctolib.de/praxis');await clk('[data-act=bsvctadd]',300);await fill('[data-bct="2"]','xyz');
 check('it tells what it understood',await T(()=>/Телефон|телефон/i.test(document.querySelector('[data-bkh="0"]').textContent)&&/Termin/.test(document.querySelector('[data-bkh="1"]').textContent)&&document.querySelector('[data-bkh="2"]').classList.contains('no')));
 await clk('[data-act=bsvsave]',300);check('something not understood is refused',await rt()==='bsve');
 await clk('[data-act=bsvctrm][data-j="2"]',300);await fill('[data-bct="2"]','praxis@mueller.de').catch(()=>{});await clk('[data-act=bsvsave]',500);
 const mu=await T(()=>window.__T.bsv.D().items.find(x=>x.n==='Dr. Müller'));check('phone, link (→ Termin) and e-mail land in the right places',await rt()==='bsvi'&&mu.tel==='06021 12345'&&mu.term==='doctolib.de/praxis'&&await T(()=>!!document.querySelector('.bsvact.main[href="https://doctolib.de/praxis"]')),JSON.stringify(mu));
 await clk('[data-act=bsvedit]',400);check('editing shows the contacts again',await T(()=>document.querySelector('[data-bct="0"]').value==='06021 12345'&&document.querySelector('[data-bct="1"]').value==='doctolib.de/praxis'));
 /* secret number, pin and home — under «Дополнительно» */
 await clk('[data-act=bsvnadd]',300);await fill('[data-bn="0"][data-k=t]','Versichertennummer');await fill('[data-bn="0"][data-k=v]','A123456789');await T(()=>{const c=document.querySelector('[data-bn="0"][data-k=s]');c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))});
 await T(()=>{for(const k of ['pin','home']){const c=document.querySelector(`[data-bf=${k}]`);c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))}});await clk('[data-act=bsvsave]',500);
 check('a secret number is masked on the card',await T(()=>/•••• 89/.test(document.querySelector('.screen').innerText)&&!/A123456789/.test(document.querySelector('.screen').innerText)));
 /* paste a link */
 await T(()=>window.__T.R('bsv'));await p.waitForTimeout(300);await clk('[data-act=bsvcat]',300);await clk('.dtsheet [data-a3=u]',400);
 await fill('[data-lk=u]','javascript:alert(1)');await clk('[data-lks]',300);check('a bad link is refused',await T(()=>!!document.querySelector('[data-lkerr]').textContent));
 await fill('[data-lk=u]','https://termine.aschaffenburg.de/buergeramt');check('the name comes from the link',await T(()=>document.querySelector('[data-lk=n]').value==='termine.aschaffenburg.de'));
 await clk('[data-lks]',500);check('a link to a place that looks known asks first (v23)',await T(()=>!!document.querySelector('.dtsheet [data-dn]')));await clk('.dtsheet [data-dn]',500);check('a pasted link becomes an entry with a Termin button',await rt()==='bsvi'&&await T(()=>!!document.querySelector('.bsvact.main[href="https://termine.aschaffenburg.de/buergeramt"]')));
 /* list: pinned, search */
 await T(()=>window.__T.R('bsv'));await p.waitForTimeout(400);check('pinned entry is on top',await T(()=>/★/.test(document.querySelector('.bsv .odh')?.innerText||'')&&/Dr\. Müller/.test(document.querySelector('.bsv .dhcard.odl').innerText)));
 await fill('[data-bsvsr]','204/123');check('search in the list',await T(()=>{const v=[...document.querySelectorAll('.bsvrow')].filter(r=>!r.hidden).map(r=>r.innerText);return v.length===1&&/Finanzamt/.test(v[0])}));
 await T(()=>window.__T.R('home'));await p.waitForTimeout(400);check('«Auf die Startseite» shows it on home',await T(()=>/Dr\. Müller/.test(document.querySelector('.bsvhome')?.innerText||'')));
 /* hours, links */
 const H=await T(()=>{const B=window.__T.bsv,h=B.hours('Mo–Mi 8:30–13, Do 8:30–17, Fr 8:30–12');const at=(dd,hh,mm)=>B.now('Mo–Mi 8:30–13, Do 8:30–17, Fr 8:30–12',new Date(2026,10,dd,hh,mm));
  return{mo:JSON.stringify(h[0]),th:JSON.stringify(h[3]),sa:h[5].length,a:at(16,10,0),b:at(19,16,30),c:at(20,13,0),d:at(21,9,0),e:B.hours('Nur mit Termin'),f:JSON.stringify(B.hours('Mo, Mi 8–12 / 14–16 Uhr')),g:JSON.stringify(B.hours('täglich 9.00 - 18.00'))}});
 check('hours are read (Mo–Mi 8:30–13 …)',H.mo==='[[510,780]]'&&H.th==='[[510,1020]]'&&H.sa===0,JSON.stringify(H));
 check('open now / closed / opens next',H.a.open&&/13:00/.test(H.a.txt)&&H.b.open&&/17:00/.test(H.b.txt)&&!H.c.open&&!H.d.open&&/8:30/.test(H.d.txt),JSON.stringify([H.a,H.b,H.c,H.d]));
 check('«Nur mit Termin» is not taken for Mittwoch',H.e===null);check('day lists, two ranges, «täglich», dots',H.f==='[[[480,720],[840,960]],[],[[480,720],[840,960]],[],[],[],[]]'&&JSON.parse(H.g).every(x=>x[0]&&x[0][0]===540&&x[0][1]===1080),H.f+' '+H.g);
 check('links: only web, phone and mail',await T(()=>{const u=window.__T.bsv.url;return u('elster.de')==='https://elster.de'&&u('javascript:alert(1)')===''&&u('0800 123 456')==='tel:0800123456'&&u('a@b.de')==='mailto:a@b.de'&&u('data:text/html,x')===''}));
 /* the vault code encrypts secret numbers */
 const mid=mu.id;const had=await T(()=>window.__T.vault.has());
 if(!had){await T(()=>window.__T.vault.vSetCode('2468'));await p.waitForTimeout(300);
  const sx=await T(id=>{const n=window.__T.bsv.D().items.find(x=>x.id===id).nums[0];return{x:!!n.x,v:'v' in n,raw:JSON.stringify(window.__T.g().bsv)}},mid);check('with a vault code the secret number is encrypted',sx.x&&!sx.v&&!/A123456789/.test(sx.raw));
  await T(()=>window.__T.vault.vLock());await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
  await T(id=>window.__T.L.bsvopen({id}),mid);await p.waitForTimeout(300);await clk('[data-act=bsvshow]',300);check('showing it asks for the vault code',await T(()=>!!document.querySelector('.dtsheet form[data-vform=ask]')));
  await T(()=>{const f=document.querySelector('.dtsheet form[data-vform=ask]');f.querySelector('[data-c1]').value='2468';f.requestSubmit()});await p.waitForTimeout(1500);
  check('…and then shows it',await T(()=>/A123456789/.test(document.querySelector('.dtsheet .bsvbig')?.innerText||'')));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
  await T(()=>window.__T.vault.vClearCode());await p.waitForTimeout(300);check('removing the vault code gives it back readable',await T(id=>window.__T.bsv.D().items.find(x=>x.id===id).nums[0].v==='A123456789',mid))}
 /* delete */
 await T(id=>window.__T.L.bsvopen({id}),'oldfa');await p.waitForTimeout(300);await clk('[data-act=bsvdel]',200);check('delete asks once more',await T(()=>!!document.querySelector('.bsvdel.on')));await clk('[data-act=bsvdel]',400);check('…and then deletes',await rt()==='bsv'&&await T(()=>!window.__T.bsv.D().items.some(x=>x.id==='oldfa')));
 await clk('nav.nav [data-k=notiz]',400);check('bottom bar «Notizen» opens the notes (v33, was «Aufgaben»)',await rt()==='notiz');await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>d.id!=='bsl0');W.save();W.R('home')})}
 /* Behörden stage 2 (docs/behoerden-termine.js): Frist → Termin, Termin-Mappe, yearly duties, search, Butler AI, Nachlass */
 where='behoerden 2';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||400)};
 const iso=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
 await T(([e])=>{const W=window.__T;document.querySelectorAll('.dtsheet').forEach(s=>s.remove());W.Ke().items.push({id:'bsfx1',title:'Aufenthaltstitel ТЕСТ',kind:'other',end:e,files:[],pages:[],ts:Date.now(),folder:'f1',dcat:'personal'});W.Ke().items.push({id:'bsfx2',title:'Reisepass fern',kind:'other',end:'2031-01-01',files:[],pages:[],ts:Date.now(),folder:'f1',dcat:'personal',dtype:'passport'});W.save();W.R('bsv')},[iso(40)]);await p.waitForTimeout(500);
 check('a residence title running out shows «Ausländerbehörde» with a Termin button',await T(()=>{const f=window.__T.bsv.fx();return f.length===1&&f[0].src==='ausl'&&!!document.querySelector('.bsvfx [data-act=bsvfxhave][data-k=ausl]')}));
 await clk('.bsvfx [data-act=bsvfxhave]',500);check('«Термин уже есть» opens the Termin form with the right checklist',await rt()==='bsvtf'&&await T(()=>document.querySelector('[data-tf=what]').value==='Aufenthaltstitel ТЕСТ'&&/Aufenthaltstitel/.test(document.querySelector('.bsvbr').innerText)));
 await T(()=>{document.querySelector('[data-act=bsvtsave]').click()});await p.waitForTimeout(200);check('a Termin needs a date',await rt()==='bsvtf'&&await T(()=>!!document.querySelector('[data-bsvterr]').textContent));
 await T(([d])=>{const f=(s,v)=>{const x=document.querySelector(s);x.value=v;x.dispatchEvent(new Event('input',{bubbles:true}))};f('[data-tf=date]',d);f('[data-tf=time]','09:30');const c=document.querySelector('[data-tb="0"]');c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}));const k=document.querySelector('[data-td=bsfx1]');k.checked=true;k.dispatchEvent(new Event('change',{bubbles:true}));document.querySelector('[data-act=bsvtsave]').click()},[iso(9)]);await p.waitForTimeout(600);
 const tm=await T(()=>{const W=window.__T,t=W.bsv.D().terms[0],G=W.g();return{t,ev:G.events.find(e=>e.id===t.ev),tk:G.tasks.find(k=>k.id===t.tk)}});
 check('saved Termin opens as Termin-Mappe',await rt()==='bsvtv'&&tm.t.docs[0]==='bsfx1'&&tm.t.bring[0].ok===true);
 check('…it is in the calendar',!!tm.ev&&tm.ev.date===iso(9)&&tm.ev.time==='09:30'&&/Ausländerbehörde/.test(tm.ev.title),JSON.stringify(tm.ev));
 check('…and a reminder the day before',!!tm.tk&&tm.tk.due===iso(8)&&!tm.tk.done,JSON.stringify(tm.tk));
 check('no «saved · open» bar left behind',await T(()=>!document.querySelector('.bd8sv')));
 check('the deadline banner is gone once a Termin exists',await T(()=>window.__T.bsv.fx().length===0));
 check('Mappe shows the document to bring',await T(()=>!!document.querySelector('.bsvtv [data-act=dzopen][data-id=bsfx1]')));
 await T(()=>{const c=document.querySelector('[data-tvb="1"]');c.checked=true;c.dispatchEvent(new Event('change',{bubbles:true}))});check('ticking «Mitbringen» is kept',await T(()=>window.__T.bsv.D().terms[0].bring[1].ok===true&&/2 /.test(document.querySelector('.bsvrd').innerText)));
 await T(()=>window.__T.R('dsrok'));await p.waitForTimeout(400);check('«Сроки» show the Termin',await T(()=>/Termin: Ausländerbehörde/.test(document.querySelector('.screen').innerText)));
 await T(()=>window.__T.R('home'));await p.waitForTimeout(400);check('home shows the coming Termin',await T(()=>!!document.querySelector('.bsvhm2 [data-act=bsvtopen]')));
 const tid=tm.t.id;await T(id=>window.__T.L.bsvtopen({id}),tid);await p.waitForTimeout(400);await clk('[data-act=bsvtdone]',400);
 check('«Erledigt» takes it out of the calendar and tasks',await T(id=>{const W=window.__T,G=W.g(),t=W.bsv.D().terms.find(z=>z.id===id);return t.done&&!G.events.some(e=>e.bsvT===id)&&!G.tasks.some(k=>k.bsvT===id)},tid));
 await clk('[data-act=bsvtdel]',200);await clk('[data-act=bsvtdel]',400);check('delete a Termin',await T(id=>!window.__T.bsv.D().terms.some(z=>z.id===id),tid)&&await rt()==='bsvi');
 /* yearly duties */
 await T(()=>window.__T.R('bsv'));await p.waitForTimeout(400);await T(()=>window.__T.L.bsvyadd({}));await p.waitForTimeout(400);await clk('[data-yt=kfzv]',200);await clk('[data-ysave]',400);
 const y=await T(()=>{const W=window.__T,y=W.bsv.D().yr[0];return{y,ev:W.g().events.find(e=>e.id===y.ev)}});check('a yearly duty gets its next date and a yearly calendar entry',!!y.y&&/-11-30$/.test(y.y.next)&&y.ev&&y.ev.yearly===true,JSON.stringify(y));
 const n0=y.y.next;await T(id=>window.__T.L.bsvydone({id}),y.y.id);await p.waitForTimeout(300);check('«✓» moves it one year on',await T(([id,n])=>{const z=window.__T.bsv.D().yr.find(q=>q.id===id);return z.next===String(+n.slice(0,4)+1)+n.slice(4)},[y.y.id,n0]));
 /* search and Butler AI */
 await T(()=>{const it=window.__T.bsv.D().items.find(x=>x.src==='ausl');it.nums=[{id:'nq1',t:'Aktenzeichen',v:'AZ-77/26',s:false,m:'26'},{id:'nq2',t:'Kundennummer',v:'SECRET-99',s:true,m:'99'}];window.__T.save()});
 await T(()=>window.__T.R('search'));await p.waitForTimeout(300);await T(()=>{const q=document.querySelector('.screen input');q.value='Aktenzeichen';q.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(600);
 check('search finds own numbers in the offices',await T(()=>/AZ-77\/26/.test(document.getElementById('sres')?.innerText||'')));
 await T(()=>{const q=document.querySelector('.screen input');q.value='SECRET';q.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(500);check('search never shows secret numbers',await T(()=>!/SECRET-99/.test(document.getElementById('sres')?.innerText||'')));
 const a=await T(()=>{const f=window.__T.bsv.ask;return[f('Aktenzeichen?'),f('Kundennummer?'),f('телефон Finanzamt'),f('напомни завтра позвонить в Finanzamt')].map(r=>r&&r.msg)});
 check('Butler AI answers «Aktenzeichen?»',/AZ-77\/26/.test(a[0]||''),a[0]);check('…never says a secret number',!!a[1]&&!/SECRET-99/.test(a[1]),a[1]);check('…knows the phone of an office',/492/.test(a[2]||''),a[2]);check('…leaves «напомни …» to the tasks',!/492/.test(a[3]||''),a[3]);
 await T(()=>window.__T.R('dnach'));await p.waitForTimeout(400);check('Nachlass has no «Persönliche Akte» and no «Behörden & Dienste» rows',await T(()=>!document.querySelector('.dnr[data-to=bsv]')&&!document.querySelector('.dnr[data-to=dossier]')));
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>!/^bsfx/.test(d.id));W.save();W.R('home')});await p.waitForTimeout(300)}
 /* Behörden stage 3 (docs/behoerden-briefe.js): scanned letter → deadline, German letters, Anträge, journal */
 where='behoerden 3';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||400)};
 const P=await T(()=>{const f=window.__T.bsv.parse;return{
  a:f('Finanzamt Aschaffenburg Steuernummer 204/123/45678 Aschaffenburg, 10.11.2026 Bescheid für 2025 über Einkommensteuer. Rechtsbehelfsbelehrung: Der Einspruch ist innerhalb eines Monats nach Bekanntgabe einzulegen.'),
  b:f('Jobcenter Stadt Aschaffenburg Datum: 15.11.2026 Bescheid über Leistungen. Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden.'),
  c:f('Stadt Aschaffenburg Bürgeramt Anhörung vom 02.11.2026. Sie können sich bis zum 05.12.2026 äußern. Mit freundlichen Grüßen'),
  d:f('Rezept: 200 g Mehl, 2 Eier, eine Prise Salz, alles gut verrühren und backen.')}});
 check('a scanned Bescheid: office, kind, date, Einspruch deadline (+4 days +1 month)',P.a&&P.a.src==='fa'&&P.a.kind==='Bescheid'&&P.a.date==='2026-11-10'&&P.a.frist==='2026-12-14'&&P.a.obj==='Einspruch',JSON.stringify(P.a));
 check('Widerspruch, and a deadline on Saturday moves to Monday',P.b&&P.b.src==='jc'&&P.b.obj==='Widerspruch'&&P.b.frist==='2026-12-21',JSON.stringify(P.b));
 check('«bis zum …» in the letter is taken as it stands',P.c&&P.c.kind==='Anhörung'&&P.c.dl==='2026-12-05'&&!P.c.frist,JSON.stringify(P.c));check('not every text is a letter',P.d===null,JSON.stringify(P.d));
 await T(async()=>{const W=window.__T;await W.ao('dtext','bsl1',{t:'Finanzamt Aschaffenburg Aschaffenburg, 10.11.2026 Bescheid für 2025 über Einkommensteuer. Rechtsbehelfsbelehrung: Der Einspruch ist innerhalb eines Monats nach Bekanntgabe einzulegen.'});
  W.Ke().items.push({id:'bsl1',title:'Steuerbescheid ТЕСТ',kind:'other',files:[],pages:[],ts:Date.now(),folder:'f1',dcat:'other'});const fa=W.bsv.D().items.find(z=>z.src==='fa');fa.mail='poststelle@fa-ab.bayern.de';fa.nums=[{id:'q9',t:'Steuernummer',v:'204/123/45678',s:false,m:'78'}];W.save();W.m().bdid='bsl1';W.R('bdoc')});
 await p.waitForTimeout(1200);await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));await p.waitForTimeout(400);
 check('the scanned letter shows its office and deadline',await T(()=>{const b=document.querySelector('.bsvlb');return!!b&&/Finanzamt/.test(b.innerText)&&/14\.12\.2026/.test(b.innerText)}));
 await clk('.bsvlb [data-act=bsvlcal]',700);const L1=await T(()=>{const W=window.__T,d=W.Ke().items.find(z=>z.id==='bsl1'),G=W.g();return{L:d.bsvL,ev:G.events.find(e=>e.id===d.bsvL.ev),tk:G.tasks.find(k=>k.id===d.bsvL.tk)}});
 check('«Срок в календарь»: calendar + reminder a week before, tied to the office',!!L1.ev&&L1.ev.date==='2026-12-14'&&/Einspruch/.test(L1.ev.title)&&!!L1.tk&&L1.tk.due==='2026-12-07'&&!!L1.L.it,JSON.stringify(L1));
 check('no «saved · open» bar after it',await T(()=>!document.querySelector('.bd8sv')));
 await T(()=>window.__T.R('dsrok'));await p.waitForTimeout(400);check('«Сроки» show the Einspruch deadline',await T(()=>/Einspruch: Finanzamt/.test(document.querySelector('.screen').innerText)));
 await T(()=>{window.__T.m().bdid='bsl1';window.__T.R('bdoc')});await p.waitForTimeout(900);await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));await p.waitForTimeout(300);
 await clk('.bsvlb [data-act=bsvlobj]',900);const LT=await T(()=>JSON.parse(JSON.stringify(window.__T.m().letter||{})));const tx=(LT.subj||'')+'\n'+(LT.body||'');
 check('«Einspruch» opens my own «Briefe» editor, filled in',await rt()==='letters'&&/Einspruch gegen den Bescheid vom 10\.11\.2026/.test(LT.subj||'')&&/Steuernummer: 204\/123\/45678/.test(LT.body||'')&&/Sehr geehrte Damen und Herren/.test(LT.body||'')&&LT.to==='poststelle@fa-ab.bayern.de'&&/Finanzamt/.test(LT.toName||''),JSON.stringify(LT).slice(0,300));
 check('the letter is German only',!/[а-яё]/i.test(tx));check('my own editor keeps its own design (official letter with my letterhead)',await T(()=>{const d=window.__T.m().letter.des||{};return d.mode==='official'}));
 await T(()=>document.querySelector('.screen > .sub-hdr > button:first-child')?.click());await p.waitForTimeout(500);check('back from «Briefe» returns to the letter',await rt()==='bdoc');
 const fid0=await T(()=>window.__T.bsv.D().items.find(z=>z.src==='fa').id);await T(id=>window.__T.L.bsvopen({id}),fid0);await p.waitForTimeout(400);
 check('the card has one «Schreiben», no separate E-Mail / Brief',await T(()=>!!document.querySelector('.bsvact[data-act=bsvwrite]')&&!document.querySelector('.bsvact[href^="mailto:"]')&&!document.querySelector('[data-act=bsvbrnew]')));
 await clk('.bsvact[data-act=bsvwrite]',400);check('«Schreiben» offers an empty letter and the templates',await T(()=>['frei','obj','frist','nach','stand','adr'].every(k=>document.querySelector(`.dtsheet [data-wr=${k}]`))));
 await clk('.dtsheet [data-wr=frist]',700);check('a template opens «Briefe» with the text',await rt()==='letters'&&await T(()=>/Fristverlängerung/.test(window.__T.m().letter.subj)&&/Verlängerung der Frist/.test(window.__T.m().letter.body)));
 await T(()=>{const G=window.__T.g();G.drafts=G.drafts||[];G.drafts.unshift({id:'smkd1',to:'poststelle@fa-ab.bayern.de',subj:'Einspruch ТЕСТ-ПИСЬМО',text:'x',at:Date.now(),sent:true});window.__T.save()});
 await T(id=>window.__T.L.bsvopen({id}),fid0);await p.waitForTimeout(400);check('letters sent from «Briefe» show on the card',await T(()=>/Einspruch ТЕСТ-ПИСЬМО/.test(document.querySelector('.screen').innerText)));
 await T(id=>window.__T.L.bsvlog({id,k:'sent'}),fid0);await p.waitForTimeout(400);await T(()=>{document.querySelector('[data-lf=txt]').value='Einspruch per Einschreiben';document.querySelector('[data-lf=trk]').value='RR 1234 5678 9DE';document.querySelector('[data-lsave]').click()});await p.waitForTimeout(500);
 check('the card lists the scanned letter and the Einschreiben in the journal',await T(()=>/Steuerbescheid ТЕСТ/.test(document.querySelector('.screen').innerText)&&!!document.querySelector('[data-act=bsvtrack]')));
 /* Anträge */
 const fid=await T(()=>window.__T.bsv.D().items.find(z=>z.src==='fa').id);await T(id=>window.__T.L.bsvantadd({id}),fid);await p.waitForTimeout(400);
 await T(()=>{document.querySelector('[data-af=t]').value='Antrag ТЕСТ';document.querySelector('[data-af=az]').value='AZ-1';document.querySelector('[data-asave]').click()});await p.waitForTimeout(400);
 let an=await T(()=>{const W=window.__T,a=W.bsv.D().ant.find(z=>z.t==='Antrag ТЕСТ');return{a,tk:a&&W.g().tasks.find(k=>k.id===a.tk)}});
 const d28=await T(()=>{const d=new Date();d.setDate(d.getDate()+28);return d.toISOString().slice(0,10)});
 check('an Antrag gets «ask after 4 weeks»',!!an.a&&an.a.st===1&&!!an.tk&&an.tk.due===d28,JSON.stringify(an));
 await T(id=>window.__T.L.bsvantnx({id}),an.a.id);await T(id=>window.__T.L.bsvantnx({id}),an.a.id);await p.waitForTimeout(300);
 an=await T(id=>{const W=window.__T,a=W.bsv.D().ant.find(z=>z.id===id);return{a,tk:W.g().tasks.some(k=>k.bsvA===id)}},an.a.id);check('decision received closes the reminder',an.a.st===3&&!!an.a.d3&&!an.tk);
 await T(id=>window.__T.L.bsvantask({id}),an.a.id);await p.waitForTimeout(400);check('«Спросить статус» = Sachstandsanfrage with the number',await rt()==='letters'&&await T(()=>/Sachstandsanfrage – Antrag ТЕСТ/.test(window.__T.m().letter.subj)&&/Aktenzeichen: AZ-1/.test(window.__T.m().letter.body)));
 await T(()=>document.querySelector('.screen > .sub-hdr > button:first-child').click());await p.waitForTimeout(400);check('back from the letter',await rt()==='bsvi');
 /* after a call */
 await T(id=>window.__T.bsv.call({it:id,at:Date.now()-60000}),fid);await p.waitForTimeout(300);check('coming back after «Позвонить» asks who it was',await T(()=>!!document.querySelector('.dtsheet [data-lf=who]')));
 await T(()=>{document.querySelector('[data-lf=who]').value='Frau Weber';document.querySelector('[data-lsave]').click()});await p.waitForTimeout(500);check('the call is in the journal',await T(()=>window.__T.bsv.D().log.some(l=>l.k==='call'&&l.who==='Frau Weber')));
 await T(()=>{window.__T.m().bdid='bsl1';window.__T.R('bdoc')});await p.waitForTimeout(900);await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));await p.waitForTimeout(300);
 await clk('.bsvlb [data-act=bsvlno]',300);check('× hides the letter banner for good',await T(()=>!document.querySelector('.bsvlb')&&window.__T.Ke().items.find(z=>z.id==='bsl1').bsvL.no===1));
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>d.id!=='bsl1');W.save();W.R('home')});await p.waitForTimeout(300)}
 /* Butler Docs: Finanzen (docs/finanzen.js) — Steuer-Mappe; banks become cards in «Behörden & Dienste» */
 where='finanzen';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||400)};
 await T(()=>{const W=window.__T,g=W.g();document.querySelectorAll('.dtsheet').forEach(s=>s.remove());g.dhOff=0;delete g.fzm;g.fin=g.fin||{};g.fin.accounts=(g.fin.accounts||[]).concat([{id:'fzacc1',name:'Girokonto',bank:'Sparkasse ТЕСТ',type:'bank',cur:'EUR',start:0,iban:'DE89370400440532013000',bic:'COBADEFFXXX',last4:'1234',url:'https://www.sparkasse.de',block:'116 116'},{id:'fzacc2',name:'Bargeld',type:'cash',cur:'EUR',start:0}]);W.save();W.fz.banks();W.R('home')});await p.waitForTimeout(500);
 check('home: «Finanzen» in place of «Banken»',await T(()=>!!document.querySelector('.dhgrid .dht[data-to=fzm]')&&!document.querySelector('.dhgrid .dht[data-act=dhbank]')));
 const bk=await T(()=>{const it=window.__T.bsv.D().items.find(x=>x.n==='Sparkasse ТЕСТ');return it&&{n:it.nums.map(z=>z.t+'='+z.v).join('|'),l:it.links.map(z=>z.u).join('|'),cash:window.__T.bsv.D().items.some(x=>/Bargeld/.test(x.n))}});
 check('a bank becomes a card in «Behörden & Dienste» (IBAN, BIC, card, online banking, block number)',!!bk&&/IBAN=DE89 3704 0044 0532 0130 00/.test(bk.n)&&/BIC=COBADEFFXXX/.test(bk.n)&&/•• 1234/.test(bk.n)&&/sparkasse\.de/.test(bk.l)&&/tel:116116/.test(bk.l)&&!bk.cash,JSON.stringify(bk));
 await T(()=>window.__T.fz.banks());check('…only once',await T(()=>window.__T.bsv.D().items.filter(x=>x.n==='Sparkasse ТЕСТ').length===1));
 check('the bank data itself stays',await T(()=>window.__T.g().fin.accounts.some(a=>a.id==='fzacc1'&&a.iban)));
 await clk('.dhgrid .dht[data-to=fzm]',500);check('the tile opens the Steuer-Mappe',await rt()==='fzm'&&await T(()=>/Steuer-Mappe|Налоговая папка/.test(document.querySelector('.screen').innerText)));
 check('amounts and categories are read',await T(()=>{const F=window.__T.fz;return F.cents('1.234,56')===123456&&F.cents('12,5')===1250&&F.cents('abc')===null&&F.guess('Brille Fielmann')==='ges'&&F.guess('Maler Rechnung')==='hand'&&F.guess('Kita Beitrag')==='kind'&&F.guess('Spende UNICEF')==='spend'}));
 await clk('[data-act=fzadd]',400);await T(()=>{const t=document.querySelector('[data-fzf=t]');t.value='Zahnarzt Rechnung';t.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-fzf=amt]').value='abc';document.querySelector('[data-fzsave]').click()});await p.waitForTimeout(200);
 check('a receipt needs an amount',await T(()=>!!document.querySelector('[data-fzerr]').textContent));
 check('the category is suggested from the text',await T(()=>document.querySelector('[data-fzc=ges]').classList.contains('on')));
 await T(()=>{document.querySelector('[data-fzf=amt]').value='120,50';document.querySelector('[data-fzf=d]').value=new Date().getFullYear()+'-05-12';document.querySelector('[data-fzsave]').click()});await p.waitForTimeout(500);
 const y0=String(new Date().getFullYear());check('the receipt is in this year\'s folder with its sum',await T(y=>{const L=window.__T.fz.D().y[y]||[];return L.length===1&&L[0].amt===12050&&L[0].cat==='ges'},y0)&&await T(()=>/120,50/.test(document.querySelector('.fzsum').innerText)));
 await clk('[data-act=fzcat][data-k=ges]',400);check('a category shows its receipts and «Gut zu wissen»',await T(()=>/Zahnarzt Rechnung/.test(document.querySelector('.screen').innerText)&&!!document.querySelector('.fztip')));
 await clk('[data-act=fzed]',400);await T(()=>{document.querySelector('[data-fzf=d]').value=(new Date().getFullYear()-1)+'-12-30';document.querySelector('[data-fzsave]').click()});await p.waitForTimeout(500);
 check('changing the date moves it to that year',await T(y=>{const D=window.__T.fz.D().y;return!(D[y]||[]).length&&(D[String(+y-1)]||[]).length===1},y0));
 await T(()=>{navigator.canShare=()=>true;navigator.share=async o=>{window.__fzsh=o.files[0].name+'|'+o.files[0].type+'|'+o.files[0].size}});await T(()=>window.__T.fz.pdf());await p.waitForTimeout(1200);
 check('the year\'s PDF goes to the phone\'s share menu',await T(y=>new RegExp('Steuererklärung '+(+y-1)+'\\.pdf\\|application/pdf\\|\\d{4,}').test(window.__fzsh||''),y0),await T(()=>window.__fzsh));
 await T(()=>{const W=window.__T;W.g().fin.accounts=W.g().fin.accounts.filter(a=>!/^fzacc/.test(a.id));W.bsv.D().items=W.bsv.D().items.filter(x=>x.n!=='Sparkasse ТЕСТ');W.save();W.R('home')});await p.waitForTimeout(300)}
 /* Butler Docs: «Anordnung und Farbe» for Docs (docs/layout-docs.js) */
 where='layout docs';{const rt=()=>T(()=>window.__T.m().route);await T(()=>{const W=window.__T,g=W.g();g.dhOff=0;g.nav6=['home','search','stats','notes'];delete g.dhOrd;delete g.dhHid;delete g.dhBlk;W.save();W.R('ly6')});await p.waitForTimeout(600);
 check('the bar keeps only Docs places (Прогресс → Notizen, old ones replaced)',await T(()=>JSON.stringify(window.__T.g().nav6))==='["home","search","notiz","profile"]',await T(()=>JSON.stringify(window.__T.g().nav6)));
 check('no old quick access, no Butler sections, no «one screen»',await T(()=>{const t=document.querySelector('.screen.ly6').innerText;return!/Schnellzugriff|Быстрый доступ|Meine Bereiche|Мои разделы/.test(t)&&![...document.querySelectorAll('.ly7tg')].some(x=>x.offsetParent)}));
 check('the pool offers only Docs places',await T(()=>[...document.querySelectorAll('.ly6pool [data-k]')].map(b=>b.dataset.k).join(','))==='home,search,notiz,tasks,mycal,archive,letters,bsv,fzm,dsafe,sc9,kar,profile');
 await T(()=>{const L=window.__T.L;L.ly6sel({i:3});L.ly6put({k:'bsv'})});await p.waitForTimeout(300);await T(()=>window.__T.R('home'));await p.waitForTimeout(400);
 check('«Behörden» can be put into the bottom bar and opens',await T(()=>!!document.querySelector('nav.nav [data-k=bsv]'))&&await T(()=>{document.querySelector('nav.nav [data-k=bsv]').click();return 1})&&(await p.waitForTimeout(300),await rt())==='bsv');
 await T(()=>{const L=window.__T.L;L.lydhide({k:'life'});L.lydmv({k:'fin',d:'-1'});window.__T.g().dhBlk={quick:1};window.__T.R('home')});await p.waitForTimeout(400);
 check('home follows: tile hidden, order changed, block off',await T(()=>{const k=[...document.querySelectorAll('.dhgrid .dht')].map(b=>b.innerText.split('\n')[0]);return!document.querySelector('.dhgrid .dht[data-to=life]')&&k.indexOf(window.__T.g().lang==='ru'?'Финансы':'Finanzen')<k.findIndex(t=>/Ведомства|Behörden/.test(t))&&!document.querySelector('.dhq')}));
 await T(()=>window.__T.L.lydreset());await p.waitForTimeout(300);check('reset brings everything back',await T(()=>{const g=window.__T.g();return JSON.stringify(g.nav6)==='["home","search","notiz","profile"]'&&!g.dhOrd&&!g.dhHid&&!g.dhBlk}));await T(()=>window.__T.R('home'))}
 /* Finanzen stage 2 (docs/finanzen2.js): Verträge & Kosten, Arbeit & Karriere */
 where='finanzen 2';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||400)};
 await T(()=>{const W=window.__T,K=W.Ke().items,y=new Date().getFullYear(),s=new Date();s.setDate(s.getDate()+40);const md=String(s.getMonth()+1).padStart(2,'0')+'-'+String(s.getDate()).padStart(2,'0');
  K.push({id:'krc1',type:'ins',co:'KfzТЕСТ',title:'Kfz',cat:'ins_car',start:(y-3)+'-'+md,per:'y',prices:[{from:(y-3)+'-01-01',amt:69600,per:'y'}],noticeM:1,files:[],pages:[],ts:1});
  K.push({id:'krc2',type:'ins',co:'HaftA',cat:'ins_liab',start:'2021-03-01',per:'y',prices:[{from:'2021-03-01',amt:8900,per:'y'}],files:[],pages:[],ts:1});
  K.push({id:'krc3',type:'ins',co:'HaftB',cat:'ins_liab',start:'2023-05-01',per:'m',prices:[{from:'2023-05-01',amt:650,per:'m'}],files:[],pages:[],ts:1});
  K.push({id:'krc4',type:'ins',co:'StromТЕСТ',cat:'energy',start:'2024-01-01',per:'m',prices:[],files:[],pages:[],ts:1});
  K.push({id:'krd1',title:'Arbeitszeugnis ТЕСТ AG',party:'ТЕСТ AG',files:[],pages:[],ts:2});W.fz.D().tab='kost';delete W.g().kar;W.save();W.R('fzm')});await p.waitForTimeout(600);
 const kt=await T(()=>document.querySelector('.screen').innerText);
 check('«Verträge & Kosten»: per month and per year from the contracts',/Verträge & Kosten|Договоры и расходы/.test(kt)&&/\d+,\d\d\s*€/.test(kt),kt.slice(0,500));
 check('…notice soon, double contracts, missing amounts',/KfzТЕСТ/.test(await T(()=>[...document.querySelectorAll('.fzw')].map(x=>x.innerText).join('|')))&&/2/.test(await T(()=>[...document.querySelectorAll('.fzw')][1]?.innerText||''))&&/StromТЕСТ/.test(await T(()=>[...document.querySelectorAll('.fzw')].map(x=>x.innerText).join('|'))));
 await clk('.fzc[data-act=insopen][data-id=krc1]',500);check('a contract opens its own card',await rt()==='insedit'||await rt()==='ins'||await T(()=>window.__T.m().insid==='krc1'),await rt());
 await T(()=>{window.__T.fz.D().tab='stm';window.__T.R('fzm')});await p.waitForTimeout(400);check('the Steuer-Mappe tab is still there',await T(()=>!!document.querySelector('.fzsum')&&!!document.querySelector('[data-act=fzcat]')));
 /* Arbeit & Karriere */
 await T(()=>window.__T.R('home'));await p.waitForTimeout(400);await clk('.dhgrid .dht[data-to=kar]',500);check('the 9th tile opens «Arbeit & Karriere»',await rt()==='kar');
 await clk('[data-act=krjobed]',400);await T(()=>{document.querySelector('[data-ksave]').click()});await p.waitForTimeout(200);check('an employer needs a name',await T(()=>!!document.querySelector('[data-kerr]').textContent));
 await T(()=>{const f=(k,v)=>{document.querySelector(`[data-kf=${k}]`).value=v};f('co','ТЕСТ AG');f('role','Techniker');f('from','2015-08');f('to','2021-02');document.querySelector('[data-ksave]').click()});await p.waitForTimeout(500);
 check('saving opens the employer',await rt()==='karj'&&await T(()=>/08\/2015 – 02\/2021/.test(document.querySelector('.screen').innerText)));
 await clk('[data-act=krslot][data-k=zeugnis]',400);check('a place «Arbeitszeugnis» offers scan, file and fitting documents (v30)',await T(()=>!!document.querySelector('.kradd [data-ko=cam]')&&!!document.querySelector('.kradd [data-ko=file]')&&/passt|подходит|fits/.test(document.querySelector('.kradd [data-kh=krd1]')?.innerText||'')));
 await T(()=>document.querySelector('[data-kh=krd1]').click());await p.waitForTimeout(400);check('…one tap links it to the place, no copy',await T(()=>{const j=window.__T.g().kar.jobs[0];return j.dk&&j.dk.krd1==='zeugnis'&&window.__T.Ke().items.filter(d=>d.id==='krd1').length===1&&/✓/.test(document.querySelector('[data-act=krslot][data-k=zeugnis]').innerText)}));
 await clk('[data-act=krproj]',400);await T(()=>{const f=(k,v)=>{document.querySelector(`[data-pf=${k}]`).value=v};f('t','Halle 4');f('y','2019');f('what','Umbau');f('res','12 % unter Budget');document.querySelector('[data-psave]').click()});await p.waitForTimeout(400);
 check('a project with its result',await T(()=>/Halle 4 \(2019\)/.test(document.querySelector('.screen').innerText)&&/12 % unter Budget/.test(document.querySelector('.screen').innerText)));
 await T(()=>document.querySelector('.screen > .sub-hdr > button:first-child').click());await p.waitForTimeout(400);check('back goes to the list of employers',await rt()==='kar');
 await T(()=>{navigator.canShare=()=>true;navigator.share=async o=>{window.__krsh=o.files[0].name+'|'+o.files[0].size}});await clk('[data-act=krmappe]',500);check('Bewerbungsmappe lets one choose (CV ticked)',await T(()=>!!document.querySelector('[data-km=cv]:checked')));await clk('[data-mgo]',1500);check('…and makes one PDF',await T(()=>/\.pdf\|\d{4,}/.test(window.__krsh||'')),await T(()=>window.__krsh));
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>!/^kr/.test(d.id));delete W.g().kar;W.save();W.R('home')});await p.waitForTimeout(300)}
 /* v23 no doubles: Behörden, Karriere, documents */
 where='no doubles';{const rt=()=>T(()=>window.__T.m().route);
 const r1=await T(()=>{const o=window.__T.bsv.D();o.items.push({id:'ndf1',n:'Finanzamt ТЕСТ-Mitte',e:'🏛️',grp:'',who:[],tel:'030 1111 222',mail:'post@fa-test.de',addr:'',hrs:'',term:'',links:[],nums:[],ts:1});window.__T.save();
  const S=window.__ndSame;return [S({n:'FA',mail:'POST@fa-test.de ',links:[]})?.w,S({n:'Hotline',tel:'+49 30 1111222',links:[]})?.w,S({n:'Finanzamt ТЕСТ-Mitte',links:[]})?.w,S({n:'Finanzamt Neukölln',links:[]})]});
 check('same e-mail / phone / name find the card that is already there',r1[0]==='wM'&&r1[1]==='wT'&&r1[2]==='wN',JSON.stringify(r1));
 check('…a different Finanzamt is not taken for the same one',r1[3]==null,JSON.stringify(r1));
 const r2=await T(()=>{const it=window.__T.bsv.D().items.find(x=>x.id==='ndf1');window.__ndMerge(it,{tel:'030 999',mail:'',links:[{t:'Portal',u:'https://fa-test.de'}],nums:[{t:'StNr',v:'12/345'}]});return [it.tel,it.links.length,it.nums.length,(it.links||[]).some(l=>/tel:030999/.test(l.u))]});
 check('«add to the card» keeps both numbers and adds links and numbers',r2[0]==='030 1111 222'&&r2[1]===2&&r2[2]===1&&r2[3],JSON.stringify(r2));
 await T(()=>{const W=window.__T;W.bsv.D().items=W.bsv.D().items.filter(x=>x.id!=='ndf1');W.g().kar={jobs:[{id:'ndj',co:'ТЕСТ GmbH',from:'2015-01',to:'2016-01',docs:[],proj:[]}]};W.save();W.R('kar')});await p.waitForTimeout(300);
 await T(()=>document.querySelector('[data-act=krjobed]').click());await p.waitForTimeout(300);
 await T(()=>{document.querySelector('[data-kf=co]').value='ТЕСТ';document.querySelector('[data-ksave]').click()});await p.waitForTimeout(300);
 check('the same employer again asks first',await T(()=>!!document.querySelector('.krdup')&&window.__T.g().kar.jobs.length===1));
 await T(()=>document.querySelector('[data-kdn]').click());await p.waitForTimeout(400);check('…«I worked there again» makes a second entry',await T(()=>window.__T.g().kar.jobs.length===2)&&await rt()==='karj');
 await T(()=>{const W=window.__T;delete W.g().kar;const K=W.Ke().items;K.push({id:'ndd1',title:'Mietvertrag ТЕСТ',files:[],pages:[],ts:Date.now()-5e3});W.save();K.push({id:'ndd2',title:'Mietvertrag – ТЕСТ (Kopie)',files:[],pages:[],ts:Date.now()});W.save()});await p.waitForTimeout(300);
 check('a second copy of a document is pointed out',await T(()=>!!document.querySelector('.ndbar [data-id=ndd1]')));
 await T(()=>document.querySelector('.ndbar [data-ndk]').click());await p.waitForTimeout(200);check('…«keep both» closes it and remembers',await T(()=>!document.querySelector('.ndbar')&&window.__T.Ke().items.find(d=>d.id==='ndd2').ndOk===1));
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>!/^ndd/.test(d.id));W.save();W.R('home')});await p.waitForTimeout(300)}
 /* v24: the page follows the real screen height (bottom bar never below the edge); quick-action words are not cut */
 where='steady bottom';{const vp=p.viewportSize();await T(()=>window.__T.R('home'));await p.waitForTimeout(300);
 await p.setViewportSize({width:vp.width,height:vp.height-70});await p.waitForTimeout(800);
 check('a shorter screen makes the page shorter too (bottom bar stays on screen)',await T(()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ssvh'))===innerHeight));
 await p.setViewportSize(vp);await p.waitForTimeout(800);check('…and back to full height',await T(()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ssvh'))===innerHeight));
 check('quick-action labels fit without cutting a word',await T(()=>[...document.querySelectorAll('.dhqr span')].every(x=>x.scrollWidth<=x.clientWidth+1)))}
 /* v27: backup reminder on home */
 where='backup reminder';{await T(()=>{const W=window.__T,G=W.g();G.bkLast=Date.now()-40*864e5;delete G.bkrHide;W.Ke().items.push({id:'bkd1',title:'ТЕСТ Ausweis',files:[],pages:[],ts:Date.now()-9*864e5});W.save();W.R('home')});await p.waitForTimeout(500);
 check('an old backup (40 days) is reminded on home',await T(()=>/40/.test(document.querySelector('.bkrcard')?.innerText||'')&&!!document.querySelector('.bkrcard [data-act=bkrgo]')));
 await T(()=>document.querySelector('.bkrcard [data-act=bkrlater]').click());await p.waitForTimeout(400);check('«Später» hides it for a week',await T(()=>!document.querySelector('.bkrcard')&&!!window.__T.g().bkrHide));
 await T(()=>{const W=window.__T,G=W.g();delete G.bkrHide;G.bkLast=Date.now()-3*864e5;W.save();W.R('home')});await p.waitForTimeout(400);check('a fresh backup shows no reminder',await T(()=>!document.querySelector('.bkrcard')));
 await T(()=>{const W=window.__T,G=W.g();delete G.bkLast;W.save();W.R('home')});await p.waitForTimeout(400);check('no backup at all, documents older than 2 days → reminder',await T(()=>!!document.querySelector('.bkrcard')));
 await T(()=>{const W=window.__T,G=W.g();G.bkLast=Date.now();W.Ke().items=W.Ke().items.filter(d=>d.id!=='bkd1');W.save();W.R('home')});await p.waitForTimeout(300)}
 /* v28: reliability — check a backup, readable update bar, one error report */
 where='reliability';{await T(()=>{window.__T.R('profile')});await p.waitForTimeout(600);
 check('«Sicherung prüfen» sits next to «Sicherung erstellen»',await T(()=>!!document.querySelector('.st53 [data-act=rlcheck]')));
 const ra=await T(()=>{const G=JSON.parse(JSON.stringify(window.__T.g()));G.v=1;G.arc={items:[{id:'r1',title:'Pass',pages:[{id:'p1'},{id:'p2'}],files:[]},{id:'r2',type:'ins',co:'X'}]};G._ph={p1:'data:image/jpeg;base64,'+'A'.repeat(200)};G.bsv={items:[{},{}]};G.events=[{},{},{}];G.vault={enc:'xyz'};
  const r=window.__rlA(G),ok=window.__rlA(Object.assign({},G,{_ph:{p1:G._ph.p1,p2:G._ph.p1}})),bad=window.__rlA({x:1});return [r.docs,r.ctr,r.ph,r.miss,r.bsv,r.ev,r.vault,ok.miss,bad.bad]});
 check('a backup is counted: documents, contracts, photos, Behörden, Termine, Tresor',ra[0]===1&&ra[1]===1&&ra[2]===1&&ra[4]===2&&ra[5]===3&&ra[6]==='enc',JSON.stringify(ra));
 check('…a missing photo is found, a complete one is fine, a foreign file is refused',ra[3]===1&&ra[7]===0&&ra[8]===1,JSON.stringify(ra));
 await T(()=>{const G=JSON.parse(JSON.stringify(window.__T.g()));G.v=1;G._ph={};window.__rlOpen(JSON.stringify(G),'silentium-test.json')});await p.waitForTimeout(400);
 check('the result says «nur geprüft» and changes nothing',await T(()=>!!document.querySelector('.dtsheet .rlres')&&/geprüft|проверено|checked/i.test(document.querySelector('.dtsheet').innerText)));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
 await T(()=>window.__rlOpen('not json','x.json'));await p.waitForTimeout(300);check('a broken file is said plainly',await T(()=>!!document.querySelector('.dtsheet .rlres.bad')));await T(()=>document.querySelector('.dtsheet [data-kgo=st53bk]').click());await p.waitForTimeout(400);check('…its «Neue Sicherung speichern» really starts a backup (v31: taps inside sheets)',await T(()=>!!document.querySelector('.dtsheet input[type=password]')));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
 check('only one «report» button in the profile',await T(()=>!document.querySelector('.screen .td9rep')&&!!document.querySelector('[data-act=st1rep]')));
 await T(()=>document.querySelector('[data-act=st1rep]').click());await p.waitForTimeout(400);
 check('the error report shows version, screen and backup — and opens the own mail, share or copy',await T(()=>{const s=document.querySelector('.dtsheet');return!!s&&/Butler Docs · \S+ \d+/.test(s.querySelector('.rlpre').innerText)&&!!s.querySelector('[data-rr=mail]')&&!!s.querySelector('[data-rr=share]')}));
 await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
 const ub=await T(()=>{const d=document.createElement('div');d.className='upbar';d.innerHTML='<span><b>Neu</b><small>x</small></span>';document.body.appendChild(d);const c=getComputedStyle(d.querySelector('b')).color,r=d.getBoundingClientRect();d.remove();return [c,Math.round(r.bottom),innerHeight]});
 check('the update bar text is readable (light on dark) and sits above the bottom bar',/255, 255, 255/.test(ub[0])&&ub[1]<ub[2]-80,JSON.stringify(ub));
 await T(()=>window.__T.R('home'));await p.waitForTimeout(300)}
 /* v29: move to a new phone */
 where='move phone';{await T(()=>window.__T.R('profile'));await p.waitForTimeout(500);
 check('profile has «Auf neues Telefon umziehen» with save + share link',await T(()=>{const c=document.querySelector('.mvcard');return!!c&&!!c.querySelector('[data-act=st53bk]')&&!!c.querySelector('[data-act=mvlink]')&&c.querySelectorAll('.mvst').length===3}));
 await T(()=>{const d=document.createElement('div');d.className='tbset';d.id='mvtest';d.innerHTML='<div class="tbcard"><button class="tbgo">Beginnen</button></div>';document.body.appendChild(d)});await p.waitForTimeout(300);
 check('the first screen of a new phone offers «Vom alten Telefon übernehmen»',await T(()=>!!document.querySelector('#mvtest .mvbtn')));await T(()=>document.getElementById('mvtest').remove());
 await T(()=>{sessionStorage.setItem('bdocs-mvjust',String(Date.now()));window.__T.R('home')});await p.waitForTimeout(900);
 check('after a move «Willkommen zurück» shows what came over',await T(()=>{const w=document.querySelector('.mvwel');return!!w&&/\d/.test(w.innerText)&&!!w.querySelector('[data-mv]')}));
 check('…and it is shown only once',await T(()=>!sessionStorage.getItem('bdocs-mvjust')));
 const k=await T(()=>document.querySelector('.mvwel [data-mv]').dataset.mv);
 if(k==='pw'){await T(()=>document.querySelector('.mvwel [data-mv]').click());await p.waitForTimeout(800);check('«Passwort festlegen» opens the password setting right away',await T(()=>!!document.getElementById('f-pw')));await T(()=>{const W=window.__T;W.m().sheet=null;W.v()})}
 else{await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));check('with a lock the move offers Face ID',k==='face')}
 await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());window.__T.R('home')});await p.waitForTimeout(300)}
 /* v30: Karriere — dates, education, recognition reminder */
 where='karriere 2';{await T(()=>{const W=window.__T;W.g().kar={jobs:[],edu:[]};W.save();W.R('kar')});await p.waitForTimeout(400);
 await T(()=>document.querySelector('[data-act=krjobed]').click());await p.waitForTimeout(300);
 await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-kf=co]').value='ТЕСТ GmbH';s.querySelector('[data-kf=from]').value='13.2020';s.querySelector('[data-ksave]').click()});await p.waitForTimeout(300);
 check('a wrong month is refused with a hint (MM.JJJJ)',await T(()=>/MM|ММ/.test(document.querySelector('[data-kerr]').textContent)&&window.__T.g().kar.jobs.length===0));
 await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-kf=from]').value='2.2020';s.querySelector('[data-kf=to]').value='';s.querySelector('[data-ksave]').click()});await p.waitForTimeout(400);
 check('«2.2020» is stored as February 2020',await T(()=>(window.__T.g().kar.jobs[0]||{}).from==='2020-02'));
 await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());const W=window.__T;W.g().kar.tab='edu';W.save();W.R('kar')});await p.waitForTimeout(400);
 await T(()=>document.querySelector('[data-act=kredu]').click());await p.waitForTimeout(300);
 await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-ef=t]').value='Attestat ТЕСТ';s.querySelector('[data-ef=land]').value='Russland';const a=s.querySelector('[data-ef=an]');a.value='req';a.onchange();s.querySelector('[data-ef=anDue]').value='2031-01-15';s.querySelector('[data-esave]').click()});await p.waitForTimeout(500);
 check('a qualification with «Anerkennung beantragt» is listed with its date',await T(()=>/Attestat ТЕСТ/.test(document.querySelector('.screen').innerText)&&!!document.querySelector('.kred .krpill.wait')));
 check('…and a reminder task is made once',await T(()=>(window.__T.g().tasks||[]).filter(t=>/Attestat ТЕСТ/.test(t.t)&&t.due==='2031-01-15').length===1));
 check('…the sheet stays open to add its pages',await T(()=>!!document.querySelector('.dtsheet [data-eadd]')));
 await T(()=>{const s=document.querySelector('.dtsheet');const a=s.querySelector('[data-ef=an]');a.value='ok';a.onchange();s.querySelector('[data-esave]').click()});await p.waitForTimeout(400);
 check('«anerkannt» removes the open reminder',await T(()=>!(window.__T.g().tasks||[]).some(t=>/Attestat ТЕСТ/.test(t.t)&&!t.done)));
 await T(()=>{document.querySelectorAll('.dtsheet').forEach(s=>s.remove());const W=window.__T;delete W.g().kar;W.save();W.R('home')});await p.waitForTimeout(300)}
 /* v31: Zeugnissprache, contract deadlines, self-check, tidy profile */
 where='karriere 3';{const rt=()=>T(()=>window.__T.m().route);
 const z=await T(()=>{const a=window.__krZs('Er erledigte seine Aufgaben stets zu unserer vollsten Zufriedenheit. Sein Verhalten war stets vorbildlich. Wir bedauern sein Ausscheiden und wünschen ihm alles Gute.'),b=window.__krZs('Sie erledigte die Aufgaben zu unserer Zufriedenheit.');return [a.hit.map(h=>h[1]).join(','),a.end,b.hit.map(h=>h[1]).join(','),b.end]});
 check('Zeugnis phrases are read with the right grade (longest phrase first)',z[0]==='1,1'&&z[1]===true&&z[2]==='4'&&z[3]===false,JSON.stringify(z));
 const f=new Date();f.setMonth(f.getMonth()+2);const end=f.toISOString().slice(0,10);
 const tk=await T(end=>{const W=window.__T;W.g().kar={jobs:[{id:'kj3',co:'ТЕСТ3 GmbH',from:'2025-01',to:end.slice(0,7),docs:['kd3'],dk:{kd3:'zeugnis'},proj:[]}]};W.Ke().items.push({id:'kd3',title:'Zeugnis ТЕСТ3',files:[],pages:[],ts:1});
  const j=W.g().kar.jobs[0];j.end=end;W.g().tasks=W.g().tasks||[];window.__krTasks(j);window.__krTasks(j);W.save();const T2=W.g().tasks.filter(t=>/ТЕСТ3/.test(t.t));return [T2.length,T2[0]&&T2[0].due]},end);
 check('a fixed-term end less than 3 months away gives ONE task «arbeitsuchend melden» due today',tk[0]===1&&tk[1]===new Date().toISOString().slice(0,10),JSON.stringify(tk));
 await T(()=>{window.__T.R('karj');});await T(()=>{const W=window.__T;W.R('kar')});await p.waitForTimeout(300);await T(()=>document.querySelector('[data-act=kropen]').click());await p.waitForTimeout(400);
 check('the employer shows «Fristen aus dem Vertrag» with the warning',await T(()=>!!document.querySelector('.krfr .krfl.warn')));
 await T(()=>document.querySelector('[data-act=krslot][data-k=zeugnis]').click());await p.waitForTimeout(400);await T(()=>document.querySelector('[data-kgo=krzs]').click());await p.waitForTimeout(500);
 check('«Zeugnissprache verstehen» opens with the usual phrases',await T(()=>document.querySelectorAll('.dtsheet .krzs').length>=6));
 await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));await T(()=>document.querySelector('[data-act=krslot][data-k=zeugnis]').click());await p.waitForTimeout(400);
 await T(()=>document.querySelector('.dtsheet [data-kgo=dzopen]').click());await p.waitForTimeout(600);check('a paper in the place opens the document',await rt()!=='karj'&&!(await T(()=>!!document.querySelector('.dtsheet .krdr'))),await rt());
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>d.id!=='kd3');W.g().tasks=(W.g().tasks||[]).filter(t=>!/ТЕСТ3/.test(t.t));delete W.g().kar;W.save();W.R('home')});await p.waitForTimeout(300);
 const sc=await T(async()=>{const r=await window.__tdRun();return r&&Array.isArray(r.is)?r.is.map(x=>x[0]).join(','):'x'});check('the self-check runs and reports only real problems',sc!=='x'&&!/write|idb|miss/.test(sc),sc);
 await T(()=>window.__T.R('profile'));await p.waitForTimeout(500);
 check('the profile shows the self-check with «Jetzt prüfen»',await T(()=>!!document.querySelector('[data-act=tdrun]')&&!!document.querySelector('.tdline')));
 check('Butler leftovers are not shown in the profile (Baukasten, Spiegel, Tarife, Protokoll, Startbildschirm, Geschwindigkeit)',await T(()=>['[data-to=bd8]','[data-to=mirror]','[data-act=plopen]','[data-act=cmdlog]','[data-act=sheet][data-s=start]','[data-act=sp8]'].every(q=>{const e=document.querySelector('.screen '+q);return!e||!e.offsetParent})));
 await T(()=>window.__T.R('home'));await p.waitForTimeout(300)}
 /* v32: one place for contracts */
 where='one place contracts';{const rt=()=>T(()=>window.__T.m().route);await T(()=>window.__T.R('archive'));await p.waitForTimeout(500);
 check('«Dokumente» has no «Versicherungen» switch any more',await T(()=>!document.querySelector('.screen .dctabs')&&!!document.querySelector('.screen [data-act=fzkost]')));
 await T(()=>document.querySelector('.screen [data-act=fzkost]').click());await p.waitForTimeout(500);
 check('…its row opens «Finanzen → Verträge & Kosten»',await rt()==='fzm'&&await T(()=>window.__T.fz.D().tab==='kost'));
 await T(()=>{const W=window.__T;W.m().dcTab='ins';W.R('archive')});await p.waitForTimeout(600);check('an old way to the insurance list lands in Finanzen',await rt()==='fzm');
 await T(()=>{window.__T.fz.D().tab='stm';window.__T.R('home')});await p.waitForTimeout(300)}
 /* v33: Notizen instead of Aufgaben */
 where='notizen';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||350)};
 await T(()=>window.__T.R('home'));await p.waitForTimeout(400);
 check('the bottom bar has «Notizen» in place of «Aufgaben»',await T(()=>!!document.querySelector('.nav [data-k=notiz]')&&!document.querySelector('.nav [data-k=tasks]')));
 await clk('.nav [data-k=notiz]',500);check('«Notizen» opens with quick actions, lists and folders',await rt()==='notiz'&&await T(()=>document.querySelectorAll('.nzqqa button').length===4&&document.querySelectorAll('.nzqli').length===6&&document.querySelectorAll('.nzqgrid .nzqf').length>=3));
 await clk('.nzqqa [data-act=nzqnew]',500);check('«Neue Notiz» opens an empty note',await rt()==='nzed');
 await T(()=>{const t=document.querySelector('.nzqtt');t.value='ТЕСТ Projekt';t.dispatchEvent(new Event('input',{bubbles:true}))});
 await clk('[data-act=nzqckadd]',300);await T(()=>{const x=document.querySelector('.nzqct');x.value='Punkt A';x.dispatchEvent(new Event('input',{bubbles:true}))});
 await clk('[data-act=nzqckadd]',300);await T(()=>{const x=document.querySelectorAll('.nzqct')[1];x.value='Punkt B';x.dispatchEvent(new Event('input',{bubbles:true}))});
 await T(()=>{const b=document.querySelector('.nzqbody');b.value='• eins\n• zwei';b.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(900);
 const n1=await T(()=>{const n=window.__T.g().notes.find(n=>/^ТЕСТ Projekt/.test(n.text||''));return n&&[n.text,n.ck.map(c=>c.t).join('|')]});
 check('title is the first line, points and text are kept (core stays compatible)',!!n1&&n1[0]==='ТЕСТ Projekt\n• eins\n• zwei'&&n1[1]==='Punkt A|Punkt B',JSON.stringify(n1));
 await T(()=>document.querySelectorAll('[data-act=nzqdue]')[1].click());await p.waitForTimeout(300);await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-dd]').value='2031-03-03';s.querySelector('[data-ds]').click()});await p.waitForTimeout(400);
 const tk=await T(()=>(window.__T.g().tasks||[]).filter(t=>/Punkt B · ТЕСТ Projekt/.test(t.t)).map(t=>t.due+'|'+t.done));check('a point with a date becomes ONE task (calendar, iPhone export, badge)',tk.length===1&&tk[0]==='2031-03-03|false',JSON.stringify(tk));
 await T(()=>{const t=window.__T.g().tasks.find(t=>/Punkt B · ТЕСТ/.test(t.t));t.done=true;window.__T.save();window.__T.v()});await p.waitForTimeout(400);
 check('ticked in the calendar → ticked in the note',await T(()=>window.__T.g().notes.find(n=>/^ТЕСТ Projekt/.test(n.text)).ck[1].done===true));
 await clk('[data-act=nzqfpick]',300);await clk('.dtsheet [data-fp=projekte]',400);check('the note goes into a folder',await T(()=>window.__T.g().notes.find(n=>/^ТЕСТ Projekt/.test(n.text)).fld==='projekte'));
 await T(()=>{const W=window.__T;W.g().kar={jobs:[{id:'nzj',co:'ТЕСТ Firma',docs:[],proj:[]}]};W.save()});
 await clk('[data-act=nzqlk]',300);await clk('.dtsheet [data-lk=job][data-id=nzj]',400);check('a note can be linked to an employer',await T(()=>/ТЕСТ Firma/.test(document.querySelector('.nzqlk')?.innerText||'')));
 await T(()=>{window.__T.R('kar')});await p.waitForTimeout(300);await clk('[data-act=kropen]',500);check('…and the employer shows that note',await T(()=>[...document.querySelectorAll('.nzqn')].some(b=>/ТЕСТ Projekt/.test(b.innerText))));
 await clk('.nzqn',500);check('…a tap opens it',await rt()==='nzed');
 await T(()=>window.__T.R('notiz'));await p.waitForTimeout(300);await clk('[data-act=nzqlist][data-f=open]',400);
 check('«Offene Punkte» lists the open point and the old tasks',await T(()=>/Punkt A/.test(document.querySelector('.screen').innerText)));
 await T(()=>window.__T.R('notiz'));await p.waitForTimeout(300);await clk('[data-act=nzqlist][data-f=all]',400);
 await T(()=>{const f=document.querySelector('.nzqfind');f.value='zwei';f.dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(700);check('search finds notes by their text',await T(()=>document.querySelectorAll('.nzqn').length===1));
 await T(()=>{const W=window.__T;W.R('search')});await p.waitForTimeout(400);await T(()=>{const q=document.querySelector('.screen input[type=search],.screen input');if(q){q.value='zwei';q.dispatchEvent(new Event('input',{bubbles:true}))}});await p.waitForTimeout(900);
 const sr=await T(()=>!!document.querySelector('.screen [data-act=nzqopen]'));check('the app search finds the note and opens it in Notizen',sr);if(sr){await clk('.screen [data-act=nzqopen]',500)}else{await T(()=>window.__T.R('nzlist'));await p.waitForTimeout(300);await clk('.nzqn',500)}
 await clk('[data-act=nzqmenu]',300);await clk('.dtsheet [data-mm=trash]',600);
 check('«In den Papierkorb» with undo',await T(()=>!!document.querySelector('.nzqundo')&&!!window.__T.g().notes.find(n=>/^ТЕСТ Projekt/.test(n.text)).del));
 check('…its dated point leaves the calendar',await T(()=>!(window.__T.g().tasks||[]).some(t=>/ТЕСТ Projekt/.test(t.t))));
 await T(()=>document.querySelector('.nzqundo [data-u]').click());await p.waitForTimeout(300);check('…undo brings it back',await T(()=>!window.__T.g().notes.find(n=>/^ТЕСТ Projekt/.test(n.text)).del));
 await T(()=>window.__T.R('nzord'));await p.waitForTimeout(300);await clk('.nzqf.add',300);
 await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-fn]').value='ТЕСТ Ordner';s.querySelector('[data-em="🏠"]').click();s.querySelector('[data-fs]').click()});await p.waitForTimeout(400);
 check('a new folder with its own symbol',await T(()=>window.__T.g().nzqF.some(f=>f.n==='ТЕСТ Ordner'&&f.e==='🏠')&&/ТЕСТ Ordner/.test(document.querySelector('.screen').innerText)));
 await T(()=>window.__T.R('notiz'));await p.waitForTimeout(300);await clk('.nzqqa [data-act=nzqnew]',400);await T(()=>window.__T.R('notiz'));await p.waitForTimeout(400);
 check('an empty new note is not kept',await T(()=>!window.__T.g().notes.some(n=>n.u&&!String(n.text||'').trim()&&!(n.ck||[]).length)),await T(()=>JSON.stringify(window.__T.g().notes.filter(n=>!String(n.text||'').trim()).map(n=>[n.id,n.d,Object.keys(n)]))));
 await T(()=>{const W=window.__T,G=W.g();G.notes=G.notes.filter(n=>!/ТЕСТ/.test(n.text||''));G.tasks=(G.tasks||[]).filter(t=>!/ТЕСТ/.test(t.t||''));G.nzqF=G.nzqF.filter(f=>f.n!=='ТЕСТ Ordner');delete G.kar;W.save();W.R('home')});await p.waitForTimeout(300)}
 /* v35: Testament & Vorsorge; ▦ Weitere without the duplicates */
 where='vorsorge';{const rt=()=>T(()=>window.__T.m().route);const clk=async(sel,w)=>{await T(sel=>document.querySelector(sel).click(),sel);await p.waitForTimeout(w||350)};
 await T(()=>window.__T.R('dall'));await p.waitForTimeout(400);check('«Weitere» has no «Rechtliche Dokumente» and no «Kontakte» (both are in Nachlass)',await T(()=>!document.querySelector('.odall [data-v=law]')&&!document.querySelector('.odall [data-to=people]')));
 await T(()=>{const W=window.__T;W.Ke().items.push({id:'vs1',title:'Mein Testament ТЕСТ',dtype:'will',files:[],pages:[],ts:Date.now()});delete W.g().vors;W.save();W.R('dnach')});await p.waitForTimeout(400);
 check('Nachlass opens «Testament & Vorsorge» with what is there',await T(()=>{const b=document.querySelector('.screen [data-to=dvors]');return!!b&&/1 von 5|1 из 5|1 of 5/.test(b.innerText)}));
 await clk('.screen [data-to=dvors]',500);check('five places, a Testament already there is found by itself',await rt()==='dvors'&&await T(()=>document.querySelectorAll('[data-act=vsgslot]').length===5&&document.querySelector('[data-act=vsgslot][data-k=test]').classList.contains('ok')));
 await clk('[data-act=vsgslot][data-k=test]',400);await T(()=>{const s=document.querySelector('.dtsheet');s.querySelector('[data-vq]').click();s.querySelector('[data-vw]').value='Ehefrau ТЕСТ';s.querySelector('[data-vs]').click()});await p.waitForTimeout(400);
 check('«Wo liegt das Original?» and who is named are kept and shown',await T(()=>{const o=window.__T.g().vors.test;return!!o.orig&&o.who==='Ehefrau ТЕСТ'&&/📍/.test(document.querySelector('[data-k=test]').innerText)}));
 await clk('[data-act=vsgslot][data-k=pv]',400);check('an empty place offers scan, file or an existing document',await T(()=>!!document.querySelector('.kradd [data-ko=cam]')&&!!document.querySelector('.kradd [data-kh=vs1]')));
 await T(()=>document.querySelector('.kradd [data-kh=vs1]').click());await p.waitForTimeout(400);check('…linking it fills the place',await T(()=>window.__T.g().vors.pv.docs.includes('vs1')));
 await T(()=>document.querySelector('.dtsheet [data-vu=vs1]').click());await p.waitForTimeout(400);check('× takes a paper away from a place (it stays in Dokumente)',await T(()=>!window.__T.g().vors.pv.docs.includes('vs1')&&window.__T.g().vors.pv.no.includes('vs1')&&window.__T.Ke().items.some(d=>d.id==='vs1')));
 await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()));
 await T(()=>{navigator.canShare=()=>true;navigator.share=async o=>{window.__vssh=o.files[0].name+'|'+o.files[0].size}});await clk('[data-act=vsgpdf]',1500);check('«Übersicht für Angehörige» makes one PDF',await T(()=>/\.pdf\|\d{4,}/.test(window.__vssh||'')),await T(()=>window.__vssh));
 await T(()=>{const W=window.__T;W.Ke().items=W.Ke().items.filter(d=>d.id!=='vs1');delete W.g().vors;W.save();W.R('home')});await p.waitForTimeout(300)}
 where='end';check('no errors in the app',!errs.length,errs.slice(0,8).join(' || '));
 const he=await T(()=>window.__T.Hooks.errors);check('no errors inside hooks',!he.length,JSON.stringify(he).slice(0,300));
 await b.close();srv.close();fs.rmSync(TMP,{recursive:true,force:true});
 const w=Math.max(...results.map(r=>r[1].length));for(const [s,n,d] of results)if(s==='FAIL'||process.env.VERBOSE)console.log(s,n.padEnd(w),d);
 console.log(`\n${results.length-failed} passed, ${failed} failed`);process.exit(failed?1:0)})().catch(e=>{console.error('SMOKE CRASHED',e);srv.close();process.exit(2)});
