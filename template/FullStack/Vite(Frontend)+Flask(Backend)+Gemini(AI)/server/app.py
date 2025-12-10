from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from routes import auth_routes, ai_routes 
from dotenv import load_dotenv
import gunicorn
import os
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Connect to MongoDB
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client['your_database_name']
logger.info("✅ MongoDB connected successfully")

app.register_blueprint(auth_routes)
app.register_blueprint(ai_routes)  

@app.route('/')
def welcome():
    return "Welcome to the server!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)