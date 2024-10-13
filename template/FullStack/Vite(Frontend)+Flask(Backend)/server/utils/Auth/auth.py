from flask import request, jsonify
import requests
from models import User  
from werkzeug.security import generate_password_hash, check_password_hash 
from bson import ObjectId 
from dotenv import load_dotenv
import os

load_dotenv()

GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')
GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')

def github_callback():
    data = request.get_json()
    code = data.get('code')

    # Exchange code for an access token
    token_url = 'https://github.com/login/oauth/access_token'
    payload = {
        'client_id': GITHUB_CLIENT_ID,
        'client_secret': GITHUB_CLIENT_SECRET,
        'code': code
    }
    headers = {'Accept': 'application/json'}
    response = requests.post(token_url, json=payload, headers=headers)
    token_data = response.json()

    access_token = token_data.get('access_token')
    if access_token:
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Failed to obtain access token'}), 400

def signup_handler():
    data = request.json

    required_fields = ['firstname', 'lastname', 'username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    hashed_password = generate_password_hash(data['password']) 

    user_data = {
        "firstname": data['firstname'],
        "lastname": data['lastname'],
        "username": data['username'],
        "email": data['email'],
        "password": hashed_password
    }
    
    if User.find_by_username(data['username']):
        return jsonify({"message": "Username already exists"}), 400

    user = User.create_user(user_data)

    user['_id'] = str(user['_id']) 

    return jsonify({"message": "User created", "user": user}), 201

def signin_handler():
    data = request.json

    if 'username' not in data or 'password' not in data:
        return jsonify({"message": "Username and password are required"}), 400

    user = User.find_by_username(data['username'])
    if user and check_password_hash(user['password'], data['password']):
        user['_id'] = str(user['_id']) 
        return jsonify({"message": "Signin successful", "user": user}), 200

    return jsonify({"message": "Invalid credentials"}), 401
