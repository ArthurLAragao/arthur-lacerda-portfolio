import * as THREE from './vendor/three.module.js';

export function mountSystemScene(element, isPaused, signal) {
  const stage=element.querySelector('.scene-stage');
  const canvas=document.createElement('canvas');
  canvas.setAttribute('aria-hidden','true');
  const context=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power'});
  if(!context){element.dataset.mode='fallback';return {update(){},destroy(){}};}
  const renderer=new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:true});
  const mobile=matchMedia('(max-width: 800px)').matches;
  const count=mobile?80:150, lanes=mobile?9:15;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.75));
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,30);
  camera.position.set(0,0,7.9);
  const group=new THREE.Group();scene.add(group);
  const positions=[],chaos=[],linePositions=[],lineChaos=[];
  for(let i=0;i<count;i++)for(let j=0;j<lanes;j++){
    const u=i/count*Math.PI*2,v=(j/(lanes-1)-.5)*2,r=1.65+.32*Math.cos(u*3)+v*.42;
    positions.push(r*Math.cos(u),.8*Math.sin(u*3)+v*.5,r*Math.sin(u));
    const seed=i*lanes+j;
    chaos.push(Math.sin(seed*127.1)*3.6,Math.cos(seed*73.7)*2.7,Math.sin(seed*39.3)*3);
  }
  function edge(a,b){for(const k of [a,b]){linePositions.push(...positions.slice(k*3,k*3+3));lineChaos.push(...chaos.slice(k*3,k*3+3));}}
  for(let i=0;i<count;i++)for(let j=0;j<lanes;j++){
    edge(i*lanes+j,((i+1)%count)*lanes+j);
    if(j<lanes-1&&i%3===0)edge(i*lanes+j,i*lanes+j+1);
  }
  const uniforms={uAssemble:{value:0},uTime:{value:0},uPointer:{value:new THREE.Vector2(10,10)},uColor:{value:new THREE.Color()},uDpr:{value:renderer.getPixelRatio()}};
  const vertex=`attribute vec3 aChaos;
    uniform float uAssemble,uTime,uDpr;
    uniform vec2 uPointer;
    varying float vDepth;
    void main(){
      vec3 p=mix(aChaos,position,uAssemble);
      p.y+=sin(position.x*2.+uTime*.45)*.024*uAssemble;
      vec2 delta=p.xy-uPointer;
      float field=exp(-dot(delta,delta)*1.5)*.12*uAssemble;
      p.xy+=normalize(delta+vec2(.001))*field;
      vec4 mv=modelViewMatrix*vec4(p,1.);
      vDepth=smoothstep(10.,5.,-mv.z);
      gl_Position=projectionMatrix*mv;
      gl_PointSize=clamp(16./-mv.z,1.4,3.)*uDpr;
    }`;
  const lineMaterial=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:`uniform vec3 uColor;uniform float uAssemble;varying float vDepth;void main(){gl_FragColor=vec4(uColor,mix(.08,.46,vDepth)*mix(.04,1.,uAssemble));}`,transparent:true,depthWrite:false});
  const pointMaterial=new THREE.ShaderMaterial({uniforms,vertexShader:vertex,fragmentShader:`uniform vec3 uColor;varying float vDepth;void main(){float d=length(gl_PointCoord-.5);float a=1.-smoothstep(.25,.5,d);gl_FragColor=vec4(uColor,a*mix(.2,.95,vDepth));}`,transparent:true,depthWrite:false});
  function geometry(p,c){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('aChaos',new THREE.Float32BufferAttribute(c,3));return g;}
  const pointGeometry=geometry(positions,chaos),lineGeometry=geometry(linePositions,lineChaos);
  group.add(new THREE.LineSegments(lineGeometry,lineMaterial),new THREE.Points(pointGeometry,pointMaterial));
  stage.append(canvas);
  let frame=0,visible=false,destroyed=false,lost=false,elapsed=0,last=0,drawn=0,rx=.35,ry=.5,targetX=.35,targetY=.5,scroll=0,samples=0,total=0;
  element.dataset.quality=mobile?'compact':'full';
  const on=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal});
  const allowed=()=>visible&&!document.hidden&&!isPaused()&&!lost&&!destroyed;
  function resize(){const box=stage.getBoundingClientRect();if(!box.width||!box.height)return;renderer.setSize(box.width,box.height,false);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resize();
  function theme(){uniforms.uColor.value.set(document.documentElement.dataset.theme==='light'?'#252522':'#deded7');}
  const themeObserver=new MutationObserver(theme);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});theme();
  function tick(time){frame=0;if(!allowed())return;
    const interval=1000/60;
    if(drawn&&time-drawn<interval-.3){frame=requestAnimationFrame(tick);return;}
    drawn=time-((time-drawn)%interval);
    const dt=last?Math.min((time-last)/1000,.05):0;last=time;elapsed+=dt;
    const damp=1-Math.exp(-dt*5);rx+=(targetX-rx)*damp;ry+=(targetY-ry)*damp;
    uniforms.uAssemble.value=1-Math.pow(1-Math.min(elapsed/2.1,1),4);uniforms.uTime.value=elapsed;
    group.rotation.set(rx+scroll*.16,ry+scroll*.4+Math.sin(elapsed*.12)*.035,-.2);
    camera.position.z=7.9-scroll*.35;
    renderer.render(scene,camera);
    element.classList.add('scene-enhanced');element.dataset.mode='webgl';element.dataset.motion='enabled';
    if(dt>0&&samples<120){samples++;total+=dt;if(samples===120){element.dataset.frameMs=(total/samples*1000).toFixed(1);if(total/samples>.026){renderer.setPixelRatio(1);uniforms.uDpr.value=1;resize();}}}
    frame=requestAnimationFrame(tick);
  }
  function update(){cancelAnimationFrame(frame);frame=0;last=drawn=0;
    element.dataset.motion=allowed()?'enabled':isPaused()?'static':'suspended';
    if(isPaused()||lost){element.classList.remove('scene-enhanced');element.dataset.motion='static';element.dataset.mode='fallback';}
    if(allowed())frame=requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.01});observer.observe(element);
  const hero=document.querySelector('#home');
  on(hero,'pointermove',e=>{if(e.pointerType==='touch'||!allowed())return;const b=element.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;targetY=.5+Math.max(-.2,Math.min(.2,x*.22));targetX=.35+Math.max(-.15,Math.min(.15,y*.16));uniforms.uPointer.value.set(x*5,-y*5);},{passive:true});
  on(hero,'pointerleave',()=>{targetX=.35;targetY=.5;uniforms.uPointer.value.set(10,10);});
  on(window,'scroll',()=>{scroll=Math.min(1,Math.max(0,scrollY/hero.offsetHeight));},{passive:true});
  on(document,'visibilitychange',update);
  on(canvas,'webglcontextlost',e=>{e.preventDefault();lost=true;update();});
  on(canvas,'webglcontextrestored',()=>{lost=false;update();});
  return {update,destroy(){destroyed=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();themeObserver.disconnect();pointGeometry.dispose();lineGeometry.dispose();pointMaterial.dispose();lineMaterial.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();element.classList.remove('scene-enhanced');}};
}
