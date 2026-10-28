"""Adds a 3-colour palette ("pal") to every product in js/data.js, taken from its photo.
The hero background slides to these colours when that product is shown.
Run from the project folder:  pip install pillow  &&  python3 tools/make-palettes.py"""
import json,colorsys
from PIL import Image
d=open('js/data.js').read();P=json.loads(d[d.index('=')+1:].rstrip(';\n'))
def tone(c):
    h,l,s=colorsys.rgb_to_hls(*[x/255 for x in c]);s=s*1.45 if s>.1 else s;s=min(s,.92);l=min(.56,max(.34,l*.95))
    return '#%02x%02x%02x'%tuple(int(x*255) for x in colorsys.hls_to_rgb(h,l,s))
def pal(path):
    im=Image.open(path).convert('RGB').resize((80,80)).quantize(colors=8,method=Image.MEDIANCUT).convert('RGB')
    cs=sorted(im.getcolors(6400),reverse=True);out=[]
    def sat(c):return colorsys.rgb_to_hls(*[x/255 for x in c])[2]
    for n,c in sorted(cs,key=lambda t:-t[0]*(sat(t[1])+.3)):
        if all(sum(abs(a-b) for a,b in zip(c,o))>90 for o in out):out.append(c)
        if len(out)==3:break
    while len(out)<3:out.append(out[0])
    return [tone(c) for c in out]
for p in P:p['pal']=pal(p['img'])
open('js/data.js','w').write('const PRODUCTS='+json.dumps(P)+';')
print(len(P),'palettes written; e.g.',P[0]['name'],P[0]['pal'])
