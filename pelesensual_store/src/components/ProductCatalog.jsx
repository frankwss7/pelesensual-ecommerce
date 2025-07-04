import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addToCart } = useCart();

  // Dados dos produtos - CORRIGIDO: usando caminhos corretos das imagens
  const products = [
    {
      id: 1,
      name: 'Conjunto Sexy Rendado',
      category: 'conjuntos',
      price: 89.90,
      originalPrice: 120.00,
      image: '/images/produto1.jpg', // Caminho correto
      images: ['/images/produto1.jpg', '/images/produto1-2.jpg'], // Múltiplas imagens
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Vermelho', 'Branco'],
      description: 'Conjunto sensual em renda delicada com detalhes exclusivos. Oferece conforto e elegância para momentos especiais.',
      features: ['Renda importada', 'Ajuste perfeito', 'Conforto premium'],
      inStock: true,
      isNew: true,
      discount: 25
    },
    {
      id: 2,
      name: 'Camisola Cetim Premium',
      category: 'camisolas',
      price: 65.50,
      image: '/images/produto2.jpg',
      images: ['/images/produto2.jpg'],
      sizes: ['P', 'M', 'G'],
      colors: ['Rosa', 'Azul', 'Dourado'],
      description: 'Camisola em cetim com caimento perfeito e acabamento refinado.',
      features: ['Cetim de alta qualidade', 'Respirável', 'Toque sedoso'],
      inStock: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Calcinha Fio Dental Luxo',
      category: 'calcinhas',
      price: 35.90,
      originalPrice: 45.00,
      image: '/images/produto3.jpg',
      images: ['/images/produto3.jpg'],
      sizes: ['P', 'M', 'G'],
      colors: ['Preto', 'Nude', 'Vermelho'],
      description: 'Calcinha fio dental com acabamento refinado e conforto incomparável.',
      features: ['Sem costura', 'Tecido hipoalergênico', 'Durabilidade'],
      inStock: true,
      isNew: false,
      discount: 20
    },
    {
      id: 4,
      name: 'Sutiã Push-up Dourado',
      category: 'sutias',
      price: 78.00,
      image: '/images/produto4.jpg',
      images: ['/images/produto4.jpg'],
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Dourado', 'Prata', 'Bronze'],
      description: 'Sutiã push-up com bojo especial para realçar a silhueta natural.',
      features: ['Bojo anatômico', 'Alças ajustáveis', 'Sustentação extra'],
      inStock: true,
      isNew: true
    },
    {
      id: 5,
      name: 'Kit Sensual Completo',
      category: 'kits',
      price: 150.00,
      originalPrice: 200.00,
      image: '/images/produto5.jpg',
      images: ['/images/produto5.jpg'],
      sizes: ['P', 'M', 'G'],
      colors: ['Preto', 'Vermelho'],
      description: 'Kit completo com conjunto, camisola e acessórios para uma experiência única.',
      features: ['3 peças incluídas', 'Embalagem especial', 'Guia de cuidados'],
      inStock: true,
      isNew: true,
      discount: 25
    },
    {
      id: 6,
      name: 'Body Transparente Elegante',
      category: 'bodys',
      price: 95.00,
      image: '/images/produto6.jpg',
      images: ['/images/produto6.jpg'],
      sizes: ['P', 'M', 'G'],
      colors: ['Preto', 'Branco'],
      description: 'Body transparente com detalhes únicos e modelagem perfeita.',
      features: ['Transparência sutil', 'Elástico confortável', 'Design exclusivo'],
      inStock: false,
      isNew: false
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Produtos', icon: '🛍️' },
    { id: 'conjuntos', name: 'Conjuntos', icon: '👙' },
    { id: 'camisolas', name: 'Camisolas', icon: '👗' },
    { id: 'calcinhas', name: 'Calcinhas', icon: '🩲' },
    { id: 'sutias', name: 'Sutiãs', icon: '👙' },
    { id: 'bodys', name: 'Bodys', icon: '🩱' },
    { id: 'kits', name: 'Kits', icon: '🎁' }
  ];

  const sizes = ['P', 'M', 'G', 'GG'];

  // Filtrar e ordenar produtos
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSize = !selectedSize || product.sizes.includes(selectedSize);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSize && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });

  const handleAddToCart = (product, size = 'M') => {
    addToCart(product, size, 1);
    
    // Feedback visual
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const ProductCard = ({ product }) => (
    <div className="product-card group">
      {/* Badge de desconto */}
      {product.discount && (
        <div className="product-badge">
          -{product.discount}%
        </div>
      )}
      
      {/* Badge de novo */}
      {product.isNew && (
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
          Novo
        </div>
      )}

      {/* Badge de fora de estoque */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-xl">
          <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
            Fora de Estoque
          </span>
        </div>
      )}

      {/* Imagem do produto */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-64 object-cover"
          onError={(e) => {
            // Fallback para quando a imagem não carregar
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBkaXNwb27DrXZlbDwvdGV4dD48L3N2Zz4=';
          }}
        />

        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={() => openProductModal(product)}
              className="bg-white text-gray-800 p-2 rounded-full hover:scale-110 transition-transform duration-200"
              title="Ver detalhes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            {product.inStock && (
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 hover:scale-110 transition-all duration-200"
                title="Adicionar ao carrinho"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 6h14m-2 7v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0h2" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Preço */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-pink-600">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.inStock && (
            <div className="flex items-center text-green-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="
