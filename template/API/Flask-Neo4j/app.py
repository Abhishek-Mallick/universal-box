import os
from flask import Flask


def create_app(config_name=None):
    """
    Flask application factory. Loads config based on environment.
    """
    app = Flask(__name__)

    # Determine config
    config_name = config_name or os.getenv('FLASK_ENV', 'development')
    app.config.from_object(f'config.{config_name.capitalize()}Config')

    # Register blueprints here
    from api.health import health_bp
    app.register_blueprint(health_bp)
    # Add more blueprints as needed

    return app 