import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItemsCount, toggleCart } = useCart();

  // Detectar scroll para estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura do header fixo
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      closeMenu();
    }
  };

  const navigationItems = [
    { id: 'home', label: 'Início', href: '#home' },
    { id: 'produtos-adulto', label: 'Produtos', href: '#produtos-adulto' },
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'contato', label: 'Contato', href: '#contato' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => scrollToSection('home')}
                className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PS</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-800">Pele Sensual</h1>
                  <p className="text-xs text-gray-600">Moda Íntima</p>
                </div>
              </button>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>

            {/* Actions (Cart + Menu) */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 6h14m-2 7v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0h2" />
                </svg>
                
                {/* Badge contador */}
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors duration-300"
                aria-label="Menu"
              >
                <svg 
                  className={`w-6 h-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visibility-visible' 
            : 'max-h-0 opacity-0 visibility-hidden overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors duration-300 border-b border-gray-100 last:border-b-0"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* WhatsApp Link no menu mobile */}
                <a
                  href="https://wa.me/5585999436548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium py-2 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart />

      {/* Overlay para fechar menu mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Header;
