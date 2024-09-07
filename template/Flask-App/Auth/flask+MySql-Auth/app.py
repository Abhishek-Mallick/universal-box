from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = 'MYSECRETKEY'

# MySQL configuration from environment variables
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

def create_tables():
    cur = mysql.connection.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(80) UNIQUE NOT NULL,
            password VARCHAR(120) NOT NULL
        )
    ''')
    mysql.connection.commit()
    cur.close()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE username = %s', [username])
        user_exists = cur.fetchone()
        
        if user_exists:
            flash('Username already exists. Please choose a different one.', 'error')
            cur.close()
            return redirect(url_for('register'))
        
        hashed_password = generate_password_hash(password)
        cur.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, hashed_password))
        mysql.connection.commit()
        cur.close()
        
        flash('Registration successful. Please log in.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM users WHERE username = %s', [username])
        user = cur.fetchone()
        
        if user and check_password_hash(user[2], password):  # user[2] is the password field
            session['user_id'] = user[0]  # user[0] is the id field
            cur.close()
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password. Please try again.', 'error')
            cur.close()
            return redirect(url_for('login'))
    
    return render_template('login.html')

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user_id' in session:
        cur = mysql.connection.cursor()
        cur.execute('SELECT username FROM users WHERE id = %s', [session['user_id']])
        user = cur.fetchone()
        cur.close()
        
        if user:
            username = user[0]
            return render_template('dashboard.html', username=username)
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
