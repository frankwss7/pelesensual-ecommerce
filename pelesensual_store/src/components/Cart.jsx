import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const {
    isCartOpen,
    cartItems,
    cartTotal,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    generateWhatsAppMessage
  } = useCart();

  const handleFinalizePurchase = () => {
    if (cartItems.length === 0) return;

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/5585999436548?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeCart();
  };

  const handleQuantityChange = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(itemId, newQuantity);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-800">
              Seu Carrinho
              {cartItems.length > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})
                </span>
              )}
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              // Empty Cart
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 6h14m-2 7v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m8-2V9a2 2 0 00-2-2H10a2 2 0 00-2 2v2m8 0h2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Seu carrinho está vazio
                </h3>
                <p className="text-gray-600 mb-6">
                  Adicione alguns produtos para começar suas compras!
                </p>
                <button
                  onClick={closeCart}
                  className="btn-primary"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              // Cart Items
              <div className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-sm leading-tight mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          Tamanho: <span className="font-medium">{item.size}</span>
                        </p>
                        <p className="text-sm font-bold text-pink-600">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200 flex-shrink-0"
                        title="Remover item"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Quantidade:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {cartItems.length > 1 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-sm text-red-500 hover:text-red-700 font-medium py-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Limpar Carrinho
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer/Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-6">
              {/* Total */}
              <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-pink-600">
                  R$ {cartTotal.toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleFinalizePurchase}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  <span>Finalizar no WhatsApp</span>
                </button>
                
                <button
                  onClick={closeCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
                >
                  Continuar Comprando
                </button>
              </div>

              {/* Info */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Você será redirecionado para o WhatsApp para finalizar o pedido
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
