/** DTO (Data Transfer Object) that stores the info of a document related to a topic. */
export interface ReprDocOfTopic {
  /** Document content. */
  doc_content: string;
  /** Document content summary. */
  doc_content_summary: string;
  /** Probability of the document being related to the topic. */
  doc_topic_prob: number;
}
