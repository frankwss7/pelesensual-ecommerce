// Dados dos produtos da Pele Sensual
export const categories = [
  { id: 'adult', name: 'Moda Íntima Adulto' },
  { id: 'infantil', name: 'Moda Íntima Infantil' },
  { id: 'kit', name: 'Kits e Embalagens' }
];

export const wholesalePackageQuantity = 10; // Incremento mínimo para atacado
export const wholesaleMinimumQuantity = 200; // Quantidade mínima total para atacado

export const products = [
  // === MODA ÍNTIMA ADULTO ===
  {
    id: 'CAL001',
    name: 'Calça Microfibra',
    category: 'adult',
    material: 'Microfibra Premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Nude', 'Rosa'],
    retailPrice: 6.11,
    wholesalePrice: 4.70,
    image: 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha em microfibra com toque macio e acabamento impecável. Conforto garantido o dia todo.'
  },
  {
    id: 'CAL002',
    name: 'Calça Modal',
    category: 'adult',
    material: 'Modal',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Cinza', 'Rosa'],
    retailPrice: 6.76,
    wholesalePrice: 5.20,
    image: 'https://images.unsplash.com/photo-1585652757141-bc1609e2ce32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha em modal, tecido natural, respirável e extremamente confortável.'
  },
  {
    id: 'PAL001',
    name: 'Pala Cotton',
    category: 'adult',
    material: 'Algodão Premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Estampado'],
    retailPrice: 8.45,
    wholesalePrice: 6.50,
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha com pala frontal em algodão 100%. Ideal para uso diário.'
  },
  {
    id: 'FIO001',
    name: 'Fio Pala Dupla',
    category: 'adult',
    material: 'Microfibra com Renda',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Vermelho', 'Rosa'],
    retailPrice: 9.10,
    wholesalePrice: 7.00,
    image: 'https://images.unsplash.com/photo-1566479179817-4e9166b3ff91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Fio dental com pala dupla e detalhes em renda. Sensualidade e conforto.'
  },
  {
    id: 'CAL003',
    name: 'Calça Plus',
    category: 'adult',
    material: 'Poliamida Elastano',
    sizes: ['GG', 'XGG', 'XXGG'],
    colors: ['Branco', 'Preto', 'Nude'],
    retailPrice: 10.40,
    wholesalePrice: 8.00,
    image: 'https://images.unsplash.com/photo-1515371264313-a9f142dff4a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha plus size com modelagem especial para maior conforto.'
  },
  {
    id: 'FIO002',
    name: 'Fio Largo',
    category: 'adult',
    material: 'Microfibra Premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Nude', 'Colorido'],
    retailPrice: 9.75,
    wholesalePrice: 7.50,
    image: 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Fio dental com lateral mais larga para maior conforto.'
  },
  {
    id: 'CAL004',
    name: 'Calça Lateral Dupla',
    category: 'adult',
    material: 'Microfibra',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Rosa', 'Azul'],
    retailPrice: 8.45,
    wholesalePrice: 6.50,
    image: 'https://images.unsplash.com/photo-1585652757141-bc1609e2ce32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha com lateral dupla para melhor sustentação e conforto.'
  },
  {
    id: 'ANA001',
    name: 'ANA LIZ',
    category: 'adult',
    material: 'Poliamida com Elastano',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Variadas'],
    retailPrice: 7.80,
    wholesalePrice: 6.00,
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Linha ANA LIZ com design exclusivo e qualidade superior.'
  },
  {
    id: 'CAL005',
    name: 'Calçola Modal',
    category: 'adult',
    material: 'Modal Premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Nude'],
    retailPrice: 6.76,
    wholesalePrice: 5.20,
    image: 'https://images.unsplash.com/photo-1566479179817-4e9166b3ff91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calçola em modal com cobertura completa e conforto excepcional.'
  },
  {
    id: 'PAL002',
    name: 'Pala Microfibra',
    category: 'adult',
    material: 'Microfibra Premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Colorido'],
    retailPrice: 7.80,
    wholesalePrice: 6.00,
    image: 'https://images.unsplash.com/photo-1515371264313-a9f142dff4a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha com pala em microfibra. Tecnologia e conforto.'
  },

  // === MODA ÍNTIMA INFANTIL ===
  {
    id: 'INF001',
    name: 'Infantil Trix',
    category: 'infantil',
    material: 'Algodão',
    sizes: ['2', '4', '6', '8', '10', '12'],
    colors: ['Branco', 'Rosa', 'Estampado'],
    retailPrice: 5.85,
    wholesalePrice: 4.50,
    image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha infantil em algodão macio, ideal para o dia a dia.'
  },
  {
    id: 'INF002',
    name: 'Calça Menina Moça',
    category: 'infantil',
    material: 'Algodão Premium',
    sizes: ['8', '10', '12', '14'],
    colors: ['Branco', 'Rosa', 'Lilás'],
    retailPrice: 5.85,
    wholesalePrice: 4.50,
    image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Calcinha para pré-adolescentes com design delicado.'
  },
  {
    id: 'INF003',
    name: 'Tanga Lari',
    category: 'infantil',
    material: 'Microfibra Infantil',
    sizes: ['10', '12', '14'],
    colors: ['Rosa', 'Branco', 'Estampado'],
    retailPrice: 7.80,
    wholesalePrice: 6.00,
    image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Tanga infantil com design jovem e materiais seguros.'
  },

  // === KITS E EMBALAGENS ===
  {
    id: 'KIT001',
    name: 'Box Feminina Adulto',
    category: 'kit',
    material: 'Kit Sortido',
    sizes: ['Sortido'],
    colors: ['Variadas'],
    retailPrice: 32.50,
    wholesalePrice: 25.00,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Kit com 5 calcinhas adulto sortidas em tamanhos e cores variados.'
  },
  {
    id: 'KIT002',
    name: 'Box Feminina Infantil',
    category: 'kit',
    material: 'Kit Sortido',
    sizes: ['Sortido'],
    colors: ['Variadas'],
    retailPrice: 23.40,
    wholesalePrice: 18.00,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Kit com 4 calcinhas infantil sortidas em tamanhos e cores variados.'
  },
  {
    id: 'EMB001',
    name: 'Caixa de Presente',
    category: 'kit',
    material: 'Papelão Premium',
    sizes: ['Único'],
    colors: ['Rosa', 'Branco'],
    retailPrice: 2.60,
    wholesalePrice: 2.00,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Caixa de presente elegante para embalar suas compras.'
  },
  {
    id: 'EMB002',
    name: 'Bag Transparente',
    category: 'kit',
    material: 'Plástico Transparente',
    sizes: ['P', 'M', 'G'],
    colors: ['Transparente'],
    retailPrice: 1.30,
    wholesalePrice: 1.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Embalagem transparente prática para transporte e armazenamento.'
  }
];

// Função para obter produtos por categoria
export const getProductsByCategory = (categoryId) => {
  if (categoryId === 'all') return products;
  return products.filter(product => product.category === categoryId);
};

// Função para obter produto por ID
export const getProductById = (productId) => {
  return products.find(product => product.id === productId);
};

// Função para calcular preço com base no modo
export const getProductPrice = (product, mode = 'retail') => {
  return mode === 'wholesale' ? product.wholesalePrice : product.retailPrice;
};
