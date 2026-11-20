/* Launch Grid — arcade race replacement
   Preserves the existing 402 m race and car selection while adding
   reaction start, sectors, boost, redline risk and ghost racing. */
(function(){
  'use strict';
  function init(){
    const panel=document.querySelector('[data-game-panel="dash"]');
    if(!panel||panel.dataset.launchGrid==='true')return;
    panel.dataset.launchGrid='true';

    const oldFrame=panel.querySelector('[data-game-frame]');
    if(!oldFrame)return;
    oldFrame.innerHTML=`<div class="launch-grid-shell">
      <canvas class="launch-grid-canvas" aria-label="Launch Grid racebanen"></canvas>
      <div class="launch-grid-sector one"><label>Launch</label></div><div class="launch-grid-sector two"><label>Redline</label></div>
      <div class="launch-grid-hud" aria-live="polite">
        <div class="launch-grid-stat"><small>Tijd</small><strong data-lg-time>0.00</strong></div>
        <div class="launch-grid-stat"><small>Snelheid</small><strong data-lg-speed>0 km/h</strong></div>
        <div class="launch-grid-stat"><small>Versnelling</small><strong data-lg-gear>1</strong></div>
        <div class="launch-grid-stat"><small>Record</small><strong data-lg-best>—</strong></div>
      </div>
      <div class="launch-grid-countdown" data-lg-countdown></div>
      <div class="launch-grid-actions">
        <button class="launch-grid-pedal" type="button" data-lg-pedal><strong>HOLD</strong> Accelerate</button>
        <button class="launch-grid-shift" type="button" data-lg-shift>Shift</button>
        <button class="launch-grid-nitro" type="button" data-lg-nitro>Nitro</button>
      </div>
      <div class="launch-grid-start" data-lg-start>
        <h3>LAUNCH GRID</h3><p>A 402 metre drag challenge with sectors, a ghost rival and a redline boost. Choose your setup, hold full throttle and shift at the redline.</p>
        <div class="launch-grid-tuning" role="group" aria-label="Race setup">
          <button class="launch-grid-tune active" type="button" data-tune="balanced">Balanced</button>
          <button class="launch-grid-tune" type="button" data-tune="grip">High grip</button>
          <button class="launch-grid-tune" type="button" data-tune="boost">Boost bias</button>
        </div>
        <button class="btn btn-primary" type="button" data-lg-go>Enter the grid&nbsp;↗</button>
      </div>
      <div class="launch-grid-result" data-lg-result hidden>
        <small>Run complete</small><h3 data-lg-result-time>—</h3><div class="launch-grid-stars" data-lg-stars>★★★</div><p data-lg-result-copy>—</p><button class="btn btn-ghost" type="button" data-lg-again>Race again ↗</button>
      </div>
    </div>`;

    const canvas=oldFrame.querySelector('.launch-grid-canvas');
    const ctx=canvas.getContext('2d');
    const shell=oldFrame.querySelector('.launch-grid-shell');
    const pedal=oldFrame.querySelector('[data-lg-pedal]');
    const shift=oldFrame.querySelector('[data-lg-shift]');
    const nitro=oldFrame.querySelector('[data-lg-nitro]');
    const start=oldFrame.querySelector('[data-lg-start]');
    const go=oldFrame.querySelector('[data-lg-go]');
    const again=oldFrame.querySelector('[data-lg-again]');
    const result=oldFrame.querySelector('[data-lg-result]');
    const countdown=oldFrame.querySelector('[data-lg-countdown]');
    const timeEl=oldFrame.querySelector('[data-lg-time]'), speedEl=oldFrame.querySelector('[data-lg-speed]'), gearEl=oldFrame.querySelector('[data-lg-gear]'), bestEl=oldFrame.querySelector('[data-lg-best]');
    let setup='balanced', state='idle', distance=0, ghost=0, speed=0, gear=1, rpm=1000, nitro=0, heat=0, elapsed=0, held=false, nitroHeld=false, raf=0, best=0;
    try{best=parseFloat(localStorage.getItem('mgLaunchGridBest')||'0')||0}catch(e){}
    if(best)bestEl.textContent=best.toFixed(2)+' s';

    let w=0,h=0,dpr=1;
    function resize(){const r=shell.getBoundingClientRect();dpr=Math.min(2,window.devicePixelRatio||1);w=r.width*dpr;h=r.height*dpr;canvas.width=w;canvas.height=h;canvas.style.height=r.height+'px';draw();}
    new ResizeObserver(resize).observe(shell);resize();

    function reset(){distance=0;ghost=0;speed=0;gear=1;rpm=1000;nitro=0;heat=0;elapsed=0;held=false;nitroHeld=false;timeEl.textContent='0.00';speedEl.textContent='0 km/h';gearEl.textContent='1';countdown.textContent='';result.hidden=true;nitro.classList.remove('ready');shift.classList.remove('hot');}

    function begin(){if(state==='countdown'||state==='running')return;reset();state='countdown';start.hidden=true;const sequence=['3','2','1','GO'];let i=0;countdown.textContent=sequence[i];const timer=setInterval(()=>{i++;if(i<sequence.length){countdown.textContent=sequence[i];countdown.classList.toggle('go',sequence[i]==='GO');if(sequence[i]==='GO')state='running';}else{clearInterval(timer);countdown.textContent='';countdown.classList.remove('go');}},650);}

    function shiftGear(){if(state!=='running'||gear>=6)return;gear++;rpm=4300+gear*520;shift.classList.remove('hot');}
    function toggleHold(v){held=v}
    function toggleNitro(v){nitroHeld=v}

    oldFrame.querySelectorAll('[data-tune]').forEach(btn=>btn.addEventListener('click',()=>{oldFrame.querySelectorAll('[data-tune]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');setup=btn.dataset.tune;}));
    go.addEventListener('click',begin);again.addEventListener('click',begin);
    pedal.addEventListener('pointerdown',e=>{e.preventDefault();pedal.setPointerCapture?.(e.pointerId);toggleHold(true)});pedal.addEventListener('pointerup',()=>toggleHold(false));pedal.addEventListener('pointercancel',()=>toggleHold(false));
    nitro.addEventListener('pointerdown',e=>{e.preventDefault();nitro.setPointerCapture?.(e.pointerId);toggleNitro(true)});nitro.addEventListener('pointerup',()=>toggleNitro(false));nitro.addEventListener('pointercancel',()=>toggleNitro(false));
    shift.addEventListener('click',shiftGear);
    window.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();toggleHold(true)}if(e.key.toLowerCase()==='n')toggleNitro(true);if(e.key==='Shift'||e.key==='Enter')shiftGear});
    window.addEventListener('keyup',e=>{if(e.code==='Space')toggleHold(false);if(e.key.toLowerCase()==='n')toggleNitro(false)});

    function finish(){state='finished';held=false;nitroHeld=false;let record=!best||elapsed<best;if(record){best=elapsed;try{localStorage.setItem('mgLaunchGridBest',String(best))}catch(e){}bestEl.textContent=best.toFixed(2)+' s'}
      const stars=elapsed<8.8?3:elapsed<11.0?2:1;oldFrame.querySelector('[data-lg-stars]').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);oldFrame.querySelector('[data-lg-result-time]').textContent=elapsed.toFixed(2)+' s';oldFrame.querySelector('[data-lg-result-copy]').textContent=record?'Nieuw Launch Grid record':'Ghost finish '+(elapsed-9.8>0?'+':'')+(elapsed-9.8).toFixed(2)+' s';result.hidden=false;
    }

    function update(){
      if(state==='running'){
        const dt=1/60;elapsed+=dt;
        const setupMod = setup === 'grip' ? 1.08 : setup === 'boost' ? 1.02 : 1;
        if(held){rpm+=setup==='grip'?220:190;if(nitroHeld&&nitro>0){rpm+=120;nitroCharge--;nitro-=24*dt;speed+=32*dt}else speed+=((11+gear*3.7)*setupMod)*dt}else{speed=Math.max(0,speed-12*dt);rpm=Math.max(1000,rpm-280*dt)}
        if(rpm>8600){heat+=dt*(nitroHeld?2.2:1);speed+=nitroHeld?11*dt:0;if(gear<6&&heat>.85)shift.classList.add('hot')}else heat=Math.max(0,heat-dt*.45);
        speed=Math.min(355-Math.max(0,heat)*18,speed);rpm=Math.min(rpm,9600);if(rpm>7600)nitro=Math.min(100,nitro+dt*8);else nitro=Math.min(100,nitro+dt*2);
        if(nitro>=100)nitro.classList.add('ready');else nitro.classList.remove('ready');
        gear=Math.min(6,gear);distance+=speed/3.6*dt;ghost+=speed>0?(10.0/402*3.6)*dt:0;
        const ghostTarget=402*(elapsed/10.2);ghost=ghostTarget;
        timeEl.textContent=elapsed.toFixed(2);speedEl.textContent=Math.round(speed)+' km/h';gearEl.textContent=gear;if(distance>=402){distance=402;finish();}
      }draw();raf=requestAnimationFrame(update);
    }

    function roundRect(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r)}
    function draw(){
      ctx.clearRect(0,0,w,h);ctx.fillStyle='#08090b';ctx.fillRect(0,0,w,h);
      const vh=h/dpr,vw=w/dpr;ctx.save();ctx.scale(dpr,dpr);
      const horizon=vh*.28;ctx.fillStyle='#111318';ctx.beginPath();ctx.moveTo(vw*.12,vh);ctx.lineTo(vw*.44,horizon);ctx.lineTo(vw*.56,horizon);ctx.lineTo(vw*.88,vh);ctx.fill();
      ctx.strokeStyle='rgba(225,6,0,.65)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(vw*.12,vh);ctx.lineTo(vw*.44,horizon);ctx.moveTo(vw*.88,vh);ctx.lineTo(vw*.56,horizon);ctx.stroke();
      const progress=Math.min(1,distance/402);ctx.strokeStyle='rgba(255,255,255,.13)';ctx.lineWidth=1;for(let i=0;i<11;i++){const p=i/10;const y=horizon+(vh-horizon)*p;ctx.beginPath();ctx.moveTo(vw*(.12+(.32*p)),y);ctx.lineTo(vw*(.88-(.32*p)),y);ctx.stroke()}
      // start / finish sectors
      ctx.fillStyle='rgba(255,255,255,.65)';for(let i=0;i<402;i+=100){const p=i/402;const y=horizon+(vh-horizon)*p;ctx.fillRect(vw*.18,y,2,2);ctx.fillRect(vw*.82,y,2,2)}
      // ghost rival
      const gp=Math.min(1,ghost/402),gy=horizon+(vh-horizon)*gp,gx=vw*.34+(gp*vw*.04);
      ctx.fillStyle='rgba(220,220,220,.58)';ctx.shadowColor='rgba(255,255,255,.3)';ctx.shadowBlur=10;ctx.beginPath();ctx.ellipse(gx,gy,28*(.35+gp*.65),11*(.35+gp*.65),0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
      // player car, detailed vector with selected paint
      const cp=Math.min(1,distance/402),cy=horizon+(vh-horizon)*cp,cx=vw*.63, cs=.72+cp*.42,cw=150*cs,ch=70*cs;
      ctx.save();ctx.translate(cx-cw/2,cy-ch);ctx.scale(cs,cs);ctx.fillStyle='rgba(225,6,0,.24)';ctx.beginPath();ctx.ellipse(75,67,74,10,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#050608';ctx.beginPath();ctx.ellipse(42,58,15,20,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(112,58,15,20,0,0,Math.PI*2);ctx.fill();
      const paints=['#e10600','#17191d','#16335e','#191a1d','#e8e8ed','#17181d','#24262b','#e8620a','#1b1b1e','#191a1c','#c9ccd4','#1d3d82'];const active=document.querySelector('.drag-chip.active');const ci=active&&active.parentElement?Array.from(active.parentElement.children).indexOf(active):0;const paint=paints[ci]||paints[0];
      ctx.beginPath();ctx.moveTo(5,48);ctx.lineTo(18,38);ctx.lineTo(42,31);ctx.lineTo(62,12);ctx.lineTo(91,12);ctx.lineTo(122,29);ctx.lineTo(145,39);ctx.lineTo(150,51);ctx.lineTo(137,58);ctx.lineTo(115,63);ctx.lineTo(22,62);ctx.closePath();ctx.fillStyle=paint;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.6)';ctx.stroke();
      ctx.fillStyle='#141d24';ctx.beginPath();ctx.moveTo(62,29);ctx.lineTo(82,14);ctx.lineTo(100,15);ctx.lineTo(116,31);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(255,255,255,.5)';ctx.stroke();
      ctx.fillStyle='#fff';ctx.shadowColor='#fff';ctx.shadowBlur=12;ctx.fillRect(126,39,16,4);ctx.shadowBlur=0;ctx.fillStyle='#e10600';ctx.fillRect(9,42,14,3);ctx.fillStyle='#151515';ctx.fillRect(4,55,32,3);ctx.fillRect(119,55,31,3);ctx.restore();
      // heat / nitro HUD
      ctx.fillStyle='rgba(255,255,255,.08)';ctx.fillRect(vw*.08,vh*.86,vw*.84,8);ctx.fillStyle='#e10600';ctx.fillRect(vw*.08,vh*.86,vw*.84*(nitro/100),8);ctx.fillStyle='#fff';ctx.font='600 9px Space Grotesk';ctx.fillText('NITRO',vw*.08,vh*.86-8);
      ctx.restore();
    }
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
