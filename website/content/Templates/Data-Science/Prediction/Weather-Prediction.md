## Introduction

This is a simple weather forecasting app built with **Streamlit** that allows users to:
- Enter the name of a city to get **today's weather** details.
- **Predict tomorrow's temperature** based on historical data using an **XGBoost** machine learning model.

The app fetches real-time weather data using the **OpenWeather API** and uses machine learning techniques to predict future temperatures.

## Features

- **Real-time weather data**: Fetches current weather details such as temperature, humidity, pressure, wind speed, and weather condition.
- **Temperature prediction**: Uses machine learning (XGBoost) to predict the next day's temperature based on historical weather data.
- **User-friendly interface**: Allows easy input of city names and provides clear output for current and predicted weather conditions.

## Colab Link for Model [Here](https://colab.research.google.com/drive/1v4vpe-YiZhJjMsE1W2h94BzMdPhZHhov?usp=sharing)

## Prerequisites

Before running the app, ensure you have the following:

- **Python 3.9+**
- OpenWeather API Key (You can get one by signing up at [OpenWeather](https://home.openweathermap.org/users/sign_up))

## Installation

1. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## How to Run

1. Run the Streamlit app:
    ```bash
    streamlit run streamlit_app.py
    ```

2. Open the app in your browser at `http://localhost:8501`.

## Usage

1. Enter the **city name** in the input field.
2. Click **Get Weather Forecast**.
3. The app will display:
   - Today's weather data: temperature, humidity, pressure, wind speed, and weather condition.
   - Tomorrow’s **predicted temperature** using the trained XGBoost model.

## Code Structure

- **`streamlit_app.py`**: Main Python file for the Streamlit app.
- **`requirements.txt`**: List of Python dependencies.
- **`README.md`**: Documentation for the project.

## How It Works

1. **Fetching Weather Data**: The app uses the OpenWeather API to fetch weather data for the next 5 days (including today).
2. **Training the Model**: The app extracts relevant features (humidity, pressure, wind speed, and weather condition) from the weather data and uses these to train the **XGBoost** regression model.
3. **Predicting Tomorrow's Temperature**: The last available day's weather data is used to predict the temperature for the next day.
4. **Displaying Results**: The current day's weather is displayed, and the predicted temperature for the next day is calculated and shown on the app interface.

## Example

If you input "London" and press **Get Weather Forecast**, the app will display today's weather and the predicted temperature for tomorrow:

```bash
Today's Weather in London:
- Temperature: 12°C
- Humidity: 65%
- Pressure: 1012 hPa
- Wind Speed: 3.5 m/s
- Weather Condition: Clouds

Predicted Temperature for Tomorrow: 14.32°C
```

## Technologies Used

- **Streamlit**: For creating the user interface.
- **OpenWeather API**: For fetching real-time weather data.
- **XGBoost**: A powerful machine learning algorithm for predicting tomorrow's temperature.
- **Pandas**: For data manipulation and preparation.
- **Scikit-learn**: For preprocessing and scaling data.

