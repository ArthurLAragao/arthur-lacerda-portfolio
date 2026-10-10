import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {base,loadData} from './build.mjs';
const dir=path.join(base,'dist');
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(dir,name),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,''),{filename:name});
const {PORTFOLIO:d,CERTIFICATES:c,PortfolioRender:r}=loadData();
if(r.validCertificates(c).length!==c.length)throw Error('Certificado incompleto ou com data/categoria inválida.');
for(const list of [d.projects,c])if(new Set(list.map(x=>x.id)).size!==list.length)throw Error('IDs repetidos.');
for(const [name,url] of Object.entries({github:d.github,linkedin:d.linkedin,resume:d.resume,instagram:d.instagram}))if(url&&!r.safeUrl(url))throw Error('URL inválida: '+name);
if(d.email&&!r.emailValid(d.email))throw Error('Email inválido.');
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
for(const [,url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!/^(?:https?:|mailto:|data:)/.test(url)&&!fs.existsSync(path.join(dir,url.split(/[?#]/)[0])))throw Error('Asset ausente: '+url);}
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);if(new Set(ids).size!==ids.length)throw Error('IDs HTML repetidos.');
for(const [,anchor]of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(anchor))throw Error('Âncora ausente: '+anchor);
for(const css of ['styles.css','tokens.css','experience.css']){const source=fs.readFileSync(path.join(dir,css),'utf8');if((source.match(/{/g)||[]).length!==(source.match(/}/g)||[]).length)throw Error('Chaves CSS inconsistentes: '+css);}
console.log('PASS: sintaxe JS, contratos de dados, assets, IDs, âncoras e chaves CSS. Não substitui ESLint ou typecheck.');
