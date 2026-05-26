import { SITE_CONFIG, buildWhatsAppUrl } from "./config.js";
import { findProduct, products } from "./products.js";
import { addToCart, initCart } from "./cart.js";
import { renderSizeGuide } from "./size-guide.js";

const formatPrice = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const PERSONALIZATION_PRICE = 60;

function getCurrentProduct() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("produto") || params.get("id");
  return findProduct(slug) || products[0];
}

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

function createThumbnail(image, index, productName) {
  return `
    <button class="product-thumb${index === 0 ? " is-active" : ""}" type="button" data-image="${image}">
      <img src="${image}" alt="${productName} - foto ${index + 1}" loading="lazy" />
    </button>
  `;
}

function getUnitPrice(product, customization) {
  return product.price + (customization.personalized ? PERSONALIZATION_PRICE : 0);
}

function createBuyMessage(product, selectedSize, customization) {
  const price = formatPrice(getUnitPrice(product, customization));
  const lines = [
    "Olá, gostaria de comprar pelo GFI Pay:",
    "",
    `1. ${product.name}`,
    `Tamanho: ${selectedSize}`,
  ];

  if (customization.personalized) {
    lines.push(`Nome: ${customization.name},`);
    lines.push(`Número: ${customization.number}`);
  } else {
    lines.push("Personalização: sem personalização");
  }

  lines.push(`Valor: ${price}`);
  lines.push("");
  lines.push(`Total: ${price}`);
  return lines.join("\n");
}

function updateBuyLink(buy, product, selectedSize, customization) {
  if (!buy) return;
  buy.href = buildWhatsAppUrl(createBuyMessage(product, selectedSize, customization));
}

function readCustomization() {
  const selectedOption = document.querySelector('input[name="customization"]:checked')?.value;
  const personalized = selectedOption === "yes";
  const name = document.getElementById("custom-name")?.value.trim().toUpperCase() || "";
  const number = document.getElementById("custom-number")?.value.trim() || "";

  return { personalized, name, number };
}

function isCustomizationValid(customization) {
  return !customization.personalized || (customization.name && customization.number);
}

function notifyInvalidCustomization() {
  alert("Preencha o nome e o número para usar a personalização.");
}

function renderRelatedProducts(currentProduct) {
  const track = document.getElementById("related-products");
  if (!track) return;

  const related = products.filter((product) => product.slug !== currentProduct.slug);
  track.innerHTML = related.map(createProductCard).join("");
  track.setAttribute("aria-busy", "false");
  initProductCarousel();
}

function initProductCarousel() {
  const carousel = document.querySelector(".product-carousel");
  const track = document.getElementById("related-products");
  const prev = carousel?.querySelector("[data-carousel-prev]");
  const next = carousel?.querySelector("[data-carousel-next]");
  if (!carousel || !track || !prev || !next) return;

  let currentIndex = 0;

  const getCards = () => [...track.querySelectorAll(".product-card")];

  const getStep = () => {
    const card = getCards()[0];
    if (!card) return track.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 18;
    return card.offsetWidth + gap;
  };

  const getVisibleCount = () => {
    const step = getStep();
    if (!step) return 1;
    return Math.max(1, Math.floor((track.clientWidth + Number.parseFloat(getComputedStyle(track).gap || 18)) / step));
  };

  const getMaxIndex = () => {
    const cards = getCards();
    return Math.max(0, cards.length - getVisibleCount());
  };

  const scrollToIndex = (index) => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    track.scrollTo({
      left: currentIndex * getStep(),
      behavior: "smooth",
    });
    updateButtons();
  };

  const syncIndexFromScroll = () => {
    const step = getStep();
    if (!step) return;
    currentIndex = Math.round(track.scrollLeft / step);
    currentIndex = Math.max(0, Math.min(currentIndex, getMaxIndex()));
  };

  const updateButtons = () => {
    const maxIndex = getMaxIndex();
    prev.disabled = currentIndex <= 0;
    next.disabled = currentIndex >= maxIndex;
  };

  prev.onclick = () => {
    scrollToIndex(currentIndex - 1);
  };

  next.onclick = () => {
    scrollToIndex(currentIndex + 1);
  };

  track.onscroll = () => {
    syncIndexFromScroll();
    updateButtons();
  };

  window.onresize = () => {
    scrollToIndex(Math.min(currentIndex, getMaxIndex()));
  };

  scrollToIndex(0);
}

function initSizeGuide(product) {
  const modal = document.getElementById("size-guide-modal");
  const openButton = document.getElementById("size-guide-open");
  const content = document.getElementById("size-guide-content");
  if (!modal || !openButton || !content) return;

  renderSizeGuide(content, product);

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    openButton.focus();
  };

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal__close")?.focus();
  };

  openButton.addEventListener("click", openModal);
  modal.querySelectorAll("[data-size-guide-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
}

function renderProductPage() {
  const product = getCurrentProduct();
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const mainImage = document.getElementById("product-main-image");
  const thumbs = document.getElementById("product-thumbs");
  const title = document.getElementById("product-title");
  const price = document.getElementById("product-price");
  const category = document.getElementById("product-category");
  const sizes = document.getElementById("product-sizes");
  const highlights = document.getElementById("product-highlights");
  const buy = document.getElementById("product-buy");
  const addCart = document.getElementById("product-add-cart");
  const customFields = document.getElementById("custom-fields");
  const customInputs = document.querySelectorAll('input[name="customization"], #custom-name, #custom-number');
  let selectedSize = product.sizes[0];

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
  const refreshPriceAndLink = () => {
    const customization = readCustomization();
    if (price) price.textContent = formatPrice(getUnitPrice(product, customization));
    updateBuyLink(buy, product, selectedSize, customization);
  };

  if (price) price.textContent = formatPrice(product.price);
  if (category) category.textContent = `${product.category} · ${product.edition}`;
  if (sizes) {
    sizes.innerHTML = product.sizes
      .map(
        (size, index) => `
          <button class="size-chip size-chip--button${index === 0 ? " is-active" : ""}" type="button" data-size="${size}">
            ${size}
          </button>
        `
      )
      .join("");

    sizes.addEventListener("click", (event) => {
      const button = event.target.closest(".size-chip--button");
      if (!button) return;

      sizes
        .querySelectorAll(".size-chip--button")
        .forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      selectedSize = button.dataset.size;
      refreshPriceAndLink();
    });

    refreshPriceAndLink();
  }
  if (highlights) {
    highlights.innerHTML = product.highlights.map((item) => `<li>${item}</li>`).join("");
  }
  customInputs.forEach((input) => {
    input.addEventListener("input", refreshPriceAndLink);
    input.addEventListener("change", () => {
      const customization = readCustomization();
      if (customFields) customFields.hidden = !customization.personalized;
      refreshPriceAndLink();
    });
  });
  buy?.addEventListener("click", (event) => {
    const customization = readCustomization();
    if (!isCustomizationValid(customization)) {
      event.preventDefault();
      notifyInvalidCustomization();
    }
  });
  addCart?.addEventListener("click", () => {
    const customization = readCustomization();
    if (!isCustomizationValid(customization)) {
      notifyInvalidCustomization();
      return;
    }
    addToCart(product, selectedSize, customization);
    document.getElementById("cart-panel")?.classList.add("is-open");
  });

  renderRelatedProducts(product);
  initSizeGuide(product);
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
  initCart();
});
