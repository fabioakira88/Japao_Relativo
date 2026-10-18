/* Verify cover identity across the registry, reader, static article and share metadata. */
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.join(__dirname,'../SITE');
const source=JSON.parse(fs.readFileSync(path.join(site,'data/editorial-posts.json')));
const registry=JSON.parse(fs.readFileSync(path.join(site,'data/editorial-covers.json')));
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(site,'assets/data/editorial-posts.js'),'utf8'),context);
const db=context.window.JR_POSTS;
const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};
check(Object.keys(source).length===Object.keys(registry.posts).length,'Cover inventory must cover every editorial record.');
let staticCount=0;
for(const [id,cover]of Object.entries(registry.posts)){
  check(source[id]&&db[id]&&db[id].id===id,'Stable identity missing: '+id);
  check(db[id]?.thumb===cover.src&&db[id]?.cover?.src===cover.src,'Reader cover drift: '+id);
  for(const asset of [cover.src,cover.preview].filter(Boolean)){
    check(/^assets\/covers\/[\p{L}\p{N}_.\/-]+$/u.test(asset),'Invalid cover path: '+id);
    if(!asset.startsWith('https://'))check(fs.existsSync(path.join(site,asset)),'Missing asset: '+asset);
  }
  check(!!cover.alt&&!!cover.review&&!!cover.provenance,'Missing cover audit fields: '+id);
  const file=path.join(site,id,'index.html');
  if(!/^(replaced-subject|rebound-contextual)$/.test(cover.review)||!fs.existsSync(file))continue;
  staticCount++;
  const html=fs.readFileSync(file,'utf8');
  const url='https://japaorelativo.com/'+cover.src;
  const og=html.match(/property=["']og:image["'][^>]*content=["']([^"']+)/)?.[1];
  const twitter=html.match(/name=["']twitter:image["'][^>]*content=["']([^"']+)/)?.[1];
  const first=[...html.matchAll(/<img\b[^>]*>/gi)].find(m=>/\bsrc=["'][^"']*assets\/covers\//.test(m[0]))?.[0];
  check(og===url&&twitter===url,'Share metadata differs from registry: '+id);
  check(first?.includes('src="../'+cover.src+'"'),'Static primary cover differs: '+id);
  if(cover.kind==='illustration')check(first?.includes('data-jr-cover="illustration"'),'Portrait marker missing: '+id);
}
// Subject regressions found by visual inspection, not only filename/HTTP validation.
for(const [id,subject]of Object.entries({
  'tsukimi-chushu-no-meigetsu-2026':'tsukimi-lua-outono',
  'kitsune-raposa-espiritual-japao':'kitsune-folclore',
  'oni-demonios-ogros-cultura-japonesa':'oni-folclore',
  'choyo-no-sekku-kiku-setembro':'choyo-crisantemos',
  'temo-kamawanai':'permissao-conversa'
}))check(registry.posts[id]?.src==='assets/covers/current/'+subject+'.jpg','Subject regression: '+id);
const arts=JSON.parse(fs.readFileSync(path.join(site,'data/cover-art-prompts.json')));
for(const art of arts.artworks)check(Object.values(registry.posts).some(c=>c.src===art.src),'Unbound production artwork: '+art.id);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log('Covers valid: '+Object.keys(registry.posts).length+' records, '+staticCount+' synchronized static articles, '+arts.artworks.length+' new illustrations.');
