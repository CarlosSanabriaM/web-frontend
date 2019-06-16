import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Topic } from '../../dtos/topic';
import { TopicsService } from '../topics.service';
import { TopicDocumentsCardComponent } from '../topic-documents-card/topic-documents-card.component';
import { TopicsConfigurationComponent } from '../topics-configuration/topics-configuration.component';

@Component({
  selector: 'app-topics-text',
  templateUrl: './topics-text.component.html',
  styleUrls: [ './topics-text.component.css' ]
})
export class TopicsTextComponent implements OnInit {

  /* Inject the sibling components */
  @Input() topicDocumentsCardComponent: TopicDocumentsCardComponent;
  @Input() topicsConfigurationComponent: TopicsConfigurationComponent;

  /**
   * Output event that notifies the parent component when the user asked for topic documents,
   * telling the topic id whose documents were asked.
   */
  @Output() topicdocuments = new EventEmitter<number>();

  /** Stores the topic documents returned by the REST API */
  topics: Topic[];

  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.getTopicsText();
  }

  /**
   * Calls the TopicsService to obtain the topics in text format and
   * stores the result in a variable.
   */
  getTopicsText(): void {
    this.topicsService.getTopicsText(this.topicsConfigurationComponent.numKeywordsTextFormat)
      .subscribe(topics => this.topics = topics);
  }

  /**
   * Method called when the user presses a document icon.
   * Stores the value of the topic id in the EventEmitter,
   * notifying the parent that topic documents where asked.
   * @param topicId: Id of the topic which documents want to be retrieved
   */
  getTopicDocuments(topicId: number): void {
    this.topicdocuments.emit(topicId);
  }

}
