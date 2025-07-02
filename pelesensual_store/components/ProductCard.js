import Image from 'next/image';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState({});

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

  const handleImageError = (imageIndex) => {
    setImageError(prev => ({
      ...prev,
      [imageIndex]: true
    }));
  };

  const encodeImagePath = (imagePath) => {
    return imagePath.split('/').map(segment => 
      segment === '' ? '' : encodeURIComponent(segment)
    ).join('/');
  };

  const currentImage = product.images[currentImageIndex];
  const encodedImagePath = encodeImagePath(currentImage);

  return (
    <div className="product-card">
      <div className="image-container">
        {!imageError[currentImageIndex] ? (
          <Image
            src={encodedImagePath}
            alt={product.name}
            width={300}
            height={400}
            priority={currentImageIndex === 0}
            onError={() => handleImageError(currentImageIndex)}
            style={{
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            unoptimized={true}
          />
        ) : (
          <div className="placeholder-image">
            <div className="placeholder-content">
              <div className="placeholder-icon">📷</div>
              <span>Imagem Indisponível</span>
              <small>{product.name}</small>
            </div>
          </div>
        )}
        
        {product.images.length > 1 && (
          <>
            <button 
              className="carousel-btn prev"
              onClick={prevImage}
              aria-label="Imagem anterior"
            >
              ←
            </button>
            <button 
              className="carousel-btn next"
              onClick={nextImage}
              aria-label="Próxima imagem"
            >
              →
            </button>
            
            <div className="carousel-indicators">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="ref">REF: {product.ref}</p>
        
        <div className="sizes">
          <span>Tamanhos disponíveis:</span>
          <div className="size-options">
            {product.sizes.map(size => (
              <span key={size} className="size-badge">
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="price">
          <span className="current-price">R$ {product.price.toFixed(2)}</span>
          <span className="original-price">
            Atacado: R$ {product.originalPrice.toFixed(2)}
          </span>
        </div>
        
        <div className="actions">
          <button className="add-btn size-p">+ P</button>
          <button className="add-btn size-m">+ M</button>
          <button className="add-btn size-g">+ G</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;