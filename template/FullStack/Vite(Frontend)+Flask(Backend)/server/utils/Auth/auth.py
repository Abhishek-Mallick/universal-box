from flask import request, jsonify
from models import User  
from werkzeug.security import generate_password_hash, check_password_hash 
from bson import ObjectId 

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
