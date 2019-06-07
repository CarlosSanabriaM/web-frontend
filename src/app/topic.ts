import { Keyword } from './keyword';

export interface Topic {
  topic: number;  // topic id
  keywords: Keyword[];
}
