import { SITE_CONFIG, buildWhatsAppUrl } from "./config.js";
import { findProduct, products } from "./products.js";

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function getCurrentProduct() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("produto") || params.get("id");
  return findProduct(slug) || products[0];
}

function createThumbnail(image, index, productName) {
  return `
    <button class="product-thumb${index === 0 ? " is-active" : ""}" type="button" data-image="${image}">
      <img src="${image}" alt="${productName} - foto ${index + 1}" loading="lazy" />
    </button>
  `;
}

function renderProductPage() {
  const product = getCurrentProduct();
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const mainImage = document.getElementById("product-main-image");
  const thumbs = document.getElementById("product-thumbs");
  const title = document.getElementById("product-title");
  const price = document.getElementById("product-price");
  const category = document.getElementById("product-category");
  const description = document.getElementById("product-description");
  const sizes = document.getElementById("product-sizes");
  const highlights = document.getElementById("product-highlights");
  const buy = document.getElementById("product-buy");

  document.title = `${product.name} | GFI Connect`;

  if (mainImage) {
    mainImage.src = gallery[0];
    mainImage.alt = product.name;
  }

  if (thumbs) {
    thumbs.innerHTML = gallery.map((image, index) => createThumbnail(image, index, product.name)).join("");
    thumbs.addEventListener("click", (event) => {
      const button = event.target.closest(".product-thumb");
      if (!button || !mainImage) return;

      mainImage.src = button.dataset.image;
      thumbs.querySelectorAll(".product-thumb").forEach((thumb) => thumb.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  }

  if (title) title.textContent = product.name;
  if (price) price.textContent = formatPrice(product.price);
  if (category) category.textContent = `${product.category} · ${product.edition}`;
  if (description) description.textContent = product.description;
  if (sizes) sizes.innerHTML = product.sizes.map((size) => `<span class="size-chip">${size}</span>`).join("");
  if (highlights) {
    highlights.innerHTML = product.highlights.map((item) => `<li>${item}</li>`).join("");
  }
  if (buy) buy.href = buildWhatsAppUrl(product.name);
}

function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initFooter() {
  const year = document.getElementById("footer-year");
  const instagram = document.getElementById("footer-instagram");

  if (year) year.textContent = String(SITE_CONFIG.year);
  if (instagram) instagram.href = SITE_CONFIG.instagram;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProductPage();
  initHeader();
  initFooter();
});
