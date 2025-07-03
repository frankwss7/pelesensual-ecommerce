import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, toggleCart, isCartOpen } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="header-content container mx-auto px-4 py-4">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PS</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Pele Sensual</h1>
                  <p className="text-sm text-gray-600 hidden sm:block">Conforto, leveza e qualidade</p>
                </div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('produtos-adulto')}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Produtos
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
              >
                Contato
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="cart-button relative flex items-center gap-2 px-4 py-2 border-2 border-pink-500 text-pink-600 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300"
                aria-label="Abrir carrinho"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.12 5H17M13 13v6a2 2 0 01-2 2 2 2 0 01-2-2v-6m4 0V9a2 2 0 00-2-2 2-2 0 00-2 2v4"/>
                </svg>
                <span className="hidden sm:inline">Carrinho</span>
                {totalItems > 0 && (
                  <span className="cart-badge absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Abrir menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection('produtos-adulto')}
                  className="text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors"
                >
                  Produtos
                </button>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="text-left text-gray-700 hover:text-pink-600 font-medium py-2 transition-colors"
                >
                  Contato
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
  return (
    <>
      {/* Top Bar */}
      <div className="bg-pink-50 border-b border-pink-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap justify-center md:justify-between items-center text-sm text-pink-700">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>Qualidade Premium</span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                <span>Entrega Rápida</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>Melhores Preços</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Compra Segura</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <a href="https://www.instagram.com/pelesensual" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">@pelesensual</span>
              </a>
              <a href="tel:+5585999436548" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(85) 99943-6548</span>
              </a>
              <a href="mailto:pelesensualmodaintima@gmail.com" className="flex items-center gap-1 hover:text-pink-600 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/logos/PS-Logo_01.png" 
                alt="Pele Sensual" 
                className="h-12 md:h-16 w-auto"
              />
              <div className="ml-3 hidden md:block">
                <h1 className="text-xl font-bold text-pink-600">Pele Sensual</h1>
                <p className="text-sm text-gray-600">Conforto, leveza e qualidade</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('produtos-adulto')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Adulto
              </button>
              <button 
                onClick={() => scrollToSection('produtos-infantil')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Infantil
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Contato
              </button>
            </nav>

            {/* Pricing Mode Toggle & Cart */}
            <div className="flex items-center gap-4">
              {/* Pricing Mode Toggle */}
              <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPricingMode('retail')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    pricingMode === 'retail'
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  Varejo
                </button>
                <button
                  onClick={() => setPricingMode('wholesale')}
                  disabled={!canUseWholesale()}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    pricingMode === 'wholesale'
                      ? 'bg-pink-600 text-white'
                      : canUseWholesale()
                      ? 'text-gray-600 hover:text-pink-600'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                  title={!canUseWholesale() ? 'Mínimo 200 unidades para atacado' : ''}
                >
                  Atacado
                </button>
              </div>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-pink-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection('produtos-adulto')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  Adulto
                </button>
                <button 
                  onClick={() => scrollToSection('produtos-infantil')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  Infantil
                </button>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  Sobre
                </button>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  Contato
                </button>
                
                {/* Mobile Pricing Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 mt-4">
                  <button
                    onClick={() => setPricingMode('retail')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      pricingMode === 'retail'
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    Varejo
                  </button>
                  <button
                    onClick={() => setPricingMode('wholesale')}
                    disabled={!canUseWholesale()}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      pricingMode === 'wholesale'
                        ? 'bg-pink-600 text-white'
                        : canUseWholesale()
                        ? 'text-gray-600 hover:text-pink-600'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={!canUseWholesale() ? 'Mínimo 200 unidades para atacado' : ''}
                  >
                    Atacado
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;

