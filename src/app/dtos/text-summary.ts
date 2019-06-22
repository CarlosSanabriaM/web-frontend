/** DTO (Data Transfer Object) that stores the info of a text summary. */
export interface TextSummary {
  /** Text summary. */
  text_summary: string;
  /**
   * If true, the summary was generated with the summarization model.
   * If false, the summarization model didn't converge, and the summary was generated selecting the fist k sentences of the given text.
   */
  summary_generated_with_the_model: boolean;
}
