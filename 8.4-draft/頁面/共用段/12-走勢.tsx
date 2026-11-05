function Trend({w,goal}:{w:[string,number,number|null][];goal:number|null}){const{T,x,g,s}=useT(),m=Math.max(5,goal||0,...w.map(a=>a[1])),L=w.length-1,X=(i:number)=>8+i*248/L,Y=(v:number)=>118-v/m*100,ln=(j:1|2)=>w.flatMap((a,i)=>a[j]==null?[]:[X(i)+','+Y(a[j]as number)]).join(' '),a=w[L][1],b=w[L][2],ya=Y(a),yb=b==null?0:Math.max(Y(b),ya+14);
return<svg viewBox='0 0 320 146' width='100%' style={{display:'block',maxWidth:560,margin:'0 auto'}} role='img' aria-label={'這週來問 '+a+' 位'+(b==null?'':'，成交 '+b+' 位')}>
{goal!=null&&<g><line x1={8} x2={256} y1={Y(goal)} y2={Y(goal)} stroke={T.dataviz.other} strokeDasharray='4 3'/><text x={8} y={Y(goal)-4} style={{...s(x.secondary,12),textAnchor:'start'}}>{'目標 '+goal+' 位'}</text></g>}
<polyline points={ln(1)} fill='none' stroke={g} strokeWidth={2.5}/><polyline points={ln(2)} fill='none' stroke={x.primary} strokeWidth={1.5}/>
<text x={262} y={ya+4} style={{...s(g,12,600),textAnchor:'start'}}>{'來問 '+a}</text>{b!=null&&<text x={262} y={yb+4} style={{...s(x.primary,12),textAnchor:'start'}}>{'成交 '+b}</text>}
{w.map((q,i)=><text key={i} x={X(i)} y={138} style={{...s(x.secondary,12),textAnchor:i?i==L?'end':'middle':'start'}}>{q[0]}</text>)}</svg>}
