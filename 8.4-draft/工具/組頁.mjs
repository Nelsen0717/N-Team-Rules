// 把 共用段/ 的塊原樣放進每頁 //@共用 和 //@共用完 之間，算大小和 sha256，寫 manifest。用法：node 組頁.mjs
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const R=new URL('..',import.meta.url).pathname.replace(/%[0-9A-F%]+/gi,decodeURIComponent),H=path.join(R,'頁面'),P=path.join(H,'共用段');
const parts=Object.fromEntries(fs.readdirSync(P).map(f=>[f.split('-')[0],fs.readFileSync(path.join(P,f),'utf8')]));
for(const f of['自介卡','診斷報告','記分板','進度總表']){const p=path.join(H,f+'.tsx'),s=fs.readFileSync(p,'utf8');
 const o=s.replace(/\/\/@共用 ([0-9 ]+)\n[\s\S]*?\/\/@共用完\n/,(_,k)=>'//@共用 '+k+'\n'+k.split(' ').map(i=>parts[i]).join('')+'//@共用完\n');
 if(o===s&&!s.includes('//@共用 '))throw new Error(f+' 沒有 //@共用');fs.writeFileSync(p,o)}
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),files={};
const walk=d=>{for(const n of fs.readdirSync(d).sort()){const a=path.join(d,n);if(fs.statSync(a).isDirectory())walk(a);else{const b=fs.readFileSync(a),k=path.relative(R,a);files[k]=sha(b);console.log(String(b.length).padStart(6),sha(b),k)}}};walk(H);
fs.writeFileSync(path.join(R,'manifest.json'),JSON.stringify({'版本':'8.4-draft','說明':'草稿，版本.json 不指向這裡；審完才建 8.4/','檔案':files},null,1)+'\n');
