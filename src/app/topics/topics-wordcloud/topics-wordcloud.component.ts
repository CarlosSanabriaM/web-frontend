import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicImageUrl } from '../../dtos/topic-image-url';
import { TopicDocumentsCardComponent } from '../topic-documents-card/topic-documents-card.component';
import { TopicsService } from '../topics.service';

@Component({
  selector: 'app-topics-wordcloud',
  templateUrl: './topics-wordcloud.component.html',
  styleUrls: [ './topics-wordcloud.component.css' ]
})
export class TopicsWordcloudComponent implements OnInit {

  /* Inject the sibling components */
  @Input() topicDocumentsCardComponent: TopicDocumentsCardComponent;

  /**
   * Output event that notifies the parent component when the user asked for topic documents,
   * telling the topic id whose documents were asked.
   */
  @Output() topicdocuments = new EventEmitter<number>();

  /** Min value for the num keywords wordcloud format */
  readonly NUM_KEYWORDS_MIN_VALUE = 1;
  /** Initial value for the num keywords wordcloud format */
  readonly NUM_KEYWORDS_INITIAL_VALUE = 20;
  /** Max value for the num keywords wordcloud format */
  readonly NUM_KEYWORDS_MAX_VALUE = 100;

  /** Number of keywords to be displayed in wordcloud format */
  numKeywords: number;
  /** Stores the topic documents returned by the REST API */
  topicImageUrls: TopicImageUrl[];
  /** If true, the wordcloud images have been asked and are loading */
  wordcloudImagesLoading = false;


  constructor(private topicsService: TopicsService) { }

  ngOnInit() {
    this.numKeywords = this.NUM_KEYWORDS_INITIAL_VALUE;
    this.getTopicsWordcloudImagesUrls();
  }

  /**
   * Calls the TopicsService to obtain the topics in wordcloud format and
   * stores the result in a variable.
   */
  getTopicsWordcloudImagesUrls(): void {
    // Remove previous data and mark as loading
    this.topicImageUrls = null;
    this.wordcloudImagesLoading = true;

    this.topicsService.getTopicsWordcloudImagesUrls(this.numKeywords)
      .subscribe(topicImageUrls => {
        this.topicImageUrls = topicImageUrls;
        this.wordcloudImagesLoading = false;
      });
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
