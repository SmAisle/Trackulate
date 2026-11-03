const fs=require('fs');const s=fs.readFileSync(__dirname+'/puzzle.js','utf8');const f=new Function(s+';return {makePuzzle,walkAll,ap}')();let bad=0,t0=Date.now(),seen=new Set(),T=[];
for(let n=1;n<=1100;n++){const p=f.makePuzzle(n);const R=f.walkAll(p).map(x=>f.ap(x.v,p['8,0']));const c=R.filter(v=>v===p.target).length;if(c!==1)bad++;seen.add(JSON.stringify(p));T.push(p.target)}
T.sort((a,b)=>a-b);console.log({bad,uniq:seen.size,ms:Date.now()-t0,min:T[0],med:T[550],max:T[1099]})
