import React, { useState, useEffect, createContext, useContext } from 'react';

// Context do Carrinho
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (product) => {
    const newItem = {
      id: product.id || Date.now(),
      name: product.name,
      price: product.price,
      quantity: 1
    };
    setCartItems(prev => [...prev, newItem]);
    updateTotal([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const updateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      cartItems,
      cartTotal,
      cartItemsCount: cartItems.length,
      addToCart,
      toggleCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Componente principal
function App() {
  const [currentMode, setCurrentMode] = useState('retail');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { cartItemsCount, toggleCart, isCartOpen, cartItems, cartTotal, closeCart, addToCart } = useCart();

  // Auto-slide do banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Produtos exatos do site original
  const adultProducts = [
    {
      id: '016',
      name: 'Calça Microfibra',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 4.70,
      ref: 'REF: 016',
      image: 'images/calca_microfibra_frente_1.png'
    },
    {
      id: '012',
      name: 'Calça Modal',
      material: 'Tecido: Modal',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 5.20,
      ref: 'REF: 012',
      image: 'images/calcola_modal_frente_1.png'
    },
    {
      id: '013',
      name: 'Pala Cotton',
      material: 'Tecido: Cotton (algodão) Amaciado - Fio 40',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 6.50,
      ref: 'REF: 013',
      image: 'images/pala_cotton_frente_1.png'
    },
    {
      id: '014',
      name: 'Tanga Lari',
      material: 'Tecido: Cotton',
      sizes: 'Tamanhos: M, G, GG',
      price: 6.00,
      ref: 'REF: 014',
      image: 'images/tanga_lari_frente_1.png'
    },
    {
      id: '050',
      name: 'Fio Pala Dupla',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 7.00,
      ref: 'REF: 050',
      image: 'images/fio_pala_dupla_050.png'
    },
    {
      id: '023',
      name: 'Calça Plus',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: Plus Size',
      price: 8.00,
      ref: 'REF: 023',
      image: 'images/calca_plus_023.png'
    },
    {
      id: '052',
      name: 'Fio Largo',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: M, G, GG',
      price: 7.50,
      ref: 'REF: 052',
      image: 'images/fio_largo_frente_1.png'
    },
    {
      id: '1020',
      name: 'Calça Lateral Dupla',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 6.50,
      ref: 'REF: 1020',
      image: 'images/calca_lateral_dupla_1020.png'
    },
    {
      id: '026',
      name: 'Box Feminina',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 7.00,
      ref: 'REF: 026 * Cores Sortidas',
      image: 'images/box_feminina/box_feminina_frente_1.png'
    }
  ];

  return (
    <div>
      {/* CDN Imports */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* CSS Styles */}
      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Mode Toggle */
        .mode-toggle-container { position: fixed; top: 20px; left: 20px; z-index: 1001; }
        .mode-toggle { background: white; border-radius: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; display: flex; }
        .mode-toggle button { background: none; border: none; padding: 12px 20px; cursor: pointer; transition: all 0.3s; font-weight: 500; }
        .mode-toggle button.active { background: #ec4899; color: white; }
        
        /* Header */
        .header-decoration { position: fixed; top: 0; left: 0; right: 0; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 1000; }
        .header-pattern { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #ec4899, #9333ea); }
        .header-icons { display: flex; justify-content: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0; gap: 30px; }
        .header-icon { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #666; }
        .header-icon i { color: #ec4899; }
        .header-content { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; }
        .logo { display: flex; align-items: center; gap: 15px; }
        .main-logo { height: 60px; }
        .slogan { color: #666; font-size: 14px; font-style: italic; }
        nav ul { display: flex; list-style: none; gap: 30px; margin: 0; }
        nav a { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s; }
        nav a:hover { color: #ec4899; }
        
        /* Banner */
        .banner-container { position: relative; height: 500px; margin-top: 120px; overflow: hidden; }
        .banner-slide { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 1s; display: flex; align-items: center; justify-content: center; }
        .banner-slide.active { opacity: 1; }
        .banner-slide::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); }
        .banner-content { position: relative; z-index: 2; text-align: center; color: white; max-width: 600px; padding: 0 20px; }
        .banner-content h2 { font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700; }
        .banner-content p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
        .banner-btn { display: inline-block; background: #ec4899; color: white; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: 600; transition: transform 0.3s; }
        .banner-btn:hover { transform: translateY(-2px); }
        .banner-dots { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; }
        .banner-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: background 0.3s; }
        .banner-dot.active { background: white; }
        
        /* Promotional Section */
        .promotional-section { padding: 80px 0; background: linear-gradient(135deg, #fdf2f8, #f3e8ff); position: relative; overflow: hidden; }
        .promotional-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333; font-weight: 700; }
        .promotional-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .promo-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .promo-card:hover { transform: translateY(-5px); }
        .promo-card-image { width: 100%; height: 200px; object-fit: cover; }
        .promo-card-content { padding: 30px; }
        .promo-card-title { font-size: 1.5rem; margin-bottom: 1rem; color: #333; font-weight: 600; }
        .promo-card-text { color: #666; margin-bottom: 1.5rem; line-height: 1.6; }
        .promo-card-button { display: inline-block; background: #ec4899; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 500; transition: background 0.3s; }
        .promo-card-button:hover { background: #be185d; }
        
        /* Products */
        .products { padding: 80px 0; }
        .products:nth-child(even) { background: #f8fafc; }
        .products h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333; font-weight: 700; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .product-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .product-card:hover { transform: translateY(-5px); }
        .product-card img { width: 100%; height: 250px; object-fit: cover; }
        .product-card .content { padding: 25px; }
        .product-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: #333; font-weight: 600; }
        .material { color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .sizes { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
        .price { font-size: 1.5rem; color: #ec4899; font-weight: 700; margin-bottom: 0.5rem; }
        .ref { color: #999; font-size: 0.8rem; margin-bottom: 1.5rem; }
        .actions { display: flex; gap: 10px; }
        .btn { display: inline-block; background: #ec4899; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 500; transition: background 0.3s; border: none; cursor: pointer; }
        .btn:hover { background: #be185d; }
        .btn-sm { padding: 8px 16px; font-size: 0.9rem; }
        .actions .btn { flex: 1; text-align: center; }
        
        /* Cart */
        .cart { position: fixed; top: 0; right: -400px; width: 400px; height: 100vh; background: white; box-shadow: -5px 0 15px rgba(0,0,0,0.1); transition: right 0.3s; z-index: 2000; padding: 0; overflow-y: auto; }
        .cart.open { right: 0; }
        .cart-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .cart-close { background: none; border: none; font-size: 24px; cursor: pointer; }
        .cart-items { padding: 20px; }
        .cart-item { padding: 15px 0; border-bottom: 1px solid #eee; }
        .cart-total { padding: 20px; border-top: 1px solid #eee; text-align: center; font-size: 1.2rem; font-weight: 600; }
        .cart-buttons { padding: 20px; }
        .cart-buttons .btn { width: 100%; margin-bottom: 10px; }
        .cart-button { position: fixed; bottom: 20px; right: 20px; background: #ec4899; color: white; border: none; padding: 15px; border-radius: 50%; font-size: 20px; cursor: pointer; box-shadow: 0 4px 15px rgba(236,72,153,0.3); transition: transform 0.3s; z-index: 1000; }
        .cart-button:hover { transform: scale(1.1); }
        .cart-count { position: absolute; top: -5px; right: -5px; background: #dc2626; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center; }
        
        /* Footer */
        footer { background: #1f2937; color: white; padding: 60px 0 20px; }
        .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px; }
        .footer-section h3 { margin-bottom: 20px; font-size: 1.3rem; color: #ec4899; }
        .copyright { text-align: center; padding-top: 20px; border-top: 1px solid #374151; opacity: 0.6; }
        
        /* Responsive */
        @media (max-width: 768px) {
          .header-icons { display: none; }
          nav ul { display: none; }
          .cart { width: 100%; right: -100%; }
        }
      `}</style>

      {/* Mode Toggle */}
      <div className="mode-toggle-container">
        <div className="mode-toggle">
          <button 
            className={currentMode === 'retail' ? 'active' : ''}
            onClick={() => setCurrentMode('retail')}
          >
            Varejo
          </button>
          <button 
            className={currentMode === 'wholesale' ? 'active' : ''}
            onClick={() => setCurrentMode('wholesale')}
          >
            Atacado
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="header-decoration">
        <div className="header-pattern"></div>
        <div className="container">
          <div className="header-icons">
            <div className="header-icon">
              <i className="fas fa-heart"></i>
              <span>Qualidade Premium</span>
            </div>
            <div className="header-icon">
              <i className="fas fa-truck"></i>
              <span>Entrega Rápida</span>
            </div>
            <div className="header-icon">
              <i className="fas fa-tag"></i>
              <span>Melhores Preços</span>
            </div>
            <div className="header-icon">
              <i className="fas fa-shield-alt"></i>
              <span>Compra Segura</span>
            </div>
          </div>
          <div className="header-content">
            <div className="logo">
              <img src="images/logos/PS-Logo_01.png" alt="Pele Sensual Moda Íntima" className="main-logo" />
            </div>
            <div className="slogan">Conforto, leveza e qualidade</div>
            <nav>
              <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#produtos">Produtos</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="banner-container" id="home">
        <div className={`banner-slide ${currentSlide === 0 ? 'active' : ''}`} 
             style={{backgroundImage: "url('images/banner/banner_img1.png')"}}>
          <div className="banner-content">
            <h2>Conforto e Elegância em Cada Peça</h2>
            <p>Descubra nossa coleção de moda íntima feminina com tecidos de alta qualidade e designs modernos.</p>
            <a href="#produtos" className="banner-btn">Ver Produtos</a>
          </div>
        </div>
        <div className={`banner-slide ${currentSlide === 1 ? 'active' : ''}`} 
             style={{backgroundImage: "url('images/banner/banner_img2.png')"}}>
          <div className="banner-content">
            <h2>Sensualidade com Conforto</h2>
            <p>Peças que valorizam seu corpo com o máximo de conforto para o dia a dia.</p>
            <a href="#produtos" className="banner-btn">Explorar Coleção</a>
          </div>
        </div>
        <div className={`banner-slide ${currentSlide === 2 ? 'active' : ''}`} 
             style={{backgroundImage: "url('images/banner/banner_img3.png')"}}>
          <div className="banner-content">
            <h2>Qualidade que Você Merece</h2>
            <p>Tecidos selecionados e acabamento impecável para sua satisfação.</p>
            <a href="#produtos" className="banner-btn">Conhecer Produtos</a>
          </div>
        </div>
        <div className="banner-dots">
          <div className={`banner-dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => setCurrentSlide(0)}></div>
          <div className={`banner-dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => setCurrentSlide(1)}></div>
          <div className={`banner-dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => setCurrentSlide(2)}></div>
        </div>
      </div>

      {/* Promotional Section */}
      <section className="promotional-section">
        <div className="container">
          <h2 className="promotional-title">Promoções Especiais</h2>
          <div className="promotional-cards">
            <div className="promo-card">
              <img src="images/promotional/promo_faca_pedido.png" alt="Faça seu pedido" className="promo-card-image" />
              <div className="promo-card-content">
                <h3 className="promo-card-title">Felicidade se Constrói</h3>
                <p className="promo-card-text">Construa sua semana próspera com peças de qualidade que trazem conforto e bem-estar para o seu dia a dia.</p>
                <a href="#produtos" className="promo-card-button">Faça seu Pedido</a>
              </div>
            </div>
            <div className="promo-card">
              <img src="images/promotional/promo_semana_prospera.png" alt="Semana próspera" className="promo-card-image" />
              <div className="promo-card-content">
                <h3 className="promo-card-title">Semana Próspera</h3>
                <p className="promo-card-text">Desejamos uma semana próspera e abençoada para você. Aproveite nossas ofertas especiais!</p>
                <a href="#produtos" className="promo-card-button">Ver Ofertas</a>
              </div>
            </div>
            <div className="promo-card">
              <div className="promo-card-content">
                <h3 className="promo-card-title">Novidades da Semana</h3>
                <p className="promo-card-text">Confira nossas novidades e aproveite descontos especiais em produtos selecionados.</p>
                <ul style={{textAlign: 'left', marginBottom: '1.5rem'}}>
                  <li>Box Feminina - Nova coleção</li>
                  <li>Calcinhas em Cotton - Cores novas</li>
                  <li>Fio Largo - Promoção especial</li>
                  <li>Infantil Trix - Estampas exclusivas</li>
                </ul>
                <a href="#produtos" className="promo-card-button">Conferir Novidades</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="products">
        <div className="container">
          <h2>Moda Íntima Adulto</h2>
          <div className="product-grid">
            {adultProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="content">
                  <h3>{product.name}</h3>
                  <p className="material">{product.material}</p>
                  <p className="sizes">{product.sizes}</p>
                  <p className="price">R$ {product.price.toFixed(2)}</p>
                  <p className="ref">{product.ref}</p>
                  <div className="actions">
                    <button className="btn btn-sm" onClick={() => addToCart(product)}>
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="products">
        <div className="container">
          <h2>Sobre a Pele Sensual</h2>
          <p style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: '#666'}}>
            A Pele Sensual é uma marca de moda íntima que prioriza o conforto, a leveza e a qualidade em todas as suas peças. 
            Trabalhamos com tecidos de alta qualidade como Microfibra, Modal e Cotton, oferecendo uma variedade de modelos 
            para atender a todos os gostos e necessidades.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="products">
        <div className="container">
          <h2>Entre em Contato</h2>
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <p style={{marginBottom: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <i className="fas fa-phone" style={{color: '#ec4899'}}></i> (85) 99943-6548
            </p>
            <p style={{marginBottom: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <i className="fas fa-envelope" style={{color: '#ec4899'}}></i> pelesensualmodaintima@gmail.com
            </p>
            <p style={{marginBottom: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <i className="fab fa-whatsapp" style={{color: '#ec4899'}}></i> 
              <a href="https://wa.me/5585999436548" target="_blank" rel="noopener noreferrer" style={{color: '#ec4899', textDecoration: 'none'}}>
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Cart */}
      <div className={`cart ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Seu Carrinho</h3>
          <button className="cart-close" onClick={closeCart}>&times;</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{textAlign: 'center', padding: '2rem', color: '#666'}}>
              Seu carrinho está vazio
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <h4>{item.name}</h4>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-total">
            <span>Total: R$ {cartTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="cart-buttons">
          <a 
            href={`https://wa.me/5585999436548?text=Olá! Gostaria de finalizar meu pedido no valor de R$ ${cartTotal.toFixed(2)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{textDecoration: 'none', display: 'block', textAlign: 'center'}}
          >
            Finalizar no WhatsApp
          </a>
        </div>
      </div>

      {/* Cart Button */}
      <div className="cart-button" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Pele Sensual</h3>
              <p>Moda íntima com conforto, leveza e qualidade.</p>
            </div>
          </div>
          <div className="copyright">
            &copy; 2025 Pele Sensual Moda Íntima. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1999
          }}
          onClick={closeCart}
        />
      )}
    </div>
  );
}

// Export com Provider
export default function AppWithProvider() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}
