import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

// Hook personalizado para usar o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pricingMode, setPricingMode] = useState('retail'); // retail ou wholesale

  // Carregar carrinho do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pelesensual-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pelesensual-cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize, quantity = 1) => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      // Item já existe, aumentar quantidade
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Novo item
      const price = pricingMode === 'wholesale' ? product.wholesalePrice : product.retailPrice;
      const newItem = {
        id: product.id,
        name: product.name,
        price: price,
        image: product.image,
        size: selectedSize,
        quantity: quantity,
        pricingMode: pricingMode
      };
      setCartItems(prev => [...prev, newItem]);
    }

    // Abrir carrinho automaticamente
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => 
      prev.filter(item => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cartItems,
    isCartOpen,
    pricingMode,
    setPricingMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    toggleCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
