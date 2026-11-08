/* Progressive enhancement: all 57 cards and article bodies remain in HTML. */
(() => {
 const key='oni:archive:v2';
 const safePath=value=>{try{const u=new URL(value,location.origin);if(u.origin!==location.origin||u.pathname!=='/oni-animes/')return '/oni-animes/#leituras';const p=new URLSearchParams();const q=(u.searchParams.get('q')||'').slice(0,120),tema=u.searchParams.get('tema');if(q)p.set('q',q);if(tema&&/^[a-z-]+$/.test(tema))p.set('tema',tema);const n=Number(u.searchParams.get('limite'));if(Number.isFinite(n)&&n>=12)p.set('limite',Math.min(n,60));return '/oni-animes/'+(p.size?'?'+p:'')+'#leituras'}catch{return '/oni-animes/#leituras'}};
 const form=document.getElementById('oni-search');
 if(!form){try{const data=JSON.parse(sessionStorage.getItem(key)||'null');if(data?.version===2)document.querySelectorAll('.oni-back').forEach(a=>a.href=safePath(data.path))}catch{}return}
 const input=document.getElementById('oni-query'),cards=[...document.querySelectorAll('.oni-result')],filters=[...document.querySelectorAll('.oni-filters button')],more=document.getElementById('oni-more'),status=document.getElementById('oni-status'),empty=document.getElementById('oni-empty');
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const params=new URL(location.href).searchParams;
 let topic=filters.some(b=>b.dataset.topic===params.get('tema'))?params.get('tema'):'todos',limit=Math.min(60,Math.max(12,Number(params.get('limite'))||12));
 input.value=(params.get('q')||'').slice(0,120);
 const index=cards.map(card=>({card,text:normalize(card.dataset.search)}));
 function render(updateURL=true){
  const terms=normalize(input.value).trim().split(/\s+/).filter(Boolean),all=index.filter(({text})=>terms.every(t=>text.includes(t))),matched=all.filter(({card})=>topic==='todos'||card.dataset.topic===topic),visible=new Set(matched.slice(0,limit).map(r=>r.card));
  cards.forEach(card=>card.hidden=!visible.has(card));filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.topic===topic)));
  status.textContent=matched.length+(matched.length===1?' matéria encontrada.':' matérias encontradas.')+' Exibindo '+Math.min(limit,matched.length)+'.';more.hidden=matched.length<=limit;empty.hidden=!!matched.length;
  document.getElementById('oni-empty-message').textContent=all.length&&!matched.length?all.length+' resultado(s) em outros temas.':'Tente outra palavra ou explore todas as matérias.';
  document.getElementById('oni-all-topics').hidden=topic==='todos';
  if(updateURL){const p=new URLSearchParams();if(input.value.trim())p.set('q',input.value.trim());if(topic!=='todos')p.set('tema',topic);p.set('limite',limit);history.replaceState(null,'','/oni-animes/?'+p+'#leituras')}
 }
 form.addEventListener('submit',e=>{e.preventDefault();limit=12;render()});let timer;input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{limit=12;render()},250)});
 filters.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic;limit=12;render()}));
 document.getElementById('oni-all-topics').addEventListener('click',()=>{topic='todos';limit=12;render();input.focus()});
 document.getElementById('oni-clear').addEventListener('click',()=>{topic='todos';limit=12;input.value='';render();input.focus()});
 more.addEventListener('click',()=>{const before=limit;limit+=12;render();cards.filter(c=>!c.hidden)[before]?.querySelector('h3 a')?.focus({preventScroll:true})});
 document.getElementById('oni-results').addEventListener('click',e=>{const link=e.target.closest('a'),card=link?.closest('.oni-result');if(!card)return;clearTimeout(timer);render();try{const state={version:2,path:safePath(location.pathname+location.search),card:card.id,y:scrollY};sessionStorage.setItem(key,JSON.stringify(state))}catch{}});
 render(false);
 try{const state=JSON.parse(sessionStorage.getItem(key)||'null');if(state?.version===2&&safePath(state.path)===safePath(location.pathname+location.search)){requestAnimationFrame(()=>{document.getElementById(state.card)?.querySelector('h3 a')?.focus({preventScroll:true});window.scrollTo({top:Number(state.y)||0,behavior:'instant'})});sessionStorage.removeItem(key)}}catch{}
})();
