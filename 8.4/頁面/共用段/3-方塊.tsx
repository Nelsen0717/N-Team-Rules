type Tl={l:string;v:number|string|null;u?:string;d?:string;h?:string;tone?:'up'|'down';f:string;s:string};
function useN(v:number){const[k,sk]=useState(v<10||RM()?1:0);useEffect(()=>{if(k==1)return;const t0=performance.now();let r=0;const f=(t:number)=>{const q=Math.min(1,(t-t0)/500);sk(1-Math.pow(1-q,3));if(q<1)r=requestAnimationFrame(f)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[]);return v*k}
function Tile({a}:{a:Tl}){const{T,x,g,s}=useT(),[o,so]=useState(false),m=a.v==null||a.v==='',n=useN(typeof a.v=='number'?a.v:0),sm={fontSize:14,fontWeight:500};
return<div {...tap(()=>so(!o))} style={{border:'1px solid '+(o?g:T.border.default),borderRadius:12,padding:'12px 14px'}}>
<div style={{...s(x.secondary,13),display:'flex',justifyContent:'space-between',gap:4}}><span>{a.l}</span><span aria-hidden>ⓘ</span></div>
<div style={{...s(m?x.secondary:x.primary,m?15:26,600),lineHeight:1.3,padding:'4px 0'}}>{m?NA:<span><span style={{whiteSpace:'nowrap'}}>{typeof a.v=='number'?Math.round(n).toLocaleString():a.v}</span>{a.u&&<span style={sm}>{' '+a.u}</span>}</span>}</div>
<div style={s(a.tone=='up'?x.successDeep:a.tone=='down'?x.warningDeep:x.secondary,13)}>{m?a.h:a.d}</div>
{o&&<div style={{...s(x.secondary,13),marginTop:4}}>{'怎麼算：'+a.f+'。出處：'+a.s}</div>}</div>}
function Tiles({t}:{t:Tl[]}){const{x,s}=useT();return<div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(136px,1fr))',gap:8}}>{t.map((a,i)=><Tile key={i} a={a}/>)}</div><div style={{...s(x.secondary,13),marginTop:6}}>點數字看怎麼算和出處</div></div>}
