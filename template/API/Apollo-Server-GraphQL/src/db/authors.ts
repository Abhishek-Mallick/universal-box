import { uuid } from 'uuidv4';

export type AuthorTable = Record<string, AuthorRow>;

export type AuthorRow = {
  id: string;
  name: string;
  dateOfBirth: string | null;
};

export const AUTHOR_ID_1 = uuid();
export const AUTHOR_ID_2 = uuid();

export const AUTHORS: AuthorTable = {
  [AUTHOR_ID_1]: {
    id: AUTHOR_ID_1,
    name: 'Douglas Adams',
    dateOfBirth: new Date('1955-03-11').toISOString(),
  },
  [AUTHOR_ID_2]: {
    id: AUTHOR_ID_2,
    name: 'Mark Manson',
    dateOfBirth: null,
  },
};
