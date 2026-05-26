export const SIZE_GUIDES = {
  jogador: {
    title: "Tabela de medidas — Versão jogador",
    image: "assets/size-guides/tabela-jogador.png",
    alt: "Tabela de medidas versão jogador com largura, altura e altura recomendada nos tamanhos P, M, G, GG e GGG.",
  },
  torcedor: {
    title: "Tabela de medidas — Versão torcedor / retrô",
    image: "assets/size-guides/tabela-torcedor-retro.png",
    alt: "Tabela de medidas versão torcedor e retrô com comprimento, largura e altura recomendada nos tamanhos P, M, G, GG e GGG.",
  },
};

export function getSizeGuideKey(product) {
  if (product.category === "Jogador" || product.category === "Treino") return "jogador";
  return "torcedor";
}

export function renderSizeGuide(container, product) {
  if (!container || !product) return;

  const guide = SIZE_GUIDES[getSizeGuideKey(product)];
  const title = document.getElementById("size-guide-title");

  if (title) title.textContent = guide.title;

  container.innerHTML = `
    <img
      class="size-guide__image"
      src="${guide.image}"
      alt="${guide.alt}"
      loading="lazy"
      width="1200"
      height="900"
    />
  `;
}
