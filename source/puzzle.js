/* Daily puzzle. Everyone gets the same board for a date. Exactly one route reaches the target. */
var W=[1,2,3,4,3,4,3,2,1];
function kids(l,i){var k=W[l+1]>W[l]?[i,i+1]:[i-1,i];return k.filter(function(j){return j>=0&&j<W[l+1]})}
function ap(v,o){if(o[0]==='+')return v+o[1];if(o[0]==='-')return v-o[1];if(o[0]==='x')return v*o[1];return v%o[1]?null:v/o[1]}
var OPS=[['+',3],['+',4],['+',5],['+',6],['+',7],['+',8],['+',9],['+',11],['-',2],['-',3],['-',4],['-',5],['-',6],['-',8],['x',2],['x',2],['x',2],['x',2],['x',2],['x',3],['x',3],['/',2],['/',2],['/',2],['/',2],['/',3]],LAST=[['+',4],['+',6],['+',7],['-',3],['-',5],['x',2]];
function rng(a){return function(){a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
function walkAll(p){var out=[];(function go(l,i,v,path,m){if(l===7){out.push({v:v,path:path,m:m});return}kids(l,i).forEach(function(j){var o=p[(l+1)+','+j],n=ap(v,o);if(n===null||n<0||n>160)return;go(l+1,j,n,path.concat(j),m+(o[0]==='x'||o[0]==='/'?1:0))})})(0,0,p.start,[0],0);return out}
function firstRoute(){var s=[0];for(var k=1;k<=7;k++)s[k]=kids(k-1,s[k-1])[0];return s}
/* Noon board (app, Plus): makePuzzle(dayNo+NOON_OFF). Same generator and checks; the offset keeps it off every midnight board for 1,300+ years. */
var NOON_OFF=500000;
function makePuzzle(n){var r=rng(Math.imul(n,2654435761)^0x54524B),pick=function(a){return a[Math.floor(r()*a.length)]},def=firstRoute().join();
 for(;;){var p={start:4+Math.floor(r()*6)};for(var l=1;l<=7;l++)for(var i=0;i<W[l];i++)p[l+','+i]=pick(OPS);var R=walkAll(p),c={};R.forEach(function(x){c[x.v]=(c[x.v]||0)+1});
  var G=R.filter(function(x){return c[x.v]===1&&x.v>=18&&x.v<=90&&x.m>=2&&x.path.join()!==def});
  if(R.length>=30&&G.length){var g=pick(G),e=pick(LAST);p['8,0']=e;p.target=ap(g.v,e);p.sol=g.path;return p}}}
