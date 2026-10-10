import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {loadData,base} from '../scripts/build.mjs';
const {PORTFOLIO:d,CERTIFICATES:c,PortfolioRender:r}=loadData();
test('URLs recusam scripts, credenciais e caminhos externos; aceitam assets no file://',()=>{for(const u of ['javascript:alert(1)','data:text/html,oi','https://u:p@example.com','assets/../secret','//evil.test','assets/a\nb'])assert.equal(r.safeUrl(u),'');assert.equal(r.safeUrl('assets/cv.pdf'),'assets/cv.pdf');assert.equal(r.safeUrl('https://example.com'),'https://example.com/');});
test('Nenhuma credencial inventada publicada',()=>{assert.equal(c.length,0);assert.match(r.certificates(c),/Conhecimento que vira prática/);assert.doesNotMatch(r.certificates(c),/data-certificate=/);});
test('Certificados válidos são ordenados e links ausentes não viram botões fictícios',()=>{const list=[{id:'old',title:'TESTE',issuer:'FIXTURE',issueDate:'2024-01-01',category:'other',skills:[]},{id:'new',title:'TESTE 2',issuer:'FIXTURE',issueDate:'2026-09-01',category:'development',skills:[],featured:true}];assert.equal(r.validCertificates(list)[0].id,'new');assert.match(r.certificates(list),/data-certificate="new"/);assert.doesNotMatch(r.certificateDetail(list[0]),/href=/);});
test('Dados não viram HTML executável',()=>{assert.equal(r.esc('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;');const malicious={...d,projects:[{...d.projects[0],name:'<script>x</script>'}]};assert.doesNotMatch(r.projects(malicious),/<script>/);});
test('Contatos vazios são texto, não ações inoperantes',()=>{assert.doesNotMatch(r.socials({...d,github:'',linkedin:'',instagram:'',resume:''}),/<button|href=/);assert.doesNotMatch(r.contact(d),/mailto:/);});
test('HTML estático mantém conteúdo sem JS e a ordem de seções',()=>{const html=fs.readFileSync(path.join(base,'dist/index.html'),'utf8');const ids=[...html.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);assert.deepEqual(ids,['home','work','connect','certificates','about','skills','contact']);for(const p of d.projects)assert.ok(html.includes(p.name));assert.match(html,/href="#main"/);assert.match(html,/id="main" tabindex="-1"/);});

test('Identidade e redes reais consistentes no HTML estático e JSON-LD',()=>{
 const html=fs.readFileSync(path.join(base,'dist/index.html'),'utf8');
 assert.equal(d.name,'Arthur Lacerda');
 assert.equal(d.github,'https://github.com/ArthurLAragao');
 assert.equal(d.instagram,'https://www.instagram.com/arthurlaragao/');
 assert.equal(d.linkedin,'https://www.linkedin.com/in/arthur-lacerda-213788343/');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.deepEqual(graph['@graph'][0].sameAs,[d.github,d.linkedin,d.instagram]);
 assert.equal((r.socials(d).match(/rel="noopener noreferrer"/g)||[]).length,3);
 assert.doesNotMatch(html,/Caderno aberto|id="lab"|em processo|EM CONSTRUÇÃO CONTÍNUA/);
});
