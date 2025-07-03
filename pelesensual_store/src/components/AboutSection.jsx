import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Sobre a Pele Sensual
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Há mais de 10 anos no mercado de moda íntima feminina, a Pele Sensual 
                se dedica a oferecer produtos de alta qualidade que combinam conforto, 
                elegância e sensualidade.
              </p>
              <p>
                Nossa missão é fazer com que cada mulher se sinta especial e confiante, 
                oferecendo peças cuidadosamente selecionadas com os melhores tecidos e 
                acabamentos do mercado.
              </p>
              <p>
                Trabalhamos tanto no varejo quanto no atacado, atendendo desde clientes 
                finais até lojistas que confiam na qualidade de nossos produtos para 
                revender em seus estabelecimentos.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Qualidade Premium</h3>
                  <p className="text-sm text-gray-600">Tecidos selecionados e acabamento impecável</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Conforto Total</h3>
                  <p className="text-sm text-gray-600">Pensado para o bem-estar da mulher</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Entrega Rápida</h3>
                  <p className="text-sm text-gray-600">Enviamos para todo o Brasil</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Atendimento Personalizado</h3>
                  <p className="text-sm text-gray-600">Equipe especializada para te ajudar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0290ba4eeb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sobre a Pele Sensual"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">10+</div>
                  <div className="text-sm text-gray-600">Anos</div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">1000+</div>
                  <div className="text-sm text-gray-600">Clientes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
