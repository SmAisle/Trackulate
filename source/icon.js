const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:1024}});
await p.setContent('<canvas id=c width=1024 height=1024></canvas><style>body{margin:0}</style>');
await p.evaluate(()=>{const x=document.getElementById('c').getContext('2d'),I='#1a1814';x.fillStyle='#f4efe1';x.fillRect(0,0,1024,1024);
const R=[[512],[352,672],[192,512,832],[352,672],[512]],Y=[130,330,530,730,900];
const line=(a,b,on)=>{x.strokeStyle=on?I:'rgba(26,24,20,.35)';x.lineWidth=on?10:6;const d=Math.hypot(b[0]-a[0],b[1]-a[1]),ux=(b[0]-a[0])/d,uy=(b[1]-a[1])/d,nx=-uy,ny=ux;if(on){x.strokeStyle='#ffe27a';x.lineWidth=96;x.beginPath();x.moveTo(...a);x.lineTo(...b);x.stroke();x.strokeStyle=I;x.lineWidth=10;for(let t=0;t<d;t+=34){x.beginPath();x.moveTo(a[0]+ux*t+nx*36,a[1]+uy*t+ny*36);x.lineTo(a[0]+ux*t-nx*36,a[1]+uy*t-ny*36);x.stroke()}}[-22,22].forEach(o=>{x.lineWidth=on?14:6;x.beginPath();x.moveTo(a[0]+nx*o,a[1]+ny*o);x.lineTo(b[0]+nx*o,b[1]+ny*o);x.stroke()})};
const P=(l,i)=>[R[l][i],Y[l]];const E=[[0,0,1,0],[0,0,1,1],[1,0,2,0],[1,0,2,1],[1,1,2,1],[1,1,2,2],[2,0,3,0],[2,1,3,0],[2,1,3,1],[2,2,3,1],[3,0,4,0],[3,1,4,0]];const ON='0,0,1,1|1,1,2,1|2,1,3,0|3,0,4,0'.split('|');
E.filter(e=>!ON.includes(e.join())).forEach(e=>line(P(e[0],e[1]),P(e[2],e[3])));ON.forEach(s=>{const e=s.split(',').map(Number);line(P(e[0],e[1]),P(e[2],e[3]),1)});
line([512,-20],[512,130],1);line([512,900],[512,1040],1);
const stop=(X,Y2,on)=>{x.fillStyle=on?'#ffe27a':'#fffdf6';x.strokeStyle=I;x.lineWidth=12;x.fillRect(X-74,Y2-46,148,92);x.strokeRect(X-74,Y2-46,148,92)};
R.forEach((r,l)=>r.forEach((X,i)=>stop(X,Y[l],l==0||l==4||(l==1&&i==1)||(l==2&&i==1)||(l==3&&i==0))));
x.save();x.translate(432,630);x.rotate(Math.atan2(200,-160));x.scale(6.2,6.2);x.fillStyle=I;x.beginPath();x.roundRect(-22,-9,44,18,5);x.fill();x.fillStyle='#f4efe1';x.fillRect(-17,-5,8,10);x.fillStyle='#ffe27a';x.beginPath();x.arc(17,0,3.4,0,7);x.fill();x.restore();
x.strokeStyle=I;x.lineWidth=20;x.strokeRect(10,10,1004,1004)});
for(const s of [1024,512,192,180]){const d=await p.evaluate(s=>{const o=document.createElement('canvas');o.width=o.height=s;const g=o.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(document.getElementById('c'),0,0,s,s);return o.toDataURL('image/png')},s);require('fs').writeFileSync(`../icon-${s}.png`,Buffer.from(d.split(',')[1],'base64'))}await b.close()})()
