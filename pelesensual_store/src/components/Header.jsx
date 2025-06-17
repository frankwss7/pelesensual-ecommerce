import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Heart, Truck, Tag, Shield, Instagram, Phone, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems, pricingMode, setPricingMode, canUseWholesale } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

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

