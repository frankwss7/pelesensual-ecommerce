import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pricingMode, setPricingMode] = useState('retail'); // 'retail' ou 'wholesale'

  // Carregar dados do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pelesensual-cart');
      const savedPricingMode = localStorage.getItem('pelesensual-pricing-mode');
      
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      if (savedPricingMode) {
        setPricingMode(savedPricingMode);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pelesensual-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('pelesensual-pricing-mode', pricingMode);
    } catch (error) {
      console.error('Erro ao salvar modo de preços:', error);
    }
  }, [pricingMode]);

  const addToCart = (product, size, quantity = 1) => {
    if (!size) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        // Item já existe, atualizar quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Novo item
        const newItem = {
          id: product.id,
          name: product.name,
          retailPrice: product.retailPrice,
          wholesalePrice: product.wholesalePrice,
          image: product.image,
          material: product.material,
          size: size,
          quantity: quantity
        };
        return [...prevItems, newItem];
      }
    });

    // Abrir carrinho automaticamente
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    // Para atacado, mínimo de 10 unidades por incremento
    if (pricingMode === 'wholesale' && newQuantity % 10 !== 0) {
      newQuantity = Math.ceil(newQuantity / 10) * 10;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const canUseWholesale = () => {
    return getTotalQuantity() >= 200;
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Auto-switch para atacado quando atingir quantidade mínima
  useEffect(() => {
    if (pricingMode === 'retail' && canUseWholesale()) {
      setPricingMode('wholesale');
    }
  }, [items, pricingMode]);

  const value = {
    items,
    isCartOpen,
    pricingMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalQuantity,
    canUseWholesale,
    toggleCart,
    openCart,
    closeCart,
    setPricingMode
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
