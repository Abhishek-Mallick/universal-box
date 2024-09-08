import { AuthorResolvers } from '../generated/graphql';
import { convertBook } from '../utils';

export const authorResolvers: AuthorResolvers = {
  books: async ({ id }, _, { dbClient }) => {
    const books = await dbClient.getBooks({ authorId: id });
    return books.map(convertBook);
  },
};
