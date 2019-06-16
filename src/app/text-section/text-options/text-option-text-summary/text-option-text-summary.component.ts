import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextService } from '../../text.service';
import { TextareaComponent } from '../../textarea/textarea.component';
import { TextSummaryCardComponent } from '../../text-summary-card/text-summary-card.component';

@Component({
  selector: 'app-text-option-text-summary',
  templateUrl: './text-option-text-summary.component.html',
  styleUrls: [ './text-option-text-summary.component.css' ]
})
export class TextOptionTextSummaryComponent implements OnInit {

  /* Inject the uncles components */
  @Input() textareaComponent: TextareaComponent;
  @Input() textSummaryCardComponent: TextSummaryCardComponent;

  /** Min value for the num summary sentences input */
  private readonly MIN_VALUE = 1;
  /** Initial value for the num summary sentences input */
  private readonly INITIAL_VALUE = 2;
  /** Step for the num summary sentences input */
  private readonly STEP = 2;

  /** Form Control that tracks the value and validation status of the num summary sentences input element */
  private numSummarySentencesFormControl: FormControl;

  constructor(private textService: TextService) { }

  ngOnInit() {
    this.numSummarySentencesFormControl = new FormControl(this.INITIAL_VALUE, [
      Validators.required,
      Validators.pattern(/^[+]?\d+$/), // only integer values are admitted
      Validators.min(this.MIN_VALUE)
    ]);
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
    this.textSummaryCardComponent.textSummary = null;
    this.textSummaryCardComponent.textSummaryLoading = true;

    this.textSummaryCardComponent.textSummarySubscription = this.textService.getTextSummary(text, numSentences)
      .subscribe(textSummary => {
        this.textSummaryCardComponent.textSummary = textSummary;
        this.textSummaryCardComponent.textSummaryLoading = false;
        // Update the value of the alert
        this.textSummaryCardComponent.summaryAlertClosed = textSummary.summary_generated_with_the_model;
        this.textSummaryCardComponent.summaryAlertNumSentences = numSentences;
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
