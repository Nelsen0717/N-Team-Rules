type St={n:string;v:number|null};const SW=['沒做','低','及格','好'],sk=(v:number|null|undefined):v is number=>v!=null&&v>=0&&v<=3,stuck=(s:(number|null)[])=>{if(sk(s[5])&&s[5]<2)return 5;const o=[1,2,3,5,0].filter(i=>sk(s[i]));if(!o.length)return -1;const m=o.reduce((a,i)=>(s[i]as number)<(s[a]as number)?i:a,o[0]);return(s[m]as number)<2?m:-1};
function Radar({s:a,b,sel,pick,hot}:{s:St[];b?:(number|null)[];sel:number;pick:(i:number)=>void;hot:number}){const{T,x,g,s}=useT(),n=a.length,R=84;
const p=(i:number,r:number)=>{const q=-Math.PI/2+i*2*Math.PI/n;return[160+r*Math.cos(q),142+r*Math.sin(q)]},rg=(k:number)=>a.map((_,i)=>p(i,R*k/3).join(',')).join(' '),pl=(v:(number|null)[])=>v.flatMap((q,i)=>sk(q)?[p(i,R*q/3).join(',')]:[]).join(' ');
return<svg viewBox='0 0 320 284' width='100%' style={{display:'block',maxWidth:420,margin:'0 auto'}} role='img' aria-label={a.map(q=>q.n+' '+(sk(q.v)?SW[q.v]:NA)).join('、')}>
{[1,2,3].map(k=><polygon key={k} points={rg(k)} fill='none' stroke={k==2?T.dataviz.other:T.border.default} strokeDasharray={k==2?'4 3':undefined}/>)}
{a.map((_,i)=>{const[u,w]=p(i,R);return<line key={i} x1={160} y1={142} x2={u} y2={w} stroke={T.border.default}/>})}
{b&&<polygon points={pl(b)} fill='none' stroke={x.secondary} strokeWidth={1.5} strokeDasharray='2 3'/>}
<polygon points={pl(a.map(q=>q.v))} fill={g+'33'} stroke={g} strokeWidth={2}/>
{a.map((q,i)=>{if(!sk(q.v))return null;const[u,w]=p(i,R*q.v/3);return<circle key={i} cx={u} cy={w} r={5} fill={i==hot?x.primary:g} stroke={T.bg.base} strokeWidth={2}/>})}
{a.map((q,i)=>{const[u,w]=p(i,R+30),A=i==sel;return<g key={'l'+i} {...tap(()=>pick(i))}><circle cx={u} cy={w} r={25} fill={A?T.fill.secondary:'transparent'}/><text x={u} y={w-3} style={s(A?x.primary:x.secondary,13,A?600:400)}>{q.n}</text><text x={u} y={w+13} style={s(i==hot?x.primary:x.secondary,12,i==hot?600:400)}>{sk(q.v)?SW[q.v]+(i==hot?'・最卡':''):NA}</text></g>})}</svg>}
