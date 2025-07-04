import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  const nextImage = () => {
    const images = Array.isArray(product.images) ? product.images : [product.image];
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = Array.isArray(product.images) ? product.images : [product.image];
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleImageError = (imageIndex) => {
    setImageError(prev => ({
      ...prev,
      [imageIndex]: true
    }));
  };

  // Adaptar para imagem única ou array de imagens
  const images = Array.isArray(product.images) ? product.images : [product.image];
  const currentImage = images[currentImageIndex];

  // Fallback para imagem padrão se a imagem não carregar
  const fallbackImage = 'https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/4] bg-gray-100">
        {!imageError[currentImageIndex] ? (
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => handleImageError(currentImageIndex)}
            loading="lazy"
            onLoad={(e) => {
              // Se a imagem carregar, remove o erro
              if (imageError[currentImageIndex]) {
                setImageError(prev => ({
                  ...prev,
                  [currentImageIndex]: false
                }));
              }
            }}
          />
        ) : (
          // Fallback image
          <img
            src={fallbackImage}
            alt={product.name}
            className="w-full h-full object-cover opacity-75"
            loading="lazy"
          />
        )}
        
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              onClick={prevImage}
              aria-label="Imagem anterior"
            >
              ←
            </button>
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              onClick={nextImage}
              aria-label="Próxima imagem"
            >
              →
            </button>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Badge para indicar se está usando fallback */}
        {imageError[currentImageIndex] && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Imagem indisponível
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-xs text-gray-500 mb-3">ID: {product.id}</p>
        
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 block mb-2">Tamanhos disponíveis:</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map(size => (
              <span key={size} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-lg font-bold text-pink-600">
            R$ {product.retailPrice.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">
            Atacado: R$ {product.wholesalePrice.toFixed(2)}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
            + P
          </button>
          <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
            + M
          </button>
          <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
            + G
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
