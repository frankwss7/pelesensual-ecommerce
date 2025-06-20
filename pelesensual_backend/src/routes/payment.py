from flask import Blueprint, request, jsonify
import qrcode
import io
import base64
import uuid
from datetime import datetime, timedelta
import json

payment_bp = Blueprint('payment', __name__)

# Configurações PIX
PIX_KEY = "fxeconsultoria@gmail.com"
PIX_MERCHANT_NAME = "Pele Sensual Moda Intima"
PIX_MERCHANT_CITY = "Fortaleza"

def generate_pix_qr_code(amount, description, transaction_id):
    """
    Gera um QR Code PIX usando o formato EMV
    """
    # Payload básico do PIX (formato simplificado)
    # Em produção, seria necessário usar uma biblioteca específica para PIX
    pix_payload = f"00020126580014br.gov.bcb.pix0136{PIX_KEY}0208{description}5204000053039865802BR5925{PIX_MERCHANT_NAME}6009{PIX_MERCHANT_CITY}62070503***6304"
    
    # Gerar QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(pix_payload)
    qr.make(fit=True)
    
    # Converter para base64
    img = qr.make_image(fill_color="black", back_color="white")
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    img_str = base64.b64encode(img_buffer.getvalue()).decode()
    
    return img_str, pix_payload

@payment_bp.route('/create-pix-payment', methods=['POST'])
def create_pix_payment():
    ...
    qr_code_base64, pix_payload = generate_pix_qr_code(amount, description, transaction_id)
    ...
    return jsonify({
        'success': True,
        'payment': payment_data
    })
        
        amount = float(data['amount'])
        items = data['items']
        customer = data['customer']
        
        # Gerar ID único para a transação
        transaction_id = str(uuid.uuid4())
        
        # Criar descrição do pedido
        description = f"Pedido Pele Sensual - {len(items)} itens"
        
        # Gerar QR Code PIX
        qr_code_base64, pix_payload = generate_pix_qr_code(amount, description, transaction_id)
        
        # Calcular tempo de expiração (30 minutos)
        expires_at = datetime.now() + timedelta(minutes=30)
        
        # Dados do pagamento
        payment_data = {
            'transaction_id': transaction_id,
            'amount': amount,
            'description': description,
            'pix_key': PIX_KEY,
            'qr_code': qr_code_base64,
            'pix_payload': pix_payload,
            'expires_at': expires_at.isoformat(),
            'status': 'pending',
            'items': items,
            'customer': customer,
            'created_at': datetime.now().isoformat()
        }
        
        # Em produção, salvar no banco de dados
        # Por enquanto, retornar os dados
        
        return jsonify({
            'success': True,
            'payment': payment_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/check-payment-status/<transaction_id>', methods=['GET'])
def check_payment_status(transaction_id):
    """
    Verifica o status de um pagamento PIX
    Em produção, isso seria integrado com a API do banco
    """
    try:
        # Por enquanto, retornar status pendente
        # Em produção, consultar o banco de dados e/ou API do banco
        
        return jsonify({
            'transaction_id': transaction_id,
            'status': 'pending',  # pending, paid, expired, cancelled
            'checked_at': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/create-card-payment', methods=['POST'])
def create_card_payment():
    """
    Cria um pagamento com cartão via PagBank
    """
    try:
        data = request.get_json()
        
        # Validar dados recebidos
        required_fields = ['amount', 'items', 'customer', 'card_data']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Campo {field} é obrigatório'}), 400
        
        amount = float(data['amount'])
        items = data['items']
        customer = data['customer']
        card_data = data['card_data']
        
        # Gerar ID único para a transação
        transaction_id = str(uuid.uuid4())
        
        # TODO: Integrar com PagBank API
        # Por enquanto, simular resposta
        
        payment_data = {
            'transaction_id': transaction_id,
            'amount': amount,
            'status': 'processing',  # processing, approved, declined
            'payment_method': 'credit_card',
            'items': items,
            'customer': customer,
            'created_at': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'payment': payment_data
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@payment_bp.route('/webhook/pagbank', methods=['POST'])
def pagbank_webhook():
    """
    Webhook para receber notificações do PagBank
    """
    try:
        data = request.get_json()
        
        # Processar notificação do PagBank
        # Atualizar status do pagamento no banco de dados
        
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

