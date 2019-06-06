import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from './topic';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private apiTopicsUrl = 'user/api/topics';  // URL to topics and summary API topics 'section'

  constructor(private http: HttpClient) { }

  /**
   * GET topics in text format from the REST API.
   * @param numKeywords Number of keywords to retrieve for each topic
   */
  getTopicsText(numKeywords: number): Observable<Topic[]> {
    const url = `${this.apiTopicsUrl}/text?num_keywords=${numKeywords}`;
    return this.http.get<Topic[]>(url).pipe(
      tap(_ => console.log(`fetched topics in text format with num_keywords=${numKeywords}`))
      // TODO: Handle errors: HTTP 500 and HTTP 422
    );
  }

}
