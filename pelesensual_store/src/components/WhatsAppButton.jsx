import React, { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar botão após um tempo ou quando usuário rolar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    // Mostrar automaticamente após 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Mostrar tooltip após 5 segundos
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
      // Esconder tooltip após 4 segundos
      setTimeout(() => setShowTooltip(false), 4000);
    }, 5000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      '👋 Olá! Vim do site da Pele Sensual e gostaria de conhecer melhor os produtos! Podem me ajudar? 💕'
    );
    const whatsappUrl = `https://wa.me/5585999436548?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(false); // Esconder tooltip quando hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-999">
      {/* Tooltip */}
      {showTooltip && !isHovered && (
        <div className="absolute bottom-full right-0 mb-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs relative">
            {/* Seta do tooltip */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  Precisa de Ajuda? 💕
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Fale conosco no WhatsApp! Estamos prontas para te atender com carinho.
                </p>
              </div>
            </div>

            {/* Botão fechar tooltip */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Indicador de pessoa online */}
      <div className={`absolute -top-2 -left-2 transform transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        <div className="relative">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Botão principal */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="whatsapp-button group relative"
        aria-label="Falar no WhatsApp"
      >
        {/* Ícone do WhatsApp */}
        <svg 
          className={`w-8 h-8 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>

        {/* Efeito de ondas */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-10 animate-ping animation-delay-300"></div>

        {/* Texto que aparece no hover */}
        <div className={`absolute right-full mr-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg">
            Falar no WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      </button>

      {/* Notificação de mensagem */}
      <div className={`absolute -top-3 -right-3 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
          <span className="text-white text-xs font-bold">1</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
