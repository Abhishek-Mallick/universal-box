import { uuid } from 'uuidv4';
import { AUTHOR_ID_1, AUTHOR_ID_2 } from './authors';

export type BookTable = Record<string, BookRow>;

export type BookRow = {
  id: string;
  title: string;
  authorId: string;
};

export const BOOK_ID_1 = uuid();
export const BOOK_ID_2 = uuid();
export const BOOK_ID_3 = uuid();

export const BOOKS: BookTable = {
  [BOOK_ID_1]: {
    id: BOOK_ID_1,
    title: "The Hitchhikers's Guide to the Galaxy",
    authorId: AUTHOR_ID_1,
  },
  [BOOK_ID_2]: {
    id: BOOK_ID_2,
    title: 'Restaurant at the End of the Universe',
    authorId: AUTHOR_ID_1,
  },
  [BOOK_ID_3]: {
    id: BOOK_ID_3,
    title: 'The subtle art of not giving a fuck',
    authorId: AUTHOR_ID_2,
  },
};
