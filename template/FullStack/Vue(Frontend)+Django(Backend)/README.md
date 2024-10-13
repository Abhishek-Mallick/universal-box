# FullStack Template: Vue.js + Django

This repository provides a simple FullStack template for building modern web applications using **Vue.js** for the frontend and **Django** for the backend. It includes essential features such as user authentication, session management, and a user interface.

## Features

- **User Authentication**: Supports user registration and login with session management using JWT.
- **Frontend**: Built with Vue.js, offering a dynamic and responsive user interface.
- **Backend**: Powered by Django with Python, providing a robust RESTful API.
- **Session Management**: Utilizes JSON Web Tokens (JWT) to manage user authentication.

## Technologies Used

### Frontend

- **Vue.js 3**: A progressive JavaScript framework for building user interfaces, using the Composition API.
- **Vue Router**: Handles navigation and routing in the application.
- **Pinia**: State management library for Vue.js applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Vue Toastification**: For displaying toast notifications.
- **@vueuse/motion**: For improved animation experience.

### Backend

- **Django**: A high-level Python web framework that ensure clean design and pragmatic appoach.
- **Django REST Framework**: A powerful and flexible toolkit for building Web APIs.
- **Django CORS Headers**: Handles Cross-Origin Resource Sharing (CORS) for Django.
- **Django REST Framework SimpleJWT**: Provides JWT authentication for Django REST Framework.
- **SQLite3**: A lightweight relational database.
- **Python-dotenv**: Reads configuration from `.env` 

## Installation

### Prerequisites

- **Python**: Ensure you have Python installed on your system.
- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Virtualenv**: Recommended for managing Python environments.

### Steps

1. Navigate to the server directory:
   ```sh
   cd server
   ```
2. Install dependencies   
   A. Using shell scipt:
   ```sh
    sh setup.sh
   ```
   B. Alternatively for [NixOS](https://nixos.wiki/wiki/Development_environment_with_nix-shell), to enter the virtual environment run:
   ```sh
   nix-shell
   ```

2. **Environment Setup**:
   Copy `.env.example` to `.env`

3. **Database Migrations**:
   This will setup and prepare `db.sqlite3`:
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run the Backend Server**:
   ```sh
   python manage.py runserver
   ```


5. **Go to the `client` directory and install Frontend Dependencies**:
   ```sh
   cd client
   npm install
   ```

6. **Run the Frontend**:
   ```sh
   npm run dev
   ```

8. Visit `http://localhost:5173/` to see the application.

## Routes and Functionalities

### Backend Routes

- **`/api/auth/signup` [POST]**:
  - Handles user registration.
  - **Request Body**:
    - `username`: String
    - `emailid`: String
    - `password`: String

- **`/api/auth/signin` [POST]**:
  - Handles user login.
  - **Request Body**:
    - `emailid`: String
    - `password`: String

- **`/api/user/signout` [POST]**:
  - Logs the user out by invalidating the JWT token.

- **`/api/user/profile` [GET]**:
  - Retrieves the user profile information of the authenticated user.
  - **Response**:
    - **Success**: Returns user profile details such as `id`, `username`, and `emailid`.
    - **Error**: Returns an error if the user is not authenticated.

- **`/api/user/test` [GET]**:
  - Test route to verify the API is working.

### Frontend Routes

- **`/` [GET]**:
  - Renders the homepage of the application.

- **`/signin` [GET]**:
  - Renders the login page where users can log in with their credentials.

- **`/signup` [GET]**:
  - Renders the registration page where new users can sign up.

- **`/account` [GET]**:
  - Renders the account page for authenticated users.

## Flash Messages

The application uses toast notifications to communicate the following events to the user:

- **Signup**:
  - **Success**: "Signup successful! Please sign in."
  - **Error**: Displays validation errors or server errors.
  
- **Signin**:
  - **Success**: "Signin successful!"
  - **Error**: "Invalid email or password. Please try again." or other server errors.

- **Signout**:
  - **Success**: "Sign out successful!"

These messages are displayed on the frontend using Vue Toastification.

## Database

The application uses **SQLite3** for persistence. The `User` model in Django contains the following fields:

- **id**: `AutoField`, the unique identifier for each user.
- **username**: `CharField`, unique, cannot be null.
- **emailid**: `EmailField`, unique, cannot be null.
- **password**: `CharField`, hashed, cannot be null.
- **date_joined**: `DateTimeField`, automatically set when the user is created.
- **is_active**: `BooleanField`, indicates whether the user account is active.
- **is_admin**: `BooleanField`, indicates whether the user has admin privileges.
- **is_staff**: `BooleanField`, indicates whether the user can access the admin site.



---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)

---