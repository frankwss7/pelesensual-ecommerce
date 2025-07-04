import React from 'react';

const AboutSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Feito com Amor',
      description: 'Cada peça é selecionada com carinho pensando no seu conforto e bem-estar.',
      color: 'pink'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Qualidade Garantida',
      description: 'Tecidos premium, acabamento impecável e durabilidade que você pode confiar.',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Entrega Rápida',
      description: 'Receba seus produtos rapidamente em Fortaleza e região metropolitana.',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Atendimento Personalizado',
      description: 'Nossa equipe está sempre pronta para ajudar você a encontrar o produto ideal.',
      color: 'blue'
    }
  ];

  const stats = [
    { number: '5+', label: 'Anos de Experiência' },
    { number: '1000+', label: 'Clientes Satisfeitas' },
    { number: '50+', label: 'Produtos Únicos' },
    { number: '100%', label: 'Satisfação Garantida' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      location: 'Fortaleza, CE',
      text: 'Produtos de excelente qualidade! O tecido é muito macio e o caimento é perfeito. Super recomendo!',
      rating: 5,
      image: '/images/cliente1.jpg' // Usando caminho correto
    },
    {
      id: 2,
      name: 'Ana Costa',
      location: 'Caucaia, CE',
      text: 'Atendimento incrível! Me ajudaram a escolher o tamanho certo e a entrega foi super rápida.',
      rating: 5,
      image: '/images/cliente2.jpg' // Usando caminho correto
    },
    {
      id: 3,
      name: 'Juliana Santos',
      location: 'Maracanaú, CE',
      text: 'Amei minha compra! A qualidade superou minhas expectativas. Já sou cliente fiel!',
      rating: 5,
      image: '/images/cliente3.jpg' // Usando caminho correto
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Pele Sensual Moda Íntima
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Somos uma empresa especializada em moda íntima feminina, oferecendo produtos de alta qualidade 
            que combinam conforto, elegância e sensualidade. Nossa missão é fazer você se sentir 
            confiante e radiante todos os dias.
          </p>
        </div>

        {/* História da empresa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Nossa História
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A Pele Sensual nasceu da paixão por oferecer às mulheres produtos íntimos de qualidade 
                excepcional. Começamos como um pequeno negócio familiar em Fortaleza e crescemos 
                graças à confiança das nossas clientes.
              </p>
              <p>
                Cada peça do nosso catálogo é cuidadosamente selecionada, priorizando tecidos nobres, 
                acabamentos refinados e designs que valorizam a feminilidade natural de cada mulher.
              </p>
              <p>
                Acreditamos que lingerie não é apenas uma peça de roupa, mas uma expressão de 
                autoestima e empoderamento feminino.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary inline-flex items-center justify-center"
              >
                Entre em Contato
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#produtos-adulto"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('produtos-adulto').scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary inline-flex items-center justify-center"
              >
                Ver Produtos
              </a>
            </div>
          </div>

          <div className="relative">
            {/* Imagem principal */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/sobre-nos.jpg" // Usando caminho correto
                alt="Sobre a Pele Sensual"
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmOWE4ZDQ7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5MzMzZWE7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdC
