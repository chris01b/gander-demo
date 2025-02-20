from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

db = SQLAlchemy()
ma = Marshmallow()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///gander_demo"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    CORS(app)

    # Import models and routes AFTER db initialization
    from . import models  # Add this line
    from .routes import tasks  # Add this line

    # Register blueprints
    app.register_blueprint(tasks.task_bp)

    # Create tables
    with app.app_context():
        db.create_all()

    return app
