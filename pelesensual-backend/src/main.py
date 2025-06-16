import os
import sys

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp
from src.routes.payment import payment_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Enable CORS for all routes
CORS(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(payment_bp, url_prefix='/api')

# Configuração do banco
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.create_all()

# ✅ Nova rota raiz
@app.route("/")
def root():
    return jsonify({
        "status": "online",
        "message": "API do Pele Sensual está funcionando!",
        "routes": ["/api/users", "/api/payment"]
    })

# 🚫 Fallback para rotas não encontradas
@app.route("/<path:path>")
def fallback(path):
    return jsonify({
        "error": "Rota não encontrada",
        "path": path
    }), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

