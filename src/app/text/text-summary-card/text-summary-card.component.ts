import { Component, OnInit } from '@angular/core';
import { TextSummary } from '../../dtos/text-summary';
import { Subscription } from 'rxjs';

/** Component that represents the card where the text summary will be presented in the topics section. */
@Component({
  selector: 'app-text-summary-card',
  templateUrl: './text-summary-card.component.html',
  styleUrls: [ './text-summary-card.component.css' ]
})
export class TextSummaryCardComponent implements OnInit {

  /** Stores the text summary returned by the REST API */
  textSummary: TextSummary;
  /** If true, the text summary has been asked and is loading */
  textSummaryLoading = false;
  /** Disposable resource to cancel the execution of the text summary Observable */
  textSummarySubscription: Subscription;
  /** If true, the alert showed when the summary isn't generated with the model is closed */
  summaryAlertClosed = true;
  /** Number of sentences specified by the user to generate the returned summary */
  summaryAlertNumSentences: number;


  constructor() { }

  ngOnInit() {
  }

  /**
   * Closes the text summary card.
   * If text summary is loading, unsubscribes from the Observable.
   */
  closeCard() {
    if (this.textSummaryLoading) {
      // If text summary is loading, cancel the subscription and mark as not loading
      this.textSummarySubscription.unsubscribe();
      this.textSummaryLoading = false;
    } else {
      // If related documents have been loaded, remove them
      this.textSummary = null;
    }
  }

}
