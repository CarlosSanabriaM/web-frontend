import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicsService } from './topics.service';
import { TopicDocumentsCardComponent } from './topic-documents-card/topic-documents-card.component';
import { UtilsService } from '../utils.service';

/** Root component of the topics module that represents the topics section. */
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: [ './topics.component.css' ]
})
export class TopicsComponent implements OnInit {

  /* Inject the child components that will be used in this Typescript file */
  @ViewChild(TopicDocumentsCardComponent) topicDocumentsCardComponent: TopicDocumentsCardComponent;

  /** Name of the topics section */
  readonly SECTION_NAME = 'Topics';


  constructor(private topicsService: TopicsService,
              private utilsService: UtilsService) { }

  ngOnInit() {
  }

  /**
   * Calls the TopicsService to obtain the most representative documents of a topic and
   * stores the result in a variable.
   * @param topicId Id of the topic which documents want to be retrieved
   */
  getTopicDocuments(topicId: number): void {
    // Remove previous data and mark as loading
    this.topicDocumentsCardComponent.topicDocuments = null;
    this.topicDocumentsCardComponent.topicDocumentsLoading = true;
    this.topicDocumentsCardComponent.selectedTopicId = topicId;

    this.topicDocumentsCardComponent.topicDocumentsSubscription =
      this.topicsService.getTopicDocuments(topicId, this.topicDocumentsCardComponent.numDocuments)
        .subscribe(
          topicDocuments => {
            this.topicDocumentsCardComponent.topicDocuments = topicDocuments;
            this.topicDocumentsCardComponent.topicDocumentsLoading = false;
          },
          error => this.utilsService.showError(error)
        );
  }

}
