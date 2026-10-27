'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const short=v=>String(v??'').trim().replace(/[.。]+\s*$/u,'');
function url(v){if(typeof v!=='string'||!v.trim())return '';try{let u=new URL(v,location.href);return ['http:','https:','mailto:'].includes(u.protocol)?u.href:''}catch{return ''}}
function link(v,label,cl=''){let u=url(v);return u?'<a class="'+E(cl)+'" href="'+E(u)+'"'+(/^https?:/.test(u)?' target="_blank" rel="noopener noreferrer"':'')+'>'+E(label)+'</a>':''}
function heading(roman,title){return '<div class="section-head"><span class="section-number" aria-label="Section '+E(roman)+'">'+E(roman)+'</span><h2>'+E(title)+'</h2></div>'}
function collapsible(roman,title,id,preview,html){
 const key='panel-'+id;
 return '<section class="site-section collapsible-section" id="'+E(id)+'" data-collapsible><div class="section-head section-toggle-head"><span class="section-number">'+E(roman)+'</span><h2><button type="button" class="section-toggle" aria-expanded="false" aria-controls="'+key+'">'+E(title)+'</button></h2><span class="section-mark" aria-hidden="true"></span></div><p class="section-preview">'+E(preview)+'</p><div class="section-expanded" id="'+key+'" hidden>'+html+'</div></section>';
}
function setupCvLinks(p){
 const cvs={work:{url:p.cv_work_url,show:p.show_cv_work},phd:{url:p.cv_phd_url,show:p.show_cv_phd}};
 $$('[data-cv]').forEach(a=>{const x=cvs[a.dataset.cv];const src=x&&url(x.url);
 if(!x||x.show!==true||!src){a.hidden=true;return}
 a.href=src;a.hidden=false;
 });
}
function setupDisclosures(){
 $$('[data-collapsible]').forEach(section=>{
 const button=$('.section-toggle',section),panel=$('.section-expanded',section);
 function set(open){button.setAttribute('aria-expanded',String(open));panel.hidden=!open;section.classList.toggle('is-expanded',open)}
 button.addEventListener('click',()=>set(button.getAttribute('aria-expanded')!=='true'));
 section.openPanel=()=>set(true);
 });
 const byHash=()=>{
   const id=decodeURIComponent(location.hash.replace(/^#/,''));
   if(!id)return;
   const target=document.getElementById(id);if(!target)return;
   const section=target.closest('[data-collapsible]');
   if(section)section.openPanel();
 };
 document.addEventListener('click',event=>{
  const anchor=event.target.closest('a[href^="#"]');if(!anchor)return;
  const targetId=decodeURIComponent(anchor.getAttribute('href').slice(1));
  const target=document.getElementById(targetId);if(!target)return;
  const section=target.closest('[data-collapsible]');if(section)section.openPanel();
 });
 window.addEventListener('hashchange',byHash);
 byHash();
}
const safeId=s=>String(s||'').replace(/[^a-zA-Z0-9_-]/g,'');
function intro(p,projects,pubs){return '<section id="home" class="intro-section"><div class="intro-grid"><div class="intro-main"><div class="intro-label">'+E('ACADEMIC & ENGINEERING PORTFOLIO')+'</div><h1>'+E(p.name||'Vasilii Andreev')+'</h1><p class="profession">'+E(p.professional_title||'Civil & Structural Engineer')+'</p><p class="intro-scope">'+E(p.intro_scope||'Structural design of buildings and bridges')+'</p><p class="research-status">'+E(p.postgraduate_label||'Postgraduate Researcher')+'</p></div>'+showcase(projects,pubs)+'</div><div class="intro-foot"><span class="intro-spacer"></span><a class="text-link" href="#research">Explore ↓</a>'+(p.show_cv===true?link(p.resume_url,'Academic CV ↗','text-link'):'')+'</div></section>'}
function mergeWorks(projects,pubs){
 let pr=(projects||[]).filter(x=>x.visible!==false).slice(0,6).map(x=>({...x,entryType:'project'}));
 let pu=(pubs||[]).filter(x=>x.visible!==false).slice(0,6).map(x=>({...x,entryType:'publication'}));
 const combined=[];
 for(let i=0;i<Math.max(pr.length,pu.length);i++){if(pr[i])combined.push(pr[i]);if(pu[i])combined.push(pu[i])}
 return combined;
}
function showcase(projects,pubs){
 const items=mergeWorks(projects,pubs);if(!items.length)return '';
 const slides=items.map((x,i)=>{
  const paper=x.entryType==='publication',type=paper?'PUBLICATION':'PROJECT';
  const photo=!paper&&x.show_media===true&&url(x.cover_image)?'<img class="showcase-image" loading="lazy" src="'+E(url(x.cover_image))+'" alt="'+E(x.title)+'">':paper&&x.show_media===true&&url(x.cover_image)?'<img class="showcase-image" loading="lazy" src="'+E(url(x.cover_image))+'" alt="'+E(x.title)+'">':'<div class="showcase-canvas '+(paper?'canvas-publication':'canvas-project')+'" aria-hidden="true"><span class="canvas-motif"></span></div>';
  const excerpt=paper?short(x.venue):short(x.summary);
  const dest=paper?(url(x.url)||'#research'):'#projects';
  const external=paper&&url(x.url)?' target="_blank" rel="noopener noreferrer"':'';
  const title=short(x.title);
  return '<article class="showcase-slide'+(i===0?' is-current':'')+'" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+items.length+'" aria-hidden="'+(i===0?'false':'true')+'" data-item-type="'+type+'"><div class="showcase-image-region">'+photo+'</div><div class="showcase-slide-copy"><span class="showcase-category">'+type+' · '+E(x.year||'')+'</span><h3>'+E(title)+'</h3><p>'+E(excerpt)+'</p><a class="showcase-link" href="'+E(dest)+'"'+external+' aria-label="Explore '+E(title)+'">View <span aria-hidden="true">↗</span></a></div></article>';
 }).join('');
 return '<aside class="showcase" role="region" aria-roledescription="carousel" aria-label="Selected works"><div class="showcase-top"><span>SELECTED WORKS</span><span class="showcase-counter" aria-live="off">01 / '+String(items.length).padStart(2,'0')+'</span></div><div class="showcase-viewport" tabindex="0" aria-label="Selected works. Swipe or use arrow keys.">'+slides+'</div><div class="showcase-controls"><button type="button" class="showcase-play" aria-label="Pause slideshow" aria-pressed="true">Ⅱ</button><div class="showcase-buttons"><button type="button" class="showcase-prev" aria-label="Previous work">←</button><button type="button" class="showcase-next" aria-label="Next work">→</button></div></div></aside>'
}
function carouselStart(enabled){
 const root=$('.showcase');if(!root)return;
 const slides=$$('.showcase-slide',root),view=$('.showcase-viewport',root),counter=$('.showcase-counter',root),control=$('.showcase-play',root);
 let n=0,paused=enabled===false,hover=false,focused=false,timer=null,inViewport=true;
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{inViewport=entries[0]?.isIntersecting??true},{threshold:.1});
  observer.observe(root);
 }
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)paused=true;
 const setPauseUI=()=>{control.textContent=paused?'▶':'Ⅱ';control.setAttribute('aria-pressed',String(!paused));control.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow')};
 function show(next){
  n=(next+slides.length)%slides.length;
  slides.forEach((s,i)=>{const active=i===n;s.classList.toggle('is-current',active);s.setAttribute('aria-hidden',String(!active));s.querySelectorAll('a,button').forEach(el=>{el.tabIndex=active?0:-1})});
  counter.textContent=String(n+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0')
 }
 function schedule(){clearInterval(timer);if(!paused&&!reduce)timer=setInterval(()=>{if(!document.hidden&&inViewport&&!hover&&!focused)show(n+1)},5000)}
 $('.showcase-prev',root).addEventListener('click',()=>{show(n-1);schedule()});
 $('.showcase-next',root).addEventListener('click',()=>{show(n+1);schedule()});
 control.addEventListener('click',()=>{paused=!paused;setPauseUI();schedule()});
 root.addEventListener('mouseenter',()=>hover=true);
 root.addEventListener('mouseleave',()=>hover=false);
 root.addEventListener('focusin',()=>{focused=true;});
 root.addEventListener('focusout',()=>{if(!root.contains(document.activeElement)){focused=false;}});
 view.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();show(n+(e.key==='ArrowRight'?1:-1));schedule()}});
 let touch=null;view.addEventListener('touchstart',e=>{const t=e.changedTouches[0];touch={x:t.clientX,y:t.clientY}},{passive:true});
 view.addEventListener('touchend',e=>{if(!touch)return;const t=e.changedTouches[0],dx=t.clientX-touch.x,dy=t.clientY-touch.y;touch=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){show(n+(dx<0?1:-1));schedule()}},{passive:true});
 show(0);setPauseUI();schedule()
}
function research(p,pubs){
 const topics=(p.research_areas||[]).map((x,i)=>'<article class="topic"><span class="topic-index">'+String(i+1).padStart(2,'0')+'</span><div><h3>'+E(x.title)+'</h3><p>'+E(short(x.description))+'</p></div></article>').join('');
 const papers=(pubs||[]).filter(x=>x.visible!==false).map((x,i)=>{
 const inner='<span class="paper-year">'+E(x.year||'')+'</span><div class="paper-main"><span class="paper-meta">'+E(x.type||'Research')+'</span><h4>'+E(short(x.title))+'</h4><p>'+E([x.authors,x.venue].filter(Boolean).join(' · '))+'</p></div><span class="paper-index">'+String(i+1).padStart(2,'0')+'</span>';
 return '<li class="paper">'+(url(x.url)?'<a href="'+E(url(x.url))+'" target="_blank" rel="noopener noreferrer" class="paper-inner" aria-label="Open publication: '+E(x.title)+'">'+inner+'</a>':'<div class="paper-inner">'+inner+'</div>')+'</li>'
 }).join('');
 return '<section class="site-section" id="research">'+heading('I','Research')+'<div class="intro-two"><p class="section-lead">'+E(p.research_statement)+'</p><p class="section-note">'+E(p.research_note)+'</p></div><div class="topic-list">'+topics+'</div><div class="subsection-head"><h3>Publications</h3></div><ol class="paper-list">'+papers+'</ol></section>'
}
function mediaOf(x){if(x.show_media!==true)return '';const imgs=(x.gallery||[]).filter(g=>url(g.url)).map(g=>'<a class="evidence-image" href="'+E(url(g.url))+'" target="_blank" rel="noopener noreferrer"><img alt="'+E(g.caption||x.title)+'" src="'+E(url(g.url))+'" loading="lazy"><small>'+E(g.caption||'Image')+'</small></a>').join('');const docs=(x.documents||[]).filter(d=>url(d.url)).map(d=>link(d.url,short(d.label||'Technical document')+' ↗','evidence-document')).join('');return imgs||docs?'<div class="evidence-gallery">'+imgs+docs+'</div>':''}
function projects(rows){const visible=(rows||[]).filter(x=>x.visible!==false),group=kind=>visible.filter(x=>x.kind===kind).map((x,i)=>'<details class="project-entry"><summary><span class="project-index">'+String(i+1).padStart(2,'0')+'</span><span class="project-info"><span class="project-title">'+E(short(x.title))+'</span><span class="project-description">'+E(short(x.summary))+'</span><span class="project-discipline">'+E(x.discipline||'')+'</span></span><span class="project-year">'+E(x.year||'')+'</span><span class="plus" aria-hidden="true"></span></summary><div class="project-expanded"><dl>'+([['Contribution',x.role],['Context',x.challenge],['Approach',x.approach],['Outcome',x.outcome],['Methods',x.methods]].filter(y=>y[1]).map(([k,v])=>'<div class="project-fact"><dt>'+E(k)+'</dt><dd>'+E(short(v))+'</dd></div>').join(''))+'</dl>'+mediaOf(x)+'</div></details>').join('');
 return '<section class="site-section" id="projects">'+heading('II','Projects')+'<div class="subsection-head" id="academic-projects"><h3>Academic projects</h3></div><div class="project-list">'+group('Academic')+'</div><div class="subsection-head project-group" id="professional-projects"><h3>Professional projects</h3></div><div class="project-list">'+group('Professional')+'</div></section>'
}
function education(rows){
 const cards=(rows||[]).filter(x=>x.visible!==false).map((x,i)=>{
 const courses=(x.subjects||[]).map(s=>'<li>'+E(short(s))+'</li>').join(''),competences=(x.competencies||[]).map(s=>'<li>'+E(short(s))+'</li>').join('');
 const doc=x.show_diploma===true&&url(x.diploma_url)?'<div class="education-diploma-preview"><iframe src="'+E(url(x.diploma_url))+'#toolbar=0" title="Diploma preview: '+E(x.qualification)+'" loading="lazy"></iframe><a href="'+E(url(x.diploma_url))+'" target="_blank" rel="noopener noreferrer">Open diploma ↗</a></div>':'<div class="education-diploma-placeholder" aria-label="Diploma preview not uploaded"><span class="diploma-paper" aria-hidden="true"></span><span>Diploma to be added</span></div>';
 return '<details class="education-entry"><summary><span class="education-date">'+E(x.period)+'</span><span class="edu-primary"><span class="education-title">'+E(x.qualification)+'</span><span class="education-institution">'+E(x.institution)+'</span><span class="education-description">'+E(short(x.details))+'</span></span><span class="plus" aria-hidden="true"></span></summary><div class="education-expanded"><div class="education-learning">'+(courses?'<h4>Selected subjects / research areas</h4><ul>'+courses+'</ul>':'')+(competences?'<h4>Competencies</h4><ul>'+competences+'</ul>':'')+'</div><div class="education-diploma">'+doc+'</div></div></details>'
 }).join('');
 return collapsible('III','Education','education','Specialist degree with honours · Postgraduate studies · Professional retraining','<div class="education-list">'+cards+'</div>')
}
function software(rows){
 const list=(rows||[]).filter(x=>x.visible!==false).map((x,i)=>'<details class="software-entry"><summary><span class="software-index">'+String(i+1).padStart(2,'0')+'</span><span class="software-summary"><span class="software-name">'+E(x.name)+'</span><span class="software-desc">'+E(short(x.description))+'</span></span><span class="software-category">'+E(x.category)+'</span><span class="plus" aria-hidden="true"></span></summary><div class="software-expanded"><p>'+E(short(x.methods||''))+'</p>'+mediaOf(x)+'</div></details>').join('');
 return collapsible('V','Software & methods','software','AutoCAD · Revit · Tekla · SOFiSTiK · SCAD · LIRA-SAPR · PLAXIS','<div class="software-list">'+list+'</div>')
}
function about(p){
 const groups=(p.about_sections||[]).filter(x=>x.title||x.body||x.points?.length);
 const fmt=(x,extra='')=>'<article class="about-group '+E(extra)+'"><span class="about-group-label">'+E(x.label||'')+'</span><h3>'+E(x.title||'')+'</h3>'+(x.body?'<p>'+E(x.body)+'</p>':'')+(x.points?.length?'<ul class="about-competencies">'+x.points.map(pt=>'<li>'+E(short(pt))+'</li>').join('')+'</ul>':'')+'</article>';
 const links=(p.links||[]).map(x=>link(x.url,x.label+' ↗','social-link')).join('');
 const main=groups.length?fmt(groups[0],'about-professional'):'';
 const others=groups.slice(1).map((x,i)=>fmt(x,'about-research')).join('');
 const side='<aside class="about-links"><span class="eyebrow">ACADEMIC PROFILES</span><nav aria-label="Academic profiles" class="socials">'+links+'</nav><div class="contact-block" id="contact"><span>CONTACT</span>'+link('mailto:'+p.email,p.email,'email-link')+'</div></aside>';
 const lead='Structural engineer and postgraduate researcher working across building and bridge design, assessment of existing structures and infrastructure lifecycle management.';
 return collapsible('IV','About','about',lead,'<div class="about-grid editorial-about"><div class="about-main">'+main+'</div>'+side+others+'</div>');
}

function additional(rows){
 const cards=(rows||[]).filter(x=>x.visible!==false).map(x=>{
  const isSailing=(x.regattas||[]).length>0;
  const links=(x.links||[]).filter(y=>url(y.url));
  const refs=links.map(ref=>'<li><a href="'+E(url(ref.url))+'" target="_blank" rel="noopener noreferrer"><span class="evidence-title">'+E(ref.title||'External reference')+'</span><span class="evidence-source">'+E(ref.source||'Source')+' <span aria-hidden="true">↗</span></span></a></li>').join('');
  const events=(x.regattas||[]).map(ev=>{
    const sources=(ev.sources||[]).filter(s=>url(s.url)).map(s=>'<a class="regatta-source" href="'+E(url(s.url))+'" target="_blank" rel="noopener noreferrer"><span class="source-kind">'+E(s.kind||'Source')+'</span><span class="source-title">'+E(s.label||'Reference')+'</span><span aria-hidden="true">↗</span></a>').join('');
    return '<li class="regatta-entry"><span class="regatta-year">'+E(ev.year||'')+'</span><div class="regatta-content"><h4>'+E(ev.competition||'')+'</h4><div class="regatta-result">'+E(ev.result||'')+'</div>'+(ev.detail?'<p class="regatta-detail">'+E(ev.detail)+'</p>':'')+(sources?'<div class="regatta-sources" aria-label="Race results and articles">'+sources+'</div>':'')+'</div><span class="regatta-class">'+E(ev.class||'')+'</span></li>';
  }).join('');
  const keyFacts=(x.highlights||[]).map(t=>'<li>'+E(short(t))+'</li>').join('');
  const evidence=events?'<ol class="regatta-list">'+events+'</ol>':refs?'<ul class="additional-evidence">'+refs+'</ul>':'';
  return '<article class="additional-card '+(isSailing?'additional-sailing':'')+'"><h3>'+E(x.title)+'</h3><p>'+E(short(x.description))+'</p>'+(keyFacts?'<ul class="additional-highlights">'+keyFacts+'</ul>':'')+(evidence?'<details class="evidence-disclosure"><summary><span>'+(isSailing?'Competition archive':'Articles & applications')+'</span><span class="archive-count">'+(isSailing?(x.regattas||[]).length:links.length)+' entries</span><span class="plus" aria-hidden="true"></span></summary><div class="evidence-panel">'+evidence+'</div></details>':'')+'</article>';
 }).join('');
 return collapsible('VI','Additional information','additional','Independent iOS applications · International competitive sailing','<div class="additional-grid">'+cards+'</div>');
}

const targets=[['research','Research','I'],['projects','Projects','II'],['education','Education','III'],['about','About','IV'],['software','Software','V'],['additional','Additional','VI']];
function navigation(){
 const aside=document.createElement('nav');aside.className='side-index';aside.id='side-index';aside.setAttribute('aria-label','Section navigation');
 aside.innerHTML=targets.map(([id,name,n])=>'<a href="#'+id+'" data-for="'+id+'"><span>'+n+'</span><span>'+name+'</span></a>').join('');
 document.body.appendChild(aside);
 const header=$('.site-header'),headerNav=$('#site-nav'),menu=$('#nav-toggle');
 const label=$('.nav-toggle-label',menu);
 const isCompact=()=>window.matchMedia('(max-width: 1020px)').matches;
 function setMenu(open){
   const next=Boolean(open)&&isCompact();
   menu.setAttribute('aria-expanded',String(next));
   menu.setAttribute('aria-label',next?'Close navigation':'Open navigation');
   headerNav.classList.toggle('open',next);
   header.classList.toggle('menu-active',next);
   document.body.classList.toggle('menu-open',next);
   if(label)label.textContent=next?'Close':'Menu';
 }
 function scrollPosition(){
  const threshold=$('#home')?.offsetHeight||450;
  document.body.classList.toggle('reading-mode',window.scrollY>threshold-150);
 }
 function choose(){
  const top=window.innerHeight*.35;
  let active='research';
  for(const [id] of targets){const node=document.getElementById(id);if(node&&node.getBoundingClientRect().top<=top)active=id}
  $$('[data-for]').forEach(a=>{const on=a.dataset.for===active;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 }
 menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 $$('#site-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('click',event=>{if(menu.getAttribute('aria-expanded')==='true'&&!header.contains(event.target))setMenu(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){setMenu(false);if(isCompact())menu.focus()}});
 window.addEventListener('resize',()=>{if(!isCompact())setMenu(false);scrollPosition()},{passive:true});
 window.addEventListener('scroll',scrollPosition,{passive:true});
 window.addEventListener('scroll',choose,{passive:true});
 scrollPosition();choose();setMenu(false);
}
async function main(){
 try{
 const names=['profile','projects','publications','education','software','additional'];
 const values=await Promise.all(names.map(n=>fetch('content/'+n+'.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error(n+' '+r.status);return r.json()})));
 const d=Object.fromEntries(names.map((k,i)=>[k,values[i]]));
 $('#app').innerHTML=intro(d.profile,d.projects,d.publications)+research(d.profile,d.publications)+projects(d.projects)+education(d.education)+about(d.profile)+software(d.software)+additional(d.additional);
 $('#header-contact').href='mailto:'+encodeURIComponent(d.profile.email);
 $('#copyright-year').textContent=new Date().getFullYear();
 const safeInit=(name,fn)=>{try{fn()}catch(error){console.error('Portfolio '+name+' initialization failed:',error)}};
 safeInit('slideshow',()=>carouselStart(d.profile.showcase_autoplay));
 safeInit('CV links',()=>setupCvLinks(d.profile));
 safeInit('section controls',()=>setupDisclosures());
 safeInit('navigation',()=>navigation());
 if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView())}
 }catch(err){console.error(err);$('#app').innerHTML='<section class="site-section"><h2>Content unavailable</h2><p>Check portfolio content files.</p></section>'}
}
main();
