# Spring Boot Java API Project

## Overview
This project is a template for creating a Spring Boot API using Java. It provides a basic structure to help you get started quickly.

## Features
- Spring Boot framework
- RESTful API endpoints

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/universal-box.git
cd universal-box/template/API/springboot-java
```

### Run the Application
```bash
mvn spring-boot:run
```

### Example Endpoints

#### Create a User
```bash
curl -X POST http://localhost:8080/api/users \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
}'
```

#### Get All Users
```bash
curl -X GET http://localhost:8080/api/users
```

