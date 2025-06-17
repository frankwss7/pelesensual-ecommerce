import React from 'react';
import { Heart, Award, Truck, Shield, Users, Star } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Qualidade Premium',
      description: 'Tecidos selecionados e acabamento impecável em cada peça'
    },
    {
      icon: Award,
      title: 'Experiência',
      description: 'Anos de experiência no mercado de moda íntima feminina'
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Envio rápido e seguro para todo o Brasil'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Pagamento seguro via PIX e cartão de crédito'
    },
    {
      icon: Users,
      title: 'Atendimento',
      description: 'Suporte personalizado via WhatsApp'
    },
    {
      icon: Star,
      title: 'Satisfação',
      description: 'Milhares de clientes satisfeitas em todo o país'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Sobre a Pele Sensual
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A Pele Sensual é uma marca especializada em moda íntima feminina que combina 
            conforto, qualidade e elegância. Nosso compromisso é oferecer peças que 
            valorizam a feminilidade e proporcionam bem-estar no dia a dia.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Nossa História</h3>
            <p className="text-gray-600 leading-relaxed">
              Fundada com o propósito de democratizar o acesso à moda íntima de qualidade, 
              a Pele Sensual nasceu da paixão por criar peças que fazem as mulheres se 
              sentirem confiantes e confortáveis.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Trabalhamos com tecidos cuidadosamente selecionados como microfibra, modal 
              e cotton amaciado, garantindo durabilidade, maciez e respirabilidade em 
              cada produto.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa linha inclui desde peças básicas para o dia a dia até modelos mais 
              elaborados, sempre priorizando o conforto sem abrir mão do estilo.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/images/promotional/promo_semana_prospera.png" 
              alt="Sobre a Pele Sensual"
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-pink-600 text-white p-6 rounded-xl shadow-xl">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm">Satisfação</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Nossos Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-pink-600 mb-3">Qualidade</h4>
              <p className="text-gray-600">
                Compromisso com a excelência em cada detalhe, desde a seleção dos 
                tecidos até o acabamento final.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-pink-600 mb-3">Conforto</h4>
              <p className="text-gray-600">
                Peças desenvolvidas para proporcionar máximo conforto e liberdade 
                de movimento durante todo o dia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-pink-600 mb-3">Elegância</h4>
              <p className="text-gray-600">
                Designs modernos e sofisticados que valorizam a feminilidade e 
                a autoestima de cada mulher.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

