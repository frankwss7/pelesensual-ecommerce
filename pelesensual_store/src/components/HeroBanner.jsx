import React, { useState, useEffect } from 'react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Conforto e Elegância",
      subtitle: "Que Você Merece Cada Peça",
      description: "Descubra nossa coleção de moda íntima feminina com tecidos de alta qualidade e acabamentos selecionados e acabamento impecável para sua satisfação.",
      buttonText: "Ver Produtos"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1585652757141-bc1609e2ce32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Qualidade Premium",
      subtitle: "Para Momentos Especiais",
      description: "Lingerie exclusiva que combina sensualidade e conforto, com designs modernos e materiais de primeira qualidade.",
      buttonText: "Explorar Coleção"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Variedade Completa",
      subtitle: "Tamanhos e Modelos",
      description: "Do P ao GG, nossa linha completa atende todos os gostos e estilos, sempre priorizando o seu bem-estar e autoestima.",
      buttonText: "Ver Tamanhos"
    }
  ];

  // Auto-play do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('produtos-adulto');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative w-full h-screen overflow-hidden">
      {/* Container do Carrossel */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Imagem de Fundo */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
            
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            
            {/* Conteúdo do Slide */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold text-pink-300 mb-6">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl text-white mb-8 leading-relaxed max-w-xl">
                    {slide.description}
                  </p>
                  <button
                    onClick={scrollToProducts}
                    className="btn-primary text-lg px-8 py-4 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Navegação */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={prevSlide}
          className="ml-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 group"
          aria-label="Slide anterior"
        >
          <svg className="w-6 h-6 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextSlide}
          className="mr-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 group"
          aria-label="Próximo slide"
        >
          <svg className="w-6 h-6 transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Efeito de Scroll Down */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToProducts}
          className="text-white text-center group"
          aria-label="Rolar para produtos"
        >
          <div className="mb-2">
            <svg className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-sm font-medium">Explorar</span>
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
