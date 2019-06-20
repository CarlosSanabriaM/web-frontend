import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackBarComponent } from './shared/error-snack-bar/error-snack-bar.component';

/**
 * Service that contains utility functions used across the whole project.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /** Duration in seconds of the error snack bar */
  private readonly ERROR_SNACK_BAR_SECONDS = 8;


  constructor(private errorSnackBar: MatSnackBar) { }

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

  /**
   * Method for handling http errors.
   * Logs the error to the console and returns an observable with a user-facing error message.
   */
  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // Return an observable with a user-facing error message
      // TODO: English version: return throwError('A client-side or network error has occurred. Please, try again later.');
      return throwError('Ha ocurrido un error causado por el frontend o por la red. Por favor, inténtalo más tarde.');
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, with the following message: '${error.message}'.`);
      // Return an observable with a user-facing error message, based on the error status code
      // TODO: English version: const wrapMessageFunc = (inner: string) => `The backend returned an unsuccessful response code. ${inner} Please, try again later.`;
      const wrapMessageFunc = (inner: string) => `El backend ha devuelto un código de respuesta erróneo. ${inner} Por favor, inténtalo más tarde.`;
      switch (error.status) {
        case 400:
          // TODO: English version: return throwError(wrapMessageFunc('Bad request sent to the server.'));
          return throwError(wrapMessageFunc('Petición con sintáxis inválida enviada al servidor.'));
        case 404:
          // TODO: English version: return throwError(wrapMessageFunc('Value asked to the server not found.'));
          return throwError(wrapMessageFunc('El valor solicitado al servidor no se ha encontrado.'));
        case 422:
          // TODO: English version: return throwError(wrapMessageFunc('Optional values sent to the server were wrong.'));
          return throwError(wrapMessageFunc('Los valores opcionales enviados al servidor eran erróneos.'));
        case 500:
          // TODO: English version: return throwError(wrapMessageFunc('Server error.'));
          return throwError(wrapMessageFunc('Error del servidor.'));
        default:
          // TODO: English version: return throwError(wrapMessageFunc(''));
          return throwError(wrapMessageFunc(''));
      }
    }
  }

  /**
   * Method that shows the error message passed as parameter in an Angular Material Snack Bar.
   */
  showError(errorMessage: string) {
    this.errorSnackBar.openFromComponent(ErrorSnackBarComponent, {
      duration: this.ERROR_SNACK_BAR_SECONDS * 1000,
      data: errorMessage, // data sent to the ErrorSnackBarComponent as Input
      panelClass: [ 'error-snackbar-panel' ] // css class located in the styles.css file to style the snackbar panel
    });
  }

}
