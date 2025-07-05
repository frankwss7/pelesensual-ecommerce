import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Seção da empresa */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Pele Sensual</h3>
            <p className="text-gray-300 mb-4">
              Moda íntima com conforto, leveza e qualidade.
            </p>
            
            <div className="space-y-2 mb-6">
              <p className="flex items-center text-gray-300">
                <i className="fas fa-phone mr-3 text-pink-400"></i>
                (85) 99943-6548
              </p>
              <p className="flex items-center text-gray-300">
                <i className="fas fa-envelope mr-3 text-pink-400"></i>
                pelesensualmodaintima@gmail.com
              </p>
            </div>
            
            <div className="social-links flex space-x-4">
              <a 
                href="https://www.instagram.com/pelesensual?igsh=bXU3a2Z6NmVwbzhz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-300"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://wa.me/5585999436548" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Seção de categorias */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#produtos-adulto')}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Moda Íntima Adulto
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#produtos-infantil')}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Moda Íntima Infantil
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#embalagens')}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Embalagens e Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Seção de informações */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#sobre')}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contato')}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                >
                  Contato
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  Termos e Condições
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Pele Sensual Moda Íntima. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
