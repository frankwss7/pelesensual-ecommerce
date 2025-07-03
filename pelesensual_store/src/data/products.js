// Dados dos produtos
export const products = [
  {
    id: 'PS001',
    name: 'Conjunto Sensual Rosa',
    category: 'conjunto',
    material: 'Renda francesa premium',
    retailPrice: 89.90,
    wholesalePrice: 45.00,
    sizes: ['P', 'M', 'G', 'GG'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Rosa', 'Preto', 'Branco'],
    description: 'Conjunto sensual em renda francesa com detalhes delicados e acabamento premium.'
  },
  {
    id: 'PS002',
    name: 'Body Elegance Preto',
    category: 'body',
    material: 'Lycra premium com renda',
    retailPrice: 65.90,
    wholesalePrice: 32.00,
    sizes: ['P', 'M', 'G', 'GG'],
    image: 'https://images.unsplash.com/photo-1585652757141-bc1609e2ce32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Preto', 'Vermelho', 'Nude'],
    description: 'Body elegante com recortes estratégicos e renda delicada nas laterais.'
  },
  {
    id: 'PS003',
    name: 'Calcinha Rendada Sensual',
    category: 'calcinha',
    material: 'Microfibra com renda',
    retailPrice: 35.90,
    wholesalePrice: 18.00,
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Rosa', 'Preto', 'Branco', 'Vermelho'],
    description: 'Calcinha em microfibra macia com detalhes em renda e elástico confortável.'
  },
  {
    id: 'PS004',
    name: 'Sutiã Push-Up Luxo',
    category: 'sutia',
    material: 'Microfibra moldada com bojo',
    retailPrice: 45.90,
    wholesalePrice: 23.00,
    sizes: ['36', '38', '40', '42', '44'],
    image: 'https://images.unsplash.com/photo-1566479179817-4e9166b3ff91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Nude', 'Preto', 'Branco'],
    description: 'Sutiã push-up com bojo moldado que realça e sustenta com máximo conforto.'
  },
  {
    id: 'PS005',
    name: 'Kit Sexy Weekend',
    category: 'kit',
    material: 'Renda e cetim premium',
    retailPrice: 129.90,
    wholesalePrice: 65.00,
    sizes: ['P', 'M', 'G'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Vermelho', 'Preto'],
    description: 'Kit completo com conjunto + camisola + máscara para momentos especiais.'
  },
  {
    id: 'PS006',
    name: 'Camisola Sedução',
    category: 'camisola',
    material: 'Cetim com renda',
    retailPrice: 55.90,
    wholesalePrice: 28.00,
    sizes: ['P', 'M', 'G', 'GG'],
    image: 'https://images.unsplash.com/photo-1515371264313-a9f142dff4a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Rosa', 'Azul', 'Preto'],
    description: 'Camisola em cetim macio com detalhes em renda e alças ajustáveis.'
  },
  {
    id: 'PS007',
    name: 'Conjunto Plus Size Conforto',
    category: 'conjunto',
    material: 'Algodão com elastano',
    retailPrice: 75.90,
    wholesalePrice: 38.00,
    sizes: ['GG', 'XGG', 'XXGG'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Preto', 'Cinza', 'Azul marinho'],
    description: 'Conjunto plus size desenvolvido especialmente para conforto e elegância.'
  },
  {
    id: 'PS008',
    name: 'Lingerie Noiva Branca',
    category: 'conjunto',
    material: 'Renda guipir premium',
    retailPrice: 149.90,
    wholesalePrice: 75.00,
    sizes: ['P', 'M', 'G'],
    image: 'https://images.unsplash.com/photo-1566479179817-4e9166b3ff91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    colors: ['Branco', 'Off-white'],
    description: 'Conjunto especial para noivas em renda guipir com detalhes bordados à mão.'
  }
];

export const categories = [
  { id: 'conjunto', name: 'Conjuntos' },
  { id: 'body', name: 'Bodies' },
  { id: 'calcinha', name: 'Calcinhas' },
  { id: 'sutia', name: 'Sutiãs' },
  { id: 'camisola', name: 'Camisolas' },
  { id: 'kit', name: 'Kits Especiais' }
];

export const wholesalePackageQuantity = 6; // Quantidade mínima para atacado
