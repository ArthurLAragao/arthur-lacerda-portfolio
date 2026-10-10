(() => {
  'use strict';
  const data=window.PORTFOLIO, render=window.PortfolioRender;
  if(!data||!render)return;
  const root=document.documentElement, $=s=>document.querySelector(s);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'), fine=matchMedia('(hover: hover) and (pointer: fine)'), system=matchMedia('(prefers-color-scheme: dark)');
  const listeners=new AbortController(), signal=listeners.signal, cleanups=[];
  const on=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal});
  let paused=false,toastTimer,introTimer,scene=null,sceneLoading=false,motionController=null,scrollFrame=0,disposed=false;
  try{paused=localStorage.getItem('arthur-lacerda-motion')==='paused';}catch{}
  const blocks={projects:'projects',socials:'socials','skill-list':'skills',now:'now','soft-skill-list':'soft','contact-action':'contact'};
  Object.entries(blocks).forEach(([id,key])=>{const element=document.getElementById(id);if(element)element.innerHTML=render[key](data);});
  const certificates=render.validCertificates(window.CERTIFICATES||[]);
  $('#certificate-content').innerHTML=render.certificates(certificates);$('#certificate-count').textContent=certificates.length;
  document.querySelectorAll('[data-profile="name"]').forEach(el=>el.textContent=data.name);
  $('.signature').textContent=data.name+'.';$('.footer-brand').textContent=data.name+'.';$('.brand').setAttribute('aria-label',data.name+', início');
  $('.hero-caption p').textContent=data.positioning;$('.hero-kicker').lastChild.textContent=' '+data.role.toUpperCase();
  document.title=data.name+' — Software e Sistemas';
  function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),6000);}
  function motionState(){const off=paused||reduced.matches;root.classList.toggle('motion-paused',off);$('#motion').setAttribute('aria-pressed',String(off));$('#motion').setAttribute('aria-label',off?'Ativar animações':'Pausar animações');$('#motion span').textContent=off?'off':'on';if(off)document.body.classList.remove('intro');scene?.update();motionController?.update();if(!off)queueMicrotask(loadScene);}
  motionState();on(reduced,'change',motionState);
  on($('#motion'),'click',()=>{if(reduced.matches){toast('Movimento reduzido está ativo no sistema. A cena permanece estática.');return;}paused=!paused;try{localStorage.setItem('arthur-lacerda-motion',paused?'paused':'on');}catch{}motionState();});
  let introSeen=false;try{introSeen=sessionStorage.getItem('arthur-lacerda-intro')==='seen';sessionStorage.setItem('arthur-lacerda-intro','seen');}catch{}
  if(!introSeen&&!paused&&!reduced.matches&&!location.hash){document.body.classList.add('intro');introTimer=setTimeout(()=>document.body.classList.remove('intro'),2200);}
  function themeState(){const dark=root.dataset.theme==='dark';$('#theme').setAttribute('aria-pressed',String(dark));$('#theme').setAttribute('aria-label','Tema escuro');$('.theme-label').textContent=dark?'Escuro':'Claro';$('meta[name="theme-color"]').content=dark?'#050505':'#f4f4f1';}
  themeState();let themeTransition=false;on($('#theme'),'click',async e=>{if(themeTransition)return;const apply=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('arthur-lacerda-theme',root.dataset.theme);}catch{}themeState();};if(!document.startViewTransition||paused||reduced.matches){apply();return;}themeTransition=true;const x=e.clientX||innerWidth/2,y=e.clientY||40,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));try{const transition=document.startViewTransition(apply);await transition.ready;await root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},{duration:550,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)'}).finished;}catch{}finally{themeTransition=false;}});
  on(system,'change',()=>{let saved;try{saved=localStorage.getItem('arthur-lacerda-theme');}catch{}if(!['dark','light'].includes(saved)){root.dataset.theme=system.matches?'dark':'light';themeState();}});
  const menu=$('.menu-toggle');
  function closeMenu(returnFocus=false){menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open');if(returnFocus)menu.focus();}
  on(menu,'click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);});
  on(document,'keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
  on(document,'click',e=>{if(!$('.sidebar').contains(e.target))closeMenu();});
  on(document,'focusin',e=>{if(!$('.sidebar').contains(e.target))closeMenu();});
  document.querySelectorAll('nav a').forEach(link=>on(link,'click',()=>{closeMenu();const target=$(link.hash);if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}));
  const modalState=new WeakMap();
  document.querySelectorAll('dialog').forEach(dialog=>{
    let pointerOutside=false;
    on(dialog.querySelector('.dialog-close'),'click',()=>dialog.close());
    on(dialog,'keydown',e=>{if(e.key!=='Tab')return;const items=[...dialog.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}});
    on(dialog,'pointerdown',e=>{const b=dialog.getBoundingClientRect();pointerOutside=e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom;});
    on(dialog,'click',e=>{const b=dialog.getBoundingClientRect();if(pointerOutside&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close();pointerOutside=false;});
    on(dialog,'close',()=>{const state=modalState.get(dialog);document.body.style.overflow=state?.overflow||'';state?.trigger?.focus({preventScroll:true});});
  });
  function openDialog(dialog,trigger){modalState.set(dialog,{trigger,overflow:document.body.style.overflow});dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.dialog-close').focus();}
  on(document,'click',async e=>{
    const pButton=e.target.closest('[data-project]');
    if(pButton){const p=data.projects.find(p=>p.id===pButton.dataset.project);if(!p)return;$('#dialog-content').innerHTML=`<span class="eyebrow">${p.concept?'ESTUDO CONCEITUAL':'PROJETO'} / ${render.esc(p.category)}</span><h2 id="dialog-title">${render.esc(p.name)}</h2>${render.projectDetail(p)}`;openDialog($('#project-dialog'),pButton);}
    const cButton=e.target.closest('[data-certificate]');
    if(cButton){const c=certificates.find(c=>c.id===cButton.dataset.certificate);if(!c)return;$('#certificate-dialog-content').innerHTML=`<h2 id="certificate-title">${render.esc(c.title)}</h2>${render.certificateDetail(c)}`;openDialog($('#certificate-dialog'),cButton);}
    const filter=e.target.closest('[data-filter]');
    if(filter){let count=0;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));document.querySelectorAll('.certificate').forEach(c=>{c.hidden=filter.dataset.filter!=='all'&&c.dataset.category!==filter.dataset.filter;if(!c.hidden)count++;});$('#certificate-filter-status').textContent=`${count} certificado${count===1?'':'s'} exibido${count===1?'':'s'}.`;}
    if(e.target.closest('.copy-email')){try{await navigator.clipboard.writeText(data.email);toast('Email copiado.');}catch{toast('Não foi possível copiar. Selecione o endereço de email e copie manualmente.');}}
  });
  on(document,'error',e=>{if(e.target instanceof HTMLImageElement&&!e.target.closest('.system-scene')){e.target.classList.add('failed');const text=document.createElement('p');text.className='image-error';text.textContent='A imagem não pôde ser carregada. Os detalhes e links continuam disponíveis.';e.target.after(text);}},{capture:true});
  const sections=[...document.querySelectorAll('main>section')],links=[...document.querySelectorAll('nav a')];
  function updateScroll(){const max=root.scrollHeight-innerHeight,progress=max>0?Math.min(1,scrollY/max):0;$('.rail-progress i').style.transform=`scale${innerWidth<=800?'X':'Y'}(${progress})`;let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<innerHeight*.42)current=section;}const id=current.id;links.forEach(link=>{const active=link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});$('.section-counter').textContent=String(sections.indexOf(current)+1).padStart(2,'0')+' / 07';scrollFrame=0;}
  on(window,'scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});on(window,'resize',updateScroll);updateScroll();
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('ready');observer.observe(el);});cleanups.push(()=>observer.disconnect());}
  async function loadScene(){
    if(disposed||sceneLoading||paused||reduced.matches)return;
    if((navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2)||matchMedia('(forced-colors: active)').matches)return;
    sceneLoading=true;
    try{const module=await import('./scene.js');if(!disposed)scene=module.mountSystemScene($('#system-scene'),()=>paused||reduced.matches,signal);}catch{$('#system-scene').dataset.mode='fallback';}
  }
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))loadScene();});observer.observe($('#system-scene'));cleanups.push(()=>observer.disconnect());}
  else loadScene();
  async function loadMotion(){
    if(disposed)return;
    try{for(const src of ['vendor/gsap.min.js','vendor/ScrollTrigger.min.js','vendor/lenis.min.js','motion.js']){await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.head.append(script);});if(disposed)return;}motionController=window.mountPortfolioMotion(()=>paused||reduced.matches,signal);}catch{/* Native scroll and CSS reveals remain available. */}
  }
  if('requestIdleCallback' in window){const idle=requestIdleCallback(loadMotion,{timeout:1800});cleanups.push(()=>cancelIdleCallback(idle));}else{const timer=setTimeout(loadMotion,300);cleanups.push(()=>clearTimeout(timer));}
  const cta=$('.contact-object');let ctaFrame=0,cx=0,cy=0;
  on(cta,'pointermove',e=>{if(!fine.matches||paused||reduced.matches)return;const b=cta.getBoundingClientRect();cx=e.clientX-b.left;cy=e.clientY-b.top;if(!ctaFrame)ctaFrame=requestAnimationFrame(()=>{cta.style.setProperty('--cx',cx+'px');cta.style.setProperty('--cy',cy+'px');ctaFrame=0;});},{passive:true});
  $('#year').textContent=new Date().getFullYear();
  function clock(){if(!document.hidden)$('#local-time').textContent=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Fortaleza',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' BRT';}clock();const timer=setInterval(clock,60000);
  function cleanup(){if(disposed)return;disposed=true;listeners.abort();cleanups.forEach(fn=>fn());scene?.destroy();motionController?.destroy();clearInterval(timer);clearTimeout(toastTimer);clearTimeout(introTimer);cancelAnimationFrame(scrollFrame);cancelAnimationFrame(ctaFrame);}
  on(window,'pagehide',e=>{if(!e.persisted)cleanup();});
})();
