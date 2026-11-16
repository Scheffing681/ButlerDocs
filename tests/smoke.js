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
 s=s.slice(0,i)+'try{window.__T={vault:odV,Ke,nr,ni,fl,ao,bd8cfg,L,g:()=>g,m:()=>m,R:(...a)=>R(...a),v:()=>v(),save:()=>$(),x:()=>x_(),h9go:k=>h9go(k),hh:()=>hh(),vt,Ic,bd8C,BD8T,NT,Hooks,sc:{scDetect,scWarp,scClean,scSmooth,scHome}}}catch(e){}\n'+s.slice(i);fs.writeFileSync(f,s)}
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
 for(const n of [0,1,2,3,4,5,6,7,8]){await go('home');await T(n=>document.querySelectorAll('.dhgrid .dht')[n].click(),n);await p.waitForTimeout(500);const r=await T(()=>window.__T.m().route);check('home tile '+(n+1)+' opens its section',r!=='home',r)}
 await go('home');check('the living sign is on top of home',await T(()=>!!document.querySelector('.odlogo canvas.hl9cv')&&/DOCS/.test(document.querySelector('.odlogo').innerText)));
 for(const n of [0,1,2,3,4]){await go('dall');await T(n=>document.querySelectorAll('.odall .dhgrid')[1].querySelectorAll('.dht')[n].click(),n);await p.waitForTimeout(500);const r=await T(()=>window.__T.m().route+(document.querySelector('.sc9')?':sc9':''));check('▦ extra tile '+(n+1)+' opens',r!=='home'&&r!=='dall',r);await T(()=>document.querySelectorAll('.sc9').forEach(x=>x.remove()))}
 check('Прогресс becomes Сроки',(await go('stats'))==='dsrok');check('Сроки screen is drawn',await T(()=>!!document.querySelector('.screen.odsrok')));
 check('▦ shows only document sections',(await go('bd9all'))==='dall'&&await T(()=>document.querySelectorAll('.odall .dht').length===14));
 await T(()=>document.querySelector('.odall [data-to=sc9]')?.click());await p.waitForTimeout(600);check('Сканер opens from ▦',await T(()=>!!document.querySelector('.sc9')));await T(()=>{document.querySelector('.sc9 [data-a=x]')?.click();document.querySelectorAll('.sc9').forEach(x=>x.remove())});
 for(const r of ['archive','ins','mycal','tasks','fnacc','life','dnach','assets','people','letters','dossier','profile','search','concierge'])check('screen '+r+' stays open',(await go(r))===r);
 const ks=await T(()=>window.__T.x());check('no Butler-only sections in lists',!ks.some(k=>/^(c:(health|sport|wd|rest|travel|books|work|notes|bank|family)|q:(routine|report|fin|stats|goals|edu|body))$/.test(k)),ks.join(','));
 await go('home');check('the tab is called Butler Docs',await T(()=>document.title)==='Butler Docs');check('weather no longer opens the wardrobe',await T(()=>!document.querySelector('[data-to=wd]')));
 check('nav says Сроки',await T(()=>/Сроки/.test(document.querySelector('nav.nav [data-k=stats]')?.innerText||'')));
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
 await out();check('the entrance shows the sign, the clock, 4 icons and ⚙',await T(()=>!!document.querySelector('.login .en-sign')&&!!document.querySelector('.login .en-clock svg')&&document.querySelectorAll('.login .en-ic').length===4&&!!document.querySelector('.login .en-gear')));
 check('the working parts stay: Войти, password, language',await T(()=>!!document.querySelector('.login [data-act=face]')&&!!document.querySelector('.login [data-act=pw]')&&!!document.querySelector('.login .lg9lang')));
 await ptr('pointerdown');await p.waitForTimeout(300);await ptr('pointerup');await p.waitForTimeout(3300);check('a short tap on the clock opens nothing',await T(()=>!document.querySelector('.en-sheet')));
 await ptr('pointerdown');await p.waitForTimeout(1500);check('holding fills the golden ring',await T(()=>!!document.querySelector('.en-hold.on')));await p.waitForTimeout(1800);
 check('holding the clock 3 s opens the 10 designs',await T(()=>document.querySelectorAll('.en-sheet .en-th').length===10));await ptr('pointerup');
 await T(()=>document.querySelector('.en-sheet [data-en=night]').click());await p.waitForTimeout(700);check('a design is chosen and kept',await T(()=>window.__T.g().enTheme==='night'&&document.querySelector('.login').dataset.en==='night'&&!document.querySelector('.en-sheet')));
 await T(()=>document.querySelector('.login .en-gear').click());await p.waitForTimeout(400);check('⚙ opens the designs too',await T(()=>!!document.querySelector('.en-sheet')));await T(()=>document.querySelector('.en-sheet [data-en=ivory]').click());await p.waitForTimeout(600);
 for(const [a,r] of [['endocs','archive'],['ensafe','dsafe'],['enbk','profile']]){await out();await T(a=>document.querySelector('.login [data-act='+a+']').click(),a);await waitIn();const rr=await T(()=>window.__T.m().route);check('icon '+a+' signs in and opens '+r,rr===r,rr);if(a==='enbk'){check('… and starts the backup',await T(()=>!!document.querySelector('.dtsheet')));await T(()=>document.querySelectorAll('.dtsheet').forEach(s=>s.remove()))}}
 await out();await T(()=>{window.__qcHit=0;window.__qcOld=window.__T.L.br9qc;window.__T.L.br9qc=()=>{window.__qcHit=1}});await T(()=>document.querySelector('.login [data-act=endoc]').click());check('icon Документ is the quick put',await T(()=>window.__qcHit===1));await T(()=>{window.__T.L.br9qc=window.__qcOld});
 await T(()=>document.querySelector('.login [data-act=face]').click());await waitIn();check('back inside after the entrance checks',await T(()=>window.__T.m().logged))}
 where='end';check('no errors in the app',!errs.length,errs.slice(0,8).join(' || '));
 const he=await T(()=>window.__T.Hooks.errors);check('no errors inside hooks',!he.length,JSON.stringify(he).slice(0,300));
 await b.close();srv.close();fs.rmSync(TMP,{recursive:true,force:true});
 const w=Math.max(...results.map(r=>r[1].length));for(const [s,n,d] of results)if(s==='FAIL'||process.env.VERBOSE)console.log(s,n.padEnd(w),d);
 console.log(`\n${results.length-failed} passed, ${failed} failed`);process.exit(failed?1:0)})().catch(e=>{console.error('SMOKE CRASHED',e);srv.close();process.exit(2)});
