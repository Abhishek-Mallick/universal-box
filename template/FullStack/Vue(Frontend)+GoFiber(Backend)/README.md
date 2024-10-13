# FullStack Template: Vue.js + Go Fiber

This repository provides a simple FullStack template for building modern web applications using **Vue.js** for the frontend and **Go Fiber** framework for the backend. It includes essential features such as user authentication, session management, and a responsive user interface.

## Features

- **User Authentication**: Supports user registration and login with session management using JWT.
- **Frontend**: Built with Vue.js, offering a dynamic and responsive user interface.
- **Backend**: Powered by Go Fiber, providing a robust RESTful API.
- **Session Management**: Utilizes JSON Web Tokens (JWT) to manage user authentication.

## Technologies Used

### Frontend

- **Vue.js 3**: A progressive JavaScript framework for building user interfaces.
- **Vue Router**: Handles navigation and routing in the application.
- **Pinia**: State management library for Vue.js applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Vue Toastification**: For displaying toast notifications.
- **@vueuse/motion**: For improved animation experience.

### Backend

- **Go**: Modern language well-suited for efficient backends
- **Go Fiber**: An Express-inspired web framework written in Go.
- **GORM**: An ORM library for Go, used for database operations.
- **PostgreSQL**: Relational database for storing user data.
- **JWT (dgrijalva/jwt-go)**: Create and verify JWTs for user authentication.
- **bcrypt**: Used for hashing user passwords securely.
- **godotenv**: Loads environment variables from a `.env` file.

## Installation

### Prerequisites

Ensure that **Go**, **Node.js**, and **PostgreSQL** are installed and running on your system.

### Steps

1. **Backend Setup**:


   - **Install Dependencies**:

     ```bash
      cd server
      go mod tidy
     ```

   - **Environment Variables**:

     Create a `.env` file in the `server` directory:

     ```bash
     # server/.env
     POSTGRES_URL=postgres_connection_string
     JWT_SECRET=jwt_secret_key
     PORT=3000
     CLIENT_URL=http://localhost:5173
     ```

   - **Run the Backend Server**:

     ```bash
     go run .
     ```

3. **Frontend Setup**:


   - **Install Dependencies**:

     ```bash
      cd client
      npm install
     ```

    - **Run the Frontend**:

      ```bash
      npm run dev
      ```

5. **Access the Application** at  `http://localhost:5173/`



## Routes and Functionalities

### Backend API Endpoints

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
  - Logs the user out by clearing the JWT token.

- **`/api/user/profile` [GET]**:
  - Retrieves the user profile information of the authenticated user.
  - **Requires Authentication**.

- **`/api/user/test` [GET]**:
  - Test route to verify the API is working.

### Frontend Routes

- **`/` [GET]**:
  - Renders the homepage of the application.

- **`/signin` [GET]**:
  - Renders the login page.

- **`/signup` [GET]**:
  - Renders the registration page.

- **`/account` [GET]**:
  - Renders the account page for authenticated users.

## Flash Messages

The application uses toast notifications to communicate the following events to the user:

- **Signup**:
  - **Success**: "Signup successful! Please sign in."
  - **Error**: Display server error message.

- **Signin**:
  - **Success**: "Signin successful!"
  - **Error**: Display server error message.

- **Signout**:
  - **Success**: "Sign out successful!"
  - **Error**: Display server error message.

These messages are displayed on the frontend using Vue Toastification.

## Database

The application uses **PostgreSQL** for persistance. The `User` model contains the following fields:

- **ID**: Unique identifier for each user.
- **Username**: Unique username.
- **Email**: Unique email address.
- **Password**: Hashed password.


---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)

---