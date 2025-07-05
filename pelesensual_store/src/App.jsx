import React from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App min-h-screen bg-white">
        {/* Header fixo */}
        <Header />
        
        {/* Banner Principal */}
        <HeroBanner />
        
        {/* Catálogo de Produtos com todas as seções */}
        <ProductCatalog />
        
        {/* Seção Sobre */}
        <AboutSection />
        
        {/* Seção de Contato */}
        <ContactSection />
        
        {/* Footer */}
        <Footer />
        
        {/* Carrinho (sidebar) */}
        <Cart />
        
        {/* WhatsApp Button Flutuante */}
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default App;
