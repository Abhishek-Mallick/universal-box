# GraphQL Documentation

## Books Queries

### 1. Get Book by ID

#### Query
```graphql
query getBookById($book_id: uuid!) {
  books_by_pk(id: $book_id) {
    id
    title
    description
    published_year
    pages
    isbn
    language
    series_name
    series_volume
    created_at
    updated_at
    author {
      id
      name
      born
      died
      created_at
      updated_at
    }
    user {
      id
      username
      email
    }
    book_genres {
      genre {
        id
        name
      }
    }
    book_tags {
      tag {
        id
        name
      }
    }
  }
}
```

#### Variables
```json
{
  "book_id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f"
}
```

#### Response
```json
{
  "data": {
    "books_by_pk": {
      "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
      "title": "Solaris",
      "description": "An updated description of Solaris by Stanisław Lem.",
      "published_year": 1961,
      "pages": 204,
      "isbn": "9780156027601",
      "language": "pl",
      "series_name": null,
      "series_volume": null,
      "created_at": "2024-10-12T16:15:42.911493+00:00",
      "updated_at": "2024-10-12T16:16:36.565072+00:00",
      "author": {
        "id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161",
        "name": "Stanisław Lem",
        "born": 1921,
        "died": 2006,
        "created_at": "2024-10-12T16:04:46.234783+00:00",
        "updated_at": "2024-10-12T16:08:07.697611+00:00"
      },
      "user": {
        "id": "afd3c7c0-bc33-4874-b47b-f4d9ed404311",
        "username": "admin_user",
        "email": "admin@domain.com"
      },
      "book_genres": [],
      "book_tags": []
    }
  }
}
```

## Books Mutations

### 1. Add Book with Author

#### Mutation
```graphql
mutation addBookWithAuthor(
  $title: String!,
  $author_name: String!,
  $user_id: uuid!,
  $description: String,
  $published_year: Int,
  $pages: Int,
  $isbn: String,
  $language: String,
  $series_name: String,
  $series_volume: Int,
  $author_born: Int,
  $author_died: Int
) {
  insert_authors_one(
    object: {
      name: $author_name,
      born: $author_born,
      died: $author_died,
      books: {
        data: {
          title: $title,
          user_id: $user_id,
          description: $description,
          published_year: $published_year,
          pages: $pages,
          isbn: $isbn,
          language: $language,
          series_name: $series_name,
          series_volume: $series_volume
        },
        on_conflict: {
          constraint: books_title_author_id_key,
          update_columns: []
        }
      }
    },
    on_conflict: {
      constraint: authors_name_key,
      update_columns: [born, died]
    }
  ) {
    id
    name
    born
    died
    books {
      id
      title
      description
      published_year
      pages
      isbn
      language
      series_name
      series_volume
    }
  }
}
```

#### Variables
```json
{
  "title": "Solaris",
  "author_name": "Stanisław Lem",
  "user_id": "afd3c7c0-bc33-4874-b47b-f4d9ed404311",
  "description": "Scifi classic by Lem, thought-provoking and enigmatic.",
  "published_year": 1961,
  "pages": 204,
  "isbn": "9780156027601",
  "language": "pl",
  "series_name": null,
  "series_volume": null,
  "author_born": 1921,
  "author_died": 2006
}
```

#### Response
```json
{
  "data": {
    "insert_authors_one": {
      "id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161",
      "name": "Stanisław Lem",
      "born": 1921,
      "died": 2006,
      "books": [
        {
          "id": "fa6509df-fc43-4103-90e4-c731ab806afb",
          "title": "Solaris",
          "description": "Scifi classic by Lem, thought-provoking and enigmatic.",
          "published_year": 1961,
          "pages": 204,
          "isbn": "9780156027601",
          "language": "pl",
          "series_name": null,
          "series_volume": null
        }
      ]
    }
  }
}
```

### 2. Delete Book by ID

#### Mutation
```graphql
mutation deleteBookById($id: uuid!) {
  delete_books(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "id": "fa6509df-fc43-4103-90e4-c731ab806afb"
}
```

#### Response
```json
{
  "data": {
    "delete_books": {
      "affected_rows": 1
    }
  }
}
```

### 3. Upsert Book

#### Mutation
```graphql
mutation upsertBook(
  $title: String!,
  $author_id: uuid!,
  $user_id: uuid!,
  $description: String,
  $published_year: Int,
  $pages: Int,
  $isbn: String,
  $language: String,
  $series_name: String,
  $series_volume: Int
) {
  insert_books_one(
    object: {
      title: $title,
      author_id: $author_id,
      user_id: $user_id,
      description: $description,
      published_year: $published_year,
      pages: $pages,
      isbn: $isbn,
      language: $language,
      series_name: $series_name,
      series_volume: $series_volume
    },
    on_conflict: {
      constraint: books_title_author_id_key,
      update_columns: [
        description,
        published_year,
        pages,
        isbn,
        language,
        series_name,
        series_volume,
        user_id
      ]
    }
  ) {
    id
    title
    description
    published_year
    pages
    isbn
    language
    series_name
    series_volume
    author {
      id
      name
    }
  }
}
```

#### Variables
```json
{
  "title": "Solaris",
  "author_id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161",
  "user_id": "afd3c7c0-bc33-4874-b47b-f4d9ed404311",
  "description": "An updated description of Solaris by Stanisław Lem.",
  "published_year": 1961,
  "pages": 204,
  "isbn": "9780156027601",
  "language": "pl",
  "series_name": null,
  "series_volume": null
}
```

#### Response
```json
{
  "data": {
    "insert_books_one": {
      "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
      "title": "Solaris",
      "description": "An updated description of Solaris by Stanisław Lem.",
      "published_year": 1961,
      "pages": 204,
      "isbn": "9780156027601",
      "language": "pl",
      "series_name": null,
      "series_volume": null,
      "author": {
        "id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161",
        "name": "Stanisław Lem"
      }
    }
  }
}
```

### 4. Add Genre to Book

#### Mutation
```graphql
mutation addGenreToBook($book_id: uuid!, $genre_id: uuid!) {
  insert_book_genres_one(
    object: {
      book_id: $book_id,
      genre_id: $genre_id
    },
    on_conflict: {
      constraint: book_genres_pkey,
      update_columns: []
    }
  ) {
    book {
      id
      title
    }
    genre {
      id
      name
    }

  }
}
```

#### Variables
```json
{
  "book_id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
  "genre_id": "6f794125-5885-4c3e-a648-6d3a8268fe72"
}
```

#### Response
```json
{
  "data": {
    "insert_book_genres_one": {
      "book": {
        "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
        "title": "Solaris"
      },
      "genre": {
        "id": "6f794125-5885-4c3e-a648-6d3a8268fe72",
        "name": "Fantasy"
      }
    }
  }
}
```

### 5. Remove Genre from Book

#### Mutation
```graphql
mutation removeGenreFromBook($book_id: uuid!, $genre_id: uuid!) {
  delete_book_genres(
    where: {
      book_id: { _eq: $book_id },
      genre_id: { _eq: $genre_id }
    }
  ) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "book_id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
  "genre_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

#### Response
```json
{
  "data": {
    "delete_book_genres": {
      "affected_rows": 1
    }
  }
}
```

### 6. Add Tag to Book

#### Mutation
```graphql
mutation addTagToBook($book_id: uuid!, $tag_id: uuid!) {
  insert_book_tags_one(
    object: {
      book_id: $book_id,
      tag_id: $tag_id
    },
    on_conflict: {
      constraint: book_tags_pkey,
      update_columns: []
    }
  ) {
    book {
      id
      title
    }
    tag {
      id
      name
    }
  }
}
```

#### Variables
```json
{
  "book_id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
  "tag_id": "9f55193e-b5f5-4656-9044-0ef603dbce74"
}
```

#### Response
```json
{
  "data": {
    "insert_book_tags_one": {
      "book": {
        "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
        "title": "Solaris"
      },
      "tag": {
        "id": "9f55193e-b5f5-4656-9044-0ef603dbce74",
        "name": "Trilogy"
      }
    }
  }
}
```

### 7. Remove Tag from Book

#### Mutation
```graphql
mutation removeTagFromBook($book_id: uuid!, $tag_id: uuid!) {
  delete_book_tags(
    where: {
      book_id: { _eq: $book_id },
      tag_id: { _eq: $tag_id }
    }
  ) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "book_id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
  "tag_id": "123e4567-e89b-12d3-a456-426614174001"
}
```

#### Response
```json
{
  "data": {
    "delete_book_tags": {
      "affected_rows": 1
    }
  }
}
```

## Authors Queries

### 1. Query Author by ID

#### Query
```graphql
query getAuthorById($author_id: uuid!) {
  authors_by_pk(id: $author_id) {
    id
    name
    born
    died
    created_at
    updated_at
    books {
      id
      title
      published_year
    }
  }
}
```

#### Variables
```json
{
  "author_id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161"
}
```

#### Response
```json
{
  "data": {
    "authors_by_pk": {
      "id": "3dbd36ea-c85f-4ff2-aa3f-7819bb07e161",
      "name": "Stanisław Lem",
      "born": 1921,
      "died": 2006,
      "created_at": "2024-10-12T16:04:46.234783+00:00",
      "updated_at": "2024-10-12T16:08:07.697611+00:00",
      "books": [
        {
          "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
          "title": "Solaris",
          "published_year": 1961
        }
      ]
    }
  }
}
```

## Authors Mutations

### 1. Upsert Author

#### Mutation
```graphql
mutation upsertAuthor($name: String!, $born: Int, $died: Int) {
  insert_authors_one(
    object: { name: $name, born: $born, died: $died },
    on_conflict: {
      constraint: authors_name_key,
      update_columns: [born, died]
    }
  ) {
    id
    name
    born
    died
  }
}
```

#### Variables
```json
{
  "name": "Philip K. Dick",
  "born": 1928,
  "died": 1982
}
```

#### Response
```json
{
  "data": {
    "insert_authors_one": {
      "id": "34f9b22f-d832-462e-80fe-7c697269d981",
      "name": "Philip K. Dick",
      "born": 1928,
      "died": 1982
    }
  }
}
```

### 2. Delete Author

#### Mutation
```graphql
mutation deleteAuthor($id: uuid!) {
  delete_authors(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "id": "34f9b22f-d832-462e-80fe-7c697269d981"
}
```

#### Response
```json
{
  "data": {
    "delete_authors": {
      "affected_rows": 1
    }
  }
}
```

## Genres Queries

### 1. Query Genre by ID

#### Query
```graphql
query getGenreById($genre_id: uuid!) {
  genres_by_pk(id: $genre_id) {
    id
    name
    created_at
    updated_at
    book_genres {
      book {
        id
        title
      }
    }
  }
}
```

#### Variables
```json
{
  "genre_id": "a14aa082-ec10-4cf5-966c-cc70209963ee"
}
```

#### Response
```json
{
  "data": {
    "genres_by_pk": {
      "id": "a14aa082-ec10-4cf5-966c-cc70209963ee",
      "name": "Science Fiction",
      "created_at": "2024-10-12T16:01:33.902054+00:00",
      "updated_at": "2024-10-12T16:01:33.902054+00:00",
      "book_genres": [
        {
          "book": {
            "id": "ab354cc2-cc6f-4c06-8ba8-66c869f36a23",
            "title": "Neuromancer"
          }
        },
        {
          "book": {
            "id": "098bba50-a729-4a36-bee1-c02b9395cd46",
            "title": "Count Zero"
          }
        },
        {
          "book": {
            "id": "01b4e269-2bb0-41ec-8952-74d7283f289b",
            "title": "Mona Lisa Overdrive"
          }
        }
      ]
    }
  }
}
```

## Genres Mutations

### 1. Upsert Genre

#### Mutation
```graphql
mutation upsertGenre($name: String!) {
  insert_genres_one(
    object: { name: $name },
    on_conflict: {
      constraint: genres_name_key,
      update_columns: []
    }
  ) {
    id
    name
  }
}
```

#### Variables
```json
{
  "name": "Non-Fiction"
}
```

#### Response
```json
{
  "data": {
    "insert_genres_one": {
      "id": "a41c65cf-5c

38-40b3-bcf4-65ab2a05a5fc",
      "name": "Non-Fiction"
    }
  }
}
```

### 2. Delete Genre

#### Mutation
```graphql
mutation deleteGenre($id: uuid!) {
  delete_genres(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "id": "a41c65cf-5c38-40b3-bcf4-65ab2a05a5fc"
}
```

#### Response
```json
{
  "data": {
    "delete_genres": {
      "affected_rows": 1
    }
  }
}
```

## Tags Queries

### 1. Query Tag by ID

#### Query
```graphql
query getTagById($tag_id: uuid!) {
  tags_by_pk(id: $tag_id) {
    id
    name
    created_at
    updated_at
    book_tags {
      book {
        id
        title
      }
    }
  }
}
```

#### Variables
```json
{
  "tag_id": "123e4567-e89b-12d3-a456-426614174001"
}
```

#### Response
```json
{
  "data": {
    "tags_by_pk": {
      "id": "3d55e454-9bfb-47e8-8805-9d1dd6d2e7c5",
      "name": "Bestseller",
      "created_at": "2024-10-12T16:01:33.902054+00:00",
      "updated_at": "2024-10-12T16:01:33.902054+00:00",
      "book_tags": [
        {
          "book": {
            "id": "d5c7d5df-7567-40e1-96d6-65b02c9a0ffb",
            "title": "The Return of the King"
          }
        }
      ]
    }
  }
}
```

## Tags Mutations

### 1. Upsert Tag

#### Mutation
```graphql
mutation upsertTag($name: String!) {
  insert_tags_one(
    object: { name: $name },
    on_conflict: {
      constraint: tags_name_key,
      update_columns: []
    }
  ) {
    id
    name
  }
}
```

#### Variables
```json
{
  "name": "Bestseller"
}
```

#### Response (if already exists):
```json
{
  "data": {
    "insert_tags_one": null
  }
}
```

#### Response (if not exists):
```json
{
  "data": {
    "insert_tags_one": {
      "id": "224b2565-ad8d-4af7-bc60-e6e280f815fc",
      "name": "Bestseller2"
    }
  }
}
```

### 2. Delete Tag

#### Mutation
```graphql
mutation deleteTag($id: uuid!) {
  delete_tags(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "id": "224b2565-ad8d-4af7-bc60-e6e280f815fc"
}
```

#### Response
```json
{
  "data": {
    "delete_tags": {
      "affected_rows": 1
    }
  }
}
```

## Users Queries

### 1. Query User by ID

#### Query
```graphql
query getUserById($user_id: uuid!) {
  users_by_pk(id: $user_id) {
    id
    username
    email
    created_at
    updated_at
    active
    role
    books {
      id
      title
    }
  }
}
```

#### Variables
```json
{
  "user_id": "afd3c7c0-bc33-4874-b47b-f4d9ed404311"
}
```

#### Response
```json
{
  "data": {
    "users_by_pk": {
      "id": "afd3c7c0-bc33-4874-b47b-f4d9ed404311",
      "username": "admin_user",
      "email": "admin@domain.com",
      "created_at": "2024-10-12T15:30:00.000000+00:00",
      "updated_at": "2024-10-12T15:30:00.000000+00:00",
      "active": true,
      "role": "admin",
      "books": [
        {
          "id": "f6324fe6-6d68-4f63-8b99-4f7d9865c74f",
          "title": "Solaris"
        }
      ]
    }
  }
}
```

## Users Mutations

### 1. Upsert User

#### Mutation
```graphql
mutation upsertUser(
  $email: String!,
  $username: String!,
  $password: String!,
  $role: String = "user",
  $active: Boolean = true
) {
  insert_users_one(
    object: {
      email: $email,
      username: $username,
      password: $password,
      role: $role,
      active: $active
    },
    on_conflict: {
      constraint: users_email_key,
      update_columns: [username, password, role, active]
    }
  ) {
    id
    email
    username
    role
    active
    created_at
    updated_at
  }
}
```

#### Variables
```json
{
  "email": "admin2@domain.com",
  "username": "admin2_user",
  "password": "securepassword123",
  "role": "admin",
  "active": true
}
```

#### Response
```json
{
  "data": {
    "insert_users_one": {
      "id": "b4f8d8e3-9f8a-4f4e-8f1a-3f8d8e3b4f8d",
      "email": "admin2@domain.com",
      "username": "admin2_user",
      "role": "admin",
      "active": true,
      "created_at": "2024-10-12T16:45:00.000000+00:00",
      "updated_at": "2024-10-12T16:45:00.000000+00:00"
    }
  }
}
```

### 2. Delete User

#### Mutation
```graphql
mutation deleteUser($id: uuid!) {
  delete_users(where: { id: { _eq: $id } }) {
    affected_rows
  }
}
```

#### Variables
```json
{
  "id": "b4f8d8e3-9f8a-4f4e-8f1a-3f8d8e3b4f8d"
}
```

#### Response
```json
{
  "data": {
    "delete_users": {
      "affected_rows": 1
    }
  }
}
```

### 3. Query User by Email

#### Query
```graphql
query getUserByEmail($email: String!) {
  users(where: { email: { _eq: $email } }) {
    id
    username
    email
    created_at
    updated_at
    active
    role
    books {
      id
      title
    }
  }
}
```

#### Variables
```json
{
  "email": "admin2@domain.com"
}
```

#### Response
```json
{
  "data": {
    "users": [
      {
        "id": "b4f8d8e3-9f8a-4f4e-8f1a-3f8d8e3b4f8d",
        "username": "admin2_user",
        "email": "admin2@domain.com",
        "created_at": "2024-10-12T16:45:00.000000+00:00",
        "updated_at": "2024-10-12T16:45:00.000000+00:00",
        "active": true,
        "role": "admin",
        "books": []
      }
    ]
  }
}
```