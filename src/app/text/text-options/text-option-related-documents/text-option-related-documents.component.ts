import { Component, Input, OnInit } from '@angular/core';
import { TextService } from '../../text.service';
import { TextareaComponent } from '../../textarea/textarea.component';
import { RelatedDocumentsCardComponent } from '../../related-documents-card/related-documents-card.component';
import { UtilsService } from '../../../utils.service';
import { RelatedTopicsCardComponent } from '../../related-topics-card/related-topics-card.component';

/** Component that represents the configuration options for the text related documents of the text section. */
@Component({
  selector: 'app-text-option-related-documents',
  templateUrl: './text-option-related-documents.component.html',
  styleUrls: [ './text-option-related-documents.component.css' ]
})
export class TextOptionRelatedDocumentsComponent implements OnInit {

  /* Inject the uncles components */
  @Input() textareaComponent: TextareaComponent;
  @Input() relatedTopicsCardComponent: RelatedTopicsCardComponent;
  @Input() relatedDocumentsCardComponent: RelatedDocumentsCardComponent;

  /** Min value for the num documents */
  readonly MIN_VALUE = 1;
  /** Initial value for the num documents */
  readonly INITIAL_VALUE = 2;
  /** Max value for the num documents */
  readonly MAX_VALUE = 10;

  constructor(private textService: TextService,
              private utilsService: UtilsService) { }

  ngOnInit() {
  }

  /**
   * Calls the TopicsService to obtain the documents more related
   * to the given text and stores the result in a variable.
   * @param text Text used to obtain the related documents.
   * @param numDocuments Number of documents to retrieve.
   */
  getRelatedDocuments(text: string, numDocuments: number) {
    if (text.length === 0) {
      // If the text of the textarea is empty, mark it as touched to allow
      // the FormControl Validators show an error message, and return
      this.textareaComponent.markFormControlAsTouched();

      return;
    }

    // Remove previous data and mark as loading
    this.relatedDocumentsCardComponent.relatedDocuments = null;
    this.relatedDocumentsCardComponent.relatedDocumentsLoading = true;

    // Get related documents subscribing to an Observable, and store the subscription to have the possibility to cancel it
    this.relatedDocumentsCardComponent.relatedDocumentsSubscription = this.textService.getRelatedDocuments(text, numDocuments)
      .subscribe(
        relatedDocuments => {
          this.relatedDocumentsCardComponent.relatedDocuments = relatedDocuments;
          this.relatedDocumentsCardComponent.relatedDocumentsLoading = false;
        },
        error => this.utilsService.showError(error)
      );
  }

}
