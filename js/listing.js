const pl=n=>n+(n==1?' product':' products');
const U=new URLSearchParams(location.search),V=U.get('view')||'',C=U.get('c')||'',SB=U.get('s')||'';
const cat=TAX.find(t=>t.slug==C),sub=cat&&cat.subs.find(x=>x.slug==SB),FK=FILTERKEYS[C]||FILTERKEYS.d;
const VT={new:'New Arrivals',best:'Best Sellers',offers:'Offers'};
const base=PRODUCTS.filter(p=>(!cat||p.cs==C)&&(!sub||p.ss==SB)&&(V!='new'||p.badge=='New')&&(V!='best'||p.best)&&(V!='offers'||p.price<p.was));
const MAXP=Math.ceil(Math.max(1000,...base.map(p=>p.price))/500)*500;
let F={};FK.forEach(k=>F[k]=(U.get(k)||'').split(',').filter(Boolean));
let S={q:(U.get('q')||'').toLowerCase(),max:+U.get('max')||MAXP,dc:+U.get('dc')||0,so:U.get('so')||'f'};
const title=sub?sub.name:cat?cat.name:VT[V]||(S.q?'Search results':'Shop All');
document.title=title+' | LV HOME PRODUCTS';
let m=$('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}
m.content=(cat||sub?`Browse ${title.toLowerCase()} at LV HOME PRODUCTS.`:'Furniture and home products from LV HOME PRODUCTS.');
const cl=document.createElement('link');cl.rel='canonical';cl.href=location.origin+location.pathname+(C?'?c='+C+(SB?'&s='+SB:''):V?'?view='+V:'');document.head.appendChild(cl);
$('#ttl').textContent=title;
$('#bc').innerHTML=['<a href="index.html">Home</a>',cat?`<a href="category.html?c=${C}">${cat.name}</a>`:`<a href="shop.html">Shop</a>`,sub||!cat?`<span aria-current="page">${title}</span>`:''].filter(Boolean).join(' / ');
$('#subs').innerHTML=!cat?visibleCats().map(c=>`<a class="cat" href="category.html?c=${c.slug}"><span>${c.name}</span><small>${pl(count(c.slug))}</small></a>`).join(''):(!sub?cat.subs.filter(s=>showS(cat,s)).map(s=>`<a class="cat" href="category.html?c=${C}&s=${s.slug}"><span>${s.name}</span><small>${pl(count(C,s.slug))}</small></a>`).join(''):'');
$('#intro').innerHTML=cat&&!sub?`Browse ${cat.name.toLowerCase()} from LV HOME PRODUCTS. Related: ${visibleCats().filter(c=>c.slug!=C).map(c=>`<a href="category.html?c=${c.slug}"><u>${c.name}</u></a>`).join(', ')}`:'';
function vals(k){const o={};base.forEach(p=>{const v=p.attr[k];if(v)o[v]=(o[v]||0)+1});return Object.entries(o).sort()}
$('#fc').innerHTML=FK.map(k=>({k,v:vals(k)})).filter(x=>x.v.length).map(x=>`<h3>${FLABEL[x.k]}</h3>`+x.v.map(([v,n])=>`<label><input type="checkbox" data-k="${x.k}" value="${v}" ${F[x.k].includes(v)?'checked':''}> ${v} (${n})</label>`).join('')).join('');
$('#pr').max=MAXP;$('#pr').value=S.max;$('#dc').value=S.dc;$('#so').value=S.so;
function r(){let l=base.filter(p=>p.price<=S.max&&Math.round((1-p.price/p.was)*100)>=S.dc&&matchQ(p,S.q)&&FK.every(k=>!F[k].length||F[k].includes(p.attr[k])));
l.sort({f:()=>0,pa:(a,b)=>a.price-b.price,pd:(a,b)=>b.price-a.price}[S.so]);$('#pv').textContent=inr(S.max);
const ch=[];FK.forEach(k=>F[k].forEach(v=>ch.push(`<button class="chip" data-k="${k}" data-v="${v}">${v} ✕</button>`)));if(S.dc)ch.push('<button class="chip" data-dc="1">Discount '+S.dc+'%+ ✕</button>');if(S.max<MAXP)ch.push('<button class="chip" data-mx="1">Up to '+inr(S.max)+' ✕</button>');$('#chips').innerHTML=ch.join('');
$('#cnt').textContent=l.length+' product'+(l.length==1?'':'s');
$('#grid').innerHTML=l.length?l.map(card).join(''):`<div class="empty"><h3>${base.length?'No products match these filters':'No products here yet'}</h3><p>${V=='best'?'Best sellers appear once real order data exists.':base.length?'Try removing a filter.':'We are still adding products to this section.'}</p>${base.length?'<button class="btn k sm" id="ce">Clear filters</button>':'<a class="btn k sm" href="shop.html">Shop all products</a>'}</div>`;
const q=new URLSearchParams();if(V)q.set('view',V);if(C)q.set('c',C);if(SB)q.set('s',SB);if(S.q)q.set('q',S.q);FK.forEach(k=>F[k].length&&q.set(k,F[k].join(',')));if(S.max<MAXP)q.set('max',S.max);if(S.dc)q.set('dc',S.dc);if(S.so!='f')q.set('so',S.so);
try{history.replaceState(null,'','?'+q)}catch(e){}}
function resetAll(){FK.forEach(k=>F[k]=[]);S.dc=0;S.max=MAXP;S.q='';$('#gq').value='';$('#pr').value=MAXP;$('#dc').value=0;$$('#fc input').forEach(i=>i.checked=false);r()}
$('#fc').onchange=e=>{const i=e.target,a=F[i.dataset.k];F[i.dataset.k]=i.checked?[...a,i.value]:a.filter(x=>x!=i.value);r()};
$('#pr').oninput=e=>{S.max=+e.target.value;r()};$('#dc').onchange=e=>{S.dc=+e.target.value;r()};$('#so').onchange=e=>{S.so=e.target.value;r()};
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;if(b.dataset.k){F[b.dataset.k]=F[b.dataset.k].filter(x=>x!=b.dataset.v);$$('#fc input').forEach(i=>{if(i.dataset.k==b.dataset.k&&i.value==b.dataset.v)i.checked=false})}if(b.dataset.dc){S.dc=0;$('#dc').value=0}if(b.dataset.mx){S.max=MAXP;$('#pr').value=MAXP}r()};
document.addEventListener('click',e=>{if(e.target.id=='ce')resetAll()});$('#rs').onclick=resetAll;$('#fo').onclick=()=>$('#fa').classList.toggle('open');
$('#sform').onsubmit=e=>{e.preventDefault();S.q=$('#gq').value.toLowerCase();r()};$('#gq').value=U.get('q')||'';$('#gq').oninput=e=>{S.q=e.target.value.toLowerCase();r()};r();
if(cat&&!sub)$('#subs').insertAdjacentHTML('beforebegin',`<div class="cbn big"><img src="assets/img/categories/${C}.jpg" alt="${cat.name} collection"><span>${cat.name}</span></div>`);