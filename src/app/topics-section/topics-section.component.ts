import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicsService } from './topics.service';
import { Topic } from '../dtos/topic';
import { TopicImageUrl } from '../dtos/topic-image-url';
import { TopicDocumentsCardComponent } from './topic-documents-card/topic-documents-card.component';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  /* Inject the child components */
  @ViewChild(TopicDocumentsCardComponent) topicDocumentsCardComponent: TopicDocumentsCardComponent;

  /** Name of the topics section */
  sectionName = 'Topics';
  /** Stores the topic documents returned by the REST API */
  topics: Topic[];
  topicImageUrls: TopicImageUrl[];
  wordcloudImagesLoading = false; // if true, the wordcloud images have been asked and are loading

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


  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.getTopicsText(); // TODO: Remove line when the TopicsTextComponent is created
    this.getTopicsWordcloudImagesUrls();
  }

  // TODO: Remove method when the TopicsTextComponent is created
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
    this.topicDocumentsCardComponent.topicDocuments = null;
    this.topicDocumentsCardComponent.topicDocumentsLoading = true;
    this.topicDocumentsCardComponent.selectedTopicId = topicId;

    this.topicDocumentsCardComponent.topicDocumentsSubscription = this.topicsService.getTopicDocuments(topicId, this.numTopicDocuments)
      .subscribe(topicDocuments => {
        this.topicDocumentsCardComponent.topicDocuments = topicDocuments;
        this.topicDocumentsCardComponent.topicDocumentsLoading = false;
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
