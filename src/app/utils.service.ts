import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ErrorSnackBarComponent } from './shared/error-snack-bar/error-snack-bar.component';

/** Service that contains utility functions used across the whole project. */
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /** Duration in seconds of the error snack bar */
  private readonly ERROR_SNACK_BAR_SECONDS = 8;


  /**
   * @param errorSnackBar Angular Material Snackbar for the error messages.
   */
  constructor(private errorSnackBar: MatSnackBar) { }

  /**
   * Scrolls the page to the given HTML element.
   * @param element Element where the page will be scrolled
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
      return throwError('Ha ocurrido un error causado por el frontend o por la red. Por favor, inténtalo más tarde.');

    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, with the following message: '${error.message}'.`);

      // Return an observable with a user-facing error message, based on the error status code
      const wrapMessageFunc =
        (inner: string) => `El backend ha devuelto un código de respuesta erróneo. ${inner} Por favor, inténtalo más tarde.`;

      switch (error.status) {
        case 400:
          return throwError(wrapMessageFunc('Petición con sintáxis inválida enviada al servidor.'));
        case 404:
          return throwError(wrapMessageFunc('El valor solicitado al servidor no se ha encontrado.'));
        case 422:
          return throwError(wrapMessageFunc('Los valores opcionales enviados al servidor eran erróneos.'));
        case 500:
          return throwError(wrapMessageFunc('Error del servidor.'));
        default:
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
