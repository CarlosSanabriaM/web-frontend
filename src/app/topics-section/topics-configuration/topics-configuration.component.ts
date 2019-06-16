import { Component, Input, OnInit } from '@angular/core';
import { TopicsTextComponent } from '../topics-text/topics-text.component';
import { TopicsWordcloudComponent } from '../topics-wordcloud/topics-wordcloud.component';
import { TopicDocumentsCardComponent } from '../topic-documents-card/topic-documents-card.component';

@Component({
  selector: 'app-topics-configuration',
  templateUrl: './topics-configuration.component.html',
  styleUrls: [ './topics-configuration.component.css' ]
})
export class TopicsConfigurationComponent implements OnInit {

  /* Inject the sibling components */
  @Input() topicsTextComponent: TopicsTextComponent;
  @Input() topicsWordcloudComponent: TopicsWordcloudComponent;
  @Input() topicDocumentsCardComponent: TopicDocumentsCardComponent;


  constructor() { }

  ngOnInit() {
  }

  /**
   * Updates the values of the variables passed to the REST API,
   * and calls the API to obtain the topics in text and wordcloud formats
   * with the new values of the parameters.
   */
  updateVariablesAndRefreshTopics(numKeywordsTextFormat: number,
                                  numKeywordsWordcloudFormat: number,
                                  numTopicDocuments: number) {
    // Update variables values
    this.topicsTextComponent.numKeywords = numKeywordsTextFormat;
    this.topicsWordcloudComponent.numKeywords = numKeywordsWordcloudFormat;
    this.topicDocumentsCardComponent.numDocuments = numTopicDocuments;
    // Call the API with the new values to obtain the topics in text and wordcloud formats
    this.topicsTextComponent.getTopicsText();
    this.topicsWordcloudComponent.getTopicsWordcloudImagesUrls();
  }

}
