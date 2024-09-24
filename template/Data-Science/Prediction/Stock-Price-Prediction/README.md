# 📈 Stock Price Prediction App

This is a **Streamlit** web application that predicts the **next day's closing price** of a stock using historical data from **Yahoo Finance**. The app allows users to input a stock ticker symbol (e.g., `AAPL`, `TSLA`), visualize the closing price history for the last 5 years, and predict the stock price for the next day using multiple machine learning models.

## 🛠 Features

- **Real-time Stock Data**: Fetches the last 5 years of stock data using the `yfinance` library.
- **Historical Data Visualization**: Plots the closing price over the last 5 years.
- **Next-Day Price Prediction**: Uses a variety of machine learning models to predict the next day's closing price:
  - Linear Regression
  - Support Vector Regression (SVR)
  - Random Forest
  - Decision Tree
  - Gradient Boosting
  - K-Nearest Neighbors (KNN)
- **Streamlit Interface**: Easy-to-use interactive interface for inputting stock tickers, viewing charts, and generating predictions.

## 🚀 Getting Started

### Prerequisites

To run this project locally, you'll need:

- **Python 3.7+**
- **pip** (Python package manager)

### Installation

1. Create virtual envn:
    ```bash
    python -m venv venv
    ./venv/Scripts/activate
    ```

2. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

### Run the App

To run the Streamlit app, use the following command:

```bash
streamlit run streamlit_app.py
```

This will launch the app in your web browser.

### Directory Structure

```
 | Stock-Price-Prediction
 |-| Model 
 |-stock_predictor_app.py  # Main Streamlit app script
 |-requirements.txt        # Required Python packages
 |-README.md               # Project documentation (this file)
```

## 🔧 How It Works

1. **User Input**: The app prompts the user to enter a stock ticker symbol (e.g., `AAPL`, `GOOGL`).
2. **Data Fetching**: Stock price data for the last 5 years is fetched using the `yfinance` library.
3. **Data Visualization**: The closing price of the stock is plotted using Streamlit’s `line_chart` for easy visualization.
4. **Model Training**: Multiple machine learning models are trained on the past closing price data.
5. **Next-Day Prediction**: Once the user clicks the `Predict Next Day Price` button, the app predicts the next day’s closing price using each model.
6. **Result Display**: The predicted prices from each model are displayed in the app.

## 📊 Models Used

- **Linear Regression**: A basic regression model for predicting numerical values.
- **SVR (Support Vector Regression)**: A kernel-based method used for regression tasks.
- **Random Forest Regressor**: An ensemble model that creates multiple decision trees and combines their output.
- **Decision Tree Regressor**: A model that splits the data into subsets based on feature values.
- **Gradient Boosting Regressor**: An ensemble model that builds models sequentially to reduce errors.
- **KNN (K-Nearest Neighbors)**: A simple algorithm that predicts values based on the k nearest neighbors in the data.


## 🧪 Example

### Input:
```plaintext
Stock Ticker: AAPL
```

### Output:
```plaintext
Today's Closing Price: $143.76

Predicted Next Day Prices:
- Linear Regression: $144.10
- SVR: $143.65
- Random Forest: $144.33
- Decision Tree: $144.29
- Gradient Boosting: $144.22
- KNN: $143.98
```

## 🔍 Dependencies

All required dependencies are listed in the `requirements.txt` file. You can install them using:

```bash
pip install -r requirements.txt
```

Key dependencies:
- `streamlit`
- `yfinance`
- `scikit-learn`
- `matplotlib`
- `pandas`

