import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(entry.name.startsWith('.')||['node_modules','work'].includes(entry.name))continue;const p=path.join(dir,entry.name);if(entry.isDirectory())await walk(p);else if(entry.name.endsWith('.html'))files.push(p);}}
await walk(root);
let errors=[];
for(const file of files){
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const link=match[1];if(/^(https?:|mailto:|data:)/.test(link))continue;
  const [pathname,hash]=link.split('#');let target=pathname.startsWith('/')?path.join(root,pathname):path.resolve(path.dirname(file),pathname||path.basename(file));
  try{if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);if(hash&&target.endsWith('.html')){const text=await readFile(target,'utf8');if(!text.includes(`id="${hash}"`))throw Error('Missing fragment');}}catch(e){errors.push(`${path.relative(root,file)}: broken link ${link} (${e.message})`);}
 }
 if(!html.includes('http-equiv="refresh"')){
  if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${file}: expected one h1`);
  for(const image of html.matchAll(/<img\b[^>]*>/g))if(!image[0].includes('alt='))errors.push(`${file}: image missing alt`);
  if(!html.includes('name="description"'))errors.push(`${file}: missing description`);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}else console.log(`Passed: ${files.length} HTML pages; local links, fragment targets, images, page headings, and descriptions.`);
