import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../topics.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics-section',
  templateUrl: './topics-section.component.html',
  styleUrls: [ './topics-section.component.css' ]
})
export class TopicsSectionComponent implements OnInit {

  sectionName = 'Topics';
  topics: Topic[];
  numKeywordsTextFormat: number;
  numKeywordsWordcloudFormat: number;

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.getTopicsText(this.numKeywordsTextFormat);
  }

  getTopicsText(numKeywords: number): void {
    this.topicsService.getTopicsText(numKeywords)
      .subscribe(topics => this.topics = topics);
  }

}
