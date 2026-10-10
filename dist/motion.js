window.mountPortfolioMotion=(isPaused,signal)=>{
  const {gsap,ScrollTrigger,Lenis}=window;
  gsap.registerPlugin(ScrollTrigger);
  const fine=matchMedia('(hover: hover) and (pointer: fine)'),root=document.documentElement;
  const cursor=document.querySelector('.cursor-ring');
  let context=null,lenis=null,active=false,tick=null,pointerFrame=0;
  let px=0,py=0,cx=0,cy=0,pointerSeen=false;
  const on=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal});
  function stop(){
    if(tick)gsap.ticker.remove(tick);tick=null;lenis?.destroy();lenis=null;
    context?.revert();context=null;cancelAnimationFrame(pointerFrame);pointerFrame=0;
    root.classList.remove('motion-enhanced','cursor-active');
    document.querySelectorAll('[data-pointer-layer]').forEach(el=>{gsap.killTweensOf(el);el.style.removeProperty('transform');el.removeAttribute('data-pointer-layer');});
    active=false;
  }
  function update(){
    stop();if(isPaused()||document.hidden)return;active=true;
    root.classList.add('motion-enhanced');
    // Native touch and keyboard scrolling stay intact; only wheel interpolation is enhanced.
    lenis=new Lenis({duration:.85,smoothWheel:fine.matches,syncTouch:false,anchors:false,prevent:node=>node.closest('dialog,nav')});
    lenis.on('scroll',ScrollTrigger.update);tick=time=>lenis.raf(time*1000);gsap.ticker.add(tick);
    context=gsap.context(()=>{
      document.querySelectorAll('.reveal').forEach(el=>{
        if(el.dataset.revealed||el.getBoundingClientRect().top<innerHeight*.95)return;
        gsap.fromTo(el,{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true,onEnter:()=>{el.dataset.revealed='true';}}});
      });
      document.querySelectorAll('section h2').forEach(el=>{
        if(el.getBoundingClientRect().top<innerHeight)return;
        gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:1.05,delay:.08,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
      });
      document.querySelectorAll('main>section').forEach((el,i)=>{
        ScrollTrigger.create({trigger:el,start:'top center',end:'bottom center',onEnter:()=>root.style.setProperty('--section-tone',String(i%2?'.018':'0')),onEnterBack:()=>root.style.setProperty('--section-tone',String(i%2?'.018':'0'))});
      });
    });
    ScrollTrigger.refresh();
  }
  function pointerTick(){pointerFrame=0;if(!active||!fine.matches||isPaused())return;
    cx+=(px-cx)*.2;cy+=(py-cy)*.2;cursor.style.transform=`translate3d(${cx}px,${cy}px,0)`;
    if(Math.abs(px-cx)+Math.abs(py-cy)>.1)pointerFrame=requestAnimationFrame(pointerTick);
  }
  on(document,'pointermove',e=>{if(!active||!fine.matches||e.pointerType==='touch'||isPaused())return;
    px=e.clientX;py=e.clientY;if(!pointerSeen){cx=px;cy=py;pointerSeen=true;}root.classList.add('cursor-active');
    cursor.classList.toggle('over-link',!!e.target.closest('a,button,summary'));if(!pointerFrame)pointerFrame=requestAnimationFrame(pointerTick);
  },{passive:true});
  on(document,'pointerleave',()=>root.classList.remove('cursor-active'));
  on(document,'focusin',()=>root.classList.remove('cursor-active'));
  document.querySelectorAll('.project-media,.social-row').forEach(el=>{
    const target=el.querySelector('.preview,.social-arrow');if(!target)return;
    on(el,'pointermove',e=>{if(!active||!fine.matches||e.pointerType==='touch'||isPaused())return;const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;target.dataset.pointerLayer='true';gsap.to(target,{x:x*5,y:y*4,rotateY:el.matches('.project-media')?x*2:0,duration:.5,ease:'power3.out',overwrite:true});},{passive:true});
    on(el,'pointerleave',()=>{gsap.killTweensOf(target);target.style.removeProperty('transform');});
  });
  on(document,'click',e=>{const link=e.target.closest('a[href^="#"]');if(!link||!active||!lenis||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||link.classList.contains('skip'))return;const target=document.getElementById(link.hash.slice(1));if(!target)return;e.preventDefault();history.pushState(null,'',link.hash);target.tabIndex=-1;target.focus({preventScroll:true});lenis.scrollTo(target,{offset:innerWidth<=800?-90:-24,duration:.85});});
  on(document,'visibilitychange',update);on(fine,'change',update);update();
  return {update,destroy:stop};
};
