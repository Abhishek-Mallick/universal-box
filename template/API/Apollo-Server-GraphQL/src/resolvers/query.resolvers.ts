import { QueryResolvers } from '../generated/graphql';
import { convertBook, convertAuthor } from '../utils';

export const queryResolvers: QueryResolvers = {
  books: async (_, __, { dbClient }) => {
    const books = await dbClient.getBooks();
    return books.map(convertBook);
  },

  book: async (_, { id }, { dbClient }) => {
    const book = await dbClient.getBook(id);
    if (book == null) {
      return null;
    }
    return convertBook(book);
  },

  authors: async (_, __, { dbClient }) => {
    const authors = await dbClient.getAuthors();
    return authors.map(convertAuthor);
  },

  author: async (_, { id }, { dbClient }) => {
    const author = await dbClient.getAuthor(id);
    return author && convertAuthor(author);
  },
};
