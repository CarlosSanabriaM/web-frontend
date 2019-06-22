import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TextTopicProb } from '../dtos/text-topic-prob';
import { TextRelatedDoc } from '../dtos/text-related-doc';
import { TextSummary } from '../dtos/text-summary';
import { UtilsService } from '../utils.service';

/** Service that communicates with the text section of the web backend REST API. */
@Injectable({
  providedIn: 'root'
})
export class TextService {

  /** URL to topics and summary API text 'section' */
  private readonly API_TEXT_URL = `${environment.baseUrl}/user/api/text`;


  constructor(private http: HttpClient) { }

  /**
   * POST the given text to the REST API and return the text-topics probabilities.
   * @param text Text used to obtain the related topics.
   * @param maxNumTopics Max number of topics to retrieve.
   */
  getRelatedTopics(text: string, maxNumTopics: number): Observable<TextTopicProb[]> {
    const url = `${this.API_TEXT_URL}/related/topics?max_num_topics=${maxNumTopics}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextTopicProb[]>(url, formData).pipe(
      tap(_ => console.log(`Fetched related topics with max_num_topics=${maxNumTopics}`)),
      catchError(UtilsService.handleError)
    );
  }

  /**
   * POST the given text to the REST API and return the documents more related to the text.
   * @param text Text used to obtain the related documents.
   * @param numDocuments Number of documents to retrieve.
   */
  getRelatedDocuments(text: string, numDocuments: number): Observable<TextRelatedDoc[]> {
    const url = `${this.API_TEXT_URL}/related/documents?num_documents=${numDocuments}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextRelatedDoc[]>(url, formData).pipe(
      tap(_ => console.log(`Fetched related documents with num_documents=${numDocuments}`)),
      catchError(UtilsService.handleError)
    );
  }

  /**
   * POST the given text to the REST API and return a summary of the text.
   * @param text Text to be summarized.
   * @param numSentences Number of sentences that will contain the summary.
   */
  getTextSummary(text: string, numSentences: number): Observable<TextSummary> {
    const url = `${this.API_TEXT_URL}/summary?num_summary_sentences=${numSentences}`;

    // Create FormData object, because the API expects 'Content-Type': 'application/x-www-form-urlencoded' with text attribute
    const formData = new FormData();
    formData.append('text', text);

    return this.http.post<TextSummary>(url, formData).pipe(
      tap(_ => console.log(`Fetched text summary with num_summary_sentences=${numSentences}`)),
      catchError(UtilsService.handleError)
    );
  }

}
