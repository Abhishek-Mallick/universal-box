# Flask + Neo4j Authentication System

This is a simple authentication system built using Flask and Neo4j. It includes user registration, login, and session management functionalities. The application is designed to be straightforward and easy to set up, making it suitable for small projects or as a foundation for more complex systems.

## Features

- **User Registration**: Allows new users to register with a unique username and password.
- **User Login**: Authenticates users with their username and password.
- **Dashboard**: Displays a personalized dashboard after successful login.
- **Session Management**: Utilizes Flask sessions to manage user login states.
- **User Logout**: Allows users to log out and clear their session.

## Technologies Used

- **Flask**: A lightweight WSGI web application framework in Python.
- **neo4j**: A graph database management system that provides efficient and flexible handling of graph data.
- **python-dotenv**: Loads environment variables from a `.env` file.

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

3. **Create a `.env` file**:

   In the root directory of your project, create a `.env` file with the following content:

   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=yourusername
   NEO4J_PASSWORD=yourpassword
   ```

4. **Run the application**:

   ```bash
   python app.py
   ```

5. **Access the application**:

   Visit `http://127.0.0.1:5000/` in your web browser.

## Routes and Functionalities

- **`/register` [GET, POST]**:
  - **GET**: Renders the registration page where new users can sign up.
  - **POST**: Handles the form submission for user registration. If the username is already taken, it flashes an error message. Otherwise, it creates a new user in Neo4j and redirects to the login page with a success message.

- **`/login` [GET, POST]**:
  - **GET**: Renders the login page where users can log in with their credentials.
  - **POST**: Handles the login form submission. If the credentials are correct, it logs the user in by storing their username in the session and redirects to the dashboard. If the credentials are incorrect, it flashes an error message.

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

The application uses Neo4j for storing user information. Neo4j is a graph database that stores data in nodes and relationships. In this application:

- **User Nodes**: Represented by `User` nodes in Neo4j.
- **Constraints**: A uniqueness constraint is created on the `username` property to ensure unique usernames.

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)