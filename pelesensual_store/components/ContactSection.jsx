import React from 'react';

const ContactSection = () => {
  return (
    <section id="contato" className="hero py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Entre em Contato
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Estamos à disposição para atender suas dúvidas, sugestões ou pedidos. Entre em contato conosco pelos canais abaixo:
          </p>
        </div>

        <div className="contact-info max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Telefone */}
            <div className="contact-item bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefone</h3>
              <p className="text-gray-600 mb-4">Ligue para nós</p>
              <a 
                href="tel:+5585999436548" 
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
              >
                (85) 99943-6548
              </a>
            </div>

            {/* Email */}
            <div className="contact-item bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Envie uma mensagem</p>
              <a 
                href="mailto:pelesensualmodaintima@gmail.com" 
                className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-300 break-all"
              >
                pelesensualmodaintima@gmail.com
              </a>
            </div>

            {/* Instagram */}
            <div className="contact-item bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-instagram text-2xl text-pink-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Instagram</h3>
              <p className="text-gray-600 mb-4">Siga-nos</p>
              <a 
                href="https://www.instagram.com/pelesensual?igsh=bXU3a2Z6NmVwbzhz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-semibold transition-colors duration-300"
              >
                @pelesensual
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-item bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-whatsapp text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat direto</p>
              <a 
                href="https://wa.me/5585999436548" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Call to action adicional */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para fazer seu pedido?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Entre em contato conosco pelo WhatsApp e faça seu pedido agora mesmo!
            </p>
            <a
              href="https://wa.me/5585999436548?text=Olá! Gostaria de fazer um pedido."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Fazer Pedido pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
