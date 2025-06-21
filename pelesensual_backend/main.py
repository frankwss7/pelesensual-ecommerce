import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Carrega .env localmente
load_dotenv()

# Ajusta path para importar src/
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'src')))

from models.user import db
from routes.user import user_bp
from routes.payment import payment_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "chave-segura-default")

# SQLite local
db_path = os.path.join(os.path.dirname(__file__), 'database', 'app.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

# Rotas
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(payment_bp, url_prefix='/api')

with app.app_context():
    db.init_app(app)
    db.create_all()

@app.route("/")
def root():
    return jsonify({
        "status": "online",
        "message": "API do Pele Sensual está funcionando!",
        "routes": ["/api/users", "/api/payment"]
    })

@app.route("/<path:path>")
def fallback(path):
    return jsonify({"error": "Rota não encontrada", "path": path}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)


# Rodar localmente
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)

