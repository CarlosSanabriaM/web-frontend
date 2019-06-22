/** DTO (Data Transfer Object) that stores the probability of a text being related to a topic. */
export interface TextTopicProb {
  /** Topic id. */
  topic: number;
  /** Probability of the text being related to the topic. */
  text_topic_prob: number;
}
