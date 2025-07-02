import React, { useState } from 'react';
import { api } from '../services/api';

function Checkout({ carrinho, cliente }) {
    const [carregando, setCarregando] = useState(false);
    const [pixData, setPixData] = useState(null);
    
    const finalizarCompra = async () => {
        setCarregando(true);
        
        try {
            const dadosPedido = {
                clienteId: cliente.id,
                cliente: {
                    nome: cliente.nome,
                    email: cliente.email,
                    cpf: cliente.cpf,
                    ddd: cliente.ddd,
                    telefone: cliente.telefone
                },
                itens: carrinho.itens,
                valorTotal: carrinho.total
            };
            
            const resultado = await api.finalizarCompra(dadosPedido);
            
            if (resultado.success) {
                // Redirecionar para página de pagamento do PagBank
                window.location.href = resultado.link_pagamento;
            } else {
                alert('Erro ao processar pagamento');
            }
            
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao processar pagamento');
        } finally {
            setCarregando(false);
        }
    };
    
    const criarPIX = async () => {
        setCarregando(true);
        
        try {
            const dadosPedido = {
                clienteId: cliente.id,
                cliente: {
                    nome: cliente.nome,
                    email: cliente.email,
                    cpf: cliente.cpf
                },
                itens: carrinho.itens,
                valorTotal: carrinho.total
            };
            
            const resultado = await api.criarPIX(dadosPedido);
            
            if (resultado.success) {
                setPixData({
                    qrCode: resultado.qr_code,
                    qrCodeImage: resultado.qr_code_image
                });
            }
            
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao gerar PIX');
        } finally {
            setCarregando(false);
        }
    };
    
    return (
        <div className="checkout">
            <h2>Finalizar Compra</h2>
            
            {/* Resumo do pedido */}
            <div className="resumo">
                <h3>Resumo do Pedido</h3>
                {carrinho.itens.map(item => (
                    <div key={item.id}>
                        {item.nome} - {item.quantidade}x - R$ {item.preco}
                    </div>
                ))}
                <div><strong>Total: R$ {carrinho.total}</strong></div>
            </div>
            
            {/* Botões de pagamento */}
            <div className="pagamento">
                <button 
                    onClick={finalizarCompra} 
                    disabled={carregando}
                    className="btn-checkout"
                >
                    {carregando ? 'Processando...' : 'Pagar com Cartão/PIX'}
                </button>
                
                <button 
                    onClick={criarPIX} 
                    disabled={carregando}
                    className="btn-pix"
                >
                    {carregando ? 'Gerando PIX...' : 'Gerar PIX'}
                </button>
            </div>
            
            {/* Mostrar QR Code PIX */}
            {pixData && (
                <div className="pix-container">
                    <h3>PIX Gerado</h3>
                    <img src={pixData.qrCodeImage} alt="QR Code PIX" />
                    <p>Código PIX:</p>
                    <input 
                        type="text" 
                        value={pixData.qrCode} 
                        readOnly 
                        onClick={(e) => e.target.select()}
                    />
                </div>
            )}
        </div>
    );
}

export default Checkout;