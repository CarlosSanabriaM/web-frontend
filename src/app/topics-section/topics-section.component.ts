import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../topics.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  sectionName = 'Topics';
  topics: Topic[];
  // TODO: This values shouldn't be hardcoded here
  numKeywordsTextFormat = 5;
  numKeywordsWordcloudFormat = 20;
  numTopicDocuments = 10;

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.getTopicsText();
  }

  getTopicsText(): void {
    this.topicsService.getTopicsText(this.numKeywordsTextFormat)
      .subscribe(topics => this.topics = topics);
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
    // TODO: this.getTopicsWordcloudImagesUrls();
  }
}
