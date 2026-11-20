/* Replaces the old Performance section only. Safe to load after main.js. */
(function(){
  'use strict';
  function init(){
    const section=document.getElementById('performance');
    if(!section||section.dataset.performanceWow==='true')return;

    if(!document.querySelector('link[data-performance-wow]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.dataset.performanceWow='true';
      link.href='css/performance-wow.css?v=26';
      document.head.appendChild(link);
    }

    section.dataset.performanceWow='true';
    section.className='performance-wow performance section';
    section.innerHTML=`
      <div class="pw-top">
        <div>
          <div class="pw-kicker">02 / Performance</div>
          <h2 class="pw-title">Power, <em>measured.</em></h2>
        </div>
        <div class="pw-status"><span class="pw-live"></span>Dyno link<strong>Ready</strong></div>
      </div>
      <div class="pw-stage">
        <div class="pw-speedline"></div>
        <div class="pw-ring"></div>
        <div class="pw-center">
          <div class="pw-number" data-pw-number>1250</div>
          <div class="pw-unit">PK</div>
          <div class="pw-caption"><strong data-pw-rpm>8250</strong> RPM / ultimate output</div>
        </div>
        <div class="pw-rail"><i></i></div>
      </div>
      <div class="pw-metrics">
        <div class="pw-metric"><small>Peak power</small><strong data-pw-power>1250 <span>PK</span></strong></div>
        <div class="pw-metric"><small>Maximum torque</small><strong data-pw-torque>1180 <span>NM</span></strong></div>
        <div class="pw-metric"><small>0 — 100 km/h</small><strong data-pw-sprint>2.1 <span>SEC</span></strong></div>
      </div>
      <div class="pw-actions">
        <button class="pw-run" type="button">Start power run&nbsp; ↗</button>
        <div class="pw-log">Run state&nbsp; <strong data-pw-state>Standby</strong></div>
      </div>`;

    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const number=section.querySelector('[data-pw-number]');
    const rpmEl=section.querySelector('[data-pw-rpm]');
    const rail=section.querySelector('.pw-rail i');
    const state=section.querySelector('[data-pw-state]');
    const button=section.querySelector('.pw-run');
    const metrics=section.querySelector('.pw-metrics');
    let running=false;

    function count(el,to,prefix='',decimals=0){
      if(reduce){el.textContent=prefix+to.toFixed(decimals);return;}
      const start=performance.now(),duration=850;
      function frame(now){
        const t=Math.min(1,(now-start)/duration),e=1-Math.pow(1-t,4);
        el.textContent=prefix+(to*e).toFixed(decimals);
        if(t<1)requestAnimationFrame(frame);else el.textContent=prefix+to.toFixed(decimals);
      }requestAnimationFrame(frame);
    }

    function run(){
      if(running)return;
      running=true;button.disabled=true;button.textContent='Measuring…';state.textContent='Full throttle';number.classList.add('hot');
      const start=performance.now(),duration=2600;
      function frame(now){
        const t=Math.min(1,(now-start)/duration);
        const rpm=Math.round(2200+(8300-2200)*(1-Math.pow(1-t,1.7)));
        const power=Math.round(820+(1250-820)*t);
        rpmEl.textContent=rpm.toLocaleString('nl-NL');
        number.textContent=power;
        rail.style.width=(t*100)+'%';
        if(t<1)requestAnimationFrame(frame);else{
          number.textContent='1250';rpmEl.textContent='8250';rail.style.width='100%';state.textContent='Verified';button.disabled=false;button.textContent='Run it again ↗';number.classList.remove('hot');running=false;
          count(section.querySelector('[data-pw-power]'),1250,'',0);count(section.querySelector('[data-pw-torque]'),1180,'',0);count(section.querySelector('[data-pw-sprint]'),2.1,'',1);
        }
      }requestAnimationFrame(frame);
    }
    button.addEventListener('click',run);

    if(!reduce){
      section.addEventListener('pointermove',e=>{
        const r=section.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        const center=section.querySelector('.pw-center');
        center.style.transform=`translate(-50%,-50%) rotateY(${x*7}deg) rotateX(${-y*5}deg)`;
      });
      section.addEventListener('pointerleave',()=>{const center=section.querySelector('.pw-center');center.style.transform='translate(-50%,-50%)'});
    }

    const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&entry.target===section){run();io.disconnect();}})},{threshold:.35});io.observe(section);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
