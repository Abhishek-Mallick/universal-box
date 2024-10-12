# Authentication Template: ejs + Node.js

This repository offers a simple authentication template made using EJS for server-side rendering (SSR). It includes key features such as user authentication, role-based authorization, and password reset functionality.

## Features

- **User Authentication**: Supports user registration and login with JWT-based authentication.
- **User Authorization**: Implements role-based access control (RBAC) to restrict route access based on user roles, with admins having elevated permissions.
- **Reset Password**: Users can reset their password.
- **Password Security**: Passwords are securely stored in a hashed format to prevent direct access or exposure.
- **role**:  Specifies the user’s role in the system, allowing for role-based access control. Possible values include 'admin' for administrators and 'user' for regular users. It defaults to 'user' if not specified.

## Technologies Used
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, allowing server-side execution of JavaScript.
- **Express**: A minimal and flexible Node.js web application framework for building robust APIs and web applications.
- **MongoDB**: A NoSQL database known for its flexibility, scalability, and document-oriented storage.
- **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment with Node.js.
- **EJS**: A templating engine that allows embedding JavaScript into HTML for server-side rendering (SSR).
- **JWT**: A secure way to implement token-based authentication, enabling stateless user sessions.
- **crypto**: It is an npm package used for hashing user passwords securely.
- **TailwindCSS**: A utility-first CSS framework for quickly designing and customizing modern, responsive web interfaces.


## Installation
1. **Create a .env file and populate it with the following values:**:

   ```bash
    PORT=<portno>
    JWT_KEY=<your jwt secret key>
    DB_URL=<your mongodb url>
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
   ```

5. **Access the application**:

   Visit `http://localhost:<portno>/` in your web browser.

## Routes and Functionalities

- **`/user/signup` [GET, POST]**:
  - **GET**: Renders the registration page where new users can sign up.
  - **POST**: Handles the form submission for user registration. If the email is already taken, it flashes an error message. Otherwise, it creates a new user and redirects to the login page with a success message.

- **`/user/login` [GET, POST]**:
  - **GET**: Renders the login page where users can log in with their credentials.
  - **POST**: Handles the login form submission. If the credentials are correct, it logs the user in and saves their token in cookie and redirects to the dashboard. If the credentials are incorrect, it flashes an error message.

- **`/user` [GET]**:
  - Displays the dashboard page if the user is logged in. If not, it redirects to the login page.

- **`/logout` [GET]**:
  - Logs the user out by clearing their token and redirects them to the home page.

- **`/` [GET]**:
  - Renders the homepage of the application.

## Database

The application uses MongoDB for storing user information. The `users` collection in the MongoDB database contains the following fields for each user:

- **_id**: ObjectId, the unique identifier for each document (user).
- **fullName**: String, unique, cannot be null.
- **username**: String, unique, cannot be null.
- **emailid**: String, unique, cannot be null.
- **password**: String, hashed using salt, cannot be null.
- **role**:  String ['admin','user'], specifies the user’s role in the system.

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)
