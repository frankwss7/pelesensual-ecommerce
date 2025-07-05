import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentMode, setCurrentMode] = useState('retail'); // retail ou wholesale
  const { cartItemsCount, toggleCart } = useCart();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const toggleMode = (mode) => {
    setCurrentMode(mode);
    // Aqui você pode implementar a lógica para alterar preços
    console.log('Modo alterado para:', mode);
  };

  return (
    <>
      {/* Botão de Alternância Varejo/Atacado */}
      <div className="mode-toggle-container fixed top-4 left-4 z-50">
        <div className="mode-toggle bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => toggleMode('retail')}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              currentMode === 'retail'
                ? 'bg-pink-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Varejo
          </button>
          <button
            onClick={() => toggleMode('wholesale')}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              currentMode === 'wholesale'
                ? 'bg-pink-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Atacado
          </button>
        </div>
      </div>

      {/* Header Principal */}
      <header className={`header-decoration fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/90'
      }`}>
        {/* Padrão decorativo do header */}
        <div className="header-pattern absolute inset-0 opacity-10 bg-gradient-to-r from-pink-100 to-purple-100"></div>
        
        <div className="container mx-auto px-4 relative">
          {/* Ícones do header - só mostrar em telas grandes */}
          <div className="header-icons hidden lg:flex justify-center py-2 border-b border-gray-200/50">
            <div className="flex space-x-8">
              <div className="header-icon flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-heart text-pink-500"></i>
                <span>Qualidade Premium</span>
              </div>
              <div className="header-icon flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-truck text-blue-500"></i>
                <span>Entrega Rápida</span>
              </div>
              <div className="header-icon flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-tag text-green-500"></i>
                <span>Melhores Preços</span>
              </div>
              <div className="header-icon flex items-center space-x-2 text-sm text-gray-600">
                <i className="fas fa-shield-alt text-purple-500"></i>
                <span>Compra Segura</span>
              </div>
            </div>
          </div>

          {/* Conteúdo principal do header */}
          <div className="header-content flex items-center justify-between py-4">
            {/* Logo */}
            <div className="logo flex items-center">
              <img
                src="/images/logos/PS-Logo_01.png"
                alt="Pele Sensual Moda Íntima"
                className="main-logo h-12 md:h-16 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback logo */}
              <div className="hidden w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full items-center justify-center">
                <span className="text-white font-bold text-xl">PS</span>
              </div>
              <div className="ml-3">
                <div className="slogan text-sm text-gray-600 font-medium">
                  Conforto, leveza e qualidade
                </div>
              </div>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#produtos-adulto')}
                    className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                  >
                    Adulto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#produtos-infantil')}
                    className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                  >
                    Infantil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#sobre')}
                    className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#contato')}
                    className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </nav>

            {/* Botões de ação */}
            <div className="flex items-center space-x-4">
              {/* Botão do carrinho */}
              <button
                onClick={toggleCart}
                className="cart-button relative p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <i className="fas fa-shopping-cart text-lg"></i>
                {cartItemsCount > 0 && (
                  <span className="cart-count absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Menu mobile */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors duration-300"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white border-t border-gray-200">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => {
                      window.location.href = '/';
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#produtos-adulto')}
                    className="block w-full text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300"
                  >
                    Adulto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#produtos-infantil')}
                    className="block w-full text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300"
                  >
                    Infantil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#sobre')}
                    className="block w-full text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#contato')}
                    className="block w-full text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Overlay para menu mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
