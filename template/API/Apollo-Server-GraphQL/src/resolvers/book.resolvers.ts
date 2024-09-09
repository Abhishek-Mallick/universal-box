import { BookResolvers, Author } from '../generated/graphql';

export const bookResolvers: BookResolvers = {
  author: async ({ author: { id } }, _, { dbClient }) => {
    const author = await dbClient.getAuthor(id);
    return author as Author;
  },
};
