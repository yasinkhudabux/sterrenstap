/* SterrenStap MVP v2 – geen externe scripts, trackers of AI-dienst. */
(function(){
  'use strict';
  const {GROUPS, lessons}=window.STERRENSTAP_DATA;
  const KEY='sterrenstap_v2_local';
  const $=id=>document.getElementById(id);
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const idNew=()=>`c${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
  const dateKey=dt=>{const d=new Date(dt);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const isValidGroup=g=>GROUPS.some(x=>x.id===g);
  const createChild=(name='Mijn kind',group='g1',avatar='🦊')=>({id:idNew(),name,group,avatar,goal:2,progress:{},history:[],createdAt:new Date().toISOString()});
  const byId=id=>lessons.find(l=>l.id===id);
  const grade=id=>GROUPS.find(g=>g.id===id)||GROUPS[1];
  function initState(){
    try{
      const obj=JSON.parse(localStorage.getItem(KEY)||'null');
      if(obj&&Array.isArray(obj.children)&&obj.children.length){
        obj.children=obj.children.filter(c=>c&&typeof c==='object'&&typeof c.id==='string'&&isValidGroup(c.group)).map(c=>({
          ...c,name:String(c.name||'Mijn kind').slice(0,24),avatar:String(c.avatar||'🦊').slice(0,8),goal:[1,2,3,4,5].includes(Number(c.goal))?Number(c.goal):2,
          progress:c.progress&&typeof c.progress==='object'&&!Array.isArray(c.progress)?c.progress:{},history:Array.isArray(c.history)?c.history.slice(-1000):[]
        }));
        if(obj.children.length){obj.selectedId=obj.children.some(c=>c.id===obj.selectedId)?obj.selectedId:obj.children[0].id;obj.audio=obj.audio!==false;return obj;}
      }
    }catch(e){}
    let child=createChild();
    try{
      const prev=JSON.parse(localStorage.getItem('sterrenstap_local_v1')||'null');
      if(prev&&typeof prev==='object'){
        child.name=String(prev.name||'Mijn kind').slice(0,24);
        child.group=isValidGroup(prev.group)?prev.group:'g1';
        child.progress=prev.progress&&typeof prev.progress==='object'?prev.progress:{};
      }
    }catch(e){}
    return {children:[child],selectedId:child.id,audio:true};
  }
  let state=initState();
  const child=()=>state.children.find(c=>c.id===state.selectedId)||state.children[0];
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));window.STERRENSTAP_CLOUD?.changed();}catch(e){toast('Opslaan lukt niet. Controleer je browseropslag.');}};
  let view='home',subjectFilter='Alles',session=null,modal=null;
  const NAV=[['home','🏡','Start'],['path','🗺️','Mijn leerpad'],['library','📚','Alle lessen'],['awards','🏆','Beloningen'],['parent','👨‍👩‍👧','Ouderhoek']];
  function progressOf(l,c=child()){return c.progress[l.id]||{};}
  function starsOf(l,c=child()){return Number(progressOf(l,c).stars)||0;}
  function stars(c=child()){return lessons.reduce((a,l)=>a+starsOf(l,c),0);}
  function completed(c=child()){return lessons.filter(l=>starsOf(l,c)>0).length;}
  function groupLessons(c=child()){return lessons.filter(l=>l.group===c.group);}
  function groupDone(c=child()){return groupLessons(c).filter(l=>starsOf(l,c)>0).length;}
  function todayDone(c=child()){return c.history.filter(x=>dateKey(x.date)===dateKey(new Date())).length;}
  function totalCorrect(c=child()){return c.history.reduce((a,x)=>a+Number(x.score||0),0);}
  function totalQuestions(c=child()){return c.history.reduce((a,x)=>a+Number(x.total||5),0);}
  function accuracy(c=child()){const q=totalQuestions(c);return q?Math.round(totalCorrect(c)*100/q):0;}
  function streak(c=child()){
    const days=new Set(c.history.map(h=>dateKey(h.date)));
    let d=new Date();if(!days.has(dateKey(d)))d.setDate(d.getDate()-1);
    let n=0;while(days.has(dateKey(d))&&n<500){n++;d.setDate(d.getDate()-1);}return n;
  }
  function recLesson(c=child()){
    const own=groupLessons(c);
    const repeat=own.filter(l=>Number(progressOf(l,c).attempts)>0&&Number(progressOf(l,c).lastScore)<4);
    // Concentrate on recent weak spots, but do not endlessly repeat a lesson on the same day.
    const retry=repeat.find(l=>dateKey(progressOf(l,c).lastPlayed)!==dateKey(new Date()));
    if(retry)return {lesson:retry,reason:'Extra oefenen helpt je verder',type:'repeat'};
    const first=own.find(l=>!starsOf(l));
    if(first)return {lesson:first,reason:'De volgende stap in jouw groep',type:'new'};
    if(repeat[0])return {lesson:repeat[0],reason:'Word steeds een beetje beter',type:'repeat'};
    const lowest=[...own].sort((a,b)=>Number(progressOf(a,c).bestScore||0)-Number(progressOf(b,c).bestScore||0))[0];
    return {lesson:lowest,reason:'Blijf de geleerde stof herhalen',type:'repeat'};
  }
  function subjectData(c=child()){
    const data=new Map();
    for(const h of c.history){const l=byId(h.lessonId);if(!l)continue;
      const p=data.get(l.subject)||{correct:0,total:0,count:0};p.correct+=Number(h.score||0);p.total+=Number(h.total||5);p.count++;data.set(l.subject,p);
    }
    return Array.from(data.entries()).map(([subject,x])=>({...x,subject,percent:x.total?Math.round(100*x.correct/x.total):0})).sort((a,b)=>a.percent-b.percent);
  }
  function weakSubject(c=child()){return subjectData(c).find(s=>s.count>0&&s.percent<80);}
  function nextLesson(after){const own=groupLessons();const p=own.findIndex(l=>l.id===after);return own[(p+1)%own.length];}
  function navTo(v){if(window.speechSynthesis)window.speechSynthesis.cancel();view=v;subjectFilter='Alles';render();window.scrollTo(0,0);}
  function setGroup(g){if(!isValidGroup(g))return;child().group=g;save();view='path';render();window.scrollTo(0,0);}
  function toast(message){const root=$('toastRoot');root.innerHTML=`<div class="toast">${escapeHtml(message)}</div>`;clearTimeout(toast.timer);toast.timer=setTimeout(()=>root.replaceChildren(),3000);}
  function header(){const c=child();$('headerStars').textContent=stars(c);$('headerAvatar').textContent=c.avatar;$('headerProfile').textContent=c.name;
    $('soundBtn').textContent=state.audio?'🔊':'🔇';$('soundBtn').title=state.audio?'Voorlezen aan':'Voorlezen uit';
    $('breadcrumb').textContent={home:'☀️ Een nieuwe dag om te groeien',path:'🗺️ Stap voor stap verder',library:'📚 Kies een avontuur',awards:'🏅 Jouw prijzenkast',parent:'👨‍👩‍👧 Voor ouders',quiz:'✏️ Tijd om te oefenen',result:'✨ Goed gedaan!',groups:'🎒 Kies je groep'}[view]||'SterrenStap';
    function navItems(mobile){return NAV.map(([id,icon,title])=>`<button type="button" data-action="nav" data-view="${id}" class="${(view===id||view==='quiz'&&id==='path')?'active':''}" ${view===id?'aria-current="page"':''}><span class="nav-icon">${icon}</span><span>${title}</span></button>`).join('');}
    $('sideNav').innerHTML=navItems(false);$('mobileNav').innerHTML=navItems(true);
  }
  const gradeChips=()=>`<div class="bubble-strip" aria-label="Kies schoolgroep">${GROUPS.map(g=>`<button class="grade-pill ${child().group===g.id?'selected':''}" data-action="group" data-group="${g.id}" aria-pressed="${child().group===g.id}">${g.name}<small>${g.age.replace('ca. ','')}</small></button>`).join('')}</div>`;
  const section=(title,sub,right)=>`<div class="section-title"><div><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>${right||''}</div>`;
  function lessonCard(l){const p=progressOf(l),st=starsOf(l);return `<article class="lesson-card"><div class="lesson-head"><span class="lesson-symbol" aria-hidden="true">${l.icon}</span><span class="stars-label">${st?'⭐'.repeat(st):'☆ Nieuw'}</span></div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.desc)}</p><div class="lesson-bottom"><span>${escapeHtml(l.subject)} · ${l.questions.length} vragen</span><button data-action="start" data-lesson="${l.id}" class="btn ${st?'soft':'primary'} sm">${Number(p.lastScore)<4&&p.attempts?'Herhaal':st?'Nog eens':'Starten'} →</button></div></article>`;}
  function stat(icon,val,label){return `<div class="stat"><span class="stat-icon">${icon}</span><div><strong>${val}</strong><span>${label}</span></div></div>`;}
  function home(){const c=child(),g=grade(c.group),r=recLesson(c);const today=todayDone(c),count=groupDone(c),goal=c.goal;
    const preview=groupLessons(c).slice(0,3);
    return `<section class="home-hero"><div class="hero-copy"><span class="eyebrow">✨ Welkom in jouw leerwereld</span><h1>Hoi, <em>${escapeHtml(c.name)}</em>! 👋</h1><p>Elke vraag maakt je slimmer. Ontdek nieuwe dingen, oefen met plezier en verzamel sterren!</p><button class="btn primary" data-action="start" data-lesson="${r.lesson.id}">🚀 ${count?'Verder leren':'Begin met leren'} <span aria-hidden="true">→</span></button></div><div class="hero-animal" aria-hidden="true">${c.avatar}</div><span class="hero-bubble bubble1" aria-hidden="true">⭐</span><span class="hero-bubble bubble2" aria-hidden="true">💜</span><span class="hero-bubble bubble3" aria-hidden="true">✨</span></section>
      <div class="stats">${stat('⭐',stars(c),'Mijn sterren')}${stat('📚',completed(c),'Lessen gemaakt')}${stat('🔥',streak(c),'Dagen achter elkaar')}</div>
      ${section('Speciaal voor jou 💜','Een nieuwe les of een beetje extra oefening.',`<button class="link-btn" data-action="nav" data-view="path">Mijn leerpad →</button>`)}
      <div class="two-col"><div class="panel recommended"><div class="feature-icon">${r.lesson.icon}</div><div class="grow"><span class="recommend-tag">${r.type==='repeat'?'🔁 EVEN HERHALEN':'✨ AANBEVOLEN LES'}</span><h3>${escapeHtml(r.lesson.title)}</h3><p>${escapeHtml(r.reason)} · ${escapeHtml(g.name)}</p></div><button class="btn primary sm" data-action="start" data-lesson="${r.lesson.id}">Start →</button></div>
      <div class="panel daily-panel"><div class="day-row"><span>🎯 Jouw dagdoel</span><span>${Math.min(today,goal)}/${goal} lessen</span></div><div class="mini-progress"><span style="width:${Math.min(100,Math.round(today*100/goal))}%"></span></div><p>${today>=goal?'Wauw! Je dagdoel is gehaald. 🎉':'Kleine stapjes zorgen voor grote vooruitgang.'}</p><span class="pill mint" style="align-self:flex-start">${today>=goal?'Doel gehaald!':`${Math.max(0,goal-today)} te gaan vandaag`}</span></div></div>
      ${section(`Leren in ${escapeHtml(g.name)} 🎒`,'Ontdek jouw lessen. Je kunt op elk moment een andere groep kiezen.',`<button class="link-btn" data-action="nav" data-view="groups">Andere groep →</button>`)}
      ${gradeChips()}<div class="lesson-grid">${preview.map(lessonCard).join('')}</div>
      ${section('Samen met je ouders 🌱','Bekijk hoe goed het gaat en waar je nog kunt groeien.',`<button class="link-btn" data-action="nav" data-view="parent">Ouderhoek →</button>`)}
      <div class="panel"><div class="flex"><span class="feature-icon" style="width:56px;height:56px;flex-basis:56px;font-size:26px">👨‍👩‍👧</span><div class="grow"><h3>Voor ouders</h3><p>Per kind het leerpad, de resultaten en de oefendoelen bekijken.</p></div><button class="btn soft sm" data-action="nav" data-view="parent">Bekijken →</button></div></div>`;
  }
  function path(){const c=child(),g=grade(c.group),own=groupLessons(c),r=recLesson(c),n=groupDone(c);
    return `<div class="intro-card"><span class="eyebrow">🗺️ Persoonlijke leerroute</span><h1>Mijn leerpad</h1><p>Je leert in kleine stapjes. Gaat iets nog moeilijk? Dan zetten we die les terug op je leerpad, zodat je op je eigen tempo kunt oefenen.</p><div class="flex mt"><span class="pill purple">${escapeHtml(g.name)}</span><span class="pill mint">${n} van ${own.length} lessen afgerond</span></div><div class="mini-progress mt"><span style="width:${Math.round(n*100/own.length)}%"></span></div></div>
      ${section('Jouw niveau kiezen 🎒','Het leerpad past zich aan het gekozen niveau aan.')} ${gradeChips()}
      ${section('Volgende stappen ✨',`Jouw advies: ${escapeHtml(r.reason.toLowerCase())}.`)}
      <div class="path-list">${own.map((l,i)=>{const p=progressOf(l),s=starsOf(l),focus=r.lesson.id===l.id;return `<article class="path-item ${focus?'focus':''}"><div class="path-num ${s?'done':''}">${s?'✓':i+1}</div><div class="path-emoji">${l.icon}</div><div class="grow"><h3>${escapeHtml(l.title)} ${focus?'<span class="pill gold">Voor jou</span>':''}</h3><p>${escapeHtml(l.desc)} · ${escapeHtml(l.subject)}</p>${s?`<span class="small" style="color:#8a75c4">${'⭐'.repeat(s)} · Beste score: ${Number(p.bestScore||0)}/${l.questions.length}</span>`:''}</div><button class="btn ${focus?'primary':'soft'} sm" data-action="start" data-lesson="${l.id}">${s?'Oefen':'Start'} →</button></article>`;}).join('')}</div>
      <div class="notice mt">💡 <strong>Wist je dat?</strong> Een les opnieuw proberen is juist slim. Het systeem raadt extra oefening aan wanneer de laatste score lager is dan 4 van de 5.</div>`;
  }
  function groups(){return `<div class="intro-card"><span class="eyebrow">🎒 Een passend startpunt</span><h1>Kies een groep</h1><p>Van spelend ontdekken vanaf 3 jaar tot oefenen voor de bovenbouw. Schoolgroepen zijn richtlijnen, geen leeftijdstesten.</p></div><div class="group-grid">${GROUPS.map(g=>{const own=lessons.filter(l=>l.group===g.id),n=own.filter(l=>starsOf(l)>0).length;return `<button class="group-card ${child().group===g.id?'selected':''}" data-action="group" data-group="${g.id}"><span class="group-emoji">${g.emoji}</span><strong>${escapeHtml(g.name)}</strong><small>${escapeHtml(g.label)}</small><span class="group-complete">${n}/${own.length} lessen ${child().group===g.id?'✓':''}</span></button>`;}).join('')}</div>`;}
  function library(){const c=child(),g=grade(c.group),own=groupLessons(c),subjects=['Alles',...new Set(own.map(l=>l.subject))];const filtered=own.filter(l=>subjectFilter==='Alles'||l.subject===subjectFilter);
    return `<div class="intro-card"><span class="eyebrow">📚 Alles op jouw niveau</span><h1>De lessenbibliotheek</h1><p>Kies een groep, selecteer een onderwerp en begin met oefenen. Alle voorbeeldlessen zijn vrij toegankelijk.</p></div>
      ${section(`Kies een groep 🎒`,'Je kunt altijd tussen de groepen wisselen.')} ${gradeChips()}
      ${section(`${escapeHtml(g.name)} · ${own.length} lessen`,'Kies wat je wilt oefenen.')}
      <div class="subj-filters">${subjects.map(s=>`<button class="${subjectFilter===s?'active':''}" data-action="subject" data-subject="${escapeHtml(s)}">${escapeHtml(s)}</button>`).join('')}</div>
      <div class="lesson-grid">${filtered.map(lessonCard).join('')}</div>`;
  }
  function awards(){const c=child(),d=completed(c),s=stars(c),p=lessons.filter(l=>starsOf(l,c)===3).length;const badges=[
      ['🌟','Eerste stap','Rond één les af',d>=1],['🚀','Op ontdekkingsreis','Rond vijf lessen af',d>=5],['📚','Boekenheld','Rond tien lessen af',d>=10],
      ['🌈','Sterrenverzamelaar','Verzamel tien sterren',s>=10],['🏆','Superster','Haal drie keer drie sterren',p>=3],['🔥','Volhouder','Oefen drie dagen achter elkaar',streak(c)>=3],
      ['💎','Leren leren','Doe 20 lessen',d>=20],['🧠','Alleskunner','Behaal minstens een ster in alle lessen van jouw groep',groupDone(c)===groupLessons(c).length],['☀️','Doorzetter','Haal het dagdoel',todayDone(c)>=c.goal]
    ];return `<div class="intro-card"><span class="eyebrow">🏆 Jouw prijzenkast</span><h1>Elke stap verdient een ster!</h1><p>Je hoeft niet alles meteen goed te hebben. Door te oefenen ontdek je steeds meer.</p><div class="stats">${stat('⭐',s,'Sterren')}${stat('✅',d,'Lessen')}${stat('🏆',p,'Perfecte lessen')}</div></div>
      ${section('Mijn medailles 🏅','Elke kleine overwinning telt.')}
      <div class="medals">${badges.map(([emoji,name,desc,has])=>`<div class="medal ${has?'':'locked'}"><div class="medal-symbol">${has?emoji:'🔒'}</div><h3>${name}</h3><p>${desc}</p><span class="pill ${has?'mint':'purple'}">${has?'✓ Behaald':'Nog te halen'}</span></div>`).join('')}</div>`;}
  function speak(text){
    if(!state.audio||!('speechSynthesis' in window))return;
    try{
      window.speechSynthesis.cancel();
      const utterance=new SpeechSynthesisUtterance(String(text).replace(/\s+/g,' '));
      utterance.lang='nl-NL';utterance.rate=['p','g1','g2'].includes(child().group)?0.83:0.94;utterance.pitch=1.13;
      const voices=window.speechSynthesis.getVoices();
      const dutchVoices=voices.filter(v=>v.lang.toLowerCase().startsWith('nl'));
      const femaleNames=/femke|claire|ellen|lotte|anna|saskia|jasmijn|female|vrouw/i;
      const dutch=dutchVoices.find(v=>femaleNames.test(v.name))||dutchVoices.find(v=>v.lang.toLowerCase()==='nl-nl')||dutchVoices[0];
      if(dutch)utterance.voice=dutch;
      window.speechSynthesis.speak(utterance);
    }catch(e){/* iOS kan audio blokkeren totdat een gebruiker tikt */}
  }
  function startLesson(id){
    const l=byId(id);if(!l)return;
    session={lessonId:l.id,index:0,score:0,selected:null,history:[],saved:false};
    view='quiz';render();window.scrollTo(0,0);
    if(['p','g1','g2'].includes(l.group))readCurrentQuestion();
  }
  const toddlerIcons={'Neus':'👃','Je neus':'👃','Je knie':'🦵','Je elleboog':'💪','Je voet':'🦶','Je voeten':'👣','Je oren':'👂','Je tenen':'🦶','Je haren':'💇','Je vingers':'☝️','Je ogen':'👀','Je mond':'👄','Je handen':'👐','Je knieën':'🦵','Je haar':'💇','Je hoofd':'🙂','Cirkel':'🔴','Vierkant':'🟦','Driehoek':'🔺','Rechthoek':'▭','Ovaal':'🥚','Ster':'⭐'};
  Object.assign(toddlerIcons,{'Een hond':'🐶','Een kip':'🐔','Een vis':'🐟','Een kat':'🐱','Een muis':'🐭','Een koe':'🐮','Een eend':'🦆','Een slang':'🐍','Een paard':'🐴','Een poes':'🐱','Een vlinder':'🦋','Een varken':'🐷','Een haan':'🐓','Een kikker':'🐸','Een ezel':'🫏','Muis':'🐭','Olifant':'🐘','Kat':'🐱','Konijn':'🐰','Een huis':'🏠','Een schoen':'👟','Een appel':'🍎','Een beker':'🥤','Bus':'🚌','Fiets':'🚲','Mier':'🐜','Boom':'🌳','Potlood':'✏️','Trein':'🚆','Lepel':'🥄','Sleutel':'🔑','Veertje':'🪶','Ballon':'🎈','Auto':'🚗','Blaadje':'🍃'});
  Object.assign(toddlerIcons,{'Boom':'🌳','Kat':'🐱','Roos':'🌹','Maan':'🌙','Appel':'🍎','Vis':'🐟','Hond':'🐶','Schaap':'🐑','Zon':'☀️','Vlinder':'🦋','Slak':'🐌','Regenjas':'🧥','Zonnebril':'🕶️','Zwembroek':'🩳','Sandalen':'🩴','Lente':'🌷','Zomer':'☀️','Herfst':'🍂','Winter':'❄️','Peer':'🍐','Beer':'🐻','Huis':'🏠','Mat':'🟫','Bal':'⚽','Kip':'🐔'});
  const toddlerColors={'Geel':'#ffd737','Blauw':'#3578ed','Paars':'#9655db','Roze':'#fa82b6','Rood':'#f05252','Groen':'#3aaf73','Zwart':'#252535','Wit':'#ffffff','Bruin':'#99603c','Oranje':'#ff982f'};
  function illustratedEmoji(emoji){
    const code=[...emoji].filter(c=>c.codePointAt(0)!==0xfe0f).map(c=>c.codePointAt(0).toString(16)).join('-');
    const url='https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/'+code+'.svg';
    return `<span class="picture-frame"><span class="picture-fallback" aria-hidden="true">${emoji}</span><img class="picture-art" src="${url}" alt="" loading="lazy" decoding="async"></span>`;
  }
  function playRewardSound(success){
    if(!state.audio)return;
    try{
      const AudioContext=window.AudioContext||window.webkitAudioContext;
      if(!AudioContext)return;
      const ctx=new AudioContext();
      const notes=success?[523.25,659.25,783.99]:[392,440];
      notes.forEach((frequency,index)=>{
        const oscillator=ctx.createOscillator(),gain=ctx.createGain(),time=ctx.currentTime+index*0.11;
        oscillator.type='sine';oscillator.frequency.value=frequency;
        gain.gain.setValueAtTime(0.0001,time);
        gain.gain.exponentialRampToValueAtTime(0.085,time+0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001,time+0.18);
        oscillator.connect(gain);gain.connect(ctx.destination);
        oscillator.start(time);oscillator.stop(time+0.2);
      });
      setTimeout(()=>ctx.close().catch(()=>{}),750);
    }catch(e){/* Optional audio. */}
  }
  function toddlerAnswer(o){
    if(Object.hasOwn(toddlerColors,o))return `<span class="toddler-color" style="background:${toddlerColors[o]}" aria-hidden="true"></span><span class="toddler-answer-label">${escapeHtml(o)}</span>`;
    if(Object.hasOwn(toddlerIcons,o))return `${illustratedEmoji(toddlerIcons[o])}<span class="toddler-answer-label">${escapeHtml(o)}</span>`;
    if(/^[0-9]+$/.test(o)||/^[⭐🔴🔺🟦]$/.test(o))return `<span class="toddler-icon" aria-hidden="true">${escapeHtml(o)}</span>`;
    return `<span class="toddler-answer-label">${escapeHtml(o)}</span>`;
  }
  function readCurrentQuestion(){const l=byId(session?.lessonId),q=l?.questions[session?.index];if(q)speak(`${q.passage||''} ${q.question}. ${q.options.join(', ')}`);}
  function question(){
    const l=byId(session?.lessonId);if(!l)return '';
    const q=l.questions[session.index],num=session.index+1,chosen=session.selected,isToddler=['p','g1','g2'].includes(l.group);
    const message=chosen!==null?chosen===q.answer?'Helemaal goed! 🌟':'Goed geprobeerd! 💛':'';
    return `<section class="quiz-wrap ${isToddler?'toddler-quiz':''}">
      <div class="quiz-top"><button class="btn soft sm" data-action="quit">← Stoppen</button><span>${escapeHtml(l.title)} · ${num} van ${l.questions.length}</span></div>
      <div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${l.questions.length}" aria-valuenow="${num-1}"><span style="width:${Math.round((num-1)*100/l.questions.length)}%"></span></div>
      <article class="quiz-card"><div class="quiz-center"><span class="eyebrow">${escapeHtml(l.subject)} · Vraag ${num}</span>${q.passage?`<div class="passage">${escapeHtml(q.passage)}</div>`:''}<div class="quiz-visual" aria-hidden="true">${l.id==='p-plaatjes'?'🐾':escapeHtml(q.visual||l.icon)}</div><h1>${escapeHtml(q.question)}</h1><div class="quiz-tools"><button class="btn soft sm" data-action="read">🔊 Lees voor</button></div></div>
      ${l.id==='p-sleepvormen'?`<div class="shape-dropzone" id="shapeDropzone" aria-label="Sleep de juiste vorm hierheen"><span>🎯</span><strong>Sleep de vorm hierheen</strong><small>Of tik op de juiste vorm hieronder</small></div>`:''}<div class="answers ${l.id==='p-sleepvormen'?'shape-options':''}" role="group" aria-label="Kies het goede antwoord">${q.options.map((o,i)=>`<button class="answer ${chosen!==null?(o===q.answer?'correct':o===chosen?'wrong':''):''}" data-action="answer" data-index="${i}" ${l.id==='p-sleepvormen'&&chosen===null?'draggable="true"':''} ${chosen!==null?'disabled':''}>${l.id==='p-telspel'?`<span class="count-number">${escapeHtml(o)}</span><span class="count-dots" aria-hidden="true">${'●'.repeat(Math.min(6,Number(o)||0))}</span>`:isToddler?toddlerAnswer(o):escapeHtml(o)}</button>`).join('')}</div>
      ${chosen!==null?`<div id="answerFeedback" class="feedback ${chosen===q.answer?'good reward-pop':'bad'}" role="status"><strong>${chosen===q.answer?'✨ ⭐ ✨ ':''}${message}</strong>${escapeHtml(q.explain)}</div>
      <div class="quiz-continue"><button class="btn primary" data-action="next">${num===l.questions.length?'Bekijk mijn sterren ⭐':'Volgende vraag →'}</button></div>`:''}
      </article><p class="quiz-hint">Je mag het zo vaak proberen als je wilt. Fouten maken hoort bij leren!</p>
    </section>`;
  }
  function answerQuestion(i){
    if(!session||session.selected!==null)return;
    const l=byId(session.lessonId),q=l.questions[session.index];
    if(!Number.isInteger(i)||i<0||i>=q.options.length)return;
    session.selected=q.options[i];
    const good=session.selected===q.answer;
    if(good)session.score++;
    session.history.push({question:session.index,answer:session.selected,correct:good});
    render();
    playRewardSound(good);
    if(good)speak('Heel goed! '+q.explain);else speak('Goed geprobeerd. '+q.explain);
    const feedback=$('answerFeedback');
    if(feedback){feedback.scrollIntoView({block:'nearest',behavior:'smooth'});}
  }
  let draggedShapeIndex=null;
  document.addEventListener('dragstart',e=>{
    const btn=e.target.closest('.shape-options .answer');
    if(!btn)return;
    draggedShapeIndex=Number(btn.dataset.index);
    if(e.dataTransfer)e.dataTransfer.setData('text/plain',String(draggedShapeIndex));
  });
  document.addEventListener('dragover',e=>{
    const zone=e.target.closest('#shapeDropzone');
    if(zone&&session?.selected===null){e.preventDefault();zone.classList.add('drag-over');}
  });
  document.addEventListener('dragleave',e=>{
    const zone=e.target.closest('#shapeDropzone');
    if(zone&&!zone.contains(e.relatedTarget))zone.classList.remove('drag-over');
  });
  document.addEventListener('drop',e=>{
    const zone=e.target.closest('#shapeDropzone');
    if(!zone||session?.selected!==null)return;
    e.preventDefault();zone.classList.remove('drag-over');
    const index=Number(e.dataTransfer?.getData('text/plain')||draggedShapeIndex);
    if(Number.isInteger(index))answerQuestion(index);
    draggedShapeIndex=null;
  });
  let touchShape=null;
  document.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse')return;
    const btn=e.target.closest('.shape-options .answer');
    if(!btn||session?.selected!==null)return;
    touchShape={index:Number(btn.dataset.index),x:e.clientX,y:e.clientY,dragging:false};
  });
  document.addEventListener('pointermove',e=>{
    if(!touchShape)return;
    if(Math.hypot(e.clientX-touchShape.x,e.clientY-touchShape.y)>18)touchShape.dragging=true;
    const zone=$('shapeDropzone');
    if(zone)zone.classList.toggle('drag-over',touchShape.dragging&&!!document.elementFromPoint(e.clientX,e.clientY)?.closest('#shapeDropzone'));
  });
  document.addEventListener('pointerup',e=>{
    if(!touchShape)return;
    const shape=touchShape;touchShape=null;
    const zone=$('shapeDropzone');if(zone)zone.classList.remove('drag-over');
    if(shape.dragging&&document.elementFromPoint(e.clientX,e.clientY)?.closest('#shapeDropzone')){
      e.preventDefault();answerQuestion(shape.index);
    }
  });
  function nextQuestion(){
    if(!session||session.selected===null)return;
    const l=byId(session.lessonId);
    if(session.index+1<l.questions.length){
      session.index++;session.selected=null;view='quiz';render();window.scrollTo({top:0,behavior:'instant'});if(['p','g1','g2'].includes(l.group))readCurrentQuestion();
    }else{
      finishLesson();view='result';render();window.scrollTo(0,0);
    }
  }
  function finishLesson(){
    if(!session||session.saved)return;
    const l=byId(session.lessonId),c=child(),score=session.score;
    const gained=score>=4?3:score===3?2:score>=1?1:0;
    const prev=progressOf(l,c);
    c.progress[l.id]={attempts:(Number(prev.attempts)||0)+1,lastScore:score,bestScore:Math.max(Number(prev.bestScore)||0,score),lastPlayed:new Date().toISOString(),stars:Math.max(Number(prev.stars)||0,gained)};
    c.history.push({date:new Date().toISOString(),lessonId:l.id,score,total:l.questions.length});
    c.history=c.history.slice(-1000);
    session.gained=gained;session.saved=true;save();
  }
  function result(){
    const l=byId(session?.lessonId);if(!l)return '';
    const sc=session.score,total=l.questions.length,next=nextLesson(l.id);
    const heading=sc===total?'Wat een topper!':sc>=3?'Geweldig geoefend!':'Goed dat je blijft proberen!';
    const desc=sc===total?'Je hebt alles goed! Klaar voor een nieuwe uitdaging?':sc>=3?'Dat gaat al heel goed. Blijf oefenen en groei nog verder!':'Elke stap telt. Probeer de les nog eens en ontdek wat je geleerd hebt.';
    return `<div class="quiz-wrap"><article class="result-card"><div class="result-art">${sc>=4?'🏆':sc>=2?'🌟':'💪'}</div><div class="eyebrow">${escapeHtml(l.title)}</div><h1>${heading}</h1><p>${desc}</p><div class="big-stars" aria-label="${session.gained} van 3 sterren">${'⭐'.repeat(session.gained)}${'☆'.repeat(3-session.gained)}</div><div class="result-score"><strong>${sc} / ${total}</strong><span>vragen goed beantwoord</span></div>
      <div class="result-actions"><button class="btn soft" data-action="start" data-lesson="${l.id}">🔁 Oefen nog eens</button><button class="btn primary" data-action="start" data-lesson="${next.id}">Volgende les →</button></div>
      <button class="link-btn result-back" data-action="nav" data-view="path">Terug naar mijn leerpad</button>
    </article></div>`;
  }
  const subjectName=s=>escapeHtml(s.subject);
  function weeklyOverview(c=child()){
    const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(6-i));return {key:dateKey(d),label:d.toLocaleDateString('nl-NL',{weekday:'short'}),count:0};});
    const map=new Map(days.map(d=>[d.key,d]));
    for(const h of c.history){const day=map.get(dateKey(h.date));if(day)day.count++;}
    const max=Math.max(1,...days.map(d=>d.count));
    return `<div class="panel parent-week"><h3>📅 Afgelopen 7 dagen</h3><p>Hoeveel lessen zijn er per dag geoefend?</p><div class="parent-week-bars" role="img" aria-label="${escapeHtml(days.map(d=>d.label+': '+d.count+' lessen').join(', '))}">${days.map(d=>`<div class="parent-week-day"><strong>${d.count||'–'}</strong><span class="parent-week-track"><span style="height:${Math.max(5,Math.round(d.count/max*100))}%"></span></span><small>${escapeHtml(d.label)}</small></div>`).join('')}</div></div>`;
  }
  function parentHighlights(c=child()){
    const rows=subjectData(c).filter(x=>x.count>0);
    if(!rows.length)return '<div class="panel"><h3>🌱 Jouw kind groeit</h3><p>Na een paar lessen verschijnen hier sterke punten en oefentips op basis van de gemaakte vragen.</p></div>';
    const best=[...rows].sort((a,b)=>b.percent-a.percent)[0];
    const focus=rows.find(x=>x.percent<80);
    return `<div class="panel"><h3>🌟 Sterke punten & oefentips</h3><div class="parent-highlight"><span>💚 Gaat goed</span><strong>${subjectName(best)} · ${best.percent}% goed</strong></div>${focus?`<div class="parent-highlight"><span>🎯 Extra oefenen</span><strong>${subjectName(focus)} · ${focus.percent}% goed</strong></div>`:'<p class="muted mt">Er is momenteel geen vak onder de 80% gevonden.</p>'}<p class="small mt">Indicatie op basis van gemaakte oefeningen; geen officiële niveau- of vaardigheidstoets.</p></div>`;
  }
  function parent(){
    const c=child(),rows=subjectData(c),weak=weakSubject(c),g=grade(c.group),sorted=[...c.history].reverse().slice(0,8);
    const pct=Math.round(groupDone(c)*100/groupLessons(c).length);
    const grouped=lessons.filter(l=>l.group===c.group);
    const area=weak?`Voor ${escapeHtml(c.name)} is <strong>${subjectName(weak)}</strong> nog lastig (${weak.percent}% goed). Probeer een korte herhaling.`:
      c.history.length?'Er is geen duidelijk oefenonderwerp onder 80% gevonden. Blijf gevarieerd oefenen!':'Na de eerste lessen zie je hier waar extra oefenen handig is.';
    return `<div class="intro-card"><span class="eyebrow">👨‍👩‍👧 Voor ouders & verzorgers</span><h1>Zo groeit ${escapeHtml(c.name)} 🌱</h1><p>Bekijk het oefenritme, het persoonlijke leerpad en onderwerpen die extra aandacht verdienen. Deze demonstratie is geen gevalideerde niveautoets.</p></div>
      <div class="stats">${stat('⭐',stars(c),'Sterren verzameld')}${stat('📚',completed(c),'Unieke lessen')}${stat('🎯',c.history.length?accuracy(c)+'%':'–','Vragen goed')}</div>
      <div class="parent-overview">${weeklyOverview(c)}${parentHighlights(c)}</div><div class="parent-split"><div class="panel"><h3>📊 Leerontwikkeling</h3><p class="muted">${escapeHtml(g.name)} · ${groupDone(c)} van ${grouped.length} lessen geoefend</p><div class="mini-progress mt"><span style="width:${pct}%"></span></div>
      <h3 class="mt">Resultaten per vak</h3>${rows.length?rows.map(s=>`<div class="bar-row"><span>${subjectName(s)}</span><div class="mini-progress"><span style="width:${s.percent}%"></span></div><strong>${s.percent}%</strong></div>`).join(''):'<div class="empty mt">Er zijn nog geen resultaten. Begin samen aan een les!</div>'}
      <div class="parent-tip"><strong>💡 Persoonlijk oefenadvies</strong><p>${area}</p></div></div>
      <div class="panel"><h3>⚙️ Instellingen</h3><div class="settings-row"><label for="childNameInput">Naam kind</label><input class="field" id="childNameInput" maxlength="24" value="${escapeHtml(c.name)}" aria-label="Naam van het kind"></div>
      <div class="settings-row"><label for="groupSelect">Schoolgroep</label><select id="groupSelect" class="field">${GROUPS.map(x=>`<option value="${x.id}" ${x.id===c.group?'selected':''}>${escapeHtml(x.name)}</option>`).join('')}</select></div>
      <div class="settings-row"><label for="goalSelect">Dagdoel</label><select id="goalSelect" class="field">${[1,2,3,4,5].map(n=>`<option value="${n}" ${c.goal===n?'selected':''}>${n} ${n===1?'les':'lessen'}</option>`).join('')}</select></div>
      <button class="btn soft w-full" data-action="save-parent">Instellingen opslaan</button>
      <h3 class="mt">👧 Kinderprofielen</h3><div class="profile-grid">${state.children.map(k=>`<button class="profile-tile ${k.id===c.id?'selected':''}" data-action="switch" data-child="${escapeHtml(k.id)}"><span class="face">${escapeHtml(k.avatar)}</span><span><strong>${escapeHtml(k.name)}</strong><small>${escapeHtml(grade(k.group).name)}</small></span>${k.id===c.id?'✓':''}</button>`).join('')}</div>
      <button class="btn soft w-full" data-action="new-profile">＋ Kind toevoegen</button>
      <button class="link-btn" style="margin-top:13px" data-action="edit-profile">Avatar wijzigen / profiel beheren →</button></div></div>
      ${section('🕒 Laatst geoefend','Bekijk recente lessen en de score.')}
      <div class="panel">${sorted.length?sorted.map(h=>{const l=byId(h.lessonId);if(!l)return '';return `<div class="recent-row"><span class="recent-icon">${l.icon}</span><div class="grow"><strong>${escapeHtml(l.title)}</strong><small>${escapeHtml(new Date(h.date).toLocaleDateString('nl-NL',{day:'numeric',month:'short',year:'numeric'}))} · ${escapeHtml(grade(l.group).name)}</small></div><strong>${Number(h.score)}/${Number(h.total)}</strong></div>`;}).join(''):'<div class="empty">Nog geen lesresultaten beschikbaar.</div>'}</div>
      ${section('🔐 Privacy & back-up','Back-up en gegevensbeheer')}
      <div class="panel"><p class="muted">Wanneer je met je ouderaccount bent ingelogd, wordt je voortgang ook online opgeslagen. Je kunt daarnaast zelf een back-up downloaden. Bewaar die op een veilige plek.</p><div class="export-actions"><button class="btn soft sm" data-action="export">⬇️ Download back-up</button><button class="btn soft sm" data-action="import">⬆️ Back-up terugzetten</button><button class="btn danger sm" data-action="reset">Wis resultaten</button></div></div>`;
  }
  function render(){
    header();
    const pages={home,path,library,awards,parent,groups,quiz:question,result};
    $('main').innerHTML=(pages[view]||home)();
    document.title=(view==='quiz'&&session?byId(session.lessonId)?.title+' · ':'')+'SterrenStap';
  }
  function profileModal(mode='select'){
    modal=mode;
    const chooser=mode==='select'?`<div class="profile-grid">${state.children.map(c=>`<button class="profile-tile ${c.id===child().id?'selected':''}" data-action="switch" data-child="${escapeHtml(c.id)}"><span class="face">${escapeHtml(c.avatar)}</span><span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(grade(c.group).name)}</small></span>${c.id===child().id?'✓':''}</button>`).join('')}</div><button class="btn primary" data-action="new-profile">＋ Nieuw kinderprofiel</button>`:'';
    const editor=mode==='new'||mode==='edit'?`<form id="profileForm"><label class="field-label" for="profileName">Naam of bijnaam</label><input id="profileName" class="field" required maxlength="24" minlength="1" autocomplete="off" value="${mode==='edit'?escapeHtml(child().name):''}" placeholder="Bijv. Sam"><label class="field-label" for="profileGroup">Kies een groep</label><select id="profileGroup" class="field">${GROUPS.map(g=>`<option value="${g.id}" ${mode==='edit'&&g.id===child().group?'selected':''}>${escapeHtml(g.name)}</option>`).join('')}</select><h3>Kies een vriendje</h3><div class="emoji-picker">${['🦊','🦁','🐼','🐸','🦄','🐯','🐻','🐰','🐨','🦋','🐧','🦉'].map((a,i)=>`<button type="button" class="${(mode==='edit'?child().avatar===''+a:i===0)?'selected':''}" data-action="avatar" data-avatar="${a}" aria-pressed="${(mode==='edit'?child().avatar===a:i===0)}">${a}</button>`).join('')}</div><button type="submit" class="btn primary">${mode==='edit'?'Wijzigingen bewaren':'Profiel maken'} →</button>${mode==='edit'&&state.children.length>1?'<button type="button" class="btn danger" data-action="delete-profile">Profiel verwijderen</button>':''}</form>`:'';
    $('modalRoot').innerHTML=`<div class="modal-backdrop" data-action="backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="Kinderprofielen"><div class="modal-head"><h2>${mode==='new'?'Nieuw kinderprofiel':mode==='edit'?'Profiel aanpassen':'Wie gaat er leren?'} 🎒</h2><button class="close-btn" data-action="close" aria-label="Sluit venster">✕</button></div>${chooser}${editor}<p class="modal-footer">Je gegevens blijven op deze iPad of computer. Gebruik een back-up om ze naar een ander apparaat over te zetten.</p></div></div>`;
    if(mode==='new'||mode==='edit'){$('profileName').focus({preventScroll:true});}
  }
  function closeModal(){modal=null;$('modalRoot').replaceChildren();}
  function submitProfile(form){
    const name=String($('profileName')?.value||'').trim().slice(0,24);
    const group=$('profileGroup')?.value;
    const emoji=document.querySelector('.emoji-picker button.selected')?.dataset.avatar||'🦊';
    if(!name||!isValidGroup(group)){toast('Vul een naam en groep in.');return;}
    if(modal==='edit')Object.assign(child(),{name,group,avatar:emoji});
    else{const c=createChild(name,group,emoji);state.children.push(c);state.selectedId=c.id;}
    save();closeModal();view='home';render();window.scrollTo(0,0);
  }
  function exportData(){
    const data=JSON.stringify({version:2,exportDate:new Date().toISOString(),children:state.children,selectedId:state.selectedId,audio:state.audio},null,2);
    const blob=new Blob([data],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`sterrenstap-backup-${dateKey(new Date())}.json`;
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
    toast('Back-up wordt gedownload. Bewaar dit bestand veilig.');
  }
  function restoreData(file){
    if(!file||file.size>4*1024*1024){toast('Kies een geldige back-up kleiner dan 4 MB.');return;}
    const reader=new FileReader();reader.onload=()=>{
      try{
        const obj=JSON.parse(reader.result);
        if(!Array.isArray(obj.children)||!obj.children.length||obj.children.length>30)throw new Error('ongeldig');
        const c=obj.children.map(o=>{
          if(!o||typeof o!=='object'||!isValidGroup(o.group))throw new Error('groep');
          const basic=createChild(String(o.name||'Mijn kind').slice(0,24),o.group,String(o.avatar||'🦊').slice(0,8));
          const p={};for(const [k,v] of Object.entries(o.progress||{}))if(byId(k)&&v&&typeof v==='object'){
            p[k]={attempts:Math.max(0,Number(v.attempts)||0),lastScore:Math.min(5,Math.max(0,Number(v.lastScore)||0)),bestScore:Math.min(5,Math.max(0,Number(v.bestScore)||0)),lastPlayed:String(v.lastPlayed||''),stars:Math.min(3,Math.max(0,Number(v.stars)||0))};
          }
          basic.id=(typeof o.id==='string'&&/^[\w-]{1,60}$/.test(o.id))?o.id:basic.id;basic.progress=p;basic.goal=[1,2,3,4,5].includes(Number(o.goal))?Number(o.goal):2;
          basic.history=(Array.isArray(o.history)?o.history:[]).filter(h=>h&&byId(h.lessonId)&&Number.isFinite(Number(h.score))&&Number.isFinite(Number(h.total))&&!Number.isNaN(new Date(h.date).valueOf())).slice(-1000).map(h=>({lessonId:h.lessonId,date:h.date,score:Math.min(5,Math.max(0,Number(h.score))),total:5}));
          return basic;
        });
        if(!window.confirm('Deze back-up vervangt de huidige gegevens op dit apparaat. Doorgaan?'))return;
        state={children:c,selectedId:c.some(k=>k.id===obj.selectedId)?obj.selectedId:c[0].id,audio:obj.audio!==false};session=null;save();closeModal();view='parent';render();toast('Back-up teruggezet!');
      }catch(e){toast('Dit bestand is geen geldige SterrenStap-back-up.');}
    };
    reader.readAsText(file);$('restoreFile').value='';
  }
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-action]');if(!btn)return;
    const action=btn.dataset.action;
    if(action==='backdrop'&&e.target!==btn)return;
    if(action!=='backdrop')e.preventDefault();
    switch(action){
      case 'nav':session=null;navTo(btn.dataset.view);break;
      case 'group':setGroup(btn.dataset.group);break;
      case 'subject':subjectFilter=btn.dataset.subject;render();break;
      case 'start':startLesson(btn.dataset.lesson);break;
      case 'answer':answerQuestion(Number(btn.dataset.index));break;
      case 'next':nextQuestion();break;
      case 'quit':if(window.confirm('Wil je stoppen? De antwoorden van deze les worden dan nog niet opgeslagen.')){session=null;navTo('path');}break;
      case 'read':readCurrentQuestion();break;
      case 'audio':state.audio=!state.audio;if(!state.audio&&window.speechSynthesis)window.speechSynthesis.cancel();save();header();toast(state.audio?'Voorlezen aan':'Voorlezen uit');break;
      case 'profiles':profileModal();break;
      case 'new-profile':profileModal('new');break;
      case 'edit-profile':profileModal('edit');break;
      case 'switch':if(state.children.some(c=>c.id===btn.dataset.child)){state.selectedId=btn.dataset.child;save();closeModal();session=null;navTo('home');}break;
      case 'close':closeModal();break;
      case 'backdrop':closeModal();break;
      case 'avatar':document.querySelectorAll('.emoji-picker button').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',b===btn?'true':'false');});break;
      case 'save-parent':{const nm=$('childNameInput').value.trim(),g=$('groupSelect').value,goal=Number($('goalSelect').value);
        if(!nm||!isValidGroup(g)||![1,2,3,4,5].includes(goal)){toast('Controleer naam, groep en dagdoel.');break;}
        Object.assign(child(),{name:nm.slice(0,24),group:g,goal});save();render();toast('Instellingen opgeslagen!');break;}
      case 'delete-profile':if(state.children.length>1&&window.confirm(`Profiel van ${child().name} en de resultaten verwijderen?`)){state.children=state.children.filter(c=>c.id!==state.selectedId);state.selectedId=state.children[0].id;save();closeModal();navTo('parent');}break;
      case 'export':exportData();break;
      case 'import':$('restoreFile').click();break;
      case 'reset':if(window.confirm(`Alle lessen en sterren van ${child().name} wissen? Dit kan niet ongedaan worden gemaakt.`)){child().progress={};child().history=[];save();render();toast('Voortgang gewist.');}break;
    }
  });
  document.addEventListener('submit',e=>{if(e.target?.id==='profileForm'){e.preventDefault();submitProfile(e.target);}});
  $('restoreFile').addEventListener('change',e=>restoreData(e.target.files?.[0]));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal)closeModal();});
  render();
  window.STERRENSTAP_CLOUD?.connect({read:()=>structuredClone(state),apply:remote=>{if(!Array.isArray(remote.children)||!remote.children.length)return;state=remote;localStorage.setItem(KEY,JSON.stringify(state));session=null;view='home';render();}});
  if('serviceWorker' in navigator&&location.protocol==='https:'){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
})();
