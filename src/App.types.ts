import { ParsedQuery } from 'query-string';


export type AppParsedQuery = ParsedQuery<string> & {
  id?: string;
};
