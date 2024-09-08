import express, { Express } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';
import { DbClient } from './db/client';

export function createServer(): Express {
  const typeDefs = gql(
    readFileSync(join(__dirname, '..', 'schema.graphql'), 'utf-8'),
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      dbClient: new DbClient(),
    },
    introspection: true,
    playground: true,
  });

  const app = express();

  server.applyMiddleware({ app, cors: true });

  return app;
}
