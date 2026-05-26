const productRoot = "Produtos";

export const products = [
  {
    id: "01",
    slug: "brasil-jogador-amarela-26-27",
    name: "Camisa Brasil Jogador 26/27 - Amarela",
    price: 299.9,
    category: "Jogador",
    edition: "Copa 2026/27",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/01-amarela-jogador.jpeg",
    gallery: [
      `${productRoot}/1 - Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Amarela/WhatsApp Image 2026-05-23 at 19.18.20.jpeg`,
      `${productRoot}/1 - Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Amarela/WhatsApp Image 2026-05-23 at 19.18.38 (1).jpeg`,
      `${productRoot}/1 - Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Amarela/WhatsApp Image 2026-05-23 at 19.18.38 (2).jpeg`,
      `${productRoot}/1 - Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Amarela/WhatsApp Image 2026-05-23 at 19.18.38.jpeg`,
    ],
    description:
      "Modelo jogador com acabamento premium, visual amarelo clássico e caimento esportivo. Uma peça de destaque para clientes GFI Connect que procuram uma camisa especial.",
    highlights: ["Modelo jogador", "Acabamento premium", "Condição GFI Connect"],
    featured: true,
  },
  {
    id: "02",
    slug: "brasil-jogador-azul-26-27",
    name: "Camisa Brasil Jogador 26/27 - Azul",
    price: 299.9,
    category: "Jogador",
    edition: "Copa 2026/27",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/02-azul-jogador.jpeg",
    gallery: [
      `${productRoot}/2 -Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.19.40.jpeg`,
      `${productRoot}/2 -Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.19.53 (1).jpeg`,
      `${productRoot}/2 -Camisa seleção Brasileira - jogador - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.19.53.jpeg`,
    ],
    description:
      "Versão azul do modelo jogador, com presença forte e acabamento refinado. Ideal para quem quer uma peça diferenciada com atendimento exclusivo.",
    highlights: ["Modelo jogador", "Visual azul", "Atendimento personalizado"],
    featured: true,
  },
  {
    id: "03",
    slug: "brasil-treino-jordan-preta",
    name: "Camisa Brasil Treino Jordan - Preta",
    price: 279.9,
    category: "Treino",
    edition: "Coleção treino",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/03-preta-treino.jpeg",
    gallery: [
      `${productRoot}/3 -Camisa seleção Brasileira Treino Jordan- 26-27 copa do mundo - Preta/WhatsApp Image 2026-05-23 at 19.21.50.jpeg`,
      `${productRoot}/3 -Camisa seleção Brasileira Treino Jordan- 26-27 copa do mundo - Preta/WhatsApp Image 2026-05-23 at 19.22.33 (1).jpeg`,
      `${productRoot}/3 -Camisa seleção Brasileira Treino Jordan- 26-27 copa do mundo - Preta/WhatsApp Image 2026-05-23 at 19.22.33.jpeg`,
    ],
    description:
      "Camisa preta de treino com estética moderna, versátil e sofisticada. Uma escolha premium para uso casual ou esportivo.",
    highlights: ["Linha treino", "Design preto", "Visual moderno"],
    featured: false,
  },
  {
    id: "04",
    slug: "brasil-retro-1998",
    name: "Camisa Brasil Retro 1998",
    price: 299.9,
    category: "Retro",
    edition: "Edição histórica",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/04-retro-1998.jpeg",
    gallery: [
      `${productRoot}/4 -Camisa seleção Brasileira - Retrô 1998/WhatsApp Image 2026-05-23 at 19.23.03.jpeg`,
      `${productRoot}/4 -Camisa seleção Brasileira - Retrô 1998/WhatsApp Image 2026-05-23 at 19.23.14 (1).jpeg`,
      `${productRoot}/4 -Camisa seleção Brasileira - Retrô 1998/WhatsApp Image 2026-05-23 at 19.23.14.jpeg`,
    ],
    description:
      "Edição retro inspirada em 1998, feita para quem gosta de camisa com história, identidade e visual marcante.",
    highlights: ["Edição retro", "Inspirada em 1998", "Peça colecionável"],
    featured: false,
  },
  {
    id: "05",
    slug: "brasil-retro-2002-penta",
    name: "Camisa Brasil Retro 2002 - Penta",
    price: 299.9,
    category: "Retro",
    edition: "Pentacampeao",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/05-retro-2002.jpeg",
    gallery: [
      `${productRoot}/5 - Camisa seleção Brasileira - Retrô 2002- Pentacampeão/WhatsApp Image 2026-05-23 at 19.23.47.jpeg`,
      `${productRoot}/5 - Camisa seleção Brasileira - Retrô 2002- Pentacampeão/WhatsApp Image 2026-05-23 at 19.24.07 (1).jpeg`,
      `${productRoot}/5 - Camisa seleção Brasileira - Retrô 2002- Pentacampeão/WhatsApp Image 2026-05-23 at 19.24.07.jpeg`,
    ],
    description:
      "Modelo retro 2002 com apelo de colecao e memoria afetiva. Uma das camisas mais desejadas da vitrine especial.",
    highlights: ["Edição 2002", "Penta", "Destaque da vitrine"],
    featured: true,
  },
  {
    id: "06",
    slug: "brasil-torcedor-azul-26-27",
    name: "Camisa Brasil Torcedor 26/27 - Azul",
    price: 279.9,
    category: "Torcedor",
    edition: "Copa 2026/27",
    sizes: ["P", "M", "G", "GG", "GGG"],
    image: "assets/products/06-azul-torcedor.jpeg",
    gallery: [
      `${productRoot}/6 - Camisa seleção Brasileira - torcedor - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.21.14.jpeg`,
      `${productRoot}/6 - Camisa seleção Brasileira - torcedor - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.21.28 (1).jpeg`,
      `${productRoot}/6 - Camisa seleção Brasileira - torcedor - 26-27 copa do mundo - Azul/WhatsApp Image 2026-05-23 at 19.21.28.jpeg`,
    ],
    description:
      "Modelo torcedor azul, leve e versatil, com otimo custo-beneficio dentro da condicao especial para clientes GFI Connect.",
    highlights: ["Modelo torcedor", "Azul", "Otimo custo-beneficio"],
    featured: false,
  },
];

export const categories = ["Todos", ...new Set(products.map((product) => product.category))];

export function findProduct(slugOrId) {
  return products.find((product) => product.slug === slugOrId || product.id === slugOrId);
}
