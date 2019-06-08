import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TextTopicProb } from './dtos/text-topic-prob';
import { TextRelatedDoc } from './dtos/text-related-doc';
import { TextSummary } from './dtos/text-summary';

@Injectable({
  providedIn: 'root'
})
export class TextService {


  private apiTextUrl = `${environment.baseUrl}/user/api/text`;  // URL to topics and summary API text 'section'

  constructor(private http: HttpClient) { }

  /**
   * POST the given text to the REST API and return the text-topics probabilities.
   * @param text: Text used to obtain the related topics.
   * @param maxNumTopics: Max number of topics to retrieve.
   */
  getRelatedTopics(text: string, maxNumTopics: number): Observable<TextTopicProb[]> {
    const url = `${this.apiTextUrl}/related/topics?max_num_topics=${maxNumTopics}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextTopicProb[]>(url, formData).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched related topics with max_num_topics=${maxNumTopics}`)),
      catchError(this.handleError)
    );
  }

  /**
   * POST the given text to the REST API and return the documents more related to the text.
   * @param text: Text used to obtain the related documents.
   * @param numDocuments: Number of documents to retrieve.
   */
  getRelatedDocuments(text: string, numDocuments: number): Observable<TextRelatedDoc[]> {
    const url = `${this.apiTextUrl}/related/documents?num_documents=${numDocuments}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextRelatedDoc[]>(url, formData).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched related documents with num_documents=${numDocuments}`)),
      catchError(this.handleError)
    );
  }

  /**
   * POST the given text to the REST API and return a summary of the text.
   * @param text: Text to be summarized.
   * @param numSentences: Number of sentences that will contain the summary.
   */
  getTextSummary(text: string, numSentences: number): Observable<TextSummary[]> {
    const url = `${this.apiTextUrl}/summary?num_summary_sentences=${numSentences}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextSummary[]>(url, formData).pipe(
      // TODO: Modify tap?
      tap(_ => console.log(`fetched text summary with num_summary_sentences=${numSentences}`)),
      catchError(this.handleError)
    );
  }

  // TODO: Revise this method
  // TODO: Don't repeat the code of this method in the 2 services. Move to a common place.
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
