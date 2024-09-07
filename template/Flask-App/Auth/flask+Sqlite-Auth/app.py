from flask_sqlalchemy import SQLAlchemy
from flask import render_template, request, redirect, url_for, session, flash
from flask import Flask

app = Flask(__name__)
app.secret_key = 'MYSECRETKEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

def create_tables():
    with app.app_context():
        db.create_all()
        
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user_exists = User.query.filter_by(username=username).first()
        if user_exists:
            flash('Username already exists. Please choose a different one.', 'error')
            return redirect(url_for('register'))
        
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        flash('Registration successful. Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username, password=password).first()
        if user:
            session['user_id'] = user.id
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
        user = User.query.get(session['user_id'])
        if user:
            username = user.username
        return render_template('dashboard.html', username=username)
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None) 
    return redirect(url_for('index'))  

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
