# Introduction

## Overview

The Spam Email Classification App is a web application built using Streamlit that identifies spam emails based on various input parameters. The app leverages a pre-trained machine learning model to provide accurate classification. Users can input details such as email subject, sender address, email body, and other metadata to determine whether an email is likely to be spam or not. This tool helps in efficiently filtering out unwanted emails and enhancing inbox security

## Features

- **User-Friendly Interface**: Simple and intuitive interface for inputting email details.
- **Real-Time Classifications**: Provides instant spam detections based on user inputs.
- **Data-Driven Insights**: Utilizes a pre-trained machine learning model for accurate spam detections.

## Installation

### Prerequisites

- Python 3.6 or higher
- Streamlit
- Pandas
- NumPy
- Scikit-learn
- Joblib

### Setup

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

   - Train the model and place `model.pkl` & `spam_vectorizer.pkl` in the  `Model` directory.

## Usage

1. **Run the Streamlit App**

   ```sh
   streamlit run streamlit_app.py
   ```

2. **Open the App in Your Browser**

   - The app will automatically open in your default web browser. If not, navigate to `http://localhost:8501` in your browser.

3. **Input Email Text**

   - Use the provided input field to enter details such as the email subject, sender address, email body, and other relevant metadata to determine whether an email is likely to be spam. This helps ensure your inbox remains free of unwanted and potentially harmful emails.

4. **Get Spam Classification**

   - Click the "Classify" button to check whether the email is spam or not.

## Project Structure

```
spam-email-classification
│
├── Dataset
│   └── email.csv
│
├── Model
│   └── model.pkl
|   └── spam_vectorizer.pkl
│
├── venv
│   └── ... (virtual environment files)
│
├── streamlit_app.py
├── requirements.txt
└── README.md
```
## Google Colab Notebook

You can also run the Spam Email Classification model in a Google Colab notebook. [NOTEBOOK LINK](https://colab.research.google.com/drive/1FzCPRJDBeXnsiYT-wCSENx7vzKvQoysg?usp=sharing)

This notebook allows you to experiment with the code and datasets without setting up a local environment.

## Acknowledgements

- The app uses data from the `email.csv` file for classifications.
- The machine learning model was trained using scikit-learn.

## Contact

For any questions or feedback, please contact [adarshrout321@gmail.com](mailto:adarshrout321@gmail.com).

