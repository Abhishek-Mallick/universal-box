import { BookRow } from './db/books';
import { Book, Author } from './generated/graphql';
import { AuthorRow } from './db/authors';

export function convertBook(book: BookRow): Book {
  return {
    ...book,
    author: { id: book.authorId, name: '', books: [] },
  };
}

export function convertAuthor(author: AuthorRow): Author {
  return { ...author, books: [] };
}
