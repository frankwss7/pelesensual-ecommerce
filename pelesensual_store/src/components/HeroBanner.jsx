import React, { useState, useEffect } from 'react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides exatos do site original
  const slides = [
    {
      id: 1,
      image: '/images/banner/banner_img1.png',
      title: 'Conforto e Elegância em Cada Peça',
      subtitle: 'Descubra nossa coleção de moda íntima feminina com tecidos de alta qualidade e designs modernos.',
      buttonText: 'Ver Produtos',
      buttonLink: '#produtos-adulto'
    },
    {
      id: 2,
      image: '/images/banner/banner_img2.png',
      title: 'Sensualidade com Conforto',
      subtitle: 'Peças que valorizam seu corpo com o máximo de conforto para o dia a dia.',
      buttonText: 'Explorar Coleção',
      buttonLink: '#produtos-adulto'
    },
    {
      id: 3,
      image: '/images/banner/banner_img3.png',
      title: 'Qualidade que Você Merece',
      subtitle: 'Tecidos selecionados e acabamento impecável para sua satisfação.',
      buttonText: 'Conhecer Produtos',
      buttonLink: '#produtos-adulto'
    }
  ];

  // Auto-play do banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="banner-container relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`banner-slide absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Conteúdo do banner */}
          <div className="banner-content relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white max-w-4xl px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                {slide.subtitle}
              </p>
              <button
                onClick={() => scrollToSection(slide.buttonLink)}
                className="banner-btn bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores de slides (dots) */}
      <div className="banner-dots absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`banner-dot w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Fallback para quando as imagens não carregarem */}
      <style jsx>{`
        .banner-slide {
          background-color: #ec4899;
          background-image: linear-gradient(135deg, #ec4899 0%, #9333ea 100%);
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
