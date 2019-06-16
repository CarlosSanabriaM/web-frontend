import { Component, OnInit } from '@angular/core';
import { TopicsService } from './topics.service';
import { Topic } from '../dtos/topic';
import { TopicImageUrl } from '../dtos/topic-image-url';
import { ReprDocOfTopic } from '../dtos/repr-doc-of-topic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  sectionName = 'Topics';
  topics: Topic[];
  topicImageUrls: TopicImageUrl[];
  wordcloudImagesLoading = false; // if true, the wordcloud images have been asked and are loading
  topicDocuments: ReprDocOfTopic[];
  topicDocumentsLoading = false; // if true, the topic document have been asked and are loading
  topicDocumentsSubscription: Subscription; // disposable resource to cancel the execution of the topic documents Observable
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

  /** max number of characters of a document summary displayed in the card header */
  readonly topicDocumentSummaryMaxLength = 150;


  constructor(private topicsService: TopicsService) { }

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
    // Remove previous data and mark as loading
    this.topicImageUrls = null;
    this.wordcloudImagesLoading = true;

    this.topicsService.getTopicsWordcloudImagesUrls(this.numKeywordsWordcloudFormat)
      .subscribe(topicImageUrls => {
        this.topicImageUrls = topicImageUrls;
        this.wordcloudImagesLoading = false;
      });
  }

  /**
   * Calls the TopicsService to obtain the most representative documents of a topic and
   * stores the result in a variable.
   * @param topicId: Id of the topic which documents want to be retrieved
   */
  getTopicDocuments(topicId: number): void {
    // Remove previous data and mark as loading
    this.topicDocuments = null;
    this.topicDocumentsLoading = true;
    this.selectedTopicId = topicId;

    this.topicDocumentsSubscription = this.topicsService.getTopicDocuments(topicId, this.numTopicDocuments)
      .subscribe(topicDocuments => {
        this.topicDocuments = topicDocuments;
        this.topicDocumentsLoading = false;
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

  /**
   * Closes the topic documents card.
   * If the topic documents are loading, unsubscribes from the Observable.
   */
  closeTopicDocumentsCard() {
    if (this.topicDocumentsLoading) {
      // If topic documents are loading, cancel the subscription and mark as not loading
      this.topicDocumentsSubscription.unsubscribe();
      this.topicDocumentsLoading = false;
    } else {
      // If topic documents have been loaded, remove them
      this.topicDocuments = null;
    }
  }

}
