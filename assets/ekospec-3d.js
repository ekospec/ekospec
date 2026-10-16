/* =====================================================
   EKOSPEC — efekty przestrzenne (warianty 1 i 2)
   Bez bibliotek. Tylko komputer z myszą, nie przy „ogranicz ruch”.
   Włączenie: klasy fx-tilt (wariant 1) i fx-logo3d (wariant 2) na <html>.
   ===================================================== */
(function(){
  const root=document.documentElement;
  const capable=window.matchMedia('(hover:hover) and (pointer:fine) and (min-width:901px)').matches
             && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.EKO_FX_CAPABLE=capable;
  if(!capable) return;
  if(!root.hasAttribute('data-fx-manual')) root.classList.add('fx-tilt','fx-logo3d');
  const on=c=>root.classList.contains(c);
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const lerp=(a,b,t)=>a+(b-a)*t;

  window.addEventListener('DOMContentLoaded',()=>{ initLogo(); initCards(); initParallax(); });

  /* ---------- WARIANT 2: medalion 3D ---------- */
  function initLogo(){
    const box=document.getElementById('heroLogo');
    const obw=document.getElementById('hlObwod');
    if(!box||!obw) return;
    // przebudowa warstw: scena -> [pierścień (duch, krawędzie, złoto, refleks)] + słoń
    const stage=document.createElement('div'); stage.className='hl-stage';
    const ring=document.createElement('div'); ring.className='hl-ringwrap';
    const kids=[...box.children];
    const ghostRing=kids.find(k=>k.querySelector&&k.querySelector('.hl-base.ring'));
    if(ghostRing) ring.appendChild(ghostRing);
    const edges=[];
    for(let i=5;i>=1;i--){
      const e=document.createElement('img'); e.className='hl-edge'; e.alt=''; e.setAttribute('aria-hidden','true');
      e.style.transform=`translateZ(${-i*1.6}px)`; e.style.filter=`brightness(${.62-i*.07}) sepia(.6)`;
      ring.appendChild(e); edges.push(e);
    }
    ring.appendChild(obw);
    const glint=document.createElement('div'); glint.className='hl-glint'; ring.appendChild(glint);
    stage.appendChild(ring);
    kids.filter(k=>k!==ghostRing&&k!==obw).forEach(k=>stage.appendChild(k));
    const shadow=document.createElement('div'); shadow.className='hl-shadow';
    box.appendChild(stage); box.appendChild(shadow);

    // krawędzie metalu = ten sam złoty pierścień, gdy już się załaduje
    const syncEdges=()=>{ if(obw.src) edges.forEach(e=>{ if(e.src!==obw.src) e.src=obw.src; }); };
    obw.addEventListener('load',syncEdges);
    // po zakończeniu rysowania logo (≈2,6 s) pokaż grubość, refleks i cień
    setTimeout(()=>{ syncEdges(); [...edges,glint,shadow].forEach(el=>el.classList.add('on')); },2650);

    // stan animacji
    let px=0,py=0,tx=0,ty=0;            // kursor (wygładzony / docelowy)
    const t0=performance.now();
    let visible=true, raf=0;
    window.addEventListener('pointermove',e=>{
      tx=(e.clientX/innerWidth-.5); ty=(e.clientY/innerHeight-.5);
    },{passive:true});
    new IntersectionObserver(en=>{ visible=en[0].isIntersecting; if(visible&&!raf) raf=requestAnimationFrame(frame); }).observe(box);

    function frame(now){
      raf=0;
      if(!on('fx-logo3d')){ reset(); if(visible) raf=requestAnimationFrame(frame); return; }
      const t=now-t0;
      // wejście: medalion ustawia się z ukosa do pozycji frontalnej
      const k=clamp((t-1100)/1700,0,1), ke=1-Math.pow(1-k,3);
      const by=lerp(-30,0,ke), bx=lerp(11,0,ke);
      px=lerp(px,tx,.06); py=lerp(py,ty,.06);
      const hero=document.getElementById('hero');
      const p=hero?clamp(scrollY/hero.offsetHeight,0,1):0;
      const idle=Math.sin(t/2600)*1.6*ke;
      const hy=by + px*22 + idle;
      const hx=bx - py*15 + p*20;
      box.style.setProperty('--hy',hy.toFixed(2)+'deg');
      box.style.setProperty('--hx',hx.toFixed(2)+'deg');
      box.style.setProperty('--hz',(p*55).toFixed(2)+'deg');        // pierścień run obraca się jak tarcza
      box.style.setProperty('--hpy',(p*70).toFixed(1)+'px');
      box.style.setProperty('--hs',(1-Math.abs(hy)/90).toFixed(3));
      // refleks: co 7 s przelatuje po runach, poza tym podąża za nachyleniem
      const cyc=(t-2700)%7000, sweep=t>2700&&cyc<1500;
      const gl=sweep ? lerp(-.15,1.15,cyc/1500) : .5 + hy/26;
      const gi=sweep ? 1 : clamp(Math.abs(hy)/14,0,.55);
      box.style.setProperty('--gl',gl.toFixed(3));
      glint.style.opacity=glint.classList.contains('on')?gi.toFixed(2):0;
      if(visible) raf=requestAnimationFrame(frame);
    }
    function reset(){
      ['--hy','--hx','--hz','--hpy','--hs','--gl'].forEach(v=>box.style.removeProperty(v));
      glint.style.opacity=0;
    }
    raf=requestAnimationFrame(frame);
  }

  /* ---------- WARIANT 1: przechył kart ---------- */
  function initCards(){
    document.querySelectorAll('.service-card,.case-card').forEach(card=>{
      const g=document.createElement('span'); g.className='fx-glare'; g.setAttribute('aria-hidden','true');
      card.appendChild(g);
      let raf=0,ev=null;
      card.addEventListener('pointermove',e=>{
        if(!on('fx-tilt')) return;
        ev=e; if(raf) return;
        raf=requestAnimationFrame(()=>{
          raf=0; const r=card.getBoundingClientRect();
          const nx=(ev.clientX-r.left)/r.width-.5, ny=(ev.clientY-r.top)/r.height-.5;
          card.classList.add('fx-on');
          card.style.setProperty('--ry',(nx*9).toFixed(2)+'deg');
          card.style.setProperty('--rx',(-ny*7).toFixed(2)+'deg');
          card.style.setProperty('--gx',((nx+.5)*100).toFixed(1)+'%');
          card.style.setProperty('--gy',((ny+.5)*100).toFixed(1)+'%');
          card.style.setProperty('--ga',(115+nx*50).toFixed(0)+'deg');
        });
      });
      card.addEventListener('pointerleave',()=>{
        card.classList.remove('fx-on');
        ['--rx','--ry','--ga'].forEach(v=>card.style.removeProperty(v));
      });
    });
  }

  /* ---------- WARIANT 1: paralaksa przy przewijaniu ---------- */
  function initParallax(){
    const hero=document.getElementById('hero');
    const imgs=[...document.querySelectorAll('.case-img')];
    let raf=0;
    const apply=()=>{
      raf=0;
      if(!on('fx-tilt')){ hero&&['--pe','--pc'].forEach(v=>hero.style.removeProperty(v)); imgs.forEach(i=>i.style.removeProperty('--pi')); return; }
      if(hero){
        const y=clamp(scrollY,0,hero.offsetHeight);
        hero.style.setProperty('--pe',(y*.32).toFixed(1)+'px');      // przepływ energii: tło, wolniej
        hero.style.setProperty('--pc',(y*.12).toFixed(1)+'px');      // tekst: lekko
      }
      const vh=innerHeight;
      imgs.forEach(box=>{
        const r=box.getBoundingClientRect(); if(r.bottom<0||r.top>vh) return;
        const rel=((r.top+r.height/2)-vh/2)/vh;
        box.style.setProperty('--pi',(rel*-26).toFixed(1)+'px');
      });
    };
    const req=()=>{ if(!raf) raf=requestAnimationFrame(apply); };
    addEventListener('scroll',req,{passive:true}); addEventListener('resize',req);
    root.addEventListener('fx-change',req); apply();
  }
})();
