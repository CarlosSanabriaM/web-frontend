import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { TextTopicProb } from '../dtos/text-topic-prob';
import { TextRelatedDoc } from '../dtos/text-related-doc';
import { TextSummary } from '../dtos/text-summary';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: [ './text-section.component.css' ]
})
export class TextSectionComponent implements OnInit {

  sectionName = 'Texto';
  relatedTopics: TextTopicProb[];
  relatedDocuments: TextRelatedDoc[];
  textSummary: TextSummary;
  numSummarySentencesFormControl: FormControl;
  textAreaFormControl: FormControl;
  summaryAlertClosed = true; // If true, the alert showed when the summary isn't generated with the model is closed
  summaryAlertNumSentences: number; // Number of sentences specified by the user to generate the returned summary
  // TODO: This values shouldn't be hardcoded here
  textAreaNumRows = 20;

  readonly maxNumTopicsMinValue = 1; // min value for the max num topics slider
  maxNumTopics = 6; // initial value for the max num topics slider
  readonly maxNumTopicsMaxValue = 17; // max value for the max num topics slider

  readonly numDocumentsMinValue = 1; // min value for the num documents slider
  numDocuments = 2; // initial value for the num documents slider
  readonly numDocumentsMaxValue = 10; // max value for the num documents slider

  initialNumSummarySentences = 2; // initial value for the num summary sentences input

  readonly relatedDocumentSummaryMaxLength = 150; // max number of characters of a document summary displayed in the card header


  constructor(private textService: TextService) { }

  ngOnInit() {
    this.numSummarySentencesFormControl = new FormControl(this.initialNumSummarySentences, [
      Validators.required,
      // Only integer values are admitted
      Validators.pattern(/^[+]?\d+$/),
      Validators.min(1)
    ]);

    this.textAreaFormControl = new FormControl('', [ Validators.required ]);
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
      this.textAreaFormControl.markAsTouched();

      return;
    }

    this.textService.getRelatedTopics(text, maxNumTopics)
      .subscribe(relatedTopics => this.relatedTopics = relatedTopics);
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
      this.textAreaFormControl.markAsTouched();

      return;
    }

    this.textService.getRelatedDocuments(text, numDocuments)
      .subscribe(relatedDocuments => this.relatedDocuments = relatedDocuments);
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
      this.textAreaFormControl.markAsTouched();

      return;
    }

    this.textService.getTextSummary(text, numSentences)
      .subscribe(textSummary => {
        this.textSummary = textSummary;
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

}
