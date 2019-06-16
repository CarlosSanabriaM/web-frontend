import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicsService } from './topics.service';
import { TopicDocumentsCardComponent } from './topic-documents-card/topic-documents-card.component';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  /* Inject the child components that will be used in this Typescript file */
  @ViewChild(TopicDocumentsCardComponent) topicDocumentsCardComponent: TopicDocumentsCardComponent;

  /** Name of the topics section */
  private readonly SECTION_NAME = 'Topics';


  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
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

    this.topicDocumentsCardComponent.topicDocumentsSubscription =
      this.topicsService.getTopicDocuments(topicId, this.topicDocumentsCardComponent.numDocuments)
        .subscribe(topicDocuments => {
          this.topicDocumentsCardComponent.topicDocuments = topicDocuments;
          this.topicDocumentsCardComponent.topicDocumentsLoading = false;
        });
  }

}
