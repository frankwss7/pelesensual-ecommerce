import React, { useState, createContext, useContext } from 'react';

// Estilos CSS inline para garantir que funcionem
const styles = {
  // Reset básico
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  
  // Container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  
  // Header
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '1rem 0',
  },
  
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  
  logoIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #ec4899, #9333ea)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    marginRight: '15px',
  },
  
  logoText: {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  
  logoSubtext: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0,
  },
  
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  
  navLink: {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  
  cartButton: {
    background: '#ec4899',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer',
    position: 'relative',
    fontSize: '18px',
  },
  
  cartBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: '#dc2626',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Banner
  banner: {
    background: 'linear-gradient(135deg, #ec4899, #9333ea)',
    color: 'white',
    textAlign: 'center',
    padding: '150px 20px 100px',
    marginTop: '80px',
  },
  
  bannerContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  
  bannerTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
  },
  
  bannerSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
    lineHeight: '1.6',
  },
  
  bannerButton: {
    background: 'white',
    color: '#ec4899',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  
  // Products
  productsSection: {
    padding: '80px 20px',
    background: '#f9fafb',
  },
  
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: '#1f2937',
    fontWeight: 'bold',
  },
  
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  productCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  
  productImage: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
    borderRadius: '10px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '48px',
  },
  
  productName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#1f2937',
    fontWeight: '600',
  },
  
  productRef: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: '1rem',
  },
  
  productButton: {
    background: '#ec4899',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    width: '100%',
    transition: 'background 0.3s',
  },
  
  // About
  aboutSection: {
    padding: '80px 20px',
    background: 'white',
  },
  
  aboutContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  
  aboutText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#4b5563',
    marginBottom: '1.5rem',
  },
  
  // Contact
  contactSection: {
    padding: '80px 20px',
    background: '#f9fafb',
  },
  
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '800px',
    margin: '3rem auto 0',
  },
  
  contactCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  
  contactIcon: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  
  contactTitle: {
    marginBottom: '0.5rem',
    color: '#1f2937',
    fontWeight: '600',
  },
  
  contactLink: {
    color: '#ec4899',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  
  // Footer
  footer: {
    background: '#1f2937',
    color: 'white',
    padding: '3rem 20px 1rem',
    textAlign: 'center',
  },
  
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  
  footerTitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
  },
  
  footerText: {
    marginBottom: '2rem',
    opacity: 0.8,
  },
  
  footerCopyright: {
    opacity: 0.6,
    fontSize: '0.9rem',
  },
  
  // WhatsApp Button
  whatsappButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#22c55e',
    color: 'white',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
    zIndex: 1000,
    transition: 'transform 0.3s',
  },
  
  // Cart Modal
  cartOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  
  cartSidebar: {
    background: 'white',
    width: '400px',
    height: '100%',
    padding: '2rem',
    overflowY: 'auto',
  },
  
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  
  cartCloseButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  
  cartItem: {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '1rem',
  },
  
  cartItemName: {
    margin: 0,
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  
  cartItemPrice: {
    margin: 0,
    color: '#ec4899',
    fontWeight: 'bold',
  },
  
  cartEmpty: {
    textAlign: 'center',
    padding: '2rem',
    color: '#6b7280',
  },
  
  cartFinishButton: {
    background: '#22c55e',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: '2rem',
    width: '100%',
    textAlign: 'center',
  },
};

// Context do Carrinho
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, id: Date.now() }]);
    setIsCartOpen(true);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      cartItems,
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

// Aplicar estilos globais
const GlobalStyle = () => {
  React.useEffect(() => {
    // Aplicar reset CSS
    const style = document.createElement('style');
    style.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
      a { color: inherit; }
      button { font-family: inherit; }
      .product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
      .contact-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
      .banner-button:hover { transform: scale(1.05); }
      .whatsapp-button:hover { transform: scale(1.1); }
      .product-button:hover { background: #be185d; }
      .nav-link:hover { color: #ec4899; }
      @media (max-width: 768px) {
        .banner-title { font-size: 2rem; }
        .nav { display: none; }
        .cart-sidebar { width: 100%; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// Componentes
const Header = () => {
  const { cartItemsCount, toggleCart } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>PS</div>
          <div>
            <h1 style={styles.logoText}>Pele Sensual</h1>
            <p style={styles.logoSubtext}>Conforto, leveza e qualidade</p>
          </div>
        </div>

        <nav style={styles.nav}>
          <a href="#home" style={styles.navLink} className="nav-link">Início</a>
          <a href="#produtos" style={styles.navLink} className="nav-link">Produtos</a>
          <a href="#sobre" style={styles.navLink} className="nav-link">Sobre</a>
          <a href="#contato" style={styles.navLink} className="nav-link">Contato</a>
          
          <button onClick={toggleCart} style={styles.cartButton}>
            🛒
            {cartItemsCount > 0 && (
              <span style={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

const Banner = () => (
  <section id="home" style={styles.banner}>
    <div style={styles.bannerContent}>
      <h2 style={styles.bannerTitle}>Conforto e Elegância em Cada Peça</h2>
      <p style={styles.bannerSubtitle}>
        Descubra nossa coleção de moda íntima feminina com tecidos de alta qualidade e designs modernos.
      </p>
      <button style={styles.bannerButton} className="banner-button">
        Ver Produtos
      </button>
    </div>
  </section>
);

const Products = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Calça Microfibra', price: 4.70, ref: 'REF: 016', emoji: '👙' },
    { id: 2, name: 'Calça Modal', price: 5.20, ref: 'REF: 012', emoji: '🩲' },
    { id: 3, name: 'Pala Cotton', price: 6.50, ref: 'REF: 013', emoji: '👙' },
    { id: 4, name: 'Tanga Lari', price: 6.00, ref: 'REF: 014', emoji: '🩲' },
    { id: 5, name: 'Fio Pala Dupla', price: 7.00, ref: 'REF: 050', emoji: '👙' },
    { id: 6, name: 'Box Feminina', price: 7.00, ref: 'REF: 026', emoji: '🎁' }
  ];

  return (
    <section id="produtos" style={styles.productsSection}>
      <h2 style={styles.sectionTitle}>Moda Íntima Adulto</h2>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard} className="product-card">
            <div style={styles.productImage}>{product.emoji}</div>
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productRef}>{product.ref}</p>
            <p style={styles.productPrice}>R$ {product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              style={styles.productButton}
              className="product-button"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => (
  <section id="sobre" style={styles.aboutSection}>
    <div style={styles.aboutContent}>
      <h2 style={styles.sectionTitle}>Sobre a Pele Sensual</h2>
      <p style={styles.aboutText}>
        A Pele Sensual é uma marca de moda íntima que prioriza o conforto, a leveza e a qualidade em todas as suas peças. 
        Trabalhamos com tecidos de alta qualidade como Microfibra, Modal e Cotton, oferecendo uma variedade de modelos 
        para atender a todos os gostos e necessidades.
      </p>
      <p style={styles.aboutText}>
        Somos uma fábrica que atua no mercado há mais de 10 anos, com experiência e compromisso com a satisfação de nossos clientes.
      </p>
    </div>
  </section>
);

const Contact = () => (
  <section id="contato" style={styles.contactSection}>
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Entre em Contato</h2>
      <div style={styles.contactGrid}>
        <div style={styles.contactCard} className="contact-card">
          <div style={styles.contactIcon}>📞</div>
          <h3 style={styles.contactTitle}>Telefone</h3>
          <a href="tel:+5585999436548" style={styles.contactLink}>(85) 99943-6548</a>
        </div>
        
        <div style={styles.contactCard} className="contact-card">
          <div style={styles.contactIcon}>📧</div>
          <h3 style={styles.contactTitle}>Email</h3>
          <a href="mailto:pelesensualmodaintima@gmail.com" style={styles.contactLink}>
            pelesensualmodaintima@gmail.com
          </a>
        </div>
        
        <div style={styles.contactCard} className="contact-card">
          <div style={styles.contactIcon}>💬</div>
          <h3 style={styles.contactTitle}>WhatsApp</h3>
          <a href="https://wa.me/5585999436548" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>
            Conversar Agora
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.footerContent}>
      <h3 style={styles.footerTitle}>Pele Sensual</h3>
      <p style={styles.footerText}>Moda íntima com conforto, leveza e qualidade.</p>
      <p style={styles.footerCopyright}>© 2025 Pele Sensual Moda Íntima. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const Cart = () => {
  const { isCartOpen, cartItems, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div style={styles.cartOverlay}>
      <div style={styles.cartSidebar}>
        <div style={styles.cartHeader}>
          <h3>Seu Carrinho</h3>
          <button onClick={closeCart} style={styles.cartCloseButton}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.cartEmpty}>
            <p>Seu carrinho está vazio</p>
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <h4 style={styles.cartItemName}>{item.name}</h4>
                <p style={styles.cartItemPrice}>R$ {item.price.toFixed(2)}</p>
              </div>
            ))}
            
            <a
              href="https://wa.me/5585999436548"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.cartFinishButton}
            >
              Finalizar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5585999436548"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.whatsappButton}
    className="whatsapp-button"
  >
    💬
  </a>
);

// Componente principal
function App() {
  return (
    <CartProvider>
      <GlobalStyle />
      <div>
        <Header />
        <Banner />
        <Products />
        <About />
        <Contact />
        <Footer />
        <Cart />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default App;
