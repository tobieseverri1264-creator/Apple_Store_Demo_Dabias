const body = document.body;
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.nav-menu-button');
const navLinks = document.querySelector('.nav-links');
const searchButton = document.querySelector('#searchButton');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
const closeSearch = document.querySelector('#closeSearch');
const cartButton = document.querySelector('#cartButton');
const cartDrawer = document.querySelector('#cartDrawer');
const closeCart = document.querySelector('#closeCart');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const overlay = document.querySelector('#overlay');
const toast = document.querySelector('#toast');
const products = document.querySelectorAll('.product-card');
let cart = [];
let toastTimer;

const currency = (amount) => `$${amount.toLocaleString('es-AR')}`;
const productPrices = { 'Aura Pro': 1299999, 'Studio Max 14': 1899999, 'Pulse Pods': 246499 };

function closeLayers() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
  navLinks.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  overlay.classList.remove('visible');
  body.classList.remove('locked');
}

function openCart() {
  closeLayers();
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  overlay.classList.add('visible');
  body.classList.add('locked');
}

function renderCart() {
  const quantities = cart.reduce((acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }), {});
  const total = cart.reduce((sum, name) => sum + productPrices[name], 0);
  cartCount.textContent = cart.length;
  cartCount.classList.toggle('has-items', cart.length > 0);
  cartTotal.textContent = currency(total);
  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span>⌁</span><p>Tu carrito está esperando<br />algo increíble.</p><a href="#iphone" id="emptyCartLink">Ver productos</a></div>';
    document.querySelector('#emptyCartLink').addEventListener('click', closeLayers);
    return;
  }
  cartItems.innerHTML = Object.entries(quantities).map(([name, quantity]) => `
    <div class="cart-item">
      <div class="cart-item-art"></div>
      <div class="cart-item-info"><strong>${name}</strong><span>Cantidad: ${quantity} · ${currency(productPrices[name] * quantity)}</span></div>
      <button class="cart-item-remove" type="button" data-remove="${name}" aria-label="Quitar ${name}">×</button>
    </div>`).join('');
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {
    const index = cart.indexOf(button.dataset.remove);
    if (index > -1) cart.splice(index, 1);
    renderCart();
  }));
}

function showToast() {
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
  cart.push(button.dataset.add);
  renderCart();
  showToast();
}));

document.querySelectorAll('.wish-button').forEach(button => button.addEventListener('click', () => button.classList.toggle('active')));
document.querySelectorAll('.swatch').forEach(swatch => swatch.addEventListener('click', () => {
  const group = swatch.parentElement;
  group.querySelectorAll('.swatch').forEach(item => item.classList.remove('active'));
  swatch.classList.add('active');
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeLayers));

searchButton.addEventListener('click', () => {
  closeLayers();
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden', 'false');
  setTimeout(() => searchInput.focus(), 180);
});
closeSearch.addEventListener('click', closeLayers);
searchInput.addEventListener('input', (event) => {
  const term = event.target.value.trim().toLowerCase();
  products.forEach(product => product.style.display = !term || product.dataset.product.toLowerCase().includes(term) || product.dataset.category.includes(term) ? '' : 'none');
});
cartButton.addEventListener('click', openCart);
closeCart.addEventListener('click', closeLayers);
overlay.addEventListener('click', closeLayers);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLayers(); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelector('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const message = document.querySelector('#formMessage');
  if (!email.checkValidity()) { message.textContent = 'Ingresá un correo válido para continuar.'; message.style.color = '#bb3f44'; email.focus(); return; }
  message.textContent = '¡Listo! Te sumaste a las novedades de NOVA.';
  message.style.color = '#267c42';
  email.value = '';
});

renderCart();
