/* Launch — polished custom vector car layered over the existing race scene. */
(function () {
  'use strict';

  function initLaunchCar() {
    const frame = document.querySelector('[data-game-frame]');
    const race = document.getElementById('launchCanvas');
    if (!frame || !race || frame.querySelector('.launch-car-render')) return;

    const overlay = document.createElement('canvas');
    overlay.className = 'launch-car-render';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = 'position:absolute;inset:0;z-index:1;width:100%;height:100%;pointer-events:none;';
    frame.appendChild(overlay);
    const ctx = overlay.getContext('2d');
    if (!ctx) { overlay.remove(); return; }

    const paints = ['#e10600','#17191d','#16335e','#191a1d','#e8e8ed','#17181d','#24262b','#e8620a','#1b1b1e','#191a1c','#c9ccd4','#1d3d82'];
    const glow = '#ff3228';
    let width = 0, height = 0, dpr = 1, frameId = 0, last = performance.now();
    let wheelAngle = 0, bob = 0;

    function roundRect(x,y,w,h,r){
      ctx.beginPath();ctx.roundRect(x,y,w,h,r);
    }
    function path(points){
      ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
      for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
      ctx.closePath();
    }
    function color(){
      const selected=frame.querySelector('.drag-chip.active');
      return paints[selected ? Array.from(selected.parentElement.children).indexOf(selected) : 0] || paints[0];
    }

    function drawCar(now){
      if(!width||!height)return;
      const dt=Math.min(40,now-last);last=now;
      const speedNode=document.querySelector('[data-drag-speed]');
      const speed=speedNode?parseFloat(speedNode.textContent)||0:0;
      wheelAngle+=dt*(.002+speed*.000025);
      const moving=speed>0;
      bob+=( (moving?Math.sin(now*.025)*1.5:0)-bob)*.12;
      ctx.clearRect(0,0,width,height);

      const scale=Math.min(width/780,1.08);
      const carWidth=250*scale, carHeight=116*scale;
      const x=width*.63, y=height*.83+bob*scale;
      ctx.save();ctx.translate(x-carWidth/2,y-carHeight);ctx.scale(scale,scale);

      // Soft contact shadow and red underglow.
      const under=ctx.createRadialGradient(125,105,4,125,105,115);
      under.addColorStop(0,'rgba(255,35,25,.30)');under.addColorStop(.55,'rgba(225,6,0,.12)');under.addColorStop(1,'rgba(225,6,0,0)');
      ctx.fillStyle=under;ctx.beginPath();ctx.ellipse(126,103,124,20,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(0,0,0,.74)';ctx.beginPath();ctx.ellipse(128,101,108,14,0,0,Math.PI*2);ctx.fill();

      // Tires sit behind the sculpted body.
      [62,190].forEach((wx)=>{
        ctx.fillStyle='#050608';ctx.beginPath();ctx.ellipse(wx,88,22,31,0,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='#555a61';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(wx,88,13,22,0,0,Math.PI*2);ctx.stroke();
        ctx.save();ctx.translate(wx,88);ctx.rotate(wheelAngle);
        ctx.strokeStyle='rgba(220,225,230,.72)';ctx.lineWidth=2;
        for(let i=0;i<5;i++){ctx.rotate(Math.PI*2/5);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-17);ctx.stroke();}
        ctx.fillStyle='#aeb4bb';ctx.beginPath();ctx.arc(0,0,4,0,Math.PI*2);ctx.fill();ctx.restore();
      });

      const paint=ctx.createLinearGradient(22,35,205,100);
      paint.addColorStop(0,'#f3f4f4');paint.addColorStop(.12,color());paint.addColorStop(.48,color());paint.addColorStop(.78,'#15171a');paint.addColorStop(1,'#050608');
      // Low, wide GT silhouette, facing right.
      path([[8,80],[16,70],[36,65],[52,50],[78,42],[100,21],[127,13],[169,16],[190,29],[208,36],[229,41],[245,51],[250,67],[242,76],[219,80],[204,72],[190,69],[176,76],[90,81],[76,72],[60,70],[47,78],[24,84]]);
      ctx.fillStyle=paint;ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle='rgba(255,255,255,.62)';ctx.stroke();

      // Cockpit / panoramic glass.
      path([[75,47],[105,23],[128,18],[164,21],[181,34],[190,43],[127,43]]);
      const glass=ctx.createLinearGradient(110,20,160,50);glass.addColorStop(0,'#c7d6df');glass.addColorStop(.18,'#54616b');glass.addColorStop(.72,'#111820');glass.addColorStop(1,'#080b10');
      ctx.fillStyle=glass;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.48)';ctx.lineWidth=1.2;ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(128,20);ctx.lineTo(128,43);ctx.stroke();
      ctx.beginPath();ctx.moveTo(80,45);ctx.lineTo(187,45);ctx.stroke();

      // Hood creases and side sculpting.
      ctx.strokeStyle='rgba(255,255,255,.62)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(132,53);ctx.quadraticCurveTo(193,44,236,54);ctx.stroke();
      ctx.strokeStyle='rgba(0,0,0,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(24,68);ctx.quadraticCurveTo(111,75,208,61);ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,.34)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(38,59);ctx.quadraticCurveTo(116,56,214,51);ctx.stroke();

      // Intake, splitter, signature headlamps and tail light.
      const intake=ctx.createLinearGradient(210,58,250,72);intake.addColorStop(0,'#050608');intake.addColorStop(.5,'#25282d');intake.addColorStop(1,'#030405');
      path([[211,57],[243,55],[248,66],[216,69]]);ctx.fillStyle=intake;ctx.fill();
      ctx.fillStyle='#fff4e7';ctx.shadowColor='#fff';ctx.shadowBlur=12;path([[225,48],[244,51],[238,55],[220,54]]);ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle=glow;ctx.shadowColor=glow;ctx.shadowBlur=moving?18:9;roundRect(15,61,23,4,2);ctx.fill();ctx.shadowBlur=0;
      ctx.fillStyle='#050608';path([[212,75],[250,69],[245,78],[220,82]]);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.8)';ctx.fillRect(102,74,45,2);
      ctx.fillStyle='rgba(225,6,0,.95)';ctx.fillRect(112,79,26,2);

      // Mirror, door cut, brake detail, subtle metallic highlights.
      ctx.fillStyle=color();path([[173,39],[188,37],[193,42],[182,45]]);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.52)';ctx.stroke();
      ctx.strokeStyle='rgba(4,5,7,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(167,48);ctx.lineTo(158,72);ctx.stroke();
      ctx.fillStyle='rgba(225,6,0,.82)';roundRect(54,85,16,6,3);ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(230,49,10,2,-.12,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }

    function resize(){
      const rect=race.getBoundingClientRect();
      if(!rect.width||!rect.height)return;
      dpr=Math.min(2,window.devicePixelRatio||1);width=Math.round(rect.width*dpr);height=Math.round(rect.height*dpr);
      overlay.width=width;overlay.height=height;
      ctx.setTransform(dpr,0,0,dpr,0,0);width=rect.width;height=rect.height;
      drawCar(performance.now());
    }
    function loop(now){drawCar(now);frameId=requestAnimationFrame(loop);}
    if('ResizeObserver'in window)new ResizeObserver(resize).observe(race);else window.addEventListener('resize',resize);
    resize();frameId=requestAnimationFrame(loop);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initLaunchCar);else initLaunchCar();
})();
