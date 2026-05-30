from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import db, jwt
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///cookshare.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "fallback-secret")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "fallback-secret")

    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from routes.auth import auth_bp
    from routes.recipes import recipes_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(recipes_bp, url_prefix="/api/recipes")

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
