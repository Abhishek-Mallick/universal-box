# Vite + Flask Full Stack Project Template

This is a full stack project template using Vite for the frontend and Flask for the backend. It also integrates MongoDB as the database.

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
5. Ensure you have MongoDB running and set the `MONGODB_URL` in your `.env` file:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```
6. Start the server:
    ```sh
    flask run
    ```

### Client

1. Navigate to the client directory:
    ```sh
    cd client
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

## Project Structure

```
/server
    /app
    app.py
    requirements.txt
    .env
/client
    /src
        app.jsx
    package.json
    vite.config.js
README.md
```

## Usage

Feel free to use this template and make your own changes.
