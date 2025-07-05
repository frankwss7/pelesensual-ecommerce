import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // CORRIGIDO: inicia fechado
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Adicionar item ao carrinho
  const addToCart = (product, selectedSize = 'M', quantity = 1) => {
    setIsLoading(true);
    
    try {
      const itemId = `${product.id}-${selectedSize}`;
      
      setCartItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === itemId);
        
        if (existingItem) {
          // Se já existe, aumenta a quantidade
          return currentItems.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Se não existe, adiciona novo item
          return [...currentItems, {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            quantity: quantity
          }];
        }
      });
      
      // Feedback visual (opcional)
      setIsCartOpen(true);
      
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remover item do carrinho
  const removeFromCart = (itemId) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== itemId)
    );
  };

  // Atualizar quantidade
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Abrir/fechar carrinho
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calcular totais
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Função para gerar mensagem do WhatsApp
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    let message = '🛍️ *Pedido - Pele Sensual*\n\n';
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Tamanho: ${item.size}\n`;
      message += `   Quantidade: ${item.quantity}\n`;
      message += `   Preço: R$ ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `💰 *Total: R$ ${cartTotal.toFixed(2)}*\n\n`;
    message += 'Gostaria de finalizar este pedido! 😊';

    return encodeURIComponent(message);
  };

  const value = {
    // Estado
    isCartOpen,
    cartItems,
    cartItemsCount,
    cartTotal,
    isLoading,

    // Ações
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    generateWhatsAppMessage
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
