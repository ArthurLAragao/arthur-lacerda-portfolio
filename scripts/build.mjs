import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
export const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export function loadData(){const context=vm.createContext({window:{},URL,Intl});for(const file of ['config.js','certificates.js','render.js'])vm.runInContext(fs.readFileSync(path.join(base,'dist',file),'utf8'),context,{filename:file});return context.window;}
export function build(){const {PORTFOLIO:data,CERTIFICATES:certificates,PortfolioRender:r}=loadData();const file=path.join(base,'dist/index.html');let html=fs.readFileSync(file,'utf8');for(const key of ['projects','socials','certificates','skills','now','soft','contact']){const start=`<!-- render:${key}:start -->`,end=`<!-- render:${key}:end -->`;const a=html.indexOf(start),b=html.indexOf(end);if(a<0||b<a)throw Error('Missing render marker: '+key);html=html.slice(0,a+start.length)+'\n'+r[key](key==='certificates'?certificates:data)+'\n'+html.slice(b);}
html=html.replace(/<title>.*?<\/title>/,`<title>${r.esc(data.name)} — Software e Sistemas</title>`).replace(/(<span class="name" data-profile="name">).*?(<\/span>)/,`$1${r.esc(data.name)}$2`).replace(/(<span id="certificate-count">).*?(<\/span>)/,`$1${r.validCertificates(certificates).length}$2`);
html=html.replace(/(<div class="hero-kicker"><span class="rule-mark"><\/span>).*?(<\/div>)/,`$1 ${r.esc(data.role.toUpperCase())}$2`).replace(/(<div class="hero-caption"><span class="mono">.*?<\/span><p>).*?(<\/p>)/,`$1${r.esc(data.positioning)}$2`);
html=html.replace(/<link rel="canonical"[^>]*>/g,'');
html=html.replace(/class="mono certificate-total"(?: hidden)?/,`class="mono certificate-total"${certificates.length?'':' hidden'}`);
const url=/^https:\/\//.test(data.siteUrl)&&r.safeUrl(data.siteUrl)?data.siteUrl.replace(/\/$/,''):'';
html=html.replace(/(<meta property="og:image" content=")[^"]*(">)/,`$1${r.esc(url?url+'/assets/social.png':'assets/social.png')}$2`);
html=html.replace(/(<meta name="twitter:image" content=")[^"]*(">)/,`$1${r.esc(url?url+'/assets/social.png':'assets/social.png')}$2`);
if(url)html=html.replace('</head>',`<link rel="canonical" href="${r.esc(url)}">\n</head>`);
const graph={'@context':'https://schema.org','@graph':[{'@type':'Person',name:data.name,description:'Estudante de Ciência da Computação na UNIFOR',...(url?{url}:{}),sameAs:[data.github,data.linkedin,data.instagram].filter(v=>r.safeUrl(v))},{'@type':'WebSite',name:data.name+' — Software e Sistemas',inLanguage:'pt-BR',...(url?{url}:{})}]};
html=html.replace(/<script type="application\/ld\+json">.*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(graph).replace(/</g,'\\u003c')}</script>`);
fs.writeFileSync(file,html);return {projects:data.projects.length,certificates:r.validCertificates(certificates).length,bytes:Buffer.byteLength(html)};}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(JSON.stringify(build()));
