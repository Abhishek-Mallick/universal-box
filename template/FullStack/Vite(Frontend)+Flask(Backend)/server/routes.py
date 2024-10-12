from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler  # Updated import

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()
