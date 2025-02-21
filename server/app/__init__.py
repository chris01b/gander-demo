from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

db = SQLAlchemy()
ma = Marshmallow()


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///aviation_parts"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    CORS(app, origins=["http://localhost:5173", "http://localhost:5174"])

    # Import models and routes AFTER db initialization
    from . import models
    from .routes import client_bp, warehouse_bp

    # Register blueprints
    app.register_blueprint(client_bp.client_bp)
    app.register_blueprint(warehouse_bp.warehouse_bp)

    # Create tables
    with app.app_context():
        db.create_all()

    return app
