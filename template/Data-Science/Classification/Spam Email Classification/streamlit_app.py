import streamlit as st
import joblib

def load_model():
    model = joblib.load('Model/model.pkl')
    vectorizer = joblib.load('Model/spam_vectorizer.pkl')
    return model, vectorizer

def main():
    st.title("Spam Email Classification")
    st.subheader("Enter the email text to check if it is spam or not")
    email_text = st.text_area("Enter email text", "Type Here")
    model, vectorizer = load_model()
    if st.button("Classify"):
        result = model.predict(vectorizer.transform([email_text]))
        st.write(result[0])

        if result[0] == 'spam':
            st.error('This email is classified as SPAM.')
        else:
            st.success('This email is classified as NOT SPAM.')

        # Display prediction probability
        probability = model.predict_proba(vectorizer.transform([email_text]))
        st.write(f'Probability of being spam: {probability[0][1]:.2%}')

if __name__ == '__main__':
    main()