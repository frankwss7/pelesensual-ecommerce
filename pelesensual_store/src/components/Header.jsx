import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCartOpen, toggleCart, getTotalQuantity, pricingMode } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PS</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">Pele Sensual</h1>
                <p className="text-sm text-gray-600">Conforto, leveza e qualidade</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-800">Pele Sensual</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('produtos-adulto')}
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Produtos
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

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Pricing Mode Indicator */}
              {pricingMode === 'wholesale' && (
                <div className="hidden sm:flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Atacado
                </div>
              )}

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Carrinho</span>
                
                {/* Cart Badge */}
                {getTotalQuantity() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {getTotalQuantity() > 99 ? '99+' : getTotalQuantity()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
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
                  onClick={() => scrollToSection('home')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection('produtos-adulto')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2"
                >
                  Produtos
                </button>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection('contato')}
                  className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2"
                >
                  Contato
                </button>
                
                {pricingMode === 'wholesale' && (
                  <div className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium w-fit">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Modo Atacado Ativo
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;
