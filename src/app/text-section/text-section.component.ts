import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { TextTopicProb } from '../dtos/text-topic-prob';
import { TextRelatedDoc } from '../dtos/text-related-doc';
import { TextSummary } from '../dtos/text-summary';

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
  // TODO: This values shouldn't be hardcoded here
  textAreaNumRows = 30;
  initialMaxNumTopics = 6; // initial value for the max num topics slider
  maxNumTopics = 17;  // max num topics for the max num topics slider
  initialNumDocuments = 2;
  maxNumDocuments = 10;
  relatedDocumentSummaryMaxLength = 150;

  constructor(private textService: TextService) { }

  ngOnInit() {
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
      .subscribe(textSummary => this.textSummary = textSummary);
  }

}
