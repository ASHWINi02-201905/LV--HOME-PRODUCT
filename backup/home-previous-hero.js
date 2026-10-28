$('#cats').innerHTML=visibleCats().map(c=>{const p=PRODUCTS.find(x=>x.cs==c.slug);return `<a class="cat" href="category.html?c=${c.slug}"><img src="assets/img/categories/${c.slug}.jpg" alt=""><span>${c.name}</span></a>`}).join('');
const photo=PRODUCTS.filter(p=>p.img.includes('/products/')),seen=new Set(),pick=[];photo.forEach(p=>{if(!seen.has(p.ss)){seen.add(p.ss);pick.push(p)}});photo.forEach(p=>{if(pick.length<8&&!pick.includes(p))pick.push(p)});
$('#deals').innerHTML=pick.slice(0,8).map(card).join('');
const hr=$('#hero');let raf=0,nx=.5,ny=.35;const ap=()=>{raf=0;hr.style.setProperty('--mx',(nx*100).toFixed(1)+'%');hr.style.setProperty('--my',(ny*100).toFixed(1)+'%');hr.style.setProperty('--tx',((nx-.5)*2).toFixed(3));hr.style.setProperty('--ty',((ny-.5)*2).toFixed(3))};
hr.addEventListener('pointermove',e=>{const r=hr.getBoundingClientRect();nx=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));ny=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height));if(!raf)raf=requestAnimationFrame(ap)});
hr.addEventListener('pointerleave',()=>{nx=.5;ny=.35;ap()});ap();
(function(){const L=PRODUCTS.filter(p=>p.badge=='New').slice(0,8);if(!L.length)return;
$('.hin').insertAdjacentHTML('beforeend',`<section class="na" aria-label="New arrivals"><div class="nah"><h2><b>NEW</b>ARRIVALS</h2><div class="nac"><button class="nb" id="np" aria-label="Previous">‹</button><button class="nb" id="nn" aria-label="Next">›</button><a href="shop.html?view=new">View all →</a></div></div><div class="nat" id="nat">${L.map(p=>`<a class="nc" href="product.html?id=${p.id}"><em>NEW</em><img src="${p.img}" alt="${p.name}" loading="lazy"><span>${p.name}</span><small>${inr(p.price)}</small></a>`).join('')}</div></section>`);
const t=$('#nat'),step=()=>t.firstElementChild.offsetWidth+16,go=d=>{const m=t.scrollWidth-t.clientWidth;t.scrollTo({left:d>0&&t.scrollLeft>=m-4?0:d<0&&t.scrollLeft<=4?m:t.scrollLeft+d*step(),behavior:'smooth'})};
$('#np').onclick=()=>go(-1);$('#nn').onclick=()=>go(1);let tm;const on=()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;clearInterval(tm);tm=setInterval(()=>go(1),3800)};
$('.na').addEventListener('pointerenter',()=>clearInterval(tm));$('.na').addEventListener('pointerleave',on);$('.na').addEventListener('focusin',()=>clearInterval(tm));on()})();

/* Hero: products fall one after another */
(function(){const g={};PRODUCTS.forEach(p=>(g[p.cs]=g[p.cs]||[]).push(p));const cols=Object.values(g),L=[];for(let k=0;L.length<PRODUCTS.length;k++)cols.forEach(c=>c[k]&&L.push(c[k]));if(!L.length)return;
const cn=p=>TAX.find(t=>t.slug==p.cs).name;
$('.sofa').insertAdjacentHTML('beforebegin','<div class="dwrap"><div class="drop" id="drop" aria-live="off"></div><div class="dctl"><button class="nb" id="dpv" aria-label="Previous product">‹</button><span id="dct"></span><button class="nb" id="dnx" aria-label="Next product">›</button></div></div>');
const st=$('#drop'),ct=$('#dct');st.insertAdjacentHTML('afterend','');st.insertAdjacentHTML('beforeend','<div class="dfx" id="dfx"></div>');let i=-1,cur=null,tm;
const POS=[[18,28,82,22,52,88],[80,18,20,72,56,40],[50,12,12,46,88,82],[28,84,74,50,18,16]];
function bg(p,k){const c=p.pal||['#5a4510','#333','#161616'],q=POS[k%4];[1,2,3].forEach((n,j)=>{hr.style.setProperty('--bg'+n,c[j]||c[0]);hr.style.setProperty('--bx'+n,q[j*2]+'%');hr.style.setProperty('--by'+n,q[j*2+1]+'%')})}
function burst(){const f=$('#dfx');f.innerHTML='<b></b>'+Array.from({length:9},(_,k)=>`<i style="--a:${-80+k*20+Math.random()*10}deg;--d:${70+Math.random()*80}px"></i>`).join('');f.className='dfx';void f.offsetWidth;f.className='dfx go'}
function show(d){clearTimeout(tm);if(cur){const o=cur;o.classList.remove('in','landed');o.classList.add('out');setTimeout(()=>o.remove(),950)}
i=(i+d+L.length)%L.length;const p=L[i],el=document.createElement('div');el.className='dc';el.setAttribute('role','button');el.tabIndex=0;el.title='Click for the next product';el.setAttribute('aria-label','Next product');el.addEventListener('keydown',e=>{if(e.target===el&&(e.key=='Enter'||e.key==' ')){e.preventDefault();show(1)}});
el.innerHTML=`<img src="${p.img}" alt="${p.name}"><span class="dp">${inr(p.price)}${sp(p)}</span><a class="dv" href="product.html?id=${p.id}">View product →</a><div class="dn"><em>${cn(p)}</em><strong>${p.name}</strong></div>`;
st.appendChild(el);requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));setTimeout(()=>{el.classList.add('landed');burst()},700);cur=el;bg(p,i);ct.textContent=(i+1)+' / '+L.length;
tm=setTimeout(()=>show(1),5000+Math.random()*5000)}
$('#dnx').onclick=()=>show(1);$('#dpv').onclick=()=>show(-1);st.addEventListener('click',e=>{if(e.target.closest('.dv'))return;show(1)});st._show=show;show(1);})();
