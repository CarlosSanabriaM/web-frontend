import { Component, OnInit, ViewChild } from '@angular/core';
import { TextService } from '../text.service';
import { TextTopicProb } from '../dtos/text-topic-prob';
import { TextRelatedDoc } from '../dtos/text-related-doc';
import { TextSummary } from '../dtos/text-summary';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IChartistData } from 'chartist';
import { TextareaComponent } from './textarea/textarea.component';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: [ './text-section.component.css' ]
})
export class TextSectionComponent implements OnInit {

  sectionName = 'Texto';

  // Inject the child textarea component into the parent
  @ViewChild(TextareaComponent)
  textareaComponent: TextareaComponent;

  relatedTopics: TextTopicProb[];
  relatedTopicsLoading = false; // if true, the related topics have been asked and are loading
  relatedTopicsSubscription: Subscription; // disposable resource to cancel the execution of the related topics Observable
  relatedTopicsHistogramData: IChartistData; // data to be displayed in the histogram

  relatedDocuments: TextRelatedDoc[];
  relatedDocumentsLoading = false; // if true, the related documents have been asked and are loading
  relatedDocumentsSubscription: Subscription; // disposable resource to cancel the execution of the related documents Observable

  textSummary: TextSummary;
  textSummaryLoading = false; // if true, the text summary has been asked and is loading
  textSummarySubscription: Subscription; // disposable resource to cancel the execution of the text summary Observable

  numSummarySentencesFormControl: FormControl;

  summaryAlertClosed = true; // If true, the alert showed when the summary isn't generated with the model is closed
  summaryAlertNumSentences: number; // Number of sentences specified by the user to generate the returned summary
  // TODO: This values shouldn't be hardcoded here
  readonly maxNumTopicsMinValue = 1; // min value for the max num topics slider
  maxNumTopics = 6; // initial value for the max num topics slider
  readonly maxNumTopicsMaxValue = 17; // max value for the max num topics slider

  readonly numDocumentsMinValue = 1; // min value for the num documents slider
  numDocuments = 2; // initial value for the num documents slider
  readonly numDocumentsMaxValue = 10; // max value for the num documents slider

  initialNumSummarySentences = 2; // initial value for the num summary sentences input

  /** Max number of characters of a document summary displayed in the card header */
  readonly relatedDocumentSummaryMaxLength = 150;


  constructor(private textService: TextService) { }

  ngOnInit() {
    this.numSummarySentencesFormControl = new FormControl(this.initialNumSummarySentences, [
      Validators.required,
      // Only integer values are admitted
      Validators.pattern(/^[+]?\d+$/),
      Validators.min(1)
    ]);
  }

  /**
   * Calls the TopicsService to obtain the text-topic probabilities
   * and stores the result in a variable.
   * @param text: Text used to obtain the related topics.
   * @param maxNumTopics: Max number of topics to retrieve.
   */
  getRelatedTopics(text: string, maxNumTopics: number) {
    if (text.length === 0) {
      // If the text of the textarea is empty, mark it as touched to allow
      // the FormControl Validators show an error message, and return
      this.textareaComponent.markFormControlAsTouched();

      return;
    }

    // Remove previous data and mark as loading
    this.relatedTopics = null;
    this.relatedTopicsHistogramData = null;
    this.relatedTopicsLoading = true;

    this.relatedTopicsSubscription = this.textService.getRelatedTopics(text, maxNumTopics)
      .subscribe(relatedTopics => {
        this.relatedTopics = relatedTopics;

        // Sort the related topics by the topic id and create a histogram data object
        const sortedRelatedTopics = relatedTopics.slice().sort((a, b) => a.topic - b.topic);
        this.relatedTopicsHistogramData = {
          labels: sortedRelatedTopics.map(topic => topic.topic.toString()),
          series: [ sortedRelatedTopics.map(topic => topic.text_topic_prob * 100) ]
        };
        this.relatedTopicsLoading = false;
      });
  }

  /**
   * Calls the TopicsService to obtain the documents more related
   * to the given text and stores the result in a variable.
   * @param text: Text used to obtain the related documents.
   * @param numDocuments: Number of documents to retrieve.
   */
  getRelatedDocuments(text: string, numDocuments: number) {
    if (text.length === 0) {
      // If the text of the textarea is empty, mark it as touched to allow
      // the FormControl Validators show an error message, and return
      this.textareaComponent.markFormControlAsTouched();

      return;
    }

    // Remove previous data and mark as loading
    this.relatedDocuments = null;
    this.relatedDocumentsLoading = true;

    this.relatedDocumentsSubscription = this.textService.getRelatedDocuments(text, numDocuments)
      .subscribe(relatedDocuments => {
        this.relatedDocuments = relatedDocuments;
        this.relatedDocumentsLoading = false;
      });
  }

  /**
   * Calls the TopicsService to obtain a summary of the given text
   * and stores the result in a variable.
   * @param text: Text used to obtain it's summary.
   * @param numSentences: Number of sentences of the summary.
   */
  getTextSummary(text: string, numSentences: number) {
    if (text.length === 0) {
      // If the text of the textarea is empty, mark it as touched to allow
      // the FormControl Validators show an error message, and return
      this.textareaComponent.markFormControlAsTouched();

      return;
    }


    // Remove previous data and mark as loading
    this.textSummary = null;
    this.textSummaryLoading = true;

    this.textSummarySubscription = this.textService.getTextSummary(text, numSentences)
      .subscribe(textSummary => {
        this.textSummary = textSummary;
        this.textSummaryLoading = false;
        // Update the value of the alert
        this.summaryAlertClosed = textSummary.summary_generated_with_the_model;
        this.summaryAlertNumSentences = numSentences;
      });
  }

  /**
   * Returns the message error for the num summary sentences input
   * that corresponds to the error in it's current value.
   */
  getNumSummarySentencesErrorMessage() {
    return this.numSummarySentencesFormControl.hasError('required') ? 'Valor requerido' :
      this.numSummarySentencesFormControl.hasError('pattern') ? 'Debe ser un entero' :
        this.numSummarySentencesFormControl.hasError('min') ? 'Min 1' :
          '';
  }

  /**
   * Closes the related topics card.
   * If the related topics where loading, unsubscribes from the Observable.
   */
  closeRelatedTopicsCard() {
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

  /**
   * Closes the related documents card.
   * If the related documents where loading, unsubscribes from the Observable.
   */
  closeRelatedDocumentsCard() {
    if (this.relatedDocumentsLoading) {
      // If related documents are loading, cancel the subscription and mark as not loading
      this.relatedDocumentsSubscription.unsubscribe();
      this.relatedDocumentsLoading = false;
    } else {
      // If related documents have been loaded, remove them
      this.relatedDocuments = null;
    }
  }

  /**
   * Closes the text summary card.
   * If text summary is loading, unsubscribes from the Observable.
   */
  closeTextSummaryCard() {
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
