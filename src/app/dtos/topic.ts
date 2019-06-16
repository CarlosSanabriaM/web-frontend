import { Keyword } from './keyword';

export interface Topic {
  /** Topic id */
  topic: number;
  keywords: Keyword[];
}
