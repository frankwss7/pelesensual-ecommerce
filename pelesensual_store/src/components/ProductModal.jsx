import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { wholesalePackageQuantity } from '../data/products';

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, pricingMode } = useCart();

  const price = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleQuantityChange = (type) => {
    if (pricingMode === 'wholesale') {
      if (type === 'increment') {
        setQuantity(prev => prev + wholesalePackageQuantity);
      } else {
        setQuantity(prev => Math.max(wholesalePackageQuantity, prev - wholesalePackageQuantity));
      }
    } else {
      if (type === 'increment') {
        setQuantity(prev => prev + 1);
      } else {
        setQuantity(prev => Math.max(1, prev - 1));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`border-2 rounded-lg overflow-hidden transition-all ${
                        index === currentImageIndex ? 'border-pink-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-1">Material: {product.material}</p>
                <p className="text-sm text-gray-500">REF: {product.id}</p>
                
                {/* Pricing Mode Badge */}
                {pricingMode === 'wholesale' && (
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
                    Preço de Atacado
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-pink-600">
                      R$ {price.toFixed(2)}
                    </p>
                    {pricingMode === 'retail' && product.wholesalePrice < product.retailPrice && (
                      <p className="text-sm text-gray-500">
                        Preço atacado: R$ {product.wholesalePrice.toFixed(2)} (min. 200 un.)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Tamanho</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
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

              {/* Quantity Selection */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Quantidade</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Subtotal: <span className="font-semibold text-pink-600">
                      R$ {(price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  selectedSize
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>

              {/* Size Guide */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Guia de Tamanhos</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  {product.category === 'infantil' ? (
                    <>
                      <p>• Tamanho 2: 2-3 anos</p>
                      <p>• Tamanho 4: 3-4 anos</p>
                      <p>• Tamanho 6: 5-6 anos</p>
                      <p>• Tamanho 8: 7-8 anos</p>
                      <p>• Tamanho 10: 9-10 anos</p>
                      <p>• Tamanho 12: 11-12 anos</p>
                    </>
                  ) : (
                    <>
                      <p>• P: 36-38 (Cintura: 60-65cm)</p>
                      <p>• M: 40-42 (Cintura: 66-71cm)</p>
                      <p>• G: 44-46 (Cintura: 72-77cm)</p>
                      <p>• GG: 48-50 (Cintura: 78-83cm)</p>
                      {product.sizes.includes('Plus Size') && (
                        <p>• Plus Size: 52+ (Cintura: 84cm+)</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;


