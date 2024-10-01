## Introduction
The **Flask + MySQL Authentication System** is a simple yet effective authentication solution built using Flask and MySQL. This template is designed to facilitate user registration, login, and session management, making it suitable for small projects or as a foundation for more complex systems.

## Features
- **User Registration**: Allows new users to register with a unique username and password.
- **User Login**: Authenticates users with their username and password.
- **Dashboard**: Displays a personalized dashboard after successful login.
- **Session Management**: Utilizes Flask sessions to manage user login states.
- **User Logout**: Allows users to log out and clear their session.

## Technologies Used
- **Flask**: A lightweight WSGI web application framework in Python.
- **Flask-MySQLdb**: A Flask extension that simplifies using MySQL with Flask applications.
- **MySQL**: A popular relational database management system.

## Installation Steps
To set up the Flask + MySQL Authentication System with Universal-Box, follow these steps:

1. **Create a virtual environment and activate it**:
   ```bash
   python3 -m venv venv
   ./venv/Scripts/activate  # Use `venv\Scripts\activate` on Windows
   ```

2. **Install the required dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Ensure MySQL is running**:
- For **Mac/Linux**:
    ```bash
    sudo systemctl start mysql
    # Check MySQL Status
    sudo systemctl status mysql
    ```

- For **Windows**:
    - Open the **MySQL Workbench** or **XAMPP Control Panel**.
    - Start the MySQL server by clicking on the "Start" button next to MySQL in XAMPP or connecting through Workbench.

    4. **Set up the MySQL database**:
   - Create a new MySQL database.
   - Update the `app.config['MYSQL_DB']` with your database name in `app.py`.
   - Update the MySQL connection parameters (username, password, host) in the configuration.

5. **Run the application**:
   Start the Flask server with:
   ```bash
   python app.py
   ```

6. **Access the application**:
   Open your browser and navigate to `http://127.0.0.1:5000`.

## Screenshots
![Account-Creation](https://github.com/user-attachments/assets/845c4c90-26c3-446f-9644-7e8001c52864)
![After-Login](https://github.com/user-attachments/assets/9b0e46b2-8938-477b-8520-03ef015afbd7)

## Routes and Functionalities

### User Registration
- **`/register` [GET, POST]**:
  - **GET**: Renders the registration page where new users can sign up.
  - **POST**: Handles form submissions for user registration. If the username is already taken, it flashes an error message; otherwise, it creates a new user and redirects to the login page with a success message.

### User Login
- **`/login` [GET, POST]**:
  - **GET**: Displays the login page where users can log in with their credentials.
  - **POST**: Handles login form submissions. If credentials are correct, it logs the user in by storing their user ID in the session and redirects to the dashboard; if incorrect, it flashes an error message.

### Dashboard Access
- **`/dashboard` [GET]**:
  - Displays the dashboard page if the user is logged in; otherwise redirects to the login page.

### User Logout
- **`/logout` [GET]**:
  - Logs the user out by clearing their session and redirects them to the homepage.

### Homepage
- **`/` [GET]**:
  - Renders the main homepage of the application.

  ## Flash Messages
  The application uses flash messages to communicate various events to users:
  
  - **Registration Success**: "Registration successful. Please log in."
  - **Registration Error**: "Username already exists. Please choose a different one."
  - **Login Error**: "Invalid username or password. Please try again."
  
  ![Account-Creation](https://github.com/user-attachments/assets/845c4c90-26c3-446f-9644-7e8001c52864)
  ![After-Login](https://github.com/user-attachments/assets/9b0e46b2-8938-477b-8520-03ef015afbd7)
  
  ## Database Structure
  The application uses MySQL for storing user information within a `users` table that includes:
  
  | Field       | Type      | Description                          |
  |-------------|-----------|--------------------------------------|
  | id          | Integer   | Primary key, auto-increment          |
  | username    | String    | Unique username for each user        |
  | password    | String    | Hashed password for security          |
  
  ---
  
  This template was developed using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box).