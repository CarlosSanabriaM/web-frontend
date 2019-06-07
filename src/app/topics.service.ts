import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Topic } from './dtos/topic';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { TopicImageUrl } from './dtos/topic-image-url';
import { ReprDocOfTopic } from './dtos/repr-doc-of-topic';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private apiTopicsUrl = `${environment.baseUrl}/user/api/topics`;  // URL to topics and summary API topics 'section'

  constructor(private http: HttpClient) { }

  /**
   * GET topics in text format from the REST API.
   * @param numKeywords: Number of keywords to retrieve for each topic
   */
  getTopicsText(numKeywords: number): Observable<Topic[]> {
    const url = `${this.apiTopicsUrl}/text?num_keywords=${numKeywords}`;

    return this.http.get<Topic[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched topics in text format with num_keywords=${numKeywords}`)),
      catchError(this.handleError)
    );
  }

  /**
   * GET topics in wordcloud image format from the REST API.
   * @param numKeywords: Number of keywords to retrieve for each topic image
   */
  getTopicsWordcloudImagesUrls(numKeywords: number): Observable<TopicImageUrl[]> {
    const url = `${this.apiTopicsUrl}/wordcloud?num_keywords=${numKeywords}`;

    return this.http.get<TopicImageUrl[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched topics in wordcloud image format with num_keywords=${numKeywords}`)),
      // Create new TopicImageUrl objects with the baseUrl added at the beginning of the image_url
      map(topicImageUrls => topicImageUrls.map(topicImageUrl => ({
        topic: topicImageUrl.topic,
        image_url: `${environment.baseUrl}${topicImageUrl.image_url}`
      }))),
      catchError(this.handleError)
    );
  }

  /**
   * GET the most representative documents of a topic from the REST API.
   * @param topicId: Id of the topic which documents want to be retrieved
   * @param numDocuments: Number of documents to retrieve
   */
  getTopicDocuments(topicId: number, numDocuments: number) {
    const url = `${this.apiTopicsUrl}/${topicId}/documents?num_documents=${numDocuments}`;

    return this.http.get<ReprDocOfTopic[]>(url).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched the ${numDocuments} most representative documents of topic ${topicId}`)),
      catchError(this.handleError)
    );
  }

  // TODO: Revise this method
  /**
   * Method for handling http errors.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
