/* ═══════════════════════════════════════════════
   DATOS DE PRODUCTOS
════════════════════════════════════════════════ */
const productos = {
  jugueteria: [
    { id:'j1', nombre:'Cola de Zorro con Plug', precio:65000, img:'IMG/zorro.png', cat:'Juguetería', desc:'Cola de piel sintética con plug metálico. Disponible en 6 colores: blanco, fucsia, negro, gris, café y rojo. Ideal para roleplay.' },
    { id:'j2', nombre:'Anillo Vibrador Mariposa', precio:38000, img:'IMG/anillo.png', cat:'Juguetería', desc:'Anillo vibrador en forma de mariposa para parejas. Incluye 3 tamaños diferentes. Material body-safe, silicona suave.' },
    { id:'j3', nombre:'Kit Bondage Completo', precio:120000, img:'IMG/kit.png', cat:'Juguetería', desc:'Set completo de 8 piezas: collar de sumisión, esposas, tapa ojos, lazo bondage, látigo, mordaza, correa collar y paleta spank.' },
    { id:'j4', nombre:'Vibrador Succionador Doble', precio:95000, img:'IMG/succionador.png', cat:'Juguetería', desc:'Vibrador con tecnología de succión y estimulación doble. Silicona médica premium, recargable USB. Disponible en 3 colores.' },
    { id:'j5', nombre:'Vibrador Rabbit Clásico', precio:72000, img:'IMG/clasico.png', cat:'Juguetería', desc:'Vibrador rabbit transparente con estimulación dual. Múltiples velocidades y patrones de vibración. Rotación interna.' },
    { id:'j6', nombre:'Vibrador Rabbit Premium', precio:85000, img:'IMG/rabit.png', cat:'Juguetería', desc:'Vibrador rabbit de doble estimulación con rotación de perlas internas. Material TPR suave, 7 modos de vibración.' },
    { id:'j7', nombre:'Bomba de Vacío Men PowerUp', precio:110000, img:'IMG/bomba.png', cat:'Juguetería', desc:'Bomba de vacío masculina de alta potencia con cilindro transparente graduado y válvula de presión ajustable. Incluye estuche.' },
    { id:'j8', nombre:'Anillo Vibrador Mariposa Mini', precio:28000, img:'IMG/mini.png', cat:'Juguetería', desc:'Versión mini del anillo vibrador mariposa. Perfecto para estimulación discreta. Incluye pila, encendido a presión.' },
  ],
  cosmetologia: [
    { id:'c1', nombre:'Crema YEAIN XXL For Men', precio:55000, img:'IMG/cremayeain.png', cat:'Cosmetología', desc:'Crema de uso masculino YEAIN XXL Bacteriostasis 60ml. Fórmula de origen natural. Uso externo. Envase discreto.' },
    { id:'c2', nombre:'Aceite Frío con Feromonas', precio:42000, img:'IMG/frio.png', cat:'Cosmetología', desc:'Aceite Frío Shunga Arte Erótico con feromonas para masajes sensuales. Presentación dual: rojo y azul. 60ml c/u.' },
    { id:'c3', nombre:'Gotas Multi Orgasm Women', precio:35000, img:'IMG/multi.png', cat:'Cosmetología', desc:'Gotas estimulantes femeninas de uso tópico. Fórmula intensificadora de sensaciones. Presentación 15ml. Discreta y efectiva.' },
    { id:'c4', nombre:'Lubricante Maracuyá + Feromonas', precio:30000, img:'IMG/mrcy.png', cat:'Cosmetología', desc:'Pack lubricante Maracuyá + Burbujas de Passion con Feromonas Shunga. Base agua, compatible con juguetes. 50ml c/u.' },
    { id:'c5', nombre:'Big Penis U.S.A. – Estimulante', precio:48000, img:'IMG/big.png', cat:'Cosmetología', desc:'Suplemento estimulante masculino Big Penis U.S.A. Caja x8 cápsulas. Para uso adulto. Leer indicaciones antes de usar.' },
    { id:'c6', nombre:'Lencería Mr.Deseo – Corsé Negro', precio:95000, img:'IMG/lence.png', cat:'Cosmetología', desc:'Corsé de encaje negro con portaligas y tanga incluida. Marca Mr.Deseo Lingerie. Tallas S a XL. Diseño sensual y elegante.' },
    { id:'c7', nombre:'Bull Extreme – Estimulante', precio:45000, img:'IMG/bull.png', cat:'Cosmetología', desc:'Estimulante masculino Bull Extreme en caja metálica x10 unidades. Fórmula veloz de acción. Para uso adulto responsable.' },
    { id:'c8', nombre:'Cialis – Tratamiento Masculino', precio:52000, img:'IMG/cial.png', cat:'Cosmetología', desc:'Tratamiento Cialis en cápsula blanda x10 unidades. Para disfunción eréctil. Consultar con médico antes de usar.' },
  ]
};

/* ═══════════════════════════════════════════════
   RENDER DE PRODUCTOS
════════════════════════════════════════════════ */
function formatPrice(n){ return '$' + n.toLocaleString('es-CO'); }

function renderGrid(productos, containerId) {
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = productos.map(p => `
    <div class="product-card">
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.nombre}" loading="lazy"/>
        <div class="card-overlay">
          <button class="btn-overlay" onclick="openProduct('${p.id}')">Ver detalle</button>
        </div>
      </div>
      <div class="card-info">
        <span class="card-cat">${p.cat}</span>
        <h3 class="card-name">${p.nombre}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-bottom">
          <span class="card-price">${formatPrice(p.precio)}</span>
          <button class="btn-cart" onclick="addToCart('${p.id}')">+ Carrito</button>
        </div>
      </div>
    </div>
  `).join('');
}

renderGrid(productos.jugueteria, 'jugueteriaGrid');
renderGrid(productos.cosmetologia, 'cosmetologiaGrid');

/* ═══════════════════════════════════════════════
   CARRITO
════════════════════════════════════════════════ */
let cart = [];

function getProductById(id) {
  return [...productos.jugueteria, ...productos.cosmetologia].find(p => p.id === id);
}

function addToCart(id) {
  const p = getProductById(id);
  if(!p) return;
  const exist = cart.find(i => i.id === id);
  if(exist) exist.qty++;
  else cart.push({...p, qty:1});
  updateCartBadge();
  showToast(`✅ ${p.nombre} agregado al carrito`);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const total = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartBadge').textContent = total;
}

function renderCart() {
  const cont = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if(!cart.length) {
    cont.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>';
    footer.style.display = 'none';
    return;
  }
  cont.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img class="cart-item-img" src="${i.img}" alt="${i.nombre}"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.nombre}</div>
        <div class="cart-item-price">${formatPrice(i.precio)} × ${i.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${i.id}')">✕</button>
    </div>
  `).join('');
  const subtotal = cart.reduce((s,i)=>s+(i.precio*i.qty),0);
  document.getElementById('cartTotal').textContent = formatPrice(subtotal);
  footer.style.display = 'block';
  updatePaySummary(subtotal);
}

function updatePaySummary(subtotal) {
  const envio = 8000;
  const el1 = document.getElementById('summarySubtotal');
  const el2 = document.getElementById('summaryTotal');
  if(el1) el1.textContent = formatPrice(subtotal || 0);
  if(el2) el2.textContent = formatPrice((subtotal || 0) + envio);
}

function resetCart() {
  cart = [];
  updateCartBadge();
  renderCart();
}

/* ═══════════════════════════════════════════════
   TOAST
════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  let t = document.getElementById('toast');
  if(!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);
      background:#1E1E1E;color:#fff;padding:.7rem 1.4rem;border-radius:8px;
      border:1px solid #CC0000;font-size:.88rem;z-index:9999;
      box-shadow:0 4px 20px rgba(0,0,0,.5);transition:opacity .3s;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity='1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity='0'; }, 2500);
}

/* ═══════════════════════════════════════════════
   MODALES
════════════════════════════════════════════════ */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Cerrar al hacer clic en overlay
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if(e.target === o) o.classList.remove('open'); });
});

// Botones de nav
document.getElementById('cartBtn').addEventListener('click', () => { renderCart(); openModal('cartModal'); });
document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
document.getElementById('searchBtn').addEventListener('click', () => {
  document.getElementById('searchBar').classList.toggle('open');
});

/* ═══════════════════════════════════════════════
   BÚSQUEDA
════════════════════════════════════════════════ */
function doSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if(!q) return;
  const todos = [...productos.jugueteria, ...productos.cosmetologia];
  const res = todos.filter(p => p.nombre.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  if(!res.length) { showToast('No se encontraron productos'); return; }
  // Renderiza en ambas grillas filtradas
  const jFil = res.filter(p=>p.cat==='Juguetería');
  const cFil = res.filter(p=>p.cat==='Cosmetología');
  renderGrid(jFil.length ? jFil : productos.jugueteria, 'jugueteriaGrid');
  renderGrid(cFil.length ? cFil : productos.cosmetologia, 'cosmetologiaGrid');
  document.getElementById('searchBar').classList.remove('open');
  if(res.length) { document.getElementById('jugueteria').scrollIntoView({behavior:'smooth'}); }
}
document.getElementById('searchInput').addEventListener('keydown', e => { if(e.key==='Enter') doSearch(); });

/* ═══════════════════════════════════════════════
   PRODUCTO DETALLE
════════════════════════════════════════════════ */
let currentProduct = null;

function openProduct(id) {
  const p = getProductById(id);
  if(!p) return;
  currentProduct = p;
  document.getElementById('pModalTitle').textContent = p.nombre;
  document.getElementById('pModalImg').src = p.img;
  document.getElementById('pModalImg').alt = p.nombre;
  document.getElementById('pModalCat').textContent = p.cat;
  document.getElementById('pModalDesc').textContent = p.desc;
  document.getElementById('pModalPrice').textContent = formatPrice(p.precio);
  document.getElementById('pModalQty').textContent = '1';
  document.getElementById('pModalAddBtn').onclick = () => {
    const qty = parseInt(document.getElementById('pModalQty').textContent);
    for(let i=0;i<qty;i++) addToCart(p.id);
    closeModal('productModal');
  };
  openModal('productModal');
}

function changeQty(delta) {
  const el = document.getElementById('pModalQty');
  let q = parseInt(el.textContent) + delta;
  if(q < 1) q = 1;
  if(q > 10) q = 10;
  el.textContent = q;
}

/* ═══════════════════════════════════════════════
   LOGIN / SESIÓN
════════════════════════════════════════════════ */
let loggedUser = null;

function showView(id) {
  document.querySelectorAll('.login-view').forEach(v => v.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  if(!email || !pass) { showToast('⚠️ Completa todos los campos'); return; }
  loggedUser = email;
  document.getElementById('accountWelcome').textContent = `👋 Hola, ${email}`;
  document.getElementById('loginTitle').textContent = '👤 Mi Cuenta';
  showView('view-account');
}

function doLogout() {
  loggedUser = null;
  document.getElementById('loginTitle').textContent = '👤 Iniciar Sesión';
  showView('view-login');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPass').value = '';
  showToast('Sesión cerrada correctamente');
}

/* ═══════════════════════════════════════════════
   PAGO – STEPS
════════════════════════════════════════════════ */
function goStep(n) {
  document.querySelectorAll('.pay-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
}

function toggleCardForm(radio) {
  const cf = document.getElementById('cardForm');
  cf.style.display = radio.value === 'card' ? 'block' : 'none';
}

function formatCard(input) {
  let v = input.value.replace(/\D/g,'').substring(0,16);
  input.value = v.replace(/(.{4})/g,'$1 ').trim();
}

/* ═══════════════════════════════════════════════
   FAQ
════════════════════════════════════════════════ */
function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const open = ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => { a.classList.remove('open'); });
  document.querySelectorAll('.faq-q').forEach(q => { q.classList.remove('open'); });
  if(!open) { ans.classList.add('open'); btn.classList.add('open'); }
}

/* ═══════════════════════════════════════════════
   NAVBAR SCROLL
════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ═══════════════════════════════════════════════
   HAMBURGER
════════════════════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
});

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
════════════════════════════════════════════════ */
const sections = ['hero','jugueteria','cosmetologia'];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if(!link) return;
    if(y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) link.classList.add('active');
    else link.classList.remove('active');
  });
});
