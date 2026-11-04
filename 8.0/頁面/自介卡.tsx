import{Page,Section,Status,useGrokTheme,useState,useEffect}from'grok/canvas';
const D={sample:false,name:'',shop:'',date:'',img:'',promise:'',now:'',team:[['','','','']],beat:[['','','']]};
export default function App(){
const T=useGrokTheme(),x=T.text,G='#315E4C',O='#E5622B',[on,so]=useState(false),[op,sp]=useState(-1),[b,sb]=useState(0),[bad,sbad]=useState(false);
useEffect(()=>{const t=setTimeout(()=>so(true),80);return()=>clearTimeout(t)},[]);
const rm=typeof matchMedia=='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches,
nm=D.name||'大總管',tm=D.team.filter(r=>r[0]),bt=D.beat.filter(r=>r[0]),be=bt[b]||bt[0],
st=(s:string)=>s=='上工'||s=='到職'?'到職':s=='暫停'?'暫停':'待請',k=tm.filter(r=>st(r[2])=='到職').length,
tr=(i=0,p='opacity .5s,transform .5s')=>rm?'none':p.split(',').map(q=>q+' cubic-bezier(.2,.8,.2,1) '+i*70+'ms').join(','),
up=(i=0)=>({opacity:on?1:0,transform:on?'none':'translateY(12px)',transition:tr(i)}),
t=(c=x.primary,f=15,v=400)=>({color:c,fontSize:f,fontWeight:v,lineHeight:1.5,overflowWrap:'anywhere' as const}),
cd={border:'1px solid '+T.border.subtle,borderRadius:16,padding:'12px 14px',background:T.bg.base};
return(<Page lang='zh-Hant' palette={[G,O]} title={'自介卡｜'+nm+(D.sample?'（範例）':'')} summary={(D.shop||'你的店')+'的大總管'+(D.date&&'・'+D.date+' 上任')}>
<div style={{...up(),background:G,borderRadius:20,padding:'22px 18px',color:'#fff'}}>
<div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:76,height:76,borderRadius:38,overflow:'hidden',background:'#F3E9D7',border:'3px solid #fff',flexShrink:0,transform:on?'scale(1)':'scale(.6)',transition:tr(1,'transform .6s')}}>{D.img&&!bad?<img src={D.img} alt={nm} onError={()=>sbad(true)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>:<svg viewBox='0 0 76 76' width='100%' height='100%' role='img' aria-label={nm}><circle cx='38' cy='31' r='15' fill='#F2C9A0'/><path d='M23 30c0-12 8-18 15-18s15 6 15 18c-3-6-8-9-15-9s-12 3-15 9z' fill='#4A3428'/><path d='M12 76c2-16 13-24 26-24s24 8 26 24z' fill='#FFF8EC'/><path d='M27 76V56l11 6 11-6v20z' fill={G}/><circle cx='33' cy='33' r='1.6' fill='#4A3428'/><circle cx='43' cy='33' r='1.6' fill='#4A3428'/><path d='M33 39c3 3 7 3 10 0' stroke='#B5543A' strokeWidth='1.6' fill='none' strokeLinecap='round'/><circle cx='44' cy='65' r='2.4' fill={O}/><circle cx='47' cy='62' r='1.8' fill='#F6D57B'/></svg>}</div>
<div style={{minWidth:0}}><div style={t('#fff',13)}>{(D.shop||'你的店')+'的大總管'}</div><div style={t('#fff',24,700)}>{'我是 '+nm}</div></div></div>
<div style={{...t('#fff',16,500),marginTop:14}}>{D.promise||'你只要說一聲，我派給對的人，看過再交給你。'}</div>
<div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:14}}>{[[tm.length,' 位員工'],[k,' 位到職'],[bt.length,' 個固定時間']].filter(q=>q[0]).map(q=>q.join('')).map((s,i)=><span key={s} style={{...up(i+2),...t('#fff',13,600),background:'rgba(255,255,255,.16)',borderRadius:99,padding:'4px 12px'}}>{s}</span>)}</div>
{D.now&&<div style={{...up(5),marginTop:14,background:'#fff',borderRadius:14,padding:'10px 12px',borderLeft:'5px solid '+O}}><div style={t(O,12,700)}>現在這一步</div><div style={t('#202A26',15,600)}>{D.now}</div></div>}</div>
<Section heading={'我的團隊・'+tm.length+' 位'} {...(tm.length?{caption:'點一位，看他負責什麼'}:{})}>
{tm.length?<div style={{display:'grid',gap:8}}>{tm.length>1&&<div style={{height:6,borderRadius:3,background:T.border.subtle,overflow:'hidden'}}><div style={{height:6,background:G,width:on?k/tm.length*100+'%':0,transition:tr(2,'width .9s')}}/></div>}
{tm.map(([n,r,s,f],i)=>{const o=op==i,z=st(s);return<div key={i} role='button' onClick={()=>sp(o?-1:i)} style={{...cd,...up(i+1),cursor:'pointer',borderColor:o?G:T.border.subtle,borderStyle:z=='待請'?'dashed':'solid'}}>
<div style={{display:'flex',alignItems:'center',gap:10,minHeight:40}}><div style={{width:36,height:36,borderRadius:18,background:z=='暫停'?T.border.subtle:G,color:z=='暫停'?x.secondary:'#fff',display:'grid',placeItems:'center',fontWeight:700,flexShrink:0}}>{n[0]}</div>
<div style={{flex:1,minWidth:0}}><div style={t(x.primary,15,600)}>{n}</div>{r&&<div style={t(x.secondary,13)}>{r}</div>}</div><Status tone={z=='到職'?'success':'neutral'}>{z}</Status></div>
<div style={{display:'grid',gridTemplateRows:o?'1fr':'0fr',transition:tr(0,'grid-template-rows .24s')}}><div style={{overflow:'hidden'}}><div style={{...t(x.secondary,14),paddingTop:8}}>{'第一份成品：'+(f||'還沒定，請他時一起定')}<br/>{z=='暫停'?'暫停中，名冊改回上工就繼續。':z=='待請'?'還沒請，你點頭我再請。':'有事找我，我派給他。'}</div></div></div></div>})}</div>
:<div style={t(x.secondary)}>還沒有員工，請第一位前我會先問你。</div>}</Section>
<Section heading='固定節奏'>{bt.length?<div>{bt.map((r,i)=>{const a=be==r;return<div key={i} role='button' onClick={()=>sb(i)} style={{display:'flex',gap:12,cursor:'pointer',...up(i+1)}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'center',width:20,flexShrink:0}}><div style={{width:a?18:12,height:a?18:12,marginTop:a?4:7,borderRadius:9,background:a?G:T.bg.base,border:'3px solid '+G,boxSizing:'border-box',transition:tr(0,'width .2s,height .2s')}}/>{i<bt.length-1&&<div style={{flex:1,width:3,background:G,opacity:.35,transformOrigin:'top',transform:on?'none':'scaleY(0)',transition:tr(i+2,'transform .6s')}}/>}</div>
<div style={{flex:1,minWidth:0,paddingBottom:16}}><div style={t(G,16,700)}>{r[0]}</div><div style={t(x.primary,15,600)}>{r[1]}</div>{a&&r[2]&&<div style={t(x.secondary,14)}>{r[2]}</div>}</div></div>})}</div>
:<div style={t(x.secondary)}>還沒排，你說好了我再排。</div>}</Section>
<Section heading='這三件一定先問你'><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{['對外發出去的字和圖','花錢、付款','請人、分享或刪檔'].map((s,i)=><span key={s} style={{...t(x.primary,15,600),...up(i+1),border:'2px solid '+G,borderRadius:99,padding:'8px 14px',display:'inline-flex',alignItems:'center',gap:8}}><b style={{width:22,height:22,borderRadius:11,background:G,color:'#fff',fontSize:12,display:'grid',placeItems:'center'}}>{i+1}</b>{s}</span>)}</div></Section>
<div style={{...up(4),borderLeft:'5px solid '+G,padding:'6px 0 6px 14px'}}><div style={t(x.primary,22,700)}>以後有事直接跟我說。</div><div style={t(x.secondary,14)}>我派給對的人，成品先回到我，看過再給你。</div></div>
</Page>)}
