/** DTO (Data Transfer Object) that stores the info of a document related to a text given by the user. */
export interface TextRelatedDoc {
  /** Document content. */
  doc_content: string;
  /** Document content summary. */
  doc_content_summary: string;
  /** Probability of the document being related to the text. */
  doc_text_prob: number;
  /** Topic id of the document (i.e. topic more related to the document). */
  doc_topic: number;
}
