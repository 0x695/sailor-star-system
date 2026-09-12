
(function(){

// ================= i18n =================
const TEXT = {
  en:{title:"✨ SAILOR SOLAR SYSTEM ✨", subtitle:'', play:'PLAY',
      hint:'drag to look around · pinch or scroll to zoom', topbar:'SOLAR SYSTEM',
      settingsTitle:'PARENT SETTINGS', voice:'🔊 Voice', music:'🎵 Music', volume:'🔉 Volume',
      magic:'🌙 Magic mode', axis:'📐 Show axis',
      speed:'⏩ Orbit speed', reset:'Reset view', guardianLabel:'GUARDIAN', narrator:'NARRATOR VOICE',
      finaleTitle:'🎉 AMAZING JOB! 🎉', finaleSub:'You explored the whole solar system! ✨'},
  fr:{title:"✨ SAILOR SOLAR SYSTEM ✨", subtitle:'', play:'JOUER',
      hint:'glisse pour regarder autour · pince ou fais défiler pour zoomer', topbar:'SYSTÈME SOLAIRE',
      settingsTitle:'RÉGLAGES PARENTS', voice:'🔊 Voix', music:'🎵 Musique', volume:'🔉 Volume',
      magic:'🌙 Mode magique', axis:"📐 Afficher l'axe",
      speed:'⏩ Vitesse orbitale', reset:'Réinitialiser la vue', guardianLabel:'GARDIENNE', narrator:'VOIX DU NARRATEUR',
      finaleTitle:'🎉 BRAVO ! 🎉', finaleSub:'Tu as visité tout le système solaire ! ✨'}
};
let currentLang = 'en';
const ORDINAL = {
  en:['1st','2nd','3rd','4th','5th','6th','7th','8th'],
  fr:['1ère','2ème','3ème','4ème','5ème','6ème','7ème','8ème']
};

// Mascot is emoji-based — no external art, works anywhere
const MASCOT_EMOJI = '🐈\u200d⬛';

// ================= planet data =================
const PLANETS = [
  {key:'mercury', name:{en:'Mercury',fr:'Mercure'}, color:0x9c8f7c, size:1.8, orbitR:18, orbitSpeed:1.9, spin:0.02, tilt:0.03,
   facts:{en:['Closest to the Sun ☀️','Super duper hot 🔥','Has no moons','Zooms around fast 💨'],
          fr:['Le plus proche du Soleil ☀️','Super chaud 🔥',"N'a pas de lune",'Fonce très vite 💨']},
   guardian:'Comet Blue', gIcon:'☄️', glow:'#8fd8ff', spark:'💧'},
  {key:'venus', name:{en:'Venus',fr:'Vénus'}, color:0xe8c27a, size:2.5, orbitR:27, orbitSpeed:1.5, spin:0.015, tilt:3.1,
   facts:{en:['2nd planet from the Sun','The hottest planet 🌡️','Shines bright at night ✨','Spins the wrong way'],
          fr:['2ème planète depuis le Soleil','La planète la plus chaude 🌡️','Brille fort la nuit ✨',"Tourne à l'envers"]},
   guardian:'Rose Shimmer', gIcon:'🌸', glow:'#ffb3e6', spark:'💛'},
  {key:'earth', name:{en:'Earth',fr:'Terre'}, color:0x4d8fe0, size:2.7, orbitR:38, orbitSpeed:1.0, spin:0.03, tilt:0.41,
   facts:{en:['Our home! 🏡','Lots of splashy water 🌊','Has one Moon 🌙','Just the right temperature'],
          fr:['Notre maison ! 🏡',"Plein d'eau qui éclabousse 🌊",'A une Lune 🌙','Température parfaite']},
   guardian:'Luna Bloom', gIcon:'🌍', glow:'#a3ffe0', spark:'💚'},
  {key:'mars', name:{en:'Mars',fr:'Mars'}, color:0xc1440e, size:2.2, orbitR:48, orbitSpeed:0.8, spin:0.028, tilt:0.44,
   facts:{en:['The red planet 🔴','Very cold and dusty','Has two tiny moons','A giant sleepy volcano'],
          fr:['La planète rouge 🔴','Très froide et poussiéreuse','A deux petites lunes','Un grand volcan endormi']},
   guardian:'Ember Star', gIcon:'🔥', glow:'#ff9d7a', spark:'🔥'},
  {key:'jupiter', name:{en:'Jupiter',fr:'Jupiter'}, color:0xd8ad7a, size:5.6, orbitR:63, orbitSpeed:0.45, spin:0.06, tilt:0.05,
   facts:{en:['The biggest planet 🪐','Has a giant swirly storm','Lots and lots of moons','Made of swirly gas'],
          fr:['La plus grande planète 🪐','A une immense tempête','Beaucoup de lunes','Faite de gaz tourbillonnant']},
   guardian:'Jolly Storm', gIcon:'⛈️', glow:'#ffe08a', spark:'⚡'},
  {key:'saturn', name:{en:'Saturn',fr:'Saturne'}, color:0xe3cf9c, size:5.2, orbitR:82, orbitSpeed:0.32, spin:0.055, tilt:0.47, rings:true,
   facts:{en:['Wears beautiful rings 💍','Second biggest planet','So light it could float','Has lots of icy moons'],
          fr:['Porte de beaux anneaux 💍','Deuxième plus grande planète','Si légère qu\'elle flotterait','Plein de lunes glacées']},
   guardian:'Ring Twinkle', gIcon:'💫', glow:'#ffe9b3', spark:'💫'},
  {key:'uranus', name:{en:'Uranus',fr:'Uranus'}, color:0x9ce0e0, size:3.8, orbitR:98, orbitSpeed:0.22, spin:0.04, tilt:1.7,
   facts:{en:['Spins on its side 🌀','A cool icy blue color','Very very far away','Has faint little rings'],
          fr:['Tourne sur le côté 🌀','Un joli bleu glacé','Très très loin','A de fins anneaux']},
   guardian:'Sky Whirl', gIcon:'🌀', glow:'#bffaff', spark:'🌀'},
  {key:'neptune', name:{en:'Neptune',fr:'Neptune'}, color:0x3f5fd8, size:3.6, orbitR:112, orbitSpeed:0.18, spin:0.04, tilt:0.49,
   facts:{en:['The windiest planet 🌬️','Deep, deep blue','The farthest planet','Very very cold'],
          fr:['La planète la plus venteuse 🌬️','Bleu profond','La planète la plus lointaine','Très très froide']},
   guardian:'Wave Glimmer', gIcon:'🌊', glow:'#9fc7ff', spark:'🌊'},
];

const SUN = {
  isSun:true, size:8, noGuardian:true,
  name:{en:'The Sun', fr:'Le Soleil'},
  facts:{en:['A giant ball of fire 🔥','Gives us light and warmth ☀️','All the planets circle around it','1 million Earths could fit inside!'],
         fr:['Une immense boule de feu 🔥','Nous donne lumière et chaleur ☀️','Toutes les planètes tournent autour','1 million de Terres tiendraient dedans !']},
  glow:'#ffe08a'
};

const MOON = {
  isMoon:true, size:0.85, orbitR:6.5, orbitSpeed:2.2,
  name:{en:'The Moon', fr:'La Lune'},
  facts:{en:['Circles around Earth 🌙','Covered in bumpy craters','Makes the ocean tides move 🌊','Astronauts have walked on it! 👨\u200d🚀'],
         fr:['Tourne autour de la Terre 🌙','Couverte de petits cratères','Fait bouger les marées de la mer 🌊','Des astronautes y ont marché ! 👨\u200d🚀']},
  guardian:'Crescent Wish', gIcon:'🌙', glow:'#ff6b9d', spark:'💗'
};

// ================= procedural textures =================
function mulberry32(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; } }
function makeCanvas(w,h){ const c=document.createElement('canvas'); c.width=w; c.height=h; return c; }

function craterTexture(seed, base, crater){
  const w=512,h=256, c=makeCanvas(w,h), ctx=c.getContext('2d'), rand=mulberry32(seed);
  ctx.fillStyle=base; ctx.fillRect(0,0,w,h);
  for(let i=0;i<400;i++){ const x=rand()*w,y=rand()*h,r=rand()*3+0.5;
    ctx.fillStyle=`rgba(0,0,0,${0.03+rand()*0.05})`; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); }
  for(let i=0;i<70;i++){ const x=rand()*w,y=rand()*h,r=rand()*14+3;
    ctx.globalAlpha=0.25+rand()*0.25; ctx.fillStyle=crater; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); ctx.globalAlpha=1;
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.arc(x,y,r*1.15,0,7); ctx.stroke(); }
  return new THREE.CanvasTexture(c);
}
function marsTexture(){
  const w=512,h=256, c=makeCanvas(w,h), ctx=c.getContext('2d'), rand=mulberry32(7);
  const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'#d98657'); g.addColorStop(.5,'#b6491f'); g.addColorStop(1,'#8f3414');
  ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  for(let i=0;i<250;i++){ const x=rand()*w,y=rand()*h,r=rand()*20+4;
    ctx.fillStyle=`rgba(60,20,10,${0.08+rand()*0.12})`; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.6,rand()*3,0,7); ctx.fill(); }
  ctx.fillStyle='rgba(255,255,255,0.85)';
  ctx.beginPath(); ctx.ellipse(w/2,8,w*0.28,14,0,0,7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(w/2,h-8,w*0.22,12,0,0,7); ctx.fill();
  return new THREE.CanvasTexture(c);
}
function venusTexture(){
  const w=512,h=256, c=makeCanvas(w,h), ctx=c.getContext('2d'), rand=mulberry32(3);
  ctx.fillStyle='#e8c27a'; ctx.fillRect(0,0,w,h);
  for(let i=0;i<8;i++){ const y=rand()*h;
    ctx.strokeStyle=`rgba(255,245,210,${0.15+rand()*0.2})`; ctx.lineWidth=6+rand()*14;
    ctx.beginPath(); ctx.moveTo(0,y);
    for(let x=0;x<=w;x+=32){ ctx.lineTo(x, y+Math.sin((x/60)+i)*10); }
    ctx.stroke(); }
  for(let i=0;i<40;i++){ const x=rand()*w,y=rand()*h,r=rand()*30+10;
    ctx.fillStyle=`rgba(255,235,190,${0.08+rand()*0.1})`; ctx.beginPath(); ctx.arc(x,y,r,0,7); ctx.fill(); }
  return new THREE.CanvasTexture(c);
}
function earthTexture(){
  const w=512,h=256, c=makeCanvas(w,h), ctx=c.getContext('2d'), rand=mulberry32(11);
  ctx.fillStyle='#1f5fa8'; ctx.fillRect(0,0,w,h);
  function blob(cx,cy,r){ ctx.beginPath(); const pts=10;
    for(let i=0;i<=pts;i++){ const a=(i/pts)*Math.PI*2, rr=r*(0.7+rand()*0.6);
      const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr*0.7; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
    ctx.closePath(); ctx.fill(); }
  const continents=[[90,90,60],[150,150,40],[300,80,70],[360,140,50],[430,190,35],[230,190,45],[60,180,30]];
  ctx.fillStyle='#3f9142'; continents.forEach(cc=>blob(cc[0],cc[1],cc[2]));
  ctx.fillStyle='rgba(30,90,40,0.5)'; continents.forEach(cc=>blob(cc[0]+10,cc[1]+5,cc[2]*0.5));
  ctx.fillStyle='rgba(255,255,255,0.35)';
  for(let i=0;i<25;i++){ const x=rand()*w,y=rand()*h,r=rand()*25+8;
    ctx.beginPath(); ctx.ellipse(x,y,r,r*0.4,rand()*3,0,7); ctx.fill(); }
  ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fillRect(0,0,w,10); ctx.fillRect(0,h-10,w,10);
  return new THREE.CanvasTexture(c);
}
function bandedTexture(seed, colors, spotColor){
  const w=512,h=256, c=makeCanvas(w,h), ctx=c.getContext('2d'), rand=mulberry32(seed);
  const bands=colors.length;
  for(let i=0;i<bands;i++){ ctx.fillStyle=colors[i]; ctx.fillRect(0,i*(h/bands),w,h/bands+2); }
  for(let i=0;i<h;i+=4){ ctx.fillStyle=`rgba(255,255,255,${rand()*0.04})`; ctx.fillRect(0,i,w,2); }
  for(let i=0;i<30;i++){ const x=rand()*w,y=rand()*h,r=rand()*40+10;
    ctx.fillStyle=`rgba(0,0,0,${0.03+rand()*0.05})`; ctx.beginPath(); ctx.ellipse(x,y,r,r*0.3,0,0,7); ctx.fill(); }
  if(spotColor){ ctx.fillStyle=spotColor; ctx.beginPath(); ctx.ellipse(w*0.62,h*0.58,34,20,0,0,7); ctx.fill(); }
  return new THREE.CanvasTexture(c);
}
const TEXTURES = {
  mercury: ()=>craterTexture(1,'#9c8f7c','#5f574a'),
  venus:   ()=>venusTexture(),
  earth:   ()=>earthTexture(),
  mars:    ()=>marsTexture(),
  jupiter: ()=>bandedTexture(4, ['#d8ad7a','#c79a63','#e8c9a0','#b98a55','#d8ad7a','#c79a63'], '#c1440e'),
  saturn:  ()=>bandedTexture(5, ['#e3cf9c','#d8c187','#ecdcb0','#d0b87a']),
  uranus:  ()=>bandedTexture(6, ['#9ce0e0','#8fd6d6','#a8e8e8']),
  neptune: ()=>bandedTexture(7, ['#3f5fd8','#3450bd','#4a6fe0']),
};

// ================= three.js setup =================
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

function makeStars(count, spread, size, color){
  const geo=new THREE.BufferGeometry(); const pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){ const r=spread*(0.4+Math.random()*0.6), theta=Math.random()*Math.PI*2, phi=Math.acos(2*Math.random()-1);
    pos[i*3]=r*Math.sin(phi)*Math.cos(theta); pos[i*3+1]=r*Math.sin(phi)*Math.sin(theta); pos[i*3+2]=r*Math.cos(phi); }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  return new THREE.Points(geo, new THREE.PointsMaterial({color,size,sizeAttenuation:true,transparent:true,opacity:0.9}));
}
scene.add(makeStars(1800, 600, 1.1, 0xffffff));
const magicStars = makeStars(500, 500, 2.2, 0xffb3e6); magicStars.visible=false; scene.add(magicStars);

const sunGroup = new THREE.Group();
const sun = new THREE.Mesh(new THREE.SphereGeometry(8,32,32), new THREE.MeshBasicMaterial({color:0xffdd66}));
sun.userData.planet = SUN;
sunGroup.add(sun);
const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
  map:(function(){ const c=makeCanvas(256,256), ctx=c.getContext('2d'), g=ctx.createRadialGradient(128,128,0,128,128,128);
    g.addColorStop(0,'rgba(255,235,150,0.9)'); g.addColorStop(0.4,'rgba(255,200,100,0.35)'); g.addColorStop(1,'rgba(255,200,100,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,256,256); return new THREE.CanvasTexture(c); })(),
  transparent:true, blending:THREE.AdditiveBlending
}));
sunGlow.scale.set(30,30,1); sunGroup.add(sunGlow); scene.add(sunGroup);
scene.add(new THREE.PointLight(0xfff2cc, 2.2, 400));
scene.add(new THREE.AmbientLight(0x554488, 0.55));

const planetObjs = [];
let earthBodyGroup = null;
PLANETS.forEach(p=>{
  const pivot = new THREE.Group(); pivot.rotation.y = Math.random()*Math.PI*2; scene.add(pivot);

  const ringGeo = new THREE.RingGeometry(p.orbitR-0.05, p.orbitR+0.05, 128); ringGeo.rotateX(Math.PI/2);
  const ringMat = new THREE.MeshBasicMaterial({color:0x6a5acb, transparent:true, opacity:0.25, side:THREE.DoubleSide});
  const ring = new THREE.Mesh(ringGeo, ringMat); scene.add(ring);

  const bodyGroup = new THREE.Group(); bodyGroup.position.x = p.orbitR; pivot.add(bodyGroup);
  if(p.key==='earth') earthBodyGroup = bodyGroup;
  const tiltGroup = new THREE.Group(); tiltGroup.rotation.z = p.tilt; bodyGroup.add(tiltGroup);

  const tex = TEXTURES[p.key]();
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(p.size,48,48),
    new THREE.MeshStandardMaterial({map:tex, roughness:0.9, metalness:0.03}));
  mesh.userData.planet = p; tiltGroup.add(mesh);

  // invisible hitbox, bigger than the visual planet, for easier small-finger tapping —
  // sized/spaced (via each planet's orbitR) so hitboxes never overlap a neighbor's
  const hitMesh = new THREE.Mesh(
    new THREE.SphereGeometry(p.size*1.35, 12, 12),
    new THREE.MeshBasicMaterial({visible:false})
  );
  hitMesh.userData.planet = p; tiltGroup.add(hitMesh);

  const axisLen = p.size*2.2;
  const axisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-axisLen,0), new THREE.Vector3(0,axisLen,0)]);
  const axis = new THREE.Line(axisGeo, new THREE.LineBasicMaterial({color:0xffffff, transparent:true, opacity:0.35}));
  axis.visible = false; // hidden by default
  tiltGroup.add(axis);

  if(p.rings){
    const sr = new THREE.Mesh(new THREE.RingGeometry(p.size*1.5, p.size*2.6, 64),
      new THREE.MeshBasicMaterial({color:0xd8c9a0, side:THREE.DoubleSide, transparent:true, opacity:0.85}));
    sr.rotation.x = Math.PI/2.3; tiltGroup.add(sr);
  }

  const sparkles = makeStars(60, p.size*3.2, 0.6, 0xffffff); sparkles.visible = false; tiltGroup.add(sparkles);

  planetObjs.push({data:p, pivot, mesh, hitMesh, ring, sparkles, ringMat, axis});
});

// Moon — orbits Earth's body group directly, independent of Earth's own axial tilt/spin
const moonPivot = new THREE.Group(); earthBodyGroup.add(moonPivot);
const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(MOON.size,32,32),
  new THREE.MeshStandardMaterial({map:craterTexture(42,'#c9c4bb','#8a857c'), roughness:0.95, metalness:0.02}));
moonMesh.position.x = MOON.orbitR;
moonMesh.userData.planet = MOON;
moonPivot.add(moonMesh);
const moonSparkles = makeStars(30, MOON.size*3, 0.4, 0xffffff); moonSparkles.visible = false; moonMesh.add(moonSparkles);

const sunObj = {data:SUN, mesh:sun};
const moonObj = {data:MOON, mesh:moonMesh, sparkles:moonSparkles};
const ALL_SELECTABLE = planetObjs.concat([sunObj, moonObj]);


// ================= camera controls =================
let spherical = {radius:210, theta:0.6, phi:1.15};
let userTarget = new THREE.Vector3(0,0,0);
const HOME_TARGET = new THREE.Vector3(0,0,0);
const HOME_RADIUS = 210;
let returningHome = false;
let isDragging=false, lastX=0, lastY=0, dragMoved=false;
let followingPlanet = null;

function updateCameraFromSpherical(){
  const p=spherical;
  camera.position.set(
    userTarget.x + p.radius*Math.sin(p.phi)*Math.sin(p.theta),
    userTarget.y + p.radius*Math.cos(p.phi),
    userTarget.z + p.radius*Math.sin(p.phi)*Math.cos(p.theta)
  );
  camera.lookAt(userTarget);
}
updateCameraFromSpherical();

let startX=0, startY=0;
renderer.domElement.addEventListener('pointerdown', e=>{ isDragging=true; dragMoved=false; lastX=e.clientX; lastY=e.clientY; startX=e.clientX; startY=e.clientY; });
window.addEventListener('pointerup', ()=> isDragging=false);
window.addEventListener('pointermove', e=>{
  if(!isDragging) return;
  const dx=e.clientX-lastX, dy=e.clientY-lastY; lastX=e.clientX; lastY=e.clientY;
  // small-finger tolerance: a little wobble while tapping shouldn't cancel planet selection
  if(Math.hypot(e.clientX-startX, e.clientY-startY) > 8){
    dragMoved = true; followingPlanet = null; returningHome = false;
  }
  if(dragMoved){
    spherical.theta -= dx*0.006;
    spherical.phi = Math.min(2.6, Math.max(0.3, spherical.phi - dy*0.006));
  }
});
renderer.domElement.addEventListener('wheel', e=>{
  followingPlanet = null; returningHome = false;
  spherical.radius = Math.min(380, Math.max(14, spherical.radius + e.deltaY*0.05));
}, {passive:true});
let pinchDist=null;
renderer.domElement.addEventListener('touchmove', e=>{
  if(e.touches.length===2){
    followingPlanet=null; returningHome = false;
    const dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY, d=Math.hypot(dx,dy);
    if(pinchDist!=null) spherical.radius = Math.min(380, Math.max(14, spherical.radius - (d-pinchDist)*0.15));
    pinchDist=d;
  }
}, {passive:true});
renderer.domElement.addEventListener('touchend', ()=> pinchDist=null);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function pickAt(x,y){
  mouse.x=(x/innerWidth)*2-1; mouse.y=-(y/innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(ALL_SELECTABLE.map(o=>o.hitMesh || o.mesh));
  return hits.length ? hits[0].object.userData.planet : null;
}
renderer.domElement.addEventListener('pointerup', e=>{
  if(dragMoved) return;
  const p = pickAt(e.clientX, e.clientY);
  if(p) selectPlanet(p);
});

// ================= voices =================
let voices = [];
let selectedVoiceURI = null;
function loadVoices(){ voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : []; renderVoiceList(); }
if('speechSynthesis' in window){
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}
let showAllVoices = false;
function renderVoiceList(){
  const list = document.getElementById('voice-list');
  if(!voices.length){ list.innerHTML = '<div style="opacity:.5;font-size:12px;">Loading voices…</div>'; return; }

  const matching = voices.filter(v => v.lang.toLowerCase().startsWith(currentLang));
  const useAll = showAllVoices || matching.length===0;
  const shown = useAll ? voices : matching;
  const shownIndexes = shown.map(v => voices.indexOf(v));

  let html = '';
  if(matching.length===0){
    html += `<div style="opacity:.6;font-size:11px;margin-bottom:6px;">${currentLang==='fr'
      ? "Aucune voix française trouvée sur cet appareil — ajoute une langue française dans les réglages vocaux de ton système ou navigateur. Voici toutes les voix disponibles :"
      : "No matching voices found on this device — showing everything available:"}</div>`;
  } else if(!showAllVoices){
    html += `<div style="opacity:.5;font-size:11px;margin-bottom:6px;">${currentLang==='fr' ? 'Voix françaises' : 'Matching voices'}</div>`;
  }
  html += shownIndexes.map(i=>{
    const v = voices[i];
    return `<div class="voice-row">
      <input type="radio" name="voice" id="v${i}" ${v.voiceURI===selectedVoiceURI?'checked':''}>
      <label for="v${i}">${v.name} (${v.lang})</label>
      <button data-i="${i}">▶</button>
    </div>`;
  }).join('');
  if(matching.length>0){
    html += `<label style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11px;opacity:.7;cursor:pointer;">
      <input type="checkbox" id="show-all-voices" ${showAllVoices?'checked':''}>
      ${currentLang==='fr' ? 'Afficher toutes les voix' : 'Show all voices'}
    </label>`;
  }
  list.innerHTML = html;

  list.querySelectorAll('input[type=radio]').forEach(r=> r.addEventListener('change', ()=>{ selectedVoiceURI = voices[parseInt(r.id.slice(1))].voiceURI; }));
  const allToggle = document.getElementById('show-all-voices');
  if(allToggle) allToggle.addEventListener('change', e=>{ showAllVoices = e.target.checked; renderVoiceList(); });
  list.querySelectorAll('button').forEach(btn=> btn.addEventListener('click', ()=>{
    const v = voices[parseInt(btn.dataset.i)];
    const sample = v.lang.toLowerCase().startsWith('fr') ? 'Bonjour ! Je suis une voix pour explorer les planètes.' : "Hello! I'm a voice for exploring the planets.";
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(sample); u.voice=v; u.pitch=1.1; u.rate=0.95;
    speechSynthesis.speak(u);
  }));
}
function speak(text){
  if(!voiceOn || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if(selectedVoiceURI){ const v = voices.find(vv=>vv.voiceURI===selectedVoiceURI); if(v) u.voice=v; }
  u.lang = currentLang==='fr' ? 'fr-FR' : 'en-US';
  u.pitch=1.15; u.rate=0.95;
  speechSynthesis.speak(u);
}

// ================= music (original generative ambient — no copyrighted melodies) =================
const MusicEngine = (function(){
  let ctx=null, master=null, filter=null, padNodes=[], arpTimeout=null, chordTimeout=null, running=false, muted=false, volume=0.4;
  const CHORDS = [
    [130.81,164.81,196.00,246.94], // Cmaj7 - warm, spacey open chord
    [110.00,146.83,174.61,220.00], // Am7 - a touch more wistful
    [146.83,196.00,220.00,261.63], // Dm9-ish - gentle movement
  ];
  const SCALE = [523.25,587.33,659.25,783.99,880.00,1046.50,1174.66]; // bright major-pentatonic-ish twinkle range
  function init(){
    if(ctx) return;
    ctx = new (window.AudioContext||window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = muted?0:volume;
    filter = ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=1200;
    filter.connect(master); master.connect(ctx.destination);
  }
  function playChord(freqs, fadeTime){
    const nodes = freqs.map((f,i)=>{
      const osc=ctx.createOscillator(); osc.type='sine'; osc.frequency.value=f;
      const g=ctx.createGain(); g.gain.value=0;
      osc.connect(g); g.connect(filter);
      const lfo=ctx.createOscillator(); lfo.frequency.value=0.04+i*0.008;
      const lfoGain=ctx.createGain(); lfoGain.gain.value=1.2;
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
      osc.start(); lfo.start();
      g.gain.linearRampToValueAtTime(0.045, ctx.currentTime+fadeTime);
      return {osc,g,lfo};
    });
    return nodes;
  }
  function fadeOutChord(nodes, fadeTime){
    nodes.forEach(n=>{
      n.g.gain.linearRampToValueAtTime(0, ctx.currentTime+fadeTime);
      setTimeout(()=>{ try{n.osc.stop(); n.lfo.stop();}catch(e){} }, (fadeTime+0.3)*1000);
    });
  }
  function cycleChords(idx){
    if(!running) return;
    const prev = padNodes;
    padNodes = playChord(CHORDS[idx % CHORDS.length], 4);
    if(prev.length) fadeOutChord(prev, 4);
    chordTimeout = setTimeout(()=> cycleChords(idx+1), 9000);
  }
  function playTwinkle(){
    if(!running) return;
    const f = SCALE[Math.floor(Math.random()*SCALE.length)];
    const osc=ctx.createOscillator(); osc.type='triangle'; osc.frequency.value=f;
    const g=ctx.createGain(); g.gain.value=0;
    osc.connect(g); g.connect(master);
    const t=ctx.currentTime;
    g.gain.linearRampToValueAtTime(0.05, t+0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t+1.1);
    osc.start(t); osc.stop(t+1.2);
    arpTimeout = setTimeout(playTwinkle, 500+Math.random()*550);
  }
  function start(){
    init();
    if(ctx.state==='suspended') ctx.resume();
    if(running) return;
    running = true;
    cycleChords(0);
    playTwinkle();
  }
  function stop(){
    running = false;
    if(arpTimeout) clearTimeout(arpTimeout);
    if(chordTimeout) clearTimeout(chordTimeout);
    if(padNodes.length) fadeOutChord(padNodes, 1.2);
    padNodes = [];
  }
  function setMuted(m){ muted=m; if(master) master.gain.linearRampToValueAtTime(muted?0:volume, ctx.currentTime+0.25); }
  function setVolume(v){ volume=v; if(master && !muted) master.gain.linearRampToValueAtTime(volume, ctx.currentTime+0.15); }

  // Original short birthday melody (not "Happy Birthday to You" — a new tune) for the finale
  const BIRTHDAY_MELODY = [
    {f:523.25,d:0.35},{f:659.25,d:0.35},{f:783.99,d:0.35},{f:659.25,d:0.35},
    {f:698.46,d:0.35},{f:880.00,d:0.35},{f:783.99,d:0.7},
    {f:587.33,d:0.35},{f:698.46,d:0.35},{f:880.00,d:0.35},{f:783.99,d:0.35},
    {f:659.25,d:0.35},{f:523.25,d:0.7},
  ];
  let birthdayRunning=false, birthdayTimeout=null;
  function playBirthdayMelody(i){
    if(!birthdayRunning) return;
    const note = BIRTHDAY_MELODY[i % BIRTHDAY_MELODY.length];
    const t=ctx.currentTime;
    const osc=ctx.createOscillator(); osc.type='triangle'; osc.frequency.value=note.f;
    const g=ctx.createGain(); g.gain.value=0;
    osc.connect(g); g.connect(master);
    g.gain.linearRampToValueAtTime(0.09, t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t+note.d);
    osc.start(t); osc.stop(t+note.d+0.05);
    const bass=ctx.createOscillator(); bass.type='sine'; bass.frequency.value=note.f/4;
    const bg=ctx.createGain(); bg.gain.value=0;
    bass.connect(bg); bg.connect(master);
    bg.gain.linearRampToValueAtTime(0.05, t+0.02);
    bg.gain.exponentialRampToValueAtTime(0.0001, t+note.d);
    bass.start(t); bass.stop(t+note.d+0.05);
    birthdayTimeout = setTimeout(()=> playBirthdayMelody(i+1), note.d*1000);
  }
  function startBirthday(){
    stop();
    init();
    if(ctx.state==='suspended') ctx.resume();
    birthdayRunning = true;
    playBirthdayMelody(0);
  }
  function stopBirthday(){
    birthdayRunning = false;
    if(birthdayTimeout) clearTimeout(birthdayTimeout);
    if(!muted) start();
  }

  return {start, stop, setMuted, setVolume, startBirthday, stopBirthday};
})();

// ================= info card / selection =================
const infoCard = document.getElementById('info-card');
const infoName = document.getElementById('info-name');
const infoSub = document.getElementById('info-sub');
const infoFacts = document.getElementById('info-facts');
const portraitImg = document.getElementById('portrait-img');
const portraitEmoji = document.getElementById('portrait-emoji');
const guardianName = document.getElementById('guardian-name');
let voiceOn = false; // off by default — tap the 🔊 Voice switch in settings to enable narration
let currentPlanet = null;

function selectPlanet(p, speakIt){
  if(speakIt===undefined) speakIt = true;
  currentPlanet = p;
  infoName.textContent = p.name[currentLang];
  if(p.isSun){
    infoSub.textContent = currentLang==='fr' ? "L'étoile au centre ⭐" : 'The star at the center ⭐';
  } else if(p.isMoon){
    infoSub.textContent = currentLang==='fr' ? "La compagne de la Terre 🌙" : "Earth's little companion 🌙";
  } else {
    const idx = PLANETS.indexOf(p);
    infoSub.textContent = ORDINAL[currentLang][idx] + (currentLang==='fr' ? ' planète depuis le Soleil' : ' planet from the Sun');
  }
  infoFacts.innerHTML = p.facts[currentLang].map(f=>'<li>'+f+'</li>').join('');
  const cardFlex = document.getElementById('card-flex');
  const guardianCaption = document.getElementById('guardian-caption');
  if(p.noGuardian){
    cardFlex.classList.add('no-portrait');
    guardianCaption.style.display = 'none';
  } else {
    cardFlex.classList.remove('no-portrait');
    guardianCaption.style.display = '';
    if(p.portrait){
      portraitImg.src = p.portrait;
      portraitImg.style.display = 'block';
      portraitEmoji.style.display = 'none';
    } else {
      portraitImg.style.display = 'none';
      portraitEmoji.style.display = 'flex';
      portraitEmoji.textContent = p.gIcon;
    }
    guardianName.textContent = p.guardian;
  }
  infoCard.classList.add('show');
  followingPlanet = ALL_SELECTABLE.find(o=>o.data===p);
  returningHome = false;
  if(speakIt){
    speak(p.name[currentLang] + '! ' + p.facts[currentLang][0]);
    onDiscover(p);
  }
}
document.getElementById('info-close').addEventListener('click', ()=>{
  infoCard.classList.remove('show'); followingPlanet=null; currentPlanet=null;
  returningHome = true;
});

// ================= settings =================
const gear = document.getElementById('discovery-badge');
const settings = document.getElementById('settings');
gear.addEventListener('click', ()=> settings.classList.toggle('open'));

const swVoice = document.getElementById('sw-voice');
swVoice.addEventListener('click', ()=>{ voiceOn=!voiceOn; swVoice.classList.toggle('on', voiceOn); });

let musicOn = true;
const swMusic = document.getElementById('sw-music');
swMusic.addEventListener('click', ()=>{ musicOn=!musicOn; swMusic.classList.toggle('on', musicOn); MusicEngine.setMuted(!musicOn); });
document.getElementById('volume').addEventListener('input', e=>{ MusicEngine.setVolume(parseFloat(e.target.value)); });

let magicOn = false;
const swMagic = document.getElementById('sw-magic');
swMagic.addEventListener('click', ()=>{
  magicOn=!magicOn; swMagic.classList.toggle('on', magicOn);
  magicStars.visible = magicOn;
  moonSparkles.visible = magicOn;
  planetObjs.forEach(o=>{
    o.sparkles.visible = magicOn;
    o.ringMat.color.set(magicOn ? 0xff8fd6 : 0x6a5acb);
    o.ringMat.opacity = magicOn ? 0.5 : 0.25;
  });
});

let axisOn = false;
const swAxis = document.getElementById('sw-axis');
swAxis.addEventListener('click', ()=>{
  axisOn=!axisOn; swAxis.classList.toggle('on', axisOn);
  planetObjs.forEach(o=> o.axis.visible = axisOn);
});

let speedMul = 1;
document.getElementById('speed').addEventListener('input', e=>{ speedMul = parseFloat(e.target.value); });

document.getElementById('reset-view').addEventListener('click', ()=>{
  followingPlanet=null; returningHome=false; userTarget.set(0,0,0);
  spherical = {radius:210, theta:0.6, phi:1.15};
  infoCard.classList.remove('show'); currentPlanet=null;
});

document.getElementById('lang-en').addEventListener('click', ()=> setLang('en'));
document.getElementById('lang-fr').addEventListener('click', ()=> setLang('fr'));
function setLang(lang){
  currentLang = lang;
  document.getElementById('lang-en').classList.toggle('active', lang==='en');
  document.getElementById('lang-fr').classList.toggle('active', lang==='fr');
  applyLang();
  renderVoiceList();
  if(currentPlanet) selectPlanet(currentPlanet, false);
}
function applyLang(){
  const t = TEXT[currentLang];
  document.getElementById('start-title').textContent = t.title;
  document.getElementById('start-sub').textContent = t.subtitle;
  document.getElementById('play-btn').textContent = t.play;
  document.getElementById('hint-line').textContent = t.hint;
  document.getElementById('settings-title').textContent = t.settingsTitle;
  document.getElementById('label-voice').textContent = t.voice;
  document.getElementById('label-music').textContent = t.music;
  document.getElementById('label-volume').textContent = t.volume;
  document.getElementById('label-magic').textContent = t.magic;
  document.getElementById('label-axis').textContent = t.axis;
  document.getElementById('label-speed').textContent = t.speed;
  document.getElementById('reset-view').textContent = t.reset;
  document.getElementById('narrator-title').textContent = t.narrator;
}
setLang('fr');

// ================= start screen twinkles + play =================
const start = document.getElementById('start-screen');
for(let i=0;i<40;i++){
  const t=document.createElement('div'); t.className='twinkle';
  const s=Math.random()*2+1; t.style.width=s+'px'; t.style.height=s+'px';
  t.style.left=(Math.random()*100)+'%'; t.style.top=(Math.random()*100)+'%';
  t.style.animationDelay=(Math.random()*2.4)+'s'; start.appendChild(t);
}
document.getElementById('play-btn').addEventListener('click', ()=>{
  start.style.transition='opacity .5s'; start.style.opacity='0';
  setTimeout(()=> start.style.display='none', 500);
  MusicEngine.setVolume(parseFloat(document.getElementById('volume').value));
  MusicEngine.start();
  document.getElementById('magic-wand').classList.add('visible');
});

// Mascot — tiny emoji cat running across the start screen (no external art needed)
const lunaSprite = document.getElementById('luna-sprite');
lunaSprite.textContent = MASCOT_EMOJI;

// Mascot's little speech line — rotates on its own, and on tap
const LUNA_PHRASES = {
  fr:['Bonjour ! 🌙','Regarde les étoiles ! ✨','Quelle planète veux-tu visiter ?','Allons voir la Lune ! 🌙','Miaou ! 🐈\u200d⬛','Allons explorer ! 🚀'],
  en:['Hello there! 🌙','Look at the stars! ✨','Which planet do you want to visit?','Let\'s go see the Moon! 🌙','Meow! 🐈\u200d⬛','Let\'s go explore! 🚀']
};
const lunaLine = document.getElementById('luna-line');
let lunaPhraseIdx = 0;
document.getElementById('luna-face').textContent = MASCOT_EMOJI;
function showLunaPhrase(idx){
  const phrases = LUNA_PHRASES[currentLang] || LUNA_PHRASES.en;
  lunaLine.classList.add('fade');
  setTimeout(()=>{
    document.getElementById('luna-bubble-text').textContent = phrases[idx % phrases.length];
    lunaLine.classList.remove('fade');
  }, 200);
}
showLunaPhrase(0);
let lunaAutoTimer = setInterval(()=>{
  lunaPhraseIdx = Math.floor(Math.random()*LUNA_PHRASES.fr.length);
  showLunaPhrase(lunaPhraseIdx);
}, 7000);
function lunaTap(){
  lunaPhraseIdx = (lunaPhraseIdx+1) % LUNA_PHRASES.fr.length;
  showLunaPhrase(lunaPhraseIdx);
  clearInterval(lunaAutoTimer);
  lunaAutoTimer = setInterval(()=>{
    lunaPhraseIdx = Math.floor(Math.random()*LUNA_PHRASES.fr.length);
    showLunaPhrase(lunaPhraseIdx);
  }, 7000);
}
lunaSprite.style.cursor = 'pointer';
lunaSprite.style.pointerEvents = 'auto';
lunaSprite.addEventListener('click', lunaTap);
lunaLine.addEventListener('click', lunaTap);

// ================= discovery / collection system =================
const TOTAL_DISCOVERABLE = ALL_SELECTABLE.length; // sun + 8 planets + moon = 10
const discovered = new Set();
const discoveryBadge = document.getElementById('discovery-badge');
function updateDiscoveryBadge(){
  discoveryBadge.innerHTML = `✨ ${discovered.size}/${TOTAL_DISCOVERABLE} &nbsp;⚙`;
}
updateDiscoveryBadge();

function spawnParticles(emoji, count){
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'float-particle';
    el.textContent = emoji;
    el.style.left = (45 + Math.random()*10) + 'vw';
    el.style.top = (55 + Math.random()*10) + 'vh';
    el.style.animationDelay = (Math.random()*0.3) + 's';
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 2000);
  }
}
function flashDiscovery(color, emoji){
  const overlay = document.getElementById('flash-overlay');
  overlay.style.setProperty('--flash-color', color);
  overlay.classList.remove('flash'); void overlay.offsetWidth; overlay.classList.add('flash');
  spawnParticles(emoji, 8);
}
function onDiscover(p){
  if(discovered.has(p)) return;
  discovered.add(p);
  updateDiscoveryBadge();
  const emoji = p.spark || (p.isSun ? '⭐' : '✨');
  flashDiscovery(p.glow || '#ff8fd6', emoji);
  if(discovered.size >= TOTAL_DISCOVERABLE){
    setTimeout(showBirthdayFinale, 900);
  }
}

// ================= birthday finale =================
function showBirthdayFinale(){
  const t = TEXT[currentLang];
  document.getElementById('birthday-title').textContent = t.finaleTitle;
  document.getElementById('birthday-sub').textContent = t.finaleSub;
  document.getElementById('birthday-overlay').classList.add('show');
  MusicEngine.startBirthday();
}
document.getElementById('birthday-close').addEventListener('click', ()=>{
  document.getElementById('birthday-overlay').classList.remove('show');
  MusicEngine.stopBirthday();
});

// ================= magic wand =================
const magicWand = document.getElementById('magic-wand');
const magicEffects = [
  ()=>{ // sparkle burst across the whole sky
    spawnParticles('✨', 14);
  },
  ()=>{ // hearts everywhere
    spawnParticles('💗', 12);
  },
  ()=>{ // brief speed boost then settle back
    const old = speedMul; speedMul = Math.min(4, old*3+1);
    setTimeout(()=>{ speedMul = old; }, 1800);
  },
  ()=>{ // shooting star flash
    flashDiscovery('#fff6c8', '🌠');
  },
  ()=>{ // ring color pulse
    planetObjs.forEach(o=>{ o.ringMat.color.set(0xffe08a); });
    setTimeout(()=> planetObjs.forEach(o=>{ o.ringMat.color.set(magicOn ? 0xff8fd6 : 0x6a5acb); }), 900);
  }
];
magicWand.addEventListener('click', ()=>{
  magicEffects[Math.floor(Math.random()*magicEffects.length)]();
  spawnParticles('🐈\u200d⬛', 5);
});


// ================= animate =================
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  sun.rotation.y += dt*0.05;
  sunGlow.material.rotation += dt*0.05;
  planetObjs.forEach(o=>{
    o.pivot.rotation.y += dt*0.05*o.data.orbitSpeed*speedMul;
    o.mesh.rotation.y += dt*o.data.spin*speedMul*10;
    if(o.sparkles.visible) o.sparkles.rotation.y += dt*0.3;
  });
  moonPivot.rotation.y += dt*0.05*MOON.orbitSpeed*speedMul;
  moonMesh.rotation.y += dt*0.02*speedMul*10;
  if(moonSparkles.visible) moonSparkles.rotation.y += dt*0.3;
  if(followingPlanet){
    const wp = new THREE.Vector3(); followingPlanet.mesh.getWorldPosition(wp);
    userTarget.lerp(wp, 0.08);
    const desiredRadius = followingPlanet.data.size*7 + 6;
    spherical.radius += (desiredRadius - spherical.radius)*0.08;
  } else if(returningHome){
    userTarget.lerp(HOME_TARGET, 0.14);
    spherical.radius += (HOME_RADIUS - spherical.radius)*0.14;
    if(userTarget.length()<0.1 && Math.abs(spherical.radius-HOME_RADIUS)<0.5){
      returningHome = false;
    }
  }
  updateCameraFromSpherical();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', ()=>{
  camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

})();
