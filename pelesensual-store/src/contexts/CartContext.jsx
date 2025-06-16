import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { wholesaleMinQuantity } from '../data/products';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && 
                item.size === action.payload.size
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && item.size === action.payload.size)
        )
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
      
    case 'SET_PRICING_MODE':
      return {
        ...state,
        pricingMode: action.payload
      };
      
    case 'LOAD_CART':
      return action.payload;
      
    default:
      return state;
  }
};

const initialState = {
  items: [],
  pricingMode: 'retail' // 'retail' ou 'wholesale'
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('pelesensual-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('pelesensual-cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, size, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        size,
        quantity,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        material: product.material
      }
    });
  };

  const removeFromCart = (id, size) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id, size }
    });
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, size, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setPricingMode = (mode) => {
    dispatch({ type: 'SET_PRICING_MODE', payload: mode });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = state.pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalQuantity = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const canUseWholesale = () => {
    return getTotalQuantity() >= wholesaleMinQuantity;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setPricingMode,
    getTotalItems,
    getTotalPrice,
    getTotalQuantity,
    canUseWholesale
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

