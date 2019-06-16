import { Component, OnInit } from '@angular/core';
import { ReprDocOfTopic } from '../../dtos/repr-doc-of-topic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topic-documents-card',
  templateUrl: './topic-documents-card.component.html',
  styleUrls: [ './topic-documents-card.component.css' ]
})
export class TopicDocumentsCardComponent implements OnInit {

  /** Stores the topic documents returned by the REST API */
  topicDocuments: ReprDocOfTopic[];
  /** If true, the topic documents have been asked and are loading */
  topicDocumentsLoading = false;
  /** Disposable resource to cancel the execution of the topic documents Observable */
  topicDocumentsSubscription: Subscription;
  /** Selected topic id to obtain the topics documents */
  selectedTopicId: number;
  /** Max number of characters of a document summary displayed in the card header */
  private readonly SUMMARY_MAX_LENGTH = 150;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Closes the topic documents card.
   * If the topic documents are loading, unsubscribes from the Observable.
   */
  closeCard() {
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