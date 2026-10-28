"""Builds one combined collage picture per category -> assets/img/categories/<slug>.jpg
Run from the project folder:  pip install pillow  &&  python3 tools/make-collages.py
Reads js/data.js and js/taxonomy.js. Photos (.jpg) are preferred; SVG placeholders are rasterised only if a category has no photos (needs: pip install cairosvg)."""
import json,re,os
from PIL import Image
d=open('js/data.js').read();P=json.loads(d[d.index('=')+1:].rstrip(';\n'))
t=open('js/taxonomy.js').read();M={int(a):b.split('|') for a,b in re.findall(r"(\d+):'([^']*)'",t.split('const MAP=')[1].split('};')[0])}
slug=lambda s:re.sub(r'^-|-$','',re.sub(r'[^a-z0-9]+','-',s.lower().replace('&','and')))
W,H,G=1200,500,8
def fit(im,w,h):
    r=max(w/im.width,h/im.height);im=im.resize((int(im.width*r)+1,int(im.height*r)+1),Image.LANCZOS)
    x,y=(im.width-w)//2,(im.height-h)//2;return im.crop((x,y,x+w,y+h))
def layout(n):
    if n==1:return[(0,0,W,H)]
    if n==2:return[(0,0,W//2-G//2,H),(W//2+G//2,0,W//2-G//2,H)]
    if n==3:return[(0,0,W//2-G//2,H),(W//2+G//2,0,W//2-G//2,H//2-G//2),(W//2+G//2,H//2+G//2,W//2-G//2,H//2-G//2)]
    rw=W//2-G//2;hw=(rw-G)//2;hh=(H-G)//2;x0=W//2+G//2
    if n==4:return[(0,0,rw,H),(x0,0,rw,hh),(x0,hh+G,hw,hh),(x0+hw+G,hh+G,hw,hh)]
    return[(0,0,W//2-G//2,H),(x0,0,hw,hh),(x0+hw+G,0,hw,hh),(x0,hh+G,hw,hh),(x0+hw+G,hh+G,hw,hh)]
cats={}
for p in P:
    c=M[p['id']];cats.setdefault(slug(c[0]),[]).append((slug(c[1]),p['img']))
def load(path):
    if path.endswith('.svg'):
        import cairosvg,io;return Image.open(io.BytesIO(cairosvg.svg2png(url=path,output_width=800))).convert('RGB')
    return Image.open(path).convert('RGB')
for c,items in cats.items():
    ph=[i for i in items if not i[1].endswith('.svg')];use=ph if len(ph)>=3 else items
    by={};[by.setdefault(s,[]).append(i) for s,i in use]
    order=[];k=0
    while len(order)<5 and any(len(v)>k for v in by.values()):
        order+=[v[k] for v in by.values() if len(v)>k];k+=1
    order=order[:5];cv=Image.new('RGB',(W,H),'#ffffff')
    for img,(x,y,w,h) in zip(order,layout(len(order))):cv.paste(fit(load(img),w,h),(x,y))
    cv.save(f'assets/img/categories/{c}.jpg',quality=86);print(c,len(order),'tiles')
