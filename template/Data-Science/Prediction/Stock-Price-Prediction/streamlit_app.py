import streamlit as st
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor

# Download stock data
def get_stock_data(ticker):
    stock_data = yf.download(ticker, period='5y', interval='1d')
    stock_data = stock_data[['Close']]  # Using 'Close' price for prediction
    return stock_data

# Prepare data
def prepare_data(stock_data):
    stock_data['Target'] = stock_data['Close'].shift(-1)  # Predict next day
    stock_data.dropna(inplace=True)
    X = stock_data[['Close']]
    y = stock_data['Target']
    return train_test_split(X, y, test_size=0.2, shuffle=False)

# Scale features
def scale_data(X_train, X_test):
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    return X_train_scaled, X_test_scaled, scaler

# Train models
def train_models(X_train, y_train):
    models = {
        "Linear Regression": LinearRegression(),
        "SVR": SVR(kernel='rbf', C=100, gamma=0.1),
        "Random Forest": RandomForestRegressor(n_estimators=100),
        "Decision Tree": DecisionTreeRegressor(),
        "Gradient Boosting": GradientBoostingRegressor(),
        "KNN": KNeighborsRegressor(n_neighbors=5)
    }
    
    trained_models = {}
    for name, model in models.items():
        model.fit(X_train, y_train)
        trained_models[name] = model
    
    return trained_models

# Predict next day's price
def predict_next_day(models, scaler, latest_data):
    next_day_predictions = {}
    latest_data_scaled = scaler.transform(latest_data.values.reshape(-1, 1))
    
    for name, model in models.items():
        next_day_price = model.predict(latest_data_scaled)
        next_day_predictions[name] = next_day_price[0]
    
    return next_day_predictions

# Streamlit app
st.title('Stock Price Prediction')

# User input for stock ticker
ticker = st.text_input("Enter Stock Ticker Symbol (e.g., AAPL, TSLA):")

if ticker:
    # Fetch data
    stock_data = get_stock_data(ticker)
    
    # Show the stock chart
    st.subheader(f"Closing Price of {ticker.upper()} for the Last 6 Years")
    st.line_chart(stock_data['Close'])
    
    # Display today's price
    today_price = stock_data['Close'].iloc[-1]
    st.write(f"Today's Closing Price: ${today_price:.2f}")
    
    # Prepare data for model training
    X_train, X_test, y_train, y_test = prepare_data(stock_data)
    X_train_scaled, X_test_scaled, scaler = scale_data(X_train, X_test)
    
    # Train models
    models = train_models(X_train_scaled, y_train)
    
    # Prediction button
    if st.button('Predict Next Day Price'):
        latest_data = stock_data[['Close']].iloc[-1]
        next_day_predictions = predict_next_day(models, scaler, latest_data)
        
        st.subheader("Predicted Next Day Prices:")
        for model_name, price in next_day_predictions.items():
            st.write(f"{model_name}: ${price:.2f}")
