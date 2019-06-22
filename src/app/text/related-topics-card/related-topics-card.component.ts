import { Component, OnInit } from '@angular/core';
import { TextTopicProb } from '../../dtos/text-topic-prob';
import { Subscription } from 'rxjs';
import { IChartistData } from 'chartist';

/** Component that represents the card where the text related topics will be presented in the topics section. */
@Component({
  selector: 'app-related-topics-card',
  templateUrl: './related-topics-card.component.html',
  styleUrls: [ './related-topics-card.component.css' ]
})
export class RelatedTopicsCardComponent implements OnInit {

  /** Stores the text-topic probabilities returned by the REST API */
  relatedTopics: TextTopicProb[];
  /** If true, the related topics have been asked and are loading */
  relatedTopicsLoading = false;
  /** Disposable resource to cancel the execution of the related topics Observable */
  relatedTopicsSubscription: Subscription;
  /** Data to be displayed in the histogram */
  relatedTopicsHistogramData: IChartistData;


  constructor() { }

  ngOnInit() {
  }

  /**
   * Closes the related topics card.
   * If the related topics where loading, unsubscribes from the Observable.
   */
  closeCard() {
    if (this.relatedTopicsLoading) {
      // If related topics are loading, cancel the subscription and mark as not loading
      this.relatedTopicsSubscription.unsubscribe();
      this.relatedTopicsLoading = false;
    } else {
      // If related topics have been loaded, remove them
      this.relatedTopics = null;
      this.relatedTopicsHistogramData = null;
    }
  }

}
