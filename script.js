/* ===== PRODUCTS DATA ===== */
const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    desc: "Titanio. Chip A18 Pro. Cámara de 48 MP.",
    category: "iphone",
    price: 1899999,
    originalPrice: 2149999,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=max&w=600&q=70",
    badge: "Nuevo",
    colors: ["#1D1D1F", "#F5F5F0", "#5E5CE6", "#BF5AF2"],
    featured: true
  },
  {
    id: 2,
    name: "iPhone 16",
    desc: "Chip A18. Cámara dual avanzada. Colores vibrantes.",
    category: "iphone",
    price: 1349999,
    originalPrice: 1499999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=max&w=600&q=70",
    badge: "Oferta",
    colors: ["#1D1D1F", "#F5F5F0", "#FF375F", "#30D158"],
    featured: true
  },
  {
    id: 3,
    name: "MacBook Air M3",
    desc: "Pantalla Liquid Retina de 13\". Hasta 18 h de batería.",
    category: "mac",
    price: 1799999,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=max&w=600&q=70",
    badge: null,
    colors: ["#1D1D1F", "#C0C0C0", "#F5F5F0"],
    featured: true
  },
  {
    id: 4,
    name: "iPad Pro M4",
    desc: "Chip M4. Pantalla Ultra Retina XDR. Apple Pencil Pro.",
    category: "ipad",
    price: 1649999,
    originalPrice: 1799999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=max&w=600&q=70",
    badge: "Oferta",
    colors: ["#1D1D1F", "#F5F5F0"],
    featured: true
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    desc: "Cancelación activa de ruido. Audio espacial personalizado.",
    category: "accesorios",
    price: 349999,
    originalPrice: 399999,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=max&w=600&q=70",
    badge: "25% OFF",
    colors: ["#F5F5F0"],
    featured: true
  },
  {
    id: 6,
    name: "Apple Watch Series 10",
    desc: "Pantalla más grande. Salud avanzada. Hasta 18 h.",
    category: "accesorios",
    price: 599999,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=max&w=600&q=70",
    badge: "Nuevo",
    colors: ["#1D1D1F", "#C0C0C0", "#E8D5B7"],
    featured: true
  },
  {
    id: 7,
    name: "MacBook Pro 14\" M3",
    desc: "Chip M3 Pro. Pantalla Liquid Retina XDR. ProRes.",
    category: "mac",
    price: 2899999,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=max&w=600&q=70",
    badge: null,
    colors: ["#1D1D1F", "#C0C0C0"],
    featured: false
  },
  {
    id: 8,
    name: "iPad Air M2",
    desc: "Chip M2. Pantalla Liquid Retina de 11\". Magia creativa.",
    category: "ipad",
    price: 999999,
    originalPrice: 1099999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=max&w=600&q=70",
    badge: "Oferta",
    colors: ["#5E5CE6", "#FF375F", "#30D158", "#1D1D1F"],
    featured: false
  }
];

const FREE_SHIPPING_THRESHOLD = 150000;
const CATEGORY_LABELS = {
  iphone: "iPhone",
  mac: "Mac",
  ipad: "iPad",
  accesorios: "Accesorios"
};

/* ===== STATE ===== */
let cart = JSON.parse(localStorage.getItem("istore-cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("istore-wish") || "[]");
let currentFilter = "all";
let currentSort = "featured";

/* ===== DOM ===== */
const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const continueShopping = document.getElementById("continueShopping");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartShipping = document.getElementById("cartShipping");
const checkoutBtn = document.getElementById("checkoutBtn");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const newsletterForm = document.getElementById("newsletterForm");
const wishlistBtn = document.getElementById("wishlistBtn");
const wishDrawer = document.getElementById("wishDrawer");
const closeWish = document.getElementById("closeWish");
const wishItems = document.getElementById("wishItems");
const wishCount = document.getElementById("wishCount");
const sortSelect = document.getElementById("sortSelect");
const toastWrap = document.getElementById("toastWrap");
const qvModal = document.getElementById("qvModal");
const qvBody = document.getElementById("qvBody");
const qvClose = document.getElementById("qvClose");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.getElementById("closeCheckout");
const checkoutNext = document.getElementById("checkoutNext");
const checkoutBack = document.getElementById("checkoutBack");
const checkoutTotalEl = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutFooter = document.getElementById("checkoutFooter");
const checkoutSuccess = document.getElementById("checkoutSuccess");
const orderSummary = document.getElementById("orderSummary");
const cardFields = document.getElementById("cardFields");
const transferInfo = document.getElementById("transferInfo");
const successMsg = document.getElementById("successMsg");
const successOrder = document.getElementById("successOrder");
const successClose = document.getElementById("successClose");

let checkoutStep = 1;
let lastOrder = null;

/* ===== UTILS ===== */
function formatPrice(num) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(num);
}

function formatCuota(price) {
  return formatPrice(Math.round(price / 12));
}

function showToast(message, type = "") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  toastWrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, 2600);
}

function lockBody(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

/* ===== A11Y: focus trap + inert ===== */
let lastFocusEl = null;
const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  );
}

function trapFocus(e, container) {
  if (e.key !== "Tab") return;
  const list = getFocusable(container);
  if (!list.length) return;
  const first = list[0];
  const last = list[list.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function setBackgroundInert(active) {
  const overlay = document.getElementById("overlay");
  [...document.body.children].forEach((el) => {
    if (el === overlay) return;
    if (el.classList?.contains("cart-drawer")) return;
    if (el.classList?.contains("search-modal")) return;
    if (el.classList?.contains("qv-modal")) return;
    if (el.classList?.contains("checkout-modal")) return;
    if (el.classList?.contains("toast-wrap")) return;
    if (el.classList?.contains("wa-float")) return;
    if (active) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

function openOverlayUI(panel, focusSelector) {
  lastFocusEl = document.activeElement;
  setBackgroundInert(true);
  const focusEl = focusSelector ? panel.querySelector(focusSelector) : getFocusable(panel)[0];
  requestAnimationFrame(() => focusEl?.focus());
  panel._trapHandler = (e) => trapFocus(e, panel);
  document.addEventListener("keydown", panel._trapHandler);
}

function closeOverlayUI(panel) {
  if (panel?._trapHandler) {
    document.removeEventListener("keydown", panel._trapHandler);
    panel._trapHandler = null;
  }
  const anyOpen =
    cartDrawer.classList.contains("open") ||
    wishDrawer.classList.contains("open") ||
    searchModal.classList.contains("open") ||
    qvModal.classList.contains("open") ||
    checkoutModal.classList.contains("open");
  if (!anyOpen) {
    setBackgroundInert(false);
    lastFocusEl?.focus?.();
    lastFocusEl = null;
  }
}

function setFieldError(id, message) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.classList.add("error");
  el.setAttribute("aria-invalid", "true");
  let err = document.getElementById(id + "-err");
  if (!err) {
    err = document.createElement("span");
    err.id = id + "-err";
    err.className = "field-error";
    err.setAttribute("role", "alert");
    el.insertAdjacentElement("afterend", err);
    el.setAttribute("aria-describedby", id + "-err");
  }
  err.textContent = message;
  return false;
}

function clearFieldError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("error");
  el.removeAttribute("aria-invalid");
  const err = document.getElementById(id + "-err");
  if (err) err.textContent = "";
}


/* ===== FILTER / SORT ===== */
function getFilteredProducts() {
  let list = [...products];
  if (currentFilter !== "all") {
    list = list.filter((p) => p.category === currentFilter);
  }
  switch (currentSort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name, "es"));
      break;
    default:
      list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
  }
  return list;
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".chip").forEach((c) => {
    const on = c.dataset.filter === filter;
    c.classList.toggle("active", on);
    c.setAttribute("aria-pressed", on ? "true" : "false");
  });
  renderProducts();
  const section = document.getElementById("productos");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  const list = getFilteredProducts();
  noResults.hidden = list.length > 0;

  productGrid.innerHTML = list
    .map((p, index) => {
      const wished = wishlist.includes(p.id);
      return `
    <article class="product-card reveal reveal-delay-${Math.min(index + 1, 6)}" data-id="${p.id}">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge ${p.badge.includes("OFF") || p.badge === "Oferta" ? "off" : ""}">${p.badge}</span>` : ""}
        <button type="button" class="wish-toggle ${wished ? "active" : ""}" aria-label="${wished ? "Quitar de favoritos" : "Agregar a favoritos"}" data-wish="${p.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${wished ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" width="600" height="600">
      </div>
      <div class="product-info">
        <span class="product-cat">${CATEGORY_LABELS[p.category] || p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-swatches">
          ${p.colors.map((c, i) => `<button type="button" class="swatch ${i === 0 ? "active" : ""}" style="background:${c}" aria-label="Color ${c}" aria-pressed="${i === 0 ? "true" : "false"}"></button>`).join("")}
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.originalPrice ? `<span class="price-original">${formatPrice(p.originalPrice)}</span>` : ""}
        </div>
        <p class="product-cuotas">12 cuotas de <strong>${formatCuota(p.price)}</strong> sin interés</p>
        <div class="product-actions">
          <button type="button" class="btn btn-primary" data-add="${p.id}">Agregar</button>
          <button type="button" class="btn btn-secondary" data-qv="${p.id}">Ver más</button>
        </div>
      </div>
    </article>`;
    })
    .join("");

  // Bind events
  productGrid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.add));
  });
  productGrid.querySelectorAll("[data-qv]").forEach((btn) => {
    btn.addEventListener("click", () => openQuickView(+btn.dataset.qv));
  });
  productGrid.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWish(+btn.dataset.wish);
    });
  });
  productGrid.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", function () {
      this.parentElement.querySelectorAll(".swatch").forEach((s) => {
        s.classList.remove("active");
        s.setAttribute("aria-pressed", "false");
      });
      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");
    });
  });

  observeReveals();
}

/* ===== CART ===== */
function saveCart() {
  localStorage.setItem("istore-cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  saveCart();
  showToast(`${product.name} agregado al carrito`, "success");
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  showToast("Producto eliminado");
}

function updateQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalItems;
  cartCount.classList.toggle("visible", totalItems > 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    cartTotal.textContent = formatPrice(0);
    cartShipping.textContent = "";
    cartShipping.classList.remove("free");
    checkoutBtn.disabled = true;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" width="72" height="72">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <button type="button" aria-label="Menos" data-qty="${item.id}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button type="button" aria-label="Más" data-qty="${item.id}" data-delta="1">+</button>
        </div>
        <button type="button" class="cart-item-remove" data-remove="${item.id}">Eliminar</button>
      </div>
    </div>`
    )
    .join("");

  cartItems.querySelectorAll("[data-qty]").forEach((btn) => {
    btn.addEventListener("click", () => updateQty(+btn.dataset.qty, +btn.dataset.delta));
  });
  cartItems.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(+btn.dataset.remove));
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotal.textContent = formatPrice(total);
  checkoutBtn.disabled = false;

  if (total >= FREE_SHIPPING_THRESHOLD) {
    cartShipping.textContent = "✓ Envío gratis";
    cartShipping.classList.add("free");
  } else {
    const remaining = FREE_SHIPPING_THRESHOLD - total;
    cartShipping.textContent = `Te faltan ${formatPrice(remaining)} para envío gratis`;
    cartShipping.classList.remove("free");
  }
}

function openCart() {
  closeWishDrawer();
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.hidden = false;
  lockBody(true);
  openOverlayUI(cartDrawer, "#closeCart");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  if (!wishDrawer.classList.contains("open") && !searchModal.classList.contains("open") && !qvModal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    lockBody(false);
  }
  closeOverlayUI(cartDrawer);
}

/* ===== WISHLIST ===== */
function saveWish() {
  localStorage.setItem("istore-wish", JSON.stringify(wishlist));
  updateWishUI();
}

function toggleWish(id) {
  const idx = wishlist.indexOf(id);
  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast("Eliminado de favoritos");
  } else {
    wishlist.push(id);
    showToast("Agregado a favoritos", "success");
  }
  saveWish();
  // Update heart buttons without full re-render if possible
  document.querySelectorAll(`[data-wish="${id}"]`).forEach((btn) => {
    const active = wishlist.includes(id);
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-label", active ? "Quitar de favoritos" : "Agregar a favoritos");
    const svg = btn.querySelector("svg");
    if (svg) svg.setAttribute("fill", active ? "currentColor" : "none");
  });
  renderWishItems();
}

function updateWishUI() {
  wishCount.textContent = wishlist.length;
  wishCount.classList.toggle("visible", wishlist.length > 0);
  renderWishItems();
}

function renderWishItems() {
  if (wishlist.length === 0) {
    wishItems.innerHTML = '<p class="cart-empty">Todavía no agregaste favoritos</p>';
    return;
  }
  wishItems.innerHTML = wishlist
    .map((id) => {
      const p = products.find((x) => x.id === id);
      if (!p) return "";
      return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" width="72" height="72">
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="price">${formatPrice(p.price)}</div>
          <div class="cart-item-qty" style="margin-top:10px;gap:8px">
            <button type="button" class="btn btn-primary btn-small" data-wish-add="${p.id}">Agregar</button>
            <button type="button" class="cart-item-remove" data-wish-remove="${p.id}">Quitar</button>
          </div>
        </div>
      </div>`;
    })
    .join("");

  wishItems.querySelectorAll("[data-wish-add]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(+btn.dataset.wishAdd));
  });
  wishItems.querySelectorAll("[data-wish-remove]").forEach((btn) => {
    btn.addEventListener("click", () => toggleWish(+btn.dataset.wishRemove));
  });
}

function openWish() {
  closeCartDrawer();
  wishDrawer.classList.add("open");
  wishDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.hidden = false;
  lockBody(true);
  openOverlayUI(wishDrawer, "#closeWish");
}

function closeWishDrawer() {
  wishDrawer.classList.remove("open");
  wishDrawer.setAttribute("aria-hidden", "true");
  if (!cartDrawer.classList.contains("open") && !searchModal.classList.contains("open") && !qvModal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    lockBody(false);
  }
  closeOverlayUI(wishDrawer);
}

/* ===== QUICK VIEW ===== */
function openQuickView(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  qvBody.innerHTML = `
    <div class="qv-img"><img src="${p.image}" alt="${p.name}"></div>
    <div class="qv-info">
      <span class="product-cat">${CATEGORY_LABELS[p.category]}</span>
      <h3 id="qvTitle">${p.name}</h3>
      <p class="qv-desc">${p.desc}</p>
      <div class="product-swatches" style="margin-bottom:16px">
        ${p.colors.map((c, i) => `<span class="swatch ${i === 0 ? "active" : ""}" style="background:${c}"></span>`).join("")}
      </div>
      <div class="price-current">${formatPrice(p.price)}</div>
      ${p.originalPrice ? `<div class="price-original">${formatPrice(p.originalPrice)}</div>` : ""}
      <p class="product-cuotas" style="margin-top:8px">12 cuotas de <strong>${formatCuota(p.price)}</strong></p>
      <div class="qv-actions">
        <button type="button" class="btn btn-primary btn-full" id="qvAdd">Agregar al carrito</button>
        <button type="button" class="btn btn-ghost btn-full" id="qvWish">${wishlist.includes(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}</button>
      </div>
    </div>`;
  qvBody.querySelector("#qvAdd").addEventListener("click", () => {
    addToCart(p.id);
    closeQuickView();
  });
  qvBody.querySelector("#qvWish").addEventListener("click", () => {
    toggleWish(p.id);
    closeQuickView();
  });
  qvBody.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", function () {
      this.parentElement.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
      this.classList.add("active");
    });
  });
  qvModal.classList.add("open");
  qvModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.hidden = false;
  lockBody(true);
  openOverlayUI(qvModal, "#qvClose");
}

function closeQuickView() {
  qvModal.classList.remove("open");
  qvModal.setAttribute("aria-hidden", "true");
  if (!cartDrawer.classList.contains("open") && !wishDrawer.classList.contains("open") && !searchModal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    lockBody(false);
  }
  closeOverlayUI(qvModal);
}

/* ===== SEARCH ===== */
function openSearch() {
  searchModal.classList.add("open");
  searchModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.hidden = false;
  lockBody(true);
  openOverlayUI(searchModal, "#searchInput");
}

function closeSearchModal() {
  searchModal.classList.remove("open");
  searchModal.setAttribute("aria-hidden", "true");
  searchInput.value = "";
  searchResults.innerHTML = "";
  if (!cartDrawer.classList.contains("open") && !wishDrawer.classList.contains("open") && !qvModal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    lockBody(false);
  }
  closeOverlayUI(searchModal);
}

function handleSearch(query) {
  if (!query.trim()) {
    searchResults.innerHTML = "";
    return;
  }
  const q = query.toLowerCase();
  const results = products.filter(
    (p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (CATEGORY_LABELS[p.category] || "").toLowerCase().includes(q)
  );
  if (results.length === 0) {
    searchResults.innerHTML = '<p style="padding:20px;color:#86868B;text-align:center">No se encontraron productos</p>';
    return;
  }
  searchResults.innerHTML = results
    .map(
      (p) => `
    <div class="search-result-item" data-search-add="${p.id}" role="button" tabindex="0">
      <img src="${p.image}" alt="${p.name}" width="48" height="48">
      <div>
        <strong style="font-size:15px">${p.name}</strong>
        <div style="font-size:13px;color:#6E6E73">${formatPrice(p.price)}</div>
      </div>
    </div>`
    )
    .join("");
  searchResults.querySelectorAll("[data-search-add]").forEach((el) => {
    el.addEventListener("click", () => {
      addToCart(+el.dataset.searchAdd);
      closeSearchModal();
    });
  });
}

/* ===== MOBILE MENU ===== */
function toggleMenu() {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuToggle.setAttribute("aria-controls", "navLinks");
  if (open) navLinks.querySelector("a")?.focus();
}

/* ===== SCROLL REVEAL ===== */
const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

function observeReveals() {
  const reveals = document.querySelectorAll(`${REVEAL_SELECTOR}:not(.visible)`);
  if (!reveals.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => entry.target.classList.add("visible"));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

/* ===== PARALLAX ===== */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const navbar = document.getElementById("navbar");
const heroBg = document.querySelector(".hero-bg");
const heroContent = document.querySelector(".hero-content");
const heroImageWrapper = document.querySelector(".hero-image-wrapper");
const featureImages = () => document.querySelectorAll(".feature-image img");
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;
  const heroHeight = document.getElementById("hero")?.offsetHeight || window.innerHeight;

  if (navbar) {
    navbar.style.background = scrollY > 50 ? "rgba(245, 245, 247, 0.92)" : "rgba(245, 245, 247, 0.72)";
  }

  if (prefersReducedMotion) {
    ticking = false;
    return;
  }

  if (scrollY < heroHeight) {
    const progress = scrollY / heroHeight;
    if (heroBg) heroBg.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
    if (heroContent) {
      heroContent.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0)`;
      heroContent.style.opacity = String(Math.max(0, 1 - progress * 1.15));
    }
    if (heroImageWrapper) heroImageWrapper.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;
  }

  featureImages().forEach((img) => {
    const rect = img.getBoundingClientRect();
    const viewH = window.innerHeight;
    if (rect.top < viewH && rect.bottom > 0) {
      const centerOffset = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      img.style.transform = `translate3d(0, ${centerOffset * -28}px, 0) scale(1.04)`;
    }
  });

  ticking = false;
}

let scrollEndTimer;
function onScroll() {
  document.documentElement.classList.add("is-scrolling");
  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(() => document.documentElement.classList.remove("is-scrolling"), 150);
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

/* ===== EVENTS ===== */
cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
continueShopping.addEventListener("click", closeCartDrawer);
wishlistBtn.addEventListener("click", openWish);
closeWish.addEventListener("click", closeWishDrawer);
qvClose.addEventListener("click", closeQuickView);

overlay.addEventListener("click", () => {
  closeCartDrawer();
  closeWishDrawer();
  closeSearchModal();
  closeQuickView();
  closeCheckout();
  navLinks.classList.remove("open");
});

searchBtn.addEventListener("click", openSearch);
closeSearch.addEventListener("click", closeSearchModal);
searchInput.addEventListener("input", (e) => handleSearch(e.target.value));

menuToggle.addEventListener("click", toggleMenu);

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    if (a.dataset.filter) setFilter(a.dataset.filter);
  });
});

document.querySelectorAll("[data-filter]").forEach((el) => {
  if (el.classList.contains("chip") || el.closest(".category-overlay") || el.closest(".footer-col")) {
    el.addEventListener("click", (e) => {
      if (el.dataset.filter) {
        e.preventDefault();
        setFilter(el.dataset.filter);
      }
    });
  }
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.setAttribute("aria-pressed", chip.classList.contains("active") ? "true" : "false");
  chip.addEventListener("click", () => setFilter(chip.dataset.filter));
});

sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;
  renderProducts();
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCartDrawer();
  openCheckout();
});

/* ===== CHECKOUT / PAYMENT GATEWAY ===== */
function cartSubtotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getSelectedPayment() {
  return checkoutForm.querySelector('input[name="payment"]:checked')?.value || "mercadopago";
}

function getCheckoutTotal() {
  const sub = cartSubtotal();
  if (getSelectedPayment() === "transfer") return Math.round(sub * 0.9);
  return sub;
}

function updateCheckoutTotalDisplay() {
  const sub = cartSubtotal();
  const pay = getSelectedPayment();
  const total = pay === "transfer" ? Math.round(sub * 0.9) : sub;
  checkoutTotalEl.textContent = formatPrice(total);
  if (pay === "transfer" && sub !== total) {
    checkoutTotalEl.title = `Precio lista ${formatPrice(sub)} · 10% OFF transferencia`;
  } else {
    checkoutTotalEl.title = "";
  }
}

function setCheckoutStep(step) {
  checkoutStep = step;
  document.querySelectorAll(".checkout-step-panel").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== String(step);
  });
  document.querySelectorAll("#checkoutSteps .step").forEach((el) => {
    const n = +el.dataset.step;
    el.classList.toggle("active", n === step);
    el.classList.toggle("done", n < step);
  });
  checkoutBack.hidden = step === 1;
  if (step === 3) {
    checkoutNext.textContent = "Pagar ahora";
    renderOrderSummary();
  } else if (step === 2) {
    checkoutNext.textContent = "Continuar";
    togglePaymentFields();
  } else {
    checkoutNext.textContent = "Continuar";
  }
  updateCheckoutTotalDisplay();
}

function togglePaymentFields() {
  const pay = getSelectedPayment();
  cardFields.hidden = pay !== "card";
  transferInfo.hidden = pay !== "transfer";
  updateCheckoutTotalDisplay();
}

function getDeliveryMode() {
  return checkoutForm.querySelector('input[name="delivery"]:checked')?.value || "pickup";
}

function validateStep1() {
  const delivery = getDeliveryMode();
  const base = ["ckName", "ckEmail", "ckPhone"];
  const ship = ["ckAddress", "ckCity", "ckCp"];
  const fields = delivery === "ship" ? base.concat(ship) : base;
  let ok = true;
  ship.forEach((id) => {
    if (delivery === "pickup") clearFieldError(id);
  });
  const messages = {
    ckName: "Ingresá tu nombre completo",
    ckEmail: "Ingresá un email válido",
    ckPhone: "Ingresá un teléfono válido",
    ckAddress: "Ingresá la dirección",
    ckCity: "Ingresá la ciudad",
    ckCp: "Ingresá el código postal",
  };
  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const val = el.value.trim();
    let valid = val.length > 0;
    if (id === "ckEmail") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (id === "ckPhone") valid = val.replace(/\D/g, "").length >= 8;
    if (!valid) {
      setFieldError(id, messages[id] || "Campo requerido");
      ok = false;
    } else clearFieldError(id);
  });
  if (!ok) {
    showToast("Completá los datos correctamente", "error");
    const firstErr = fields.map((id) => document.getElementById(id)).find((el) => el?.classList.contains("error"));
    firstErr?.focus();
  }
  return ok;
}

function validateStep2() {
  const pay = getSelectedPayment();
  if (pay !== "card") return true;
  const num = document.getElementById("ckCardNumber").value.replace(/\s/g, "");
  const exp = document.getElementById("ckCardExp").value.trim();
  const cvv = document.getElementById("ckCardCvv").value.trim();
  const name = document.getElementById("ckCardName").value.trim();
  let ok = true;
  if (!/^\d{13,19}$/.test(num)) {
    document.getElementById("ckCardNumber").classList.add("error");
    ok = false;
  } else document.getElementById("ckCardNumber").classList.remove("error");
  if (!/^\d{2}\/\d{2}$/.test(exp)) {
    document.getElementById("ckCardExp").classList.add("error");
    ok = false;
  } else document.getElementById("ckCardExp").classList.remove("error");
  if (!/^\d{3,4}$/.test(cvv)) {
    document.getElementById("ckCardCvv").classList.add("error");
    ok = false;
  } else document.getElementById("ckCardCvv").classList.remove("error");
  if (name.length < 3) {
    document.getElementById("ckCardName").classList.add("error");
    ok = false;
  } else document.getElementById("ckCardName").classList.remove("error");
  // Demo: reject cards that are all zeros
  if (ok && /^0+$/.test(num)) {
    showToast("Tarjeta rechazada (demo)", "error");
    return false;
  }
  if (!ok) showToast("Revisá los datos de la tarjeta", "error");
  return ok;
}

function renderOrderSummary() {
  const pay = getSelectedPayment();
  const sub = cartSubtotal();
  const discount = pay === "transfer" ? Math.round(sub * 0.1) : 0;
  const total = sub - discount;
  const payLabels = {
    mercadopago: "Mercado Pago",
    card: "Tarjeta de crédito/débito",
    transfer: "Transferencia bancaria"
  };
  const name = document.getElementById("ckName").value.trim();
  const email = document.getElementById("ckEmail").value.trim();
  const phone = document.getElementById("ckPhone").value.trim();
  const address = document.getElementById("ckAddress").value.trim();
  const city = document.getElementById("ckCity").value.trim();
  const cp = document.getElementById("ckCp").value.trim();
  const delivery = getDeliveryMode();

  const itemsHtml = cart
    .map(
      (i) =>
        `<div class="order-line"><span>${i.qty}× ${i.name}</span><span>${formatPrice(i.price * i.qty)}</span></div>`
    )
    .join("");

  orderSummary.innerHTML = `
    <h4>Productos</h4>
    ${itemsHtml}
    <div class="order-line"><span>Subtotal</span><span>${formatPrice(sub)}</span></div>
    ${discount ? `<div class="order-line"><span>Descuento transferencia (10%)</span><span class="discount">−${formatPrice(discount)}</span></div>` : ""}
    <div class="order-line"><span>Envío</span><span>${sub >= FREE_SHIPPING_THRESHOLD ? "Gratis" : "A coordinar"}</span></div>
    <div class="order-line total"><span>Total</span><span>${formatPrice(total)}</span></div>
    <h4>Envío</h4>
    <div class="order-meta">${name}<br>${delivery === "pickup" ? "Retiro en local — San Nicolás de los Arroyos" : `${address}, ${city} (${cp})`}<br>${email} · ${phone}</div>
    <h4>Pago</h4>
    <div class="order-meta">${payLabels[pay] || pay}</div>
  `;
}

function openCheckout() {
  checkoutSuccess.hidden = true;
  checkoutForm.hidden = false;
  checkoutFooter.hidden = false;
  document.getElementById("checkoutSteps").hidden = false;
  setCheckoutStep(1);
  updateCheckoutTotalDisplay();
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.hidden = false;
  lockBody(true);
  openOverlayUI(checkoutModal, "#ckName");
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
  checkoutNext.classList.remove("loading");
  checkoutNext.disabled = false;
  if (!cartDrawer.classList.contains("open") && !wishDrawer.classList.contains("open") && !searchModal.classList.contains("open") && !qvModal.classList.contains("open")) {
    overlay.classList.remove("visible");
    overlay.hidden = true;
    lockBody(false);
  }
  closeOverlayUI(checkoutModal);
}

/** Base URL del backend MP (mismo origen si servís con node server) */
const MP_API_BASE = window.ISTORE_API_BASE || "";

async function createMercadoPagoPreference() {
  const name = document.getElementById("ckName").value.trim();
  const email = document.getElementById("ckEmail").value.trim();
  const phone = document.getElementById("ckPhone").value.trim();
  const address = document.getElementById("ckAddress").value.trim();
  const city = document.getElementById("ckCity").value.trim();
  const cp = document.getElementById("ckCp").value.trim();
  const delivery = getDeliveryMode();

  const items = cart.map((item) => ({
    id: String(item.id),
    title: item.name,
    quantity: item.qty,
    unit_price: item.price,
    picture_url: item.image,
    category_id: "electronics",
  }));

  const nameParts = name.split(/\s+/);
  const payer = {
    name: nameParts[0] || name,
    surname: nameParts.slice(1).join(" ") || nameParts[0] || "",
    email,
    phone: { area_code: "336", number: phone.replace(/\D/g, "") },
    address: {
      zip_code: cp,
      street_name: address,
      street_number: "",
    },
  };

  const res = await fetch(`${MP_API_BASE}/api/create-preference`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, payer }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      data.message ||
      (data.error === "missing_credentials"
        ? "Falta configurar MP_ACCESS_TOKEN en el servidor"
        : "No se pudo iniciar el pago con Mercado Pago");
    throw new Error(msg);
  }
  return data;
}

function showCheckoutResult(status, orderId, extraMsg) {
  checkoutForm.hidden = true;
  checkoutFooter.hidden = true;
  document.getElementById("checkoutSteps").hidden = true;
  checkoutSuccess.hidden = false;

  const icon = checkoutSuccess.querySelector(".success-icon");
  if (status === "success") {
    if (icon) icon.textContent = "✓";
    checkoutSuccess.querySelector("h3").textContent = "¡Pago aprobado!";
    successMsg.textContent = extraMsg || "Tu pago con Mercado Pago fue acreditado.";
    showToast("¡Pago aprobado!", "success");
  } else if (status === "pending") {
    if (icon) icon.textContent = "…";
    checkoutSuccess.querySelector("h3").textContent = "Pago pendiente";
    successMsg.textContent =
      extraMsg || "Tu pago está pendiente de acreditación. Te avisamos cuando se confirme.";
    showToast("Pago pendiente", "");
  } else {
    if (icon) icon.textContent = "!";
    checkoutSuccess.querySelector("h3").textContent = "Pago no completado";
    successMsg.textContent =
      extraMsg || "El pago fue cancelado o rechazado. Podés intentar de nuevo.";
    showToast("Pago no completado", "error");
  }
  successOrder.textContent = orderId ? `Nº de pedido: ${orderId}` : "";
}

function finishLocalOrder(pay, total) {
  const orderId = "IS-" + Date.now().toString(36).toUpperCase();
  lastOrder = {
    id: orderId,
    total,
    payment: pay,
    items: [...cart],
    customer: {
      name: document.getElementById("ckName").value.trim(),
      email: document.getElementById("ckEmail").value.trim(),
    },
  };
  try {
    localStorage.setItem("istore-last-order", JSON.stringify(lastOrder));
  } catch (_) {}
  cart = [];
  saveCart();
  showCheckoutResult("success", orderId, {
    card: "Tu tarjeta fue debitada correctamente (demo local).",
    transfer: "Reserva generada. Realizá la transferencia en 48 hs.",
  }[pay]);
}

async function processPayment() {
  const pay = getSelectedPayment();
  const total = getCheckoutTotal();
  checkoutNext.classList.add("loading");
  checkoutNext.disabled = true;
  checkoutNext.textContent = "Procesando…";

  try {
    // ——— Mercado Pago real (Checkout Pro) ———
    if (pay === "mercadopago") {
      checkoutNext.textContent = "Redirigiendo a Mercado Pago…";
      const pref = await createMercadoPagoPreference();

      // Guardar carrito pendiente por si vuelve del checkout
      try {
        localStorage.setItem(
          "istore-pending-order",
          JSON.stringify({
            external_reference: pref.external_reference,
            preference_id: pref.id,
            items: cart,
            total: cartSubtotal(),
            at: Date.now(),
          })
        );
      } catch (_) {}

      if (!pref.init_point) throw new Error("Mercado Pago no devolvió URL de pago");
      window.location.href = pref.init_point;
      return;
    }

    // ——— Tarjeta / transferencia: flujo demo local ———
    await new Promise((r) => setTimeout(r, 1200));

    if (pay === "card") {
      const num = document.getElementById("ckCardNumber").value.replace(/\s/g, "");
      if (num.endsWith("0000")) {
        showToast("Pago rechazado por el banco (demo)", "error");
        return;
      }
    }

    finishLocalOrder(pay, total);
  } catch (err) {
    console.error(err);
    showToast(err.message || "Error al procesar el pago", "error");
  } finally {
    checkoutNext.classList.remove("loading");
    checkoutNext.disabled = false;
    checkoutNext.textContent = "Pagar ahora";
  }
}

/** Manejo de retorno desde Mercado Pago (?status=success|pending|failure&order=…) */
function handleMercadoPagoReturn() {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");
  const orderId = params.get("order");
  if (!status) return;

  // Limpiar query de la URL sin recargar
  const clean = window.location.pathname + window.location.hash;
  window.history.replaceState({}, "", clean);

  if (status === "success") {
    cart = [];
    saveCart();
    try {
      localStorage.removeItem("istore-pending-order");
    } catch (_) {}
  }

  openCheckout();
  showCheckoutResult(status, orderId);
}

// Card input masks
document.getElementById("ckCardNumber")?.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 16);
  e.target.value = v.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
});
document.getElementById("ckCardExp")?.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
  e.target.value = v;
});

checkoutForm?.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", togglePaymentFields);
});

function syncShipFields() {
  const shipFields = document.getElementById("shipFields");
  if (!shipFields) return;
  const pickup = getDeliveryMode() === "pickup";
  shipFields.style.display = pickup ? "none" : "block";
  ["ckAddress", "ckCity", "ckCp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.required = !pickup;
  });
}
checkoutForm?.querySelectorAll('input[name="delivery"]').forEach((radio) => {
  radio.addEventListener("change", syncShipFields);
});
syncShipFields();

checkoutNext?.addEventListener("click", async () => {
  if (checkoutStep === 1) {
    if (!validateStep1()) return;
    setCheckoutStep(2);
    return;
  }
  if (checkoutStep === 2) {
    if (!validateStep2()) return;
    setCheckoutStep(3);
    return;
  }
  if (checkoutStep === 3) {
    await processPayment();
  }
});

checkoutBack?.addEventListener("click", () => {
  if (checkoutStep > 1) setCheckoutStep(checkoutStep - 1);
});

closeCheckoutBtn?.addEventListener("click", closeCheckout);
successClose?.addEventListener("click", closeCheckout);

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.querySelector("input").value.trim();
  if (!email || !email.includes("@")) {
    showToast("Ingresá un email válido", "error");
    return;
  }
  showToast("¡Suscripción exitosa!", "success");
  e.target.reset();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCartDrawer();
    closeWishDrawer();
    closeSearchModal();
    closeQuickView();
    closeCheckout();
    navLinks.classList.remove("open");
  }
});

window.addEventListener("scroll", onScroll, { passive: true });

/* ===== INIT ===== */
renderProducts();
updateCartUI();
updateWishUI();

document.querySelectorAll(".category-card.reveal-scale").forEach((el, i) => {
  el.classList.add(`reveal-delay-${Math.min(i + 1, 6)}`);
});

observeReveals();
updateParallax();
handleMercadoPagoReturn();

window.addEventListener("load", () => {
  observeReveals();
});


/* Lazy-load Google Maps iframe */
(function lazyMap() {
  const iframe = document.querySelector(".store-map iframe[data-src]");
  if (!iframe) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
        io.disconnect();
      }
    });
  }, { rootMargin: "200px" });
  io.observe(iframe);
})();


/* ===== THEME TOGGLE ===== */
(function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    const t = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("istore-theme", t); } catch (_) {}
    btn.setAttribute("aria-label", t === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#141210" : "#F6EDD9");
  }

  // sync label on load
  applyTheme(currentTheme());

  btn.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });
})();
