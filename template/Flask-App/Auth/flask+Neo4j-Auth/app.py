from flask import Flask, render_template, request, redirect, url_for, session, flash
from neo4j import GraphDatabase
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = 'MYSECRETKEY'

# Neo4j configuration from environment variables
neo4j_uri = os.getenv('NEO4J_URI')
neo4j_user = os.getenv('NEO4J_USER')
neo4j_password = os.getenv('NEO4J_PASSWORD')

# Initialize Neo4j driver
driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))

def create_tables():
    with driver.session() as session:
        session.run('''
            CREATE CONSTRAINT ON (u:User) ASSERT u.username IS UNIQUE
        ''')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        with driver.session() as session:
            result = session.run('MATCH (u:User {username: $username}) RETURN u', username=username)
            user_exists = result.single()
            
            if user_exists:
                flash('Username already exists. Please choose a different one.', 'error')
                return redirect(url_for('register'))
            
            hashed_password = generate_password_hash(password)
            session.run('CREATE (u:User {username: $username, password: $password})', 
                        username=username, password=hashed_password)
            
            flash('Registration successful. Please log in.', 'success')
            return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        with driver.session() as session:
            result = session.run('MATCH (u:User {username: $username}) RETURN u', username=username)
            user = result.single()
            
            if user and check_password_hash(user['u']['password'], password):
                session['user_id'] = username
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
        username = session['user_id']
        with driver.session() as session:
            result = session.run('MATCH (u:User {username: $username}) RETURN u', username=username)
            user = result.single()
            if user:
                username = user['u']['username']
                return render_template('dashboard.html', username=username)
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
