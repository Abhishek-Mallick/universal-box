# FullStack Template: React + Node.js

This repository provides a simple FullStack template for building modern web applications using React for the frontend and Node.js for the backend. It includes essential features such as user authentication, session management, and a responsive user interface.

## Features

- **User Authentication**: Supports user registration and login with session management.
- **Frontend**: Built with React, offering a dynamic and responsive user interface.
- **Backend**: Powered by Node.js with Express, providing a robust RESTful API.
- **API Integration**: Seamless communication between the frontend and backend through API calls.
- **Session Management**: Utilizes Express sessions to manage user states.
- **Responsive Design**: Ensures the application is accessible on various devices.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Bootstrap**: For responsive and mobile-first UI design.
- **React Router**: Handles navigation and routing in the application.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database known for its flexibility and scalability.
- **Mongoose**: An elegant MongoDB object modeling for Node.js.

## Installation
1. **Populate the .env.example file**:

   ```bash
   MONGO_URL=<MONGO_URI>
   JWT_SECRET=<any_key>
   ```

2. **Install the required dependencies**:

   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**:
   - Make sure your MongoDB server is running locally or accessible remotely.

4. **Run the application**:

   ```bash
   npm run dev
   both client and server
   ```

5. **Access the application**:

   Visit `http://localhost:5173/` in your web browser.

## Routes and Functionalities

- **`/register` [GET, POST]**:
  - **GET**: Renders the registration page where new users can sign up.
  - **POST**: Handles the form submission for user registration. If the username is already taken, it flashes an error message. Otherwise, it creates a new user and redirects to the login page with a success message.

- **`/signin` [POST]**:
  - **GET**: Renders the login page where users can log in with their credentials.
  - **POST**: Handles the login form submission. If the credentials are correct, it logs the user in by storing their user ID in the session and redirects to the dashboard. If the credentials are incorrect, it flashes an error message.

- **`/signup` [POST]**:
  - Displays the dashboard page if the user is logged in. If not, it redirects to the login page.

- **`/logout` [POST]**:
  - Logs the user out by clearing their session and redirects them to the home page.

- **`/` [GET]**:
  - Renders the homepage of the application.

## Flash Messages

The application uses flash messages to communicate the following events to the user:

- **Signup**:
  - **Success**: "Signup successful. Please signin."
  - **Error**: "Username already exists. Please choose a different one."
  
- **Signin**:
  - **Error**: "Invalid username or password. Please try again."

These messages are displayed on the frontend in the registration and login pages.

## Database

The application uses MongoDB for storing user information. The `users` collection in the MongoDB database contains the following fields for each user:

- **_id**: ObjectId, the unique identifier for each document (user).
- **username**: String, unique, cannot be null.
- **emailid**: String, unique, cannot be null.
- **password**: String, hashed, cannot be null.

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)

