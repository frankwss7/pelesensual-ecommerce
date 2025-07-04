import React, { useState, useEffect } from 'react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides do banner - CORRIGIDO: usando o caminho correto das imagens
  const slides = [
    {
      id: 1,
      image: '/images/banner1.jpg', // Caminho correto
      title: 'Coleção Sensual',
      subtitle: 'Conforto e elegância em cada peça',
      description: 'Descubra nossa linha premium de lingeries que combinam sensualidade com o máximo conforto',
      ctaText: 'Ver Coleção',
      ctaLink: '#produtos-adulto',
      bgGradient: 'from-pink-500 to-purple-600'
    },
    {
      id: 2,
      image: '/images/banner2.jpg', // Caminho correto
      title: 'Qualidade Premium',
      subtitle: 'Tecidos selecionados e acabamento perfeito',
      description: 'Materiais de alta qualidade que proporcionam maciez e durabilidade para o seu dia a dia',
      ctaText: 'Saiba Mais',
      ctaLink: '#sobre',
      bgGradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      image: '/images/banner3.jpg', // Caminho correto
      title: 'Entrega Rápida',
      subtitle: 'Receba em casa com segurança e discrição',
      description: 'Envios rápidos e embalagem discreta para Fortaleza e região metropolitana',
      ctaText: 'Contato',
      ctaLink: '#contato',
      bgGradient: 'from-pink-600 to-purple-500'
    }
  ];

  // Auto-play do slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Retoma auto-play em 10s
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Retoma auto-play em 10s
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Retoma auto-play em 10s
  };

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

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image com Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Imagem de fundo */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Se a imagem não carregar, usa um gradiente como fallback
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`;
                }}
              />
            </div>
            
            {/* Overlay gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-80`}></div>
            
            {/* Overlay adicional para melhor legibilidade */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Efeito de brilho animado */}
      <div className="hero-section absolute inset-0"></div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Animação de entrada */}
          <div className="animate-slide-up">
            {/* Badge/Tag */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/30">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold">Moda Íntima Premium</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block mb-2">{currentSlideData.title}</span>
              <span className="block text-pink-300 text-3xl sm:text-4xl md:text-5xl font-light">
                {currentSlideData.subtitle}
              </span>
            </h1>

            {/* Descrição */}
            <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed text-white/90 max-w-3xl mx-auto">
              {currentSlideData.description}
            </p>

            {/* Botões de Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection(currentSlideData.ctaLink)}
                className="btn-primary transform hover:scale-105 text-lg px-8 py-4"
              >
                {currentSlideData.ctaText}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <a
                href="https://wa.me/5585999436548"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-pink-600 text-lg px-8 py-4"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Destaques */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Qualidade Premium</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Entrega Rápida</span>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-semibold">Atendimento Especial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles do Slider */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-20">
        {/* Botão Anterior */}
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Slide anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botão Próximo */}
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
          aria-label="Próximo slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Indicador de Auto-play */}
      {isAutoPlaying && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium">Auto</span>
          </div>
        </div>
      )}

      {/* Seta para próxima seção */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button
          onClick={() => scrollToSection('#produtos-adulto')}
          className="p-2 text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Ver produtos"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
