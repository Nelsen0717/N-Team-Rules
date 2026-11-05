type Fs={l:string;p:number|null;t:string};
function Funnel({s:a,hot,pass,sel,pick,m}:{s:Fs[];hot:number;pass?:number;sel:number;pick:(i:number)=>void;m?:boolean}){const{T,x,g,s}=useT();
return<div>{a.map((f,i)=>{const H=i==hot,A=i==sel,lo=f.p!=null&&pass!=null&&f.p<pass;return<div key={i} {...tap(()=>pick(A?-1:i))} style={{padding:'8px 0 4px',minHeight:44,boxSizing:'border-box'}}>
<div style={{margin:'0 auto',width:100-i*30/Math.max(1,a.length-1)+'%',position:'relative',height:14,borderRadius:7,background:A?T.fill.secondaryHover:T.fill.secondary}}><div style={{...(m?an('w',700,i):{}),margin:'0 auto',height:'100%',borderRadius:7,width:(f.p!=null?Math.max(.04,f.p)*100:0)+'%',background:H?m?O:x.primary:g,opacity:lo&&!H?.55:1}}/>
{pass!=null&&[50-pass*50,50+pass*50].map(l=><i key={l} style={{position:'absolute',left:l+'%',top:-3,bottom:-3,width:2,background:x.primary,opacity:.6}}/>)}</div>
<div style={{...s(H||A?x.primary:x.secondary,14,H||A?600:400),textAlign:'center'}}>{f.l+'・'+(f.p==null?NA:f.t)+(H?' ← 斷在這':'')}</div></div>})}</div>}
