import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';
import { TextTopicProb } from '../dtos/text-topic-prob';

@Component({
  selector: 'app-text-section',
  templateUrl: './text-section.component.html',
  styleUrls: [ './text-section.component.css' ]
})
export class TextSectionComponent implements OnInit {

  sectionName = 'Texto';
  // TODO: This values shouldn't be hardcoded here
  textAreaNumRows = 30;
  initialMaxNumTopics = 6; // initial value for the max num topics slider
  relatedTopics: TextTopicProb[];

  constructor(private textService: TextService) { }

  ngOnInit() {
  }

  getRelatedTopics(text: string, maxNumTopics: number) {
    if (text.length === 0) {
      // TODO: Show warning message
      return;
    }

    this.textService.getRelatedTopics(text, maxNumTopics)
      .subscribe(relatedTopics => this.relatedTopics = relatedTopics);
  }
}
