import streamlit as st
import requests
import pandas as pd
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRegressor
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')

# OpenWeather API details
API_KEY = OPENWEATHER_API_KEY 
BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apikey}&units=metric'

# Function to fetch current weather and forecast data
def fetch_weather_data(city):
    url = BASE_URL.format(city=city, apikey=API_KEY)
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        # Extract weather data for current day
        today_weather = {
            'temp': data['list'][0]['main']['temp'],
            'humidity': data['list'][0]['main']['humidity'],
            'pressure': data['list'][0]['main']['pressure'],
            'wind_speed': data['list'][0]['wind']['speed'],
            'weather_condition': data['list'][0]['weather'][0]['main']
        }

        # Extract forecast data for prediction
        weather_data = []
        for entry in data['list']:
            weather = {
                'temp': entry['main']['temp'],
                'humidity': entry['main']['humidity'],
                'pressure': entry['main']['pressure'],
                'wind_speed': entry['wind']['speed'],
                'weather_condition': entry['weather'][0]['main'],  # Categorical
            }
            weather_data.append(weather)

        # Convert to DataFrame
        df = pd.DataFrame(weather_data)
        df['weather_condition'] = pd.Categorical(df['weather_condition']).codes

        return today_weather, df
    else:
        return None, None

# Function to predict the next day's temperature using XGBoost
def predict_next_day_weather(df):
    # Define features (X) and target (y)
    X = df.drop(['temp'], axis=1)
    y = df['temp']

    # Feature scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Train the XGBoost model
    model = XGBRegressor(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)

    # Use the last day's data for prediction
    last_day_data = X.iloc[-1:].values
    last_day_data_scaled = scaler.transform(last_day_data)

    # Predict tomorrow's temperature
    next_day_prediction = model.predict(last_day_data_scaled)

    return next_day_prediction[0]

# Streamlit App UI
st.title("Weather Forecast App")

# City Input
city = st.text_input("Enter the city name:", "London")

# Button to fetch and predict weather
if st.button("Get Weather Forecast"):
    today_weather, df = fetch_weather_data(city)

    if today_weather:
        # Display today's weather
        st.subheader(f"Today's Weather in {city}:")
        st.write(f"Temperature: {today_weather['temp']}°C")
        st.write(f"Humidity: {today_weather['humidity']}%")
        st.write(f"Pressure: {today_weather['pressure']} hPa")
        st.write(f"Wind Speed: {today_weather['wind_speed']} m/s")
        st.write(f"Weather Condition: {today_weather['weather_condition']}")

        # Predict tomorrow's weather
        predicted_temp = predict_next_day_weather(df)
        st.subheader(f"Predicted Temperature for Tomorrow in {city}:")
        st.write(f"{predicted_temp:.2f}°C")
    else:
        st.error("Could not retrieve weather data. Please try again with a valid city name.")
