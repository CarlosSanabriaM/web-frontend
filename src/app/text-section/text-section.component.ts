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
  summaryAlertClosed = true; // If true, the alert showed when the summary isn't generated with the model is closed
  summaryAlertNumSentences: number; // Number of sentences specified by the user to generate the returned summary
  // TODO: This values shouldn't be hardcoded here
  textAreaNumRows = 30;
  initialMaxNumTopics = 6; // initial value for the max num topics slider
  maxNumTopics = 17;  // max num topics for the max num topics slider
  initialNumDocuments = 2;
  maxNumDocuments = 10;
  relatedDocumentSummaryMaxLength = 150;
  initialNumSummarySentences = 2;

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.numSummarySentencesFormControl = new FormControl(this.initialNumSummarySentences, [
      Validators.required,
      Validators.pattern(/^[+]?\d+$/),
      Validators.min(1)
    ]);
  }

  getRelatedTopics(text: string, maxNumTopics: number) {
    if (text.length === 0) {
      console.log('Text is empty');
      return;
    }

    this.textService.getRelatedTopics(text, maxNumTopics)
      .subscribe(relatedTopics => this.relatedTopics = relatedTopics);
  }

  getRelatedDocuments(text: string, numDocuments: number) {
    if (text.length === 0) {
      console.log('Text is empty');
      return;
    }

    this.textService.getRelatedDocuments(text, numDocuments)
      .subscribe(relatedDocuments => this.relatedDocuments = relatedDocuments);
  }

  getTextSummary(text: string, numSentences: number) {
    if (text.length === 0) {
      console.log('Text is empty');
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

  getNumSummarySentencesErrorMessage() {
    return this.numSummarySentencesFormControl.hasError('required') ? 'Valor requerido' :
      this.numSummarySentencesFormControl.hasError('pattern') ? 'Debe ser un entero' :
        this.numSummarySentencesFormControl.hasError('min') ? 'Min 1' :
          '';
  }

}
