import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const cwd=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),site=path.join(cwd,'dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.ttf':'font/ttf','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
http.createServer(async(req,res)=>{
 const u=new URL(req.url,'http://127.0.0.1:4174');
 if(req.method==='POST'&&u.pathname==='/results'){let b='';for await(const part of req)b+=part;fs.writeFileSync(path.join(cwd,'reports/qa-results.json'),b);res.end('saved');return;}
 const root=site;
 let relative=u.pathname.replace(/^\/(?:site|baseline)\//,'');if(relative==='qa.html')relative='../qa.html';
 const file=u.pathname==='/qa.html'?path.join(cwd,'tests/qa.html'):path.resolve(root,relative||'index.html');
 if(!file.startsWith(root)&&file!==path.join(cwd,'tests/qa.html')){res.writeHead(403);res.end();return;}
 if(!fs.existsSync(file)){res.writeHead(404);res.end('Not found');return;}
 let b=fs.readFileSync(file);const flags=u.searchParams;
 if(path.extname(file)==='.html'&&u.pathname!='/qa.html'){
  let html=b.toString();const bootstrap=`<script>window.qaErrors=[];addEventListener('error',e=>qaErrors.push(e.message||'resource error'));window.qaMetrics={cls:0,lcp:0};try{new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)qaMetrics.cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>qaMetrics.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true})}catch{}${flags.has('system')||flags.has('reduced')||flags.has('touch')?`const nativeMM=window.matchMedia.bind(window);window.matchMedia=q=>{const m=nativeMM(q);let forced=q.includes('prefers-color-scheme')?${flags.get('system')==='dark'}:q.includes('prefers-reduced-motion')?${flags.has('reduced')}:q.includes('hover')||q.includes('pointer')?${!flags.has('touch')}:null;if(forced!==null)Object.defineProperty(m,'matches',{value:forced});return m};`:''}${flags.has('fallback')?`const nativeContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes('webgl')?null:nativeContext.call(this,type,...args)};`:''}</script>`;
  html=html.replace('<head>','<head>'+bootstrap);if(flags.has('large'))html=html.replace('</head>','<style>html{font-size:200%}</style></head>');
  if(flags.has('fixture'))html=html.replace('src="config.js"','src="config.js?fixture=1"').replace('src="certificates.js"','src="certificates.js?fixture=1"');
  if(flags.has('nojs'))html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  b=Buffer.from(html);
 }
 if(file.endsWith('config.js')&&flags.has('fixture'))b=Buffer.from(b+`\nwindow.PORTFOLIO.email='test@example.com';window.PORTFOLIO.github='https://example.com';window.PORTFOLIO.resume='assets/social.png';`);
 if(file.endsWith('certificates.js')&&flags.has('fixture'))b=Buffer.from(b+`\nwindow.CERTIFICATES=Array.from({length:7},(_,i)=>({id:'fixture-'+i,title:'FIXTURE DE TESTE '+i,issuer:'EMISSOR FICTÍCIO PARA QA',issueDate:'2026-09-0'+(i+1),category:i%2?'development':'cloud-devops',skills:['Teste de viewer'],image:'assets/social.png',credentialUrl:'https://example.com/verify',featured:i>4,description:'Dado sintético apenas no servidor de testes.'}));`);
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(b);
}).listen(4174,'127.0.0.1',()=>console.log('QA http://127.0.0.1:4174/qa.html'));
