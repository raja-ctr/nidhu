// ====== EDIT ME ======
const birthdayConfig={girlfriendNickname:"Babe",senderName:"Your Person",birthdayDate:"02 November"};
// =====================
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ORDER=["index","memories","love-letter","bubu-dudu","birthday-cake","chocolate","final-surprise"];
const page=document.body.dataset.page,idx=ORDER.indexOf(page);
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.innerHTML=document.body.innerHTML.replace(/\{\{nick\}\}/g,birthdayConfig.girlfriendNickname).replace(/\{\{sender\}\}/g,birthdayConfig.senderName).replace(/\{\{date\}\}/g,birthdayConfig.birthdayDate);
function go(p){document.body.classList.add('leave');setTimeout(()=>location.href=p+'.html',450)}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(a){e.preventDefault();go(a.dataset.go)}});
const hud=document.createElement('div');hud.id='hud';
hud.innerHTML=`<span>💗 Surprise ${idx+1} of 7</span><span>${idx>0?`<button data-go="${ORDER[idx-1]}" aria-label="Back">←</button>`:''}<button id="mp" aria-label="Play or pause music">🎵</button><button id="mm" aria-label="Mute">🔊</button><input id="vol" type="range" min="0" max="1" step=".05" value=".3" aria-label="Volume"></span>`;
document.body.prepend(hud);document.body.insertAdjacentHTML('afterbegin',`<div class="bar"><i style="width:${(idx+1)/7*100}%"></i></div><div id="bg"></div>`);
let AC,master,musicOn=false,muted=false,mt;
function ctx(){if(!AC){AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=+$('#vol').value;master.connect(AC.destination)}if(AC.state==='suspended')AC.resume();return AC}
function tone(f,d=.3,t='sine',v=.15,when=0){if(muted)return;try{const c=ctx(),o=c.createOscillator(),g=c.createGain();o.type=t;o.frequency.value=f;const s=c.currentTime+when;g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(master);o.start(s);o.stop(s+d)}catch(e){}}
function sfx(k){const m={open:[523,659,784],sparkle:[1046,1318],cake:[392,523,659,784,1046],choc:[330,440,554],pop:[600]};(m[k]||m.pop).forEach((f,i)=>tone(f,.35,'triangle',.12,i*.1))}
const NOTES=[523,659,784,659,587,698,880,698];let ni=0;
$('#mp').onclick=()=>{musicOn=!musicOn;if(musicOn){ctx();mt=setInterval(()=>{tone(NOTES[ni++%8],1.2,'sine',.08)},700)}else clearInterval(mt)};
$('#mm').onclick=e=>{muted=!muted;e.target.textContent=muted?'🔇':'🔊'};
$('#vol').oninput=e=>{if(master)master.gain.value=+e.target.value};
function el(c,t,x,dur){const d=document.createElement('div');d.className=c;d.textContent=t;d.style.left=x+'%';d.style.animationDuration=dur+'s';$('#bg').appendChild(d);setTimeout(()=>d.remove(),dur*1000);return d}
if(!reduce){for(let i=0;i<30;i++){const s=document.createElement('div');s.className='st';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*2}s`;$('#bg').appendChild(s)}
setInterval(()=>{const h=el('fl',['💗','💖','✨','💕'][Math.random()*4|0],Math.random()*100,9+Math.random()*6);h.style.fontSize=12+Math.random()*18+'px'},900);
if(['index','love-letter','final-surprise'].includes(page))setInterval(()=>el('fall','🌸',Math.random()*100,10+Math.random()*5),1500)}
function burst(x=innerWidth/2,y=innerHeight/2,n=18,set=['💗','💖','💕','✨']){for(let i=0;i<n;i++){const s=document.createElement('div');s.textContent=set[i%set.length];s.style.cssText=`position:fixed;left:${x}px;top:${y}px;z-index:50;pointer-events:none;font-size:${14+Math.random()*16}px;transition:1.2s cubic-bezier(.2,.8,.3,1)`;document.body.appendChild(s);const a=Math.random()*6.28,r=60+Math.random()*140;requestAnimationFrame(()=>{s.style.transform=`translate(${Math.cos(a)*r}px,${Math.sin(a)*r-40}px) scale(.6)`;s.style.opacity=0});setTimeout(()=>s.remove(),1300)}}
function confetti(n=70){const c=['#ff6b9d','#ffd34d','#8b5fd0','#7fe0c8','#fff'];for(let i=0;i<n;i++){const d=document.createElement('i');d.style.cssText=`position:fixed;top:-12px;left:${Math.random()*100}vw;width:8px;height:14px;background:${c[i%5]};z-index:50;pointer-events:none;transition:${2.5+Math.random()*2}s ease-in`;document.body.appendChild(d);requestAnimationFrame(()=>{d.style.transform=`translate(${(Math.random()-.5)*200}px,105vh) rotate(${Math.random()*900}deg)`});setTimeout(()=>d.remove(),5000)}}
function balloons(){for(let i=0;i<6;i++){const d=el('fl','🎈',10+i*16,8+i);d.style.fontSize='46px'}}
function reveal(e){e.classList.remove('hidden');e.classList.add('fade')}
function sticker(name,alt){const w=document.createElement('span'),i=new Image();i.className='sticker';i.alt=alt;i.src='assets/stickers/'+name;function pk(ev){ev.target.classList.add('pop');setTimeout(()=>ev.target.classList.remove('pop'),500);burst(ev.clientX,ev.clientY,10);sfx('pop')}i.onerror=()=>{w.innerHTML=`<span class="ph" tabindex="0" role="img" aria-label="${alt} (add ${name})">Add<br>assets/stickers/<br>${name}</span>`;w.firstChild.onclick=pk};i.onclick=pk;w.appendChild(i);return w}
$$('[data-sticker]').forEach(h=>h.appendChild(sticker(h.dataset.sticker,h.dataset.alt||'Bubu and Dudu sticker')));
