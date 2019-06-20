import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Service that contains utility functions used across the whole project.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  /**
   * Scrolls the page to the given HTML element.
   * @param element: Element where the page will be scrolled
   */
  static scrollToElement(element: HTMLElement) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  // TODO: Revise this method
  /**
   * Method for handling http errors.
   */
  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `with the following message: '${error.message}'.`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened. Please, try again later.');
  }

}
