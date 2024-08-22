from flask import render_template, request, redirect, url_for, session, flash, Flask
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.secret_key = 'MYSECRETKEY'
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo = PyMongo(app)

# User collection in MongoDB
users_collection = mongo.db.users

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Check if the username already exists
        user_exists = users_collection.find_one({'username': username})
        if user_exists:
            flash('Username already exists. Please choose a different one.', 'error')
            return redirect(url_for('register'))
        
        # Hash the password before storing it
        hashed_password = generate_password_hash(password)
        
        # Insert the new user into the MongoDB collection
        users_collection.insert_one({'username': username, 'password': hashed_password})
        flash('Registration successful. Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Find the user by username
        user = users_collection.find_one({'username': username})
        
        if user and check_password_hash(user['password'], password):
            session['user_id'] = str(user['_id'])
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password. Please try again.', 'error')
            return redirect(url_for('login'))
    
    return render_template('login.html')

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user_id' in session:
        user = users_collection.find_one({'_id': ObjectId(session['user_id'])})
        if user:
            username = user['username']
            return render_template('dashboard.html', username=username)
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None) 
    return redirect(url_for('index'))  

if __name__ == '__main__':
    app.run(debug=True)
