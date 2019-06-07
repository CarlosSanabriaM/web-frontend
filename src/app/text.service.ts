import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private apiTextUrl = `${environment.userApiBaseUrl}/text`;  // URL to topics and summary API text 'section'

  constructor(private http: HttpClient) { }
}
