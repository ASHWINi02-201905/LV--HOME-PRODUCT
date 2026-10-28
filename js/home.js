$('#cats').innerHTML=visibleCats().map(c=>{const p=PRODUCTS.find(x=>x.cs==c.slug);return `<a class="cat" href="category.html?c=${c.slug}"><img src="assets/img/categories/${c.slug}.jpg" alt=""><span>${c.name}</span></a>`}).join('');
const photo=PRODUCTS.filter(p=>p.img.includes('/products/')),seen=new Set(),pick=[];photo.forEach(p=>{if(!seen.has(p.ss)){seen.add(p.ss);pick.push(p)}});photo.forEach(p=>{if(pick.length<8&&!pick.includes(p))pick.push(p)});
$('#deals').innerHTML=pick.slice(0,8).map(card).join('');
(function(){const L=PRODUCTS.filter(p=>p.badge=='New').slice(0,8);if(!L.length)return;
$('#nahost').insertAdjacentHTML('beforeend',`<section class="na" aria-label="New arrivals"><div class="nah"><h2><b>NEW</b>ARRIVALS</h2><div class="nac"><button class="nb" id="np" aria-label="Previous">‹</button><button class="nb" id="nn" aria-label="Next">›</button><a href="shop.html?view=new">View all →</a></div></div><div class="nat" id="nat">${L.map(p=>`<a class="nc" href="product.html?id=${p.id}"><em>NEW</em><img src="${p.img}" alt="${p.name}" loading="lazy"><span>${p.name}</span><small>${inr(p.price)}</small></a>`).join('')}</div></section>`);
const t=$('#nat'),step=()=>t.firstElementChild.offsetWidth+16,go=d=>{const m=t.scrollWidth-t.clientWidth;t.scrollTo({left:d>0&&t.scrollLeft>=m-4?0:d<0&&t.scrollLeft<=4?m:t.scrollLeft+d*step(),behavior:'smooth'})};
$('#np').onclick=()=>go(-1);$('#nn').onclick=()=>go(1);let tm;const on=()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;clearInterval(tm);tm=setInterval(()=>go(1),3800)};
$('.na').addEventListener('pointerenter',()=>clearInterval(tm));$('.na').addEventListener('pointerleave',on);$('.na').addEventListener('focusin',()=>clearInterval(tm));on()})();
/* Hero: TOONHUB-style carousel */
(function(){const per=[];visibleCats().forEach(c=>{const p=PRODUCTS.find(x=>x.cs==c.slug&&x.trend)||PRODUCTS.find(x=>x.cs==c.slug&&x.img.includes('/products/'))||PRODUCTS.find(x=>x.cs==c.slug);if(p)per.push(p)});
const S=per.slice();PRODUCTS.forEach(p=>{if(S.length<4&&!S.includes(p))S.push(p)});const IM=S.slice(0,4);if(IM.length<4)return;
const tx=$('#tx'),car=$('#txcar'),nm=$('#txn'),ds=$('#txd'),pr=$('#txp');let act=0,lock=false,tm;
const ROLE=['center','right','back','left'],role=(i)=>ROLE[(i-act+4)%4];
car.innerHTML=IM.map((p,i)=>`<div class="tx-it" data-i="${i}"><a class="tx-card" href="product.html?id=${p.id}" aria-label="${p.name}"><img src="${p.img}" alt="${p.name}" draggable="false"><div class="tx-cap"><em>${(TAX.find(t=>t.slug==p.cs)||{}).name||''}</em><strong>${p.name}</strong><span>${inr(p.price)} ${sp(p)}</span></div></a></div>`).join('');
IM.forEach(p=>{const m=new Image();m.src=p.img});
const its=$$('.tx-it',car);
function dk(h){const r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255,M=Math.max(r,g,b),m=Math.min(r,g,b);let H=0,S=0,L=(M+m)/2;if(M!=m){const d=M-m;S=L>.5?d/(2-M-m):d/(M+m);H=M==r?(g-b)/d+(g<b?6:0):M==g?(b-r)/d+2:(r-g)/d+4;H*=60}L=Math.min(L,.34);S=Math.max(S,.3);return `hsl(${H.toFixed(0)} ${(S*100).toFixed(0)}% ${(L*100).toFixed(0)}%)`}
function paint(){its.forEach((e,i)=>e.dataset.role=role(i));const p=IM[act];tx.style.backgroundColor=dk((p.pal&&p.pal[0])||'#b5532f');nm.textContent=p.name;ds.textContent=p.desc;pr.innerHTML=inr(p.price)+' '+sp(p)}
function go(d){if(lock)return;lock=true;act=(act+d+4)%4;paint();setTimeout(()=>lock=false,650)}
$('#txn1').onclick=()=>{go(-1);auto()};$('#txn2').onclick=()=>{go(1);auto()};
its.forEach((e,i)=>e.addEventListener('click',ev=>{const r=e.dataset.role;if(r=='center')return;ev.preventDefault();go(r=='left'?-1:1);auto()}));
function auto(){clearInterval(tm);if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;tm=setInterval(()=>go(1),6500)}
tx.addEventListener('pointerenter',()=>clearInterval(tm));tx.addEventListener('pointerleave',auto);tx.addEventListener('focusin',()=>clearInterval(tm));paint();auto()})();
