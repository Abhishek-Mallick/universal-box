from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from routes import auth_routes 
from dotenv import load_dotenv
import gunicorn
import os

load_dotenv()

app = Flask(__name__)

CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['your_database_name']  
app.register_blueprint(auth_routes)  

@app.route('/')
def welcome():
    return "Welcome to the server!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)