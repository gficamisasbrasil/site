import { SITE_CONFIG, buildWhatsAppUrl } from "./config.js";
import { products, categories } from "./products.js";
import { initCart } from "./cart.js";

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function createProductCard(product) {
  const detailUrl = `produto.html?produto=${product.slug}`;
  const sizes = product.sizes.map((size) => `<span class="size-chip">${size}</span>`).join("");

  return `
    <article class="product-card">
      <a class="product-card__media" href="${detailUrl}" aria-label="Ver detalhes de ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" width="520" height="650" />
      </a>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span>${product.category}</span>
          <span>${product.edition}</span>
        </div>
        <h3 class="product-card__title">
          <a href="${detailUrl}">${product.name}</a>
        </h3>
        <p class="product-card__price">${formatPrice(product.price)}</p>
        <div class="size-list" aria-label="Tamanhos disponíveis">${sizes}</div>
        <a class="btn btn--dark product-card__cta" href="${detailUrl}">Ver produto</a>
      </div>
    </article>
  `;
}

function renderProducts(filter = "Todos") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const filtered =
    filter === "Todos" ? products : products.filter((product) => product.category === filter);

  grid.innerHTML = filtered.map(createProductCard).join("");
  grid.setAttribute("aria-busy", "false");
}

function renderFilters() {
  const container = document.getElementById("category-filters");
  if (!container) return;

  container.innerHTML = categories
    .map(
      (category, index) => `
        <button type="button" class="filter-chip${index === 0 ? " is-active" : ""}" data-filter="${category}">
          ${category}
        </button>
      `
    )
    .join("");

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");
    if (!button) return;

    container
      .querySelectorAll(".filter-chip")
      .forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProducts(button.dataset.filter);
  });
}

function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

function initFooter() {
  const year = document.getElementById("footer-year");
  const instagram = document.getElementById("footer-instagram");

  if (year) year.textContent = String(SITE_CONFIG.year);
  if (instagram) instagram.href = SITE_CONFIG.instagram;
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = buildWhatsAppUrl();
  });
}

function initHeroVideo() {
  const video = document.getElementById("hero-video");
  const button = document.querySelector(".hero-video-play");
  const panel = document.querySelector(".hero-panel");
  if (!video || !button || !panel) return;

  const playVideo = () => {
    video.play();
  };

  button.addEventListener("click", playVideo);
  video.addEventListener("click", () => {
    if (video.paused) {
      playVideo();
    } else {
      video.pause();
    }
  });
  video.addEventListener("play", () => panel.classList.add("is-playing"));
  video.addEventListener("pause", () => panel.classList.remove("is-playing"));
  video.addEventListener("ended", () => panel.classList.remove("is-playing"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProducts();
  initHeader();
  initMobileNav();
  initFooter();
  initHeroVideo();
  initCart();
});
