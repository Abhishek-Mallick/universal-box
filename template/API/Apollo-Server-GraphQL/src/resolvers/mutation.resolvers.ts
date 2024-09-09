import { MutationResolvers } from '../generated/graphql';
import { convertBook, convertAuthor } from '../utils';

export const mutationResolvers: MutationResolvers = {
  createBook: async (_, args, { dbClient }) => {
    const book = await dbClient.createBook(args);
    return convertBook(book);
  },

  createAuthor: async (_, args, { dbClient }) => {
    const author = await dbClient.createAuthor(args);
    return convertAuthor(author);
  },
};
