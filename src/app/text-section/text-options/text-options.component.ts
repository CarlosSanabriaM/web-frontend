/*
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextService } from '../../text.service';
import { TextareaComponent } from '../textarea/textarea.component';

@Component({
  selector: 'app-text-options',
  templateUrl: './text-options.component.html',
  styleUrls: ['./text-options.component.css']
})
export class TextOptionsComponent implements OnInit {

  @Input() textareaComponent: TextareaComponent;

  // TODO: This values shouldn't be hardcoded here
  readonly maxNumTopicsMinValue = 1; // min value for the max num topics slider
  maxNumTopics = 6; // initial value for the max num topics slider
  readonly maxNumTopicsMaxValue = 17; // max value for the max num topics slider

  readonly numDocumentsMinValue = 1; // min value for the num documents slider
  numDocuments = 2; // initial value for the num documents slider
  readonly numDocumentsMaxValue = 10; // max value for the num documents slider

  numSummarySentencesFormControl: FormControl;

  // TODO: SNAKE_CASE
  private readonly INITIAL_NUM_SUMMARY_SENTENCES = 2; // initial value for the num summary sentences input

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.numSummarySentencesFormControl = new FormControl(this.INITIAL_NUM_SUMMARY_SENTENCES, [
      Validators.required,
      // Only integer values are admitted
      Validators.pattern(/^[+]?\d+$/),
      Validators.min(1)
    ]);
  }

  /!**
   * Calls the TopicsService to obtain the text-topic probabilities
   * and stores the result in a variable.
   * @param text: Text used to obtain the related topics.
   * @param maxNumTopics: Max number of topics to retrieve.
   *!/
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

  /!**
   * Calls the TopicsService to obtain the documents more related
   * to the given text and stores the result in a variable.
   * @param text: Text used to obtain the related documents.
   * @param numDocuments: Number of documents to retrieve.
   *!/
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

  /!**
   * Calls the TopicsService to obtain a summary of the given text
   * and stores the result in a variable.
   * @param text: Text used to obtain it's summary.
   * @param numSentences: Number of sentences of the summary.
   *!/
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

  /!**
   * Returns the message error for the num summary sentences input
   * that corresponds to the error in it's current value.
   *!/
  getNumSummarySentencesErrorMessage() {
    return this.numSummarySentencesFormControl.hasError('required') ? 'Valor requerido' :
      this.numSummarySentencesFormControl.hasError('pattern') ? 'Debe ser un entero' :
        this.numSummarySentencesFormControl.hasError('min') ? 'Min 1' :
          '';
  }

}
*/
