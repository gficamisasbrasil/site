import { buildWhatsAppUrl } from "./config.js";

const CART_KEY = "gfi-cart";
const PERSONALIZATION_PRICE = 60;

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function getItemUnitPrice(item) {
  return item.price + (item.personalized ? PERSONALIZATION_PRICE : 0);
}

export function addToCart(product, size, customization = {}) {
  const cart = getCart();
  const personalized = Boolean(customization.personalized);
  const customName = personalized ? customization.name : "";
  const customNumber = personalized ? customization.number : "";
  const existing = cart.find(
    (item) =>
      item.id === product.id &&
      item.size === size &&
      Boolean(item.personalized) === personalized &&
      (item.customName || "") === customName &&
      (item.customNumber || "") === customNumber
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      size,
      price: product.price,
      personalized,
      customName,
      customNumber,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

function updateQuantity(index, delta) {
  const cart = getCart()
    .map((item, itemIndex) => (itemIndex === index ? { ...item, quantity: item.quantity + delta } : item))
    .filter((item) => item.quantity > 0);

  saveCart(cart);
}

function removeItem(index) {
  saveCart(getCart().filter((_, itemIndex) => itemIndex !== index));
}

function getTotal(cart) {
  return cart.reduce((sum, item) => sum + getItemUnitPrice(item) * item.quantity, 0);
}

function expandCartItems(cart) {
  return cart.flatMap((item) => Array.from({ length: item.quantity }, () => item));
}

function buildCartMessage(cart) {
  const lines = expandCartItems(cart).flatMap((item, index) => {
    const details = [
      `${index + 1}. ${item.name}`,
      `Tamanho: ${item.size}`,
    ];

    if (item.personalized) {
      details.push(`Nome: ${item.customName},`);
      details.push(`Número: ${item.customNumber}`);
    } else {
      details.push("Personalização: sem personalização");
    }

    details.push(`Valor: ${formatPrice(getItemUnitPrice(item))}`);
    details.push("");
    return details;
  });

  return [
    "Olá, gostaria de comprar pelo GFI Pay:",
    "",
    ...lines,
    `Total: ${formatPrice(getTotal(cart))}`,
  ].join("\n");
}

function renderCart() {
  const panel = document.getElementById("cart-panel");
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.querySelector("[data-cart-count]");
  const checkout = document.getElementById("cart-checkout");
  const cart = getCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (count) count.textContent = String(itemCount);
  if (!panel || !list || !total || !checkout) return;

  if (!cart.length) {
    list.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
    total.textContent = formatPrice(0);
    checkout.href = "#";
    checkout.classList.add("is-disabled");
    return;
  }

  list.innerHTML = cart
    .map(
      (item, index) => `
        <article class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>Tamanho ${item.size} · ${formatPrice(getItemUnitPrice(item))}</span>
            ${
              item.personalized
                ? `<span>Personalização: ${item.customName} · ${item.customNumber}</span>`
                : `<span>Sem personalização</span>`
            }
          </div>
          <div class="cart-item__actions">
            <button type="button" data-cart-dec data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-inc data-index="${index}">+</button>
            <button type="button" data-cart-remove data-index="${index}">Remover</button>
          </div>
        </article>
      `
    )
    .join("");
  total.textContent = formatPrice(getTotal(cart));
  checkout.href = buildWhatsAppUrl(buildCartMessage(cart));
  checkout.classList.remove("is-disabled");
}

export function initCart() {
  const openButtons = document.querySelectorAll("[data-cart-open]");
  const closeButtons = document.querySelectorAll("[data-cart-close]");
  const panel = document.getElementById("cart-panel");
  const list = document.getElementById("cart-items");
  const clearButton = document.getElementById("cart-clear");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => panel?.classList.add("is-open"));
  });
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => panel?.classList.remove("is-open"));
  });
  clearButton?.addEventListener("click", clearCart);
  list?.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const index = Number(target.dataset.index);
    if (Number.isNaN(index)) return;
    if (target.matches("[data-cart-inc]")) updateQuantity(index, 1);
    if (target.matches("[data-cart-dec]")) updateQuantity(index, -1);
    if (target.matches("[data-cart-remove]")) removeItem(index);
  });

  renderCart();
}
