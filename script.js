const properties = [
  {title:"Modern Villa with Pool, Ikoyi, Lagos", price:250000000, location:"Lagos", type:"Villa", beds:"4 Bed • 3 Bath • 2,500 sqm", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", desc:"Luxury 4-bedroom villa with private pool, fitted kitchen, BQ, and 24/7 security in the heart of Ikoyi. Perfect for family and investment.", features:["Private Pool","Fitted Kitchen","BQ","CCTV + Security","Gated Estate","2 Car Garage"]},
  {title:"Contemporary Residence, Maitama, Abuja", price:180000000, location:"Abuja", type:"Residence", beds:"5 Bed • 4 Bath • 3,200 sqm", img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", desc:"5-bedroom contemporary home in Maitama with smart home system, ample parking and serene environment. Close to schools and embassies.", features:["Smart Home","POP Ceiling","All Rooms Ensuite","Generator","Interlocked Compound","3 Car Garage"]},
  {title:"Luxury Home with Garden, Lekki, Lagos", price:320000000, location:"Lagos", type:"Home", beds:"5 Bed • 4 Bath • 4,000 sqm", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", desc:"Spacious 5-bedroom luxury home with beautiful garden, swimming pool and play area. Ideal for large family in Lekki Phase 1.", features:["Large Garden","Swimming Pool","Play Area","Gym","Staff Quarters","4 Car Garage"]},
];

function formatNaira(n){ return "₦" + n.toLocaleString(); }

function render(list){
  const grid = document.getElementById('propertyGrid');
  if(list.length === 0){ grid.innerHTML = "<p>No property match your search. Try All.</p>"; return; }
  grid.innerHTML = list.map((p, i) => `
    <div class="card" onclick="openDetails(${properties.indexOf(p)})">
      <div class="card-img"><span class="badge">FOR SALE</span><img src="${p.img}" alt="${p.title}"></div>
      <div class="price">${formatNaira(p.price)}</div>
      <h3>${p.title}</h3>
      <div class="meta">${p.beds} • Click for details →</div>
    </div>
  `).join('');
}

function openDetails(index){
  const p = properties[index];
  document.getElementById('mImg').src = p.img;
  document.getElementById('mPrice').textContent = formatNaira(p.price);
  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mMeta').textContent = p.beds + " • " + p.location;
  document.getElementById('mDesc').textContent = p.desc;
  document.getElementById('mFeatures').innerHTML = p.features.map(f => `<span>✓ ${f}</span>`).join('');
  const msg = encodeURIComponent(`Hello TerraGold, I am interested in: ${p.title} - ${formatNaira(p.price)}. Please send me details.`);
  document.getElementById('mWhats').href = `https://wa.me/2347012536141?text=${msg}`;
  document.getElementById('detailsModal').classList.add('open');
}

function filterProperties(){
  const loc = document.getElementById('location').value;
  const type = document.getElementById('type').value;
  const price = document.getElementById('price').value;
  let filtered = properties.filter(p => {
    if(loc !== 'all' && p.location !== loc) return false;
    if(type !== 'all' && p.type !== type) return false;
    if(price === 'low' && p.price >= 200000000) return false;
    if(price === 'mid' && (p.price < 200000000 || p.price > 300000000)) return false;
    if(price === 'high' && p.price <= 300000000) return false;
    return true;
  });
  render(filtered);
  document.getElementById('properties').scrollIntoView({behavior:'smooth'});
}

document.getElementById('searchBtn').addEventListener('click', filterProperties);
document.getElementById('viewBtn').addEventListener('click', () => document.getElementById('properties').scrollIntoView({behavior:'smooth'}));
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));
document.getElementById('enquireBtn').addEventListener('click', () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}));
document.getElementById('closeModal').addEventListener('click', () => document.getElementById('detailsModal').classList.remove('open'));
document.getElementById('detailsModal').addEventListener('click', (e) => { if(e.target.id === 'detailsModal') e.target.classList.remove('open'); });
document.getElementById('resetLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('location').value='all';
  document.getElementById('type').value='all';
  document.getElementById('price').value='all';
  render(properties);
});

// Contact form -> WhatsApp
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  const phone = document.getElementById('cPhone').value;
  const interest = document.getElementById('cInterest').value;
  const msg = document.getElementById('cMsg').value;
  const text = encodeURIComponent(`Hello TerraGold! My name is ${name}. Phone: ${phone}. I am interested in: ${interest}. Message: ${msg}`);
  window.open(`https://wa.me/2347012536141?text=${text}`, '_blank');
});

render(properties);
