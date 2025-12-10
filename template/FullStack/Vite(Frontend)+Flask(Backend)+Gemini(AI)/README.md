# Vite + Flask + Gemini - Full Stack AI Chat Project Template

This is a full stack AI project template using Vite for the frontend and Flask for the backend and Gemini as AI. It also integrates MongoDB as the database.

## Installation Guide

### Server

1. Navigate to the server directory:
    ```sh
    cd server
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```
5. Ensure you have set the `MONGODB_URL` and `GOOGLE_API_KEY` in your `.env` file:
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
    ```
Get API from [GEMINI_API_KEY](https://aistudio.google.com/app/api-keys)

6. Start the server:
    ```sh
    flask run OR python app.py
    ```

For updating the Gemini System Instruction go to `/server/utils/AI/ai.py/Line170`

### Client

1. Navigate to the client directory:
    ```sh
    cd client
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)