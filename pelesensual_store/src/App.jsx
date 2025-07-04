import React from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        {/* Header fixo */}
        <Header />
        
        <main>
          {/* Hero Banner - Seção inicial */}
          <section id="home">
            <HeroBanner />
          </section>
          
          {/* Catálogo de Produtos */}
          <section id="produtos-adulto">
            <ProductCatalog />
          </section>
          
          {/* Seção Sobre */}
          <section id="sobre">
            <AboutSection />
          </section>
          
          {/* Seção de Contato */}
          <section id="contato" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Entre em Contato
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Estamos aqui para ajudar! Entre em contato conosco através do WhatsApp, 
                  email ou redes sociais.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* WhatsApp */}
                <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-4">Atendimento rápido</p>
                  <a 
                    href="https://wa.me/5585999436548" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    (85) 99943-6548
                  </a>
                </div>
                
                {/* Email */}
                <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 mb-4">Envie sua mensagem</p>
                  <a 
                    href="mailto:pelesensualmodaintima@gmail.com"
                    className="text-blue-600 hover:text-blue-700 font-medium break-all transition-colors"
                  >
                    pelesensualmodaintima@gmail.com
                  </a>
                </div>
                
                {/* Instagram */}
                <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Instagram</h3>
                  <p className="text-gray-600 mb-4">Siga-nos</p>
                  <a 
                    href="https://www.instagram.com/pelesensual" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
                  >
                    @pelesensual
                  </a>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Horário de Atendimento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Segunda a Sexta</h4>
                      <p className="text-gray-600">8h às 18h</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Sábado</h4>
                      <p className="text-gray-600">8h às 14h</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-6">
                    Respondemos o mais rápido possível! 💕
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* WhatsApp Button Flutuante */}
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default App;
