const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.join(__dirname,'../SITE');
const db=JSON.parse(fs.readFileSync(path.join(site,'data/editorial-posts.json'),'utf8'));
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const failures=[];
let count=0;
for(const file of walk(site)) {
  if(file.endsWith('.js')){try{new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});}catch(e){failures.push(path.relative(site,file)+': '+e.message);}}
  if(!file.endsWith('.html'))continue;
  count++;
  const source=fs.readFileSync(file,'utf8');
  const html=source.replace(/<script\b[\s\S]*?<\/script>/gi,'').replace(/<style\b[\s\S]*?<\/style>/gi,'');
  if(/<img\b[^>]*src=["'][^"']*assets\/brand\/(?:jr-logo-master-3|jr-editorial-logo)\.png/i.test(html))failures.push(path.relative(site,file)+': presentation artwork used as the website signature');
  for(const header of html.matchAll(/<header\b[^>]*>[\s\S]*?<\/header>/gi)) {
    if(/class=["']brand-name["']/.test(header[0])&&/class=["']brand-master["']/.test(header[0]))failures.push(path.relative(site,file)+': publisher signature duplicated beside original logo');
    if(/class=["']brand-mark["']>JR\./.test(header[0]))failures.push(path.relative(site,file)+': typed JR signature instead of original asset');
  }
  for(const m of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const raw=m[1];
    if(/^(?:[a-z]+:|\/\/)/i.test(raw)||raw.startsWith('#'))continue;
    const [route,fragment]=raw.split('#');
    if(!route&&fragment)continue;
    const pathname=decodeURIComponent(route.split('?')[0]);
    let target=pathname.startsWith('/')?path.join(site,pathname.slice(1)):path.resolve(path.dirname(file),pathname);
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
    if(!fs.existsSync(target))failures.push(path.relative(site,file)+' -> '+raw);
    if(fragment&&target===path.join(site,'index.html')&&!db[decodeURIComponent(fragment)]&&!fs.readFileSync(target,'utf8').includes('id="'+fragment+'"'))failures.push('Unknown portal route: '+fragment);
  }
}
const bundle=fs.readFileSync(path.join(site,'assets/data/editorial-posts.js'),'utf8');
const context={window:{}};vm.runInNewContext(bundle,context);
if(Object.keys(db).length!==Object.keys(context.window.JR_POSTS||{}).length)failures.push('Editorial source/bundle count mismatch.');
const sitemap=fs.readFileSync(path.join(site,'sitemap.xml'),'utf8');
for(const file of walk(site).filter(f=>f.endsWith('.html'))) {
  const html=fs.readFileSync(file,'utf8');
  if(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html))continue;
  const rel=path.relative(site,file).replaceAll(path.sep,'/');
  const url='https://japaorelativo.com/'+(rel==='index.html'?'':rel.replace(/index\.html$/,''));
  if(!sitemap.includes('<loc>'+url+'</loc>'))failures.push('Sitemap missing: '+url);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log('Architecture valid: '+count+' HTML routes, '+Object.keys(db).length+' editorial records, JS syntax and sitemap coverage.');
