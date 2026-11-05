// 用 Grok Bot 真正的 Canvas runtime 開頁、截圖、量版面。用法：
//   node 截圖.mjs <輸出資料夾> [頁.tsx ...]          四種組合各截一張整頁
// 需要：/exec-daemon/canvas-runtime、esbuild、playwright（PW_DIR 指向裝了 playwright 的資料夾）。
import fs from 'node:fs';import http from 'node:http';import path from 'node:path';import{createRequire}from'node:module';
const RT='/exec-daemon/canvas-runtime/canvas-runtime-grok.esm.js',req=createRequire((process.env.PW_DIR||'/tmp/mock')+'/package.json');
const{chromium}=req('playwright'),esbuild=req('esbuild');
export function compile(src,mode){ // 跟 host 一樣：grok/canvas 從全域拿，單一 default export
 const s=src.replace(/^import\{([^}]*)\}from'grok\/canvas';/m,(_,n)=>'const{'+n+'}=globalThis;');
 return esbuild.transformSync(s,{loader:'tsx',format:'esm',jsx:'transform',jsxFactory:'React.createElement',jsxFragment:'React.Fragment'}).code;
}
export async function serve(){
 const pages=new Map(),rt=fs.readFileSync(RT);
 const srv=http.createServer((q,r)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u=='/rt.js'){r.setHeader('content-type','text/javascript');return r.end(rt)}
  if(u.startsWith('/app/')){r.setHeader('content-type','text/javascript');return r.end(pages.get(u.slice(5)))}
  r.setHeader('content-type','text/html');r.end(`<!doctype html><html lang=zh-Hant><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><body><div id=root></div><script type=module>import{mountCanvas}from'/rt.js';mountCanvas('/app/'+encodeURIComponent(${JSON.stringify(u.slice(1))}))</script>`)});
 await new Promise(o=>srv.listen(0,o));return{pages,port:srv.address().port,close:()=>srv.close()};
}
export const open=async(b,port,name,{w,scheme,rm})=>{const c=await b.newContext({viewport:{width:w,height:w<500?760:900},deviceScaleFactor:w<500?2:1,colorScheme:scheme,reducedMotion:rm?'reduce':'no-preference',hasTouch:w<500});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});await p.goto(`http://localhost:${port}/${encodeURIComponent(name)}`);await p.waitForSelector('[data-canvas-page-title]');return{c,p,errs}};
if(process.argv[1]&&path.resolve(process.argv[1])==new URL(import.meta.url).pathname.replace(/%[0-9A-F%]+/gi,decodeURIComponent)){
 const[out,...files]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
 const s=await serve(),b=await chromium.launch();
 for(const f of files){const name=path.basename(f,'.tsx');s.pages.set(name,compile(fs.readFileSync(f,'utf8')));
  for(const[w,scheme]of[[360,'light'],[360,'dark'],[1280,'light'],[1280,'dark']]){const{c,p,errs}=await open(b,s.port,name,{w,scheme});await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await p.waitForTimeout(1200);
   const sw=await p.evaluate(()=>document.documentElement.scrollWidth);await p.screenshot({path:`${out}/${name}-${w}-${scheme=='light'?'淺色':'深色'}.png`,fullPage:true});
   console.log(name,w,scheme,'scrollWidth',sw,errs.length?'錯：'+errs.join(' | '):'');await c.close()}}
 await b.close();s.close();
}
