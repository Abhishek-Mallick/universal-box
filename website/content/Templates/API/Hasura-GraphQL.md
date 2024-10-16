## Introduction

The **Hasura GraphQL Server Template** is a starter kit for the development of GraphQL API using Hasura. This template offers a pre-configured setup with sample data models for books, authors, genres, tags, and users. It provide smooth start and can be easily customized to suit specific needs.

## Features

- **Instant GraphQL API using Hasura**: Automatically generate GraphQL APIs over  PostgreSQL database.
- **Hasura GraphQL Console**: Interactive web interface for API exploration and database management.
- **Dockerized Setup**: Quick and easy deployment using Docker and Docker Compose.
- **Sample Data Models**: Predefined schemas for books, authors, genres, tags, and users to kickstart the project.
- **Automatic Migration using Hasura cli**: Simplify database management with schema and metadata migrations.


## Technologies Used

- **Hasura GraphQL Engine**: An open-source engine that provides instant GraphQL APIs over PostgreSQL.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Docker & Docker Compose**: Tools for containerization to ease setup and deployment.
- **GraphQL**: A query language for APIs and a runtime for fulfilling those queries.

## Installation Steps
To utilize the Apollo GraphQL Server Template with Universal-Box, follow these steps:

1. **Initialize the project**:
   ```bash
   universal-box init
   ```
2. **Select the Apollo GraphQL Server Template**:
Select the following from the menu:
   ```bash
    API > Hasura-GraphQL
    ```

3. **Configure Environment Variables**:
   - Copy the `.env.example` file to `.env`.
   - Update the `.env` file with your specific configuration if necessary.

4. **Start Docker Containers**:
   ```bash
   docker-compose up -d
   ```

5. **Apply Migrations and Metadata**:
   - Ensure you have the Hasura CLI installed ([installation guide](https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/)).
   - Apply migrations and metadata:
     ```bash
     cd hasura-exports
     hasura migrate apply --endpoint http://localhost:8080 --admin-secret <your-admin-secret> --database-name postgres
     hasura metadata apply --endpoint http://localhost:8080 --admin-secret <your-admin-secret> --database-name postgres
     ```

6. **Import Sample Data**:
   - Use the Hasura console to import sample data:
     - Navigate to `http://localhost:8080/console/data/sql`.
     - Paste the contents of `hasura-exports/sample-data.sql` and execute.

7. **Access the Hasura Console**:
   - Open your browser and go to `http://localhost:8080` to access the Hasura console.

## Sample Queries and Mutations

Explore some of the available GraphQL operations:

### Fetch All Books

```graphql
query {
  books {
    id
    title
    description
    author {
      name
    }
    book_genres {
      genre {
        name
      }
    }
    book_tags {
      tag {
        name
      }
    }
  }
}
```

### Add a New Book with Author

```graphql
mutation addBookWithAuthor(
  $title: String!,
  $author_name: String!,
  $user_id: uuid!
) {
  insert_authors_one(
    object: {
      name: $author_name,
      books: {
        data: {
          title: $title,
          user_id: $user_id
        }
      }
    },
    on_conflict: {
      constraint: authors_name_key,
      update_columns: []
    }
  ) {
    id
    name
    books {
      id
      title
    }
  }
}
```

### Delete a Book by ID

```graphql
mutation deleteBookById($id: uuid!) {
  delete_books(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

### Fetch Author by ID

```graphql
query getAuthorById($author_id: uuid!) {
  authors_by_pk(id: $author_id) {
    id
    name
    books {
      id
      title
    }
  }
}
```

## Explore More

Visit the GraphQL API Explorer at `http://localhost:8080/console/api-explorer` to try out additional queries and mutations.

**Note**: For more examples, refer to the [docs](https://github.com/Abhishek-Mallick/universal-box/tree/main/template/API/Hasura-GraphQL/docs.md)


Visit codebase [here](https://github.com/Abhishek-Mallick/universal-box/tree/main/template/API/Hasura-GraphQL)
