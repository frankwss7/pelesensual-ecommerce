from flask import Blueprint, request, jsonify
import qrcode
import io
import base64
import uuid
from datetime import datetime, timedelta
import os

payment_bp = Blueprint('payment', __name__)

# Configurações via variáveis de ambiente
PIX_KEY = os.getenv("PIX_KEY", "pix@example.com")
PIX_MERCHANT_NAME = os.getenv("PIX_MERCHANT_NAME", "Empresa Exemplo")
PIX_MERCHANT_CITY = os.getenv("PIX_MERCHANT_CITY", "Cidade")

# Geração de QR Code e payload PIX
def generate_pix_qr_code(amount, description, transaction_id):
    pix_payload = f"00020126580014br.gov.bcb.pix0136{PIX_KEY}0208{description}5204000053039865802BR5925{PIX_MERCHANT_NAME}6009{PIX_MERCHANT_CITY}62070503***6304"

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(pix_payload)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()

    return qr_base64, pix_payload

# Endpoint de criação de pagamento PIX
@payment_bp.route('/create-pix-payment', methods=['POST'])
def create_pix_payment():
    try:
        data = request.get_json()
        amount = float(data.get('amount', 0))
        items = data.get('items', [])
        customer = data.get('customer', {})

        transaction_id = str(uuid.uuid4())
        description = f"Pedido Pele Sensual - {len(items)} itens"
        qr_code, pix_payload = generate_pix_qr_code(amount, description, transaction_id)
        expires_at = (datetime.now() + timedelta(minutes=30)).isoformat()

        payment_data = {
            "transaction_id": transaction_id,
            "amount": amount,
            "description": description,
            "pix_key": PIX_KEY,
            "qr_code": qr_code,
            "pix_payload": pix_payload,
            "expires_at": expires_at,
            "status": "pending",
            "items": items,
            "customer": customer,
            "created_at": datetime.now().isoformat()
        }

        return jsonify({'success': True, 'payment': payment_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Simulação de status de pagamento
@payment_bp.route('/check-payment-status/<transaction_id>', methods=['GET'])
def check_payment_status(transaction_id):
    try:
        return jsonify({
            "transaction_id": transaction_id,
            "status": "pending",
            "checked_at": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Simulação de pagamento com cartão
@payment_bp.route('/create-card-payment', methods=['POST'])
def create_card_payment():
    try:
        data = request.get_json()
        required_fields = ['amount', 'items', 'customer', 'card_data']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Campo {field} é obrigatório"}), 400

        transaction_id = str(uuid.uuid4())
        payment_data = {
            "transaction_id": transaction_id,
            "amount": float(data['amount']),
            "status": "processing",  # futuramente: approved/declined
            "payment_method": "credit_card",
            "items": data['items'],
            "customer": data['customer'],
            "created_at": datetime.now().isoformat()
        }

        # TODO: Substituir por chamada real à API PagBank
        return jsonify({'success': True, 'payment': payment_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Webhook do PagBank (ainda a integrar com DB)
@payment_bp.route('/webhook/pagbank', methods=['POST'])
def pagbank_webhook():
    try:
        data = request.get_json()
        # TODO: Processar e atualizar no banco de dados
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
