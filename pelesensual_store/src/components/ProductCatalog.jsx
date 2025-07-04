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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Em estoque
            </div>
          )}
        </div>

        {/* Tamanhos disponíveis */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Tamanhos:</p>
          <div className="flex space-x-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Botão de ação */}
        {product.inStock ? (
          <button
            onClick={() => handleAddToCart(product)}
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
          >
            Fora de Estoque
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nossa Coleção
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubra nossa seleção especial de lingeries e moda íntima com qualidade premium e designs únicos.
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Categorias */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full form-input"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tamanhos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tamanho
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full form-input"
              >
                <option value="">Todos os tamanhos</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenação */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full form-input"
              >
                <option value="name">Nome A-Z</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="newest">Mais novos</option>
              </select>
            </div>

            {/* Faixa de preço */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Faixa de preço
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ 0</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Mostrando {filteredProducts.length} de {products.length} produtos
            </p>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensagem quando não há produtos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.5-6.26-1.379M12 15v2m-6 1.379V18.5a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-.121" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros para encontrar o que você está procurando.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedSize('');
                setPriceRange([0, 200]);
                setSortBy('name');
              }}
              className="btn-primary"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco no WhatsApp! Temos muito mais opções e podemos ajudar você a encontrar o produto perfeito.
            </p>
            <a
              href="https://wa.me/5585999436548"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-success inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modal de produto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

// Componente Modal do Produto
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Imagens */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gbsOjbyBkaXNwb27DrXZlbDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              
              {/* Miniaturas */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden ${
                        index === selectedImageIndex ? 'border-pink-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações */}
            <div>
              <div className="mb-6">
                {product.isNew && (
                  <span className="inline-block bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold mb-2">
                    Novo
                  </span>
                )}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Preço */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-pink-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Tamanhos */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tamanho:
                </label>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                        selectedSize === size
                          ? 'border-pink-600 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cores disponíveis:
                </label>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded border"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Características */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-3">Características:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ações */}
              <div className="space-y-3">
                {product.inStock ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-primary text-lg py-4"
                  >
                    Adicionar ao Carrinho - R$ {product.price.toFixed(2)}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Fora de Estoque
                  </button>
                )}
                
                <a
                  href={`https://wa.me/5585999436548?text=Olá! Tenho interesse no produto: ${product.name} - Tamanho: ${selectedSize}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-success text-center py-4"
                >
                  Tirar Dúvidas no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
