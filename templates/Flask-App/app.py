from flask import Flask, render_template

app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def home():
    return render_template('index.html')

# Define a route for another page
@app.route('/about')
def about():
    return 'This is the about page.'

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
