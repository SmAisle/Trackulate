import re,sys
s=open('/home/claude/trackulate-repo/timegame/index.html').read() if False else open('base-test.html').read()
def between(a,b,inc=False):
    i=s.index(a); j=s.index(b,i); return s[i:j+(len(b) if inc else 0)]
tr=between("var CITIES=","function $(i)")+between("function rng(","\n")+"\n"+between("var ROUTES=","var FC=")
fl=between("var FC=","function board(l)")+"function board(l){$('board').innerHTML=l.join('');flip()}\n"
fl=fl.replace("function step(e,a,n){dg(","function step(e,a,n){if(soundOn())dg(")
snd=between("/* sounds Jeff picked","function hdr()")
snd=snd.replace("function sf(fn){try{if(sc())fn()}catch(e){}}","function sf(fn){if(!soundOn())return;try{if(sc())fn()}catch(e){}}")
dr=between("var x,G={wheel:0}","function start(sd)")
g=open('game.js').read().replace('/*@TRAINS*/',tr).replace('/*@FLIP*/',fl).replace('/*@SOUNDS*/',snd).replace('/*@DRAW*/',dr)
p=open('page.html').read().replace('/*@GAME*/',g)
open('../index.html','w').write(p)
