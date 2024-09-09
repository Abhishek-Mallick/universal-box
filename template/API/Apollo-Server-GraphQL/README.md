# Apollo GraphQL Server Template

## Introduction
This project is a starter template for building GraphQL APIs using Apollo Server and Express. It provides a foundational structure with sample data models for books and authors, making it easy to configure and extend for your own server logic.

## Features
- **Apollo Server**: A robust GraphQL server implementation.
- **Express Integration**: Seamlessly integrates with Express for middleware support.
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
1. **Install dependencies using NPM**:
   ```bash
   npm install
   ```
2. **Compile TypeScript**:
    ```bash
    npm run build
    ```
3. **Start the server**:
    ```bash
    npm start
    ```
4. **Access the GraphQL Playground**: Open your browser and navigate to http://localhost:4000/graphql.

## Routes and Functionalities
- **GET /graphql**: The main endpoint for sending GraphQL queries and mutations.
- **Sample Queries**:
    - Fetch all authors
    - Fetch a specific author by ID
    - Fetch all books
    - Fetch a specific book by ID
    - Fetch books by author ID
    - Create a new author
    - Create a new book

### Entities
1. Authors
    - Fields:
        - id: String
        - name: String
        - dateOfBirth: String or null
2. Books
    - Fields:
        - id: String
        - title: String
        - authorId: String (refers to an Author)
### Database Client Methods
- Books
    - `getBooks(args?: { authorId?: string })`: Fetch all books or filter by author ID.
    - `getBook(id: string)`: Fetch a single book by ID.
    - `createBook(data: { title: string; authorId: string })`: Create a new book.
- Authors
    - `getAuthors()`: Fetch all authors.
    - `getAuthor(id: string)`: Fetch a single author by ID.
    - `createAuthor(data: { name: string; dateOfBirth?: string | null })`: Create a new author.


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

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)