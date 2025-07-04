import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalQuantity, pricingMode } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
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
              <h1 className="text-xl font-bold text-gray-800 sm:block hidden">Pele Sensual</h1>
              <h1 className="text-lg font-bold text-gray-800 sm:hidden">Pele Sensual</h1>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {['home', 'produtos-adulto', 'sobre', 'contato'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                >
                  {sec === 'produtos-adulto' ? 'Produtos' : sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </nav>

            {/* Ações */}
            <div className="flex items-center space-x-4">
              {pricingMode === 'wholesale' && (
                <span className="hidden sm:flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Atacado
                </span>
              )}
              {/* Botão Carrinho desativado pois Carrinho está sempre aberto */}
              <div className="relative flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-medium cursor-default">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline">Carrinho</span>
                {getTotalQuantity() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {getTotalQuantity() > 99 ? '99+' : getTotalQuantity()}
                  </span>
                )}
              </div>

              {/* Menu Mobile */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Navegação Mobile */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                {['home', 'produtos-adulto', 'sobre', 'contato'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => scrollToSection(sec)}
                    className="text-left text-gray-700 hover:text-pink-600 transition-colors font-medium py-2"
                  >
                    {sec === 'produtos-adulto' ? 'Produtos' : sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </button>
                ))}
                {pricingMode === 'wholesale' && (
                  <div className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium w-fit">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Modo Atacado Ativo
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Carrinho sempre visível (sem controle via props) */}
      <Cart />
    </>
  );
};

export default Header;
