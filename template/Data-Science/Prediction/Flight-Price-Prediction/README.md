# Flight Price Prediction App

## Overview

The Flight Price Prediction App is a web application built using Streamlit that predicts flight prices based on various input parameters. The app leverages a pre-trained machine learning model to provide accurate price predictions. Users can input details such as airline, source city, destination city, class, stops, departure time, arrival time, flight, duration, and days left for departure to get an estimated flight price.

## 🚀Features

- **User-Friendly Interface**: Simple and intuitive interface for inputting flight details.
- **Real-Time Predictions**: Provides instant flight price predictions based on user inputs.
- **Data-Driven Insights**: Utilizes a pre-trained machine learning model for accurate predictions.

## Installation

### Prerequisites

- Python 3.6 or higher
- Streamlit
- Pandas
- NumPy
- Scikit-learn
- Joblib

### 🛠 Setup

1. **Create a Virtual Environment**

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install Dependencies**

   ```sh
   pip install -r requirements.txt
   ```

3. **Ensure Dataset and Model are Available**

   - Train the model and place it `flight_price_model.pkl` in the  `Model` directory.

## Usage

1. **Run the Streamlit App**

   ```sh
   streamlit run streamlit_app.py
   ```

2. **Open the App in Your Browser**

   - The app will automatically open in your default web browser. If not, navigate to `http://localhost:8501` in your browser.

3. **Input Flight Details**

   - Use the provided input fields to enter details such as airline, source city, destination city, class, stops, departure time, arrival time, flight, duration, and days left for departure.

4. **Get Price Prediction**

   - Click the "Predict Price" button to get the estimated flight price.

## Project Structure

```
flight-price-prediction
│
├── Dataset
│   └── Dataset.csv
│
├── Model
│   └── flight_price_model.pkl
│
├── venv
│   └── ... (virtual environment files)
│
├── streamlit_app.py
├── requirements.txt
└── README.md
```

## 📒 Google Colab Notebook

For a more interactive experience, you can also run the Diabetes Prediction models in a Google Colab notebook. [NOTEBOOK LINK](https://colab.research.google.com/drive/1r8UkLwYhL1BEahhPXlx9abhFk3vdgdZT?usp=sharing)

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)