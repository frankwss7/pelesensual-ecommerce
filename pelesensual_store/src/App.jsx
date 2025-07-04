import React from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

// Componente da seção de contato otimizado
const ContactSection = () => {
  const contactMethods = [
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Atendimento rápido e personalizado',
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
      ),
      contact: '(85) 99943-6548',
      href: 'https://wa.me/5585999436548',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      hoverColor: 'hover:text-green-700'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Envie sua mensagem detalhada',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      contact: 'pelesensualmodaintima@gmail.com',
      href: 'mailto:pelesensualmodaintima@gmail.com',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      hoverColor: 'hover:text-blue-700'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      description: 'Acompanhe nossas novidades',
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      contact: '@pelesensual',
      href: 'https://www.instagram.com/pelesensual',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      hoverColor: 'hover:text-pink-700'
    }
  ];

  const businessHours = [
    { days: 'Segunda a Sexta', hours: '8h às 18h' },
    { days: 'Sábado', hours: '8h às 14h' },
    { days: 'Domingo', hours: 'Fechado' }
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Fale Conosco
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Estamos aqui para ajudar! Entre em contato conosco através dos nossos canais de atendimento. 
            Respondemos rapidamente para garantir a melhor experiência.
          </p>
        </div>
        
        {/* Cards de contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method) => (
            <div 
              key={method.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105 border border-gray-200"
            >
              <div className={`${method.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-6">{method.description}</p>
              <a 
                href={method.href}
                target={method.id !== 'email' ? '_blank' : undefined}
                rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                className={`${method.textColor} ${method.hoverColor} font-semibold transition-colors duration-300 inline-flex items-center hover:underline ${method.id === 'email' ? 'break-all' : ''}`}
              >
                {method.contact}
                <svg className="w-4 h-4 ml-2 hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Horário de Atendimento */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center bg-pink-600 text-white px-4 py-2 rounded-full mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horário de Atendimento
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Quando Estamos Disponíveis
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              {businessHours.map((schedule, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">{schedule.days}</h4>
                  <p className="text-gray-600 font-medium">{schedule.hours}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl p-6 inline-block">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold text-pink-600">Tempo médio de resposta:</span> 15 minutos
              </p>
              <p className="text-sm text-gray-500">
                Respondemos o mais rápido possível! 💕
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action adicional */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5585999436548"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Conversar Agora
            </a>
            <a
              href="mailto:pelesensualmodaintima@gmail.com"
              className="bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          
          {/* Seção de Contato otimizada */}
          <ContactSection />
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
