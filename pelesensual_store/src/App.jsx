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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { cartItemsCount, toggleCart, isCartOpen, cartItems, cartTotal, closeCart, addToCart } = useCart();

  // Auto-slide do banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Produtos exatos do site original + novos produtos de roupa de dormir
  const adultProducts = [
    {
      id: '016',
      name: 'Calça Microfibra',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 4.70,
      ref: 'REF: 016',
      category: 'calcinha',
      image: 'images/calca_microfibra_frente_1.png'
    },
    {
      id: '012',
      name: 'Calça Modal',
      material: 'Tecido: Modal',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 5.20,
      ref: 'REF: 012',
      category: 'calcinha',
      image: 'images/calcola_modal_frente_1.png'
    },
    {
      id: '013',
      name: 'Pala Cotton',
      material: 'Tecido: Cotton (algodão) Amaciado - Fio 40',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 6.50,
      ref: 'REF: 013',
      category: 'calcinha',
      image: 'images/pala_cotton_frente_1.png'
    },
    {
      id: '014',
      name: 'Tanga Lari',
      material: 'Tecido: Cotton',
      sizes: 'Tamanhos: M, G, GG',
      price: 6.00,
      ref: 'REF: 014',
      category: 'calcinha',
      image: 'images/tanga_lari_frente_1.png'
    },
    {
      id: '050',
      name: 'Fio Pala Dupla',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 7.00,
      ref: 'REF: 050',
      category: 'fio_dental',
      image: 'images/fio_pala_dupla_050.png'
    },
    {
      id: '023',
      name: 'Calça Plus',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: Plus Size',
      price: 8.00,
      ref: 'REF: 023',
      category: 'calcinha',
      image: 'images/calca_plus_023.png'
    },
    {
      id: '052',
      name: 'Fio Largo',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: M, G, GG',
      price: 7.50,
      ref: 'REF: 052',
      category: 'fio_dental',
      image: 'images/fio_largo_frente_1.png'
    },
    {
      id: '1020',
      name: 'Calça Lateral Dupla',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 6.50,
      ref: 'REF: 1020',
      category: 'calcinha',
      image: 'images/calca_lateral_dupla_1020.png'
    },
    {
      id: '026',
      name: 'Box Feminina',
      material: 'Tecido: Microfibra',
      sizes: 'Tamanhos: P, M, G, GG',
      price: 7.00,
      ref: 'REF: 026 * Cores Sortidas',
      category: 'calcinha',
      image: 'images/box_feminina/box_feminina_frente_1.png'
    }
  ];

  // NOVOS PRODUTOS DE ROUPA DE DORMIR
  const sleepwearProducts = [
    {
      id: 'baby_doll_rosa_1',
      name: 'Baby Doll Rosa com Renda',
      material: 'Tecido: Microfibra com Renda',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: BD001',
      category: 'sleepwear',
      image: 'images/sleepwear/baby_doll_rosa_1.jpg'
    },
    {
      id: 'baby_doll_rosa_2',
      name: 'Baby Doll Rosa com Shortinho',
      material: 'Tecido: Microfibra com Renda',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: BD002',
      category: 'sleepwear',
      image: 'images/sleepwear/baby_doll_rosa_2.jpg'
    },
    {
      id: 'baby_doll_pink_1',
      name: 'Baby Doll Pink Premium',
      material: 'Tecido: Microfibra Premium com Renda',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: BD003',
      category: 'sleepwear',
      image: 'images/sleepwear/baby_doll_pink_1.jpg'
    },
    {
      id: 'baby_doll_pink_2',
      name: 'Baby Doll Pink com Detalhes',
      material: 'Tecido: Microfibra Premium',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: BD004',
      category: 'sleepwear',
      image: 'images/sleepwear/baby_doll_pink_2.jpg'
    },
    {
      id: 'camisola_preta_1',
      name: 'Camisola Preta Elegante',
      material: 'Tecido: Microfibra com Renda',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: CM001',
      category: 'sleepwear',
      image: 'images/sleepwear/camisola_preta_1.jpg'
    },
    {
      id: 'camisola_preta_2',
      name: 'Camisola Preta Clássica',
      material: 'Tecido: Microfibra com Renda',
      sizes: 'Tamanhos: P, M, G',
      price: 70.00,
      ref: 'REF: CM002',
      category: 'sleepwear',
      image: 'images/sleepwear/camisola_preta_2.jpg'
    }
  ];

  // Combinar todos os produtos
  const allProducts = [...adultProducts, ...sleepwearProducts];

  // Filtrar produtos por categoria
  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(product => product.category === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();

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
        
        /* Category Filter */
        .category-filter { display: flex; justify-content: center; gap: 15px; margin: 30px 0; flex-wrap: wrap; }
        .category-btn { background: white; border: 2px solid #e5e7eb; color: #6b7280; padding: 10px 20px; border-radius: 25px; cursor: pointer; transition: all 0.3s; font-weight: 500; }
        .category-btn.active { background: #ec4899; border-color: #ec4899; color: white; }
        .category-btn:hover { border-color: #ec4899; color: #ec4899; }
        
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
        .products h2 { text-align: center; font-size: 2.5rem; margin-bottom: 1rem; color: #333; font-weight: 700; }
        .products .subtitle { text-align: center; font-size: 1.1rem; color: #666; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .product-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s; position: relative; }
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
        .category-badge { position: absolute; top: 10px; right: 10px; background: #ec4899; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: 500; }
        .sleepwear-badge { background: #9333ea; }
        
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
          .category-filter { gap: 10px; }
          .category-btn { padding: 8px 15px; font-size: 0.9rem; }
        }
      `}</style>
