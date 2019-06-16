import { Component, Input, OnInit } from '@angular/core';
import { TextareaComponent } from '../textarea/textarea.component';
import { RelatedTopicsCardComponent } from '../related-topics-card/related-topics-card.component';
import { RelatedDocumentsCardComponent } from '../related-documents-card/related-documents-card.component';
import { TextSummaryCardComponent } from '../text-summary-card/text-summary-card.component';

@Component({
  selector: 'app-text-options',
  templateUrl: './text-options.component.html',
  styleUrls: [ './text-options.component.css' ]
})
export class TextOptionsComponent implements OnInit {

  /* Inject the sibling components */
  @Input() textareaComponent: TextareaComponent;
  @Input() relatedTopicsCardComponent: RelatedTopicsCardComponent;
  @Input() relatedDocumentsCardComponent: RelatedDocumentsCardComponent;
  @Input() textSummaryCardComponent: TextSummaryCardComponent;


  constructor() { }

  ngOnInit() {
  }

}
