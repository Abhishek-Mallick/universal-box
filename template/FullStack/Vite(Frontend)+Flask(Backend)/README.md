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
5. Ensure you have MongoDB running and set the `MONGODB_URL` and to use GithubOAuth you need Github_ClientId and Github_ClientSecret from the Github account in your `.env` file:
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
    ```
Follow this documentation to get the Github_ClientId and Github_ClientSecret: [Github OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
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
3. Replace the Github_clientId with yours in `./client/pages/signup.tsx` in order to use GithubOAuth

4. Start the development server:
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

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)