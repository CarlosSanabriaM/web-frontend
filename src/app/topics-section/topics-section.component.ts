import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../topics.service';
import { Topic } from '../dtos/topic';
import { TopicImageUrl } from '../dtos/topic-image-url';
import { ReprDocOfTopic } from '../dtos/repr-doc-of-topic';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  sectionName = 'Topics';
  topics: Topic[];
  topicImageUrls: TopicImageUrl[];
  topicDocuments: ReprDocOfTopic[];
  selectedTopicId: number;  // selected topic id to obtain the topics documents

  // TODO: This values shouldn't be hardcoded here
  readonly numKeywordsTextFormatMinValue = 1; // min value for the num keywords text format slider
  numKeywordsTextFormat = 5; // initial value for the num keywords text format slider
  readonly numKeywordsTextFormatMaxValue = 30; // max value for the num keywords text format slider

  readonly numKeywordsWordcloudFormatMinValue = 1; // min value for the num keywords wordcloud format slider
  numKeywordsWordcloudFormat = 20; // initial value for the num keywords wordcloud format slider
  readonly numKeywordsWordcloudFormatMaxValue = 100; // max value for the num keywords wordcloud format slider

  readonly numTopicDocumentsMinValue = 1; // min value for the num topic documents slider
  numTopicDocuments = 2; // initial value for the num topic documents slider
  readonly numTopicDocumentsMaxValue = 10; // max value for the num topic documents slider

  readonly topicDocumentSummaryMaxLength = 150; // max number of characters of a document summary displayed in the card header

  constructor(private topicsService: TopicsService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.getTopicsText();
    this.getTopicsWordcloudImagesUrls();
  }

  /**
   * Calls the TopicsService to obtain the topics in text format and
   * stores the result in a variable.
   */
  getTopicsText(): void {
    this.topicsService.getTopicsText(this.numKeywordsTextFormat)
      .subscribe(topics => this.topics = topics);
  }

  /**
   * Calls the TopicsService to obtain the topics in wordcloud format and
   * stores the result in a variable.
   */
  getTopicsWordcloudImagesUrls(): void {
    this.topicsService.getTopicsWordcloudImagesUrls(this.numKeywordsWordcloudFormat)
      .subscribe(topicImageUrls => this.topicImageUrls = topicImageUrls);
  }

  /**
   * Calls the TopicsService to obtain the most representative documents of a topic and
   * stores the result in a variable.
   * @param topicId: Id of the topic which documents want to be retrieved
   */
  getTopicDocuments(topicId: number): void {
    this.topicsService.getTopicDocuments(topicId, this.numTopicDocuments)
      .subscribe(topicDocuments => {
        this.selectedTopicId = topicId;
        this.topicDocuments = topicDocuments;
      });
  }

  /**
   * Updates the values of the variables passed to the rest API,
   * and calls the API to obtain the topics in text and wordcloud formats
   * with the new values of the parameters.
   */
  updateVariablesAndRefreshTopics(numKeywordsTextFormat: number,
                                  numKeywordsWordcloudFormat: number,
                                  numTopicDocuments: number) {
    // Update variables values
    this.numKeywordsTextFormat = numKeywordsTextFormat;
    this.numKeywordsWordcloudFormat = numKeywordsWordcloudFormat;
    this.numTopicDocuments = numTopicDocuments;
    // Call the API with the new values to obtain the topics in text and wordcloud formats
    this.getTopicsText();
    this.getTopicsWordcloudImagesUrls();
  }
}
