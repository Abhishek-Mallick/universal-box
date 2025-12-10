from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler
from utils.AI.ai import chat_handler, chat_stream_handler

auth_routes = Blueprint('auth', __name__)
ai_routes = Blueprint('ai', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()

@ai_routes.route('/chat', methods=['POST'])
def chat():
    return chat_handler()

@ai_routes.route('/chat/stream', methods=['POST'])
def chat_stream():
    return chat_stream_handler()
