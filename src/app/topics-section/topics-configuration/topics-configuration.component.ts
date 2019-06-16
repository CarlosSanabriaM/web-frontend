import { Component, Input, OnInit } from '@angular/core';
import { TopicsTextComponent } from '../topics-text/topics-text.component';

@Component({
  selector: 'app-topics-configuration',
  templateUrl: './topics-configuration.component.html',
  styleUrls: [ './topics-configuration.component.css' ]
})
export class TopicsConfigurationComponent implements OnInit {

  /* Inject the sibling components */
  @Input() topicsTextComponent: TopicsTextComponent;
  // TODO: @Input() topicsWordcloudComponent: TopicsWordcloudComponent;
  /** Value of the num keywords text format */
  numKeywordsTextFormat = 5;
  /** Value of the num keywords wordcloud format */
  numKeywordsWordcloudFormat = 20;
  /** Value of the num topic documents */
  numTopicDocuments = 2;
  /** Min value for the num keywords text format */
  private readonly NUM_KEYWORDS_TEXT_FORMAT_MIN_VALUE = 1;
  /** Max value for the num keywords text format */
  private readonly NUM_KEYWORDS_TEXT_FORMAT_MAX_VALUE = 30;
  /** Min value for the num keywords wordcloud format */
  private readonly NUM_KEYWORDS_WORDCLOUD_FORMAT_MIN_VALUE = 1;
  /** Max value for the num keywords wordcloud format */
  private readonly NUM_KEYWORDS_WORDCLOUD_FORMAT_MAX_VALUE = 100;
  /** Min value for the num topic documents */
  private readonly NUM_TOPIC_DOCUMENTS_MIN_VALUE = 1;
  /** Max value for the num topic documents */
  private readonly NUM_TOPIC_DOCUMENTS_MAX_VALUE = 10;


  constructor() { }

  ngOnInit() {
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
    this.topicsTextComponent.getTopicsText();
    //this.getTopicsWordcloudImagesUrls(); // TODO: this.topicsWordcloudComponent.getTopicsWordcloudImagesUrls();
  }

}
