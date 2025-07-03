import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { wholesalePackageQuantity } from '../data/products';

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, pricingMode } = useCart();

  if (!product) return null;

  const price = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;
  const minQuantity = pricingMode === 'wholesale' ? wholesalePackageQuantity : 1;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const adjustQuantity = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= minQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Fechar modal clicando no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Material:</span> {product.material}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">REF:</span> {product.id}
                </p>
                {product.colors && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Cores disponíveis:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <span 
                          key={color}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-pink-600">
                    R$ {price.toFixed(2)}
                  </span>
                  {pricingMode === 'wholesale' && (
                    <span className="text-sm text-green-600 font-medium">
                      Preço Atacado
                    </span>
                  )}
                </div>
                
                {pricingMode === 'retail' && product.wholesalePrice < product.retailPrice && (
                  <p className="text-sm text-gray-500">
                    Atacado (mín. {wholesalePackageQuantity} pcs): R$ {product.wholesalePrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Selecione o tamanho:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Quantidade:</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    disabled={quantity <= minQuantity}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="text-xl font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => adjustQuantity(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                
                {pricingMode === 'wholesale' && (
                  <p className="text-sm text-gray-500">
                    Quantidade mínima para atacado: {wholesalePackageQuantity} peças
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-pink-600">
                    R$ {(price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.12 5H17M13 13v6a2 2 0 01-2 2 2 2 0 01-2-2v-6m4 0V9a2 2 0 00-2-2 2-2 0 00-2 2v4"/>
                </svg>
                Adicionar ao Carrinho
              </button>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Descrição:</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { wholesalePackageQuantity } from '../data/products';

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, pricingMode } = useCart();

  if (!product) return null;

  const price = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;
  const minQuantity = pricingMode === 'wholesale' ? wholesalePackageQuantity : 1;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const adjustQuantity = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= minQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Fechar modal clicando no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Material:</span> {product.material}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">REF:</span> {product.id}
                </p>
                {product.colors && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Cores disponíveis:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <span 
                          key={color}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-pink-600">
                    R$ {price.toFixed(2)}
                  </span>
                  {pricingMode === 'wholesale' && (
                    <span className="text-sm text-green-600 font-medium">
                      Preço Atacado
                    </span>
                  )}
                </div>
                
                {pricingMode === 'retail' && product.wholesalePrice < product.retailPrice && (
                  <p className="text-sm text-gray-500">
                    Atacado (mín. {wholesalePackageQuantity} pcs): R$ {product.wholesalePrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Selecione o tamanho:</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-pink-500 bg-pink-50 text-pink-700'
                          : 'border-gray-200 hover:border-pink-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700">Quantidade:</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => adjustQuantity(-1)}
                    disabled={quantity <= minQuantity}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="text-xl font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => adjustQuantity(1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {pricingMode === 'wholesale' && (
                  <p className="text-sm text-gray-500">
                    Quantidade mínima para atacado: {wholesalePackageQuantity} peças
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-pink-600">
                    R$ {(price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Descrição:</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
