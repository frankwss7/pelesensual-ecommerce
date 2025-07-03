import React, { useState } from 'react';
import { products, categories as productCategories, wholesalePackageQuantity } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductModal from './ProductModal';

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, pricingMode, setPricingMode } = useCart();

  const categories = [
    { id: 'all', name: 'Todos os Produtos' },
    ...productCategories
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleQuickAdd = (product, size) => {
    const quantityToAdd = pricingMode === 'wholesale' ? wholesalePackageQuantity : 1;
    addToCart(product, size, quantityToAdd);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa coleção de moda íntima feminina com tecidos de alta qualidade 
            e designs modernos que proporcionam conforto e elegância.
          </p>
        </div>

        {/* Category Filter and Pricing Mode Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
          <button
            onClick={() => setPricingMode('retail')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              pricingMode === 'retail'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
            }`}
          >
            Varejo
          </button>
          <button
            onClick={() => setPricingMode('wholesale')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              pricingMode === 'wholesale'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md'
            }`}
          >
            Atacado
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => {
            const price = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;

            return (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative group">
                  <div className="h-64 flex items-center justify-center overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { 
                        e.target.src = 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'; 
                      }}
                    />
                  </div>

                  {/* Overlay com botão de visualizar */}
                  <div className="absolute inset-0 bg-transparent transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-gray-800 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-pink-50"
                      aria-label="Ver detalhes"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  {pricingMode === 'wholesale' && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Atacado
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.material}</p>
                    <p className="text-xs text-gray-500">REF: {product.id}</p>
                  </div>

                  {/* Sizes */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Tamanhos disponíveis:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map(size => (
                        <span 
                          key={size}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-pink-600">
                          R$ {price.toFixed(2)}
                        </p>
                        {pricingMode === 'retail' && product.wholesalePrice < product.retailPrice && (
                          <p className="text-xs text-gray-500">
                            Atacado: R$ {product.wholesalePrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Add Buttons */}
                  <div className="space-y-2">
                    {product.category !== 'kit' && product.sizes.length <= 4 && (
                      <div className="grid grid-cols-2 gap-2">
                        {product.sizes.slice(0, 4).map(size => (
                          <button
                            key={size}
                            onClick={() => handleQuickAdd(product, size)}
                            className="bg-pink-100 text-pink-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-pink-200 transition-colors flex items-center justify-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {size}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Main Add Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.12 5H17M13 13v6a2 2 0 01-2 2 2 2 0 01-2-2v-6m4 0V9a2 2 0 00-2-2 2-2 0 00-2 2v4"/>
                      </svg>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
