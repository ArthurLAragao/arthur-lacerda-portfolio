import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {base} from './build.mjs';
const root=path.join(base,'dist'),port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.ttf':'font/ttf','.webp':'image/webp'};
http.createServer((req,res)=>{let target;try{target=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400).end();return;}if(target===root)target=path.join(root,'index.html');if(!target.startsWith(root+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(target).pipe(res);}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}`));
