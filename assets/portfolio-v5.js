'use strict';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const short=v=>String(v??'').trim().replace(/[.。]+\s*$/u,'');
function url(v){if(typeof v!=='string'||!v.trim())return '';try{let u=new URL(v,location.href);return ['http:','https:','mailto:'].includes(u.protocol)?u.href:''}catch{return ''}}
function uiIcon(name){
 const shapes={
  external:'<path d="M5 14 14 5M7 5h7v7"/>',
  down:'<path d="M9 3v12m-5-5 5 5 5-5"/>',
  up:'<path d="M9 15V3m-5 5 5-5 5 5"/>',
  left:'<path d="M15 9H3m5-5L3 9l5 5"/>',
  right:'<path d="M3 9h12m-5-5 5 5-5 5"/>',
  play:'<path d="m6 3 9 6-9 6Z"/>',
  pause:'<path d="M6 3v12M12 3v12"/>'
 };
 return '<svg class="ui-icon ui-icon-'+name+'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(shapes[name]||'')+'</svg>';
}
function link(v,label,cl=''){let u=url(v);return u?'<a class="'+E(cl)+'" href="'+E(u)+'"'+(/^https?:/.test(u)?' target="_blank" rel="noopener noreferrer"':'')+'>'+E(label)+(/^https?:/.test(u)?uiIcon('external'):'')+'</a>':''}
function heading(roman,title){return '<div class="section-head"><span class="section-number" aria-label="Section '+E(roman)+'">'+E(roman)+'</span><h2>'+E(title)+'</h2></div>'}
function collapsible(roman,title,id,preview,html){
 const key='panel-'+id;
 return '<section class="site-section collapsible-section" id="'+E(id)+'" data-collapsible><div class="section-head section-toggle-head"><h2 class="section-heading"><button type="button" class="section-toggle" aria-expanded="false" aria-controls="'+key+'"><span class="section-number">'+E(roman)+'</span><span class="section-toggle-title">'+E(title)+'</span><span class="section-mark" aria-hidden="true"></span></button></h2></div><p class="section-preview">'+E(preview)+'</p><div class="section-expanded" id="'+key+'" hidden>'+html+'</div></section>';
}
function setupCvLinks(p){
 const cvs={work:{url:p.cv_work_url,show:p.show_cv_work},phd:{url:p.cv_phd_url,show:p.show_cv_phd}};
 $$('[data-cv]').forEach(a=>{const x=cvs[a.dataset.cv];const src=x&&url(x.url);
 if(!x||x.show!==true||!src){a.hidden=true;return}
 a.href=src;a.hidden=false;
 });
}
function setupContactActions(){
 const copyButton=$('.copy-email');
 if(!copyButton)return;
 copyButton.addEventListener('click',async()=>{
  const value=copyButton.getAttribute('data-copy-email');
  if(!value)return;
  let copied=false;
  try{
   if(navigator.clipboard&&navigator.clipboard.writeText){
    await navigator.clipboard.writeText(value);copied=true;
   }
  }catch(err){}
  if(!copied){
   let input;
   try{
    input=document.createElement('textarea');
    input.value=value;input.setAttribute('readonly','');
    input.style.position='fixed';input.style.opacity='0';
    document.body.appendChild(input);input.select();
    copied=document.execCommand('copy');
   }catch(err){}
   finally{if(input)input.remove()}
  }
  const status=$('.copy-feedback');
  if(status)status.textContent=copied?'Email address copied':'Select the email address to copy';
 });
}
function setupTopLink(){
 const link=$('[data-back-to-top]');
 if(!link)return;
 link.addEventListener('click',event=>{
  event.preventDefault();
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0,left:0,behavior:reduce?'auto':'smooth'});
  if(window.history&&window.history.replaceState){
   window.history.replaceState(null,'',window.location.pathname+window.location.search);
  }
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
function intro(p,projects,pubs){return '<section id="home" class="intro-section"><div class="intro-grid"><div class="intro-main"><div class="intro-label">'+E('ACADEMIC & ENGINEERING PORTFOLIO')+'</div><h1>'+E(p.name||'Vasilii Andreev')+'</h1><p class="profession">'+E(p.professional_title||'Civil & Structural Engineer')+'</p><p class="intro-scope">'+E(p.intro_scope||'Structural design of buildings and bridges')+'</p><p class="research-status">'+E(p.postgraduate_label||'Postgraduate Researcher')+'</p></div>'+showcase(projects,pubs)+'</div><div class="intro-foot"><span class="intro-spacer"></span><a class="text-link" href="#research">Explore '+uiIcon('down')+'</a>'+(p.show_cv===true?link(p.resume_url,'Academic CV','text-link'):'')+'</div></section>'}
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
  const dest=paper?'#publication-'+(safeId(x.slug)||String((pubs||[]).filter(y=>y.visible!==false).findIndex(y=>y.title===x.title)+1)):'#projects';
  const external='';
  const title=short(x.title);
  return '<article class="showcase-slide'+(i===0?' is-current':'')+'" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+items.length+'" aria-hidden="'+(i===0?'false':'true')+'" data-item-type="'+type+'"><div class="showcase-image-region">'+photo+'</div><div class="showcase-slide-copy"><span class="showcase-category">'+type+' · '+E(x.year||'')+'</span><h3>'+E(title)+'</h3><p>'+E(excerpt)+'</p><a class="showcase-link" href="'+E(dest)+'"'+external+' aria-label="Explore '+E(title)+'">View '+uiIcon('external')+'</a></div></article>';
 }).join('');
 return '<aside class="showcase" role="region" aria-roledescription="carousel" aria-label="Selected works"><div class="showcase-top"><span>SELECTED WORKS</span><span class="showcase-counter" aria-live="off">01 / '+String(items.length).padStart(2,'0')+'</span></div><div class="showcase-viewport" tabindex="0" aria-label="Selected works. Swipe or use arrow keys.">'+slides+'</div><div class="showcase-controls"><button type="button" class="showcase-play" aria-label="Pause slideshow" aria-pressed="true">'+uiIcon('pause')+'</button><div class="showcase-buttons"><button type="button" class="showcase-prev" aria-label="Previous work">'+uiIcon('left')+'</button><button type="button" class="showcase-next" aria-label="Next work">'+uiIcon('right')+'</button></div></div></aside>'
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
 const setPauseUI=()=>{control.innerHTML=uiIcon(paused?'play':'pause');control.setAttribute('aria-pressed',String(!paused));control.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow')};
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
 const profileLink=name=>((p.links||[]).find(l=>l.label.toLowerCase()===name.toLowerCase())||{}).url;
 const papers=(pubs||[]).filter(x=>x.visible!==false).map((x,i)=>{
  const id='publication-'+(safeId(x.slug)||String(i+1));
  const inner='<span class="paper-year">'+E(x.year||'')+'</span><span class="paper-main"><span class="paper-meta">'+E([x.type,x.status].filter(Boolean).join(' · '))+'</span><span class="paper-title">'+E(short(x.title))+'</span><span class="paper-citation">'+E([x.authors,x.venue].filter(Boolean).join(' · '))+'</span></span><span class="plus" aria-hidden="true"></span>';
  const primary=url(x.researchgate_url)?link(x.researchgate_url,'Read on ResearchGate','paper-action paper-action-primary'):'';
  const source=link(x.url,x.source_label||'Original publication','paper-action'+(primary?'':' paper-action-primary'));
  const orcid=link(x.orcid_url||profileLink('ORCID'),x.orcid_url?'ORCID record':'ORCID profile','paper-action');
  const rg=primary?'':link(profileLink('ResearchGate'),'ResearchGate profile','paper-action');
  const pdf=url(x.pdf_url)?'<details class="paper-pdf"><summary>Read PDF on this site <span class="plus" aria-hidden="true"></span></summary><div class="paper-pdf-body"><iframe data-publication-pdf="'+E(url(x.pdf_url))+'" title="'+E('PDF: '+x.title)+'" loading="lazy"></iframe>'+link(x.pdf_url,'Open PDF in a new tab','paper-action')+'</div></details>':'';
  return '<li class="paper" id="'+E(id)+'"><details class="paper-entry"><summary class="paper-inner">'+inner+'</summary><div class="paper-expanded">'+(x.original_title?'<p class="paper-original-title" lang="ru">'+E(x.original_title)+'</p>':'')+(x.abstract?'<h5>Research overview</h5><p class="paper-abstract">'+E(x.abstract)+'</p>':'')+'<div class="paper-actions">'+primary+source+orcid+rg+'</div>'+pdf+'</div></details></li>';
 }).join('');
 return '<section class="site-section" id="research">'+heading('I','Research')+'<div class="intro-two"><p class="section-lead">'+E(p.research_statement)+'</p><p class="section-note">'+E(p.research_note)+'</p></div><div class="topic-list">'+topics+'</div><div class="subsection-head"><h3>Publications</h3></div><ol class="paper-list">'+papers+'</ol></section>'
}
function mediaOf(x){
 if(x.show_media!==true)return '';
 const imageCards=(items,kind)=>{
  const cards=(items||[]).filter(g=>url(g.url)).map(g=>{
   const src=url(g.url),caption=short(g.caption||x.title||'Project image');
   return '<button type="button" class="evidence-image '+(kind==='technical'?'is-technical':'')+'" data-lightbox-src="'+E(src)+'" data-lightbox-caption="'+E(caption)+'" data-lightbox-alt="'+E(caption)+'" aria-label="Open image full screen: '+E(caption)+'"><img alt="'+E(caption)+'" src="'+E(src)+'" loading="lazy"><small>'+E(caption)+'</small></button>';
  }).join('');
  return cards?'<div class="evidence-gallery">'+cards+'</div>':'';
 };
 const fileCards=(items)=>{
  const cards=(items||[]).filter(d=>url(d.url)).map(d=>{
   const href=url(d.url);
   return '<a class="evidence-document" href="'+E(href)+'" target="_blank" rel="noopener noreferrer"><span>'+E(short(d.label||'Project document'))+'</span><span>Open PDF ↗</span></a>';
  }).join('');
  return cards?'<div class="evidence-gallery evidence-file-list">'+cards+'</div>':'';
 };
 const documentGrid=(items,extra='')=>{
  const cards=items.filter(d=>url(d.url)).map(d=>{
   const href=url(d.url),label=short(d.label||'Project document').replace(/\s*·\s*PDF$/i,'');
   return '<a class="project-document-card" href="'+E(href)+'" target="_blank" rel="noopener noreferrer" aria-label="'+E('Open PDF: '+label)+'"><span class="project-document-title">'+E(label)+'</span><span class="project-document-open" aria-hidden="true">PDF '+uiIcon('external')+'</span></a>';
  }).join('');
  return cards?'<div class="project-document-grid '+E(extra)+'">'+cards+'</div>':'';
 };
 const drawingPreviews=(items)=>{
  const cards=items.filter(d=>url(d.url)).map(d=>{
   const href=url(d.url),label=short(d.label||'Technical drawing').replace(/\s*·\s*PDF$/i,'');
   return '<a class="project-document-card project-drawing-preview-card" href="'+E(href)+'" target="_blank" rel="noopener noreferrer" aria-label="'+E('Open PDF: '+label)+'"><span class="project-drawing-preview-frame" data-pdf-preview="'+E(href)+'"><canvas hidden aria-hidden="true"></canvas><span class="project-drawing-preview-status" aria-hidden="true">Loading drawing preview…</span></span><span class="project-drawing-preview-caption"><span class="project-document-title">'+E(label)+'</span><span class="project-document-open" aria-hidden="true">PDF '+uiIcon('external')+'</span></span></a>';
  }).join('');
  return cards?'<div class="project-document-grid project-drawing-grid">'+cards+'</div>':'';
 };
 const section=(title,body,extra='')=>body?'<section class="project-media-section '+extra+'"><div class="project-media-heading"><h4>'+E(title)+'</h4></div>'+body+'</section>':'';
 const visualisations=imageCards(x.gallery,'visual');
 const calculationImages=imageCards(x.calculations,'technical');
 const softwareNote=x.calculation_software?'<p class="project-calculation-software"><strong>Calculation software:</strong> '+E(x.calculation_software)+'</p>':'';
 const calculations=calculationImages?softwareNote+calculationImages:'';
 const resultCards=(x.calculation_results||[]).map(r=>{
  const metrics=[['Result',r.result],['Limit',r.limit],['Utilisation',r.utilisation],['Settlement',r.settlement]].filter(v=>v[1]).map(([label,value])=>'<div class="project-result-metric"><small>'+E(label)+'</small><strong>'+E(value)+'</strong></div>').join('');
  return '<article class="project-result-card"><span class="project-result-group">'+E(r.group||'')+'</span><h5>'+E(r.check||'')+'</h5><div class="project-result-metrics">'+metrics+'</div><p class="project-result-location">'+E(r.location||'')+'</p></article>';
 }).join('');
 const resultSummary=x.calculation_summary?'<p class="project-results-summary">'+E(x.calculation_summary)+'</p>':'';
 const resultNote=x.calculation_note?'<p class="project-results-note">'+E(x.calculation_note)+'</p>':'';
 const results=resultCards?resultSummary+'<div class="project-results-grid">'+resultCards+'</div>'+resultNote:'';
 const drawings=fileCards(x.drawings);
 const documents=fileCards(x.documents);
 const presentation=x.presentation&&url(x.presentation.url)?fileCards([x.presentation]):'';
 const groupedDocuments=x.slug==='alarchin-bridge-rehabilitation';
 const selectedDrawings=groupedDocuments?(x.drawings||[]).filter(d=>d.highlight===true):[];
 const remainingDrawings=groupedDocuments?(x.drawings||[]).filter(d=>d.highlight!==true):[];
 const selected=groupedDocuments?drawingPreviews(selectedDrawings):'';
 const grouped=groupedDocuments?documentGrid([
  ...remainingDrawings,
  ...(x.documents||[]),
  ...(x.presentation?[x.presentation]:[])
 ]):'';
 const disclosure=(title,body,extra='')=>body?'<details class="project-media-section project-media-disclosure '+E(extra)+'"><summary class="project-media-heading"><span class="project-results-title">'+E(title)+'</span><span class="plus" aria-hidden="true"></span></summary><div class="project-results-panel">'+body+'</div></details>':'';
 const html=[
  section('Visualisations',visualisations,'visualisations-section'),
  section('Calculation illustrations',calculations,'calculations-section'),
  groupedDocuments?section('Technical drawings',selected,'drawings-section'):'',
  disclosure('Critical calculation results',results,'results-section project-results-disclosure'),
  groupedDocuments?disclosure('Project documents',grouped,'project-documents-section'):section('Technical drawings',drawings,'drawings-section'),
  groupedDocuments?'':section('Calculation summary',documents,'documents-section'),
  groupedDocuments?'':section('Project presentation',presentation,'presentation-section')
 ].join('');
 return html?'<div class="project-media-groups">'+html+'</div>':'';
}
function projects(rows){
 const visible=(rows||[]).filter(x=>x.visible!==false);
 const group=kind=>visible.filter(x=>x.kind===kind).map((x,i)=>{
  const facts=[['Contribution',x.role],['Context',x.challenge],['Approach',x.approach],['Outcome',x.outcome],['Methods',x.methods]].filter(y=>y[1]);
  const detail=facts.map(([k,v])=>'<div class="project-fact"><dt>'+E(k)+'</dt><dd>'+E(short(v))+'</dd></div>').join('');
  return '<details class="project-entry"><summary><span class="project-index">'+String(i+1).padStart(2,'0')+'</span><span class="project-info"><span class="project-title">'+E(short(x.title))+'</span><span class="project-description">'+E(short(x.summary))+'</span><span class="project-discipline">'+E(x.discipline||'')+'</span></span><span class="project-year">'+E(x.year||'')+'</span><span class="plus" aria-hidden="true"></span></summary><div class="project-expanded"><dl>'+detail+'</dl>'+mediaOf(x)+'</div></details>';
 }).join('');
 return '<section class="site-section" id="projects">'+heading('II','Projects')+'<div class="subsection-head" id="academic-projects"><h3>Academic projects</h3></div><div class="project-list">'+group('Academic')+'</div><div class="subsection-head project-group" id="professional-projects"><h3>Professional projects</h3></div><div class="project-list">'+group('Professional')+'</div></section>';
}
function education(rows){
 const cards=(rows||[]).filter(x=>x.visible!==false).map((x,i)=>{
 const courses=(x.subjects||[]).map(s=>'<li>'+E(short(s))+'</li>').join(''),competences=(x.competencies||[]).map(s=>'<li>'+E(short(s))+'</li>').join('');
 const doc=x.show_diploma===true&&url(x.diploma_url)?'<div class="education-diploma-preview"><iframe src="'+E(url(x.diploma_url))+'#toolbar=0" title="Diploma preview: '+E(x.qualification)+'" loading="lazy"></iframe><a href="'+E(url(x.diploma_url))+'" target="_blank" rel="noopener noreferrer">Open diploma '+uiIcon('external')+'</a></div>':'<div class="education-diploma-placeholder" aria-label="Diploma preview not uploaded"><span class="diploma-paper" aria-hidden="true"></span><span>Diploma to be added</span></div>';
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
 const links=(p.links||[]).map(x=>link(x.url,x.label,'social-link')).join('');
 const main=groups.length?fmt(groups[0],'about-professional'):'';
 const others=groups.slice(1).map((x,i)=>fmt(x,'about-research')).join('');
 const side='<aside class="about-links"><span class="eyebrow">ACADEMIC PROFILES</span><nav aria-label="Academic profiles" class="socials">'+links+'</nav><div class="contact-block" id="contact"><span>CONTACT</span><div class="contact-tools">'+link('mailto:'+p.email,p.email,'email-link')+'<button type="button" class="copy-email" data-copy-email="'+E(p.email||'')+'" aria-label="Copy email address">Copy</button></div><span class="copy-feedback" aria-live="polite"></span></div></aside>';
 const lead='Structural engineer and postgraduate researcher working across building and bridge design, assessment of existing structures and infrastructure lifecycle management.';
 return collapsible('IV','About','about',lead,'<div class="about-grid editorial-about"><div class="about-main">'+main+'</div>'+side+others+'</div>');
}

function additional(rows){
 const cards=(rows||[]).filter(x=>x.visible!==false).map(x=>{
  const isSailing=(x.regattas||[]).length>0;
  const links=(x.links||[]).filter(y=>url(y.url));
  const refs=links.map(ref=>'<li><a href="'+E(url(ref.url))+'" target="_blank" rel="noopener noreferrer"><span class="evidence-title">'+E(ref.title||'External reference')+'</span><span class="evidence-source">'+E(ref.source||'Source')+' '+uiIcon('external')+'</span></a></li>').join('');
  const events=(x.regattas||[]).map(ev=>{
    const sources=(ev.sources||[]).filter(s=>url(s.url)).map(s=>'<a class="regatta-source" href="'+E(url(s.url))+'" target="_blank" rel="noopener noreferrer"><span class="source-kind">'+E(s.kind||'Source')+'</span><span class="source-title">'+E(s.label||'Reference')+'</span>'+uiIcon('external')+'</a>').join('');
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
 const aside=document.createElement('nav');
 aside.className='side-index';
 aside.id='side-index';
 aside.setAttribute('aria-label','Section navigation');
 aside.innerHTML='<button type="button" class="side-index-toggle" aria-expanded="false" aria-controls="side-index-links" aria-label="Open section navigation"><span class="side-index-current">I</span><span class="side-index-bars" aria-hidden="true"><span></span><span></span></span></button><div class="side-index-links" id="side-index-links">'+targets.map(([id,name,n])=>'<a href="#'+id+'" data-for="'+id+'"><span class="side-index-roman">'+n+'</span><span>'+name+'</span></a>').join('')+'</div>';
 document.body.appendChild(aside);
 const header=$('.site-header'),headerNav=$('#site-nav'),menu=$('#nav-toggle');
 const label=$('.nav-toggle-label',menu);
 const sideButton=$('.side-index-toggle',aside);
 const sideCurrent=$('.side-index-current',aside);
 const isCompact=()=>window.matchMedia('(max-width: 1020px)').matches;
 function setSide(open){
  const next=Boolean(open)&&document.body.classList.contains('reading-mode');
  aside.classList.toggle('is-expanded',next);
  sideButton.setAttribute('aria-expanded',String(next));
  const n=sideCurrent.textContent||'I';
  sideButton.setAttribute('aria-label',(next?'Close':'Open')+' section navigation, current section '+n);
 }
 function setMenu(open){
  const next=Boolean(open)&&isCompact();
  if(next)setSide(false);
  menu.setAttribute('aria-expanded',String(next));
  menu.setAttribute('aria-label',next?'Close navigation':'Open navigation');
  headerNav.classList.toggle('open',next);
  header.classList.toggle('menu-active',next);
  document.body.classList.toggle('menu-open',next);
  if(label)label.textContent=next?'Close':'Menu';
 }
 function scrollPosition(){
  const introHeight=$('#home')?.offsetHeight||600;
  const threshold=Math.min(360,Math.max(120,introHeight-240));
  const active=window.scrollY>threshold;
  document.body.classList.toggle('reading-mode',active);
  if(!active)setSide(false);
 }
 function choose(){
  const top=window.innerHeight*.35;
  let active='research';
  for(const [id] of targets){const node=document.getElementById(id);if(node&&node.getBoundingClientRect().top<=top)active=id}
  const current=targets.find(item=>item[0]===active)||targets[0];
  sideCurrent.textContent=current[2];
  $$('[data-for]').forEach(a=>{
   const on=a.dataset.for===active;
   a.classList.toggle('is-active',on);
   if(on)a.setAttribute('aria-current','location');
   else a.removeAttribute('aria-current');
  });
  sideButton.setAttribute('aria-label',(sideButton.getAttribute('aria-expanded')==='true'?'Close':'Open')+' section navigation, current section '+current[1]);
 }
 menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
 sideButton.addEventListener('click',()=>{
  setMenu(false);
  setSide(sideButton.getAttribute('aria-expanded')!=='true');
 });
 $$('#site-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 $$('.side-index-links a',aside).forEach(a=>a.addEventListener('click',()=>setSide(false)));
 document.addEventListener('click',event=>{
  if(menu.getAttribute('aria-expanded')==='true'&&!header.contains(event.target))setMenu(false);
  if(sideButton.getAttribute('aria-expanded')==='true'&&!aside.contains(event.target))setSide(false);
 });
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const sideOpen=sideButton.getAttribute('aria-expanded')==='true';
  const menuOpen=menu.getAttribute('aria-expanded')==='true';
  setSide(false);setMenu(false);
  if(sideOpen)sideButton.focus();
  else if(menuOpen&&isCompact())menu.focus();
 });
 window.addEventListener('resize',()=>{
  if(!isCompact())setMenu(false);
  if(window.innerWidth>=1550)setSide(false);
  scrollPosition();choose();
 },{passive:true});
 window.addEventListener('scroll',scrollPosition,{passive:true});
 window.addEventListener('scroll',choose,{passive:true});
 scrollPosition();choose();setMenu(false);setSide(false);
}

function setupEvidenceLightbox(){
 if(document.querySelector('.evidence-lightbox'))return;
 const dialog=document.createElement('dialog');
 dialog.className='evidence-lightbox';
 dialog.setAttribute('aria-label','Project image viewer');
 dialog.innerHTML='<div class="evidence-lightbox-toolbar"><button type="button" class="evidence-lightbox-close" data-lightbox-close aria-label="Close image viewer">×</button></div><button type="button" class="evidence-lightbox-arrow is-prev" data-lightbox-prev aria-label="Previous image">‹</button><figure class="evidence-lightbox-figure"><img alt=""><figcaption></figcaption></figure><button type="button" class="evidence-lightbox-arrow is-next" data-lightbox-next aria-label="Next image">›</button>';
 document.body.append(dialog);
 const image=$('img',dialog),caption=$('figcaption',dialog),prev=$('[data-lightbox-prev]',dialog),next=$('[data-lightbox-next]',dialog),close=$('[data-lightbox-close]',dialog);
 let items=[],index=0,returnFocus=null;
 function render(){
  const item=items[index];
  if(!item)return;
  image.src=item.dataset.lightboxSrc;
  image.alt=item.dataset.lightboxAlt||'Project image';
  caption.textContent=item.dataset.lightboxCaption||'';
  const multiple=items.length>1;
  prev.hidden=!multiple;next.hidden=!multiple;
  prev.disabled=!multiple;next.disabled=!multiple;
 }
 function move(step){if(!items.length)return;index=(index+step+items.length)%items.length;render()}
 document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-lightbox-src]');
  if(!trigger)return;
  event.preventDefault();
  const group=trigger.closest('.evidence-gallery');
  items=group?Array.from(group.querySelectorAll('[data-lightbox-src]')):[trigger];
  index=Math.max(0,items.indexOf(trigger));returnFocus=trigger;render();
  if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
  close.focus();
 });
 close.addEventListener('click',()=>dialog.close());
 prev.addEventListener('click',()=>move(-1));
 next.addEventListener('click',()=>move(1));
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{if(returnFocus&&document.contains(returnFocus))returnFocus.focus()});
 document.addEventListener('keydown',event=>{
  if(!dialog.open)return;
  if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}
  if(event.key==='ArrowRight'){event.preventDefault();move(1)}
 });
}
// Render the real first page only when a highlighted drawing approaches the viewport.
// PDF.js is loaded on demand; the original PDF link remains usable without the preview.
function setupDrawingPreviews(){
 const frames=$$('[data-pdf-preview]');if(!frames.length)return;
 const base='https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/';
 let library;
 const load=()=>library||(library=import(base+'legacy/build/pdf.min.mjs').then(pdfjs=>{
  pdfjs.GlobalWorkerOptions.workerSrc=base+'legacy/build/pdf.worker.min.mjs';
  return pdfjs;
 }));
 async function render(frame){
  if(frame.dataset.previewStarted)return;
  frame.dataset.previewStarted='true';
  const canvas=$('canvas',frame),status=$('.project-drawing-preview-status',frame);
  let task;
  try{
   const pdfjs=await load();
   task=pdfjs.getDocument({url:frame.dataset.pdfPreview,isEvalSupported:false,cMapUrl:base+'cmaps/',cMapPacked:true,standardFontDataUrl:base+'standard_fonts/',wasmUrl:base+'wasm/'});
   const doc=await task.promise,page=await doc.getPage(1),natural=page.getViewport({scale:1});
   const width=Math.min(2400,Math.max(1000,Math.ceil(frame.getBoundingClientRect().width*Math.min(window.devicePixelRatio||1,2))));
   const viewport=page.getViewport({scale:Math.min(width/natural.width,2400/natural.height)});
   canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
   const context=canvas.getContext('2d',{alpha:false});if(!context)throw Error('Canvas unavailable');
   await page.render({canvas,canvasContext:context,viewport,background:'#ffffff'}).promise;
   frame.style.aspectRatio=String(natural.width)+' / '+String(natural.height);
   canvas.hidden=false;status.hidden=true;frame.classList.add('is-preview-ready');
  }catch(error){
   canvas.hidden=true;status.textContent='Preview unavailable — open the PDF';
   frame.classList.add('is-preview-unavailable');
   console.warn('Drawing preview unavailable:',error);
  }finally{
   if(task)try{await task.destroy()}catch(error){}
  }
 }
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){observer.unobserve(entry.target);render(entry.target)}});
  },{rootMargin:'180px 0px'});
  frames.forEach(frame=>observer.observe(frame));
 }else frames.forEach(render);
}

function setupPublications(){
 const openHash=()=>{
  const id=location.hash.slice(1);if(!id.startsWith('publication-'))return;
  const entry=document.getElementById(id)?.querySelector('.paper-entry');
  if(entry)entry.open=true;
 };
 window.addEventListener('hashchange',openHash);
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[href^="#publication-"]');if(!a)return;
  const entry=document.getElementById(a.hash.slice(1))?.querySelector('.paper-entry');if(entry)entry.open=true;
 });
 $$('.paper-pdf').forEach(details=>{details.addEventListener('toggle',()=>{
  if(!details.open)return;const frame=$('iframe[data-publication-pdf]',details);
  if(frame&&!frame.hasAttribute('src'))frame.src=frame.dataset.publicationPdf+'#toolbar=0';
 })});
 openHash();
}

async function main(){
 try{
 const names=['profile','projects','publications','education','software','additional'];
 const values=await Promise.all(names.map(n=>fetch('content/'+n+'.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error(n+' '+r.status);return r.json()})));
 const d=Object.fromEntries(names.map((k,i)=>[k,values[i]]));
 $('#app').innerHTML=intro(d.profile,d.projects,d.publications)+research(d.profile,d.publications)+projects(d.projects)+education(d.education)+about(d.profile)+software(d.software)+additional(d.additional);
 $('#header-contact').href='#contact';
 $('#copyright-year').textContent=new Date().getFullYear();
 const safeInit=(name,fn)=>{try{fn()}catch(error){console.error('Portfolio '+name+' initialization failed:',error)}};
 safeInit('slideshow',()=>carouselStart(d.profile.showcase_autoplay));
 safeInit('CV links',()=>setupCvLinks(d.profile));
 safeInit('section controls',()=>setupDisclosures());
 safeInit('publication controls',()=>setupPublications());
 safeInit('contact actions',()=>setupContactActions());
 safeInit('evidence lightbox',()=>setupEvidenceLightbox());
 safeInit('drawing previews',()=>setupDrawingPreviews());
 safeInit('back to top',()=>setupTopLink());
 safeInit('navigation',()=>navigation());
 if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView())}
 }catch(err){console.error(err);$('#app').innerHTML='<section class="site-section"><h2>Content unavailable</h2><p>Check portfolio content files.</p></section>'}
}
main();
