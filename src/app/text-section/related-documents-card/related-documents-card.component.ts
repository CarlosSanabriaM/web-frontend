import { Component, OnInit } from '@angular/core';
import { TextRelatedDoc } from '../../dtos/text-related-doc';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-related-documents-card',
  templateUrl: './related-documents-card.component.html',
  styleUrls: [ './related-documents-card.component.css' ]
})
export class RelatedDocumentsCardComponent implements OnInit {

  /** Max number of characters of a document summary displayed in the card header */
  private readonly SUMMARY_MAX_LENGTH = 150;

  /** Stores the text related documents returned by the REST API */
  relatedDocuments: TextRelatedDoc[];
  /** If true, the related documents have been asked and are loading */
  relatedDocumentsLoading = false;
  /** Disposable resource to cancel the execution of the related documents Observable */
  relatedDocumentsSubscription: Subscription;


  constructor() { }

  ngOnInit() {
  }

  /**
   * Closes the related documents card.
   * If the related documents where loading, unsubscribes from the Observable.
   */
  closeCard() {
    if (this.relatedDocumentsLoading) {
      // If related documents are loading, cancel the subscription and mark as not loading
      this.relatedDocumentsSubscription.unsubscribe();
      this.relatedDocumentsLoading = false;
    } else {
      // If related documents have been loaded, remove them
      this.relatedDocuments = null;
    }
  }

}
