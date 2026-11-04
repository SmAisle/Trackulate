(function(){
var VERSION='1.7',VDATE='Nov 4',GAME='tr',TERMS='tr-terms',EPOCH='2026-11-03',FB_KEY='AIzaSyAlbSCTpAiK-1tojkyWrY3QuJsSzILHSfs',FB_PROJ='aislerun-88e79',URL='https://smaisle.app/Trackulate/timegame/';
var VTXT='v'+VERSION+' · '+VDATE,$=function(i){return document.getElementById(i)};
var WEB=/github\.io$|smaisle\.app$/.test(location.hostname);
var store={get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},json:function(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v===null?d:v}catch(e){return d}},put:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
/* dates: new trains at midnight Eastern */
function todayStr(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York'}).format(new Date())}
function dayNo(d){return Math.round((Date.parse(d+'T12:00:00Z')-Date.parse(EPOCH+'T12:00:00Z'))/864e5)+1}
function dateOf(n){return new Date(Date.parse(EPOCH+'T12:00:00Z')+(n-1)*864e5).toISOString().slice(0,10)}
function nd(d,o){return new Date(d+'T12:00:00Z').toLocaleDateString('en-US',Object.assign({timeZone:'UTC'},o))}
var TODAY=todayStr();
/* Plus game: the preview is the first train. The hub adds ?preview=1 for anyone without Plus. */
function isPV(){return new URLSearchParams(location.search).get('preview')==='1'&&!(window.DG_APP&&window.DG_APP.plus)||(!!window.DG_APP&&!window.DG_APP.plus)}
if(!window.dgNative)window.dgNative=function(cmd,d){if(cmd!=='store'||!window.DG_APP)return;window.DG_APP.plus=!!(d&&d.plus);previewUI();if(!isPV()&&!$('gate').hidden)only('')};
function toApp(m){try{window.webkit&&webkit.messageHandlers&&webkit.messageHandlers.dg&&webkit.messageHandlers.dg.postMessage(m)}catch(e){}}
/*@TRAINS*/
/*@FLIP*/
/* sound with comeback */
var smAC=null,smAway=false;function getAC(){try{if(!smAC||smAC.state==='closed')smAC=new(window.AudioContext||window.webkitAudioContext)();if(smAC.state!=='running'){var old=smAC;old.resume().catch(function(){});setTimeout(function(){if(smAC===old&&old.state!=='running'&&!document.hidden){try{old.close()}catch(e){}smAC=null}},600)}}catch(e){smAC=null}return smAC}
function smAwake(){if(smAC&&smAway){try{smAC.close()}catch(e){}smAC=null}smAway=false}
document.addEventListener('visibilitychange',function(){if(document.hidden)smAway=true});addEventListener('pagehide',function(){smAway=true});addEventListener('pageshow',function(e){if(e.persisted)smAway=true});
['pointerdown','touchend','keydown'].forEach(function(t){document.addEventListener(t,function(){smAwake();var c=getAC();if(c){hornLoad(c);try{var b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0)}catch(e){}}},{capture:true,passive:true})});
function soundOn(){return store.get('tr-sound','on')!=='off'}
/*@HORN*/
/*@SOUNDS*/
/*@DRAW*/
/* the game */
var DAY=TODAY,PAST=false,TN=[],i=0,tries=0,stars=[],T=null,busy=false,RID=0,DEMO=null;
function skey(d){return 'tr-d_'+d}
function sumS(){return stars.reduce(function(a,b){return a+(b||0)},0)}
function hdr(){$('tn').textContent=i>=5?'Done':'Try '+Math.min(tries+1,2)+'/2';$('stars').textContent=sumS()+'/15';$('tc').textContent=Math.min(i+1,5)+'/5'}
function msg(t){$('msg').textContent=t}
function labels(){if(DEMO){$('noLabel').textContent='Demo';$('dateLabel').textContent='';return}$('noLabel').textContent='No. '+dayNo(DAY);$('dateLabel').textContent=nd(DAY,{weekday:'short',month:'short',day:'numeric'})+(PAST?' · Archive':'')}
function save(){if(DEMO)return;store.put(skey(DAY),{i:i,tries:tries,stars:stars})}
function setup(){RID++;busy=false;T=TN[i];hdr();msg(T.m);board(T.bd.map(function(l,k){return ln(l)}));var lev,q='Be there by '+tm(T.ar)+(T.zone?' '+T.zone:'')+'<small>'+T.sm+'</small>';
 if(T.k==='leave')lev='<div class="lev"><div class="h"><span>You leave at</span><b id="v"></b></div><input type="range" id="r" aria-label="You leave at" min="0" max="1425" step="15"></div>';
 else lev='<div class="lev"><div class="h"><span>'+(T.lab||'Your speed')+'</span><b id="v"></b></div><input type="range" id="r" aria-label="Your speed" min="30" max="130" step="5"></div>';
 $('body').innerHTML=(T.al?'<div class="alert"><b>'+T.al+'</b><span>'+T.al2+'</span></div>':'')+'<div class="need">'+q+'</div>'+lev+'<button class="go big" id="gob">All Aboard</button>';
 var r=$('r');r.value=T.k==='leave'?720:80;var up=function(){$('v').textContent=T.k==='leave'?tm(+r.value):r.value+' mph'};r.oninput=function(){up();lever()};up();$('gob').onclick=function(){run(+r.value)}}
function run(v){if(busy)return;busy=true;var id=++RID;if(!DEMO&&!PAST&&i===0&&tries===0)checkIn('play');msg('All aboard!');var sp=T.k==='leave'?T.s:v,lv=T.k==='leave'?v:T.lv,total=T.tot(sp);whistle();rolling();hiss(3.1);$('body').innerHTML='<div class="clk" id="c"></div><canvas id="trc"></canvas><div class="mi" id="m"></div>';var t0=performance.now(),L=4200,pl=t0,sm=0,PF=[],e=function(n){if(id!==RID)return;var f=Math.min(1,(n-t0)/L),dt=Math.min(.05,(n-pl)/1000);pl=n;$('c').textContent=tm(lv+total*f);scene($('trc'),f,f*44);var cw=$('trc').getBoundingClientRect();sm-=dt;if(sm<=0){sm=.11;PF.push({x:118+(cw.width-150)*f+19,y:cw.height-11-30,r:1.6,a:.7,vx:-14,vy:-14})}puffs($('trc'),PF,dt);$('m').textContent=Math.round(T.d*f)+' of '+T.d+' miles';if(f<1)requestAnimationFrame(e);else if(Math.round(lv+total+T.tz-T.ar)===0)steamWin(id,PF,function(){done(lv,sp,total)});else done(lv,sp,total)};requestAnimationFrame(e)}
/* on time: the train stands and blows off steam from the chimney and wheels */
function puffs(c,L,dt){var X=c.getContext('2d');L.forEach(function(k){k.x+=k.vx*dt;k.y+=k.vy*dt;k.r+=dt*5;k.a-=dt*.8;if(k.a>0){X.globalAlpha=k.a;X.fillStyle='#fffdf6';X.beginPath();X.arc(k.x,k.y,k.r,0,7);X.fill();X.strokeStyle='rgba(26,24,20,.4)';X.lineWidth=.8;X.stroke()}});X.globalAlpha=1;for(var q=L.length-1;q>=0;q--)if(L[q].a<=0)L.splice(q,1)}
function steamWin(id,PF,then){var c=$('trc'),P2=PF,t0=performance.now(),last=t0,L=1300,w=c.getBoundingClientRect().width,h=c.getBoundingClientRect().height,tx=118+(w-150),b=h-11;hiss(0);var add=function(){P2.push({x:tx+19,y:b-30,vx:-20-Math.random()*26,vy:-26-Math.random()*22,r:3+Math.random()*2,a:.95});for(var q=0;q<2;q++)P2.push({x:tx-8+Math.random()*30,y:b-3,vx:-46+Math.random()*80,vy:-6-Math.random()*9,r:2.5+Math.random()*2,a:.85})},s=function(n){if(id!==RID)return;var dt=Math.min(.05,(n-last)/1000);last=n;var e2=n-t0;if(e2<L-350&&Math.random()<.75)add();scene(c,1,44);puffs(c,P2,dt);if(e2<L)requestAnimationFrame(s);else then()};requestAnimationFrame(s)}
function done(lv,sp,total){busy=false;tries++;var diff=Math.round(lv+total+T.tz-T.ar),a=Math.abs(diff),s=a===0?3:a<=15?2:a<=60?1:0,arr=tm(lv+total+T.tz);stars[i]=Math.max(stars[i]||0,s);hdr();$('tn').textContent='Try '+tries+'/2';msg(a?'Off schedule.':'On schedule.');var txt=a===0?'ON TIME':diff<0?'EARLY':'LATE';board([ln('ARRIVED'),ln(arr),ln(txt)]);
 var last=tries>=2||a===0,lb=i>=4?'See results':'Next train',ex=a&&!last?'That was '+dur(total)+' from start to finish.'+(T.zn?' '+T.zn:''):T.ex(sp),starLine='<div class="sg">'+'★'.repeat(s)+'☆'.repeat(3-s)+'</div>';
 if(!DEMO){if(last&&i>=4)record();else if(last)store.put(skey(DAY),{i:i+1,tries:0,stars:stars});else save()}
 $('body').innerHTML='<div class="res '+(a?'bad':'ok')+'">'+(a?dur(a)+' '+(diff<0?'early':'late'):'Right on time!')+'</div>'+starLine+'<div class="ex">'+ex+'</div>'+(DEMO?'':(last?'':'<button class="go alt" id="ag">Try again</button>')+'<button class="go big" id="nx">'+lb+'</button>');if(a)miss();else win();
 if(DEMO){DEMO.done=1;return}
 if($('ag'))$('ag').onclick=setup;$('nx').onclick=function(){if(isPV()&&i===0){tries=0;i=1;save();gate();return}tries=0;i++;if(i>=5){if(!store.json(skey(DAY),{}).over)record();fin(true)}else{save();setup()}}}
function title(t){return t>=13?'Best conductor on the line.':t>=8?'Mostly on schedule.':'The station master wants a word.'}
function receipt(){var t=sumS();return '<h3>smAisle</h3><div class="sub">CalcRU-Late · No. '+dayNo(DAY)+' · '+nd(DAY,{month:'short',day:'numeric'})+'</div>'+TN.map(function(x,k){var s=stars[k]||0;return '<div class="rl"><span>'+nice(x.a)+' to '+nice(x.b)+'</span><i></i><span>'+'★'.repeat(s)+'☆'.repeat(3-s)+'</span></div>'}).join('')+'<div class="rl tot"><span>Total</span><i></i><span>'+t+' of 15</span></div>'}
function fin(loud){RID++;busy=false;i=5;if(loud)fanfare();hdr();msg(title(sumS()));board([ln('LAST TRAIN'),ln('ALL IN')]);$('body').innerHTML='<div class="rc">'+receipt()+'</div><button class="go big" id="sr">See results</button>';$('sr').onclick=showDone;if(loud)setTimeout(function(){if(i>=5&&!DEMO)showDone()},1500);else showDone()}
function showDone(){if(DEMO)return;only('done');loadMore();$('dTitle').textContent=title(sumS());$('dRc').innerHTML=receipt();$('dNext').textContent=PAST?'Archive trains':'New trains at midnight Eastern';$('dHub').hidden=!(WEB||window.DG_APP);$('dShare').style.gridColumn=$('dHub').hidden?'1/-1':''}
function record(){var t=stars.reduce(function(a,b){return a+(b||0)},0);store.put(skey(DAY),{over:1,i:5,tries:0,stars:stars});var h=store.json('tr-hist',{});if(!h[DAY]){h[DAY]={t:t};if(PAST)h[DAY].late=1;store.put('tr-hist',h)}if(!PAST){markDone();checkIn('done')}}
function markDone(){try{var s=store.json('smaisle_done',{})||{},d=new Date(),day=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');s[day]=s[day]||[];if(s[day].indexOf('tr')<0)s[day].push('tr');var k=Object.keys(s).sort();while(k.length>60)delete s[k.shift()];store.put('smaisle_done',s)}catch(e){}}
function statsOf(){var h=store.json('tr-hist',{}),V=Object.values(h),n=dayNo(TODAY),run=0,max=0;for(var q=1;q<=n;q++){var r=h[dateOf(q)];if(r&&!r.late){run++;max=Math.max(max,run)}else if(q<n)run=0}var sum=V.reduce(function(a,v){return a+v.t},0);return {played:V.length,avg:V.length?Math.round(sum/V.length*10)/10:0,top:V.reduce(function(a,v){return Math.max(a,v.t)},0),perfect:V.filter(function(v){return v.t===15}).length,cur:run,max:max}}
function share(){var c=['⬛','🟧','🟨','🟩'];return 'CalcRU-Late No. '+dayNo(DAY)+' 🚂\n'+[0,1,2,3,4].map(function(k){return c[stars[k]||0]}).join('')+' '+sumS()+' of 15\n'+URL}
/* usage check-in. r = total stars for the day. */
function devId(){var id=store.get('tr-dev','');if(!id){id=Array.from(crypto.getRandomValues(new Uint8Array(12)),function(b){return 'abcdefghijklmnopqrstuvwxyz0123456789'[b%36]}).join('');store.set('tr-dev',id)}return id}
function inviteCode(){try{var c=localStorage.getItem('smaisle_code');if(c)return String(c).slice(0,40);var m=store.json('smaisle_codes',null);if(m){var v=Object.values(m).find(function(y){return y});if(v)return String(v).slice(0,40)}}catch(e){}return 'unknown'}
function trim(m){var k=Object.keys(m).sort();while(k.length>60)delete m[k.shift()];return m}
function checkIn(kind){if(!store.get(TERMS,''))return;var u=store.json('tr-usage',{first:TODAY,days:0,last:'',opens:0,plays:0,o:{},p:{},r:{}}),day=TODAY;if(u.last!==day){u.days++;u.last=day}if(kind==='open'){u.opens++;u.o[day]=(u.o[day]||0)+1}if(kind==='play'){u.plays++;u.p[day]=(u.p[day]||0)+1}var hist=store.json('tr-hist',{});if(hist[day]&&!hist[day].late)u.r[day]=hist[day].t;[u.o,u.p,u.r].forEach(trim);store.put('tr-usage',u);
 if(!WEB&&!window.TR_TEST)return;var st=statsOf(),I=function(n){return {integerValue:String(Math.round(n)||0)}},Tx=function(v){return {stringValue:String(v)}},Mp=function(m){return {mapValue:{fields:Object.fromEntries(Object.entries(m).map(function(e){return [e[0],I(e[1])]}))}}};
 var body={fields:{first:Tx(u.first),last:Tx(day),days:I(u.days),v:Tx(VERSION),opens:I(u.opens),plays:I(u.plays),done:I(st.played),perfect:I(st.perfect),top:I(st.top),streak:I(st.cur),best:I(st.max),terms:Tx(store.get(TERMS,'').slice(0,10)),desk:{booleanValue:innerWidth>=820},code:Tx(inviteCode()),t:I(Date.now()),o:Mp(u.o),p:Mp(u.p),r:Mp(u.r)}};
 if(window.TR_TEST){window.__body=body;return}
 try{fetch('https://firestore.googleapis.com/v1/projects/'+FB_PROJ+'/databases/(default)/documents/'+GAME+'_devices/'+devId()+'?key='+FB_KEY,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),keepalive:true}).catch(function(){})}catch(e){}}
/* screens */
var back=null;function only(id){if(id&&id!=='cover'&&!$('cover').hidden)back='cover';if(!id||id==='cover')back=null;document.querySelectorAll('.sheet').forEach(function(s){s.hidden=s.id!==id})}
function closeAll(){only('')}
document.querySelectorAll('[data-close]').forEach(function(b){b.onclick=function(){b.closest('.sheet').hidden=true;if(back==='cover')cover()}});
function art(){scene($('cvArt'),.45,0)}
function cover(){stopDemo();RID++;busy=false;TODAY=todayStr();only('cover');var r=store.json(skey(TODAY),null);$('cvDate').textContent=nd(TODAY,{weekday:'short',month:'short',day:'numeric',year:'numeric'});$('cvNo').textContent='No. '+dayNo(TODAY);$('coverGo').textContent=r&&r.over?'See today’s results':r?'Keep playing':'Play today’s trains';var s=statsOf();$('cvStats').hidden=!s.played;if(s.played)$('cvStats').innerHTML=[[s.played,'Played'],[s.avg,'Average'],[s.cur,'Streak'],[s.top,'Best']].map(function(p){return '<div><b>'+p[0]+'</b>'+p[1]+'</div>'}).join('');art()}
function openDay(d){stopDemo();TODAY=todayStr();DAY=d;PAST=d!==TODAY;TN=makeTrains(dayNo(d));var R=store.json(skey(d),null);i=R?R.i:0;tries=R?R.tries:0;stars=R?R.stars:[];closeAll();labels();if(R&&R.over)fin(false);else if(isPV()&&i>=1)gate();else setup()}
function gate(){$('gateH').textContent='That was your free train';$('gateBack').hidden=true;only('gate');loadMore()}
function previewUI(){var pv=isPV();$('mPlus').hidden=!pv;$('mHow').style.gridColumn=pv?'':'1/-1';['coverPast','mPast','dPast'].forEach(function(k){$(k).hidden=pv})}
$('coverGo').onclick=function(){if(!store.get('tr-offer','')&&!store.json(skey(TODAY),null)){store.set('tr-offer','1');only('offer');return}openDay(TODAY)};$('ofYes').onclick=startDemo;$('ofNo').onclick=function(){openDay(TODAY)};
$('coverHow').onclick=$('mHow').onclick=function(){only('help')};
function arch(){var h=store.json('tr-hist',{}),n=dayNo(TODAY),o='';for(var q=n;q>=1;q--){var d=dateOf(q),r=h[d],k=store.json(skey(d),null);o+='<button data-d="'+d+'"><span>No. '+q+' · '+nd(d,{month:'short',day:'numeric'})+(q===n?' · Today':'')+'</span><span>'+(r?r.t+' of 15'+(r.late?' · late':''):k?'Keep playing':'Play')+'</span></button>'}$('pastList').innerHTML=o;$('pastList').querySelectorAll('button').forEach(function(b){b.onclick=function(){openDay(b.dataset.d)}});only('past')}
$('coverPast').onclick=$('mPast').onclick=$('dPast').onclick=arch;
function stats(){var s=statsOf();$('statgrid').innerHTML=[[s.played,'Played'],[s.played?s.avg:'–','Average'],[s.played?s.top:'–','Best day'],[s.perfect,'15 of 15'],[s.cur,'Streak'],[s.max,'Best streak']].map(function(p){return '<div><b>'+p[0]+'</b>'+p[1]+'</div>'}).join('');only('stats')}
$('coverStats').onclick=$('mStats').onclick=$('dStats').onclick=stats;
$('menuBtn').onclick=function(){if(DEMO)return;only('menu')};$('mBack').onclick=closeAll;$('mSet').onclick=function(){only('settings')};$('setBack').onclick=function(){only('menu')};$('mFront').onclick=cover;$('mTerms').onclick=function(){only('terms')};
function goHub(){if(window.DG_APP)return toApp({cmd:'home'});location.href='https://smaisle.app/daily/'}
$('mHub').onclick=$('dHub').onclick=$('gateHub').onclick=goHub;
$('mPlus').onclick=function(){$('gateH').textContent='smAisle Daily Plus';$('gateBack').hidden=false;only('gate');loadMore()};$('gateBack').onclick=function(){only('menu')};
$('gateBuy').onclick=function(){if(window.DG_APP)toApp({cmd:'plus'});else location.href='https://smaisle.app/daily/#plus'};
$('mSm').onclick=$('cvHome').onclick=function(e){e.preventDefault();if(window.DG_APP)return toApp({cmd:'home'});if(WEB)location.href='https://smaisle.app/';else window.open('https://smaisle.app/','_blank','noopener')};
$('dShare').onclick=function(){var t=share(),b=$('dShare');try{if(navigator.share&&matchMedia('(pointer:coarse)').matches){navigator.share({text:t}).catch(function(){});return}}catch(e){}if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){b.textContent='Copied!';setTimeout(function(){b.textContent='Share'},1500)},function(){})};
$('termsGo').onclick=function(){var first=!store.get(TERMS,'');store.set(TERMS,TODAY);if(first)checkIn('open');cover()};
var moreTried=false;function drawMore(){var S=window.SMAISLE;if(!S||!S.games)return;var L2=S.games.filter(function(g){return g.id!=='tr'&&g.url&&g.icon});if(!L2.length)return;document.querySelectorAll('.more').forEach(function(m){var r=m.querySelector('.moreRow');r.innerHTML=L2.map(function(g){return '<a href="'+g.url+'"><img src="'+g.icon+'" alt="" loading="lazy">'+g.name+'</a>'}).join('');r.querySelectorAll('a').forEach(function(a){a.onclick=function(e){if(window.DG_APP){e.preventDefault();toApp({cmd:'open',url:a.href})}}});m.hidden=false})}
function loadMore(){if(window.SMAISLE)return drawMore();if(moreTried)return;moreTried=true;var s=document.createElement('script');s.src='https://smaisle.app/daily/games.js';s.onload=drawMore;document.head.appendChild(s)}
/* dark mode and sound settings */
var darkQ=matchMedia('(prefers-color-scheme: dark)');
function dark(){var d=store.get('smaisle-dark','off');if(d!=='on'&&d!=='auto')d='off';var n=d==='on'||(d==='auto'&&darkQ.matches),h=document.documentElement,was=h.dataset.mode==='navy';if(n)h.dataset.mode='navy';else delete h.dataset.mode;document.querySelector('meta[name=theme-color]').content=n?'#121b2e':'#f4efe1';if(was!==n)toApp({cmd:'mode',navy:n});document.querySelectorAll('#segDark button').forEach(function(b){b.classList.toggle('sel',b.dataset.v===d)})}
darkQ.addEventListener&&darkQ.addEventListener('change',dark);document.querySelectorAll('#segDark button').forEach(function(b){b.onclick=function(){store.set('smaisle-dark',b.dataset.v);dark()}});
function snd(){document.querySelectorAll('#segSound button').forEach(function(b){b.classList.toggle('sel',b.dataset.v===store.get('tr-sound','on'))})}document.querySelectorAll('#segSound button').forEach(function(b){b.onclick=function(){store.set('tr-sound',b.dataset.v);snd()}});
/* demo: two fixed trains. Tap Next at each step. */
var DT=[{k:'speed',m:'Pick your speed.',a:'CHICAGO',b:'ST LOUIS',d:300,s:75,lv:540,tz:0,ar:780,bd:['CHICAGO','TO ST LOUIS','300 MILES'],sm:'You leave at 9:00 AM',tot:function(v){return 300/v*60},ex:function(v){return '4 hours at '+v+' mph is 300 miles.'}},
{k:'speed',lab:'Your speed after that',m:'Pick your speed for the rest.',al:'Track work ahead',al2:'First 60 miles at 30 mph',a:'DENVER',b:'OMAHA',d:300,s:60,lv:540,tz:0,ar:900,bd:['DENVER','TO OMAHA','300 MILES'],sm:'You leave at 9:00 AM',tot:function(v){return 120+240/v*60},ex:function(){return ''}}];
function slide(to){var r=$('r'),go=function(){if(!DEMO)return;var v=+r.value;if(v===to)return;r.value=v+(to>v?5:-5);r.oninput();setTimeout(go,60)};go()}
var DS=[{r:function(){i=0;tries=0;stars=[];setup()},t:function(){return 'The board shows your trip: <b>300 miles</b>. Leave at 9:00 AM. Be there by 1:00 PM.'}},
{r:function(){slide(75)},t:function(){return 'That’s 4 hours. 300 ÷ 4 = 75, so set the <b>lever</b> to <b>75 mph</b>.'}},
{r:function(){run(75)},w:function(){return DEMO.done},t:function(){return 'Dead on time is <b>3 stars</b>. Within 15 minutes is 2. Within an hour is 1.'}},
{r:function(){DEMO.done=0;i=1;tries=0;setup()},t:function(){return 'Later trains add a twist. The <b>yellow alert</b> changes the math.'}},
{r:function(){slide(60)},t:function(){return '60 miles at 30 mph is 2 hours. That leaves 240 miles in 4 hours: <b>60 mph</b>.'}},
{t:function(){return 'Five trains, 2 tries each, and your best try counts. Everyone gets the same trains each day.'}}];
function stopDemo(){if(!DEMO)return;DEMO=null;RID++;busy=false;$('demoBar').hidden=true;$('demoBlock').hidden=true}
function startDemo(){stopDemo();closeAll();DEMO={i:-1,done:0};TN=DT;labels();$('demoBar').hidden=false;$('demoBlock').hidden=false;dnext()}
function dnext(){if(!DEMO)return;DEMO.i++;if(DEMO.i>=DS.length){cover();return}var s=DS[DEMO.i];$('demoStep').textContent='Demo · '+(DEMO.i+1)+' of '+DS.length;$('demoNext').disabled=true;$('demoNext').textContent=DEMO.i===DS.length-1?'Done':'Next';if(s.r)s.r();var wait=function(){if(!DEMO)return;if(!s.w||s.w()){$('demoText').innerHTML=s.t();$('demoNext').disabled=false}else setTimeout(wait,150)};setTimeout(wait,s.r?400:60)}
$('demoNext').onclick=dnext;$('demoSkip').onclick=cover;$('coverDemo').onclick=$('helpDemo').onclick=startDemo;
['helpVer','sVer'].forEach(function(k){$(k).textContent=VTXT});$('mVer').textContent='CalcRU-Late · '+VTXT+' · smAisle';$('cvVer').textContent=VTXT;
if(WEB||window.DG_APP){$('coverHub').hidden=false;$('cover').classList.add('hub');$('mHub').hidden=false;$('coverHub').onclick=function(e){if(window.DG_APP){e.preventDefault();toApp({cmd:'home'})}}}
dark();snd();previewUI();
if(store.get(TERMS,'')){cover();checkIn('open')}else only('terms');
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(!$('cover').hidden)art()});
window.__tr=function(){return {TN:TN,T:T,i:i,tries:tries,stars:stars,DEMO:DEMO,run:run,share:share,DAY:DAY,make:makeTrains}};
})();
