// src/data/products.js - Arquivo atualizado com os produtos de roupa de dormir

// Configurações gerais
export const wholesalePackageQuantity = 12;

// Categorias de produtos
export const categories = [
  { id: 'calcinha', name: 'Calcinhas' },
  { id: 'fio_dental', name: 'Fio Dental' },
  { id: 'sleepwear', name: 'Roupa de Dormir' }, // Nova categoria
  { id: 'kit', name: 'Kits' }
];

// Lista completa de produtos
export const products = [
  // Produtos existentes (calcinhas)
  {
    id: '016',
    name: 'Calça Microfibra',
    material: 'Tecido: Microfibra',
    category: 'calcinha',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 4.70,
    wholesalePrice: 4.20,
    image: 'calca_microfibra_frente_1.png',
    description: 'Calcinha confortável em microfibra de alta qualidade.'
  },
  {
    id: '012',
    name: 'Calça Modal',
    material: 'Tecido: Modal',
    category: 'calcinha',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 5.20,
    wholesalePrice: 4.70,
    image: 'calcola_modal_frente_1.png',
    description: 'Calcinha em modal, extremamente macia e confortável.'
  },
  {
    id: '013',
    name: 'Pala Cotton',
    material: 'Tecido: Cotton (algodão) Amaciado - Fio 40',
    category: 'calcinha',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 6.50,
    wholesalePrice: 6.00,
    image: 'pala_cotton_frente_1.png',
    description: 'Calcinha em cotton amaciado, ideal para uso diário.'
  },
  {
    id: '014',
    name: 'Tanga Lari',
    material: 'Tecido: Cotton',
    category: 'calcinha',
    sizes: ['M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 6.00,
    wholesalePrice: 5.50,
    image: 'tanga_lari_frente_1.png',
    description: 'Tanga em cotton, design moderno e confortável.'
  },
  {
    id: '050',
    name: 'Fio Pala Dupla',
    material: 'Tecido: Microfibra',
    category: 'fio_dental',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 7.00,
    wholesalePrice: 6.50,
    image: 'fio_pala_dupla_050.png',
    description: 'Fio dental com pala dupla em microfibra.'
  },
  {
    id: '023',
    name: 'Calça Plus',
    material: 'Tecido: Microfibra',
    category: 'calcinha',
    sizes: ['Plus Size'],
    colors: ['Variadas'],
    retailPrice: 8.00,
    wholesalePrice: 7.50,
    image: 'calca_plus_023.png',
    description: 'Calcinha plus size em microfibra, conforto garantido.'
  },
  {
    id: '052',
    name: 'Fio Largo',
    material: 'Tecido: Microfibra',
    category: 'fio_dental',
    sizes: ['M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 7.50,
    wholesalePrice: 7.00,
    image: 'fio_largo_frente_1.png',
    description: 'Fio dental modelo largo em microfibra.'
  },
  {
    id: '1020',
    name: 'Calça Lateral Dupla',
    material: 'Tecido: Microfibra',
    category: 'calcinha',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 6.50,
    wholesalePrice: 6.00,
    image: 'calca_lateral_dupla_1020.png',
    description: 'Calcinha com lateral dupla em microfibra.'
  },
  {
    id: '026',
    name: 'Box Feminina',
    material: 'Tecido: Microfibra',
    category: 'calcinha',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Cores Sortidas'],
    retailPrice: 7.00,
    wholesalePrice: 6.50,
    image: 'box_feminina/box_feminina_frente_1.png',
    description: 'Box feminina em microfibra, cores sortidas.'
  },

  // NOVOS PRODUTOS DE ROUPA DE DORMIR
  {
    id: 'baby_doll_rosa_1',
    name: 'Baby Doll Rosa com Renda',
    material: 'Tecido: Microfibra com Renda',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/baby_doll_rosa_1.jpg',
    description: 'Elegante baby doll em rosa com detalhes em renda delicada. Perfeito para momentos especiais.'
  },
  {
    id: 'baby_doll_rosa_2',
    name: 'Baby Doll Rosa com Shortinho',
    material: 'Tecido: Microfibra com Renda',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/baby_doll_rosa_2.jpg',
    description: 'Baby doll rosa com shortinho combinando, design sensual e confortável.'
  },
  {
    id: 'baby_doll_pink_1',
    name: 'Baby Doll Pink Premium',
    material: 'Tecido: Microfibra Premium com Renda',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Pink'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/baby_doll_pink_1.jpg',
    description: 'Baby doll em pink vibrante com acabamentos em renda premium.'
  },
  {
    id: 'baby_doll_pink_2',
    name: 'Baby Doll Pink com Detalhes',
    material: 'Tecido: Microfibra Premium',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Pink'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/baby_doll_pink_2.jpg',
    description: 'Baby doll pink com detalhes especiais em renda e alças ajustáveis.'
  },
  {
    id: 'camisola_preta_1',
    name: 'Camisola Preta Elegante',
    material: 'Tecido: Microfibra com Renda',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Preto'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/camisola_preta_1.jpg',
    description: 'Camisola preta sofisticada com renda decorativa e design elegante.'
  },
  {
    id: 'camisola_preta_2',
    name: 'Camisola Preta Clássica',
    material: 'Tecido: Microfibra com Renda',
    category: 'sleepwear',
    sizes: ['P', 'M', 'G'],
    colors: ['Preto'],
    retailPrice: 70.00,
    wholesalePrice: 65.00,
    image: 'sleepwear/camisola_preta_2.jpg',
    description: 'Camisola preta clássica com detalhes em renda na parte superior e inferior.'
  }
];

// Função para buscar produtos por categoria
export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Função para buscar produto por ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
