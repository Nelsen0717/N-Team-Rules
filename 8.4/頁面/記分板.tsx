import{Page,Section,Text,Properties,useGrokTheme,useState,useEffect,useRef}from'grok/canvas';
const D:Data={sample:true,shop:'小森甜點',date:'2026-11-09',day:7,goal:3,dealC:2,ask:12,askPrev:9,deal:2,dealPrev:1,funnel:[12,5,4,4,null],est:['到店'],score:[2,1,3,3,null,1],base:[2,1,3,2,2,1],cycle:21,bands:[16,9,15],newAsk:12,weeks:[['10/19',5,1],['10/26',8,2],['11/2',9,1],['11/9',12,2]],ch:[['IG',6,1],['Google 地圖',3,1],['介紹',2,0],['走進來',1,0]],ai:[3,8],aiDiff:'比上週多 1 題',made:9,askAll:34,note:['IG 來問最多：6 位裡成交 1 位。','洽談掉最多：12 位來問，只有 5 位聊到報價。']};
type N=number|null;type Data={sample:boolean;shop:string;date:string;day:N;goal:N;dealC:N;ask:N;askPrev:N;deal:N;dealPrev:N;funnel:N[];est:string[];score:N[];base:N[];cycle:N;bands:N[];newAsk:N;weeks:[string,N,N][];ch:[string,N,N][];ai:[N,N];aiDiff:string;made:N;askAll:N;note:string[]};
//@共用 1 13 2 3 4 5 6 7 10 12
const G='#315E4C',O='#E5622B',NA='還沒有資料',RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches,CSS='[role=button]{cursor:pointer}#root{font-variant-numeric:tabular-nums}svg text{text-anchor:middle}.f{display:flex;align-items:center;gap:10px}.w,.w *{animation-play-state:paused!important}@keyframes f{from{opacity:0;transform:translateY(8px)}}@keyframes a{from{opacity:0}}@keyframes w{from{transform:scaleX(0)}}@keyframes d{from{stroke-dashoffset:var(--c)}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}',an=(n:string,d:number,i=0)=>({animation:n+' '+d+'ms cubic-bezier(.2,.8,.2,1) '+i*60+'ms backwards'}),tap=(f:()=>void)=>({role:'button',tabIndex:0,onClick:f,onKeyDown:(e:{key:string;preventDefault():void})=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();f()}}});
function useT(){const T=useGrokTheme(),x=T.text;return{T,x,g:T.kind=='dark'?'#7FB79F':G,s:(c:string=x.primary,f=15,w=400)=>({color:c,fill:c,fontSize:f,fontWeight:w,lineHeight:1.5})}}
const Pr=({a}:{a:any[][]})=><Properties items={a.map(([label,value])=>({label,value}))}/>;
function Next({k,t,d}:{k:string;t:string;d?:string}){const{x,g,s}=useT();return<div style={{borderLeft:'4px solid '+g,padding:'6px 0 6px 14px'}}><div style={s(x.secondary,13,600)}>{k}</div><div style={{...s(x.primary,20,600),lineHeight:1.4}}>{t}</div>{d&&<div style={s(x.secondary,14)}>{d}</div>}</div>}
type Tl={l:string;v:number|string|null;u?:string;d?:string;h?:string;tone?:'up'|'down';f:string;s:string};
function useN(v:number){const[k,sk]=useState(v<10||RM()?1:0);useEffect(()=>{if(k==1)return;const t0=performance.now();let r=0;const f=(t:number)=>{const q=Math.min(1,(t-t0)/500);sk(1-Math.pow(1-q,3));if(q<1)r=requestAnimationFrame(f)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[]);return v*k}
function Tile({a}:{a:Tl}){const{T,x,g,s}=useT(),[o,so]=useState(false),m=a.v==null||a.v==='',n=useN(typeof a.v=='number'?a.v:0),sm={fontSize:14,fontWeight:500};
return<div {...tap(()=>so(!o))} style={{border:'1px solid '+(o?g:T.border.default),borderRadius:12,padding:'12px 14px'}}>
<div style={{...s(x.secondary,13),display:'flex',justifyContent:'space-between',gap:4}}><span>{a.l}</span><span aria-hidden>ⓘ</span></div>
<div style={{...s(m?x.secondary:x.primary,m?15:26,600),lineHeight:1.3,padding:'4px 0'}}>{m?NA:<span><span style={{whiteSpace:'nowrap'}}>{typeof a.v=='number'?Math.round(n).toLocaleString():a.v}</span>{a.u&&<span style={sm}>{' '+a.u}</span>}</span>}</div>
<div style={s(a.tone=='up'?x.successDeep:a.tone=='down'?x.warningDeep:x.secondary,13)}>{m?a.h:a.d}</div>
{o&&<div style={{...s(x.secondary,13),marginTop:4}}>{'怎麼算：'+a.f+'。出處：'+a.s}</div>}</div>}
function Tiles({t}:{t:Tl[]}){const{x,s}=useT();return<div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(136px,1fr))',gap:8}}>{t.map((a,i)=><Tile key={i} a={a}/>)}</div><div style={{...s(x.secondary,13),marginTop:6}}>點數字看怎麼算和出處</div></div>}
function Stage({children}:{children:any}){const r=useRef<HTMLDivElement>(null),[v,sv]=useState(false);useEffect(()=>{const go=()=>sv(true),t=setTimeout(go,8000),o=new IntersectionObserver(e=>{if(e[0].isIntersecting)go()},{threshold:.2});if(r.current)o.observe(r.current);return()=>{clearTimeout(t);o.disconnect()}},[]);return<div ref={r} className={v?'':'w'}>{children}</div>}
type Fs={l:string;p:number|null;t:string};
function Funnel({s:a,hot,pass,sel,pick,m}:{s:Fs[];hot:number;pass?:number;sel:number;pick:(i:number)=>void;m?:boolean}){const{T,x,g,s}=useT();
return<div>{a.map((f,i)=>{const H=i==hot,A=i==sel,lo=f.p!=null&&pass!=null&&f.p<pass;return<div key={i} {...tap(()=>pick(A?-1:i))} style={{padding:'8px 0 4px',minHeight:44,boxSizing:'border-box'}}>
<div style={{margin:'0 auto',width:100-i*30/Math.max(1,a.length-1)+'%',position:'relative',height:14,borderRadius:7,background:A?T.fill.secondaryHover:T.fill.secondary}}><div style={{...(m?an('w',700,i):{}),margin:'0 auto',height:'100%',borderRadius:7,width:(f.p!=null?Math.max(.04,f.p)*100:0)+'%',background:H?m?O:x.primary:g,opacity:lo&&!H?.55:1}}/>
{pass!=null&&[50-pass*50,50+pass*50].map(l=><i key={l} style={{position:'absolute',left:l+'%',top:-3,bottom:-3,width:2,background:x.primary,opacity:.6}}/>)}</div>
<div style={{...s(H||A?x.primary:x.secondary,14,H||A?600:400),textAlign:'center'}}>{f.l+'・'+(f.p==null?NA:f.t)+(H?' ← 斷在這':'')}</div></div>})}</div>}
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
function HB({b}:{b:[string,number,string][]}){const{T,x,g,s}=useT(),m=Math.max(1,...b.map(a=>a[1]));return<div style={{display:'grid',gap:10}}>{b.map(([l,v,t])=><div key={l}><div style={{...s(x.primary,14),display:'flex',justifyContent:'space-between',gap:8}}><span>{l}</span><span style={{color:x.secondary}}>{t}</span></div><div style={{height:8,borderRadius:4,background:T.fill.secondary}}><div style={{height:8,borderRadius:4,width:v/m*100+'%',background:g}}/></div></div>)}</div>}
function Trend({w,goal}:{w:[string,number,number|null][];goal:number|null}){const{T,x,g,s}=useT(),m=Math.max(5,goal||0,...w.map(a=>a[1])),L=w.length-1,X=(i:number)=>8+i*248/L,Y=(v:number)=>118-v/m*100,ln=(j:1|2)=>w.flatMap((a,i)=>a[j]==null?[]:[X(i)+','+Y(a[j]as number)]).join(' '),a=w[L][1],b=w[L][2],ya=Y(a),yb=b==null?0:Math.max(Y(b),ya+14);
return<svg viewBox='0 0 320 146' width='100%' style={{display:'block',maxWidth:560,margin:'0 auto'}} role='img' aria-label={'這週來問 '+a+' 位'+(b==null?'':'，成交 '+b+' 位')}>
{goal!=null&&<g><line x1={8} x2={256} y1={Y(goal)} y2={Y(goal)} stroke={T.dataviz.other} strokeDasharray='4 3'/><text x={8} y={Y(goal)-4} style={{...s(x.secondary,12),textAnchor:'start'}}>{'目標 '+goal+' 位'}</text></g>}
<polyline points={ln(1)} fill='none' stroke={g} strokeWidth={2.5}/><polyline points={ln(2)} fill='none' stroke={x.primary} strokeWidth={1.5}/>
<text x={262} y={ya+4} style={{...s(g,12,600),textAnchor:'start'}}>{'來問 '+a}</text>{b!=null&&<text x={262} y={yb+4} style={{...s(x.primary,12),textAnchor:'start'}}>{'成交 '+b}</text>}
{w.map((q,i)=><text key={i} x={X(i)} y={138} style={{...s(x.secondary,12),textAnchor:i?i==L?'end':'middle':'start'}}>{q[0]}</text>)}</svg>}
//@共用完
const F=['詢問','洽談','成交','到店','回流'],S6=['①曝光','②接待','③成交','④預約','⑤交付','⑥回流'],SF=['上個月新來問幾位','10 位來問，幾位聊到報價或約時間','10 位報了價，幾位買單','10 位約好，幾位真的到','10 位用完，幾位說好或留評論','10 位買過的，幾位超過 3 個週期沒回'],RL=['熟客','開始變少','很久沒來','新客'],RH=['不打擾；請他留評論、介紹朋友','過 2 個週期問候近況，不推銷','進叫回名單，先排以前來得多的；同一位最多 3 次','商家頁和貼文讓人看得到，來問一小時內回'],RP=['接待官','接待官＋詩人','接待官＋詩人','行銷官＋說客'];
const dif=(c:N,p:N)=>c==null||p==null?{}:{d:'上週 '+p+'，'+(c>p?'多 '+(c-p):c<p?'少 '+(p-c):'一樣'),tone:c>p?'up' as const:c<p?'down' as const:undefined};
export default function App(){
const b=[D.bands[0],D.bands[1],D.bands[2],D.newAsk],has=b.slice(0,3).every(z=>z!=null),L=has?(b[0]as number)+(b[1]as number)+(b[2]as number):0,oR=L?(b[2]as number)/L:0,st=!has?-1:L>=20&&oR>1/3?2:3,k=stuck(D.score),cy=D.cycle,nS=D.score.filter(sk).length,fm=Math.max(1,...D.funnel.map(v=>v??0)),hasF=D.funnel.some(v=>v!=null);
let dk=-1,dd=0;D.funnel.forEach((v,i)=>{const u=D.funnel[i-1];if(i&&v!=null&&u!=null&&u-v>dd){dd=u-v;dk=i}});
const[sel,ss]=useState(st<0?0:st),[rs,srs]=useState(k<0?1:k),[fs,sfs]=useState(-1),wk=D.weeks.filter(w=>w[1]!=null),hg=D.dealC!=null&&D.goal!=null;
const W=['不到 1 個週期','1–3 個週期沒來','超過 3 個週期','還沒買過、這個月新來問'].map((a,i)=>a+(cy&&i<3?'（'+['0–'+cy,cy+'–'+cy*3,cy*3+'+'][i]+' 天）':''));
return(<Page title={'每週記分板｜'+(D.shop||NA)+(D.sample?'（示範店）':'')} summary={'更新到 '+(D.date||NA)+'。數字來自客人名單，逐位去重；點擊和讚不算。'}>
<style>{CSS}</style>
<Tiles t={[{l:'這週來問',v:D.ask,u:'位',...dif(D.ask,D.askPrev),h:'名單還沒有人',f:'這週第一次來問的人，逐位去重',s:'客人名單「第一次來問」欄'},{l:'這週成交',v:D.deal,u:'位',...dif(D.deal,D.dealPrev),h:'名單還沒填成交日',f:'這週第一次付錢的人，逐位去重',s:'客人名單「成交日」欄'},{l:'這期成交／目標',v:hg?D.dealC+' / '+D.goal:null,u:'位',d:hg?((D.dealC as number)>=(D.goal as number)?'已達標':'還差 '+((D.goal as number)-(D.dealC as number))+' 位'):undefined,tone:hg&&(D.dealC as number)>=(D.goal as number)?'up':undefined,h:'還沒定兩週目標',f:'兩週期內成交人數，對上兩週目標',s:'客人名單＋目標與節奏'},{l:'這一期',v:D.day!=null?'第 '+D.day+' / 14':null,u:'天',d:D.day!=null?'還有 '+Math.max(0,14-D.day)+' 天':undefined,f:'今天是這個兩週期的第幾天',s:'目標與節奏的開始日'}]}/>
{D.sample&&<Text>示範店：數字是假的，只示範版面；真的店照客人名單填。</Text>}
{D.ask==null&&!hasF&&<Next k={NA} t='把客人名單放進公司大腦' d={'要有來源和最後來店日，下週日我算第一份；不知道的寫「'+NA+'」，不當 0。'}/>}
{st>=0&&<Next k='這兩週先做' t={st==2?'叫回 '+b[2]+' 位很久沒來的回頭客':'讓新的人看到你、來問就接住'} d={(k>=0?'最卡的站是 '+S6[k]+'；':'')+'照 333：'+(st==2?'很久沒來超過名單三分之一。':'老客還穩。')}/>}
<Section heading='客人三圈：誰在哪一圈' caption={'點一圈或下面四格，看怎麼算和做法；週期＝'+(cy?cy+' 天':NA)}>
<Stage><Rings n={b} lab={RL} sel={sel} pick={ss} hot={st}/></Stage>
<Pr a={[['這一圈',RL[sel]+(sel==st?'・這兩週起點':'')],['人數',b[sel]==null?NA:b[sel]+' 位'],['怎麼算',W[sel]+'；從名單的最後來店日算'],['做法',RH[sel]],['誰做',RP[sel]],['流失',has?b[2]+' / '+L+' 位買過的（'+Math.round(oR*100)+'%）':NA],['出處','客人名單']]}/>
</Section>
<Section heading='漏斗：客人走到哪一站' caption={hasF?(dk>0?'掉最多：'+F[dk-1]+'→'+F[dk]+'，少 '+dd+' 位；點一站看細節':'還看不出哪一站掉最多'):undefined}>
{hasF?<Funnel s={F.map((n,i)=>{const v=D.funnel[i],e=D.est.includes(n);return{l:n,p:v==null?null:v/fm,t:(e?'約 ':'')+v+' 位'+(e?'（估計）':'')}})} hot={dk} sel={fs} pick={sfs}/>:<Text>客人名單還沒有人；補上後這裡會變成五站漏斗。</Text>}
{hasF&&fs>=0&&<Text>{F[fs]+'：'+(D.funnel[fs]==null?NA:D.funnel[fs]+' 位')+(D.est.includes(F[fs])?'，照發文表推算，以客人名單為準':'，從客人名單逐位數')+'。'}</Text>}
</Section>
<Section heading='六站：跟診斷時比' caption={nS>=4?'綠色＝這週，灰點線＝診斷時；虛線圈＝及格；點一站看怎麼算':'六站要有四站有數字才畫'}>
{nS>=4?<Radar s={S6.map((n,i)=>({n,v:D.score[i]}))} b={D.base} sel={rs} pick={srs} hot={k}/>:null}
<Pr a={nS>=4?[[S6[rs],(sk(D.score[rs])?SW[D.score[rs]as number]:NA)+'；診斷時 '+(sk(D.base[rs])?SW[D.base[rs]as number]:NA)],['怎麼算',SF[rs]+'；照診斷同一張門檻表換成 0–3 分'],['出處','客人名單，逐位去重；不到 10 位不打分']]:S6.map((n,i)=>[n,sk(D.score[i])?SW[D.score[i]as number]:NA])}/>
</Section>
{wk.length>1&&<Section heading='趨勢：每週來問和成交' caption='每週第一次來問、付錢的人，逐位去重；出處：客人名單'>
<Trend w={wk.map(w=>[w[0],w[1]as number,w[2]]as [string,number,N])} goal={D.goal}/>
</Section>}
{D.ch.some(c=>c[1]!=null)&&<Section heading='哪個管道最多人來問' caption='出處：客人名單「來源」欄'>
<HB b={D.ch.filter(c=>c[1]!=null).sort((p,q)=>(q[1]as number)-(p[1]as number)).map(c=>[c[0],c[1]as number,c[1]+' 位・成交 '+(c[2]??NA)]as [string,number,string])}/>
</Section>}
<Section heading='其他數字'><Pr a={[['AI 推薦',D.ai[0]!=null&&D.ai[1]?D.ai[0]+' / '+D.ai[1]+' 題有推薦'+(D.aiDiff?'，'+D.aiDiff:'')+'（出處：AI 推薦題目查詢）':NA],['投入產出',D.made!=null&&D.askAll!=null?'累計做了 '+D.made+' 件，累計 '+D.askAll+' 位來問（出處：發文表、客人名單）':NA]]}/></Section>
{D.note.filter(Boolean).length>0&&<Section heading='這週看到的'>{D.note.filter(Boolean).slice(0,3).map((n,i)=><Text key={i}>{n}</Text>)}</Section>}
<Text>{'不知道的寫「'+NA+'」，不當 0；標「估計」的是照發文表推算，以客人名單為準。'}</Text>
</Page>)}
