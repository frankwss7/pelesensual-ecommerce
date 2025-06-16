import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Mostrar tooltip após 3 segundos
      setTimeout(() => setShowTooltip(true), 3000);
      // Esconder tooltip após 8 segundos
      setTimeout(() => setShowTooltip(false), 8000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      '👋 Olá! Vim do site da Pele Sensual e gostaria de saber mais sobre os produtos de moda íntima. Podem me ajudar?'
    );
    const whatsappUrl = `https://wa.me/5585999436548?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 max-w-xs animate-bounce">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="pr-6">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  💬 Precisa de ajuda?
                </p>
                <p className="text-xs text-gray-600">
                  Fale conosco no WhatsApp! Estamos prontos para atender você.
                </p>
              </div>
              {/* Arrow */}
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
            </div>
          )}

          {/* Main Button */}
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            aria-label="Falar no WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
            
            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          </button>
        </div>
      </div>

      {/* Floating Contact Info (Desktop) */}
      <div className={`fixed bottom-6 left-6 z-40 hidden lg:block transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}>
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-semibold text-gray-800 mb-2">📞 Atendimento</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>WhatsApp: (85) 99943-6548</p>
            <p>Email: pelesensualmodaintima@gmail.com</p>
            <p className="text-xs text-green-600 font-medium">Online agora!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;

