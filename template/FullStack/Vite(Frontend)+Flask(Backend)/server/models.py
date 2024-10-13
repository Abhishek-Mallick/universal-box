from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['your_database_name']  

class User:
    @staticmethod
    def create_user(data):
        user_data = {
            "firstname": data['firstname'],
            "lastname": data['lastname'],
            "username": data['username'],
            "email": data['email'],
            "password": data['password'] 
        }
        db.users.insert_one(user_data)
        return user_data

    @staticmethod
    def validate_user(username, password):
        user = db.users.find_one({"username": username, "password": password})  
        return user
    
    @staticmethod
    def find_by_username(username):
        return db.users.find_one({"username": username})
