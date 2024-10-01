
# Flask + SQLite Authentication System

This is a simple authentication system built using Flask and SQLite. It includes user registration, login, and session management functionalities. The application is designed to be straightforward and easy to set up, making it suitable for small projects or as a foundation for more complex systems.

## Features

- **User Registration**: Allows new users to register with a unique username and password.
- **User Login**: Authenticates users with their username and password.
- **Dashboard**: Displays a personalized dashboard after successful login.
- **Session Management**: Utilizes Flask sessions to manage user login states.
- **User Logout**: Allows users to log out and clear their session.

## Technologies Used

- **Flask**: A lightweight WSGI web application framework in Python.
- **Flask-SQLAlchemy**: Adds SQLAlchemy support to Flask applications for interacting with the SQLite database.
- **SQLite**: A lightweight, disk-based database that doesn’t require a separate server process.

## Installation

1. **Create a virtual environment and activate it**:

   ```bash
   python3 -m venv venv
   ./venv/Scripts/activate
   ```

2. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:

   ```bash
   python app.py
   ```

4. **Access the application**:

   Visit `http://127.0.0.1:5000/` in your web browser.

## Routes and Functionalities

- **`/register` [GET, POST]**:
  - **GET**: Renders the registration page where new users can sign up.
  - **POST**: Handles the form submission for user registration. If the username is already taken, it flashes an error message. Otherwise, it creates a new user and redirects to the login page with a success message.

- **`/login` [GET, POST]**:
  - **GET**: Renders the login page where users can log in with their credentials.
  - **POST**: Handles the login form submission. If the credentials are correct, it logs the user in by storing their user ID in the session and redirects to the dashboard. If the credentials are incorrect, it flashes an error message.

- **`/dashboard` [GET]**:
  - Displays the dashboard page if the user is logged in. If not, it redirects to the login page.

- **`/logout` [GET]**:
  - Logs the user out by clearing their session and redirects them to the home page.

- **`/` [GET]**:
  - Renders the homepage of the application.

## Flash Messages

The application uses flash messages to communicate the following events to the user:

- **Registration**:
  - **Success**: "Registration successful. Please log in."
  - **Error**: "Username already exists. Please choose a different one."
  
- **Login**:
  - **Error**: "Invalid username or password. Please try again."

These messages are displayed on the frontend in the registration and login pages.

## Database

The application uses SQLite for storing user information. The database file is named `database.db` and is automatically created when the application is first run. The `User` model contains the following fields:

- **id**: Integer, primary key.
- **username**: String, unique, cannot be null.
- **password**: String, cannot be null.


---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)