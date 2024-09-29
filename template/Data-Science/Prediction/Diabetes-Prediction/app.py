import streamlit as st
import pickle
import pandas as pd

st.set_page_config(
    page_title = "Diabetes Prediction App",
)

file = open('model_objects.pkl', 'rb')
model_objects = pickle.load(file)

preprocessor = model_objects['preprocessor']
models = model_objects['models']

def main():
    st.markdown("## :blue[Diabetes Prediction App]")
    st.markdown("---")
    st.markdown('### User Input Features')
    
    pregnancies = st.number_input('**Pregnancies**', min_value = 0,value = 0)
    glucose = st.number_input('**Glucose**', min_value = 0,value = 0)
    blood_pressure = st.number_input('**Blood Pressure**', min_value = 0,value = 0)
    skin_thickness = st.number_input('**Skin Thickness**', min_value = 0,value = 0)
    insulin = st.number_input('**Insulin**', min_value = 0,value = 0)
    bmi = st.number_input('**BMI**', min_value = 0,value = 0)
    diabetes_pedigree_function = st.number_input('**Diabetes Pedigree Function**', min_value = 0.0,value = 0.0)
    age = st.number_input('**Age**', min_value = 0,value = 0)
    

    if st.button('Predict'):

        features = pd.DataFrame([[
            pregnancies, glucose, blood_pressure, skin_thickness,
            insulin, bmi, diabetes_pedigree_function, age
        ]], columns=[
            'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
            'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
        ])

        features_preprocessed = preprocessor.transform(features)
        
        predictions = {model_name: model.predict(features_preprocessed)[0] for model_name, model in models.items()}
        result = {model_name: 'Diabetic' if prediction == 1 else 'Not Diabetic' for model_name, prediction in predictions.items()}
        

        st.subheader('Prediction Results:')
        for model_name, prediction in result.items():
            if prediction == 'Diabetic':
                st.error(f"**{model_name}** : **{prediction}**")
            else:
                st.success(f"**{model_name}** : **{prediction}**")

if __name__ == '__main__':
    main()