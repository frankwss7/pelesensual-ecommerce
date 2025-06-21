import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Carregar variáveis do .env (opcional no Vercel, útil localmente)
load_dotenv()

# Adicionar o diretório raiz ao path do sistema
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importações internas
from src.models.user import db
from src.routes.user import user_bp
from src.routes.payment import payment_bp

# Inicialização do app
app = Flask(__name__)

# Configurações
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "chave-segura-default")

# Banco de dados SQLite local
db_path = os.path.join(os.path.dirname(__file__), 'database', 'app.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS (habilita acesso entre domínios)
CORS(app)

# Registrar blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(payment_bp, url_prefix='/api')

# Inicializar banco
with app.app_context():
    db.init_app(app)
    db.create_all()

# Rota principal (teste da API)
@app.route("/")
def root():
    return jsonify({
        "status": "online",
        "message": "API do Pele Sensual está funcionando!",
        "routes": ["/api/users", "/api/payment"]
    })

# Rota fallback para não encontradas
@app.route("/<path:path>")
def fallback(path):
    return jsonify({
        "error": "Rota não encontrada",
        "path": path
    }), 404

# Rodar localmente
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)

