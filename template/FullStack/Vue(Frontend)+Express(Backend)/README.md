# FullStack Template: Vue.js + Express.js

This repository provides a simple FullStack template for building modern web applications using **Vue.js** for the frontend and **Express.js** for the backend. It includes essential features such as user authentication, session management, and an user interface.

## Features

- **User Authentication**: Supports user registration and login with session management using JWT.
- **Frontend**: Built with Vue.js, offering a dynamic and responsive user interface.
- **Backend**: Powered by Express.js with Node.js, providing a robust RESTful API.
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

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database known for its flexibility and scalability.
- **Mongoose**: An elegant MongoDB object modeling for Node.js.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MongoDB**: Make sure MongoDB is installed and running locally or accessible remotely.

### Steps

1. **Populate the `.env.example` File**:

   ```bash
   # server/.env
   MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
   JWT_SECRET=<YOUR_JWT_SECRET_KEY>
   PORT=3000
   ```

2. **Install the Required Dependencies**:

   ```bash
   cd client && npm install
   cd server && npm install
   ```

3. **Ensure MongoDB is Running**:
   - Make sure your MongoDB server is running locally or accessible remotely.

4. **Run the Application**:

   ```bash
    # both client and server
    npm run dev
   ```

5. **Access the Application**:

   Visit `http://localhost:5173/` in your web browser.

## Routes and Functionalities

- **`/api/auth/signup` [POST]**:
  - Handles user registration.
  - **Request Body**:
    - `username`: String
    - `emailid`: String
    - `password`: String


- **`/api/auth/signin` [POST]**:
  - **Description**: Handles user login.
  - **Request Body**:
    - `emailid`: String
    - `password`: String

- **`/api/user/signout` [POST]**:
  - Logs the user out by clearing the authentication cookie.
- **`/api/user/test` [GET]**:
  - **Description**: Test route to verify API is working.

- **`/api/user/profile` [GET]**:
  - **Description**: Retrieves the user profile information of the authenticated user.
  - **Response**:
    - **Success**: Returns user profile details such as `id`, `username`, and `emailid`.
    - **Error**: Returns an error if the user is not authenticated.



### Frontend Routes

- **`/` [GET]**:
  - **Description**: Renders the homepage of the application.

- **`/signin` [GET]**:
  -  Renders the login page where users can log in with their credentials.

- **`/signup` [GET]**:
  - Renders the registration page where new users can sign up.

## Flash Messages

The application uses flash messages to communicate the following events to the user:

- **Signup**:
  - **Success**: "Signup successful! Please sign in."
  - **Error**: "Username or Email already exists. Please choose a different one."
  
- **Signin**:
  - **Error**: "Invalid email or password. Please try again."

These messages are displayed on the frontend in the registration and login pages using toast notifications.

## Database

The application uses **MongoDB** for storing user information. The `users` collection in the MongoDB database contains the following fields for each user:

- **_id**: `ObjectId`, the unique identifier for each document (user).
- **username**: `String`, unique, cannot be null.
- **emailid**: `String`, unique, cannot be null.
- **password**: `String`, hashed, cannot be null.

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)