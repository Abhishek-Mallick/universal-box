## Introduction
The **Apollo GraphQL Server Template** is a starter template designed to simplify the process of building GraphQL APIs using Apollo Server and Express. This template provides a foundational structure with sample data models for books and authors, making it easy to configure and extend for your own server logic.

## Features
- **Apollo Server**: A robust implementation of a GraphQL server.
- **Express Integration**: Seamless integration with Express for middleware support.
- **Sample Data Models**: Predefined models for books and authors to kickstart development.
- **Introspection Support**: Built-in support for GraphQL introspection queries.
- **GraphQL Playground**: Interactive API exploration interface.

## Technologies Used
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js.
- **Apollo Server**: GraphQL server for Node.js.
- **TypeScript**: Typed superset of JavaScript for improved development experience.
- **UUID**: Library for generating unique identifiers.

## Installation Steps
To utilize the Apollo GraphQL Server Template with Universal-Box, follow these steps:

1. **Initialize the project**:
   ```bash
   universal-box init
   ```
2. **Select the Apollo GraphQL Server Template**:
Select the following from the menu:
   ```bash
    API > Apollo-Server-GraphQL
    ```
3. **Install dependencies**:
Navigate to your project directory and run:
    ```bash
    npm install

    # Compile TypeScript
    npm run build

    # Start the server
    npm start
    ```
4. **Access the GraphQL Playground**:Open your browser and navigate to `http://localhost:4000/graphql`.

## Queries
Here are the available queries and mutations you can use to interact with the API:

### Fetch All Authors
```graphql
query {
  authors {
    id
    name
    dateOfBirth
  }
}
```
![Fetch-All-Authors](https://github.com/user-attachments/assets/4eabd7c5-1295-4ec7-a34b-95edc954e887)

### Fetch a Specific Author by ID
```graphql
query {
  author(id: "YOUR_AUTHOR_ID") {
    id
    name
    dateOfBirth
  }
}
```

![Fetch-a-Specific-Author-by-ID](https://github.com/user-attachments/assets/c59f2712-502d-4e87-9a62-e53a7e9ba06e)

### Fetch All Books
```graphql
query {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```
![Fetch-All-Books](https://github.com/user-attachments/assets/661b4ec3-2206-465c-9cb8-3de3ac8da420)

### Create a New Author
```graphql
mutation {
  createAuthor(data: { name: "New Author", dateOfBirth: "1990-01-01" }) {
    id
    name
    dateOfBirth
  }
}
```

![Create-a-New-Author](https://github.com/user-attachments/assets/2f0f6ea4-9493-426d-9d6b-651001575244)

### Create a New Book
```graphql
mutation {
  createBook(data: { title: "New Book Title", authorId: "YOUR_AUTHOR_ID" }) {
    id
    title
    authorId
  }
}
```

![Create-a-New-Book](https://github.com/user-attachments/assets/178c491e-809f-40ea-a1c8-8e01f181455f)

### Querying the Schema Directives
```graphql
query {
  __schema {
    directives {
      name
      description
      locations
      args {
        name
        description
        type {
          kind
          name
          ofType {
            kind
            name
          }
        }
        defaultValue
      }
    }
  }
}
```

![Querying-the-Schema-Directives](https://github.com/user-attachments/assets/02a6cc78-5f29-4fd7-8acc-d2b4760decb0)

Visit codebase [here](https://github.com/Abhishek-Mallick/universal-box/tree/main/template/API/Apollo-Server-GraphQL)