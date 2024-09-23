import streamlit as st
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder

# Load the pre-trained model
model = joblib.load('Model/flight_price_model.pkl')

# Load the dataset
df = pd.read_csv('Dataset/Dataset.csv')

# Extract unique values for the select boxes
unique_airlines = df['airline'].unique()
unique_source_cities = df['source_city'].unique()
unique_destination_cities = df['destination_city'].unique()
unique_classes = df['class'].unique()
unique_stops = df['stops'].unique()
unique_departure_times = df['departure_time'].unique()
unique_arrival_times = df['arrival_time'].unique()
unique_flights = df['flight'].unique()

# Initialize label encoders
airline_encoder = LabelEncoder().fit(df['airline'])
source_city_encoder = LabelEncoder().fit(df['source_city'])
destination_city_encoder = LabelEncoder().fit(df['destination_city'])
class_encoder = LabelEncoder().fit(df['class'])
departure_time_encoder = LabelEncoder().fit(df['departure_time'])
arrival_time_encoder = LabelEncoder().fit(df['arrival_time'])
flight_encoder = LabelEncoder().fit(df['flight'])

# Define the Streamlit app
def main():
    st.title("Flight Price Prediction App")

    # Input fields for user inputs
    airline = st.selectbox('Airline', unique_airlines)
    source_city = st.selectbox('Source City', unique_source_cities)
    destination_city = st.selectbox('Destination City', unique_destination_cities)
    flight_class = st.selectbox('Class', unique_classes)
    stops = st.selectbox('Stops', unique_stops)
    departure_time = st.selectbox('Departure Time', unique_departure_times)
    arrival_time = st.selectbox('Arrival Time', unique_arrival_times)
    flight = st.selectbox('Flight', unique_flights)
    duration = st.number_input('Duration (in hours)', min_value=0.0, max_value=24.0, step=0.1)
    days_left = st.number_input('Days Left for Departure', min_value=0, max_value=365, step=1)

    # Predict button
    if st.button('Predict Price'):
        # Preprocess inputs
        input_data = pd.DataFrame({
            'airline': [airline],
            'source_city': [source_city],
            'destination_city': [destination_city],
            'class': [flight_class],
            'stops': [stops],
            'departure_time': [departure_time],
            'arrival_time': [arrival_time],
            'flight': [flight],
            'duration': [duration],
            'days_left': [days_left]
        })

        # Encode categorical variables
        input_data['airline'] = airline_encoder.transform(input_data['airline'])
        input_data['source_city'] = source_city_encoder.transform(input_data['source_city'])
        input_data['destination_city'] = destination_city_encoder.transform(input_data['destination_city'])
        input_data['class'] = class_encoder.transform(input_data['class'])
        input_data['departure_time'] = departure_time_encoder.transform(input_data['departure_time'])
        input_data['arrival_time'] = arrival_time_encoder.transform(input_data['arrival_time'])
        input_data['flight'] = flight_encoder.transform(input_data['flight'])

        # Convert stops to numeric if necessary
        input_data['stops'] = input_data['stops'].apply(lambda x: 0 if x == 'zero' else int(x))

        # Ensure the input data has the same feature order and count as the training data
        feature_order = ['airline', 'source_city', 'destination_city', 'class', 'stops', 'departure_time', 'arrival_time', 'flight', 'duration', 'days_left']
        input_data = input_data[feature_order]

        # Predict the price
        predicted_price = model.predict(input_data)[0]

        # Display the predicted price
        st.success(f'The predicted flight price is ${predicted_price:.2f}')

if __name__ == '__main__':
    main()