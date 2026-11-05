const RB:[number,number][]=[[14,62],[62,96],[96,130],[134,158]];
function Rings({n,lab,sel,pick,hot}:{n:(number|null)[];lab:string[];sel:number;pick:(i:number)=>void;hot:number}){const{T,x,g,s}=useT(),C=160,v=n.map(a=>a??0),per=Math.max(1,Math.ceil(Math.max(...v)/90)),col=(i:number)=>i==hot?O:i<2?g:T.dataviz.other;
const dots=v.map((a,i)=>{const r0=RB[i][0]+5,r1=RB[i][1]-5,m=Math.round(a/per),o:number[][]=[];for(let t=0;t<m;t++){const u=(t+.5)/m,rr=Math.sqrt(r0*r0+u*(r1*r1-r0*r0));const q=(t*2.39996+i*.7)%(Math.PI*2);o.push([C+Math.cos(q)*rr,C+Math.sin(q)*rr])}return o});
return<div><svg viewBox='0 0 320 320' width='100%' style={{display:'block',maxWidth:440,margin:'0 auto'}} role='img' aria-label={lab.map((a,i)=>a+' '+(n[i]==null?NA:n[i]+' 位')).join('、')}>
{[62,96,130,158].map((r,i)=><circle key={r} cx={C} cy={C} r={r} fill='none' stroke={T.border.strong}/>)}
{dots.map((o,i)=><g key={i} opacity={sel==i?1:.65} style={an('a',400,i*3)}>{o.map((q,k)=><circle key={k} cx={q[0]} cy={q[1]} r={3} fill={col(i)}/>)}</g>)}
<circle cx={C} cy={C} r={14} fill={x.primary}/><text x={C} y={C+4} style={s(T.bg.base,12,600)}>店</text>
{RB.map((b,i)=><text key={i} x={C} y={C-(b[0]+b[1])/2+5} style={s(x.primary,13,600)} stroke={T.bg.base} strokeWidth={4} paintOrder='stroke'>{lab[i]}</text>)}
<text x={0} y={316} style={{...s(x.secondary,12),textAnchor:'start'}}>{per>1?'一點＝'+per+' 位':'一點一位'}</text></svg>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginTop:8}}>{lab.map((a,i)=><div key={i} {...tap(()=>pick(i))} aria-pressed={sel==i} style={{...s(sel==i?x.primary:x.secondary,13,sel==i?600:400),border:'1px solid '+(sel==i?g:T.border.default),borderRadius:8,padding:'4px 2px',minHeight:44,textAlign:'center'}}>{a}<div style={{fontSize:n[i]==null?12:15,fontWeight:600}}>{n[i]==null?NA:n[i]}</div></div>)}</div></div>}
