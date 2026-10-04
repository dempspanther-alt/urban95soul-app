const streams=['https://14223.live.streamtheworld.com/SP_R3758709_SC','https://18303.live.streamtheworld.com/SP_R3758709_SC','https://18213.live.streamtheworld.com/SP_R3758709_SC'];
const audio=document.querySelector('#radio'), hero=document.querySelector('#heroPlay'), mini=document.querySelector('#miniPlay'), status=document.querySelector('#status'), miniStatus=document.querySelector('#miniStatus');let streamIndex=0;
function labels(playing,msg){hero.textContent=playing?'❚❚ PAUSE LIVE':'▶ LISTEN LIVE';mini.textContent=playing?'❚❚':'▶';status.textContent=msg;miniStatus.textContent=msg}
async function play(){if(!audio.src)audio.src=streams[streamIndex];labels(false,'Connecting…');try{await audio.play();labels(true,'Playing live')}catch(e){labels(false,'Tap play to retry')}}
function toggle(){audio.paused?play():(audio.pause(),labels(false,'Paused'))}hero.onclick=toggle;mini.onclick=toggle;
audio.addEventListener('error',()=>{if(streamIndex<streams.length-1){streamIndex++;audio.src=streams[streamIndex];play()}else labels(false,'Stream temporarily unavailable')});
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.querySelector('#'+b.dataset.page).classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');window.scrollTo(0,0)});
document.querySelector('#requestBtn').onclick=()=>{const n=document.querySelector('#name').value.trim(),s=document.querySelector('#song').value.trim();document.querySelector('#requestMsg').textContent=s?`Request ready${n?' for '+n:''}: ${s}. Station submission delivery will be connected in the next build.`:'Please enter an artist or song.'};

// Show artwork viewer
const dialog=document.querySelector('#showDialog'), dialogImg=document.querySelector('#dialogImg');
document.querySelectorAll('.grid img').forEach(img=>img.addEventListener('click',()=>{dialogImg.src=img.src;dialogImg.alt=img.closest('article').querySelector('h3').textContent+' schedule';dialog.showModal()}));
document.querySelector('#closeDialog').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

// Installable web-app support
let installPrompt=null;const installBtn=document.querySelector('#installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installBtn.hidden=false});
installBtn.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installBtn.hidden=true});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));

// Media controls / lock-screen metadata where supported
if('mediaSession' in navigator){navigator.mediaSession.metadata=new MediaMetadata({title:'Urban 95 Soul — Live',artist:'Urban 95 Soul Internet Radio',album:'The Sound of the City',artwork:[{src:'assets/icon.svg',sizes:'512x512',type:'image/svg+xml'}]});navigator.mediaSession.setActionHandler('play',play);navigator.mediaSession.setActionHandler('pause',()=>{audio.pause();labels(false,'Paused')})}
