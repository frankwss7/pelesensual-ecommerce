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
      image: '/images/cliente1.jpg'
    },
    {
      id: 2,
      name: 'Ana Costa',
      location: 'Caucaia, CE',
      text: 'Atendimento incrível! Me ajudaram a escolher o tamanho certo e a entrega foi super rápida.',
      rating: 5,
      image: '/images/cliente2.jpg'
    },
    {
      id: 3,
      name: 'Juliana Santos',
      location: 'Maracanaú, CE',
      text: 'Amei minha compra! A qualidade superou minhas expectativas. Já sou cliente fiel!',
      rating: 5,
      image: '/images/cliente3.jpg'
    }
  ];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.style.background = 'linear-gradient(135deg, #f9a8d4, #9333ea)';
    e.target.parentElement.innerHTML = `
      <div class="flex items-center justify-center h-full text-white">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
    `;
  };

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
                src="/images/sobre-nos.jpg"
                alt="Sobre a Pele Sensual"
                className="w-full h-96 object-cover"
                onError={handleImageError}
              />
              
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-purple-600/20"></div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Características/Diferenciais */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Por que Escolher a Pele Sensual?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos muito mais que produtos. Proporcionamos uma experiência completa de bem-estar e autoestima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-${feature.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Nossos Números
            </h3>
            <p className="text-gray-600">
              Resultados que mostram nossa dedicação e qualidade
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Depoimentos */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              O que Nossas Clientes Dizem
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A satisfação das nossas clientes é nossa maior recompensa. Veja alguns depoimentos reais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Aspas decorativas */}
                <div className="text-pink-200 text-4xl font-serif mb-4">"</div>
                
                {/* Texto do depoimento */}
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  {testimonial.text}
                </p>

                {/* Avaliação */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Info da cliente */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action final */}
        <div className="text-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Pronta para se Sentir Incrível?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva e encontre peças que realçam sua beleza natural. 
            Você merece o melhor!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#produtos-adulto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('produtos-adulto').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Ver Nossa Coleção
            </a>
            
            <a
              href="https://wa.me/5585999436548"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Falar Conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
