import React from 'react';
import { Instagram, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logos/PS-Logo_05.png" 
                alt="Pele Sensual" 
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-pink-400">Pele Sensual</h3>
                <p className="text-sm text-gray-400">Moda Íntima</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conforto, leveza e qualidade em moda íntima feminina. 
              Peças que valorizam sua feminilidade com o máximo de conforto.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/pelesensual" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5585999436548" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="mailto:pelesensualmodaintima@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-pink-400">Links Rápidos</h3>
            <nav className="space-y-3">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('produtos-adulto')}
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Moda Íntima Adulto
              </button>
              <button 
                onClick={() => scrollToSection('produtos-infantil')}
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Moda Íntima Infantil
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Sobre Nós
              </button>
              <button 
                onClick={() => scrollToSection('contato')}
                className="block text-gray-300 hover:text-pink-400 transition-colors"
              >
                Contato
              </button>
            </nav>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-pink-400">Produtos</h3>
            <div className="space-y-3 text-gray-300">
              <p>• Calcinhas Microfibra</p>
              <p>• Calcinhas Modal</p>
              <p>• Pala Cotton</p>
              <p>• Fio Dental</p>
              <p>• Plus Size</p>
              <p>• Moda Íntima Infantil</p>
              <p>• Kits e Boxes</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-pink-400">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">WhatsApp</p>
                  <a 
                    href="tel:+5585999436548" 
                    className="text-white hover:text-pink-400 transition-colors"
                  >
                    (85) 99943-6548
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <a 
                    href="mailto:pelesensualmodaintima@gmail.com" 
                    className="text-white hover:text-pink-400 transition-colors break-all"
                  >
                    pelesensualmodaintima@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Atendimento</p>
                  <p className="text-white">Segunda a Sexta</p>
                  <p className="text-white">8h às 18h</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Localização</p>
                  <p className="text-white">Fortaleza - CE</p>
                  <p className="text-white">Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Formas de Pagamento</h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white font-medium">PIX</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white font-medium">Cartão de Crédito</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-white font-medium">PagBank</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Pagamentos seguros processados pelo PagBank
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Pele Sensual Moda Íntima. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-pink-400" />
              <span>para você</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

