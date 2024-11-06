## Introduction

The **Spring Boot API Template** is designed to help you quickly set up a RESTful API using Java and the Spring Boot framework. This template provides a basic structure and essential features to get you started with building your application.

## Features

- **Spring Boot Framework**: Leverage the power of Spring Boot for rapid application development.
- **RESTful API Endpoints**: Predefined endpoints for user management, making it easy to expand upon.

## Getting Started

### Installation Steps
To utilize the Spring Boot Framework Template with Universal-Box, follow these steps:

1. **Initialize the project**:
   ```bash
   universal-box init
   ```
2. **Select the Apollo GraphQL Server Template**:
Select the following from the menu:
   ```bash
    API > springboot-java
    ```

### Run the Application
Once you have cloned the repository, you can run the application using Maven:
```bash
mvn spring-boot:run
```

## Example Endpoints

### Create a User
To create a new user, send a POST request to the `/api/users` endpoint:
```bash
curl -X POST http://localhost:8080/api/users \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
}'
```

### Get All Users
To retrieve a list of all users, send a GET request to the `/api/users` endpoint:
```bash
curl -X GET http://localhost:8080/api/users
```

## Explore More
For additional information and examples, refer to the [Spring Boot documentation](https://spring.io/projects/spring-boot/)

**Note**: For more examples, refer to the [docs](https://github.com/Abhishek-Mallick/universal-box/tree/main/template/API/Hasura-GraphQL/docs.md)