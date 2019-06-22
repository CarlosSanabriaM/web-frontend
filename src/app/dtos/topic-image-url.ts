/** DTO (Data Transfer Object) that stores the relative url to the wordcloud image (with k keywords) of a topic. */
export interface TopicImageUrl {
  /** Topic id. */
  topic: number;
  /** Relative url to the wordcloud image (with k keywords) of the topic. */
  image_url: string;
}
