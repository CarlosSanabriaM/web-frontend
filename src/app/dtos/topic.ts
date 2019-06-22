import { Keyword } from './keyword';

/** DTO (Data Transfer Object) that stores the info of a topic in text format. */
export interface Topic {
  /** Topic id. */
  topic: number;
  /** Topic most important keywords. */
  keywords: Keyword[];
}
