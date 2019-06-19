import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../dtos/topic';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TopicImageUrl } from '../dtos/topic-image-url';
import { ReprDocOfTopic } from '../dtos/repr-doc-of-topic';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  /** URL to topics and summary API topics 'section' */
  private API_TOPICS_URL = `${environment.baseUrl}/user/api/topics`;

  constructor(private http: HttpClient) { }

  /**
   * GET topics in text format from the REST API.
   * @param numKeywords: Number of keywords to retrieve for each topic
   */
  getTopicsText(numKeywords: number): Observable<Topic[]> {
    const url = `${this.API_TOPICS_URL}/text?num_keywords=${numKeywords}`;

    return this.http.get<Topic[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched topics in text format with num_keywords=${numKeywords}`)),
      catchError(UtilsService.handleError)
    );
  }

  /**
   * GET topics in wordcloud image format from the REST API.
   * @param numKeywords: Number of keywords to retrieve for each topic image
   */
  getTopicsWordcloudImagesUrls(numKeywords: number): Observable<TopicImageUrl[]> {
    const url = `${this.API_TOPICS_URL}/wordcloud?num_keywords=${numKeywords}`;

    return this.http.get<TopicImageUrl[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched topics in wordcloud image format with num_keywords=${numKeywords}`)),
      // Create new TopicImageUrl objects with the baseUrl added at the beginning of the image_url
      map(topicImageUrls => topicImageUrls.map(topicImageUrl => ({
        topic: topicImageUrl.topic,
        image_url: `${environment.baseUrl}${topicImageUrl.image_url}`
      }))),
      catchError(UtilsService.handleError)
    );
  }

  /**
   * GET the most representative documents of a topic from the REST API.
   * @param topicId: Id of the topic which documents want to be retrieved
   * @param numDocuments: Number of documents to retrieve
   */
  getTopicDocuments(topicId: number, numDocuments: number): Observable<ReprDocOfTopic[]> {
    const url = `${this.API_TOPICS_URL}/${topicId}/documents?num_documents=${numDocuments}`;

    return this.http.get<ReprDocOfTopic[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched the ${numDocuments} most representative documents of topic ${topicId}`)),
      catchError(UtilsService.handleError)
    );
  }

}
