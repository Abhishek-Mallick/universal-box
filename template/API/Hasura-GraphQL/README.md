# Hasura Setup and Configuration Guide

## 1. Setup Hasura Instance

**1.** Copy the .env.example file to .env

**2.** Start the docker container using docker-compose

Make sure to have docker compose installed, check this [link](https://docs.docker.com/compose/install/)

Run:

```sh
docker-compose up -d
```

**3.** Hasura Console will be available at http://localhost:8080

**4.** Go to the console:
```
http://localhost:8080/console/data/v2/manage/connect
```
Enter database url:
```
postgres://postgres:your_secure_password@postgres:5432/postgres
```
Database name: postgres

<img src="assets/db.png" alt="db.png" width="600"/>


## 2. Apply schema and metadata migration

Make sure to have hasura cli installed, check this [link](https://hasura.io/docs/2.0/hasura-cli/install-hasura-cli/)

```sh
cd hasura-exports
hasura migrate apply --endpoint http://localhost:8080 --admin-secret password --database-name postgres
hasura metadata apply --endpoint http://localhost:8080 --admin-secret password --database-name postgres
```

All tables and relationships can tracked also from the console (http://localhost:8080/console/data/postgres/schema/public)
This screen will show only if metadata has not been applied yet.

<img src="assets/import1.png" alt="import1.png" width="300"/>
<img src="assets/import2.png" alt="import2.png" width="300"/>

## 3. Add sample data

A) Import sql file to the console
Go to http://localhost:8080/console/data/sql
Paste the content of `hasura-exports/sample-data.sql` and click run.

B) Alternatively import it from cli
```sh
# Look for the PostgreSQL container's name
docker ps
# for example: hasura-graphql-postgres-1
# import database from host to docker postgres container.
cat hasura-exports/sample-data.sql | docker exec -i hasura-graphql-postgres-1 psql -U postgres -d postgres
```

## Explore GraphQL Queries and Mutations  

Visit http://localhost:8080/console/api/api-explorer

Check [Documentation](./docs.md) for more info

---

Made using [Universal-Box](https://github.com/Abhishek-Mallick/universal-box)