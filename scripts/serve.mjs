import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (req,res) => {
 try {
  const url = new URL(req.url, `http://localhost:${port}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.split('/').some(p=>p.startsWith('.') && p!=='')) {res.writeHead(403);res.end('Forbidden');return;}
  let file=path.resolve(root, '.'+pathname);
  if(file !== path.resolve(root) && !file.startsWith(root)){res.writeHead(403);res.end('Forbidden');return;}
  if((await stat(file)).isDirectory()) {
   if(!pathname.endsWith('/')){res.writeHead(301,{Location:pathname+'/'+url.search});res.end();return;}
   file=path.join(file,'index.html');
  }
  res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'});
  res.end(await readFile(file));
 } catch { res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html'))); }
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
