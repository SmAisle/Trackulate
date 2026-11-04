/* the train horn: Old train-steam-whistle by Amber2023 (Pixabay), first blast */
var HORN='@B64@',HB=null,HC=null;
function hornLoad(c){if(HC===c)return;HC=c;HB=null;try{var s=atob(HORN),a=new Uint8Array(s.length);for(var k=0;k<s.length;k++)a[k]=s.charCodeAt(k);c.decodeAudioData(a.buffer,function(b){if(HC===c)HB=b},function(){})}catch(e){}}
function hornPlay(c,out,v){if(!HB||HC!==c)return false;var s=c.createBufferSource(),g=c.createGain();s.buffer=HB;g.gain.value=v;s.connect(g).connect(out);s.start();return true}
