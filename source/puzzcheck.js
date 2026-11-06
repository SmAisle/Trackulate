const fs=require('fs');const s=fs.readFileSync(__dirname+'/puzzle.js','utf8');const f=new Function(s+';return {makePuzzle,walkAll,ap,NOON_OFF}')();let bad=0,t0=Date.now(),seen=new Set(),T=[];
for(let k=1;k<=2200;k++){const n=k<=1100?k:k-1100+f.NOON_OFF;const p=f.makePuzzle(n);const R=f.walkAll(p).map(x=>f.ap(x.v,p['8,0']));const c=R.filter(v=>v===p.target).length;if(c!==1)bad++;seen.add(JSON.stringify(p));T.push(p.target)}
T.sort((a,b)=>a-b);console.log({bad,uniq:seen.size,ms:Date.now()-t0,min:T[0],med:T[1100],max:T[2199],note:'1,100 midnight + 1,100 noon boards; uniq should be 2200'})
