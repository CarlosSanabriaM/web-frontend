import { Component, Input, OnInit } from '@angular/core';
import { TextareaComponent } from '../../textarea/textarea.component';
import { RelatedTopicsCardComponent } from '../../related-topics-card/related-topics-card.component';
import { TextService } from '../../text.service';
import { UtilsService } from '../../../utils.service';
import { RelatedDocumentsCardComponent } from '../../related-documents-card/related-documents-card.component';

/** Component that represents the configuration options for the text related topics of the text section. */
@Component({
  selector: 'app-text-option-related-topics',
  templateUrl: './text-option-related-topics.component.html',
  styleUrls: [ './text-option-related-topics.component.css' ]
})
export class TextOptionRelatedTopicsComponent implements OnInit {

  /* Inject the uncles components */
  @Input() textareaComponent: TextareaComponent;
  @Input() relatedTopicsCardComponent: RelatedTopicsCardComponent;
  @Input() relatedDocumentsCardComponent: RelatedDocumentsCardComponent;

  /** Min value for the max num topics */
  readonly MIN_VALUE = 1;
  /** Initial value for the max num topics */
  readonly INITIAL_VALUE = 6;
  /** Max value for the max num topics */
  readonly MAX_VALUE = 17;

  constructor(private textService: TextService,
              private utilsService: UtilsService) { }

  ngOnInit() {
  }

  /**
   * Calls the TopicsService to obtain the text-topic probabilities
   * and stores the result in a variable.
   * @param text Text used to obtain the related topics.
   * @param maxNumTopics Max number of topics to retrieve.
   */
  getRelatedTopics(text: string, maxNumTopics: number) {
    if (text.length === 0) {
      // If the text of the textarea is empty, mark it as touched to allow
      // the FormControl Validators show an error message, and return
      this.textareaComponent.markFormControlAsTouched();

      return;
    }

    // Remove previous data and mark as loading
    this.relatedTopicsCardComponent.relatedTopics = null;
    this.relatedTopicsCardComponent.relatedTopicsHistogramData = null;
    this.relatedTopicsCardComponent.relatedTopicsLoading = true;

    // Get related topics subscribing to an Observable, and store the subscription to have the possibility to cancel it
    this.relatedTopicsCardComponent.relatedTopicsSubscription = this.textService.getRelatedTopics(text, maxNumTopics)
      .subscribe(
        relatedTopics => {
          this.relatedTopicsCardComponent.relatedTopics = relatedTopics;

          // Sort the related topics by the topic id and create a histogram data object
          const sortedRelatedTopics = relatedTopics.slice().sort((a, b) => a.topic - b.topic);
          this.relatedTopicsCardComponent.relatedTopicsHistogramData = {
            labels: sortedRelatedTopics.map(topic => topic.topic.toString()),
            series: [ sortedRelatedTopics.map(topic => topic.text_topic_prob * 100) ]
          };
          this.relatedTopicsCardComponent.relatedTopicsLoading = false;
        },
        error => this.utilsService.showError(error)
      );
  }

}
