## Introduction
The **Flask + MongoDB Authentication System** is a streamlined authentication solution crafted using Flask and MongoDB. This template is designed to facilitate user registration, login, and session management, making it an ideal starting point for developers looking to implement authentication in their applications.

## Features
- **User Registration**: Enables new users to register with unique credentials.
- **User Login**: Authenticates users via username and password.
- **Dashboard**: Provides a personalized dashboard accessible post-login.
- **Session Management**: Utilizes Flask's session handling for managing user states.
- **User Logout**: Allows users to log out, effectively clearing their session.

## Technologies Used
- **Flask**: A lightweight WSGI web application framework for Python.
- **Flask-PyMongo**: A Flask extension that simplifies MongoDB integration.
- **MongoDB**: A flexible NoSQL database known for its scalability.

## Installation Steps
To set up the Flask + MongoDB Authentication System with Universal-Box, follow these steps:

1. **Create a virtual environment and activate it**:
   ```bash
   python3 -m venv venv
   ./venv/Scripts/activate  # Use `venv\Scripts\activate` on Windows
   ```
2. **Install the required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Ensure MongoDB is running**:
   Confirm that your MongoDB server is operational locally or accessible remotely
   ```bash
   # Start Mongo Compass and connect to the local database if on Windows

   # Start MongoDB -- MacOS/Linux
   sudo systemctl start mongod
   # Check MongoDB Status
   sudo systemctl status mongod
   ```
4. **Set up the environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```bash
   MONGO_URI=mongodb://localhost:27017/test
   ```
5. **Run the Flask application**:
   Start the Flask server with:
   ```bash
   flask run
   ```
6. **Access the application**:
   Open your browser and navigate to `http://127.0.0.1:5000/` to access the login page.


## Routes and Functionalities

### User Registration
- **`/register` [GET, POST]**:
  - **GET**: Renders the registration form.
  - **POST**: Processes registration submissions, checks for existing usernames, and creates new user entries.

### User Login
- **`/login` [GET, POST]**:
  - **GET**: Displays the login form.
  - **POST**: Validates user credentials and manages session creation.

### Dashboard Access
- **`/dashboard` [GET]**:
  - Displays the user dashboard if logged in; otherwise redirects to the login page.

### User Logout
- **`/logout` [GET]**:
  - Clears the user session and redirects to the homepage.

### Homepage
- **`/` [GET]**:
  - Renders the main homepage of the application.

## Flash Messages
The application utilizes flash messages to inform users about various events:

- **Registration Success**: "Registration successful. Please log in."
- **Registration Error**: "Username already exists. Please choose a different one."
- **Login Error**: "Invalid username or password. Please try again."

## Screenshots
![Account-Creation](https://github.com/user-attachments/assets/845c4c90-26c3-446f-9644-7e8001c52864)
![After-Login](https://github.com/user-attachments/assets/9b0e46b2-8938-477b-8520-03ef015afbd7)

## Database Structure
The application employs MongoDB for user data storage, specifically within a `users` collection that includes:

| Field       | Type      | Description                          |
|-------------|-----------|--------------------------------------|
| _id         | ObjectId  | Unique identifier for each user      |
| username    | String    | Unique username for each user        |
| password    | String    | Hashed password for security          |

---

This template was developed using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box).