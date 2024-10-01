# 🏥 Diabetes Prediction App

This is a **Streamlit** web application that predicts the likelihood of diabetes based on user input features. The app allows users to input health metrics such as glucose levels, BMI, and age to receive predictions from multiple machine learning models.

## 🛠 Features

- **User Input**: Collects user health metrics through an interactive interface.
- **Data Processing**: Utilizes a pre-trained model and preprocessing pipeline for accurate predictions.
- **Prediction Results**: Uses various machine learning models to predict diabetes outcomes:
  - Logistic Regression
  - Random Forest Classifier
  - AdaBoost Classifier
  - Gradient Boosting Classifier
  - XGBoost Classifier
- **Streamlit Interface**: Easy-to-use interface for inputting health metrics and viewing predictions.

## 🚀 Getting Started

### Prerequisites

To run this project locally, you'll need:

- **Python 3.7+**
- **pip** (Python package manager)

### Installation

1. Create a virtual environment:
    ```bash
    python -m venv env
    ./env/Scripts/activate
    ```

2. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

### Run the App

To run the Streamlit app, use the following command:

```bash
streamlit run app.py
```
---OR---

**Run the `main.py` Script**: This will first train the models and then start the Streamlit app.

```
python main.py
```
    
This will launch the app in your web browser.

### Directory Structure

```
Diabetes-Prediction/
├── .devcontainer/
│   └── devcontainer.json
├── .streamlit/
│   └── config.toml
├── .gitignore
├── app.py
├── diabetes.csv
├── main.py
├── model_objects.pkl
├── model_training_and_saving.py
└── requirements.txt
```

## 🔧 How It Works

1. **User Input**: The app prompts the user to enter health metrics such as pregnancies, glucose, blood pressure, etc.
2. **Data Preprocessing**: The input features are processed using the pre-trained preprocessing pipeline.
3. **Model Prediction**: The app utilizes several machine learning models to predict whether the user is diabetic or not.
4. **Result Display**: The predictions from each model are displayed to the user, indicating whether they are "Diabetic" or "Not Diabetic."
   
## 📊 Models Used

- **Logistic Regression**: A linear model for binary classification tasks.
- **Random Forest Classifier**: An ensemble method that uses multiple decision trees to improve accuracy.
- **AdaBoost Classifier**: An ensemble technique that combines weak classifiers to create a strong classifier.
- **Gradient Boosting Classifier**: Builds models sequentially to reduce errors by focusing on difficult cases.
- **XGBoost Classifier**: An optimized gradient boosting algorithm designed for speed and performance.

## 🧪 Example

### Input:

```
Pregnancies: 0
Glucose: 90
Blood Pressure: 60
Skin Thickness: 20
Insulin: 10
BMI: 22.0
Diabetes Pedigree Function: 0.2
Age: 30
```

### Output:

```
Prediction Results:
- Logistic Regression: Not Diabetic
- Random Forest Classifier: Not Diabetic
- AdaBoost Classifier: Not Diabetic
- Gradient Boosting Classifier: Not Diabetic
- XGBoost Classifier: Not Diabetic
```


## 📷 Screenshots

### App Interface
![App Screenshot](https://github.com/user-attachments/assets/0c51e591-b2fd-4e0e-b3f6-ef1d6a695876)


### Prediction Results
![Prediction Results](https://github.com/user-attachments/assets/ea2a0166-2995-40eb-91b7-b0c9962b47e3)


### Feature Importance Heatmap
![Heatmap](https://github.com/user-attachments/assets/69f57a65-92e2-480c-8fc0-566f7ddfb55c)


## 🔍 Dependencies

All required dependencies are listed in the `requirements.txt` file. You can install them using:

```bash
pip install -r requirements.txt
```

Key dependencies:

- `streamlit`
- `pandas`
- `numpy`
- `scikit-learn`
- `imbalanced-learn`
- `scipy`
- `xgboost`

## 📒 Google Colab Notebook

For a more interactive experience, you can also run the Diabetes Prediction models in a Google Colab notebook. [NOTEBOOK LINK](https://colab.research.google.com/drive/10Wz2Ee7FLGLG1rBuJzhvetEcVbqpqf2x?usp=sharing)

This notebook allows you to experiment with the code and datasets without setting up a local environment.

