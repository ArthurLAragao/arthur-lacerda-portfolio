import fs from 'node:fs';
import path from 'node:path';
import {base} from './build.mjs';
const files={three:['build/three.module.min.js','build/three.core.min.js'],gsap:['dist/gsap.min.js','dist/ScrollTrigger.min.js'],lenis:['dist/lenis.min.js']};
fs.mkdirSync(path.join(base,'dist/vendor'),{recursive:true});
for(const [pkg,list] of Object.entries(files))for(const file of list){const name=path.basename(file).replace('three.module.min.js','three.module.js').replace('three.core.min.js','three.core.js');let source=fs.readFileSync(path.join(base,'node_modules',pkg,file),'utf8');source=source.replaceAll('./three.core.min.js','./three.core.js');fs.writeFileSync(path.join(base,'dist/vendor',name),source);}
for(const pkg of Object.keys(files)){const dir=path.join(base,'node_modules',pkg);const license=fs.readdirSync(dir).find(f=>/^license/i.test(f));if(license)fs.copyFileSync(path.join(dir,license),path.join(base,'licenses',pkg+'-LICENSE.txt'));}
console.log('Dependências fixas copiadas localmente.');
