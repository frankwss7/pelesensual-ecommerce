import React, { Suspense, lazy } from 'react';
import { CartProvider } from './contexts/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

// Lazy loading para componentes pesados
const ProductCatalog = lazy(() => import('./components/ProductCatalog'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const Footer = lazy(() => import('./components/Footer'));

// Componente de Loading
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <LoadingSpinner />
  </div>
);

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
      color: 'green'
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
      color: 'blue'
    },
    {
      id: 'instagram',
      title: 'Instagram',
      description: 'Acompanhe nossas novidades',
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      contact: '@pelesensual',
      href: 'https://www.instagram.com/pelesensual',
      color: 'pink'
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
              className="card group hover:scale-105 transition-all duration-300 text-center"
            >
              <div className={`bg-${method.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-6">{method.description}</p>
              <a 
                href={method.href}
                target={method.id !== 'email' ? '_blank' : undefined}
                rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
                className={`text-${method.color}-600 hover:text-${method.color}-700 font-semibold transition-colors duration-300 inline-flex items-center group-hover:underline ${method.id === 'email' ? 'break-all' : ''}`}
              >
                {method.contact}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5585999436548"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-success inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Conversar Agora
            </a>
            <a
              href="mailto:pelesensualmodaintima@gmail.com"
              className="btn-secondary inline-flex items-center"
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
    <ErrorBoundary>
      <CartProvider>
        <div className="App">
          {/* Header fixo com melhor acessibilidade */}
          <Header />
          
          <main role="main">
            {/* Hero Banner - Seção inicial */}
            <section id="home" aria-label="Banner principal">
              <HeroBanner />
            </section>
            
            {/* Catálogo de Produtos com lazy loading */}
            <section id="produtos-adulto" aria-label="Catálogo de produtos">
              <Suspense fallback={<SectionLoader />}>
                <ProductCatalog />
              </Suspense>
            </section>
            
            {/* Seção Sobre com lazy loading */}
            <section id="sobre" aria-label="Sobre a empresa">
              <Suspense fallback={<SectionLoader />}>
                <AboutSection />
              </Suspense>
            </section>
            
            {/* Seção de Contato otimizada */}
            <ContactSection />
          </main>
          
          {/* Footer com lazy loading */}
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
          
          {/* WhatsApp Button Flutuante */}
          <WhatsAppButton />
          
          {/* Skip Links para acessibilidade */}
          <a 
            href="#home" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-lg z-50"
          >
            Pular para o conteúdo principal
          </a>
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
